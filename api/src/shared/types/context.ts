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
 * アプリケーション共通のVariables型定義
 *
 * `anonymousSession` ミドルウェア（api/src/middleware/anonymousSession.ts）が
 * `c.set()` するリクエストスコープの値の型です。
 *
 * - `userFingerprint`: Cookie / Authorization ヘッダーから取得、または
 *   新規発行された匿名ユーザーの識別子（UUID v4）。DB上の永続化先は
 *   `UserIdentity.anonymous_id`（ADR-0024参照）。
 */
export type AppVariables = {
  userFingerprint: string;
};

/**
 * アプリケーション共通のEnv型定義
 *
 * HonoのBindings/Variables両方を束ねた型です。
 * `new Hono<AppEnv>()` の形で全エントリポイント・ルートに適用します。
 */
export type AppEnv = {
  Bindings: CloudflareBindings;
  Variables: AppVariables;
};

/**
 * アプリケーション共通のContext型定義
 *
 * HonoのContextにCloudflare Workersのバインディングと
 * リクエストスコープの変数を追加した型です。
 * 全てのルートハンドラーで使用される共通のコンテキスト型として機能します。
 *
 * @example
 * ```typescript
 * async function handler(c: AppContext) {
 *   const fingerprint = c.var.userFingerprint;
 *   // リクエスト処理
 *   return c.json({ message: "Hello" });
 * }
 * ```
 */
export type AppContext = Context<AppEnv>;
