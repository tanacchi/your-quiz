import type { SearchQuizzesQuery } from "../../domain/entities/SearchQuizzesQuery";

/**
 * D1クエリのバインドパラメータ型
 */
export type D1QueryParam = string | number | boolean | null;

/**
 * WHERE句とバインドパラメータの組
 */
type WhereClauseResult = {
  clause: string;
  params: D1QueryParam[];
};

/**
 * SQL文とバインドパラメータの組
 */
type BuiltQuery = {
  sql: string;
  params: D1QueryParam[];
};

/**
 * D1データベース用の検索SQLクエリ構築を責務とする関数群
 *
 * D1SearchRepositoryから分離し、SQLクエリ構築ロジックの
 * 単体テストとメンテナンスを容易にします（D1QueryBuilderと同じ設計方針）。
 */

/**
 * LIKEパターン中のワイルドカード文字（% _ \）をエスケープする
 *
 * バックスラッシュを最初に変換しないと、後続の % / _ の変換で
 * 二重エスケープが発生するため、変換順序（\ → % → _）を厳守する。
 *
 * @param value - エスケープ対象の生文字列
 * @returns ESCAPE '\' 句と組み合わせて使うエスケープ済み文字列
 */
export function escapeLikePattern(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/%/g, "\\%").replace(/_/g, "\\_");
}

/**
 * 検索条件からWHERE句とバインドパラメータを構築する
 *
 * データ取得クエリ・件数取得クエリの両方から共用することで、
 * 「一覧では該当するのに件数には含まれない」といった不整合を防ぐ。
 *
 * @param query - 検索クエリエンティティ
 * @returns WHERE句（条件が無ければ空文字）とバインドパラメータ
 */
/**
 * 検索で返してよいクイズのステータス
 *
 * quiz-management の PUBLICLY_VISIBLE_STATUSES と同じ方針。
 * search コンテキストから quiz-management のドメインを import しないよう
 * ここで独立に定義する。
 */
const PUBLIC_SEARCH_STATUSES = ["approved", "published"] as const;

export function buildWhereClause(query: SearchQuizzesQuery): WhereClauseResult {
  const conditions: string[] = [];
  const params: D1QueryParam[] = [];

  // 検索は公開済みのクイズのみを対象にする。
  // status条件が無いと全ステータスを引いてしまい、他人のdraft（下書き）や
  // pending_approval/rejectedが検索結果に出る。
  // 以前はsearch-row.schema.tsのstatusが3値だったためparse失敗による
  // 偶然の除外が働いていたが、それはpublishedも捨てるバグの裏返しだった。
  conditions.push(
    `q.status IN (${PUBLIC_SEARCH_STATUSES.map(() => "?").join(", ")})`,
  );
  params.push(...PUBLIC_SEARCH_STATUSES);

  // 全文検索: 問題文・解説・タグ名を横断してLIKE部分一致
  if (query.searchText) {
    const pattern = `%${escapeLikePattern(query.searchText)}%`;
    conditions.push(
      "(q.question LIKE ? ESCAPE '\\' OR q.explanation LIKE ? ESCAPE '\\' OR EXISTS (SELECT 1 FROM QuizTag qt JOIN Tag t ON t.id = qt.tag_id WHERE qt.quiz_id = q.id AND t.name LIKE ? ESCAPE '\\'))",
    );
    params.push(pattern, pattern, pattern);
  }

  // タグ絞り込み（肯定）: いずれかのタグに一致すればヒット（OR意味論）
  if (query.tags && query.tags.length > 0) {
    conditions.push(
      `EXISTS (SELECT 1 FROM QuizTag qt JOIN Tag t ON t.id = qt.tag_id WHERE qt.quiz_id = q.id AND t.name IN (${query.tags.map(() => "?").join(", ")}))`,
    );
    params.push(...query.tags);
  }

  // タグ絞り込み（否定, `~`プレフィックス由来）
  if (query.excludeTags && query.excludeTags.length > 0) {
    conditions.push(
      `NOT EXISTS (SELECT 1 FROM QuizTag qt JOIN Tag t ON t.id = qt.tag_id WHERE qt.quiz_id = q.id AND t.name IN (${query.excludeTags.map(() => "?").join(", ")}))`,
    );
    params.push(...query.excludeTags);
  }

  if (query.answerType) {
    conditions.push("q.answer_type = ?");
    params.push(query.answerType);
  }

  if (query.creatorId) {
    conditions.push("q.creator_id = ?");
    params.push(query.creatorId);
  }

  // D1の created_at は "YYYY-MM-DD HH:MM:SS" 形式、入力はISO 8601のため
  // datetime() で正規化してから比較する
  if (query.createdAfter) {
    conditions.push("q.created_at >= datetime(?)");
    params.push(query.createdAfter);
  }

  if (query.createdBefore) {
    conditions.push("q.created_at <= datetime(?)");
    params.push(query.createdBefore);
  }

  return {
    clause: conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "",
    params,
  };
}

/**
 * ソート順序を検証済みリテラルへ変換する
 *
 * ユーザー入力をSQLへ直接埋め込まないための許可リスト
 * （呼び出し元でzodによりenum化済みだが、ここでも二重に担保する）。
 */
function resolveSortDirection(sortOrder: "asc" | "desc"): "ASC" | "DESC" {
  return sortOrder === "desc" ? "DESC" : "ASC";
}

/**
 * 検索データ取得用のSQLクエリとバインドパラメータを構築する
 *
 * sortBy はMockSearchRepositoryと同様に、現時点では全て created_at に
 * フォールバックする（relevance/popularity/difficulty を算出するための
 * 集計データがまだ存在しないため）。
 *
 * seedデータは created_at が同一タイムスタンプになり得るため、
 * ページング結果の決定性を保証する目的で q.id を第2ソートキーに使う。
 *
 * @param query - 検索クエリエンティティ
 * @returns 実行可能なSQL文とバインドパラメータ
 */
export function buildSearchDataQuery(query: SearchQuizzesQuery): BuiltQuery {
  const { clause, params } = buildWhereClause(query);
  const direction = resolveSortDirection(query.sortOrder);

  const sql = `
    SELECT
      q.id, q.question, q.answer_type, q.solution_id, q.explanation, q.status, q.creator_id,
      strftime('%Y-%m-%dT%H:%M:%SZ', q.created_at) AS created_at,
      strftime('%Y-%m-%dT%H:%M:%SZ', q.approved_at) AS approved_at,
      (SELECT group_concat(t.name, char(31))
         FROM QuizTag qt JOIN Tag t ON t.id = qt.tag_id
        WHERE qt.quiz_id = q.id) AS tag_names
    FROM Quiz q
    ${clause}
    ORDER BY q.created_at ${direction}, q.id ${direction}
    LIMIT ? OFFSET ?
  `;

  return {
    sql: sql.trim(),
    params: [...params, query.limit, query.offset],
  };
}

/**
 * 検索件数取得用のSQLクエリとバインドパラメータを構築する
 *
 * データ取得クエリと同じWHERE句を使うことで、一覧と件数の不整合を防ぐ。
 *
 * @param query - 検索クエリエンティティ
 * @returns 実行可能なSQL文とバインドパラメータ
 */
export function buildSearchCountQuery(query: SearchQuizzesQuery): BuiltQuery {
  const { clause, params } = buildWhereClause(query);
  const sql = `SELECT COUNT(*) as total FROM Quiz q ${clause}`;

  return {
    sql: sql.trim(),
    params,
  };
}
