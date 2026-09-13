import { ok, okAsync, ResultAsync } from "neverthrow";
import { FindFailedError } from "../../../../shared/errors";
import type { components } from "../../../../shared/types";
import type { IQuizRepository } from "../../../quiz-management/domain/repositories/IQuizRepository";
import { DeckNotFoundError } from "../../domain/errors";
import type { IDeckRepository } from "../../domain/repositories/IDeckRepository";
import {
  DeckRetrievalFailedError,
  type DeckUseCaseError,
  UseCaseInternalError,
} from "../errors";
import { toDeckDto } from "../mappers/deck-dto";

type DeckWithQuizzesDto = components["schemas"]["DeckWithQuizzes"];
type QuizResponse = components["schemas"]["QuizResponse"];

/**
 * Deck詳細取得ユースケース
 *
 * quiz-managementのIQuizRepositoryを読み取り専用で参照し、
 * Deckに紐づく問題本体を解決する（ADR-0028参照：意図的な
 * コンテキスト間参照）。存在しないQuizIdは結果から除外し、
 * Deck自体の取得は失敗させない。
 */
export class GetDeckUseCase {
  constructor(
    private readonly deckRepository: IDeckRepository,
    private readonly quizRepository: IQuizRepository,
  ) {}

  execute(id: string): ResultAsync<DeckWithQuizzesDto, DeckUseCaseError> {
    return this.deckRepository
      .findById(id)
      .mapErr((repositoryError) => {
        if (
          repositoryError instanceof FindFailedError &&
          repositoryError.details?.toLowerCase().includes("not found")
        ) {
          return new DeckNotFoundError(id);
        }
        if (repositoryError instanceof FindFailedError) {
          return new DeckRetrievalFailedError(id, repositoryError.details);
        }
        return new UseCaseInternalError(
          "Failed to get deck",
          repositoryError.message,
        );
      })
      .andThen((deck) => {
        const quizIds = deck.get("quizIds");
        return ResultAsync.combine(
          quizIds.map((quizId) =>
            this.quizRepository
              .findById(quizId)
              .map((quiz): QuizResponse | undefined => quiz)
              .orElse(() =>
                okAsync<QuizResponse | undefined, never>(undefined),
              ),
          ),
        ).andThen((quizzesOrUndefined) => {
          const quizzes = quizzesOrUndefined.filter(
            (quiz): quiz is QuizResponse => quiz !== undefined,
          );
          const dto: DeckWithQuizzesDto = {
            ...toDeckDto(deck),
            quizzes,
            totalQuizzes: quizzes.length,
          };
          return ok(dto);
        });
      });
  }
}
