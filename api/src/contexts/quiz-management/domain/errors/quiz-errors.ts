import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
} from "../../../../shared/errors";

/**
 * クイズドメイン固有のエラークラス群
 *
 * クイズ管理コンテキストにおけるビジネスルール違反やドメインロジック固有の例外を表現します。
 */

/**
 * クイズステータス関連のエラー
 *
 * クイズの現在ステータスが操作要件に適合しない場合に発生します。
 * 例：承認済みクイズを編集しようとした場合など。
 */
export class QuizStatusError extends ConflictError {
  readonly quizId: string;
  readonly currentStatus: string;
  readonly requiredStatus: string;

  /**
   * QuizStatusErrorのコンストラクタ
   *
   * @param quizId - 対象クイズのID
   * @param currentStatus - 現在のクイズステータス
   * @param requiredStatus - 操作に必要なステータス
   * @param requestId - リクエストトレーシング用ID（オプション）
   */
  constructor(
    quizId: string,
    currentStatus: string,
    requiredStatus: string,
    requestId?: string,
  ) {
    super(
      `Quiz ${quizId} is in ${currentStatus} status, but ${requiredStatus} is required`,
      requestId,
    );
    Object.defineProperty(this, "quizId", { value: quizId, enumerable: true });
    Object.defineProperty(this, "currentStatus", {
      value: currentStatus,
      enumerable: true,
    });
    Object.defineProperty(this, "requiredStatus", {
      value: requiredStatus,
      enumerable: true,
    });
  }
}

/**
 * クイズ承認関連のエラー
 *
 * クイズの承認プロセスで問題が発生した場合に発生します。
 * 例：内容が不適切でモデレーションに引っかかった場合など。
 */
export class QuizApprovalError extends ConflictError {
  readonly quizId: string;
  readonly reason: string;

  /**
   * QuizApprovalErrorのコンストラクタ
   *
   * @param quizId - 対象クイズのID
   * @param reason - 承認できない理由
   * @param requestId - リクエストトレーシング用ID（オプション）
   */
  constructor(quizId: string, reason: string, requestId?: string) {
    super(`Quiz ${quizId} cannot be approved: ${reason}`, requestId);
    Object.defineProperty(this, "quizId", { value: quizId, enumerable: true });
    Object.defineProperty(this, "reason", { value: reason, enumerable: true });
  }
}

/**
 * クイズ公開関連のエラー
 *
 * クイズの公開プロセスで問題が発生した場合に発生します。
 * 例：承認されていないクイズを公開しようとした場合など。
 */
export class QuizPublishError extends ConflictError {
  readonly quizId: string;
  readonly reason: string;

  /**
   * QuizPublishErrorのコンストラクタ
   *
   * @param quizId - 対象クイズのID
   * @param reason - 公開できない理由
   * @param requestId - リクエストトレーシング用ID（オプション）
   */
  constructor(quizId: string, reason: string, requestId?: string) {
    super(`Quiz ${quizId} cannot be published: ${reason}`, requestId);
    this.quizId = quizId;
    this.reason = reason;
  }
}

/**
 * クイズ作成者権限エラー
 *
 * クイズの作成者以外が作成者限定操作を実行しようとした場合に発生します。
 * 例：他人が作成したクイズを編集・削除しようとした場合など。
 */
export class QuizCreatorOnlyError extends ForbiddenError {
  readonly quizId: string;
  readonly operation: string;
  readonly requesterId?: string;
  readonly creatorId: string;

  /**
   * QuizCreatorOnlyErrorのコンストラクタ
   *
   * @param quizId - 対象クイズのID
   * @param operation - 実行しようとした操作
   * @param creatorId - クイズの作成者ID
   * @param requesterId - リクエスト実行者のID（オプション）
   * @param requestId - リクエストトレーシング用ID（オプション）
   */
  constructor(
    quizId: string,
    operation: string,
    creatorId: string,
    requesterId?: string,
    requestId?: string,
  ) {
    super(
      `Quiz ${quizId}: ${operation} operation is only allowed for creator ${creatorId}`,
      requestId,
    );
    this.quizId = quizId;
    this.operation = operation;
    this.requesterId = requesterId;
    this.creatorId = creatorId;
  }
}

/**
 * クイズ管理者権限エラー
 *
 * 管理者権限が必要な操作を一般ユーザーが実行しようとした場合に発生します。
 * 例：クイズの強制削除、管理者設定の変更など。
 */
export class QuizAdminOnlyError extends ForbiddenError {
  readonly operation: string;

  /**
   * QuizAdminOnlyErrorのコンストラクタ
   *
   * @param operation - 実行しようとした管理者限定操作
   * @param requestId - リクエストトレーシング用ID（オプション）
   */
  constructor(operation: string, requestId?: string) {
    super(`${operation} operation requires admin privileges`, requestId);
    this.operation = operation;
  }
}

/**
 * クイズ未発見エラー
 *
 * 指定されたIDのクイズが存在しない場合に発生します。
 */
export class QuizNotFoundError extends NotFoundError {
  readonly quizId: string;

  /**
   * QuizNotFoundErrorのコンストラクタ
   *
   * @param quizId - 見つからなかったクイズのID
   * @param requestId - リクエストトレーシング用ID（オプション）
   */
  constructor(quizId: string, requestId?: string) {
    super(`Quiz with ID '${quizId}' not found`, requestId);
    this.quizId = quizId;
  }
}

/**
 * クイズ質問バリデーションエラー
 *
 * クイズの問題文が検証ルールに適合しない場合に発生します。
 * 例：問題文が空、文字数制限違反、不適切な内容など。
 */
export class QuizQuestionValidationError extends ValidationError {
  readonly issue: string;

  /**
   * QuizQuestionValidationErrorのコンストラクタ
   *
   * @param issue - 具体的な検証エラー内容
   * @param requestId - リクエストトレーシング用ID（オプション）
   */
  constructor(issue: string, requestId?: string) {
    super(
      "Quiz question validation failed",
      { question: issue },
      issue,
      requestId,
    );
    this.issue = issue;
  }
}

/**
 * クイズ解答バリデーションエラー
 *
 * クイズの正解データが検証ルールに適合しない場合に発生します。
 * 例：選択肢が不十分、解答形式の不整合など。
 */
export class QuizSolutionValidationError extends ValidationError {
  readonly issue: string;

  /**
   * QuizSolutionValidationErrorのコンストラクタ
   *
   * @param issue - 具体的な検証エラー内容
   * @param requestId - リクエストトレーシング用ID（オプション）
   */
  constructor(issue: string, requestId?: string) {
    super(
      "Quiz solution validation failed",
      { solution: issue },
      issue,
      requestId,
    );
    this.issue = issue;
  }
}

/**
 * クイズ重複エラー
 *
 * 類似または同一の問題文を持つクイズが既に存在する場合に発生します。
 */
export class DuplicateQuizError extends ConflictError {
  readonly question: string;

  /**
   * DuplicateQuizErrorのコンストラクタ
   *
   * @param question - 重複していた問題文
   * @param requestId - リクエストトレーシング用ID（オプション）
   */
  constructor(question: string, requestId?: string) {
    super(`Quiz with similar question already exists`, requestId);
    this.question = question;
  }
}

/**
 * クイズドメインエラーの統合型
 *
 * クイズ管理コンテキストで発生する可能性のある全てのドメインエラーの Union Type です。
 * この型は型安全なエラーハンドリングとパターンマッチングに使用されます。
 */
export type QuizDomainError =
  | QuizStatusError
  | QuizApprovalError
  | QuizPublishError
  | QuizCreatorOnlyError
  | QuizAdminOnlyError
  | QuizNotFoundError
  | QuizQuestionValidationError
  | QuizSolutionValidationError
  | DuplicateQuizError;
