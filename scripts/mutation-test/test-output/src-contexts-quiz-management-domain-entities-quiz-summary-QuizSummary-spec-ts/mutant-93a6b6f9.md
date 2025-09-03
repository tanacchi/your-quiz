# Mutant 93a6b6f9 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3559
**Stable ID**: 93a6b6f9
**Location**: L289:45–L302:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3559
@@ -285,22 +285,9 @@
     });
   });
 
   describe("Fluent API", () => {
-    it("should chain setter methods", () => {
-      const initialResult = QuizSummary.from(validQuizData);
-      const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
-
-      const result = quiz
-        .update("question", "New question")
-        .andThen((q) => q.update("explanation", "New explanation"))
-        .andThen((q) => q.update("answerType", "multiple_choice"));
-
-      const finalQuiz = result._unsafeUnwrap({ withStackTrace: true });
-      expect(finalQuiz.get("question")).toBe("New question");
-      expect(finalQuiz.get("explanation")).toBe("New explanation");
-      expect(finalQuiz.get("answerType")).toBe("multiple_choice");
-    });
+    it("should chain setter methods", () => {});
   });
 
   describe("Business Logic", () => {
     describe("canBeUpdated status checks", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
