# Mutant 50d584bf Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: StringLiteral
**Original ID**: 9466
**Stable ID**: 50d584bf
**Location**: L62:10–L62:32

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9466
@@ -58,9 +58,9 @@
     });
   });
 });
 
-describe("createQuizRepository", () => {
+describe("", () => {
   // Parameterized test cases for createQuizRepository
   const repositoryTestCases = [
     {
       description: "テスト環境ではMockQuizRepositoryを返す",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
