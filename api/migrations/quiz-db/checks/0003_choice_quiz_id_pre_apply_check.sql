-- 0003_choice_add_quiz_id.sql を本番D1に適用する前の事前確認クエリ(ADR-0030 N1)
--
-- 読み取り専用。データは一切変更しない。
--
-- 使い方:
--   wrangler d1 execute quiz-db --remote --file migrations/quiz-db/checks/0003_choice_quiz_id_pre_apply_check.sql
--
-- 「衝突/孤立の内訳」「0003適用後にquiz_idがNULLのまま残る件数」が0件で
-- なければ、0003適用前に対応方針(手動でのquiz_id確定、影響クイズの
-- 一時非公開化など)を決めること。

-- 1. 衝突/孤立の内訳
--
-- 0003のUPDATE文は「solution_idから選択肢型(single_choice/multiple_choice)
-- のクイズが一意に決まる行」だけを対象にする。一意に決まらない原因を
-- 「孤立(0件、対応するクイズが無い)」と「衝突(2件以上、複数クイズに一致する)」
-- に分けて数える。
SELECT
  matched_quiz_count,
  CASE
    WHEN matched_quiz_count = 0 THEN '孤立(対応するクイズが無い)'
    WHEN matched_quiz_count = 1 THEN '正常(一意に決まる)'
    ELSE '衝突(複数クイズに一致する)'
  END AS classification,
  COUNT(*) AS choice_count
FROM (
  SELECT
    c.id AS choice_id,
    (
      SELECT COUNT(*) FROM "Quiz" q
      WHERE q."solution_id" = c."solution_id"
        AND q."answer_type" IN ('single_choice', 'multiple_choice')
    ) AS matched_quiz_count
  FROM "Choice" c
) AS choice_match_counts
GROUP BY matched_quiz_count
ORDER BY matched_quiz_count;

-- 2. 0003適用後もquiz_idがNULLのまま残る件数（1の「孤立」+「衝突」の合計と一致するはず）
SELECT COUNT(*) AS choices_that_will_remain_null FROM "Choice" c
WHERE (
  SELECT COUNT(*) FROM "Quiz" q
  WHERE q."solution_id" = c."solution_id"
    AND q."answer_type" IN ('single_choice', 'multiple_choice')
) != 1;

-- 3a. solution_idが衝突しているクイズの一覧（対応方針を決める際の参考情報）
--
-- 自分以外に同じsolution_idを持つ選択肢型クイズが存在するもの。
-- これらのクイズの選択肢は0003適用後もquiz_idがNULLのまま残る。
SELECT q."id" AS quiz_id, q."question", q."answer_type", q."status", q."solution_id"
FROM "Quiz" q
WHERE q."answer_type" IN ('single_choice', 'multiple_choice')
  AND EXISTS (
    SELECT 1 FROM "Quiz" q2
    WHERE q2."id" != q."id"
      AND q2."solution_id" = q."solution_id"
      AND q2."answer_type" IN ('single_choice', 'multiple_choice')
  )
ORDER BY q."solution_id", q."id";

-- 3b. 孤立している選択肢の一覧（対応方針を決める際の参考情報）
--
-- solution_idがどの選択肢型クイズにも一致しない選択肢。所有クイズ自体が
-- 特定できない(過去のデータ不整合等)ため、Quizではなく選択肢単位で出す。
SELECT c."id" AS choice_id, c."solution_id", c."text"
FROM "Choice" c
WHERE NOT EXISTS (
  SELECT 1 FROM "Quiz" q
  WHERE q."solution_id" = c."solution_id"
    AND q."answer_type" IN ('single_choice', 'multiple_choice')
)
ORDER BY c."solution_id", c."id";

-- 4. sqlite_sequence（AUTOINCREMENTの採番状況の参考情報）
SELECT * FROM sqlite_sequence
WHERE name IN ('Choice', 'Quiz', 'SingleChoiceSolution', 'MultipleChoiceSolution');
