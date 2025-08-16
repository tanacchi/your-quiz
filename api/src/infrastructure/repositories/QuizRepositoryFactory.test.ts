import { describe, expect, it } from "vitest";
import { D1QuizRepository } from "../../contexts/quiz-management/infrastructure/repositories/D1QuizRepository";
import { MockQuizRepository } from "../../contexts/quiz-management/infrastructure/repositories/MockQuizRepository";
import type { CloudflareBindings } from "../../shared/types";
import { createQuizRepository, shouldUseMock } from "./QuizRepositoryFactory";

// モックDB環境変数のテストヘルパー
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

describe("shouldUseMock", () => {
  // Parameterized test cases for shouldUseMock
  const testCases = [
    {
      description: "テスト環境では常にtrue",
      env: createMockEnv({ NODE_ENV: "test" }),
      expected: true,
    },
    {
      description: "USE_MOCK_DBがtrueの場合はtrue",
      env: createMockEnv({ NODE_ENV: "production", USE_MOCK_DB: "true" }),
      expected: true,
    },
    {
      description: "開発環境でUSE_MOCK_DBが未設定の場合はtrue（デフォルト）",
      env: createMockEnv({ NODE_ENV: "development" }),
      expected: true,
    },
    {
      description: "開発環境でUSE_MOCK_DBがfalseの場合はfalse",
      env: createMockEnv({ NODE_ENV: "development", USE_MOCK_DB: "false" }),
      expected: false,
    },
    {
      description: "本番環境でUSE_MOCK_DBが未設定の場合はfalse",
      env: createMockEnv({ NODE_ENV: "production" }),
      expected: false,
    },
    {
      description: "本番環境でUSE_MOCK_DBがfalseの場合はfalse",
      env: createMockEnv({ NODE_ENV: "production", USE_MOCK_DB: "false" }),
      expected: false,
    },
  ];

  testCases.forEach(({ description, env, expected }) => {
    it(description, () => {
      expect(shouldUseMock(env)).toBe(expected);
    });
  });
});

describe("createQuizRepository", () => {
  // Parameterized test cases for createQuizRepository
  const repositoryTestCases = [
    {
      description: "テスト環境ではMockQuizRepositoryを返す",
      env: createMockEnv({ NODE_ENV: "test" }),
      expectedType: MockQuizRepository,
    },
    {
      description: "USE_MOCK_DB=trueの場合MockQuizRepositoryを返す",
      env: createMockEnv({ NODE_ENV: "production", USE_MOCK_DB: "true" }),
      expectedType: MockQuizRepository,
    },
    {
      description: "開発環境でUSE_MOCK_DB未設定の場合MockQuizRepositoryを返す",
      env: createMockEnv({ NODE_ENV: "development" }),
      expectedType: MockQuizRepository,
    },
    {
      description: "開発環境でUSE_MOCK_DB=falseの場合D1QuizRepositoryを返す",
      env: createMockEnv({ NODE_ENV: "development", USE_MOCK_DB: "false" }),
      expectedType: D1QuizRepository,
    },
    {
      description: "本番環境でUSE_MOCK_DB未設定の場合D1QuizRepositoryを返す",
      env: createMockEnv({ NODE_ENV: "production" }),
      expectedType: D1QuizRepository,
    },
    {
      description: "本番環境でUSE_MOCK_DB=falseの場合D1QuizRepositoryを返す",
      env: createMockEnv({ NODE_ENV: "production", USE_MOCK_DB: "false" }),
      expectedType: D1QuizRepository,
    },
  ];

  repositoryTestCases.forEach(({ description, env, expectedType }) => {
    it(description, () => {
      const repository = createQuizRepository(env);
      expect(repository).toBeInstanceOf(expectedType);
    });
  });
});

describe("Integration: shouldUseMock and createQuizRepository consistency", () => {
  // Integration test to ensure shouldUseMock and createQuizRepository are consistent
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
    it(`NODE_ENV=${NODE_ENV}, USE_MOCK_DB=${USE_MOCK_DB ?? "undefined"}: shouldUseMockとcreateQuizRepositoryの結果が一致する`, () => {
      const mockEnv = createMockEnv({
        NODE_ENV,
        ...(USE_MOCK_DB !== undefined && { USE_MOCK_DB }),
      });
      const useMock = shouldUseMock(mockEnv);
      const repository = createQuizRepository(mockEnv);

      if (useMock) {
        expect(repository).toBeInstanceOf(MockQuizRepository);
      } else {
        expect(repository).toBeInstanceOf(D1QuizRepository);
      }
    });
  });
});
