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
 * `RepositoryError.details` に "not found" という文字列が含まれるかで
 * 対象不在を判定する。`IQuizRepository` は型付きのNotFoundエラーを返す
 * 設計になっていないための代替手段（find/update/deleteの全経路で共有）。
 */
function isNotFoundDetails(repositoryError: RepositoryError): boolean {
  return repositoryError.details?.toLowerCase().includes("not found") ?? false;
}

/**
 * `IQuizRepository.findById()` が返す RepositoryError を UseCaseError へ変換する。
 *
 * GetQuizUseCase / UpdateQuizUseCase / DeleteQuizUseCase /
 * ChangeQuizStatusUseCase の全てで共有する。
 */
export function mapFindErrorToUseCaseError(
  quizId: string,
  repositoryError: RepositoryError,
): UseCaseError {
  if (repositoryError instanceof FindFailedError) {
    if (isNotFoundDetails(repositoryError)) {
      return new QuizNotFoundError(quizId);
    }
    return new QuizRetrievalFailedError(quizId, repositoryError.details);
  }
  return new UseCaseInternalError(
    "Failed to get quiz",
    repositoryError.details,
  );
}

/**
 * `IQuizRepository.update()` が返す RepositoryError を UseCaseError へ変換する。
 *
 * D1経路は対象不在時に `FindFailedError`（再取得SELECTが空）を返し、
 * Mock経路は `UpdateFailedError` を返すため、両方を対象不在判定の対象にする。
 */
export function mapUpdateErrorToUseCaseError(
  quizId: string,
  repositoryError: RepositoryError,
): UseCaseError {
  if (
    (repositoryError instanceof UpdateFailedError ||
      repositoryError instanceof FindFailedError) &&
    isNotFoundDetails(repositoryError)
  ) {
    return new QuizNotFoundError(quizId);
  }
  if (repositoryError instanceof UpdateFailedError) {
    return new QuizUpdateFailedError(quizId, repositoryError.details);
  }
  return new UseCaseInternalError(
    "Failed to update quiz",
    repositoryError.details,
  );
}

/**
 * `IQuizRepository.delete()` が返す RepositoryError を UseCaseError へ変換する。
 */
export function mapDeleteErrorToUseCaseError(
  quizId: string,
  repositoryError: RepositoryError,
): UseCaseError {
  if (
    (repositoryError instanceof DeleteFailedError ||
      repositoryError instanceof FindFailedError) &&
    isNotFoundDetails(repositoryError)
  ) {
    return new QuizNotFoundError(quizId);
  }
  if (repositoryError instanceof DeleteFailedError) {
    return new QuizDeletionFailedError(quizId, repositoryError.details);
  }
  return new UseCaseInternalError(
    "Failed to delete quiz",
    repositoryError.details,
  );
}
