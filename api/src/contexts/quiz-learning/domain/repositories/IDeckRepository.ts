import type { ResultAsync } from "neverthrow";
import type { RepositoryError } from "../../../../shared/errors";
import type { Deck, DeckData } from "../entities/deck/Deck";

/**
 * Deck集約のリポジトリインターフェース
 *
 * quiz-managementのIQuizRepositoryと同じ`ResultAsync<T, RepositoryError>`
 * パターンに従う。
 */
export interface IDeckRepository {
  create(deck: Deck): ResultAsync<Deck, RepositoryError>;

  findById(id: string): ResultAsync<Deck, RepositoryError>;

  findByCreator(
    creatorId: string,
    options?: { limit?: number; offset?: number },
  ): ResultAsync<
    { items: Deck[]; totalCount: number; hasMore: boolean },
    RepositoryError
  >;

  update(
    id: string,
    patch: Partial<DeckData>,
  ): ResultAsync<Deck, RepositoryError>;

  delete(id: string): ResultAsync<void, RepositoryError>;
}
