// Quiz Write Operations test data for PactumJS specs (issue #46)

const BASE_URL = "/api/quiz/v1/manage/quizzes";

/** POST /quizzes の最小有効ペイロードを生成する（question以外は固定） */
export const buildCreateQuizPayload = (
  overrides: { question?: string; isDraft?: boolean } = {},
) => ({
  question: overrides.question ?? "Is TypeScript strongly typed?",
  answerType: "boolean" as const,
  solution: { type: "boolean" as const, value: true },
  explanation: "TypeScript provides static type checking.",
  ...(overrides.isDraft !== undefined && { isDraft: overrides.isDraft }),
});

export const quizWriteEndpoints = {
  base: BASE_URL,
  byId: (id: string) => `${BASE_URL}/${id}`,
  submit: (id: string) => `${BASE_URL}/${id}/submit`,
  approve: (id: string) => `${BASE_URL}/${id}/approve`,
  reject: (id: string) => `${BASE_URL}/${id}/reject`,
  publish: (id: string) => `${BASE_URL}/${id}/publish`,
};

/** 存在しないクイズIDに対する404テストのシナリオ一覧 */
export const notFoundScenarios = [
  { description: "PATCH", method: "PATCH", pathSuffix: "" },
  { description: "DELETE", method: "DELETE", pathSuffix: "" },
  { description: "submit", method: "POST", pathSuffix: "/submit" },
  { description: "approve", method: "POST", pathSuffix: "/approve" },
  { description: "reject", method: "POST", pathSuffix: "/reject" },
  { description: "publish", method: "POST", pathSuffix: "/publish" },
] as const;
