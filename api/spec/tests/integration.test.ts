/**
 * @file integration.test.ts
 * @description SQLite変換プロセスの統合テスト
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SQLiteConverter } from "../scripts/convert-to-sqlite.js";

// 実際のファイルシステムを使用する統合テスト
describe("SQLite Conversion Integration Tests", () => {
  const testDir = path.join(__dirname, "temp");
  const inputFile = path.join(testDir, "db.raw.sql");
  const outputFile = path.join(testDir, "db.sql");

  beforeEach(() => {
    // テスト用ディレクトリを作成
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterEach(() => {
    // テストファイルをクリーンアップ
    try {
      if (fs.existsSync(inputFile)) fs.unlinkSync(inputFile);
      if (fs.existsSync(outputFile)) fs.unlinkSync(outputFile);
      if (fs.existsSync(testDir)) fs.rmdirSync(testDir);
    } catch (_error) {
      // クリーンアップエラーは無視
    }
  });

  describe("完全な変換プロセス", () => {
    it("should perform complete PostgreSQL to SQLite conversion", async () => {
      // PostgreSQLスタイルのSQLを準備
      const postgresqlSQL = `-- SQL dump generated using DBML
-- Database: PostgreSQL
-- Generated at: 2025-08-09T22:50:03.623Z

CREATE TYPE "AnswerType" AS ENUM (
  'boolean',
  'free_text',
  'single_choice',
  'multiple_choice'
);

CREATE TYPE "QuizStatus" AS ENUM (
  'pending_approval',
  'approved',
  'rejected'
);

CREATE TABLE "UserAccount" (
  "id" "UserAccountId" PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "email" varchar(255),
  "created_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "UserIdentity" (
  "id" "UserId" PRIMARY KEY,
  "anonymous_id" varchar(255) UNIQUE NOT NULL,
  "user_account_id" "UserAccountId",
  "created_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "Quiz" (
  "id" "QuizId" PRIMARY KEY,
  "question" text NOT NULL,
  "answer_type" "AnswerType" NOT NULL,
  "solution_id" "SolutionId" NOT NULL,
  "explanation" text,
  "status" "QuizStatus" NOT NULL DEFAULT 'pending_approval',
  "creator_id" "UserId" NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "approved_at" timestamp
);

CREATE TABLE "Deck" (
  "id" "DeckId" PRIMARY KEY,
  "name" varchar(200) NOT NULL,
  "description" text,
  "quiz_ids" "QuizId[]" NOT NULL,
  "creator_id" "UserId" NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "last_modified_at" timestamp NOT NULL DEFAULT (now())
);

COMMENT ON TABLE "Quiz" IS 'Quiz entity with polymorphic solution design';
COMMENT ON COLUMN "Quiz"."question" IS 'Max 500 characters';

ALTER TABLE "UserIdentity" ADD FOREIGN KEY ("user_account_id") REFERENCES "UserAccount" ("id");
ALTER TABLE "Quiz" ADD FOREIGN KEY ("creator_id") REFERENCES "UserIdentity" ("id");
ALTER TABLE "Deck" ADD FOREIGN KEY ("creator_id") REFERENCES "UserIdentity" ("id");`;

      // 入力ファイルを作成
      fs.writeFileSync(inputFile, postgresqlSQL, "utf-8");

      // カスタムコンバーターを作成（テスト用パスを使用）
      class TestSQLiteConverter extends SQLiteConverter {
        constructor() {
          super();
          this.inputFile = inputFile;
          this.outputFile = outputFile;
        }
      }

      const converter = new TestSQLiteConverter();

      // コンソールログをモック
      const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

      // 変換を実行
      await converter.convert();

      // 出力ファイルが作成されたことを確認
      expect(fs.existsSync(outputFile)).toBe(true);

      // 変換結果を読み取り
      const result = fs.readFileSync(outputFile, "utf-8");

      // 基本的な変換が行われたことを確認
      expect(result).toContain("PRAGMA foreign_keys = ON;");
      expect(result).not.toContain("CREATE TYPE");
      expect(result).not.toContain("AS ENUM");
      expect(result).not.toContain("COMMENT ON");

      // カスタム型が変換されたことを確認
      expect(result).not.toContain('"UserAccountId"');
      expect(result).not.toContain('"UserId"');
      expect(result).not.toContain('"QuizId"');
      expect(result).toContain("INTEGER PRIMARY KEY AUTOINCREMENT");

      // 関数が変換されたことを確認
      expect(result).not.toContain("now()");
      expect(result).toContain("CURRENT_TIMESTAMP");

      // CHECK制約が追加されたことを確認
      expect(result).toContain(
        "CHECK (\"answer_type\" IN ('boolean', 'free_text', 'single_choice', 'multiple_choice'))",
      );
      expect(result).toContain(
        "CHECK (\"status\" IN ('pending_approval', 'approved', 'rejected'))",
      );

      // 配列型が変換されたことを確認
      expect(result).not.toContain("QuizId[]");
      // 配列型がTEXTに変換されることを確認（引用符の有無は問わない）
      expect(
        result.includes('"quiz_ids" TEXT') ||
          result.includes('"quiz_ids" "TEXT"'),
      ).toBe(true);

      // 外部キー制約が追加されたことを確認
      expect(result).toContain(
        'FOREIGN KEY ("user_account_id") REFERENCES "UserAccount" ("id")',
      );
      expect(result).toContain(
        'FOREIGN KEY ("creator_id") REFERENCES "UserIdentity" ("id")',
      );

      // ALTER TABLE文が削除されたことを確認
      expect(result).not.toContain("ALTER TABLE");

      consoleSpy.mockRestore();
    });

    it("should handle minimal SQL input", async () => {
      const minimalSQL = `CREATE TABLE "test" (
  "id" INTEGER PRIMARY KEY,
  "name" varchar(255)
);`;

      fs.writeFileSync(inputFile, minimalSQL, "utf-8");

      class TestSQLiteConverter extends SQLiteConverter {
        constructor() {
          super();
          this.inputFile = inputFile;
          this.outputFile = outputFile;
        }
      }

      const converter = new TestSQLiteConverter();
      const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

      await converter.convert();

      expect(fs.existsSync(outputFile)).toBe(true);
      const result = fs.readFileSync(outputFile, "utf-8");

      expect(result).toContain("PRAGMA foreign_keys = ON;");
      expect(result).toContain("INTEGER PRIMARY KEY AUTOINCREMENT");

      consoleSpy.mockRestore();
    });

    it("should handle complex ENUM scenarios", async () => {
      const complexSQL = `CREATE TYPE "ComplexEnum" AS ENUM (
  'value_with_underscore',
  'VALUE_UPPERCASE',
  'mixed-Case_Value',
  'simple'
);

CREATE TABLE "test_table" (
  "id" INTEGER PRIMARY KEY,
  "complex_field" "ComplexEnum" NOT NULL DEFAULT 'simple',
  "another_field" "ComplexEnum" 
);`;

      fs.writeFileSync(inputFile, complexSQL, "utf-8");

      class TestSQLiteConverter extends SQLiteConverter {
        constructor() {
          super();
          this.inputFile = inputFile;
          this.outputFile = outputFile;
        }
      }

      // ComplexEnumを一時的にマッピングに追加
      const { enumMappings } = await import("../scripts/sqlite-mappings.js");
      const originalMappings = [...enumMappings];
      enumMappings.push({
        name: "ComplexEnum",
        values: [
          "value_with_underscore",
          "VALUE_UPPERCASE",
          "mixed-Case_Value",
          "simple",
        ],
      });

      try {
        const converter = new TestSQLiteConverter();
        const consoleSpy = vi
          .spyOn(console, "log")
          .mockImplementation(() => {});

        await converter.convert();

        const result = fs.readFileSync(outputFile, "utf-8");

        expect(result).not.toContain("CREATE TYPE");
        expect(result).toContain('CHECK ("complex_field" IN (');
        expect(result).toContain("'value_with_underscore'");
        expect(result).toContain("'VALUE_UPPERCASE'");
        expect(result).toContain("'mixed-Case_Value'");
        expect(result).toContain("'simple'");

        consoleSpy.mockRestore();
      } finally {
        // 元のマッピングに戻す
        enumMappings.length = 0;
        enumMappings.push(...originalMappings);
      }
    });
  });

  describe("実際のDBMLファイルとの統合", () => {
    it("should work with actual generated SQL from DBML", async () => {
      // 実際のdb.raw.sqlファイルが存在する場合のテスト
      const actualDbRawPath = path.join(__dirname, "../generated/db.raw.sql");

      if (fs.existsSync(actualDbRawPath)) {
        const actualSQL = fs.readFileSync(actualDbRawPath, "utf-8");
        fs.writeFileSync(inputFile, actualSQL, "utf-8");

        class TestSQLiteConverter extends SQLiteConverter {
          constructor() {
            super();
            this.inputFile = inputFile;
            this.outputFile = outputFile;
          }
        }

        const converter = new TestSQLiteConverter();
        const consoleSpy = vi
          .spyOn(console, "log")
          .mockImplementation(() => {});

        await converter.convert();

        expect(fs.existsSync(outputFile)).toBe(true);
        const result = fs.readFileSync(outputFile, "utf-8");

        // 基本的な変換要件を確認
        expect(result).toContain("PRAGMA foreign_keys = ON;");
        expect(result).not.toContain("CREATE TYPE");
        expect(result).toContain("INTEGER PRIMARY KEY AUTOINCREMENT");

        // SQLiteとして有効な構文であることを基本的にチェック
        expect(result).not.toContain("AS ENUM");
        expect(result).not.toContain("COMMENT ON");

        consoleSpy.mockRestore();
      } else {
        // 実際のファイルが存在しない場合はテストをスキップ
        console.log(
          "Skipping actual DBML test: generated/db.raw.sql not found",
        );
      }
    });
  });

  describe("エラーハンドリング統合テスト", () => {
    it("should handle missing input file gracefully", async () => {
      class TestSQLiteConverter extends SQLiteConverter {
        constructor() {
          super();
          this.inputFile = path.join(testDir, "nonexistent.sql");
          this.outputFile = outputFile;
        }
      }

      const converter = new TestSQLiteConverter();
      const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

      await expect(converter.convert()).rejects.toThrow();

      consoleSpy.mockRestore();
    });

    it("should handle malformed SQL gracefully", async () => {
      const malformedSQL = `CREATE TABLE "incomplete" (
  "id" INTEGER PRIMARY KEY,
  "name" varchar(255)
  -- Missing closing parenthesis and semicolon`;

      fs.writeFileSync(inputFile, malformedSQL, "utf-8");

      class TestSQLiteConverter extends SQLiteConverter {
        constructor() {
          super();
          this.inputFile = inputFile;
          this.outputFile = outputFile;
        }
      }

      const converter = new TestSQLiteConverter();
      const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

      // 構文エラーがあっても変換プロセス自体は完了すべき
      await expect(converter.convert()).resolves.not.toThrow();

      consoleSpy.mockRestore();
    });
  });
});
