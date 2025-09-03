# Mutant 1b16b05e Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3852
**Stable ID**: 1b16b05e
**Location**: L582:34–L582:36

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3852
@@ -578,9 +578,9 @@
       );
 
       it("should clear errors when data becomes valid", () => {
         // First set invalid data
-        draft.update("question", "");
+        draft.update("question", "Stryker was here!");
         expect(draft.hasErrors()).toBe(true);
 
         // Then fix the data
         draft.update("question", "Valid question");
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
