/**
 * 匿名ユーザー識別子（fingerprint）の atom。
 * localStorage への永続化のみを担い、生成ロジックと JWT 交換は
 * #44（匿名認証ミドルウェア）・#43（IndexedDB 永続化層）で実装する。
 */
import { atomWithStorage } from "jotai/utils";

const USER_FINGERPRINT_STORAGE_KEY = "your-quiz:fingerprint";

/**
 * `getOnInit: true` を指定し、mount（購読開始）を待たずに
 * 初回 `get` の時点で同期的に localStorage から復元する。
 * 既定（false）だと `onMount` が発火するまで `initialValue` のままになる。
 */
export const userFingerprintAtom = atomWithStorage<string | null>(
  USER_FINGERPRINT_STORAGE_KEY,
  null,
  undefined,
  { getOnInit: true },
);
