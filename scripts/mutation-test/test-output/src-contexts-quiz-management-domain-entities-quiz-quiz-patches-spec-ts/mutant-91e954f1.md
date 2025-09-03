# Mutant 91e954f1 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 2369
**Stable ID**: 91e954f1
**Location**: L663:15–L663:44

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2369
@@ -659,9 +659,9 @@
           ];
 
           const patches = suggestQuizPatches(input, issues);
           const patched = applyEntityPatches(input, patches);
-          if (typeof patched === "function") {
+          if (false) {
             throw new Error("patched must be an object.");
           }
           expect(patched.answerType).toBe("boolean");
           expect(patched.solution).toEqual({
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
