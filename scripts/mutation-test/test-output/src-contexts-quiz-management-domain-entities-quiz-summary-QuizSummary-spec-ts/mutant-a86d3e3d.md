# Mutant a86d3e3d Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3501
**Stable ID**: a86d3e3d
**Location**: L220:43–L286:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3501
@@ -216,76 +216,10 @@
       expect(Object.isFrozen(quiz)).toBe(true);
     });
   });
 
-  describe("Generic Getter/Setter", () => {
-    it("should get values with type safety", () => {
-      const result = QuizSummary.from(validQuizData);
-      const quiz = result._unsafeUnwrap({ withStackTrace: true });
+  describe("Generic Getter/Setter", () => {});
 
-      const question = quiz.get("question");
-      const status = quiz.get("status");
-      const tagIds = quiz.get("tagIds");
-
-      expect(question).toBe("What is TypeScript?");
-      expect(status).toBe("pending_approval");
-      expect(tagIds).toEqual(validTagIds);
-    });
-
-    it("should set single field and return new instance", () => {
-      const initialResult = QuizSummary.from(validQuizData);
-      const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
-
-      const newQuestion = "What is JavaScript?";
-      const result = quiz.update("question", newQuestion);
-
-      const updatedQuiz = result._unsafeUnwrap({ withStackTrace: true });
-      expect(updatedQuiz.get("question")).toBe(newQuestion);
-      expect(quiz.get("question")).toBe("What is TypeScript?"); // original unchanged
-      expect(quiz).not.toBe(updatedQuiz); // different instances
-    });
-
-    it("should update multiple fields with 'with' method", () => {
-      const initialResult = QuizSummary.from(validQuizData);
-      const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
-
-      const result = quiz.with({
-        question: "Updated question",
-        explanation: "Updated explanation",
-      });
-
-      const updatedQuiz = result._unsafeUnwrap({ withStackTrace: true });
-      expect(updatedQuiz.get("question")).toBe("Updated question");
-      expect(updatedQuiz.get("explanation")).toBe("Updated explanation");
-    });
-
-    it("should update with mutator function", () => {
-      const initialResult = QuizSummary.from(validQuizData);
-      const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
-
-      const result = quiz.withMutator((draft) => {
-        draft.question = "Mutator updated question";
-        draft.explanation = "Mutator updated explanation";
-      });
-
-      const updatedQuiz = result._unsafeUnwrap({ withStackTrace: true });
-      expect(updatedQuiz.get("question")).toBe("Mutator updated question");
-      expect(updatedQuiz.get("explanation")).toBe(
-        "Mutator updated explanation",
-      );
-    });
-
-    it("should validate when setting invalid values", () => {
-      const initialResult = QuizSummary.from(validQuizData);
-      const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
-
-      const result = quiz.update("question", ""); // empty string should fail
-
-      const error = result._unsafeUnwrapErr({ withStackTrace: true });
-      expect(error).toBeDefined();
-    });
-  });
-
   describe("Fluent API", () => {
     it("should chain setter methods", () => {
       const initialResult = QuizSummary.from(validQuizData);
       const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
