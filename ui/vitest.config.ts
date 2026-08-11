import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    // ブラウザDOM環境でUIコンポーネントをテスト
    environment: "jsdom",

    // テストファイルパターン
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules/**/*", ".next/**/*"],

    // グローバル設定（describe/it/expect をimport不要にする）
    globals: true,

    // jest-domマッチャーのセットアップ
    setupFiles: ["./src/test/setup.ts"],

    // カバレッジ設定（スケルトン段階は低めのしきい値から段階導入）
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "reports/coverage",
      include: [
        "src/components/**/*.{ts,tsx}",
        "src/lib/**/*.{ts,tsx}",
        "src/types/**/*.{ts,tsx}",
      ],
      exclude: [
        "src/**/*.d.ts",
        "src/**/*.test.{ts,tsx}",
        "src/**/*.spec.{ts,tsx}",
        "src/**/*.stories.{ts,tsx}",
      ],
      thresholds: {
        global: {
          lines: 60,
          functions: 60,
          branches: 60,
          statements: 60,
        },
      },
    },

    // レポーター設定
    reporters: ["verbose"],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
