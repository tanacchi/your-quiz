# Mutant 687a21c4 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3632
**Stable ID**: 687a21c4
**Location**: L347:10–L347:52

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3632
@@ -343,9 +343,9 @@
       });
     });
 
     describe("approve method state transitions", () => {
-      it("should approve pending quiz successfully", () => {
+      it("", () => {
         const initialResult = QuizSummary.from(validQuizData);
         const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
         const approvedAt = "2023-12-01 12:00:00";
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
