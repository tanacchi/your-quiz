import { createQuizSchema } from "../../../../shared/schemas";
import type { AppContext } from "../../../../shared/types";
import { parseJsonSafe, validateWithZod } from "../../../../shared/utils";
import type {
  CreateQuizUseCase,
  GetQuizUseCase,
  ListQuizzesUseCase,
} from "../../application/use-cases";
import { ControllerErrorHandler } from "../errors";

/**
 * クイズ管理コントローラー
 *
 * クイズの作成、取得、リスト表示に関するHTTPリクエストを処理します。
 * リクエストの解析、バリデーション、ユースケース実行、レスポンス生成を担当します。
 *
 * @example
 * ```typescript
 * const controller = new QuizController(
 *   createQuizUseCase,
 *   getQuizUseCase,
 *   listQuizzesUseCase
 * );
 * ```
 */
export class QuizController {
  /**
   * QuizControllerのコンストラクタ
   *
   * @param createQuizUseCase - クイズ作成処理を担当するユースケース
   * @param getQuizUseCase - クイズ取得処理を担当するユースケース
   * @param listQuizzesUseCase - クイズリスト取得処理を担当するユースケース
   */
  constructor(
    private readonly createQuizUseCase: CreateQuizUseCase,
    private readonly getQuizUseCase: GetQuizUseCase,
    private readonly listQuizzesUseCase: ListQuizzesUseCase,
  ) {}

  /**
   * クイズ作成HTTPハンドラー
   *
   * POSTリクエストボディからクイズデータを受け取り、新しいクイズを作成します。
   * リクエストの解析、バリデーション、ユースケース実行、レスポンス生成を行います。
   *
   * @param c - Honoアプリケーションコンテキスト
   * @returns HTTP 201 (作成成功) またはエラーレスポンス
   */
  async createQuiz(c: AppContext) {
    const jsonResult = await parseJsonSafe(c.req);

    if (jsonResult.isErr()) {
      const error = jsonResult.error;
      const errorResponse = ControllerErrorHandler.handleError(error);
      return c.json(errorResponse.response, errorResponse.statusCode);
    }

    const validationResult = validateWithZod(
      createQuizSchema,
      jsonResult.value,
    );

    if (validationResult.isErr()) {
      const error = validationResult.error;
      const errorResponse = ControllerErrorHandler.handleError(error);
      return c.json(errorResponse.response, errorResponse.statusCode);
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
      const error = result.error;
      const errorResponse = ControllerErrorHandler.handleError(error);
      return c.json(errorResponse.response, errorResponse.statusCode);
    }

    return c.json(result.value, 201);
  }

  /**
   * クイズ取得HTTPハンドラー
   *
   * パスパラメータからクイズIDを受け取り、対応するクイズを取得します。
   *
   * @param c - Honoアプリケーションコンテキスト
   * @returns HTTP 200 (取得成功) またはエラーレスポンス
   */
  async getQuiz(c: AppContext) {
    const id = c.req.param("id");

    const result = await this.getQuizUseCase.execute(id);

    if (result.isErr()) {
      const error = result.error;
      const errorResponse = ControllerErrorHandler.handleError(error);
      return c.json(errorResponse.response, errorResponse.statusCode);
    }

    return c.json(result.value);
  }

  /**
   * クイズリスト取得HTTPハンドラー
   *
   * クエリパラメータから検索条件を受け取り、条件に合致するクイズのリストを取得します。
   * ページング、フィルタリング機能をサポートします。
   *
   * @param c - Honoアプリケーションコンテキスト
   * @returns HTTP 200 (取得成功) またはエラーレスポンス
   */
  async listQuizzes(c: AppContext) {
    // クエリパラメータを取得
    const httpParams = {
      status: c.req.query("status"),
      creatorId: c.req.query("creatorId"),
      ids: c.req.queries("ids"),
      limit: c.req.query("limit"),
      offset: c.req.query("offset"),
    };

    const result = await this.listQuizzesUseCase.execute(httpParams);

    if (result.isErr()) {
      const error = result.error;
      const errorResponse = ControllerErrorHandler.handleError(error);
      return c.json(errorResponse.response, errorResponse.statusCode);
    }

    return c.json(result.value);
  }
}
