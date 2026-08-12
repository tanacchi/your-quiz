import { createStore } from "jotai";
import { currentSessionAtom, sessionProgressAtom } from "./sessionAtoms";

describe("sessionAtoms", () => {
  it("currentSessionAtom の初期値は null である", () => {
    const store = createStore();
    expect(store.get(currentSessionAtom)).toBeNull();
  });

  it("セッション未開始時の進捗は current: 0, total: 0 になる", () => {
    const store = createStore();
    expect(store.get(sessionProgressAtom)).toEqual({ current: 0, total: 0 });
  });

  it("セッション設定後は currentIndex / quizIds.length を反映する", () => {
    const store = createStore();
    store.set(currentSessionAtom, {
      quizIds: ["1", "2", "3"],
      currentIndex: 1,
    });
    expect(store.get(sessionProgressAtom)).toEqual({ current: 1, total: 3 });
  });
});
