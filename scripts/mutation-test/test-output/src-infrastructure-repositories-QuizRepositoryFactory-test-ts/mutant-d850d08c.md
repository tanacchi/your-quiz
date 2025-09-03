# Mutant d850d08c Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: ObjectLiteral
**Original ID**: 9502
**Stable ID**: d850d08c
**Location**: L109:5–L109:55

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9502
@@ -105,9 +105,9 @@
 describe("Integration: shouldUseMock and createQuizRepository consistency", () => {
   // Integration test to ensure shouldUseMock and createQuizRepository are consistent
   const integrationTestCases = [
     { NODE_ENV: "test" as const },
-    { NODE_ENV: "test" as const, USE_MOCK_DB: "true" },
+    {},
     { NODE_ENV: "test" as const, USE_MOCK_DB: "false" },
     { NODE_ENV: "development" as const },
     { NODE_ENV: "development" as const, USE_MOCK_DB: "true" },
     { NODE_ENV: "development" as const, USE_MOCK_DB: "false" },
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
