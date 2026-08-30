import { describe, expect, test, vi } from "vitest";
import { SearchQuizzesQuery } from "../../domain/entities/SearchQuizzesQuery";
import { D1SearchRepository } from "./D1SearchRepository";

/**
 * SQL文中の `?` プレースホルダ数とbind()されたパラメータ数が一致するか検証する
 *
 * 実際のD1はプレースホルダ数とパラメータ数が不一致の場合、クエリ実行時
 * （first()/all()）に `D1_ERROR: too few/many parameter values were provided`
 * を投げる。SearchQueryBuilderの条件追加時に `conditions.push()` と
 * `params.push()` の対応が崩れる回帰を、手書きの期待値と独立した形で
 * 検知するためのガード（手書きのtoEqual期待値自体に同じ誤りが混入すると
 * 検知できない、という通常のユニットテストの限界を補う）。
 */
function assertPlaceholderCountMatches(sql: string, params: unknown[]): void {
  const placeholderCount = (sql.match(/\?/g) ?? []).length;
  if (placeholderCount !== params.length) {
    throw new Error(
      `D1_ERROR: placeholder count (${placeholderCount}) does not match bound parameter count (${params.length}) for SQL: ${sql}`,
    );
  }
}

/**
 * D1Database のテスト用フェイク
 *
 * `QuizRepositoryFactory.test.ts` の `DB: {} as D1Database` と同様に、
 * D1Database はCloudflare Workersのアンビエント型でありテストダブルの
 * 構造的実装が困難なため、テストヘルパー内でのみ `as D1Database` を使う。
 *
 * countQuery（.first()）とdataQuery（.all()）を発行順に振り分けるのではなく、
 * SQLテキストに "COUNT(*)" を含むかどうかで判定する
 * （D1SearchRepositoryはPromise.allで両クエリを並行実行するため、
 * 発行順序に依存したテストダブルは書けない）。
 */
function createFakeD1Database(options: {
  countResult?: unknown;
  dataResults?: unknown[];
  countError?: Error;
  dataError?: Error;
  onPrepare?: (sql: string, params: unknown[]) => void;
}): D1Database {
  const fakeDb = {
    prepare(sql: string) {
      let boundParams: unknown[] = [];
      const statement = {
        bind(...params: unknown[]) {
          boundParams = params;
          return statement;
        },
        async first() {
          assertPlaceholderCountMatches(sql, boundParams);
          options.onPrepare?.(sql, boundParams);
          if (options.countError) {
            throw options.countError;
          }
          return options.countResult ?? null;
        },
        async all() {
          assertPlaceholderCountMatches(sql, boundParams);
          options.onPrepare?.(sql, boundParams);
          if (options.dataError) {
            throw options.dataError;
          }
          return {
            results: options.dataResults ?? [],
            success: true,
            meta: {},
          };
        },
      };
      return statement;
    },
  };

  return fakeDb as D1Database;
}

/**
 * 実際のD1が返す行の形（id/solution_id/creator_idは数値）を模したフィクスチャ
 *
 * ここを文字列（"1"）にしてしまうと、zodのtransform(String)を経由せずとも
 * 期待値と偶然一致してしまい、「型ガードで narrowing しても実行時の値は
 * 変換されない」というクラスのバグ（例: id が number のままレスポンスに
 * 漏れる）をテストが検知できなくなる。
 */
const createValidRow = (overrides: Record<string, unknown> = {}) => ({
  id: 1,
  question: "TypeScriptはJavaScriptのスーパーセットである",
  answer_type: "boolean",
  solution_id: 1,
  explanation: null,
  status: "approved",
  creator_id: 1,
  created_at: "2024-01-15T00:00:00Z",
  approved_at: null,
  tag_names: null,
  ...overrides,
});

describe("D1SearchRepository", () => {
  describe("constructor", () => {
    test("dbが未定義の場合はエラーをthrowする", () => {
      // D1QuizRepositoryと同じ方針: コンストラクタでの必須依存チェックは
      // まだResultコンテキストに入る前なのでthrowで表現する
      expect(
        () => new D1SearchRepository(undefined as unknown as D1Database),
      ).toThrow();
    });
  });

  describe("searchQuizzes", () => {
    test("正常系: countとdataの両方が成功した場合、QuizSummaryListResponse形状で返す", async () => {
      // Arrange
      const db = createFakeD1Database({
        countResult: { total: 1 },
        dataResults: [
          createValidRow({ tag_names: "プログラミング\x1fWeb開発" }),
        ],
      });
      const repository = new D1SearchRepository(db);
      const query = new SearchQuizzesQuery("TypeScript");

      // Act
      const result = await repository.searchQuizzes(query);

      // Assert
      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value.totalCount).toBe(1);
        expect(result.value.hasMore).toBe(false);
        expect(result.value.items).toHaveLength(1);
        expect(result.value.items[0]).toEqual({
          id: "1",
          question: "TypeScriptはJavaScriptのスーパーセットである",
          answerType: "boolean",
          solutionId: "1",
          status: "approved",
          creatorId: "1",
          createdAt: "2024-01-15T00:00:00Z",
          tagIds: ["プログラミング", "Web開発"],
        });
      }
    });

    test("D1が数値IDを返しても、id/solutionId/creatorIdは文字列として返る（TypeSpecのQuizId等はstring型のため）", async () => {
      // Arrange
      // 型ガード(isSearchRow等)でnarrowingしても、zodのtransformが適用された
      // 値でなければ実行時にはD1の生の数値がそのまま漏れ出るバグの回帰テスト
      const db = createFakeD1Database({
        countResult: { total: 1 },
        dataResults: [
          createValidRow({ id: 42, solution_id: 7, creator_id: 3 }),
        ],
      });
      const repository = new D1SearchRepository(db);
      const query = new SearchQuizzesQuery();

      // Act
      const result = await repository.searchQuizzes(query);

      // Assert
      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        const item = result.value.items[0];
        expect(item?.id).toBe("42");
        expect(item?.solutionId).toBe("7");
        expect(item?.creatorId).toBe("3");
        expect(typeof item?.id).toBe("string");
        expect(typeof item?.solutionId).toBe("string");
        expect(typeof item?.creatorId).toBe("string");
      }
    });

    test("D1が件数を文字列で返しても、totalCountは数値として返る", async () => {
      // Arrange（COUNT(*)の結果はDBドライバによっては文字列で返ることがある）
      const db = createFakeD1Database({
        countResult: { total: "5" },
        dataResults: [],
      });
      const repository = new D1SearchRepository(db);
      const query = new SearchQuizzesQuery();

      // Act
      const result = await repository.searchQuizzes(query);

      // Assert
      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value.totalCount).toBe(5);
        expect(typeof result.value.totalCount).toBe("number");
      }
    });

    test("hasMoreはoffset+limit<totalCountで判定される", async () => {
      // Arrange
      const db = createFakeD1Database({
        countResult: { total: 25 },
        dataResults: Array.from({ length: 20 }, (_, i) =>
          createValidRow({ id: i + 1 }),
        ),
      });
      const repository = new D1SearchRepository(db);
      const query = new SearchQuizzesQuery(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        "relevance",
        "asc",
        20,
        0,
      );

      // Act
      const result = await repository.searchQuizzes(query);

      // Assert
      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value.hasMore).toBe(true);
      }
    });

    test("結果0件の場合は空配列とtotalCount=0を返す（正常系）", async () => {
      // Arrange
      const db = createFakeD1Database({
        countResult: { total: 0 },
        dataResults: [],
      });
      const repository = new D1SearchRepository(db);
      const query = new SearchQuizzesQuery("存在しないキーワード");

      // Act
      const result = await repository.searchQuizzes(query);

      // Assert
      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value.items).toEqual([]);
        expect(result.value.totalCount).toBe(0);
        expect(result.value.hasMore).toBe(false);
      }
    });

    test("不正な形式の行はスキップされ、有効な行のみ返す（quiz-managementのD1QuizSummaryMapperと同じ方針）", async () => {
      // Arrange
      const db = createFakeD1Database({
        countResult: { total: 2 },
        dataResults: [
          createValidRow(),
          { id: "2" /* question等の必須フィールド欠落 */ },
        ],
      });
      const repository = new D1SearchRepository(db);
      const query = new SearchQuizzesQuery();

      // Act
      const result = await repository.searchQuizzes(query);

      // Assert
      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value.items).toHaveLength(1);
        expect(result.value.items[0]?.id).toBe("1");
        // 既知の制約: totalCountは別クエリ由来のため、行が破棄されると
        // items.length との乖離が起きうる（D1QuizRepositoryと同じ制約）
        expect(result.value.totalCount).toBe(2);
      }
    });

    test("不正な形式の行が破棄された場合、診断用にconsole.errorへ出力される", async () => {
      // Arrange
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => undefined);
      const db = createFakeD1Database({
        countResult: { total: 2 },
        dataResults: [
          createValidRow(),
          { id: "2" /* question等の必須フィールド欠落 */ },
        ],
      });
      const repository = new D1SearchRepository(db);
      const query = new SearchQuizzesQuery();

      // Act
      await repository.searchQuizzes(query);

      // Assert
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Dropped invalid search rows:",
        expect.arrayContaining([expect.objectContaining({ id: "2" })]),
      );

      consoleErrorSpy.mockRestore();
    });

    test("countクエリがD1例外を投げた場合、SEARCH_EXECUTION_FAILEDを返す", async () => {
      // Arrange
      const db = createFakeD1Database({
        countError: new Error("D1_ERROR: connection lost"),
        dataResults: [createValidRow()],
      });
      const repository = new D1SearchRepository(db);
      const query = new SearchQuizzesQuery();

      // Act
      const result = await repository.searchQuizzes(query);

      // Assert
      expect(result.isErr()).toBe(true);
      if (result.isErr()) {
        expect(result.error.type).toBe("SEARCH_EXECUTION_FAILED");
      }
    });

    test("dataクエリがD1例外を投げた場合、SEARCH_EXECUTION_FAILEDを返す", async () => {
      // Arrange
      const db = createFakeD1Database({
        countResult: { total: 1 },
        dataError: new Error("D1_ERROR: query timeout"),
      });
      const repository = new D1SearchRepository(db);
      const query = new SearchQuizzesQuery();

      // Act
      const result = await repository.searchQuizzes(query);

      // Assert
      expect(result.isErr()).toBe(true);
      if (result.isErr()) {
        expect(result.error.type).toBe("SEARCH_EXECUTION_FAILED");
      }
    });

    test("countとdataクエリが異なる原因で同時に失敗した場合、両方のメッセージが結果に残る", async () => {
      // Arrange
      // neverthrowのResultAsync.combineは最初に見つかったエラーしか
      // 返さず他方を握りつぶすため、combineWithAllErrorsで両方保持する
      // ことを検証する（同時障害時に片方の原因が完全に消える回帰を防ぐ）
      const db = createFakeD1Database({
        countError: new Error("D1_ERROR: count query - statement too complex"),
        dataError: new Error("D1_ERROR: data query - resource limit exceeded"),
      });
      const repository = new D1SearchRepository(db);
      const query = new SearchQuizzesQuery();

      // Act
      const result = await repository.searchQuizzes(query);

      // Assert
      expect(result.isErr()).toBe(true);
      if (result.isErr()) {
        expect(result.error.type).toBe("SEARCH_EXECUTION_FAILED");
        expect(result.error.message).toContain("検索件数の取得に失敗しました");
        expect(result.error.message).toContain("検索結果の取得に失敗しました");
      }
    });

    test("count結果が不正な形式の場合、SEARCH_EXECUTION_FAILEDを返す", async () => {
      // Arrange
      const db = createFakeD1Database({
        countResult: { unexpected: "shape" },
        dataResults: [],
      });
      const repository = new D1SearchRepository(db);
      const query = new SearchQuizzesQuery();

      // Act
      const result = await repository.searchQuizzes(query);

      // Assert
      expect(result.isErr()).toBe(true);
      if (result.isErr()) {
        expect(result.error.type).toBe("SEARCH_EXECUTION_FAILED");
      }
    });

    test("countとdataクエリは同じWHERE条件のパラメータを使って発行される", async () => {
      // Arrange
      const preparedCalls: Array<{ sql: string; params: unknown[] }> = [];
      const db = createFakeD1Database({
        countResult: { total: 0 },
        dataResults: [],
        onPrepare: (sql, params) => {
          preparedCalls.push({ sql, params });
        },
      });
      const repository = new D1SearchRepository(db);
      const query = new SearchQuizzesQuery("React", ["フロントエンド"]);

      // Act
      await repository.searchQuizzes(query);

      // Assert
      const countCall = preparedCalls.find((c) => c.sql.includes("COUNT(*)"));
      const dataCall = preparedCalls.find((c) => !c.sql.includes("COUNT(*)"));
      expect(countCall?.params).toEqual([
        "%React%",
        "%React%",
        "%React%",
        "フロントエンド",
      ]);
      // dataCallはlimit/offsetが末尾に付与される分だけ長い
      expect(dataCall?.params).toEqual([
        "%React%",
        "%React%",
        "%React%",
        "フロントエンド",
        20,
        0,
      ]);
    });
  });

  describe("isHealthy", () => {
    test("SELECT 1 が成功する場合はtrueを返す", async () => {
      const db = createFakeD1Database({ countResult: { "1": 1 } });
      const repository = new D1SearchRepository(db);
      await expect(repository.isHealthy()).resolves.toBe(true);
    });

    test("D1例外が発生した場合はfalseを返す（例外をthrowしない）", async () => {
      const db = createFakeD1Database({
        countError: new Error("D1_ERROR: unavailable"),
      });
      const repository = new D1SearchRepository(db);
      await expect(repository.isHealthy()).resolves.toBe(false);
    });

    test("D1例外が発生した場合、診断のためconsole.errorに元エラーが出力される", async () => {
      // Arrange
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => undefined);
      const dbError = new Error("D1_ERROR: authentication failed");
      const db = createFakeD1Database({ countError: dbError });
      const repository = new D1SearchRepository(db);

      // Act
      await repository.isHealthy();

      // Assert
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "D1SearchRepository health check failed:",
        dbError,
      );

      consoleErrorSpy.mockRestore();
    });
  });
});
