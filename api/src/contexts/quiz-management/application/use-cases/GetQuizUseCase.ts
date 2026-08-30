import { errAsync, okAsync, type ResultAsync } from "neverthrow";
import type { components } from "../../../../shared/types";
import { isPubliclyVisibleStatus } from "../../domain/entities/quiz-summary/quiz-status-transition";
import { QuizNotFoundError } from "../../domain/errors";
import type { IQuizRepository } from "../../domain/repositories/IQuizRepository";
import type { UseCaseError } from "../errors";
import { mapFindErrorToUseCaseError } from "./quiz-repository-error-mapping";

type Quiz = components["schemas"]["QuizResponse"];

export class GetQuizUseCase {
  constructor(private readonly quizRepository: IQuizRepository) {}

  /**
   * クイズを1件取得する
   *
   * 非公開ステータス（draft / pending_approval / rejected）のクイズは
   * 作成者本人にしか返さない（ADR-0029）。他人には 403 ではなく 404 を返す
   * ことで、そのIDのクイズが存在すること自体を漏らさない。
   *
   * @param id - クイズID
   * @param requesterId - リクエスト元の userFingerprint
   */
  execute(
    id: string,
    requesterId: string,
  ): ResultAsync<Quiz, UseCaseError> {
    return this.quizRepository
      .findById(id)
      .mapErr((repositoryError) =>
        mapFindErrorToUseCaseError(id, repositoryError),
      )
      .andThen<Quiz, UseCaseError>((quiz) =>
        isPubliclyVisibleStatus(quiz.status) || quiz.creatorId === requesterId
          ? okAsync(quiz)
          : errAsync(new QuizNotFoundError(id)),
      );
  }
}
