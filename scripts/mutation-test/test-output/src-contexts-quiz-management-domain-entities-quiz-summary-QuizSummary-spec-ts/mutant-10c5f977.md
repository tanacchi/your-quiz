# Mutant 10c5f977 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3633
**Stable ID**: 10c5f977
**Location**: L347:60–L357:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3633
@@ -343,20 +343,10 @@
       });
     });
 
     describe("approve method state transitions", () => {
-      it("should approve pending quiz successfully", () => {
-        const initialResult = QuizSummary.from(validQuizData);
-        const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
-        const approvedAt = "2023-12-01 12:00:00";
+      it("should approve pending quiz successfully", () => {});
 
-        const result = quiz.approve(approvedAt);
-
-        const approvedQuiz = result._unsafeUnwrap({ withStackTrace: true });
-        expect(approvedQuiz.get("status")).toBe("approved");
-        expect(approvedQuiz.get("approvedAt")).toBe(approvedAt);
-      });
-
       it.each([
         ["approved", "2023-12-01 12:00:00"],
         ["rejected", undefined],
       ])("should reject approval for %s status", (status, approvedAt) => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
