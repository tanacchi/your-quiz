import { errAsync, ok, type ResultAsync } from "neverthrow";
import { DeleteFailedError, FindFailedError } from "../../../../shared/errors";
import type { IUserIdentityResolver } from "../../../../shared/identity/IUserIdentityResolver";
import { DeckForbiddenError, DeckNotFoundError } from "../../domain/errors";
import type { IDeckRepository } from "../../domain/repositories/IDeckRepository";
import {
  DeckDeletionFailedError,
  type DeckUseCaseError,
  UseCaseInternalError,
} from "../errors";

/**
 * Deck削除ユースケース
 */
export class DeleteDeckUseCase {
  constructor(
    private readonly deckRepository: IDeckRepository,
    private readonly identityResolver: IUserIdentityResolver,
  ) {}

  execute(
    id: string,
    creatorFingerprint: string,
  ): ResultAsync<void, DeckUseCaseError> {
    return this.identityResolver
      .resolve(creatorFingerprint)
      .mapErr(
        (repositoryError) =>
          new UseCaseInternalError(
            "Failed to resolve user identity",
            repositoryError.message,
          ),
      )
      .andThen((creatorId) =>
        this.deckRepository
          .findById(id)
          .mapErr((repositoryError) => {
            if (
              repositoryError instanceof FindFailedError &&
              repositoryError.details?.toLowerCase().includes("not found")
            ) {
              return new DeckNotFoundError(id);
            }
            return new UseCaseInternalError(
              "Failed to get deck",
              repositoryError.message,
            );
          })
          .andThen((deck) => {
            if (!deck.isOwnedBy(creatorId)) {
              return errAsync(new DeckForbiddenError(id));
            }

            return this.deckRepository.delete(id).mapErr((repositoryError) => {
              if (repositoryError instanceof DeleteFailedError) {
                return new DeckDeletionFailedError(id, repositoryError.details);
              }
              return new UseCaseInternalError(
                "Failed to delete deck",
                repositoryError.message,
              );
            });
          }),
      )
      .andThen(() => ok(undefined));
  }
}
