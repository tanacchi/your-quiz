# Mutant cbd513ee Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5089
**Stable ID**: cbd513ee
**Location**: L117:29–L127:10

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5089
@@ -113,19 +113,9 @@
       it("should accept valid complete data", () => {
         const result = QuizSummarySchema.safeParse(validQuizSummaryData);
         expect(result.success).toBe(true);
 
-        if (result.success) {
-          const data = result.data as QuizSummaryData;
-          expect(data.id).toBe(validQuizSummaryData.id);
-          expect(data.question).toBe(validQuizSummaryData.question);
-          expect(data.answerType).toBe(validQuizSummaryData.answerType);
-          expect(data.solutionId).toBe(validQuizSummaryData.solutionId);
-          expect(data.status).toBe(validQuizSummaryData.status);
-          expect(data.creatorId).toBe(validQuizSummaryData.creatorId);
-          expect(data.createdAt).toBe(validQuizSummaryData.createdAt);
-          expect(data.tagIds).toEqual(validQuizSummaryData.tagIds);
-        }
+        if (result.success) {}
       });
 
       it.each([
         ["id", { ...validQuizSummaryData, id: undefined }],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
