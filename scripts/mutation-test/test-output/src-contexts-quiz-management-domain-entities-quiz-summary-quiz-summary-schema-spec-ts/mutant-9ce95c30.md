# Mutant 9ce95c30 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 5245
**Stable ID**: 9ce95c30
**Location**: L253:13–L253:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5245
@@ -249,9 +249,9 @@
         };
         const result = QuizSummarySchema.safeParse(approvedWithoutTimestamp);
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
