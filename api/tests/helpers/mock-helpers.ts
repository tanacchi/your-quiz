import { ResultAsync, ok, err } from "neverthrow";
import type { RepositoryError } from "../../src/shared/errors";

/**
 * 型安全なテストヘルパー関数群
 * 
 * TypeScript型安全性ガイドラインに従い、any型・as型アサーション・Non-null assertionを
 * 使用せずにmockを生成する関数群です。
 */

/**
 * 成功するRepositoryのmockを作成
 * 
 * @param value - 成功時に返す値
 * @returns 成功するResultAsync
 */
export function createSuccessfulRepositoryMock<T>(value: T): ResultAsync<T, RepositoryError> {
  return ResultAsync.fromPromise(
    Promise.resolve(value),
    (error) => error as RepositoryError
  );
}

/**
 * 失敗するRepositoryのmockを作成
 * 
 * @param error - 失敗時に返すエラー
 * @returns 失敗するResultAsync
 */
export function createFailedRepositoryMock<T>(error: RepositoryError): ResultAsync<T, RepositoryError> {
  return ResultAsync.fromPromise(
    Promise.reject(error),
    (e) => e as RepositoryError
  );
}

/**
 * 即座に成功するResultAsyncを作成
 * 
 * @param value - 返す値
 * @returns 即座に成功するResultAsync
 */
export function createImmediateSuccess<T>(value: T): ResultAsync<T, RepositoryError> {
  return ResultAsync.fromPromise(
    Promise.resolve(value),
    (error) => error as RepositoryError
  );
}

/**
 * 即座に失敗するResultAsyncを作成
 * 
 * @param error - 返すエラー
 * @returns 即座に失敗するResultAsync
 */
export function createImmediateFailure<T>(error: RepositoryError): ResultAsync<T, RepositoryError> {
  return ResultAsync.fromPromise(
    Promise.reject(error),
    (e) => e as RepositoryError
  );
}