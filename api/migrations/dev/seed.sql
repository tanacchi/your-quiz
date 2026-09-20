-- Development seed data for Quiz Application
-- This file is for local development only and should not be applied to production

-- Insert test users
INSERT INTO "UserIdentity" ("anonymous_id", "user_account_id", "created_at") VALUES 
  ('test-user-001', NULL, CURRENT_TIMESTAMP),
  ('test-user-002', NULL, CURRENT_TIMESTAMP),
  ('test-user-003', NULL, CURRENT_TIMESTAMP),
  ('test-user-004', NULL, CURRENT_TIMESTAMP);

INSERT INTO "UserAccount" ("name", "email", "created_at") VALUES 
  ('テストユーザー1', 'test1@example.com', CURRENT_TIMESTAMP),
  ('テストユーザー2', 'test2@example.com', CURRENT_TIMESTAMP),
  ('山田太郎', 'yamada@example.com', CURRENT_TIMESTAMP),
  ('佐藤花子', NULL, CURRENT_TIMESTAMP);

-- Update user identities to link accounts
UPDATE "UserIdentity" SET "user_account_id" = 1 WHERE "anonymous_id" = 'test-user-001';
UPDATE "UserIdentity" SET "user_account_id" = 2 WHERE "anonymous_id" = 'test-user-002';
UPDATE "UserIdentity" SET "user_account_id" = 3 WHERE "anonymous_id" = 'test-user-003';
UPDATE "UserIdentity" SET "user_account_id" = 4 WHERE "anonymous_id" = 'test-user-004';

-- Insert sample tags with hierarchy
INSERT INTO "Tag" ("name", "type", "created_by", "created_at") VALUES 
  -- Official category tags
  ('プログラミング', 'official', NULL, CURRENT_TIMESTAMP),
  ('Web開発', 'official', NULL, CURRENT_TIMESTAMP),
  ('データベース', 'official', NULL, CURRENT_TIMESTAMP),
  ('アルゴリズム', 'official', NULL, CURRENT_TIMESTAMP),
  -- Technology tags
  ('JavaScript', 'official', NULL, CURRENT_TIMESTAMP),
  ('TypeScript', 'official', NULL, CURRENT_TIMESTAMP),
  ('React', 'official', NULL, CURRENT_TIMESTAMP),
  ('Node.js', 'official', NULL, CURRENT_TIMESTAMP),
  ('SQL', 'official', NULL, CURRENT_TIMESTAMP),
  ('NoSQL', 'official', NULL, CURRENT_TIMESTAMP),
  -- Difficulty tags
  ('初級', 'user', 1, CURRENT_TIMESTAMP),
  ('中級', 'user', 1, CURRENT_TIMESTAMP),
  ('上級', 'user', 1, CURRENT_TIMESTAMP),
  -- Domain specific
  ('フロントエンド', 'user', 2, CURRENT_TIMESTAMP),
  ('バックエンド', 'user', 2, CURRENT_TIMESTAMP),
  ('セキュリティ', 'user', 3, CURRENT_TIMESTAMP);

-- Create tag hierarchies
INSERT INTO "TagRelation" ("parent_tag_id", "child_tag_id", "relation_type", "created_at") VALUES 
  (1, 5, 'category', CURRENT_TIMESTAMP), -- プログラミング -> JavaScript
  (1, 6, 'category', CURRENT_TIMESTAMP), -- プログラミング -> TypeScript
  (2, 5, 'category', CURRENT_TIMESTAMP), -- Web開発 -> JavaScript
  (2, 7, 'category', CURRENT_TIMESTAMP), -- Web開発 -> React
  (2, 8, 'category', CURRENT_TIMESTAMP), -- Web開発 -> Node.js
  (3, 9, 'category', CURRENT_TIMESTAMP), -- データベース -> SQL
  (3, 10, 'category', CURRENT_TIMESTAMP), -- データベース -> NoSQL
  (5, 6, 'related', CURRENT_TIMESTAMP),   -- JavaScript -> TypeScript (related)
  (14, 7, 'category', CURRENT_TIMESTAMP), -- フロントエンド -> React
  (15, 8, 'category', CURRENT_TIMESTAMP); -- バックエンド -> Node.js

-- Insert various solution types

-- Boolean solutions
INSERT INTO "BooleanSolution" ("value") VALUES (1); -- id: 1, true
INSERT INTO "BooleanSolution" ("value") VALUES (0); -- id: 2, false
INSERT INTO "BooleanSolution" ("value") VALUES (1); -- id: 3, true
INSERT INTO "BooleanSolution" ("value") VALUES (0); -- id: 4, false
INSERT INTO "BooleanSolution" ("value") VALUES (1); -- id: 5, true
INSERT INTO "BooleanSolution" ("value") VALUES (0); -- id: 6, false (for rejected quiz)
INSERT INTO "BooleanSolution" ("value") VALUES (1); -- id: 7, true (for rejected quiz)

-- Free text solutions
INSERT INTO "FreeTextSolution" ("correct_answer", "matching_strategy", "case_sensitive") VALUES 
  ('Hello World', 'exact', 0),           -- id: 8
  ('console.log', 'partial', 0),         -- id: 9
  ('SELECT * FROM users', 'partial', 0), -- id: 10
  ('useState', 'exact', 1),              -- id: 11
  ('async/await', 'partial', 0),         -- id: 12
  ('何でも', 'partial', 0);              -- id: 13 (for rejected quiz - too vague)

-- Single choice solutions
INSERT INTO "SingleChoiceSolution" DEFAULT VALUES;  -- id: 1 (quiz 14)
INSERT INTO "SingleChoiceSolution" DEFAULT VALUES;  -- id: 2 (quiz 15)
INSERT INTO "SingleChoiceSolution" DEFAULT VALUES;  -- id: 3 (quiz 16)
INSERT INTO "SingleChoiceSolution" DEFAULT VALUES;  -- id: 4 (quiz 17)
INSERT INTO "SingleChoiceSolution" DEFAULT VALUES;  -- id: 5 (quiz 18)
INSERT INTO "SingleChoiceSolution" DEFAULT VALUES;  -- id: 6 (quiz 19, rejected)

-- Multiple choice solutions
INSERT INTO "MultipleChoiceSolution" ("min_correct_answers") VALUES
  (2),   -- id: 1 (quiz 20), React, Vue.js, Angular are frameworks (minimum 2 required)
  (3);   -- id: 2 (quiz 21), all HTTP methods are correct (minimum 3 required)

-- Insert diverse sample quizzes
--
-- solution_idは各solutionテーブル内の連番（SingleChoiceSolutionとMultiple
-- ChoiceSolutionはそれぞれ独立にAUTOINCREMENTされるため、両者とも1から
-- 始まる）。Choiceはquiz_idで所属クイズを明示するため、Quiz挿入より後ろに
-- 置く必要がある(ADR-0030)。
INSERT INTO "Quiz" ("question", "answer_type", "solution_id", "explanation", "status", "creator_id", "created_at", "approved_at") VALUES
  -- Boolean quizzes
  ('TypeScriptはJavaScriptのスーパーセットである', 'boolean', 1, 'TypeScriptはJavaScriptに静的型付けを追加した言語で、JavaScriptのスーパーセットです', 'approved', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('SQLではNULL値は0と等しい', 'boolean', 2, 'NULL値は0ではなく、未定義の値を表します。NULL値との比較は常にNULLを返します', 'approved', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('ReactはFacebookが開発したライブラリである', 'boolean', 3, 'ReactはFacebook（現Meta）が開発し、オープンソースとして公開されています', 'approved', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('CSSのflexboxはテーブルレイアウトよりも古い技術である', 'boolean', 4, 'Flexboxは比較的新しい技術で、テーブルレイアウトよりもはるかに新しいです', 'approved', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Node.jsはブラウザでのみ動作する', 'boolean', 5, 'Node.jsはサーバーサイドでJavaScriptを実行するためのランタイム環境です', 'pending_approval', 3, CURRENT_TIMESTAMP, NULL),
  ('Pythonは静的型付け言語である', 'boolean', 6, 'Pythonは動的型付け言語です。静的型付けではありません', 'rejected', 4, CURRENT_TIMESTAMP, NULL),
  ('HTMLはプログラミング言語である', 'boolean', 7, 'HTMLはマークアップ言語であり、プログラミング言語ではありません。この質問は誤解を招く可能性があります', 'rejected', 3, CURRENT_TIMESTAMP, NULL),

  -- Free text quizzes（solution_idは1から始まるFreeTextSolutionの連番）
  ('プログラミングの世界で最初に表示される伝統的なメッセージは？', 'free_text', 1, '多くのプログラミング言語で最初に学ぶのは"Hello World"の表示です', 'approved', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('JavaScriptでコンソールに出力するために使用する関数名を答えてください', 'free_text', 2, 'console.log()がJavaScriptでの標準的なコンソール出力関数です', 'approved', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('すべてのユーザーを取得するSQLクエリを書いてください（テーブル名: users）', 'free_text', 3, 'SELECT文を使用してusersテーブルからすべてのレコードを取得します', 'approved', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Reactで状態管理を行う基本的なフック名を答えてください', 'free_text', 4, 'useStateはReactの関数コンポーネントで状態を管理するための基本的なフックです', 'approved', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('JavaScriptで非同期処理を扱う現代的な構文を答えてください', 'free_text', 5, 'async/awaitはPromiseベースの非同期処理をより読みやすく書くための構文です', 'pending_approval', 4, CURRENT_TIMESTAMP, NULL),
  ('プログラミングで最も重要なことは何ですか？', 'free_text', 6, 'この質問は主観的すぎて明確な答えがありません。採点基準が曖昧になります', 'rejected', 2, CURRENT_TIMESTAMP, NULL),

  -- Single choice quizzes（solution_idは上で作ったSingleChoiceSolutionの1..6）
  ('ES6で導入されたブロックスコープの変数宣言キーワードは？', 'single_choice', 1, 'letとconstがES6で導入されました。letは再代入可能、constは再代入不可です', 'approved', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('HTTPレスポンスでリクエスト成功を表すステータスコードは？', 'single_choice', 2, '200 OKはHTTPリクエストが正常に処理されたことを示します', 'approved', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Reactで最も基本的な状態管理フックは？', 'single_choice', 3, 'useStateはReactの関数コンポーネントで状態を管理するための最も基本的なフックです', 'approved', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('SQLで最も一般的に使用される結合方法は？', 'single_choice', 4, 'INNER JOINは両方のテーブルに一致するレコードのみを返す、最も一般的な結合方法です', 'approved', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('CSSで現代的なレイアウトシステムとして広く使われているのは？', 'single_choice', 5, 'Flexboxは現代的なCSSレイアウトシステムとして広く採用されています', 'approved', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('Webブラウザで動作するプログラミング言語は？', 'single_choice', 6, '質問と選択肢の内容が不正確です。HTMLはマークアップ言語、CSSはスタイルシート言語であり、プログラミング言語ではありません', 'rejected', 1, CURRENT_TIMESTAMP, NULL),

  -- Multiple choice quizzes（solution_idは上で作ったMultipleChoiceSolutionの1,2）
  --
  -- multiple_choiceのsolution_id=1は、上のsingle_choice(quiz 14)の
  -- solution_id=1と意図的に衝突させている。両テーブルは独立採番のため
  -- 実際にもこの衝突が起き得ることを示し、Choice.quiz_id基準の取得・削除が
  -- 選択肢を混同しないことをBDD/統合テストで確認する材料にする(ADR-0030)。
  ('以下のうち、JavaScriptフレームワーク/ライブラリはどれですか？（複数選択）', 'multiple_choice', 1, 'React、Vue.js、AngularはすべてJavaScriptフレームワークです。jQueryはライブラリですが、現代的なフレームワークではありません', 'approved', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('RESTful APIで使用される基本的なHTTPメソッドをすべて選んでください', 'multiple_choice', 2, 'GET、POST、PUT、DELETEはRESTful APIの基本的なCRUD操作に対応するHTTPメソッドです', 'approved', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 選択肢（Quiz挿入後に配置し、所属クイズをquiz_idで明示する。ADR-0030）
INSERT INTO "Choice" ("quiz_id", "solution_id", "text", "order_index", "is_correct") VALUES
  -- For quiz 14 / solution id 1 (JavaScript variable declaration)
  (14, 1, 'const', 0, 0),
  (14, 1, 'let', 1, 1),  -- correct
  (14, 1, 'var', 2, 0),
  (14, 1, 'function', 3, 0),
  -- For quiz 15 / solution id 2 (HTTP status codes)
  (15, 2, '200', 0, 1),  -- correct
  (15, 2, '404', 1, 0),
  (15, 2, '500', 2, 0),
  (15, 2, '301', 3, 0),
  -- For quiz 16 / solution id 3 (React hooks)
  (16, 3, 'useState', 0, 1),  -- correct
  (16, 3, 'useEffect', 1, 0),
  (16, 3, 'useContext', 2, 0),
  (16, 3, 'useReducer', 3, 0),
  -- For quiz 17 / solution id 4 (SQL joins)
  (17, 4, 'INNER JOIN', 0, 1),  -- correct
  (17, 4, 'LEFT JOIN', 1, 0),
  (17, 4, 'RIGHT JOIN', 2, 0),
  (17, 4, 'FULL OUTER JOIN', 3, 0),
  -- For quiz 18 / solution id 5 (CSS display values)
  (18, 5, 'block', 0, 0),
  (18, 5, 'inline', 1, 0),
  (18, 5, 'flex', 2, 1),  -- correct
  (18, 5, 'grid', 3, 0),
  -- For quiz 19 / solution id 6 (rejected quiz - incorrect programming concept)
  (19, 6, 'HTML', 0, 0),
  (19, 6, 'CSS', 1, 0),
  (19, 6, 'JavaScript', 2, 0),
  (19, 6, 'Python', 3, 1),  -- marked as correct but actually wrong context
  -- For quiz 20 / solution id 1 (JavaScript frameworks)
  (20, 1, 'React', 0, 1),     -- correct
  (20, 1, 'Vue.js', 1, 1),    -- correct
  (20, 1, 'Angular', 2, 1),   -- correct
  (20, 1, 'jQuery', 3, 0),    -- not a framework
  -- For quiz 21 / solution id 2 (HTTP methods)
  (21, 2, 'GET', 0, 1),       -- correct
  (21, 2, 'POST', 1, 1),      -- correct
  (21, 2, 'PUT', 2, 1),       -- correct
  (21, 2, 'DELETE', 3, 1);    -- correct

-- Tag quiz relationships with more variety
INSERT INTO "QuizTag" ("quiz_id", "tag_id", "assigned_at") VALUES 
  -- TypeScript quiz
  (1, 5, CURRENT_TIMESTAMP), (1, 6, CURRENT_TIMESTAMP), (1, 11, CURRENT_TIMESTAMP),
  -- SQL NULL quiz  
  (2, 3, CURRENT_TIMESTAMP), (2, 9, CURRENT_TIMESTAMP), (2, 11, CURRENT_TIMESTAMP),
  -- React quiz
  (3, 7, CURRENT_TIMESTAMP), (3, 14, CURRENT_TIMESTAMP), (3, 11, CURRENT_TIMESTAMP),
  -- CSS flexbox quiz
  (4, 2, CURRENT_TIMESTAMP), (4, 14, CURRENT_TIMESTAMP), (4, 12, CURRENT_TIMESTAMP),
  -- Node.js quiz (pending_approval)
  (5, 8, CURRENT_TIMESTAMP), (5, 15, CURRENT_TIMESTAMP), (5, 11, CURRENT_TIMESTAMP),
  -- Python rejected quiz
  (6, 1, CURRENT_TIMESTAMP), (6, 11, CURRENT_TIMESTAMP),
  -- HTML rejected quiz
  (7, 2, CURRENT_TIMESTAMP), (7, 11, CURRENT_TIMESTAMP),
  -- Hello World quiz
  (8, 1, CURRENT_TIMESTAMP), (8, 11, CURRENT_TIMESTAMP),
  -- console.log quiz
  (9, 5, CURRENT_TIMESTAMP), (9, 11, CURRENT_TIMESTAMP),
  -- SQL query quiz
  (10, 3, CURRENT_TIMESTAMP), (10, 9, CURRENT_TIMESTAMP), (10, 12, CURRENT_TIMESTAMP),
  -- useState quiz
  (11, 7, CURRENT_TIMESTAMP), (11, 14, CURRENT_TIMESTAMP), (11, 12, CURRENT_TIMESTAMP),
  -- async/await quiz (pending_approval)
  (12, 5, CURRENT_TIMESTAMP), (12, 13, CURRENT_TIMESTAMP),
  -- Rejected vague quiz
  (13, 1, CURRENT_TIMESTAMP), (13, 11, CURRENT_TIMESTAMP),
  -- ES6 variables quiz
  (14, 5, CURRENT_TIMESTAMP), (14, 12, CURRENT_TIMESTAMP),
  -- HTTP status quiz
  (15, 2, CURRENT_TIMESTAMP), (15, 12, CURRENT_TIMESTAMP),
  -- React hooks quiz
  (16, 7, CURRENT_TIMESTAMP), (16, 14, CURRENT_TIMESTAMP), (16, 12, CURRENT_TIMESTAMP),
  -- SQL joins quiz
  (17, 3, CURRENT_TIMESTAMP), (17, 9, CURRENT_TIMESTAMP), (17, 12, CURRENT_TIMESTAMP),
  -- CSS layout quiz
  (18, 2, CURRENT_TIMESTAMP), (18, 14, CURRENT_TIMESTAMP), (18, 12, CURRENT_TIMESTAMP),
  -- Rejected programming language quiz
  (19, 1, CURRENT_TIMESTAMP), (19, 2, CURRENT_TIMESTAMP), (19, 11, CURRENT_TIMESTAMP),
  -- JS frameworks quiz
  (20, 5, CURRENT_TIMESTAMP), (20, 7, CURRENT_TIMESTAMP), (20, 2, CURRENT_TIMESTAMP), (20, 13, CURRENT_TIMESTAMP),
  -- HTTP methods quiz
  (21, 2, CURRENT_TIMESTAMP), (21, 15, CURRENT_TIMESTAMP), (21, 13, CURRENT_TIMESTAMP);

-- Create diverse sample decks
INSERT INTO "Deck" ("name", "description", "quiz_ids", "creator_id", "created_at") VALUES 
  ('JavaScript基礎', 'JavaScriptの基本的な概念とES6の機能', '[1,9,14,20]', 1, CURRENT_TIMESTAMP),
  ('React入門', 'Reactの基本的なフックと概念', '[3,11,16]', 2, CURRENT_TIMESTAMP),
  ('データベース基礎', 'SQLの基本的なクエリと概念', '[2,10,17]', 3, CURRENT_TIMESTAMP),
  ('Web開発総合', 'フロントエンドとバックエンドの基礎', '[3,4,15,18,21]', 1, CURRENT_TIMESTAMP),
  ('プログラミング入門', '初心者向けの幅広いプログラミング概念', '[1,2,8,9,14]', 4, CURRENT_TIMESTAMP);

-- Create multiple quiz sessions
INSERT INTO "QuizSession" ("deck_id", "creator_id", "device_fingerprint", "started_at", "completed_at", "is_completed") VALUES 
  (1, 1, 'dev-browser-001', datetime('now', '-2 hours'), datetime('now', '-1 hour'), 1),
  (2, 2, 'dev-browser-002', datetime('now', '-1 hour'), NULL, 0),
  (3, 3, 'dev-browser-003', datetime('now', '-30 minutes'), datetime('now', '-10 minutes'), 1),
  (1, 2, 'dev-browser-002', datetime('now', '-15 minutes'), NULL, 0),
  (4, 1, 'dev-browser-001', CURRENT_TIMESTAMP, NULL, 0);

-- Insert diverse sample answers and attempts
INSERT INTO "BooleanAnswer" ("value") VALUES 
  (1), (0), (1), (0), (1), (0), (1), (1); -- ids: 1-8

INSERT INTO "FreeTextAnswer" ("text") VALUES
  ('Hello World'),           -- id: 1
  ('console.log'),          -- id: 2
  ('SELECT * FROM users'),  -- id: 3
  ('useState'),             -- id: 4
  ('hoge'),                -- id: 5, wrong answer
  ('print'),               -- id: 6, wrong answer
  ('async/await');         -- id: 7

INSERT INTO "SingleChoiceAnswer" ("selected_choice_id") VALUES
  (2),  -- id: 1, correct "let" (choice_id 2, quiz 14)
  (5),  -- id: 2, correct "200" (choice_id 5, quiz 15)
  (9),  -- id: 3, correct "useState" (choice_id 9, quiz 16)
  (11), -- id: 4, wrong choice (choice_id 11 "RIGHT JOIN", quiz 17)
  (13), -- id: 5, correct "INNER JOIN" (choice_id 13, quiz 17)
  (19); -- id: 6, correct "flex" (choice_id 19, quiz 18)

INSERT INTO "MultipleChoiceAnswer" ("selected_choice_ids") VALUES
  ('[25,26,27]'),   -- id: 1, correct frameworks (React, Vue.js, Angular; quiz 20)
  ('[29,30,31,32]'), -- id: 2, correct HTTP methods (GET, POST, PUT, DELETE; quiz 21)
  ('[25,28]'),      -- id: 3, partially correct (React + jQuery; quiz 20)
  ('[29,30,31]');   -- id: 4, missing one method (GET, POST, PUT without DELETE; quiz 21)

-- Insert comprehensive attempts data
--
-- answer_typeはQuiz.answer_typeと一致させ、answer_idは対応するAnswerテーブル
-- (FreeTextAnswer/SingleChoiceAnswer/MultipleChoiceAnswerはいずれも1から
-- 採番)の実在するidを指す(ADR-0030、seed-consistency統合テストで検証)。
INSERT INTO "Attempt" ("quiz_id", "session_id", "user_id", "answer_type", "answer_id", "is_correct", "answered_at") VALUES
  -- Session 1 (completed)
  (1, 1, 1, 'boolean', 1, 1, datetime('now', '-2 hours')),
  (9, 1, 1, 'free_text', 2, 1, datetime('now', '-115 minutes')),
  (14, 1, 1, 'single_choice', 1, 1, datetime('now', '-110 minutes')),
  (20, 1, 1, 'multiple_choice', 1, 1, datetime('now', '-65 minutes')),

  -- Session 2 (in progress)
  (3, 2, 2, 'boolean', 3, 1, datetime('now', '-45 minutes')),
  (11, 2, 2, 'free_text', 4, 1, datetime('now', '-40 minutes')),

  -- Session 3 (completed)
  (2, 3, 3, 'boolean', 2, 1, datetime('now', '-25 minutes')),
  (10, 3, 3, 'free_text', 3, 1, datetime('now', '-20 minutes')),
  (17, 3, 3, 'single_choice', 5, 1, datetime('now', '-15 minutes')),

  -- Session 4 (in progress)
  (1, 4, 2, 'boolean', 4, 0, datetime('now', '-12 minutes')),
  (9, 4, 2, 'free_text', 6, 0, datetime('now', '-10 minutes')),

  -- Session 5 (just started)
  (3, 5, 1, 'boolean', 5, 1, datetime('now', '-2 minutes'));