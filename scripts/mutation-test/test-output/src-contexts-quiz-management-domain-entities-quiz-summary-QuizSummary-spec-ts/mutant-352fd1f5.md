# Mutant 352fd1f5 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: MethodExpression
**Original ID**: 3759
**Stable ID**: 352fd1f5
**Location**: L493:11–L493:80

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3759
@@ -489,9 +489,9 @@
         const result = quiz.addTags(newTagIds);
 
         const error = result._unsafeUnwrapErr({ withStackTrace: true });
         expect(
-          error.issues.some((issue) => issue.message.includes("already exist")),
+          error.issues.every(issue => issue.message.includes("already exist")),
         ).toBe(true);
       });
 
       describe("removeTags scenarios", () => {
```

## Hint

ミューテータ "MethodExpression" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
