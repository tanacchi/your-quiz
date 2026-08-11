import { createTestDb } from "@/test/db";
import { AnswerRepository } from "./AnswerRepository";
import type { QuizPocketDatabase } from "./client";
import type { AnswerRecord } from "./schemas";

function makeAnswer(overrides: Partial<AnswerRecord> = {}): AnswerRecord {
  return {
    localId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    sessionId: "session-1",
    quizId: "quiz-1",
    userAnswer: true,
    responseTimeMs: 1200,
    answeredAt: "2026-08-11T00:00:00.000Z",
    ...overrides,
  };
}

describe("AnswerRepository", () => {
  let db: QuizPocketDatabase;
  let repository: AnswerRepository;

  beforeEach(async () => {
    db = await createTestDb();
    repository = new AnswerRepository(db);
  });

  afterEach(() => {
    db.close();
  });

  describe("save", () => {
    describe("正しい回答記録を渡した場合", () => {
      it("保存に成功する", async () => {
        const result = await repository.save(makeAnswer());
        expect(result.isOk()).toBe(true);
      });
    });

    describe("同一 localId で2回保存した場合", () => {
      it("1件に上書きされる", async () => {
        await repository.save(makeAnswer({ userAnswer: true }));
        await repository.save(makeAnswer({ userAnswer: false }));
        const all = await repository.findAll();
        if (all.isErr()) {
          throw new Error("取得に失敗した");
        }
        expect(all.value).toHaveLength(1);
        expect(all.value[0]?.userAnswer).toBe(false);
      });
    });

    describe.each([
      ["sessionId が空文字", { sessionId: "" }],
      ["localId が UUID でない", { localId: "not-a-uuid" }],
      ["responseTimeMs が負数", { responseTimeMs: -1 }],
    ])("%s の場合", (_label, overrides) => {
      it("ValidationFailed を返す", async () => {
        const result = await repository.save(makeAnswer(overrides));
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error.type).toBe("ValidationFailed");
        }
      });
    });
  });

  describe("findBySessionId", () => {
    describe.each([
      ["0件", 0],
      ["1件", 1],
      ["3件", 3],
    ])("該当する回答が %s の場合", (_label, count) => {
      it("件数どおりに返す", async () => {
        for (let i = 0; i < count; i += 1) {
          await repository.save(
            makeAnswer({
              localId: `3fa85f64-5717-4562-b3fc-2c963f66af${String(i).padStart(2, "0")}`,
              sessionId: "target-session",
            }),
          );
        }
        const result = await repository.findBySessionId("target-session");
        if (result.isErr()) {
          throw new Error("取得に失敗した");
        }
        expect(result.value).toHaveLength(count);
      });
    });

    describe("該当しないセッションIDの場合", () => {
      it("空配列を返す", async () => {
        await repository.save(makeAnswer({ sessionId: "other-session" }));
        const result = await repository.findBySessionId("target-session");
        if (result.isErr()) {
          throw new Error("取得に失敗した");
        }
        expect(result.value).toEqual([]);
      });
    });
  });

  describe("findAll", () => {
    describe("レコードが無い場合", () => {
      it("空配列を返す", async () => {
        const result = await repository.findAll();
        if (result.isErr()) {
          throw new Error("取得に失敗した");
        }
        expect(result.value).toEqual([]);
      });
    });
  });

  describe("clear", () => {
    describe("レコードが存在する場合", () => {
      it("全件削除する", async () => {
        await repository.save(makeAnswer());
        await repository.clear();
        const result = await repository.findAll();
        if (result.isErr()) {
          throw new Error("取得に失敗した");
        }
        expect(result.value).toEqual([]);
      });
    });

    describe("空の状態で呼び出した場合", () => {
      it("成功する", async () => {
        const result = await repository.clear();
        expect(result.isOk()).toBe(true);
      });
    });
  });
});
