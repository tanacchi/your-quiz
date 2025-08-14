import {
  InternalServerError,
  ValidationError,
} from "../../../../shared/errors";
import type { Issue } from "../../../../shared/validation/entity/types";
import type { QuizDomainError } from "../../domain/errors";

/**
 * ユースケース層で発生するエラー
 */

/**
 * ユースケース内部エラー
 */
export class UseCaseInternalError extends InternalServerError {
  readonly operation: string;

  constructor(operation: string, details?: string, requestId?: string) {
    super(`Use case operation failed: ${operation}`, details, requestId);
    this.operation = operation;
  }
}

/**
 * クイズ作成失敗エラー
 */
export class QuizCreationFailedError extends InternalServerError {
  readonly quizId: string;

  constructor(quizId: string, details?: string, requestId?: string) {
    super(`Failed to create quiz with ID: ${quizId}`, details, requestId);
    this.quizId = quizId;
  }
}

/**
 * クイズ取得失敗エラー
 */
export class QuizRetrievalFailedError extends InternalServerError {
  readonly quizId: string;

  constructor(quizId: string, details?: string, requestId?: string) {
    super(`Failed to retrieve quiz with ID: ${quizId}`, details, requestId);
    this.quizId = quizId;
  }
}

/**
 * クイズリスト取得失敗エラー
 */
export class QuizListRetrievalFailedError extends InternalServerError {
  readonly filters: Record<string, unknown>;

  constructor(
    filters: Record<string, unknown>,
    details?: string,
    requestId?: string,
  ) {
    super("Failed to retrieve quiz list", details, requestId);
    this.filters = filters;
  }
}

/**
 * 無効なクイズIDエラー
 */
export class InvalidQuizIdError extends ValidationError {
  readonly quizId: string;

  constructor(quizId: string, requestId?: string) {
    super(
      "Invalid quiz ID format",
      { id: `Quiz ID '${quizId}' is invalid` },
      `Quiz ID must be a non-empty string, got: '${quizId}'`,
      requestId,
    );
    this.quizId = quizId;
  }
}

/**
 * 無効なクイズIDエラー
 */
export class InvalidQueryError extends ValidationError {
  readonly issues: Issue[];

  constructor(requestId?: string) {
    const issues: Issue[] = [];
    super(
      "Invalid query format",
      {},
      `There are ${issues.length} issues.`,
      requestId,
    );
    this.issues = issues;
  }
}

/**
 * ユースケースエラーの統合型
 */
export type UseCaseError =
  | UseCaseInternalError
  | QuizCreationFailedError
  | QuizRetrievalFailedError
  | QuizListRetrievalFailedError
  | InvalidQuizIdError
  | InvalidQueryError
  | QuizDomainError;
