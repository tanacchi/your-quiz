import { Hono } from "hono";
import { learningRoutes } from "./contexts/quiz-learning/presentation/routes/learning.routes";
import { quizRoutes } from "./contexts/quiz-management/presentation/routes/quiz.routes";
import { searchRoutes } from "./contexts/search/presentation/routes/search.routes";
import { anonymousSession } from "./middleware/anonymousSession";
import type { AppEnv } from "./shared/types";

/**
 * Your Quiz API アプリケーション
 *
 * Honoフレームワークを使用したクイズ管理APIです。
 * ヘキサゴナルアーキテクチャを採用し、ドメイン駆動設計の原則に従って構築されています。
 * Cloudflare Workers上での実行を想定しています。
 *
 * @example
 * ```typescript
 * // Cloudflare Workersでの使用
 * export default app;
 * ```
 */

/**
 * Honoアプリケーションインスタンス
 *
 * Cloudflare Workersのバインディングを含むHonoアプリケーションです。
 * 全てのAPIルートとミドルウェアがここに設定されます。
 */
const app = new Hono<AppEnv>();

/**
 * 匿名ユーザー識別ミドルウェア（issue #44 / ADR-0026）
 *
 * 全リクエストに `userFingerprint`（UUID v4）を付与する。
 * ルート登録より前に登録し、全エンドポイントに適用されるようにする。
 */
app.use("*", anonymousSession);

/**
 * API ルートの設定
 *
 * クイズ管理関連のルートを /api/quiz/v1/manage パスにマウントします。
 * 検索関連のルートを /api/search/v1 パスにマウントします。
 * 学習（Deck管理）関連のルートを /api/quiz/v1/learning パスにマウントします。
 */
app.route("/api/quiz/v1/manage", quizRoutes);
app.route("/api/search/v1", searchRoutes);
app.route("/api/quiz/v1/learning", learningRoutes);

/**
 * ヘルスチェックエンドポイント
 *
 * APIの稼働状態を確認するためのエンドポイントです。
 */
app.get("/health", (c) =>
  c.json({ status: "ok", timestamp: new Date().toISOString() }),
);

/**
 * ルートエンドポイント
 *
 * APIの基本情報を返すエンドポイントです。
 */
app.get("/", (c) =>
  c.json({ message: "Your Quiz API - Hexagonal Architecture" }),
);

export default app;
