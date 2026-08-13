import { describe, expect, it, vi } from "vitest";
import { D1UserIdentityResolver } from "./D1UserIdentityResolver";

/**
 * D1PreparedStatementの最小モックを組み立てる
 *
 * `SELECT`は`.first()`が呼ばれ、`INSERT`は`.run()`が呼ばれる想定で、
 * それぞれの戻り値を個別に注入できるようにする。
 */
const createMockDb = (options: {
  first: unknown;
  run?: { meta: { last_row_id: number } };
}): D1Database => {
  const first = vi.fn().mockResolvedValue(options.first);
  const run = vi
    .fn()
    .mockResolvedValue(options.run ?? { meta: { last_row_id: 0 } });
  const bind = vi.fn().mockReturnValue({ first, run });
  const prepare = vi.fn().mockReturnValue({ bind });

  return { prepare } as unknown as D1Database;
};

describe("D1UserIdentityResolver", () => {
  it("既存のUserIdentityが見つかった場合はそのidを返す", async () => {
    const db = createMockDb({ first: { id: 42 } });
    const resolver = new D1UserIdentityResolver(db);

    const result = await resolver.resolve("existing-anonymous-id");

    expect(result.isOk()).toBe(true);
    if (result.isOk()) {
      expect(result.value).toBe("42");
    }
  });

  it("UserIdentityが存在しない場合は新規作成しlast_row_idを返す", async () => {
    const db = createMockDb({
      first: null,
      run: { meta: { last_row_id: 7 } },
    });
    const resolver = new D1UserIdentityResolver(db);

    const result = await resolver.resolve("new-anonymous-id");

    expect(result.isOk()).toBe(true);
    if (result.isOk()) {
      expect(result.value).toBe("7");
    }
  });

  it("SELECT失敗時はRepositoryErrorを返す", async () => {
    const first = vi.fn().mockRejectedValue(new Error("SELECT failed"));
    const bind = vi.fn().mockReturnValue({ first });
    const prepare = vi.fn().mockReturnValue({ bind });
    const db = { prepare } as unknown as D1Database;
    const resolver = new D1UserIdentityResolver(db);

    const result = await resolver.resolve("some-id");

    expect(result.isErr()).toBe(true);
  });

  it("INSERT失敗時はRepositoryErrorを返す", async () => {
    const first = vi.fn().mockResolvedValue(null);
    const run = vi.fn().mockRejectedValue(new Error("INSERT failed"));
    const bind = vi.fn().mockReturnValue({ first, run });
    const prepare = vi.fn().mockReturnValue({ bind });
    const db = { prepare } as unknown as D1Database;
    const resolver = new D1UserIdentityResolver(db);

    const result = await resolver.resolve("some-id");

    expect(result.isErr()).toBe(true);
  });
});
