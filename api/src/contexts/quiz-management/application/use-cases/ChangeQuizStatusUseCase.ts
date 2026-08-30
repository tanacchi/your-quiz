import { errAsync, type ResultAsync } from "neverthrow";
import type { components } from "../../../../shared/types";
import type { QuizSummaryData } from "../../domain/entities/quiz-summary/QuizSummary";
import {
  canTransition,
  type QuizTransitionAction,
  transitionRuleOf,
} from "../../domain/entities/quiz-summary/quiz-status-transition";
import {
  QuizAdminOnlyError,
  QuizCreatorOnlyError,
  QuizStatusError,
} from "../../domain/errors";
import type { IQuizRepository } from "../../domain/repositories/IQuizRepository";
import type { UseCaseError } from "../errors";
import {
  mapFindErrorToUseCaseError,
  mapUpdateErrorToUseCaseError,
} from "./quiz-repository-error-mapping";

export type { QuizTransitionAction };

/**
 * クイズステータス遷移コマンドの型定義
 *
 * submit/approve/reject/publish の4アクションを共通のコマンド型で扱う
 * （遷移規則は quiz-status-transition.ts に一元化されている、ADR-0029）。
 */
export type ChangeQuizStatusCommand = {
  /** 対象のクイズID */
  readonly quizId: string;
  /** 実行するアクション */
  readonly action: QuizTransitionAction;
  /** リクエスト実行者の識別子（c.var.userFingerprint） */
  readonly requesterId: string;
  /**
   * モデレーション権限を持つか（presentation層のmoderation-policyが判定）。
   * approve/reject/publishはtrueが必須、submitでは参照しない。
   */
  readonly isModerator: boolean;
  /** 承認・却下時のレビューコメント（現状は記録先カラムが無いため未使用、ADR-0029） */
  readonly reviewerNotes?: string;
};

/**
 * クイズステータス遷移ユースケース
 *
 * submit（作成者限定）/ approve・reject・publish（モデレーター限定）を
 * quiz-status-transition.ts の遷移規則に従って実行する。
 */
export class ChangeQuizStatusUseCase {
  constructor(private readonly quizRepository: IQuizRepository) {}

  execute(
    command: ChangeQuizStatusCommand,
  ): ResultAsync<components["schemas"]["QuizResponse"], UseCaseError> {
    return this.quizRepository
      .findById(command.quizId)
      .mapErr((repositoryError) =>
        mapFindErrorToUseCaseError(command.quizId, repositoryError),
      )
      .andThen((quiz) => {
        const rule = transitionRuleOf(command.action);

        if (rule.requiresModeration) {
          if (!command.isModerator) {
            return errAsync(new QuizAdminOnlyError(command.action));
          }
        } else if (quiz.creatorId !== command.requesterId) {
          return errAsync(
            new QuizCreatorOnlyError(
              command.quizId,
              command.action,
              quiz.creatorId,
              command.requesterId,
            ),
          );
        }

        if (!canTransition(quiz.status, command.action)) {
          return errAsync(
            new QuizStatusError(
              command.quizId,
              quiz.status,
              rule.from.join(" or "),
            ),
          );
        }

        const patch: Partial<QuizSummaryData> = { status: rule.to };
        if (rule.stampsApprovedAt) {
          patch.approvedAt = new Date()
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");
        }

        return this.quizRepository
          .update(command.quizId, patch)
          .mapErr((repositoryError) =>
            mapUpdateErrorToUseCaseError(command.quizId, repositoryError),
          )
          .andThen(() =>
            this.quizRepository
              .findById(command.quizId)
              .mapErr((repositoryError) =>
                mapFindErrorToUseCaseError(command.quizId, repositoryError),
              ),
          );
      });
  }
}
