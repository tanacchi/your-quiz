# Mutant 30706d4d Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: ArrayDeclaration
**Original ID**: 9500
**Stable ID**: 30706d4d
**Location**: L107:32–L117:4

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9500
@@ -103,19 +103,9 @@
 });
 
 describe("Integration: shouldUseMock and createQuizRepository consistency", () => {
   // Integration test to ensure shouldUseMock and createQuizRepository are consistent
-  const integrationTestCases = [
-    { NODE_ENV: "test" as const },
-    { NODE_ENV: "test" as const, USE_MOCK_DB: "true" },
-    { NODE_ENV: "test" as const, USE_MOCK_DB: "false" },
-    { NODE_ENV: "development" as const },
-    { NODE_ENV: "development" as const, USE_MOCK_DB: "true" },
-    { NODE_ENV: "development" as const, USE_MOCK_DB: "false" },
-    { NODE_ENV: "production" as const },
-    { NODE_ENV: "production" as const, USE_MOCK_DB: "true" },
-    { NODE_ENV: "production" as const, USE_MOCK_DB: "false" },
-  ];
+  const integrationTestCases = [];
 
   integrationTestCases.forEach(({ NODE_ENV, USE_MOCK_DB }) => {
     it(`NODE_ENV=${NODE_ENV}, USE_MOCK_DB=${USE_MOCK_DB ?? "undefined"}: shouldUseMockとcreateQuizRepositoryの結果が一致する`, () => {
       const mockEnv = createMockEnv({
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
