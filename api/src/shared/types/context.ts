import type { Context } from "hono";

// Cloudflare Workersのバインディング型定義
export type CloudflareBindings = Record<string, unknown>;

// アプリケーション共通のContext型定義
export type AppContext = Context<{ Bindings: CloudflareBindings }>;
