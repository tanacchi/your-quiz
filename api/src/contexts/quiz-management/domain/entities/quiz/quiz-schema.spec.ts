import { describe, expect, it } from "vitest";
import type { ZodError } from "zod";
import { BooleanSolutionSchema } from "../solutions/boolean/boolean-solution-schema";
import {
  CreatorIdSchema,
  type QuizData,
  QuizIdSchema,
  type QuizInput,
  QuizSchema,
} from "./quiz-schema";

describe("Quiz Schema", () => {
  const validBooleanSolution = {
    id: "solution-123",
    value: true,
  };

  const validQuizData: QuizInput = {
    id: "quiz-123",
    question: "Is TypeScript a superset of JavaScript?",
    answerType: "boolean",
    solution: validBooleanSolution,
    explanation: "TypeScript adds static typing to JavaScript",
    status: "pending_approval",
    creatorId: "creator-789",
    createdAt: "2023-12-01 10:00:00",
  };

  describe("Brand Types Re-export", () => {
    describe("QuizIdSchema", () => {
      it.each([
        ["valid format", "quiz-123", true],
        ["valid uuid", "550e8400-e29b-41d4-a716-446655440000", true],
        ["empty string", "", false],
        ["null value", null, false],
        ["undefined value", undefined, false],
      ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
        const result = QuizIdSchema.safeParse(input);
        expect(result.success).toBe(isValid);
      });
    });

    describe("CreatorIdSchema", () => {
      it.each([
        ["valid format", "creator-123", true],
        ["valid uuid", "550e8400-e29b-41d4-a716-446655440000", true],
        ["empty string", "", false],
        ["null value", null, false],
        ["undefined value", undefined, false],
      ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
        const result = CreatorIdSchema.safeParse(input);
        expect(result.success).toBe(isValid);
      });
    });
  });

  describe("QuizSchema Validation", () => {
    describe("Required Fields", () => {
      it("should accept valid complete boolean quiz", () => {
        const result = QuizSchema.safeParse(validQuizData);
        expect(result.success).toBe(true);

        if (result.success) {
          const data = result.data as QuizData;
          expect(data.id).toBe(validQuizData.id);
          expect(data.question).toBe(validQuizData.question);
          expect(data.answerType).toBe("boolean");
          expect(data.solution).toEqual(validBooleanSolution);
          expect(data.status).toBe(validQuizData.status);
          expect(data.creatorId).toBe(validQuizData.creatorId);
          expect(data.createdAt).toBe(validQuizData.createdAt);
        }
      });

      it.each([
        ["id", { ...validQuizData, id: undefined }],
        ["question", { ...validQuizData, question: undefined }],
        ["answerType", { ...validQuizData, answerType: undefined }],
        ["solution", { ...validQuizData, solution: undefined }],
        ["status", { ...validQuizData, status: undefined }],
        ["creatorId", { ...validQuizData, creatorId: undefined }],
        ["createdAt", { ...validQuizData, createdAt: undefined }],
      ])("should reject missing required field: %s", (_field, invalidData) => {
        const result = QuizSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
      });
    });

    describe("Question Field", () => {
      it.each([
        ["valid question", "Is TypeScript compiled?", true],
        ["single character after trim", " A ", true],
        ["unicode characters", "TypeScriptとは何ですか？", true],
        ["question with newlines", "What is\nTypeScript?", true],
        ["exactly 500 chars", "A".repeat(500), true],
        ["empty string", "", false],
        ["only whitespace", "   ", false],
        ["501 chars", "A".repeat(501), false],
        ["null value", null, false],
      ])("should validate question: %s -> %s", (_desc, question, isValid) => {
        const data = { ...validQuizData, question };
        const result = QuizSchema.safeParse(data);
        expect(result.success).toBe(isValid);
      });

      it("should trim whitespace from question", () => {
        const dataWithWhitespace = {
          ...validQuizData,
          question: "  Valid question  ",
        };
        const result = QuizSchema.safeParse(dataWithWhitespace);
        expect(result.success).toBe(true);

        if (result.success) {
          expect(result.data.question).toBe("Valid question");
        }
      });
    });

    describe("AnswerType Field", () => {
      it("should only accept 'boolean' as answerType", () => {
        const result = QuizSchema.safeParse(validQuizData);
        expect(result.success).toBe(true);

        if (result.success) {
          expect(result.data.answerType).toBe("boolean");
        }
      });

      it.each([
        ["single_choice", "single_choice"],
        ["multiple_choice", "multiple_choice"],
        ["free_text", "free_text"],
        ["invalid_type", "invalid_type"],
        ["", ""],
        [null, null],
      ])("should reject non-boolean answerType: %s", (_desc, answerType) => {
        const data = { ...validQuizData, answerType };
        const result = QuizSchema.safeParse(data);
        expect(result.success).toBe(false);
      });
    });

    describe("Solution Field", () => {
      it("should accept valid BooleanSolution", () => {
        const validSolution = {
          id: "solution-456",
          value: false,
        };
        const data = { ...validQuizData, solution: validSolution };
        const result = QuizSchema.safeParse(data);
        expect(result.success).toBe(true);

        if (result.success) {
          expect(result.data.solution).toEqual(validSolution);
        }
      });

      it.each([
        ["missing id", { value: true }],
        ["empty id", { id: "", value: true }],
        ["missing value", { id: "solution-123" }],
        ["invalid value type", { id: "solution-123", value: "true" }],
        ["null solution", null],
        ["empty object", {}],
      ])("should reject invalid solution: %s", (_desc, solution) => {
        const data = { ...validQuizData, solution };
        const result = QuizSchema.safeParse(data);
        expect(result.success).toBe(false);
      });

      it("should validate solution as BooleanSolution union", () => {
        const solutionValidation =
          BooleanSolutionSchema.safeParse(validBooleanSolution);
        expect(solutionValidation.success).toBe(true);

        const quizValidation = QuizSchema.safeParse(validQuizData);
        expect(quizValidation.success).toBe(true);
      });
    });

    describe("Explanation Field", () => {
      it("should accept valid explanation", () => {
        const data = {
          ...validQuizData,
          explanation: "Detailed explanation about TypeScript",
        };
        const result = QuizSchema.safeParse(data);
        expect(result.success).toBe(true);
      });

      it("should accept quiz without explanation", () => {
        const { explanation: _explanation, ...dataWithoutExplanation } =
          validQuizData;
        const result = QuizSchema.safeParse(dataWithoutExplanation);
        expect(result.success).toBe(true);

        if (result.success) {
          expect(result.data.explanation).toBeUndefined();
        }
      });

      it.each([
        ["exactly 1000 chars", "A".repeat(1000), true],
        ["1001 chars", "A".repeat(1001), false],
        ["empty string", "", true],
        ["only whitespace", "   ", true],
      ])(
        "should validate explanation length: %s -> %s",
        (_desc, explanation, isValid) => {
          const data = { ...validQuizData, explanation };
          const result = QuizSchema.safeParse(data);
          expect(result.success).toBe(isValid);
        },
      );
    });

    describe("Status Field", () => {
      it.each([
        ["pending_approval", "pending_approval", true],
        ["approved without approvedAt", "approved", false],
        ["rejected", "rejected", true],
        ["invalid status", "invalid_status", false],
        ["empty string", "", false],
        ["null value", null, false],
      ])("should validate status: %s -> %s", (_desc, status, isValid) => {
        const data = { ...validQuizData, status };
        const result = QuizSchema.safeParse(data);
        expect(result.success).toBe(isValid);
      });
    });

    describe("Date Fields", () => {
      it.each([
        ["SQLite string", "2023-12-01 10:00:00", true],
        ["SQLite format", "2023-12-01 10:00:00", true],
        ["invalid date", "invalid-date", false],
        ["empty string", "", false],
        ["null", null, false],
      ])("should validate createdAt: %s -> %s", (_desc, createdAt, isValid) => {
        const data = { ...validQuizData, createdAt };
        const result = QuizSchema.safeParse(data);
        expect(result.success).toBe(isValid);
      });

      it("should accept quiz without approvedAt", () => {
        const result = QuizSchema.safeParse(validQuizData);
        expect(result.success).toBe(true);

        if (result.success) {
          expect(result.data.approvedAt).toBeUndefined();
        }
      });

      it("should accept valid approvedAt", () => {
        const dataWithApprovedAt = {
          ...validQuizData,
          approvedAt: "2023-12-02 15:00:00",
        };
        const result = QuizSchema.safeParse(dataWithApprovedAt);
        expect(result.success).toBe(true);
      });
    });

    describe("Strict Mode", () => {
      it("should reject data with extra fields", () => {
        const dataWithExtraField = {
          ...validQuizData,
          extraField: "not allowed",
        };
        const result = QuizSchema.safeParse(dataWithExtraField);
        expect(result.success).toBe(false);
      });
    });
  });

  describe("Cross-Field Validation (superRefine)", () => {
    describe("Approved Status and ApprovedAt", () => {
      it("should accept approved status with approvedAt", () => {
        const approvedData = {
          ...validQuizData,
          status: "approved" as const,
          approvedAt: "2023-12-02 10:00:00",
        };
        const result = QuizSchema.safeParse(approvedData);
        expect(result.success).toBe(true);
      });

      it("should reject approved status without approvedAt", () => {
        const approvedWithoutTimestamp = {
          ...validQuizData,
          status: "approved" as const,
          approvedAt: undefined,
        };
        const result = QuizSchema.safeParse(approvedWithoutTimestamp);
        expect(result.success).toBe(false);

        if (!result.success) {
          const error = result.error as ZodError;
          const approvedAtError = error.issues.find((issue) =>
            issue.path.includes("approvedAt"),
          );
          expect(approvedAtError).toBeDefined();
          expect(approvedAtError?.message).toBe(
            "Approved quiz must have approvedAt timestamp",
          );
        }
      });

      it("should accept non-approved status without approvedAt", () => {
        const pendingData = {
          ...validQuizData,
          status: "pending_approval" as const,
        };
        const result = QuizSchema.safeParse(pendingData);
        expect(result.success).toBe(true);
      });
    });

    describe("AnswerType and Solution Consistency", () => {
      it("should accept boolean answerType with BooleanSolution", () => {
        const result = QuizSchema.safeParse(validQuizData);
        expect(result.success).toBe(true);
      });

      it("should reject boolean answerType without solution", () => {
        const dataWithoutSolution = {
          ...validQuizData,
          solution: undefined,
        };
        const result = QuizSchema.safeParse(dataWithoutSolution);
        expect(result.success).toBe(false);

        if (!result.success) {
          const error = result.error as ZodError;
          const solutionError = error.issues.find((issue) =>
            issue.path.includes("solution"),
          );
          expect(solutionError).toBeDefined();
          expect(solutionError?.message).toContain("expected object");
        }
      });

      it("should reject boolean answerType with null solution", () => {
        const dataWithNullSolution = {
          ...validQuizData,
          solution: null,
        };
        const result = QuizSchema.safeParse(dataWithNullSolution);
        expect(result.success).toBe(false);
      });
    });
  });

  describe("Edge Cases and Boundary Values", () => {
    describe("Special Characters in Fields", () => {
      it.each([
        ["special characters", "Is <script>alert('xss')</script> valid?"],
        ["emoji", "Does TypeScript support emoji? 🚀"],
        ["unicode", "TypeScriptはJavaScriptのスーパーセットですか？"],
        ["html entities", "Is &lt;html&gt; valid in TypeScript?"],
      ])("should accept question with %s", (_desc, question) => {
        const data = { ...validQuizData, question };
        const result = QuizSchema.safeParse(data);
        expect(result.success).toBe(true);
      });
    });

    describe("Boundary Value Testing", () => {
      it("should handle minimum valid question length", () => {
        const minimalData = {
          ...validQuizData,
          question: "A", // 1 character after trim
        };
        const result = QuizSchema.safeParse(minimalData);
        expect(result.success).toBe(true);
      });

      it("should handle maximum valid question length", () => {
        const maximalData = {
          ...validQuizData,
          question: "A".repeat(500), // exactly 500 characters
        };
        const result = QuizSchema.safeParse(maximalData);
        expect(result.success).toBe(true);
      });

      it("should handle maximum valid explanation length", () => {
        const maxExplanationData = {
          ...validQuizData,
          explanation: "A".repeat(1000), // exactly 1000 characters
        };
        const result = QuizSchema.safeParse(maxExplanationData);
        expect(result.success).toBe(true);
      });
    });

    describe("Complex Boolean Solutions", () => {
      it.each([
        ["true value", { id: "sol-1", value: true }],
        ["false value", { id: "sol-2", value: false }],
        [
          "complex id format",
          {
            id: "solution-uuid-550e8400-e29b-41d4-a716-446655440000",
            value: true,
          },
        ],
      ])("should accept %s", (_desc, solution) => {
        const data = { ...validQuizData, solution };
        const result = QuizSchema.safeParse(data);
        expect(result.success).toBe(true);

        if (result.success) {
          expect(result.data.solution.value).toBe(solution.value);
          expect(result.data.solution.id).toBe(solution.id);
        }
      });
    });
  });

  describe("Integration Scenarios", () => {
    it("should handle complete approved boolean quiz", () => {
      const fullApprovedQuiz = {
        id: "quiz-integration-123",
        question: "Is TypeScript strongly typed? 💪",
        answerType: "boolean" as const,
        solution: {
          id: "solution-integration-456",
          value: true,
        },
        explanation:
          "TypeScript provides static type checking at compile time, making it strongly typed compared to vanilla JavaScript.",
        status: "approved" as const,
        creatorId: "creator-expert-789",
        createdAt: "2023-12-01 10:00:00",
        approvedAt: "2023-12-02 15:30:00",
      };

      const result = QuizSchema.safeParse(fullApprovedQuiz);
      expect(result.success).toBe(true);

      if (result.success) {
        expect(result.data.answerType).toBe("boolean");
        expect(result.data.solution.value).toBe(true);
        expect(result.data.status).toBe("approved");
        expect(result.data.approvedAt).toBeDefined();
        expect(result.data.explanation).toBeDefined();
      }
    });

    it("should handle minimal valid boolean quiz", () => {
      const minimalQuiz = {
        id: "q",
        question: "Yes?",
        answerType: "boolean" as const,
        solution: {
          id: "s",
          value: false,
        },
        status: "pending_approval" as const,
        creatorId: "c",
        createdAt: "2023-12-01 10:00:00",
      };

      const result = QuizSchema.safeParse(minimalQuiz);
      expect(result.success).toBe(true);

      if (result.success) {
        expect(result.data.explanation).toBeUndefined();
        expect(result.data.approvedAt).toBeUndefined();
        expect(result.data.solution.value).toBe(false);
      }
    });

    it("should handle rejected quiz with explanation", () => {
      const rejectedQuiz = {
        ...validQuizData,
        status: "rejected" as const,
        explanation: "This quiz was rejected due to unclear wording.",
      };

      const result = QuizSchema.safeParse(rejectedQuiz);
      expect(result.success).toBe(true);

      if (result.success) {
        expect(result.data.status).toBe("rejected");
        expect(result.data.approvedAt).toBeUndefined();
        expect(result.data.explanation).toContain("rejected");
      }
    });
  });
});
