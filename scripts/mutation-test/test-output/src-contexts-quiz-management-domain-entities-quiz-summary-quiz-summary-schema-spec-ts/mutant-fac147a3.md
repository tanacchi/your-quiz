# Mutant fac147a3 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5241
**Stable ID**: fac147a3
**Location**: L244:10–L244:60

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5241
@@ -240,9 +240,9 @@
         const result = QuizSummarySchema.safeParse(approvedData);
         expect(result.success).toBe(true);
       });
 
-      it("should reject approved status without approvedAt", () => {
+      it("", () => {
         const approvedWithoutTimestamp = {
           ...validQuizSummaryData,
           status: "approved" as const,
           approvedAt: undefined,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
