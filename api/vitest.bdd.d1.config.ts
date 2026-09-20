import { baseUrlOf, bddTargets } from "./tests/bdd-targets";
import { createBddConfig } from "./vitest.bdd.shared";

/**
 * BDDテスト（D1ターゲット: `wrangler dev --env dev` + ローカルD1）
 *
 * Mockのシードデータや MockSearchRepository に依存しないスペック
 * （`deck-management.spec.ts`）に加え、`tests/features/d1/` 配下の
 * D1シード専用スペックを対象にする。
 *
 * `tests/features/d1/` を対象にしているのは quiz-management の Quiz 読み取り
 * （GET）経路。Quiz の作成・更新・削除・承認は Identity 解決（Phase 4-5、
 * ADR-0030）が無いとHTTP経由でFK違反になるため、ここではカバーしていない
 * （create/delete の実機検証は `vitest.integration.d1.config.ts` のリポジトリ
 * 直呼び出しテストが担う）。
 */
export default createBddConfig({
  include: [
    "tests/features/deck-management.spec.ts",
    "tests/features/d1/*.spec.ts",
  ],
  globalSetup: ["./tests/global-setup.d1.ts"],
  baseUrl: baseUrlOf(bddTargets.d1),
  reportsDir: "reports/bdd-d1",
});
