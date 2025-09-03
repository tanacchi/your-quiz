# Mutant 3ba403f6 Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: StringLiteral
**Original ID**: 9503
**Stable ID**: 3ba403f6
**Location**: L109:47–L109:53

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9503
@@ -105,9 +105,9 @@
 describe("Integration: shouldUseMock and createQuizRepository consistency", () => {
   // Integration test to ensure shouldUseMock and createQuizRepository are consistent
   const integrationTestCases = [
     { NODE_ENV: "test" as const },
-    { NODE_ENV: "test" as const, USE_MOCK_DB: "true" },
+    { NODE_ENV: "test" as const, USE_MOCK_DB: "" },
     { NODE_ENV: "test" as const, USE_MOCK_DB: "false" },
     { NODE_ENV: "development" as const },
     { NODE_ENV: "development" as const, USE_MOCK_DB: "true" },
     { NODE_ENV: "development" as const, USE_MOCK_DB: "false" },
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
