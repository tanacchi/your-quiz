# Mutant 7ed5caac Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3474
**Stable ID**: 7ed5caac
**Location**: L178:9–L178:54

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3474
@@ -174,9 +174,9 @@
         ["undefined tagIds", { tagIds: undefined }, []],
         ["null tagIds", { tagIds: null }, []],
         ["missing tagIds", {}, validQuizData.tagIds],
       ])(
-        "should handle %s and default to empty array",
+        "",
         (_desc, modification, expectedTagIds) => {
           const testData = {
             ...(validQuizData as Record<string, unknown>),
             ...modification,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
