import { errAsync, ok, ResultAsync } from "neverthrow";
import { CreateFailedError } from "../../../../shared/errors";
import type { IUserIdentityResolver } from "../../../../shared/identity/IUserIdentityResolver";
import type { components } from "../../../../shared/types";
import type { SearchQuizzesUseCase } from "../../../search/application/use-cases/SearchQuizzesUseCase";
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

const DEFAULT_DECK_NAME = "検索結果集";

export type CreateDeckFromSearchCommand = {
  searchQuery: string;
  filters?: components["schemas"]["QuizSearchFilters"];
  maxQuizzes: number;
  name?: string;
  description?: string;
  /** `anonymousSession`ミドルウェアが供給する`c.var.userFingerprint` */
  creatorFingerprint: string;
};

/**
 * 検索結果からDeckを生成するユースケース
 *
 * 既存のsearchコンテキストの`SearchQuizzesUseCase`をそのまま注入・
 * 再利用する（現状Mock実装、issue #48でD1化予定。ADR-0028参照）。
 */
export class CreateDeckFromSearchUseCase {
  constructor(
    private readonly deckRepository: IDeckRepository,
    private readonly identityResolver: IUserIdentityResolver,
    private readonly searchQuizzesUseCase: SearchQuizzesUseCase,
  ) {}

  execute(
    command: CreateDeckFromSearchCommand,
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
        ResultAsync.fromSafePromise(
          this.searchQuizzesUseCase.execute({
            q: command.searchQuery,
            tags: command.filters?.tags,
            difficulty: command.filters?.difficulty,
            answerType: command.filters?.answerType,
            limit: command.maxQuizzes,
          }),
        ).andThen((searchResult) => {
          if (searchResult.isErr()) {
            return errAsync<
              { creatorId: string; quizIds: string[] },
              DeckUseCaseError
            >(
              new UseCaseInternalError(
                "Failed to search quizzes",
                JSON.stringify(searchResult.error),
              ),
            );
          }

          const quizIds = searchResult.value.items.map((item) => item.id);
          if (quizIds.length === 0) {
            return errAsync<
              { creatorId: string; quizIds: string[] },
              DeckUseCaseError
            >(
              new DeckCreationFailedError(
                "no search results found",
                command.searchQuery,
              ),
            );
          }

          return ResultAsync.fromSafePromise(
            Promise.resolve({ creatorId, quizIds }),
          );
        }),
      )
      .andThen(({ creatorId, quizIds }) => {
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
