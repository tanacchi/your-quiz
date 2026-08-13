import { errAsync, ResultAsync } from "neverthrow";
import {
  type RepositoryError,
  RepositoryErrorFactory,
} from "../../../../shared/errors";
import { Deck, type DeckData } from "../../domain/entities/deck/Deck";
import type { IDeckRepository } from "../../domain/repositories/IDeckRepository";
import { D1DeckMapper } from "../mappers/D1DeckMapper";
import type { D1QueryParam } from "../mappers/d1-deck-types";

const ENTITY_NAME = "Deck";

const SELECT_COLUMNS =
  "id, name, description, quiz_ids, creator_id, created_at, last_modified_at";

/**
 * Cloudflare D1データベースを使用したDeckリポジトリ実装
 *
 * quiz-managementのD1QuizRepositoryと同じ`ResultAsync.fromPromise` +
 * `RepositoryErrorFactory`パターンに従う。
 */
export class D1DeckRepository implements IDeckRepository {
  constructor(private readonly db: D1Database) {}

  create(deck: Deck): ResultAsync<Deck, RepositoryError> {
    return ResultAsync.fromPromise(
      this.db
        .prepare(`
          INSERT INTO Deck (name, description, quiz_ids, creator_id, created_at, last_modified_at)
          VALUES (?, ?, ?, ?, ?, ?)
        `)
        .bind(
          deck.get("name"),
          deck.get("description") ?? null,
          JSON.stringify(deck.get("quizIds")),
          deck.get("creatorId"),
          deck.get("createdAt"),
          deck.get("lastModifiedAt"),
        )
        .run(),
      (error) =>
        RepositoryErrorFactory.createFailed(
          ENTITY_NAME,
          error instanceof Error ? error : new Error("Unknown create error"),
        ),
    ).andThen((result) => {
      const generatedId = String(result.meta.last_row_id);
      const rebuilt = Deck.from({ ...deck.toData(), id: generatedId });
      if (rebuilt.isErr()) {
        return errAsync(
          RepositoryErrorFactory.createFailed(
            ENTITY_NAME,
            new Error(
              `Failed to rebuild deck with generated id: ${JSON.stringify(rebuilt.error)}`,
            ),
          ),
        );
      }
      return ResultAsync.fromSafePromise(Promise.resolve(rebuilt.value));
    });
  }

  findById(id: string): ResultAsync<Deck, RepositoryError> {
    return ResultAsync.fromPromise(
      this.db
        .prepare(`SELECT ${SELECT_COLUMNS} FROM Deck WHERE id = ?`)
        .bind(id)
        .first(),
      (error) =>
        RepositoryErrorFactory.findFailed(
          ENTITY_NAME,
          error instanceof Error ? error : new Error("Unknown find error"),
        ),
    ).andThen((row) => {
      if (row === null) {
        return errAsync(
          RepositoryErrorFactory.findFailed(
            ENTITY_NAME,
            new Error(`Deck not found: ${id}`),
          ),
        );
      }
      return mapRowToDeck(row);
    });
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

    const countQuery = ResultAsync.fromPromise(
      this.db
        .prepare("SELECT COUNT(*) as total FROM Deck WHERE creator_id = ?")
        .bind(creatorId)
        .first<{ total: number }>(),
      (error) =>
        RepositoryErrorFactory.findFailed(
          ENTITY_NAME,
          error instanceof Error ? error : new Error("Failed to count decks"),
        ),
    );

    const dataQuery = ResultAsync.fromPromise(
      this.db
        .prepare(
          `SELECT ${SELECT_COLUMNS} FROM Deck WHERE creator_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,
        )
        .bind(creatorId, limit, offset)
        .all(),
      (error) =>
        RepositoryErrorFactory.findFailed(
          ENTITY_NAME,
          error instanceof Error ? error : new Error("Failed to fetch decks"),
        ),
    );

    return ResultAsync.combine([countQuery, dataQuery]).andThen(
      ([countResult, dataResult]) => {
        const totalCount = countResult?.total ?? 0;

        const mappingResult = D1DeckMapper.fromRows(dataResult.results);
        if (mappingResult.isErr()) {
          return errAsync(
            RepositoryErrorFactory.findFailed(
              ENTITY_NAME,
              new Error(
                `Failed to map deck rows: ${mappingResult.error.message}`,
              ),
            ),
          );
        }

        return ResultAsync.fromSafePromise(
          Promise.resolve({
            items: mappingResult.value,
            totalCount,
            hasMore: offset + limit < totalCount,
          }),
        );
      },
    );
  }

  update(
    id: string,
    patch: Partial<DeckData>,
  ): ResultAsync<Deck, RepositoryError> {
    const fields: string[] = [];
    const params: D1QueryParam[] = [];

    if (patch.name !== undefined) {
      fields.push("name = ?");
      params.push(patch.name);
    }
    if (patch.description !== undefined) {
      fields.push("description = ?");
      params.push(patch.description);
    }
    if (patch.quizIds !== undefined) {
      fields.push("quiz_ids = ?");
      params.push(JSON.stringify(patch.quizIds));
    }
    if (patch.lastModifiedAt !== undefined) {
      fields.push("last_modified_at = ?");
      params.push(patch.lastModifiedAt);
    }

    if (fields.length === 0) {
      return errAsync(
        RepositoryErrorFactory.updateFailed(
          ENTITY_NAME,
          new Error("No fields to update"),
        ),
      );
    }

    params.push(id);

    return ResultAsync.fromPromise(
      this.db
        .prepare(`UPDATE Deck SET ${fields.join(", ")} WHERE id = ?`)
        .bind(...params)
        .run(),
      (error) =>
        RepositoryErrorFactory.updateFailed(
          ENTITY_NAME,
          error instanceof Error ? error : new Error("Unknown update error"),
        ),
    ).andThen(() => this.findById(id));
  }

  delete(id: string): ResultAsync<void, RepositoryError> {
    return ResultAsync.fromPromise(
      this.db.prepare("DELETE FROM Deck WHERE id = ?").bind(id).run(),
      (error) =>
        RepositoryErrorFactory.deleteFailed(
          ENTITY_NAME,
          error instanceof Error ? error : new Error("Unknown delete error"),
        ),
    ).map(() => undefined);
  }
}

function mapRowToDeck(row: unknown): ResultAsync<Deck, RepositoryError> {
  const mappingResult = D1DeckMapper.fromRow(row);
  if (mappingResult.isErr()) {
    return errAsync(
      RepositoryErrorFactory.findFailed(
        ENTITY_NAME,
        new Error(`Failed to map deck row: ${mappingResult.error.message}`),
      ),
    );
  }
  return ResultAsync.fromSafePromise(Promise.resolve(mappingResult.value));
}
