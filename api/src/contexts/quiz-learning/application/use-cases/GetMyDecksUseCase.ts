import { ok, type ResultAsync } from "neverthrow";
import { FindFailedError } from "../../../../shared/errors";
import type { IUserIdentityResolver } from "../../../../shared/identity/IUserIdentityResolver";
import type { components } from "../../../../shared/types";
import type { IDeckRepository } from "../../domain/repositories/IDeckRepository";
import {
  DeckListRetrievalFailedError,
  type DeckUseCaseError,
  UseCaseInternalError,
} from "../errors";
import { toDeckDto } from "../mappers/deck-dto";

type DeckListResponseDto = components["schemas"]["DeckListResponse"];

export type GetMyDecksQuery = {
  /** `anonymousSession`ミドルウェアが供給する`c.var.userFingerprint` */
  creatorFingerprint: string;
  limit: number;
  offset: number;
};

/**
 * 自分のDeck一覧取得ユースケース
 *
 * issue #47の「一覧」要件は本ユースケース（`GET /decks/mine`）で満たす
 * （ADR-0028参照）。
 */
export class GetMyDecksUseCase {
  constructor(
    private readonly deckRepository: IDeckRepository,
    private readonly identityResolver: IUserIdentityResolver,
  ) {}

  execute(
    query: GetMyDecksQuery,
  ): ResultAsync<DeckListResponseDto, DeckUseCaseError> {
    return this.identityResolver
      .resolve(query.creatorFingerprint)
      .mapErr(
        (repositoryError) =>
          new UseCaseInternalError(
            "Failed to resolve user identity",
            repositoryError.message,
          ),
      )
      .andThen((creatorId) =>
        this.deckRepository
          .findByCreator(creatorId, {
            limit: query.limit,
            offset: query.offset,
          })
          .mapErr((repositoryError) => {
            if (repositoryError instanceof FindFailedError) {
              return new DeckListRetrievalFailedError(
                creatorId,
                repositoryError.details,
              );
            }
            return new UseCaseInternalError(
              "Failed to list decks",
              repositoryError.message,
            );
          }),
      )
      .andThen((result) =>
        ok({
          items: result.items.map((deck) => toDeckDto(deck)),
          totalCount: result.totalCount,
          hasMore: result.hasMore,
        }),
      );
  }
}
