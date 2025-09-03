# Mutant 7bec2aba Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: StringLiteral
**Original ID**: 9515
**Stable ID**: 7bec2aba
**Location**: L116:53–L116:60

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9515
@@ -112,9 +112,9 @@
     { NODE_ENV: "development" as const, USE_MOCK_DB: "true" },
     { NODE_ENV: "development" as const, USE_MOCK_DB: "false" },
     { NODE_ENV: "production" as const },
     { NODE_ENV: "production" as const, USE_MOCK_DB: "true" },
-    { NODE_ENV: "production" as const, USE_MOCK_DB: "false" },
+    { NODE_ENV: "production" as const, USE_MOCK_DB: "" },
   ];
 
   integrationTestCases.forEach(({ NODE_ENV, USE_MOCK_DB }) => {
     it(`NODE_ENV=${NODE_ENV}, USE_MOCK_DB=${USE_MOCK_DB ?? "undefined"}: shouldUseMockとcreateQuizRepositoryの結果が一致する`, () => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
