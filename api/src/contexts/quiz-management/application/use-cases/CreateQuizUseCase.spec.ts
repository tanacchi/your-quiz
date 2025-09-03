import { beforeEach, describe, expect, test, vi } from "vitest";
import {
  createImmediateFailure,
  createImmediateSuccess,
} from "../../../../../tests/helpers/mock-helpers";
import { CreateFailedError, FindFailedError } from "../../../../shared/errors";
import type { components } from "../../../../shared/types";
import type { QuizSummary } from "../../domain/entities/quiz-summary/QuizSummary";
import type { IQuizRepository } from "../../domain/repositories/IQuizRepository";
import { QuizCreationFailedError, UseCaseInternalError } from "../errors";
import { type CreateQuizCommand, CreateQuizUseCase } from "./CreateQuizUseCase";

describe.todo("CreateQuizUseCase", () => {
  let useCase: CreateQuizUseCase;
  let mockRepository: IQuizRepository;

  const validCommand: CreateQuizCommand = {
    question: "What is TypeScript?",
    answerType: "single_choice",
    solution: {
      type: "single_choice",
      id: "solution-1",
      choices: [
        {
          id: "choice-1",
          solutionId: "solution-1",
          text: "A programming language",
          orderIndex: 0,
          isCorrect: true,
        },
        {
          id: "choice-2",
          solutionId: "solution-1",
          text: "A framework",
          orderIndex: 1,
          isCorrect: false,
        },
      ],
    },
    explanation: "TypeScript is a programming language",
    tags: ["programming", "typescript"],
    creatorId: "user-123",
  };

  // const _mockQuiz: components["schemas"]["Quiz"] = {
  //   id: "quiz-1",
  //   question: "What is TypeScript?",
  //   answerType: "single_choice",
  //   solutionId: "solution-1",
  //   status: "pending_approval",
  //   creatorId: "user-123",
  //   createdAt: "2024-01-01T00:00:00.000Z",
  //   explanation: "TypeScript is a programming language",
  // };

  beforeEach(() => {
    mockRepository = {
      create: vi.fn(),
      findById: vi.fn(),
      findMany: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };
    useCase = new CreateQuizUseCase(mockRepository);
  });

  describe("execute", () => {
    describe("when valid command is provided", () => {
      test("should create quiz successfully", async () => {
        // Arrange
        const mockQuizSummary = {
          get: vi.fn((key: string) => {
            const data: Record<string, unknown> = {
              id: "quiz-1",
              question: "What is TypeScript?",
              answerType: "single_choice",
              solutionId: "solution-1",
              status: "pending_approval",
              creatorId: "user-123",
              createdAt: "2024-01-01 00:00:00",
              explanation: "TypeScript is a programming language",
              approvedAt: undefined,
            };
            return data[key];
          }),
        } as unknown as QuizSummary;

        vi.mocked(mockRepository.create).mockReturnValue(
          createImmediateSuccess(mockQuizSummary),
        );

        // Act
        const result = await useCase.execute(validCommand);

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value).toEqual({
            id: "quiz-1",
            question: "What is TypeScript?",
            answerType: "single_choice",
            solutionId: "solution-1",
            status: "pending_approval",
            creatorId: "user-123",
            createdAt: "2024-01-01 00:00:00",
            explanation: "TypeScript is a programming language",
          });
        }
        expect(mockRepository.create).toHaveBeenCalledOnce();
      });

      test("should handle optional fields correctly", async () => {
        // Arrange
        const commandWithoutOptionals: CreateQuizCommand = {
          question: "What is JavaScript?",
          answerType: "boolean",
          solution: {
            type: "boolean",
            id: "solution-2",
            value: true,
          },
        };

        const mockQuizSummary = {
          get: vi.fn((key: string) => {
            const data: Record<string, unknown> = {
              id: "quiz-2",
              question: "What is JavaScript?",
              answerType: "boolean",
              solutionId: "solution-2",
              status: "pending_approval",
              creatorId: "mock-user-id",
              createdAt: "2024-01-01 00:00:00",
              explanation: undefined,
              approvedAt: undefined,
            };
            return data[key];
          }),
        } as unknown as QuizSummary;

        vi.mocked(mockRepository.create).mockReturnValue(
          createImmediateSuccess(mockQuizSummary),
        );

        // Act
        const result = await useCase.execute(commandWithoutOptionals);

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value).toEqual({
            id: "quiz-2",
            question: "What is JavaScript?",
            answerType: "boolean",
            solutionId: "solution-2",
            status: "pending_approval",
            creatorId: "mock-user-id",
            createdAt: "2024-01-01 00:00:00",
          });
          expect(result.value.explanation).toBeUndefined();
        }
      });
    });

    describe("when invalid command is provided", () => {
      test.each([
        ["empty question", { ...validCommand, question: "" }],
        [
          "null question",
          { ...validCommand, question: null as unknown as string },
        ],
        [
          "undefined question",
          { ...validCommand, question: undefined as unknown as string },
        ],
        [
          "empty answerType",
          {
            ...validCommand,
            answerType: "" as components["schemas"]["AnswerType"],
          },
        ],
        [
          "invalid answerType",
          {
            ...validCommand,
            answerType: "invalid" as components["schemas"]["AnswerType"],
          },
        ],
      ])(
        "should return QuizCreationFailedError for %s",
        async (_description, invalidCommand) => {
          // Act
          const result = await useCase.execute(invalidCommand);

          // Assert
          expect(result.isErr()).toBe(true);
          if (result.isErr()) {
            expect(result.error).toBeInstanceOf(QuizCreationFailedError);
          }
        },
      );
    });

    describe("when repository fails", () => {
      test("should return QuizCreationFailedError when repository returns CreateFailedError", async () => {
        // Arrange
        const createError = new CreateFailedError(
          "Database error",
          "Connection failed",
        );
        vi.mocked(mockRepository.create).mockReturnValue(
          createImmediateFailure(createError),
        );

        // Act
        const result = await useCase.execute(validCommand);

        // Assert
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error).toBeInstanceOf(QuizCreationFailedError);
          expect(result.error.details).toContain("Connection failed");
        }
      });

      test("should return UseCaseInternalError for other repository errors", async () => {
        // Arrange
        const genericError = new FindFailedError("Quiz", "Unknown error");
        vi.mocked(mockRepository.create).mockReturnValue(
          createImmediateFailure(genericError),
        );

        // Act
        const result = await useCase.execute(validCommand);

        // Assert
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error).toBeInstanceOf(UseCaseInternalError);
          if (result.error instanceof UseCaseInternalError) {
            expect(result.error.operation).toBe("Failed to create quiz");
          }
        }
      });
    });

    describe("edge cases", () => {
      test("should generate unique ID for each quiz", async () => {
        // Arrange
        const originalDateNow = Date.now;
        let callCount = 0;
        Date.now = vi.fn(() => {
          callCount++;
          return 1000 + callCount;
        });

        const mockQuizSummary1 = {
          get: vi.fn((key: string) => {
            const data: Record<string, unknown> = {
              id: "1001",
              question: "First question",
              answerType: "boolean",
              solutionId: "solution-1",
              status: "pending_approval",
              creatorId: "mock-user-id",
              createdAt: "2024-01-01 00:00:00",
            };
            return data[key];
          }),
        } as unknown as QuizSummary;

        const mockQuizSummary2 = {
          get: vi.fn((key: string) => {
            const data: Record<string, unknown> = {
              id: "1002",
              question: "Second question",
              answerType: "boolean",
              solutionId: "solution-2",
              status: "pending_approval",
              creatorId: "mock-user-id",
              createdAt: "2024-01-01 00:00:00",
            };
            return data[key];
          }),
        } as unknown as QuizSummary;

        vi.mocked(mockRepository.create)
          .mockReturnValueOnce(createImmediateSuccess(mockQuizSummary1))
          .mockReturnValueOnce(createImmediateSuccess(mockQuizSummary2));

        // Act
        const result1 = await useCase.execute({
          question: "First question",
          answerType: "boolean",
          solution: { type: "boolean", id: "solution-1", value: true },
        });
        const result2 = await useCase.execute({
          question: "Second question",
          answerType: "boolean",
          solution: { type: "boolean", id: "solution-2", value: false },
        });

        // Assert
        expect(result1.isOk() && result2.isOk()).toBe(true);
        if (result1.isOk() && result2.isOk()) {
          expect(result1.value.id).not.toBe(result2.value.id);
        }

        // Cleanup
        Date.now = originalDateNow;
      });

      test("should use mock-user-id when creatorId is not provided", async () => {
        // Arrange
        const commandWithoutCreator = { ...validCommand };
        delete (commandWithoutCreator as Partial<CreateQuizCommand>).creatorId;

        const mockQuizSummary = {
          get: vi.fn((key: string) => {
            const data: Record<string, unknown> = {
              id: "quiz-1",
              question: "What is TypeScript?",
              answerType: "single_choice",
              solutionId: "solution-1",
              status: "pending_approval",
              creatorId: "mock-user-id",
              createdAt: "2024-01-01 00:00:00",
            };
            return data[key];
          }),
        } as unknown as QuizSummary;

        vi.mocked(mockRepository.create).mockReturnValue(
          createImmediateSuccess(mockQuizSummary),
        );

        // Act
        const result = await useCase.execute(commandWithoutCreator);

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.creatorId).toBe("mock-user-id");
        }
      });
    });
  });
});
