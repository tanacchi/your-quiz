# Mutant ac103b2e Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: LogicalOperator
**Original ID**: 287
**Stable ID**: ac103b2e
**Location**: L145:13–L145:38

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #287
@@ -141,9 +141,9 @@
         const input = limit === undefined ? {} : { limit };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(isValid);
 
-        if (isValid && result.success) {
+        if (isValid || result.success) {
           if (limit !== undefined) {
             expect(result.data.limit).toBe(limit);
           } else {
             expect(result.data.limit).toBe(10); // default
```

## Hint

論理演算子が置換されています（&&/|| ⇄ ||/&&）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
