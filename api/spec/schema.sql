PRAGMA foreign_keys = ON;

-- SQL dump generated using DBML (dbml.dbdiagram.io)
-- Database: PostgreSQL
-- Generated at: 2025-08-05T16:27:24.383Z

CREATE TYPE "AnswerType" AS ENUM (
  'boolean',
  'free_text',
  'single_choice',
  'multiple_choice'
);

CREATE TYPE "QuizStatus" AS ENUM (
  'pending_approval',
  'approved',
  'rejected'
);

CREATE TYPE "TagType" AS ENUM (
  'official',
  'user'
);

CREATE TYPE "RelationType" AS ENUM (
  'hierarchy',
  'category',
  'synonym',
  'related'
);

CREATE TYPE "MatchingStrategy" AS ENUM (
  'exact',
  'partial',
  'regex'
);

CREATE TABLE "UserAccount" (
  "id" "UserAccountId" PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "email" varchar(255),
  "created_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "UserIdentity" (
  "id" "UserId" PRIMARY KEY,
  "anonymous_id" varchar(255) UNIQUE NOT NULL,
  "user_account_id" "UserAccountId",
  "created_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "Quiz" (
  "id" "QuizId" PRIMARY KEY,
  "question" text NOT NULL,
  "answer_type" "AnswerType" NOT NULL,
  "solution_id" "SolutionId" NOT NULL,
  "explanation" text,
  "status" "QuizStatus" NOT NULL DEFAULT 'pending_approval',
  "creator_id" "UserId" NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "approved_at" timestamp
);

CREATE TABLE "BooleanSolution" (
  "id" "SolutionId" PRIMARY KEY,
  "value" boolean NOT NULL
);

CREATE TABLE "FreeTextSolution" (
  "id" "SolutionId" PRIMARY KEY,
  "correct_answer" text NOT NULL,
  "matching_strategy" "MatchingStrategy" NOT NULL DEFAULT 'exact',
  "case_sensitive" boolean NOT NULL DEFAULT false
);

CREATE TABLE "SingleChoiceSolution" (
  "id" "SolutionId" PRIMARY KEY,
  "correct_choice_id" "ChoiceId" NOT NULL
);

CREATE TABLE "MultipleChoiceSolution" (
  "id" "SolutionId" PRIMARY KEY,
  "correct_choice_ids" "ChoiceId[]" NOT NULL,
  "min_correct_answers" int NOT NULL DEFAULT 1
);

CREATE TABLE "Choice" (
  "id" "ChoiceId" PRIMARY KEY,
  "solution_id" "SolutionId" NOT NULL,
  "text" varchar(500) NOT NULL,
  "order_index" int NOT NULL
);

CREATE TABLE "Tag" (
  "id" "TagId" PRIMARY KEY,
  "name" varchar(100) UNIQUE NOT NULL,
  "type" "TagType" NOT NULL,
  "created_by" "UserId",
  "created_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "TagRelation" (
  "id" "TagRelationId" PRIMARY KEY,
  "parent_tag_id" "TagId" NOT NULL,
  "child_tag_id" "TagId" NOT NULL,
  "relation_type" "RelationType" NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "QuizTag" (
  "id" "QuizTagId" PRIMARY KEY,
  "quiz_id" "QuizId" NOT NULL,
  "tag_id" "TagId" NOT NULL,
  "assigned_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "Deck" (
  "id" "DeckId" PRIMARY KEY,
  "name" varchar(200) NOT NULL,
  "description" text,
  "quiz_ids" "QuizId[]" NOT NULL,
  "creator_id" "UserId" NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "last_modified_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "QuizSession" (
  "id" "SessionId" PRIMARY KEY,
  "deck_id" "DeckId" NOT NULL,
  "creator_id" "UserId" NOT NULL,
  "device_fingerprint" varchar(255) NOT NULL,
  "started_at" timestamp NOT NULL DEFAULT (now()),
  "completed_at" timestamp,
  "is_completed" boolean NOT NULL DEFAULT false
);

CREATE TABLE "BooleanAnswer" (
  "id" "AnswerId" PRIMARY KEY,
  "value" boolean NOT NULL
);

CREATE TABLE "FreeTextAnswer" (
  "id" "AnswerId" PRIMARY KEY,
  "text" text NOT NULL
);

CREATE TABLE "SingleChoiceAnswer" (
  "id" "AnswerId" PRIMARY KEY,
  "selected_choice_id" "ChoiceId" NOT NULL
);

CREATE TABLE "MultipleChoiceAnswer" (
  "id" "AnswerId" PRIMARY KEY,
  "selected_choice_ids" "ChoiceId[]" NOT NULL
);

CREATE TABLE "Attempt" (
  "id" "AttemptId" PRIMARY KEY,
  "quiz_id" "QuizId" NOT NULL,
  "session_id" "SessionId" NOT NULL,
  "user_id" "UserId" NOT NULL,
  "answer_type" "AnswerType" NOT NULL,
  "answer_id" "AnswerId" NOT NULL,
  "is_correct" boolean NOT NULL,
  "answered_at" timestamp NOT NULL DEFAULT (now())
);

COMMENT ON TABLE "UserAccount" IS 'Deletable user account details. Can be removed while preserving content via UserIdentity.';

COMMENT ON COLUMN "UserAccount"."name" IS 'User display name';

COMMENT ON COLUMN "UserAccount"."email" IS 'Optional email for future features';

COMMENT ON TABLE "UserIdentity" IS 'Persistent anonymous user identity. Referenced by Quiz/Deck/Session for content ownership. Survives UserAccount deletion.';

COMMENT ON COLUMN "UserIdentity"."anonymous_id" IS 'Browser-based anonymous identifier';

COMMENT ON COLUMN "UserIdentity"."user_account_id" IS 'Optional link to account details';

COMMENT ON TABLE "Quiz" IS 'Quiz entity with polymorphic solution design. Only approved quizzes can be answered.';

COMMENT ON COLUMN "Quiz"."question" IS 'Max 500 characters';

COMMENT ON COLUMN "Quiz"."answer_type" IS 'Discriminator: boolean|free_text|single_choice|multiple_choice';

COMMENT ON COLUMN "Quiz"."solution_id" IS 'Polymorphic reference to solution tables';

COMMENT ON COLUMN "Quiz"."explanation" IS 'Max 1000 characters, optional';

COMMENT ON COLUMN "Quiz"."status" IS 'pending_approval|approved|rejected';

COMMENT ON COLUMN "Quiz"."approved_at" IS 'Set when status becomes approved';

COMMENT ON TABLE "BooleanSolution" IS 'Solution for boolean (○×) type quizzes';

COMMENT ON COLUMN "BooleanSolution"."value" IS 'True or false answer';

COMMENT ON TABLE "FreeTextSolution" IS 'Solution for free text input quizzes';

COMMENT ON COLUMN "FreeTextSolution"."correct_answer" IS 'Expected text answer';

COMMENT ON COLUMN "FreeTextSolution"."matching_strategy" IS 'exact|partial|regex';

COMMENT ON TABLE "SingleChoiceSolution" IS 'Solution for single choice quizzes (4-choice questions etc.)';

COMMENT ON TABLE "MultipleChoiceSolution" IS 'Solution for multiple choice quizzes';

COMMENT ON COLUMN "MultipleChoiceSolution"."correct_choice_ids" IS 'Array of correct choice IDs';

COMMENT ON COLUMN "MultipleChoiceSolution"."min_correct_answers" IS 'Minimum correct answers required';

COMMENT ON TABLE "Choice" IS 'Choice options for single/multiple choice solutions';

COMMENT ON COLUMN "Choice"."solution_id" IS 'References SingleChoice or MultipleChoice solution';

COMMENT ON COLUMN "Choice"."text" IS 'Choice option text';

COMMENT ON COLUMN "Choice"."order_index" IS 'Display order within solution';

COMMENT ON TABLE "Tag" IS 'Tags for quiz categorization. Official tags created by system, user tags by users.';

COMMENT ON COLUMN "Tag"."type" IS 'official|user';

COMMENT ON COLUMN "Tag"."created_by" IS 'NULL for official tags';

COMMENT ON TABLE "TagRelation" IS 'N:M self-referencing tag relationships for hierarchies (food/ramen/tonkotsu-ramen)';

COMMENT ON COLUMN "TagRelation"."relation_type" IS 'hierarchy|category|synonym|related';

COMMENT ON TABLE "QuizTag" IS 'N:M relationship between Quiz and Tag';

COMMENT ON TABLE "Deck" IS 'Quiz collections created from search results or manual selection. Only approved quizzes allowed.';

COMMENT ON COLUMN "Deck"."name" IS 'Deck display name';

COMMENT ON COLUMN "Deck"."description" IS 'Optional deck description';

COMMENT ON COLUMN "Deck"."quiz_ids" IS 'Array of quiz IDs in order';

COMMENT ON TABLE "QuizSession" IS 'Learning session for a deck. Multiple sessions can use same deck for repeated learning.';

COMMENT ON COLUMN "QuizSession"."deck_id" IS '1:N relationship - multiple sessions per deck';

COMMENT ON COLUMN "QuizSession"."creator_id" IS 'Session owner for learning history';

COMMENT ON COLUMN "QuizSession"."device_fingerprint" IS 'Browser-based device identification';

COMMENT ON COLUMN "QuizSession"."completed_at" IS 'Set when session is completed';

COMMENT ON TABLE "BooleanAnswer" IS 'User answer for boolean (○×) type questions';

COMMENT ON COLUMN "BooleanAnswer"."value" IS 'User selected true/false';

COMMENT ON TABLE "FreeTextAnswer" IS 'User answer for free text input questions';

COMMENT ON COLUMN "FreeTextAnswer"."text" IS 'User input text';

COMMENT ON TABLE "SingleChoiceAnswer" IS 'User answer for single choice questions';

COMMENT ON COLUMN "SingleChoiceAnswer"."selected_choice_id" IS 'User selected choice';

COMMENT ON TABLE "MultipleChoiceAnswer" IS 'User answer for multiple choice questions';

COMMENT ON COLUMN "MultipleChoiceAnswer"."selected_choice_ids" IS 'Array of user selected choice IDs';

COMMENT ON TABLE "Attempt" IS 'User attempt with polymorphic answer design. Answer type must match Quiz answer type.';

COMMENT ON COLUMN "Attempt"."user_id" IS 'Answer submitter (may differ from session creator)';

COMMENT ON COLUMN "Attempt"."answer_type" IS 'Discriminator matching Quiz.answer_type';

COMMENT ON COLUMN "Attempt"."answer_id" IS 'Polymorphic reference to answer tables';

COMMENT ON COLUMN "Attempt"."is_correct" IS 'Calculated by comparing Answer with Solution';

ALTER TABLE "UserIdentity" ADD FOREIGN KEY ("user_account_id") REFERENCES "UserAccount" ("id");

ALTER TABLE "Quiz" ADD FOREIGN KEY ("creator_id") REFERENCES "UserIdentity" ("id");

ALTER TABLE "SingleChoiceSolution" ADD FOREIGN KEY ("correct_choice_id") REFERENCES "Choice" ("id");

ALTER TABLE "Tag" ADD FOREIGN KEY ("created_by") REFERENCES "UserIdentity" ("id");

ALTER TABLE "TagRelation" ADD FOREIGN KEY ("parent_tag_id") REFERENCES "Tag" ("id");

ALTER TABLE "TagRelation" ADD FOREIGN KEY ("child_tag_id") REFERENCES "Tag" ("id");

ALTER TABLE "QuizTag" ADD FOREIGN KEY ("quiz_id") REFERENCES "Quiz" ("id");

ALTER TABLE "QuizTag" ADD FOREIGN KEY ("tag_id") REFERENCES "Tag" ("id");

ALTER TABLE "Deck" ADD FOREIGN KEY ("creator_id") REFERENCES "UserIdentity" ("id");

ALTER TABLE "QuizSession" ADD FOREIGN KEY ("deck_id") REFERENCES "Deck" ("id");

ALTER TABLE "QuizSession" ADD FOREIGN KEY ("creator_id") REFERENCES "UserIdentity" ("id");

ALTER TABLE "SingleChoiceAnswer" ADD FOREIGN KEY ("selected_choice_id") REFERENCES "Choice" ("id");

ALTER TABLE "Attempt" ADD FOREIGN KEY ("quiz_id") REFERENCES "Quiz" ("id");

ALTER TABLE "Attempt" ADD FOREIGN KEY ("session_id") REFERENCES "QuizSession" ("id");

ALTER TABLE "Attempt" ADD FOREIGN KEY ("user_id") REFERENCES "UserIdentity" ("id");
