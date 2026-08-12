import { Hono } from "hono";
import { createSearchRepository } from "../../../../infrastructure/repositories/SearchRepositoryFactory";
import type { AppEnv, CloudflareBindings } from "../../../../shared/types";
import { SearchQuizzesUseCase } from "../../application/use-cases/SearchQuizzesUseCase";
import { SearchController } from "../controllers/SearchController";

// Search ルーティング
export const searchRoutes = new Hono<AppEnv>();

/**
 * 検索コントローラーのファクトリー関数
 *
 * 環境に応じて適切なリポジトリ（テスト環境: Mock / 本番: D1）を
 * 使用してコントローラーを作成する（quiz.routes.tsと同じ方針）。
 * D1はリクエスト毎の c.env からしか取得できないため、モジュール
 * トップレベルでの固定DIではなくハンドラー内でファクトリーを呼び出す。
 *
 * @param env - Cloudflare Workersのバインディング環境変数
 * @returns 設定済みのSearchController
 */
function createSearchController(env: CloudflareBindings): SearchController {
  const searchRepository = createSearchRepository(env);
  const searchQuizzesUseCase = new SearchQuizzesUseCase(searchRepository);
  return new SearchController(searchQuizzesUseCase);
}

// Quiz Search endpoint
searchRoutes.get("/quizzes", (c) =>
  createSearchController(c.env).searchQuizzes(c),
);
