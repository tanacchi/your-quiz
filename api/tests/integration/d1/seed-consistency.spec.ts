import { env } from "cloudflare:test";
import { describe, expect, it } from "vitest";

/**
 * 開発用シード（`migrations/dev/seed.sql`）の参照整合性を実D1に対して検証する
 *
 * seed.sqlはsolution系テーブル（Boolean/FreeText/SingleChoice/MultipleChoice
 * Solution）がそれぞれ独立にAUTOINCREMENTされる前提を書き手が誤解しやすく、
 * 過去に「テーブル横断の通し番号」で書かれていたために大半のクイズが存在しない
 * solution行を指し、Choiceもquiz_idが全件NULLのまま残る不具合があった
 * （0003適用後にバックフィルされるのはseed適用より前のマイグレーション時点の
 * 既存データのみで、seed自身の行は対象にならない）。
 *
 * ここでは同じ検証クエリをテストとして固定化し、seed.sqlが将来再び壊れたら
 * このテストが検知する。
 */
describe("開発シードの参照整合性", () => {
  it("Quiz.solution_idはanswer_typeに対応するsolutionテーブルに実在する", async () => {
    const result = await env.DB.prepare(
      `SELECT COUNT(*) AS count FROM Quiz q WHERE
         (q.answer_type = 'boolean' AND NOT EXISTS (SELECT 1 FROM BooleanSolution s WHERE s.id = q.solution_id)) OR
         (q.answer_type = 'free_text' AND NOT EXISTS (SELECT 1 FROM FreeTextSolution s WHERE s.id = q.solution_id)) OR
         (q.answer_type = 'single_choice' AND NOT EXISTS (SELECT 1 FROM SingleChoiceSolution s WHERE s.id = q.solution_id)) OR
         (q.answer_type = 'multiple_choice' AND NOT EXISTS (SELECT 1 FROM MultipleChoiceSolution s WHERE s.id = q.solution_id))`,
    ).first<{ count: number }>();

    expect(result?.count).toBe(0);
  });

  it("Choice.quiz_idは非NULLで、選択肢型のQuizを指す", async () => {
    const result = await env.DB.prepare(
      `SELECT COUNT(*) AS count FROM Choice c WHERE c.quiz_id IS NULL OR NOT EXISTS (
         SELECT 1 FROM Quiz q WHERE q.id = c.quiz_id AND q.answer_type IN ('single_choice', 'multiple_choice')
       )`,
    ).first<{ count: number }>();

    expect(result?.count).toBe(0);
  });

  it("Choice.solution_idは所属クイズのQuiz.solution_idと一致する", async () => {
    const result = await env.DB.prepare(
      `SELECT COUNT(*) AS count FROM Choice c JOIN Quiz q ON q.id = c.quiz_id
       WHERE c.solution_id != q.solution_id`,
    ).first<{ count: number }>();

    expect(result?.count).toBe(0);
  });

  it("Attempt.answer_typeはQuiz.answer_typeと一致し、answer_idは対応テーブルに実在する", async () => {
    const result = await env.DB.prepare(
      `SELECT COUNT(*) AS count FROM Attempt a JOIN Quiz q ON q.id = a.quiz_id
       WHERE a.answer_type != q.answer_type
         OR (a.answer_type = 'boolean' AND NOT EXISTS (SELECT 1 FROM BooleanAnswer x WHERE x.id = a.answer_id))
         OR (a.answer_type = 'free_text' AND NOT EXISTS (SELECT 1 FROM FreeTextAnswer x WHERE x.id = a.answer_id))
         OR (a.answer_type = 'single_choice' AND NOT EXISTS (SELECT 1 FROM SingleChoiceAnswer x WHERE x.id = a.answer_id))
         OR (a.answer_type = 'multiple_choice' AND NOT EXISTS (SELECT 1 FROM MultipleChoiceAnswer x WHERE x.id = a.answer_id))`,
    ).first<{ count: number }>();

    expect(result?.count).toBe(0);
  });

  it("SingleChoiceAnswer.selected_choice_idは、回答したクイズ自身のChoiceを指す", async () => {
    const result = await env.DB.prepare(
      `SELECT COUNT(*) AS count FROM Attempt a
       JOIN SingleChoiceAnswer sca ON sca.id = a.answer_id AND a.answer_type = 'single_choice'
       WHERE NOT EXISTS (SELECT 1 FROM Choice c WHERE c.id = sca.selected_choice_id AND c.quiz_id = a.quiz_id)`,
    ).first<{ count: number }>();

    expect(result?.count).toBe(0);
  });

  it("MultipleChoiceAnswer.selected_choice_idsの各要素は、回答したクイズ自身のChoiceを指す", async () => {
    const result = await env.DB.prepare(
      `SELECT COUNT(*) AS count FROM Attempt a
       JOIN MultipleChoiceAnswer mca ON mca.id = a.answer_id AND a.answer_type = 'multiple_choice',
       json_each(mca.selected_choice_ids) je
       WHERE NOT EXISTS (SELECT 1 FROM Choice c WHERE c.id = je.value AND c.quiz_id = a.quiz_id)`,
    ).first<{ count: number }>();

    expect(result?.count).toBe(0);
  });

  it("Deck.quiz_idsの各要素はQuizに実在する", async () => {
    const result = await env.DB.prepare(
      `SELECT COUNT(*) AS count FROM Deck d, json_each(d.quiz_ids) je
       WHERE NOT EXISTS (SELECT 1 FROM Quiz q WHERE q.id = je.value)`,
    ).first<{ count: number }>();

    expect(result?.count).toBe(0);
  });

  it("single_choiceとmultiple_choiceでsolution_idが衝突するペアが存在する（回帰テスト用の前提条件）", async () => {
    // Choice.quiz_id基準の取得・削除が選択肢を混同しないことを確認するBDD/
    // 統合テストは、この衝突が実際に起きていることを前提にしている。
    const { results } = await env.DB.prepare(
      `SELECT q1.id AS singleChoiceQuizId, q2.id AS multipleChoiceQuizId FROM Quiz q1
       JOIN Quiz q2 ON q1.answer_type = 'single_choice' AND q2.answer_type = 'multiple_choice'
         AND q1.solution_id = q2.solution_id`,
    ).all<{ singleChoiceQuizId: number; multipleChoiceQuizId: number }>();

    expect(results.length).toBeGreaterThan(0);
  });
});
