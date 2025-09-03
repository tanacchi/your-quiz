# Mutant ef4d4473 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: EqualityOperator
**Original ID**: 170
**Stable ID**: ef4d4473
**Location**: L97:42–L97:65

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #170
@@ -93,9 +93,9 @@
         const input = creatorId === undefined ? {} : { creatorId };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(isValid);
 
-        if (isValid && result.success && creatorId !== undefined) {
+        if (isValid && result.success && creatorId === undefined) {
           expect(result.data.creatorId).toEqual(creatorId);
         }
       });
     });
```

## Hint

等価演算子が置換されています（==/=== ⇄ !=/!==）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
