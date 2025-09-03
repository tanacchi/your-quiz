# Mutant 026d4b03 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 5377
**Stable ID**: 026d4b03
**Location**: L400:11–L400:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5377
@@ -396,9 +396,9 @@
 
       const result = QuizSummarySchema.safeParse(fullApprovedQuiz);
       expect(result.success).toBe(true);
 
-      if (result.success) {
+      if (false) {
         expect(result.data.tagIds).toHaveLength(3);
         expect(result.data.status).toBe("approved");
         expect(result.data.approvedAt).toBeDefined();
       }
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
