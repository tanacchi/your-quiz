import type { ResultAsync } from "neverthrow";
import type { RepositoryError } from "../errors";

/**
 * 匿名ユーザー識別子（`userFingerprint` / `UserIdentity.anonymous_id`）を
 * 永続化された `UserIdentity.id` に解決するポート
 *
 * `anonymousSession` ミドルウェア（ADR-0026）が発行する `userFingerprint` は
 * UUID文字列だが、D1上の集約（`Deck.creator_id` 等）は `UserIdentity.id`
 * （INTEGER PRIMARY KEY）への外部キーを持つ。両者を橋渡しする役割を担う。
 *
 * ミドルウェア本体には統合せず独立したポートとして定義した理由は
 * ADR-0028 を参照。
 */
export interface IUserIdentityResolver {
  /**
   * 匿名識別子から永続化済みの `UserIdentity.id`（文字列化）を解決する
   *
   * 該当する `UserIdentity` が存在しない場合は新規作成した上でIDを返す
   * （find-or-create）。
   *
   * @param anonymousId - `userFingerprint`（UUID v4文字列）
   * @returns 解決された `UserIdentity.id`（文字列化）またはエラー
   */
  resolve(anonymousId: string): ResultAsync<string, RepositoryError>;
}
