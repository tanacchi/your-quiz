# Mutant 5bb531e0 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 696
**Stable ID**: 5bb531e0
**Location**: L527:13–L527:28

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #696
@@ -523,9 +523,9 @@
         };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(false);
 
-        if (!result.success) {
+        if (true) {
           const error = result.error as ZodError;
           expect(error.issues.length).toBeGreaterThan(1);
 
           const errorPaths = error.issues.map((issue) => issue.path[0]);
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
