import { errAsync, type ResultAsync } from "neverthrow";
import type { components } from "../../../../shared/types";
import type { QuizSummaryData } from "../../domain/entities/quiz-summary/QuizSummary";
import { canUpdateStatus } from "../../domain/entities/quiz-summary/quiz-status-transition";
import { QuizCreatorOnlyError, QuizStatusError } from "../../domain/errors";
import type { IQuizRepository } from "../../domain/repositories/IQuizRepository";
import type { UseCaseError } from "../errors";
import {
  mapFindErrorToUseCaseError,
  mapUpdateErrorToUseCaseError,
} from "./quiz-repository-error-mapping";

/**
 * クイズ更新コマンドの型定義
 *
 * PATCH /quizzes/{id} で更新可能なフィールドは question/explanation のみ
 * （ADR-0029。solution/tags/answerType/creatorId は本UseCaseの対象外）。
 */
export type UpdateQuizCommand = {
  /** 更新対象のクイズID */
  readonly quizId: string;
  /** リクエスト実行者の識別子（c.var.userFingerprint） */
  readonly requesterId: string;
  /** 更新後の問題文。未指定なら変更しない */
  readonly question?: string;
  /** 更新後の解説文。未指定なら変更しない */
  readonly explanation?: string;
};

/**
 * クイズ更新ユースケース
 *
 * 所有者確認（作成者本人のみ）とステータス確認
 * （draft/pending_approval/rejectedのみ更新可）を行った上でquestion/explanation
 * を更新する。ステータス自体は変更しない。
 */
export class UpdateQuizUseCase {
  constructor(private readonly quizRepository: IQuizRepository) {}

  execute(
    command: UpdateQuizCommand,
  ): ResultAsync<components["schemas"]["QuizResponse"], UseCaseError> {
    return this.quizRepository
      .findById(command.quizId)
      .mapErr((repositoryError) =>
        mapFindErrorToUseCaseError(command.quizId, repositoryError),
      )
      .andThen((quiz) => {
        if (quiz.creatorId !== command.requesterId) {
          return errAsync(
            new QuizCreatorOnlyError(
              command.quizId,
              "update",
              quiz.creatorId,
              command.requesterId,
            ),
          );
        }

        if (!canUpdateStatus(quiz.status)) {
          return errAsync(
            new QuizStatusError(
              command.quizId,
              quiz.status,
              "draft, pending_approval, or rejected",
            ),
          );
        }

        const patch: Partial<QuizSummaryData> = {};
        if (command.question !== undefined) {
          patch.question = command.question;
        }
        if (command.explanation !== undefined) {
          patch.explanation = command.explanation;
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
