# Mutant cdaef34f Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 22
**Stable ID**: cdaef34f
**Location**: L17:13–L17:27

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #22
@@ -13,9 +13,9 @@
         const emptyInput = {};
         const result = listQuizzesQuerySchema.safeParse(emptyInput);
         expect(result.success).toBe(true);
 
-        if (result.success) {
+        if (true) {
           const data = result.data as ListQuizzesQuery;
           expect(data.status).toEqual(["approved"]);
           expect(data.limit).toBe(10);
           expect(data.offset).toBe(0);
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
