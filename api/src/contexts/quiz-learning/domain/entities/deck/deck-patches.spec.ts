import { describe, expect, it } from "vitest";
import { suggestDeckPatches } from "./deck-patches";

describe("deck-patches", () => {
  it("quizIdsがnull/undefinedの場合は空配列を提案する", () => {
    const patches = suggestDeckPatches({ quizIds: null }, [
      { path: ["quizIds"], code: "custom", message: "invalid" },
    ]);

    expect(patches).toContainEqual({ quizIds: [] });
  });

  it("該当するIssueがないフィールドには何も提案しない", () => {
    const patches = suggestDeckPatches({ name: "test" }, []);
    expect(patches).toEqual([]);
  });

  it("inputがオブジェクトでない場合は空配列を返す", () => {
    const patches = suggestDeckPatches(null, [
      { path: ["quizIds"], code: "custom", message: "invalid" },
    ]);
    expect(patches).toEqual([]);
  });
});
