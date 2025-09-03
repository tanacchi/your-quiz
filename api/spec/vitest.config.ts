import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["tests/**/*.{test,spec}.ts"],
    exclude: ["node_modules", "dist", "generated"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: ["node_modules/", "tests/", "generated/", "scripts/"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./scripts"),
      "@tests": path.resolve(__dirname, "./tests"),
    },
  },
});
