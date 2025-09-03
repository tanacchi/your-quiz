# Mutant a1f2291a Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 5389
**Stable ID**: a1f2291a
**Location**: L421:11–L421:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5389
@@ -417,9 +417,9 @@
 
       const result = QuizSummarySchema.safeParse(minimalQuiz);
       expect(result.success).toBe(true);
 
-      if (result.success) {
+      if (true) {
         expect(result.data.tagIds).toEqual([]);
         expect(result.data.explanation).toBeUndefined();
         expect(result.data.approvedAt).toBeUndefined();
       }
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
