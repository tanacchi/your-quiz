import { errAsync, okAsync, type ResultAsync } from "neverthrow";
import {
  type RepositoryError,
  RepositoryErrorFactory,
} from "../../../../shared/errors";
import type { Deck, DeckData } from "../../domain/entities/deck/Deck";
import type { IDeckRepository } from "../../domain/repositories/IDeckRepository";

const ENTITY_NAME = "Deck";

/**
 * テスト・開発環境向けのDeckリポジトリのin-memoryモック実装
 *
 * quiz-managementのMockQuizRepositoryと同じ役割を担う。
 */
export class MockDeckRepository implements IDeckRepository {
  private readonly store = new Map<string, Deck>();

  create(deck: Deck): ResultAsync<Deck, RepositoryError> {
    this.store.set(deck.get("id"), deck);
    return okAsync(deck);
  }

  findById(id: string): ResultAsync<Deck, RepositoryError> {
    const deck = this.store.get(id);
    if (deck === undefined) {
      return errAsync(
        RepositoryErrorFactory.findFailed(
          ENTITY_NAME,
          new Error(`Deck not found: ${id}`),
        ),
      );
    }
    return okAsync(deck);
  }

  findByCreator(
    creatorId: string,
    options: { limit?: number; offset?: number } = {},
  ): ResultAsync<
    { items: Deck[]; totalCount: number; hasMore: boolean },
    RepositoryError
  > {
    const limit = options.limit ?? 20;
    const offset = options.offset ?? 0;

    const filtered = [...this.store.values()].filter(
      (deck) => deck.get("creatorId") === creatorId,
    );
    const totalCount = filtered.length;
    const items = filtered.slice(offset, offset + limit);
    const hasMore = offset + limit < totalCount;

    return okAsync({ items, totalCount, hasMore });
  }

  update(
    id: string,
    patch: Partial<DeckData>,
  ): ResultAsync<Deck, RepositoryError> {
    const existing = this.store.get(id);
    if (existing === undefined) {
      return errAsync(
        RepositoryErrorFactory.updateFailed(
          ENTITY_NAME,
          new Error(`Deck not found: ${id}`),
        ),
      );
    }

    const updateResult = existing.with(patch);
    if (updateResult.isErr()) {
      return errAsync(
        RepositoryErrorFactory.updateFailed(
          ENTITY_NAME,
          new Error(
            `Failed to apply patch: ${updateResult.error.issues.map((issue) => issue.message).join(", ")}`,
          ),
        ),
      );
    }

    this.store.set(id, updateResult.value);
    return okAsync(updateResult.value);
  }

  delete(id: string): ResultAsync<void, RepositoryError> {
    if (!this.store.has(id)) {
      return errAsync(
        RepositoryErrorFactory.deleteFailed(
          ENTITY_NAME,
          new Error(`Deck not found: ${id}`),
        ),
      );
    }
    this.store.delete(id);
    return okAsync(undefined);
  }
}
