# Mutant bf701eab Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 5081
**Stable ID**: bf701eab
**Location**: L111:50–L230:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5081
@@ -107,129 +107,10 @@
       });
     });
   });
 
-  describe("QuizSummarySchema Validation", () => {
-    describe("Required Fields", () => {
-      it("should accept valid complete data", () => {
-        const result = QuizSummarySchema.safeParse(validQuizSummaryData);
-        expect(result.success).toBe(true);
+  describe("QuizSummarySchema Validation", () => {});
 
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
-    describe("Question Field", () => {
-      it.each([
-        ["valid question", "What is TypeScript?", true],
-        ["single character", "A", true],
-        ["unicode characters", "TypeScriptとは何ですか？", true],
-        ["with newlines", "What is\nTypeScript?", true],
-        ["empty string", "", false],
-        ["only whitespace", "   ", true],
-        ["null value", null, false],
-      ])("should validate question: %s -> %s", (_desc, question, isValid) => {
-        const data = { ...validQuizSummaryData, question };
-        const result = QuizSummarySchema.safeParse(data);
-        expect(result.success).toBe(isValid);
-      });
-    });
-
-    describe("AnswerType Field", () => {
-      it.each([
-        ["boolean", "boolean", true],
-        ["free_text", "free_text", true],
-        ["single_choice", "single_choice", true],
-        ["multiple_choice", "multiple_choice", true],
-        ["invalid type", "invalid_type", false],
-        ["empty string", "", false],
-        ["null value", null, false],
-      ])(
-        "should validate answerType: %s -> %s",
-        (_desc, answerType, isValid) => {
-          const data = { ...validQuizSummaryData, answerType };
-          const result = QuizSummarySchema.safeParse(data);
-          expect(result.success).toBe(isValid);
-        },
-      );
-    });
-
-    describe("Status Field", () => {
-      it.each([
-        ["pending_approval", "pending_approval", true],
-        ["approved without approvedAt", "approved", false],
-        ["rejected", "rejected", true],
-        ["invalid status", "invalid_status", false],
-        ["empty string", "", false],
-        ["null value", null, false],
-      ])("should validate status: %s -> %s", (_desc, status, isValid) => {
-        const data = { ...validQuizSummaryData, status };
-        const result = QuizSummarySchema.safeParse(data);
-        expect(result.success).toBe(isValid);
-      });
-    });
-
-    describe("Optional Fields", () => {
-      it("should accept data without explanation", () => {
-        const { explanation: _explanation, ...dataWithoutExplanation } =
-          validQuizSummaryData;
-        const result = QuizSummarySchema.safeParse(dataWithoutExplanation);
-        expect(result.success).toBe(true);
-      });
-
-      it("should accept data without approvedAt", () => {
-        const { approvedAt: _approvedAt, ...dataWithoutApprovedAt } =
-          validQuizSummaryData;
-        const result = QuizSummarySchema.safeParse(dataWithoutApprovedAt);
-        expect(result.success).toBe(true);
-      });
-
-      it("should accept data without tagIds", () => {
-        const { tagIds: _tagIds, ...dataWithoutTagIds } = validQuizSummaryData;
-        const result = QuizSummarySchema.safeParse(dataWithoutTagIds);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.tagIds).toEqual([]);
-        }
-      });
-    });
-
-    describe("Strict Mode", () => {
-      it("should reject data with extra fields", () => {
-        const dataWithExtraField = {
-          ...validQuizSummaryData,
-          extraField: "not allowed",
-        };
-        const result = QuizSummarySchema.safeParse(dataWithExtraField);
-        expect(result.success).toBe(false);
-      });
-    });
-  });
-
   describe("Cross-Field Validation (superRefine)", () => {
     describe("Approved Status and ApprovedAt", () => {
       it("should accept approved status with approvedAt", () => {
         const approvedData = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
