import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: { target: './api.yaml' },
    output: {
      // SDKの出力先を「src/generated/index.ts」に集約
      client: 'fetch',                   // axiosでも可。今回はfetch
      target: 'src/generated/index.ts',
      // Zodスキーマはディレクトリで出力
      schemas: 'src/generated/schemas',
      // 契約準拠モックを自動生成（MSW）
      mock: { type: 'msw', indexMockFiles: true, useExamples: true },
      mode: "tags-split",
      override: {
        // 必要に応じて調整（coerceなども可）
        zod: { strict: { response: true }, generate: {
          param: true, // パラメータのZodスキーマも生成
          query: true, // クエリパラメータのZodスキーマ
          header: true, // ヘッダーのZodスキーマも生成
          body: true, // リクエストボディのZodスキーマも
          response: true, // レスポンスボディのZodスキーマも生成
        } }
      }
    },
    // 生成後にフォーマッタなど走らせたい場合
    // hooks: { afterAllFilesWrite: 'pnpm biome format . || true' },
  }
});
