# Mutant 6a76c9c2 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 5087
**Stable ID**: 6a76c9c2
**Location**: L117:13–L117:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5087
@@ -113,9 +113,9 @@
       it("should accept valid complete data", () => {
         const result = QuizSummarySchema.safeParse(validQuizSummaryData);
         expect(result.success).toBe(true);
 
-        if (result.success) {
+        if (true) {
           const data = result.data as QuizSummaryData;
           expect(data.id).toBe(validQuizSummaryData.id);
           expect(data.question).toBe(validQuizSummaryData.question);
           expect(data.answerType).toBe(validQuizSummaryData.answerType);
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
