# Mutant dd7d49b1 Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: BlockStatement
**Original ID**: 9464
**Stable ID**: dd7d49b1
**Location**: L55:57–L59:4

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9464
@@ -51,13 +51,9 @@
       expected: false,
     },
   ];
 
-  testCases.forEach(({ description, env, expected }) => {
-    it(description, () => {
-      expect(shouldUseMock(env)).toBe(expected);
-    });
-  });
+  testCases.forEach(({ description, env, expected }) => {});
 });
 
 describe("createQuizRepository", () => {
   // Parameterized test cases for createQuizRepository
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
