# Mutant 1badf2a6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3849
**Stable ID**: 1badf2a6
**Location**: L580:10–L580:55

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3849
@@ -576,9 +576,9 @@
           expect(fieldErrors.length).toBeGreaterThan(0);
         },
       );
 
-      it("should clear errors when data becomes valid", () => {
+      it("", () => {
         // First set invalid data
         draft.update("question", "");
         expect(draft.hasErrors()).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
