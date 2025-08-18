import type { components } from "../../../../shared/types";
import type { D1QueryParam } from "./types";

/**
 * D1データベース用のSQLクエリ構築を責務とする関数群
 *
 * D1QuizRepositoryから分離し、SQLクエリ構築ロジックの
 * 単体テストとメンテナンスを容易にします。
 */
export namespace D1QueryBuilder {
  /**
   * クイズ検索用のSQLクエリとパラメータを構築
   */
  export function buildFindQuery(options: {
    status?: components["schemas"]["QuizStatus"];
    creatorId?: string | undefined;
    ids?: string[];
    limit?: number;
    offset?: number;
  }): { sql: string; params: D1QueryParam[] } {
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

    const limit = options.limit || 10;
    const offset = options.offset || 0;

    const sql = `
      SELECT q.id, q.question, q.answer_type, q.solution_id, q.explanation, q.status, q.creator_id, q.created_at, q.approved_at
      FROM Quiz q
      ${whereClause}
      ORDER BY q.created_at DESC
      LIMIT ? OFFSET ?
    `;

    return {
      sql: sql.trim(),
      params: [...params, limit, offset],
    };
  }

  /**
   * クイズ件数取得用のSQLクエリとパラメータを構築
   */
  export function buildCountQuery(options: {
    status?: components["schemas"]["QuizStatus"];
    creatorId?: string | undefined;
    ids?: string[];
  }): { sql: string; params: D1QueryParam[] } {
    const conditions: string[] = [];
    const params: D1QueryParam[] = [];

    // WHERE条件の構築（findQueryと同じロジック）
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

    const sql = `SELECT COUNT(*) as total FROM Quiz q ${whereClause}`;

    return {
      sql: sql.trim(),
      params,
    };
  }

  /**
   * ソリューション情報を含むクイズ取得用のSQLクエリを構築
   */
  export function buildFindByIdWithSolutionQuery(id: string): {
    sql: string;
    params: D1QueryParam[];
  } {
    const sql = `
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
      WHERE q.id = ?
      GROUP BY q.id
    `;

    return {
      sql: sql.trim(),
      params: [id],
    };
  }

  /**
   * クイズ作成用のSQLクエリとパラメータを構築
   */
  export function buildCreateQuizQuery(quiz: {
    id: string;
    question: string;
    answerType: string;
    solutionId: string;
    explanation?: string;
    status: string;
    creatorId: string;
    createdAt: string;
    approvedAt?: string;
  }): { sql: string; params: D1QueryParam[] } {
    const sql = `
      INSERT INTO Quiz (id, question, answer_type, solution_id, explanation, status, creator_id, created_at, approved_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params: D1QueryParam[] = [
      quiz.id,
      quiz.question,
      quiz.answerType,
      quiz.solutionId,
      quiz.explanation || null,
      quiz.status,
      quiz.creatorId,
      quiz.createdAt,
      quiz.approvedAt || null,
    ];

    return {
      sql: sql.trim(),
      params,
    };
  }

  /**
   * クイズ更新用のSQLクエリとパラメータを構築
   */
  export function buildUpdateQuizQuery(
    id: string,
    updates: {
      question?: string;
      explanation?: string;
      status?: string;
      approvedAt?: string;
    },
  ): { sql: string; params: D1QueryParam[] } | null {
    const fields: string[] = [];
    const params: D1QueryParam[] = [];

    // 更新可能なフィールドのマッピング
    if (updates.question !== undefined) {
      fields.push("question = ?");
      params.push(updates.question);
    }
    if (updates.explanation !== undefined) {
      fields.push("explanation = ?");
      params.push(updates.explanation);
    }
    if (updates.status !== undefined) {
      fields.push("status = ?");
      params.push(updates.status);
    }
    if (updates.approvedAt !== undefined) {
      fields.push("approved_at = ?");
      params.push(updates.approvedAt);
    }

    if (fields.length === 0) {
      return null;
    }

    params.push(id);

    const sql = `
      UPDATE Quiz
      SET ${fields.join(", ")}
      WHERE id = ?
    `;

    return {
      sql: sql.trim(),
      params,
    };
  }

  /**
   * クイズ削除前の情報取得用クエリ
   */
  export function buildGetQuizInfoForDeleteQuery(id: string): {
    sql: string;
    params: D1QueryParam[];
  } {
    const sql = "SELECT id, solution_id, answer_type FROM Quiz WHERE id = ?";
    return {
      sql,
      params: [id],
    };
  }

  /**
   * 更新後のクイズ情報取得用クエリ
   */
  export function buildGetUpdatedQuizQuery(id: string): {
    sql: string;
    params: D1QueryParam[];
  } {
    const sql = `
      SELECT id, question, answer_type, explanation, status, creator_id, created_at, approved_at 
      FROM Quiz 
      WHERE id = ?
    `;
    return {
      sql: sql.trim(),
      params: [id],
    };
  }
}
