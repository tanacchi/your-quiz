# Mutant c1de6944 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4143
**Stable ID**: c1de6944
**Location**: L94:16–L94:35

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4143
@@ -90,9 +90,9 @@
         const result = suggestExplanationPatches(input);
         expect(result).toEqual(expected);
       });
 
-      describe("Patch Application", () => {
+      describe("", () => {
         it("should apply trim patch correctly", () => {
           const input = {
             ...validQuizSummaryInput,
             explanation: "  Untrimmed explanation  ",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
