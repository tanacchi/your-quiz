import { Hono } from "hono";
import type { CloudflareBindings } from "../../../../shared/types";
import {
  CreateQuizUseCase,
  GetQuizUseCase,
  ListQuizzesUseCase,
} from "../../application/use-cases";
import { MockQuizRepository } from "../../infrastructure/repositories/MockQuizRepository";
import { QuizController } from "../controllers/QuizController";

// 依存性注入の設定
const quizRepository = new MockQuizRepository();
const createQuizUseCase = new CreateQuizUseCase(quizRepository);
const getQuizUseCase = new GetQuizUseCase(quizRepository);
const listQuizzesUseCase = new ListQuizzesUseCase(quizRepository);
const quizController = new QuizController(
  createQuizUseCase,
  getQuizUseCase,
  listQuizzesUseCase,
);

// Quiz Management ルーティング
export const quizRoutes = new Hono<{ Bindings: CloudflareBindings }>();

// Quiz CRUD endpoints
quizRoutes.get("/quizzes", (c) => quizController.listQuizzes(c));
quizRoutes.get("/quizzes/:id", (c) => quizController.getQuiz(c));
quizRoutes.post("/quizzes", (c) => quizController.createQuiz(c));
