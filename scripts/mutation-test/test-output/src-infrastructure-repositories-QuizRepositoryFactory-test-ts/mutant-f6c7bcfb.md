# Mutant f6c7bcfb Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: ObjectLiteral
**Original ID**: 9514
**Stable ID**: f6c7bcfb
**Location**: L116:5–L116:62

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9514
@@ -112,9 +112,9 @@
     { NODE_ENV: "development" as const, USE_MOCK_DB: "true" },
     { NODE_ENV: "development" as const, USE_MOCK_DB: "false" },
     { NODE_ENV: "production" as const },
     { NODE_ENV: "production" as const, USE_MOCK_DB: "true" },
-    { NODE_ENV: "production" as const, USE_MOCK_DB: "false" },
+    {},
   ];
 
   integrationTestCases.forEach(({ NODE_ENV, USE_MOCK_DB }) => {
     it(`NODE_ENV=${NODE_ENV}, USE_MOCK_DB=${USE_MOCK_DB ?? "undefined"}: shouldUseMockとcreateQuizRepositoryの結果が一致する`, () => {
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
