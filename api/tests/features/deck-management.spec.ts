import { spec } from "pactum";
import { deckManagementData } from "../fixtures/deck-management-data";

// Deck Management BDD Tests - Deck管理BDDテスト
// issue #47（quiz-learning Deck管理）/ ADR-0027
// Endpoint: /api/quiz/v1/learning/decks/*
//
// dev-mock env（USE_MOCK_DB=true）で動作するため、MockDeckRepository /
// MockUserIdentityResolver / MockSearchRepository / MockAttemptQueryRepository
// を経由する。所有者はanonymousSessionミドルウェアが発行するCookie
// （userFingerprint）で識別される。

const BASE_PATH = "/api/quiz/v1/learning/decks";
const COOKIE_NAME = "quiz_fingerprint";

describe("Deck管理: Deck management", () => {
  describe("Deck新規作成: POST /decks", () => {
    deckManagementData.createDeckScenarios.forEach((testCase) => {
      it(`Deckを作成できる: ${testCase.description}`, async () => {
        // Given: 有効なDeck作成リクエスト

        // When: POST /decksでDeckを作成
        const response = await spec()
          .post(BASE_PATH)
          .withJson(testCase.requestBody)
          .expectStatus(200);

        // Then: 作成されたDeckが返る
        const body = response.json;
        expect(body).toHaveProperty("deck");
        expect(body.deck).toHaveProperty("id");
        expect(body.deck.quizIds).toEqual(testCase.requestBody.quizIds);
      });
    });

    it("quizIdsが空の場合は400を返す", async () => {
      // Given: quizIdsが空のリクエスト

      // When: POST /decksを実行
      const response = await spec()
        .post(BASE_PATH)
        .withJson({ quizIds: [], source: "manual_selection" })
        .expectStatus(400);

      // Then: バリデーションエラーが返る
      expect(response.json).toHaveProperty("code");
    });
  });

  describe("Deck取得〜削除ワークフロー: GET/PATCH/DELETE /decks/:id", () => {
    it("作成したDeckを取得・更新・削除できる", async () => {
      // Given: 新規Deckを作成（Cookie無しの匿名アクセスは毎回別UUIDが
      // 発行されるため、後続のPATCH/DELETEで所有者不一致にならないよう
      // 固定fingerprintを明示する）
      const fingerprint = "dddddddd-dddd-4ddd-8ddd-dddddddddddd";
      const createResponse = await spec()
        .post(BASE_PATH)
        .withCookies(COOKIE_NAME, fingerprint)
        .withJson({
          name: "ワークフローDeck",
          quizIds: ["quiz-1", "quiz-2"],
          source: "manual_selection",
        })
        .expectStatus(200);
      const deckId = createResponse.json.deck.id;

      // When: GET /decks/:idで取得
      const getResponse = await spec()
        .get(`${BASE_PATH}/${deckId}`)
        .expectStatus(200);

      // Then: 作成したDeckと問題本体（quizzes）が返る
      expect(getResponse.json.name).toBe("ワークフローDeck");
      expect(getResponse.json).toHaveProperty("quizzes");
      expect(getResponse.json).toHaveProperty("totalQuizzes");

      // When: PATCH /decks/:idで更新
      const patchResponse = await spec()
        .patch(`${BASE_PATH}/${deckId}`)
        .withCookies(COOKIE_NAME, fingerprint)
        .withJson({ name: "更新後のDeck名" })
        .expectStatus(200);

      // Then: 更新後の名前が返る
      expect(patchResponse.json.name).toBe("更新後のDeck名");

      // When: DELETE /decks/:idで削除
      await spec()
        .delete(`${BASE_PATH}/${deckId}`)
        .withCookies(COOKIE_NAME, fingerprint)
        .expectStatus(204);

      // Then: 削除後のGETは404
      await spec().get(`${BASE_PATH}/${deckId}`).expectStatus(404);
    });

    it("存在しないDeckのGETは404を返す", async () => {
      // Given: 存在しないDeck ID

      // When: GET /decks/:idを実行
      const response = await spec()
        .get(`${BASE_PATH}/nonexistent-deck-id`)
        .expectStatus(404);

      // Then: NotFoundErrorが返る
      expect(response.json).toHaveProperty("code");
    });
  });

  describe("所有者制御: Ownership enforcement", () => {
    it("作成者以外はDeckを更新・削除できない", async () => {
      // Given: userAが作成したDeck
      const ownerFingerprint = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
      const createResponse = await spec()
        .post(BASE_PATH)
        .withCookies(COOKIE_NAME, ownerFingerprint)
        .withJson({ quizIds: ["quiz-1"], source: "manual_selection" })
        .expectStatus(200);
      const deckId = createResponse.json.deck.id;

      // When: 別のユーザー（userB）がPATCHを試みる
      const otherFingerprint = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";
      const patchResponse = await spec()
        .patch(`${BASE_PATH}/${deckId}`)
        .withCookies(COOKIE_NAME, otherFingerprint)
        .withJson({ name: "乗っ取り" })
        .expectStatus(403);

      // Then: ForbiddenErrorが返る
      expect(patchResponse.json).toHaveProperty("code");

      // When: 別のユーザー（userB）がDELETEを試みる
      const deleteResponse = await spec()
        .delete(`${BASE_PATH}/${deckId}`)
        .withCookies(COOKIE_NAME, otherFingerprint)
        .expectStatus(403);

      // Then: ForbiddenErrorが返る
      expect(deleteResponse.json).toHaveProperty("code");
    });
  });

  describe("自分のDeck一覧: GET /decks/mine", () => {
    it("作成したDeckが一覧に含まれる", async () => {
      // Given: 特定ユーザーがDeckを作成
      const fingerprint = "cccccccc-cccc-4ccc-8ccc-cccccccccccc";
      const createResponse = await spec()
        .post(BASE_PATH)
        .withCookies(COOKIE_NAME, fingerprint)
        .withJson({
          name: "一覧確認用Deck",
          quizIds: ["quiz-1"],
          source: "manual_selection",
        })
        .expectStatus(200);
      const deckId = createResponse.json.deck.id;

      // When: GET /decks/mineで一覧取得
      const response = await spec()
        .get(`${BASE_PATH}/mine`)
        .withCookies(COOKIE_NAME, fingerprint)
        .expectStatus(200);

      // Then: 一覧に作成したDeckのIDが含まれる（PaginationResponse<Deck>形式）
      const body = response.json;
      expect(body).toHaveProperty("items");
      expect(body).toHaveProperty("totalCount");
      expect(body).toHaveProperty("hasMore");
      const foundDeck = body.items.find(
        (item: Record<string, unknown>) => item["id"] === deckId,
      );
      expect(foundDeck).toBeDefined();
    });
  });

  describe("検索結果からDeck生成: POST /decks/from-search", () => {
    it("検索にヒットした問題からDeckを生成できる", async () => {
      // Given: MockSearchRepositoryにヒットするキーワード

      // When: POST /decks/from-searchを実行
      const response = await spec()
        .post(`${BASE_PATH}/from-search`)
        .withJson({ searchQuery: "JavaScript", maxQuizzes: 10 })
        .expectStatus(200);

      // Then: 検索結果を含むDeckが生成される
      expect(response.json.deck.quizIds.length).toBeGreaterThan(0);
    });

    it("検索結果が0件の場合はエラーを返す", async () => {
      // Given: ヒットしないキーワード

      // When: POST /decks/from-searchを実行
      const response = await spec()
        .post(`${BASE_PATH}/from-search`)
        .withJson({
          searchQuery: "絶対にヒットしないはずのキーワードxyz123",
        })
        .expectStatus(500);

      // Then: エラーレスポンスが返る
      expect(response.json).toHaveProperty("code");
    });
  });

  describe("間違い問題からDeck生成: POST /decks/wrong-questions", () => {
    it("間違い問題が0件の場合はエラーを返す（Attempt未実装のため常に空）", async () => {
      // Given: MockAttemptQueryRepositoryはデフォルトで空

      // When: POST /decks/wrong-questionsを実行
      const response = await spec()
        .post(`${BASE_PATH}/wrong-questions`)
        .withJson({})
        .expectStatus(500);

      // Then: エラーレスポンスが返る
      expect(response.json).toHaveProperty("code");
    });
  });
});
