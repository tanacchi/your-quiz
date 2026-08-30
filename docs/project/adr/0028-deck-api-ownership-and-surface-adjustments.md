# ADR-0028: quiz-learning Deck API の所有者解決とAPIサーフェス調整

## Status

Proposed

## Context

### Background

issue #47（Epic #60）は空の `quiz-learning` コンテキストに Deck（問題集）集約を 4 層 DDD で実装することを求めている。完了条件には `PATCH /decks/:id` と `GET /decks`（一覧）が挙げられているが、調査の結果、以下のギャップが判明した。

1. `api/spec/operations/quiz-learning.tsp` の Deck 関連 operation は `createDeck` / `createDeckFromSearch` / `createDeckFromWrongAnswers` / `getDeck` / `getMyDecks` / `deleteDeck` の6本のみで、`updateDeck`（PATCH）が定義されていない。ADR-0025 が定めた PATCH 統一（PR #61）は quiz-management・quiz-learning の sessions・user-session のみを対象とし、Deck は対象外だった。
2. 汎用の `GET /decks`（一覧）は TypeSpec にも API カタログ（`docs/project/api-design/api-catalog/02-quiz-learning.md`）にも存在しない。存在するのは `GET /decks/mine`（`@query userId: UserId` 必須）のみ。
3. `getMyDecks` の `userId` クエリと `createDeckFromWrongAnswers` の `userId` ボディは、任意の `UserId` を指定すれば他人の Deck 一覧・間違い問題を取得できてしまう設計になっている。一方 ADR-0026（issue #44 / PR #63）により `anonymousSession` ミドルウェアが全リクエストに `c.var.userFingerprint` を供給する基盤が既に存在する。
4. `Deck.creator_id` は D1 上 `INTEGER FK → UserIdentity.id` だが、`userFingerprint` は `UserIdentity.anonymous_id`（UUID文字列）であり、両者を橋渡しする解決処理（ADR-0026 が `resolveUserIdentity` として「後続実装」に位置づけたもの）がまだ存在しない。
5. `DeckListResponse` は `PaginationResponse<DeckWithQuizzes>` で定義されており、一覧1件ごとに紐づく全問題（`QuizResponse[]`、各Deck最大100件・`maxQuizzes`のデフォルト）を丸ごと埋め込む形になっている。

### Drivers

- ADR-0026 が確立した「`userFingerprint` を匿名ユーザーの識別子の正とする」方針との整合性
- `docs/instructions/shared/workflow/00.02_workflow.md` が求める、API設計方針の重要決定に関するADR記録
- N+1的な巨大レスポンスを避け、一覧取得のレイテンシとペイロードサイズを抑える必要性
- issue #47 のスコープを「Deck管理」に閉じ、Session/Answer（次issue）や user-session コンテキストのフル実装（issue #44 後続分）まで広げないこと

## Decision

### Chosen Option

**(1) `updateDeck`（PATCH）をADR-0025の判断基準に従い新規追加する。(2) `userId`パラメータを撤廃し`userFingerprint`を所有者の唯一の正とする。(3) 汎用`GET /decks`は新設せず`GET /decks/mine`で代替する。(4) `resolveUserIdentity`を独立したポート（`IUserIdentityResolver`）として実装し、Deckのuse-caseから直接注入する。(5) `DeckListResponse`を`PaginationResponse<Deck>`に軽量化する。**

#### (1) updateDeck の追加

`UpdateDeckRequest { name?; description?; quizIds?; }` を `deck.tsp` に追加し、`@patch(#{ implicitOptionality: false })` で `updateDeck` を定義する。ADR-0025 の判断基準表「既存リソースの部分更新（フィールド単位の変更）→PATCH」に合致する。

#### (2)(3) userId撤廃・GET /decks/mine で一覧要件を満たす

`getMyDecks` の `@query userId: UserId` と `createDeckFromWrongAnswers` の body `userId: UserId` を削除し、両ハンドラーは常に `c.var.userFingerprint` から解決した所有者IDを使う。任意の他人のDeckを覗ける設計上の穴を構造的に防ぐ。汎用一覧 `GET /decks` は、匿名ユーザー前提のアプリで他人のDeckを全件列挙する用途が想定しにくいため新設せず、「一覧」要件は `GET /decks/mine` で満たしたものとする。

#### (4) resolveUserIdentity の実装方針

ADR-0026 は `c.var.resolveUserIdentity()` をミドルウェアが注入する形を将来像として示唆していたが、本PRでは **ミドルウェア（`api/src/middleware/anonymousSession.ts`）自体は変更せず**、独立したポートとして実装する。

- `api/src/shared/identity/IUserIdentityResolver.ts`: `resolve(anonymousId: string): ResultAsync<string, RepositoryError>`（戻り値は `UserIdentity.id` の文字列化）
- `api/src/infrastructure/identity/D1UserIdentityResolver.ts`: `SELECT id FROM UserIdentity WHERE anonymous_id = ?`、無ければ `INSERT` して `last_row_id` を採番
- `api/src/infrastructure/identity/MockUserIdentityResolver.ts`: fingerprintをそのまま識別子として返す（モック環境はINTEGER FK制約を持たないため）
- `api/src/infrastructure/identity/UserIdentityResolverFactory.ts`: `QuizRepositoryFactory.shouldUseMock()` を再利用しD1/Mockを切替

理由: 本PRの並行作業（issue #46: quiz-management PATCH実装、issue #48: Search D1接続）が `anonymousSession.ts` や `user-session` コンテキストに触れる可能性があり、ミドルウェア自体の変更は衝突リスクを高める。ポートとして独立させることで、issue #47 のスコープ（Deck管理）に変更を閉じつつ、ADR-0026 が示した「D1アクセスは必要なhandlerだけに限定する」という遅延解決の精神は維持する。将来 `user-session` コンテキストが本格実装される際（ADR-0026 Action Items）、この `IUserIdentityResolver` を `contexts/user-session/domain/repositories/` 配下に昇格・統合するか、ミドルウェア注入方式に置き換えるかを別途判断する。

#### (5) DeckListResponse の軽量化

`DeckListResponse` を `PaginationResponse<Deck>` に変更する。詳細（紐づく問題本体）は `GET /decks/{id}`（`DeckWithQuizzes`）で個別に取得する設計とする。

### Alternatives Considered

| 選択肢 | メリット | デメリット | 評価 |
|--------|----------|------------|------|
| `userId` パラメータをTypeSpec通り維持 | 生成型と完全一致、変更が最小 | 誰でも他人のDeck一覧・間違い問題を取得できる設計上の欠陥が残る | ★ |
| 汎用 `GET /decks` を新設（全ユーザー横断一覧） | issue本文の文言に最も忠実 | 匿名ユーザー前提のアプリで「他人のDeckを全件列挙する」用途が不明瞭。権限設計も要検討になりスコープが拡大する | ★★ |
| `resolveUserIdentity` をミドルウェア注入方式（ADR-0026当初案）で実装 | ADR-0026の将来像と完全に一致、`c.var`から直接呼べる | `anonymousSession.ts`本体の変更が必要になり、並行issue（#44後続, #46, #48）との衝突リスクが増す | ★★ |
| **独立ポート`IUserIdentityResolver`として実装（採用）** | **既存の`QuizRepositoryFactory`パターンと一貫、ミドルウェアに触れず衝突リスクを最小化、将来の昇格も容易** | **将来ミドルウェア注入方式に統合する場合は追加の移行作業が発生する** | **★★★** |
| `DeckListResponse` を `DeckWithQuizzes` のまま維持 | TypeSpec変更が不要 | 一覧20件で数百問分の`QuizResponse`が乗る巨大レスポンス、N+1的なD1アクセスが発生する | ★ |

## Consequences

### Positive

- Deck の所有者確認が構造的に `userFingerprint` 一本化され、他人のDeckを覗ける穴がなくなる
- `PATCH /decks/:id` が issue #47 の完了条件を満たす
- `resolveUserIdentity` が独立ポートとして実装され、将来 issue #46（quiz-management の creatorId 解決）等でも再利用可能になる
- `DeckListResponse` の軽量化により一覧取得のレイテンシとペイロードサイズが抑えられる

### Negative

- TypeSpec の `CreateDeckFromSearchRequest`・API カタログドキュメントとの間に既存の乖離（`creatorFingerprint`必須 vs 実際は本文パラメータなし）が残る。本PRでは`userFingerprint`をミドルウェア経由で扱うため実害はないが、API カタログドキュメントの更新は本ADRのスコープ外とする
- `resolveUserIdentity` をミドルウェア注入方式にしなかったことで、ADR-0026の元々の設計（Action Items）から一部逸脱する。将来の統合作業が別途必要になる

### Neutral

- Session/Answer（`startSession`等）は本PRの対象外のまま。TypeSpec上は既に定義されているが、Honoハンドラーは未実装のまま残る
- `createDeckFromSearch` は既存 `search` コンテキストの `SearchQuizzesUseCase`（Mock実装、issue #48で D1 化予定）をそのまま注入・再利用する

### Risks and Mitigation

| リスク | 発生確率 | 影響度 | 対策 |
|--------|----------|--------|------|
| `IUserIdentityResolver` と将来の `user-session` コンテキスト実装が重複・分岐する | 中 | 低 | 本ADRのNegativeに明記し、issue #44後続タスクのレビュー時に統合判断を促す |
| API カタログドキュメント（`02-quiz-learning.md`）が本ADRの変更を反映せず古いまま残る | 高 | 低 | 別issueでのドキュメント整合タスクとして起票を推奨（本PRのスコープ外） |

## Implementation Notes

### Action Items

- [x] `api/spec/models/deck.tsp`: `UpdateDeckRequest` 追加、`DeckListResponse` を `PaginationResponse<Deck>` に変更
- [x] `api/spec/operations/quiz-learning.tsp`: `updateDeck` 追加、`getMyDecks`/`createDeckFromWrongAnswers` から `userId` 削除
- [ ] `api/src/shared/identity/IUserIdentityResolver.ts` ＋ D1/Mock実装 ＋ Factory
- [ ] `api/src/contexts/quiz-learning/` 4層実装（domain/application/infrastructure/presentation）
- [ ] `api/src/index.ts` に `learningRoutes` を配線
- [ ] BDDテスト（`api/tests/features/deck-management.spec.ts`）

### Timeline

- **決定日**: 2026-08-13
- **実装開始**: 2026-08-13
- **完了予定**: 本PR内

## References

- issue #47, #44, #46, #48
- Epic #60
- ADR-0025（更新系エンドポイントのHTTPメソッド方針）
- ADR-0026（匿名ユーザー識別方式選定）
- ADR-0019（リポジトリパターン採用決定）
- `docs/project/api-design/api-catalog/02-quiz-learning.md`

---

**Created**: 2026-08-13
**Last Updated**: 2026-08-13
**Authors**: Claude (Opus 5, background session)
**Reviewers**: [@tanacchi](https://github.com/tanacchi)
