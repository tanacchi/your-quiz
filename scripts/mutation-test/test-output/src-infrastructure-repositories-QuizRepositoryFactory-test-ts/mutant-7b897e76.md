# Mutant 7b897e76 Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: ConditionalExpression
**Original ID**: 9523
**Stable ID**: 7b897e76
**Location**: L123:13–L123:57

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9523
@@ -119,9 +119,9 @@
   integrationTestCases.forEach(({ NODE_ENV, USE_MOCK_DB }) => {
     it(`NODE_ENV=${NODE_ENV}, USE_MOCK_DB=${USE_MOCK_DB ?? "undefined"}: shouldUseMockとcreateQuizRepositoryの結果が一致する`, () => {
       const mockEnv = createMockEnv({
         NODE_ENV,
-        ...(USE_MOCK_DB !== undefined && { USE_MOCK_DB }),
+        ...(false),
       });
       const useMock = shouldUseMock(mockEnv);
       const repository = createQuizRepository(mockEnv);
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
