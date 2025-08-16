import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: { target: "./api.yaml" },
    output: {
      client: "fetch",
      target: "src/generated/client.ts",
      schemas: "src/generated/types",
      mock: false, // ← ここは false のまま（単一出力を汚さない）
    },
  },

  apiZod: {
    input: { target: "./api.yaml" },
    output: {
      client: "zod",
      target: "src/generated/schemas.zod.ts",
      fileExtension: ".zod.ts",
    },
  },

  apiMsw: {
    input: { target: "./api.yaml" },
    output: {
      client: "fetch", // ここでもSDKは出るが使わない想定
      target: "src/generated/msw", // ← ディレクトリにする（重要）
      mode: "tags-split",
      mock: { type: "msw", indexMockFiles: true }, // ← index.msw.ts を生成
    },
  },
});
