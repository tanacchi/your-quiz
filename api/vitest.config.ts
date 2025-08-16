import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Node.js環境でAPIテストを実行
    environment: "node",

    // テストファイルパターン（scripts配下を除外）
    include: ["src/**/*.{test,spec}.ts"],
    exclude: ["spec/**/*", "node_modules/**/*"],

    // グローバル設定
    globals: true,

    // セットアップファイル
    setupFiles: ["./tests/setup.ts"],

    // タイムアウト設定
    testTimeout: 30000,

    // カバレッジ設定（95%以上必須）
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "reports/unit/coverage",
      include: ["src/**/*.ts"],
      exclude: [
        "src/**/*.d.ts",
        "src/**/*.test.ts",
        "src/**/*.spec.ts",
        "src/types/generated/**",
      ],
      thresholds: {
        global: {
          lines: 95,
          functions: 95,
          branches: 95,
          statements: 95,
        },
      },
    },

    // ファイル変更監視設定は自動で除外される

    // レポーター設定
    reporters: ["verbose", "html"],
    outputFile: {
      html: "reports/unit/html/index.html",
    },

    // 並列実行設定
    pool: "forks",
    poolOptions: {
      forks: {
        singleFork: true, // CloudflareワーカーのESモジュール互換性のため
      },
    },
  },

  // ESモジュール対応
  esbuild: {
    target: "es2022",
  },
});
