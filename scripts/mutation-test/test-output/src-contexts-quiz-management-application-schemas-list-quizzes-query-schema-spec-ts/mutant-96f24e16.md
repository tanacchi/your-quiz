# Mutant 96f24e16 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 654
**Stable ID**: 96f24e16
**Location**: L476:13–L476:28

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #654
@@ -472,9 +472,9 @@
         const input = { limit: 0 };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(false);
 
-        if (!result.success) {
+        if (true) {
           const error = result.error as ZodError;
           const limitError = error.issues.find((issue) =>
             issue.path.includes("limit"),
           );
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
