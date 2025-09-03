# Mutant 088ba6ff Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: BlockStatement
**Original ID**: 9465
**Stable ID**: 088ba6ff
**Location**: L56:27–L58:6

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9465
@@ -52,11 +52,9 @@
     },
   ];
 
   testCases.forEach(({ description, env, expected }) => {
-    it(description, () => {
-      expect(shouldUseMock(env)).toBe(expected);
-    });
+    it(description, () => {});
   });
 });
 
 describe("createQuizRepository", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
