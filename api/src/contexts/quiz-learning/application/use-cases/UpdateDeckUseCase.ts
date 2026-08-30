import { errAsync, ok, type ResultAsync } from "neverthrow";
import { FindFailedError, UpdateFailedError } from "../../../../shared/errors";
import type { IUserIdentityResolver } from "../../../../shared/identity/IUserIdentityResolver";
import { type DeckData, QuizId } from "../../domain/entities/deck/Deck";
import { DeckForbiddenError, DeckNotFoundError } from "../../domain/errors";
import type { IDeckRepository } from "../../domain/repositories/IDeckRepository";
import {
  DeckUpdateFailedError,
  type DeckUseCaseError,
  UseCaseInternalError,
} from "../errors";
import { type DeckDto, toDeckDto } from "../mappers/deck-dto";

export type UpdateDeckCommand = {
  name?: string;
  description?: string;
  quizIds?: string[];
  /** `anonymousSession`ミドルウェアが供給する`c.var.userFingerprint` */
  creatorFingerprint: string;
};

/**
 * Deck部分更新ユースケース（PATCH、ADR-0028参照）
 */
export class UpdateDeckUseCase {
  constructor(
    private readonly deckRepository: IDeckRepository,
    private readonly identityResolver: IUserIdentityResolver,
  ) {}

  execute(
    id: string,
    command: UpdateDeckCommand,
  ): ResultAsync<DeckDto, DeckUseCaseError> {
    return this.identityResolver
      .resolve(command.creatorFingerprint)
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

            const patch: Partial<DeckData> = {
              lastModifiedAt: new Date()
                .toISOString()
                .slice(0, 19)
                .replace("T", " "),
            };
            if (command.name !== undefined) {
              patch.name = command.name;
            }
            if (command.description !== undefined) {
              patch.description = command.description;
            }
            if (command.quizIds !== undefined) {
              patch.quizIds = command.quizIds.map((quizId) =>
                QuizId.parse(quizId),
              );
            }

            return this.deckRepository
              .update(id, patch)
              .mapErr((repositoryError) => {
                if (repositoryError instanceof UpdateFailedError) {
                  return new DeckUpdateFailedError(id, repositoryError.details);
                }
                return new UseCaseInternalError(
                  "Failed to update deck",
                  repositoryError.message,
                );
              });
          }),
      )
      .andThen((deck) => ok(toDeckDto(deck)));
  }
}
