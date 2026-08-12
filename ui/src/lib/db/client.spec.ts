import { createTestDb } from "@/test/db";
import { closeQuizPocketDb, getQuizPocketDb } from "./client";

describe("getQuizPocketDb / closeQuizPocketDb", () => {
  afterEach(async () => {
    await closeQuizPocketDb();
  });

  describe("複数回呼び出した場合", () => {
    it("同一インスタンスを返す", async () => {
      const first = await getQuizPocketDb();
      const second = await getQuizPocketDb();
      if (first.isErr() || second.isErr()) {
        throw new Error("接続に失敗した");
      }
      expect(first.value).toBe(second.value);
    });
  });

  describe("close 後に再度呼び出した場合", () => {
    it("新しいインスタンスを返す", async () => {
      const first = await getQuizPocketDb();
      if (first.isErr()) {
        throw new Error("接続に失敗した");
      }
      await closeQuizPocketDb();
      const second = await getQuizPocketDb();
      if (second.isErr()) {
        throw new Error("接続に失敗した");
      }
      expect(second.value).not.toBe(first.value);
    });
  });

  describe("未オープンの状態で呼び出した場合", () => {
    it("例外を投げずに完了する", async () => {
      await expect(closeQuizPocketDb()).resolves.toBeUndefined();
    });
  });
});

describe("createTestDb", () => {
  describe("複数回呼び出した場合", () => {
    it("独立したデータベースを返す", async () => {
      const first = await createTestDb();
      const second = await createTestDb();
      expect(first).not.toBe(second);
      first.close();
      second.close();
    });
  });
});
