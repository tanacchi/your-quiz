# Mutant e10ef3fa Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5085
**Stable ID**: e10ef3fa
**Location**: L113:53–L128:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5085
@@ -109,25 +109,10 @@
   });
 
   describe("QuizSummarySchema Validation", () => {
     describe("Required Fields", () => {
-      it("should accept valid complete data", () => {
-        const result = QuizSummarySchema.safeParse(validQuizSummaryData);
-        expect(result.success).toBe(true);
+      it("should accept valid complete data", () => {});
 
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
-      });
-
       it.each([
         ["id", { ...validQuizSummaryData, id: undefined }],
         ["question", { ...validQuizSummaryData, question: undefined }],
         ["answerType", { ...validQuizSummaryData, answerType: undefined }],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
