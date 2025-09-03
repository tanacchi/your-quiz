# Mutant 73c5d90a Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 5094
**Stable ID**: 73c5d90a
**Location**: L132:9–L132:71

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5094
@@ -128,9 +128,9 @@
       });
 
       it.each([
         ["id", { ...validQuizSummaryData, id: undefined }],
-        ["question", { ...validQuizSummaryData, question: undefined }],
+        [],
         ["answerType", { ...validQuizSummaryData, answerType: undefined }],
         ["solutionId", { ...validQuizSummaryData, solutionId: undefined }],
         ["status", { ...validQuizSummaryData, status: undefined }],
         ["creatorId", { ...validQuizSummaryData, creatorId: undefined }],
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
