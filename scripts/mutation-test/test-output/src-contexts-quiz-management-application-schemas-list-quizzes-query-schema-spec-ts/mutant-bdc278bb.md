# Mutant bdc278bb Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 653
**Stable ID**: bdc278bb
**Location**: L476:13–L476:28

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #653
@@ -472,9 +472,9 @@
         const input = { limit: 0 };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(false);
 
-        if (!result.success) {
+        if (result.success) {
           const error = result.error as ZodError;
           const limitError = error.issues.find((issue) =>
             issue.path.includes("limit"),
           );
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
