# ADR-0025: 更新系エンドポイントのHTTPメソッド方針（TypeSpec/Hono実装層）

## Status

Proposed

## Context

### Background

issue #39「仕様/ADR正規化」は完了条件の一つとして「HTTPメソッド：PUT → PATCHに統一（ADR・TypeSpec・Hono handler）」を挙げていた。しかし調査の結果、`docs/project/adr/` 配下にPUT/PATCHへ言及するADRは1件も存在しなかった。issue #39の実装（PR #62）はこの食い違いを踏まえ、`docs/project/api-design/` 配下14箇所のドキュメント文言をPUT→PATCHへ統一したが、PR #62本文で「ADR配下にPUTは0件」「instructions/ とコードは据え置き」と明言し、**ADR作成とTypeSpec/Hono実装への反映を意図的にスコープ外**とした。

一方、`docs/project/api-design/design-principles.md` は最上位の設計原則として

```http
GET     /resource              # 一覧取得
POST    /resource              # 新規作成
PATCH   /resource/{id}         # リソース更新（部分更新）
DELETE  /resource/{id}         # 削除
```

を規定するに至った（PR #62でPUTの記載を削除済み）ものの、これは「更新系はPATCH」という原則の宣言に留まり、「作成」「状態遷移」に該当する操作をPATCHとPOSTのどちらで扱うかの判断基準までは示していない。

本PR（#61）は quiz-learning・user-session コンテキストを初めて TypeSpec/OpenAPI に出力する。このタイミングで、issue #39/PR #62が意図的に残した「実装層での判断基準」を確定する必要がある。

### Drivers

- `docs/instructions/shared/workflow/00.02_workflow.md:179` — 「API設計方針やエラーハンドリング戦略等の重要決定について、ADRでの記録をユーザーに提案する」
- `docs/instructions/shared/workflow/04.02_api-design.md:105-111` — HTTPメソッドの冪等性・安全性・レスポンスコード表を定義（PATCHは非冪等）
- `docs/instructions/shared/workflow/04.02_api-design.md:82-87` — 操作の複雑さに応じた名詞API/動詞APIの判断表
- `docs/project/ddd-design/2.09_bounded-context-definition/quiz-learning-context.md` — 回答提出・セッション完了のドメイン実装（`answerQuiz()`, `endSession()`）

## Decision

### Chosen Option

実装層（TypeSpec operations、および将来のHono handler）でも PUT は使わず、更新系エンドポイントは原則 **PATCH** を用いる。ただし判断基準は「リクエストモデルの形（全項目optionalかどうか）」ではなく、**操作の意味論**（新規作成か、既存リソースの部分更新か、複雑な状態遷移か）で決める。

| 判断 | 採用verb | 根拠 |
|---|---|---|
| 既存リソースの部分更新（フィールド単位の変更） | PATCH | `04.02_api-design.md:105-111` の定義に合致。冪等性は失うが、対象リクエストは元々全項目optionalで実害は小さい |
| 新規エンティティの生成（サーバー側でIDを採番） | POST（名詞API、`POST /{collection}`） | 非冪等な作成操作。`04.02_api-design.md:82-87` の判断表・`design-principles.md` の「POST=新規作成」に合致 |
| 複数ステップの業務処理・状態遷移 | POST（動詞API、`POST /{resource}/{action}`） | `04.02_api-design.md:86-87` の判断表に合致。本PRのスコープでは未着手（Neutral参照） |

### 本PRでの適用

| Endpoint | 旧 | 新 | 理由 |
|---|---|---|---|
| `PATCH /api/quiz/v1/learning/sessions/{id}` (`updateSession`) | PUT | **PATCH** | `UpdateSessionRequest = { isCompleted?: boolean }` は単一フィールドの部分更新として扱う。厳密には「セッション完了」という状態遷移的側面もあり `POST /sessions/{id}/complete` という動詞API化も検討したが（Alternatives参照）、影響範囲を本PRのスコープに閉じるため今回はPATCHのまま据え置く |
| `POST /api/quiz/v1/learning/sessions/{id}/answers` (`submitAnswer`) | PUT | **POST** | ドメイン実装 `quiz-learning-context.md` の `answerQuiz()` は `AnswerId.generate()` で新規IDを採番し `Answer.create()` でエンティティを生成する、非冪等な作成操作。PATCHは不適。レスポンスも201 Createdへ変更した |
| `PATCH /api/user/v1/accounts/{id}` (`updateUserAccount`) | PUT | **PATCH** | `UpdateUserAccountRequest = { name?, email? }` は素直な部分更新 |

### Alternatives Considered

| 選択肢 | メリット | デメリット | 評価 |
|--------|----------|------------|------|
| 全エンドポイントをPUTのまま据え置く | 変更コストゼロ | `design-principles.md` の方針（PATCH統一）およびissue #39の意図と矛盾したまま残る | ★ |
| `updateSession` を `POST /sessions/{id}/complete` に変更（動詞API化） | `docs/project/api-design/api-catalog/02-quiz-learning.md:104-106` の動詞API規定（complete/pause/resume）と完全に整合する | ルート設計・レスポンス形状の変更を伴い、pause/resume等の姉妹エンドポイント実装が前提になるためスコープが本PRを超える | ★★ |
| **`updateSession` はPATCHのまま維持し、判断基準のみ本ADRで明文化** | 変更を最小化しつつ判断基準を明文化。将来pause/resumeを追加する際の設計指針として機能する | 「複雑な状態遷移」的操作が形式上PATCHに紛れる点は残る（Negative参照） | ★★★ |

## Consequences

### Positive

- TypeSpec全体でPUTが0件になり、`design-principles.md` の方針と実装が整合する
- verb選定基準（意味論ベース、モデルの形だけで判断しない）が明文化され、今後 quiz-management 以外のコンテキストを実装する際の指針になる
- `submitAnswer` が正しく201 Createdを返すようになり、`04.02_api-design.md:108` のPOSTレスポンス規定（201, 400, 409）とも整合する

### Negative

- `04.02_api-design.md:110` はPATCHを非冪等と定義しており、PUT→PATCHは形式上冪等性を失う。ただし対象の2エンドポイント（`updateSession`, `updateUserAccount`）は元々リクエストモデルが全項目optionalであり、実害はない
- `updateSession` は意味論上「状態遷移」の性質も持つが、今回はPATCHのまま据え置いた。将来 pause/resume を実装する際に再設計が必要になる可能性がある（Neutral参照）

### Neutral

- `updateSession` の動詞API化（`POST /sessions/{id}/complete`、および `pause`/`resume`）は将来のスコープとして残す。実装する場合は本ADRをSupersedeする新ADRを起票する
- 他のcreate系エンドポイント（`createQuiz`, `startSession`, `createDeck`, `createUserAccount` 等）は現状すべて200を返しており、201への統一は本ADRのスコープ外（別issueで扱う）

### Risks and Mitigation

| リスク | 発生確率 | 影響度 | 対策 |
|--------|----------|--------|------|
| 将来 quiz-management 以外のコンテキストで再び「モデルの形」だけでverbを判断してしまう | 中 | 中 | 本ADRの判断基準表をレビュー観点として `docs/instructions/shared/workflow/04.02_api-design.md` からも参照させる |

## Implementation Notes

### Action Items

- [x] `api/spec/operations/quiz-learning.tsp`: `updateSession` を `@patch(#{ implicitOptionality: false })`、`submitAnswer` を `@post`（201 Created）に変更
- [x] `api/spec/operations/user-session.tsp`: `updateUserAccount` を `@patch(#{ implicitOptionality: false })` に変更
- [ ] 将来: `updateSession` の動詞API化（`complete`/`pause`/`resume`）を実装する場合は本ADRをSupersedeする新ADRを起票する
- [ ] 将来: create系エンドポイントの201統一を別issueで検討する

## References

- issue #39, #40
- PR #61, #62
- `docs/project/api-design/design-principles.md`
- `docs/instructions/shared/workflow/04.02_api-design.md`
- `docs/project/api-design/api-catalog/02-quiz-learning.md`
- `docs/project/ddd-design/2.09_bounded-context-definition/quiz-learning-context.md`
- ADR-0022（TypeSpecスキーマファースト開発方針）

---

**Created**: 2026-08-12
**Last Updated**: 2026-08-12
**Authors**: Claude (Opus 5, background session)
**Reviewers**: [@tanacchi](https://github.com/tanacchi)
