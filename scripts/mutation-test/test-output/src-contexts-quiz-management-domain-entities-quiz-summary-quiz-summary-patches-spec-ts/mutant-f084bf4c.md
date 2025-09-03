# Mutant f084bf4c Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4479
**Stable ID**: f084bf4c
**Location**: L389:10–L389:76

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4479
@@ -385,9 +385,9 @@
         expect(result).toContainEqual({ question: "Valid question" });
         expect(result).toContainEqual({ answerType: "single_choice" });
       });
 
-      it("should suggest patches for all relevant fields when issues exist", () => {
+      it("", () => {
         const input = {
           id: "  quiz-123  ",
           question: "",
           explanation: "  explanation  ",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
