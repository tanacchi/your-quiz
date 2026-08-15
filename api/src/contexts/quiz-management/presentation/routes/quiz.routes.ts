import { Hono } from "hono";
import { createQuizRepository } from "../../../../infrastructure/repositories/QuizRepositoryFactory";
import type { AppEnv, CloudflareBindings } from "../../../../shared/types";
import {
  ChangeQuizStatusUseCase,
  CreateQuizUseCase,
  DeleteQuizUseCase,
  GetQuizUseCase,
  ListQuizzesUseCase,
  UpdateQuizUseCase,
} from "../../application/use-cases";
import { QuizController } from "../controllers/QuizController";
import { QuizWriteController } from "../controllers/QuizWriteController";

// Quiz Management ルーティング
export const quizRoutes = new Hono<AppEnv>();

/**
 * クイズコントローラーのファクトリー関数
 *
 * 環境に応じて適切なリポジトリを使用してコントローラーを作成します。
 *
 * @param env - Cloudflare Workersのバインディング環境変数
 * @returns 設定済みのQuizController
 */
function createQuizController(env: CloudflareBindings): QuizController {
  // 環境に応じたリポジトリを作成
  const quizRepository = createQuizRepository(env);

  // ユースケースを作成
  const createQuizUseCase = new CreateQuizUseCase(quizRepository);
  const getQuizUseCase = new GetQuizUseCase(quizRepository);
  const listQuizzesUseCase = new ListQuizzesUseCase(quizRepository);

  // コントローラーを作成
  return new QuizController(
    createQuizUseCase,
    getQuizUseCase,
    listQuizzesUseCase,
  );
}

/**
 * クイズ書き込み系コントローラーのファクトリー関数
 *
 * PATCH/DELETE と承認ワークフロー（submit/approve/reject/publish）を
 * 担当するコントローラーを作成する（issue #46）。
 *
 * @param env - Cloudflare Workersのバインディング環境変数
 * @returns 設定済みのQuizWriteController
 */
function createQuizWriteController(
  env: CloudflareBindings,
): QuizWriteController {
  const quizRepository = createQuizRepository(env);

  return new QuizWriteController({
    update: new UpdateQuizUseCase(quizRepository),
    delete: new DeleteQuizUseCase(quizRepository),
    changeStatus: new ChangeQuizStatusUseCase(quizRepository),
  });
}

// Quiz CRUD endpoints
quizRoutes.get("/quizzes", (c) => {
  const controller = createQuizController(c.env);
  return controller.listQuizzes(c);
});

quizRoutes.get("/quizzes/:id", (c) => {
  const controller = createQuizController(c.env);
  return controller.getQuiz(c);
});

quizRoutes.post("/quizzes", (c) => {
  const controller = createQuizController(c.env);
  return controller.createQuiz(c);
});

quizRoutes.patch("/quizzes/:id", (c) => {
  const controller = createQuizWriteController(c.env);
  return controller.updateQuiz(c);
});

quizRoutes.delete("/quizzes/:id", (c) => {
  const controller = createQuizWriteController(c.env);
  return controller.deleteQuiz(c);
});

// 承認ワークフロー（ADR-0027）
quizRoutes.post("/quizzes/:id/submit", (c) => {
  const controller = createQuizWriteController(c.env);
  return controller.submitForApproval(c);
});

quizRoutes.post("/quizzes/:id/approve", (c) => {
  const controller = createQuizWriteController(c.env);
  return controller.approveQuiz(c);
});

quizRoutes.post("/quizzes/:id/reject", (c) => {
  const controller = createQuizWriteController(c.env);
  return controller.rejectQuiz(c);
});

quizRoutes.post("/quizzes/:id/publish", (c) => {
  const controller = createQuizWriteController(c.env);
  return controller.publishQuiz(c);
});
