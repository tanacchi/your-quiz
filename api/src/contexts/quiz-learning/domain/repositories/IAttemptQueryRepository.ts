import type { ResultAsync } from "neverthrow";
import type { RepositoryError } from "../../../../shared/errors";

/**
 * 「間違い問題からDeckを生成する」ユースケース専用の読み取り専用ポート
 *
 * Session/Answer集約自体はissue #47のスコープ外（次issueで実装）だが、
 * `POST /decks/wrong-questions`は既存の`Attempt`テーブルを参照する必要が
 * あるため、最小限の読み取り専用クエリとして定義する。
 */
export interface IAttemptQueryRepository {
  /**
   * 指定した作成者が間違えた問題のQuizIdを新しい順に取得する
   *
   * @param creatorId - `IUserIdentityResolver.resolve()`で解決された識別子
   * @param params.sinceDays - 何日前までのAttemptを対象にするか
   * @param params.maxQuizzes - 取得する最大件数
   */
  findWrongQuizIds(
    creatorId: string,
    params: { sinceDays: number; maxQuizzes: number },
  ): ResultAsync<string[], RepositoryError>;
}
