# Hono + neverthrow + Zod 実装パターン

Your Quiz API の実装パターン集。詳細な使用ガイドは `docs/instructions/project/api-libraries-guide.md`、
実装ルールは `docs/instructions/project/api-implementation-rules.md`、
サンプルコードは `docs/instructions/project/api-implementation-samples.md` を参照すること。

## Hono セットアップ

```typescript
import { Hono, type Context } from "hono";

// 必須: CloudflareBindings 型を付与する
const app = new Hono<{ Bindings: CloudflareBindings }>();
type AppContext = Context<{ Bindings: CloudflareBindings }>;

// ❌ 禁止: 型なし使用
// const app = new Hono();
```

## neverthrow — Result 型

```typescript
import { Result, ok, err } from "neverthrow";

// Result 型の基本パターン
type ApiResult<T> = Result<T, string>;

// ✅ 非同期処理
const fetchData = async (): Promise<Result<Data, string>> => {
  try {
    const data = await externalApiCall();
    return ok(data);
  } catch {
    return err("EXTERNAL_API_ERROR");
  }
};

// ✅ チェーン処理
const processData = (input: string): Result<ProcessedData, string> =>
  validateInput(input)
    .andThen(parseInput)
    .andThen(processInput)
    .map(formatOutput);

// ❌ 禁止: 裸の try-catch でエラーを throw する
// try { ... } catch (e) { throw new Error("..."); }
```

## Zod — バリデーション

```typescript
import { z } from "zod";

// TypeSpec 生成型との整合性を satisfies で保証する
const createQuizSchema = z.object({
  question: z.string(),
  answerType: z.enum(["boolean", "free_text", "single_choice", "multiple_choice"]),
}) satisfies z.ZodType<components["schemas"]["CreateQuizRequest"]>;

// ❌ 禁止: TypeSpec と整合しない独自スキーマ
// const bad = z.object({ title: z.string() }); // TypeSpec にないフィールド
```

## ハンドラ完全パターン

```typescript
const createQuizHandler = async (c: AppContext) => {
  // Step 1: JSON パース（neverthrow）
  const jsonResult = await parseJsonSafe(c.req);
  if (jsonResult.isErr())
    return c.json(
      { message: "Invalid JSON", code: jsonResult.error } as components["schemas"]["ErrorResponse"],
      400,
    );

  // Step 2: Zod バリデーション（neverthrow）
  const validated = validateWithZod(createQuizSchema, jsonResult.value);
  if (validated.isErr())
    return c.json(
      { message: "Invalid body", code: validated.error } as components["schemas"]["ErrorResponse"],
      400,
    );

  // Step 3: ドメインサービス呼び出し
  const result = await quizService.createDraft(validated.value);

  // Step 4: match でレスポンス分岐
  return result.match(
    (data) => c.json(data as components["schemas"]["CreateQuizResponse"], 201),
    (err) =>
      c.json(
        { message: err.message, code: err.code } as components["schemas"]["ErrorResponse"],
        500,
      ),
  );
};
```

## 型アサーション ルール

```typescript
// ✅ 許可: TypeSpec 生成型へのアサーション
return c.json({ message: "Not found", code: "NOT_FOUND" } as ErrorResponse, 404);

// ❌ 禁止: as any
const data = response as any;
```

## エラーコード規約

- `INVALID_JSON` — JSON パース失敗
- `VALIDATION_ERROR` — Zod バリデーション失敗
- `NOT_FOUND` — リソース不存在
- `CONFLICT` — 重複・競合
- `UNAUTHORIZED` — 認証失敗
- `INTERNAL_ERROR` — サーバー内部エラー

ドメインエラーコードは `docs/project/api-design/api-catalog/07-common-specs.md` を参照。
