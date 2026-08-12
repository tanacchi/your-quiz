import { spec } from "pactum";

// Quiz Search BDD Tests - クイズ検索BDDテスト
// issue #48: search.routes.ts のDI差し替え（モジュールトップレベル固定 →
// リクエスト毎のSearchRepositoryFactory呼び出し）がルーティングを壊していないこと
// を確認する回帰テスト。
//
// dev-mock env（D1バインディングなし・USE_MOCK_DB=true）で動作するため、
// MockSearchRepository 経路のみを検証する。D1 経路の実データ確認は
// `pnpm dev:d1` での手動確認（PR本文に手順記載）で行う。
//
// フィクスチャ: src/shared/fixtures/data/search-quiz-rows.json（3件、
// 全件 status=approved、タグは全件 "programming" 固定）

describe("Quiz Search - クイズ検索", () => {
  it("フィルタ無しで全件（3件）を返す", async () => {
    const response = await spec()
      .get("/api/search/v1/quizzes")
      .expectStatus(200);

    expect(response.json.totalCount).toBe(3);
    expect(response.json.items).toHaveLength(3);
  });

  it("qパラメータでquestion本文を全文検索できる", async () => {
    const response = await spec()
      .get("/api/search/v1/quizzes")
      .withQueryParams("q", "TypeScript")
      .expectStatus(200);

    expect(response.json.totalCount).toBe(1);
    expect(response.json.items[0].id).toBe("quiz-3");
  });

  it("limit/offsetでページネーションできる", async () => {
    const response = await spec()
      .get("/api/search/v1/quizzes")
      .withQueryParams({ limit: 2, offset: 0 })
      .expectStatus(200);

    expect(response.json.items).toHaveLength(2);
    expect(response.json.totalCount).toBe(3);
    expect(response.json.hasMore).toBe(true);
  });

  it("不正なクエリパラメータ（limit範囲外）はVALIDATION_ERRORになる", async () => {
    await spec()
      .get("/api/search/v1/quizzes")
      .withQueryParams("limit", "0")
      .expectStatus(400)
      .expectJsonLike({ error: "VALIDATION_ERROR" });
  });
});
