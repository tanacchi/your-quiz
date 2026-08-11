/**
 * 学習セッションの atom（ADR-0005）。
 * 実データ連携は #49（quiz-learning: Session+Answer）で行うため、
 * ここでは進行状況の型と派生 atom のみを整備する。
 */
import { atom } from "jotai";

export interface QuizSession {
  readonly quizIds: ReadonlyArray<string>;
  readonly currentIndex: number;
}

export interface SessionProgress {
  readonly current: number;
  readonly total: number;
}

/** 進行中の学習セッション。未開始時は `null`。 */
export const currentSessionAtom = atom<QuizSession | null>(null);

/** セッションの進捗（ADR-0005 の `progressAtom` サンプルに準拠した派生 atom）。 */
export const sessionProgressAtom = atom<SessionProgress>((get) => {
  const session = get(currentSessionAtom);
  if (session === null) {
    return { current: 0, total: 0 };
  }
  return { current: session.currentIndex, total: session.quizIds.length };
});
