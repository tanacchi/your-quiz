import { describe, expect, it } from "vitest";
import { D1AttemptQueryRepository } from "../../contexts/quiz-learning/infrastructure/repositories/D1AttemptQueryRepository";
import { MockAttemptQueryRepository } from "../../contexts/quiz-learning/infrastructure/repositories/MockAttemptQueryRepository";
import type { CloudflareBindings } from "../../shared/types";
import { createAttemptQueryRepository } from "./AttemptQueryRepositoryFactory";

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

describe("createAttemptQueryRepository", () => {
  const testCases = [
    {
      description: "テスト環境ではMockAttemptQueryRepositoryを返す",
      env: createMockEnv({ NODE_ENV: "test" }),
      expectedType: MockAttemptQueryRepository,
    },
    {
      description:
        "本番環境でUSE_MOCK_DB未設定の場合D1AttemptQueryRepositoryを返す",
      env: createMockEnv({ NODE_ENV: "production" }),
      expectedType: D1AttemptQueryRepository,
    },
  ];

  testCases.forEach(({ description, env, expectedType }) => {
    it(description, () => {
      const repository = createAttemptQueryRepository(env);
      expect(repository).toBeInstanceOf(expectedType);
    });
  });
});
