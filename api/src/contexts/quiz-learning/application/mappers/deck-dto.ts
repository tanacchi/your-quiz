import type { components } from "../../../../shared/types";
import type { Deck } from "../../domain/entities/deck/Deck";

export type DeckDto = components["schemas"]["Deck"];

/**
 * DeckエンティティをTypeSpec生成型（`components["schemas"]["Deck"]`）に変換する
 */
export function toDeckDto(deck: Deck): DeckDto {
  const dto: DeckDto = {
    id: deck.get("id"),
    name: deck.get("name"),
    quizIds: deck.get("quizIds"),
    creatorId: deck.get("creatorId"),
    createdAt: deck.get("createdAt"),
    lastModifiedAt: deck.get("lastModifiedAt"),
  };
  const description = deck.get("description");
  if (description !== undefined) {
    dto.description = description;
  }
  return dto;
}
