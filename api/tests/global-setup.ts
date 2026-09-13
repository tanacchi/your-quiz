import { type ChildProcess, spawn } from "node:child_process";
import { type BddTarget, baseUrlOf, bddTargets } from "./bdd-targets";

/**
 * CI/CD環境対応のグローバルサーバー管理
 *
 * BDDテスト実行前に `wrangler dev` を自動起動し、
 * テスト終了後に確実にプロセスを終了します。
 * 起動するスクリプトとポートは `bdd-targets.ts` のターゲットで決まります。
 */

declare global {
  var __SERVER_PROCESS__: ChildProcess | undefined;
  namespace NodeJS {
    interface ProcessEnv {
      VITEST_DEBUG?: string;
    }
  }
}

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/** 指定URLがHTTP応答を返すか */
async function isResponding(url: string): Promise<boolean> {
  try {
    await fetch(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * サーバーのヘルスチェック
 * 指定されたURLが正常に応答するまで待機
 */
async function waitForServer(url: string, timeoutMs: number): Promise<void> {
  const startTime = Date.now();
  const checkInterval = 500; // 500ms間隔でチェック

  while (Date.now() - startTime < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        console.log(`✅ Server is ready at ${url}`);
        return;
      }
    } catch (_error) {
      // サーバーがまだ起動していない場合は継続
    }

    await sleep(checkInterval);
  }

  throw new Error(`❌ Server failed to start within ${timeoutMs}ms at ${url}`);
}

/**
 * プロセスグループ全体にシグナルを送る
 *
 * `detached: true` で起動した子プロセスはプロセスグループのリーダーになるため、
 * pid を負数で指定すると pnpm → wrangler → workerd までまとめて届く。
 * 子プロセス（pnpm）だけに送ると workerd が残り、ポートを占有し続ける。
 */
function signalProcessGroup(pid: number, signal: NodeJS.Signals): void {
  try {
    process.kill(-pid, signal);
  } catch (error) {
    // 既に終了している場合（ESRCH）は無視する
    if (
      !(error instanceof Error && "code" in error && error.code === "ESRCH")
    ) {
      console.warn(
        `⚠️ Failed to send ${signal} to process group ${pid}:`,
        error,
      );
    }
  }
}

/**
 * 指定ターゲットのサーバーを起動し、ヘルスチェックが通るまで待つ
 */
export async function startBddServer(
  target: BddTarget,
  timeoutMs = 30000,
): Promise<void> {
  const healthUrl = `${baseUrlOf(target)}/health`;

  // 前回のサーバーが残っていると、新しく起動したサーバーではなく古いサーバーに
  // ヘルスチェックが通ってしまい、別の状態のサーバーに対してテストが走る。
  if (await isResponding(healthUrl)) {
    throw new Error(
      `❌ A server is already responding at ${healthUrl}. Stop the leftover process before running BDD tests.`,
    );
  }

  console.log(
    `🚀 Starting quiz-api server for BDD tests (pnpm ${target.script})...`,
  );

  // wrangler dev をバックグラウンドで起動
  const serverProcess = spawn("pnpm", [target.script], {
    stdio: ["ignore", "pipe", "pipe"],
    detached: true, // プロセスグループ作成
    cwd: process.cwd(),
  });

  // プロセス参照を保存
  global.__SERVER_PROCESS__ = serverProcess;

  // サーバー起動ログを表示
  if (serverProcess.stdout) {
    serverProcess.stdout.on("data", (data) => {
      if (process.env.VITEST_DEBUG === "true") {
        console.log(`[SERVER]: ${data.toString()}`);
      }
    });
  }

  if (serverProcess.stderr) {
    serverProcess.stderr.on("data", (data) => {
      console.error(`[SERVER ERROR]: ${data.toString()}`);
    });
  }

  // プロセスエラーハンドリング
  serverProcess.on("error", (error) => {
    console.error("❌ Failed to start server process:", error);
    throw error;
  });

  // ヘルスチェック待機
  await waitForServer(healthUrl, timeoutMs);

  console.log("✅ Server setup completed for BDD tests");
}

/**
 * 起動中のBDDサーバーを停止する
 *
 * プロセスグループに SIGTERM を送り、グループリーダーの終了を最大5秒待つ。
 * その後、残っているプロセスがあれば SIGKILL で確実に止める。
 */
export async function stopBddServer(): Promise<void> {
  console.log("🛑 Stopping quiz-api server...");

  const serverProcess = global.__SERVER_PROCESS__;
  global.__SERVER_PROCESS__ = undefined;

  if (!serverProcess?.pid) {
    console.log("ℹ️ No server process to stop");
    return;
  }

  const { pid } = serverProcess;
  const exited =
    serverProcess.exitCode !== null || serverProcess.signalCode !== null
      ? Promise.resolve()
      : new Promise<void>((resolve) => serverProcess.once("exit", resolve));

  signalProcessGroup(pid, "SIGTERM");
  await Promise.race([exited, sleep(5000)]);
  signalProcessGroup(pid, "SIGKILL");

  console.log("✅ Server stopped successfully");
}

/**
 * BDDテスト開始前のサーバー起動（Mockターゲット）
 */
export async function setup(): Promise<void> {
  await startBddServer(bddTargets.mock);
}

/**
 * BDDテスト終了後のサーバー停止
 */
export async function teardown(): Promise<void> {
  await stopBddServer();
}
