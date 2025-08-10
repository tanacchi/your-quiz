/**
 * @file convert-to-sqlite.test.ts
 * @description SQLite変換スクリプトのユニットテスト
 */

import * as fs from "node:fs";
import {
  beforeEach,
  describe,
  expect,
  it,
  type MockedFunction,
  vi,
} from "vitest";
import { SQLiteConverter } from "../scripts/convert-to-sqlite.js";

// process.exitをモック
const mockExit = vi.spyOn(process, "exit").mockImplementation(() => {
  throw new Error("process.exit called");
});

// FSモジュールのモック
vi.mock("fs");
const mockFs = fs as typeof fs & {
  existsSync: MockedFunction<typeof fs.existsSync>;
  readFileSync: MockedFunction<typeof fs.readFileSync>;
  writeFileSync: MockedFunction<typeof fs.writeFileSync>;
  mkdirSync: MockedFunction<typeof fs.mkdirSync>;
};

describe("SQLiteConverter", () => {
  let converter: SQLiteConverter;
  beforeEach(() => {
    // コンソールログをスパイ
    vi.spyOn(console, "log").mockImplementation(() => {});

    // FSモックのリセット
    vi.clearAllMocks();
    mockFs.existsSync.mockReturnValue(true);
    mockFs.mkdirSync.mockImplementation(() => "");
    mockFs.writeFileSync.mockImplementation(() => {});
    mockExit.mockClear();

    converter = new SQLiteConverter();
  });

  describe("完全な変換プロセス", () => {
    it("should perform complete SQL conversion", async () => {
      const input = `-- SQL dump generated using DBML
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

CREATE TABLE "Quiz" (
  "id" "QuizId" PRIMARY KEY,
  "question" text NOT NULL,
  "answer_type" "AnswerType" NOT NULL,
  "status" "QuizStatus" NOT NULL DEFAULT 'pending_approval',
  "creator_id" "UserId" NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "Deck" (
  "quiz_ids" "QuizId[]" NOT NULL
);

COMMENT ON TABLE "Quiz" IS 'Quiz entity table';

ALTER TABLE "Quiz" ADD FOREIGN KEY ("creator_id") REFERENCES "UserIdentity" ("id");`;

      mockFs.readFileSync.mockReturnValue(input);

      await converter.convert();

      const writeCall = mockFs.writeFileSync.mock.calls[0];
      expect(writeCall).toBeDefined();
      const output = writeCall?.[1] as string;

      // 基本的な変換確認
      expect(output).toContain("PRAGMA foreign_keys = ON;");
      expect(output).not.toContain("CREATE TYPE");
      expect(output).not.toContain("AS ENUM");
      expect(output).not.toContain("COMMENT ON");
      expect(output).not.toContain("ALTER TABLE");

      // カスタム型変換確認
      expect(output).not.toContain('"QuizId"');
      expect(output).not.toContain('"UserId"');
      expect(output).toContain("INTEGER PRIMARY KEY AUTOINCREMENT");

      // 関数変換確認
      expect(output).not.toContain("now()");
      expect(output).toContain("CURRENT_TIMESTAMP");

      // CHECK制約確認
      expect(output).toContain(
        "CHECK (\"answer_type\" IN ('boolean', 'free_text', 'single_choice', 'multiple_choice'))",
      );
      expect(output).toContain(
        "CHECK (\"status\" IN ('pending_approval', 'approved', 'rejected'))",
      );

      // 配列型変換確認
      expect(output).not.toContain("QuizId[]");
      expect(output).toContain("TEXT");
    });
  });

  describe("個別変換機能", () => {
    it("should convert custom types", async () => {
      const input = `CREATE TABLE "Test" (
  "id" "QuizId" PRIMARY KEY,
  "user_id" "UserId" NOT NULL,
  "created_at" timestamp DEFAULT (now())
);`;

      mockFs.readFileSync.mockReturnValue(input);

      await converter.convert();

      const output = mockFs.writeFileSync.mock.calls[0]?.[1] as string;
      expect(output).not.toContain('"QuizId"');
      expect(output).not.toContain('"UserId"');
      expect(output).toContain("INTEGER");
      expect(output).toContain("CURRENT_TIMESTAMP");
    });

    it("should add CHECK constraints for ENUMs", async () => {
      const input = `CREATE TABLE "Test" (
  "answer_type" "AnswerType" NOT NULL,
  "status" "QuizStatus" DEFAULT 'pending_approval'
);`;

      mockFs.readFileSync.mockReturnValue(input);

      await converter.convert();

      const output = mockFs.writeFileSync.mock.calls[0]?.[1] as string;
      expect(output).toContain('CHECK ("answer_type" IN');
      expect(output).toContain("'boolean'");
      expect(output).toContain('CHECK ("status" IN');
      expect(output).toContain("'pending_approval'");
    });

    it("should convert array types to TEXT", async () => {
      const input = `CREATE TABLE "Deck" (
  "quiz_ids" "QuizId[]" NOT NULL,
  "tag_ids" "TagId[]"
);`;

      mockFs.readFileSync.mockReturnValue(input);

      await converter.convert();

      const output = mockFs.writeFileSync.mock.calls[0]?.[1] as string;
      expect(output).not.toContain("QuizId[]");
      expect(output).not.toContain("TagId[]");
      expect(output).toContain("TEXT");
    });

    it("should add AUTOINCREMENT to primary keys", async () => {
      const input = `CREATE TABLE "Test" (
  "id" INTEGER PRIMARY KEY,
  "name" varchar(255)
);`;

      mockFs.readFileSync.mockReturnValue(input);

      await converter.convert();

      const output = mockFs.writeFileSync.mock.calls[0]?.[1] as string;
      expect(output).toContain("INTEGER PRIMARY KEY AUTOINCREMENT");
      // AUTOINCREMENTがない場合のパターンをより具体的にチェック
      expect(output).not.toContain("INTEGER PRIMARY KEY,");
      expect(output).not.toContain("INTEGER PRIMARY KEY\n");
    });

    it("should add foreign key constraints", async () => {
      const input = `CREATE TABLE "Quiz" (
  "id" INTEGER PRIMARY KEY,
  "creator_id" INTEGER NOT NULL
);`;

      mockFs.readFileSync.mockReturnValue(input);

      await converter.convert();

      const output = mockFs.writeFileSync.mock.calls[0]?.[1] as string;
      expect(output).toContain(
        'FOREIGN KEY ("creator_id") REFERENCES "UserIdentity" ("id")',
      );
    });
  });

  describe("エラーハンドリング", () => {
    it("should handle missing input file", async () => {
      mockFs.existsSync.mockReturnValue(false);

      await expect(converter.convert()).rejects.toThrow(
        /Input file not found|process\.exit called/,
      );
    });

    it("should handle write errors", async () => {
      const input = "CREATE TABLE test (id INTEGER);";
      mockFs.readFileSync.mockReturnValue(input);
      mockFs.writeFileSync.mockImplementation(() => {
        throw new Error("Write permission denied");
      });

      await expect(converter.convert()).rejects.toThrow(
        /Write permission denied|process\.exit called/,
      );
    });
  });

  describe("PRAGMA処理", () => {
    it("should add PRAGMA if not exists", async () => {
      const input = "CREATE TABLE test (id INTEGER);";
      mockFs.readFileSync.mockReturnValue(input);

      await converter.convert();

      const output = mockFs.writeFileSync.mock.calls[0]?.[1] as string;
      expect(output).toMatch(/^PRAGMA foreign_keys = ON;/);
    });

    it("should not duplicate PRAGMA if exists", async () => {
      const input = `PRAGMA foreign_keys = ON;
CREATE TABLE test (id INTEGER);`;
      mockFs.readFileSync.mockReturnValue(input);

      await converter.convert();

      const output = mockFs.writeFileSync.mock.calls[0]?.[1] as string;
      const pragmaCount = (output.match(/PRAGMA foreign_keys = ON;/g) || [])
        .length;
      expect(pragmaCount).toBe(1);
    });
  });
});
