# Mutant 33c4d1ae Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5215
**Stable ID**: 33c4d1ae
**Location**: L202:10–L202:49

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5215
@@ -198,9 +198,9 @@
         const result = QuizSummarySchema.safeParse(dataWithoutExplanation);
         expect(result.success).toBe(true);
       });
 
-      it("should accept data without approvedAt", () => {
+      it("", () => {
         const { approvedAt: _approvedAt, ...dataWithoutApprovedAt } =
           validQuizSummaryData;
         const result = QuizSummarySchema.safeParse(dataWithoutApprovedAt);
         expect(result.success).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
