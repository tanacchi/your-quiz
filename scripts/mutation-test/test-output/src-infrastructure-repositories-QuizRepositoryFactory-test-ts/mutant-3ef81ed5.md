# Mutant 3ef81ed5 Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: BlockStatement
**Original ID**: 9516
**Stable ID**: 3ef81ed5
**Location**: L119:63–L134:4

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9516
@@ -115,21 +115,6 @@
     { NODE_ENV: "production" as const, USE_MOCK_DB: "true" },
     { NODE_ENV: "production" as const, USE_MOCK_DB: "false" },
   ];
 
-  integrationTestCases.forEach(({ NODE_ENV, USE_MOCK_DB }) => {
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
-  });
+  integrationTestCases.forEach(({ NODE_ENV, USE_MOCK_DB }) => {});
 });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
