# Mutant 1868cb7e Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5098
**Stable ID**: 1868cb7e
**Location**: L133:10–L133:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5098
@@ -129,9 +129,9 @@
 
       it.each([
         ["id", { ...validQuizSummaryData, id: undefined }],
         ["question", { ...validQuizSummaryData, question: undefined }],
-        ["answerType", { ...validQuizSummaryData, answerType: undefined }],
+        ["", { ...validQuizSummaryData, answerType: undefined }],
         ["solutionId", { ...validQuizSummaryData, solutionId: undefined }],
         ["status", { ...validQuizSummaryData, status: undefined }],
         ["creatorId", { ...validQuizSummaryData, creatorId: undefined }],
         ["createdAt", { ...validQuizSummaryData, createdAt: undefined }],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
