/**
 * D1データベースのクエリ結果の型定義
 */

/**
 * D1クエリのパラメータ型
 */
export type D1QueryParam = string | number | boolean | null;

/**
 * クイズ関連のD1行データ型
 */
export interface QuizRow {
  id: string;
  question: string;
  answer_type: string;
  solution_id: string;
  explanation?: string;
  status: string;
  creator_id: string;
  created_at: string;
  approved_at?: string;
  // ソリューション関連のフィールド
  boolean_value?: boolean;
  correct_answer?: string;
  matching_strategy?: string;
  case_sensitive?: boolean;
  choices?: string;
  min_correct_answers?: number;
}

/**
 * D1の COUNT クエリ結果型
 */
export interface CountResult {
  total: number;
}

/**
 * 基本的なクイズ情報（削除時に使用）
 */
export interface BasicQuizInfo {
  id: string;
  solution_id: string;
  answer_type: string;
}

/**
 * JSON.parse後の選択肢データ型
 */
export interface ParsedChoice {
  id: string;
  solutionId: string;
  text: string;
  orderIndex: number;
  isCorrect: boolean;
}

/**
 * 型ガード関数群とヘルパー関数
 */

/**
 * Record<string, unknown>から安全にプロパティを取得
 */
function getProperty(obj: Record<string, unknown>, key: string): unknown {
  return Object.hasOwn(obj, key) ? obj[key] : undefined;
}

/**
 * D1クエリ結果がQuizRowの形式かチェック
 */
export function isQuizRow(data: unknown): data is QuizRow {
  if (!data || typeof data !== "object") {
    return false;
  }

  const row = data as Record<string, unknown>;

  return (
    typeof getProperty(row, "id") === "string" &&
    typeof getProperty(row, "question") === "string" &&
    typeof getProperty(row, "answer_type") === "string" &&
    typeof getProperty(row, "solution_id") === "string" &&
    typeof getProperty(row, "status") === "string" &&
    typeof getProperty(row, "creator_id") === "string" &&
    typeof getProperty(row, "created_at") === "string" &&
    (getProperty(row, "explanation") === undefined ||
      typeof getProperty(row, "explanation") === "string") &&
    (getProperty(row, "approved_at") === undefined ||
      typeof getProperty(row, "approved_at") === "string")
  );
}

/**
 * D1クエリ結果がCountResultの形式かチェック
 */
export function isCountResult(data: unknown): data is CountResult {
  if (!data || typeof data !== "object") {
    return false;
  }

  const result = data as Record<string, unknown>;
  return typeof getProperty(result, "total") === "number";
}

/**
 * D1クエリ結果がBasicQuizInfoの形式かチェック
 */
export function isBasicQuizInfo(data: unknown): data is BasicQuizInfo {
  if (!data || typeof data !== "object") {
    return false;
  }

  const info = data as Record<string, unknown>;

  return (
    typeof getProperty(info, "id") === "string" &&
    typeof getProperty(info, "solution_id") === "string" &&
    typeof getProperty(info, "answer_type") === "string"
  );
}

/**
 * ParsedChoiceの配列かチェック
 */
export function isParsedChoiceArray(data: unknown): data is ParsedChoice[] {
  if (!Array.isArray(data)) {
    return false;
  }

  return data.every((item) => isParsedChoice(item));
}

/**
 * ParsedChoiceかチェック
 */
export function isParsedChoice(data: unknown): data is ParsedChoice {
  if (!data || typeof data !== "object") {
    return false;
  }

  const choice = data as Record<string, unknown>;

  return (
    typeof getProperty(choice, "id") === "string" &&
    typeof getProperty(choice, "solutionId") === "string" &&
    typeof getProperty(choice, "text") === "string" &&
    typeof getProperty(choice, "orderIndex") === "number" &&
    typeof getProperty(choice, "isCorrect") === "boolean"
  );
}

/**
 * 有効なanswerTypeかチェック
 */
export function isValidAnswerType(
  value: string,
): value is "boolean" | "free_text" | "single_choice" | "multiple_choice" {
  return ["boolean", "free_text", "single_choice", "multiple_choice"].includes(
    value,
  );
}

/**
 * 有効なQuizStatusかチェック
 */
export function isValidQuizStatus(
  value: string,
): value is "pending_approval" | "approved" | "rejected" {
  return ["pending_approval", "approved", "rejected"].includes(value);
}

/**
 * 有効なMatchingStrategyかチェック
 */
export function isValidMatchingStrategy(
  value: string,
): value is "exact" | "partial" | "regex" {
  return ["exact", "partial", "regex"].includes(value);
}

/**
 * 型変換ヘルパー関数群
 */

/**
 * Record<string, unknown>からQuizRowに安全に変換
 */
export function toQuizRow(data: Record<string, unknown>): QuizRow {
  return {
    id: data["id"] as string,
    question: data["question"] as string,
    answer_type: data["answer_type"] as string,
    solution_id: data["solution_id"] as string,
    explanation: data["explanation"] as string | undefined,
    status: data["status"] as string,
    creator_id: data["creator_id"] as string,
    created_at: data["created_at"] as string,
    approved_at: data["approved_at"] as string | undefined,
    boolean_value: data["boolean_value"] as boolean | undefined,
    correct_answer: data["correct_answer"] as string | undefined,
    matching_strategy: data["matching_strategy"] as string | undefined,
    case_sensitive: data["case_sensitive"] as boolean | undefined,
    choices: data["choices"] as string | undefined,
    min_correct_answers: data["min_correct_answers"] as number | undefined,
  };
}

/**
 * CountResultから安全に値を取得
 */
export function getCountValue(result: CountResult): number {
  return result.total;
}

/**
 * BasicQuizInfoから安全にプロパティを取得
 */
export function toBasicQuizInfo(data: Record<string, unknown>): {
  id: string;
  solution_id: string;
  answer_type: string;
} {
  return {
    id: data["id"] as string,
    solution_id: data["solution_id"] as string,
    answer_type: data["answer_type"] as string,
  };
}
