import { describe, expect, it } from "vitest";
import { MockAttemptQueryRepository } from "./MockAttemptQueryRepository";

describe("MockAttemptQueryRepository", () => {
  it("常に空配列を返す（Session/Answer未実装のスコープ内簡易実装）", async () => {
    const repository = new MockAttemptQueryRepository();

    const result = await repository.findWrongQuizIds("42", {
      sinceDays: 30,
      maxQuizzes: 50,
    });

    expect(result.isOk()).toBe(true);
    if (result.isOk()) {
      expect(result.value).toEqual([]);
    }
  });

  it("seed()で登録したデータを返す", async () => {
    const repository = new MockAttemptQueryRepository();
    repository.seed("42", ["quiz-1", "quiz-2"]);

    const result = await repository.findWrongQuizIds("42", {
      sinceDays: 30,
      maxQuizzes: 50,
    });

    expect(result.isOk()).toBe(true);
    if (result.isOk()) {
      expect(result.value).toEqual(["quiz-1", "quiz-2"]);
    }
  });

  it("maxQuizzesで件数を制限する", async () => {
    const repository = new MockAttemptQueryRepository();
    repository.seed("42", ["quiz-1", "quiz-2", "quiz-3"]);

    const result = await repository.findWrongQuizIds("42", {
      sinceDays: 30,
      maxQuizzes: 2,
    });

    expect(result.isOk()).toBe(true);
    if (result.isOk()) {
      expect(result.value).toHaveLength(2);
    }
  });
});
