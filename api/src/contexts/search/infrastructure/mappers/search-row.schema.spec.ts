import { describe, expect, test } from "vitest";
import {
  isSearchCountRow,
  isSearchRow,
  parseSearchRows,
  type SearchRow,
  searchCountRowSchema,
  searchRowSchema,
  toQuizSummary,
} from "./search-row.schema";

describe("search-row.schema", () => {
  /**
   * 有効なD1検索行データを生成するヘルパー関数
   *
   * D1の生の行（パース前）を模すため、overridesの型は変換後の SearchRow
   * ではなく Record<string, unknown> とする（id等はD1から数値で返ることも
   * あり、パース前はそのままの型で渡せる必要があるため）。
   */
  const createValidRow = (
    overrides: Record<string, unknown> = {},
  ): Record<string, unknown> => ({
    id: "1",
    question: "TypeScriptはJavaScriptのスーパーセットである",
    answer_type: "boolean",
    solution_id: "1",
    explanation: null,
    status: "approved",
    creator_id: "1",
    created_at: "2024-01-15T00:00:00Z",
    approved_at: null,
    tag_names: null,
    ...overrides,
  });

  describe("searchRowSchema / isSearchRow", () => {
    test("必須フィールドのみの行は有効と判定される", () => {
      // Arrange
      const row = createValidRow();

      // Act
      const result = searchRowSchema.safeParse(row);

      // Assert
      expect(result.success).toBe(true);
      expect(isSearchRow(row)).toBe(true);
    });

    test("D1が返す数値IDは文字列へ変換される", () => {
      // Arrange
      const row = createValidRow({
        id: 1 as unknown as string,
        solution_id: 2 as unknown as string,
        creator_id: 3 as unknown as string,
      });

      // Act
      const result = searchRowSchema.safeParse(row);

      // Assert
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.id).toBe("1");
        expect(result.data.solution_id).toBe("2");
        expect(result.data.creator_id).toBe("3");
      }
    });

    test.each([
      ["boolean"],
      ["free_text"],
      ["single_choice"],
      ["multiple_choice"],
    ] as const)("answer_type=%s は有効", (answerType) => {
      const row = createValidRow({ answer_type: answerType });
      expect(isSearchRow(row)).toBe(true);
    });

    test("answer_typeが未知の値の場合は無効", () => {
      const row = createValidRow({
        answer_type: "unknown_type" as unknown as SearchRow["answer_type"],
      });
      expect(isSearchRow(row)).toBe(false);
    });

    // QuizStatusはADR-0029でdraft/publishedを含む5値に拡張された。
    // 検索SQLのWHERE句にstatus条件が無く全ステータスの行が流れてくるため、
    // ここが3値のままだとpublishしたクイズがparse失敗で無言に捨てられる。
    test.each([
      ["draft"],
      ["pending_approval"],
      ["approved"],
      ["rejected"],
      ["published"],
    ] as const)("status=%s は有効", (status) => {
      const row = createValidRow({ status });
      expect(isSearchRow(row)).toBe(true);
    });

    test("statusが未知の値の場合は無効", () => {
      const row = createValidRow({
        status: "unknown_status" as unknown as SearchRow["status"],
      });
      expect(isSearchRow(row)).toBe(false);
    });

    test("必須フィールドが欠落している場合は無効", () => {
      const { question: _question, ...invalidRow } = createValidRow();
      expect(isSearchRow(invalidRow)).toBe(false);
    });

    test("explanation/approved_at/tag_namesはnullを許容する", () => {
      const row = createValidRow({
        explanation: null,
        approved_at: null,
        tag_names: null,
      });
      expect(isSearchRow(row)).toBe(true);
    });
  });

  describe("toQuizSummary", () => {
    test("行データをQuizSummary形状へ変換する", () => {
      // Arrange
      const parsed = searchRowSchema.parse(
        createValidRow({
          explanation: "TypeScriptに関する解説",
          approved_at: "2024-01-16T00:00:00Z",
        }),
      );

      // Act
      const summary = toQuizSummary(parsed);

      // Assert
      expect(summary).toEqual({
        id: "1",
        question: "TypeScriptはJavaScriptのスーパーセットである",
        answerType: "boolean",
        solutionId: "1",
        explanation: "TypeScriptに関する解説",
        status: "approved",
        creatorId: "1",
        createdAt: "2024-01-15T00:00:00Z",
        approvedAt: "2024-01-16T00:00:00Z",
        tagIds: [],
      });
    });

    test("explanation/approved_atがnullの場合、結果オブジェクトにキー自体を含めない", () => {
      // Arrange（TypeSpec生成型のOptionalフィールドはundefinedでなくキー省略を期待）
      const parsed = searchRowSchema.parse(
        createValidRow({ explanation: null, approved_at: null }),
      );

      // Act
      const summary = toQuizSummary(parsed);

      // Assert
      expect(summary).not.toHaveProperty("explanation");
      expect(summary).not.toHaveProperty("approvedAt");
    });

    test("tag_namesがnullの場合、tagIdsは空配列になる", () => {
      const parsed = searchRowSchema.parse(createValidRow({ tag_names: null }));
      const summary = toQuizSummary(parsed);
      expect(summary.tagIds).toEqual([]);
    });

    test("tag_namesは区切り文字char(31)で分割してtagIdsに入れる", () => {
      const parsed = searchRowSchema.parse(
        createValidRow({
          tag_names: "プログラミング\x1fWeb開発\x1fTypeScript",
        }),
      );
      const summary = toQuizSummary(parsed);
      expect(summary.tagIds).toEqual([
        "プログラミング",
        "Web開発",
        "TypeScript",
      ]);
    });

    test("tag_namesが単一タグの場合、要素数1の配列になる", () => {
      const parsed = searchRowSchema.parse(
        createValidRow({ tag_names: "プログラミング" }),
      );
      const summary = toQuizSummary(parsed);
      expect(summary.tagIds).toEqual(["プログラミング"]);
    });
  });

  describe("isSearchCountRow", () => {
    test("totalが数値の場合は有効", () => {
      expect(isSearchCountRow({ total: 42 })).toBe(true);
    });

    test("D1が返す文字列型のtotalはisSearchCountRowでは有効と判定されるのみで、実際の数値変換にはsafeParse().dataを使う必要がある", () => {
      // isSearchCountRow は型ガード（真偽値のみ）であり、この呼び出し自体は
      // transform後の値を返さない。D1SearchRepositoryが実際に総数を取り出す
      // 際は searchCountRowSchema.safeParse(...).data を使う（型ガードの
      // narrowingだけでは transform 前の値のまま扱ってしまうバグの回帰）
      expect(isSearchCountRow({ total: "42" })).toBe(true);

      const parsed = searchCountRowSchema.safeParse({ total: "42" });
      expect(parsed.success).toBe(true);
      if (parsed.success) {
        expect(parsed.data.total).toBe(42);
        expect(typeof parsed.data.total).toBe("number");
      }
    });

    test("totalが欠落している場合は無効", () => {
      expect(isSearchCountRow({})).toBe(false);
    });

    test("totalが数値変換不能な文字列の場合は無効", () => {
      expect(isSearchCountRow({ total: "not-a-number" })).toBe(false);
    });
  });

  describe("parseSearchRows", () => {
    test("全行が有効な場合、validRowsに全件、invalidRowsは空になる", () => {
      // Arrange
      const rows = [createValidRow({ id: 1 }), createValidRow({ id: 2 })];

      // Act
      const { validRows, invalidRows } = parseSearchRows(rows);

      // Assert
      expect(validRows).toHaveLength(2);
      expect(invalidRows).toHaveLength(0);
    });

    test("数値IDの行はvalidRowsの中でzodのtransformにより文字列化される", () => {
      // isSearchRow による filter だけでは transform が適用されないバグの
      // 回帰テスト（D1SearchRepository.spec.tsの対応するテストと対）
      // Arrange
      const rows = [createValidRow({ id: 42, solution_id: 7, creator_id: 3 })];

      // Act
      const { validRows } = parseSearchRows(rows);

      // Assert
      expect(validRows[0]?.id).toBe("42");
      expect(validRows[0]?.solution_id).toBe("7");
      expect(validRows[0]?.creator_id).toBe("3");
      expect(typeof validRows[0]?.id).toBe("string");
    });

    test("不正な形式の行はinvalidRowsに振り分けられ、validRowsには含まれない", () => {
      // Arrange
      const rows = [
        createValidRow({ id: 1 }),
        { id: 2 /* question等の必須フィールド欠落 */ },
      ];

      // Act
      const { validRows, invalidRows } = parseSearchRows(rows);

      // Assert
      expect(validRows).toHaveLength(1);
      expect(validRows[0]?.id).toBe("1");
      expect(invalidRows).toEqual([{ id: 2 }]);
    });

    test("空配列を渡した場合、両方とも空配列になる", () => {
      const { validRows, invalidRows } = parseSearchRows([]);
      expect(validRows).toEqual([]);
      expect(invalidRows).toEqual([]);
    });
  });
});
