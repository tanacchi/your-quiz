# Mutant 4f0d802b Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: ObjectLiteral
**Original ID**: 9471
**Stable ID**: 4f0d802b
**Location**: L67:26–L67:46

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9471
@@ -63,9 +63,9 @@
   // Parameterized test cases for createQuizRepository
   const repositoryTestCases = [
     {
       description: "テスト環境ではMockQuizRepositoryを返す",
-      env: createMockEnv({ NODE_ENV: "test" }),
+      env: createMockEnv({}),
       expectedType: MockQuizRepository,
     },
     {
       description: "USE_MOCK_DB=trueの場合MockQuizRepositoryを返す",
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
