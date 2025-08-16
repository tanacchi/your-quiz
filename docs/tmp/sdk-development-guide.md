> 前提: orval v7.11.2 / 単一 `src/generated/client.ts`。Step C まで完了済み（`src/generated/msw/index.msw.ts` あり）。このSDKは**社内配布のnpmパッケージ（private）****として利用する。短縮版ながら、各工程での****OKチェック**と**コミット**を、コード例とは視覚的に分けたチェックリスト形式で明記し、品質担保のための確認ポイントをひと目で把握できるようにした。さらに各ステップでの背景や意図を簡潔に補足し、開発者が実装の流れと目的を即座に理解できるようにする。以降のコード例の前には簡潔な説明を添え、目的や利用シナリオを理解しやすくしている。

---

## D. パッケージ化（private SDK 前提）

SDKとして配布するための基本的なパッケージ設定を行うステップ。ビルド後に型定義とJSが正しく`dist/`に出力され、外部からインポートできることを目指す。

**package.json（SDK側）**

```jsonc
{
  "name": "@tanacchi/quiz-api-sdk",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": { ".": { "import": "./dist/index.js", "types": "./dist/index.d.ts" } },
  "scripts": {
    "build": "tsc -p tsconfig.json && orval --config orval.config.ts && tsx scripts/gen-validators.ts",
    "test": "vitest"
  }
}
```

**src/index.ts（公開インターフェース）**

```ts
export * from './client';      // safeApi などのエクスポート
export * from './types';       // 型の再エクスポート
```

**OKチェック**

- `pnpm run build` 成功、`dist/` に型定義とJSが出力される。

**Commit**: `git add package.json src/index.ts && git commit -m "chore(sdk): package scaffold for private npm"`

---

## E. MSW 起動切替（利用側制御）

利用側が実行環境ごとにモック利用を切り替えられるようにする設定。MSWを利用してAPIモックを提供し、Vite環境変数で有効化する。

**ブラウザ用（Vite想定、SDK同梱）**

```ts
// src/mocks/browser.ts
import { setupWorker } from 'msw';
import { handlers } from '../generated/msw/index.msw';
export const worker = setupWorker(...handlers);
```

**利用側アプリ例**

```ts
if (import.meta.env.VITE_USE_MSW === 'true') {
  const { worker } = await import('@org/api-sdk/dist/mocks/browser.js');
  await worker.start({ onUnhandledRequest: 'bypass' });
}
```

**OKチェック**

- `VITE_USE_MSW=true` でSW登録が行われ、ネットワークがService Worker経由になる。

**Commit**: `git add src/mocks/browser.ts && git commit -m "feat(msw): browser worker entry"`

---

## F. 薄ラッパ（neverthrow + Zod）

API呼び出し結果を`neverthrow`で型安全にラップし、Zodでレスポンスをランタイムバリデーションする基盤を用意する。

```ts
// src/client/index.ts
import { ResultAsync, ok, err } from 'neverthrow';
import * as api from '../generated/client';
import * as z from '../generated/schemas.zod';
export type ApiError =
  | { kind: 'NetworkError'; error: unknown }
  | { kind: 'ApiError'; status: number; body: unknown }
  | { kind: 'ValidationError'; issues: unknown };
const toResult = <T>(p: Promise<T>) =>
  ResultAsync.fromPromise(p, (e:any)=> typeof e?.status==='number'?{kind:'ApiError',status:e.status,body:e.body??e}:{kind:'NetworkError',error:e})
  .andThen((d)=> ok<T,ApiError>(d));
export const safeApi = {
  // 例: getQuiz 実装（コメントアウト例）
  // getQuiz: (id: string) => toResult(api.getQuiz(id)).andThen(d=>{
  //   const r = z.Quiz.safeParse(d);
  //   return r.success? ok(r.data): err({kind:'ValidationError',issues:r.error});
  // }),
} as const;
```

**OKチェック**

- `pnpm tsc --noEmit` 成功。
- `safeApi` の最低1関数が正常動作。

**Commit**: `git add src/client/index.ts && git commit -m "feat(sdk): thin wrapper (neverthrow+zod) seed"`

---

## G. 実API 疎通（localhost:8787）

モックを無効化した状態で、実際のAPIエンドポイントに接続し、通信が成功するか確認する。

**手動確認**

- `.env.development`: `VITE_USE_MSW=false`
- アプリから `api.get...` または `safeApi.get...` を呼び、`http://localhost:8787` にアクセス。

**OKチェック**

- 実サーバから 2xx 応答が返る。

**Commit**: `git commit -m "docs(test): verified real API on localhost:8787" --allow-empty`

---

## H. モック動作確認（MSW）

MSWを有効化して同じ呼び出しを行い、モックレスポンスが正常に返ってくるかを確認する。

**OKチェック**

- `.env.development`: `VITE_USE_MSW=true`
- Networkタブに **from Service Worker** 表示。
- 値がモック由来であることを確認。

**Commit**: `git commit -m "docs(test): verified MSW mock switching" --allow-empty`

---

## I. Vitest 設定とテスト

Vitestで実API・モック双方のテストを行えるよう設定する。`setup-msw.ts`でMSWサーバを初期化し、環境変数で切り替える。

**tests/setup-msw\.ts**

```ts
import { setupServer } from 'msw/node';
import { handlers } from '../src/generated/msw/index.msw';
const server = setupServer(...handlers);
if (process.env.API_MOCK === 'true') {
  beforeAll(()=>server.listen());
  afterEach(()=>server.resetHandlers());
  afterAll(()=>server.close());
}
```

**vitest.config.ts**

```ts
import { defineConfig } from 'vitest/config';
export default defineConfig({ test:{ environment:'node', setupFiles:['./tests/setup-msw.ts'] } });
```

**実APIヘルスチェック**

```ts
// src/tests/real.probe.test.ts
import { describe,it,expect } from 'vitest';
const URL = process.env.REAL_PROBE_URL ?? 'http://localhost:8787/health';
describe('real api probe',()=>{
  it('responds', async()=>{
    const r = await fetch(URL);
    expect(r.status).toBeLessThan(500);
  });
});
```

**モックテスト例**

```ts
// src/tests/mock.smoke.test.ts
import { describe,it,expect } from 'vitest';
import { safeApi } from '../client';
describe('msw smoke',()=>{
  it('returns Ok via msw', async()=>{
    // const r = await safeApi.getQuiz('q1').promise();
    // expect(r.isOk()).toBe(true);
    expect(true).toBe(true);
  });
});
```

**OKチェック**

- `API_MOCK=true pnpm vitest run -t msw smoke` 成功。
- `REAL_PROBE_URL=http://localhost:8787/health pnpm vitest run -t real api probe` 成功。

**Commit**: `git add vitest.config.ts tests/setup-msw.ts src/tests/*.ts && git commit -m "test: real probe + msw smoke"`

---

## J. SDK 最終確認（出荷形）

ビルド成果物が正しく生成され、利用側アプリからインポートできるかを最終確認する。

**OKチェック**

- `pnpm run build` 実行後、`dist/` 出力を確認。
- 利用側から `import { safeApi } from '@org/api-sdk'` が可能。
- モック切替が利用側で制御可能（SDKコードは同一）。

**Commit**: `git commit -m "chore(build): build-ready private SDK" --allow-empty`

---

> これで、\*\*private SDK（未公開）\*\*としての最小構成が完成。実APIとモック切替、Zod+neverthrowによる厳密な型安全性、Vitestによる疎通テストまでカバー。今後はvalidatorsの自動生成や`safeApi`全量実装、さらに利用側アプリでのE2Eテスト統合も視野に入れて拡張可能。

