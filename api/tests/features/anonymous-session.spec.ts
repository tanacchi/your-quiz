import { spec } from "pactum";

// Anonymous Session BDD Tests - 匿名セッションBDDテスト
// issue #44 / ADR-0026: Cookie + UUID v4 + Hono middleware + 遅延解決
// Endpoint: すべての API リクエスト（ここでは D1 非依存の /health を利用）
//
// dev-mock env（D1バインディングなし・USE_MOCK_DB=true）で動作するため、
// D1 に依存しないシナリオのみをカバーする。UserIdentity 永続化の検証は
// 後続 PR（resolveUserIdentity 実装後）で追加する。

const COOKIE_NAME = "quiz_fingerprint";
const UUID_V4_PATTERN =
  /[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i;

function extractCookieValue(setCookieHeader: unknown): string | null {
  const raw = Array.isArray(setCookieHeader)
    ? setCookieHeader.join(";")
    : String(setCookieHeader ?? "");
  const match = raw.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  return match?.[1] ?? null;
}

describe("匿名セッションミドルウェア: Anonymous session middleware", () => {
  it("Cookie無しでアクセスすると新規UUID v4がSet-Cookieで発行される", async () => {
    // Given: Cookie を持たないクライアント

    // When: ヘルスチェックエンドポイントにアクセス
    const response = await spec().get("/health").expectStatus(200);

    // Then: Set-Cookie ヘッダに quiz_fingerprint=<UUID v4> が含まれる
    const cookieValue = extractCookieValue(response.headers["set-cookie"]);
    expect(cookieValue).not.toBeNull();
    expect(cookieValue).toMatch(UUID_V4_PATTERN);
  });

  it("発行されたCookieを再送すると同じ値が維持される", async () => {
    // Given: 一度目のリクエストで発行された Cookie
    const firstResponse = await spec().get("/health").expectStatus(200);
    const issuedValue = extractCookieValue(firstResponse.headers["set-cookie"]);
    expect(issuedValue).not.toBeNull();

    // When: 同じ Cookie 値を送って再アクセス
    const secondResponse = await spec()
      .get("/health")
      .withCookies(COOKIE_NAME, issuedValue as string)
      .expectStatus(200);

    // Then: 応答される Set-Cookie も同じ値を維持している
    const reissuedValue = extractCookieValue(
      secondResponse.headers["set-cookie"],
    );
    expect(reissuedValue).toBe(issuedValue);
  });

  it("不正なCookie値を送ると新しいUUID v4に置き換わる", async () => {
    // Given: UUID v4 として不正な Cookie 値
    const invalidValue = "not-a-uuid";

    // When: 不正な Cookie を送ってアクセス
    const response = await spec()
      .get("/health")
      .withCookies(COOKIE_NAME, invalidValue)
      .expectStatus(200);

    // Then: 新しい UUID v4 が発行され、元の不正値とは異なる
    const reissuedValue = extractCookieValue(response.headers["set-cookie"]);
    expect(reissuedValue).not.toBeNull();
    expect(reissuedValue).toMatch(UUID_V4_PATTERN);
    expect(reissuedValue).not.toBe(invalidValue);
  });

  it("Authorizationヘッダーを送るとCookieは発行されない", async () => {
    // Given: Authorization: Fingerprint <uuid> ヘッダー
    const headerFingerprint = "11111111-1111-4111-8111-111111111111";

    // When: Authorization ヘッダー付きでアクセス
    const response = await spec()
      .get("/health")
      .withHeaders("Authorization", `Fingerprint ${headerFingerprint}`)
      .expectStatus(200);

    // Then: ヘッダー由来の識別子が採用され、Set-Cookie は返らない
    expect(response.headers["set-cookie"]).toBeUndefined();
  });
});
