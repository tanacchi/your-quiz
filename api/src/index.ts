import { Hono } from "hono";
import type { paths } from "./types/generated/api";
import { createHonoOpenApiRouter } from "openapi-ts-router";
import z from "zod";

// const app = new Hono<{ Bindings: CloudflareBindings }>();
const app = new Hono();
const api = createHonoOpenApiRouter<paths>(app);

api.post('/pets/:id', {
  bodyValidator: z.object({ name: z.string() }),
  handler: async c => {
    const { name } = c.req.valid('json');
    // ビジネスロジック呼び出し
    const created = { id: 'u123', name };
    return c.json(created);
  },
});

// APIルートの実装（型安全性は型インポートで保証）
api.get("/pet/{petId}", {
  pathValidator: zValidator(
    z.object({
      petId: z.number(), // petIdが数値であることを検証
    })
  ),
  handler: (c) => {
    const { petId } = c.req.valid("param"); // 検証済みのパラメータにアクセス
    return c.json({ name: "Falko", photoUrls: [] });
  },
});

export default app;
