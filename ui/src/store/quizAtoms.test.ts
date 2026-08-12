import { createStore } from "jotai";
import type { AppError } from "@/types/api";
import type { Quiz } from "@/types/quiz";
import {
  currentQuizAtom,
  quizListAtom,
  quizListErrorAtom,
  quizListLoadingAtom,
  quizListStateAtom,
} from "./quizAtoms";

const sampleQuiz: Quiz = {
  id: "1",
  question: "五角形の内角の和は何度？",
  answerType: "boolean",
  status: "未解答",
  tags: ["数学"],
  hasExplanation: true,
};

describe("quizAtoms", () => {
  it("quizListStateAtom の初期値は idle である", () => {
    const store = createStore();
    expect(store.get(quizListStateAtom)).toEqual({ status: "idle" });
  });

  it("idle のとき quizListAtom は空配列を返す", () => {
    const store = createStore();
    expect(store.get(quizListAtom)).toEqual([]);
  });

  it("idle のとき quizListLoadingAtom は false, quizListErrorAtom は null", () => {
    const store = createStore();
    expect(store.get(quizListLoadingAtom)).toBe(false);
    expect(store.get(quizListErrorAtom)).toBeNull();
  });

  it("loading 状態のとき quizListLoadingAtom が true になる", () => {
    const store = createStore();
    store.set(quizListStateAtom, { status: "loading" });
    expect(store.get(quizListLoadingAtom)).toBe(true);
    expect(store.get(quizListAtom)).toEqual([]);
  });

  it("success 状態のとき quizListAtom がデータを返す", () => {
    const store = createStore();
    store.set(quizListStateAtom, { status: "success", data: [sampleQuiz] });
    expect(store.get(quizListAtom)).toEqual([sampleQuiz]);
    expect(store.get(quizListLoadingAtom)).toBe(false);
    expect(store.get(quizListErrorAtom)).toBeNull();
  });

  it("error 状態のとき quizListErrorAtom がエラーを返す", () => {
    const store = createStore();
    const error: AppError = {
      kind: "network",
      message: "failed",
      cause: undefined,
    };
    store.set(quizListStateAtom, { status: "error", error });
    expect(store.get(quizListErrorAtom)).toEqual(error);
    expect(store.get(quizListAtom)).toEqual([]);
  });

  it("currentQuizAtom の初期値は null で、set した値を読み出せる", () => {
    const store = createStore();
    expect(store.get(currentQuizAtom)).toBeNull();
    store.set(currentQuizAtom, sampleQuiz);
    expect(store.get(currentQuizAtom)).toEqual(sampleQuiz);
  });
});
