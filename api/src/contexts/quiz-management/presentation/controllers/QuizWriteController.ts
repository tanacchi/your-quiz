import {
  approvalRequestSchema,
  updateQuizSchema,
} from "../../../../shared/schemas";
import type { AppContext } from "../../../../shared/types";
import { parseJsonSafe, validateWithZod } from "../../../../shared/utils";
import type { ChangeQuizStatusUseCase } from "../../application/use-cases/ChangeQuizStatusUseCase";
import type { DeleteQuizUseCase } from "../../application/use-cases/DeleteQuizUseCase";
import type { UpdateQuizUseCase } from "../../application/use-cases/UpdateQuizUseCase";
import type { QuizTransitionAction } from "../../domain/entities/quiz-summary/quiz-status-transition";
import { ControllerErrorHandler } from "../errors";
import { canModerate } from "../policies/moderation-policy";

export type QuizWriteUseCases = {
  update: Pick<UpdateQuizUseCase, "execute">;
  delete: Pick<DeleteQuizUseCase, "execute">;
  changeStatus: Pick<ChangeQuizStatusUseCase, "execute">;
};

/**
 * クイズ書き込み系コントローラー
 *
 * PATCH/DELETE と承認ワークフロー（submit/approve/reject/publish）の
 * HTTPリクエストを処理する（issue #46、ADR-0027）。
 */
export class QuizWriteController {
  constructor(private readonly useCases: QuizWriteUseCases) {}

  /**
   * クイズ部分更新HTTPハンドラー（PATCH /quizzes/{id}）
   */
  async updateQuiz(c: AppContext) {
    const id = c.req.param("id");

    const jsonResult = await parseJsonSafe(c.req);
    if (jsonResult.isErr()) {
      const errorResponse = ControllerErrorHandler.handleError(
        jsonResult.error,
      );
      return c.json(errorResponse.response, errorResponse.statusCode);
    }

    const validationResult = validateWithZod(
      updateQuizSchema,
      jsonResult.value,
    );
    if (validationResult.isErr()) {
      const errorResponse = ControllerErrorHandler.handleError(
        validationResult.error,
      );
      return c.json(errorResponse.response, errorResponse.statusCode);
    }

    const body = validationResult.value;
    const result = await this.useCases.update.execute({
      quizId: id,
      requesterId: c.var.userFingerprint,
      ...(body.question !== undefined && { question: body.question }),
      ...(body.explanation !== undefined && { explanation: body.explanation }),
    });

    if (result.isErr()) {
      const errorResponse = ControllerErrorHandler.handleError(result.error);
      return c.json(errorResponse.response, errorResponse.statusCode);
    }

    return c.json(result.value, 200);
  }

  /**
   * クイズ削除HTTPハンドラー（DELETE /quizzes/{id}）
   */
  async deleteQuiz(c: AppContext) {
    const id = c.req.param("id");

    const result = await this.useCases.delete.execute({
      quizId: id,
      requesterId: c.var.userFingerprint,
    });

    if (result.isErr()) {
      const errorResponse = ControllerErrorHandler.handleError(result.error);
      return c.json(errorResponse.response, errorResponse.statusCode);
    }

    return c.body(null, 204);
  }

  /**
   * クイズ承認申請HTTPハンドラー（POST /quizzes/{id}/submit、作成者限定）
   */
  async submitForApproval(c: AppContext) {
    return this.handleTransition(c, "submit");
  }

  /**
   * クイズ承認HTTPハンドラー（POST /quizzes/{id}/approve、モデレーター限定）
   */
  async approveQuiz(c: AppContext) {
    return this.handleTransitionWithBody(c, "approve");
  }

  /**
   * クイズ却下HTTPハンドラー（POST /quizzes/{id}/reject、モデレーター限定）
   */
  async rejectQuiz(c: AppContext) {
    return this.handleTransitionWithBody(c, "reject");
  }

  /**
   * クイズ公開HTTPハンドラー（POST /quizzes/{id}/publish、モデレーター限定）
   */
  async publishQuiz(c: AppContext) {
    return this.handleTransition(c, "publish");
  }

  /** ボディを持たない遷移（submit/publish）の共通処理 */
  private async handleTransition(
    c: AppContext,
    action: QuizTransitionAction,
    reviewerNotes?: string,
  ) {
    const id = c.req.param("id");
    const result = await this.useCases.changeStatus.execute({
      quizId: id,
      action,
      requesterId: c.var.userFingerprint,
      isModerator: canModerate(c.env),
      ...(reviewerNotes !== undefined && { reviewerNotes }),
    });

    if (result.isErr()) {
      const errorResponse = ControllerErrorHandler.handleError(result.error);
      return c.json(errorResponse.response, errorResponse.statusCode);
    }

    return c.json(result.value, 200);
  }

  /** ApprovalRequestボディを持つ遷移（approve/reject）の共通処理 */
  private async handleTransitionWithBody(
    c: AppContext,
    action: QuizTransitionAction,
  ) {
    const jsonResult = await parseJsonSafe(c.req);
    if (jsonResult.isErr()) {
      const errorResponse = ControllerErrorHandler.handleError(
        jsonResult.error,
      );
      return c.json(errorResponse.response, errorResponse.statusCode);
    }

    const validationResult = validateWithZod(
      approvalRequestSchema,
      jsonResult.value,
    );
    if (validationResult.isErr()) {
      const errorResponse = ControllerErrorHandler.handleError(
        validationResult.error,
      );
      return c.json(errorResponse.response, errorResponse.statusCode);
    }

    return this.handleTransition(
      c,
      action,
      validationResult.value.reviewerNotes,
    );
  }
}
