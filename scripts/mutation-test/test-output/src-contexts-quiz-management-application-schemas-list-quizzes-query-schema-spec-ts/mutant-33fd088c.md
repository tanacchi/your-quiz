# Mutant 33fd088c Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: EqualityOperator
**Original ID**: 239
**Stable ID**: 33fd088c
**Location**: L121:42–L121:62

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #239
@@ -117,9 +117,9 @@
         const input = quizId === undefined ? {} : { quizId };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(isValid);
 
-        if (isValid && result.success && quizId !== undefined) {
+        if (isValid && result.success && quizId === undefined) {
           expect(result.data.quizId).toEqual(quizId);
         }
       });
     });
```

## Hint

等価演算子が置換されています（==/=== ⇄ !=/!==）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
