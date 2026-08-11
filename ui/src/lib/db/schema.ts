import type { DBSchema, IDBPDatabase } from "idb";
import type {
  AnswerRecord,
  DraftRecord,
  QuizCacheRecord,
  SyncQueueItem,
} from "./schemas";

/**
 * ローカルストレージ容量見積もり（暫定）
 *
 * 【上限】50MB
 * 根拠: us-05_offline-sync.md「データ保持: 最大50MB・自動クリーンアップ」、
 *       us-04_answer-history.md「IndexedDB 50MB上限」、
 *       api-catalog/04-offline-sync.md の deviceStorageLimit 例 50000(KB)。
 *
 * 【内訳】us-05_offline-sync.md「容量管理画面」の Data Breakdown に準拠
 * - クイズキャッシュ (quizCache): 8MB
 * - 回答履歴 (answers):           3MB
 * - 作成データ (drafts):          1MB
 * - 未同期キュー (syncQueue):     残余領域で運用（同期完了時に即削除されるため）
 *
 * 【1レコードあたりの想定サイズ】UTF-16 で 1 文字 2 バイト換算
 * - quizCache: 典型 1KB / 最大 3.5KB（問題文500字＋解説1000字＋メタ）
 *              → 8MB で約 2,300〜8,000 件
 * - answers:   約 0.3KB（UUID×3＋真偽値＋応答時間＋ISO8601）
 *              → 3MB で約 10,000 件
 * - drafts:    典型 1KB / 最大 3.5KB → 1MB で約 300〜1,000 件
 * - syncQueue: 約 0.5KB（data＋MD5チェックサム＋UUID＋ISO8601）
 *
 * 【自動クリーンアップ方針】us-05_offline-sync.md「自動クリーンアップ」
 * - 実行タイミング: 使用率 80%（= 40MB）到達時
 * - 削除対象: 30 日以上前の回答履歴・クイズキャッシュ（キャッシュは LRU 方式）
 * - 保護対象: 未同期データ (syncQueue)・お気に入り
 * - 実行前にユーザーへ確認通知
 * ※ クリーンアップ処理自体は本レイヤーの対象外。PWA 同期 (issue #58) で実装する。
 *   実装時は answers に by-answeredAt、quizCache に by-expiresAt を追加するため
 *   DB_VERSION を 2 に上げること。
 *
 * 【未決事項】
 * 上限値は issue #39（オフライン戦略仕様の確定）が未クローズのため暫定値である。
 * docs/project/specifications/offline_strategy.md は未作成。
 * 1.02_user-stories/README.md には 100MB の記載が 1 箇所あり、50MB の記載（5 箇所）と
 * 矛盾している。本レイヤーは多数派かつ API 仕様と整合する 50MB を採用した。
 * #39 の決定後、本コメントと #58 の実装値を必ず更新すること。
 */
export const DB_NAME = "quizpocket";
export const DB_VERSION = 1;

export interface QuizPocketDBSchema extends DBSchema {
  answers: {
    key: string;
    value: AnswerRecord;
    indexes: { "by-sessionId": string };
  };
  drafts: { key: string; value: DraftRecord };
  syncQueue: { key: number; value: SyncQueueItem };
  quizCache: { key: string; value: QuizCacheRecord };
}

/**
 * v1 のストア構成を作成する。DB_VERSION = 1 では oldVersion による分岐は
 * 到達不能（恒久的に未カバレッジになりカバレッジ閾値を割る）ため設けない。
 * v2 以降で index 追加等が必要になった際に oldVersion 分岐を追加すること。
 */
export function upgradeQuizPocketDb(
  db: IDBPDatabase<QuizPocketDBSchema>,
): void {
  const answers = db.createObjectStore("answers", { keyPath: "localId" });
  answers.createIndex("by-sessionId", "sessionId");
  db.createObjectStore("drafts", { keyPath: "id" });
  // out-of-line + autoIncrement: キー昇順＝挿入順で FIFO を保証する。
  // in-line keyPath にすると保存値に順序キーが混入し SyncQueueItem の
  // API 契約（syncBatch.items[]）と型が食い違うため避ける。
  db.createObjectStore("syncQueue", { autoIncrement: true });
  db.createObjectStore("quizCache", { keyPath: "id" });
}
