import type { ResultAsync } from "neverthrow";
import { FindFailedError } from "../../../../shared/errors";
import type { components } from "../../../../shared/types";
import type { QuizSummary } from "../../domain/entities/quiz-summary/QuizSummary";
import type { IQuizRepository } from "../../domain/repositories/IQuizRepository";
import {
  QuizListRetrievalFailedError,
  type UseCaseError,
  UseCaseInternalError,
} from "../errors";

export type ListQuizzesQuery = {
  status?: components["schemas"]["QuizStatus"];
  creatorId?: string;
  ids?: string[];
  limit?: number;
  offset?: number;
};

export type HttpQueryParams = {
  status?: string | undefined;
  creatorId?: string | undefined;
  ids?: string | string[] | undefined;
  limit?: string | undefined;
  offset?: string | undefined;
};

export class ListQuizzesUseCase {
  constructor(private readonly quizRepository: IQuizRepository) {}

  /**
   * HTTPクエリパラメータからドメインクエリオブジェクトを構築する
   *
   * @param httpParams - HTTPリクエストのクエリパラメータ
   * @returns 構築されたListQuizzesQuery
   */
  private buildQueryFromHttpParams(
    httpParams: HttpQueryParams,
  ): ListQuizzesQuery {
    const query: ListQuizzesQuery = {};

    // statusパラメータの処理
    if (httpParams.status) {
      query.status = httpParams.status as components["schemas"]["QuizStatus"];
    }

    // creatorIdパラメータの処理
    if (httpParams.creatorId) {
      query.creatorId = httpParams.creatorId;
    }

    // idsパラメータの処理（配列形式に対応）
    if (httpParams.ids) {
      if (Array.isArray(httpParams.ids)) {
        query.ids = httpParams.ids;
      } else {
        query.ids = [httpParams.ids];
      }
    }

    // limitパラメータの処理
    if (httpParams.limit) {
      query.limit = Number(httpParams.limit);
    }

    // offsetパラメータの処理
    if (httpParams.offset) {
      query.offset = Number(httpParams.offset);
    }

    return query;
  }

  /**
   * パラメータがHTTPクエリパラメータかドメインクエリかを判定する
   *
   * @param params - 判定対象のパラメータ
   * @returns HTTPクエリパラメータの場合true
   */
  private isHttpQueryParams(
    params: ListQuizzesQuery | HttpQueryParams,
  ): params is HttpQueryParams {
    // HTTPパラメータは全てstring型、ドメインクエリはlimit/offsetがnumber型という差異を利用
    return (
      typeof (params as HttpQueryParams).limit === "string" ||
      typeof (params as HttpQueryParams).offset === "string" ||
      typeof (params as HttpQueryParams).status === "string" ||
      typeof (params as HttpQueryParams).creatorId === "string" ||
      (params as HttpQueryParams).ids !== undefined
    );
  }

  /**
   * QuizSummaryエンティティをAPIレスポンス用のアイテムに変換
   *
   * @param quizSummary - 変換対象のQuizSummaryエンティティ
   * @returns APIレスポンス用のクイズアイテム
   */
  private toQuizListItem(
    quizSummary: QuizSummary,
  ): components["schemas"]["QuizListResponse"]["items"][number] {
    // EntityBaseのget()メソッドで各フィールドにアクセス
    const id = quizSummary.get("id") as string;
    const question = quizSummary.get("question");
    const answerType = quizSummary.get("answerType");
    const solutionId = quizSummary.get("solutionId") as string;
    const status = quizSummary.get("status");
    const creatorId = quizSummary.get("creatorId") as string;
    const createdAt = quizSummary.get("createdAt");
    const explanation = quizSummary.get("explanation");
    const approvedAt = quizSummary.get("approvedAt");
    const tagIds = quizSummary.get("tagIds") as string[];

    const baseItem = {
      id,
      question,
      answerType,
      solutionId,
      status,
      creatorId,
      createdAt,
      // 最小限のsolutionオブジェクト（将来的にはスキーマ変更でSolution削除予定）
      solution: this.createMinimalSolution(answerType, solutionId),
    };

    // オプショナルフィールドを条件付きで追加
    const result: typeof baseItem & {
      explanation?: string;
      approvedAt?: string;
      tags?: string[];
    } = { ...baseItem };

    if (explanation !== undefined) {
      result.explanation = explanation;
    }
    if (approvedAt !== undefined) {
      result.approvedAt = approvedAt;
    }
    if (tagIds && tagIds.length > 0) {
      result.tags = tagIds;
    }

    return result as components["schemas"]["QuizListResponse"]["items"][number];
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
    answerType: string,
    solutionId: string,
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
      default:
        throw new Error(`Unsupported answer type: ${answerType}`);
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
    queryOrHttpParams: ListQuizzesQuery | HttpQueryParams = {},
  ): ResultAsync<components["schemas"]["QuizListResponse"], UseCaseError> {
    // HTTPパラメータかドメインクエリかを判定
    const query = this.isHttpQueryParams(queryOrHttpParams)
      ? this.buildQueryFromHttpParams(queryOrHttpParams)
      : queryOrHttpParams;

    return this.quizRepository
      .findMany(query)
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
