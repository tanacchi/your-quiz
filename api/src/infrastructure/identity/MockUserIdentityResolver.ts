import { okAsync, type ResultAsync } from "neverthrow";
import type { RepositoryError } from "../../shared/errors";
import type { IUserIdentityResolver } from "../../shared/identity/IUserIdentityResolver";

/**
 * テスト・開発環境向けの匿名ユーザー識別解決モック実装
 *
 * モック環境はD1のINTEGER FK制約を持たないため、`anonymous_id`から
 * `UserIdentity.id`を採番する必要がない。単純化のため、fingerprint
 * （anonymousId）自体をそのまま識別子として返す。
 */
export class MockUserIdentityResolver implements IUserIdentityResolver {
  resolve(anonymousId: string): ResultAsync<string, RepositoryError> {
    return okAsync(anonymousId);
  }
}
