# Mutant c0597ca6 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 367
**Stable ID**: c0597ca6
**Location**: L211:13–L211:27

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #367
@@ -207,9 +207,9 @@
         };
         const result = listQuizzesQuerySchema.safeParse(validQuery);
         expect(result.success).toBe(true);
 
-        if (result.success) {
+        if (true) {
           expect(result.data).toEqual(validQuery);
         }
       });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
