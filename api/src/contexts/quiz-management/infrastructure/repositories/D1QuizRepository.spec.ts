import { describe, expect, test } from "vitest";
import { D1QuizRepository } from "./D1QuizRepository";

/**
 * D1QuizRepository の削除・不在系のテスト
 *
 * これまで D1 実装には単体テストが1件も無く、BDD も dev-mock 環境
 * （USE_MOCK_DB=true）で MockQuizRepository しか通らないため、本番経路の
 * 挙動が一切検証されていなかった。ここでは実害の大きい2点を押さえる。
 *
 * 1. DELETE が原子的で、子行（QuizTag）も掃除されること
 * 2. 対象不在が例外ではなく Err として返ること
 */

/**
 * D1Database のテスト用フェイク
 *
 * D1Database は Cloudflare Workers のアンビエント型でテストダブルの構造的
 * 実装が困難なため、`D1SearchRepository.spec.ts` と同じ方針でテストヘルパー
 * 内に閉じて `as D1Database` を使う。
 */
function createFakeD1Database(options: {
  firstResult?: unknown;
  batchError?: Error;
  onBatch?: (statements: { sql: string; params: unknown[] }[]) => void;
  onPrepare?: (sql: string, params: unknown[]) => void;
}): D1Database {
  const fakeDb = {
    prepare(sql: string) {
      let boundParams: unknown[] = [];
      const statement = {
        // batch() に渡された statement からSQLとパラメータを取り出すための目印
        __sql: sql,
        get __params() {
          return boundParams;
        },
        bind(...params: unknown[]) {
          boundParams = params;
          return statement;
        },
        async first() {
          options.onPrepare?.(sql, boundParams);
          return options.firstResult ?? null;
        },
        async run() {
          options.onPrepare?.(sql, boundParams);
          return { success: true, meta: { changes: 1 } };
        },
        async all() {
          options.onPrepare?.(sql, boundParams);
          return { results: [], success: true };
        },
      };
      return statement;
    },
    async batch(statements: { __sql: string; __params: unknown[] }[]) {
      options.onBatch?.(
        statements.map((s) => ({ sql: s.__sql, params: s.__params })),
      );
      if (options.batchError) {
        throw options.batchError;
      }
      return statements.map(() => ({ success: true, meta: { changes: 1 } }));
    },
  };

  return fakeDb as unknown as D1Database;
}

const existingBooleanQuiz = {
  id: "1",
  solution_id: "10",
  answer_type: "boolean",
};

describe("D1QuizRepository", () => {
  describe("delete", () => {
    test("QuizTagの子行も同じbatchで削除する", async () => {
      // Arrange: 削除対象が存在する状態
      let batched: { sql: string; params: unknown[] }[] = [];
      const db = createFakeD1Database({
        firstResult: existingBooleanQuiz,
        onBatch: (statements) => {
          batched = statements;
        },
      });
      const repository = new D1QuizRepository(db);

      // Act
      const result = await repository.delete("1");

      // Assert: QuizTagのDELETEが含まれていないと、FK制約により本番D1で
      // Quizの削除が失敗する
      expect(result.isOk()).toBe(true);
      const sqls = batched.map((s) => s.sql);
      expect(sqls.some((sql) => /DELETE FROM QuizTag/i.test(sql))).toBe(true);
      expect(sqls.some((sql) => /DELETE FROM Quiz\b/i.test(sql))).toBe(true);
    });

    test("子行の削除がQuiz本体の削除より先に並ぶ", async () => {
      // Arrange
      let batched: { sql: string; params: unknown[] }[] = [];
      const db = createFakeD1Database({
        firstResult: existingBooleanQuiz,
        onBatch: (statements) => {
          batched = statements;
        },
      });
      const repository = new D1QuizRepository(db);

      // Act
      await repository.delete("1");

      // Assert: FK参照元を先に消さないと制約違反になる
      const sqls = batched.map((s) => s.sql);
      const quizTagIndex = sqls.findIndex((sql) =>
        /DELETE FROM QuizTag/i.test(sql),
      );
      const quizIndex = sqls.findIndex((sql) =>
        /DELETE FROM Quiz\b/i.test(sql),
      );
      expect(quizTagIndex).toBeGreaterThanOrEqual(0);
      expect(quizIndex).toBeGreaterThanOrEqual(0);
      expect(quizTagIndex).toBeLessThan(quizIndex);
    });

    test("solutionの削除は単一のbatchにまとめられ、個別実行されない", async () => {
      // Arrange: solutionを先に消してからQuizの削除に失敗すると、solutionだけ
      // 消えたQuizが残る恒久破損になる。batchなら原子的に巻き戻る。
      const executedOutsideBatch: string[] = [];
      let batched: { sql: string; params: unknown[] }[] = [];
      const db = createFakeD1Database({
        firstResult: existingBooleanQuiz,
        onBatch: (statements) => {
          batched = statements;
        },
        onPrepare: (sql) => {
          if (/DELETE/i.test(sql)) {
            executedOutsideBatch.push(sql);
          }
        },
      });
      const repository = new D1QuizRepository(db);

      // Act
      await repository.delete("1");

      // Assert
      expect(executedOutsideBatch).toEqual([]);
      expect(
        batched.some((s) => /DELETE FROM BooleanSolution/i.test(s.sql)),
      ).toBe(true);
    });

    test("batchが失敗した場合はErrを返し、例外を投げない", async () => {
      // Arrange: Attemptが残っているケースなどFK制約違反を模す
      const db = createFakeD1Database({
        firstResult: existingBooleanQuiz,
        batchError: new Error("FOREIGN KEY constraint failed"),
      });
      const repository = new D1QuizRepository(db);

      // Act
      const result = await repository.delete("1");

      // Assert
      expect(result.isErr()).toBe(true);
    });

    test("対象が存在しない場合は例外ではなくErrを返す", async () => {
      // Arrange: fromSafePromise(Promise.reject(...))はErrにならずthrowするため、
      // 本番D1では404であるべき場面がplain-textの500になっていた
      const db = createFakeD1Database({ firstResult: null });
      const repository = new D1QuizRepository(db);

      // Act
      const result = await repository.delete("missing-id");

      // Assert
      expect(result.isErr()).toBe(true);
    });
  });

  describe("findById", () => {
    /**
     * findById の SELECT が返す D1 の生の行
     *
     * D1 は INTEGER 列を number、boolean 列を 0/1 で返す。選択肢は
     * GROUP_CONCAT(json_object(...)) で連結された文字列になる。
     */
    const d1QuizRow = (overrides: Record<string, unknown> = {}) => ({
      id: 3,
      question: "TypeScriptは静的型付けか",
      answer_type: "boolean",
      solution_id: 7,
      explanation: null,
      status: "draft",
      creator_id: 5,
      created_at: "2026-09-13 00:00:00",
      approved_at: null,
      boolean_value: 0,
      correct_answer: null,
      matching_strategy: null,
      case_sensitive: null,
      choices: null,
      min_correct_answers: null,
      ...overrides,
    });

    test("D1の数値の行から文字列IDのレスポンスを返す", async () => {
      // Arrange
      const db = createFakeD1Database({ firstResult: d1QuizRow() });
      const repository = new D1QuizRepository(db);

      // Act
      const result = await repository.findById("3");

      // Assert: 所有者判定は文字列の UserIdentity.id と比較するため、
      // number のままだと "5" !== 5 で作成者本人でも一致しない
      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value.id).toBe("3");
        expect(result.value.solutionId).toBe("7");
        expect(result.value.creatorId).toBe("5");
        expect(result.value.solution).toEqual({
          type: "boolean",
          id: "7",
          value: false,
        });
      }
    });

    test("選択肢をD1の値から変換し並び順どおりに返す", async () => {
      // Arrange: 選択肢の id / solutionId は number、isCorrect は 0/1。
      // 以前はこれらが不正扱いで黙って捨てられ、choices が空になっていた
      const db = createFakeD1Database({
        firstResult: d1QuizRow({
          answer_type: "single_choice",
          boolean_value: null,
          choices:
            '{"id":12,"solutionId":7,"text":"b","orderIndex":1,"isCorrect":1},' +
            '{"id":11,"solutionId":7,"text":"a","orderIndex":0,"isCorrect":0}',
        }),
      });
      const repository = new D1QuizRepository(db);

      // Act
      const result = await repository.findById("3");

      // Assert
      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value.solution).toEqual({
          type: "single_choice",
          id: "7",
          choices: [
            {
              id: "11",
              solutionId: "7",
              text: "a",
              orderIndex: 0,
              isCorrect: false,
            },
            {
              id: "12",
              solutionId: "7",
              text: "b",
              orderIndex: 1,
              isCorrect: true,
            },
          ],
        });
      }
    });

    test("スキーマに合わない選択肢があれば空にせずErrを返す", async () => {
      // Arrange: 2件目の選択肢に text が無い
      const db = createFakeD1Database({
        firstResult: d1QuizRow({
          answer_type: "single_choice",
          boolean_value: null,
          choices:
            '{"id":11,"solutionId":7,"text":"a","orderIndex":0,"isCorrect":0},' +
            '{"id":12,"solutionId":7,"orderIndex":1,"isCorrect":1}',
        }),
      });
      const repository = new D1QuizRepository(db);

      // Act
      const result = await repository.findById("3");

      // Assert
      expect(result.isErr()).toBe(true);
    });

    test("対象が存在しない場合は例外ではなくErrを返す", async () => {
      // Arrange
      const db = createFakeD1Database({ firstResult: null });
      const repository = new D1QuizRepository(db);

      // Act
      const result = await repository.findById("missing-id");

      // Assert: UpdateQuizUseCase/DeleteQuizUseCase/ChangeQuizStatusUseCaseは
      // いずれも先頭でfindByIdを呼ぶため、ここがthrowすると全書き込み操作が
      // 契約外の500になる
      expect(result.isErr()).toBe(true);
    });
  });
});
