import { describe, expect, test } from "vitest";
import { SearchQuizzesQuery } from "../../domain/entities/SearchQuizzesQuery";
import { D1SearchRepository } from "./D1SearchRepository";

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
          options.onPrepare?.(sql, boundParams);
          if (options.countError) {
            throw options.countError;
          }
          return options.countResult ?? null;
        },
        async all() {
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

const createValidRow = (overrides: Record<string, unknown> = {}) => ({
  id: "1",
  question: "TypeScriptはJavaScriptのスーパーセットである",
  answer_type: "boolean",
  solution_id: "1",
  explanation: null,
  status: "approved",
  creator_id: "1",
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

    test("hasMoreはoffset+limit<totalCountで判定される", async () => {
      // Arrange
      const db = createFakeD1Database({
        countResult: { total: 25 },
        dataResults: Array.from({ length: 20 }, (_, i) =>
          createValidRow({ id: String(i + 1) }),
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
          createValidRow({ id: "1" }),
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
      }
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
  });
});
