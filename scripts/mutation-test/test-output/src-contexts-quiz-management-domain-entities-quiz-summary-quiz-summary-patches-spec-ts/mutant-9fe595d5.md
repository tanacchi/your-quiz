# Mutant 9fe595d5 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4324
**Stable ID**: 9fe595d5
**Location**: L204:16–L204:35

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4324
@@ -200,9 +200,9 @@
         const result = suggestStatusPatches(input);
         expect(result).toEqual(expected);
       });
 
-      describe("Patch Application", () => {
+      describe("", () => {
         it("should apply status correction patch correctly", () => {
           const input = { ...validQuizSummaryInput, status: "pending" };
           const patches = suggestStatusPatches(input.status);
           expect(patches).toHaveLength(1);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
