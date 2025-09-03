# Mutant d74ae3d8 Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: ConditionalExpression
**Original ID**: 9525
**Stable ID**: d74ae3d8
**Location**: L123:13–L123:38

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9525
@@ -119,9 +119,9 @@
   integrationTestCases.forEach(({ NODE_ENV, USE_MOCK_DB }) => {
     it(`NODE_ENV=${NODE_ENV}, USE_MOCK_DB=${USE_MOCK_DB ?? "undefined"}: shouldUseMockとcreateQuizRepositoryの結果が一致する`, () => {
       const mockEnv = createMockEnv({
         NODE_ENV,
-        ...(USE_MOCK_DB !== undefined && { USE_MOCK_DB }),
+        ...(true && { USE_MOCK_DB }),
       });
       const useMock = shouldUseMock(mockEnv);
       const repository = createQuizRepository(mockEnv);
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
