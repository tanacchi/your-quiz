# Mutant b972d8f0 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 496
**Stable ID**: b972d8f0
**Location**: L324:13–L324:27

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #496
@@ -320,9 +320,9 @@
         };
         const result = listQueryFromReq.safeParse(httpQueryParams);
         expect(result.success).toBe(true);
 
-        if (result.success) {
+        if (true) {
           expect(result.data.status).toEqual(["approved", "pending_approval"]);
           expect(result.data.creatorId).toEqual("user-123");
           expect(result.data.limit).toBe(20);
           expect(result.data.offset).toBe(0);
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
