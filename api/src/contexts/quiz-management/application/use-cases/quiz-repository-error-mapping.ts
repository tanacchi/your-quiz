import {
  DeleteFailedError,
  FindFailedError,
  type RepositoryError,
  UpdateFailedError,
} from "../../../../shared/errors";
import { QuizNotFoundError } from "../../domain/errors";
import {
  QuizDeletionFailedError,
  QuizRetrievalFailedError,
  QuizUpdateFailedError,
  type UseCaseError,
  UseCaseInternalError,
} from "../errors";

/**
 * `IQuizRepository.findById()` が返す RepositoryError を UseCaseError へ変換する。
 *
 * `IQuizRepository` は型付きのNotFoundエラーを返す設計になっていないため、
 * `FindFailedError.details` に "not found" という文字列が含まれるかで
 * 対象不在を判定する。GetQuizUseCase / UpdateQuizUseCase / DeleteQuizUseCase /
 * ChangeQuizStatusUseCase の全てで共有する。
 */
export function mapFindErrorToUseCaseError(
  quizId: string,
  repositoryError: RepositoryError,
): UseCaseError {
  if (repositoryError instanceof FindFailedError) {
    if (repositoryError.details?.toLowerCase().includes("not found")) {
      return new QuizNotFoundError(quizId);
    }
    return new QuizRetrievalFailedError(quizId, repositoryError.details);
  }
  return new UseCaseInternalError(
    "Failed to get quiz",
    repositoryError.message,
  );
}

/**
 * `IQuizRepository.update()` が返す RepositoryError を UseCaseError へ変換する。
 */
export function mapUpdateErrorToUseCaseError(
  quizId: string,
  repositoryError: RepositoryError,
): UseCaseError {
  if (repositoryError instanceof UpdateFailedError) {
    return new QuizUpdateFailedError(quizId, repositoryError.details);
  }
  return new UseCaseInternalError(
    "Failed to update quiz",
    repositoryError.message,
  );
}

/**
 * `IQuizRepository.delete()` が返す RepositoryError を UseCaseError へ変換する。
 */
export function mapDeleteErrorToUseCaseError(
  quizId: string,
  repositoryError: RepositoryError,
): UseCaseError {
  if (repositoryError instanceof DeleteFailedError) {
    return new QuizDeletionFailedError(quizId, repositoryError.details);
  }
  return new UseCaseInternalError(
    "Failed to delete quiz",
    repositoryError.message,
  );
}
