# Mutant 9223aaaf Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 35
**Stable ID**: 9223aaaf
**Location**: L36:13–L36:27

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #35
@@ -32,9 +32,9 @@
         };
         const result = listQuizzesQuerySchema.safeParse(customInput);
         expect(result.success).toBe(true);
 
-        if (result.success) {
+        if (false) {
           expect(result.data.status).toEqual(["pending_approval", "rejected"]);
           expect(result.data.limit).toBe(25);
           expect(result.data.offset).toBe(50);
         }
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
