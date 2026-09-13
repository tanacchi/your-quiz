import { describe, expect, it, vi } from "vitest";
import { D1AttemptQueryRepository } from "./D1AttemptQueryRepository";

const createMockDb = (results: unknown[]) => {
  const all = vi.fn().mockResolvedValue({ results });
  const bind = vi.fn().mockReturnValue({ all });
  const prepare = vi.fn().mockReturnValue({ bind });
  return { db: { prepare } as unknown as D1Database, prepare, bind, all };
};

describe("D1AttemptQueryRepository", () => {
  it("間違えた問題のquiz_idを文字列配列として返す", async () => {
    const { db, bind, prepare } = createMockDb([
      { quiz_id: 1 },
      { quiz_id: 2 },
    ]);
    const repository = new D1AttemptQueryRepository(db);

    const result = await repository.findWrongQuizIds("42", {
      sinceDays: 30,
      maxQuizzes: 50,
    });

    expect(result.isOk()).toBe(true);
    if (result.isOk()) {
      expect(result.value).toEqual(["1", "2"]);
    }
    expect(bind).toHaveBeenCalledWith("42", expect.any(String), 50);
    expect(prepare).toHaveBeenCalledWith(expect.stringContaining("DISTINCT"));
  });

  it("SELECT失敗時はRepositoryErrorを返す", async () => {
    const all = vi.fn().mockRejectedValue(new Error("SELECT failed"));
    const bind = vi.fn().mockReturnValue({ all });
    const prepare = vi.fn().mockReturnValue({ bind });
    const db = { prepare } as unknown as D1Database;
    const repository = new D1AttemptQueryRepository(db);

    const result = await repository.findWrongQuizIds("42", {
      sinceDays: 30,
      maxQuizzes: 50,
    });

    expect(result.isErr()).toBe(true);
  });
});
