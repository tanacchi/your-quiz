import { getCookie, setCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { userFingerprintSchema } from "../shared/schemas";
import type { AppEnv } from "../shared/types";

/** Cookie名。DB上は `UserIdentity.anonymous_id` にマップされる（ADR-0026参照） */
const COOKIE_NAME = "quiz_fingerprint";

/** Cookieの最大寿命（400日）。主要ブラウザのCookie有効期限上限に合わせる */
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 400;

/** Authorizationヘッダーの独自スキーム。将来のJWT用`Bearer`と衝突しないようにする */
const AUTHORIZATION_SCHEME = "Fingerprint";

/**
 * Authorizationヘッダーから `userFingerprint` を抽出する
 *
 * `Authorization: Fingerprint <uuid>` 形式のみを受け付ける。
 * スキーム不一致・UUID v4形式でない値はundefinedを返す。
 */
const extractFromAuthorizationHeader = (
  header: string | undefined,
): string | undefined => {
  if (header === undefined) {
    return undefined;
  }
  const [scheme, value] = header.split(" ");
  if (scheme !== AUTHORIZATION_SCHEME || value === undefined) {
    return undefined;
  }
  const result = userFingerprintSchema.safeParse(value);
  return result.success ? result.data : undefined;
};

/**
 * CookieからuserFingerprintを抽出する
 *
 * UUID v4形式でない値（改ざん・不正値）はundefinedを返し、
 * 呼び出し側で新規発行にフォールバックさせる。これは認証ではなく識別のため、
 * 不正値を理由に400エラーにはしない。
 */
const extractFromCookie = (
  cookieValue: string | undefined,
): string | undefined => {
  if (cookieValue === undefined) {
    return undefined;
  }
  const result = userFingerprintSchema.safeParse(cookieValue);
  return result.success ? result.data : undefined;
};

/**
 * 匿名ユーザー識別ミドルウェア（issue #44 / ADR-0026）
 *
 * Authorizationヘッダー > Cookie > 新規発行 の優先順位で
 * `userFingerprint`（UUID v4文字列）を決定し、`c.var.userFingerprint` にセットする。
 *
 * - Authorizationヘッダー由来の場合はCookieを発行しない（APIクライアント向け経路）
 * - それ以外の場合は毎レスポンスでCookieを再発行し、有効期限をローリングする
 * - `UserIdentity`（D1）への永続化はここでは行わない。UserIdentityを必要とする
 *   handlerが遅延解決で参照する設計とする（`resolveUserIdentity`、後続実装）
 *
 * @example
 * ```typescript
 * app.use("*", anonymousSession);
 *
 * app.get("/me", (c) => c.json({ userFingerprint: c.var.userFingerprint }));
 * ```
 */
export const anonymousSession = createMiddleware<AppEnv>(async (c, next) => {
  const fromHeader = extractFromAuthorizationHeader(
    c.req.header("Authorization"),
  );

  if (fromHeader !== undefined) {
    c.set("userFingerprint", fromHeader);
    await next();
    return;
  }

  const fromCookie = extractFromCookie(getCookie(c, COOKIE_NAME));
  const fingerprint = fromCookie ?? crypto.randomUUID();

  c.set("userFingerprint", fingerprint);
  setCookie(c, COOKIE_NAME, fingerprint, {
    httpOnly: true,
    sameSite: "Lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE_SECONDS,
    secure: c.env.NODE_ENV !== "development",
  });

  await next();
});
