# Mutant b122f13c Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 119
**Stable ID**: b122f13c
**Location**: L76:13–L76:27

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #119
@@ -72,9 +72,9 @@
       it("should apply default status when undefined", () => {
         const result = listQuizzesQuerySchema.safeParse({});
         expect(result.success).toBe(true);
 
-        if (result.success) {
+        if (true) {
           expect(result.data.status).toEqual(["approved"]);
         }
       });
     });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
