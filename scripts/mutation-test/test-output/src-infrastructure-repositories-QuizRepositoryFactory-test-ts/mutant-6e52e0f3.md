# Mutant 6e52e0f3 Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: BlockStatement
**Original ID**: 9467
**Stable ID**: 6e52e0f3
**Location**: L62:40–L103:2

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9467
@@ -58,51 +58,10 @@
     });
   });
 });
 
-describe("createQuizRepository", () => {
-  // Parameterized test cases for createQuizRepository
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
+describe("createQuizRepository", () => {});
 
-  repositoryTestCases.forEach(({ description, env, expectedType }) => {
-    it(description, () => {
-      const repository = createQuizRepository(env);
-      expect(repository).toBeInstanceOf(expectedType);
-    });
-  });
-});
-
 describe("Integration: shouldUseMock and createQuizRepository consistency", () => {
   // Integration test to ensure shouldUseMock and createQuizRepository are consistent
   const integrationTestCases = [
     { NODE_ENV: "test" as const },
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
