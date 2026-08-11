import { err, ok, type Result } from "neverthrow";
import { type AppError, InternalServerError } from "../../../../shared/errors";
import { QuizSummary } from "../../domain/entities/quiz-summary/QuizSummary";
import type { QuizRow } from "./d1-types";

/**
 * D1データベースのクイズ行データをQuizSummaryエンティティに変換するマッパー
 *
 * このマッパーはインフラストラクチャ層の責務として、
 * データベースの行データをドメインエンティティに変換する役割を担います。
 */
// biome-ignore lint/complexity/noStaticOnlyClass: This utility class is intended to be static-only
export class D1QuizSummaryMapper {
  /**
   * D1データベースの行データをQuizSummaryエンティティに変換
   *
   * @param row - D1データベースから取得したクイズ行データ
   * @returns QuizSummaryエンティティ、またはマッピングエラー
   */
  static fromRow(row: QuizRow): Result<QuizSummary, AppError> {
    // 必須フィールドの検証（solution_idは空文字列でも有効）
    const requiredFields = [
      "id",
      "question",
      "answer_type",
      "status",
      "creator_id",
      "created_at",
    ] as const;
    const missingFields = requiredFields.filter(
      (field) => !row[field] || row[field] === "",
    );

    if (missingFields.length > 0) {
      return err(
        new InternalServerError(
          "Internal server error",
          `Missing required fields: ${missingFields.join(", ")}`,
        ),
      );
    }

    // QuizSummaryエンティティの作成データを準備
    const createData = {
      id: String(row.id),
      question: row.question,
      answerType: row.answer_type,
      solutionId:
        row.solution_id && row.solution_id !== ""
          ? String(row.solution_id)
          : "placeholder",
      explanation:
        row.explanation && row.explanation !== null
          ? row.explanation
          : undefined,
      status: row.status,
      creatorId: String(row.creator_id),
      createdAt: row.created_at,
      approvedAt:
        row.approved_at && row.approved_at !== null
          ? row.approved_at
          : undefined,
      tagIds: [],
    };

    // QuizSummaryエンティティを作成
    const quizSummaryResult = QuizSummary.from(createData);

    return quizSummaryResult.mapErr(
      (error) =>
        new InternalServerError(
          "Internal server error",
          `Failed to create QuizSummary from row data: ${JSON.stringify(error)}`,
        ),
    );
  }

  /**
   * 複数のD1データベース行データをQuizSummaryエンティティ配列に変換
   *
   * @param rows - D1データベースから取得したクイズ行データの配列
   * @returns QuizSummaryエンティティ配列、またはマッピングエラー
   */
  static fromRows(rows: QuizRow[]): Result<QuizSummary[], AppError> {
    const results: QuizSummary[] = [];
    const errors: Error[] = [];

    for (const [index, row] of rows.entries()) {
      const mappingResult = D1QuizSummaryMapper.fromRow(row);

      if (mappingResult.isErr()) {
        errors.push(new Error(`Row ${index}: ${mappingResult.error.message}`));
        continue;
      }
      results.push(mappingResult.value);
    }

    if (errors.length > 0) {
      return err(
        new InternalServerError(
          "Internal server error",
          `Failed to map ${errors.length}/${rows.length} rows: ${errors.map((e) => e.message).join("; ")}`,
        ),
      );
    }

    return ok(results);
  }
}
