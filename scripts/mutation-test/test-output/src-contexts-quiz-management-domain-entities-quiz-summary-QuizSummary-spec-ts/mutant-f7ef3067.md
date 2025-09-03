# Mutant f7ef3067 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3579
**Stable ID**: f7ef3067
**Location**: L305:36–L381:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3579
@@ -301,86 +301,10 @@
       expect(finalQuiz.get("answerType")).toBe("multiple_choice");
     });
   });
 
-  describe("Business Logic", () => {
-    describe("canBeUpdated status checks", () => {
-      it.each([
-        ["pending_approval", true],
-        ["approved", false],
-        ["rejected", false],
-      ])("should return %s for status %s", (status, expectedCanUpdate) => {
-        const testData = {
-          ...(validQuizData as Record<string, unknown>),
-          status,
-          ...(status === "approved" && {
-            approvedAt: "2023-12-01 12:00:00",
-          }),
-        };
+  describe("Business Logic", () => {});
 
-        const result = QuizSummary.from(testData);
-        const quiz = result._unsafeUnwrap({ withStackTrace: true });
-        expect(quiz.canBeUpdated()).toBe(expectedCanUpdate);
-      });
-    });
-
-    describe("canBeDeleted status checks", () => {
-      it.each([
-        ["pending_approval", true],
-        ["approved", false],
-        ["rejected", true],
-      ])("should return %s for status %s", (status, expectedCanDelete) => {
-        const testData = {
-          ...(validQuizData as Record<string, unknown>),
-          status,
-          ...(status === "approved" && {
-            approvedAt: "2023-12-01 12:00:00",
-          }),
-        };
-
-        const result = QuizSummary.from(testData);
-        const quiz = result._unsafeUnwrap({ withStackTrace: true });
-        expect(quiz.canBeDeleted()).toBe(expectedCanDelete);
-      });
-    });
-
-    describe("approve method state transitions", () => {
-      it("should approve pending quiz successfully", () => {
-        const initialResult = QuizSummary.from(validQuizData);
-        const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
-        const approvedAt = "2023-12-01 12:00:00";
-
-        const result = quiz.approve(approvedAt);
-
-        const approvedQuiz = result._unsafeUnwrap({ withStackTrace: true });
-        expect(approvedQuiz.get("status")).toBe("approved");
-        expect(approvedQuiz.get("approvedAt")).toBe(approvedAt);
-      });
-
-      it.each([
-        ["approved", "2023-12-01 12:00:00"],
-        ["rejected", undefined],
-      ])("should reject approval for %s status", (status, approvedAt) => {
-        const testData = {
-          ...(validQuizData as Record<string, unknown>),
-          status,
-          ...(approvedAt && { approvedAt }),
-        };
-        const initialResult = QuizSummary.from(testData);
-        const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
-
-        const result = quiz.approve("2023-12-02 12:00:00");
-
-        const error = result._unsafeUnwrapErr({ withStackTrace: true });
-        expect(
-          error.issues.some((issue) =>
-            issue.message.includes(`${status} cannot be approved`),
-          ),
-        ).toBe(true);
-      });
-    });
-  });
-
   describe("Tag Operations", () => {
     describe("Single tag operations", () => {
       describe("addTag success scenarios", () => {
         it.each([
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
