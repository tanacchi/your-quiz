# ADR-0026: Anonymous User Identification Strategy

## Status

Proposed

## Context

### Background

QuizPocket はログイン不要（OAuth/JWT はスコープ外）が前提のクイズアプリケーションであり、「誰がこのクイズを作ったか」「誰の学習セッションか」を識別する基盤が API 側に存在しない。DB には `UserIdentity(anonymous_id UNIQUE)` が既に切られているが、そこへ値を書き込む経路がなく、`api/src/contexts/` にも `quiz-management` と `search` しかコンテキストが存在しない。`app.use(...)` の呼び出しもゼロで、Hono ミドルウェアの前例がない。

issue #44（Epic #60 / Phase 0）はこの空白を埋め、匿名識別子を Hono ミドルウェアで全リクエストに供給し、後続の quiz 作成・学習セッション実装が `c.var` から所有者を取得できるようにすることを目的とする。

調査の過程で、匿名識別子の呼称・フォーマットがドキュメント間で三重に食い違っていることが判明した。

| 出典 | 名前 | フォーマット |
| --- | --- | --- |
| issue #44 | `userFingerprint` / `creatorFingerprint` | UUID |
| `api/spec/models/user.tsp`・`api/spec/database.dbml` | `anonymousId` / `anonymous_id` | varchar(255) |
| `docs/project/api-design/api-catalog/01-quiz-management.md` | `creatorFingerprint` | 例値は `df_...` プレフィックス、パラメータ表は「36文字UUID」と自己矛盾 |
| `docs/project/ddd-design/2.03_ubiquitous-language/ubiquitous-language-dictionary.md` | `CreatorIdentification` | ブラウザ特性由来の salt 付きハッシュ |

さらに `api/spec/operations/user-session.tsp` は匿名ユーザーをミドルウェアではなく明示エンドポイント（`POST /api/user/v1/identities` 等、`deviceFingerprint` を body で受け取り `sessionToken` を返す）として設計しているが、`api/spec/main.tsp:12` で `import` がコメントアウトされており型生成対象外、実装もゼロの状態である。

### Drivers

- ログイン不要という製品要件を維持したまま、全 API リクエストから「誰か」を透過的に識別できること
- issue #44 の完了条件（`c.var.userFingerprint`、Cookie/ヘッダからの抽出、未設定時の UUID 生成、`UserAccount`/`UserIdentity` との連携）を満たすこと
- 既存のヘキサゴナルアーキテクチャ（`contexts/<bc>/{domain,application,infrastructure,presentation}`）と `neverthrow` によるエラーハンドリング規約に整合すること
- 全リクエストで D1 に往復すると `/health` のような軽量エンドポイントまで DB 依存になり、パフォーマンスと疎結合性を損なう

## Decision

### Chosen Option

**Cookie（`quiz_fingerprint`）+ UUID v4 + Hono ミドルウェア。永続化は遅延解決。**

- ミドルウェアは Authorization ヘッダ（`Fingerprint <uuid>`）> Cookie > 新規生成 の優先順位で `userFingerprint`（UUID v4 文字列）を決定し、`c.var.userFingerprint` にセットする
- 名称は issue #44 の記述どおり `userFingerprint` を正式採用する。DB 側の `anonymous_id` へマップする対応関係は本 ADR で明文化するが、docs 全体の用語（`anonymousId` / `deviceFingerprint` / `creatorFingerprint` / `CreatorIdentification`）統一は別 issue に切り出し、本 PR のスコープ外とする
- D1 の `UserIdentity` への永続化はミドルウェアが直接行わず、`c.var.resolveUserIdentity(): ResultAsync<UserIdentity, RepositoryError>` という関数を注入する形で遅延解決する。UserIdentity を必要とする handler（quiz 作成など）だけが呼び出し、D1 アクセスが発生しない `/health` 等のエンドポイントは影響を受けない
- `api/spec/operations/user-session.tsp` の明示エンドポイント設計とは独立した経路として位置づける。将来 OAuth/JWT やクライアント主導のセッション管理（`sessionToken` 発行）を実装する際は、本 ADR のミドルウェアを土台にするか、置き換えるかを別途判断する

選択理由：

1. **透過性**: Cookie ベースなら全 API リクエストで自動的に識別子が付与され、フロントエンドが明示的にセッション初期化 API を呼ぶ必要がない
2. **実装コスト最小**: 新規 DB カラムやマイグレーションが不要（`anonymous_id varchar(255) UNIQUE` に UUID v4 はそのまま収まる）
3. **段階的な負荷制御**: 遅延解決により、識別子の発行と DB 永続化を分離し、無駄な D1 アクセスを避けられる

### Alternatives Considered

以下の代替案を検討した：

| 選択肢 | メリット | デメリット | 評価 |
|--------|----------|------------|------|
| `POST /identities` 明示エンドポイントのみ（`user-session.tsp` 現行案） | クライアントが能動的にセッションを確立でき、`sessionToken` による検証が可能 | 全クライアントが初回に明示呼び出しを実装する必要があり、実装漏れで匿名識別ができないリクエストが発生しうる。TypeSpec 側も未実装 | ★★ |
| ブラウザ特性ベースの salt 付きハッシュ（ユビキタス言語辞書案） | Cookie ブロック環境でも再識別できる可能性 | 実質的にデバイスフィンガープリンティングであり、プライバシー上の説明責任が重い。ハッシュ衝突・偽装のリスクもある | ★ |
| **Cookie + UUID v4 ミドルウェア（採用）+ 遅延解決** | **全 API で透過的に識別でき、実装が最小。D1 アクセスを必要な handler だけに限定できる** | **Cookie が使えない/削除される環境では毎回新規 ID が発行され、作成者の連続性が失われる** | **★★★** |
| ミドルウェアで即時 find-or-create（毎リクエスト D1 アクセス） | UserIdentity の存在をミドルウェア層で保証できる | 全リクエスト（`/health` 含む）が D1 に依存し、レイテンシと結合度が増す | ★★ |

## Consequences

### Positive

- 後続の quiz 作成・学習セッション実装が `c.var.userFingerprint` / `c.var.resolveUserIdentity()` を参照するだけで匿名ユーザーを扱えるようになる
- D1 マイグレーションなしで既存スキーマ（`UserIdentity.anonymous_id`）をそのまま活用できる
- ミドルウェアが Hono 依存の薄いアダプタに閉じるため、将来 OAuth/JWT を追加する際も `contexts/user-session` のリポジトリ層はそのまま再利用できる

### Negative

- Cookie ブロック・シークレットブラウジング等では識別子が永続化されず、リクエストごとに新規 UUID が発行される劣化が発生する（許容する）
- `userFingerprint` という名称は DB カラム名 `anonymous_id` と一致しないため、コードを読む際に対応関係を都度意識する必要がある

### Neutral

- `api/spec/operations/user-session.tsp` の明示エンドポイント設計は当面未実装のまま残る。将来実装する場合は本 ADR のミドルウェアとの関係（併用か置き換えか）を別 ADR で判断する
- Authorization ヘッダのスキームは独自の `Fingerprint <uuid>` とし、将来の JWT 用 `Bearer` と衝突しないようにする

### Risks and Mitigation

| リスク | 発生確率 | 影響度 | 対策 |
|--------|----------|--------|------|
| docs 間の用語不整合が実装にも波及する | 中 | 中 | 本 ADR で `userFingerprint` を正式名称と定め、用語統一 issue を別途起票する |
| Cookie ブロック環境での識別子非永続化 | 中 | 低 | 現時点では許容。将来 Authorization ヘッダ経由のクライアント実装を案内する |
| `resolveUserIdentity` の遅延解決を呼び忘れ、UserIdentity 未作成のまま処理が進む | 低 | 中 | quiz 作成等の handler 実装時にレビューで確認する。型シグネチャで戻り値が `ResultAsync` であることを明示し、無視しにくくする |

## Implementation Notes

### Action Items

- [ ] `api/src/shared/types/context.ts` に `AppVariables` / `AppEnv` を追加
- [ ] `api/src/shared/schemas/user-identity.schema.ts` に UUID v4 検証・`UserIdentity` 型を追加
- [ ] `api/src/middleware/anonymousSession.ts` を実装（Cookie/Authorization 抽出、`createMiddleware<AppEnv>()`）
- [ ] `api/src/index.ts` にミドルウェアを登録
- [ ] `api/tests/features/anonymous-session.spec.ts` に BDD シナリオを追加
- [ ] `api/src/contexts/user-session/` に `IUserIdentityRepository` / `D1UserIdentityRepository` / `MockUserIdentityRepository` を実装（後続 PR）
- [ ] `resolveUserIdentity` の遅延解決・メモ化をミドルウェアに追加（後続 PR）
- [ ] 用語統一 issue を起票

### Timeline

- **決定日**: 2026-08-11
- **実装開始**: 2026-08-11
- **完了予定**: 未定（PR レビュー後に確定）

## References

- [issue #44](https://github.com/tanacchi/your-quiz/issues/44)
- [Epic #60](https://github.com/tanacchi/your-quiz/issues/60)
- [ADR-0018: Domain Service Extraction](0018-domain-service-extraction.md)（`AnonymousUserIdentificationService` を定義）
- [ADR-0019: Repository Pattern Adoption](0019-repository-pattern-adoption.md)（`UserSessionRepository` を定義）
- `api/spec/operations/user-session.tsp`
- `docs/project/api-design/api-catalog/03-user-session.md`

---

**Created**: 2026-08-11
**Last Updated**: 2026-08-11
**Authors**: 開発チーム（Claude Code 実装補助）
**Reviewers**: [@tanacchi](https://github.com/tanacchi)
