# Mutant 4f33e11e Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5083
**Stable ID**: 4f33e11e
**Location**: L112:39–L142:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5083
@@ -108,40 +108,10 @@
     });
   });
 
   describe("QuizSummarySchema Validation", () => {
-    describe("Required Fields", () => {
-      it("should accept valid complete data", () => {
-        const result = QuizSummarySchema.safeParse(validQuizSummaryData);
-        expect(result.success).toBe(true);
+    describe("Required Fields", () => {});
 
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
-      it.each([
-        ["id", { ...validQuizSummaryData, id: undefined }],
-        ["question", { ...validQuizSummaryData, question: undefined }],
-        ["answerType", { ...validQuizSummaryData, answerType: undefined }],
-        ["solutionId", { ...validQuizSummaryData, solutionId: undefined }],
-        ["status", { ...validQuizSummaryData, status: undefined }],
-        ["creatorId", { ...validQuizSummaryData, creatorId: undefined }],
-        ["createdAt", { ...validQuizSummaryData, createdAt: undefined }],
-      ])("should reject missing required field: %s", (_field, invalidData) => {
-        const result = QuizSummarySchema.safeParse(invalidData);
-        expect(result.success).toBe(false);
-      });
-    });
-
     describe("Question Field", () => {
       it.each([
         ["valid question", "What is TypeScript?", true],
         ["single character", "A", true],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
