import { err, type Result, ResultAsync } from "neverthrow";
import { type AppError, InternalServerError } from "../../../../shared/errors";
import { QuizSummary } from "../../domain/entities/quiz-summary/QuizSummary";
import type { QuizRow } from "../repositories/types";

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
    // 必須フィールドの存在確認
    if (
      !row.id ||
      !row.question ||
      !row.answer_type ||
      !row.status ||
      !row.creator_id ||
      !row.created_at
    ) {
      return err(
        new InternalServerError(
          `Missing required fields in quiz row: ${JSON.stringify({
            id: !!row.id,
            question: !!row.question,
            answer_type: !!row.answer_type,
            status: !!row.status,
            creator_id: !!row.creator_id,
            created_at: !!row.created_at,
          })}`,
        ),
      );
    }

    // QuizSummaryエンティティの作成データを準備
    const createData = {
      id: row.id,
      question: row.question,
      answerType: row.answer_type,
      solutionId: row.solution_id || "",
      explanation: row.explanation || undefined,
      status: row.status,
      creatorId: row.creator_id,
      createdAt: row.created_at,
      approvedAt: row.approved_at || undefined,
      tagIds: [],
    };

    // QuizSummaryエンティティを作成
    const quizSummaryResult = QuizSummary.from(createData);

    return quizSummaryResult.mapErr(
      (error) =>
        new InternalServerError(
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
  static fromRows(rows: QuizRow[]): ResultAsync<QuizSummary[], AppError> {
    return ResultAsync.fromSafePromise(
      Promise.resolve().then(async () => {
        const results: QuizSummary[] = [];
        const errors: Error[] = [];

        for (const [index, row] of rows.entries()) {
          const mappingResult = D1QuizSummaryMapper.fromRow(row);

          if (mappingResult.isErr()) {
            errors.push(
              new Error(`Row ${index}: ${mappingResult.error.message}`),
            );
            continue;
          }

          results.push(mappingResult.value);
        }

        if (errors.length > 0) {
          throw new InternalServerError(
            `Failed to map ${errors.length}/${rows.length} rows: ${errors.map((e) => e.message).join("; ")}`,
          );
        }

        return results;
      }),
    );
  }
}
