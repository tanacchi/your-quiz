# Mutant e08badbb Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 3133
**Stable ID**: e08badbb
**Location**: L334:13–L334:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3133
@@ -330,9 +330,9 @@
         };
         const result = QuizSchema.safeParse(dataWithoutSolution);
         expect(result.success).toBe(false);
 
-        if (!result.success) {
+        if (false) {
           const error = result.error as ZodError;
           const solutionError = error.issues.find((issue) =>
             issue.path.includes("solution"),
           );
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
