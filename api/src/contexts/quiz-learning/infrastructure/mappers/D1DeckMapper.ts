import { err, ok, type Result } from "neverthrow";
import { type AppError, InternalServerError } from "../../../../shared/errors";
import { Deck } from "../../domain/entities/deck/Deck";
import { zodDeckRowSchema } from "./d1-deck-types";

/**
 * D1データベースのDeck行データをDeckエンティティに変換するマッパー
 *
 * quiz-managementのD1QuizSummaryMapperと同じパターンに従う。
 * D1の`.first()`/`.all()`は型パラメータを付けてもランタイム検証を
 * 行わないため、本マッパーが生の行データを受け取りzodで検証・変換する。
 */
// biome-ignore lint/complexity/noStaticOnlyClass: This utility class is intended to be static-only
export class D1DeckMapper {
  /**
   * D1データベースの行データ（未検証）をDeckエンティティに変換
   *
   * @param row - D1データベースから取得した生のDeck行データ
   * @returns Deckエンティティ、またはマッピングエラー
   */
  static fromRow(row: unknown): Result<Deck, AppError> {
    const parsed = zodDeckRowSchema.safeParse(row);
    if (!parsed.success) {
      return err(
        new InternalServerError(
          "Internal server error",
          `Invalid deck row: ${parsed.error.message}`,
        ),
      );
    }
    const rowData = parsed.data;

    const createData = {
      id: rowData.id,
      name: rowData.name,
      ...(rowData.description !== undefined && {
        description: rowData.description,
      }),
      quizIds: rowData.quiz_ids,
      creatorId: rowData.creator_id,
      createdAt: rowData.created_at,
      lastModifiedAt: rowData.last_modified_at,
    };

    const deckResult = Deck.from(createData);

    return deckResult.mapErr(
      (error) =>
        new InternalServerError(
          "Internal server error",
          `Failed to create Deck from row data: ${JSON.stringify(error)}`,
        ),
    );
  }

  /**
   * 複数のD1データベース行データ（未検証）をDeckエンティティ配列に変換
   *
   * @param rows - D1データベースから取得した生のDeck行データの配列
   * @returns Deckエンティティ配列、またはマッピングエラー
   */
  static fromRows(rows: unknown[]): Result<Deck[], AppError> {
    const results: Deck[] = [];
    const errors: Error[] = [];

    for (const [index, row] of rows.entries()) {
      const mappingResult = D1DeckMapper.fromRow(row);

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
