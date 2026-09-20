import { baseUrlOf, bddTargets } from "./tests/bdd-targets";
import { createBddConfig } from "./vitest.bdd.shared";

/**
 * BDDテスト（Mockターゲット: `wrangler dev --env dev-mock`）
 */
export default createBddConfig({
  // BDDテストファイルパターン（既存のPactumJSテスト）
  //
  // `tests/features/d1/` はローカルD1のシード済みデータに依存するため
  // Mockターゲットの対象から除外する（非再帰globにして自動的に外す）。
  // D1ターゲットでのみ実行する（`vitest.bdd.d1.config.ts` 参照）。
  include: ["tests/features/*.spec.ts"],
  globalSetup: ["./tests/global-setup.ts"],
  baseUrl: baseUrlOf(bddTargets.mock),
  reportsDir: "reports/bdd",
});
