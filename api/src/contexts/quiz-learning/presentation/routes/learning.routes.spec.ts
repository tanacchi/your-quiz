import { Hono } from "hono";
import { beforeEach, describe, expect, it } from "vitest";
import { resetMockDeckRepository } from "../../../../infrastructure/repositories/DeckRepositoryFactory";
import type { AppEnv, CloudflareBindings } from "../../../../shared/types";
import { learningRoutes } from "./learning.routes";

type DeckDto = { id: string; name: string };
type CreateDeckResponseDto = { deck: DeckDto };

const createMockEnv = (): CloudflareBindings => ({
  NODE_ENV: "test",
  DB: {} as D1Database,
  ASSETS: {} as Fetcher,
});

const createApp = () => {
  const app = new Hono<AppEnv>();
  app.use("*", async (c, next) => {
    c.set("userFingerprint", "fp-test-user");
    await next();
  });
  app.route("/api/quiz/v1/learning", learningRoutes);
  return app;
};

describe("learning.routes", () => {
  let app: ReturnType<typeof createApp>;
  let env: CloudflareBindings;

  beforeEach(() => {
    resetMockDeckRepository();
    app = createApp();
    env = createMockEnv();
  });

  it("POST /decks でDeckを作成しGET /decks/:idで取得できる", async () => {
    const createRes = await app.request(
      "/api/quiz/v1/learning/decks",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "テストDeck",
          quizIds: ["quiz-1"],
          source: "manual_selection",
        }),
      },
      env,
    );

    expect(createRes.status).toBe(200);
    const created = (await createRes.json()) as CreateDeckResponseDto;
    expect(created.deck.name).toBe("テストDeck");

    const getRes = await app.request(
      `/api/quiz/v1/learning/decks/${created.deck.id}`,
      {},
      env,
    );

    expect(getRes.status).toBe(200);
    const fetched = (await getRes.json()) as DeckDto;
    expect(fetched.name).toBe("テストDeck");
  });

  it("GET /decks/mine が /decks/:id より優先してマッチする", async () => {
    const res = await app.request("/api/quiz/v1/learning/decks/mine", {}, env);

    expect(res.status).toBe(200);
    const body = (await res.json()) as Record<string, unknown>;
    expect(body).toHaveProperty("items");
  });

  it("存在しないDeckのGETは404を返す", async () => {
    const res = await app.request(
      "/api/quiz/v1/learning/decks/nonexistent",
      {},
      env,
    );

    expect(res.status).toBe(404);
  });

  it("PATCH /decks/:id でDeckを更新できる", async () => {
    const createRes = await app.request(
      "/api/quiz/v1/learning/decks",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizIds: ["quiz-1"],
          source: "manual_selection",
        }),
      },
      env,
    );
    const created = (await createRes.json()) as CreateDeckResponseDto;

    const patchRes = await app.request(
      `/api/quiz/v1/learning/decks/${created.deck.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "更新後の名前" }),
      },
      env,
    );

    expect(patchRes.status).toBe(200);
    const updated = (await patchRes.json()) as DeckDto;
    expect(updated.name).toBe("更新後の名前");
  });

  it("DELETE /decks/:id でDeckを削除できる", async () => {
    const createRes = await app.request(
      "/api/quiz/v1/learning/decks",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizIds: ["quiz-1"],
          source: "manual_selection",
        }),
      },
      env,
    );
    const created = (await createRes.json()) as CreateDeckResponseDto;

    const deleteRes = await app.request(
      `/api/quiz/v1/learning/decks/${created.deck.id}`,
      { method: "DELETE" },
      env,
    );

    expect(deleteRes.status).toBe(204);
  });

  it("POST /decks/wrong-questions で間違い問題が0件の場合はエラーを返す", async () => {
    const res = await app.request(
      "/api/quiz/v1/learning/decks/wrong-questions",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      },
      env,
    );

    expect(res.status).toBeGreaterThanOrEqual(400);
  });
});
