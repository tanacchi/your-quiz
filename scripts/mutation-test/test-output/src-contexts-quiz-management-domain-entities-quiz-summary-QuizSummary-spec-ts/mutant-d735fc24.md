# Mutant d735fc24 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3618
**Stable ID**: d735fc24
**Location**: L331:75–L343:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3618
@@ -327,21 +327,9 @@
       it.each([
         ["pending_approval", true],
         ["approved", false],
         ["rejected", true],
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
+      ])("should return %s for status %s", (status, expectedCanDelete) => {});
     });
 
     describe("approve method state transitions", () => {
       it("should approve pending quiz successfully", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
