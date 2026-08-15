import { beforeEach, describe, expect, test, vi } from "vitest";
import {
  createImmediateFailure,
  createImmediateSuccess,
} from "../../../../../tests/helpers/mock-helpers";
import {
  CreateFailedError,
  FindFailedError,
  UpdateFailedError,
} from "../../../../shared/errors";
import type { components } from "../../../../shared/types";
import {
  QuizCreatorOnlyError,
  QuizNotFoundError,
  QuizStatusError,
} from "../../domain/errors";
import type { IQuizRepository } from "../../domain/repositories/IQuizRepository";
import {
  QuizRetrievalFailedError,
  QuizUpdateFailedError,
  UseCaseInternalError,
} from "../errors";
import { type UpdateQuizCommand, UpdateQuizUseCase } from "./UpdateQuizUseCase";

describe("UpdateQuizUseCase", () => {
  let useCase: UpdateQuizUseCase;
  let mockRepository: IQuizRepository;

  const buildQuizResponse = (
    overrides: Partial<components["schemas"]["QuizResponse"]> = {},
  ): components["schemas"]["QuizResponse"] => ({
    id: "quiz-123",
    question: "What is TypeScript?",
    answerType: "boolean",
    solutionId: "solution-123",
    status: "pending_approval",
    creatorId: "creator-123",
    createdAt: "2024-01-01 00:00:00",
    solution: { type: "boolean", id: "solution-123", value: true },
    ...overrides,
  });

  const validCommand: UpdateQuizCommand = {
    quizId: "quiz-123",
    requesterId: "creator-123",
    question: "Updated question",
  };

  beforeEach(() => {
    mockRepository = {
      create: vi.fn(),
      findById: vi.fn(),
      findMany: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };
    useCase = new UpdateQuizUseCase(mockRepository);
  });

  describe("execute", () => {
    describe("when the request is valid", () => {
      test("should update question and return the refreshed quiz", async () => {
        // Arrange
        vi.mocked(mockRepository.findById).mockReturnValueOnce(
          createImmediateSuccess(buildQuizResponse()),
        );
        vi.mocked(mockRepository.update).mockReturnValue(
          createImmediateSuccess({} as never),
        );
        vi.mocked(mockRepository.findById).mockReturnValueOnce(
          createImmediateSuccess(
            buildQuizResponse({ question: "Updated question" }),
          ),
        );

        // Act
        const result = await useCase.execute(validCommand);

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.question).toBe("Updated question");
        }
        expect(mockRepository.update).toHaveBeenCalledWith("quiz-123", {
          question: "Updated question",
        });
      });

      test("should only include explanation in the patch when only explanation is provided", async () => {
        // Arrange
        vi.mocked(mockRepository.findById).mockReturnValue(
          createImmediateSuccess(buildQuizResponse()),
        );
        vi.mocked(mockRepository.update).mockReturnValue(
          createImmediateSuccess({} as never),
        );

        // Act
        await useCase.execute({
          quizId: "quiz-123",
          requesterId: "creator-123",
          explanation: "Updated explanation",
        });

        // Assert
        expect(mockRepository.update).toHaveBeenCalledWith("quiz-123", {
          explanation: "Updated explanation",
        });
      });

      test.each(["draft", "pending_approval", "rejected"] as const)(
        "should allow update when status is %s",
        async (status) => {
          // Arrange
          vi.mocked(mockRepository.findById).mockReturnValue(
            createImmediateSuccess(buildQuizResponse({ status })),
          );
          vi.mocked(mockRepository.update).mockReturnValue(
            createImmediateSuccess({} as never),
          );

          // Act
          const result = await useCase.execute(validCommand);

          // Assert
          expect(result.isOk()).toBe(true);
        },
      );
    });

    describe("when the requester is not the creator", () => {
      test("should return QuizCreatorOnlyError without calling update", async () => {
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
        expect(mockRepository.update).not.toHaveBeenCalled();
      });
    });

    describe("when the quiz status does not allow update", () => {
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
          expect(mockRepository.update).not.toHaveBeenCalled();
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

    describe("when the update itself fails", () => {
      test("should return QuizUpdateFailedError for UpdateFailedError", async () => {
        // Arrange
        vi.mocked(mockRepository.findById).mockReturnValue(
          createImmediateSuccess(buildQuizResponse()),
        );
        vi.mocked(mockRepository.update).mockReturnValue(
          createImmediateFailure(
            new UpdateFailedError("Quiz", "Something went wrong"),
          ),
        );

        // Act
        const result = await useCase.execute(validCommand);

        // Assert
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error).toBeInstanceOf(QuizUpdateFailedError);
        }
      });

      test("should return UseCaseInternalError for other repository errors", async () => {
        // Arrange
        vi.mocked(mockRepository.findById).mockReturnValue(
          createImmediateSuccess(buildQuizResponse()),
        );
        vi.mocked(mockRepository.update).mockReturnValue(
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
