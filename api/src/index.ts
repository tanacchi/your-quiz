import type { Context } from "hono";
import { Hono } from "hono";
import { err, ok, type Result } from "neverthrow";
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

// Helper functions for neverthrow error handling

const parseJsonSafe = async (request: {
  json(): Promise<unknown>;
}): Promise<Result<unknown, string>> => {
  try {
    const json = await request.json();
    return ok(json);
  } catch {
    return err("INVALID_JSON");
  }
};

const validateWithZod = <T>(
  schema: z.ZodSchema<T>,
  data: unknown,
): Result<T, string> => {
  const result = schema.safeParse(data);
  return result.success ? ok(result.data) : err("VALIDATION_ERROR");
};

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
  const jsonResult = await parseJsonSafe(c.req);

  if (jsonResult.isErr()) {
    const errorCode = jsonResult.error;
    const errorMessage =
      errorCode === "INVALID_JSON"
        ? "Invalid JSON in request body"
        : "Failed to parse request";

    return c.json(
      {
        message: errorMessage,
        code: errorCode,
      } as components["schemas"]["ErrorResponse"],
      400,
    );
  }

  const validationResult = validateWithZod(createQuizSchema, jsonResult.value);

  if (validationResult.isErr()) {
    return c.json(
      {
        message: "Invalid request body format",
        code: validationResult.error,
      } as components["schemas"]["ErrorResponse"],
      400,
    );
  }

  const body = validationResult.value;

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
