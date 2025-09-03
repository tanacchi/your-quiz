# Mutant 58e6e26a Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 3623
**Stable ID**: 58e6e26a
**Location**: L335:15–L335:36

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3623
@@ -331,9 +331,9 @@
       ])("should return %s for status %s", (status, expectedCanDelete) => {
         const testData = {
           ...(validQuizData as Record<string, unknown>),
           status,
-          ...(status === "approved" && {
+          ...(true && {
             approvedAt: "2023-12-01 12:00:00",
           }),
         };
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
