import { defineConfig } from "vitest/config";

/**
 * BDDテスト用のvitest設定を組み立てる
 *
 * Mock と D1 などターゲットごとに設定ファイルを分けるが、共通部分は
 * ここに集約する。`mergeConfig` は配列（`include` など）を連結してしまい
 * ターゲットごとの対象スペックを絞れないため使わない。
 */
export function createBddConfig(options: {
  /** 実行するスペックファイル */
  include: string[];
  /** サーバーの起動・停止を担う globalSetup */
  globalSetup: string[];
  /** PactumJSの接続先（`tests/setup.ts` が `BDD_BASE_URL` として読む） */
  baseUrl: string;
  /** レポートの出力先ディレクトリ */
  reportsDir: string;
}) {
  return defineConfig({
    test: {
      // Node.js環境でBDD/E2Eテストを実行
      environment: "node",

      include: options.include,

      // グローバル設定
      globals: true,

      // グローバルセットアップ（サーバー起動・停止管理）
      globalSetup: options.globalSetup,

      // セットアップファイル（PactumJS設定）
      setupFiles: ["./tests/setup.ts"],

      // テストワーカーに接続先を渡す
      env: {
        BDD_BASE_URL: options.baseUrl,
      },

      // タイムアウト設定（BDD/E2Eは長めに設定）
      testTimeout: 30000,

      // カバレッジ設定（BDDテストはE2Eカバレッジとして別管理）
      coverage: {
        provider: "v8",
        reporter: ["text", "html", "lcov"],
        reportsDirectory: `${options.reportsDir}/coverage`,
        include: ["src/**/*.ts"],
        exclude: [
          "src/**/*.d.ts",
          "src/**/*.test.ts",
          "src/**/*.spec.ts",
          "src/types/generated/**",
        ],
      },

      // レポーター設定（詳細表示）
      reporters: ["verbose", "html"],
      outputFile: {
        html: `${options.reportsDir}/html/index.html`,
      },

      // 並列実行無効（PactumJSのAPI呼び出しが競合する可能性があるため）
      pool: "forks",
      poolOptions: {
        forks: {
          singleFork: true,
        },
      },

      // シーケンシャル実行（APIテスト同期のため）
      sequence: {
        concurrent: false,
      },
    },

    // ESモジュール対応
    esbuild: {
      target: "es2022",
    },
  });
}
