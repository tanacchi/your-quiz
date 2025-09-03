# Mutant 6bbdbe38 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4095
**Stable ID**: 6bbdbe38
**Location**: L52:16–L52:35

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4095
@@ -48,9 +48,9 @@
         const result = suggestQuestionPatches(input);
         expect(result).toEqual(expected);
       });
 
-      describe("Patch Application", () => {
+      describe("", () => {
         it("should apply trim patch correctly", () => {
           const input = { ...validQuizSummaryInput, question: "  Untrimmed  " };
           const patches = suggestQuestionPatches(input.question);
           expect(patches).toHaveLength(1);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
