# Mutant aa924c64 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 3635
**Stable ID**: aa924c64
**Location**: L349:68–L349:72

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3635
@@ -345,9 +345,9 @@
 
     describe("approve method state transitions", () => {
       it("should approve pending quiz successfully", () => {
         const initialResult = QuizSummary.from(validQuizData);
-        const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
+        const quiz = initialResult._unsafeUnwrap({ withStackTrace: false });
         const approvedAt = "2023-12-01 12:00:00";
 
         const result = quiz.approve(approvedAt);
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
