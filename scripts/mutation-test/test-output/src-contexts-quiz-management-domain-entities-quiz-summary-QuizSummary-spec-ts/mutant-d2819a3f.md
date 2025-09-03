# Mutant d2819a3f Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3557
**Stable ID**: d2819a3f
**Location**: L288:32–L303:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3557
@@ -284,25 +284,10 @@
       expect(error).toBeDefined();
     });
   });
 
-  describe("Fluent API", () => {
-    it("should chain setter methods", () => {
-      const initialResult = QuizSummary.from(validQuizData);
-      const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
+  describe("Fluent API", () => {});
 
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
-  });
-
   describe("Business Logic", () => {
     describe("canBeUpdated status checks", () => {
       it.each([
         ["pending_approval", true],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
