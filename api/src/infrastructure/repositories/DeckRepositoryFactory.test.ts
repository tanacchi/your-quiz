import { describe, expect, it } from "vitest";
import { D1DeckRepository } from "../../contexts/quiz-learning/infrastructure/repositories/D1DeckRepository";
import { MockDeckRepository } from "../../contexts/quiz-learning/infrastructure/repositories/MockDeckRepository";
import type { CloudflareBindings } from "../../shared/types";
import { createDeckRepository } from "./DeckRepositoryFactory";

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

describe("createDeckRepository", () => {
  const testCases = [
    {
      description: "テスト環境ではMockDeckRepositoryを返す",
      env: createMockEnv({ NODE_ENV: "test" }),
      expectedType: MockDeckRepository,
    },
    {
      description: "本番環境でUSE_MOCK_DB未設定の場合D1DeckRepositoryを返す",
      env: createMockEnv({ NODE_ENV: "production" }),
      expectedType: D1DeckRepository,
    },
    {
      description: "開発環境でUSE_MOCK_DB=falseの場合D1DeckRepositoryを返す",
      env: createMockEnv({ NODE_ENV: "development", USE_MOCK_DB: "false" }),
      expectedType: D1DeckRepository,
    },
  ];

  testCases.forEach(({ description, env, expectedType }) => {
    it(description, () => {
      const repository = createDeckRepository(env);
      expect(repository).toBeInstanceOf(expectedType);
    });
  });
});
