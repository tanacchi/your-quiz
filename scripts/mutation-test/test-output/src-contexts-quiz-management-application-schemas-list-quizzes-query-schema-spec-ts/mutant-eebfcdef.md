# Mutant eebfcdef Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 286
**Stable ID**: eebfcdef
**Location**: L145:13–L145:38

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #286
@@ -141,9 +141,9 @@
         const input = limit === undefined ? {} : { limit };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(isValid);
 
-        if (isValid && result.success) {
+        if (false) {
           if (limit !== undefined) {
             expect(result.data.limit).toBe(limit);
           } else {
             expect(result.data.limit).toBe(10); // default
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
