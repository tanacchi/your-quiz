import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Node.js環境でBDD/E2Eテストを実行
    environment: "node",

    // BDDテストファイルパターン（既存のPactumJSテスト）
    include: ["tests/features/**/*.spec.ts"],

    // グローバル設定
    globals: true,

    // グローバルセットアップ（サーバー起動・停止管理）
    globalSetup: ["./tests/global-setup.ts"],

    // セットアップファイル（既存のPactumJS設定を維持）
    setupFiles: ["./tests/setup.ts"],

    // タイムアウト設定（BDD/E2Eは長めに設定）
    testTimeout: 30000,

    // カバレッジ設定（BDDテストはE2Eカバレッジとして別管理）
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "reports/bdd/coverage",
      include: ["src/**/*.ts"],
      exclude: [
        "src/**/*.d.ts",
        "src/**/*.test.ts",
        "src/**/*.spec.ts",
        "src/types/generated/**",
      ],
    },

    // ファイル変更監視設定は自動で除外される

    // レポーター設定（詳細表示）
    reporters: ["verbose", "html"],
    outputFile: {
      html: "reports/bdd/html/index.html",
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
