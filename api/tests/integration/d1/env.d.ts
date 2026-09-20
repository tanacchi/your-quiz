/// <reference types="@cloudflare/vitest-pool-workers" />

import type { D1Migration } from "@cloudflare/vitest-pool-workers/config";

/**
 * `vitest.integration.d1.config.ts` の `poolOptions.workers.miniflare.bindings`
 * で渡した値の型を `cloudflare:test` の `env` に反映する。
 */
declare module "cloudflare:test" {
  interface ProvidedEnv extends CloudflareBindings {
    readonly TEST_MIGRATIONS: D1Migration[];
    readonly SEED_SQL: string;
  }
}
