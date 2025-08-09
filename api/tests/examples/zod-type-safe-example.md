# Zodベース型安全PactumJSテスト実装

## Zodを使った実装の利点

従来の手動型ガード関数からZodベースの実装に変更することで、以下の利点が得られます：

### 1. より強力な実行時型検証

**Before (手動型ガード)**:

```typescript
export function isValidationError(response: unknown): response is ValidationErrorResponse {
  return (
    isErrorResponse(response) &&
    response.code === 400 &&
    (!("fieldErrors" in response) || typeof (response as any).fieldErrors === "object")
  );
}
```

**After (Zodベース)**:

```typescript
export const ValidationErrorSchema = BaseErrorResponseSchema.extend({
  code: z.literal(400),
  fieldErrors: z.record(z.string(), z.string()).optional(),
});

export const isValidationError = createZodTypeGuard(ValidationErrorSchema);
```

### 2. 詳細なエラーメッセージ

**Before**:

```typescript
// エラーメッセージが曖昧
throw new Error("Response validation failed. Expected specific error type");
```

**After**:

```typescript
// Zodからの詳細なバリデーションエラー
export const assertValidationError = createZodAssertion(
  ValidationErrorSchema,
  "Expected ValidationError (400)"
);

// 実際のエラー例:
// "Expected ValidationError (400). Validation errors: code: Expected 400, fieldErrors.question: Expected string"
```

### 3. TypeScript型との完全な統合

```typescript
// Zodスキーマから型を自動推論
export type ValidationErrorResponse = z.infer<typeof ValidationErrorSchema>;

// TypeScriptとZodの型が完全に同期
const error: ValidationErrorResponse = assertValidationError(response);
```

## 使用例

### 基本的な型検証

```typescript
describe("Zodベース型安全テスト", () => {
  it("ValidationErrorの詳細検証", async () => {
    const response = await spec()
      .post("/api/quiz/v1/manage/quizzes")
      .withJson({ /* invalid data */ })
      .expectStatus(400);

    // Zodベースの型安全なアサーション
    const validationError = assertValidationError(response.json);
    
    // 型安全性: validationError は ValidationErrorResponse 型
    expect(validationError.code).toBe(400);
    
    // フィールドエラーの詳細検証
    if (validationError.fieldErrors) {
      expect(validationError.fieldErrors.question).toBeDefined();
      expect(validationError.fieldErrors.solution).toBeDefined();
    }
  });
});
```

### 高度な型検証

```typescript
describe("詳細なスキーマ検証", () => {
  it("部分的なバリデーション", async () => {
    const response = await spec()
      .post("/api/quiz/v1/manage/quizzes")
      .withJson(testData)
      .expectStatus(201);

    // 詳細なバリデーション結果を取得
    const validationResult = SchemaValidators.validateWithDetails(
      CreateQuizResponseSchema, 
      response.json
    );

    if (!validationResult.success) {
      console.log("Validation issues:", validationResult.error.issues);
      // 具体的なフィールドエラー情報が表示される
    }

    expect(validationResult.success).toBe(true);
  });

  it("フィールドレベルの検証", async () => {
    const response = await spec()
      .get("/api/quiz/v1/manage/quizzes/123")
      .expectStatus(200);

    const quiz = assertQuizWithSolutionResponse(response.json);
    
    // 特定フィールドの追加検証
    SchemaValidators.validateField(
      z.string().min(5), 
      quiz.question, 
      "question"
    );
    
    // answerTypeの enum 検証
    SchemaValidators.validateField(
      z.enum(["boolean", "free_text", "single_choice", "multiple_choice"]), 
      quiz.answerType,
      "answerType"
    );
  });
});
```

### エラーシナリオの詳細テスト

```typescript
describe("エラーシナリオの包括的テスト", () => {
  it("NotFoundError構造の厳密検証", async () => {
    const response = await spec()
      .get("/api/quiz/v1/manage/quizzes/nonexistent")
      .expectStatus(404);

    // Zodによる厳密な構造検証
    const notFoundError = assertNotFoundError(response.json);
    
    // TypeSpec仕様に完全準拠していることを確認
    expect(notFoundError.code).toBe(404);
    expect(notFoundError.message).toBe("Resource not found");
    
    // オプショナルフィールドの検証
    if (notFoundError.details) {
      expect(typeof notFoundError.details).toBe("string");
    }
    
    if (notFoundError.requestId) {
      expect(typeof notFoundError.requestId).toBe("string");
    }
  });
});
```

## Zodスキーマの拡張性

新しいエラータイプが追加された場合：

```typescript
// 新しいエラータイプをTypeSpec仕様に基づいて追加
export const CustomBusinessErrorSchema = BaseErrorResponseSchema.extend({
  code: z.literal(422),
  message: z.literal("Business rule violation"),
  businessRule: z.string(),
  violationDetails: z.object({
    rule: z.string(),
    context: z.record(z.string(), z.unknown())
  }),
});

// 型安全な関数を自動生成
export const isCustomBusinessError = createZodTypeGuard(CustomBusinessErrorSchema);
export const assertCustomBusinessError = createZodAssertion(
  CustomBusinessErrorSchema,
  "Expected CustomBusinessError (422)"
);

// TypeScript型も自動で利用可能
export type CustomBusinessErrorResponse = z.infer<typeof CustomBusinessErrorSchema>;
```

## 主要な改善点

| 観点 | Before (手動) | After (Zod) |
|------|---------------|-------------|
| **型安全性** | 手動型ガード | スキーマベース自動検証 |
| **エラーメッセージ** | 汎用的 | 詳細なフィールドレベル |
| **保守性** | 手動メンテナンス | スキーマ駆動 |
| **TypeScript統合** | 手動型定義 | 自動型推論 |
| **実行時検証** | 基本的チェック | 包括的バリデーション |
| **拡張性** | コード重複 | 再利用可能パターン |

これにより、より堅牢で保守性の高いAPIテストが実現されます。
