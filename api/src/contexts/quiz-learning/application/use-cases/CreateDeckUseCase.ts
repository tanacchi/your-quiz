import { errAsync, ok, type ResultAsync } from "neverthrow";
import { CreateFailedError } from "../../../../shared/errors";
import type { IUserIdentityResolver } from "../../../../shared/identity/IUserIdentityResolver";
import {
  CreatorId,
  Deck,
  DeckId,
  QuizId,
} from "../../domain/entities/deck/Deck";
import type { IDeckRepository } from "../../domain/repositories/IDeckRepository";
import {
  DeckCreationFailedError,
  type DeckUseCaseError,
  UseCaseInternalError,
} from "../errors";
import { type DeckDto, toDeckDto } from "../mappers/deck-dto";

/**
 * Deck作成コマンド
 */
export type CreateDeckCommand = {
  name?: string;
  description?: string;
  quizIds: string[];
  /** `anonymousSession`ミドルウェアが供給する`c.var.userFingerprint` */
  creatorFingerprint: string;
};

/**
 * Deck新規作成ユースケース（手動選択）
 */
export class CreateDeckUseCase {
  constructor(
    private readonly deckRepository: IDeckRepository,
    private readonly identityResolver: IUserIdentityResolver,
  ) {}

  execute(command: CreateDeckCommand): ResultAsync<DeckDto, DeckUseCaseError> {
    return this.identityResolver
      .resolve(command.creatorFingerprint)
      .mapErr(
        (repositoryError) =>
          new UseCaseInternalError(
            "Failed to resolve user identity",
            repositoryError.message,
          ),
      )
      .andThen((creatorId) => {
        const now = new Date().toISOString().slice(0, 19).replace("T", " ");
        const deckId = Date.now().toString();

        const deckResult = Deck.from({
          id: DeckId.parse(deckId),
          name: command.name ?? "無題のDeck",
          ...(command.description !== undefined && {
            description: command.description,
          }),
          quizIds: command.quizIds.map((id) => QuizId.parse(id)),
          creatorId: CreatorId.parse(creatorId),
          createdAt: now,
          lastModifiedAt: now,
        });

        if (deckResult.isErr()) {
          return errAsync(
            new DeckCreationFailedError(
              "validation failed",
              deckResult.error.issues.map((issue) => issue.message).join(", "),
            ),
          );
        }

        return this.deckRepository
          .create(deckResult.value)
          .mapErr((repositoryError) => {
            if (repositoryError instanceof CreateFailedError) {
              return new DeckCreationFailedError(
                "repository create failed",
                repositoryError.details,
              );
            }
            return new UseCaseInternalError(
              "Failed to create deck",
              repositoryError.message,
            );
          });
      })
      .andThen((deck) => ok(toDeckDto(deck)));
  }
}
