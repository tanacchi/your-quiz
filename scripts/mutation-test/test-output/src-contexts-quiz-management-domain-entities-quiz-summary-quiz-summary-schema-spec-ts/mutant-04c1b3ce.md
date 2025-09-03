# Mutant 04c1b3ce Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5095
**Stable ID**: 04c1b3ce
**Location**: L132:10–L132:20

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5095
@@ -128,9 +128,9 @@
       });
 
       it.each([
         ["id", { ...validQuizSummaryData, id: undefined }],
-        ["question", { ...validQuizSummaryData, question: undefined }],
+        ["", { ...validQuizSummaryData, question: undefined }],
         ["answerType", { ...validQuizSummaryData, answerType: undefined }],
         ["solutionId", { ...validQuizSummaryData, solutionId: undefined }],
         ["status", { ...validQuizSummaryData, status: undefined }],
         ["creatorId", { ...validQuizSummaryData, creatorId: undefined }],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
