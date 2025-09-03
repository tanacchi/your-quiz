# Mutant bc363edd Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3512
**Stable ID**: bc363edd
**Location**: L234:65–L245:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3512
@@ -230,21 +230,10 @@
       expect(status).toBe("pending_approval");
       expect(tagIds).toEqual(validTagIds);
     });
 
-    it("should set single field and return new instance", () => {
-      const initialResult = QuizSummary.from(validQuizData);
-      const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
+    it("should set single field and return new instance", () => {});
 
-      const newQuestion = "What is JavaScript?";
-      const result = quiz.update("question", newQuestion);
-
-      const updatedQuiz = result._unsafeUnwrap({ withStackTrace: true });
-      expect(updatedQuiz.get("question")).toBe(newQuestion);
-      expect(quiz.get("question")).toBe("What is TypeScript?"); // original unchanged
-      expect(quiz).not.toBe(updatedQuiz); // different instances
-    });
-
     it("should update multiple fields with 'with' method", () => {
       const initialResult = QuizSummary.from(validQuizData);
       const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
