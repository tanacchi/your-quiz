# Mutant 20aaa57d Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 713
**Stable ID**: 20aaa57d
**Location**: L552:13–L552:27

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #713
@@ -548,9 +548,9 @@
         };
         const result = listQuizzesQuerySchema.safeParse(validInput);
         expect(result.success).toBe(true);
 
-        if (result.success) {
+        if (false) {
           // Type checks - these should compile without errors
           const data: ListQuizzesQuery = result.data;
           expect(data.status).toEqual(["approved"]);
           expect(typeof data.limit).toBe("number");
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
