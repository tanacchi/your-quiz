import { describe, expect, it } from "vitest";
import { InternalServerError } from "../../../../shared/errors";
import { D1DeckMapper } from "./D1DeckMapper";

describe("D1DeckMapper", () => {
  const validRawRow = {
    id: 1,
    name: "JavaScript基礎",
    description: "説明文",
    quiz_ids: "[1,9,14]",
    creator_id: 1,
    created_at: "2023-12-01 10:00:00",
    last_modified_at: "2023-12-01 10:00:00",
  };

  describe("fromRow", () => {
    it("有効な生の行データをDeckエンティティに変換する", () => {
      const result = D1DeckMapper.fromRow(validRawRow);

      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        const deck = result.value;
        expect(deck.get("id")).toBe("1");
        expect(deck.get("name")).toBe("JavaScript基礎");
        expect(deck.get("description")).toBe("説明文");
        expect(deck.get("quizIds")).toEqual(["1", "9", "14"]);
        expect(deck.get("creatorId")).toBe("1");
      }
    });

    it("descriptionがnullの行データも変換できる", () => {
      const result = D1DeckMapper.fromRow({
        ...validRawRow,
        description: null,
      });

      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value.get("description")).toBeUndefined();
      }
    });

    it("quiz_idsが空配列の場合はエラーを返す", () => {
      const result = D1DeckMapper.fromRow({
        ...validRawRow,
        quiz_ids: "[]",
      });

      expect(result.isErr()).toBe(true);
      if (result.isErr()) {
        expect(result.error).toBeInstanceOf(InternalServerError);
      }
    });

    it("行データの形が不正な場合はエラーを返す", () => {
      const result = D1DeckMapper.fromRow({ id: 1 });

      expect(result.isErr()).toBe(true);
      if (result.isErr()) {
        expect(result.error).toBeInstanceOf(InternalServerError);
        expect(result.error.details).toContain("Invalid deck row");
      }
    });
  });

  describe("fromRows", () => {
    it("複数の行データを変換する", () => {
      const result = D1DeckMapper.fromRows([
        validRawRow,
        { ...validRawRow, id: 2, name: "React入門" },
      ]);

      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value).toHaveLength(2);
        expect(result.value[1]?.get("name")).toBe("React入門");
      }
    });

    it("いずれかの行が不正な場合はエラーを返す", () => {
      const result = D1DeckMapper.fromRows([
        validRawRow,
        { ...validRawRow, id: 2, quiz_ids: "[]" },
      ]);

      expect(result.isErr()).toBe(true);
    });
  });
});
