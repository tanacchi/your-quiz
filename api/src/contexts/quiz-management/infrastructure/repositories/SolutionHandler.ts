import { ResultAsync } from "neverthrow";
import {
  type RepositoryError,
  RepositoryErrorFactory,
} from "../../../../shared/errors";
import type { components } from "../../../../shared/types";
import {
  isParsedChoice,
  isValidAnswerType,
  isValidMatchingStrategy,
  isValidQuizStatus,
  type QuizRow,
} from "./types";

/**
 * ソリューション関連の処理を責務とする関数群
 *
 * D1QuizRepositoryから分離し、ソリューション作成・削除・マッピング
 * 処理の単体テストとメンテナンスを容易にします。
 */
export namespace SolutionHandler {
  /**
   * ソリューションを作成し、作成されたソリューションIDを返す
   */
  export function createSolution(
    db: D1Database,
    solution: components["schemas"]["Solution"],
  ): ResultAsync<string, RepositoryError> {
    switch (solution.type) {
      case "boolean": {
        return ResultAsync.fromPromise(
          db
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
          db
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
          db.prepare("INSERT INTO SingleChoiceSolution () VALUES ()").run(),
          (error) =>
            RepositoryErrorFactory.createFailed(
              "SingleChoiceSolution",
              error instanceof Error
                ? error
                : new Error("Unknown single choice solution creation error"),
            ),
        ).andThen((result) => {
          const solutionId = result.meta.last_row_id?.toString() || "";
          return SolutionHandler.createChoices(
            db,
            solutionId,
            solution.choices,
          ).map(() => solutionId);
        });
      }

      case "multiple_choice": {
        return ResultAsync.fromPromise(
          db
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
          return SolutionHandler.createChoices(
            db,
            solutionId,
            solution.choices,
          ).map(() => solutionId);
        });
      }

      default: {
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
  }

  /**
   * 選択肢を作成する
   */
  function _createChoices(
    db: D1Database,
    solutionId: string,
    choices: components["schemas"]["Choice"][],
  ): ResultAsync<void, RepositoryError> {
    return ResultAsync.fromPromise(
      (async () => {
        const stmt = db.prepare(`
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

  /**
   * ソリューションとその関連データを削除する
   */
  export function deleteSolution(
    db: D1Database,
    solutionId: string,
    answerType: string,
  ): ResultAsync<void, RepositoryError> {
    const deleteChoices =
      answerType === "single_choice" || answerType === "multiple_choice"
        ? ResultAsync.fromPromise(
            db
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
            db
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
            db
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
            db
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
            db
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

  /**
   * QuizRowデータからSolutionオブジェクトにマッピングする
   */
  function _mapRowToSolution(row: QuizRow): components["schemas"]["Solution"] {
    if (!isValidAnswerType(row.answer_type)) {
      throw new Error(`Invalid answer type: ${row.answer_type}`);
    }

    switch (row.answer_type) {
      case "boolean":
        return {
          type: "boolean",
          id: row.solution_id,
          value: Boolean(row.boolean_value),
        };

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

        return {
          type: "free_text",
          id: row.solution_id,
          correctAnswer: row.correct_answer,
          matchingStrategy,
          caseSensitive: Boolean(row.case_sensitive),
        };
      }

      case "single_choice": {
        const choices = SolutionHandler.parseChoices(row.choices);
        return {
          type: "single_choice",
          id: row.solution_id,
          choices,
        };
      }

      case "multiple_choice": {
        const choices = SolutionHandler.parseChoices(row.choices);
        return {
          type: "multiple_choice",
          id: row.solution_id,
          choices,
          minCorrectAnswers: row.min_correct_answers || 1,
        };
      }

      default:
        throw new Error(`Unsupported answer type: ${row.answer_type}`);
    }
  }

  /**
   * JSON文字列から選択肢配列をパースする
   */
  function _parseChoices(
    choicesJson?: string,
  ): components["schemas"]["Choice"][] {
    if (!choicesJson) {
      return [];
    }

    try {
      const parsed = JSON.parse(`[${choicesJson}]`);
      return parsed
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
        );
    } catch (error) {
      console.error("Failed to parse choices JSON:", choicesJson, error);
      return [];
    }
  }

  /**
   * QuizRowからQuizWithSolutionオブジェクトにマッピングする
   */
  export function mapRowToQuizWithSolution(
    row: QuizRow,
  ): components["schemas"]["QuizWithSolution"] {
    if (!isValidQuizStatus(row.status)) {
      throw new Error(`Invalid quiz status: ${row.status}`);
    }

    const solution = SolutionHandler.mapRowToSolution(row);

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
