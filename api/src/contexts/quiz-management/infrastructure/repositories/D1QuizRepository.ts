import { ResultAsync } from "neverthrow";
import {
  type RepositoryError,
  RepositoryErrorFactory,
} from "../../../../shared/errors";
import { NotFoundError } from "../../../../shared/errors/base";
import type { components } from "../../../../shared/types";
import type { Quiz } from "../../domain/entities/Quiz";
import type { IQuizRepository } from "../../domain/repositories/IQuizRepository";
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
    quiz: Quiz,
    solution: components["schemas"]["Solution"],
  ): ResultAsync<Quiz, RepositoryError> {
    return ResultAsync.fromPromise(
      this.executeCreateTransaction(quiz, solution),
      (error) => {
        console.error("Failed to create quiz:", error);
        return RepositoryErrorFactory.createFailed(
          "Quiz",
          error instanceof Error ? error : new Error("Unknown create error"),
        );
      },
    );
  }

  /**
   * IDでクイズを取得（ソリューション情報含む）
   * 見つからない場合はNotFoundErrorを返す
   */
  findById(
    id: string,
  ): ResultAsync<components["schemas"]["QuizWithSolution"], RepositoryError> {
    return ResultAsync.fromPromise(
      this.executeQueryWithSolution(
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
      ),
      (error) => {
        console.error("Failed to find quiz by ID:", error);
        return RepositoryErrorFactory.findFailed(
          "Quiz",
          error instanceof Error ? error : new Error("Unknown find error"),
        );
      },
    ).andThen((result) => {
      if (result === null) {
        return ResultAsync.fromSafePromise(
          Promise.reject(new NotFoundError(`Quiz not found: ${id}`)),
        );
      }
      return ResultAsync.fromSafePromise(Promise.resolve(result));
    });
  }

  /**
   * 条件に基づいてクイズリストを取得
   * 空の場合は空リストを返す（正常系）
   */
  findMany(
    options: {
      status?: components["schemas"]["QuizStatus"];
      creatorId?: string;
      ids?: string[];
      limit?: number;
      offset?: number;
    } = {},
  ): ResultAsync<
    {
      items: components["schemas"]["QuizWithSolution"][];
      totalCount: number;
      hasMore: boolean;
    },
    RepositoryError
  > {
    return ResultAsync.fromPromise(this.executeFindMany(options), (error) => {
      console.error("Failed to find quizzes:", error);
      return RepositoryErrorFactory.findFailed(
        "Quiz",
        error instanceof Error ? error : new Error("Unknown find many error"),
      );
    });
  }

  /**
   * クイズを更新
   */
  update(id: string, quiz: Partial<Quiz>): ResultAsync<Quiz, RepositoryError> {
    return ResultAsync.fromPromise(this.executeUpdate(id, quiz), (error) => {
      console.error("Failed to update quiz:", error);
      return RepositoryErrorFactory.updateFailed(
        "Quiz",
        error instanceof Error ? error : new Error("Unknown update error"),
      );
    });
  }

  /**
   * クイズを削除
   */
  delete(id: string): ResultAsync<void, RepositoryError> {
    return ResultAsync.fromPromise(this.executeDelete(id), (error) => {
      console.error("Failed to delete quiz:", error);
      return RepositoryErrorFactory.deleteFailed(
        "Quiz",
        error instanceof Error ? error : new Error("Unknown delete error"),
      );
    });
  }

  // Private helper methods

  private async executeCreateTransaction(
    quiz: Quiz,
    solution: components["schemas"]["Solution"],
  ): Promise<Quiz> {
    // ソリューションを先に作成
    const solutionId = await this.createSolution(solution);

    // クイズを作成
    const stmt = this.db.prepare(`
      INSERT INTO Quiz (id, question, answer_type, solution_id, explanation, status, creator_id, created_at, approved_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    await stmt
      .bind(
        quiz.id,
        quiz.question,
        quiz.answerType,
        solutionId,
        quiz.explanation || null,
        quiz.status,
        quiz.creatorId,
        quiz.createdAt,
        quiz.approvedAt || null,
      )
      .run();

    return quiz;
  }

  private async createSolution(
    solution: components["schemas"]["Solution"],
  ): Promise<string> {
    switch (solution.type) {
      case "boolean": {
        const stmt = this.db.prepare(
          "INSERT INTO BooleanSolution (value) VALUES (?)",
        );
        const result = await stmt.bind(solution.value).run();
        return result.meta.last_row_id?.toString() || "";
      }

      case "free_text": {
        const stmt = this.db.prepare(`
          INSERT INTO FreeTextSolution (correct_answer, matching_strategy, case_sensitive)
          VALUES (?, ?, ?)
        `);
        const result = await stmt
          .bind(
            solution.correctAnswer,
            solution.matchingStrategy || "exact",
            solution.caseSensitive || false,
          )
          .run();
        return result.meta.last_row_id?.toString() || "";
      }

      case "single_choice": {
        const stmt = this.db.prepare(
          "INSERT INTO SingleChoiceSolution () VALUES ()",
        );
        const result = await stmt.run();
        const solutionId = result.meta.last_row_id?.toString() || "";

        // 選択肢を作成
        await this.createChoices(solutionId, solution.choices);
        return solutionId;
      }

      case "multiple_choice": {
        const stmt = this.db.prepare(`
          INSERT INTO MultipleChoiceSolution (min_correct_answers)
          VALUES (?)
        `);
        const result = await stmt.bind(solution.minCorrectAnswers || 1).run();
        const solutionId = result.meta.last_row_id?.toString() || "";

        // 選択肢を作成
        await this.createChoices(solutionId, solution.choices);
        return solutionId;
      }

      default:
        throw new Error(
          `Unsupported solution type: ${(solution as { type: string }).type}`,
        );
    }
  }

  private async createChoices(
    solutionId: string,
    choices: components["schemas"]["Choice"][],
  ): Promise<void> {
    const stmt = this.db.prepare(`
      INSERT INTO Choice (solution_id, text, order_index, is_correct)
      VALUES (?, ?, ?, ?)
    `);

    for (const choice of choices) {
      await stmt
        .bind(solutionId, choice.text, choice.orderIndex, choice.isCorrect)
        .run();
    }
  }

  private async executeQueryWithSolution(
    sql: string,
    params: D1QueryParam[],
  ): Promise<components["schemas"]["QuizWithSolution"] | null> {
    const stmt = this.db.prepare(sql);
    const result = await stmt.bind(...params).first();

    if (!result) {
      return null;
    }

    if (!isQuizRow(result)) {
      throw new Error("Invalid quiz row data from database");
    }

    return this.mapRowToQuizWithSolution(result);
  }

  private async executeFindMany(options: {
    status?: components["schemas"]["QuizStatus"];
    creatorId?: string;
    ids?: string[];
    limit?: number;
    offset?: number;
  }): Promise<{
    items: components["schemas"]["QuizWithSolution"][];
    totalCount: number;
    hasMore: boolean;
  }> {
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

    // 総数を取得
    const countStmt = this.db.prepare(
      `SELECT COUNT(*) as total FROM Quiz q ${whereClause}`,
    );
    const countResult = await countStmt.bind(...params).first();

    if (!isCountResult(countResult)) {
      throw new Error("Invalid count result from database");
    }

    const totalCount = (countResult as { total: number }).total;

    // データを取得
    const limit = options.limit || 10;
    const offset = options.offset || 0;

    const dataStmt = this.db.prepare(`
      SELECT 
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
      ${whereClause}
      GROUP BY q.id
      ORDER BY q.created_at DESC
      LIMIT ? OFFSET ?
    `);

    const dataResult = await dataStmt.bind(...params, limit, offset).all();

    const items = dataResult.results
      .filter(isQuizRow)
      .reduce<components["schemas"]["QuizWithSolution"][]>((acc, row) => {
        try {
          const quiz = this.mapRowToQuizWithSolution(row);
          acc.push(quiz);
        } catch (error) {
          console.warn(`Skipping quiz due to data integrity issue:`, {
            quizId: row.id,
            error: error instanceof Error ? error.message : error,
          });
        }
        return acc;
      }, []);

    return {
      items,
      totalCount,
      hasMore: offset + limit < totalCount,
    };
  }

  private async executeUpdate(id: string, quiz: Partial<Quiz>): Promise<Quiz> {
    const fields: string[] = [];
    const params: D1QueryParam[] = [];

    // 更新可能なフィールドのマッピング
    if (quiz.question !== undefined) {
      fields.push("question = ?");
      params.push(quiz.question);
    }
    if (quiz.explanation !== undefined) {
      fields.push("explanation = ?");
      params.push(quiz.explanation);
    }
    if (quiz.status !== undefined) {
      fields.push("status = ?");
      params.push(quiz.status);
    }
    if (quiz.approvedAt !== undefined) {
      fields.push("approved_at = ?");
      params.push(quiz.approvedAt);
    }

    if (fields.length === 0) {
      throw new Error("No fields to update");
    }

    params.push(id);

    const stmt = this.db.prepare(`
      UPDATE Quiz 
      SET ${fields.join(", ")}
      WHERE id = ?
    `);

    await stmt.bind(...params).run();

    // 更新されたクイズを取得
    const updatedQuizResult = await this.findById(id);
    if (updatedQuizResult.isErr()) {
      throw new Error(
        `Failed to fetch updated quiz: ${updatedQuizResult.error}`,
      );
    }

    const updatedQuiz = updatedQuizResult.value;

    // QuizWithSolutionからQuizエンティティに変換
    const { solution: _, ...quizFields } = updatedQuiz;
    return quizFields as Quiz;
  }

  private async executeDelete(id: string): Promise<void> {
    // まずクイズが存在するかチェック
    const existingQuiz = await this.db
      .prepare("SELECT id, solution_id, answer_type FROM Quiz WHERE id = ?")
      .bind(id)
      .first();

    if (!existingQuiz) {
      throw new NotFoundError(`Quiz not found: ${id}`);
    }

    if (!isBasicQuizInfo(existingQuiz)) {
      throw new Error("Invalid quiz info from database");
    }

    // ソリューションと関連データを削除
    const info = existingQuiz as {
      id: string;
      solution_id: string;
      answer_type: string;
    };
    await this.deleteSolution(info.solution_id, info.answer_type);

    // クイズを削除
    await this.db.prepare("DELETE FROM Quiz WHERE id = ?").bind(id).run();
  }

  private async deleteSolution(
    solutionId: string,
    answerType: string,
  ): Promise<void> {
    // 選択肢がある場合は先に削除
    if (answerType === "single_choice" || answerType === "multiple_choice") {
      await this.db
        .prepare("DELETE FROM Choice WHERE solution_id = ?")
        .bind(solutionId)
        .run();
    }

    // ソリューションテーブルから削除
    switch (answerType) {
      case "boolean":
        await this.db
          .prepare("DELETE FROM BooleanSolution WHERE id = ?")
          .bind(solutionId)
          .run();
        break;
      case "free_text":
        await this.db
          .prepare("DELETE FROM FreeTextSolution WHERE id = ?")
          .bind(solutionId)
          .run();
        break;
      case "single_choice":
        await this.db
          .prepare("DELETE FROM SingleChoiceSolution WHERE id = ?")
          .bind(solutionId)
          .run();
        break;
      case "multiple_choice":
        await this.db
          .prepare("DELETE FROM MultipleChoiceSolution WHERE id = ?")
          .bind(solutionId)
          .run();
        break;
    }
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
