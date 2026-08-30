-- Quiz.status に draft/published を追加する(ADR-0029)
--
-- SQLiteはCHECK制約を直接ALTERできないため、テーブル再作成で対応する。
-- 既存の列・デフォルト値・外部キーはそのまま引き継ぐ。
--
-- 注意(S-1): `PRAGMA foreign_keys = OFF` も `PRAGMA defer_foreign_keys = on`
-- も、QuizTag/AttemptがQuizを参照する行を持つ状態でのDROP TABLE "Quiz"を
-- 防げないことをローカルD1（wrangler 4.32.0、seed投入後の状態）で実機検証
-- 済み（子行が無い空DBでは再現しないため気づけなかった）。D1公式ドキュメント
-- は `PRAGMA foreign_keys = OFF/ON` がD1では無視されると明記しているが、
-- 代替として案内されている `defer_foreign_keys` もこの環境では同じ
-- FOREIGN KEY constraint failedで失敗した。
--
-- そのため、Quizを参照する子テーブル（QuizTag/Attempt）を一時テーブルへ
-- 退避してから一旦DROPし、Quiz再作成後に同一DDLで作り直してデータを
-- 復元する方式に変更する。QuizTag/Attempt自体のスキーマ（列・CHECK制約・
-- 外部キー）はこのマイグレーションの対象外であり、0001_initial.sqlの
-- 定義から変更しない。

-- 1. Quizを参照する子テーブルのデータを一時テーブルへ退避
CREATE TABLE "_QuizTag_backup" AS SELECT * FROM "QuizTag";
CREATE TABLE "_Attempt_backup" AS SELECT * FROM "Attempt";

-- 2. Quizへの外部キー参照を無くすため、子テーブルを一旦削除
DROP TABLE "QuizTag";
DROP TABLE "Attempt";

-- 3. Quizテーブルを再作成（CHECK制約のみdraft/publishedを追加した5値に拡張）
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

-- 4. 子テーブルを0001_initial.sqlと同一DDLで再作成し、退避データを復元
--    (idを明示INSERTすることでsqlite_sequenceの採番も引き継がれる)
CREATE TABLE "QuizTag" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "quiz_id" INTEGER NOT NULL,
  "tag_id" INTEGER NOT NULL,
  "assigned_at" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP)
,
  FOREIGN KEY ("quiz_id") REFERENCES "Quiz" ("id"),
  FOREIGN KEY ("tag_id") REFERENCES "Tag" ("id"));

INSERT INTO "QuizTag" ("id", "quiz_id", "tag_id", "assigned_at")
  SELECT "id", "quiz_id", "tag_id", "assigned_at" FROM "_QuizTag_backup";

DROP TABLE "_QuizTag_backup";

CREATE TABLE "Attempt" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "quiz_id" INTEGER NOT NULL,
  "session_id" INTEGER NOT NULL,
  "user_id" INTEGER NOT NULL,
  "answer_type" TEXT NOT NULL CHECK ("answer_type" IN ('boolean', 'free_text', 'single_choice', 'multiple_choice')),
  "answer_id" INTEGER NOT NULL,
  "is_correct" boolean NOT NULL,
  "answered_at" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP)
,
  FOREIGN KEY ("quiz_id") REFERENCES "Quiz" ("id"),
  FOREIGN KEY ("session_id") REFERENCES "QuizSession" ("id"),
  FOREIGN KEY ("user_id") REFERENCES "UserIdentity" ("id"));

INSERT INTO "Attempt" ("id", "quiz_id", "session_id", "user_id", "answer_type", "answer_id", "is_correct", "answered_at")
  SELECT "id", "quiz_id", "session_id", "user_id", "answer_type", "answer_id", "is_correct", "answered_at" FROM "_Attempt_backup";

DROP TABLE "_Attempt_backup";

-- 外部キー整合性の検証
PRAGMA foreign_key_check;
