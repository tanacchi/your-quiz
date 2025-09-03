# Mutant 5d30b42f Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 2834
**Stable ID**: 5d30b42f
**Location**: L57:43–L275:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2834
@@ -53,228 +53,10 @@
       });
     });
   });
 
-  describe("QuizSchema Validation", () => {
-    describe("Required Fields", () => {
-      it("should accept valid complete boolean quiz", () => {
-        const result = QuizSchema.safeParse(validQuizData);
-        expect(result.success).toBe(true);
+  describe("QuizSchema Validation", () => {});
 
-        if (result.success) {
-          const data = result.data as QuizData;
-          expect(data.id).toBe(validQuizData.id);
-          expect(data.question).toBe(validQuizData.question);
-          expect(data.answerType).toBe("boolean");
-          expect(data.solution).toEqual(validBooleanSolution);
-          expect(data.status).toBe(validQuizData.status);
-          expect(data.creatorId).toBe(validQuizData.creatorId);
-          expect(data.createdAt).toBe(validQuizData.createdAt);
-        }
-      });
-
-      it.each([
-        ["id", { ...validQuizData, id: undefined }],
-        ["question", { ...validQuizData, question: undefined }],
-        ["answerType", { ...validQuizData, answerType: undefined }],
-        ["solution", { ...validQuizData, solution: undefined }],
-        ["status", { ...validQuizData, status: undefined }],
-        ["creatorId", { ...validQuizData, creatorId: undefined }],
-        ["createdAt", { ...validQuizData, createdAt: undefined }],
-      ])("should reject missing required field: %s", (_field, invalidData) => {
-        const result = QuizSchema.safeParse(invalidData);
-        expect(result.success).toBe(false);
-      });
-    });
-
-    describe("Question Field", () => {
-      it.each([
-        ["valid question", "Is TypeScript compiled?", true],
-        ["single character after trim", " A ", true],
-        ["unicode characters", "TypeScriptとは何ですか？", true],
-        ["question with newlines", "What is\nTypeScript?", true],
-        ["exactly 500 chars", "A".repeat(500), true],
-        ["empty string", "", false],
-        ["only whitespace", "   ", false],
-        ["501 chars", "A".repeat(501), false],
-        ["null value", null, false],
-      ])("should validate question: %s -> %s", (_desc, question, isValid) => {
-        const data = { ...validQuizData, question };
-        const result = QuizSchema.safeParse(data);
-        expect(result.success).toBe(isValid);
-      });
-
-      it("should trim whitespace from question", () => {
-        const dataWithWhitespace = {
-          ...validQuizData,
-          question: "  Valid question  ",
-        };
-        const result = QuizSchema.safeParse(dataWithWhitespace);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.question).toBe("Valid question");
-        }
-      });
-    });
-
-    describe("AnswerType Field", () => {
-      it("should only accept 'boolean' as answerType", () => {
-        const result = QuizSchema.safeParse(validQuizData);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.answerType).toBe("boolean");
-        }
-      });
-
-      it.each([
-        ["single_choice", "single_choice"],
-        ["multiple_choice", "multiple_choice"],
-        ["free_text", "free_text"],
-        ["invalid_type", "invalid_type"],
-        ["", ""],
-        [null, null],
-      ])("should reject non-boolean answerType: %s", (_desc, answerType) => {
-        const data = { ...validQuizData, answerType };
-        const result = QuizSchema.safeParse(data);
-        expect(result.success).toBe(false);
-      });
-    });
-
-    describe("Solution Field", () => {
-      it("should accept valid BooleanSolution", () => {
-        const validSolution = {
-          id: "solution-456",
-          value: false,
-        };
-        const data = { ...validQuizData, solution: validSolution };
-        const result = QuizSchema.safeParse(data);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.solution).toEqual(validSolution);
-        }
-      });
-
-      it.each([
-        ["missing id", { value: true }],
-        ["empty id", { id: "", value: true }],
-        ["missing value", { id: "solution-123" }],
-        ["invalid value type", { id: "solution-123", value: "true" }],
-        ["null solution", null],
-        ["empty object", {}],
-      ])("should reject invalid solution: %s", (_desc, solution) => {
-        const data = { ...validQuizData, solution };
-        const result = QuizSchema.safeParse(data);
-        expect(result.success).toBe(false);
-      });
-
-      it("should validate solution as BooleanSolution union", () => {
-        const solutionValidation =
-          BooleanSolutionSchema.safeParse(validBooleanSolution);
-        expect(solutionValidation.success).toBe(true);
-
-        const quizValidation = QuizSchema.safeParse(validQuizData);
-        expect(quizValidation.success).toBe(true);
-      });
-    });
-
-    describe("Explanation Field", () => {
-      it("should accept valid explanation", () => {
-        const data = {
-          ...validQuizData,
-          explanation: "Detailed explanation about TypeScript",
-        };
-        const result = QuizSchema.safeParse(data);
-        expect(result.success).toBe(true);
-      });
-
-      it("should accept quiz without explanation", () => {
-        const { explanation: _explanation, ...dataWithoutExplanation } =
-          validQuizData;
-        const result = QuizSchema.safeParse(dataWithoutExplanation);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.explanation).toBeUndefined();
-        }
-      });
-
-      it.each([
-        ["exactly 1000 chars", "A".repeat(1000), true],
-        ["1001 chars", "A".repeat(1001), false],
-        ["empty string", "", true],
-        ["only whitespace", "   ", true],
-      ])(
-        "should validate explanation length: %s -> %s",
-        (_desc, explanation, isValid) => {
-          const data = { ...validQuizData, explanation };
-          const result = QuizSchema.safeParse(data);
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
-        const data = { ...validQuizData, status };
-        const result = QuizSchema.safeParse(data);
-        expect(result.success).toBe(isValid);
-      });
-    });
-
-    describe("Date Fields", () => {
-      it.each([
-        ["SQLite string", "2023-12-01 10:00:00", true],
-        ["SQLite format", "2023-12-01 10:00:00", true],
-        ["invalid date", "invalid-date", false],
-        ["empty string", "", false],
-        ["null", null, false],
-      ])("should validate createdAt: %s -> %s", (_desc, createdAt, isValid) => {
-        const data = { ...validQuizData, createdAt };
-        const result = QuizSchema.safeParse(data);
-        expect(result.success).toBe(isValid);
-      });
-
-      it("should accept quiz without approvedAt", () => {
-        const result = QuizSchema.safeParse(validQuizData);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.approvedAt).toBeUndefined();
-        }
-      });
-
-      it("should accept valid approvedAt", () => {
-        const dataWithApprovedAt = {
-          ...validQuizData,
-          approvedAt: "2023-12-02 15:00:00",
-        };
-        const result = QuizSchema.safeParse(dataWithApprovedAt);
-        expect(result.success).toBe(true);
-      });
-    });
-
-    describe("Strict Mode", () => {
-      it("should reject data with extra fields", () => {
-        const dataWithExtraField = {
-          ...validQuizData,
-          extraField: "not allowed",
-        };
-        const result = QuizSchema.safeParse(dataWithExtraField);
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
