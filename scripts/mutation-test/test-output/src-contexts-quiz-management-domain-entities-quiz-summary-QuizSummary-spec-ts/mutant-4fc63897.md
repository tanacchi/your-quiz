# Mutant 4fc63897 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3581
**Stable ID**: 4fc63897
**Location**: L306:50–L324:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3581
@@ -302,28 +302,10 @@
     });
   });
 
   describe("Business Logic", () => {
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
+    describe("canBeUpdated status checks", () => {});
 
-        const result = QuizSummary.from(testData);
-        const quiz = result._unsafeUnwrap({ withStackTrace: true });
-        expect(quiz.canBeUpdated()).toBe(expectedCanUpdate);
-      });
-    });
-
     describe("canBeDeleted status checks", () => {
       it.each([
         ["pending_approval", true],
         ["approved", false],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
