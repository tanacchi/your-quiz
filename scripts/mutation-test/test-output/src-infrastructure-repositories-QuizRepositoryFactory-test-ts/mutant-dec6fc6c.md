# Mutant dec6fc6c Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: ArrayDeclaration
**Original ID**: 9468
**Stable ID**: dec6fc6c
**Location**: L64:31–L95:4

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9468
@@ -60,40 +60,9 @@
 });
 
 describe("createQuizRepository", () => {
   // Parameterized test cases for createQuizRepository
-  const repositoryTestCases = [
-    {
-      description: "テスト環境ではMockQuizRepositoryを返す",
-      env: createMockEnv({ NODE_ENV: "test" }),
-      expectedType: MockQuizRepository,
-    },
-    {
-      description: "USE_MOCK_DB=trueの場合MockQuizRepositoryを返す",
-      env: createMockEnv({ NODE_ENV: "production", USE_MOCK_DB: "true" }),
-      expectedType: MockQuizRepository,
-    },
-    {
-      description: "開発環境でUSE_MOCK_DB未設定の場合MockQuizRepositoryを返す",
-      env: createMockEnv({ NODE_ENV: "development" }),
-      expectedType: MockQuizRepository,
-    },
-    {
-      description: "開発環境でUSE_MOCK_DB=falseの場合D1QuizRepositoryを返す",
-      env: createMockEnv({ NODE_ENV: "development", USE_MOCK_DB: "false" }),
-      expectedType: D1QuizRepository,
-    },
-    {
-      description: "本番環境でUSE_MOCK_DB未設定の場合D1QuizRepositoryを返す",
-      env: createMockEnv({ NODE_ENV: "production" }),
-      expectedType: D1QuizRepository,
-    },
-    {
-      description: "本番環境でUSE_MOCK_DB=falseの場合D1QuizRepositoryを返す",
-      env: createMockEnv({ NODE_ENV: "production", USE_MOCK_DB: "false" }),
-      expectedType: D1QuizRepository,
-    },
-  ];
+  const repositoryTestCases = [];
 
   repositoryTestCases.forEach(({ description, env, expectedType }) => {
     it(description, () => {
       const repository = createQuizRepository(env);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
