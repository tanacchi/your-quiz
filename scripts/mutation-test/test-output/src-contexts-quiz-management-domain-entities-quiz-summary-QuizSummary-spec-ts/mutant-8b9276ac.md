# Mutant 8b9276ac Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3502
**Stable ID**: 8b9276ac
**Location**: L221:8–L221:44

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3502
@@ -217,9 +217,9 @@
     });
   });
 
   describe("Generic Getter/Setter", () => {
-    it("should get values with type safety", () => {
+    it("", () => {
       const result = QuizSummary.from(validQuizData);
       const quiz = result._unsafeUnwrap({ withStackTrace: true });
 
       const question = quiz.get("question");
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
