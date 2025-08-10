PRAGMA foreign_keys = ON;

-- SQL dump generated using DBML (dbml.dbdiagram.io)
-- Database: PostgreSQL
-- Generated at: 2025-08-09T22:50:03.623Z

CREATE TABLE "UserAccount" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "name" varchar(255) NOT NULL,
  "email" varchar(255),
  "created_at" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "UserIdentity" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "anonymous_id" varchar(255) UNIQUE NOT NULL,
  "user_account_id" INTEGER,
  "created_at" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP)
,
  FOREIGN KEY ("user_account_id") REFERENCES "UserAccount" ("id"));

CREATE TABLE "Quiz" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "question" text NOT NULL,
  "answer_type" TEXT NOT NULL CHECK ("answer_type" IN ('boolean', 'free_text', 'single_choice', 'multiple_choice')),
  "solution_id" INTEGER NOT NULL,
  "explanation" text,
  "status" TEXT NOT NULL DEFAULT 'pending_approval' CHECK ("status" IN ('pending_approval', 'approved', 'rejected')),
  "creator_id" INTEGER NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "approved_at" timestamp
,
  FOREIGN KEY ("creator_id") REFERENCES "UserIdentity" ("id"));

CREATE TABLE "BooleanSolution" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "value" boolean NOT NULL
);

CREATE TABLE "FreeTextSolution" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "correct_answer" text NOT NULL,
  "matching_strategy" TEXT NOT NULL DEFAULT 'exact' CHECK ("matching_strategy" IN ('exact', 'partial', 'regex')),
  "case_sensitive" boolean NOT NULL DEFAULT false
);

CREATE TABLE "SingleChoiceSolution" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "correct_choice_id" INTEGER NOT NULL
,
  FOREIGN KEY ("correct_choice_id") REFERENCES "Choice" ("id"));

CREATE TABLE "MultipleChoiceSolution" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "correct_choice_ids" "TEXT" NOT NULL,
  "min_correct_answers" int NOT NULL DEFAULT 1
);

CREATE TABLE "Choice" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "solution_id" INTEGER NOT NULL,
  "text" varchar(500) NOT NULL,
  "order_index" int NOT NULL
);

CREATE TABLE "Tag" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "name" varchar(100) UNIQUE NOT NULL,
  "type" TEXT NOT NULL CHECK ("type" IN ('official', 'user')),
  "created_by" INTEGER,
  "created_at" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP)
,
  FOREIGN KEY ("created_by") REFERENCES "UserIdentity" ("id"));

CREATE TABLE "TagRelation" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "parent_tag_id" INTEGER NOT NULL,
  "child_tag_id" INTEGER NOT NULL,
  "relation_type" TEXT NOT NULL CHECK ("relation_type" IN ('hierarchy', 'category', 'synonym', 'related')),
  "created_at" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP)
,
  FOREIGN KEY ("parent_tag_id") REFERENCES "Tag" ("id"),
  FOREIGN KEY ("child_tag_id") REFERENCES "Tag" ("id"));

CREATE TABLE "QuizTag" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "quiz_id" INTEGER NOT NULL,
  "tag_id" INTEGER NOT NULL,
  "assigned_at" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP)
,
  FOREIGN KEY ("quiz_id") REFERENCES "Quiz" ("id"),
  FOREIGN KEY ("tag_id") REFERENCES "Tag" ("id"));

CREATE TABLE "Deck" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "name" varchar(200) NOT NULL,
  "description" text,
  "quiz_ids" "TEXT" NOT NULL,
  "creator_id" INTEGER NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "last_modified_at" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP)
,
  FOREIGN KEY ("creator_id") REFERENCES "UserIdentity" ("id"));

CREATE TABLE "QuizSession" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "deck_id" INTEGER NOT NULL,
  "creator_id" INTEGER NOT NULL,
  "device_fingerprint" varchar(255) NOT NULL,
  "started_at" timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  "completed_at" timestamp,
  "is_completed" boolean NOT NULL DEFAULT false
,
  FOREIGN KEY ("deck_id") REFERENCES "Deck" ("id"),
  FOREIGN KEY ("creator_id") REFERENCES "UserIdentity" ("id"));

CREATE TABLE "BooleanAnswer" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "value" boolean NOT NULL
);

CREATE TABLE "FreeTextAnswer" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "text" text NOT NULL
);

CREATE TABLE "SingleChoiceAnswer" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "selected_choice_id" INTEGER NOT NULL
,
  FOREIGN KEY ("selected_choice_id") REFERENCES "Choice" ("id"));

CREATE TABLE "MultipleChoiceAnswer" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "selected_choice_ids" "TEXT" NOT NULL
);

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

