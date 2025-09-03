# Mutant b290a8f1 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3606
**Stable ID**: b290a8f1
**Location**: L326:50–L344:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3606
@@ -322,28 +322,10 @@
         expect(quiz.canBeUpdated()).toBe(expectedCanUpdate);
       });
     });
 
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
+    describe("canBeDeleted status checks", () => {});
 
-        const result = QuizSummary.from(testData);
-        const quiz = result._unsafeUnwrap({ withStackTrace: true });
-        expect(quiz.canBeDeleted()).toBe(expectedCanDelete);
-      });
-    });
-
     describe("approve method state transitions", () => {
       it("should approve pending quiz successfully", () => {
         const initialResult = QuizSummary.from(validQuizData);
         const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
