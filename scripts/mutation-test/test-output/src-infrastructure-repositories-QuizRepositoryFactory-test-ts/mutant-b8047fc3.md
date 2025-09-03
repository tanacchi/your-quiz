# Mutant b8047fc3 Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: StringLiteral
**Original ID**: 9513
**Stable ID**: b8047fc3
**Location**: L115:53–L115:59

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9513
@@ -111,9 +111,9 @@
     { NODE_ENV: "development" as const },
     { NODE_ENV: "development" as const, USE_MOCK_DB: "true" },
     { NODE_ENV: "development" as const, USE_MOCK_DB: "false" },
     { NODE_ENV: "production" as const },
-    { NODE_ENV: "production" as const, USE_MOCK_DB: "true" },
+    { NODE_ENV: "production" as const, USE_MOCK_DB: "" },
     { NODE_ENV: "production" as const, USE_MOCK_DB: "false" },
   ];
 
   integrationTestCases.forEach(({ NODE_ENV, USE_MOCK_DB }) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
