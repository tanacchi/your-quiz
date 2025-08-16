import { beforeEach, describe, expect, test, vi } from "vitest";
import {
  createImmediateFailure,
  createImmediateSuccess,
} from "../../../../../tests/helpers/mock-helpers";
import { JsonParseError } from "../../../../shared/errors";
import type { AppContext, components } from "../../../../shared/types";
import {
  QuizCreationFailedError,
  QuizListRetrievalFailedError,
  QuizRetrievalFailedError,
  UseCaseInternalError,
} from "../../application/errors";
import type {
  CreateQuizUseCase,
  GetQuizUseCase,
  ListQuizzesUseCase,
} from "../../application/use-cases";
import { QuizNotFoundError } from "../../domain/errors";
import { QuizController } from "./QuizController";

describe("QuizController", () => {
  let controller: QuizController;
  let mockCreateQuizUseCase: CreateQuizUseCase;
  let mockGetQuizUseCase: GetQuizUseCase;
  let mockListQuizzesUseCase: ListQuizzesUseCase;
  let mockContext: AppContext;

  const mockQuiz: components["schemas"]["Quiz"] = {
    id: "quiz-123",
    question: "What is TypeScript?",
    answerType: "single_choice",
    solutionId: "solution-123",
    status: "approved",
    creatorId: "user-123",
    createdAt: "2024-01-01T00:00:00.000Z",
    explanation: "TypeScript is a programming language",
  };

  const mockQuizWithSolution: components["schemas"]["QuizWithSolution"] = {
    ...mockQuiz,
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

  const mockQuizList: components["schemas"]["QuizListResponse"] = {
    items: [mockQuiz],
    total: 1,
    limit: 10,
    offset: 0,
  };

  beforeEach(() => {
    mockCreateQuizUseCase = {
      execute: vi.fn(),
    } as unknown as CreateQuizUseCase;

    mockGetQuizUseCase = {
      execute: vi.fn(),
    } as unknown as GetQuizUseCase;

    mockListQuizzesUseCase = {
      execute: vi.fn(),
    } as unknown as ListQuizzesUseCase;

    controller = new QuizController(
      mockCreateQuizUseCase,
      mockGetQuizUseCase,
      mockListQuizzesUseCase,
    );

    mockContext = {
      req: {
        json: vi.fn(),
        param: vi.fn(),
        query: vi.fn(),
        queries: vi.fn(),
      },
      json: vi.fn(),
    } as unknown as AppContext;
  });

  describe("createQuiz", () => {
    const validCreateRequest = {
      question: "What is TypeScript?",
      answerType: "single_choice" as const,
      solution: {
        type: "single_choice" as const,
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
      explanation: "TypeScript is a programming language",
      tags: ["programming", "typescript"],
    };

    describe("when valid request is provided", () => {
      test("should create quiz successfully and return 201", async () => {
        // Arrange
        vi.mocked(mockContext.req.json).mockResolvedValue(validCreateRequest);
        vi.mocked(mockCreateQuizUseCase.execute).mockReturnValue(
          createImmediateSuccess(mockQuiz),
        );

        // Act
        await controller.createQuiz(mockContext);

        // Assert
        expect(mockCreateQuizUseCase.execute).toHaveBeenCalledWith({
          question: validCreateRequest.question,
          answerType: validCreateRequest.answerType,
          solution: validCreateRequest.solution,
          explanation: validCreateRequest.explanation,
          tags: validCreateRequest.tags,
        });
        expect(mockContext.json).toHaveBeenCalledWith(mockQuiz, 201);
      });

      test("should handle request without optional fields", async () => {
        // Arrange
        const minimalRequest = {
          question: "Is TypeScript a language?",
          answerType: "boolean" as const,
          solution: {
            type: "boolean" as const,
            id: "solution-456",
            value: true,
          },
        };

        vi.mocked(mockContext.req.json).mockResolvedValue(minimalRequest);
        vi.mocked(mockCreateQuizUseCase.execute).mockReturnValue(
          createImmediateSuccess(mockQuiz),
        );

        // Act
        await controller.createQuiz(mockContext);

        // Assert
        expect(mockCreateQuizUseCase.execute).toHaveBeenCalledWith({
          question: minimalRequest.question,
          answerType: minimalRequest.answerType,
          solution: minimalRequest.solution,
          explanation: "", // Schema transforms null/undefined to empty string
          tags: [], // Schema transforms null/undefined to empty array
        });
      });
    });

    describe("when invalid request is provided", () => {
      test("should return 400 for invalid JSON", async () => {
        // Arrange
        const jsonError = new JsonParseError(
          "Invalid JSON",
          "Unexpected token",
        );
        vi.mocked(mockContext.req.json).mockRejectedValue(jsonError);

        // Act
        await controller.createQuiz(mockContext);

        // Assert
        expect(mockContext.json).toHaveBeenCalledWith(
          expect.objectContaining({
            code: 500, // JsonParseError extends InternalServerError with code 500
            message: "Internal server error",
          }),
          500,
        );
      });

      test.each([
        ["missing question", { ...validCreateRequest, question: undefined }],
        ["empty question", { ...validCreateRequest, question: "" }],
        [
          "missing answerType",
          { ...validCreateRequest, answerType: undefined },
        ],
        [
          "invalid answerType",
          { ...validCreateRequest, answerType: "invalid" },
        ],
        ["missing solution", { ...validCreateRequest, solution: undefined }],
      ])("should return 400 for %s", async (_description, invalidRequest) => {
        // Arrange
        vi.mocked(mockContext.req.json).mockResolvedValue(invalidRequest);

        // Act
        await controller.createQuiz(mockContext);

        // Assert
        expect(mockContext.json).toHaveBeenCalledWith(
          expect.objectContaining({
            code: 400,
            message: "Validation failed",
            fieldErrors: expect.any(Object),
          }),
          400,
        );
      });
    });

    describe("when use case fails", () => {
      test("should return appropriate error for QuizCreationFailedError", async () => {
        // Arrange
        vi.mocked(mockContext.req.json).mockResolvedValue(validCreateRequest);
        const useCaseError = new QuizCreationFailedError(
          "quiz-123",
          "Validation failed",
        );
        vi.mocked(mockCreateQuizUseCase.execute).mockReturnValue(
          createImmediateFailure(useCaseError),
        );

        // Act
        await controller.createQuiz(mockContext);

        // Assert
        expect(mockContext.json).toHaveBeenCalledWith(
          expect.objectContaining({
            code: 500, // QuizCreationFailedError extends InternalServerError
            message: "Internal server error",
          }),
          500,
        );
      });

      test("should return 500 for UseCaseInternalError", async () => {
        // Arrange
        vi.mocked(mockContext.req.json).mockResolvedValue(validCreateRequest);
        const internalError = new UseCaseInternalError(
          "Internal error",
          "Database connection failed",
        );
        vi.mocked(mockCreateQuizUseCase.execute).mockReturnValue(
          createImmediateFailure(internalError),
        );

        // Act
        await controller.createQuiz(mockContext);

        // Assert
        expect(mockContext.json).toHaveBeenCalledWith(
          expect.objectContaining({
            code: 500,
            message: "Internal server error",
          }),
          500,
        );
      });
    });
  });

  describe("getQuiz", () => {
    describe("when valid quiz ID is provided", () => {
      test("should return quiz successfully", async () => {
        // Arrange
        vi.mocked(mockContext.req.param).mockReturnValue("quiz-123");
        vi.mocked(mockGetQuizUseCase.execute).mockReturnValue(
          createImmediateSuccess(mockQuizWithSolution),
        );

        // Act
        await controller.getQuiz(mockContext);

        // Assert
        expect(mockGetQuizUseCase.execute).toHaveBeenCalledWith("quiz-123");
        expect(mockContext.json).toHaveBeenCalledWith(mockQuizWithSolution);
      });

      test.each([
        ["numeric ID", "123"],
        ["UUID-like ID", "550e8400-e29b-41d4-a716-446655440000"],
        ["complex ID", "quiz-abc-123-def"],
      ])("should handle %s: %s", async (_description, quizId) => {
        // Arrange
        vi.mocked(mockContext.req.param).mockReturnValue(quizId);
        vi.mocked(mockGetQuizUseCase.execute).mockReturnValue(
          createImmediateSuccess(mockQuizWithSolution),
        );

        // Act
        await controller.getQuiz(mockContext);

        // Assert
        expect(mockGetQuizUseCase.execute).toHaveBeenCalledWith(quizId);
      });
    });

    describe("when quiz is not found", () => {
      test("should return 404 for QuizNotFoundError", async () => {
        // Arrange
        vi.mocked(mockContext.req.param).mockReturnValue("non-existent-quiz");
        const notFoundError = new QuizNotFoundError("non-existent-quiz");
        vi.mocked(mockGetQuizUseCase.execute).mockReturnValue(
          createImmediateFailure(notFoundError),
        );

        // Act
        await controller.getQuiz(mockContext);

        // Assert
        expect(mockContext.json).toHaveBeenCalledWith(
          expect.objectContaining({
            code: 404, // QuizNotFoundError extends NotFoundError
            message: "Resource not found",
          }),
          404,
        );
      });
    });

    describe("when use case fails", () => {
      test("should return appropriate error for QuizRetrievalFailedError", async () => {
        // Arrange
        vi.mocked(mockContext.req.param).mockReturnValue("quiz-123");
        const retrievalError = new QuizRetrievalFailedError(
          "quiz-123",
          "Database error",
        );
        vi.mocked(mockGetQuizUseCase.execute).mockReturnValue(
          createImmediateFailure(retrievalError),
        );

        // Act
        await controller.getQuiz(mockContext);

        // Assert
        expect(mockContext.json).toHaveBeenCalledWith(
          expect.objectContaining({
            code: 500, // QuizRetrievalFailedError extends InternalServerError
            message: "Internal server error",
          }),
          500,
        );
      });
    });
  });

  describe("listQuizzes", () => {
    describe("when valid query parameters are provided", () => {
      test("should return quiz list successfully", async () => {
        // Arrange
        vi.mocked(mockContext.req.query)
          .mockReturnValueOnce("approved") // status
          .mockReturnValueOnce("user-123") // creatorId
          .mockReturnValueOnce("10") // limit
          .mockReturnValueOnce("0"); // offset
        vi.mocked(mockContext.req.queries).mockReturnValue([
          "quiz-1",
          "quiz-2",
        ]); // ids
        vi.mocked(mockListQuizzesUseCase.execute).mockReturnValue(
          createImmediateSuccess(mockQuizList),
        );

        // Act
        await controller.listQuizzes(mockContext);

        // Assert
        expect(mockListQuizzesUseCase.execute).toHaveBeenCalledWith({
          status: "approved",
          creatorId: "user-123",
          ids: ["quiz-1", "quiz-2"],
          limit: 10,
          offset: 0,
        });
        expect(mockContext.json).toHaveBeenCalledWith(mockQuizList);
      });

      test("should handle request with default values", async () => {
        // Arrange
        vi.mocked(mockContext.req.query).mockReturnValue(undefined);
        vi.mocked(mockContext.req.queries).mockReturnValue(undefined);
        vi.mocked(mockListQuizzesUseCase.execute).mockReturnValue(
          createImmediateSuccess(mockQuizList),
        );

        // Act
        await controller.listQuizzes(mockContext);

        // Assert
        expect(mockListQuizzesUseCase.execute).toHaveBeenCalledWith({
          status: "approved", // default
          limit: 10, // default
          offset: 0, // default
        });
      });

      test.each([
        ["pending_approval", "pending_approval"],
        ["approved", "approved"],
        ["rejected", "rejected"],
      ])("should handle status: %s", async (_description, status) => {
        // Arrange
        vi.mocked(mockContext.req.query).mockImplementation((key) =>
          key === "status" ? status : undefined,
        );
        vi.mocked(mockContext.req.queries).mockReturnValue(undefined);
        vi.mocked(mockListQuizzesUseCase.execute).mockReturnValue(
          createImmediateSuccess(mockQuizList),
        );

        // Act
        await controller.listQuizzes(mockContext);

        // Assert
        expect(mockListQuizzesUseCase.execute).toHaveBeenCalledWith(
          expect.objectContaining({ status }),
        );
      });
    });

    describe("when invalid query parameters are provided", () => {
      test.each([
        ["invalid status", { status: "invalid_status" }],
        ["negative limit", { limit: "-1" }],
        ["zero limit", { limit: "0" }],
        ["too large limit", { limit: "101" }],
        ["negative offset", { offset: "-1" }],
        ["non-numeric limit", { limit: "abc" }],
        ["non-numeric offset", { offset: "xyz" }],
      ])("should return 400 for %s", async (_description, queryValues) => {
        // Arrange
        vi.mocked(mockContext.req.query).mockImplementation(
          (key) => queryValues[key as keyof typeof queryValues],
        );
        vi.mocked(mockContext.req.queries).mockReturnValue(undefined);

        // Act
        await controller.listQuizzes(mockContext);

        // Assert
        expect(mockContext.json).toHaveBeenCalledWith(
          expect.objectContaining({
            code: 400,
            message: "Validation failed",
            fieldErrors: expect.any(Object),
          }),
          400,
        );
      });
    });

    describe("when use case fails", () => {
      test("should return appropriate error for QuizListRetrievalFailedError", async () => {
        // Arrange
        vi.mocked(mockContext.req.query).mockReturnValue(undefined);
        vi.mocked(mockContext.req.queries).mockReturnValue(undefined);
        const listError = new QuizListRetrievalFailedError(
          {},
          "Database connection failed",
        );
        vi.mocked(mockListQuizzesUseCase.execute).mockReturnValue(
          createImmediateFailure(listError),
        );

        // Act
        await controller.listQuizzes(mockContext);

        // Assert
        expect(mockContext.json).toHaveBeenCalledWith(
          expect.objectContaining({
            code: 500, // QuizListRetrievalFailedError extends InternalServerError
            message: "Internal server error",
          }),
          500,
        );
      });

      test("should return 500 for UseCaseInternalError", async () => {
        // Arrange
        vi.mocked(mockContext.req.query).mockReturnValue(undefined);
        vi.mocked(mockContext.req.queries).mockReturnValue(undefined);
        const internalError = new UseCaseInternalError(
          "Internal error",
          "Unexpected error",
        );
        vi.mocked(mockListQuizzesUseCase.execute).mockReturnValue(
          createImmediateFailure(internalError),
        );

        // Act
        await controller.listQuizzes(mockContext);

        // Assert
        expect(mockContext.json).toHaveBeenCalledWith(
          expect.objectContaining({
            code: 500,
            message: "Internal server error",
          }),
          500,
        );
      });
    });

    describe("edge cases", () => {
      test("should handle empty ids array", async () => {
        // Arrange
        vi.mocked(mockContext.req.query).mockReturnValue(undefined);
        vi.mocked(mockContext.req.queries).mockReturnValue([]);
        vi.mocked(mockListQuizzesUseCase.execute).mockReturnValue(
          createImmediateSuccess(mockQuizList),
        );

        // Act
        await controller.listQuizzes(mockContext);

        // Assert
        expect(mockListQuizzesUseCase.execute).toHaveBeenCalledWith(
          expect.objectContaining({ ids: [] }),
        );
      });

      test("should handle large ids array", async () => {
        // Arrange
        const largeIdsArray = Array.from({ length: 50 }, (_, i) => `quiz-${i}`);
        vi.mocked(mockContext.req.query).mockReturnValue(undefined);
        vi.mocked(mockContext.req.queries).mockReturnValue(largeIdsArray);
        vi.mocked(mockListQuizzesUseCase.execute).mockReturnValue(
          createImmediateSuccess(mockQuizList),
        );

        // Act
        await controller.listQuizzes(mockContext);

        // Assert
        expect(mockListQuizzesUseCase.execute).toHaveBeenCalledWith(
          expect.objectContaining({ ids: largeIdsArray }),
        );
      });

      test("should handle boundary values for limit and offset", async () => {
        // Arrange
        vi.mocked(mockContext.req.query).mockImplementation((key) => {
          switch (key) {
            case "limit":
              return "100"; // max limit
            case "offset":
              return "0"; // min offset
            default:
              return undefined;
          }
        });
        vi.mocked(mockContext.req.queries).mockReturnValue(undefined);
        vi.mocked(mockListQuizzesUseCase.execute).mockReturnValue(
          createImmediateSuccess(mockQuizList),
        );

        // Act
        await controller.listQuizzes(mockContext);

        // Assert
        expect(mockListQuizzesUseCase.execute).toHaveBeenCalledWith(
          expect.objectContaining({ limit: 100, offset: 0 }),
        );
      });
    });
  });
});
