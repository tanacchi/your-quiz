import { describe, expect, it } from "vitest";
import { zodDeckRowSchema } from "./d1-deck-types";

describe("d1-deck-types", () => {
  describe("zodDeckRowSchema", () => {
    it("D1の行データ（数値ID・JSON文字列quiz_ids）をパースできる", () => {
      const result = zodDeckRowSchema.safeParse({
        id: 1,
        name: "JavaScript基礎",
        description: "説明文",
        quiz_ids: "[1,9,14,20]",
        creator_id: 1,
        created_at: "2023-12-01 10:00:00",
        last_modified_at: "2023-12-01 10:00:00",
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.id).toBe("1");
        expect(result.data.creator_id).toBe("1");
        expect(result.data.quiz_ids).toEqual(["1", "9", "14", "20"]);
      }
    });

    it("descriptionがnullの場合はundefinedとして扱う", () => {
      const result = zodDeckRowSchema.safeParse({
        id: 1,
        name: "JavaScript基礎",
        description: null,
        quiz_ids: "[1]",
        creator_id: 1,
        created_at: "2023-12-01 10:00:00",
        last_modified_at: "2023-12-01 10:00:00",
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.description).toBeUndefined();
      }
    });

    it("quiz_idsが不正なJSONの場合は失敗する", () => {
      const result = zodDeckRowSchema.safeParse({
        id: 1,
        name: "JavaScript基礎",
        quiz_ids: "not-json",
        creator_id: 1,
        created_at: "2023-12-01 10:00:00",
        last_modified_at: "2023-12-01 10:00:00",
      });

      expect(result.success).toBe(false);
    });

    it("quiz_idsが配列でないJSONの場合は失敗する", () => {
      const result = zodDeckRowSchema.safeParse({
        id: 1,
        name: "JavaScript基礎",
        quiz_ids: '{"not":"an array"}',
        creator_id: 1,
        created_at: "2023-12-01 10:00:00",
        last_modified_at: "2023-12-01 10:00:00",
      });

      expect(result.success).toBe(false);
    });
  });
});
