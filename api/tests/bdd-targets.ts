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
  /**
   * ローカルD1（`wrangler dev --env dev --persist-to .wrangler/bdd-d1`）
   *
   * 開発用の `.wrangler/state`（`pnpm db:reset` が消す場所）とは別の
   * ディレクトリに永続化し、実行のたびに作り直す。
   */
  d1: { script: "dev:bdd-d1", port: 8788 },
} as const satisfies Record<string, BddTarget>;

/**
 * D1ターゲットのローカル永続化ディレクトリ（`api/` からの相対パス）
 *
 * `package.json` の `dev:bdd-d1` / `db:bdd-d1:prepare` の `--persist-to` と
 * 一致させること。
 */
export const D1_BDD_PERSIST_DIR = ".wrangler/bdd-d1";

/** ターゲットのベースURL */
export const baseUrlOf = (target: BddTarget): string =>
  `http://localhost:${target.port}`;
