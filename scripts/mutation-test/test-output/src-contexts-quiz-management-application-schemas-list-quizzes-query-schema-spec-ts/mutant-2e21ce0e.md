# Mutant 2e21ce0e Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: LogicalOperator
**Original ID**: 112
**Stable ID**: 2e21ce0e
**Location**: L67:13–L67:38

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #112
@@ -63,9 +63,9 @@
         const input = status === undefined ? {} : { status };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(isValid);
 
-        if (isValid && result.success && status !== undefined) {
+        if (isValid || result.success && status !== undefined) {
           expect(result.data.status).toEqual(status);
         }
       });
```

## Hint

論理演算子が置換されています（&&/|| ⇄ ||/&&）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
