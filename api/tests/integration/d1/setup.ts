import { applyD1Migrations, env } from "cloudflare:test";
import { seedDatabase } from "./seed-sql";

/**
 * D1統合テストの `setupFiles`
 *
 * `setupFiles` はworkerd内で実行されるため、`cloudflare:test` の
 * `applyD1Migrations` でマイグレーションを適用し、続けて開発用シードを
 * 投入する。`isolatedStorage`（既定で有効）により、ここで作った状態は
 * 各テストの基点として保持され、個々のテストの書き込みはテストごとに
 * 巻き戻る。
 */
await applyD1Migrations(env.DB, env.TEST_MIGRATIONS);
await seedDatabase(env.DB, env.SEED_SQL);
