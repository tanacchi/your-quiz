import { beforeEach, describe, expect, test, vi } from "vitest";
import {
  createImmediateFailure,
  createImmediateSuccess,
} from "../../../../../tests/helpers/mock-helpers";
import {
  CreateFailedError,
  DeleteFailedError,
  FindFailedError,
} from "../../../../shared/errors";
import type { components } from "../../../../shared/types";
import {
  QuizCreatorOnlyError,
  QuizNotFoundError,
  QuizStatusError,
} from "../../domain/errors";
import type { IQuizRepository } from "../../domain/repositories/IQuizRepository";
import {
  QuizDeletionFailedError,
  QuizRetrievalFailedError,
  UseCaseInternalError,
} from "../errors";
import { type DeleteQuizCommand, DeleteQuizUseCase } from "./DeleteQuizUseCase";

describe("DeleteQuizUseCase", () => {
  let useCase: DeleteQuizUseCase;
  let mockRepository: IQuizRepository;

  const buildQuizResponse = (
    overrides: Partial<components["schemas"]["QuizResponse"]> = {},
  ): components["schemas"]["QuizResponse"] => ({
    id: "quiz-123",
    question: "What is TypeScript?",
    answerType: "boolean",
    solutionId: "solution-123",
    status: "draft",
    creatorId: "creator-123",
    createdAt: "2024-01-01 00:00:00",
    solution: { type: "boolean", id: "solution-123", value: true },
    ...overrides,
  });

  const validCommand: DeleteQuizCommand = {
    quizId: "quiz-123",
    requesterId: "creator-123",
  };

  beforeEach(() => {
    mockRepository = {
      create: vi.fn(),
      findById: vi.fn(),
      findMany: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };
    useCase = new DeleteQuizUseCase(mockRepository);
  });

  describe("execute", () => {
    describe("when the request is valid", () => {
      test.each(["draft", "pending_approval", "rejected"] as const)(
        "should delete the quiz when status is %s",
        async (status) => {
          // Arrange
          vi.mocked(mockRepository.findById).mockReturnValue(
            createImmediateSuccess(buildQuizResponse({ status })),
          );
          vi.mocked(mockRepository.delete).mockReturnValue(
            createImmediateSuccess(undefined),
          );

          // Act
          const result = await useCase.execute(validCommand);

          // Assert
          expect(result.isOk()).toBe(true);
          expect(mockRepository.delete).toHaveBeenCalledWith("quiz-123");
        },
      );
    });

    describe("when the requester is not the creator", () => {
      test("should return QuizCreatorOnlyError without calling delete", async () => {
        // Arrange
        vi.mocked(mockRepository.findById).mockReturnValue(
          createImmediateSuccess(
            buildQuizResponse({ creatorId: "someone-else" }),
          ),
        );

        // Act
        const result = await useCase.execute(validCommand);

        // Assert
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error).toBeInstanceOf(QuizCreatorOnlyError);
        }
        expect(mockRepository.delete).not.toHaveBeenCalled();
      });
    });

    describe("when the quiz status does not allow deletion", () => {
      test.each(["approved", "published"] as const)(
        "should return QuizStatusError for %s status",
        async (status) => {
          // Arrange
          vi.mocked(mockRepository.findById).mockReturnValue(
            createImmediateSuccess(buildQuizResponse({ status })),
          );

          // Act
          const result = await useCase.execute(validCommand);

          // Assert
          expect(result.isErr()).toBe(true);
          if (result.isErr()) {
            expect(result.error).toBeInstanceOf(QuizStatusError);
          }
          expect(mockRepository.delete).not.toHaveBeenCalled();
        },
      );
    });

    describe("when the quiz does not exist", () => {
      test("should return QuizNotFoundError", async () => {
        // Arrange
        vi.mocked(mockRepository.findById).mockReturnValue(
          createImmediateFailure(
            new FindFailedError("Quiz", "Quiz not found: quiz-123"),
          ),
        );

        // Act
        const result = await useCase.execute(validCommand);

        // Assert
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error).toBeInstanceOf(QuizNotFoundError);
        }
      });
    });

    describe("when the repository lookup fails", () => {
      test("should return QuizRetrievalFailedError", async () => {
        // Arrange
        vi.mocked(mockRepository.findById).mockReturnValue(
          createImmediateFailure(
            new FindFailedError("Quiz", "Connection timeout"),
          ),
        );

        // Act
        const result = await useCase.execute(validCommand);

        // Assert
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error).toBeInstanceOf(QuizRetrievalFailedError);
        }
      });
    });

    describe("when the delete itself fails", () => {
      test("should return QuizDeletionFailedError for DeleteFailedError", async () => {
        // Arrange
        vi.mocked(mockRepository.findById).mockReturnValue(
          createImmediateSuccess(buildQuizResponse()),
        );
        vi.mocked(mockRepository.delete).mockReturnValue(
          createImmediateFailure(
            new DeleteFailedError("Quiz", "Something went wrong"),
          ),
        );

        // Act
        const result = await useCase.execute(validCommand);

        // Assert
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error).toBeInstanceOf(QuizDeletionFailedError);
        }
      });

      test("should return UseCaseInternalError for other repository errors", async () => {
        // Arrange
        vi.mocked(mockRepository.findById).mockReturnValue(
          createImmediateSuccess(buildQuizResponse()),
        );
        vi.mocked(mockRepository.delete).mockReturnValue(
          createImmediateFailure(
            new CreateFailedError("Quiz", "Unknown database error"),
          ),
        );

        // Act
        const result = await useCase.execute(validCommand);

        // Assert
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error).toBeInstanceOf(UseCaseInternalError);
        }
      });
    });
  });
});
