import { InternalServerError, ValidationError } from "./base";

/**
 * リポジトリ層で発生するエラー
 */
export abstract class RepositoryError extends InternalServerError {
  abstract readonly operation: string;
  abstract readonly entity: string;

  constructor(
    operation: string,
    entity: string,
    details?: string,
    requestId?: string,
  ) {
    super(`${operation} operation failed for ${entity}`, details, requestId);
  }
}

/**
 * 作成操作エラー
 */
export class CreateFailedError extends RepositoryError {
  readonly operation = "create" as const;
  readonly entity: string;

  constructor(entity: string, details?: string, requestId?: string) {
    super("create", entity, details, requestId);
    this.entity = entity;
  }
}

/**
 * 検索操作エラー
 */
export class FindFailedError extends RepositoryError {
  readonly operation = "find" as const;
  readonly entity: string;

  constructor(entity: string, details?: string, requestId?: string) {
    super("find", entity, details, requestId);
    this.entity = entity;
  }
}

/**
 * 更新操作エラー
 */
export class UpdateFailedError extends RepositoryError {
  readonly operation = "update" as const;
  readonly entity: string;

  constructor(entity: string, details?: string, requestId?: string) {
    super("update", entity, details, requestId);
    this.entity = entity;
  }
}

/**
 * 削除操作エラー
 */
export class DeleteFailedError extends RepositoryError {
  readonly operation = "delete" as const;
  readonly entity: string;

  constructor(entity: string, details?: string, requestId?: string) {
    super("delete", entity, details, requestId);
    this.entity = entity;
  }
}

/**
 * データベース接続エラー
 */
export class DatabaseConnectionError extends InternalServerError {
  constructor(requestId?: string) {
    super("Database connection failed", requestId);
  }
}

/**
 * JSON解析エラー (400)
 *
 * リクエストボディが空・壊れたJSON等のクライアント起因の不備であり、
 * サーバ障害ではないため400を返す（旧実装はInternalServerErrorを継承し
 * 500を返していたが、契約・BDDフィクスチャ双方が400を期待しており誤りだった）。
 */
export class JsonParseError extends ValidationError {
  constructor(detail: string = "Invalid JSON format", requestId?: string) {
    super("Invalid JSON in request body", undefined, detail, requestId);
  }
}

/**
 * インフラストラクチャエラーの統合型
 */
export type InfrastructureError =
  | CreateFailedError
  | FindFailedError
  | UpdateFailedError
  | DeleteFailedError
  | DatabaseConnectionError
  | JsonParseError;
