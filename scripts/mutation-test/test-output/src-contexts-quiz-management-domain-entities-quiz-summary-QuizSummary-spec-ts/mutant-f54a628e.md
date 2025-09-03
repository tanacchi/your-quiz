# Mutant f54a628e Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3901
**Stable ID**: f54a628e
**Location**: L633:10–L633:36

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3901
@@ -629,9 +629,9 @@
 
       it.each([
         ["existing field", "question", ""],
         ["non-existent field", "nonexistent", ""],
-      ])("should get errors for %s", (_desc, field, invalidValue) => {
+      ])("", (_desc, field, invalidValue) => {
         if (field === "question") {
           draft.update("question", invalidValue);
         }
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
