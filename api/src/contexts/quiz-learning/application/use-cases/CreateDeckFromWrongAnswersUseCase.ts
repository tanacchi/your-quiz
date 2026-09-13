import { errAsync, ok, type ResultAsync } from "neverthrow";
import { CreateFailedError } from "../../../../shared/errors";
import type { IUserIdentityResolver } from "../../../../shared/identity/IUserIdentityResolver";
import {
  CreatorId,
  Deck,
  DeckId,
  QuizId,
} from "../../domain/entities/deck/Deck";
import type { IAttemptQueryRepository } from "../../domain/repositories/IAttemptQueryRepository";
import type { IDeckRepository } from "../../domain/repositories/IDeckRepository";
import {
  DeckCreationFailedError,
  type DeckUseCaseError,
  UseCaseInternalError,
} from "../errors";
import { type DeckDto, toDeckDto } from "../mappers/deck-dto";

const DEFAULT_DECK_NAME = "間違い問題集";

export type CreateDeckFromWrongAnswersCommand = {
  name?: string;
  description?: string;
  maxQuizzes: number;
  sinceDays: number;
  /** `anonymousSession`ミドルウェアが供給する`c.var.userFingerprint` */
  creatorFingerprint: string;
};

/**
 * 間違い問題からDeckを生成するユースケース
 *
 * Session/Answer集約自体は次issueのスコープだが、既存の`Attempt`
 * テーブルを`IAttemptQueryRepository`経由で読み取り専用参照する
 * （domain/repositories/IAttemptQueryRepository.ts参照）。
 */
export class CreateDeckFromWrongAnswersUseCase {
  constructor(
    private readonly deckRepository: IDeckRepository,
    private readonly identityResolver: IUserIdentityResolver,
    private readonly attemptQueryRepository: IAttemptQueryRepository,
  ) {}

  execute(
    command: CreateDeckFromWrongAnswersCommand,
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
        this.attemptQueryRepository
          .findWrongQuizIds(creatorId, {
            sinceDays: command.sinceDays,
            maxQuizzes: command.maxQuizzes,
          })
          .mapErr(
            (repositoryError) =>
              new UseCaseInternalError(
                "Failed to find wrong quiz ids",
                repositoryError.message,
              ),
          )
          .andThen((quizIds) => {
            if (quizIds.length === 0) {
              return errAsync(
                new DeckCreationFailedError(
                  "no wrong questions found",
                  `creatorId=${creatorId}, sinceDays=${command.sinceDays}`,
                ),
              );
            }

            const now = new Date().toISOString().slice(0, 19).replace("T", " ");
            const deckResult = Deck.from({
              id: DeckId.parse(Date.now().toString()),
              name: command.name ?? DEFAULT_DECK_NAME,
              ...(command.description !== undefined && {
                description: command.description,
              }),
              quizIds: quizIds.map((id) => QuizId.parse(id)),
              creatorId: CreatorId.parse(creatorId),
              createdAt: now,
              lastModifiedAt: now,
            });

            if (deckResult.isErr()) {
              return errAsync(
                new DeckCreationFailedError(
                  "validation failed",
                  deckResult.error.issues
                    .map((issue) => issue.message)
                    .join(", "),
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
          }),
      )
      .andThen((deck) => ok(toDeckDto(deck)));
  }
}
