# Mutant 62d7fed5 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 5247
**Stable ID**: 62d7fed5
**Location**: L253:13–L253:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5247
@@ -249,9 +249,9 @@
         };
         const result = QuizSummarySchema.safeParse(approvedWithoutTimestamp);
         expect(result.success).toBe(false);
 
-        if (!result.success) {
+        if (false) {
           const error = result.error as ZodError;
           const approvedAtError = error.issues.find((issue) =>
             issue.path.includes("approvedAt"),
           );
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
