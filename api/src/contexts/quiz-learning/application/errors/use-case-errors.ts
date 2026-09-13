import { InternalServerError } from "../../../../shared/errors";
import type { DeckDomainError } from "../../domain/errors";

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
 * Deck作成失敗エラー
 */
export class DeckCreationFailedError extends InternalServerError {
  readonly reason: string;

  constructor(reason: string, details?: string, requestId?: string) {
    super(`Failed to create deck: ${reason}`, details, requestId);
    this.reason = reason;
  }
}

/**
 * Deck取得失敗エラー
 */
export class DeckRetrievalFailedError extends InternalServerError {
  readonly deckId: string;

  constructor(deckId: string, details?: string, requestId?: string) {
    super(`Failed to retrieve deck with ID: ${deckId}`, details, requestId);
    this.deckId = deckId;
  }
}

/**
 * Deck一覧取得失敗エラー
 */
export class DeckListRetrievalFailedError extends InternalServerError {
  readonly creatorId: string;

  constructor(creatorId: string, details?: string, requestId?: string) {
    super("Failed to retrieve deck list", details, requestId);
    this.creatorId = creatorId;
  }
}

/**
 * Deck更新失敗エラー
 */
export class DeckUpdateFailedError extends InternalServerError {
  readonly deckId: string;

  constructor(deckId: string, details?: string, requestId?: string) {
    super(`Failed to update deck with ID: ${deckId}`, details, requestId);
    this.deckId = deckId;
  }
}

/**
 * Deck削除失敗エラー
 */
export class DeckDeletionFailedError extends InternalServerError {
  readonly deckId: string;

  constructor(deckId: string, details?: string, requestId?: string) {
    super(`Failed to delete deck with ID: ${deckId}`, details, requestId);
    this.deckId = deckId;
  }
}

/**
 * ユースケースエラーの統合型
 */
export type DeckUseCaseError =
  | UseCaseInternalError
  | DeckCreationFailedError
  | DeckRetrievalFailedError
  | DeckListRetrievalFailedError
  | DeckUpdateFailedError
  | DeckDeletionFailedError
  | DeckDomainError;
