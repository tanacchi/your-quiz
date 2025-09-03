# Mutant c9cf2736 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 5279
**Stable ID**: c9cf2736
**Location**: L304:13–L304:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5279
@@ -300,9 +300,9 @@
         };
         const result = QuizSummarySchema.safeParse(dataWithDuplicateTagIds);
         expect(result.success).toBe(false);
 
-        if (!result.success) {
+        if (result.success) {
           const error = result.error as ZodError;
           const duplicateError = error.issues.find((issue) =>
             issue.path.includes("tagIds"),
           );
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
