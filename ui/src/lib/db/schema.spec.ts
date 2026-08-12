import { createTestDb } from "@/test/db";
import type { QuizPocketDatabase } from "./client";

describe("QuizPocketDBSchema", () => {
  let db: QuizPocketDatabase;

  beforeEach(async () => {
    db = await createTestDb();
  });

  afterEach(() => {
    db.close();
  });

  describe.each([
    ["answers"],
    ["drafts"],
    ["syncQueue"],
    ["quizCache"],
  ] as const)("%s ストア", (storeName) => {
    it("生成される", () => {
      expect(db.objectStoreNames.contains(storeName)).toBe(true);
    });
  });

  describe("answers ストア", () => {
    it("by-sessionId インデックスを持つ", () => {
      const tx = db.transaction("answers", "readonly");
      expect(tx.store.indexNames.contains("by-sessionId")).toBe(true);
    });
  });

  describe("syncQueue ストア", () => {
    it("autoIncrement のキー昇順で FIFO を保証する", async () => {
      const tx1 = db.transaction("syncQueue", "readwrite");
      const key1 = await tx1.store.add({
        id: "item-1",
        type: "answer",
        action: "create",
        data: {},
        timestamp: "2026-08-11T00:00:00.000Z",
        checksum: "checksum-1",
      });
      await tx1.done;

      const tx2 = db.transaction("syncQueue", "readwrite");
      const key2 = await tx2.store.add({
        id: "item-2",
        type: "answer",
        action: "create",
        data: {},
        timestamp: "2026-08-11T00:00:01.000Z",
        checksum: "checksum-2",
      });
      await tx2.done;

      expect(key2).toBeGreaterThan(key1);
    });
  });
});
