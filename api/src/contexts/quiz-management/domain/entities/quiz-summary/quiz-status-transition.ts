/**
 * クイズのステータス遷移規則（ADR-0029）
 *
 * draft → submit → pending_approval → {approve→approved, reject→rejected}
 *   → publish → published
 * rejected → submit → pending_approval（再申請）
 */
export const QUIZ_STATUS_VALUES = [
  "draft",
  "pending_approval",
  "approved",
  "rejected",
  "published",
] as const;
export type QuizStatusValue = (typeof QUIZ_STATUS_VALUES)[number];

export const QUIZ_TRANSITION_ACTIONS = [
  "submit",
  "approve",
  "reject",
  "publish",
] as const;
export type QuizTransitionAction = (typeof QUIZ_TRANSITION_ACTIONS)[number];

type TransitionRule = {
  /** この遷移が許可される遷移元ステータス */
  readonly from: readonly QuizStatusValue[];
  /** 遷移先ステータス */
  readonly to: QuizStatusValue;
  /** trueの場合、実行にはモデレーション権限が必要（ADR-0029の暫定権限モデル） */
  readonly requiresModeration: boolean;
  /** trueの場合、遷移時にapprovedAtを記録する */
  readonly stampsApprovedAt: boolean;
  /** 遷移不可時のエラーメッセージに使う過去分詞（例: "approved"） */
  readonly pastParticiple: string;
};

export const QUIZ_STATUS_TRANSITIONS = {
  submit: {
    from: ["draft", "rejected"],
    to: "pending_approval",
    requiresModeration: false,
    stampsApprovedAt: false,
    pastParticiple: "submitted",
  },
  approve: {
    from: ["pending_approval"],
    to: "approved",
    requiresModeration: true,
    stampsApprovedAt: true,
    pastParticiple: "approved",
  },
  reject: {
    from: ["pending_approval"],
    to: "rejected",
    requiresModeration: true,
    stampsApprovedAt: false,
    pastParticiple: "rejected",
  },
  publish: {
    from: ["approved"],
    to: "published",
    requiresModeration: true,
    stampsApprovedAt: false,
    pastParticiple: "published",
  },
} as const satisfies Record<QuizTransitionAction, TransitionRule>;

export const transitionRuleOf = (
  action: QuizTransitionAction,
): TransitionRule => QUIZ_STATUS_TRANSITIONS[action];

export const canTransition = (
  current: QuizStatusValue,
  action: QuizTransitionAction,
): boolean =>
  (transitionRuleOf(action).from as readonly QuizStatusValue[]).includes(
    current,
  );

/** PATCH / DELETE を許可するステータス。承認済み・公開済みは除外する */
export const UPDATABLE_STATUSES = [
  "draft",
  "pending_approval",
  "rejected",
] as const satisfies readonly QuizStatusValue[];

export const DELETABLE_STATUSES = UPDATABLE_STATUSES;

export const canUpdateStatus = (status: QuizStatusValue): boolean =>
  (UPDATABLE_STATUSES as readonly QuizStatusValue[]).includes(status);

export const canDeleteStatus = (status: QuizStatusValue): boolean =>
  (DELETABLE_STATUSES as readonly QuizStatusValue[]).includes(status);

/**
 * 誰でも閲覧できるステータス（ADR-0029）
 *
 * `quiz-management.tsp` の doc が「一般ユーザーは承認済みクイズのみ表示」と
 * 定めているのに対応する。ここに含まれないステータスは作成者本人にしか
 * 見せてはならない。
 */
export const PUBLICLY_VISIBLE_STATUSES = [
  "approved",
  "published",
] as const satisfies readonly QuizStatusValue[];

/** 作成者本人にしか見せてはならないステータス（draft / pending_approval / rejected） */
export const isPubliclyVisibleStatus = (status: QuizStatusValue): boolean =>
  (PUBLICLY_VISIBLE_STATUSES as readonly QuizStatusValue[]).includes(status);
