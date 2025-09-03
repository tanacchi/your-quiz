# Mutant 8cbae434 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 3110
**Stable ID**: 8cbae434
**Location**: L298:13–L298:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3110
@@ -294,9 +294,9 @@
         };
         const result = QuizSchema.safeParse(approvedWithoutTimestamp);
         expect(result.success).toBe(false);
 
-        if (!result.success) {
+        if (result.success) {
           const error = result.error as ZodError;
           const approvedAtError = error.issues.find((issue) =>
             issue.path.includes("approvedAt"),
           );
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
