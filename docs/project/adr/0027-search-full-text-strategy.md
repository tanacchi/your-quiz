# ADR-0027: Search 本番実装の全文検索方式選定

## Status

Proposed

## Context

### Background

issue #48「api: Search 本番 D1 接続」において、`GET /api/search/v1/quizzes`
（`SearchQuizzesUseCase` / `SearchController`）のデータ源を、フィクスチャー固定の
`MockSearchRepository`（3件固定）から Cloudflare D1 を用いた `D1SearchRepository`
へ差し替える。issue の完了条件に「FTS5 または LIKE 検索（D1のFTSサポート状況に
応じて選択・ADRに記録）」と明記されており、本ADRはその選定記録である。

検索対象は `Quiz.question` / `Quiz.explanation`（自由記述の日本語文）と
`Tag.name`（「プログラミング」「Web開発」等の日本語タグ名）で、
`api/migrations/quiz-db/0001_initial.sql` の CHECK制約・スキーマは変更しない前提。

### Drivers

- **D1のFTS対応状況**: SQLiteベースのD1が実際にFTS5をサポートしているか
- **日本語検索の実用性**: 本アプリの検索語・タグ名の大半が日本語（2〜4文字程度の
  短い語が多い: 「数学」「歴史」「英語」等）であり、この特性下でも機能すること
- **既存挙動との整合**: `MockSearchRepository`（`toLowerCase().includes()` による
  部分一致）と search-quiz-rows等のテスト・フィクスチャーとの意味論的な連続性
- **データ規模**: 現状 seed データは21件と小規模
- **実装・運用コスト**: マイグレーション追加や同期トリガーの保守負荷

## Decision

### Chosen Option

**LIKE '%...%' による部分一致検索を採用する。**

`D1SearchRepository`（`SearchQueryBuilder.ts`）で、`question` / `explanation` /
タグ名（`QuizTag` 経由で `Tag.name` を `EXISTS` 副問い合わせ）を横断して
`LIKE ? ESCAPE '\'` により部分一致検索する。ワイルドカード文字（`%` `_` `\`）は
`escapeLikePattern()` でエスケープしてから `%pattern%` に埋め込む。

選択理由：

1. **日本語（特に短い語）でFTS5が実用にならない**。D1のFTS5は
   [FTS5 module for full-text search](https://developers.cloudflare.com/d1/sql-api/sql-statements/)
   としてサポートされているが、既定の `unicode61` トークナイザはCJKを分かち書き
   できず日本語文が1トークン化してしまう。CJK対応の `trigram` トークナイザは
   3文字未満のクエリにマッチしないという制約があり
   （[SQLite Forum: Trigram indexes for SQLite](https://sqlite.org/forum/forumpost/c230760fdf?t=c)）、
   「数学」「歴史」「英語」のような2文字の検索語・タグ名が中心の本アプリでは
   致命的に検索漏れが発生する。`Intl.Segmenter` 等でアプリ側トークナイズする
   事例もあるが（[cloudflare-d1-fts5-japanese-search-api](https://github.com/coji/zenn-content/blob/main/articles/cloudflare-d1-fts5-japanese-search-api.md)）、
   カスタムトークナイザ拡張はWorkers/D1にロードできず採用不可。
2. **プロジェクトのDB設計指針が既にLIKEを想定している**。
   `docs/instructions/shared/workflow/05.01_db-design.md` の想定クエリパターン表に
   `全文検索 | WHERE content LIKE %?% | 低頻度 | <2s | 全文検索インデックス`
   とあり、本アプリの全文検索要件は元々LIKEで賄う設計。
3. **既存Mock実装との意味論的整合**。`MockSearchRepository.searchQuizzes` は
   `toLowerCase().includes()` による部分一致であり、LIKE方式はこれと最も近い
   挙動になる（大文字小文字の扱いはASCII範囲でSQLiteのLIKEも既定で無視するため
   概ね一致する）。
4. **データ規模に対して十分な性能**。seedは21件。`docs/instructions/shared/
   workflow/05.01_db-design.md` のインデックス作成判断基準（データサイズが
   小量の場合は作成しない）に照らしても、現時点でLIKEの全表スキャンによる
   性能問題は生じない。

### Alternatives Considered

以下の代替案を検討した：

| 選択肢 | メリット | デメリット | 評価 |
|--------|----------|------------|------|
| **LIKE '%...%'** | **実装が単純・Mockと意味論が揃う・追加スキーマ不要・プロジェクトのDB設計指針と整合** | **ランキング（関連度スコア）が無い・大規模データではフルスキャンコスト増** | **★★★** |
| FTS5（trigram） | CJKでも動作する・将来的なランキング（bm25）が使える | 3文字未満のクエリにマッチしない（日本語の主要検索語が多く該当）・仮想テーブル＋同期トリガー＋マイグレーションが必要 | ★ |
| FTS5（unicode61, 既定） | 標準機能で追加実装が少ない | 日本語文を分かち書きできず実質機能しない | ☆ |
| FTS5 + カスタムトークナイザ（Intl.Segmenter等） | 日本語の適切なトークナイズが可能 | カスタムトークナイザ拡張はD1/Workersにロード不可のため実装不可能 | 対象外 |

## Consequences

### Positive

- 追加のスキーマ変更・マイグレーション・同期トリガーが不要で、issueのスコープ
  （D1リポジトリの差し替え）に実装を閉じられる
- `MockSearchRepository` とほぼ同じ検索結果になり、Mock⇔D1切り替え時の
  ユーザー体験の差異が小さい
- LIKEエスケープ（`escapeLikePattern`）はユニットテストで網羅済み
  （`SearchQueryBuilder.spec.ts`）

### Negative

- 関連度ランキング（`sortBy=relevance`）を意味のある形で実装できない
  （現状もMock同様 `created_at` にフォールバックしており、この制約を継続する）
- データ量が増えた場合、LIKEの全表スキャンは線形にコストが増える

### Neutral

- タグ絞り込み（肯定/否定, `~`プレフィックス）は `Tag.name` に対する完全一致
  （`IN` 句）であり、LIKE方式の対象外（元々FTS5化してもタグ完全一致は
  変わらない）
- `status`（承認状態）による絞り込みは本ADRのスコープ外
  （別issueとして起票予定、issue #48 PR本文に記載）

### Risks and Mitigation

| リスク | 発生確率 | 影響度 | 対策 |
|--------|----------|--------|------|
| データ量増加によるLIKE全表スキャンの性能劣化 | 中（将来） | 中 | クイズ件数が数千件規模に達した時点で、`created_at`/`status`等の等値条件へのインデックス追加、および本ADRの見直し（FTS5再検討）をトリガーとする |
| 日本語FTS5トークナイズ手法（`Intl.Segmenter`等アプリ側トークナイズ）の成熟による再評価機会の逸失 | 低 | 低 | 半期毎のADRレビュー（`00.04_adr-management.md`）で技術動向を再確認する |

## Implementation Notes

### Action Items

- [x] `SearchQueryBuilder.buildWhereClause` でLIKEエスケープを実装・テスト
- [x] `D1SearchRepository` をLIKE方式で実装
- [ ] 将来、クイズ件数が数千件規模に達した場合はFTS5（日本語対応
      トークナイズ手法の成熟状況を踏まえて）再評価する

### Timeline

- **決定日**: 2026-08-13（Proposed、指示者レビュー待ち）
- **実装開始**: 2026-08-13
- **完了予定**: issue #48 PRマージ時

## References

- [Cloudflare D1 SQL statements（FTS5サポート）](https://developers.cloudflare.com/d1/sql-api/sql-statements/)
- [D1 Support for Virtual Tables - Cloudflare Community](https://community.cloudflare.com/t/d1-support-for-virtual-tables/607277)
- [SQLite Forum: Trigram indexes for SQLite（3文字未満マッチ不可の制約）](https://sqlite.org/forum/forumpost/c230760fdf?t=c)
- [Cloudflare D1 + FTS5 日本語全文検索の実装例（Intl.Segmenterトークナイズ）](https://github.com/coji/zenn-content/blob/main/articles/cloudflare-d1-fts5-japanese-search-api.md)
- [docs/instructions/shared/workflow/05.01_db-design.md](../../instructions/shared/workflow/05.01_db-design.md)（全文検索のクエリパターン想定）
- [ADR-0019: リポジトリパターン採用決定](0019-repository-pattern-adoption.md)
- [ADR-0007: データベース選定](0007-database.md)
- issue #48: api: Search 本番 D1 接続

---

**Created**: 2026-08-13
**Last Updated**: 2026-08-13
**Authors**: Claude Code（tanacchi の指示に基づく実装）
**Reviewers**: [@tanacchi](https://github.com/tanacchi)
