import { describe, expect, it } from "vitest";
import type { CloudflareBindings } from "../../../../shared/types";
import { canModerate } from "./moderation-policy";

const createMockEnv = (
  overrides: Partial<CloudflareBindings> = {},
): CloudflareBindings => ({
  NODE_ENV: "development",
  DB: {} as D1Database,
  ASSETS: {} as Fetcher,
  ...overrides,
});

describe("moderation-policy", () => {
  describe("canModerate", () => {
    it.each([
      ["development", true],
      ["test", true],
      ["staging", true],
      ["production", false],
    ])("NODE_ENV=%s のとき %s を返す", (nodeEnv, expected) => {
      const env = createMockEnv({ NODE_ENV: nodeEnv });

      expect(canModerate(env)).toBe(expected);
    });

    // ADR-0029のリスク表「NODE_ENVの判定漏れにより本番でモデレーションAPIが
    // 開いてしまう」対策として、許可リスト方式(fail-closed)であることを検証する。
    // `!== "production"`という否定形の判定だとこれらは全てtrue(全開放)になる。
    it.each([
      ["undefined相当の空文字", ""],
      ["先頭大文字違い", "Production"],
      ["全て大文字", "PRODUCTION"],
      ["略記のtypo", "prod"],
      ["末尾空白混入", "development "],
      ["完全に未知の値", "unknown"],
    ])(
      "想定外のNODE_ENV(%s: %j)はfalseを返す(fail-closed)",
      (_label, nodeEnv) => {
        const env = createMockEnv({ NODE_ENV: nodeEnv });

        expect(canModerate(env)).toBe(false);
      },
    );
  });
});
