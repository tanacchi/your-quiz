# Mutant f8e9eebc Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 3239
**Stable ID**: f8e9eebc
**Location**: L469:11–L469:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3239
@@ -465,9 +465,9 @@
 
       const result = QuizSchema.safeParse(minimalQuiz);
       expect(result.success).toBe(true);
 
-      if (result.success) {
+      if (false) {
         expect(result.data.explanation).toBeUndefined();
         expect(result.data.approvedAt).toBeUndefined();
         expect(result.data.solution.value).toBe(false);
       }
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
