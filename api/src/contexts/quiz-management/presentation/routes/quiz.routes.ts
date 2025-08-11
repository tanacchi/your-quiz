import { Hono } from "hono";
import { createQuizRepository } from "../../../../infrastructure/repositories/QuizRepositoryFactory";
import type { CloudflareBindings } from "../../../../shared/types";
import {
  CreateQuizUseCase,
  GetQuizUseCase,
  ListQuizzesUseCase,
} from "../../application/use-cases";
import { QuizController } from "../controllers/QuizController";

// Quiz Management ルーティング
export const quizRoutes = new Hono<{ Bindings: CloudflareBindings }>();

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
