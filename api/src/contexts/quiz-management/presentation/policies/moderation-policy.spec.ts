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
  });
});
