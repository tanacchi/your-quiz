import { Hono } from "hono";
import { describe, expect, it } from "vitest";
import { z } from "zod";
import type { AppEnv, CloudflareBindings } from "../shared/types";
import { anonymousSession } from "./anonymousSession";

const UUID_V4_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// テスト用エコーエンドポイントのレスポンススキーマ
const echoResponseSchema = z.object({ userFingerprint: z.string() });

// モックDB環境変数のテストヘルパー（QuizRepositoryFactory.test.tsのパターンを踏襲）
const createMockEnv = (
  overrides: Partial<CloudflareBindings> = {},
): CloudflareBindings => {
  const baseEnv: CloudflareBindings = {
    NODE_ENV: "development",
    DB: {} as D1Database,
    ASSETS: {} as Fetcher,
  };

  return { ...baseEnv, ...overrides };
};

// ミドルウェア単体を検証するための最小テストアプリ
const createTestApp = (): Hono<AppEnv> => {
  const app = new Hono<AppEnv>();
  app.use("*", anonymousSession);
  app.get("/echo", (c) => c.json({ userFingerprint: c.var.userFingerprint }));
  return app;
};

describe("anonymousSession", () => {
  describe("Cookie / Authorizationヘッダーが無い場合", () => {
    it("新規UUID v4を発行しc.var.userFingerprintにセットする", async () => {
      const app = createTestApp();
      const req = new Request("http://localhost/echo");

      const res = await app.request(req, {}, createMockEnv());
      const body = echoResponseSchema.parse(await res.json());

      expect(res.status).toBe(200);
      expect(body.userFingerprint).toMatch(UUID_V4_PATTERN);
    });

    it("発行したuserFingerprintをSet-CookieヘッダーでCookie名quiz_fingerprintとして返す", async () => {
      const app = createTestApp();
      const req = new Request("http://localhost/echo");

      const res = await app.request(req, {}, createMockEnv());
      const body = echoResponseSchema.parse(await res.json());
      const setCookie = res.headers.get("set-cookie");

      expect(setCookie).not.toBeNull();
      expect(setCookie).toContain(`quiz_fingerprint=${body.userFingerprint}`);
    });
  });

  describe("有効なCookieがある場合", () => {
    it("既存の値を維持しSet-Cookieで同じ値を再発行する", async () => {
      const app = createTestApp();
      const existingValue = "11111111-1111-4111-8111-111111111111";
      const req = new Request("http://localhost/echo", {
        headers: { Cookie: `quiz_fingerprint=${existingValue}` },
      });

      const res = await app.request(req, {}, createMockEnv());
      const body = echoResponseSchema.parse(await res.json());

      expect(body.userFingerprint).toBe(existingValue);
      expect(res.headers.get("set-cookie")).toContain(
        `quiz_fingerprint=${existingValue}`,
      );
    });
  });

  describe("不正なCookie値がある場合", () => {
    it("UUID v4でない値は新しいUUID v4に置き換える", async () => {
      const app = createTestApp();
      const req = new Request("http://localhost/echo", {
        headers: { Cookie: "quiz_fingerprint=not-a-uuid" },
      });

      const res = await app.request(req, {}, createMockEnv());
      const body = echoResponseSchema.parse(await res.json());

      expect(body.userFingerprint).toMatch(UUID_V4_PATTERN);
      expect(body.userFingerprint).not.toBe("not-a-uuid");
    });
  });

  describe("Authorizationヘッダーがある場合", () => {
    it("Fingerprintスキーム + 有効なUUID v4はその値を採用しCookieを発行しない", async () => {
      const app = createTestApp();
      const headerValue = "22222222-2222-4222-8222-222222222222";
      const req = new Request("http://localhost/echo", {
        headers: { Authorization: `Fingerprint ${headerValue}` },
      });

      const res = await app.request(req, {}, createMockEnv());
      const body = echoResponseSchema.parse(await res.json());

      expect(body.userFingerprint).toBe(headerValue);
      expect(res.headers.get("set-cookie")).toBeNull();
    });

    it("スキームがFingerprint以外の場合はCookie/新規発行にフォールバックする", async () => {
      const app = createTestApp();
      const req = new Request("http://localhost/echo", {
        headers: {
          Authorization: "Bearer 33333333-3333-4333-8333-333333333333",
        },
      });

      const res = await app.request(req, {}, createMockEnv());
      const body = echoResponseSchema.parse(await res.json());

      expect(body.userFingerprint).toMatch(UUID_V4_PATTERN);
      expect(res.headers.get("set-cookie")).not.toBeNull();
    });

    it("値がUUID v4形式でない場合はCookie/新規発行にフォールバックする", async () => {
      const app = createTestApp();
      const req = new Request("http://localhost/echo", {
        headers: { Authorization: "Fingerprint not-a-uuid" },
      });

      const res = await app.request(req, {}, createMockEnv());
      const body = echoResponseSchema.parse(await res.json());

      expect(body.userFingerprint).toMatch(UUID_V4_PATTERN);
    });
  });

  describe("Cookie発行時のSecure属性", () => {
    const testCases = [
      {
        description:
          "development環境ではSecure属性を付与しない（http動作のため）",
        nodeEnv: "development",
        expectSecure: false,
      },
      {
        description: "production環境ではSecure属性を付与する",
        nodeEnv: "production",
        expectSecure: true,
      },
      {
        description: "test環境ではSecure属性を付与する",
        nodeEnv: "test",
        expectSecure: true,
      },
    ];

    testCases.forEach(({ description, nodeEnv, expectSecure }) => {
      it(description, async () => {
        const app = createTestApp();
        const req = new Request("http://localhost/echo");

        const res = await app.request(
          req,
          {},
          createMockEnv({ NODE_ENV: nodeEnv }),
        );
        const setCookie = res.headers.get("set-cookie") ?? "";

        if (expectSecure) {
          expect(setCookie).toContain("Secure");
        } else {
          expect(setCookie).not.toContain("Secure");
        }
      });
    });
  });
});
