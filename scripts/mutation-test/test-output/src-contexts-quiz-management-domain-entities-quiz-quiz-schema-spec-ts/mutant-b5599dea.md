# Mutant b5599dea Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 3111
**Stable ID**: b5599dea
**Location**: L298:13–L298:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3111
@@ -294,9 +294,9 @@
         };
         const result = QuizSchema.safeParse(approvedWithoutTimestamp);
         expect(result.success).toBe(false);
 
-        if (!result.success) {
+        if (true) {
           const error = result.error as ZodError;
           const approvedAtError = error.issues.find((issue) =>
             issue.path.includes("approvedAt"),
           );
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
