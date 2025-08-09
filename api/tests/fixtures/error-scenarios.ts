import type { components } from "../../src/shared/types";
import {
  TypeSafePactumHelper,
  TypeSafeTestHelpers,
} from "../helpers/type-safe-pactum";
import type {
  ConflictErrorResponse,
  ForbiddenErrorResponse,
  InternalServerErrorResponse,
  NotFoundErrorResponse,
  RateLimitErrorResponse,
  UnauthorizedErrorResponse,
  ValidationErrorResponse,
} from "../types/api-error-types";

// 包括的失敗シナリオテストデータ
export const errorScenarios = {
  // レベル1: 入力検証失敗
  validationErrors: [
    {
      description: "Empty question field - 質問フィールドが空",
      endpoint: "/api/quiz/v1/manage/quizzes",
      input: {
        question: "",
        answerType: "boolean",
        solution: { type: "boolean", id: "test-sol", value: true },
      },
      expectedStatus: 400,
      expectedError: "ValidationError",
      expectedFieldErrors: ["question"],
    },
    {
      description: "Invalid answerType - 無効な回答タイプ",
      endpoint: "/api/quiz/v1/manage/quizzes",
      input: {
        question: "Test question?",
        answerType: "invalid_type",
        solution: { type: "boolean", id: "test-sol", value: true },
      },
      expectedStatus: 400,
      expectedError: "ValidationError",
      expectedFieldErrors: ["answerType"],
    },
    {
      description: "Missing required fields - 必須フィールド欠如",
      endpoint: "/api/quiz/v1/manage/quizzes",
      input: {
        answerType: "boolean",
      },
      expectedStatus: 400,
      expectedError: "ValidationError",
      expectedFieldErrors: ["question", "solution"],
    },
    {
      description: "Question too long - 質問が長すぎる",
      endpoint: "/api/quiz/v1/manage/quizzes",
      input: {
        question: "Q".repeat(1001), // 制限を超える長さ
        answerType: "boolean",
        solution: { type: "boolean", id: "test-sol", value: true },
      },
      expectedStatus: 400,
      expectedError: "ValidationError",
      expectedFieldErrors: ["question"],
    },
    {
      description: "Invalid solution structure - 不正なsolution構造",
      endpoint: "/api/quiz/v1/manage/quizzes",
      input: {
        question: "Test question?",
        answerType: "boolean",
        solution: { id: "test-sol" }, // valueが欠如
      },
      expectedStatus: 400,
      expectedError: "ValidationError",
      expectedFieldErrors: ["solution"],
    },
  ],

  // レベル2: ビジネスルール違反
  businessRuleViolations: [
    {
      description: "Quiz not found - クイズが見つからない",
      endpoint: "/api/quiz/v1/manage/quizzes/nonexistent-id",
      method: "GET",
      expectedStatus: 404,
      expectedError: "NotFoundError",
    },
    {
      description: "Forbidden access - 作成者以外のアクセス",
      endpoint: "/api/quiz/v1/manage/quizzes/test-quiz-id",
      method: "PUT",
      headers: { "X-User-Id": "different-user" },
      input: { question: "Updated question?" },
      expectedStatus: 403,
      expectedError: "ForbiddenError",
    },
    {
      description: "Already approved quiz edit - 承認済みクイズの編集",
      endpoint: "/api/quiz/v1/manage/quizzes/approved-quiz-id",
      method: "PUT",
      headers: { "X-User-Id": "creator-user" },
      input: { question: "Updated question?" },
      expectedStatus: 403,
      expectedError: "ForbiddenError",
    },
    {
      description: "Submit already submitted quiz - 既に提出済みクイズの再提出",
      endpoint: "/api/quiz/v1/manage/quizzes/pending-quiz-id/submit",
      method: "POST",
      expectedStatus: 409,
      expectedError: "ConflictError",
    },
    {
      description: "Publish unapproved quiz - 未承認クイズの公開",
      endpoint: "/api/quiz/v1/manage/quizzes/draft-quiz-id/publish",
      method: "POST",
      headers: { "X-User-Role": "admin" },
      expectedStatus: 409,
      expectedError: "ConflictError",
    },
    {
      description: "Non-admin approval attempt - 非管理者による承認試行",
      endpoint: "/api/quiz/v1/manage/quizzes/pending-quiz-id/approve",
      method: "POST",
      headers: { "X-User-Role": "user" },
      input: { reason: "Approved" },
      expectedStatus: 403,
      expectedError: "ForbiddenError",
    },
  ],

  // レベル3: インフラストラクチャ失敗シミュレーション
  infrastructureFailures: [
    {
      description: "Repository create failure - リポジトリ作成失敗",
      endpoint: "/api/quiz/v1/manage/quizzes",
      input: {
        question: "Test question?",
        answerType: "boolean",
        solution: { type: "boolean", id: "test-sol", value: true },
        _simulateRepositoryFailure: "CREATE_FAILED",
      },
      expectedStatus: 500,
      expectedError: "InternalServerError",
    },
    {
      description: "Repository find failure - リポジトリ検索失敗",
      endpoint: "/api/quiz/v1/manage/quizzes/test-quiz-id",
      method: "GET",
      headers: { "_simulate-repository-failure": "FIND_FAILED" },
      expectedStatus: 500,
      expectedError: "InternalServerError",
    },
    {
      description: "Repository update failure - リポジトリ更新失敗",
      endpoint: "/api/quiz/v1/manage/quizzes/test-quiz-id",
      method: "PUT",
      headers: {
        "X-User-Id": "creator-user",
        "_simulate-repository-failure": "UPDATE_FAILED",
      },
      input: { question: "Updated question?" },
      expectedStatus: 500,
      expectedError: "InternalServerError",
    },
    {
      description: "Repository delete failure - リポジトリ削除失敗",
      endpoint: "/api/quiz/v1/manage/quizzes/test-quiz-id",
      method: "DELETE",
      headers: {
        "X-User-Id": "creator-user",
        "_simulate-repository-failure": "DELETE_FAILED",
      },
      expectedStatus: 500,
      expectedError: "InternalServerError",
    },
  ],

  // レベル4: システム失敗シミュレーション
  systemFailures: [
    {
      description: "Rate limit exceeded - レート制限超過",
      endpoint: "/api/quiz/v1/manage/quizzes",
      input: {
        question: "Rate limited question?",
        answerType: "boolean",
        solution: { type: "boolean", id: "test-sol", value: true },
      },
      headers: { "_simulate-rate-limit": "true" },
      expectedStatus: 429,
      expectedError: "RateLimitError",
    },
    {
      description: "Malformed JSON - 不正なJSON",
      endpoint: "/api/quiz/v1/manage/quizzes",
      rawBody: '{"question": "Test", "answerType":}', // 不正なJSON
      expectedStatus: 400,
      expectedError: "JsonParseError",
    },
    {
      description: "Internal server error - 内部サーバーエラー",
      endpoint: "/api/quiz/v1/manage/quizzes",
      input: {
        question: "Test question?",
        answerType: "boolean",
        solution: { type: "boolean", id: "test-sol", value: true },
        _simulateInternalError: true,
      },
      expectedStatus: 500,
      expectedError: "InternalServerError",
    },
  ],

  // ワークフローベースの失敗シナリオ
  workflowFailures: [
    {
      description: "Invalid quiz ID format - 無効なクイズID形式",
      endpoint: "/api/quiz/v1/manage/quizzes/invalid-id-format!@#",
      method: "GET",
      expectedStatus: 400,
      expectedError: "ValidationError",
    },
    {
      description:
        "Empty body for required endpoint - 必須エンドポイントに空ボディ",
      endpoint: "/api/quiz/v1/manage/quizzes",
      input: {},
      expectedStatus: 400,
      expectedError: "ValidationError",
    },
    {
      description: "Delete non-existent quiz - 存在しないクイズの削除",
      endpoint: "/api/quiz/v1/manage/quizzes/non-existent-quiz",
      method: "DELETE",
      headers: { "X-User-Id": "any-user" },
      expectedStatus: 404,
      expectedError: "NotFoundError",
    },
  ],
};

// 型安全なエラーレスポンス構造検証ヘルパー
export const errorResponseValidators = {
  validateValidationError: (response: unknown): ValidationErrorResponse => {
    const error = TypeSafePactumHelper.assertErrorResponse(response, 400);
    TypeSafeTestHelpers.expectErrorStructure(error);
    TypeSafeTestHelpers.expectErrorMessagePattern(error);
    return error;
  },

  validateNotFoundError: (response: unknown): NotFoundErrorResponse => {
    const error = TypeSafePactumHelper.assertErrorResponse(response, 404);
    TypeSafeTestHelpers.expectErrorStructure(error);
    expect(error.message).toBe("Resource not found");
    return error;
  },

  validateForbiddenError: (response: unknown): ForbiddenErrorResponse => {
    const error = TypeSafePactumHelper.assertErrorResponse(response, 403);
    TypeSafeTestHelpers.expectErrorStructure(error);
    expect(error.message).toBe("Forbidden operation");
    return error;
  },

  validateConflictError: (response: unknown): ConflictErrorResponse => {
    const error = TypeSafePactumHelper.assertErrorResponse(response, 409);
    TypeSafeTestHelpers.expectErrorStructure(error);
    expect(error.message).toBe("Resource conflict");
    return error;
  },

  validateRateLimitError: (response: unknown): RateLimitErrorResponse => {
    const error = TypeSafePactumHelper.assertErrorResponse(response, 429);
    TypeSafeTestHelpers.expectErrorStructure(error);
    expect(error.message).toBe("Rate limit exceeded");
    return error;
  },

  validateInternalServerError: (
    response: unknown,
  ): InternalServerErrorResponse => {
    const error = TypeSafePactumHelper.assertErrorResponse(response, 500);
    TypeSafeTestHelpers.expectErrorStructure(error);
    expect(error.message).toBe("Internal server error");
    return error;
  },

  validateUnauthorizedError: (response: unknown): UnauthorizedErrorResponse => {
    const error = TypeSafePactumHelper.assertErrorResponse(response, 401);
    TypeSafeTestHelpers.expectErrorStructure(error);
    expect(error.message).toBe("Unauthorized access");
    return error;
  },

  // JSONパースエラーは通常ValidationErrorとして処理される
  validateJsonParseError: (response: unknown): ValidationErrorResponse => {
    const error = TypeSafePactumHelper.assertErrorResponse(response, 400);
    TypeSafeTestHelpers.expectErrorStructure(error);
    expect(error.message).toMatch(/parse|json|syntax/i);
    return error;
  },
};

// テスト環境用のモックデータ
export const mockQuizData = {
  validQuiz: {
    id: "test-quiz-id",
    question: "Is this a test question?",
    answerType: "boolean" as components["schemas"]["AnswerType"],
    solutionId: "test-solution-id",
    status: "draft" as components["schemas"]["QuizStatus"],
    creatorId: "creator-user",
    createdAt: new Date().toISOString(),
  },

  pendingQuiz: {
    id: "pending-quiz-id",
    question: "Is this pending approval?",
    answerType: "boolean" as components["schemas"]["AnswerType"],
    solutionId: "pending-solution-id",
    status: "pending_approval" as components["schemas"]["QuizStatus"],
    creatorId: "creator-user",
    createdAt: new Date().toISOString(),
  },

  approvedQuiz: {
    id: "approved-quiz-id",
    question: "Is this approved?",
    answerType: "boolean" as components["schemas"]["AnswerType"],
    solutionId: "approved-solution-id",
    status: "approved" as components["schemas"]["QuizStatus"],
    creatorId: "creator-user",
    createdAt: new Date().toISOString(),
    approvedAt: new Date().toISOString(),
  },
};
