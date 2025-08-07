# API実装サンプル集（Your Quiz プロジェクト）

## 概要

Your QuizプロジェクトでのAPI実装パターンの具体例を示します。すべてのサンプルはプロジェクトの実装ルールに準拠しています。

## 基本セットアップ

### インポートとタイプ定義

```typescript
import type { Context } from "hono";
import { Hono } from "hono";
import { z } from "zod";
import { err, ok, type Result } from "neverthrow";
import type { components } from "./types/generated/api";

type CloudflareBindings = Record<string, unknown>;
type AppContext = Context<{ Bindings: CloudflareBindings }>;

const app = new Hono<{ Bindings: CloudflareBindings }>();
```

### 共通ヘルパー関数

```typescript
// JSONパース用ヘルパー
const parseJsonSafe = async (request: {
  json(): Promise<unknown>;
}): Promise<Result<unknown, string>> => {
  try {
    const json = await request.json();
    return ok(json);
  } catch {
    return err("INVALID_JSON");
  }
};

// Zodバリデーション用ヘルパー
const validateWithZod = <T>(
  schema: z.ZodSchema<T>,
  data: unknown,
): Result<T, string> => {
  const result = schema.safeParse(data);
  return result.success ? ok(result.data) : err("VALIDATION_ERROR");
};

// エラーレスポンス生成ヘルパー
const createErrorResponse = (
  message: string,
  code: string,
): components["schemas"]["ErrorResponse"] => ({
  message,
  code,
});
```

## CRUD操作の実装パターン

### 1. GET（リスト取得）

```typescript
// Zodスキーマ定義（TypeSpecとの整合性確保）
const quizListResponseSchema = z.object({
  quizzes: z.array(quizSchema),
  total: z.number().int(),
}) satisfies z.ZodType<components["schemas"]["QuizListResponse"]>;

// ハンドラー実装
const listQuizzesHandler = async (c: AppContext) => {
  // ビジネスロジック（モックデータ）
  const quizzes: components["schemas"]["Quiz"][] = [
    {
      id: "1",
      question: "What is TypeScript?",
      answerType: "single_choice",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      question: "Is JavaScript strongly typed?",
      answerType: "boolean",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  const response: components["schemas"]["QuizListResponse"] = {
    quizzes,
    total: quizzes.length,
  };

  return c.json(response);
};

// ルート登録
app.get("/api/quiz/v1/manage/quizzes", listQuizzesHandler);
```

### 2. GET（単体取得）

```typescript
const getQuizHandler = async (c: AppContext) => {
  // パラメータ取得・検証
  const id = c.req.param("id");

  if (!id) {
    return c.json(
      createErrorResponse("ID is required", "MISSING_ID"),
      400,
    );
  }

  // ビジネスロジック（モックデータ）
  const quiz: components["schemas"]["Quiz"] = {
    id,
    question: "What is TypeScript?",
    answerType: "single_choice",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return c.json(quiz);
};

// ルート登録
app.get("/api/quiz/v1/manage/quizzes/:id", getQuizHandler);
```

### 3. POST（作成）

```typescript
// Zodスキーマ定義
const createQuizSchema = z.object({
  question: z.string(),
  answerType: z.enum(["boolean", "free_text", "single_choice", "multiple_choice"]),
}) satisfies z.ZodType<components["schemas"]["CreateQuizRequest"]>;

const createQuizHandler = async (c: AppContext) => {
  // JSONパース
  const jsonResult = await parseJsonSafe(c.req);
  
  if (jsonResult.isErr()) {
    const errorCode = jsonResult.error;
    const errorMessage = errorCode === "INVALID_JSON" 
      ? "Invalid JSON in request body" 
      : "Failed to parse request";
      
    return c.json(
      createErrorResponse(errorMessage, errorCode),
      400,
    );
  }

  // バリデーション
  const validationResult = validateWithZod(createQuizSchema, jsonResult.value);
  
  if (validationResult.isErr()) {
    return c.json(
      createErrorResponse("Invalid request body format", validationResult.error),
      400,
    );
  }

  const body = validationResult.value;

  // ビジネスロジック（モック作成）
  const quiz: components["schemas"]["Quiz"] = {
    id: Date.now().toString(),
    question: body.question,
    answerType: body.answerType,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return c.json(quiz);
};

// ルート登録
app.post("/api/quiz/v1/manage/quizzes", createQuizHandler);
```

### 4. PUT（更新）

```typescript
const updateQuizSchema = z.object({
  question: z.string().optional(),
  answerType: z.enum(["boolean", "free_text", "single_choice", "multiple_choice"]).optional(),
}) satisfies z.ZodType<components["schemas"]["UpdateQuizRequest"]>;

const updateQuizHandler = async (c: AppContext) => {
  // パラメータ取得・検証
  const id = c.req.param("id");
  if (!id) {
    return c.json(
      createErrorResponse("ID is required", "MISSING_ID"),
      400,
    );
  }

  // JSONパース・バリデーション
  const jsonResult = await parseJsonSafe(c.req);
  if (jsonResult.isErr()) {
    return c.json(
      createErrorResponse("Invalid JSON in request body", jsonResult.error),
      400,
    );
  }

  const validationResult = validateWithZod(updateQuizSchema, jsonResult.value);
  if (validationResult.isErr()) {
    return c.json(
      createErrorResponse("Invalid request body format", validationResult.error),
      400,
    );
  }

  const body = validationResult.value;

  // ビジネスロジック（モック更新）
  const quiz: components["schemas"]["Quiz"] = {
    id,
    question: body.question ?? "Updated question",
    answerType: body.answerType ?? "single_choice",
    createdAt: "2024-01-01T00:00:00.000Z", // 既存の作成日時
    updatedAt: new Date().toISOString(),
  };

  return c.json(quiz);
};

// ルート登録
app.put("/api/quiz/v1/manage/quizzes/:id", updateQuizHandler);
```

### 5. DELETE（削除）

```typescript
const deleteQuizHandler = async (c: AppContext) => {
  // パラメータ取得・検証
  const id = c.req.param("id");
  if (!id) {
    return c.json(
      createErrorResponse("ID is required", "MISSING_ID"),
      400,
    );
  }

  // ビジネスロジック（モック削除）
  // 実際の実装では、リソースの存在確認とDB削除処理

  // 204 No Contentでレスポンス
  return c.body(null, 204);
};

// ルート登録
app.delete("/api/quiz/v1/manage/quizzes/:id", deleteQuizHandler);
```

## 高度な実装パターン

### 1. クエリパラメータ付きリスト取得

```typescript
const listQuizzesQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  category: z.string().optional(),
});

const listQuizzesWithQueryHandler = async (c: AppContext) => {
  // クエリパラメータの取得・バリデーション
  const queryData = {
    page: c.req.query("page"),
    limit: c.req.query("limit"),
    category: c.req.query("category"),
  };

  const queryValidation = validateWithZod(listQuizzesQuerySchema, queryData);
  if (queryValidation.isErr()) {
    return c.json(
      createErrorResponse("Invalid query parameters", "INVALID_QUERY"),
      400,
    );
  }

  const { page, limit, category } = queryValidation.value;

  // ビジネスロジック
  const quizzes: components["schemas"]["Quiz"][] = [
    // フィルタリング・ページングロジック
  ];

  const response: components["schemas"]["QuizListResponse"] = {
    quizzes,
    total: quizzes.length,
  };

  return c.json(response);
};
```

### 2. 複合的なバリデーション

```typescript
const createQuizWithOptionsSchema = z.object({
  question: z.string().min(1).max(500),
  answerType: z.enum(["boolean", "free_text", "single_choice", "multiple_choice"]),
  options: z.array(z.string()).optional(),
  correctAnswer: z.string().optional(),
}).refine((data) => {
  // 複合的なバリデーション：選択肢問題の場合はoptionsが必須
  if (["single_choice", "multiple_choice"].includes(data.answerType)) {
    return data.options && data.options.length > 0;
  }
  return true;
}, {
  message: "Options are required for choice-type questions",
});

const createQuizWithOptionsHandler = async (c: AppContext) => {
  const jsonResult = await parseJsonSafe(c.req);
  if (jsonResult.isErr()) {
    return c.json(
      createErrorResponse("Invalid JSON in request body", jsonResult.error),
      400,
    );
  }

  const validationResult = validateWithZod(createQuizWithOptionsSchema, jsonResult.value);
  if (validationResult.isErr()) {
    return c.json(
      createErrorResponse("Validation failed", validationResult.error),
      400,
    );
  }

  const body = validationResult.value;
  
  // ビジネスロジック...
};
```

### 3. 非同期処理との連携

```typescript
const processQuizAsyncHandler = async (c: AppContext) => {
  const id = c.req.param("id");
  if (!id) {
    return c.json(
      createErrorResponse("ID is required", "MISSING_ID"),
      400,
    );
  }

  // 非同期処理の結果をResult型でラップ
  const processResult = await processQuizData(id);
  
  if (processResult.isErr()) {
    const error = processResult.error;
    return c.json(
      createErrorResponse("Processing failed", error),
      500,
    );
  }

  const result = processResult.value;
  return c.json(result);
};

// 非同期処理関数の例
const processQuizData = async (id: string): Promise<Result<components["schemas"]["Quiz"], string>> => {
  try {
    // 実際の非同期処理
    const quiz = await fetchQuizFromDatabase(id);
    return ok(quiz);
  } catch (error) {
    return err("DATABASE_ERROR");
  }
};
```

## エラーハンドリングのパターン

### 1. 段階的エラーハンドリング

```typescript
const complexOperationHandler = async (c: AppContext) => {
  // Step 1: パラメータ検証
  const paramValidation = validateParameters(c);
  if (paramValidation.isErr()) {
    return c.json(
      createErrorResponse("Invalid parameters", paramValidation.error),
      400,
    );
  }

  // Step 2: JSONパース
  const jsonResult = await parseJsonSafe(c.req);
  if (jsonResult.isErr()) {
    return c.json(
      createErrorResponse("Invalid JSON", jsonResult.error),
      400,
    );
  }

  // Step 3: バリデーション
  const validationResult = validateWithZod(schema, jsonResult.value);
  if (validationResult.isErr()) {
    return c.json(
      createErrorResponse("Validation failed", validationResult.error),
      400,
    );
  }

  // Step 4: ビジネスロジック実行
  const businessResult = await executeBusinessLogic(validationResult.value);
  if (businessResult.isErr()) {
    return c.json(
      createErrorResponse("Business logic failed", businessResult.error),
      500,
    );
  }

  return c.json(businessResult.value);
};
```

### 2. カスタムエラーコードの定義

```typescript
// エラーコードの定数定義
const ERROR_CODES = {
  INVALID_JSON: "INVALID_JSON",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  MISSING_PARAMETER: "MISSING_PARAMETER",
  RESOURCE_NOT_FOUND: "RESOURCE_NOT_FOUND",
  BUSINESS_LOGIC_ERROR: "BUSINESS_LOGIC_ERROR",
  DATABASE_ERROR: "DATABASE_ERROR",
} as const;

type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES];

// エラーメッセージのマッピング
const ERROR_MESSAGES: Record<ErrorCode, string> = {
  INVALID_JSON: "Invalid JSON in request body",
  VALIDATION_ERROR: "Request validation failed",
  MISSING_PARAMETER: "Required parameter is missing",
  RESOURCE_NOT_FOUND: "Requested resource not found",
  BUSINESS_LOGIC_ERROR: "Business logic execution failed",
  DATABASE_ERROR: "Database operation failed",
};

const createTypedErrorResponse = (code: ErrorCode): components["schemas"]["ErrorResponse"] => ({
  message: ERROR_MESSAGES[code],
  code,
});
```

## テスト用のサンプル

### 1. ハンドラーのユニットテスト

```typescript
import { describe, it, expect } from "vitest";
import { Hono } from "hono";

describe("Quiz API Handlers", () => {
  const app = new Hono();
  
  it("should return quiz list", async () => {
    const res = await app.request("/api/quiz/v1/manage/quizzes");
    
    expect(res.status).toBe(200);
    
    const data = await res.json();
    expect(data).toHaveProperty("quizzes");
    expect(data).toHaveProperty("total");
  });

  it("should handle invalid JSON", async () => {
    const res = await app.request("/api/quiz/v1/manage/quizzes", {
      method: "POST",
      body: "invalid json",
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(res.status).toBe(400);
    
    const error = await res.json();
    expect(error.code).toBe("INVALID_JSON");
  });
});
```

## 実装時のチェックポイント

各実装で以下を確認してください：

1. **型安全性**
   - [ ] TypeSpecで生成された型を使用している
   - [ ] `satisfies`でスキーマの型制約を確保している
   - [ ] `as any`を使用していない

2. **エラーハンドリング**
   - [ ] neverthrowのResult型を使用している
   - [ ] try-catchを使用していない
   - [ ] エラーレスポンスが統一されている

3. **バリデーション**
   - [ ] JSONパースとZodバリデーションを分離している
   - [ ] 適切なエラーメッセージを返している

4. **レスポンス**
   - [ ] 適切なHTTPステータスコードを使用している
   - [ ] TypeSpec定義と一致するレスポンス形式

このサンプル集を参考に、プロジェクトの実装ルールに従った一貫性のあるAPI実装を行ってください。