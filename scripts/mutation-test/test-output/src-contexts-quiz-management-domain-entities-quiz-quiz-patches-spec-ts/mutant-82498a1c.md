# Mutant 82498a1c Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2547
**Stable ID**: 82498a1c
**Location**: L845:35–L845:45

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2547
@@ -841,9 +841,9 @@
       ];
 
       const patches = suggestQuizPatches(messyInput, issues);
       const cleanedInput = applyEntityPatches(messyInput, patches);
-      if (typeof cleanedInput === "function") {
+      if (typeof cleanedInput === "") {
         throw new Error("patched must be an object.");
       }
       expect(cleanedInput.id).toBe("quiz-123");
       expect(cleanedInput.question).toBe("Sample boolean question?");
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
