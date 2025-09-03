# Mutant ba9f4450 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5107
**Stable ID**: ba9f4450
**Location**: L136:10–L136:21

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5107
@@ -132,9 +132,9 @@
         ["question", { ...validQuizSummaryData, question: undefined }],
         ["answerType", { ...validQuizSummaryData, answerType: undefined }],
         ["solutionId", { ...validQuizSummaryData, solutionId: undefined }],
         ["status", { ...validQuizSummaryData, status: undefined }],
-        ["creatorId", { ...validQuizSummaryData, creatorId: undefined }],
+        ["", { ...validQuizSummaryData, creatorId: undefined }],
         ["createdAt", { ...validQuizSummaryData, createdAt: undefined }],
       ])("should reject missing required field: %s", (_field, invalidData) => {
         const result = QuizSummarySchema.safeParse(invalidData);
         expect(result.success).toBe(false);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
