import { Result, type ResultAsync } from "neverthrow";
import { fromZodErrorToAppError } from "../../../../shared";
import { FindFailedError } from "../../../../shared/errors";
import type { components } from "../../../../shared/types";
import type {
  QuizSummary,
  QuizSummaryData,
} from "../../domain/entities/quiz-summary/QuizSummary";
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
  ): components["schemas"]["QuizListResponse"]["items"][number] {
    return {
      id: quizSummary.get("id"),
      question: quizSummary.get("question"),
      answerType: quizSummary.get("answerType"),
      solutionId: quizSummary.get("solutionId"),
      status: quizSummary.get("status"),
      creatorId: quizSummary.get("creatorId"),
      createdAt: quizSummary.get("createdAt"),
      ...(() => {
        const x = quizSummary.get("explanation");
        return x !== undefined ? { explanation: x } : {};
      })(),
      ...(() => {
        const x = quizSummary.get("approvedAt");
        return x !== undefined ? { approvedAt: x } : {};
      })(),
      ...(quizSummary.get("tagIds") && quizSummary.get("tagIds").length > 0
        ? { tags: quizSummary.get("tagIds") }
        : {}),
      solution: this.createMinimalSolution(
        quizSummary.get("answerType"),
        quizSummary.get("solutionId"),
      ),
    } satisfies components["schemas"]["QuizListResponse"]["items"][number];
  }

  /**
   * 最小限のSolutionオブジェクトを作成
   * リスト表示では詳細な解答情報は不要のため、型に合わせた最小限の値を設定
   *
   * @param answerType - 解答タイプ
   * @param solutionId - ソリューションID
   * @returns 最小限のSolutionオブジェクト
   */
  private createMinimalSolution(
    answerType: QuizSummaryData["answerType"],
    solutionId: QuizSummaryData["solutionId"],
  ): components["schemas"]["Solution"] {
    switch (answerType) {
      case "boolean":
        return {
          type: "boolean",
          id: solutionId,
          value: false,
        } as const;
      case "free_text":
        return {
          type: "free_text",
          id: solutionId,
          correctAnswer: "",
          matchingStrategy: "exact",
          caseSensitive: false,
        } as const;
      case "single_choice":
        return {
          type: "single_choice",
          id: solutionId,
          choices: [],
        } as const;
      case "multiple_choice":
        return {
          type: "multiple_choice",
          id: solutionId,
          minCorrectAnswers: 1,
          choices: [],
        } as const;
      default: {
        const unknownAnswerType: never = answerType;
        return unknownAnswerType;
      }
    }
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
  ): ResultAsync<components["schemas"]["QuizListResponse"], UseCaseError> {
    return Result.fromThrowable(
      () => {
        const creatorId = CreatorId.optional().parse(query.creatorId);
        const ids = query.quizId?.map((id) => QuizId.parse(id)) ?? [];

        return {
          status: query.status,
          creatorId,
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
        ...result,
        items: result.items.map((quizSummary) =>
          this.toQuizListItem(quizSummary),
        ),
      }));
  }
}
