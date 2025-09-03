# Mutant a83dde16 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3809
**Stable ID**: a83dde16
**Location**: L546:8–L546:44

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3809
@@ -542,9 +542,9 @@
         expect(draft.get(field as keyof typeof validQuizData)).toBe(value);
       });
     });
 
-    it("should set multiple values at once", () => {
+    it("", () => {
       const updates = {
         question: "Draft question",
         answerType: "single_choice",
         explanation: "Draft explanation",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
