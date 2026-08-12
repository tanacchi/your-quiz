/**
 * Next.js は `process.env.NEXT_PUBLIC_*` をドットアクセスの形でしか
 * ビルド時にインライン化しない。`noPropertyAccessFromIndexSignature`
 * が有効な状態でドットアクセスを型エラーにしないため、
 * `NodeJS.ProcessEnv` へプロパティを宣言マージする。
 */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NEXT_PUBLIC_API_URL?: string;
    }
  }
}

export {};
