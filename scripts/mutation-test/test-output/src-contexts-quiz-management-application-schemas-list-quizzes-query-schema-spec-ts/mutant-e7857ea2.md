# Mutant e7857ea2 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 393
**Stable ID**: e7857ea2
**Location**: L247:13–L247:27

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #393
@@ -243,9 +243,9 @@
         const rawInput = {};
         const result = listQueryFromReq.safeParse(rawInput);
         expect(result.success).toBe(true);
 
-        if (result.success) {
+        if (false) {
           expect(result.data.status).toEqual(["approved"]);
           expect(result.data.limit).toBe(10);
           expect(result.data.offset).toBe(0);
         }
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
