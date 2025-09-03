# Mutant 3d89d26b Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5307
**Stable ID**: 3d89d26b
**Location**: L345:10–L345:47

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5307
@@ -341,9 +341,9 @@
         const result = QuizSummarySchema.safeParse(data);
         expect(result.success).toBe(true);
       });
 
-      it("should accept very long explanation", () => {
+      it("", () => {
         const longExplanation = "A".repeat(5000);
         const data = { ...validQuizSummaryData, explanation: longExplanation };
         const result = QuizSummarySchema.safeParse(data);
         expect(result.success).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
