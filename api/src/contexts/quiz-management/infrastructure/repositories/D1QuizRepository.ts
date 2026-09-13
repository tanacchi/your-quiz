import { errAsync, okAsync, ResultAsync } from "neverthrow";
import {
  type RepositoryError,
  RepositoryErrorFactory,
} from "../../../../shared/errors";
import type { components } from "../../../../shared/types";
import type {
  QuizSummary,
  QuizSummaryData,
} from "../../domain/entities/quiz-summary/QuizSummary";
import type { IQuizRepository } from "../../domain/repositories/IQuizRepository";
import { D1QuizSummaryMapper } from "../mappers/D1QuizSummaryMapper";
import type { D1QueryParam, QuizRow } from "../mappers/d1-types";
import {
  isBasicQuizInfo,
  isCountResult,
  isQuizRow,
  isValidAnswerType,
  isValidMatchingStrategy,
  isValidQuizStatus,
  parseChoices,
  parseQuizRow,
} from "../mappers/d1-types";

/**
 * answerType に対応する solution テーブル名
 *
 * create（solution作成・Quiz.solution_idのMAX(id)参照）と
 * delete（solutionDeleteStatements）の両方で使う。
 */
const SOLUTION_TABLE_BY_ANSWER_TYPE: Record<
  components["schemas"]["AnswerType"],
  string
> = {
  boolean: "BooleanSolution",
  free_text: "FreeTextSolution",
  single_choice: "SingleChoiceSolution",
  multiple_choice: "MultipleChoiceSolution",
};

/**
 * Cloudflare D1データベースを使用したクイズリポジトリ実装
 *
 * D1データベースに対してCRUD操作を実行し、neverthrowを使用して
 * 型安全なエラーハンドリングを提供します。
 */
export class D1QuizRepository implements IQuizRepository {
  constructor(private readonly db: D1Database) {
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
    return this.executeCreateTransaction(quiz, solution).mapErr((error) => {
      console.error("Failed to create quiz:", error);
      return error;
    });
  }

  /**
   * IDでクイズを取得（ソリューション情報含む）
   * 見つからない場合は FindFailedError(details に "not found") を返す
   */
  findById(
    id: string,
  ): ResultAsync<components["schemas"]["QuizResponse"], RepositoryError> {
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
          // mapFindErrorToUseCaseError は FindFailedError かつ details に
          // "not found" を含む場合に404へ変換する。AppErrorのNotFoundErrorを
          // 返すと RepositoryError ではないため型契約も判定も外れて500になる。
          return errAsync(
            RepositoryErrorFactory.findFailed(
              "Quiz",
              new Error(`Quiz not found: ${id}`),
            ),
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
      status?: components["schemas"]["QuizStatus"][];
      creatorId?: string;
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
    if (!this.db) {
      console.error("FATAL: this.db is undefined in findMany!");
      return errAsync(
        RepositoryErrorFactory.findFailed(
          "Quiz",
          new Error("Database connection not available"),
        ),
      );
    }
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
    patch: Partial<QuizSummaryData>,
  ): ResultAsync<QuizSummary, RepositoryError> {
    return this.executeUpdate(id, patch).mapErr((error) => {
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

  /**
   * クイズと関連行を作成する
   *
   * 以前は solution の INSERT と `INSERT INTO Quiz (id, …)`（UseCase が
   * Date.now で払い出した id を明示）を独立した run() で順に実行していた。
   * 途中で失敗すると孤立した solution / Choice 行が残り、成功しても
   * 入力エンティティをそのまま返すためレスポンスの id / solutionId が
   * DB の実際の値と一致しなかった。
   *
   * db.batch() は単一トランザクションで実行されるため、solution → Quiz →
   * Choice（選択肢型のみ）→ 読み戻しのSELECT を1回のbatchにまとめ、
   * 実際にDBへ入った行をそのまま返す。solutionの行IDは、直前の文が
   * 同じトランザクション内で挿入した行を指す `MAX(id)` のサブクエリで参照する
   * （batch内の書き込みは直列化されるため、途中で他のリクエストが挟まらない。
   * 複数行INSERTの途中で値が変わる last_insert_rowid() は使わない）。
   */
  private executeCreateTransaction(
    quiz: QuizSummary,
    solution: components["schemas"]["Solution"],
  ): ResultAsync<QuizSummary, RepositoryError> {
    const statements = this.buildCreateStatements(quiz, solution);

    return ResultAsync.fromPromise(this.db.batch(statements), (error) =>
      RepositoryErrorFactory.createFailed(
        "Quiz",
        error instanceof Error
          ? error
          : new Error("Unknown quiz creation error"),
      ),
    ).andThen((results) => {
      const readback = results[results.length - 1]?.results[0];
      const parsedRow = parseQuizRow(readback);
      if (parsedRow.isErr()) {
        return errAsync(
          RepositoryErrorFactory.createFailed(
            "Quiz",
            new Error("Invalid quiz row data from database after create"),
          ),
        );
      }

      const mapped = D1QuizSummaryMapper.fromRow(parsedRow.value);
      if (mapped.isErr()) {
        return errAsync(
          RepositoryErrorFactory.createFailed(
            "Quiz",
            new Error(mapped.error.message),
          ),
        );
      }
      return okAsync(mapped.value);
    });
  }

  /**
   * 作成用batchの文を組み立てる（solution → Quiz → Choice[選択肢型のみ] → 読み戻し）
   */
  private buildCreateStatements(
    quiz: QuizSummary,
    solution: components["schemas"]["Solution"],
  ): D1PreparedStatement[] {
    const solutionTable = SOLUTION_TABLE_BY_ANSWER_TYPE[quiz.get("answerType")];

    const statements: D1PreparedStatement[] = [
      this.createSolutionStatement(solution),
      this.db
        .prepare(`
          INSERT INTO Quiz (question, answer_type, solution_id, explanation, status, creator_id, created_at, approved_at)
          VALUES (?, ?, (SELECT MAX(id) FROM ${solutionTable}), ?, ?, ?, ?, NULL)
        `)
        .bind(
          quiz.get("question"),
          quiz.get("answerType"),
          quiz.get("explanation") || null,
          quiz.get("status"),
          quiz.get("creatorId"),
          quiz.get("createdAt"),
        ),
    ];

    if (
      solution.type === "single_choice" ||
      solution.type === "multiple_choice"
    ) {
      statements.push(
        this.createChoicesStatement(solutionTable, solution.choices),
      );
    }

    statements.push(
      this.db.prepare(`
        SELECT id, question, answer_type, solution_id, explanation, status, creator_id, created_at, approved_at
        FROM Quiz WHERE id = (SELECT MAX(id) FROM Quiz)
      `),
    );

    return statements;
  }

  private createSolutionStatement(
    solution: components["schemas"]["Solution"],
  ): D1PreparedStatement {
    switch (solution.type) {
      case "boolean":
        return this.db
          .prepare("INSERT INTO BooleanSolution (value) VALUES (?)")
          .bind(solution.value);

      case "free_text":
        return this.db
          .prepare(`
            INSERT INTO FreeTextSolution (correct_answer, matching_strategy, case_sensitive)
            VALUES (?, ?, ?)
          `)
          .bind(
            solution.correctAnswer,
            solution.matchingStrategy || "exact",
            solution.caseSensitive || false,
          );

      case "single_choice":
        // MySQL構文の () VALUES () は無効。列を指定しないDEFAULT VALUESを使う
        return this.db.prepare(
          "INSERT INTO SingleChoiceSolution DEFAULT VALUES",
        );

      case "multiple_choice":
        return this.db
          .prepare(
            "INSERT INTO MultipleChoiceSolution (min_correct_answers) VALUES (?)",
          )
          .bind(solution.minCorrectAnswers || 1);
    }
  }

  /**
   * 選択肢のINSERT文を組み立てる
   *
   * 選択肢数に上限が無いため、D1の「1文あたりのバインドパラメータ上限」と
   * 「1リクエストあたりのクエリ数上限」を避けるべく、選択肢配列をJSON化した
   * 1個のパラメータをjson_each()で展開してSELECTから一括INSERTする。
   */
  private createChoicesStatement(
    solutionTable: string,
    choices: components["schemas"]["Choice"][],
  ): D1PreparedStatement {
    return this.db
      .prepare(`
        INSERT INTO Choice (quiz_id, solution_id, text, order_index, is_correct)
        SELECT (SELECT MAX(id) FROM Quiz), (SELECT MAX(id) FROM ${solutionTable}),
               json_extract(j.value, '$.text'), json_extract(j.value, '$.orderIndex'), json_extract(j.value, '$.isCorrect')
        FROM json_each(?) AS j
        ORDER BY j.key
      `)
      .bind(JSON.stringify(choices));
  }

  private executeQueryWithSolution(
    sql: string,
    params: D1QueryParam[],
  ): ResultAsync<
    components["schemas"]["QuizResponse"] | null,
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

      // isQuizRow（型ガード）で絞り込んだ行をそのまま使うと、数値IDが number の
      // まま残り、所有者判定で文字列の UserIdentity.id と一致しなくなる。
      // 変換後の値を使う。
      const parsedRow = parseQuizRow(result);
      if (parsedRow.isErr()) {
        return errAsync(
          RepositoryErrorFactory.findFailed(
            "Quiz",
            new Error("Invalid quiz row data from database"),
          ),
        );
      }

      try {
        const quizResponse = this.mapRowToQuizResponse(parsedRow.value);
        return ResultAsync.fromSafePromise(Promise.resolve(quizResponse));
      } catch (error) {
        return errAsync(
          RepositoryErrorFactory.findFailed(
            "Quiz",
            error instanceof Error
              ? error
              : new Error("Failed to map quiz response"),
          ),
        );
      }
    });
  }

  private executeFindMany(options: {
    status?: components["schemas"]["QuizStatus"][];
    creatorId?: string;
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
    if (!this.db) {
      console.error("FATAL: this.db is undefined in executeFindMany!");
      return errAsync(
        RepositoryErrorFactory.findFailed(
          "Quiz",
          new Error("Database connection not available in executeFindMany"),
        ),
      );
    }

    const conditions: string[] = [];
    const params: D1QueryParam[] = [];

    // WHERE条件の構築
    if (options.status && options.status.length > 0) {
      conditions.push(
        `q.status IN (${options.status.map(() => "?").join(", ")})`,
      );
      params.push(...options.status);
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

    return ResultAsync.combine([countQuery, dataQuery]).andThen(
      ([countResult, dataResult]) => {
        // Count結果の検証
        if (!isCountResult(countResult)) {
          return errAsync(
            RepositoryErrorFactory.findFailed(
              "Quiz",
              new Error("Invalid count result from database"),
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

        return ResultAsync.fromSafePromise(
          Promise.resolve({
            items: mappingResult.value,
            totalCount,
            hasMore: offset + limit < totalCount,
          }),
        );
      },
    );
  }

  private executeUpdate(
    id: string,
    patch: Partial<QuizSummaryData>,
  ): ResultAsync<QuizSummary, RepositoryError> {
    const fields: string[] = [];
    const params: D1QueryParam[] = [];

    // 更新可能なフィールドのマッピング
    if (patch.question !== undefined) {
      fields.push("question = ?");
      params.push(patch.question);
    }
    if (patch.explanation !== undefined) {
      fields.push("explanation = ?");
      params.push(patch.explanation);
    }
    if (patch.status !== undefined) {
      fields.push("status = ?");
      params.push(patch.status);
    }
    if (patch.approvedAt !== undefined) {
      fields.push("approved_at = ?");
      params.push(patch.approvedAt);
    }

    if (fields.length === 0) {
      return errAsync(
        RepositoryErrorFactory.updateFailed(
          "Quiz",
          new Error("No fields to update"),
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
            "SELECT id, question, answer_type, solution_id, explanation, status, creator_id, created_at, approved_at FROM Quiz WHERE id = ?",
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
          // UPDATEが0件しかヒットしなかった(対象不在)場合もここに来る
          return errAsync(
            RepositoryErrorFactory.findFailed(
              "Quiz",
              new Error(`Quiz not found: ${id}`),
            ),
          );
        }

        const mappingResult = D1QuizSummaryMapper.fromRow(updatedRow);
        if (mappingResult.isErr()) {
          return errAsync(
            RepositoryErrorFactory.updateFailed(
              "Quiz",
              new Error(
                `Failed to map updated quiz to QuizSummary: ${mappingResult.error.message}`,
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

  /**
   * answerTypeに対応するsolution系テーブルの削除文を返す
   *
   * Quiz.solution_id / Choice.solution_id にFK制約は無いため、Quiz本体より
   * 後に消して問題ない。
   */
  private solutionDeleteStatements(
    solutionId: string,
    answerType: string,
  ): D1PreparedStatement[] | undefined {
    const solutionTableByAnswerType: Record<string, string> = {
      boolean: "BooleanSolution",
      free_text: "FreeTextSolution",
      single_choice: "SingleChoiceSolution",
      multiple_choice: "MultipleChoiceSolution",
    };

    const table = solutionTableByAnswerType[answerType];
    if (table === undefined) {
      return undefined;
    }

    const statements: D1PreparedStatement[] = [];
    if (answerType === "single_choice" || answerType === "multiple_choice") {
      statements.push(
        this.db
          .prepare("DELETE FROM Choice WHERE solution_id = ?")
          .bind(solutionId),
      );
    }
    statements.push(
      this.db.prepare(`DELETE FROM ${table} WHERE id = ?`).bind(solutionId),
    );
    return statements;
  }

  /**
   * クイズと関連行を削除する
   *
   * 以前は「solution削除 → Quiz削除」を別々のクエリとして順に実行していた。
   * QuizTag/Attempt が Quiz(id) をFK参照しているため、タグ付きクイズでは
   * Quiz の DELETE がFK制約違反で失敗する一方、先行する solution の削除は
   * 既にコミット済みとなり、「solutionだけ消えたQuiz行」という恒久破損が
   * 残っていた（GETが500を返し続ける、boolean型では正解falseを返し続ける）。
   *
   * db.batch() は単一トランザクションで実行されるため、途中で失敗しても
   * 何もコミットされない。回答済み(Attempt有り)のクイズは削除できないが、
   * その場合も破損ではなくエラーで終わる。
   */
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
        return errAsync(
          RepositoryErrorFactory.findFailed(
            "Quiz",
            new Error(`Quiz not found: ${id}`),
          ),
        );
      }

      // isBasicQuizInfoは型ガードなので、以降 existingQuiz は
      // { id: string; solution_id: string; answer_type: string } として扱える
      // （型アサーションは使わない）
      if (!isBasicQuizInfo(existingQuiz)) {
        return errAsync(
          RepositoryErrorFactory.deleteFailed(
            "Quiz",
            new Error("Invalid quiz info from database"),
          ),
        );
      }

      const solutionStatements = this.solutionDeleteStatements(
        existingQuiz.solution_id,
        existingQuiz.answer_type,
      );
      if (solutionStatements === undefined) {
        return errAsync(
          RepositoryErrorFactory.deleteFailed(
            "Solution",
            new Error(`Unknown answer type: ${existingQuiz.answer_type}`),
          ),
        );
      }

      // FK参照元(QuizTag)を先に消してからQuiz本体、最後にFK制約の無いsolution系
      const statements: D1PreparedStatement[] = [
        this.db.prepare("DELETE FROM QuizTag WHERE quiz_id = ?").bind(id),
        this.db.prepare("DELETE FROM Quiz WHERE id = ?").bind(id),
        ...solutionStatements,
      ];

      return ResultAsync.fromPromise(this.db.batch(statements), (error) =>
        RepositoryErrorFactory.deleteFailed(
          "Quiz",
          error instanceof Error ? error : new Error("Failed to delete quiz"),
        ),
      ).map(() => undefined);
    });
  }

  private mapRowToQuizResponse(
    row: QuizRow,
  ): components["schemas"]["QuizResponse"] {
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
        // スキーマに合わない選択肢は黙って捨てずにエラーにする
        // （呼び出し元の try/catch で findFailed に変換される）
        const parsedChoices = parseChoices(row.choices);
        if (parsedChoices.isErr()) {
          throw parsedChoices.error;
        }
        const choices = parsedChoices.value;

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
