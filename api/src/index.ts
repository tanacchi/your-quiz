import { Hono } from "hono";
import { quizRoutes } from "./contexts/quiz-management/presentation/routes/quiz.routes";
import type { CloudflareBindings } from "./shared/types";

// アプリケーションの初期化
const app = new Hono<{ Bindings: CloudflareBindings }>();

// API ルートの設定
app.route("/api/quiz/v1/manage", quizRoutes);

// ヘルスチェック
app.get("/health", (c) =>
  c.json({ status: "ok", timestamp: new Date().toISOString() }),
);

// ルート
app.get("/", (c) =>
  c.json({ message: "Your Quiz API - Hexagonal Architecture" }),
);

export default app;
