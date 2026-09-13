import { errAsync, type ResultAsync } from "neverthrow";
import { canDeleteStatus } from "../../domain/entities/quiz-summary/quiz-status-transition";
import { QuizCreatorOnlyError, QuizStatusError } from "../../domain/errors";
import type { IQuizRepository } from "../../domain/repositories/IQuizRepository";
import type { UseCaseError } from "../errors";
import {
  mapDeleteErrorToUseCaseError,
  mapFindErrorToUseCaseError,
} from "./quiz-repository-error-mapping";

/**
 * クイズ削除コマンドの型定義
 */
export type DeleteQuizCommand = {
  /** 削除対象のクイズID */
  readonly quizId: string;
  /** リクエスト実行者の識別子（c.var.userFingerprint） */
  readonly requesterId: string;
};

/**
 * クイズ削除ユースケース
 *
 * 所有者確認（作成者本人のみ）とステータス確認
 * （draft/pending_approval/rejectedのみ削除可）を行った上で物理削除する。
 */
export class DeleteQuizUseCase {
  constructor(private readonly quizRepository: IQuizRepository) {}

  execute(command: DeleteQuizCommand): ResultAsync<void, UseCaseError> {
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
              "delete",
              quiz.creatorId,
              command.requesterId,
            ),
          );
        }

        if (!canDeleteStatus(quiz.status)) {
          return errAsync(
            new QuizStatusError(
              command.quizId,
              quiz.status,
              "draft, pending_approval, or rejected",
            ),
          );
        }

        return this.quizRepository
          .delete(command.quizId)
          .mapErr((repositoryError) =>
            mapDeleteErrorToUseCaseError(command.quizId, repositoryError),
          );
      });
  }
}
