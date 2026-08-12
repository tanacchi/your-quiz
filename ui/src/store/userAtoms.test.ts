import { createStore } from "jotai";
import { userFingerprintAtom } from "./userAtoms";

const STORAGE_KEY = "your-quiz:fingerprint";

describe("userAtoms", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("localStorage が空のとき初期値は null である", () => {
    const store = createStore();
    expect(store.get(userFingerprintAtom)).toBeNull();
  });

  it("set すると localStorage に永続化される", () => {
    const store = createStore();
    store.set(userFingerprintAtom, "fp-123");

    expect(store.get(userFingerprintAtom)).toBe("fp-123");
    expect(localStorage.getItem(STORAGE_KEY)).toBe(JSON.stringify("fp-123"));
  });

  it("localStorage に既存値があれば mount 時に復元する", () => {
    // atomWithStorage は import 時点で storage.getItem を 1 度だけ評価するため、
    // 「先に localStorage に値を書き込んでから import する」形の初期値検証はできない。
    // 実際の復元は購読開始（onMount）時に storage.getItem を再実行する挙動に依るため、
    // store.sub で mount をトリガーして検証する。
    localStorage.setItem(STORAGE_KEY, JSON.stringify("fp-existing"));

    const store = createStore();
    const unsubscribe = store.sub(userFingerprintAtom, () => {});

    expect(store.get(userFingerprintAtom)).toBe("fp-existing");
    unsubscribe();
  });
});
