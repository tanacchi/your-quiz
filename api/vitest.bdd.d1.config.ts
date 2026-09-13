import { baseUrlOf, bddTargets } from "./tests/bdd-targets";
import { createBddConfig } from "./vitest.bdd.shared";

/**
 * BDDテスト（D1ターゲット: `wrangler dev --env dev` + ローカルD1）
 *
 * Mockのシードデータや MockSearchRepository に依存しないスペックだけを
 * 対象にする。
 */
export default createBddConfig({
  include: ["tests/features/deck-management.spec.ts"],
  globalSetup: ["./tests/global-setup.d1.ts"],
  baseUrl: baseUrlOf(bddTargets.d1),
  reportsDir: "reports/bdd-d1",
});
