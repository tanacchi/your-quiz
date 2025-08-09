import { Hono } from "hono";
import type { CloudflareBindings } from "../../../../shared/types";
import { SearchQuizzesUseCase } from "../../application/use-cases/SearchQuizzesUseCase";
import { MockSearchRepository } from "../../infrastructure/repositories/MockSearchRepository";
import { SearchController } from "../controllers/SearchController";

// 依存性注入の設定
const searchRepository = new MockSearchRepository();
const searchQuizzesUseCase = new SearchQuizzesUseCase(searchRepository);
const searchController = new SearchController(searchQuizzesUseCase);

// Search ルーティング
export const searchRoutes = new Hono<{ Bindings: CloudflareBindings }>();

// Quiz Search endpoint
searchRoutes.get("/quizzes", (c) => searchController.searchQuizzes(c));
