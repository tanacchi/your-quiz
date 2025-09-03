# Mutant 0aacc8d8 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4586
**Stable ID**: 0aacc8d8
**Location**: L464:12–L464:53

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4586
@@ -460,9 +460,9 @@
         expect(hasAnswerTypePatch).toBe(true);
       });
 
       describe("Integration with applyEntityPatches", () => {
-        it("should apply multiple patches correctly", () => {
+        it("", () => {
           const input = {
             id: "  quiz-123  ",
             question: "",
             answerType: "bool" as unknown as "boolean",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
