import type { Context } from "hono";
import { Hono } from "hono";
import { err, ok, type Result } from "neverthrow";
import { z } from "zod";
import type { components } from "./types/generated/api";

type CloudflareBindings = Record<string, unknown>;

type AppContext = Context<{ Bindings: CloudflareBindings }>;

const app = new Hono<{ Bindings: CloudflareBindings }>();

// TypeSpec由来の型を活用したZodスキーマ定義
const solutionSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("boolean"),
    id: z.string(),
    value: z.boolean(),
  }),
  z.object({
    type: z.literal("free_text"),
    id: z.string(),
    correctAnswer: z.string(),
    matchingStrategy: z.enum(["exact", "partial", "regex"]).default("exact"),
    caseSensitive: z.boolean().default(false),
  }),
  z.object({
    type: z.literal("single_choice"),
    id: z.string(),
    correctChoiceId: z.string(),
    choices: z.array(
      z.object({
        id: z.string(),
        solutionId: z.string(),
        text: z.string(),
        orderIndex: z.number().int(),
      }),
    ),
  }),
  z.object({
    type: z.literal("multiple_choice"),
    id: z.string(),
    correctChoiceIds: z.array(z.string()),
    minCorrectAnswers: z.number().int().default(1),
    choices: z.array(
      z.object({
        id: z.string(),
        solutionId: z.string(),
        text: z.string(),
        orderIndex: z.number().int(),
      }),
    ),
  }),
]);

const createQuizSchema = z.object({
  question: z.string(),
  answerType: z.enum([
    "boolean",
    "free_text",
    "single_choice",
    "multiple_choice",
  ]),
  solution: solutionSchema,
  explanation: z.string(),
  tags: z.array(z.string()),
}) satisfies z.ZodType<components["schemas"]["CreateQuizRequest"]>;

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
  const quizzes: components["schemas"]["QuizWithSolution"][] = [
    {
      id: "1",
      question: "What is TypeScript?",
      answerType: "single_choice",
      solutionId: "sol-1",
      explanation: "TypeScript is a typed superset of JavaScript",
      status: "approved",
      creatorId: "user-1",
      createdAt: new Date().toISOString(),
      approvedAt: new Date().toISOString(),
      solution: {
        type: "single_choice",
        id: "sol-1",
        correctChoiceId: "choice-1",
        choices: [
          {
            id: "choice-1",
            solutionId: "sol-1",
            text: "A typed superset",
            orderIndex: 1,
          },
          {
            id: "choice-2",
            solutionId: "sol-1",
            text: "A framework",
            orderIndex: 2,
          },
        ],
      },
    },
    {
      id: "2",
      question: "Is JavaScript strongly typed?",
      answerType: "boolean",
      solutionId: "sol-2",
      status: "approved",
      creatorId: "user-2",
      createdAt: new Date().toISOString(),
      approvedAt: new Date().toISOString(),
      solution: {
        type: "boolean",
        id: "sol-2",
        value: false,
      },
    },
  ];

  const response: components["schemas"]["QuizListResponse"] = {
    items: quizzes,
    totalCount: quizzes.length,
    hasMore: false,
  };

  return c.json(response);
};

// Get quiz by ID handler
const getQuizHandler = async (c: AppContext) => {
  const id = c.req.param("id");

  if (!id) {
    return c.json(
      {
        code: 400,
        message: "ID is required",
        details: "Path parameter 'id' is missing",
      } as components["schemas"]["ErrorResponse"],
      400,
    );
  }

  // Mock data for development
  const quiz: components["schemas"]["QuizWithSolution"] = {
    id,
    question: "What is TypeScript?",
    answerType: "single_choice",
    solutionId: "sol-1",
    explanation: "TypeScript is a typed superset of JavaScript",
    status: "approved",
    creatorId: "user-1",
    createdAt: new Date().toISOString(),
    approvedAt: new Date().toISOString(),
    solution: {
      type: "single_choice",
      id: "sol-1",
      correctChoiceId: "choice-1",
      choices: [
        {
          id: "choice-1",
          solutionId: "sol-1",
          text: "A typed superset",
          orderIndex: 1,
        },
        {
          id: "choice-2",
          solutionId: "sol-1",
          text: "A framework",
          orderIndex: 2,
        },
      ],
    },
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
        code: 400,
        message: errorMessage,
        details: `Parse error: ${errorCode}`,
      } as components["schemas"]["ErrorResponse"],
      400,
    );
  }

  const validationResult = validateWithZod(createQuizSchema, jsonResult.value);

  if (validationResult.isErr()) {
    return c.json(
      {
        code: 400,
        message: "Invalid request body format",
        details: `Validation error: ${validationResult.error}`,
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
    solutionId: body.solution.id,
    ...(body.explanation !== undefined && { explanation: body.explanation }),
    status: "pending_approval",
    creatorId: "mock-user-id",
    createdAt: new Date().toISOString(),
  };

  return c.json(quiz);
};

// ルート登録 - Pure Hono implementation
app.get("/api/quiz/v1/manage/quizzes", listQuizzesHandler);
app.get("/api/quiz/v1/manage/quizzes/:id", getQuizHandler);
app.post("/api/quiz/v1/manage/quizzes", createQuizHandler);

export default app;
