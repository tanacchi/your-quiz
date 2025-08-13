import type { QuizSummaryInput } from "./quiz-summary-schema";

export type Issue = {
  path: (string | number)[];
  code: string;
  message: string;
};

/**
 * QuizSummary Patch は「純データ」か「遅延計算関数」のどちらか。
 * - Partial<QuizSummaryInput>: 直列化やバッチ処理向き
 * - () => Partial<QuizSummaryInput>: 入力に閉じた補正を遅延評価（プロセス内専用）
 */
export type QuizSummaryPatch = 
  | Partial<QuizSummaryInput> 
  | (() => Partial<QuizSummaryInput>);

/** 各フィールド専用のサジェスト関数 */
type FieldSuggestor = (value: unknown) => QuizSummaryPatch[];

/** Patch を「いま適用する」ために Partial<QuizSummaryInput> に実体化 */
export const materializePatch = (patch: QuizSummaryPatch): Partial<QuizSummaryInput> =>
  typeof patch === 'function' ? patch() : patch;

/** 単一 Patch の適用（平坦な QuizSummary なので浅いマージで十分） */
export const applyQuizSummaryPatch = (input: unknown, patch: QuizSummaryPatch): unknown => {
  const base = (typeof input === 'object' && input != null) ? { ...(input as any) } : {};
  const p = materializePatch(patch);
  return { ...base, ...p };
};

/** 複数 Patch を順に適用（後勝ち） */
export const applyQuizSummaryPatches = (input: unknown, patches: QuizSummaryPatch[]): unknown =>
  patches.reduce((acc, p) => applyQuizSummaryPatch(acc, p), input);

// question 用：trim / 空文字列の場合はサンプル提案
export const suggestQuestionPatches: FieldSuggestor = (value) => {
  if (typeof value !== 'string') return [];
  
  const patches: QuizSummaryPatch[] = [];
  const trimmed = value.trim();
  
  if (trimmed !== value && trimmed.length > 0) {
    patches.push({ question: trimmed });
  } else if (trimmed === '') {
    patches.push({ question: 'Sample question' });
  }
  
  return patches;
};

// explanation 用：trim
export const suggestExplanationPatches: FieldSuggestor = (value) => {
  if (typeof value !== 'string') return [];
  
  const patches: QuizSummaryPatch[] = [];
  const trimmed = value.trim();
  
  if (trimmed !== value) {
    patches.push({ explanation: trimmed });
  }
  
  return patches;
};

// id fields 用：trim whitespace
export const suggestIdFieldPatches = (fieldName: keyof QuizSummaryInput) => (value: unknown): QuizSummaryPatch[] => {
  if (typeof value !== 'string') return [];
  
  const patches: QuizSummaryPatch[] = [];
  const trimmed = value.trim();
  
  if (trimmed !== value) {
    patches.push({ [fieldName]: trimmed } as Partial<QuizSummaryInput>);
  }
  
  return patches;
};

// answerType 用：typo修正
export const suggestAnswerTypePatches: FieldSuggestor = (value) => {
  if (typeof value !== 'string') return [];
  
  const patches: QuizSummaryPatch[] = [];
  const answerType = value.toLowerCase();
  const suggestions_map = {
    'single': 'single_choice',
    'multiple': 'multiple_choice',
    'bool': 'boolean',
    'boolean_choice': 'boolean',
    'free': 'free_text',
    'text': 'free_text',
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
export const suggestStatusPatches: FieldSuggestor = (value) => {
  if (typeof value !== 'string') return [];
  
  const patches: QuizSummaryPatch[] = [];
  const status = value.toLowerCase();
  const status_suggestions = {
    'pending': 'pending_approval',
    'waiting': 'pending_approval',
    'approve': 'approved',
    'accept': 'approved',
    'reject': 'rejected',
    'decline': 'rejected',
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
export const suggestTagIdsPatches: FieldSuggestor = (value) => {
  const patches: QuizSummaryPatch[] = [];
  
  if (value == null) {
    patches.push({ tagIds: [] });
  } else if (Array.isArray(value)) {
    // 関数型でまとめて補正（TagId形式チェック + trim）
    patches.push(() => {
      const validTagIds = value
        .filter((x: unknown) => typeof x === 'string')
        .map((x: string) => x.trim())
        .filter((x: string) => x.length > 0);
      return { tagIds: validTagIds };
    });
  }
  
  return patches;
};

// approvedAt 用：approved状態なのにtimestampがない場合
export const suggestApprovedAtPatches = (obj: any): QuizSummaryPatch[] => {
  const patches: QuizSummaryPatch[] = [];
  
  if (obj.status === 'approved' && !obj.approvedAt) {
    patches.push({ approvedAt: new Date().toISOString() });
  }
  
  return patches;
};

/** 集約：Issue に該当するフィールドだけを呼ぶ */
export const suggestQuizSummaryPatches = (input: unknown, issues: Issue[]): QuizSummaryPatch[] => {
  const obj = (typeof input === 'object' && input != null) ? (input as any) : {};
  const need = (field: string) => issues.some(is => String(is.path[0]) === field);

  const out: QuizSummaryPatch[] = [];
  
  if (need('question')) out.push(...suggestQuestionPatches(obj.question));
  if (need('explanation')) out.push(...suggestExplanationPatches(obj.explanation));
  if (need('id')) out.push(...suggestIdFieldPatches('id')(obj.id));
  if (need('solutionId')) out.push(...suggestIdFieldPatches('solutionId')(obj.solutionId));
  if (need('creatorId')) out.push(...suggestIdFieldPatches('creatorId')(obj.creatorId));
  if (need('answerType')) out.push(...suggestAnswerTypePatches(obj.answerType));
  if (need('status')) out.push(...suggestStatusPatches(obj.status));
  if (need('tagIds')) out.push(...suggestTagIdsPatches(obj.tagIds));
  if (need('approvedAt')) out.push(...suggestApprovedAtPatches(obj));
  
  return out;
};