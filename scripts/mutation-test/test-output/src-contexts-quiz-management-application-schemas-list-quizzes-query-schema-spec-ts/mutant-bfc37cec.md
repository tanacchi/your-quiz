# Mutant bfc37cec Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 407
**Stable ID**: bfc37cec
**Location**: L263:13–L263:27

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #407
@@ -259,9 +259,9 @@
         };
         const result = listQueryFromReq.safeParse(rawInput);
         expect(result.success).toBe(true);
 
-        if (result.success) {
+        if (true) {
           expect(result.data.status).toEqual(["pending_approval", "approved"]);
           expect(result.data.creatorId).toEqual("creator-123");
           expect(result.data.quizId).toEqual(["quiz-1"]);
         }
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
