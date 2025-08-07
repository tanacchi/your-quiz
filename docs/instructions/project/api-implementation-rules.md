# API実装ルール（Your Quiz プロジェクト）

## 概要

Your QuizプロジェクトにおけるAPI実装の標準ルールを定義します。TypeScript + Hono + neverthrow + TypeSpecを組み合わせた型安全で保守性の高い実装を目標とします。

## 必須技術スタック

### 確定採用ライブラリ

| ライブラリ | バージョン | 用途 | 必須理由 |
|-----------|-----------|------|----------|
| `hono` | `^4.8.10` | APIフレームワーク | Cloudflare Workers最適化、TypeScript First |
| `neverthrow` | `^8.2.0` | エラーハンドリング | 型安全な関数型エラーハンドリング |
| `zod` | `^4.0.14` | バリデーション | TypeScript統合、ランタイム型検証 |
| `typescript` | `^5.9.2` | 言語 | 型安全性の確保 |

### 型生成・スキーマ管理

| ツール | バージョン | 用途 |
|--------|-----------|------|
| `openapi-typescript` | latest | TypeSpec → TypeScript型生成 |
| TypeSpec | latest | スキーマファースト開発 |

## 実装パターン

### 1. スキーマファースト開発

**必須**: すべてのAPIはTypeSpecでスキーマ定義してから実装する

```typescript
// ✅ 正しいパターン: TypeSpec由来の型との整合性確保
const createQuizSchema = z.object({
  question: z.string(),
  answerType: z.enum(["boolean", "free_text", "single_choice", "multiple_choice"]),
}) satisfies z.ZodType<components["schemas"]["CreateQuizRequest"]>;

// ❌ 禁止パターン: TypeSpecとの整合性がない独自スキーマ
const createQuizSchema = z.object({
  title: z.string(), // TypeSpecと異なるフィールド名
});
```

### 2. エラーハンドリング（必須）

**必須**: neverthrowのResult型を使用、try-catch文は禁止

```typescript
// ✅ 正しいパターン: neverthrow使用
const parseJsonSafe = async (request: { json(): Promise<unknown> }): Promise<Result<unknown, string>> => {
  try {
    const json = await request.json();
    return ok(json);
  } catch {
    return err("INVALID_JSON");
  }
};

// ❌ 禁止パターン: 裸のtry-catch使用
const parseJson = async (request: any) => {
  try {
    return await request.json();
  } catch (error) {
    throw new Error("Invalid JSON");
  }
};
```

### 3. バリデーション

**必須**: Zodスキーマでの二段階バリデーション

```typescript
// ✅ 正しいパターン: JSONパース → Zodバリデーション
const createQuizHandler = async (c: AppContext) => {
  const jsonResult = await parseJsonSafe(c.req);
  
  if (jsonResult.isErr()) {
    return c.json(
      {
        message: "Invalid JSON in request body",
        code: jsonResult.error,
      } as components["schemas"]["ErrorResponse"],
      400,
    );
  }

  const validationResult = validateWithZod(createQuizSchema, jsonResult.value);
  
  if (validationResult.isErr()) {
    return c.json(
      {
        message: "Invalid request body format",
        code: validationResult.error,
      } as components["schemas"]["ErrorResponse"],
      400,
    );
  }

  const body = validationResult.value;
  // ... business logic
};
```

### 4. 型アサーション

**制限**: `as any`は禁止、必要最小限の型アサーションのみ許可

```typescript
// ✅ 許可パターン: TypeScript生成型へのアサーション
return c.json(
  {
    message: "ID is required",
    code: "MISSING_ID",
  } as components["schemas"]["ErrorResponse"],
  400,
);

// ❌ 禁止パターン: as any使用
const data = response as any;
```

### 5. ハンドラー実装パターン

**必須**: 以下の構造に従った実装

```typescript
const [操作名]Handler = async (c: AppContext) => {
  // 1. パラメータ取得・検証
  const param = c.req.param("id");
  if (!param) {
    return c.json(errorResponse, 400);
  }

  // 2. リクエストボディ取得・検証（POST/PUTのみ）
  const jsonResult = await parseJsonSafe(c.req);
  if (jsonResult.isErr()) {
    return c.json(errorResponse, 400);
  }

  const validationResult = validateWithZod(schema, jsonResult.value);
  if (validationResult.isErr()) {
    return c.json(errorResponse, 400);
  }

  // 3. ビジネスロジック実行
  const result = await businessLogic(validationResult.value);

  // 4. レスポンス返却
  return c.json(result);
};
```

## ヘルパー関数（必須）

### JSONパース用ヘルパー

```typescript
const parseJsonSafe = async (request: { json(): Promise<unknown> }): Promise<Result<unknown, string>> => {
  try {
    const json = await request.json();
    return ok(json);
  } catch {
    return err("INVALID_JSON");
  }
};
```

### Zodバリデーション用ヘルパー

```typescript
const validateWithZod = <T>(
  schema: z.ZodSchema<T>,
  data: unknown,
): Result<T, string> => {
  const result = schema.safeParse(data);
  return result.success ? ok(result.data) : err("VALIDATION_ERROR");
};
```

## レスポンス形式

### 成功レスポンス

```typescript
// ✅ TypeSpec由来の型を使用
const quiz: components["schemas"]["Quiz"] = {
  id: Date.now().toString(),
  question: body.question,
  answerType: body.answerType,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

return c.json(quiz);
```

### エラーレスポンス

```typescript
// ✅ 統一されたErrorResponse形式
return c.json(
  {
    message: "Validation failed",
    code: "VALIDATION_ERROR",
  } as components["schemas"]["ErrorResponse"],
  400,
);
```

## 禁止事項

### 1. 型安全性を損なうパターン

```typescript
// ❌ 禁止: as any使用
const data = response as any;

// ❌ 禁止: 型チェック回避
// @ts-ignore
const result = unknownData.property;
```

### 2. 非推奨ライブラリの使用

```typescript
// ❌ 禁止: Chanfana（型制約の問題で除外済み）
import { OpenAPIRoute } from "chanfana";

// ❌ 禁止: 非neverthrowエラーハンドリング
throw new Error("Something went wrong");
```

### 3. 非標準的な実装パターン

```typescript
// ❌ 禁止: 直接的なエラー投げ
if (!data) {
  throw new Error("Invalid data");
}

// ❌ 禁止: TypeSpecとの不整合
const customSchema = z.object({
  customField: z.string(),
}); // TypeSpecに定義されていないスキーマ
```

## Cloudflare Workers固有の考慮事項

### 1. Context型の使用

```typescript
type AppContext = Context<{ Bindings: CloudflareBindings }>;
type CloudflareBindings = Record<string, unknown>;

const app = new Hono<{ Bindings: CloudflareBindings }>();
```

### 2. D1 Database統合準備

```typescript
// 将来のD1統合に備えた型定義
type CloudflareBindings = {
  DB: D1Database;
  // その他のバインディング
};
```

## 実装チェックリスト

開発時に以下を確認すること：

- [ ] TypeSpecスキーマが定義されている
- [ ] Zodスキーマが`satisfies`で型制約されている  
- [ ] neverthrowのResult型でエラーハンドリングしている
- [ ] `as any`を使用していない
- [ ] 統一されたErrorResponse形式を使用している
- [ ] ヘルパー関数を適切に再利用している
- [ ] TypeScript型チェックが通る
- [ ] 適切なHTTPステータスコードを返している

## 参考実装

現在の `api/src/index.ts` が標準実装パターンのリファレンスです。新しいエンドポイント実装時はこのファイルのパターンを参考にしてください。