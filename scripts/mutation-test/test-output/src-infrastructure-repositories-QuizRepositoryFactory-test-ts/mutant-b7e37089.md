# Mutant b7e37089 Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: StringLiteral
**Original ID**: 9498
**Stable ID**: b7e37089
**Location**: L105:10–L105:75

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9498
@@ -101,9 +101,9 @@
     });
   });
 });
 
-describe("Integration: shouldUseMock and createQuizRepository consistency", () => {
+describe("", () => {
   // Integration test to ensure shouldUseMock and createQuizRepository are consistent
   const integrationTestCases = [
     { NODE_ENV: "test" as const },
     { NODE_ENV: "test" as const, USE_MOCK_DB: "true" },
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
