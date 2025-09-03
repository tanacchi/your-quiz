# Mutant 90a69a33 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: LogicalOperator
**Original ID**: 237
**Stable ID**: 90a69a33
**Location**: L121:13–L121:38

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #237
@@ -117,9 +117,9 @@
         const input = quizId === undefined ? {} : { quizId };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(isValid);
 
-        if (isValid && result.success && quizId !== undefined) {
+        if (isValid || result.success && quizId !== undefined) {
           expect(result.data.quizId).toEqual(quizId);
         }
       });
     });
```

## Hint

論理演算子が置換されています（&&/|| ⇄ ||/&&）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
