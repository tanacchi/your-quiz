import { ResultAsync } from "neverthrow";
import {
  type RepositoryError,
  RepositoryErrorFactory,
} from "../../shared/errors";
import type { IUserIdentityResolver } from "../../shared/identity/IUserIdentityResolver";

const ENTITY_NAME = "UserIdentity";

/**
 * D1（`UserIdentity`テーブル）を用いた匿名ユーザー識別解決の実装
 *
 * `anonymous_id`（`userFingerprint`）で`UserIdentity`を検索し、
 * 存在しなければ新規作成する（find-or-create）。D1QuizRepositoryと
 * 同じ`ResultAsync.fromPromise` + `RepositoryErrorFactory`パターンに従う。
 */
export class D1UserIdentityResolver implements IUserIdentityResolver {
  constructor(private readonly db: D1Database) {}

  resolve(anonymousId: string): ResultAsync<string, RepositoryError> {
    return this.findByAnonymousId(anonymousId).andThen((existingId) => {
      if (existingId !== null) {
        return ResultAsync.fromSafePromise(Promise.resolve(existingId));
      }
      return this.create(anonymousId);
    });
  }

  private findByAnonymousId(
    anonymousId: string,
  ): ResultAsync<string | null, RepositoryError> {
    return ResultAsync.fromPromise(
      this.db
        .prepare("SELECT id FROM UserIdentity WHERE anonymous_id = ?")
        .bind(anonymousId)
        .first<{ id: number }>(),
      (error) =>
        RepositoryErrorFactory.findFailed(
          ENTITY_NAME,
          error instanceof Error ? error : new Error("Unknown find error"),
        ),
    ).map((row) => (row === null ? null : String(row.id)));
  }

  private create(anonymousId: string): ResultAsync<string, RepositoryError> {
    return ResultAsync.fromPromise(
      this.db
        .prepare("INSERT INTO UserIdentity (anonymous_id) VALUES (?)")
        .bind(anonymousId)
        .run(),
      (error) =>
        RepositoryErrorFactory.createFailed(
          ENTITY_NAME,
          error instanceof Error ? error : new Error("Unknown create error"),
        ),
    ).map((result) => String(result.meta.last_row_id));
  }
}
