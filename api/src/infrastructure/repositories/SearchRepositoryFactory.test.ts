import { describe, expect, it } from "vitest";
import { D1SearchRepository } from "../../contexts/search/infrastructure/repositories/D1SearchRepository";
import { MockSearchRepository } from "../../contexts/search/infrastructure/repositories/MockSearchRepository";
import type { CloudflareBindings } from "../../shared/types";
import { shouldUseMock } from "./QuizRepositoryFactory";
import { createSearchRepository } from "./SearchRepositoryFactory";

// QuizRepositoryFactory.test.ts と同じ方針のテストヘルパー
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

describe("createSearchRepository", () => {
  // shouldUseMock（QuizRepositoryFactoryからexport済み）を再利用しているため、
  // 判定結果はQuizRepositoryFactoryのテストケースと完全に一致するはず
  const repositoryTestCases = [
    {
      description: "テスト環境ではMockSearchRepositoryを返す",
      env: createMockEnv({ NODE_ENV: "test" }),
      expectedType: MockSearchRepository,
    },
    {
      description: "USE_MOCK_DB=trueの場合MockSearchRepositoryを返す",
      env: createMockEnv({ NODE_ENV: "production", USE_MOCK_DB: "true" }),
      expectedType: MockSearchRepository,
    },
    {
      description:
        "開発環境でUSE_MOCK_DB未設定の場合MockSearchRepositoryを返す",
      env: createMockEnv({ NODE_ENV: "development" }),
      expectedType: MockSearchRepository,
    },
    {
      description: "開発環境でUSE_MOCK_DB=falseの場合D1SearchRepositoryを返す",
      env: createMockEnv({ NODE_ENV: "development", USE_MOCK_DB: "false" }),
      expectedType: D1SearchRepository,
    },
    {
      description: "本番環境でUSE_MOCK_DB未設定の場合D1SearchRepositoryを返す",
      env: createMockEnv({ NODE_ENV: "production" }),
      expectedType: D1SearchRepository,
    },
    {
      description: "本番環境でUSE_MOCK_DB=falseの場合D1SearchRepositoryを返す",
      env: createMockEnv({ NODE_ENV: "production", USE_MOCK_DB: "false" }),
      expectedType: D1SearchRepository,
    },
  ];

  repositoryTestCases.forEach(({ description, env, expectedType }) => {
    it(description, () => {
      const repository = createSearchRepository(env);
      expect(repository).toBeInstanceOf(expectedType);
    });
  });
});

describe("Integration: shouldUseMock and createSearchRepository consistency", () => {
  const integrationTestCases = [
    { NODE_ENV: "test" as const },
    { NODE_ENV: "test" as const, USE_MOCK_DB: "true" },
    { NODE_ENV: "test" as const, USE_MOCK_DB: "false" },
    { NODE_ENV: "development" as const },
    { NODE_ENV: "development" as const, USE_MOCK_DB: "true" },
    { NODE_ENV: "development" as const, USE_MOCK_DB: "false" },
    { NODE_ENV: "production" as const },
    { NODE_ENV: "production" as const, USE_MOCK_DB: "true" },
    { NODE_ENV: "production" as const, USE_MOCK_DB: "false" },
  ];

  integrationTestCases.forEach(({ NODE_ENV, USE_MOCK_DB }) => {
    it(`NODE_ENV=${NODE_ENV}, USE_MOCK_DB=${USE_MOCK_DB ?? "undefined"}: shouldUseMockとcreateSearchRepositoryの結果が一致する`, () => {
      const mockEnv = createMockEnv({
        NODE_ENV,
        ...(USE_MOCK_DB !== undefined && { USE_MOCK_DB }),
      });
      const useMock = shouldUseMock(mockEnv);
      const repository = createSearchRepository(mockEnv);

      if (useMock) {
        expect(repository).toBeInstanceOf(MockSearchRepository);
      } else {
        expect(repository).toBeInstanceOf(D1SearchRepository);
      }
    });
  });
});
