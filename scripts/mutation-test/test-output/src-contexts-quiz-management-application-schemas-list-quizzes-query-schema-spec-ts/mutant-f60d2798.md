# Mutant f60d2798 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 591
**Stable ID**: f60d2798
**Location**: L412:13–L412:27

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #591
@@ -408,9 +408,9 @@
         };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(true);
 
-        if (result.success) {
+        if (true) {
           expect(result.data.status).toHaveLength(1);
           expect(result.data.creatorId).toBe("single-creator");
           expect(result.data.quizId).toHaveLength(1);
         }
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
