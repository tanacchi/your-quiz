import { describe, expect, it } from "vitest";
import { CreatorId, Deck, DeckId, QuizId } from "./Deck";

describe("Deck", () => {
  const validDeckData = {
    id: DeckId.parse("deck-1"),
    name: "JavaScript基礎",
    description: "JavaScriptの基本的な概念",
    quizIds: [QuizId.parse("quiz-1"), QuizId.parse("quiz-2")],
    creatorId: CreatorId.parse("user-1"),
    createdAt: "2023-12-01 10:00:00",
    lastModifiedAt: "2023-12-01 10:00:00",
  } as const;

  describe("Entity Creation", () => {
    it("有効なデータからDeckを構築できる", () => {
      const result = Deck.from(validDeckData);
      expect(result.isOk()).toBe(true);

      if (result.isOk()) {
        const deck = result.value;
        expect(deck.get("name")).toBe("JavaScript基礎");
        expect(deck.get("quizIds")).toEqual(["quiz-1", "quiz-2"]);
        expect(deck.get("creatorId")).toBe("user-1");
      }
    });

    it("quizIdsが空配列の場合は拒否する", () => {
      const result = Deck.from({ ...validDeckData, quizIds: [] });
      expect(result.isErr()).toBe(true);
    });
  });

  describe("Business Logic", () => {
    it("isOwnedByは所有者一致でtrueを返す", () => {
      const result = Deck.from(validDeckData);
      const deck = result._unsafeUnwrap();
      expect(deck.isOwnedBy("user-1")).toBe(true);
    });

    it("isOwnedByは所有者不一致でfalseを返す", () => {
      const result = Deck.from(validDeckData);
      const deck = result._unsafeUnwrap();
      expect(deck.isOwnedBy("user-2")).toBe(false);
    });
  });

  describe("Draft Usage", () => {
    it("Draftパターンで構築できる", () => {
      const draft = new Deck.Draft();
      draft.update("name", "React入門");
      draft.with({
        id: DeckId.parse("deck-2"),
        description: undefined,
        quizIds: [QuizId.parse("quiz-3")],
        creatorId: CreatorId.parse("user-1"),
        createdAt: "2023-12-01 10:00:00",
        lastModifiedAt: "2023-12-01 10:00:00",
      });

      const entityResult = draft.commit();
      expect(entityResult.isOk()).toBe(true);
      if (entityResult.isOk()) {
        expect(entityResult.value.get("name")).toBe("React入門");
      }
    });
  });

  describe("Immutability", () => {
    it("update()は新しいインスタンスを返し元のインスタンスは不変", () => {
      const result = Deck.from(validDeckData);
      const originalDeck = result._unsafeUnwrap();

      const updatedResult = originalDeck.update("name", "更新後の名前");
      const updatedDeck = updatedResult._unsafeUnwrap();

      expect(originalDeck).not.toBe(updatedDeck);
      expect(originalDeck.get("name")).toBe("JavaScript基礎");
      expect(updatedDeck.get("name")).toBe("更新後の名前");
    });
  });
});
