import { spawnSync } from "node:child_process";
import { rmSync } from "node:fs";
import { bddTargets, D1_BDD_PERSIST_DIR } from "./bdd-targets";
import { startBddServer, stopBddServer } from "./global-setup";

/**
 * ローカルD1を対象にしたBDDテストのグローバルセットアップ
 *
 * 1. 前回の実行で残ったローカルD1の永続化ディレクトリを削除する
 * 2. マイグレーションとシードを適用する（終了コードを確認する）
 * 3. `wrangler dev --env dev`（USE_MOCK_DB=false）を起動する
 *
 * Mockターゲットと違い、リポジトリ層まで実際のD1（SQLite）を通るため、
 * D1でしか起きない不具合（FK制約・採番・型の不一致など）を検出できる。
 * ローカル永続化ディレクトリだけを使うので、本番のD1には接続しない。
 */
export async function setup(): Promise<void> {
  rmSync(D1_BDD_PERSIST_DIR, { recursive: true, force: true });

  console.log("🗄️  Applying migrations and seed to local D1 for BDD tests...");
  const prepare = spawnSync("pnpm", ["db:bdd-d1:prepare"], {
    cwd: process.cwd(),
    encoding: "utf-8",
  });
  if (prepare.status !== 0) {
    throw new Error(
      `❌ Failed to prepare local D1 (exit ${prepare.status}):\n${prepare.stdout}\n${prepare.stderr}`,
    );
  }

  // マイグレーション適用直後の wrangler dev はビルドとD1初期化で時間がかかる
  await startBddServer(bddTargets.d1, 60000);
}

export async function teardown(): Promise<void> {
  await stopBddServer();
}
