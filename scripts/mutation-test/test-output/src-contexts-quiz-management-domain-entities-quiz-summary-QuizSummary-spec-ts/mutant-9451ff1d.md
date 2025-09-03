# Mutant 9451ff1d Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3523
**Stable ID**: 9451ff1d
**Location**: L247:66–L259:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3523
@@ -243,22 +243,10 @@
       expect(quiz.get("question")).toBe("What is TypeScript?"); // original unchanged
       expect(quiz).not.toBe(updatedQuiz); // different instances
     });
 
-    it("should update multiple fields with 'with' method", () => {
-      const initialResult = QuizSummary.from(validQuizData);
-      const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
+    it("should update multiple fields with 'with' method", () => {});
 
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
     it("should update with mutator function", () => {
       const initialResult = QuizSummary.from(validQuizData);
       const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
