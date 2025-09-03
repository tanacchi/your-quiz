# Mutant 62a30cbb Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1760
**Stable ID**: 62a30cbb
**Location**: L113:16–L113:35

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1760
@@ -109,9 +109,9 @@
         const result = suggestExplanationPatches(input);
         expect(result).toEqual(expected);
       });
 
-      describe("Patch Application", () => {
+      describe("", () => {
         it("should apply truncation patch correctly", () => {
           const longExplanation = "A".repeat(1001);
           const input = { ...validQuizInput, explanation: longExplanation };
           const patches = suggestExplanationPatches(input.explanation);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
