# 型安全なPactumJSテスト実装ガイド

## 実装概要

選択部分 `response.json` が `any` 型になっていた問題を解決し、TypeSpec準拠の型安全なテストを実現しました。

## Before (any型)

```typescript
const response = await spec()
  .post(testCase.endpoint)
  .withJson(testCase.input as object)
  .expectStatus(testCase.expectedStatus);

const body = response.json; // <- any型
errorResponseValidators.validateValidationError(body);
```

## After (型安全)

```typescript
const response = await spec()
  .post(testCase.endpoint)
  .withJson(testCase.input as object)
  .expectStatus(testCase.expectedStatus);

// response.jsonをValidationErrorResponse型に変換
const validationError = errorResponseValidators.validateValidationError(response.json);

// 型安全なフィールドエラーチェック
if (testCase.expectedFieldErrors?.length > 0) {
  TypeSafeTestHelpers.expectFieldErrors(validationError, testCase.expectedFieldErrors);
}

// TypeScript型チェックによる安全性
expect(validationError.code).toBe(400); // validationError は ValidationErrorResponse 型
expect(typeof validationError.message).toBe("string");
```

## 主要コンポーネント

### 1. TypeSpec準拠の型定義 (`tests/types/api-error-types.ts`)

```typescript
// TypeSpec生成型からエラー型を再エクスポート
export type ValidationErrorResponse = components["schemas"]["ValidationError"];
export type NotFoundErrorResponse = components["schemas"]["NotFoundError"];

// 型ガード関数
export function isValidationError(response: unknown): response is ValidationErrorResponse {
  return isErrorResponse(response) && response.code === 400;
}

// 型アサーション関数
export function assertValidationError(response: unknown): ValidationErrorResponse {
  return assertErrorResponse(response, isValidationError, "Expected ValidationError (400)");
}
```

### 2. 型安全なPactumJSヘルパー (`tests/helpers/type-safe-pactum.ts`)

```typescript
export class TypeSafePactumHelper {
  // オーバーロードによる型安全なエラーレスポンス処理
  static assertErrorResponse(response: any, expectedStatusCode: 400): ValidationErrorResponse;
  static assertErrorResponse(response: any, expectedStatusCode: 404): NotFoundErrorResponse;
  // ...他のステータスコード

  static assertErrorResponse(response: any, expectedStatusCode: number): ApiErrorResponse {
    switch (expectedStatusCode) {
      case 400: return assertValidationError(response);
      case 404: return assertNotFoundError(response);
      // ...
    }
  }
}
```

### 3. PactumJSマッチャー

```typescript
export const PactumMatchers = {
  validationError: {
    code: 400,
    message: like('string'),
    fieldErrors: like({}),
    details: like('string')
  }
};

// 使用例
await spec()
  .post("/api/quiz/v1/manage/quizzes")
  .withJson(invalidData)
  .expectStatus(400)
  .expectJsonMatch(PactumMatchers.validationError);
```

### 4. 更新されたエラー検証ヘルパー

```typescript
export const errorResponseValidators = {
  // any → unknown → ValidationErrorResponse への型安全な変換
  validateValidationError: (response: unknown): ValidationErrorResponse => {
    const error = TypeSafePactumHelper.assertErrorResponse(response, 400);
    TypeSafeTestHelpers.expectErrorStructure(error);
    TypeSafeTestHelpers.expectErrorMessagePattern(error);
    return error; // ValidationErrorResponse型で返却
  }
};
```

## 技術的メリット

### 1. コンパイル時型チェック

```typescript
// ✅ 型安全: IntelliSenseでfieldErrorsが補完される
if (validationError.fieldErrors) {
  expect(validationError.fieldErrors.question).toBeDefined();
}

// ❌ 従来: anyのため型チェックなし
// if (body.fieldErrors) { ... }
```

### 2. 実行時型検証

```typescript
// 型ガード関数により実行時に型を確認
if (!isValidationError(response)) {
  throw new Error("Expected ValidationError but got different response type");
}
```

### 3. テスト保守性向上

- TypeSpec変更時にコンパイルエラーで自動検知
- IDEでのエラー型プロパティの自動補完
- リファクタリング時の型安全性保証

## 使用例

```typescript
describe("型安全なエラーハンドリングテスト", () => {
  it("ValidationErrorの型安全処理", async () => {
    const response = await spec()
      .post("/api/quiz/v1/manage/quizzes")
      .withJson({ /* invalid data */ })
      .expectStatus(400);

    // 型安全な変換 any → ValidationErrorResponse
    const error = errorResponseValidators.validateValidationError(response.json);
    
    // TypeScript型チェック有効
    expect(error.code).toBe(400);
    expect(error.message).toContain("validation");
    
    // fieldErrorsの型安全チェック
    if (error.fieldErrors) {
      TypeSafeTestHelpers.expectFieldErrors(error, ["question", "solution"]);
    }
  });
});
```

## 実装成果

✅ `response.json` の `any` 型を解決
✅ TypeSpec仕様準拠の型安全性
✅ `as` キャストを使用しない自然な型変換
✅ PactumJSテストフレームワーク機能の活用
✅ コンパイル時・実行時両方の型検証
