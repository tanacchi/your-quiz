import { spec } from "pactum";

// Quiz API Helper Functions - クイズAPI共通ヘルパー関数
// Uses ユビキタス言語 (Ubiquitous Language): Quiz, Creator, AnonymousUser

// データベース初期化・クリーンアップ
export async function clearAllQuizzes(): Promise<void> {
  await spec().delete("/test/quizzes/all").expectStatus(200);
}

// クイズ作成ヘルパー
export async function createQuiz(quizData: unknown): Promise<unknown> {
  const response = await spec()
    .post("/api/quiz/v1/manage/quizzes")
    .withJson(quizData)
    .expectStatus(201);

  return response.json;
}

// クイズ取得ヘルパー
export async function getQuizById(quizId: string): Promise<unknown> {
  const response = await spec()
    .get(`/api/quiz/v1/manage/quizzes/${quizId}`)
    .expectStatus(200);

  return response.json;
}

// クイズリスト取得ヘルパー
export async function getQuizList(
  queryParams: Record<string, unknown> = {},
): Promise<unknown> {
  const response = await spec()
    .get("/api/quiz/v1/manage/quizzes")
    .withQueryParams(queryParams)
    .expectStatus(200);

  return response.json;
}

// Test data作成ヘルパー
export async function createTestQuiz(
  quizId: string,
  _question?: string,
  status: string = "Approved",
  solutionType: string = "boolean",
): Promise<unknown> {
  const testQuizData = {
    question: `Test question for ${quizId}`,
    options: ["True", "False"],
    solution: getSampleSolutionForType(solutionType),
    tags: [`test-tag-${quizId}`],
    status,
    solutionType,
  };

  return createQuiz(testQuizData);
}

// Solution type別サンプルデータ生成
export function getSampleSolutionForType(solutionType: string): unknown {
  switch (solutionType) {
    case "boolean":
      return true;
    case "multiple_choice":
      return "A";
    case "single_choice":
      return 0;
    case "short_answer":
      return "Sample answer";
    case "long_answer":
      return "This is a sample long answer with multiple sentences.";
    default:
      return null;
  }
}

// バリデーション関数群
// エラーレスポンス検証
export function validateErrorResponse(
  responseBody: Record<string, unknown>,
  expectedErrorType: string,
): void {
  expect(responseBody).toHaveProperty("error");
  expect(responseBody).toHaveProperty("message");
  const errorBody = responseBody as { error: string; message: string };
  expect(errorBody.error).toBe(expectedErrorType);
  expect(typeof errorBody.message).toBe("string");
  expect(errorBody.message.length).toBeGreaterThan(0);
}

// QuizWithSolution レスポンス検証
export function validateQuizWithSolution(
  responseBody: Record<string, unknown>,
  expectedSolutionType?: string,
): void {
  expect(responseBody).toHaveProperty("id");
  expect(responseBody).toHaveProperty("question");
  expect(responseBody).toHaveProperty("options");
  expect(responseBody).toHaveProperty("solution");
  expect(responseBody).toHaveProperty("solutionType");

  if (expectedSolutionType) {
    const quizBody = responseBody as { solutionType: string };
    expect(quizBody.solutionType).toBe(expectedSolutionType);
  }
}

// QuizListResponse検証
export function validateQuizListResponse(
  responseBody: Record<string, unknown>,
): void {
  expect(responseBody).toHaveProperty("quizzes");
  expect(responseBody).toHaveProperty("pagination");

  const listBody = responseBody as {
    quizzes: unknown[];
    pagination: Record<string, unknown>;
  };

  expect(Array.isArray(listBody.quizzes)).toBe(true);
  expect(listBody.pagination).toHaveProperty("total");
  expect(listBody.pagination).toHaveProperty("page");
  expect(listBody.pagination).toHaveProperty("limit");
  expect(listBody.pagination).toHaveProperty("hasNext");
  expect(listBody.pagination).toHaveProperty("hasPrevious");
}
