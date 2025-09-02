import { type ChildProcess, spawn } from "node:child_process";

/**
 * CI/CD環境対応のグローバルサーバー管理
 *
 * BDDテスト実行前にwrangler dev --env dev-mockを自動起動し、
 * テスト終了後に確実にプロセスを終了します。
 */

declare global {
  var __SERVER_PROCESS__: ChildProcess | undefined;
  namespace NodeJS {
    interface ProcessEnv {
      VITEST_DEBUG?: string;
    }
  }
}

/**
 * サーバーのヘルスチェック
 * 指定されたURLが正常に応答するまで待機
 */
async function waitForServer(url: string, timeoutMs = 30000): Promise<void> {
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

    await new Promise((resolve) => setTimeout(resolve, checkInterval));
  }

  throw new Error(`❌ Server failed to start within ${timeoutMs}ms at ${url}`);
}

/**
 * BDDテスト開始前のサーバー起動
 */
export async function setup(): Promise<void> {
  console.log("🚀 Starting quiz-api server for BDD tests...");

  // wrangler dev --env dev-mock をバックグラウンドで起動
  const serverProcess = spawn("pnpm", ["dev:mock"], {
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
  await waitForServer("http://localhost:8787/health", 30000);

  console.log("✅ Server setup completed for BDD tests");
}

/**
 * BDDテスト終了後のサーバー停止
 */
export async function teardown(): Promise<void> {
  console.log("🛑 Stopping quiz-api server...");

  if (global.__SERVER_PROCESS__) {
    const process = global.__SERVER_PROCESS__;

    // プロセスグループ全体を終了（detached: trueで起動しているため）
    if (process.pid) {
      try {
        // SIGTERM送信でGraceful shutdown
        process.kill("SIGTERM");

        // 3秒待機してから強制終了
        setTimeout(() => {
          if (!process.killed) {
            process.kill("SIGKILL");
          }
        }, 3000);

        console.log("✅ Server stopped successfully");
      } catch (error) {
        console.warn("⚠️ Error stopping server:", error);
      }
    }

    global.__SERVER_PROCESS__ = undefined;
  } else {
    console.log("ℹ️ No server process to stop");
  }
}
