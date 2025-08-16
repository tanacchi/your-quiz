import type { Context } from "hono";

/**
 * Cloudflare Workersのバインディング型定義
 *
 * 環境変数、KV、D1、R2などのCloudflare Workers固有のリソースへのアクセスを提供します。
 * プロジェクトの要件に応じて具体的な型を定義することができます。
 */
export type CloudflareBindings = {
  DB: D1Database;
  NODE_ENV: string;
  USE_MOCK_DB?: string;
  ASSETS: Fetcher;
};

/**
 * アプリケーション共通のContext型定義
 *
 * HonoのContextにCloudflare Workersのバインディングを追加した型です。
 * 全てのルートハンドラーで使用される共通のコンテキスト型として機能します。
 *
 * @example
 * ```typescript
 * async function handler(c: AppContext) {
 *   // リクエスト処理
 *   return c.json({ message: "Hello" });
 * }
 * ```
 */
export type AppContext = Context<{ Bindings: CloudflareBindings }>;
