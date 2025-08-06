import { Hono } from "hono";
import { z } from "zod";
import type { components } from "./types/generated/api";

const app = new Hono<{ Bindings: CloudflareBindings }>();

const createQuizSchema = z.object({
  question: z.string(),
  answerType: z.enum([
    "boolean",
    "free_text",
    "single_choice",
    "multiple_choice",
  ]),
}) satisfies z.ZodType<components["schemas"]["CreateQuizRequest"]>;

const pathParamSchema = z.object({
  id: z.string(),
});

// Quiz Management API Routes - 型安全なHono標準APIとして実装
app.get("/api/quiz/v1/manage/quizzes", async (c) => {
  // Mock data for development
  const quizzes = [
    {
      id: "1",
      question: "What is TypeScript?",
      answerType: "single_choice" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      question: "Is JavaScript strongly typed?",
      answerType: "boolean" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  // 生成された型との整合性を確保
  const response: components["schemas"]["QuizListResponse"] = {
    quizzes,
    total: quizzes.length,
  };

  return c.json(response);
});

app.get("/api/quiz/v1/manage/quizzes/:id", async (c) => {
  const id = c.req.param("id");

  // パラメータの型検証
  const paramResult = pathParamSchema.safeParse({ id });
  if (!paramResult.success) {
    return c.json({ message: "Invalid parameter", code: "INVALID_PARAM" }, 400);
  }

  // Mock data for development
  const quiz: components["schemas"]["Quiz"] = {
    id: paramResult.data.id,
    question: "What is TypeScript?",
    answerType: "single_choice",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return c.json(quiz);
});

app.post("/api/quiz/v1/manage/quizzes", async (c) => {
  const body = await c.req.json();

  // ボディの型検証
  const bodyResult = createQuizSchema.safeParse(body);
  if (!bodyResult.success) {
    return c.json(
      { message: "Invalid request body", code: "INVALID_BODY" },
      400,
    );
  }

  // Mock creation for development
  const quiz: components["schemas"]["Quiz"] = {
    id: Date.now().toString(),
    question: bodyResult.data.question,
    answerType: bodyResult.data.answerType,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return c.json(quiz);
});

export default app;
