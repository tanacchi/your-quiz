import { isObjectLike } from "../../../../../shared/utils/type-guard";
import type {
  EntityPatch,
  FieldSuggester,
  Issue,
} from "../../../../../shared/validation/entity";
import { BooleanSolutionSchema } from "../solutions/boolean/boolean-solution-schema";
import type { QuizInput } from "./quiz-schema";

// Type alias for Quiz-specific patch
export type QuizPatch = EntityPatch<QuizInput>;

// Type alias for Quiz-specific field suggester
type QuizFieldSuggester = FieldSuggester<QuizInput>;

// question用：trim + 文字数制限 + 空文字列対応
export const suggestQuestionPatches: QuizFieldSuggester = (value) => {
  if (typeof value !== "string") return [];

  const patches: QuizPatch[] = [];
  const trimmed = value.trim();

  if (trimmed !== value && trimmed.length > 0) {
    patches.push({ question: trimmed });
  } else if (trimmed === "") {
    patches.push({ question: "Sample boolean question?" });
  } else if (trimmed.length > 500) {
    // 500文字を超える場合は切り詰め
    const truncated = `${trimmed.substring(0, 497)}...`;
    patches.push({ question: truncated });
  }

  return patches;
};

// explanation用：trim + 文字数制限
export const suggestExplanationPatches: QuizFieldSuggester = (value) => {
  if (typeof value !== "string") return [];

  const patches: QuizPatch[] = [];
  const trimmed = value.trim();

  if (trimmed !== value) {
    patches.push({ explanation: trimmed });
  } else if (trimmed.length > 1000) {
    // 1000文字を超える場合は切り詰め
    const truncated = `${trimmed.substring(0, 997)}...`;
    patches.push({ explanation: truncated });
  }

  return patches;
};

// id fields用：trim whitespace
export const suggestIdFieldPatches =
  (fieldName: keyof QuizInput) =>
  (value: unknown): QuizPatch[] => {
    if (typeof value !== "string") return [];

    const patches: QuizPatch[] = [];
    const trimmed = value.trim();

    if (trimmed !== value && trimmed.length > 0) {
      patches.push({ [fieldName]: trimmed } as Partial<QuizInput>);
    }

    return patches;
  };

// answerType用：typo修正（booleanのみ対応）
export const suggestAnswerTypePatches: QuizFieldSuggester = (value) => {
  if (typeof value !== "string") return [];

  const patches: QuizPatch[] = [];
  const answerType = value.toLowerCase().trim();

  // booleanに関連する様々な表記を修正
  const booleanPatterns = [
    "bool",
    "boolean",
    "true_false",
    "truefalse",
    "yes_no",
    "yesno",
    "correct_incorrect",
    "○×",
    "ox",
    "maru_batsu",
  ];

  for (const pattern of booleanPatterns) {
    if (answerType.includes(pattern) || answerType === pattern) {
      patches.push({ answerType: "boolean" });
      break;
    }
  }

  return patches;
};

// status用：typo修正
export const suggestStatusPatches: QuizFieldSuggester = (value) => {
  if (typeof value !== "string") return [];

  const patches: QuizPatch[] = [];
  const status = value.toLowerCase().trim();
  const statusSuggestions = {
    pending: "pending_approval",
    waiting: "pending_approval",
    draft: "pending_approval",
    approve: "approved",
    accept: "approved",
    published: "approved",
    reject: "rejected",
    decline: "rejected",
    denied: "rejected",
  } as const;

  for (const [typo, correct] of Object.entries(statusSuggestions)) {
    if (status.includes(typo)) {
      patches.push({ status: correct });
      break;
    }
  }

  return patches;
};

// solution用：BooleanSolution正規化
export const suggestSolutionPatches: QuizFieldSuggester = (value) => {
  const patches: QuizPatch[] = [];

  if (value == null) {
    // null/undefinedの場合はデフォルトBooleanSolutionを提案
    patches.push({
      solution: {
        id: `solution-${Date.now()}`,
        value: false,
      },
    });
  } else if (typeof value === "object" && value !== null) {
    // BooleanSolutionスキーマに合わない場合の修正
    const solutionParsed = BooleanSolutionSchema.safeParse(value);
    if (!solutionParsed.success) {
      // 型安全なプロパティアクセスのため、unknown経由でキャスト
      const solutionObj = value as unknown as { id?: unknown; value?: unknown };
      patches.push({
        solution: {
          id:
            typeof solutionObj.id === "string"
              ? solutionObj.id.trim()
              : `solution-${Date.now()}`,
          value: Boolean(solutionObj.value),
        },
      });
    }
  }

  return patches;
};

// answerType/solution整合性修正
export const suggestAnswerTypeSolutionConsistencyPatches = (
  quiz: Partial<QuizInput>,
): QuizPatch[] => {
  const patches: QuizPatch[] = [];

  // answerTypeとsolutionの整合性チェック
  if (quiz.answerType !== "boolean" && quiz.solution) {
    // answerTypeをbooleanに統一
    patches.push({ answerType: "boolean" });
  }

  // answerType="boolean"でsolutionがない場合
  if (quiz.answerType === "boolean" && !quiz.solution) {
    patches.push({
      solution: {
        id: `solution-${Date.now()}`,
        value: false,
      },
    });
  }

  return patches;
};

/** 集約：Issue に該当するフィールドだけを処理 */
export const suggestQuizPatches = (
  input: unknown,
  issues: Issue[],
): QuizPatch[] => {
  if (!isObjectLike<QuizInput>(input)) {
    return [];
  }

  const needsField = (field: string) =>
    issues.some((issue) => String(issue.path[0]) === field);

  const patches: QuizPatch[] = [];

  if (needsField("question")) {
    patches.push(...suggestQuestionPatches(input.question));
  }
  if (needsField("explanation")) {
    patches.push(...suggestExplanationPatches(input.explanation));
  }
  if (needsField("id")) {
    patches.push(...suggestIdFieldPatches("id")(input.id));
  }
  if (needsField("creatorId")) {
    patches.push(...suggestIdFieldPatches("creatorId")(input.creatorId));
  }
  if (needsField("answerType")) {
    patches.push(...suggestAnswerTypePatches(input.answerType));
  }
  if (needsField("status")) {
    patches.push(...suggestStatusPatches(input.status));
  }
  if (needsField("solution")) {
    patches.push(...suggestSolutionPatches(input.solution));
  }

  // 整合性修正パッチを最後に追加
  patches.push(...suggestAnswerTypeSolutionConsistencyPatches(input));

  return patches;
};
