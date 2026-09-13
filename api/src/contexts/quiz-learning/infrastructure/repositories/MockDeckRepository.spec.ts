import { describe, expect, it } from "vitest";
import {
  CreatorId,
  Deck,
  DeckId,
  QuizId,
} from "../../domain/entities/deck/Deck";
import { MockDeckRepository } from "./MockDeckRepository";

const buildDeck = (overrides: { id?: string; creatorId?: string } = {}) =>
  Deck.from({
    id: DeckId.parse(overrides.id ?? "1"),
    name: "テストDeck",
    quizIds: [QuizId.parse("quiz-1")],
    creatorId: CreatorId.parse(overrides.creatorId ?? "42"),
    createdAt: "2023-12-01 10:00:00",
    lastModifiedAt: "2023-12-01 10:00:00",
  })._unsafeUnwrap();

describe("MockDeckRepository", () => {
  it("createで追加したDeckをfindByIdで取得できる", async () => {
    const repository = new MockDeckRepository();
    const deck = buildDeck();

    const createResult = await repository.create(deck);
    expect(createResult.isOk()).toBe(true);

    const findResult = await repository.findById("1");
    expect(findResult.isOk()).toBe(true);
    if (findResult.isOk()) {
      expect(findResult.value.get("name")).toBe("テストDeck");
    }
  });

  it("存在しないIDのfindByIdはエラーを返す", async () => {
    const repository = new MockDeckRepository();

    const result = await repository.findById("nonexistent");

    expect(result.isErr()).toBe(true);
  });

  it("findByCreatorは指定した作成者のDeckのみ返す", async () => {
    const repository = new MockDeckRepository();
    await repository.create(buildDeck({ id: "1", creatorId: "42" }));
    await repository.create(buildDeck({ id: "2", creatorId: "42" }));
    await repository.create(buildDeck({ id: "3", creatorId: "99" }));

    const result = await repository.findByCreator("42");

    expect(result.isOk()).toBe(true);
    if (result.isOk()) {
      expect(result.value.items).toHaveLength(2);
      expect(result.value.totalCount).toBe(2);
    }
  });

  it("updateは指定フィールドのみ更新する", async () => {
    const repository = new MockDeckRepository();
    await repository.create(buildDeck());

    const result = await repository.update("1", { name: "更新後" });

    expect(result.isOk()).toBe(true);
    if (result.isOk()) {
      expect(result.value.get("name")).toBe("更新後");
    }
  });

  it("存在しないIDのupdateはエラーを返す", async () => {
    const repository = new MockDeckRepository();

    const result = await repository.update("nonexistent", { name: "x" });

    expect(result.isErr()).toBe(true);
  });

  it("deleteは対象を削除する", async () => {
    const repository = new MockDeckRepository();
    await repository.create(buildDeck());

    const deleteResult = await repository.delete("1");
    expect(deleteResult.isOk()).toBe(true);

    const findResult = await repository.findById("1");
    expect(findResult.isErr()).toBe(true);
  });
});
