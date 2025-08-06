import { contentJson, fromHono, OpenAPIRoute } from "chanfana";
import type { Context } from "hono";
import { Hono } from "hono";
import { z } from "zod";
import type { components } from "./types/generated/api";

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

const quizListResponseSchema = z.object({
  quizzes: z.array(quizSchema),
  total: z.number().int(),
}) satisfies z.ZodType<components["schemas"]["QuizListResponse"]>;

const errorResponseSchema = z.object({
  message: z.string(),
  code: z.string(),
}) satisfies z.ZodType<components["schemas"]["ErrorResponse"]>;

// Chanfana Route Classes
export class ListQuizzes extends OpenAPIRoute {
  schema = {
    tags: ["Quiz Management"],
    summary: "List all quizzes",
    responses: {
      "200": {
        description: "List of quizzes",
        ...contentJson(quizListResponseSchema),
      },
    },
  } as const;

  async handle(_c: AppContext) {
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

    return response;
  }
}

export class GetQuiz extends OpenAPIRoute {
  schema = {
    tags: ["Quiz Management"],
    summary: "Get quiz by ID",
    request: {
      params: z.object({
        id: z.string(),
      }),
    },
    responses: {
      "200": {
        description: "Quiz retrieved successfully",
        ...contentJson(quizSchema),
      },
      "400": {
        description: "Invalid parameter",
        ...contentJson(errorResponseSchema),
      },
    },
  } as const;

  async handle(_c: AppContext) {
    const data = await this.getValidatedData<typeof this.schema>();
    const id = data.params?.id;

    if (!id) {
      return {
        message: "ID is required",
        code: "MISSING_ID",
      };
    }

    // Mock data for development
    const quiz: components["schemas"]["Quiz"] = {
      id,
      question: "What is TypeScript?",
      answerType: "single_choice",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return quiz;
  }
}

export class CreateQuiz extends OpenAPIRoute {
  schema = {
    tags: ["Quiz Management"],
    summary: "Create new quiz",
    request: {
      body: contentJson(createQuizSchema),
    },
    responses: {
      "200": {
        description: "Quiz created successfully",
        ...contentJson(quizSchema),
      },
      "400": {
        description: "Invalid request body",
        ...contentJson(errorResponseSchema),
      },
    },
  } as const;

  async handle(_c: AppContext) {
    const data = await this.getValidatedData<typeof this.schema>();
    const body = data.body as { question: string; answerType: string };

    // Mock creation for development
    const quiz: components["schemas"]["Quiz"] = {
      id: Date.now().toString(),
      question: body.question,
      answerType:
        body.answerType as components["schemas"]["Quiz"]["answerType"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return quiz;
  }
}

// OpenAPI設定を含むChanfana初期化
const openapi = fromHono(app, {
  docs_url: "/",
  openapi_url: "/openapi.json",
  schema: {
    info: {
      title: "Your Quiz API",
      version: "1.0.0",
      description: "TypeSpec schema-first Quiz API powered by Chanfana",
    },
  },
});

// ルート登録
openapi.get("/api/quiz/v1/manage/quizzes", ListQuizzes);
openapi.get("/api/quiz/v1/manage/quizzes/:id", GetQuiz);
openapi.post("/api/quiz/v1/manage/quizzes", CreateQuiz);

export default app;
