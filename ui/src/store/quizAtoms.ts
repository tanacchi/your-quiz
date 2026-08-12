/**
 * クイズ一覧・選択中クイズの atom（ADR-0005）。
 *
 * 読み込み・エラー状態は `docs/instructions/shared/languages/typescript.md`
 * が推奨する判別共用体 `AsyncState<T>` を正本にし、`quizListLoadingAtom` /
 * `quizListErrorAtom` はそこからの読み取り専用の派生 atom として提供する
 * （issue #41 完了条件の `quizLoading` / `quizError` に対応）。
 */
import { atom, type PrimitiveAtom } from "jotai";
import type { AppError, AsyncState } from "@/types/api";
import type { Quiz } from "@/types/quiz";

/** クイズ一覧取得の非同期状態。初期値は未実行を表す `idle`。 */
export const quizListStateAtom: PrimitiveAtom<AsyncState<ReadonlyArray<Quiz>>> =
  atom<AsyncState<ReadonlyArray<Quiz>>>({ status: "idle" });

/** 取得済みのクイズ一覧。未取得・読み込み中・エラー時は空配列。 */
export const quizListAtom = atom((get) => {
  const state = get(quizListStateAtom);
  return state.status === "success" ? state.data : [];
});

/** クイズ一覧を読み込み中かどうか。 */
export const quizListLoadingAtom = atom(
  (get) => get(quizListStateAtom).status === "loading",
);

/** クイズ一覧取得時のエラー。エラーが無ければ `null`。 */
export const quizListErrorAtom = atom<AppError | null>((get) => {
  const state = get(quizListStateAtom);
  return state.status === "error" ? state.error : null;
});

/** 詳細画面等で選択中のクイズ（ADR-0005 のサンプルに準拠）。 */
export const currentQuizAtom = atom<Quiz | null>(null);
