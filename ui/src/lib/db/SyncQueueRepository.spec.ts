import { createTestDb } from "@/test/db";
import type { QuizPocketDatabase } from "./client";
import { SyncQueueRepository } from "./SyncQueueRepository";
import type { SyncItemAction, SyncItemType, SyncQueueItem } from "./schemas";

/** テスト用の UUID を連番から生成する。 */
function makeId(n: number): string {
  return `3fa85f64-5717-4562-b3fc-2c963f66${String(n).padStart(4, "0")}`;
}

function makeItem(overrides: Partial<SyncQueueItem> = {}): SyncQueueItem {
  return {
    id: makeId(0),
    type: "answer",
    action: "create",
    data: {},
    timestamp: "2026-08-11T00:00:00.000Z",
    checksum: "d41d8cd98f00b204e9800998ecf8427e",
    ...overrides,
  };
}

describe("SyncQueueRepository", () => {
  let db: QuizPocketDatabase;
  let repository: SyncQueueRepository;

  beforeEach(async () => {
    db = await createTestDb();
    repository = new SyncQueueRepository(db);
  });

  afterEach(() => {
    db.close();
  });

  describe("enqueue", () => {
    const types: ReadonlyArray<SyncItemType> = [
      "answer",
      "draft",
      "session",
      "preference",
    ];
    const actions: ReadonlyArray<SyncItemAction> = [
      "create",
      "update",
      "delete",
    ];

    describe.each(
      types.flatMap((type) => actions.map((action) => [type, action] as const)),
    )("type=%s action=%s の場合", (type, action) => {
      it("保存に成功する", async () => {
        const result = await repository.enqueue(makeItem({ type, action }));
        expect(result.isOk()).toBe(true);
      });
    });

    describe("id が UUID でない場合", () => {
      it("ValidationFailed を返す", async () => {
        const result = await repository.enqueue(makeItem({ id: "not-a-uuid" }));
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error.type).toBe("ValidationFailed");
        }
      });
    });
  });

  describe("dequeue", () => {
    describe("キューが空の場合", () => {
      it("undefined を返す", async () => {
        const result = await repository.dequeue();
        if (result.isErr()) {
          throw new Error("取得に失敗した");
        }
        expect(result.value).toBeUndefined();
      });
    });

    describe("複数件が登録されている場合", () => {
      it("最も古い1件を返す", async () => {
        const first = await repository.enqueue(makeItem({ id: makeId(1) }));
        const second = await repository.enqueue(makeItem({ id: makeId(2) }));
        if (first.isErr() || second.isErr()) {
          throw new Error("登録に失敗した");
        }
        const result = await repository.dequeue();
        if (result.isErr()) {
          throw new Error("取得に失敗した");
        }
        expect(result.value?.id).toBe(makeId(1));
      });

      it("返した1件をキューから削除する", async () => {
        const enqueued = await repository.enqueue(makeItem({ id: makeId(1) }));
        if (enqueued.isErr()) {
          throw new Error("登録に失敗した");
        }
        await repository.dequeue();
        const sizeResult = await repository.size();
        if (sizeResult.isErr()) {
          throw new Error("取得に失敗した");
        }
        expect(sizeResult.value).toBe(0);
      });

      it("2件目以降の順序を保つ", async () => {
        const first1 = await repository.enqueue(makeItem({ id: makeId(1) }));
        const first2 = await repository.enqueue(makeItem({ id: makeId(2) }));
        const first3 = await repository.enqueue(makeItem({ id: makeId(3) }));
        if (first1.isErr() || first2.isErr() || first3.isErr()) {
          throw new Error("登録に失敗した");
        }

        const first = await repository.dequeue();
        const second = await repository.dequeue();
        const third = await repository.dequeue();
        if (first.isErr() || second.isErr() || third.isErr()) {
          throw new Error("取得に失敗した");
        }
        expect([first.value?.id, second.value?.id, third.value?.id]).toEqual([
          makeId(1),
          makeId(2),
          makeId(3),
        ]);
      });
    });
  });

  describe("peek", () => {
    describe("キューが空の場合", () => {
      it("undefined を返す", async () => {
        const result = await repository.peek();
        if (result.isErr()) {
          throw new Error("取得に失敗した");
        }
        expect(result.value).toBeUndefined();
      });
    });

    describe("要素が存在する場合", () => {
      it("先頭を削除せずに返す", async () => {
        const enqueued = await repository.enqueue(makeItem({ id: makeId(1) }));
        if (enqueued.isErr()) {
          throw new Error("登録に失敗した");
        }
        await repository.peek();
        const sizeResult = await repository.size();
        if (sizeResult.isErr()) {
          throw new Error("取得に失敗した");
        }
        expect(sizeResult.value).toBe(1);
      });
    });
  });

  describe("size", () => {
    describe.each([
      ["0件", 0],
      ["1件", 1],
      ["2件", 2],
      ["10件", 10],
    ])("%s 登録されている場合", (_label, count) => {
      it("件数を返す", async () => {
        for (let i = 0; i < count; i += 1) {
          const enqueued = await repository.enqueue(
            makeItem({ id: makeId(i) }),
          );
          if (enqueued.isErr()) {
            throw new Error("登録に失敗した");
          }
        }
        const result = await repository.size();
        if (result.isErr()) {
          throw new Error("取得に失敗した");
        }
        expect(result.value).toBe(count);
      });
    });
  });
});
