/**
 * スケルトン用の最小ドメイン型。
 * API SDK(PR#24)接続フェーズで生成型へ置換する。
 */

export type QuizStatus = "未解答" | "解答済み" | "復習が必要";

export type AnswerType =
  | "boolean"
  | "single_choice"
  | "multiple_choice"
  | "free_text";

export interface Quiz {
  readonly id: string;
  readonly question: string;
  readonly answerType: AnswerType;
  readonly status: QuizStatus;
  readonly tags: ReadonlyArray<string>;
  readonly hasExplanation: boolean;
  readonly isOfflineAvailable?: boolean;
}
