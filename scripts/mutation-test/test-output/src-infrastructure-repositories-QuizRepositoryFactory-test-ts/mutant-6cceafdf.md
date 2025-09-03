# Mutant 6cceafdf Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: BlockStatement
**Original ID**: 9499
**Stable ID**: 6cceafdf
**Location**: L105:83–L135:2

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9499
@@ -101,35 +101,5 @@
     });
   });
 });
 
-describe("Integration: shouldUseMock and createQuizRepository consistency", () => {
-  // Integration test to ensure shouldUseMock and createQuizRepository are consistent
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
-
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
-});
+describe("Integration: shouldUseMock and createQuizRepository consistency", () => {});
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
