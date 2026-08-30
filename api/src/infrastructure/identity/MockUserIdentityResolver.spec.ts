import { describe, expect, it } from "vitest";
import { MockUserIdentityResolver } from "./MockUserIdentityResolver";

describe("MockUserIdentityResolver", () => {
  it("同じanonymousIdを渡すと同じ識別子を返す", async () => {
    const resolver = new MockUserIdentityResolver();
    const anonymousId = "550e8400-e29b-41d4-a716-446655440000";

    const first = await resolver.resolve(anonymousId);
    const second = await resolver.resolve(anonymousId);

    expect(first.isOk()).toBe(true);
    expect(second.isOk()).toBe(true);
    if (first.isOk() && second.isOk()) {
      expect(first.value).toBe(second.value);
    }
  });

  it("anonymousIdをそのまま識別子として返す（モック環境はINTEGER FK制約を持たないため）", async () => {
    const resolver = new MockUserIdentityResolver();
    const anonymousId = "550e8400-e29b-41d4-a716-446655440000";

    const result = await resolver.resolve(anonymousId);

    expect(result.isOk()).toBe(true);
    if (result.isOk()) {
      expect(result.value).toBe(anonymousId);
    }
  });

  it("異なるanonymousIdには異なる識別子を返す", async () => {
    const resolver = new MockUserIdentityResolver();

    const first = await resolver.resolve("user-a");
    const second = await resolver.resolve("user-b");

    expect(first.isOk()).toBe(true);
    expect(second.isOk()).toBe(true);
    if (first.isOk() && second.isOk()) {
      expect(first.value).not.toBe(second.value);
    }
  });
});
