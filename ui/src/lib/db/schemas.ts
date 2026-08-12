import { z } from "zod";

/** 同期アイテム種別。POST /api/sync/v1/upload の items.type と一致させる。 */
export const syncItemTypeSchema = z.enum([
  "answer",
  "draft",
  "session",
  "preference",
]);

/** 同期アイテム操作種別。POST /api/sync/v1/upload の items.action と一致させる。 */
export const syncItemActionSchema = z.enum(["create", "update", "delete"]);

/** 回答記録。localId は batch-answers API のローカルIDとしてそのまま送出する。 */
export const answerRecordSchema = z
  .object({
    localId: z.uuid(),
    sessionId: z.string().min(1),
    quizId: z.string().min(1),
    userAnswer: z.boolean(),
    responseTimeMs: z.int().nonnegative(),
    answeredAt: z.iso.datetime(),
  })
  .readonly();

/** クイズ作成の下書き。入力途中を保持するため正解・解説は任意。 */
export const draftRecordSchema = z
  .object({
    id: z.uuid(),
    question: z.string().max(500),
    correctAnswer: z.boolean().optional(),
    explanation: z.string().max(1000).optional(),
    tags: z.array(z.string()).readonly(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
  })
  .readonly();

/** 未同期キューの1件。syncBatch.items の1要素と同一構造。 */
export const syncQueueItemSchema = z
  .object({
    id: z.uuid(),
    type: syncItemTypeSchema,
    action: syncItemActionSchema,
    data: z.record(z.string(), z.unknown()).readonly(),
    timestamp: z.iso.datetime(),
    checksum: z.string(),
  })
  .readonly();

/**
 * ui/src/types/quiz.ts の Quiz と構造一致させる（等価性は schemas.spec.ts の
 * 型レベルテストで固定する）。型の二重管理を避けるため Quiz 側は変更しない。
 */
export const quizSchema = z
  .object({
    id: z.string().min(1),
    question: z.string(),
    answerType: z.enum([
      "boolean",
      "single_choice",
      "multiple_choice",
      "free_text",
    ]),
    status: z.enum(["未解答", "解答済み", "復習が必要"]),
    tags: z.array(z.string()).readonly(),
    hasExplanation: z.boolean(),
    isOfflineAvailable: z.boolean().optional(),
  })
  .readonly();

/** クイズキャッシュの1件。expiresAt を過ぎたレコードは repository が破棄する。 */
export const quizCacheRecordSchema = z
  .object({
    id: z.string().min(1),
    quiz: quizSchema,
    cachedAt: z.int().nonnegative(),
    expiresAt: z.int().nonnegative(),
  })
  .readonly();

export type SyncItemType = z.infer<typeof syncItemTypeSchema>;
export type SyncItemAction = z.infer<typeof syncItemActionSchema>;
export type AnswerRecord = z.infer<typeof answerRecordSchema>;
export type DraftRecord = z.infer<typeof draftRecordSchema>;
export type SyncQueueItem = z.infer<typeof syncQueueItemSchema>;
export type QuizCacheRecord = z.infer<typeof quizCacheRecordSchema>;
