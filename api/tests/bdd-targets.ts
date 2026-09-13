/**
 * BDDテストの接続先（ターゲット）定義
 *
 * BDDテストは `wrangler dev` を起動し、そのHTTPエンドポイントに対して
 * PactumJSでリクエストを送る。起動するスクリプトと待ち受けポートを
 * ターゲットとして定義し、globalSetup と vitest 設定の両方から参照する。
 *
 * ポートをターゲットごとに分けておくことで、ルートの `pnpm test`
 * （`run-p test:*`）から複数のBDDスイートが並行実行されても衝突しない。
 */
export type BddTarget = {
  /** `api/package.json` の起動スクリプト名 */
  readonly script: string;
  /** `wrangler dev` が待ち受けるポート */
  readonly port: number;
};

export const bddTargets = {
  /** Mockリポジトリ（`wrangler dev --env dev-mock`） */
  mock: { script: "dev:mock", port: 8787 },
} as const satisfies Record<string, BddTarget>;

/** ターゲットのベースURL */
export const baseUrlOf = (target: BddTarget): string =>
  `http://localhost:${target.port}`;
