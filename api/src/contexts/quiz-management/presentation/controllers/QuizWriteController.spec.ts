import { Hono } from "hono";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { z } from "zod";
import {
  createImmediateFailure,
  createImmediateSuccess,
} from "../../../../../tests/helpers/mock-helpers";
import type {
  AppEnv,
  CloudflareBindings,
  components,
} from "../../../../shared/types";
import type { ChangeQuizStatusUseCase } from "../../application/use-cases/ChangeQuizStatusUseCase";
import type { DeleteQuizUseCase } from "../../application/use-cases/DeleteQuizUseCase";
import type { UpdateQuizUseCase } from "../../application/use-cases/UpdateQuizUseCase";
import {
  QuizCreatorOnlyError,
  QuizNotFoundError,
  QuizStatusError,
} from "../../domain/errors";
import { QuizWriteController } from "./QuizWriteController";

describe("QuizWriteController", () => {
  let updateUseCase: Pick<UpdateQuizUseCase, "execute">;
  let deleteUseCase: Pick<DeleteQuizUseCase, "execute">;
  let changeStatusUseCase: Pick<ChangeQuizStatusUseCase, "execute">;
  let app: Hono<AppEnv>;
  let mockEnv: CloudflareBindings;

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
    updateUseCase = { execute: vi.fn() };
    deleteUseCase = { execute: vi.fn() };
    changeStatusUseCase = { execute: vi.fn() };
    mockEnv = {
      NODE_ENV: "development",
      DB: {} as D1Database,
      ASSETS: {} as Fetcher,
    };

    const controller = new QuizWriteController({
      update: updateUseCase,
      delete: deleteUseCase,
      changeStatus: changeStatusUseCase,
    });

    app = new Hono<AppEnv>();
    app.use("*", async (c, next) => {
      c.set("userFingerprint", "fp-test-user");
      await next();
    });
    app.patch("/quizzes/:id", (c) => controller.updateQuiz(c));
    app.delete("/quizzes/:id", (c) => controller.deleteQuiz(c));
    app.post("/quizzes/:id/submit", (c) => controller.submitForApproval(c));
    app.post("/quizzes/:id/approve", (c) => controller.approveQuiz(c));
    app.post("/quizzes/:id/reject", (c) => controller.rejectQuiz(c));
    app.post("/quizzes/:id/publish", (c) => controller.publishQuiz(c));
  });

  describe("updateQuiz", () => {
    test("正常系: question/explanationを渡すと200でUseCaseの結果を返す", async () => {
      vi.mocked(updateUseCase.execute).mockReturnValue(
        createImmediateSuccess(buildQuizResponse({ question: "Updated" })),
      );

      const req = new Request("http://localhost/quizzes/quiz-123", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: "Updated" }),
      });
      const res = await app.request(req, {}, mockEnv);

      expect(res.status).toBe(200);
      const body = z.object({ question: z.string() }).parse(await res.json());
      expect(body.question).toBe("Updated");
      // explanationが未指定の場合、実装はキー自体を渡さない
      // (exactOptionalPropertyTypes対応の条件付きスプレッド)。
      // toHaveBeenCalledWithはundefined値のプロパティ有無を区別しないため、
      // キーの非存在を明示的に検証する。
      const [callArgs] = vi.mocked(updateUseCase.execute).mock.calls[0] ?? [];
      expect(callArgs).toStrictEqual({
        quizId: "quiz-123",
        requesterId: "fp-test-user",
        question: "Updated",
      });
      expect(callArgs).not.toHaveProperty("explanation");
    });

    test("異常系: 空ボディは400を返す", async () => {
      const req = new Request("http://localhost/quizzes/quiz-123", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const res = await app.request(req, {}, mockEnv);

      expect(res.status).toBe(400);
      expect(updateUseCase.execute).not.toHaveBeenCalled();
    });

    test("異常系: UseCaseエラーはControllerErrorHandlerでマッピングされる", async () => {
      vi.mocked(updateUseCase.execute).mockReturnValue(
        createImmediateFailure(
          new QuizCreatorOnlyError("quiz-123", "update", "someone-else"),
        ),
      );

      const req = new Request("http://localhost/quizzes/quiz-123", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: "Updated" }),
      });
      const res = await app.request(req, {}, mockEnv);

      expect(res.status).toBe(403);
    });
  });

  describe("deleteQuiz", () => {
    test("正常系: 204を返す", async () => {
      vi.mocked(deleteUseCase.execute).mockReturnValue(
        createImmediateSuccess(undefined),
      );

      const req = new Request("http://localhost/quizzes/quiz-123", {
        method: "DELETE",
      });
      const res = await app.request(req, {}, mockEnv);

      expect(res.status).toBe(204);
      expect(deleteUseCase.execute).toHaveBeenCalledWith({
        quizId: "quiz-123",
        requesterId: "fp-test-user",
      });
    });

    test("異常系: 対象不在は404を返す", async () => {
      vi.mocked(deleteUseCase.execute).mockReturnValue(
        createImmediateFailure(new QuizNotFoundError("quiz-123")),
      );

      const req = new Request("http://localhost/quizzes/quiz-123", {
        method: "DELETE",
      });
      const res = await app.request(req, {}, mockEnv);

      expect(res.status).toBe(404);
    });
  });

  describe("submitForApproval", () => {
    test("正常系: 200でUseCaseの結果を返す。submitはrequiresModeration=falseのためisModeratorの値に関わらず作成者確認に委ねられる", async () => {
      vi.mocked(changeStatusUseCase.execute).mockReturnValue(
        createImmediateSuccess(
          buildQuizResponse({ status: "pending_approval" }),
        ),
      );

      const req = new Request("http://localhost/quizzes/quiz-123/submit", {
        method: "POST",
      });
      const res = await app.request(req, {}, mockEnv);

      expect(res.status).toBe(200);
      expect(changeStatusUseCase.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          quizId: "quiz-123",
          action: "submit",
          requesterId: "fp-test-user",
        }),
      );
      // ボディを持たない遷移なのでreviewerNotesキー自体を渡さない
      const [callArgs] =
        vi.mocked(changeStatusUseCase.execute).mock.calls[0] ?? [];
      expect(callArgs).not.toHaveProperty("reviewerNotes");
    });
  });

  describe("approveQuiz", () => {
    test("正常系: reviewerNotesを渡すとchangeStatusに引き継がれる", async () => {
      vi.mocked(changeStatusUseCase.execute).mockReturnValue(
        createImmediateSuccess(buildQuizResponse({ status: "approved" })),
      );

      const req = new Request("http://localhost/quizzes/quiz-123/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision: "approved", reviewerNotes: "OK" }),
      });
      const res = await app.request(req, {}, mockEnv);

      expect(res.status).toBe(200);
      expect(changeStatusUseCase.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "approve",
          reviewerNotes: "OK",
          isModerator: true,
        }),
      );
    });

    test("本番環境ではisModerator=falseで渡す", async () => {
      vi.mocked(changeStatusUseCase.execute).mockReturnValue(
        createImmediateSuccess(buildQuizResponse({ status: "approved" })),
      );
      mockEnv = { ...mockEnv, NODE_ENV: "production" };

      const req = new Request("http://localhost/quizzes/quiz-123/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision: "approved" }),
      });
      const res = await app.request(req, {}, mockEnv);

      expect(res.status).toBe(200);
      expect(changeStatusUseCase.execute).toHaveBeenCalledWith(
        expect.objectContaining({ isModerator: false }),
      );
    });

    test("異常系: decision不正は400を返す", async () => {
      const req = new Request("http://localhost/quizzes/quiz-123/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision: "invalid" }),
      });
      const res = await app.request(req, {}, mockEnv);

      expect(res.status).toBe(400);
      expect(changeStatusUseCase.execute).not.toHaveBeenCalled();
    });

    test("異常系: decision=rejectedを/approveに送ると400を返し、承認されない(S-2)", async () => {
      const req = new Request("http://localhost/quizzes/quiz-123/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision: "rejected" }),
      });
      const res = await app.request(req, {}, mockEnv);

      expect(res.status).toBe(400);
      expect(changeStatusUseCase.execute).not.toHaveBeenCalled();
    });
  });

  describe("rejectQuiz", () => {
    test("正常系: 200でUseCaseの結果を返す", async () => {
      vi.mocked(changeStatusUseCase.execute).mockReturnValue(
        createImmediateSuccess(buildQuizResponse({ status: "rejected" })),
      );

      const req = new Request("http://localhost/quizzes/quiz-123/reject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision: "rejected", reviewerNotes: "NG" }),
      });
      const res = await app.request(req, {}, mockEnv);

      expect(res.status).toBe(200);
      expect(changeStatusUseCase.execute).toHaveBeenCalledWith(
        expect.objectContaining({ action: "reject", reviewerNotes: "NG" }),
      );
    });

    test("異常系: decision=approvedを/rejectに送ると400を返し、却下されない(S-2)", async () => {
      const req = new Request("http://localhost/quizzes/quiz-123/reject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision: "approved" }),
      });
      const res = await app.request(req, {}, mockEnv);

      expect(res.status).toBe(400);
      expect(changeStatusUseCase.execute).not.toHaveBeenCalled();
    });
  });

  describe("publishQuiz", () => {
    test("正常系: 200でUseCaseの結果を返す", async () => {
      vi.mocked(changeStatusUseCase.execute).mockReturnValue(
        createImmediateSuccess(buildQuizResponse({ status: "published" })),
      );

      const req = new Request("http://localhost/quizzes/quiz-123/publish", {
        method: "POST",
      });
      const res = await app.request(req, {}, mockEnv);

      expect(res.status).toBe(200);
      expect(changeStatusUseCase.execute).toHaveBeenCalledWith(
        expect.objectContaining({ action: "publish" }),
      );
    });

    test("異常系: UseCaseエラーはControllerErrorHandlerでマッピングされる(409)", async () => {
      vi.mocked(changeStatusUseCase.execute).mockReturnValue(
        createImmediateFailure(
          new QuizStatusError("quiz-123", "draft", "approved"),
        ),
      );

      const req = new Request("http://localhost/quizzes/quiz-123/publish", {
        method: "POST",
      });
      const res = await app.request(req, {}, mockEnv);

      expect(res.status).toBe(409);
    });
  });
});
