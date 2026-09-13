import { baseUrlOf, bddTargets } from "./tests/bdd-targets";
import { createBddConfig } from "./vitest.bdd.shared";

/**
 * BDDテスト（Mockターゲット: `wrangler dev --env dev-mock`）
 */
export default createBddConfig({
  // BDDテストファイルパターン（既存のPactumJSテスト）
  include: ["tests/features/**/*.spec.ts"],
  globalSetup: ["./tests/global-setup.ts"],
  baseUrl: baseUrlOf(bddTargets.mock),
  reportsDir: "reports/bdd",
});
