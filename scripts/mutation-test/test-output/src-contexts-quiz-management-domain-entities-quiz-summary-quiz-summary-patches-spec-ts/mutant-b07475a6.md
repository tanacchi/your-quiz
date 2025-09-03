# Mutant b07475a6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4584
**Stable ID**: b07475a6
**Location**: L463:16–L463:53

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4584
@@ -459,9 +459,9 @@
         expect(hasQuestionPatch).toBe(true);
         expect(hasAnswerTypePatch).toBe(true);
       });
 
-      describe("Integration with applyEntityPatches", () => {
+      describe("", () => {
         it("should apply multiple patches correctly", () => {
           const input = {
             id: "  quiz-123  ",
             question: "",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
