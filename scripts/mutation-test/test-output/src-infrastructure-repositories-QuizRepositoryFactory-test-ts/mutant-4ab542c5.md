# Mutant 4ab542c5 Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: ObjectLiteral
**Original ID**: 9512
**Stable ID**: 4ab542c5
**Location**: L115:5–L115:61

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9512
@@ -111,9 +111,9 @@
     { NODE_ENV: "development" as const },
     { NODE_ENV: "development" as const, USE_MOCK_DB: "true" },
     { NODE_ENV: "development" as const, USE_MOCK_DB: "false" },
     { NODE_ENV: "production" as const },
-    { NODE_ENV: "production" as const, USE_MOCK_DB: "true" },
+    {},
     { NODE_ENV: "production" as const, USE_MOCK_DB: "false" },
   ];
 
   integrationTestCases.forEach(({ NODE_ENV, USE_MOCK_DB }) => {
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
