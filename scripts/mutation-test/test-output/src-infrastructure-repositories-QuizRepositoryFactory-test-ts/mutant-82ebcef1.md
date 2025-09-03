# Mutant 82ebcef1 Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: BlockStatement
**Original ID**: 9497
**Stable ID**: 82ebcef1
**Location**: L98:27–L101:6

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9497
@@ -94,12 +94,9 @@
     },
   ];
 
   repositoryTestCases.forEach(({ description, env, expectedType }) => {
-    it(description, () => {
-      const repository = createQuizRepository(env);
-      expect(repository).toBeInstanceOf(expectedType);
-    });
+    it(description, () => {});
   });
 });
 
 describe("Integration: shouldUseMock and createQuizRepository consistency", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
