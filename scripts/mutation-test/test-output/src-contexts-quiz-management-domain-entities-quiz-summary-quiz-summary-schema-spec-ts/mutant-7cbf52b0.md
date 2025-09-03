# Mutant 7cbf52b0 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 5092
**Stable ID**: 7cbf52b0
**Location**: L131:10–L131:14

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5092
@@ -127,9 +127,9 @@
         }
       });
 
       it.each([
-        ["id", { ...validQuizSummaryData, id: undefined }],
+        ["", { ...validQuizSummaryData, id: undefined }],
         ["question", { ...validQuizSummaryData, question: undefined }],
         ["answerType", { ...validQuizSummaryData, answerType: undefined }],
         ["solutionId", { ...validQuizSummaryData, solutionId: undefined }],
         ["status", { ...validQuizSummaryData, status: undefined }],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
