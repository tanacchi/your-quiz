import type { spec } from "pactum";

/**
 * 匿名ユーザー識別子（fingerprint）をAuthorizationヘッダーとして付与する。
 *
 * `Authorization: Fingerprint <uuid>` 形式（ADR-0026）。BDDテストでは
 * Cookieベースの識別（ブラウザ挙動の再現）ではなく、`it` ごとに独立した
 * fingerprintを明示指定することでテスト間の状態汚染を避ける。
 */
export function withFingerprint(
  pactumSpec: ReturnType<typeof spec>,
  fingerprint: string,
): ReturnType<typeof spec> {
  return pactumSpec.withHeaders("Authorization", `Fingerprint ${fingerprint}`);
}

/** BDDの各itで一意なfingerprint（UUID v4）を発行する */
export function newFingerprint(): string {
  return crypto.randomUUID();
}
