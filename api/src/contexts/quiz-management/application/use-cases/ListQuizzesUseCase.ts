import { Result, type ResultAsync } from "neverthrow";
import { fromZodErrorToAppError } from "../../../../shared";
import { FindFailedError } from "../../../../shared/errors";
import type { components } from "../../../../shared/types";
import type { QuizSummary } from "../../domain/entities/quiz-summary/QuizSummary";
import {
  CreatorId,
  QuizId,
} from "../../domain/entities/quiz-summary/quiz-summary-schema";
import type { IQuizRepository } from "../../domain/repositories/IQuizRepository";
import {
  QuizListRetrievalFailedError,
  type UseCaseError,
  UseCaseInternalError,
} from "../errors";
import type { ListQuizzesQuery } from "../schemas/list-quizzes-query.schema";

export class ListQuizzesUseCase {
  constructor(private readonly quizRepository: IQuizRepository) {}

  /**
   * QuizSummaryエンティティをAPIレスポンス用のアイテムに変換
   *
   * @param quizSummary - 変換対象のQuizSummaryエンティティ
   * @returns APIレスポンス用のクイズアイテム
   */
  private toQuizListItem(
    quizSummary: QuizSummary,
  ): components["schemas"]["QuizSummaryListResponse"]["items"][number] {
    return {
      id: quizSummary.get("id"),
      question: quizSummary.get("question"),
      answerType: quizSummary.get("answerType"),
      solutionId: quizSummary.get("solutionId"),
      status: quizSummary.get("status"),
      creatorId: quizSummary.get("creatorId"),
      createdAt: quizSummary.get("createdAt"),
      tagIds: quizSummary.get("tagIds"),
      ...(() => {
        const x = quizSummary.get("explanation");
        return x !== undefined ? { explanation: x } : {};
      })(),
      ...(() => {
        const x = quizSummary.get("approvedAt");
        return x !== undefined ? { approvedAt: x } : {};
      })(),
    } satisfies components["schemas"]["QuizSummaryListResponse"]["items"][number];
  }

  /**
   * クイズリストを取得する
   *
   * HTTPパラメータまたはドメインクエリオブジェクトを受け取って処理します。
   * HTTPパラメータが渡された場合は内部でドメインクエリに変換します。
   *
   * リファクタリング済み: QuizSummaryエンティティからAPIレスポンス形式への変換を
   * ユースケース層で実行し、ヘキサゴナルアーキテクチャの責務分離に従います。
   *
   * @param queryOrHttpParams - ドメインクエリまたはHTTPパラメータ
   * @returns クイズリストまたはエラー
   */
  execute(
    query: ListQuizzesQuery,
  ): ResultAsync<
    components["schemas"]["QuizSummaryListResponse"],
    UseCaseError
  > {
    return Result.fromThrowable(
      () => {
        const creatorId = CreatorId.optional().parse(query.creatorId);
        const ids = query.quizId?.map((id) => QuizId.parse(id)) ?? [];

        return {
          status: query.status,
          ...(creatorId !== undefined && { creatorId }),
          ids,
          limit: query.limit,
          offset: query.offset,
        };
      },
      (e) => fromZodErrorToAppError(e, "Query validation failed"),
    )()
      .asyncAndThen((q) => this.quizRepository.findMany(q))
      .mapErr((repositoryError) => {
        if (repositoryError instanceof FindFailedError) {
          return new QuizListRetrievalFailedError(
            query,
            repositoryError.details,
          );
        }
        return new UseCaseInternalError(
          "Failed to list quizzes",
          repositoryError.message,
        );
      })
      .map((result) => ({
        items: result.items.map((quizSummary) =>
          this.toQuizListItem(quizSummary),
        ),
        totalCount: result.totalCount,
        hasMore: result.hasMore,
      }));
  }
}
