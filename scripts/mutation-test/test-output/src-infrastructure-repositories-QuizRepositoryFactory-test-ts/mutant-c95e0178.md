# Mutant c95e0178 Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: BlockStatement
**Original ID**: 9496
**Stable ID**: c95e0178
**Location**: L97:71–L102:4

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9496
@@ -93,14 +93,9 @@
       expectedType: D1QuizRepository,
     },
   ];
 
-  repositoryTestCases.forEach(({ description, env, expectedType }) => {
-    it(description, () => {
-      const repository = createQuizRepository(env);
-      expect(repository).toBeInstanceOf(expectedType);
-    });
-  });
+  repositoryTestCases.forEach(({ description, env, expectedType }) => {});
 });
 
 describe("Integration: shouldUseMock and createQuizRepository consistency", () => {
   // Integration test to ensure shouldUseMock and createQuizRepository are consistent
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
