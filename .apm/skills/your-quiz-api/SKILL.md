---
name: your-quiz-api
description: Provides Your Quiz-specific API knowledge for backend implementation. Activate when designing or implementing API endpoints, writing Hono route handlers, handling errors with neverthrow Result types, validating requests with Zod, working with TypeSpec schemas, or looking up the API catalog. Contains the API catalog (8 contexts, 80+ endpoints), Hono/neverthrow/Zod/Cloudflare Workers implementation rules, and prohibited patterns specific to this project.
license: MIT
metadata:
  author: personal
  version: "0.1.0"
compatibility: Requires access to docs/project/api-design/ and docs/instructions/project/ in this repository.
---

# Your Quiz API 知識

## 利用タイミング

- API エンドポイントを設計・実装するとき（高頻度）
- Hono ルートハンドラを書くとき
- neverthrow の Result 型でエラーハンドリングするとき
- Zod スキーマでリクエストバリデーションをするとき
- TypeSpec スキーマとの整合性を確認するとき
- API catalog（エンドポイント一覧）を参照するとき

## 確認する入力

- 対象コンテキスト（quiz-management / quiz-learning / user-session / offline-sync）
- 操作種別（CRUD / コマンド / クエリ / Pub-Sub）
- 既存 TypeSpec スキーマの参照の有無

## Workflow

1. **API catalog** で対象コンテキストのエンドポイントを確認（`docs/project/api-design/api-catalog/`）
2. **設計原則** を確認（`docs/project/api-design/design-principles.md`）
3. **実装ルール** に沿ってハンドラを実装（`references/hono-neverthrow-zod-implementation.md`）
4. TypeSpec スキーマと整合性を確認してから実装する
5. neverthrow Result 型でエラーパスをすべて網羅する
6. Zod で二段階バリデーション（JSON パース → スキーマ検証）を実施する

## 必須技術スタック

| ライブラリ | バージョン | 役割 |
|-----------|-----------|------|
| `hono` | `^4.8.10` | API フレームワーク（Cloudflare Workers 最適化）|
| `neverthrow` | `^8.2.0` | エラーハンドリング（Result 型）|
| `zod` | `^4.0.14` | バリデーション（TypeScript 統合）|
| TypeSpec | latest | スキーマファースト定義（API 先行設計）|
| `openapi-typescript` | latest | TypeSpec → TypeScript 型生成 |

## 禁止パターン

- `as any` の使用 → `as components["schemas"]["Xxx"]` のみ許可
- 裸の `try-catch` → neverthrow の `Result` 型を使う
- TypeSpec と整合しない独自スキーマ定義
- 型なし `new Hono()` → `new Hono<{ Bindings: CloudflareBindings }>()` 必須

## ハンドラ実装パターン（骨格）

```typescript
// JSONパース → Zodバリデーション → ビジネスロジック → レスポンス
const handler = async (c: AppContext) => {
  const jsonResult = await parseJsonSafe(c.req);
  if (jsonResult.isErr())
    return c.json({ message: "Invalid JSON", code: jsonResult.error } as ErrorResponse, 400);

  const validated = validateWithZod(schema, jsonResult.value);
  if (validated.isErr())
    return c.json({ message: "Invalid body", code: validated.error } as ErrorResponse, 400);

  const result = await domainService.execute(validated.value);
  return result.match(
    (data) => c.json(data, 200),
    (err) => c.json({ message: err.message, code: err.code } as ErrorResponse, 500),
  );
};
```

## API catalog 索引

詳細はすべて `docs/project/api-design/api-catalog/` を参照すること。

| ファイル | コンテキスト | 主な操作 |
|---------|------------|---------|
| [01-quiz-management.md](docs/project/api-design/api-catalog/01-quiz-management.md) | Quiz Management | CRUD・承認フロー |
| [02-quiz-learning.md](docs/project/api-design/api-catalog/02-quiz-learning.md) | Quiz Learning | Deck・セッション・回答 |
| [03-user-session.md](docs/project/api-design/api-catalog/03-user-session.md) | User Session | 匿名認証・デバイス識別 |
| [04-offline-sync.md](docs/project/api-design/api-catalog/04-offline-sync.md) | Offline Sync | 同期・競合解決 |
| [05-search-discovery.md](docs/project/api-design/api-catalog/05-search-discovery.md) | Search | クイズ検索・発見 |
| [06-integration-patterns.md](docs/project/api-design/api-catalog/06-integration-patterns.md) | Integration | Pub/Sub・WebSocket |
| [07-common-specs.md](docs/project/api-design/api-catalog/07-common-specs.md) | Common | 共通エラー・認証 |
| [08-operations.md](docs/project/api-design/api-catalog/08-operations.md) | Operations | ヘルスチェック等 |

- [API 設計 README](docs/project/api-design/README.md): 主要フロー（クイズ回答 / 作成 / 検索）
- [非機能要件](docs/project/api-design/non-functional-requirements.md): 95%ile ≤ 100ms、同時接続 1000

## 出力形式

- TypeScript コード（Hono + neverthrow + Zod パターン）
- 型アサーションは `components["schemas"]["Xxx"]` 形式を使用
- エラーレスポンスは `ErrorResponse` スキーマに統一

## ガードレール

- `docs/project/api-design/**` は変更しない（source of truth）
- TypeSpec スキーマを先に確認してからハンドラを書く
- 実装サンプルは `docs/instructions/project/api-implementation-samples.md` を参照
- 汎用 API 設計の method は `api-contract-design` skill、汎用実装 method は `implementation-guide` skill を参照

## 評価シナリオ

1. 「クイズ一覧を返す API を実装して」→ 02-quiz-learning.md を参照 → ハンドラ実装
2. 「neverthrow でエラーを返す方法は？」→ references/hono-neverthrow-zod-implementation.md を参照
3. 「新しいエンドポイントを API catalog に追加したい」→ `api-contract-design` skill（汎用 method）を先に呼ぶ
4. 「Pub/Sub 連携の設計は？」→ 06-integration-patterns.md と pub-sub-integration.md を参照

## 関連リファレンス

- [references/api-catalog-overview.md](references/api-catalog-overview.md) — カタログ全体サマリー
- [references/hono-neverthrow-zod-implementation.md](references/hono-neverthrow-zod-implementation.md) — 実装パターン詳細
- 原典: `docs/instructions/project/api-implementation-rules.md`
- 原典: `docs/instructions/project/api-libraries-guide.md`
- 原典: `docs/instructions/project/api-implementation-samples.md`
- 関連 skill（汎用 method 層）: `api-contract-design`, `implementation-guide`
- 関連 skill（project 事実層）: `your-quiz-domain`（ドメインモデルと API の橋渡し）
