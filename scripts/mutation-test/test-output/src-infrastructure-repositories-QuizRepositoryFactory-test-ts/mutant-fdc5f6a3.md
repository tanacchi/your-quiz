# Mutant fdc5f6a3 Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: BlockStatement
**Original ID**: 9429
**Stable ID**: fdc5f6a3
**Location**: L20:33–L60:2

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9429
@@ -16,50 +16,10 @@
 
   return { ...baseEnv, ...overrides };
 };
 
-describe("shouldUseMock", () => {
-  // Parameterized test cases for shouldUseMock
-  const testCases = [
-    {
-      description: "テスト環境では常にtrue",
-      env: createMockEnv({ NODE_ENV: "test" }),
-      expected: true,
-    },
-    {
-      description: "USE_MOCK_DBがtrueの場合はtrue",
-      env: createMockEnv({ NODE_ENV: "production", USE_MOCK_DB: "true" }),
-      expected: true,
-    },
-    {
-      description: "開発環境でUSE_MOCK_DBが未設定の場合はtrue（デフォルト）",
-      env: createMockEnv({ NODE_ENV: "development" }),
-      expected: true,
-    },
-    {
-      description: "開発環境でUSE_MOCK_DBがfalseの場合はfalse",
-      env: createMockEnv({ NODE_ENV: "development", USE_MOCK_DB: "false" }),
-      expected: false,
-    },
-    {
-      description: "本番環境でUSE_MOCK_DBが未設定の場合はfalse",
-      env: createMockEnv({ NODE_ENV: "production" }),
-      expected: false,
-    },
-    {
-      description: "本番環境でUSE_MOCK_DBがfalseの場合はfalse",
-      env: createMockEnv({ NODE_ENV: "production", USE_MOCK_DB: "false" }),
-      expected: false,
-    },
-  ];
+describe("shouldUseMock", () => {});
 
-  testCases.forEach(({ description, env, expected }) => {
-    it(description, () => {
-      expect(shouldUseMock(env)).toBe(expected);
-    });
-  });
-});
-
 describe("createQuizRepository", () => {
   // Parameterized test cases for createQuizRepository
   const repositoryTestCases = [
     {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
