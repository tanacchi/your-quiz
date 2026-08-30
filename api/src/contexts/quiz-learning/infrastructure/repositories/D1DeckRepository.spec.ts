import { describe, expect, it, vi } from "vitest";
import {
  CreatorId,
  Deck,
  DeckId,
  QuizId,
} from "../../domain/entities/deck/Deck";
import { D1DeckRepository } from "./D1DeckRepository";

const buildDeck = () =>
  Deck.from({
    id: DeckId.parse("1"),
    name: "テストDeck",
    description: "説明文",
    quizIds: [QuizId.parse("quiz-1"), QuizId.parse("quiz-2")],
    creatorId: CreatorId.parse("42"),
    createdAt: "2023-12-01 10:00:00",
    lastModifiedAt: "2023-12-01 10:00:00",
  })._unsafeUnwrap();

type MockDbOptions = {
  first?: unknown;
  run?: { meta: { last_row_id: number } };
  all?: { results: unknown[] };
};

const createMockDb = (options: MockDbOptions = {}) => {
  const first = vi.fn().mockResolvedValue(options.first ?? null);
  const run = vi
    .fn()
    .mockResolvedValue(options.run ?? { meta: { last_row_id: 1 } });
  const all = vi.fn().mockResolvedValue(options.all ?? { results: [] });
  const bind = vi.fn().mockReturnValue({ first, run, all });
  const prepare = vi.fn().mockReturnValue({ bind });
  const db = { prepare } as unknown as D1Database;
  return { db, prepare, bind, first, run, all };
};

describe("D1DeckRepository", () => {
  describe("create", () => {
    it("INSERT成功時、last_row_idを持つDeckを返す", async () => {
      const { db } = createMockDb({ run: { meta: { last_row_id: 7 } } });
      const repository = new D1DeckRepository(db);

      const result = await repository.create(buildDeck());

      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value.get("id")).toBe("7");
        expect(result.value.get("name")).toBe("テストDeck");
      }
    });

    it("INSERT失敗時はRepositoryErrorを返す", async () => {
      const first = vi.fn();
      const run = vi.fn().mockRejectedValue(new Error("INSERT failed"));
      const bind = vi.fn().mockReturnValue({ first, run });
      const prepare = vi.fn().mockReturnValue({ bind });
      const db = { prepare } as unknown as D1Database;
      const repository = new D1DeckRepository(db);

      const result = await repository.create(buildDeck());

      expect(result.isErr()).toBe(true);
    });
  });

  describe("findById", () => {
    it("見つかった場合はDeckを返す", async () => {
      const { db } = createMockDb({
        first: {
          id: 1,
          name: "テストDeck",
          description: "説明文",
          quiz_ids: "[1,2]",
          creator_id: 42,
          created_at: "2023-12-01 10:00:00",
          last_modified_at: "2023-12-01 10:00:00",
        },
      });
      const repository = new D1DeckRepository(db);

      const result = await repository.findById("1");

      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value.get("name")).toBe("テストDeck");
      }
    });

    it("見つからない場合はRepositoryErrorを返す", async () => {
      const { db } = createMockDb({ first: null });
      const repository = new D1DeckRepository(db);

      const result = await repository.findById("nonexistent");

      expect(result.isErr()).toBe(true);
      if (result.isErr()) {
        expect(result.error.details?.toLowerCase()).toContain("not found");
      }
    });

    it("SELECT失敗時はRepositoryErrorを返す", async () => {
      const first = vi.fn().mockRejectedValue(new Error("SELECT failed"));
      const bind = vi.fn().mockReturnValue({ first });
      const prepare = vi.fn().mockReturnValue({ bind });
      const db = { prepare } as unknown as D1Database;
      const repository = new D1DeckRepository(db);

      const result = await repository.findById("1");

      expect(result.isErr()).toBe(true);
    });
  });

  describe("findByCreator", () => {
    it("作成者のDeck一覧とtotalCount/hasMoreを返す", async () => {
      const { db } = createMockDb({
        first: { total: 3 },
        all: {
          results: [
            {
              id: 1,
              name: "Deck1",
              quiz_ids: "[1]",
              creator_id: 42,
              created_at: "2023-12-01 10:00:00",
              last_modified_at: "2023-12-01 10:00:00",
            },
            {
              id: 2,
              name: "Deck2",
              quiz_ids: "[2]",
              creator_id: 42,
              created_at: "2023-12-01 10:00:00",
              last_modified_at: "2023-12-01 10:00:00",
            },
          ],
        },
      });
      const repository = new D1DeckRepository(db);

      const result = await repository.findByCreator("42", {
        limit: 2,
        offset: 0,
      });

      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value.items).toHaveLength(2);
        expect(result.value.totalCount).toBe(3);
        expect(result.value.hasMore).toBe(true);
      }
    });
  });

  describe("update", () => {
    it("更新後のDeckを再取得して返す", async () => {
      const first = vi.fn().mockResolvedValue({
        id: 1,
        name: "更新後の名前",
        quiz_ids: "[1]",
        creator_id: 42,
        created_at: "2023-12-01 10:00:00",
        last_modified_at: "2023-12-01 11:00:00",
      });
      const run = vi.fn().mockResolvedValue({ meta: {} });
      const bind = vi.fn().mockReturnValue({ first, run });
      const prepare = vi.fn().mockReturnValue({ bind });
      const db = { prepare } as unknown as D1Database;
      const repository = new D1DeckRepository(db);

      const result = await repository.update("1", { name: "更新後の名前" });

      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value.get("name")).toBe("更新後の名前");
      }
    });

    it("更新フィールドが空の場合はRepositoryErrorを返す", async () => {
      const { db } = createMockDb();
      const repository = new D1DeckRepository(db);

      const result = await repository.update("1", {});

      expect(result.isErr()).toBe(true);
    });
  });

  describe("delete", () => {
    it("DELETE成功時はvoidを返す", async () => {
      const { db } = createMockDb();
      const repository = new D1DeckRepository(db);

      const result = await repository.delete("1");

      expect(result.isOk()).toBe(true);
    });

    it("DELETE失敗時はRepositoryErrorを返す", async () => {
      const run = vi.fn().mockRejectedValue(new Error("DELETE failed"));
      const bind = vi.fn().mockReturnValue({ run });
      const prepare = vi.fn().mockReturnValue({ bind });
      const db = { prepare } as unknown as D1Database;
      const repository = new D1DeckRepository(db);

      const result = await repository.delete("1");

      expect(result.isErr()).toBe(true);
    });
  });
});
