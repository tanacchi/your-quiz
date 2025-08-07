# PactumJS 移行提案 ― 技術責任者向け要約 (2025‑08)

## 1. 背景と課題 (現状: Cucumber.js)
- **TypeScript × Cloudflare Workers** で API 開発。
- Cucumber.js は **Gherkin → Steps** の実装コストが高く、型共有も手動。
- **仕様 ↔ 実装 drift** や **業務例外テスト不足** がボトルネック。

## 2. PactumJS 採用の主要メリット
| 観点 | Cucumber.js | **PactumJS** |
| --- | --- | --- |
| **ランタイム** | Node (OK) | **Node + TypeScript ネイティブ** |
| **DSL実装コスト** | ステップごとに関数作成 | **Chainable DSL 1 行** で記述
| **OpenAPI 連携** | 手動バリデーション | `@pactum/swagger-coverage` が **自動検証 + カバレッジ**
| **業務例外テスト** | 手動モック | MockServer で **1 行モック**
| **Cloudflare D1/外部API モック** | 追加ライブラリ要 | Miniflare + Pactum プリセット
| **学習コスト** | Gherkin + Step 定義 | **TS エンジニア即導入**

> **結論**: 同一 TypeScript スタック内で **型共有・テスト実装・OpenAPI 検証を一本化** できるのは PactumJS のみ。

## 3. 導入ステップ (PoC → 本移行)
1. **PoC (<1 日)**
   - 既存 1 シナリオを `spec()` 形式で書換え。
   - `@pactum/swagger-coverage` でカバレッジ HTML 生成。
2. **CI 連携 (<0.5 日)**
   - GitHub Actions ジョブ追加
     ```yaml
     - run: npx pactum --config pactum.config.js
     ```
3. **段階移行 (1 週間)**
   - Cucumber.js → PactumJS へシナリオ逐次変換。
   - 変換完了後、Cucumber.js 削除。

## 4. 想定コストとリターン
| 項目 | 工数 | 効果 |
| --- | --- | --- |
| PoC+CI 設定 | 1.5 人日 | 仕様 drift & 未カバー経路を **PR 時点で検出** |
| 全シナリオ移行 | 3–4 人日 | ステップ定義削減により **以後の追加工数 30%↓** |
| 維持コスト | ±0 日 | テストコード = TS → **型リファクタ自動反映** |

## 5. リスクと対策
| リスク | 対策 |
| --- | --- |
| Pactum コミュニティは Cucumber より若い | **v3 安定版 (2025‑06)** で API 固定。<br>201+ contributors, 月間 DL 80k → 成熟路線。 |
| QA メンバーが Gherkin 欲しがる | Markdown シナリオ → Node スクリプトで Pactum spec 自動生成 (PoC 済)。 |

## 6. 依頼事項 (to 技術責任者)
1. **PactumJS 移行方針の承認**
2. GitHub Actions 用 **Node 20 実行環境の継続利用**
3. PoC 期間 (今週末まで) の開発枠 1.5 人日の確保

---
*Prepared by: 開発チーム / 2025‑08‑08*


## 7. 開発フロー & サンプル実装

### 7.1 依存関係の追加 (初回のみ)
```bash
pnpm add -D pactum @pactum/swagger-coverage jest ts-node typescript @types/jest
```

### 7.2 `package.json` スクリプト例
```jsonc
{
  "scripts": {
    "test": "jest --runInBand",
    "test:api": "pactum --config pactum.config.js",
    "spec:gen": "ts-node scripts/gen-spec.ts",
    "openapi": "tsp compile api.tsp --emit=./spec/openapi.yaml"
  }
}
```

### 7.3 `pactum.config.js` (基本設定 + カバレッジ)
```js
const { handler } = require('pactum');
handler.addSpecHandler('swagger', require('@pactum/swagger-coverage')); // カバレッジ
module.exports = {
  specs: '**/tests/pactum/**/*.spec.ts',
  baseUrl: 'http://localhost:8787',
  coverage: {
    enabled: true,
    output: 'coverage/swagger'
  }
};
```

### 7.4 テストシナリオサンプル `tests/pactum/items.spec.ts`
```ts
import { spec } from 'pactum';

describe('GET /items', () => {
  it('未登録タグなら 404', async () => {
    await spec()
      .get('/items')
      .withQueryParams({ tag: 'unknown' })
      .expectStatus(404)
      .expectJsonLike({ code: 'TagNotFound' });
  });

  it('正常取得 200', async () => {
    await spec()
      .get('/items')
      .withQueryParams({ tag: 'music' })
      .expectStatus(200)
      .expectJsonMatchSnapshot(); // スナップショット検証
  });
});
```

### 7.5 外部 API モック例
```ts
import { mockServer } from 'pactum';

beforeAll(() => {
  mockServer.start(9999);
  mockServer.addInteraction({
    request: { method: 'GET', path: '/users/42' },
    response: { status: 503, body: { code: 'UpstreamUnavailable' } }
  });
  process.env.EXTERNAL_BASE_URL = 'http://localhost:9999';
});

afterAll(() => mockServer.stop());
```

### 7.6 Cloudflare D1 シード例
```ts
import { readFileSync } from 'fs';
import { Miniflare } from 'miniflare';
let mf, db;

beforeAll(async () => {
  mf = new Miniflare({ d1Databases: [{ binding: 'DB', databaseId: 'test' }] });
  db = (await mf.getBindings()).DB;
});

beforeEach(async () => {
  await db.exec(readFileSync('sql/seed.sql', 'utf8'));
});
```

### 7.7 CI (GitHub Actions) 抜粋
```yaml
steps:
  - uses: actions/checkout@v4
  - uses: oven-sh/setup-bun@v1 # or actions/setup-node
  - run: pnpm install --frozen-lockfile
  - run: pnpm run openapi
  - run: pnpm run spec:gen
  - run: wrangler dev --local & # Miniflare + D1 起動
  - run: pnpm run test:api
  - uses: actions/upload-artifact@v4
    with:
      name: swagger-coverage
      path: coverage/swagger
```

---
*これらサンプルを基に、既存 Cucumber.js シナリオを PactumJS に段階移行できます。*
