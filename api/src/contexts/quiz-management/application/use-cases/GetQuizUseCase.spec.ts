import { beforeEach, describe, expect, test, vi } from "vitest";
import {
  createImmediateFailure,
  createImmediateSuccess,
} from "../../../../../tests/helpers/mock-helpers";
import { CreateFailedError, FindFailedError } from "../../../../shared/errors";
import type { components } from "../../../../shared/types";
import { QuizNotFoundError } from "../../domain/errors";
import type { IQuizRepository } from "../../domain/repositories/IQuizRepository";
import { QuizRetrievalFailedError, UseCaseInternalError } from "../errors";
import { GetQuizUseCase } from "./GetQuizUseCase";

describe.todo("GetQuizUseCase", () => {
  let useCase: GetQuizUseCase;
  let mockRepository: IQuizRepository;

  const mockQuizWithSolution: components["schemas"]["QuizWithSolution"] = {
    id: "quiz-123",
    question: "What is TypeScript?",
    answerType: "single_choice",
    solutionId: "solution-123",
    status: "approved",
    creatorId: "user-123",
    createdAt: "2024-01-01T00:00:00.000Z",
    approvedAt: "2024-01-02T00:00:00.000Z",
    explanation: "TypeScript is a programming language",
    solution: {
      type: "single_choice",
      id: "solution-123",
      choices: [
        {
          id: "choice-1",
          solutionId: "solution-123",
          text: "A programming language",
          orderIndex: 0,
          isCorrect: true,
        },
        {
          id: "choice-2",
          solutionId: "solution-123",
          text: "A framework",
          orderIndex: 1,
          isCorrect: false,
        },
      ],
    },
  };

  beforeEach(() => {
    mockRepository = {
      create: vi.fn(),
      findById: vi.fn(),
      findMany: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };
    useCase = new GetQuizUseCase(mockRepository);
  });

  describe("execute", () => {
    describe("when valid quiz ID is provided", () => {
      test("should return quiz with solution successfully", async () => {
        // Arrange
        vi.mocked(mockRepository.findById).mockReturnValue(
          createImmediateSuccess(mockQuizWithSolution),
        );

        // Act
        const result = await useCase.execute("quiz-123");

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value).toEqual(mockQuizWithSolution);
        }
        expect(mockRepository.findById).toHaveBeenCalledWith("quiz-123");
        expect(mockRepository.findById).toHaveBeenCalledOnce();
      });

      test("should handle quiz without optional fields", async () => {
        // Arrange
        const minimalQuiz: components["schemas"]["QuizWithSolution"] = {
          id: "quiz-456",
          question: "Is JavaScript a programming language?",
          answerType: "boolean",
          solutionId: "solution-456",
          status: "pending_approval",
          creatorId: "user-456",
          createdAt: "2024-01-01 00:00:00",
          solution: {
            type: "boolean",
            id: "solution-456",
            value: true,
          },
        };

        vi.mocked(mockRepository.findById).mockReturnValue(
          createImmediateSuccess(minimalQuiz),
        );

        // Act
        const result = await useCase.execute("quiz-456");

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value).toEqual(minimalQuiz);
          expect(result.value.explanation).toBeUndefined();
          expect(result.value.approvedAt).toBeUndefined();
        }
      });
    });

    describe("when quiz is not found", () => {
      test("should return QuizNotFoundError when repository returns null", async () => {
        // Arrange
        const notFoundError = new FindFailedError(
          "Quiz",
          "Quiz not found: non-existent-quiz",
        );
        vi.mocked(mockRepository.findById).mockReturnValue(
          createImmediateFailure(notFoundError),
        );

        // Act
        const result = await useCase.execute("non-existent-quiz");

        // Assert
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error).toBeInstanceOf(QuizNotFoundError);
          if (result.error instanceof QuizNotFoundError) {
            expect(result.error.quizId).toBe("non-existent-quiz");
          }
        }
        expect(mockRepository.findById).toHaveBeenCalledWith(
          "non-existent-quiz",
        );
      });

      test("should return QuizNotFoundError when repository returns undefined", async () => {
        // Arrange
        const notFoundError = new FindFailedError(
          "Quiz",
          "Quiz not found: undefined-quiz",
        );
        vi.mocked(mockRepository.findById).mockReturnValue(
          createImmediateFailure(notFoundError),
        );

        // Act
        const result = await useCase.execute("undefined-quiz");

        // Assert
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error).toBeInstanceOf(QuizNotFoundError);
          if (result.error instanceof QuizNotFoundError) {
            expect(result.error.quizId).toBe("undefined-quiz");
          }
        }
      });
    });

    describe("when repository fails", () => {
      test("should return QuizRetrievalFailedError when repository returns FindFailedError", async () => {
        // Arrange
        const findError = new FindFailedError(
          "Database connection error",
          "Connection timeout",
        );
        vi.mocked(mockRepository.findById).mockReturnValue(
          createImmediateFailure(findError),
        );

        // Act
        const result = await useCase.execute("quiz-123");

        // Assert
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error).toBeInstanceOf(QuizRetrievalFailedError);
          if (result.error instanceof QuizRetrievalFailedError) {
            expect(result.error.quizId).toBe("quiz-123");
            expect(result.error.details).toContain("Connection timeout");
          }
        }
      });

      test("should return UseCaseInternalError for other repository errors", async () => {
        // Arrange
        const genericError = new CreateFailedError(
          "Quiz",
          "Unknown database error",
        );
        vi.mocked(mockRepository.findById).mockReturnValue(
          createImmediateFailure(genericError),
        );

        // Act
        const result = await useCase.execute("quiz-123");

        // Assert
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error).toBeInstanceOf(UseCaseInternalError);
          if (result.error instanceof UseCaseInternalError) {
            expect(result.error.message).toBe("Internal server error");
            expect(result.error.operation).toBe("Failed to get quiz");
            expect(result.error.details).toBe("Internal server error");
          }
        }
      });
    });

    describe("edge cases", () => {
      test.each([
        ["empty string", ""],
        ["whitespace", "   "],
        ["very long ID", "a".repeat(1000)],
        ["special characters", "quiz-123!@#$%^&*()"],
        ["unicode characters", "quiz-クイズ-123"],
        ["numeric string", "123456789"],
      ])("should handle %s ID: %s", async (_description, quizId) => {
        // Arrange
        const notFoundError = new FindFailedError(
          "Quiz",
          `Quiz not found: ${quizId}`,
        );
        vi.mocked(mockRepository.findById).mockReturnValue(
          createImmediateFailure(notFoundError),
        );

        // Act
        const result = await useCase.execute(quizId);

        // Assert
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error).toBeInstanceOf(QuizNotFoundError);
        }
        expect(mockRepository.findById).toHaveBeenCalledWith(quizId);
      });

      test("should handle different answer types correctly", async () => {
        // Arrange
        const answerTypes = [
          {
            type: "boolean" as const,
            quiz: {
              ...mockQuizWithSolution,
              id: "quiz-boolean",
              answerType: "boolean" as const,
              solution: {
                type: "boolean" as const,
                id: "sol-bool",
                value: true,
              },
            },
          },
          {
            type: "free_text" as const,
            quiz: {
              ...mockQuizWithSolution,
              id: "quiz-free-text",
              answerType: "free_text" as const,
              solution: {
                type: "free_text" as const,
                id: "sol-text",
                correctAnswer: "TypeScript",
                matchingStrategy: "exact" as const,
                caseSensitive: false,
              },
            },
          },
          {
            type: "multiple_choice" as const,
            quiz: {
              ...mockQuizWithSolution,
              id: "quiz-multiple",
              answerType: "multiple_choice" as const,
              solution: {
                type: "multiple_choice" as const,
                id: "sol-multiple",
                minCorrectAnswers: 2,
                choices: [
                  {
                    id: "c1",
                    solutionId: "sol-multiple",
                    text: "Option 1",
                    orderIndex: 0,
                    isCorrect: true,
                  },
                  {
                    id: "c2",
                    solutionId: "sol-multiple",
                    text: "Option 2",
                    orderIndex: 1,
                    isCorrect: true,
                  },
                  {
                    id: "c3",
                    solutionId: "sol-multiple",
                    text: "Option 3",
                    orderIndex: 2,
                    isCorrect: false,
                  },
                ],
              },
            },
          },
        ];

        for (const { type, quiz } of answerTypes) {
          // Arrange
          vi.mocked(mockRepository.findById).mockReturnValue(
            createImmediateSuccess(quiz),
          );

          // Act
          const result = await useCase.execute(quiz.id);

          // Assert
          expect(result.isOk()).toBe(true);
          if (result.isOk()) {
            expect(result.value.answerType).toBe(type);
            expect(result.value.solution.type).toBe(type);
          }
        }
      });
    });
  });
});
