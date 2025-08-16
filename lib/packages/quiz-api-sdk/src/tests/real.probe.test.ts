import { describe, expect, it } from "vitest";

const URL = process.env.REAL_PROBE_URL ?? "http://localhost:8787/health";

describe("real api probe", () => {
  it("responds", async () => {
    const r = await fetch(URL);
    expect(r.status).toBeLessThan(500);
  });
});
