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
import type { D1QueryParam, QuizRow } from "./types";
import {
  isBasicQuizInfo,
  isCountResult,
  isParsedChoice,
  isQuizRow,
  isValidAnswerType,
  isValidMatchingStrategy,
  isValidQuizStatus,
} from "./types";

/**
 * Cloudflare D1データベースを使用したクイズリポジトリ実装
 *
 * D1データベースに対してCRUD操作を実行し、neverthrowを使用して
 * 型安全なエラーハンドリングを提供します。
 */
export class D1QuizRepository implements IQuizRepository {
  constructor(private readonly db: D1Database) {}

  /**
   * クイズとソリューションを作成
   */
  create(
    quiz: QuizSummary,
    solution: components["schemas"]["Solution"],
  ): ResultAsync<QuizSummary, RepositoryError> {
    return this.executeCreateTransaction(quiz, solution).mapErr((error) => {
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
    return this.executeQueryWithSolution(
      `SELECT
        q.*,
        bs.value as boolean_value,
        fts.correct_answer, fts.matching_strategy, fts.case_sensitive,
        GROUP_CONCAT(
          json_object(
            'id', c.id,
            'solutionId', c.solution_id,
            'text', c.text,
            'orderIndex', c.order_index,
            'isCorrect', c.is_correct
          )
        ) as choices,
        mcs.min_correct_answers
      FROM Quiz q
      LEFT JOIN BooleanSolution bs ON q.solution_id = bs.id AND q.answer_type = 'boolean'
      LEFT JOIN FreeTextSolution fts ON q.solution_id = fts.id AND q.answer_type = 'free_text'
      LEFT JOIN SingleChoiceSolution scs ON q.solution_id = scs.id AND q.answer_type = 'single_choice'
      LEFT JOIN MultipleChoiceSolution mcs ON q.solution_id = mcs.id AND q.answer_type = 'multiple_choice'
      LEFT JOIN Choice c ON (scs.id = c.solution_id OR mcs.id = c.solution_id)
      WHERE q.id = ?
      GROUP BY q.id`,
      [id],
    )
      .andThen((result) => {
        if (result === null) {
          return ResultAsync.fromSafePromise(
            Promise.reject(new NotFoundError(`Quiz not found: ${id}`)),
          );
        }
        return ResultAsync.fromSafePromise(Promise.resolve(result));
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
    console.error("D1QuizRepository#findMany");
    return this.executeFindMany(options).mapErr((error) => {
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
    return this.executeUpdate(id, quiz).mapErr((error) => {
      console.error("Failed to update quiz:", error);
      return error;
    });
  }

  /**
   * クイズを削除
   */
  delete(id: string): ResultAsync<void, RepositoryError> {
    return this.executeDelete(id).mapErr((error) => {
      console.error("Failed to delete quiz:", error);
      return error;
    });
  }

  // Private helper methods

  private executeCreateTransaction(
    quiz: QuizSummary,
    solution: components["schemas"]["Solution"],
  ): ResultAsync<QuizSummary, RepositoryError> {
    return this.createSolution(solution).andThen((solutionId) =>
      ResultAsync.fromPromise(
        this.db
          .prepare(`
          INSERT INTO Quiz (id, question, answer_type, solution_id, explanation, status, creator_id, created_at, approved_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `)
          .bind(
            quiz.get("id"),
            quiz.get("question"),
            quiz.get("answerType"),
            solutionId,
            quiz.get("explanation") || null,
            quiz.get("status"),
            quiz.get("creatorId"),
            quiz.get("createdAt"),
            quiz.get("approvedAt") || null,
          )
          .run(),
        (error) =>
          RepositoryErrorFactory.createFailed(
            "Quiz",
            error instanceof Error
              ? error
              : new Error("Unknown quiz creation error"),
          ),
      ).map(() => quiz),
    );
  }

  private createSolution(
    solution: components["schemas"]["Solution"],
  ): ResultAsync<string, RepositoryError> {
    switch (solution.type) {
      case "boolean": {
        return ResultAsync.fromPromise(
          this.db
            .prepare("INSERT INTO BooleanSolution (value) VALUES (?)")
            .bind(solution.value)
            .run(),
          (error) =>
            RepositoryErrorFactory.createFailed(
              "BooleanSolution",
              error instanceof Error
                ? error
                : new Error("Unknown boolean solution creation error"),
            ),
        ).map((result) => result.meta.last_row_id?.toString() || "");
      }

      case "free_text": {
        return ResultAsync.fromPromise(
          this.db
            .prepare(`
            INSERT INTO FreeTextSolution (correct_answer, matching_strategy, case_sensitive)
            VALUES (?, ?, ?)
          `)
            .bind(
              solution.correctAnswer,
              solution.matchingStrategy || "exact",
              solution.caseSensitive || false,
            )
            .run(),
          (error) =>
            RepositoryErrorFactory.createFailed(
              "FreeTextSolution",
              error instanceof Error
                ? error
                : new Error("Unknown free text solution creation error"),
            ),
        ).map((result) => result.meta.last_row_id?.toString() || "");
      }

      case "single_choice": {
        return ResultAsync.fromPromise(
          this.db
            .prepare("INSERT INTO SingleChoiceSolution () VALUES ()")
            .run(),
          (error) =>
            RepositoryErrorFactory.createFailed(
              "SingleChoiceSolution",
              error instanceof Error
                ? error
                : new Error("Unknown single choice solution creation error"),
            ),
        ).andThen((result) => {
          const solutionId = result.meta.last_row_id?.toString() || "";
          return this.createChoices(solutionId, solution.choices).map(
            () => solutionId,
          );
        });
      }

      case "multiple_choice": {
        return ResultAsync.fromPromise(
          this.db
            .prepare(`
            INSERT INTO MultipleChoiceSolution (min_correct_answers)
            VALUES (?)
          `)
            .bind(solution.minCorrectAnswers || 1)
            .run(),
          (error) =>
            RepositoryErrorFactory.createFailed(
              "MultipleChoiceSolution",
              error instanceof Error
                ? error
                : new Error("Unknown multiple choice solution creation error"),
            ),
        ).andThen((result) => {
          const solutionId = result.meta.last_row_id?.toString() || "";
          return this.createChoices(solutionId, solution.choices).map(
            () => solutionId,
          );
        });
      }

      default:
        return ResultAsync.fromSafePromise(
          Promise.reject(
            RepositoryErrorFactory.createFailed(
              "Solution",
              new Error(
                `Unsupported solution type: ${(solution as { type: string }).type}`,
              ),
            ),
          ),
        );
    }
  }

  private createChoices(
    solutionId: string,
    choices: components["schemas"]["Choice"][],
  ): ResultAsync<void, RepositoryError> {
    return ResultAsync.fromPromise(
      (async () => {
        const stmt = this.db.prepare(`
          INSERT INTO Choice (solution_id, text, order_index, is_correct)
          VALUES (?, ?, ?, ?)
        `);

        for (const choice of choices) {
          await stmt
            .bind(solutionId, choice.text, choice.orderIndex, choice.isCorrect)
            .run();
        }
      })(),
      (error) =>
        RepositoryErrorFactory.createFailed(
          "Choice",
          error instanceof Error
            ? error
            : new Error("Unknown choice creation error"),
        ),
    );
  }

  private executeQueryWithSolution(
    sql: string,
    params: D1QueryParam[],
  ): ResultAsync<
    components["schemas"]["QuizWithSolution"] | null,
    RepositoryError
  > {
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
    ).andThen((result) => {
      if (!result) {
        return ResultAsync.fromSafePromise(Promise.resolve(null));
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
        const quizWithSolution = this.mapRowToQuizWithSolution(result);
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
    });
  }

  private executeFindMany(options: {
    status?: components["schemas"]["QuizStatus"];
    creatorId?: string | undefined;
    ids?: string[];
    limit?: number;
    offset?: number;
  }): ResultAsync<
    {
      items: QuizSummary[];
      totalCount: number;
      hasMore: boolean;
    },
    RepositoryError
  > {
    const conditions: string[] = [];
    const params: D1QueryParam[] = [];

    // WHERE条件の構築
    if (options.status) {
      conditions.push("q.status = ?");
      params.push(options.status);
    }
    if (options.creatorId) {
      conditions.push("q.creator_id = ?");
      params.push(options.creatorId);
    }
    if (options.ids && options.ids.length > 0) {
      conditions.push(`q.id IN (${options.ids.map(() => "?").join(", ")})`);
      params.push(...options.ids);
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
    console.warn(`whereClause: ${whereClause}`);
    console.warn(`params: ${params}`);

    // 総数を取得
    const countQuery = ResultAsync.fromPromise(
      this.db
        .prepare(`SELECT COUNT(*) as total FROM Quiz q ${whereClause}`)
        .bind(...params)
        .first(),
      (error) =>
        RepositoryErrorFactory.findFailed(
          "Quiz",
          error instanceof Error ? error : new Error("Failed to count quizzes"),
        ),
    );

    const limit = options.limit || 10;
    const offset = options.offset || 0;

    // データを取得
    const dataQuery = ResultAsync.fromPromise(
      this.db
        .prepare(`
        SELECT q.id, q.question, q.answer_type, q.solution_id, q.explanation, q.status, q.creator_id, q.created_at, q.approved_at
        FROM Quiz q
        ${whereClause}
        ORDER BY q.created_at DESC
        LIMIT ? OFFSET ?
      `)
        .bind(...params, limit, offset)
        .all<QuizRow>(),
      (error) =>
        RepositoryErrorFactory.findFailed(
          "Quiz",
          error instanceof Error ? error : new Error("Failed to fetch quizzes"),
        ),
    );
    console.warn(`dataQuery: ${JSON.stringify(dataQuery)}`);

    return ResultAsync.combine([countQuery, dataQuery])
      .orTee((e) => console.warn(`findError: ${e.message}`))
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
        console.warn(`result: ${JSON.stringify(dataResult.results)}`);
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

        return ResultAsync.fromSafePromise(
          Promise.resolve({
            items: mappingResult.value,
            totalCount,
            hasMore: offset + limit < totalCount,
          }),
        );
      });
  }

  private executeUpdate(
    id: string,
    quiz: Partial<QuizSummary>,
  ): ResultAsync<QuizSummary, RepositoryError> {
    const fields: string[] = [];
    const params: D1QueryParam[] = [];

    // 更新可能なフィールドのマッピング
    // Partial<QuizSummary>の場合、getメソッドを使用できないため、単純なフィールドアクセスを使用
    // QuizSummaryData の Partial でも良いかも.
    if ("question" in quiz && quiz.question !== undefined) {
      fields.push("question = ?");
      params.push(quiz.question as string);
    }
    if ("explanation" in quiz && quiz.explanation !== undefined) {
      fields.push("explanation = ?");
      params.push(quiz.explanation as string);
    }
    if ("status" in quiz && quiz.status !== undefined) {
      fields.push("status = ?");
      params.push(quiz.status as string);
    }
    if ("approvedAt" in quiz && quiz.approvedAt !== undefined) {
      fields.push("approved_at = ?");
      params.push(quiz.approvedAt as string);
    }

    if (fields.length === 0) {
      return ResultAsync.fromSafePromise(
        Promise.reject(
          RepositoryErrorFactory.updateFailed(
            "Quiz",
            new Error("No fields to update"),
          ),
        ),
      );
    }

    params.push(id);

    // 更新実行
    const updateQuery = ResultAsync.fromPromise(
      this.db
        .prepare(`
        UPDATE Quiz
        SET ${fields.join(", ")}
        WHERE id = ?
      `)
        .bind(...params)
        .run(),
      (error) =>
        RepositoryErrorFactory.updateFailed(
          "Quiz",
          error instanceof Error ? error : new Error("Unknown update error"),
        ),
    );

    // 更新されたデータを再取得
    return updateQuery.andThen(() =>
      ResultAsync.fromPromise(
        this.db
          .prepare(
            "SELECT id, question, answer_type, explanation, status, creator_id, created_at, approved_at FROM Quiz WHERE id = ?",
          )
          .bind(id)
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
      }),
    );
  }

  private executeDelete(id: string): ResultAsync<void, RepositoryError> {
    return ResultAsync.fromPromise(
      this.db
        .prepare("SELECT id, solution_id, answer_type FROM Quiz WHERE id = ?")
        .bind(id)
        .first(),
      (error) =>
        RepositoryErrorFactory.findFailed(
          "Quiz",
          error instanceof Error
            ? error
            : new Error("Failed to check quiz existence"),
        ),
    ).andThen((existingQuiz) => {
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
      return this.deleteSolution(info.solution_id, info.answer_type).andThen(
        () =>
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
    });
  }

  private deleteSolution(
    solutionId: string,
    answerType: string,
  ): ResultAsync<void, RepositoryError> {
    const deleteChoices =
      answerType === "single_choice" || answerType === "multiple_choice"
        ? ResultAsync.fromPromise(
            this.db
              .prepare("DELETE FROM Choice WHERE solution_id = ?")
              .bind(solutionId)
              .run(),
            (error) =>
              RepositoryErrorFactory.deleteFailed(
                "Choice",
                error instanceof Error
                  ? error
                  : new Error("Failed to delete choices"),
              ),
          ).map(() => undefined)
        : ResultAsync.fromSafePromise(Promise.resolve(undefined));

    return deleteChoices.andThen(() => {
      let solutionDeleteQuery: ResultAsync<unknown, RepositoryError>;

      switch (answerType) {
        case "boolean":
          solutionDeleteQuery = ResultAsync.fromPromise(
            this.db
              .prepare("DELETE FROM BooleanSolution WHERE id = ?")
              .bind(solutionId)
              .run(),
            (error) =>
              RepositoryErrorFactory.deleteFailed(
                "BooleanSolution",
                error instanceof Error
                  ? error
                  : new Error("Failed to delete boolean solution"),
              ),
          );
          break;
        case "free_text":
          solutionDeleteQuery = ResultAsync.fromPromise(
            this.db
              .prepare("DELETE FROM FreeTextSolution WHERE id = ?")
              .bind(solutionId)
              .run(),
            (error) =>
              RepositoryErrorFactory.deleteFailed(
                "FreeTextSolution",
                error instanceof Error
                  ? error
                  : new Error("Failed to delete free text solution"),
              ),
          );
          break;
        case "single_choice":
          solutionDeleteQuery = ResultAsync.fromPromise(
            this.db
              .prepare("DELETE FROM SingleChoiceSolution WHERE id = ?")
              .bind(solutionId)
              .run(),
            (error) =>
              RepositoryErrorFactory.deleteFailed(
                "SingleChoiceSolution",
                error instanceof Error
                  ? error
                  : new Error("Failed to delete single choice solution"),
              ),
          );
          break;
        case "multiple_choice":
          solutionDeleteQuery = ResultAsync.fromPromise(
            this.db
              .prepare("DELETE FROM MultipleChoiceSolution WHERE id = ?")
              .bind(solutionId)
              .run(),
            (error) =>
              RepositoryErrorFactory.deleteFailed(
                "MultipleChoiceSolution",
                error instanceof Error
                  ? error
                  : new Error("Failed to delete multiple choice solution"),
              ),
          );
          break;
        default:
          solutionDeleteQuery = ResultAsync.fromSafePromise(
            Promise.reject(
              RepositoryErrorFactory.deleteFailed(
                "Solution",
                new Error(`Unknown answer type: ${answerType}`),
              ),
            ),
          );
      }

      return solutionDeleteQuery.map(() => undefined);
    });
  }

  private mapRowToQuizWithSolution(
    row: QuizRow,
  ): components["schemas"]["QuizWithSolution"] {
    let solution: components["schemas"]["Solution"];

    if (!isValidAnswerType(row.answer_type)) {
      throw new Error(`Invalid answer type: ${row.answer_type}`);
    }

    if (!isValidQuizStatus(row.status)) {
      throw new Error(`Invalid quiz status: ${row.status}`);
    }

    switch (row.answer_type) {
      case "boolean":
        solution = {
          type: "boolean",
          id: row.solution_id,
          value: Boolean(row.boolean_value),
        };
        break;

      case "free_text": {
        if (!row.correct_answer) {
          console.error("Free text solution missing correct_answer:", {
            quizId: row.id,
            solutionId: row.solution_id,
            answerType: row.answer_type,
            correctAnswer: row.correct_answer,
            rawRow: row,
          });
          throw new Error(
            `Data integrity issue: Missing correct_answer for free_text solution. Quiz ID: ${row.id}, Solution ID: ${row.solution_id}`,
          );
        }

        const matchingStrategy = row.matching_strategy || "exact";
        if (!isValidMatchingStrategy(matchingStrategy)) {
          throw new Error(`Invalid matching strategy: ${matchingStrategy}`);
        }

        solution = {
          type: "free_text",
          id: row.solution_id,
          correctAnswer: row.correct_answer,
          matchingStrategy,
          caseSensitive: Boolean(row.case_sensitive),
        };
        break;
      }

      case "single_choice":
      case "multiple_choice": {
        const choices = row.choices
          ? JSON.parse(`[${row.choices}]`)
              .filter(isParsedChoice)
              .map(
                (c: {
                  id: string;
                  solutionId: string;
                  text: string;
                  orderIndex: number;
                  isCorrect: boolean;
                }) => ({
                  id: c.id,
                  solutionId: c.solutionId,
                  text: c.text,
                  orderIndex: c.orderIndex,
                  isCorrect: Boolean(c.isCorrect),
                }),
              )
          : [];

        if (row.answer_type === "single_choice") {
          solution = {
            type: "single_choice",
            id: row.solution_id,
            choices,
          };
        } else {
          solution = {
            type: "multiple_choice",
            id: row.solution_id,
            choices,
            minCorrectAnswers: row.min_correct_answers || 1,
          };
        }
        break;
      }

      default:
        throw new Error(`Unsupported answer type: ${row.answer_type}`);
    }

    const baseQuiz = {
      id: row.id,
      question: row.question,
      answerType: row.answer_type,
      solutionId: row.solution_id,
      status: row.status,
      creatorId: row.creator_id,
      createdAt: row.created_at,
      solution,
    };

    // Optional fieldsを条件付きで追加
    return {
      ...baseQuiz,
      ...(row.explanation && { explanation: row.explanation }),
      ...(row.approved_at && { approvedAt: row.approved_at }),
    };
  }
}
