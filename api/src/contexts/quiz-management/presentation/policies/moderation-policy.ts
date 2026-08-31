import type { CloudflareBindings } from "../../../../shared/types";

/**
 * モデレーション操作（approve/reject/publish）を許可するNODE_ENV値の許可リスト。
 *
 * `NODE_ENV !== "production"`という否定形の判定はfail-openになる
 * （`undefined`・`"Production"`・`"prod"`などの想定外の値で誤って全開放
 * されてしまう。ADR-0029のリスク表がこれを最大リスクに挙げているため、
 * 許可リスト方式に反転して既知の値以外は必ず拒否する）。
 */
const MODERATION_ALLOWED_ENVS: readonly string[] = [
  "development",
  "test",
  "staging",
];

/**
 * モデレーション操作（approve/reject/publish）の実行可否を判定する（ADR-0029の暫定権限モデル）。
 *
 * 管理者ロール・所有者解決の本格実装は未着手のため、本番環境ではAPI経由の
 * 実行を許可せず、DB直接操作を前提とする（issue #46 の完了条件どおり）。
 */
export const canModerate = (env: CloudflareBindings): boolean =>
  MODERATION_ALLOWED_ENVS.includes(env.NODE_ENV);
