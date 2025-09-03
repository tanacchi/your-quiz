# Mutant 3d8b5716 Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: EqualityOperator
**Original ID**: 9526
**Stable ID**: 3d8b5716
**Location**: L123:13–L123:38

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9526
@@ -119,9 +119,9 @@
   integrationTestCases.forEach(({ NODE_ENV, USE_MOCK_DB }) => {
     it(`NODE_ENV=${NODE_ENV}, USE_MOCK_DB=${USE_MOCK_DB ?? "undefined"}: shouldUseMockとcreateQuizRepositoryの結果が一致する`, () => {
       const mockEnv = createMockEnv({
         NODE_ENV,
-        ...(USE_MOCK_DB !== undefined && { USE_MOCK_DB }),
+        ...(USE_MOCK_DB === undefined && { USE_MOCK_DB }),
       });
       const useMock = shouldUseMock(mockEnv);
       const repository = createQuizRepository(mockEnv);
```

## Hint

等価演算子が置換されています（==/=== ⇄ !=/!==）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
