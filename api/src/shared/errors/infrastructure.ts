import { InternalServerError } from "./base";

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
 * 未実装操作エラー
 */
export class NotImplementedError extends InternalServerError {
  constructor(operation: string, requestId?: string) {
    super(`${operation} operation is not implemented`, requestId);
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
 * JSON解析エラー
 */
export class JsonParseError extends InternalServerError {
  constructor(detail: string = "Invalid JSON format", requestId?: string) {
    super(detail, requestId);
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
  | NotImplementedError
  | DatabaseConnectionError
  | JsonParseError;
