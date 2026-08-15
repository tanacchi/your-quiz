import { z } from "zod";

/**
 * クイズリスト取得クエリの柔軟なZodスキーマ
 *
 * HTTPクエリパラメータとドメインクエリの両方を受け取れる
 * 緩めの定義でバリデーション＋型安全なtransformを提供
 */

// QuizStatusの有効値定義（ADR-0027）
const VALID_QUIZ_STATUSES = [
  "draft",
  "pending_approval",
  "approved",
  "rejected",
  "published",
] as const;

export const listQuizzesQuerySchema = z.object({
  // publishedを含めないと公開直後のクイズが一覧から消えるため、デフォルトに含める（ADR-0027）
  status: z
    .array(z.enum(VALID_QUIZ_STATUSES))
    .optional()
    .default(["approved", "published"]),
  creatorId: z.string().min(1).optional(),
  quizId: z.array(z.string().min(1)).optional(),
  limit: z.number().int().min(1).max(100).default(10),
  offset: z.number().int().min(0).default(0),
});

export const listQueryFromReq = z
  .object({
    status: z.array(z.string()).optional(),
    creatorId: z.string().optional(),
    quizId: z.array(z.string()).optional(),
    limit: z.coerce.number().optional(),
    offset: z.coerce.number().optional(),
  })
  .pipe(listQuizzesQuerySchema);

export type ListQuizzesQuery = z.output<typeof listQuizzesQuerySchema>;
