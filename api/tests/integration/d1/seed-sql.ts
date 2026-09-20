/**
 * 開発用シードSQL（`migrations/dev/seed.sql`）をD1へ流し込むヘルパー
 *
 * `D1Database.exec()` は複数ステートメントの一括実行を公式にはサポートせず
 * 挙動が不安定なため、行コメント（`-- ...`）を取り除いたうえで `;` 区切りで
 * ステートメントへ分割し、`db.batch()` にまとめて渡す。
 *
 * 注意: この分割はSQL文字列リテラル内に `--` や `;` が含まれないことを
 * 前提にした簡易実装（seed.sql に対して確認済み、エスケープされた引用符も
 * 含まれない）。汎用SQLパーサではないため、他のSQLファイルへの転用は
 * 慎重に行うこと。
 */

/** seed.sql本文をD1へ渡せるステートメント単位の配列に分割する */
export function splitSeedStatements(sql: string): string[] {
  return sql
    .split("\n")
    .map((line) => {
      const commentIndex = line.indexOf("--");
      return commentIndex === -1 ? line : line.slice(0, commentIndex);
    })
    .join("\n")
    .split(";")
    .map((statement) => statement.trim())
    .filter((statement) => statement.length > 0);
}

/** seed.sql本文をD1に対して1つのbatchとして実行する */
export async function seedDatabase(db: D1Database, sql: string): Promise<void> {
  const statements = splitSeedStatements(sql).map((statement) =>
    db.prepare(statement),
  );
  await db.batch(statements);
}
