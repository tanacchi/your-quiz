import { describe, expect, test } from "vitest";
import { InternalServerError } from "../../../../shared/errors";
import type { QuizRow } from "../repositories/types";
import { D1QuizSummaryMapper } from "./D1QuizSummaryMapper";

describe("D1QuizSummaryMapper", () => {
  const validQuizRow: QuizRow = {
    id: "quiz-123",
    question: "What is TypeScript?",
    answer_type: "single_choice",
    solution_id: "solution-123",
    explanation: "TypeScript is a programming language",
    status: "approved",
    creator_id: "user-123",
    created_at: "2024-01-01T00:00:00.000Z",
    approved_at: "2024-01-02T00:00:00.000Z",
  };

  describe("fromRow", () => {
    describe("when valid row data is provided", () => {
      test("should map row to QuizSummary successfully", () => {
        // Act
        const result = D1QuizSummaryMapper.fromRow(validQuizRow);

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          const quizSummary = result.value;
          expect(quizSummary.get("id")).toBe("quiz-123");
          expect(quizSummary.get("question")).toBe("What is TypeScript?");
          expect(quizSummary.get("answerType")).toBe("single_choice");
          expect(quizSummary.get("solutionId")).toBe("solution-123");
          expect(quizSummary.get("explanation")).toBe(
            "TypeScript is a programming language",
          );
          expect(quizSummary.get("status")).toBe("approved");
          expect(quizSummary.get("creatorId")).toBe("user-123");
          expect(quizSummary.get("createdAt")).toBe("2024-01-01T00:00:00.000Z");
          expect(quizSummary.get("approvedAt")).toBe(
            "2024-01-02T00:00:00.000Z",
          );
          expect(quizSummary.get("tagIds")).toEqual([]);
        }
      });

      test("should handle row without optional fields", () => {
        // Arrange
        const minimalRow: QuizRow = {
          id: "quiz-456",
          question: "Is JavaScript typed?",
          answer_type: "boolean",
          solution_id: "solution-456",
          status: "pending_approval",
          creator_id: "user-456",
          created_at: "2024-01-01T00:00:00.000Z",
        };

        // Act
        const result = D1QuizSummaryMapper.fromRow(minimalRow);

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          const quizSummary = result.value;
          expect(quizSummary.get("explanation")).toBeUndefined();
          expect(quizSummary.get("approvedAt")).toBeUndefined();
          expect(quizSummary.get("status")).toBe("pending_approval");
        }
      });

      test("should handle empty solution_id", () => {
        // Arrange
        const rowWithEmptySolutionId: QuizRow = {
          ...validQuizRow,
          solution_id: "",
        };

        // Act
        const result = D1QuizSummaryMapper.fromRow(rowWithEmptySolutionId);

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.get("solutionId")).toBe("");
        }
      });

      test.each([
        ["boolean", "boolean"],
        ["free_text", "free_text"],
        ["single_choice", "single_choice"],
        ["multiple_choice", "multiple_choice"],
      ])("should handle %s answer type", (_description, answerType) => {
        // Arrange
        const rowWithAnswerType: QuizRow = {
          ...validQuizRow,
          answer_type: answerType,
        };

        // Act
        const result = D1QuizSummaryMapper.fromRow(rowWithAnswerType);

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.get("answerType")).toBe(answerType);
        }
      });

      test.each([
        ["pending_approval", "pending_approval"],
        ["approved", "approved"],
        ["rejected", "rejected"],
      ])("should handle %s status", (_description, status) => {
        // Arrange
        const rowWithStatus: QuizRow = {
          ...validQuizRow,
          status,
        };

        // Act
        const result = D1QuizSummaryMapper.fromRow(rowWithStatus);

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.get("status")).toBe(status);
        }
      });
    });

    describe("when invalid row data is provided", () => {
      test.each([
        ["missing id", { ...validQuizRow, id: "" }],
        ["missing question", { ...validQuizRow, question: "" }],
        ["missing answer_type", { ...validQuizRow, answer_type: "" }],
        ["missing status", { ...validQuizRow, status: "" }],
        ["missing creator_id", { ...validQuizRow, creator_id: "" }],
        ["missing created_at", { ...validQuizRow, created_at: "" }],
        ["null id", { ...validQuizRow, id: null as unknown as string }],
        [
          "undefined question",
          { ...validQuizRow, question: undefined as unknown as string },
        ],
      ])("should return error for %s", (_description, invalidRow) => {
        // Act
        const result = D1QuizSummaryMapper.fromRow(invalidRow as QuizRow);

        // Assert
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error).toBeInstanceOf(InternalServerError);
          expect(result.error.message).toContain("Missing required fields");
        }
      });
    });

    describe("when QuizSummary creation fails", () => {
      test("should return InternalServerError for invalid data", () => {
        // Arrange - Create row with invalid answerType that would fail QuizSummary validation
        const invalidRow: QuizRow = {
          ...validQuizRow,
          answer_type: "invalid_type",
        };

        // Act
        const result = D1QuizSummaryMapper.fromRow(invalidRow);

        // Assert
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error).toBeInstanceOf(InternalServerError);
          expect(result.error.message).toContain(
            "Failed to create QuizSummary from row data",
          );
        }
      });

      test("should return InternalServerError for invalid status", () => {
        // Arrange
        const invalidRow: QuizRow = {
          ...validQuizRow,
          status: "invalid_status",
        };

        // Act
        const result = D1QuizSummaryMapper.fromRow(invalidRow);

        // Assert
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error).toBeInstanceOf(InternalServerError);
          expect(result.error.message).toContain(
            "Failed to create QuizSummary from row data",
          );
        }
      });
    });

    describe("edge cases", () => {
      test("should handle null explanation", () => {
        // Arrange
        const rowWithNullExplanation: QuizRow = {
          ...validQuizRow,
          explanation: null as unknown as string,
        };

        // Act
        const result = D1QuizSummaryMapper.fromRow(rowWithNullExplanation);

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.get("explanation")).toBeUndefined();
        }
      });

      test("should handle null approved_at", () => {
        // Arrange
        const rowWithNullApprovedAt: QuizRow = {
          ...validQuizRow,
          approved_at: null as unknown as string,
        };

        // Act
        const result = D1QuizSummaryMapper.fromRow(rowWithNullApprovedAt);

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.get("approvedAt")).toBeUndefined();
        }
      });

      test("should handle very long strings", () => {
        // Arrange
        const longString = "a".repeat(10000);
        const rowWithLongStrings: QuizRow = {
          ...validQuizRow,
          question: longString,
          explanation: longString,
        };

        // Act
        const result = D1QuizSummaryMapper.fromRow(rowWithLongStrings);

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.get("question")).toBe(longString);
          expect(result.value.get("explanation")).toBe(longString);
        }
      });

      test("should handle special characters", () => {
        // Arrange
        const specialCharsRow: QuizRow = {
          ...validQuizRow,
          question: "Test with 特殊文字 & émojis 🎯",
          explanation: "Explanation with <html> & special chars",
        };

        // Act
        const result = D1QuizSummaryMapper.fromRow(specialCharsRow);

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.get("question")).toBe(
            "Test with 特殊文字 & émojis 🎯",
          );
          expect(result.value.get("explanation")).toBe(
            "Explanation with <html> & special chars",
          );
        }
      });
    });
  });

  describe("fromRows", () => {
    describe("when valid rows are provided", () => {
      test("should map multiple rows successfully", () => {
        // Arrange
        const rows: QuizRow[] = [
          validQuizRow,
          {
            ...validQuizRow,
            id: "quiz-456",
            question: "What is JavaScript?",
            answer_type: "boolean",
          },
          {
            ...validQuizRow,
            id: "quiz-789",
            question: "Is React a library?",
            answer_type: "free_text",
          },
        ];

        // Act
        const result = D1QuizSummaryMapper.fromRows(rows);

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value).toHaveLength(3);
          expect(result.value[0].get("id")).toBe("quiz-123");
          expect(result.value[1].get("id")).toBe("quiz-456");
          expect(result.value[2].get("id")).toBe("quiz-789");
        }
      });

      test("should handle empty array", () => {
        // Act
        const result = D1QuizSummaryMapper.fromRows([]);

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value).toHaveLength(0);
        }
      });

      test("should handle single row", () => {
        // Act
        const result = D1QuizSummaryMapper.fromRows([validQuizRow]);

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value).toHaveLength(1);
          expect(result.value[0].get("id")).toBe("quiz-123");
        }
      });
    });

    describe("when some rows are invalid", () => {
      test("should return error if any row mapping fails", () => {
        // Arrange
        const rowsWithInvalid: QuizRow[] = [
          validQuizRow,
          { ...validQuizRow, id: "" }, // Invalid row
          { ...validQuizRow, id: "quiz-456" },
        ];

        // Act
        const result = D1QuizSummaryMapper.fromRows(rowsWithInvalid);

        // Assert
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error).toBeInstanceOf(InternalServerError);
          expect(result.error.message).toContain("Failed to map 1/3 rows");
          expect(result.error.message).toContain("Row 1:");
        }
      });

      test("should return error with multiple failed rows", () => {
        // Arrange
        const rowsWithMultipleInvalid: QuizRow[] = [
          { ...validQuizRow, id: "" }, // Invalid row 0
          validQuizRow,
          { ...validQuizRow, question: "" }, // Invalid row 2
          { ...validQuizRow, id: "quiz-456" },
          { ...validQuizRow, answer_type: "" }, // Invalid row 4
        ];

        // Act
        const result = D1QuizSummaryMapper.fromRows(rowsWithMultipleInvalid);

        // Assert
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error).toBeInstanceOf(InternalServerError);
          expect(result.error.message).toContain("Failed to map 3/5 rows");
          expect(result.error.message).toContain("Row 0:");
          expect(result.error.message).toContain("Row 2:");
          expect(result.error.message).toContain("Row 4:");
        }
      });

      test("should return error when all rows are invalid", () => {
        // Arrange
        const allInvalidRows: QuizRow[] = [
          { ...validQuizRow, id: "" },
          { ...validQuizRow, question: "" },
          { ...validQuizRow, answer_type: "" },
        ];

        // Act
        const result = D1QuizSummaryMapper.fromRows(allInvalidRows);

        // Assert
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error).toBeInstanceOf(InternalServerError);
          expect(result.error.message).toContain("Failed to map 3/3 rows");
        }
      });
    });

    describe("edge cases", () => {
      test("should handle large number of rows", () => {
        // Arrange
        const manyRows: QuizRow[] = Array.from(
          { length: 1000 },
          (_, index) => ({
            ...validQuizRow,
            id: `quiz-${index}`,
            question: `Question ${index}`,
          }),
        );

        // Act
        const result = D1QuizSummaryMapper.fromRows(manyRows);

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value).toHaveLength(1000);
          expect(result.value[0].get("id")).toBe("quiz-0");
          expect(result.value[999].get("id")).toBe("quiz-999");
        }
      });

      test("should handle rows with mixed validity patterns", () => {
        // Arrange
        const mixedRows: QuizRow[] = [
          validQuizRow, // Valid
          { ...validQuizRow, id: "" }, // Invalid
          { ...validQuizRow, id: "quiz-2" }, // Valid
          { ...validQuizRow, question: "" }, // Invalid
          { ...validQuizRow, id: "quiz-4" }, // Valid
        ];

        // Act
        const result = D1QuizSummaryMapper.fromRows(mixedRows);

        // Assert
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error.message).toContain("Failed to map 2/5 rows");
        }
      });
    });
  });
});
