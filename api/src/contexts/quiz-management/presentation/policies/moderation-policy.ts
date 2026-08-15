import type { CloudflareBindings } from "../../../../shared/types";

/**
 * モデレーション操作（approve/reject/publish）の実行可否を判定する（ADR-0027の暫定権限モデル）。
 *
 * 管理者ロール・所有者解決の本格実装は未着手のため、本番環境ではAPI経由の
 * 実行を許可せず、DB直接操作を前提とする（issue #46 の完了条件どおり）。
 */
export const canModerate = (env: CloudflareBindings): boolean =>
  env.NODE_ENV !== "production";
