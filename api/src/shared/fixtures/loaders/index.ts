/**
 * フィクスチャーローダーのエクスポート
 * D1検証システムを活用した型安全なフィクスチャー読み込み機能
 */

export type { QuizSummary } from "../../../contexts/quiz-management/domain/entities/quiz-summary/QuizSummary";
export {
  clearFixtureCache,
  loadQuizFixtures,
  loadSearchQuizFixtures,
  validateFixtures,
} from "./quiz-fixture-loader";
