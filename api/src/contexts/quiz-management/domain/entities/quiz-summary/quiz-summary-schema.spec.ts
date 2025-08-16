import { describe, expect, it } from "vitest";
import type { ZodError } from "zod";
import {
  CreatorId,
  QuizId,
  type QuizSummaryData,
  type QuizSummaryInput,
  QuizSummarySchema,
  SolutionId,
  TagId,
  TagIds,
} from "./quiz-summary-schema";

describe("QuizSummary Schema", () => {
  const validQuizSummaryData: QuizSummaryInput = {
    id: "quiz-123",
    question: "What is TypeScript?",
    answerType: "single_choice",
    solutionId: "solution-456",
    explanation: "TypeScript is a superset of JavaScript",
    tagIds: ["tag-1", "tag-2"],
    status: "pending_approval",
    creatorId: "creator-789",
    createdAt: "2023-12-01 10:00:00",
  };

  describe("Brand Types", () => {
    describe("QuizId", () => {
      it.each([
        ["valid alphanumeric", "quiz-123", true],
        ["valid with underscore", "quiz_test", true],
        ["valid single char", "q", true],
        ["valid uuid format", "550e8400-e29b-41d4-a716-446655440000", true],
        ["empty string", "", false],
        ["only whitespace", "   ", true],
        ["null value", null, false],
        ["undefined value", undefined, false],
        ["number", 123, false],
        ["object", {}, false],
      ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
        const result = QuizId.safeParse(input);
        expect(result.success).toBe(isValid);

        if (isValid && result.success) {
          expect(result.data).toBe(input);
        }
      });
    });

    describe("SolutionId", () => {
      it.each([
        ["valid format", "solution-123", true],
        ["valid uuid", "550e8400-e29b-41d4-a716-446655440000", true],
        ["empty string", "", false],
        ["null value", null, false],
        ["undefined value", undefined, false],
      ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
        const result = SolutionId.safeParse(input);
        expect(result.success).toBe(isValid);
      });
    });

    describe("CreatorId", () => {
      it.each([
        ["valid format", "creator-123", true],
        ["valid uuid", "550e8400-e29b-41d4-a716-446655440000", true],
        ["empty string", "", false],
        ["null value", null, false],
        ["undefined value", undefined, false],
      ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
        const result = CreatorId.safeParse(input);
        expect(result.success).toBe(isValid);
      });
    });

    describe("TagId", () => {
      it.each([
        ["valid format", "tag-123", true],
        ["valid uuid", "550e8400-e29b-41d4-a716-446655440000", true],
        ["empty string", "", false],
        ["null value", null, false],
        ["undefined value", undefined, false],
      ])("should validate %s: %s -> %s", (_desc, input, isValid) => {
        const result = TagId.safeParse(input);
        expect(result.success).toBe(isValid);
      });
    });

    describe("TagIds", () => {
      it.each([
        ["valid array", ["tag-1", "tag-2"], ["tag-1", "tag-2"]],
        ["empty array", [], []],
        ["null value", null, []],
        ["undefined value", undefined, []],
        ["single tag", ["tag-1"], ["tag-1"]],
      ])("should transform %s: %s -> %s", (_desc, input, expected) => {
        const result = TagIds.safeParse(input);
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data).toEqual(expected);
        }
      });

      it("should reject invalid tag formats in array", () => {
        const result = TagIds.safeParse(["valid-tag", "", "another-valid"]);
        expect(result.success).toBe(false);
      });
    });
  });

  describe("QuizSummarySchema Validation", () => {
    describe("Required Fields", () => {
      it("should accept valid complete data", () => {
        const result = QuizSummarySchema.safeParse(validQuizSummaryData);
        expect(result.success).toBe(true);

        if (result.success) {
          const data = result.data as QuizSummaryData;
          expect(data.id).toBe(validQuizSummaryData.id);
          expect(data.question).toBe(validQuizSummaryData.question);
          expect(data.answerType).toBe(validQuizSummaryData.answerType);
          expect(data.solutionId).toBe(validQuizSummaryData.solutionId);
          expect(data.status).toBe(validQuizSummaryData.status);
          expect(data.creatorId).toBe(validQuizSummaryData.creatorId);
          expect(data.createdAt).toBe(validQuizSummaryData.createdAt);
          expect(data.tagIds).toEqual(validQuizSummaryData.tagIds);
        }
      });

      it.each([
        ["id", { ...validQuizSummaryData, id: undefined }],
        ["question", { ...validQuizSummaryData, question: undefined }],
        ["answerType", { ...validQuizSummaryData, answerType: undefined }],
        ["solutionId", { ...validQuizSummaryData, solutionId: undefined }],
        ["status", { ...validQuizSummaryData, status: undefined }],
        ["creatorId", { ...validQuizSummaryData, creatorId: undefined }],
        ["createdAt", { ...validQuizSummaryData, createdAt: undefined }],
      ])("should reject missing required field: %s", (_field, invalidData) => {
        const result = QuizSummarySchema.safeParse(invalidData);
        expect(result.success).toBe(false);
      });
    });

    describe("Question Field", () => {
      it.each([
        ["valid question", "What is TypeScript?", true],
        ["single character", "A", true],
        ["unicode characters", "TypeScriptとは何ですか？", true],
        ["with newlines", "What is\nTypeScript?", true],
        ["empty string", "", false],
        ["only whitespace", "   ", true],
        ["null value", null, false],
      ])("should validate question: %s -> %s", (_desc, question, isValid) => {
        const data = { ...validQuizSummaryData, question };
        const result = QuizSummarySchema.safeParse(data);
        expect(result.success).toBe(isValid);
      });
    });

    describe("AnswerType Field", () => {
      it.each([
        ["boolean", "boolean", true],
        ["free_text", "free_text", true],
        ["single_choice", "single_choice", true],
        ["multiple_choice", "multiple_choice", true],
        ["invalid type", "invalid_type", false],
        ["empty string", "", false],
        ["null value", null, false],
      ])(
        "should validate answerType: %s -> %s",
        (_desc, answerType, isValid) => {
          const data = { ...validQuizSummaryData, answerType };
          const result = QuizSummarySchema.safeParse(data);
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
        const data = { ...validQuizSummaryData, status };
        const result = QuizSummarySchema.safeParse(data);
        expect(result.success).toBe(isValid);
      });
    });

    describe("Optional Fields", () => {
      it("should accept data without explanation", () => {
        const { explanation: _explanation, ...dataWithoutExplanation } =
          validQuizSummaryData;
        const result = QuizSummarySchema.safeParse(dataWithoutExplanation);
        expect(result.success).toBe(true);
      });

      it("should accept data without approvedAt", () => {
        const { approvedAt: _approvedAt, ...dataWithoutApprovedAt } =
          validQuizSummaryData;
        const result = QuizSummarySchema.safeParse(dataWithoutApprovedAt);
        expect(result.success).toBe(true);
      });

      it("should accept data without tagIds", () => {
        const { tagIds: _tagIds, ...dataWithoutTagIds } = validQuizSummaryData;
        const result = QuizSummarySchema.safeParse(dataWithoutTagIds);
        expect(result.success).toBe(true);

        if (result.success) {
          expect(result.data.tagIds).toEqual([]);
        }
      });
    });

    describe("Strict Mode", () => {
      it("should reject data with extra fields", () => {
        const dataWithExtraField = {
          ...validQuizSummaryData,
          extraField: "not allowed",
        };
        const result = QuizSummarySchema.safeParse(dataWithExtraField);
        expect(result.success).toBe(false);
      });
    });
  });

  describe("Cross-Field Validation (superRefine)", () => {
    describe("Approved Status and ApprovedAt", () => {
      it("should accept approved status with approvedAt", () => {
        const approvedData = {
          ...validQuizSummaryData,
          status: "approved" as const,
          approvedAt: "2023-12-02 10:00:00",
        };
        const result = QuizSummarySchema.safeParse(approvedData);
        expect(result.success).toBe(true);
      });

      it("should reject approved status without approvedAt", () => {
        const approvedWithoutTimestamp = {
          ...validQuizSummaryData,
          status: "approved" as const,
          approvedAt: undefined,
        };
        const result = QuizSummarySchema.safeParse(approvedWithoutTimestamp);
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
          ...validQuizSummaryData,
          status: "pending_approval" as const,
          approvedAt: undefined,
        };
        const result = QuizSummarySchema.safeParse(pendingData);
        expect(result.success).toBe(true);
      });

      it("should accept rejected status without approvedAt", () => {
        const rejectedData = {
          ...validQuizSummaryData,
          status: "rejected" as const,
          approvedAt: undefined,
        };
        const result = QuizSummarySchema.safeParse(rejectedData);
        expect(result.success).toBe(true);
      });
    });

    describe("Duplicate TagIds Validation", () => {
      it("should accept unique tag IDs", () => {
        const dataWithUniqueTagIds = {
          ...validQuizSummaryData,
          tagIds: ["tag-1", "tag-2", "tag-3"],
        };
        const result = QuizSummarySchema.safeParse(dataWithUniqueTagIds);
        expect(result.success).toBe(true);
      });

      it("should reject duplicate tag IDs", () => {
        const dataWithDuplicateTagIds = {
          ...validQuizSummaryData,
          tagIds: ["tag-1", "tag-2", "tag-1"],
        };
        const result = QuizSummarySchema.safeParse(dataWithDuplicateTagIds);
        expect(result.success).toBe(false);

        if (!result.success) {
          const error = result.error as ZodError;
          const duplicateError = error.issues.find((issue) =>
            issue.path.includes("tagIds"),
          );
          expect(duplicateError).toBeDefined();
          expect(duplicateError?.message).toBe(
            "Duplicate tag IDs are not allowed",
          );
        }
      });

      it("should accept empty tag IDs array", () => {
        const dataWithEmptyTagIds = {
          ...validQuizSummaryData,
          tagIds: [],
        };
        const result = QuizSummarySchema.safeParse(dataWithEmptyTagIds);
        expect(result.success).toBe(true);
      });

      it("should accept single tag ID", () => {
        const dataWithSingleTagId = {
          ...validQuizSummaryData,
          tagIds: ["tag-1"],
        };
        const result = QuizSummarySchema.safeParse(dataWithSingleTagId);
        expect(result.success).toBe(true);
      });
    });
  });

  describe("Edge Cases and Boundary Values", () => {
    describe("Long Strings", () => {
      it("should accept very long question", () => {
        const longQuestion = "A".repeat(1000);
        const data = { ...validQuizSummaryData, question: longQuestion };
        const result = QuizSummarySchema.safeParse(data);
        expect(result.success).toBe(true);
      });

      it("should accept very long explanation", () => {
        const longExplanation = "A".repeat(5000);
        const data = { ...validQuizSummaryData, explanation: longExplanation };
        const result = QuizSummarySchema.safeParse(data);
        expect(result.success).toBe(true);
      });
    });

    describe("Special Characters", () => {
      it.each([
        ["special characters", "What is <script>alert('xss')</script>?"],
        ["emoji", "What is TypeScript? 🤔"],
        ["multiline", "Line 1\nLine 2\nLine 3"],
        ["unicode", "TypeScriptとは何ですか？"],
        ["html entities", "&lt;html&gt; tags"],
      ])("should accept question with %s", (_desc, question) => {
        const data = { ...validQuizSummaryData, question };
        const result = QuizSummarySchema.safeParse(data);
        expect(result.success).toBe(true);
      });
    });

    describe("Date Validation", () => {
      it.each([
        ["SQLite format", "2023-12-01 10:00:00", true],
        ["SQLite date only", "2023-12-01", false],
        ["invalid date", "invalid-date", false],
        ["empty string", "", false],
        ["null", null, false],
      ])("should validate createdAt: %s -> %s", (_desc, createdAt, isValid) => {
        const data = { ...validQuizSummaryData, createdAt };
        const result = QuizSummarySchema.safeParse(data);
        expect(result.success).toBe(isValid);
      });
    });
  });

  describe("Complex Integration Scenarios", () => {
    it("should handle approved quiz with all fields", () => {
      const fullApprovedQuiz = {
        id: "quiz-complex-123",
        question: "Complex TypeScript question with unicode: 🚀",
        answerType: "multiple_choice" as const,
        solutionId: "solution-complex-456",
        explanation: "Detailed explanation with special chars & unicode",
        tagIds: ["typescript", "advanced", "web-dev"],
        status: "approved" as const,
        creatorId: "creator-expert-789",
        createdAt: "2023-12-01 10:00:00",
        approvedAt: "2023-12-02 15:30:00",
      };

      const result = QuizSummarySchema.safeParse(fullApprovedQuiz);
      expect(result.success).toBe(true);

      if (result.success) {
        expect(result.data.tagIds).toHaveLength(3);
        expect(result.data.status).toBe("approved");
        expect(result.data.approvedAt).toBeDefined();
      }
    });

    it("should handle minimal valid quiz", () => {
      const minimalQuiz = {
        id: "q",
        question: "Q?",
        answerType: "boolean" as const,
        solutionId: "s",
        status: "pending_approval" as const,
        creatorId: "c",
        createdAt: "2023-12-01 10:00:00",
      };

      const result = QuizSummarySchema.safeParse(minimalQuiz);
      expect(result.success).toBe(true);

      if (result.success) {
        expect(result.data.tagIds).toEqual([]);
        expect(result.data.explanation).toBeUndefined();
        expect(result.data.approvedAt).toBeUndefined();
      }
    });
  });
});
