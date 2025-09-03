# Mutant 419386ca Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: ObjectLiteral
**Original ID**: 9501
**Stable ID**: 419386ca
**Location**: L108:5–L108:34

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9501
@@ -104,9 +104,9 @@
 
 describe("Integration: shouldUseMock and createQuizRepository consistency", () => {
   // Integration test to ensure shouldUseMock and createQuizRepository are consistent
   const integrationTestCases = [
-    { NODE_ENV: "test" as const },
+    {},
     { NODE_ENV: "test" as const, USE_MOCK_DB: "true" },
     { NODE_ENV: "test" as const, USE_MOCK_DB: "false" },
     { NODE_ENV: "development" as const },
     { NODE_ENV: "development" as const, USE_MOCK_DB: "true" },
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
