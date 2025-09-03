# Mutant b6c27e5a Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 5093
**Stable ID**: b6c27e5a
**Location**: L131:16–L131:58

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5093
@@ -127,9 +127,9 @@
         }
       });
 
       it.each([
-        ["id", { ...validQuizSummaryData, id: undefined }],
+        ["id", {}],
         ["question", { ...validQuizSummaryData, question: undefined }],
         ["answerType", { ...validQuizSummaryData, answerType: undefined }],
         ["solutionId", { ...validQuizSummaryData, solutionId: undefined }],
         ["status", { ...validQuizSummaryData, status: undefined }],
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
