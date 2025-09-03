# Mutant 075bc806 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 5281
**Stable ID**: 075bc806
**Location**: L304:13–L304:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5281
@@ -300,9 +300,9 @@
         };
         const result = QuizSummarySchema.safeParse(dataWithDuplicateTagIds);
         expect(result.success).toBe(false);
 
-        if (!result.success) {
+        if (false) {
           const error = result.error as ZodError;
           const duplicateError = error.issues.find((issue) =>
             issue.path.includes("tagIds"),
           );
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
