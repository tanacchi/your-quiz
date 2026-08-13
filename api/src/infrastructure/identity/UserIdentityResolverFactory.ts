import type { IUserIdentityResolver } from "../../shared/identity/IUserIdentityResolver";
import type { CloudflareBindings } from "../../shared/types";
import { shouldUseMock } from "../repositories/QuizRepositoryFactory";
import { D1UserIdentityResolver } from "./D1UserIdentityResolver";
import { MockUserIdentityResolver } from "./MockUserIdentityResolver";

/**
 * 匿名ユーザー識別解決リゾルバーファクトリー
 *
 * `QuizRepositoryFactory`と同じ`shouldUseMock`判定ロジックを再利用し、
 * D1/Mockを切替える。
 *
 * @param env - Cloudflare Workersのバインディング環境変数
 * @returns 適切な`IUserIdentityResolver`実装
 */
export function createUserIdentityResolver(
  env: CloudflareBindings,
): IUserIdentityResolver {
  if (shouldUseMock(env)) {
    return new MockUserIdentityResolver();
  }
  return new D1UserIdentityResolver(env.DB);
}
