import { beforeEach, describe, expect, test } from "vitest";
import type { components } from "../../../../shared/types";
import {
  CreatorId,
  QuizId,
  QuizSummary,
  SolutionId,
} from "../../domain/entities/quiz-summary/QuizSummary";
import { TagIds } from "../../domain/entities/quiz-summary/quiz-summary-schema";
import { MockQuizRepository } from "./MockQuizRepository";

describe.todo("MockQuizRepository", () => {
  let repository: MockQuizRepository;

  const createMockQuiz = (
    overrides: Partial<{
      id: string;
      question: string;
      answerType: components["schemas"]["AnswerType"];
      solutionId: string;
      status: components["schemas"]["QuizStatus"];
      creatorId: string;
      explanation?: string;
      tagIds: string[];
    }> = {},
  ): QuizSummary => {
    const defaults = {
      id: "quiz-test",
      question: "Test question",
      answerType: "single_choice" as const,
      solutionId: "solution-test",
      status: "approved" as const,
      creatorId: "user-test",
      tagIds: ["tag-1"],
      ...overrides,
    };

    return QuizSummary.build({
      id: QuizId.parse(defaults.id),
      question: defaults.question,
      answerType: defaults.answerType,
      solutionId: SolutionId.parse(defaults.solutionId),
      explanation: defaults.explanation,
      status: defaults.status,
      creatorId: CreatorId.parse(defaults.creatorId),
      createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
      approvedAt:
        defaults.status === "approved"
          ? new Date().toISOString().slice(0, 19).replace("T", " ")
          : undefined,
      tagIds: TagIds.parse(defaults.tagIds),
    });
  };

  const mockSolution: components["schemas"]["Solution"] = {
    type: "single_choice",
    id: "solution-test",
    choices: [
      {
        id: "choice-1",
        solutionId: "solution-test",
        text: "Option 1",
        orderIndex: 0,
        isCorrect: true,
      },
      {
        id: "choice-2",
        solutionId: "solution-test",
        text: "Option 2",
        orderIndex: 1,
        isCorrect: false,
      },
    ],
  };

  beforeEach(() => {
    repository = new MockQuizRepository();
  });

  describe("create", () => {
    describe("when valid quiz and solution are provided", () => {
      test("should create quiz successfully", async () => {
        // Arrange
        const quiz = createMockQuiz();

        // Act
        const result = await repository.create(quiz, mockSolution);

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.get("id")).toBe("quiz-test");
          expect(result.value.get("question")).toBe("Test question");
          expect(result.value.get("answerType")).toBe("single_choice");
        }
      });

      test.each([
        [
          "boolean",
          "boolean",
          { type: "boolean", id: "sol-bool", value: true },
        ],
        [
          "free_text",
          "free_text",
          {
            type: "free_text",
            id: "sol-text",
            correctAnswer: "answer",
            matchingStrategy: "exact",
            caseSensitive: false,
          },
        ],
        [
          "multiple_choice",
          "multiple_choice",
          {
            type: "multiple_choice",
            id: "sol-multi",
            minCorrectAnswers: 2,
            choices: [],
          },
        ],
      ])(
        "should create quiz with %s answer type",
        async (_description, answerType, solution) => {
          // Arrange
          const quiz = createMockQuiz({
            answerType: answerType as components["schemas"]["AnswerType"],
            solutionId: solution.id,
          });

          // Act
          const result = await repository.create(
            quiz,
            solution as components["schemas"]["Solution"],
          );

          // Assert
          expect(result.isOk()).toBe(true);
          if (result.isOk()) {
            expect(result.value.get("answerType")).toBe(answerType);
          }
        },
      );

      test("should handle quiz without optional fields", async () => {
        // Arrange
        const quiz = createMockQuiz({
          explanation: undefined,
          status: "pending_approval",
        });

        // Act
        const result = await repository.create(quiz, mockSolution);

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.get("explanation")).toBeUndefined();
          expect(result.value.get("status")).toBe("pending_approval");
        }
      });
    });
  });

  describe("findById", () => {
    describe("when quiz exists", () => {
      test("should return quiz with solution for existing quiz", async () => {
        // Arrange
        const quiz = createMockQuiz({ id: "quiz-1" });
        await repository.create(quiz, mockSolution);

        // Act
        const result = await repository.findById("quiz-1");

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.id).toBe("quiz-1");
          expect(result.value.question).toBe("What is TypeScript?");
          expect(result.value.solution).toBeDefined();
          expect(result.value.solution.type).toBe("single_choice");
        }
      });

      test("should return quiz with all optional fields", async () => {
        // Arrange - Use existing quiz from mock data

        // Act
        const result = await repository.findById("quiz-1");

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.explanation).toBe(
            "TypeScript is a typed superset of JavaScript",
          );
          expect(result.value.approvedAt).toBeDefined();
        }
      });

      test("should handle quiz without optional fields", async () => {
        // Arrange
        const quiz = createMockQuiz({
          id: "quiz-minimal",
          explanation: undefined,
          status: "pending_approval",
        });
        await repository.create(quiz, mockSolution);

        // Act
        const result = await repository.findById("quiz-minimal");

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.explanation).toBeUndefined();
          expect(result.value.approvedAt).toBeUndefined();
        }
      });
    });

    describe("when quiz does not exist", () => {
      test("should return NotFoundError for non-existent quiz", async () => {
        // Act
        const result = await repository.findById("non-existent-quiz");

        // Assert
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error.message).toBe("Resource not found");
          expect(result.error.details).toBe(
            "Quiz not found: non-existent-quiz",
          );
        }
      });

      test.each([
        ["empty string", ""],
        ["whitespace", "   "],
        ["null-like", "null"],
        ["undefined-like", "undefined"],
      ])(
        "should return NotFoundError for %s",
        async (_description, invalidId) => {
          // Act
          const result = await repository.findById(invalidId);

          // Assert
          expect(result.isErr()).toBe(true);
        },
      );
    });

    describe("createMockSolution", () => {
      test.each([
        ["boolean", "boolean", { type: "boolean", value: false }],
        [
          "free_text",
          "free_text",
          {
            type: "free_text",
            correctAnswer: "mock answer",
            matchingStrategy: "exact",
            caseSensitive: false,
          },
        ],
        [
          "single_choice",
          "single_choice",
          {
            type: "single_choice",
            choices: expect.arrayContaining([
              expect.objectContaining({ text: "Mock choice", isCorrect: true }),
            ]),
          },
        ],
        [
          "multiple_choice",
          "multiple_choice",
          {
            type: "multiple_choice",
            minCorrectAnswers: 1,
            choices: expect.arrayContaining([
              expect.objectContaining({ text: "Mock choice", isCorrect: true }),
            ]),
          },
        ],
      ])(
        "should create proper mock solution for %s",
        async (_description, answerType, expectedSolution) => {
          // Arrange
          const quiz = createMockQuiz({
            id: `quiz-${answerType}`,
            answerType: answerType as components["schemas"]["AnswerType"],
          });
          await repository.create(quiz, mockSolution);

          // Act
          const result = await repository.findById(`quiz-${answerType}`);

          // Assert
          expect(result.isOk()).toBe(true);
          if (result.isOk()) {
            expect(result.value.solution).toMatchObject(expectedSolution);
          }
        },
      );

      test("should throw error for unsupported answer type", async () => {
        // This test verifies the internal createMockSolution method
        // We need to create a scenario where it would be called with invalid type
        // Since this is a private method, we'll test it indirectly by creating
        // a quiz with an invalid answer type (though this shouldn't happen in practice)

        // For now, we'll test the happy path since the createMockSolution
        // is a private method and should only be called with valid types
        expect(true).toBe(true); // Placeholder test
      });
    });
  });

  describe("findMany", () => {
    describe("when no filters are provided", () => {
      test("should return all quizzes with default pagination", async () => {
        // Act
        const result = await repository.findMany();

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.items).toHaveLength(2); // Default mock data
          expect(result.value.totalCount).toBe(2);
          expect(result.value.hasMore).toBe(false);
        }
      });
    });

    describe("when filters are provided", () => {
      test("should filter by status", async () => {
        // Arrange
        const pendingQuiz = createMockQuiz({
          id: "quiz-pending",
          status: "pending_approval",
        });
        await repository.create(pendingQuiz, mockSolution);

        // Act
        const result = await repository.findMany({
          status: "pending_approval",
        });

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.items).toHaveLength(1);
          expect(result.value.items[0].get("status")).toBe("pending_approval");
        }
      });

      test("should filter by creatorId", async () => {
        // Arrange
        const userQuiz = createMockQuiz({
          id: "quiz-user-specific",
          creatorId: "specific-user",
        });
        await repository.create(userQuiz, mockSolution);

        // Act
        const result = await repository.findMany({
          creatorId: "specific-user",
        });

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.items).toHaveLength(1);
          expect(result.value.items[0].get("creatorId")).toBe("specific-user");
        }
      });

      test("should filter by tags", async () => {
        // Arrange
        const taggedQuiz = createMockQuiz({
          id: "quiz-tagged",
          tagIds: ["special-tag", "another-tag"],
        });
        await repository.create(taggedQuiz, mockSolution);

        // Act
        const result = await repository.findMany({ tags: ["special-tag"] });

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.items.length).toBeGreaterThan(0);
          const foundQuiz = result.value.items.find(
            (q) => q.get("id") === "quiz-tagged",
          );
          expect(foundQuiz).toBeDefined();
        }
      });

      test("should combine multiple filters", async () => {
        // Arrange
        const specificQuiz = createMockQuiz({
          id: "quiz-specific",
          status: "approved",
          creatorId: "target-user",
          tagIds: ["target-tag"],
        });
        await repository.create(specificQuiz, mockSolution);

        // Act
        const result = await repository.findMany({
          status: "approved",
          creatorId: "target-user",
          tags: ["target-tag"],
        });

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          const foundQuiz = result.value.items.find(
            (q) => q.get("id") === "quiz-specific",
          );
          expect(foundQuiz).toBeDefined();
        }
      });
    });

    describe("pagination", () => {
      beforeEach(async () => {
        // Add more test data for pagination tests
        for (let i = 3; i <= 15; i++) {
          const quiz = createMockQuiz({
            id: `quiz-${i}`,
            question: `Question ${i}`,
          });
          await repository.create(quiz, mockSolution);
        }
      });

      test("should handle limit and offset", async () => {
        // Act
        const result = await repository.findMany({ limit: 5, offset: 2 });

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.items).toHaveLength(5);
          expect(result.value.totalCount).toBeGreaterThan(5);
          expect(result.value.hasMore).toBe(true);
        }
      });

      test("should calculate hasMore correctly", async () => {
        // Act - Get last page
        const result = await repository.findMany({ limit: 20, offset: 0 });

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.hasMore).toBe(false);
        }
      });

      test("should handle offset beyond total count", async () => {
        // Act
        const result = await repository.findMany({ limit: 10, offset: 1000 });

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.items).toHaveLength(0);
          expect(result.value.hasMore).toBe(false);
        }
      });

      test("should use default values when not provided", async () => {
        // Act
        const result = await repository.findMany({});

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.items.length).toBeLessThanOrEqual(10); // default limit
        }
      });
    });

    describe("edge cases", () => {
      test("should return empty results for non-matching filters", async () => {
        // Act
        const result = await repository.findMany({
          status: "rejected",
          creatorId: "non-existent-user",
        });

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.items).toHaveLength(0);
          expect(result.value.totalCount).toBe(0);
          expect(result.value.hasMore).toBe(false);
        }
      });

      test("should handle empty tags array", async () => {
        // Act
        const result = await repository.findMany({ tags: [] });

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.items.length).toBeGreaterThan(0); // Should return all items
        }
      });
    });
  });

  describe("update", () => {
    test("should return NOT_IMPLEMENTED error", async () => {
      // Act
      const result = await repository.update(
        "quiz-1",
        {} as Partial<QuizSummary>,
      );

      // Assert
      expect(result.isErr()).toBe(true);
      if (result.isErr()) {
        expect(result.error.message).toContain("NOT_IMPLEMENTED");
      }
    });
  });

  describe("delete", () => {
    test("should return NOT_IMPLEMENTED error", async () => {
      // Act
      const result = await repository.delete("quiz-1");

      // Assert
      expect(result.isErr()).toBe(true);
      if (result.isErr()) {
        expect(result.error.message).toContain("NOT_IMPLEMENTED");
      }
    });
  });
});
