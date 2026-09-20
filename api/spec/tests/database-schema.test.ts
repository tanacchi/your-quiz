/**
 * @file database-schema.test.ts
 * @description database.dbml から生成される SQLite スキーマの構造を検証する。
 *
 * D1 のマイグレーション（api/migrations/quiz-db）と database.dbml は手で
 * 同期しているため、スキーマの決定（ADR）が DBML と生成結果に反映されて
 * いることを確認する。
 */

import { execFileSync } from "node:child_process";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { SQLiteConverter } from "../scripts/convert-to-sqlite.js";

const specRoot = path.resolve(__dirname, "..");

let rawSql: string;
let sqliteSql: string;
let outDir: string;

/**
 * 変換スクリプトの入出力先を一時ディレクトリに向ける
 */
class TempDirSQLiteConverter extends SQLiteConverter {
  constructor(inputFile: string, outputFile: string) {
    super();
    this.inputFile = inputFile;
    this.outputFile = outputFile;
  }
}

beforeAll(async () => {
  outDir = fs.mkdtempSync(path.join(os.tmpdir(), "dbml-schema-test-"));
  const rawFile = path.join(outDir, "db.raw.sql");
  const sqliteFile = path.join(outDir, "db.sql");

  // 生成物(generated/)はgitignore対象でbuild実行順序に依存するため、
  // テスト自身が gen-database-schema と同じ手順で独立に生成して検証する。
  execFileSync(
    "dbml2sql",
    ["database.dbml", "--dialect", "sqlite", "-o", rawFile],
    { cwd: specRoot, stdio: "pipe" },
  );

  const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  try {
    await new TempDirSQLiteConverter(rawFile, sqliteFile).convert();
  } finally {
    logSpy.mockRestore();
  }

  rawSql = fs.readFileSync(rawFile, "utf-8");
  sqliteSql = fs.readFileSync(sqliteFile, "utf-8");
});

afterAll(() => {
  fs.rmSync(outDir, { recursive: true, force: true });
});

/**
 * SQL から指定テーブルの CREATE TABLE の本体（列と制約）を取り出す
 */
function tableBodyOf(sql: string, table: string): string {
  const match = sql.match(
    new RegExp(`CREATE TABLE "${table}" \\(\\n([\\s\\S]*?)\\);`),
  );
  return match?.[1] ?? "";
}

describe("外部キー", () => {
  it("DBML の ref はすべて変換後の SQLite スキーマに外部キーとして残る", () => {
    // 変換スクリプトは dbml2sql が出力した ALTER TABLE の外部キーをすべて
    // 取り除き、スクリプト内の一覧からテーブル定義に張り直す。一覧に無い ref
    // は生成物から黙って消えるため、DBML の ref と突き合わせる
    const refs = [
      ...rawSql.matchAll(
        /ALTER TABLE "(\w+)" ADD FOREIGN KEY \("(\w+)"\) REFERENCES "(\w+)" \("(\w+)"\);/g,
      ),
    ];
    expect(refs.length).toBeGreaterThan(0);

    const missing = refs
      .filter(
        ([, table, column, refTable, refColumn]) =>
          !tableBodyOf(sqliteSql, table ?? "").includes(
            `FOREIGN KEY ("${column}") REFERENCES "${refTable}" ("${refColumn}")`,
          ),
      )
      .map(([statement]) => statement);
    expect(missing).toEqual([]);
  });
});

describe("Choice テーブル（ADR-0030）", () => {
  it("選択肢が属するクイズを quiz_id で参照する", () => {
    // 単一選択と複数選択の solution は別々に採番されるため、solution_id
    // だけでは選択肢の持ち主のクイズが決まらない
    expect(tableBodyOf(sqliteSql, "Choice")).toContain(
      'FOREIGN KEY ("quiz_id") REFERENCES "Quiz" ("id")',
    );
  });

  it("quiz_id は NULL を許す", () => {
    // 外部キー付きの列を ALTER TABLE で後から足す 0003 マイグレーションは
    // NOT NULL にできず、補完できない既存行も残るため、DBML も実スキーマに
    // 合わせる（NOT NULL は作成処理で保証する）
    const quizIdColumn = tableBodyOf(sqliteSql, "Choice")
      .split("\n")
      .map((line) => line.trim())
      .find((line) => line.startsWith('"quiz_id"'));
    expect(quizIdColumn).toBeDefined();
    expect(quizIdColumn).not.toContain("NOT NULL");
  });
});
