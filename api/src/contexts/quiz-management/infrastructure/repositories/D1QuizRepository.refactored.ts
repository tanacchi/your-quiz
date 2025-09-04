import { errAsync, ResultAsync } from "neverthrow";
import {
  type RepositoryError,
  RepositoryErrorFactory,
} from "../../../../shared/errors";
import { NotFoundError } from "../../../../shared/errors/base";
import type { components } from "../../../../shared/types";
import type { QuizSummary } from "../../domain/entities/quiz-summary/QuizSummary";
import type { IQuizRepository } from "../../domain/repositories/IQuizRepository";
import { D1QuizSummaryMapper } from "../mappers/D1QuizSummaryMapper";
import { D1QueryBuilder } from "./D1QueryBuilder";
import { SolutionHandler } from "./SolutionHandler";
import type { QuizRow } from "./types";
import { isBasicQuizInfo, isCountResult, isQuizRow } from "./types";

/**
 * Cloudflare D1データベースを使用したクイズリポジトリ実装
 *
 * リファクタリング後: D1QueryBuilderとSolutionHandlerに責務を分離し、
 * 依存性注入によってテスタビリティを向上させています。
 */
export class D1QuizRepository implements IQuizRepository {
  constructor(
    private readonly db: D1Database,
    private readonly queryBuilder = D1QueryBuilder,
    private readonly solutionHandler = SolutionHandler,
  ) {
    console.log("D1QuizRepository constructor - db:", !!db);
    if (!db) {
      console.error(
        "FATAL: D1Database is undefined in D1QuizRepository constructor!",
      );
      throw new Error("D1Database is required for D1QuizRepository");
    }
  }

  /**
   * クイズとソリューションを作成
   */
  create(
    quiz: QuizSummary,
    solution: components["schemas"]["Solution"],
  ): ResultAsync<QuizSummary, RepositoryError> {
    return this.solutionHandler
      .createSolution(this.db, solution)
      .andThen((solutionId) => {
        const quizData = {
          id: quiz.get("id"),
          question: quiz.get("question"),
          answerType: quiz.get("answerType"),
          solutionId,
          explanation: quiz.get("explanation"),
          status: quiz.get("status"),
          creatorId: quiz.get("creatorId"),
          createdAt: quiz.get("createdAt"),
          approvedAt: quiz.get("approvedAt"),
        };

        const { sql, params } =
          this.queryBuilder.buildCreateQuizQuery(quizData);

        return ResultAsync.fromPromise(
          this.db
            .prepare(sql)
            .bind(...params)
            .run(),
          (error) =>
            RepositoryErrorFactory.createFailed(
              "Quiz",
              error instanceof Error
                ? error
                : new Error("Unknown quiz creation error"),
            ),
        ).map(() => quiz);
      })
      .mapErr((error) => {
        console.error("Failed to create quiz:", error);
        return error;
      });
  }

  /**
   * IDでクイズを取得（ソリューション情報含む）
   * 見つからない場合はNotFoundErrorを返す
   */
  findById(
    id: string,
  ): ResultAsync<components["schemas"]["QuizWithSolution"], RepositoryError> {
    const { sql, params } =
      this.queryBuilder.buildFindByIdWithSolutionQuery(id);

    return ResultAsync.fromPromise(
      this.db
        .prepare(sql)
        .bind(...params)
        .first(),
      (error) =>
        RepositoryErrorFactory.findFailed(
          "Quiz",
          error instanceof Error ? error : new Error("Unknown query error"),
        ),
    )
      .andThen((result) => {
        if (!result) {
          return ResultAsync.fromSafePromise(
            Promise.reject(new NotFoundError(`Quiz not found: ${id}`)),
          );
        }

        if (!isQuizRow(result)) {
          return ResultAsync.fromSafePromise(
            Promise.reject(
              RepositoryErrorFactory.findFailed(
                "Quiz",
                new Error("Invalid quiz row data from database"),
              ),
            ),
          );
        }

        try {
          const quizWithSolution =
            this.solutionHandler.mapRowToQuizWithSolution(result);
          return ResultAsync.fromSafePromise(Promise.resolve(quizWithSolution));
        } catch (error) {
          return ResultAsync.fromSafePromise(
            Promise.reject(
              RepositoryErrorFactory.findFailed(
                "Quiz",
                error instanceof Error
                  ? error
                  : new Error("Failed to map quiz with solution"),
              ),
            ),
          );
        }
      })
      .mapErr((error) => {
        console.error("Failed to find quiz by ID:", error);
        return error;
      });
  }

  /**
   * 条件に基づいてクイズリストを取得
   * 空の場合は空リストを返す（正常系）
   */
  findMany(
    options: {
      status?: components["schemas"]["QuizStatus"];
      creatorId?: string | undefined;
      ids?: string[];
      limit?: number;
      offset?: number;
    } = {},
  ): ResultAsync<
    {
      items: QuizSummary[];
      totalCount: number;
      hasMore: boolean;
    },
    RepositoryError
  > {
    console.log("D1QuizRepository#findMany - db exists:", !!this.db);
    if (!this.db) {
      console.error("FATAL: this.db is undefined in findMany!");
      return errAsync(
        RepositoryErrorFactory.findFailed(
          "Quiz",
          new Error("Database connection not available"),
        ),
      );
    }

    // 総数を取得
    const { sql: countSql, params: countParams } =
      this.queryBuilder.buildCountQuery(options);
    const countQuery = ResultAsync.fromPromise(
      this.db
        .prepare(countSql)
        .bind(...countParams)
        .first(),
      (error) =>
        RepositoryErrorFactory.findFailed(
          "Quiz",
          error instanceof Error ? error : new Error("Failed to count quizzes"),
        ),
    );

    // データを取得
    const { sql: dataSql, params: dataParams } =
      this.queryBuilder.buildFindQuery(options);
    const dataQuery = ResultAsync.fromPromise(
      this.db
        .prepare(dataSql)
        .bind(...dataParams)
        .all<QuizRow>(),
      (error) =>
        RepositoryErrorFactory.findFailed(
          "Quiz",
          error instanceof Error ? error : new Error("Failed to fetch quizzes"),
        ),
    );

    return ResultAsync.combine([countQuery, dataQuery])
      .andThen(([countResult, dataResult]) => {
        // Count結果の検証
        if (!isCountResult(countResult)) {
          return ResultAsync.fromSafePromise(
            Promise.reject(
              RepositoryErrorFactory.findFailed(
                "Quiz",
                new Error("Invalid count result from database"),
              ),
            ),
          );
        }

        const totalCount = (countResult as { total: number }).total;

        // QuizSummaryエンティティへの変換
        const mappingResult = D1QuizSummaryMapper.fromRows(
          dataResult.results.filter(isQuizRow),
        );

        if (mappingResult.isErr()) {
          return errAsync(
            RepositoryErrorFactory.findFailed(
              "Quiz",
              new Error(
                `Failed to map quiz rows to QuizSummary entities: ${mappingResult.error.message}`,
              ),
            ),
          );
        }

        const limit = options.limit || 10;
        const offset = options.offset || 0;

        return ResultAsync.fromSafePromise(
          Promise.resolve({
            items: mappingResult.value,
            totalCount,
            hasMore: offset + limit < totalCount,
          }),
        );
      })
      .mapErr((error) => {
        console.error("Failed to find quizzes:", error);
        return error;
      });
  }

  /**
   * クイズを更新
   */
  update(
    id: string,
    quiz: Partial<QuizSummary>,
  ): ResultAsync<QuizSummary, RepositoryError> {
    // 更新データの準備（QuizSummaryのPartialからプレーンオブジェクトに変換）
    const updates: {
      question?: string;
      explanation?: string;
      status?: string;
      approvedAt?: string;
    } = {};

    if ("question" in quiz && quiz.question !== undefined) {
      updates.question = quiz.question as string;
    }
    if ("explanation" in quiz && quiz.explanation !== undefined) {
      updates.explanation = quiz.explanation as string;
    }
    if ("status" in quiz && quiz.status !== undefined) {
      updates.status = quiz.status as string;
    }
    if ("approvedAt" in quiz && quiz.approvedAt !== undefined) {
      updates.approvedAt = quiz.approvedAt as string;
    }

    const queryResult = this.queryBuilder.buildUpdateQuizQuery(id, updates);
    if (!queryResult) {
      return ResultAsync.fromSafePromise(
        Promise.reject(
          RepositoryErrorFactory.updateFailed(
            "Quiz",
            new Error("No fields to update"),
          ),
        ),
      );
    }

    const { sql, params } = queryResult;

    // 更新実行
    const updateQuery = ResultAsync.fromPromise(
      this.db
        .prepare(sql)
        .bind(...params)
        .run(),
      (error) =>
        RepositoryErrorFactory.updateFailed(
          "Quiz",
          error instanceof Error ? error : new Error("Unknown update error"),
        ),
    );

    // 更新されたデータを再取得
    return updateQuery
      .andThen(() => {
        const { sql: selectSql, params: selectParams } =
          this.queryBuilder.buildGetUpdatedQuizQuery(id);

        return ResultAsync.fromPromise(
          this.db
            .prepare(selectSql)
            .bind(...selectParams)
            .first(),
          (error) =>
            RepositoryErrorFactory.findFailed(
              "Quiz",
              error instanceof Error
                ? error
                : new Error("Failed to fetch updated quiz"),
            ),
        ).andThen((updatedRow) => {
          if (!updatedRow || !isQuizRow(updatedRow)) {
            return ResultAsync.fromSafePromise(
              Promise.reject(
                RepositoryErrorFactory.findFailed(
                  "Quiz",
                  new Error(`Failed to fetch updated quiz: ${id}`),
                ),
              ),
            );
          }

          const mappingResult = D1QuizSummaryMapper.fromRow(updatedRow);
          if (mappingResult.isErr()) {
            return ResultAsync.fromSafePromise(
              Promise.reject(
                RepositoryErrorFactory.updateFailed(
                  "Quiz",
                  new Error(
                    `Failed to map updated quiz to QuizSummary: ${mappingResult.error.message}`,
                  ),
                ),
              ),
            );
          }

          return ResultAsync.fromSafePromise(
            Promise.resolve(mappingResult.value),
          );
        });
      })
      .mapErr((error) => {
        console.error("Failed to update quiz:", error);
        return error;
      });
  }

  /**
   * クイズを削除
   */
  delete(id: string): ResultAsync<void, RepositoryError> {
    const { sql: checkSql, params: checkParams } =
      this.queryBuilder.buildGetQuizInfoForDeleteQuery(id);

    return ResultAsync.fromPromise(
      this.db
        .prepare(checkSql)
        .bind(...checkParams)
        .first(),
      (error) =>
        RepositoryErrorFactory.findFailed(
          "Quiz",
          error instanceof Error
            ? error
            : new Error("Failed to check quiz existence"),
        ),
    )
      .andThen((existingQuiz) => {
        if (!existingQuiz) {
          return ResultAsync.fromSafePromise(
            Promise.reject(new NotFoundError(`Quiz not found: ${id}`)),
          );
        }

        if (!isBasicQuizInfo(existingQuiz)) {
          return ResultAsync.fromSafePromise(
            Promise.reject(
              RepositoryErrorFactory.deleteFailed(
                "Quiz",
                new Error("Invalid quiz info from database"),
              ),
            ),
          );
        }

        const info = existingQuiz as {
          id: string;
          solution_id: string;
          answer_type: string;
        };

        // ソリューションと関連データを削除
        return this.solutionHandler
          .deleteSolution(this.db, info.solution_id, info.answer_type)
          .andThen(() =>
            // クイズを削除
            ResultAsync.fromPromise(
              this.db.prepare("DELETE FROM Quiz WHERE id = ?").bind(id).run(),
              (error) =>
                RepositoryErrorFactory.deleteFailed(
                  "Quiz",
                  error instanceof Error
                    ? error
                    : new Error("Failed to delete quiz"),
                ),
            ).map(() => undefined),
          );
      })
      .mapErr((error) => {
        console.error("Failed to delete quiz:", error);
        return error;
      });
  }
}
