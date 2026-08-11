import { z } from "zod";

/**
 * 匿名ユーザー識別子（userFingerprint）のバリデーション用Zodスキーマ
 *
 * `anonymousSession` ミドルウェア（api/src/middleware/anonymousSession.ts）が
 * Cookie / Authorizationヘッダーから抽出した値を検証するために使用します。
 * UUID v4形式に一致しない値（Cookie改ざん・未設定等）は不正とみなし、
 * ミドルウェア側で新規UUIDを再発行します（issue #44 / ADR-0024）。
 *
 * これは認証ではなく識別のためのバリデーションであるため、不正値でも
 * 400エラーにはせず、新規発行にフォールバックする方針です。
 */
export const userFingerprintSchema = z.uuidv4();

export type UserFingerprint = z.infer<typeof userFingerprintSchema>;
