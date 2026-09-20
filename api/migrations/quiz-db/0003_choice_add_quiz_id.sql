-- Choice に所属クイズの quiz_id を追加する(ADR-0030)
--
-- SingleChoiceSolution と MultipleChoiceSolution はそれぞれ 1 から採番される
-- ため、Choice.solution_id だけではどちらの解答の選択肢か区別できず、
-- クイズの取得・削除で別のクイズの選択肢が混ざっていた。選択肢が属する
-- クイズを quiz_id で明示する。
--
-- 外部キー付きの列を ALTER TABLE ... ADD COLUMN で足す場合、SQLite は既定値が
-- NULL であることを要求するため NOT NULL にできない。NOT NULL は作成処理
-- (D1QuizRepository の create)で保証し、スキーマでの強制はテーブル再作成と
-- 合わせて別途行う。

-- 1. 列を追加する(Quiz への外部キー)
ALTER TABLE "Choice" ADD COLUMN "quiz_id" INTEGER REFERENCES "Quiz" ("id");

-- 2. 既存の選択肢を補完する。solution_id から選択肢型のクイズが一意に決まる
--    行だけを対象にする。単一選択と複数選択で solution_id が衝突していて
--    クイズを決められない行は、誤ったクイズに結びつけないよう NULL のまま残す。
UPDATE "Choice" SET "quiz_id" = (
  SELECT q."id" FROM "Quiz" q
  WHERE q."solution_id" = "Choice"."solution_id"
    AND q."answer_type" IN ('single_choice', 'multiple_choice')
)
WHERE (
  SELECT COUNT(*) FROM "Quiz" q
  WHERE q."solution_id" = "Choice"."solution_id"
    AND q."answer_type" IN ('single_choice', 'multiple_choice')
) = 1;

-- 3. quiz_id による取得・削除のためのインデックス
CREATE INDEX "idx_choice_quiz_id" ON "Choice" ("quiz_id");
