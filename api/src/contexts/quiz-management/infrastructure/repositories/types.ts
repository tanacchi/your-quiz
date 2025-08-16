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
/**
 * Safely retrieves the value of a property from a Record<string, unknown> object.
 * Checks only for own properties (not inherited ones) using Object.hasOwn.
 * Returns the property value if it exists, otherwise returns undefined.
 *
 * @param obj - The object to retrieve the property from.
 * @param key - The property key to access.
 * @returns The value of the property if it exists, otherwise undefined.
 * @remarks
 * - This function does not traverse the prototype chain.
 * - It does not check for non-enumerable properties.
 * - Use with caution if the object may not be a plain object.
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
  const cond_id =
    typeof getProperty(row, "id") === "string" ||
    typeof getProperty(row, "id") === "number";
  const cond_question = typeof getProperty(row, "question") === "string";
  const cond_answer_type = typeof getProperty(row, "answer_type") === "string";
  const cond_solution_id =
    typeof getProperty(row, "solution_id") === "string" ||
    typeof getProperty(row, "solution_id") === "number";
  const cond_status = typeof getProperty(row, "status") === "string";
  const cond_creator_id =
    typeof getProperty(row, "creator_id") === "string" ||
    typeof getProperty(row, "creator_id") === "number";
  const cond_created_at = typeof getProperty(row, "created_at") === "string";
  const cond_explanation =
    getProperty(row, "explanation") === null ||
    getProperty(row, "explanation") === undefined ||
    typeof getProperty(row, "explanation") === "string";
  const cond_approved_at =
    getProperty(row, "approved_at") === null ||
    getProperty(row, "approved_at") === undefined ||
    typeof getProperty(row, "approved_at") === "string";

  return (
    cond_id &&
    cond_question &&
    cond_answer_type &&
    cond_solution_id &&
    cond_status &&
    cond_creator_id &&
    cond_created_at &&
    cond_explanation &&
    cond_approved_at
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
  const baseRow = {
    // D1では数値IDが返されるため、文字列に変換
    id: String(getProperty(data, "id")),
    question: String(getProperty(data, "question")),
    answer_type: String(getProperty(data, "answer_type")),
    solution_id: String(getProperty(data, "solution_id")),
    status: String(getProperty(data, "status")),
    creator_id: String(getProperty(data, "creator_id")),
    created_at: String(getProperty(data, "created_at")),
  };

  return {
    ...baseRow,
    ...(getProperty(data, "explanation") !== null &&
      getProperty(data, "explanation") !== undefined && {
        explanation: String(getProperty(data, "explanation")),
      }),
    ...(getProperty(data, "approved_at") !== null &&
      getProperty(data, "approved_at") !== undefined && {
        approved_at: String(getProperty(data, "approved_at")),
      }),
    ...(getProperty(data, "boolean_value") !== null &&
      getProperty(data, "boolean_value") !== undefined && {
        boolean_value: Boolean(getProperty(data, "boolean_value")),
      }),
    ...(getProperty(data, "correct_answer") !== null &&
      getProperty(data, "correct_answer") !== undefined && {
        correct_answer: String(getProperty(data, "correct_answer")),
      }),
    ...(getProperty(data, "matching_strategy") !== null &&
      getProperty(data, "matching_strategy") !== undefined && {
        matching_strategy: String(getProperty(data, "matching_strategy")),
      }),
    ...(getProperty(data, "case_sensitive") !== null &&
      getProperty(data, "case_sensitive") !== undefined && {
        case_sensitive: Boolean(getProperty(data, "case_sensitive")),
      }),
    ...(getProperty(data, "choices") !== null &&
      getProperty(data, "choices") !== undefined && {
        choices: String(getProperty(data, "choices")),
      }),
    ...(getProperty(data, "min_correct_answers") !== null &&
      getProperty(data, "min_correct_answers") !== undefined && {
        min_correct_answers: Number(getProperty(data, "min_correct_answers")),
      }),
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
    id: String(getProperty(data, "id")),
    solution_id: String(getProperty(data, "solution_id")),
    answer_type: String(getProperty(data, "answer_type")),
  };
}
