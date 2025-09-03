# Mutant dbf01ac6 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 725
**Stable ID**: dbf01ac6
**Location**: L569:13–L569:27

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #725
@@ -565,9 +565,9 @@
         };
         const result = listQuizzesQuerySchema.safeParse(partialInput);
         expect(result.success).toBe(true);
 
-        if (result.success) {
+        if (true) {
           expect(result.data.status).toEqual(["pending_approval"]);
           expect(result.data.limit).toBe(5);
           expect(result.data.offset).toBe(0); // default
         }
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
