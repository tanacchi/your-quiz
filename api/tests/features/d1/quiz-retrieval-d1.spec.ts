import { spec } from "pactum";

// Quiz Retrieval BDD Tests（D1ターゲット限定） - クイズ取得BDDテスト
// issue #76 / ADR-0030
// Endpoint: GET /api/quiz/v1/manage/quizzes(/:id)
//
// `vitest.bdd.d1.config.ts` でのみ実行する（`vitest.bdd.config.ts` の
// includeは非再帰globのため`tests/features/d1/`を含まない）。ローカルD1の
// `migrations/dev/seed.sql` が投入済みであることに依存する。
//
// quiz-management には Identity 解決（Phase 4-5）が無いため、このテストの
// リクエスタは常に他人扱いになる。そのため確認できるのは公開ステータス
// （approved/published）のクイズの読み取りに限られる。作成・更新・削除・
// 承認のD1実機検証は `vitest.integration.d1.config.ts` が担う。

const BASE_PATH = "/api/quiz/v1/manage/quizzes";

describe("クイズ取得（D1）: Quiz retrieval against local D1", () => {
  describe("4形式のsolutionがD1の値から正しい型で返る", () => {
    const approvedSeedQuizzes = [
      { id: "1", answerType: "boolean" },
      { id: "8", answerType: "free_text" },
      { id: "14", answerType: "single_choice" },
      { id: "20", answerType: "multiple_choice" },
    ] as const;

    approvedSeedQuizzes.forEach((testCase) => {
      it(`${testCase.answerType}形式のシード済みクイズを取得できる: quiz ${testCase.id}`, async () => {
        // Given: シード済みのapprovedクイズ（migrations/dev/seed.sql）

        // When: GET /manage/quizzes/{id}
        const response = await spec()
          .get(`${BASE_PATH}/${testCase.id}`)
          .expectStatus(200);

        // Then: idやcreatorIdはD1の数値行から文字列に変換されている
        const body = response.json;
        expect(typeof body.id).toBe("string");
        expect(typeof body.creatorId).toBe("string");
        expect(body.answerType).toBe(testCase.answerType);
        expect(body.solution.type).toBe(testCase.answerType);

        if (testCase.answerType === "boolean") {
          expect(typeof body.solution.value).toBe("boolean");
        }
        if (
          testCase.answerType === "single_choice" ||
          testCase.answerType === "multiple_choice"
        ) {
          expect(Array.isArray(body.solution.choices)).toBe(true);
          for (const choice of body.solution.choices) {
            expect(typeof choice.id).toBe("string");
            expect(typeof choice.isCorrect).toBe("boolean");
          }
        }
      });
    });
  });

  describe("solution_idが衝突していても選択肢が混ざらない（S8）", () => {
    it("single_choice(quiz14)とmultiple_choice(quiz20)はsolution_idが1で衝突しているが、選択肢は別々に返る", async () => {
      // Given: seed.sqlはquiz14(single_choice)とquiz20(multiple_choice)の
      // solution_idを意図的に1で衝突させている(ADR-0030)

      // When: 両方をGETする
      const singleChoiceResponse = await spec()
        .get(`${BASE_PATH}/14`)
        .expectStatus(200);
      const multipleChoiceResponse = await spec()
        .get(`${BASE_PATH}/20`)
        .expectStatus(200);

      // Then: 選択肢のテキストが混ざっていない
      const singleChoiceTexts = singleChoiceResponse.json.solution.choices.map(
        (c: { text: string }) => c.text,
      );
      const multipleChoiceTexts =
        multipleChoiceResponse.json.solution.choices.map(
          (c: { text: string }) => c.text,
        );

      expect(singleChoiceTexts).toEqual(["const", "let", "var", "function"]);
      expect(multipleChoiceTexts).toEqual([
        "React",
        "Vue.js",
        "Angular",
        "jQuery",
      ]);
    });
  });

  describe("非公開ステータスのクイズは第三者には見えない", () => {
    it("rejectedなクイズ(quiz19)はランダムな第三者に404を返す", async () => {
      // Given: シード済みのrejectedクイズ。リクエスタはIdentity解決が無い
      // ため常に他人として扱われる(ADR-0030 Phase 4-5未着手)

      // When: GET /manage/quizzes/19
      const response = await spec().get(`${BASE_PATH}/19`).expectStatus(404);

      // Then: 存在自体を漏らさないエラーレスポンス
      expect(response.json).toHaveProperty("code", 404);
    });
  });

  describe("一覧取得: GET /manage/quizzes", () => {
    it("シード済みのD1に対して一覧の形状どおりに返る", async () => {
      // When: GET /manage/quizzes
      const response = await spec().get(BASE_PATH).expectStatus(200);

      // Then: ページネーション形状
      const body = response.json;
      expect(body).toHaveProperty("items");
      expect(body).toHaveProperty("totalCount");
      expect(body).toHaveProperty("hasMore");
      expect(Array.isArray(body.items)).toBe(true);
      expect(body.items.length).toBeGreaterThan(0);
    });
  });
});
