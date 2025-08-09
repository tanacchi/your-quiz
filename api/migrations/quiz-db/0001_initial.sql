-- Initial schema for Quiz Application
-- Converted from DBML to SQLite format for Cloudflare D1
PRAGMA foreign_keys = ON;

-- User Tables
CREATE TABLE "UserAccount" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "name" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255),
  "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "UserIdentity" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "anonymous_id" VARCHAR(255) UNIQUE NOT NULL,
  "user_account_id" INTEGER,
  "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("user_account_id") REFERENCES "UserAccount" ("id")
);

-- Quiz and Solution Tables
CREATE TABLE "Quiz" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "question" TEXT NOT NULL,
  "answer_type" TEXT NOT NULL CHECK ("answer_type" IN ('boolean', 'free_text', 'single_choice', 'multiple_choice')),
  "solution_id" INTEGER NOT NULL,
  "explanation" TEXT,
  "status" TEXT NOT NULL DEFAULT 'pending_approval' CHECK ("status" IN ('pending_approval', 'approved', 'rejected')),
  "creator_id" INTEGER NOT NULL,
  "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "approved_at" DATETIME,
  FOREIGN KEY ("creator_id") REFERENCES "UserIdentity" ("id")
);

CREATE TABLE "BooleanSolution" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "value" INTEGER NOT NULL CHECK ("value" IN (0, 1))
);

CREATE TABLE "FreeTextSolution" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "correct_answer" TEXT NOT NULL,
  "matching_strategy" TEXT NOT NULL DEFAULT 'exact' CHECK ("matching_strategy" IN ('exact', 'partial', 'regex')),
  "case_sensitive" INTEGER NOT NULL DEFAULT 0 CHECK ("case_sensitive" IN (0, 1))
);

CREATE TABLE "SingleChoiceSolution" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "correct_choice_id" INTEGER NOT NULL
);

CREATE TABLE "MultipleChoiceSolution" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "correct_choice_ids" TEXT NOT NULL, -- JSON array of choice IDs
  "min_correct_answers" INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE "Choice" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "solution_id" INTEGER NOT NULL,
  "text" VARCHAR(500) NOT NULL,
  "order_index" INTEGER NOT NULL
);

-- Tag Tables
CREATE TABLE "Tag" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "name" VARCHAR(100) UNIQUE NOT NULL,
  "type" TEXT NOT NULL CHECK ("type" IN ('official', 'user')),
  "created_by" INTEGER,
  "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("created_by") REFERENCES "UserIdentity" ("id")
);

CREATE TABLE "TagRelation" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "parent_tag_id" INTEGER NOT NULL,
  "child_tag_id" INTEGER NOT NULL,
  "relation_type" TEXT NOT NULL CHECK ("relation_type" IN ('hierarchy', 'category', 'synonym', 'related')),
  "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("parent_tag_id") REFERENCES "Tag" ("id"),
  FOREIGN KEY ("child_tag_id") REFERENCES "Tag" ("id")
);

CREATE TABLE "QuizTag" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "quiz_id" INTEGER NOT NULL,
  "tag_id" INTEGER NOT NULL,
  "assigned_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("quiz_id") REFERENCES "Quiz" ("id"),
  FOREIGN KEY ("tag_id") REFERENCES "Tag" ("id")
);

-- Deck and Session Tables
CREATE TABLE "Deck" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "name" VARCHAR(200) NOT NULL,
  "description" TEXT,
  "quiz_ids" TEXT NOT NULL, -- JSON array of quiz IDs
  "creator_id" INTEGER NOT NULL,
  "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "last_modified_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("creator_id") REFERENCES "UserIdentity" ("id")
);

CREATE TABLE "QuizSession" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "deck_id" INTEGER NOT NULL,
  "creator_id" INTEGER NOT NULL,
  "device_fingerprint" VARCHAR(255) NOT NULL,
  "started_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "completed_at" DATETIME,
  "is_completed" INTEGER NOT NULL DEFAULT 0 CHECK ("is_completed" IN (0, 1)),
  FOREIGN KEY ("deck_id") REFERENCES "Deck" ("id"),
  FOREIGN KEY ("creator_id") REFERENCES "UserIdentity" ("id")
);

-- Answer Tables
CREATE TABLE "BooleanAnswer" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "value" INTEGER NOT NULL CHECK ("value" IN (0, 1))
);

CREATE TABLE "FreeTextAnswer" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "text" TEXT NOT NULL
);

CREATE TABLE "SingleChoiceAnswer" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "selected_choice_id" INTEGER NOT NULL,
  FOREIGN KEY ("selected_choice_id") REFERENCES "Choice" ("id")
);

CREATE TABLE "MultipleChoiceAnswer" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "selected_choice_ids" TEXT NOT NULL -- JSON array of choice IDs
);

-- Attempt Table
CREATE TABLE "Attempt" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "quiz_id" INTEGER NOT NULL,
  "session_id" INTEGER NOT NULL,
  "user_id" INTEGER NOT NULL,
  "answer_type" TEXT NOT NULL CHECK ("answer_type" IN ('boolean', 'free_text', 'single_choice', 'multiple_choice')),
  "answer_id" INTEGER NOT NULL,
  "is_correct" INTEGER NOT NULL CHECK ("is_correct" IN (0, 1)),
  "answered_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("quiz_id") REFERENCES "Quiz" ("id"),
  FOREIGN KEY ("session_id") REFERENCES "QuizSession" ("id"),
  FOREIGN KEY ("user_id") REFERENCES "UserIdentity" ("id")
);

-- Add foreign key constraints after initial setup
ALTER TABLE "SingleChoiceSolution" ADD FOREIGN KEY ("correct_choice_id") REFERENCES "Choice" ("id");

-- Indexes for performance
CREATE INDEX "idx_quiz_status_created_at" ON "Quiz" ("status", "created_at");
CREATE INDEX "idx_attempt_session_quiz" ON "Attempt" ("session_id", "quiz_id");
CREATE INDEX "idx_user_identity_anonymous_id" ON "UserIdentity" ("anonymous_id");
CREATE INDEX "idx_quiz_creator_id" ON "Quiz" ("creator_id");
CREATE INDEX "idx_deck_creator_id" ON "Deck" ("creator_id");