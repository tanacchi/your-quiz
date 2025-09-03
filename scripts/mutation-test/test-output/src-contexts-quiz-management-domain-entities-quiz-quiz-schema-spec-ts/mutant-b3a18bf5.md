# Mutant b3a18bf5 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 3112
**Stable ID**: b3a18bf5
**Location**: L298:13–L298:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3112
@@ -294,9 +294,9 @@
         };
         const result = QuizSchema.safeParse(approvedWithoutTimestamp);
         expect(result.success).toBe(false);
 
-        if (!result.success) {
+        if (false) {
           const error = result.error as ZodError;
           const approvedAtError = error.issues.find((issue) =>
             issue.path.includes("approvedAt"),
           );
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
