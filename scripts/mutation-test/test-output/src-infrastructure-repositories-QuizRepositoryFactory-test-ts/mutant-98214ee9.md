# Mutant 98214ee9 Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: ObjectLiteral
**Original ID**: 9506
**Stable ID**: 98214ee9
**Location**: L111:5–L111:41

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9506
@@ -107,9 +107,9 @@
   const integrationTestCases = [
     { NODE_ENV: "test" as const },
     { NODE_ENV: "test" as const, USE_MOCK_DB: "true" },
     { NODE_ENV: "test" as const, USE_MOCK_DB: "false" },
-    { NODE_ENV: "development" as const },
+    {},
     { NODE_ENV: "development" as const, USE_MOCK_DB: "true" },
     { NODE_ENV: "development" as const, USE_MOCK_DB: "false" },
     { NODE_ENV: "production" as const },
     { NODE_ENV: "production" as const, USE_MOCK_DB: "true" },
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
