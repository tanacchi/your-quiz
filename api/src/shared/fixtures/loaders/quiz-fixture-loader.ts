import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { QuizSummary } from "../../../contexts/quiz-management/domain/entities/quiz-summary/QuizSummary";
import { D1QuizSummaryMapper } from "../../../contexts/quiz-management/infrastructure/mappers/D1QuizSummaryMapper";
import { isQuizRow } from "../../../contexts/quiz-management/infrastructure/mappers/d1-types";

/**
 * D1検証システムを活用したフィクスチャーローダー
 *
 * D1Repositoryと同じ検証フロー（QuizRow → QuizSummary）を使用して
 * 型安全性とデータ整合性を保証します。
 */

const FIXTURES_DIR = join(__dirname, "../data");

let quizCache: QuizSummary[] | null = null;
let searchQuizCache: QuizSummary[] | null = null;

/**
 * 基本的なクイズフィクスチャーを読み込み
 * MockQuizRepository用のデータ
 */
export function loadQuizFixtures(): QuizSummary[] {
  if (quizCache !== null) {
    return quizCache;
  }

  try {
    const filePath = join(FIXTURES_DIR, "quiz-rows.json");
    const jsonData = JSON.parse(readFileSync(filePath, "utf-8"));

    // D1と同じ型検証フロー
    const validatedRows = jsonData.map((row: unknown, index: number) => {
      if (!isQuizRow(row)) {
        throw new Error(
          `Invalid quiz fixture at index ${index}: ${JSON.stringify(row)}`,
        );
      }
      return row;
    });

    // D1と同じマッパー使用
    const result = D1QuizSummaryMapper.fromRows(validatedRows);
    if (result.isErr()) {
      throw new Error(
        `Quiz fixture validation failed: ${result.error.message}`,
      );
    }

    quizCache = result.value;
    return quizCache;
  } catch (error) {
    throw new Error(
      `Failed to load quiz fixtures: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

/**
 * 検索用クイズフィクスチャーを読み込み
 * MockSearchRepository用のデータ
 */
export function loadSearchQuizFixtures(): QuizSummary[] {
  if (searchQuizCache !== null) {
    return searchQuizCache;
  }

  try {
    const filePath = join(FIXTURES_DIR, "search-quiz-rows.json");
    const jsonData = JSON.parse(readFileSync(filePath, "utf-8"));

    // D1と同じ型検証フロー
    const validatedRows = jsonData.map((row: unknown, index: number) => {
      if (!isQuizRow(row)) {
        throw new Error(
          `Invalid search quiz fixture at index ${index}: ${JSON.stringify(row)}`,
        );
      }
      return row;
    });

    // D1と同じマッパー使用
    const result = D1QuizSummaryMapper.fromRows(validatedRows);
    if (result.isErr()) {
      throw new Error(
        `Search quiz fixture validation failed: ${result.error.message}`,
      );
    }

    searchQuizCache = result.value;
    return searchQuizCache;
  } catch (error) {
    throw new Error(
      `Failed to load search quiz fixtures: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

/**
 * キャッシュをクリア（テスト時などで使用）
 */
export function clearFixtureCache(): void {
  quizCache = null;
  searchQuizCache = null;
}

/**
 * フィクスチャーデータの検証のみ実行（開発時デバッグ用）
 */
export function validateFixtures(): { quiz: boolean; search: boolean } {
  try {
    loadQuizFixtures();
    loadSearchQuizFixtures();
    return { quiz: true, search: true };
  } catch (error) {
    console.error("Fixture validation failed:", error);
    return { quiz: false, search: false };
  }
}
