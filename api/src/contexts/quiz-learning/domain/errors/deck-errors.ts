import { ForbiddenError, NotFoundError } from "../../../../shared/errors";

/**
 * Deckドメイン固有のエラークラス群
 *
 * quiz-learningコンテキストにおけるDeck集約のビジネスルール違反を表現する。
 */

/**
 * 指定されたDeckが見つからない場合のエラー
 */
export class DeckNotFoundError extends NotFoundError {
  readonly deckId: string;

  constructor(deckId: string, requestId?: string) {
    super(`Deck with ID '${deckId}' not found`, requestId);
    this.deckId = deckId;
  }
}

/**
 * 所有者以外がDeckを更新・削除しようとした場合のエラー
 */
export class DeckForbiddenError extends ForbiddenError {
  readonly deckId: string;

  constructor(deckId: string, requestId?: string) {
    super(
      `Deck ${deckId} operation is only allowed for the creator`,
      requestId,
    );
    this.deckId = deckId;
  }
}

export type DeckDomainError = DeckNotFoundError | DeckForbiddenError;
