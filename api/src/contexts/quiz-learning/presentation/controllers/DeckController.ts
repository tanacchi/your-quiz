import type { AppContext } from "../../../../shared/types";
import { parseJsonSafe, validateWithZod } from "../../../../shared/utils";
import type {
  CreateDeckFromSearchUseCase,
  CreateDeckFromWrongAnswersUseCase,
  CreateDeckUseCase,
  DeleteDeckUseCase,
  GetDeckUseCase,
  GetMyDecksUseCase,
  UpdateDeckUseCase,
} from "../../application/use-cases";
import { DeckControllerErrorHandler } from "../errors";
import {
  createDeckFromSearchSchema,
  createDeckFromWrongAnswersSchema,
  createDeckSchema,
  updateDeckSchema,
} from "../schemas/deck-request.schema";

const DEFAULT_LIST_LIMIT = 20;
const DEFAULT_LIST_OFFSET = 0;

/**
 * Deck管理コントローラー
 *
 * Deck（問題集）のCRUD・生成に関するHTTPリクエストを処理する。
 * 所有者は常に`c.var.userFingerprint`（anonymousSessionミドルウェア）
 * から取得し、リクエストの`userId`は受け付けない（ADR-0027）。
 */
export class DeckController {
  constructor(
    private readonly createDeckUseCase: CreateDeckUseCase,
    private readonly createDeckFromSearchUseCase: CreateDeckFromSearchUseCase,
    private readonly createDeckFromWrongAnswersUseCase: CreateDeckFromWrongAnswersUseCase,
    private readonly getDeckUseCase: GetDeckUseCase,
    private readonly getMyDecksUseCase: GetMyDecksUseCase,
    private readonly updateDeckUseCase: UpdateDeckUseCase,
    private readonly deleteDeckUseCase: DeleteDeckUseCase,
  ) {}

  async createDeck(c: AppContext) {
    const jsonResult = await parseJsonSafe(c.req);
    if (jsonResult.isErr()) {
      const errorResponse = DeckControllerErrorHandler.handleError(
        jsonResult.error,
      );
      return c.json(errorResponse.response, errorResponse.statusCode);
    }

    const validationResult = validateWithZod(
      createDeckSchema,
      jsonResult.value,
    );
    if (validationResult.isErr()) {
      const errorResponse = DeckControllerErrorHandler.handleError(
        validationResult.error,
      );
      return c.json(errorResponse.response, errorResponse.statusCode);
    }

    const body = validationResult.value;
    const result = await this.createDeckUseCase.execute({
      quizIds: body.quizIds,
      creatorFingerprint: c.var.userFingerprint,
      ...(body.name !== undefined && { name: body.name }),
      ...(body.description !== undefined && { description: body.description }),
    });

    if (result.isErr()) {
      const errorResponse = DeckControllerErrorHandler.handleError(
        result.error,
      );
      return c.json(errorResponse.response, errorResponse.statusCode);
    }

    return c.json({ deck: result.value }, 200);
  }

  async createDeckFromSearch(c: AppContext) {
    const jsonResult = await parseJsonSafe(c.req);
    if (jsonResult.isErr()) {
      const errorResponse = DeckControllerErrorHandler.handleError(
        jsonResult.error,
      );
      return c.json(errorResponse.response, errorResponse.statusCode);
    }

    const validationResult = validateWithZod(
      createDeckFromSearchSchema,
      jsonResult.value,
    );
    if (validationResult.isErr()) {
      const errorResponse = DeckControllerErrorHandler.handleError(
        validationResult.error,
      );
      return c.json(errorResponse.response, errorResponse.statusCode);
    }

    const body = validationResult.value;
    const result = await this.createDeckFromSearchUseCase.execute({
      searchQuery: body.searchQuery,
      maxQuizzes: body.maxQuizzes,
      creatorFingerprint: c.var.userFingerprint,
      ...(body.filters !== undefined && { filters: body.filters }),
      ...(body.name !== undefined && { name: body.name }),
      ...(body.description !== undefined && { description: body.description }),
    });

    if (result.isErr()) {
      const errorResponse = DeckControllerErrorHandler.handleError(
        result.error,
      );
      return c.json(errorResponse.response, errorResponse.statusCode);
    }

    return c.json({ deck: result.value }, 200);
  }

  async createDeckFromWrongAnswers(c: AppContext) {
    const jsonResult = await parseJsonSafe(c.req);
    if (jsonResult.isErr()) {
      const errorResponse = DeckControllerErrorHandler.handleError(
        jsonResult.error,
      );
      return c.json(errorResponse.response, errorResponse.statusCode);
    }

    const validationResult = validateWithZod(
      createDeckFromWrongAnswersSchema,
      jsonResult.value,
    );
    if (validationResult.isErr()) {
      const errorResponse = DeckControllerErrorHandler.handleError(
        validationResult.error,
      );
      return c.json(errorResponse.response, errorResponse.statusCode);
    }

    const body = validationResult.value;
    const result = await this.createDeckFromWrongAnswersUseCase.execute({
      maxQuizzes: body.maxQuizzes,
      sinceDays: body.sinceDays,
      creatorFingerprint: c.var.userFingerprint,
      ...(body.name !== undefined && { name: body.name }),
      ...(body.description !== undefined && { description: body.description }),
    });

    if (result.isErr()) {
      const errorResponse = DeckControllerErrorHandler.handleError(
        result.error,
      );
      return c.json(errorResponse.response, errorResponse.statusCode);
    }

    return c.json({ deck: result.value }, 200);
  }

  async getDeck(c: AppContext) {
    const id = c.req.param("id");

    const result = await this.getDeckUseCase.execute(id);

    if (result.isErr()) {
      const errorResponse = DeckControllerErrorHandler.handleError(
        result.error,
      );
      return c.json(errorResponse.response, errorResponse.statusCode);
    }

    return c.json(result.value);
  }

  async getMyDecks(c: AppContext) {
    const limit = Number(c.req.query("limit") ?? DEFAULT_LIST_LIMIT);
    const offset = Number(c.req.query("offset") ?? DEFAULT_LIST_OFFSET);

    const result = await this.getMyDecksUseCase.execute({
      creatorFingerprint: c.var.userFingerprint,
      limit: Number.isFinite(limit) ? limit : DEFAULT_LIST_LIMIT,
      offset: Number.isFinite(offset) ? offset : DEFAULT_LIST_OFFSET,
    });

    if (result.isErr()) {
      const errorResponse = DeckControllerErrorHandler.handleError(
        result.error,
      );
      return c.json(errorResponse.response, errorResponse.statusCode);
    }

    return c.json(result.value);
  }

  async updateDeck(c: AppContext) {
    const id = c.req.param("id");

    const jsonResult = await parseJsonSafe(c.req);
    if (jsonResult.isErr()) {
      const errorResponse = DeckControllerErrorHandler.handleError(
        jsonResult.error,
      );
      return c.json(errorResponse.response, errorResponse.statusCode);
    }

    const validationResult = validateWithZod(
      updateDeckSchema,
      jsonResult.value,
    );
    if (validationResult.isErr()) {
      const errorResponse = DeckControllerErrorHandler.handleError(
        validationResult.error,
      );
      return c.json(errorResponse.response, errorResponse.statusCode);
    }

    const body = validationResult.value;
    const result = await this.updateDeckUseCase.execute(id, {
      creatorFingerprint: c.var.userFingerprint,
      ...(body.name !== undefined && { name: body.name }),
      ...(body.description !== undefined && { description: body.description }),
      ...(body.quizIds !== undefined && { quizIds: body.quizIds }),
    });

    if (result.isErr()) {
      const errorResponse = DeckControllerErrorHandler.handleError(
        result.error,
      );
      return c.json(errorResponse.response, errorResponse.statusCode);
    }

    return c.json(result.value);
  }

  async deleteDeck(c: AppContext) {
    const id = c.req.param("id");

    const result = await this.deleteDeckUseCase.execute(
      id,
      c.var.userFingerprint,
    );

    if (result.isErr()) {
      const errorResponse = DeckControllerErrorHandler.handleError(
        result.error,
      );
      return c.json(errorResponse.response, errorResponse.statusCode);
    }

    return c.body(null, 204);
  }
}
