# Mutant ddc23834 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 2545
**Stable ID**: ddc23834
**Location**: L845:11–L845:45

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2545
@@ -841,9 +841,9 @@
       ];
 
       const patches = suggestQuizPatches(messyInput, issues);
       const cleanedInput = applyEntityPatches(messyInput, patches);
-      if (typeof cleanedInput === "function") {
+      if (false) {
         throw new Error("patched must be an object.");
       }
       expect(cleanedInput.id).toBe("quiz-123");
       expect(cleanedInput.question).toBe("Sample boolean question?");
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
