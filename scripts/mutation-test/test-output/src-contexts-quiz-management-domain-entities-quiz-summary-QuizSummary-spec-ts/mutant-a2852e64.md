# Mutant a2852e64 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3536
**Stable ID**: a2852e64
**Location**: L261:53–L275:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3536
@@ -257,24 +257,10 @@
       expect(updatedQuiz.get("question")).toBe("Updated question");
       expect(updatedQuiz.get("explanation")).toBe("Updated explanation");
     });
 
-    it("should update with mutator function", () => {
-      const initialResult = QuizSummary.from(validQuizData);
-      const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
+    it("should update with mutator function", () => {});
 
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
     it("should validate when setting invalid values", () => {
       const initialResult = QuizSummary.from(validQuizData);
       const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
