import { describe, expect, test } from "vitest";
import { InternalServerError } from "../../../../shared/errors";
import { D1QuizSummaryMapper } from "./D1QuizSummaryMapper";
import type { QuizRow } from "./d1-types";

function isFlexibleQuizRow(data: unknown): data is QuizRow {
  if (typeof data !== "object" || data === null) return false;
  return (
    "id" in data &&
    "question" in data &&
    "answer_type" in data &&
    "solution_id" in data &&
    "status" in data &&
    "creator_id" in data &&
    "created_at" in data
  );
}

function toQuizRowForTest(data: Record<string, unknown>): QuizRow {
  if (!isFlexibleQuizRow(data)) {
    throw new Error("Test data missing required QuizRow keys");
  }
  return data;
}

describe("D1QuizSummaryMapper", () => {
  const validQuizRow: QuizRow = {
    id: "quiz-123",
    question: "What is TypeScript?",
    answer_type: "single_choice",
    solution_id: "solution-123",
    explanation: "TypeScript is a programming language",
    status: "approved",
    creator_id: "user-123",
    created_at: "2024-01-01 00:00:00",
    approved_at: "2024-01-02 00:00:00",
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
          expect(quizSummary.get("createdAt")).toBe("2024-01-01 00:00:00");
          expect(quizSummary.get("approvedAt")).toBe("2024-01-02 00:00:00");
          expect(quizSummary.get("tagIds")).toEqual([]);
          // ArrayDeclaration変異対策: tagIds配列の厳密な検証
          expect(quizSummary.get("tagIds")).toHaveLength(0);
          expect(Array.isArray(quizSummary.get("tagIds"))).toBe(true);
          expect(quizSummary.get("tagIds")).not.toContain("Stryker was here");
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
          created_at: "2024-01-01 00:00:00",
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
          expect(result.value.get("solutionId")).toBe("placeholder");
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
          answer_type: answerType as
            | "boolean"
            | "free_text"
            | "single_choice"
            | "multiple_choice",
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
          status: status as "pending_approval" | "approved" | "rejected",
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
          expect(result.error.message).toBe("Internal server error");
          expect(result.error.details).toContain("Missing required fields");
        }
      });
    });

    describe("when QuizSummary creation fails", () => {
      test("should return InternalServerError for invalid data", () => {
        // Arrange - Create row with invalid answerType that would fail QuizSummary validation
        const invalidRow = {
          ...validQuizRow,
          answer_type: "invalid_type",
        } as unknown as QuizRow;

        // Act
        const result = D1QuizSummaryMapper.fromRow(invalidRow);

        // Assert
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error).toBeInstanceOf(InternalServerError);
          expect(result.error.message).toBe("Internal server error");
          expect(result.error.details).toContain(
            "Failed to create QuizSummary from row data",
          );
        }
      });

      test("should return InternalServerError for invalid status", () => {
        // Arrange
        const invalidRow = {
          ...validQuizRow,
          status: "invalid_status",
        } as unknown as QuizRow;

        // Act
        const result = D1QuizSummaryMapper.fromRow(invalidRow);

        // Assert
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error).toBeInstanceOf(InternalServerError);
          expect(result.error.message).toBe("Internal server error");
          expect(result.error.details).toContain(
            "Failed to create QuizSummary from row data",
          );
        }
      });
    });

    describe("ArrowFunction mutation tests", () => {
      test("should ensure error mapping function creates proper InternalServerError", () => {
        // Arrange - Invalid answerType that will cause QuizSummary.from to fail
        const invalidRow = {
          ...validQuizRow,
          answer_type: "completely_invalid_type",
        } as unknown as QuizRow;

        // Act
        const result = D1QuizSummaryMapper.fromRow(invalidRow);

        // Assert
        // ArrowFunction変異対策: mapErrのアロー関数が () => undefined に変異されても失敗するテスト
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          // エラーマップ関数が正しく動作することを確認
          expect(result.error).toBeInstanceOf(InternalServerError);
          expect(result.error).not.toBeUndefined();
          expect(result.error.message).toBe("Internal server error");
          expect(result.error.details).toContain(
            "Failed to create QuizSummary from row data",
          );
          expect(typeof result.error.details).toBe("string");
          expect(result.error.details?.length).toBeGreaterThan(0);
        }
      });

      test("should verify error transformation logic in mapErr", () => {
        // Arrange - Another invalid case to test error mapping
        const invalidRow = {
          ...validQuizRow,
          status: "unknown_status_value",
        } as unknown as QuizRow;

        // Act
        const result = D1QuizSummaryMapper.fromRow(invalidRow);

        // Assert
        // ArrowFunction変異対策: エラー変換ロジックが適切に機能することを検証
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error).toBeInstanceOf(InternalServerError);
          expect(result.error.details).toMatch(
            /Failed to create QuizSummary from row data/,
          );
          // エラーメッセージにJSON文字列が含まれることを確認（元のエラー情報が保持される）
          expect(result.error.details).toContain("QuizSummary");
          expect(result.error.details).not.toBe("undefined");
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
          status: "pending_approval",
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
          // ArrayDeclaration変異対策: results配列の厳密な検証
          expect(Array.isArray(result.value)).toBe(true);
          expect(result.value).not.toContain("Stryker was here");
          expect(result.value.every((item) => typeof item === "object")).toBe(
            true,
          );
          expect(result.value[0]?.get("id")).toBe("quiz-123");
          expect(result.value[1]?.get("id")).toBe("quiz-456");
          expect(result.value[2]?.get("id")).toBe("quiz-789");
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
          expect(result.value[0]?.get("id")).toBe("quiz-123");
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
          expect(result.error.message).toBe("Internal server error");
          expect(result.error.details).toContain("Failed to map 1/3 rows");
          expect(result.error.details).toContain("Row 1:");
        }
      });

      test("should return error with multiple failed rows", () => {
        // Arrange
        const rowsWithMultipleInvalid: QuizRow[] = [
          { ...validQuizRow, id: "" }, // Invalid row 0
          validQuizRow,
          { ...validQuizRow, question: "" }, // Invalid row 2
          { ...validQuizRow, id: "quiz-456" },
          toQuizRowForTest({ ...validQuizRow, answer_type: "" }), // Invalid row 4
        ];

        // Act
        const result = D1QuizSummaryMapper.fromRows(rowsWithMultipleInvalid);

        // Assert
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error).toBeInstanceOf(InternalServerError);
          expect(result.error.message).toBe("Internal server error");
          expect(result.error.details).toContain("Failed to map 3/5 rows");
          expect(result.error.details).toContain("Row 0:");
          expect(result.error.details).toContain("Row 2:");
          expect(result.error.details).toContain("Row 4:");
        }
      });

      test("should return error when all rows are invalid", () => {
        // Arrange
        const allInvalidRows: QuizRow[] = [
          { ...validQuizRow, id: "" },
          { ...validQuizRow, question: "" },
          toQuizRowForTest({ ...validQuizRow, answer_type: "" }),
        ];

        // Act
        const result = D1QuizSummaryMapper.fromRows(allInvalidRows);

        // Assert
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error).toBeInstanceOf(InternalServerError);
          expect(result.error.message).toBe("Internal server error");
          expect(result.error.details).toContain("Failed to map 3/3 rows");
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
          expect(result.value[0]?.get("id")).toBe("quiz-0");
          expect(result.value[999]?.get("id")).toBe("quiz-999");
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
          expect(result.error.message).toBe("Internal server error");
          expect(result.error.details).toContain("Failed to map 2/5 rows");
        }
      });
    });

    describe("ConditionalExpression mutation tests", () => {
      test("should ensure error condition check is not bypassed", () => {
        // Arrange - Create a scenario that will definitely trigger error condition
        const invalidRows: QuizRow[] = [
          { ...validQuizRow, id: "" }, // Invalid: empty id
        ];

        // Act
        const result = D1QuizSummaryMapper.fromRows(invalidRows);

        // Assert
        // ConditionalExpression変異対策: if (mappingResult.isErr()) が if (false) に変異されても失敗するテスト
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error.details).toContain("Failed to map 1/1 rows");
          // エラーが正しく検出され、蓄積されることを確認
          expect(result.error.details).toContain("Row 0:");
          expect(result.error.details).toContain("Internal server error");
        }
      });

      test("should not proceed with invalid data when error check is bypassed", () => {
        // Arrange - Mix valid and invalid data
        const mixedRows: QuizRow[] = [
          validQuizRow,
          { ...validQuizRow, creator_id: "" }, // Invalid: empty creator_id
          { ...validQuizRow, id: "quiz-valid-2" },
        ];

        // Act
        const result = D1QuizSummaryMapper.fromRows(mixedRows);

        // Assert
        // ConditionalExpression変異: エラーチェックが無効化されても適切に失敗することを検証
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error.details).toContain("Failed to map 1/3 rows");
          expect(result.error.details).toContain("Row 1:");
        }
      });
    });

    describe("Comprehensive mutation coverage tests", () => {
      describe("ArrayDeclaration mutation tests", () => {
        test("should verify requiredFields array is not empty", () => {
          // Arrange - Missing required field to test validation logic
          const invalidRow: QuizRow = {
            ...validQuizRow,
            id: "", // This should trigger required field validation
          };

          // Act
          const result = D1QuizSummaryMapper.fromRow(invalidRow);

          // Assert
          // ArrayDeclaration変異対策: requiredFields = [] に変異されても失敗するテスト
          expect(result.isErr()).toBe(true);
          if (result.isErr()) {
            expect(result.error.details).toContain("Missing required fields");
            expect(result.error.details).toContain("id");
          }
        });

        test("should verify tagIds array initialization in fromRow", () => {
          // Act
          const result = D1QuizSummaryMapper.fromRow(validQuizRow);

          // Assert
          expect(result.isOk()).toBe(true);
          if (result.isOk()) {
            const tagIds = result.value.get("tagIds");
            // ArrayDeclaration変異対策: tagIds: ["Stryker was here"] に変異されても失敗
            expect(tagIds).toEqual([]);
            expect(tagIds).toHaveLength(0);
            expect(Array.isArray(tagIds)).toBe(true);
            expect(tagIds).not.toContain("Stryker was here");
            expect(tagIds.every((item) => typeof item === "string")).toBe(true);
          }
        });

        test("should verify results array initialization in fromRows", () => {
          // Act
          const result = D1QuizSummaryMapper.fromRows([validQuizRow]);

          // Assert
          expect(result.isOk()).toBe(true);
          if (result.isOk()) {
            // ArrayDeclaration変異対策: results: ["Stryker was here"] に変異されても失敗
            expect(result.value).toHaveLength(1);
            expect(Array.isArray(result.value)).toBe(true);
            expect(result.value).not.toContain("Stryker was here");
            expect(result.value[0]).toBeDefined();
            expect(typeof result.value[0]).toBe("object");
            expect(result.value[0]?.get("id")).toBe("quiz-123");
          }
        });

        test("should verify errors array initialization in fromRows", () => {
          // Arrange - Mix of valid and invalid rows
          const mixedRows: QuizRow[] = [
            validQuizRow,
            { ...validQuizRow, id: "" }, // Invalid
          ];

          // Act
          const result = D1QuizSummaryMapper.fromRows(mixedRows);

          // Assert
          expect(result.isErr()).toBe(true);
          if (result.isErr()) {
            // ArrayDeclaration変異対策: errors配列が正常に初期化されていることを確認
            expect(result.error.details).toContain("Failed to map 1/2 rows");
            expect(result.error.details).toContain("Row 1:");
            expect(result.error.details).not.toBe("Stryker was here");
          }
        });
      });

      describe("BlockStatement mutation tests", () => {
        test("should verify fromRows loop body execution", () => {
          // Arrange - Multiple valid rows
          const multipleRows: QuizRow[] = [
            { ...validQuizRow, id: "quiz-1" },
            { ...validQuizRow, id: "quiz-2" },
            { ...validQuizRow, id: "quiz-3" },
          ];

          // Act
          const result = D1QuizSummaryMapper.fromRows(multipleRows);

          // Assert
          // BlockStatement変異対策: for loop body が削除されても失敗するテスト
          expect(result.isOk()).toBe(true);
          if (result.isOk()) {
            expect(result.value).toHaveLength(3);
            expect(result.value[0]?.get("id")).toBe("quiz-1");
            expect(result.value[1]?.get("id")).toBe("quiz-2");
            expect(result.value[2]?.get("id")).toBe("quiz-3");
            // Each item should be properly processed, not empty
            result.value.forEach((item) => {
              expect(item.get("question")).toBeDefined();
              expect(item.get("answerType")).toBeDefined();
            });
          }
        });

        test("should process each row individually in fromRows", () => {
          // Arrange - Mix of different valid data
          const diverseRows: QuizRow[] = [
            { ...validQuizRow, question: "Question 1", answer_type: "boolean" },
            {
              ...validQuizRow,
              question: "Question 2",
              answer_type: "free_text",
            },
          ];

          // Act
          const result = D1QuizSummaryMapper.fromRows(diverseRows);

          // Assert
          // BlockStatement変異対策: 各行が個別に処理されることを確認
          expect(result.isOk()).toBe(true);
          if (result.isOk()) {
            expect(result.value).toHaveLength(2);
            expect(result.value[0]?.get("question")).toBe("Question 1");
            expect(result.value[0]?.get("answerType")).toBe("boolean");
            expect(result.value[1]?.get("question")).toBe("Question 2");
            expect(result.value[1]?.get("answerType")).toBe("free_text");
          }
        });

        test("should accumulate errors correctly in fromRows", () => {
          // Arrange - Multiple invalid rows to test error accumulation
          const invalidRows: QuizRow[] = [
            { ...validQuizRow, id: "" }, // Error row 0
            { ...validQuizRow, question: "" }, // Error row 1
            validQuizRow, // Valid row 2
            toQuizRowForTest({ ...validQuizRow, status: "" }), // Error row 3
          ];

          // Act
          const result = D1QuizSummaryMapper.fromRows(invalidRows);

          // Assert
          // BlockStatement変異対策: エラー蓄積処理が実行されることを確認
          expect(result.isErr()).toBe(true);
          if (result.isErr()) {
            expect(result.error.details).toContain("Failed to map 3/4 rows");
            expect(result.error.details).toContain("Row 0:");
            expect(result.error.details).toContain("Row 1:");
            expect(result.error.details).toContain("Row 3:");
            expect(result.error.details).not.toContain("Row 2:"); // Valid row should not be in error
          }
        });
      });

      describe("LogicalOperator mutation tests", () => {
        test("should verify solutionId && logic is not changed to ||", () => {
          // Arrange - Test cases for && vs || logic
          const testCases = [
            { solution_id: null, expected: "placeholder" },
            { solution_id: undefined, expected: "placeholder" },
            { solution_id: "", expected: "placeholder" },
            { solution_id: "valid-id", expected: "valid-id" },
          ];

          testCases.forEach(({ solution_id, expected }) => {
            const testRow: QuizRow = {
              ...validQuizRow,
              solution_id: solution_id as string,
            };

            // Act
            const result = D1QuizSummaryMapper.fromRow(testRow);

            // Assert
            // LogicalOperator変異対策: && が || に変異されても失敗するテスト
            expect(result.isOk()).toBe(true);
            if (result.isOk()) {
              expect(result.value.get("solutionId")).toBe(expected);
            }
          });
        });

        test("should verify explanation && logic is not changed to ||", () => {
          // Arrange - Test cases for explanation field logic
          const testCases = [
            { explanation: null, expected: undefined },
            { explanation: undefined, expected: undefined },
            { explanation: "", expected: undefined }, // Empty string becomes undefined due to falsy check
            { explanation: "valid explanation", expected: "valid explanation" },
          ];

          testCases.forEach(({ explanation, expected }) => {
            const testRow: QuizRow = {
              ...validQuizRow,
              explanation: explanation as string,
            };

            // Act
            const result = D1QuizSummaryMapper.fromRow(testRow);

            // Assert
            // LogicalOperator変異対策: && が || に変異されても失敗するテスト
            expect(result.isOk()).toBe(true);
            if (result.isOk()) {
              expect(result.value.get("explanation")).toBe(expected);
            }
          });
        });

        test("should verify approvedAt && logic is not changed to ||", () => {
          // Arrange - Test cases for approvedAt field logic
          const testCases = [
            {
              approved_at: null,
              status: "pending_approval",
              expected: undefined,
            },
            {
              approved_at: undefined,
              status: "pending_approval",
              expected: undefined,
            },
            {
              approved_at: "",
              status: "pending_approval",
              expected: undefined,
            },
            {
              approved_at: "2024-01-02 00:00:00",
              status: "approved",
              expected: "2024-01-02 00:00:00",
            },
          ];

          testCases.forEach(({ approved_at, status, expected }) => {
            const testRow: QuizRow = {
              ...validQuizRow,
              status: status as "pending_approval" | "approved",
              approved_at: approved_at as string,
            };

            // Act
            const result = D1QuizSummaryMapper.fromRow(testRow);

            // Assert
            // LogicalOperator変異対策: && が || に変異されても失敗するテスト
            expect(result.isOk()).toBe(true);
            if (result.isOk()) {
              expect(result.value.get("approvedAt")).toBe(expected);
            }
          });
        });

        test("should verify requiredFields filter && logic", () => {
          // Arrange - Row with mix of empty and null values
          const problematicRow = {
            id: "valid-id", // Valid
            question: "", // Empty - should be filtered
            answer_type: "boolean", // Valid
            solution_id: "sol-123", // Valid (not in required fields)
            status: null, // Null - should be filtered
            creator_id: "user-123", // Valid
            created_at: "", // Empty - should be filtered
          };

          // Act
          const result = D1QuizSummaryMapper.fromRow(
            toQuizRowForTest(problematicRow),
          );

          // Assert
          // LogicalOperator変異対策: filter内の && が || に変異されても失敗するテスト
          expect(result.isErr()).toBe(true);
          if (result.isErr()) {
            expect(result.error.details).toContain("Missing required fields");
            // Should contain all three problematic fields
            expect(result.error.details).toContain("question");
            expect(result.error.details).toContain("status");
            expect(result.error.details).toContain("created_at");
          }
        });
      });

      describe("EqualityOperator mutation tests", () => {
        test("should verify solutionId !== empty string check", () => {
          // Arrange - Test empty string specifically
          const rowWithEmptyString: QuizRow = {
            ...validQuizRow,
            solution_id: "",
          };

          // Act
          const result = D1QuizSummaryMapper.fromRow(rowWithEmptyString);

          // Assert
          // EqualityOperator変異対策: !== "" が === "" に変異されても失敗するテスト
          expect(result.isOk()).toBe(true);
          if (result.isOk()) {
            expect(result.value.get("solutionId")).toBe("placeholder");
          }
        });

        test("should verify explanation !== null check", () => {
          // Arrange - Test null value specifically
          const rowWithNullExplanation: QuizRow = {
            ...validQuizRow,
            explanation: null as unknown as string,
          };

          // Act
          const result = D1QuizSummaryMapper.fromRow(rowWithNullExplanation);

          // Assert
          // EqualityOperator変異対策: !== null が === null に変異されても失敗するテスト
          expect(result.isOk()).toBe(true);
          if (result.isOk()) {
            expect(result.value.get("explanation")).toBeUndefined();
          }
        });

        test("should verify approvedAt !== null check", () => {
          // Arrange - Test null value with appropriate status
          const rowWithNullApprovedAt: QuizRow = {
            ...validQuizRow,
            status: "pending_approval",
            approved_at: null as unknown as string,
          };

          // Act
          const result = D1QuizSummaryMapper.fromRow(rowWithNullApprovedAt);

          // Assert
          // EqualityOperator変異対策: !== null が === null に変異されても失敗するテスト
          expect(result.isOk()).toBe(true);
          if (result.isOk()) {
            expect(result.value.get("approvedAt")).toBeUndefined();
          }
        });

        // ---- 等価ミュータント（Equivalent Mutant）注記 ----
        // 以下の変異は「先行ガードにより論理的に kill 不能」な等価ミュータントである。
        // テストを増やしても検出できないため、意図的にテストを作成していない。
        //
        // 1. L23:73 ConditionalExpression: `row[field] === ''` → false
        //    理由: フィルタ条件は `!row[field] || row[field] === ''` であり、
        //    `!row[field]` が false の時点で既に row[field] は truthy（非空文字列）なので、
        //    後続の `row[field] === ''` は常に false になる（冗長な条件）。
        //    → `→ false` 変異は行動変化なし。
        //
        // 2. L39:38 ConditionalExpression: `row.solution_id !== ""` → true
        //    理由: 条件は `row.solution_id && row.solution_id !== ""` であり、
        //    `row.solution_id` が truthy（非空文字列）の場合のみ右辺を評価する。
        //    truthy な文字列は必ず `!== ""` なので `→ true` 変異は行動変化なし。
        //
        // 3. L40:39 ConditionalExpression: `row.explanation !== null` → true
        //    理由: 同様に `row.explanation && ...` の後続評価のため、
        //    `row.explanation` が truthy な場合 `!== null` は常に true。
        //    → `→ true` 変異は行動変化なし。
        //
        // 4. L44:38 ConditionalExpression: `row.approved_at !== null` → true
        //    理由: `row.approved_at && row.approved_at !== null` で同様。
        //    → `→ true` 変異は行動変化なし。
      });

      describe("StringLiteral mutation tests", () => {
        test("should handle 'Stryker was here!' as solution_id", () => {
          // Arrange - Test the specific mutated string
          const rowWithStrykerString: QuizRow = {
            ...validQuizRow,
            solution_id: "Stryker was here!",
          };

          // Act
          const result = D1QuizSummaryMapper.fromRow(rowWithStrykerString);

          // Assert
          // StringLiteral変異対策: "" が "Stryker was here!" に変異されても失敗するテスト
          expect(result.isOk()).toBe(true);
          if (result.isOk()) {
            expect(result.value.get("solutionId")).toBe("Stryker was here!");
            expect(result.value.get("solutionId")).not.toBe("placeholder");
          }
        });

        test("should distinguish empty string from 'Stryker was here!' string", () => {
          // Arrange - Both test cases
          const testCases = [
            { solution_id: "", expected: "placeholder" },
            { solution_id: "Stryker was here!", expected: "Stryker was here!" },
          ];

          testCases.forEach(({ solution_id, expected }) => {
            const testRow: QuizRow = {
              ...validQuizRow,
              solution_id,
            };

            // Act
            const result = D1QuizSummaryMapper.fromRow(testRow);

            // Assert
            // StringLiteral変異対策: 文字列比較が正確に動作することを確認
            expect(result.isOk()).toBe(true);
            if (result.isOk()) {
              expect(result.value.get("solutionId")).toBe(expected);
            }
          });
        });

        test("should treat required field with value 'Stryker was here!' as valid", () => {
          // L23:88 StringLiteral '' → "Stryker was here!" 変異対策
          // requiredFields filter 内 `row[field] === ''` の '' が "Stryker was here!" に変異すると、
          // 正当な値を持つフィールドが「欠落フィールド」として誤検出される。
          // このテストは、必須フィールドが "Stryker was here!" という値でも
          // エラーにならないことを検証し、その変異を検出する。
          const testCases: Array<{ field: keyof QuizRow; value: string }> = [
            { field: "question", value: "Stryker was here!" },
            { field: "answer_type", value: "boolean" },
            { field: "status", value: "approved" },
            { field: "creator_id", value: "Stryker was here!" },
            { field: "created_at", value: "2024-01-01 00:00:00" },
          ];

          testCases.forEach(({ field, value }) => {
            const testRow: QuizRow = { ...validQuizRow, [field]: value };
            const result = D1QuizSummaryMapper.fromRow(testRow);

            // 変異が生きていると、"Stryker was here!" === "Stryker was here!" が true になり、
            // 正当な値が欠落扱いされて isErr() になる
            expect(result.isOk()).toBe(true);
            if (result.isErr()) {
              expect(result.error.details).not.toContain(
                "Missing required fields",
              );
            }
          });
        });
      });

      describe("ConditionalExpression mutation tests - extended", () => {
        test("should verify explanation conditional is not hardcoded to false", () => {
          // Arrange - Test both branches of the conditional
          const testCases = [
            { explanation: "Valid explanation", expected: "Valid explanation" },
            { explanation: null, expected: undefined },
            { explanation: undefined, expected: undefined },
          ];

          testCases.forEach(({ explanation, expected }) => {
            const testRow: QuizRow = {
              ...validQuizRow,
              explanation: explanation as string,
            };

            // Act
            const result = D1QuizSummaryMapper.fromRow(testRow);

            // Assert
            // ConditionalExpression変異対策: 条件式が false に変異されても失敗するテスト
            expect(result.isOk()).toBe(true);
            if (result.isOk()) {
              expect(result.value.get("explanation")).toBe(expected);
            }
          });
        });

        test("should verify error length check is not hardcoded to false", () => {
          // Arrange - Case that should produce errors
          const invalidRows: QuizRow[] = [
            { ...validQuizRow, id: "" },
            { ...validQuizRow, question: "" },
          ];

          // Act
          const result = D1QuizSummaryMapper.fromRows(invalidRows);

          // Assert
          // ConditionalExpression変異対策: if (errors.length > 0) が if (false) に変異されても失敗
          expect(result.isErr()).toBe(true);
          if (result.isErr()) {
            expect(result.error.details).toContain("Failed to map 2/2 rows");
          }
        });

        test("should verify all conditional branches work correctly", () => {
          // Arrange - Test each conditional path
          const validCase = D1QuizSummaryMapper.fromRows([validQuizRow]);
          const invalidCase = D1QuizSummaryMapper.fromRows([
            { ...validQuizRow, id: "" },
          ]);
          const emptyCase = D1QuizSummaryMapper.fromRows([]);

          // Assert - All conditionals should work correctly
          expect(validCase.isOk()).toBe(true);
          expect(invalidCase.isErr()).toBe(true);
          expect(emptyCase.isOk()).toBe(true);

          if (emptyCase.isOk()) {
            expect(emptyCase.value).toHaveLength(0);
          }
        });
      });
    });
  });
});
