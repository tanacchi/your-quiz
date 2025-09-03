# Mutant 78d16bd8 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 695
**Stable ID**: 78d16bd8
**Location**: L527:13–L527:28

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #695
@@ -523,9 +523,9 @@
         };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(false);
 
-        if (!result.success) {
+        if (result.success) {
           const error = result.error as ZodError;
           expect(error.issues.length).toBeGreaterThan(1);
 
           const errorPaths = error.issues.map((issue) => issue.path[0]);
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
