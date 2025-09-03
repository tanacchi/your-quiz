# Mutant 3c0e2b1d Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: BlockStatement
**Original ID**: 9520
**Stable ID**: 3c0e2b1d
**Location**: L120:125–L133:6

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9520
@@ -116,20 +116,7 @@
     { NODE_ENV: "production" as const, USE_MOCK_DB: "false" },
   ];
 
   integrationTestCases.forEach(({ NODE_ENV, USE_MOCK_DB }) => {
-    it(`NODE_ENV=${NODE_ENV}, USE_MOCK_DB=${USE_MOCK_DB ?? "undefined"}: shouldUseMockとcreateQuizRepositoryの結果が一致する`, () => {
-      const mockEnv = createMockEnv({
-        NODE_ENV,
-        ...(USE_MOCK_DB !== undefined && { USE_MOCK_DB }),
-      });
-      const useMock = shouldUseMock(mockEnv);
-      const repository = createQuizRepository(mockEnv);
-
-      if (useMock) {
-        expect(repository).toBeInstanceOf(MockQuizRepository);
-      } else {
-        expect(repository).toBeInstanceOf(D1QuizRepository);
-      }
-    });
+    it(`NODE_ENV=${NODE_ENV}, USE_MOCK_DB=${USE_MOCK_DB ?? "undefined"}: shouldUseMockとcreateQuizRepositoryの結果が一致する`, () => {});
   });
 });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
