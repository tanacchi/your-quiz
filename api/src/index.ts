import type { Context } from "hono";
import { Hono } from "hono";
import { z } from "zod";
import type { components } from "./types/generated/api";

type CloudflareBindings = Record<string, unknown>;

type AppContext = Context<{ Bindings: CloudflareBindings }>;

const app = new Hono<{ Bindings: CloudflareBindings }>();

// TypeSpec由来の型を活用したZodスキーマ定義
const createQuizSchema = z.object({
  question: z.string(),
  answerType: z.enum([
    "boolean",
    "free_text",
    "single_choice",
    "multiple_choice",
  ]),
}) satisfies z.ZodType<components["schemas"]["CreateQuizRequest"]>;

const quizSchema = z.object({
  id: z.string(),
  question: z.string(),
  answerType: z.enum([
    "boolean",
    "free_text",
    "single_choice",
    "multiple_choice",
  ]),
  createdAt: z.string(),
  updatedAt: z.string(),
}) satisfies z.ZodType<components["schemas"]["Quiz"]>;

const _quizListResponseSchema = z.object({
  quizzes: z.array(quizSchema),
  total: z.number().int(),
}) satisfies z.ZodType<components["schemas"]["QuizListResponse"]>;

const _errorResponseSchema = z.object({
  message: z.string(),
  code: z.string(),
}) satisfies z.ZodType<components["schemas"]["ErrorResponse"]>;

// API handlers - Pure Hono implementation with TypeSpec schema validation

// List all quizzes handler
const listQuizzesHandler = async (c: AppContext) => {
  // Mock data for development
  const quizzes: components["schemas"]["Quiz"][] = [
    {
      id: "1",
      question: "What is TypeScript?",
      answerType: "single_choice",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      question: "Is JavaScript strongly typed?",
      answerType: "boolean",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  const response: components["schemas"]["QuizListResponse"] = {
    quizzes,
    total: quizzes.length,
  };

  return c.json(response);
};

// Get quiz by ID handler
const getQuizHandler = async (c: AppContext) => {
  const id = c.req.param("id");

  if (!id) {
    return c.json(
      {
        message: "ID is required",
        code: "MISSING_ID",
      } as components["schemas"]["ErrorResponse"],
      400,
    );
  }

  // Mock data for development
  const quiz: components["schemas"]["Quiz"] = {
    id,
    question: "What is TypeScript?",
    answerType: "single_choice",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return c.json(quiz);
};

// Create quiz handler
const createQuizHandler = async (c: AppContext) => {
  let requestBody: unknown;

  try {
    requestBody = await c.req.json();
  } catch {
    return c.json(
      {
        message: "Invalid JSON in request body",
        code: "INVALID_JSON",
      } as components["schemas"]["ErrorResponse"],
      400,
    );
  }

  // Validate request body with Zod
  const result = createQuizSchema.safeParse(requestBody);

  if (!result.success) {
    return c.json(
      {
        message: "Invalid request body format",
        code: "VALIDATION_ERROR",
      } as components["schemas"]["ErrorResponse"],
      400,
    );
  }

  const body = result.data;

  // Mock creation for development
  const quiz: components["schemas"]["Quiz"] = {
    id: Date.now().toString(),
    question: body.question,
    answerType: body.answerType,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return c.json(quiz);
};

// ルート登録 - Pure Hono implementation
app.get("/api/quiz/v1/manage/quizzes", listQuizzesHandler);
app.get("/api/quiz/v1/manage/quizzes/:id", getQuizHandler);
app.post("/api/quiz/v1/manage/quizzes", createQuizHandler);

export default app;
