# Mutant c0e255a9 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: MethodExpression
**Original ID**: 3695
**Stable ID**: c0e255a9
**Location**: L416:11–L418:12

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3695
@@ -412,11 +412,9 @@
         const result = quiz.addTag(existingTagId);
 
         const error = result._unsafeUnwrapErr({ withStackTrace: true });
         expect(
-          error.issues.some((issue) =>
-            issue.message.includes("already exists"),
-          ),
+          error.issues.every(issue => issue.message.includes("already exists")),
         ).toBe(true);
       });
 
       describe("removeTag scenarios", () => {
```

## Hint

ミューテータ "MethodExpression" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
