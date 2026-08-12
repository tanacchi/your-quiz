import { createTestDb } from "@/test/db";
import type { QuizPocketDatabase } from "./client";
import { DraftRepository } from "./DraftRepository";
import type { DraftRecord } from "./schemas";

function makeDraft(overrides: Partial<DraftRecord> = {}): DraftRecord {
  return {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    question: "五角形の内角の和は何度？",
    tags: [],
    createdAt: "2026-08-11T00:00:00.000Z",
    updatedAt: "2026-08-11T00:00:00.000Z",
    ...overrides,
  };
}

describe("DraftRepository", () => {
  let db: QuizPocketDatabase;
  let repository: DraftRepository;

  beforeEach(async () => {
    db = await createTestDb();
    repository = new DraftRepository(db);
  });

  afterEach(() => {
    db.close();
  });

  describe("save", () => {
    describe("正解・解説を省略した場合", () => {
      it("保存に成功する", async () => {
        const result = await repository.save(makeDraft());
        expect(result.isOk()).toBe(true);
      });
    });

    describe("正解・解説を指定した場合", () => {
      it("保存に成功する", async () => {
        const result = await repository.save(
          makeDraft({ correctAnswer: true, explanation: "540度である。" }),
        );
        expect(result.isOk()).toBe(true);
      });
    });

    describe.each([
      ["0件", []],
      ["1件", ["数学"]],
      ["10件", Array.from({ length: 10 }, (_, i) => `タグ${i}`)],
    ])("タグが %s の場合", (_label, tags) => {
      it("保存に成功する", async () => {
        const result = await repository.save(makeDraft({ tags }));
        expect(result.isOk()).toBe(true);
      });
    });

    describe("同一 id で2回保存した場合", () => {
      it("updatedAt が更新される", async () => {
        await repository.save(
          makeDraft({ updatedAt: "2026-08-11T00:00:00.000Z" }),
        );
        await repository.save(
          makeDraft({ updatedAt: "2026-08-11T00:01:00.000Z" }),
        );
        const result = await repository.findById(
          "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        );
        if (result.isErr()) {
          throw new Error("取得に失敗した");
        }
        expect(result.value?.updatedAt).toBe("2026-08-11T00:01:00.000Z");
      });
    });

    describe("question が 501字 の場合", () => {
      it("ValidationFailed を返す", async () => {
        const result = await repository.save(
          makeDraft({ question: "あ".repeat(501) }),
        );
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error.type).toBe("ValidationFailed");
        }
      });
    });
  });

  describe("findById", () => {
    describe("存在するIDの場合", () => {
      it("該当レコードを返す", async () => {
        await repository.save(makeDraft());
        const result = await repository.findById(
          "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        );
        if (result.isErr()) {
          throw new Error("取得に失敗した");
        }
        expect(result.value?.id).toBe("3fa85f64-5717-4562-b3fc-2c963f66afa6");
      });
    });

    describe.each([
      ["存在しないID", "3fa85f64-5717-4562-b3fc-2c963f66afff"],
      ["空文字ID", ""],
    ])("%s の場合", (_label, id) => {
      it("undefined を返す", async () => {
        const result = await repository.findById(id);
        if (result.isErr()) {
          throw new Error("取得に失敗した");
        }
        expect(result.value).toBeUndefined();
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

    describe("複数件保存されている場合", () => {
      it("全件返す", async () => {
        const first = await repository.save(
          makeDraft({ id: "3fa85f64-5717-4562-b3fc-2c963f66af01" }),
        );
        const second = await repository.save(
          makeDraft({ id: "3fa85f64-5717-4562-b3fc-2c963f66af02" }),
        );
        if (first.isErr() || second.isErr()) {
          throw new Error("保存に失敗した");
        }
        const result = await repository.findAll();
        if (result.isErr()) {
          throw new Error("取得に失敗した");
        }
        expect(result.value).toHaveLength(2);
      });
    });
  });

  describe("delete", () => {
    describe("存在するIDの場合", () => {
      it("削除する", async () => {
        await repository.save(makeDraft());
        await repository.delete("3fa85f64-5717-4562-b3fc-2c963f66afa6");
        const result = await repository.findById(
          "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        );
        if (result.isErr()) {
          throw new Error("取得に失敗した");
        }
        expect(result.value).toBeUndefined();
      });
    });

    describe("存在しないIDの場合", () => {
      it("成功する", async () => {
        const result = await repository.delete("not-found-id");
        expect(result.isOk()).toBe(true);
      });
    });
  });
});
