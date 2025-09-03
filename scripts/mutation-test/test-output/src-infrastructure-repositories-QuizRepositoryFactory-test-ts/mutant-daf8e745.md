# Mutant daf8e745 Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: StringLiteral
**Original ID**: 9470
**Stable ID**: daf8e745
**Location**: L66:20–L66:50

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9470
@@ -62,9 +62,9 @@
 describe("createQuizRepository", () => {
   // Parameterized test cases for createQuizRepository
   const repositoryTestCases = [
     {
-      description: "テスト環境ではMockQuizRepositoryを返す",
+      description: "",
       env: createMockEnv({ NODE_ENV: "test" }),
       expectedType: MockQuizRepository,
     },
     {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
