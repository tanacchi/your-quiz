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
  QuizAdminOnlyError,
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
import {
  type ChangeQuizStatusCommand,
  ChangeQuizStatusUseCase,
} from "./ChangeQuizStatusUseCase";

describe("ChangeQuizStatusUseCase", () => {
  let useCase: ChangeQuizStatusUseCase;
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

  beforeEach(() => {
    mockRepository = {
      create: vi.fn(),
      findById: vi.fn(),
      findMany: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };
    useCase = new ChangeQuizStatusUseCase(mockRepository);
  });

  const mockSuccessfulTransition = (
    beforeStatus: components["schemas"]["QuizStatus"],
    afterOverrides: Partial<components["schemas"]["QuizResponse"]> = {},
  ) => {
    vi.mocked(mockRepository.findById)
      .mockReturnValueOnce(
        createImmediateSuccess(buildQuizResponse({ status: beforeStatus })),
      )
      .mockReturnValueOnce(
        createImmediateSuccess(buildQuizResponse(afterOverrides)),
      );
    vi.mocked(mockRepository.update).mockReturnValue(
      createImmediateSuccess({} as never),
    );
  };

  describe("submit", () => {
    test.each(["draft", "rejected"] as const)(
      "%sから作成者がsubmitするとpending_approvalになる",
      async (beforeStatus) => {
        // Arrange
        mockSuccessfulTransition(beforeStatus, {
          status: "pending_approval",
        });
        const command: ChangeQuizStatusCommand = {
          quizId: "quiz-123",
          action: "submit",
          requesterId: "creator-123",
          isModerator: false,
        };

        // Act
        const result = await useCase.execute(command);

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.status).toBe("pending_approval");
        }
        expect(mockRepository.update).toHaveBeenCalledWith("quiz-123", {
          status: "pending_approval",
        });
      },
    );

    test("作成者以外がsubmitするとQuizCreatorOnlyError", async () => {
      // Arrange
      vi.mocked(mockRepository.findById).mockReturnValue(
        createImmediateSuccess(
          buildQuizResponse({ status: "draft", creatorId: "someone-else" }),
        ),
      );
      const command: ChangeQuizStatusCommand = {
        quizId: "quiz-123",
        action: "submit",
        requesterId: "creator-123",
        isModerator: false,
      };

      // Act
      const result = await useCase.execute(command);

      // Assert
      expect(result.isErr()).toBe(true);
      if (result.isErr()) {
        expect(result.error).toBeInstanceOf(QuizCreatorOnlyError);
      }
      expect(mockRepository.update).not.toHaveBeenCalled();
    });

    test.each(["pending_approval", "approved", "published"] as const)(
      "%sからsubmitするとQuizStatusError",
      async (status) => {
        // Arrange
        vi.mocked(mockRepository.findById).mockReturnValue(
          createImmediateSuccess(buildQuizResponse({ status })),
        );
        const command: ChangeQuizStatusCommand = {
          quizId: "quiz-123",
          action: "submit",
          requesterId: "creator-123",
          isModerator: false,
        };

        // Act
        const result = await useCase.execute(command);

        // Assert
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error).toBeInstanceOf(QuizStatusError);
        }
      },
    );
  });

  describe("approve", () => {
    test("モデレーターがpending_approvalをapproveするとapprovedになりapprovedAtが記録される", async () => {
      // Arrange
      mockSuccessfulTransition("pending_approval", {
        status: "approved",
        approvedAt: "2024-01-02 00:00:00",
      });
      const command: ChangeQuizStatusCommand = {
        quizId: "quiz-123",
        action: "approve",
        requesterId: "moderator-1",
        isModerator: true,
      };

      // Act
      const result = await useCase.execute(command);

      // Assert
      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value.status).toBe("approved");
      }
      expect(mockRepository.update).toHaveBeenCalledWith(
        "quiz-123",
        expect.objectContaining({ status: "approved" }),
      );
      const [, patch] = vi.mocked(mockRepository.update).mock.calls[0] ?? [];
      expect(patch).toHaveProperty("approvedAt");
    });

    test("モデレーターでない場合はQuizAdminOnlyError", async () => {
      // Arrange
      vi.mocked(mockRepository.findById).mockReturnValue(
        createImmediateSuccess(
          buildQuizResponse({ status: "pending_approval" }),
        ),
      );
      const command: ChangeQuizStatusCommand = {
        quizId: "quiz-123",
        action: "approve",
        requesterId: "someone",
        isModerator: false,
      };

      // Act
      const result = await useCase.execute(command);

      // Assert
      expect(result.isErr()).toBe(true);
      if (result.isErr()) {
        expect(result.error).toBeInstanceOf(QuizAdminOnlyError);
      }
      expect(mockRepository.update).not.toHaveBeenCalled();
    });

    test.each(["draft", "approved", "rejected", "published"] as const)(
      "%sからapproveするとQuizStatusError",
      async (status) => {
        // Arrange
        vi.mocked(mockRepository.findById).mockReturnValue(
          createImmediateSuccess(buildQuizResponse({ status })),
        );
        const command: ChangeQuizStatusCommand = {
          quizId: "quiz-123",
          action: "approve",
          requesterId: "moderator-1",
          isModerator: true,
        };

        // Act
        const result = await useCase.execute(command);

        // Assert
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error).toBeInstanceOf(QuizStatusError);
        }
      },
    );
  });

  describe("reject", () => {
    test("モデレーターがpending_approvalをrejectするとrejectedになる", async () => {
      // Arrange
      mockSuccessfulTransition("pending_approval", { status: "rejected" });
      const command: ChangeQuizStatusCommand = {
        quizId: "quiz-123",
        action: "reject",
        requesterId: "moderator-1",
        isModerator: true,
      };

      // Act
      const result = await useCase.execute(command);

      // Assert
      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value.status).toBe("rejected");
      }
      // rejectはapprovedAtを記録しない
      expect(mockRepository.update).toHaveBeenCalledWith("quiz-123", {
        status: "rejected",
      });
    });
  });

  describe("publish", () => {
    test("モデレーターがapprovedをpublishするとpublishedになる", async () => {
      // Arrange
      mockSuccessfulTransition("approved", { status: "published" });
      const command: ChangeQuizStatusCommand = {
        quizId: "quiz-123",
        action: "publish",
        requesterId: "moderator-1",
        isModerator: true,
      };

      // Act
      const result = await useCase.execute(command);

      // Assert
      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value.status).toBe("published");
      }
      expect(mockRepository.update).toHaveBeenCalledWith("quiz-123", {
        status: "published",
      });
    });

    test.each(["draft", "pending_approval", "rejected"] as const)(
      "%sからpublishするとQuizStatusError",
      async (status) => {
        // Arrange
        vi.mocked(mockRepository.findById).mockReturnValue(
          createImmediateSuccess(buildQuizResponse({ status })),
        );
        const command: ChangeQuizStatusCommand = {
          quizId: "quiz-123",
          action: "publish",
          requesterId: "moderator-1",
          isModerator: true,
        };

        // Act
        const result = await useCase.execute(command);

        // Assert
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error).toBeInstanceOf(QuizStatusError);
        }
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
      const command: ChangeQuizStatusCommand = {
        quizId: "quiz-123",
        action: "submit",
        requesterId: "creator-123",
        isModerator: false,
      };

      // Act
      const result = await useCase.execute(command);

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
      const command: ChangeQuizStatusCommand = {
        quizId: "quiz-123",
        action: "submit",
        requesterId: "creator-123",
        isModerator: false,
      };

      // Act
      const result = await useCase.execute(command);

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
        createImmediateSuccess(buildQuizResponse({ status: "draft" })),
      );
      vi.mocked(mockRepository.update).mockReturnValue(
        createImmediateFailure(
          new UpdateFailedError("Quiz", "Something went wrong"),
        ),
      );
      const command: ChangeQuizStatusCommand = {
        quizId: "quiz-123",
        action: "submit",
        requesterId: "creator-123",
        isModerator: false,
      };

      // Act
      const result = await useCase.execute(command);

      // Assert
      expect(result.isErr()).toBe(true);
      if (result.isErr()) {
        expect(result.error).toBeInstanceOf(QuizUpdateFailedError);
      }
    });

    test("should return UseCaseInternalError for other repository errors", async () => {
      // Arrange
      vi.mocked(mockRepository.findById).mockReturnValue(
        createImmediateSuccess(buildQuizResponse({ status: "draft" })),
      );
      vi.mocked(mockRepository.update).mockReturnValue(
        createImmediateFailure(
          new CreateFailedError("Quiz", "Unknown database error"),
        ),
      );
      const command: ChangeQuizStatusCommand = {
        quizId: "quiz-123",
        action: "submit",
        requesterId: "creator-123",
        isModerator: false,
      };

      // Act
      const result = await useCase.execute(command);

      // Assert
      expect(result.isErr()).toBe(true);
      if (result.isErr()) {
        expect(result.error).toBeInstanceOf(UseCaseInternalError);
      }
    });
  });
});
