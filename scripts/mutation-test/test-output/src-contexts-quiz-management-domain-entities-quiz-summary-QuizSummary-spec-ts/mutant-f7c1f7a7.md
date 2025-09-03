# Mutant f7c1f7a7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 3505
**Stable ID**: f7c1f7a7
**Location**: L223:59–L223:63

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3505
@@ -219,9 +219,9 @@
 
   describe("Generic Getter/Setter", () => {
     it("should get values with type safety", () => {
       const result = QuizSummary.from(validQuizData);
-      const quiz = result._unsafeUnwrap({ withStackTrace: true });
+      const quiz = result._unsafeUnwrap({ withStackTrace: false });
 
       const question = quiz.get("question");
       const status = quiz.get("status");
       const tagIds = quiz.get("tagIds");
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
