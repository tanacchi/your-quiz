import { describe, expect, it } from "vitest";
import {
  CreatorId,
  Deck,
  DeckId,
  QuizId,
} from "../../domain/entities/deck/Deck";
import { toDeckDto } from "./deck-dto";

describe("toDeckDto", () => {
  it("descriptionありのDeckを変換する", () => {
    const deck = Deck.from({
      id: DeckId.parse("1"),
      name: "テストDeck",
      description: "説明文",
      quizIds: [QuizId.parse("quiz-1")],
      creatorId: CreatorId.parse("42"),
      createdAt: "2023-12-01 10:00:00",
      lastModifiedAt: "2023-12-01 10:00:00",
    })._unsafeUnwrap();

    const dto = toDeckDto(deck);

    expect(dto).toEqual({
      id: "1",
      name: "テストDeck",
      description: "説明文",
      quizIds: ["quiz-1"],
      creatorId: "42",
      createdAt: "2023-12-01 10:00:00",
      lastModifiedAt: "2023-12-01 10:00:00",
    });
  });

  it("descriptionなしのDeckを変換する（キー自体を含めない）", () => {
    const deck = Deck.from({
      id: DeckId.parse("1"),
      name: "テストDeck",
      quizIds: [QuizId.parse("quiz-1")],
      creatorId: CreatorId.parse("42"),
      createdAt: "2023-12-01 10:00:00",
      lastModifiedAt: "2023-12-01 10:00:00",
    })._unsafeUnwrap();

    const dto = toDeckDto(deck);

    expect(dto).not.toHaveProperty("description");
  });
});
