# Mutant 4e4f6608 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3593
**Stable ID**: 4e4f6608
**Location**: L311:75–L323:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3593
@@ -307,21 +307,9 @@
       it.each([
         ["pending_approval", true],
         ["approved", false],
         ["rejected", false],
-      ])("should return %s for status %s", (status, expectedCanUpdate) => {
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
-        expect(quiz.canBeUpdated()).toBe(expectedCanUpdate);
-      });
+      ])("should return %s for status %s", (status, expectedCanUpdate) => {});
     });
 
     describe("canBeDeleted status checks", () => {
       it.each([
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
