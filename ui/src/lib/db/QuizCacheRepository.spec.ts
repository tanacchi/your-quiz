import { createTestDb } from "@/test/db";
import type { Quiz } from "@/types/quiz";
import type { QuizPocketDatabase } from "./client";
import { QUIZ_CACHE_TTL_MS, QuizCacheRepository } from "./QuizCacheRepository";

function makeQuiz(overrides: Partial<Quiz> = {}): Quiz {
  return {
    id: "quiz-1",
    question: "五角形の内角の和は何度？",
    answerType: "boolean",
    status: "未解答",
    tags: [],
    hasExplanation: false,
    ...overrides,
  };
}

describe("QuizCacheRepository", () => {
  let db: QuizPocketDatabase;

  beforeEach(async () => {
    db = await createTestDb();
  });

  afterEach(() => {
    db.close();
  });

  describe("set", () => {
    describe("正しいクイズを渡した場合", () => {
      it("保存に成功する", async () => {
        const repository = new QuizCacheRepository(db);
        const result = await repository.set(makeQuiz());
        expect(result.isOk()).toBe(true);
      });
    });

    describe("isOfflineAvailable を指定した場合", () => {
      it("往復できる", async () => {
        const repository = new QuizCacheRepository(db);
        await repository.set(makeQuiz({ isOfflineAvailable: true }));
        const result = await repository.get("quiz-1");
        if (result.isErr()) {
          throw new Error("取得に失敗した");
        }
        expect(result.value?.isOfflineAvailable).toBe(true);
      });
    });

    describe("同一 id で2回保存した場合", () => {
      it("1件に上書きされ expiresAt が更新される", async () => {
        let now = 0;
        const repository = new QuizCacheRepository(db, () => now);
        await repository.set(makeQuiz());
        now = 1000;
        await repository.set(makeQuiz());
        now = QUIZ_CACHE_TTL_MS + 500;
        const result = await repository.get("quiz-1");
        if (result.isErr()) {
          throw new Error("取得に失敗した");
        }
        // 2回目の保存(now=1000)から TTL 以内なので有効
        expect(result.value).not.toBeUndefined();
      });
    });

    describe("id が空文字の場合", () => {
      it("ValidationFailed を返す", async () => {
        const repository = new QuizCacheRepository(db);
        const result = await repository.set(makeQuiz({ id: "" }));
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error.type).toBe("ValidationFailed");
        }
      });
    });
  });

  describe("get", () => {
    describe.each([
      ["期限前(ttl-1)", QUIZ_CACHE_TTL_MS - 1, false],
      ["期限ちょうど(ttl)", QUIZ_CACHE_TTL_MS, true],
      ["期限後(ttl+1)", QUIZ_CACHE_TTL_MS + 1, true],
    ])("キャッシュ後 %s の場合", (_label, elapsed, expectExpired) => {
      it(expectExpired ? "undefined を返す" : "クイズを返す", async () => {
        let now = 0;
        const repository = new QuizCacheRepository(db, () => now);
        await repository.set(makeQuiz());
        now = elapsed;
        const result = await repository.get("quiz-1");
        if (result.isErr()) {
          throw new Error("取得に失敗した");
        }
        if (expectExpired) {
          expect(result.value).toBeUndefined();
        } else {
          expect(result.value?.id).toBe("quiz-1");
        }
      });
    });

    describe("存在しないIDの場合", () => {
      it("undefined を返す", async () => {
        const repository = new QuizCacheRepository(db);
        const result = await repository.get("not-found");
        if (result.isErr()) {
          throw new Error("取得に失敗した");
        }
        expect(result.value).toBeUndefined();
      });
    });

    describe("期限切れの場合", () => {
      it("実レコードを破棄する", async () => {
        let now = 0;
        const repository = new QuizCacheRepository(db, () => now);
        await repository.set(makeQuiz());
        now = QUIZ_CACHE_TTL_MS;
        await repository.get("quiz-1");

        const raw = await db.get("quizCache", "quiz-1");
        expect(raw).toBeUndefined();
      });
    });
  });

  describe("invalidate", () => {
    describe("存在するIDの場合", () => {
      it("削除する", async () => {
        const repository = new QuizCacheRepository(db);
        await repository.set(makeQuiz());
        await repository.invalidate("quiz-1");
        const result = await repository.get("quiz-1");
        if (result.isErr()) {
          throw new Error("取得に失敗した");
        }
        expect(result.value).toBeUndefined();
      });
    });

    describe("存在しないIDの場合", () => {
      it("成功する", async () => {
        const repository = new QuizCacheRepository(db);
        const result = await repository.invalidate("not-found");
        expect(result.isOk()).toBe(true);
      });
    });
  });

  describe("clearAll", () => {
    describe("レコードが存在する場合", () => {
      it("全件削除する", async () => {
        const repository = new QuizCacheRepository(db);
        await repository.set(makeQuiz({ id: "quiz-1" }));
        await repository.set(makeQuiz({ id: "quiz-2" }));
        await repository.clearAll();
        const first = await repository.get("quiz-1");
        const second = await repository.get("quiz-2");
        if (first.isErr() || second.isErr()) {
          throw new Error("取得に失敗した");
        }
        expect(first.value).toBeUndefined();
        expect(second.value).toBeUndefined();
      });
    });

    describe("空の状態で呼び出した場合", () => {
      it("成功する", async () => {
        const repository = new QuizCacheRepository(db);
        const result = await repository.clearAll();
        expect(result.isOk()).toBe(true);
      });
    });
  });
});
