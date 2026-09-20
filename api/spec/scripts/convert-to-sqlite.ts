#!/usr/bin/env node

/**
 * DBML-to-SQLite変換スクリプト
 * PostgreSQL形式のSQLをSQLite形式に変換します
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  arrayTypePattern,
  enumMappings,
  functionMappings,
  generateCheckConstraint,
  typeMappings,
} from "./sqlite-mappings.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class SQLiteConverter {
  protected inputFile: string;
  protected outputFile: string;
  private content: string = "";

  constructor() {
    this.inputFile = path.join(__dirname, "../generated/db.raw.sql");
    this.outputFile = path.join(__dirname, "../generated/db.sql");
  }

  /**
   * 変換処理を実行
   */
  public async convert(): Promise<void> {
    try {
      console.log("🔄 Starting DBML-to-SQLite conversion...");

      // 入力ファイルを読み込み
      this.loadInputFile();

      // 各変換処理を実行
      this.addPragma();
      this.removeCreateTypeStatements();
      this.convertCustomTypes();
      this.convertFunctions();
      this.convertArrayTypes();
      this.removeComments();
      this.addEnumCheckConstraints();
      this.fixForeignKeyConstraints();
      this.addAutoIncrement();
      this.addForeignKeyConstraints();

      // 結果を出力ファイルに保存
      this.saveOutputFile();

      console.log("✅ SQLite conversion completed successfully!");
      console.log(`📁 Output: ${this.outputFile}`);
    } catch (error) {
      console.error("❌ SQLite conversion failed:", error);
      process.exit(1);
    }
  }

  /**
   * 入力ファイルを読み込み
   */
  private loadInputFile(): void {
    if (!fs.existsSync(this.inputFile)) {
      throw new Error(`Input file not found: ${this.inputFile}`);
    }

    this.content = fs.readFileSync(this.inputFile, "utf-8");
    console.log(`📖 Loaded input file: ${this.inputFile}`);
  }

  /**
   * PRAGMA foreign_keys = ON; を追加
   */
  private addPragma(): void {
    if (!this.content.includes("PRAGMA foreign_keys = ON;")) {
      this.content = `PRAGMA foreign_keys = ON;\n\n${this.content}`;
    }
    console.log("✓ Added PRAGMA foreign_keys");
  }

  /**
   * CREATE TYPE文を削除
   */
  private removeCreateTypeStatements(): void {
    const createTypePattern =
      /CREATE TYPE\s+"?\w+"?\s+AS\s+ENUM\s*\([^)]+\);?\s*/gi;
    const matches = this.content.match(createTypePattern);

    if (matches) {
      this.content = this.content.replace(createTypePattern, "");
      console.log(`✓ Removed ${matches.length} CREATE TYPE statements`);
    }
  }

  /**
   * カスタム型を標準SQLite型に変換
   */
  private convertCustomTypes(): void {
    let conversionCount = 0;

    typeMappings.forEach((mapping) => {
      const pattern = new RegExp(`"${mapping.dbmlType}"`, "g");
      const matches = this.content.match(pattern);

      if (matches) {
        this.content = this.content.replace(pattern, mapping.sqliteType);
        conversionCount += matches.length;
      }
    });

    console.log(`✓ Converted ${conversionCount} custom type references`);
  }

  /**
   * PostgreSQL関数をSQLite関数に変換
   */
  private convertFunctions(): void {
    let conversionCount = 0;

    functionMappings.forEach((mapping) => {
      const pattern = new RegExp(
        mapping.postgresFunction.replace(/[()]/g, "\\$&"),
        "gi",
      );
      const matches = this.content.match(pattern);

      if (matches) {
        this.content = this.content.replace(pattern, mapping.sqliteFunction);
        conversionCount += matches.length;
      }
    });

    console.log(`✓ Converted ${conversionCount} function references`);
  }

  /**
   * 配列型をJSON TEXT型に変換
   */
  private convertArrayTypes(): void {
    const matches = this.content.match(arrayTypePattern);

    if (matches) {
      this.content = this.content.replace(arrayTypePattern, "TEXT");
      console.log(`✓ Converted ${matches.length} array types to TEXT`);
    }
  }

  /**
   * COMMENT文を削除
   */
  private removeComments(): void {
    const commentPattern = /COMMENT\s+ON\s+(TABLE|COLUMN)\s+[^;]+;?\s*/gi;
    const matches = this.content.match(commentPattern);

    if (matches) {
      this.content = this.content.replace(commentPattern, "");
      console.log(`✓ Removed ${matches.length} COMMENT statements`);
    }
  }

  /**
   * ENUM型のテーブル定義にCHECK制約を追加
   */
  private addEnumCheckConstraints(): void {
    let constraintCount = 0;

    enumMappings.forEach((enumMapping) => {
      // ENUM型を参照している列を検索（引用符付きも対応）
      const columnPattern = new RegExp(
        `"(\\w+)"\\s+"?${enumMapping.name}"?(\\s+NOT\\s+NULL)?(?:\\s+DEFAULT\\s+'([^']+)')?`,
        "gi",
      );

      this.content = this.content.replace(
        columnPattern,
        (_match, columnName, notNull, defaultValue) => {
          const checkConstraint = generateCheckConstraint(
            columnName,
            enumMapping.name,
          );
          const defaultClause = defaultValue
            ? ` DEFAULT '${defaultValue}'`
            : "";
          const notNullClause = notNull ? " NOT NULL" : "";

          constraintCount++;
          return `"${columnName}" TEXT${notNullClause}${defaultClause} ${checkConstraint}`;
        },
      );
    });

    console.log(`✓ Added ${constraintCount} CHECK constraints for ENUMs`);
  }

  /**
   * 外部キー制約を修正
   */
  private fixForeignKeyConstraints(): void {
    // ALTER TABLE ... ADD FOREIGN KEY 文をテーブル定義内に移動
    const alterFkPattern =
      /ALTER TABLE "(\w+)" ADD FOREIGN KEY \("(\w+)"\) REFERENCES "(\w+)" \("(\w+)"\);?\s*/gi;
    const alterMatches = this.content.match(alterFkPattern);

    if (alterMatches) {
      // ALTER TABLE文を削除
      this.content = this.content.replace(alterFkPattern, "");
      console.log(
        `✓ Cleaned up ${alterMatches.length} ALTER TABLE foreign key statements`,
      );
    }
  }

  /**
   * PRIMARY KEYにAUTOINCREMENTを追加
   */
  private addAutoIncrement(): void {
    // INTEGER PRIMARY KEY を INTEGER PRIMARY KEY AUTOINCREMENT に変更
    const pkPattern = /"id"\s+INTEGER\s+PRIMARY\s+KEY(?!\s+AUTOINCREMENT)/gi;
    const matches = this.content.match(pkPattern);

    if (matches) {
      this.content = this.content.replace(
        pkPattern,
        '"id" INTEGER PRIMARY KEY AUTOINCREMENT',
      );
      console.log(`✓ Added AUTOINCREMENT to ${matches.length} primary keys`);
    }
  }

  /**
   * 外部キー制約を追加
   */
  private addForeignKeyConstraints(): void {
    const foreignKeys = [
      {
        table: "UserIdentity",
        column: "user_account_id",
        refTable: "UserAccount",
        refColumn: "id",
      },
      {
        table: "Quiz",
        column: "creator_id",
        refTable: "UserIdentity",
        refColumn: "id",
      },
      {
        table: "Choice",
        column: "quiz_id",
        refTable: "Quiz",
        refColumn: "id",
      },
      {
        table: "Tag",
        column: "created_by",
        refTable: "UserIdentity",
        refColumn: "id",
      },
      {
        table: "TagRelation",
        column: "parent_tag_id",
        refTable: "Tag",
        refColumn: "id",
      },
      {
        table: "TagRelation",
        column: "child_tag_id",
        refTable: "Tag",
        refColumn: "id",
      },
      {
        table: "QuizTag",
        column: "quiz_id",
        refTable: "Quiz",
        refColumn: "id",
      },
      { table: "QuizTag", column: "tag_id", refTable: "Tag", refColumn: "id" },
      {
        table: "Deck",
        column: "creator_id",
        refTable: "UserIdentity",
        refColumn: "id",
      },
      {
        table: "QuizSession",
        column: "deck_id",
        refTable: "Deck",
        refColumn: "id",
      },
      {
        table: "QuizSession",
        column: "creator_id",
        refTable: "UserIdentity",
        refColumn: "id",
      },
      {
        table: "SingleChoiceAnswer",
        column: "selected_choice_id",
        refTable: "Choice",
        refColumn: "id",
      },
      {
        table: "Attempt",
        column: "quiz_id",
        refTable: "Quiz",
        refColumn: "id",
      },
      {
        table: "Attempt",
        column: "session_id",
        refTable: "QuizSession",
        refColumn: "id",
      },
      {
        table: "Attempt",
        column: "user_id",
        refTable: "UserIdentity",
        refColumn: "id",
      },
    ];

    let addedCount = 0;
    foreignKeys.forEach((fk) => {
      const tablePattern = new RegExp(
        `(CREATE TABLE "${fk.table}"[^;]+)(\\);)`,
        "gi",
      );
      this.content = this.content.replace(
        tablePattern,
        (match, tableDef, closing) => {
          // 既に外部キー制約があるかチェック
          if (tableDef.includes(`FOREIGN KEY ("${fk.column}")`)) {
            return match;
          }

          addedCount++;
          return `${tableDef},\n  FOREIGN KEY ("${fk.column}") REFERENCES "${fk.refTable}" ("${fk.refColumn}")${closing}`;
        },
      );
    });

    console.log(`✓ Added ${addedCount} foreign key constraints`);
  }

  /**
   * 出力ファイルに保存
   */
  private saveOutputFile(): void {
    // 出力ディレクトリが存在しない場合は作成
    const outputDir = path.dirname(this.outputFile);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(this.outputFile, this.content, "utf-8");
    console.log(`💾 Saved output file: ${this.outputFile}`);
  }
}

// スクリプトが直接実行された場合の処理
if (import.meta.url === `file://${process.argv[1]}`) {
  const converter = new SQLiteConverter();
  converter.convert().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
}

export { SQLiteConverter };
