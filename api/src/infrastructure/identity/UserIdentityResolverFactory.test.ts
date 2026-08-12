import { describe, expect, it } from "vitest";
import type { CloudflareBindings } from "../../shared/types";
import { D1UserIdentityResolver } from "./D1UserIdentityResolver";
import { MockUserIdentityResolver } from "./MockUserIdentityResolver";
import { createUserIdentityResolver } from "./UserIdentityResolverFactory";

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

describe("createUserIdentityResolver", () => {
  const testCases = [
    {
      description: "テスト環境ではMockUserIdentityResolverを返す",
      env: createMockEnv({ NODE_ENV: "test" }),
      expectedType: MockUserIdentityResolver,
    },
    {
      description:
        "本番環境でUSE_MOCK_DB未設定の場合D1UserIdentityResolverを返す",
      env: createMockEnv({ NODE_ENV: "production" }),
      expectedType: D1UserIdentityResolver,
    },
    {
      description:
        "開発環境でUSE_MOCK_DB=falseの場合D1UserIdentityResolverを返す",
      env: createMockEnv({ NODE_ENV: "development", USE_MOCK_DB: "false" }),
      expectedType: D1UserIdentityResolver,
    },
  ];

  testCases.forEach(({ description, env, expectedType }) => {
    it(description, () => {
      const resolver = createUserIdentityResolver(env);
      expect(resolver).toBeInstanceOf(expectedType);
    });
  });
});
