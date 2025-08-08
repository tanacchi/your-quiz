import { createQuizSchema } from "../../../../shared/schemas";
import type { AppContext, components } from "../../../../shared/types";
import { parseJsonSafe, validateWithZod } from "../../../../shared/utils";
import type {
  CreateQuizUseCase,
  GetQuizUseCase,
  ListQuizzesUseCase,
} from "../../application/use-cases";

export class QuizController {
  constructor(
    private readonly createQuizUseCase: CreateQuizUseCase,
    private readonly getQuizUseCase: GetQuizUseCase,
    private readonly listQuizzesUseCase: ListQuizzesUseCase,
  ) {}

  // クイズ作成ハンドラー
  async createQuiz(c: AppContext) {
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

    const validationResult = validateWithZod(
      createQuizSchema,
      jsonResult.value,
    );

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

    const result = await this.createQuizUseCase.execute({
      question: body.question,
      answerType: body.answerType,
      solution: body.solution,
      explanation: body.explanation,
      tags: body.tags,
    });

    if (result.isErr()) {
      return c.json(
        {
          code: 500,
          message: "Failed to create quiz",
          details: `Creation error: ${result.error}`,
        } as components["schemas"]["ErrorResponse"],
        500,
      );
    }

    return c.json(result.value);
  }

  // クイズ取得ハンドラー
  async getQuiz(c: AppContext) {
    const id = c.req.param("id");

    const result = await this.getQuizUseCase.execute(id);

    if (result.isErr()) {
      const error = result.error;
      if (error === "ID_REQUIRED") {
        return c.json(
          {
            code: 400,
            message: "ID is required",
            details: "Path parameter 'id' is missing",
          } as components["schemas"]["ErrorResponse"],
          400,
        );
      }

      if (error === "NOT_FOUND") {
        return c.json(
          {
            code: 404,
            message: "Quiz not found",
            details: `Quiz with id '${id}' does not exist`,
          } as components["schemas"]["ErrorResponse"],
          404,
        );
      }

      return c.json(
        {
          code: 500,
          message: "Failed to get quiz",
          details: `Get error: ${error}`,
        } as components["schemas"]["ErrorResponse"],
        500,
      );
    }

    return c.json(result.value);
  }

  // クイズリスト取得ハンドラー
  async listQuizzes(c: AppContext) {
    const result = await this.listQuizzesUseCase.execute();

    if (result.isErr()) {
      return c.json(
        {
          code: 500,
          message: "Failed to list quizzes",
          details: `List error: ${result.error}`,
        } as components["schemas"]["ErrorResponse"],
        500,
      );
    }

    return c.json(result.value);
  }
}
