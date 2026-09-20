import { readFileSync } from "node:fs";
import {
  defineWorkersConfig,
  readD1Migrations,
} from "@cloudflare/vitest-pool-workers/config";

/**
 * D1リポジトリ統合テスト（workerd内で実D1を叩く）
 *
 * `vitest.bdd.d1.config.ts` は `wrangler dev` を子プロセスで起動しHTTP経由で
 * 実D1を叩くブラックボックスE2Eだが、`POST /quizzes` はIdentity解決
 * （Phase 4-5）が未完了のため本番同様にFOREIGN KEY制約で失敗し、HTTP経由では
 * `D1QuizRepository.create/delete` を通せない（ADR-0030参照）。
 *
 * この設定は `@cloudflare/vitest-pool-workers` でworkerdをin-processで起動し、
 * `D1QuizRepository` を直接インスタンス化してテストする。HTTPもミドルウェアも
 * 経由しないため、有効な `UserIdentity.id` をテスト内でSQLから直接用意でき、
 * create/findById/delete/batchの原子性まで実機で検証できる。
 *
 * バージョン制約: 本リポジトリは vitest ^3.2.4。
 * `@cloudflare/vitest-pool-workers` は 0.13以降が peer `vitest: ^4.1.0` を
 * 要求するため使えず、`vitest: "2.0.x - 3.2.x"` に対応する 0.12系（0.12.21）を
 * 使用している。
 */
export default defineWorkersConfig(async () => {
  const migrations = await readD1Migrations("migrations/quiz-db");
  const seedSql = readFileSync("migrations/dev/seed.sql", "utf-8");

  return {
    test: {
      include: ["tests/integration/d1/**/*.spec.ts"],
      globals: true,
      setupFiles: ["./tests/integration/d1/setup.ts"],
      testTimeout: 30000,
      reporters: ["verbose"],
      poolOptions: {
        workers: {
          // wrangler.jsonc の env.dev は本番と同じ database_id を指しているため
          // （ADR-0030 リスク表参照）、テスト設定からは一切参照せずminiflareの
          // binding定義だけで完結させる。
          miniflare: {
            compatibilityDate: "2025-07-31",
            // wrangler.jsonc に compatibility_flags は無いが、pool-workers の
            // Node.js互換レイヤーを使うために明示する。
            compatibilityFlags: ["nodejs_compat"],
            d1Databases: ["DB"],
            bindings: {
              TEST_MIGRATIONS: migrations,
              SEED_SQL: seedSql,
            },
          },
        },
      },
    },
  };
});
