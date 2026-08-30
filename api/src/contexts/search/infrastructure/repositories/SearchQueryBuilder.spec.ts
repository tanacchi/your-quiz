import { describe, expect, test } from "vitest";
import { SearchQuizzesQuery } from "../../domain/entities/SearchQuizzesQuery";
import {
  buildSearchCountQuery,
  buildSearchDataQuery,
  buildWhereClause,
  escapeLikePattern,
} from "./SearchQueryBuilder";

describe("SearchQueryBuilder", () => {
  describe("escapeLikePattern", () => {
    test.each([
      ["通常の文字列はそのまま返す", "TypeScript", "TypeScript"],
      ["% はエスケープされる", "100%", "100\\%"],
      ["_ はエスケープされる", "a_b", "a\\_b"],
      ["\\ はエスケープされる", "a\\b", "a\\\\b"],
      [
        "複数のワイルドカード文字が混在しても全てエスケープされる",
        "50%_off\\now",
        "50\\%\\_off\\\\now",
      ],
      ["空文字はそのまま返す", "", ""],
    ])("%s: %s -> %s", (_description, input, expected) => {
      expect(escapeLikePattern(input)).toBe(expected);
    });

    test("バックスラッシュを最初に変換するため、エスケープ後の文字が二重にエスケープされない", () => {
      // "\%" という入力は "\\" + "%" として個別にエスケープされるべきで、
      // 変換順序を誤ると "\\%" の "%" が誤ってエスケープされる等の不具合が起きる
      expect(escapeLikePattern("\\%")).toBe("\\\\\\%");
    });
  });

  describe("buildWhereClause", () => {
    test("フィルタ条件が無い場合はWHERE句が空文字になる", () => {
      // Arrange
      const query = new SearchQuizzesQuery();

      // Act
      const { clause, params } = buildWhereClause(query);

      // Assert
      expect(clause).toBe("");
      expect(params).toEqual([]);
    });

    test("searchTextのみ指定した場合、question/explanation/タグ名をLIKEで横断検索するEXISTS句になる", () => {
      // Arrange
      const query = new SearchQuizzesQuery("TypeScript");

      // Act
      const { clause, params } = buildWhereClause(query);

      // Assert
      expect(clause).toContain("q.question LIKE ? ESCAPE '\\'");
      expect(clause).toContain("q.explanation LIKE ? ESCAPE '\\'");
      expect(clause).toContain("EXISTS");
      expect(clause).toContain("QuizTag");
      expect(clause).toContain("t.name LIKE ? ESCAPE '\\'");
      expect(params).toEqual(["%TypeScript%", "%TypeScript%", "%TypeScript%"]);
    });

    test("searchTextにLIKEメタ文字が含まれる場合はエスケープしてからパターン化する", () => {
      // Arrange
      const query = new SearchQuizzesQuery("100%_off");

      // Act
      const { params } = buildWhereClause(query);

      // Assert
      expect(params).toEqual([
        "%100\\%\\_off%",
        "%100\\%\\_off%",
        "%100\\%\\_off%",
      ]);
    });

    test("tags（肯定）を指定した場合、タグ名でOR照合するEXISTS句になる", () => {
      // Arrange
      const query = new SearchQuizzesQuery(undefined, [
        "プログラミング",
        "Web開発",
      ]);

      // Act
      const { clause, params } = buildWhereClause(query);

      // Assert
      expect(clause).toContain("EXISTS");
      expect(clause).not.toContain("NOT EXISTS");
      expect(clause).toContain("t.name IN (?, ?)");
      expect(params).toEqual(["プログラミング", "Web開発"]);
    });

    test("excludeTagsを指定した場合、NOT EXISTS句になる", () => {
      // Arrange
      const query = new SearchQuizzesQuery(undefined, undefined, [
        "初心者向け",
      ]);

      // Act
      const { clause, params } = buildWhereClause(query);

      // Assert
      expect(clause).toContain("NOT EXISTS");
      expect(clause).toContain("t.name IN (?)");
      expect(params).toEqual(["初心者向け"]);
    });

    test("answerTypeを指定した場合、完全一致条件になる", () => {
      // Arrange
      const query = new SearchQuizzesQuery(
        undefined,
        undefined,
        undefined,
        undefined,
        "single_choice",
      );

      // Act
      const { clause, params } = buildWhereClause(query);

      // Assert
      expect(clause).toBe("WHERE q.answer_type = ?");
      expect(params).toEqual(["single_choice"]);
    });

    test("creatorIdを指定した場合、完全一致条件になる", () => {
      // Arrange
      const query = new SearchQuizzesQuery(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        "user-1",
      );

      // Act
      const { clause, params } = buildWhereClause(query);

      // Assert
      expect(clause).toBe("WHERE q.creator_id = ?");
      expect(params).toEqual(["user-1"]);
    });

    test("createdAfter/createdBeforeを指定した場合、datetime()で正規化した範囲条件になる", () => {
      // Arrange
      const query = new SearchQuizzesQuery(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        "2024-01-01T00:00:00Z",
        "2024-12-31T23:59:59Z",
      );

      // Act
      const { clause, params } = buildWhereClause(query);

      // Assert
      expect(clause).toBe(
        "WHERE q.created_at >= datetime(?) AND q.created_at <= datetime(?)",
      );
      expect(params).toEqual(["2024-01-01T00:00:00Z", "2024-12-31T23:59:59Z"]);
    });

    test("複数条件を組み合わせた場合、AND連結され、パラメータが条件の出現順に並ぶ", () => {
      // Arrange
      const query = new SearchQuizzesQuery(
        "React",
        ["フロントエンド"],
        ["初心者向け"],
        undefined,
        "single_choice",
        "user-1",
      );

      // Act
      const { clause, params } = buildWhereClause(query);

      // Assert
      // 各EXISTS/NOT EXISTSサブクエリ内部にも AND (qt.quiz_id = q.id AND t.name ...)
      // が含まれるため、トップレベルの結合だけを厳密に検証する
      // （前後の文脈で "AND EXISTS" / "AND NOT EXISTS" / "AND q.xxx" と続くかで判別）
      expect(clause.startsWith("WHERE (q.question LIKE")).toBe(true);
      expect(clause).toContain(") AND EXISTS (SELECT 1 FROM QuizTag");
      expect(clause).toContain(") AND NOT EXISTS (SELECT 1 FROM QuizTag");
      expect(clause).toContain(") AND q.answer_type = ? AND q.creator_id = ?");
      expect(params).toEqual([
        "%React%",
        "%React%",
        "%React%",
        "フロントエンド",
        "初心者向け",
        "single_choice",
        "user-1",
      ]);
    });
  });

  describe("buildSearchDataQuery", () => {
    test("WHERE句が無い場合でもORDER BY / LIMIT OFFSETは常に付与される", () => {
      // Arrange
      const query = new SearchQuizzesQuery();

      // Act
      const { sql, params } = buildSearchDataQuery(query);

      // Assert
      // SELECT句のタグ名集約サブクエリは常に独自のWHEREを持つため、
      // トップレベルのフィルタWHERE句の有無は "FROM Quiz q" 〜 "ORDER BY" の
      // 間に絞って検証する
      const afterFromQuiz = sql.split("FROM Quiz q")[1] ?? "";
      const betweenFromAndOrderBy = afterFromQuiz.split("ORDER BY")[0] ?? "";
      expect(betweenFromAndOrderBy.trim()).toBe("");
      expect(sql).toContain("ORDER BY q.created_at ASC, q.id ASC");
      expect(sql).toContain("LIMIT ? OFFSET ?");
      expect(params).toEqual([20, 0]);
    });

    test("sortOrder=descの場合、ORDER BY句が created_at と id の両方でDESCになる", () => {
      // Arrange（同時刻データのページング決定性のためタイブレークキーも方向を揃える）
      const query = new SearchQuizzesQuery(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        "created_date",
        "desc",
      );

      // Act
      const { sql } = buildSearchDataQuery(query);

      // Assert
      expect(sql).toContain("ORDER BY q.created_at DESC, q.id DESC");
    });

    test.each([["relevance"], ["popularity"], ["difficulty"]] as const)(
      "sortBy=%s はMockと同様にcreated_at順にフォールバックする",
      (sortBy) => {
        // Arrange
        const query = new SearchQuizzesQuery(
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          sortBy,
        );

        // Act
        const { sql } = buildSearchDataQuery(query);

        // Assert
        expect(sql).toContain("ORDER BY q.created_at");
      },
    );

    test("limit/offsetはWHEREパラメータの後ろに末尾追加される", () => {
      // Arrange
      const query = new SearchQuizzesQuery(
        undefined,
        ["タグ"],
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        "created_date",
        "asc",
        5,
        10,
      );

      // Act
      const { params } = buildSearchDataQuery(query);

      // Assert
      expect(params).toEqual(["タグ", 5, 10]);
    });

    test("SELECT句にISO 8601変換済みcreated_at/approved_atとタグ名集約列を含む", () => {
      // Arrange
      const query = new SearchQuizzesQuery();

      // Act
      const { sql } = buildSearchDataQuery(query);

      // Assert
      expect(sql).toContain(
        "strftime('%Y-%m-%dT%H:%M:%SZ', q.created_at) AS created_at",
      );
      expect(sql).toContain(
        "strftime('%Y-%m-%dT%H:%M:%SZ', q.approved_at) AS approved_at",
      );
      expect(sql).toContain("char(31)");
      expect(sql).toContain("AS tag_names");
    });
  });

  describe("buildSearchCountQuery", () => {
    test("buildWhereClauseと同じWHERE句を使ってCOUNT(*)を取得する", () => {
      // Arrange
      const query = new SearchQuizzesQuery("React", ["フロントエンド"]);

      // Act
      const { sql, params } = buildSearchCountQuery(query);
      const { clause, params: whereParams } = buildWhereClause(query);

      // Assert
      expect(sql).toBe(`SELECT COUNT(*) as total FROM Quiz q ${clause}`.trim());
      expect(params).toEqual(whereParams);
    });

    test("LIMIT/OFFSETを含まない", () => {
      // Arrange
      const query = new SearchQuizzesQuery();

      // Act
      const { sql } = buildSearchCountQuery(query);

      // Assert
      expect(sql).not.toContain("LIMIT");
      expect(sql).not.toContain("OFFSET");
    });
  });
});
