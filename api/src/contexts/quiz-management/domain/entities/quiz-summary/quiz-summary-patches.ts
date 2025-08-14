import {
  applyEntityPatch,
  applyEntityPatches,
  type EntityPatch,
  type FieldSuggester,
  type Issue,
  materializeEntityPatch,
} from "../../../../../shared/validation/entity";
import type { QuizSummaryInput } from "./quiz-summary-schema";

// Type alias for QuizSummary-specific patch
export type QuizSummaryPatch = EntityPatch<QuizSummaryInput>;

// Type alias for QuizSummary-specific field suggester
type QuizSummaryFieldSuggester = FieldSuggester<QuizSummaryInput>;

/** 入力データが QuizSummaryInput の形に近いかを判定 */
const isQuizSummaryLike = (
  input: unknown,
): input is Partial<QuizSummaryInput> => {
  return typeof input === "object" && input !== null;
};

// Re-export utilities with QuizSummary-specific names for backward compatibility
export const materializePatch = materializeEntityPatch<QuizSummaryInput>;
export const applyQuizSummaryPatch = (
  input: unknown,
  patch: QuizSummaryPatch,
): unknown => applyEntityPatch(input, patch);
export const applyQuizSummaryPatches = (
  input: unknown,
  patches: QuizSummaryPatch[],
): unknown => applyEntityPatches(input, patches);

// question 用：trim / 空文字列の場合はサンプル提案
export const suggestQuestionPatches: QuizSummaryFieldSuggester = (value) => {
  if (typeof value !== "string") return [];

  const patches: QuizSummaryPatch[] = [];
  const trimmed = value.trim();

  if (trimmed !== value && trimmed.length > 0) {
    patches.push({ question: trimmed });
  } else if (trimmed === "") {
    patches.push({ question: "Sample question" });
  }

  return patches;
};

// explanation 用：trim
export const suggestExplanationPatches: QuizSummaryFieldSuggester = (value) => {
  if (typeof value !== "string") return [];

  const patches: QuizSummaryPatch[] = [];
  const trimmed = value.trim();

  if (trimmed !== value) {
    patches.push({ explanation: trimmed });
  }

  return patches;
};

// id fields 用：trim whitespace
export const suggestIdFieldPatches =
  (fieldName: keyof QuizSummaryInput) =>
  (value: unknown): QuizSummaryPatch[] => {
    if (typeof value !== "string") return [];

    const patches: QuizSummaryPatch[] = [];
    const trimmed = value.trim();

    if (trimmed !== value) {
      patches.push({ [fieldName]: trimmed } as Partial<QuizSummaryInput>);
    }

    return patches;
  };

// answerType 用：typo修正
export const suggestAnswerTypePatches: QuizSummaryFieldSuggester = (value) => {
  if (typeof value !== "string") return [];

  const patches: QuizSummaryPatch[] = [];
  const answerType = value.toLowerCase();
  const suggestions_map = {
    single: "single_choice",
    multiple: "multiple_choice",
    bool: "boolean",
    boolean_choice: "boolean",
    free: "free_text",
    text: "free_text",
  } as const;

  for (const [typo, correct] of Object.entries(suggestions_map)) {
    if (answerType.includes(typo)) {
      patches.push({ answerType: correct });
      break;
    }
  }

  return patches;
};

// status 用：typo修正
export const suggestStatusPatches: QuizSummaryFieldSuggester = (value) => {
  if (typeof value !== "string") return [];

  const patches: QuizSummaryPatch[] = [];
  const status = value.toLowerCase();
  const status_suggestions = {
    pending: "pending_approval",
    waiting: "pending_approval",
    approve: "approved",
    accept: "approved",
    reject: "rejected",
    decline: "rejected",
  } as const;

  for (const [typo, correct] of Object.entries(status_suggestions)) {
    if (status.includes(typo)) {
      patches.push({ status: correct });
      break;
    }
  }

  return patches;
};

// tagIds 用：未指定→[] / 非文字列の除去 / trim
export const suggestTagIdsPatches: QuizSummaryFieldSuggester = (value) => {
  const patches: QuizSummaryPatch[] = [];

  if (value == null) {
    patches.push({ tagIds: [] });
  } else if (Array.isArray(value)) {
    // 関数型でまとめて補正（TagId形式チェック + trim）
    patches.push(() => {
      const validTagIds = value
        .filter((x: unknown) => typeof x === "string")
        .map((x: string) => x.trim())
        .filter((x: string) => x.length > 0);
      return { tagIds: validTagIds };
    });
  }

  return patches;
};

// approvedAt 用：approved状態なのにtimestampがない場合
export const suggestApprovedAtPatches = (
  obj: Partial<QuizSummaryInput>,
): QuizSummaryPatch[] => {
  const patches: QuizSummaryPatch[] = [];

  if (obj.status === "approved" && !obj.approvedAt) {
    patches.push({ approvedAt: new Date().toISOString() });
  }

  return patches;
};

/** 集約：Issue に該当するフィールドだけを呼ぶ */
export const suggestQuizSummaryPatches = (
  input: unknown,
  issues: Issue[],
): QuizSummaryPatch[] => {
  if (!isQuizSummaryLike(input)) {
    return [];
  }

  const need = (field: string) =>
    issues.some((is) => String(is.path[0]) === field);

  const out: QuizSummaryPatch[] = [];

  if (need("question")) out.push(...suggestQuestionPatches(input.question));
  if (need("explanation"))
    out.push(...suggestExplanationPatches(input.explanation));
  if (need("id")) out.push(...suggestIdFieldPatches("id")(input.id));
  if (need("solutionId"))
    out.push(...suggestIdFieldPatches("solutionId")(input.solutionId));
  if (need("creatorId"))
    out.push(...suggestIdFieldPatches("creatorId")(input.creatorId));
  if (need("answerType"))
    out.push(...suggestAnswerTypePatches(input.answerType));
  if (need("status")) out.push(...suggestStatusPatches(input.status));
  if (need("tagIds")) out.push(...suggestTagIdsPatches(input.tagIds));
  if (need("approvedAt")) out.push(...suggestApprovedAtPatches(input));

  return out;
};
