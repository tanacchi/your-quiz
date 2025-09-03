# PactumテストでのDBモック設定方針

## 概要

PactumJSを使用したAPIテストにおいて、データベースをモック状態で実行するための設定方針をまとめます。現在のプロジェクトには既にモック制御の仕組みが実装されており、これを活用してPactumテストでDBモックを実現できます。

## 現状分析

### 既存のモック制御機構

#### 1. 環境変数による制御
- **`USE_MOCK_DB`**: モックDB使用の制御フラグ
- **`NODE_ENV`**: 環境区分（test/development/production）

#### 2. QuizRepositoryFactory
```typescript
// src/infrastructure/repositories/QuizRepositoryFactory.ts
export function shouldUseMock(env: CloudflareBindings): boolean {
  return (
    env.NODE_ENV === "test" ||
    env.USE_MOCK_DB === "true" ||
    (env.NODE_ENV === "development" && env.USE_MOCK_DB !== "false")
  );
}
```

**制御ロジック**:
- `NODE_ENV=test` → 常にモック使用
- `USE_MOCK_DB=true` → 強制的にモック使用
- `NODE_ENV=development` かつ `USE_MOCK_DB≠false` → モック使用（デフォルト）

#### 3. Wrangler環境設定
```jsonc
// wrangler.jsonc
"env": {
  "test": {
    "vars": {
      "NODE_ENV": "test",
      "USE_MOCK_DB": "true"
    }
  }
}
```

### 現在のPactum設定
```typescript
// tests/setup.ts
beforeAll(() => {
  pactum.request.setBaseUrl("http://localhost:8787");
  pactum.request.setDefaultTimeout(30000);
});
```

## ローカル環境での実装方針

### 方法1: Wrangler環境を活用（推奨）

**APIサーバー起動**:
```bash
# テスト環境でAPIサーバー起動（モック使用）
wrangler dev --env test --port 8787

# 別ターミナルでPactumテスト実行
pnpm test:bdd
```

**利点**:
- 既存の設定をそのまま活用
- 確実にモック状態で起動
- 設定変更不要

### 方法2: 環境変数による制御

**package.jsonスクリプト追加**:
```json
{
  "scripts": {
    "dev:mock": "USE_MOCK_DB=true wrangler dev --port 8787",
    "test:bdd:full": "concurrently --kill-others --success first \"pnpm dev:mock\" \"pnpm test:bdd:wait\"",
    "test:bdd:wait": "wait-on http://localhost:8787/health && pnpm test:bdd"
  }
}
```

**必要なパッケージ**:
```bash
pnpm add -D concurrently wait-on
```

### 方法3: テストセットアップ強化

**tests/setup.ts拡張**:
```typescript
beforeAll(async () => {
  // APIサーバーの起動確認
  await waitForApiServer();
  
  pactum.request.setBaseUrl("http://localhost:8787");
  
  // モック状態の確認
  const health = await pactum.spec()
    .get('/health')
    .expectStatus(200);
    
  if (!health.json.mockMode) {
    throw new Error('API server is not in mock mode for testing!');
  }
});

async function waitForApiServer(maxRetries = 30) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await pactum.spec().get('/health').expectStatus(200);
      console.log('API server is ready');
      return;
    } catch {
      console.log(`Waiting for API server... (${i + 1}/${maxRetries})`);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  throw new Error('API server failed to start within timeout');
}
```

## CI環境での戦略

### GitHub Actions実装案

```yaml
# .github/workflows/api-tests.yml
name: API Tests
on: [push, pull_request]

jobs:
  pactum-tests:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./api
        
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
          
      - name: Install dependencies
        run: pnpm install
        
      - name: Start API server in background
        run: |
          USE_MOCK_DB=true pnpm dev &
          echo $! > api_server.pid
          
      - name: Wait for API server
        run: |
          for i in {1..30}; do
            if curl -f http://localhost:8787/health; then
              echo "API server is ready"
              break
            fi
            echo "Waiting for API server..."
            sleep 2
          done
          
      - name: Verify mock mode
        run: |
          response=$(curl -s http://localhost:8787/health)
          if echo "$response" | grep -q '"mockMode":true'; then
            echo "API server is in mock mode ✓"
          else
            echo "ERROR: API server is not in mock mode!"
            exit 1
          fi
          
      - name: Run Pactum tests
        run: pnpm test:bdd
        
      - name: Stop API server
        if: always()
        run: |
          if [ -f api_server.pid ]; then
            kill $(cat api_server.pid) || true
          fi
```

### Docker Compose活用案

```yaml
# docker-compose.test.yml
version: '3.8'
services:
  api:
    build: 
      context: ./api
      dockerfile: Dockerfile.test
    environment:
      - NODE_ENV=test
      - USE_MOCK_DB=true
    ports:
      - "8787:8787"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8787/health"]
      interval: 5s
      timeout: 3s
      retries: 5
    
  tests:
    build: ./api
    depends_on:
      api:
        condition: service_healthy
    environment:
      - CI=true
    command: pnpm test:bdd
    volumes:
      - ./api/reports:/app/reports
```

**実行方法**:
```bash
docker-compose -f docker-compose.test.yml up --abort-on-container-exit
```

## APIサーバー強化要件

### 1. ヘルスチェックエンドポイント追加

```typescript
// src/index.ts
app.get('/health', (c) => {
  const env = c.env;
  return c.json({
    status: 'ok',
    environment: env.NODE_ENV,
    mockMode: shouldUseMock(env),
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});
```

### 2. モック状態のログ出力強化

```typescript
// QuizRepositoryFactory.ts - 既存のログを活用
console.log("QuizRepositoryFactory - env:", {
  NODE_ENV: env.NODE_ENV,
  USE_MOCK_DB: env.USE_MOCK_DB,
  DB_exists: !!env.DB,
});

if (shouldUseMock(env)) {
  console.log("Using MockQuizRepository");
} else {
  console.log("Using D1QuizRepository, DB:", !!env.DB);
}
```

## 推奨実装手順

### Phase 1: ローカル環境整備
1. **ヘルスチェックAPI追加**
2. **Pactumセットアップ強化**
3. **package.jsonスクリプト追加**
4. **ローカルでの動作確認**

### Phase 2: CI環境構築
1. **GitHub Actions YAML作成**
2. **Docker設定（必要に応じて）**
3. **CI環境での動作確認**
4. **エラーハンドリング強化**

### Phase 3: 運用最適化
1. **テスト実行時間短縮**
2. **並列実行対応**
3. **モニタリング追加**
4. **ドキュメント整備**

## トラブルシューティング

### よくある問題と解決策

#### 1. APIサーバーが起動しない
```bash
# デバッグ用起動
DEBUG=* wrangler dev --env test --port 8787
```

#### 2. モックモードになっていない
```bash
# 環境変数確認
curl http://localhost:8787/health | jq '.mockMode'

# 期待値: true
```

#### 3. ポート衝突
```bash
# 利用可能ポート確認
lsof -i :8787

# 別ポート使用
wrangler dev --env test --port 8788
```

#### 4. テストタイムアウト
```typescript
// tests/setup.ts - タイムアウト延長
beforeAll(async () => {
  await waitForApiServer(60); // 60回リトライ（2分）
}, 120000); // 2分タイムアウト
```

## 参考資料

- [Wrangler Configuration](https://developers.cloudflare.com/workers/wrangler/configuration/)
- [PactumJS Documentation](https://pactumjs.github.io/)
- [GitHub Actions Node.js](https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs)

---

**作成日**: 2025-08-18  
**最終更新**: 2025-08-18