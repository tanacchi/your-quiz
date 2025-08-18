// @ts-nocheck
import { Hono } from "hono";
import { beforeEach, describe, expect, test, vi } from "vitest";
import type { CloudflareBindings } from "../../../../shared/types";
import { quizRoutes } from "./quiz.routes";

// Mock the entire infrastructure layer
vi.mock(
  "../../../../infrastructure/repositories/QuizRepositoryFactory",
  () => ({
    createQuizRepository: vi.fn(),
  }),
);

// Mock the use cases
vi.mock("../../application/use-cases", () => ({
  CreateQuizUseCase: vi.fn(),
  GetQuizUseCase: vi.fn(),
  ListQuizzesUseCase: vi.fn(),
}));

// Mock the controller
vi.mock("../controllers/QuizController", () => ({
  QuizController: vi.fn(),
}));

import { createQuizRepository } from "../../../../infrastructure/repositories/QuizRepositoryFactory";
import {
  CreateQuizUseCase,
  GetQuizUseCase,
  ListQuizzesUseCase,
} from "../../application/use-cases";
import { QuizController } from "../controllers/QuizController";

describe.skip("quiz.routes", () => {
  let app: Hono;
  let mockEnv: CloudflareBindings;
  let mockRepository: unknown;
  let mockController: QuizController;

  beforeEach(() => {
    app = new Hono();
    app.route("/api/v1", quizRoutes);

    mockEnv = {
      NODE_ENV: "test",
      DB: {} as D1Database,
    } as CloudflareBindings;

    mockRepository = {
      create: vi.fn(),
      findById: vi.fn(),
      findMany: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };

    mockController = {
      createQuiz: vi.fn(),
      getQuiz: vi.fn(),
      listQuizzes: vi.fn(),
    } as unknown as QuizController;

    vi.mocked(createQuizRepository).mockReturnValue(mockRepository);
    vi.mocked(CreateQuizUseCase).mockImplementation(
      () => ({}) as CreateQuizUseCase,
    );
    vi.mocked(GetQuizUseCase).mockImplementation(() => ({}) as GetQuizUseCase);
    vi.mocked(ListQuizzesUseCase).mockImplementation(
      () => ({}) as ListQuizzesUseCase,
    );
    vi.mocked(QuizController).mockImplementation(() => mockController);
  });

  describe("GET /quizzes", () => {
    test("should route to listQuizzes controller method", async () => {
      // Arrange
      vi.mocked(mockController.listQuizzes).mockResolvedValue(
        new Response(
          JSON.stringify({ items: [], totalCount: 0, hasMore: false }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        ),
      );

      // Act
      const req = new Request("http://localhost/api/v1/quizzes");
      const res = await app.request(req, mockEnv);

      // Assert
      expect(res.status).toBe(200);
      expect(createQuizRepository).toHaveBeenCalledWith(mockEnv);
      expect(QuizController).toHaveBeenCalledWith(
        expect.any(Object), // CreateQuizUseCase instance
        expect.any(Object), // GetQuizUseCase instance
        expect.any(Object), // ListQuizzesUseCase instance
      );
    });

    test("should handle query parameters", async () => {
      // Arrange
      vi.mocked(mockController.listQuizzes).mockResolvedValue(
        new Response(
          JSON.stringify({ items: [], totalCount: 0, hasMore: false }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        ),
      );

      // Act
      const req = new Request(
        "http://localhost/api/v1/quizzes?status=approved&limit=5&offset=10",
      );
      const res = await app.request(req, mockEnv);

      // Assert
      expect(res.status).toBe(200);
      expect(mockController.listQuizzes).toHaveBeenCalledWith(
        expect.objectContaining({
          req: expect.objectContaining({
            url: expect.stringContaining("status=approved&limit=5&offset=10"),
          }),
          env: mockEnv,
        }),
      );
    });

    test.each([
      ["with creatorId", "?creatorId=user-123"],
      ["with status", "?status=pending_approval"],
      ["with multiple ids", "?ids=quiz-1&ids=quiz-2"],
      [
        "with all parameters",
        "?status=approved&creatorId=user-123&limit=20&offset=0&ids=quiz-1",
      ],
    ])("should handle %s", async (_description, queryString) => {
      // Arrange
      vi.mocked(mockController.listQuizzes).mockResolvedValue(
        new Response(
          JSON.stringify({ items: [], totalCount: 0, hasMore: false }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        ),
      );

      // Act
      const req = new Request(`http://localhost/api/v1/quizzes${queryString}`);
      const res = await app.request(req, mockEnv);

      // Assert
      expect(res.status).toBe(200);
      expect(mockController.listQuizzes).toHaveBeenCalled();
    });
  });

  describe("GET /quizzes/:id", () => {
    test("should route to getQuiz controller method", async () => {
      // Arrange
      const mockQuiz = {
        id: "quiz-123",
        question: "What is TypeScript?",
        answerType: "single_choice",
        solution: { type: "single_choice", id: "sol-1", choices: [] },
      };

      vi.mocked(mockController.getQuiz).mockResolvedValue(
        new Response(JSON.stringify(mockQuiz), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      );

      // Act
      const req = new Request("http://localhost/api/v1/quizzes/quiz-123");
      const res = await app.request(req, mockEnv);

      // Assert
      expect(res.status).toBe(200);
      expect(mockController.getQuiz).toHaveBeenCalledWith(
        expect.objectContaining({
          req: expect.objectContaining({
            param: expect.any(Function),
          }),
          env: mockEnv,
        }),
      );
    });

    test.each([
      ["numeric ID", "123"],
      ["UUID-like ID", "550e8400-e29b-41d4-a716-446655440000"],
      ["hyphenated ID", "quiz-abc-123"],
      ["special characters", "quiz_test.123"],
    ])("should handle %s: %s", async (_description, quizId) => {
      // Arrange
      vi.mocked(mockController.getQuiz).mockResolvedValue(
        new Response(JSON.stringify({ id: quizId }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      );

      // Act
      const req = new Request(`http://localhost/api/v1/quizzes/${quizId}`);
      const res = await app.request(req, mockEnv);

      // Assert
      expect(res.status).toBe(200);
      expect(mockController.getQuiz).toHaveBeenCalled();
    });

    test("should return 404 for quiz not found", async () => {
      // Arrange
      vi.mocked(mockController.getQuiz).mockResolvedValue(
        new Response(
          JSON.stringify({
            error: { code: "QUIZ_NOT_FOUND", message: "Quiz not found" },
          }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          },
        ),
      );

      // Act
      const req = new Request("http://localhost/api/v1/quizzes/non-existent");
      const res = await app.request(req, mockEnv);

      // Assert
      expect(res.status).toBe(404);
    });
  });

  describe("POST /quizzes", () => {
    const validQuizData = {
      question: "What is TypeScript?",
      answerType: "single_choice",
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
      explanation: "TypeScript is a programming language",
      tags: ["programming", "typescript"],
    };

    test("should route to createQuiz controller method", async () => {
      // Arrange
      const mockCreatedQuiz = {
        id: "quiz-123",
        ...validQuizData,
        status: "pending_approval",
        creatorId: "user-123",
        createdAt: "2024-01-01 00:00:00",
      };

      vi.mocked(mockController.createQuiz).mockResolvedValue(
        new Response(JSON.stringify(mockCreatedQuiz), {
          status: 201,
          headers: { "Content-Type": "application/json" },
        }),
      );

      // Act
      const req = new Request("http://localhost/api/v1/quizzes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validQuizData),
      });
      const res = await app.request(req, mockEnv);

      // Assert
      expect(res.status).toBe(201);
      expect(mockController.createQuiz).toHaveBeenCalledWith(
        expect.objectContaining({
          req: expect.objectContaining({
            json: expect.any(Function),
          }),
          env: mockEnv,
        }),
      );
    });

    test("should handle different answer types", async () => {
      // Arrange
      const answerTypeTests = [
        {
          type: "boolean",
          solution: { type: "boolean", id: "sol-bool", value: true },
        },
        {
          type: "free_text",
          solution: {
            type: "free_text",
            id: "sol-text",
            correctAnswer: "TypeScript",
            matchingStrategy: "exact",
            caseSensitive: false,
          },
        },
        {
          type: "multiple_choice",
          solution: {
            type: "multiple_choice",
            id: "sol-multi",
            minCorrectAnswers: 2,
            choices: [
              {
                id: "c1",
                solutionId: "sol-multi",
                text: "Option 1",
                orderIndex: 0,
                isCorrect: true,
              },
              {
                id: "c2",
                solutionId: "sol-multi",
                text: "Option 2",
                orderIndex: 1,
                isCorrect: true,
              },
              {
                id: "c3",
                solutionId: "sol-multi",
                text: "Option 3",
                orderIndex: 2,
                isCorrect: false,
              },
            ],
          },
        },
      ];

      for (const testCase of answerTypeTests) {
        const quizData = {
          question: `Test question for ${testCase.type}`,
          answerType: testCase.type,
          solution: testCase.solution,
        };

        vi.mocked(mockController.createQuiz).mockResolvedValue(
          new Response(JSON.stringify({ id: "quiz-test", ...quizData }), {
            status: 201,
            headers: { "Content-Type": "application/json" },
          }),
        );

        // Act
        const req = new Request("http://localhost/api/v1/quizzes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(quizData),
        });
        const res = await app.request(req, mockEnv);

        // Assert
        expect(res.status).toBe(201);
      }
    });

    test("should handle invalid JSON", async () => {
      // Arrange
      vi.mocked(mockController.createQuiz).mockResolvedValue(
        new Response(
          JSON.stringify({
            error: { code: "INVALID_JSON", message: "Invalid JSON" },
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        ),
      );

      // Act
      const req = new Request("http://localhost/api/v1/quizzes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "invalid json",
      });
      const res = await app.request(req, mockEnv);

      // Assert
      expect(res.status).toBe(400);
    });

    test("should handle validation errors", async () => {
      // Arrange
      vi.mocked(mockController.createQuiz).mockResolvedValue(
        new Response(
          JSON.stringify({
            error: { code: "VALIDATION_ERROR", message: "Validation failed" },
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        ),
      );

      // Act
      const req = new Request("http://localhost/api/v1/quizzes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: "" }), // Invalid data
      });
      const res = await app.request(req, mockEnv);

      // Assert
      expect(res.status).toBe(400);
    });
  });

  describe("createQuizController factory", () => {
    test("should create controller with proper dependencies", async () => {
      // Act
      const req = new Request("http://localhost/api/v1/quizzes");
      await app.request(req, mockEnv);

      // Assert
      expect(createQuizRepository).toHaveBeenCalledWith(mockEnv);
      expect(CreateQuizUseCase).toHaveBeenCalledWith(mockRepository);
      expect(GetQuizUseCase).toHaveBeenCalledWith(mockRepository);
      expect(ListQuizzesUseCase).toHaveBeenCalledWith(mockRepository);
      expect(QuizController).toHaveBeenCalledWith(
        expect.any(Object), // CreateQuizUseCase
        expect.any(Object), // GetQuizUseCase
        expect.any(Object), // ListQuizzesUseCase
      );
    });

    test("should create new controller instance for each request", async () => {
      // Arrange
      vi.mocked(mockController.listQuizzes).mockResolvedValue(
        new Response(
          JSON.stringify({ items: [], totalCount: 0, hasMore: false }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        ),
      );

      // Act - Make multiple requests
      const req1 = new Request("http://localhost/api/v1/quizzes");
      const req2 = new Request("http://localhost/api/v1/quizzes");

      await app.request(req1, mockEnv);
      await app.request(req2, mockEnv);

      // Assert - Controller should be created twice
      expect(QuizController).toHaveBeenCalledTimes(2);
    });

    test("should handle different environments", async () => {
      // Arrange
      const devEnv: CloudflareBindings = {
        ...mockEnv,
        NODE_ENV: "development",
      };

      vi.mocked(mockController.listQuizzes).mockResolvedValue(
        new Response(
          JSON.stringify({ items: [], totalCount: 0, hasMore: false }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        ),
      );

      // Act
      const req = new Request("http://localhost/api/v1/quizzes");
      await app.request(req, devEnv);

      // Assert
      expect(createQuizRepository).toHaveBeenCalledWith(devEnv);
    });
  });

  describe("HTTP methods", () => {
    test("should reject unsupported methods", async () => {
      // Test unsupported methods
      const unsupportedMethods = ["PUT", "DELETE", "PATCH"];

      for (const method of unsupportedMethods) {
        const req = new Request("http://localhost/api/v1/quizzes", { method });
        const res = await app.request(req, mockEnv);

        // Should return 404 or 405 for unsupported methods
        expect([404, 405]).toContain(res.status);
      }
    });

    test("should handle OPTIONS requests (CORS preflight)", async () => {
      // Act
      const req = new Request("http://localhost/api/v1/quizzes", {
        method: "OPTIONS",
      });
      const res = await app.request(req, mockEnv);

      // Assert - Should handle OPTIONS or return 404
      expect([200, 204, 404]).toContain(res.status);
    });
  });
});
