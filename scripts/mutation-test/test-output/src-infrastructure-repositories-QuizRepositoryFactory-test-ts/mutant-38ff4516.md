# Mutant 38ff4516 Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: LogicalOperator
**Original ID**: 9524
**Stable ID**: 38ff4516
**Location**: L123:13–L123:57

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9524
@@ -119,9 +119,11 @@
   integrationTestCases.forEach(({ NODE_ENV, USE_MOCK_DB }) => {
     it(`NODE_ENV=${NODE_ENV}, USE_MOCK_DB=${USE_MOCK_DB ?? "undefined"}: shouldUseMockとcreateQuizRepositoryの結果が一致する`, () => {
       const mockEnv = createMockEnv({
         NODE_ENV,
-        ...(USE_MOCK_DB !== undefined && { USE_MOCK_DB }),
+        ...(USE_MOCK_DB !== undefined || {
+  USE_MOCK_DB
+}),
       });
       const useMock = shouldUseMock(mockEnv);
       const repository = createQuizRepository(mockEnv);
```

## Hint

論理演算子が置換されています（&&/|| ⇄ ||/&&）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
