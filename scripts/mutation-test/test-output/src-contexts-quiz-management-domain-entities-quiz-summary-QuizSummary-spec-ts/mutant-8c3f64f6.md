# Mutant 8c3f64f6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3631
**Stable ID**: 8c3f64f6
**Location**: L346:56–L380:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3631
@@ -342,43 +342,9 @@
         expect(quiz.canBeDeleted()).toBe(expectedCanDelete);
       });
     });
 
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
+    describe("approve method state transitions", () => {});
   });
 
   describe("Tag Operations", () => {
     describe("Single tag operations", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
