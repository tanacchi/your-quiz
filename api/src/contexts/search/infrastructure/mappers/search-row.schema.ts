import { z } from "zod";
import type { components } from "../../../../types/generated/api";

/**
 * D1の検索クエリ結果1行分のスキーマ (Zod版)
 *
 * quiz-management の d1-types.ts と同じ方針（zodスキーマ + z.infer で
 * 型を導出）を踏襲し、型アサーション(as)を使わずに行データを検証する。
 */

/**
 * D1の数値IDを文字列に変換するスキーマ
 */
const d1IdSchema = z.union([z.string(), z.number()]).transform(String);

/**
 * タグ名の区切り文字（group_concatで使用するUnit Separator, char(31)）
 */
const TAG_NAME_SEPARATOR = "\x1f";

export const searchRowSchema = z.object({
  id: d1IdSchema,
  question: z.string(),
  answer_type: z.enum([
    "boolean",
    "free_text",
    "single_choice",
    "multiple_choice",
  ]),
  solution_id: d1IdSchema,
  explanation: z.string().nullable(),
  status: z.enum(["pending_approval", "approved", "rejected"]),
  creator_id: d1IdSchema,
  // SearchQueryBuilder が strftime で ISO 8601 化して返すため、文字列として受け取る
  created_at: z.string(),
  approved_at: z.string().nullable(),
  // group_concat(t.name, char(31)) の結果。タグが無いクイズは null
  tag_names: z.string().nullable(),
});

export type SearchRow = z.infer<typeof searchRowSchema>;

/**
 * D1クエリ結果がSearchRowの形式かチェックする型ガード
 */
export function isSearchRow(data: unknown): data is SearchRow {
  return searchRowSchema.safeParse(data).success;
}

/**
 * D1クエリ結果の複数行を検証し、有効な行（zodのtransform適用済み）と
 * 不正な形式で破棄された生の行を振り分ける
 *
 * `isSearchRow` は型ガード（真偽値のみ返す）のため、`filter(isSearchRow)`
 * では TypeScript の型は `SearchRow[]` に絞り込まれるが、実行時の値は
 * D1が返した生オブジェクトのままで、`d1IdSchema` の `transform(String)` が
 * 適用されない（数値IDが数値のまま残る）バグを踏みやすい。
 * この関数は `safeParse` の `.data`（変換後の値）を1回のパースで確実に
 * 使うことで、型と実行時の値を一致させる。
 *
 * @param rows - D1クエリ結果の生の行配列
 * @returns 検証・変換済みの行と、破棄された生の行
 */
export function parseSearchRows(rows: unknown[]): {
  validRows: SearchRow[];
  invalidRows: unknown[];
} {
  const validRows: SearchRow[] = [];
  const invalidRows: unknown[] = [];

  for (const row of rows) {
    const parsed = searchRowSchema.safeParse(row);
    if (parsed.success) {
      validRows.push(parsed.data);
    } else {
      invalidRows.push(row);
    }
  }

  return { validRows, invalidRows };
}

/**
 * 検索件数クエリ（COUNT(*)）の結果行スキーマ
 */
export const searchCountRowSchema = z.object({
  total: z.coerce.number(),
});

export type SearchCountRow = z.infer<typeof searchCountRowSchema>;

/**
 * D1クエリ結果がSearchCountRowの形式かチェックする型ガード
 */
export function isSearchCountRow(data: unknown): data is SearchCountRow {
  return searchCountRowSchema.safeParse(data).success;
}

/**
 * SearchRow を QuizSummary（TypeSpec生成型）へ変換する
 *
 * explanation / approvedAt は Optional フィールドのため、値がない場合は
 * undefined を代入するのではなくキー自体を省略する
 * （既存の MockSearchRepository / D1QuizSummaryMapper と同じ方針）。
 *
 * @param row - 検証済みのD1検索行
 * @returns TypeSpec生成の QuizSummary 形状のオブジェクト
 */
export function toQuizSummary(
  row: SearchRow,
): components["schemas"]["QuizSummary"] {
  return {
    id: row.id,
    question: row.question,
    answerType: row.answer_type,
    solutionId: row.solution_id,
    ...(row.explanation != null && { explanation: row.explanation }),
    status: row.status,
    creatorId: row.creator_id,
    createdAt: row.created_at,
    ...(row.approved_at != null && { approvedAt: row.approved_at }),
    tagIds:
      row.tag_names != null ? row.tag_names.split(TAG_NAME_SEPARATOR) : [],
  };
}
