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

    // カバレッジ設定
    //
    // 閾値は現時点の実測値に合わせたラチェット（下がったらCIで落とす）。
    // 以前は `thresholds: { global: {...} }` というJest記法で95%を指定して
    // いたが、Vitestの`Thresholds`型に`global`は無く、それ以外のキーは
    // per-file閾値のglobパターンとして扱われるためゼロマッチとなり、
    // 閾値が一度も適用されていなかった（実測60%台でもCIが緑だった）。
    // 95%への引き上げは issue #78 で追跡する。
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
      // 実測(lines/statements 69.3, branches 88.0, functions 81.5)から
      // 端数の揺れを吸収する程度に切り下げた値。
      thresholds: {
        lines: 69,
        statements: 69,
        branches: 87,
        functions: 81,
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
