-- Quiz.status に draft/published を追加する(ADR-0027)
--
-- SQLiteはCHECK制約を直接ALTERできないため、テーブル再作成で対応する。
-- 既存の列・デフォルト値・外部キーはそのまま引き継ぐ。QuizTag/Attemptからの
-- 外部キーはテーブル名で解決されるため、再作成後も参照は維持される。

PRAGMA foreign_keys = OFF;

CREATE TABLE "Quiz_new" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "question" text NOT NULL,
  "answer_type" TEXT NOT NULL CHECK ("answer_type" IN ('boolean', 'free_text', 'single_choice', 'multiple_choice')),
  "solution_id" INTEGER NOT NULL,
  "explanation" text,
  "status" TEXT NOT NULL DEFAULT 'pending_approval' CHECK ("status" IN ('draft', 'pending_approval', 'approved', 'rejected', 'published')),
  "creator_id" INTEGER NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "approved_at" timestamp
,
  FOREIGN KEY ("creator_id") REFERENCES "UserIdentity" ("id"));

INSERT INTO "Quiz_new" ("id", "question", "answer_type", "solution_id", "explanation", "status", "creator_id", "created_at", "approved_at")
  SELECT "id", "question", "answer_type", "solution_id", "explanation", "status", "creator_id", "created_at", "approved_at" FROM "Quiz";

DROP TABLE "Quiz";

ALTER TABLE "Quiz_new" RENAME TO "Quiz";

PRAGMA foreign_keys = ON;
