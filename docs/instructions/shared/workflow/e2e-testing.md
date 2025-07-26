# E2Eテスト要件策定

## 目的

- 本実装完了後のシステム全体を対象として、実際のユーザー操作シナリオに基づく包括的なEnd-to-Endテストを実施し、ビジネス要求の充足とシステム品質を確証するため、ブラウザ自動化・API統合テスト・パフォーマンステストを含む多層的なE2Eテスト戦略を策定する

## 遵守事項

- **ユーザージャーニー全体をカバー**：登録から主要機能利用まで実際のユーザー行動を模倣する
- **BDDシナリオとの完全整合**：BDDで定義されたビジネス価値を技術レベルで検証する
- **本番環境に近いテスト環境**：実際のデータ・負荷・ネットワーク条件を模倣する
- **自動化とCI/CD統合**：手動テストに依存せず、継続的な品質保証を実現する
- **パフォーマンス・セキュリティの包括検証**：機能だけでなく非機能要件も検証する
- **障害シナリオの組み込み**：ネットワーク障害・サーバー障害時の動作を検証する
- **クロスブラウザ・クロスデバイス対応**：多様な環境での動作保証を行う

## アウトプット出力先

### 基本方針

E2Eテストは、実システムに近い環境で実行するため、テスト環境構築・テストデータ管理・継続的実行の自動化を重視した構成とする。BDDシナリオとの対応関係を明確にし、ビジネス価値の検証を確実に行う。

### 出力先ディレクトリ構造

```text
e2e-tests/
├── test-strategy/                      # テスト戦略・計画
│   ├── test-strategy.md                # E2Eテスト戦略書
│   ├── test-environment-setup.md       # テスト環境構築手順
│   ├── test-data-management.md         # テストデータ管理戦略
│   └── performance-criteria.md         # パフォーマンス判定基準
├── scenarios/                          # テストシナリオ
│   ├── user-journey/                   # ユーザージャーニーテスト
│   │   ├── user-registration-flow.spec.ts     # ユーザー登録フロー
│   │   ├── article-creation-flow.spec.ts      # 記事作成フロー
│   │   ├── content-discovery-flow.spec.ts     # コンテンツ発見フロー
│   │   └── user-profile-management.spec.ts    # プロフィール管理フロー
│   ├── api-integration/                # API統合テスト
│   │   ├── user-api.spec.ts            # ユーザーAPI統合テスト
│   │   ├── article-api.spec.ts         # 記事API統合テスト
│   │   ├── authentication-api.spec.ts  # 認証API統合テスト
│   │   └── external-service-integration.spec.ts # 外部サービス統合
│   ├── performance/                    # パフォーマンステスト
│   │   ├── load-testing.spec.ts        # 負荷テスト
│   │   ├── stress-testing.spec.ts      # ストレステスト
│   │   ├── spike-testing.spec.ts       # スパイクテスト
│   │   └── endurance-testing.spec.ts   # 耐久テスト
│   ├── security/                       # セキュリティテスト
│   │   ├── authentication-security.spec.ts    # 認証セキュリティ
│   │   ├── authorization-security.spec.ts     # 認可セキュリティ
│   │   ├── input-validation-security.spec.ts  # 入力検証セキュリティ
│   │   └── data-protection.spec.ts     # データ保護テスト
│   └── failure-scenarios/              # 障害シナリオテスト
│       ├── network-failure.spec.ts     # ネットワーク障害テスト
│       ├── database-failure.spec.ts    # データベース障害テスト
│       ├── external-service-failure.spec.ts   # 外部サービス障害
│       └── recovery-testing.spec.ts    # 復旧テスト
├── support/                            # テストサポート
│   ├── page-objects/                   # Page Objectパターン
│   │   ├── LoginPage.ts                # ログインページオブジェクト
│   │   ├── ArticleListPage.ts          # 記事一覧ページオブジェクト
│   │   ├── ArticleCreationPage.ts      # 記事作成ページオブジェクト
│   │   └── UserProfilePage.ts          # プロフィールページオブジェクト
│   ├── helpers/                        # テストヘルパー
│   │   ├── testDataGenerator.ts        # テストデータ生成
│   │   ├── apiHelpers.ts               # API呼び出しヘルパー
│   │   ├── waitHelpers.ts              # 待機処理ヘルパー
│   │   └── assertionHelpers.ts         # アサーションヘルパー
│   ├── fixtures/                       # テストフィクスチャ
│   │   ├── users.json                  # ユーザーテストデータ
│   │   ├── articles.json               # 記事テストデータ
│   │   └── api-responses.json          # APIレスポンステストデータ
│   └── config/                         # テスト設定
│       ├── playwright.config.ts        # Playwright設定
│       ├── jest.config.ts              # Jest設定
│       ├── test-environments.ts        # 環境別設定
│       └── performance-budgets.ts      # パフォーマンス予算
├── infrastructure/                     # テストインフラ
│   ├── docker/                         # Docker環境
│   │   ├── docker-compose.test.yml     # テスト環境Docker構成
│   │   ├── test-db.Dockerfile          # テスト用DB
│   │   └── test-app.Dockerfile         # テスト用アプリ
│   ├── ci-cd/                          # CI/CD統合
│   │   ├── github-actions-e2e.yml      # GitHub Actions E2E
│   │   ├── test-pipeline.yml           # テストパイプライン
│   │   └── deployment-verification.yml # デプロイ検証
│   └── monitoring/                     # テスト監視
│       ├── test-metrics.ts             # テストメトリクス
│       ├── performance-monitoring.ts   # パフォーマンス監視
│       └── failure-alerting.ts         # 失敗アラート
├── reports/                            # テストレポート
│   ├── test-results/                   # テスト結果
│   ├── performance-reports/            # パフォーマンスレポート
│   ├── coverage-reports/               # カバレッジレポート
│   └── trend-analysis/                 # トレンド分析
└── docs/                               # E2Eテストドキュメント
    ├── test-execution-guide.md         # テスト実行ガイド
    ├── troubleshooting.md              # トラブルシューティング
    ├── test-maintenance.md             # テストメンテナンス
    └── performance-tuning.md           # パフォーマンスチューニング
```

### ファイル命名規則

- **テストファイル**: `{機能名}-{テスト種別}.spec.ts` （例：`user-registration-flow.spec.ts`）
- **Page Objectファイル**: `{ページ名}Page.ts` （例：`LoginPage.ts`）
- **ヘルパーファイル**: `{機能名}Helpers.ts` （例：`apiHelpers.ts`）
- **設定ファイル**: `{ツール名}.config.ts` （例：`playwright.config.ts`）

## 完了判定基準

### テストカバレッジの達成

- [ ] **ユーザージャーニーカバレッジ**：主要なユーザー操作フロー100%をテストシナリオ化
- [ ] **BDD整合性確認**：BDDで定義された全シナリオがE2Eテストで検証されている
- [ ] **API統合テスト完了**：全APIエンドポイントの統合動作が検証されている
- [ ] **クロスブラウザテスト完了**：主要ブラウザ（Chrome, Firefox, Safari, Edge）での動作確認
- [ ] **レスポンシブデザインテスト**：モバイル・タブレット・デスクトップでの表示確認

### パフォーマンス・非機能要件の検証

- [ ] **パフォーマンス基準達成**：レスポンス時間・スループット要件を満たしている
- [ ] **負荷テスト完了**：想定同時ユーザー数での安定動作を確認
- [ ] **セキュリティテスト完了**：認証・認可・入力検証のセキュリティが確保されている
- [ ] **障害耐性テスト完了**：ネットワーク・サーバー障害時の適切な動作を確認

### 自動化・CI/CD統合の完了

- [ ] **自動テスト実行環境構築**：CI/CDパイプラインでの自動E2Eテスト実行
- [ ] **テスト環境自動化**：Docker等を使用したテスト環境の自動構築
- [ ] **テストデータ管理自動化**：テストデータの自動生成・クリーンアップ
- [ ] **レポート自動生成**：テスト結果・パフォーマンスレポートの自動生成

### 運用・保守体制の確立

- [ ] **テスト実行ガイド作成**：開発チームがE2Eテストを実行・保守できるドキュメント
- [ ] **障害対応手順書作成**：テスト失敗時のトラブルシューティング手順
- [ ] **パフォーマンス監視設定**：継続的なパフォーマンス劣化の検知体制
- [ ] **テストメンテナンス計画**：機能追加時のテスト更新プロセス

## 完了後

- 全E2Eテスト成果物をリストアップし、ユーザーからのレビューを受ける
- 本番リリース判定会議での品質評価資料を作成する
- 運用チームへのE2Eテスト引き継ぎとトレーニングを実施する
- 本番環境での監視・アラート設定と連携したテスト継続実行体制を確立する

## E2Eテスト要件策定の手順

### 1. テスト戦略の策定

#### 1.1 テスト範囲の定義

**ビジネス価値に基づくテスト優先度**:

| 優先度 | テスト対象 | テスト理由 | カバー範囲 | 実装工数 |
|--------|-----------|-----------|-----------|----------|
| **Critical** | ユーザー登録・ログイン | サービス利用の大前提 | 全パターン・全ブラウザ | 高 |
| **High** | コンテンツ作成・公開 | 主要ビジネス機能 | 主要パターン・主要ブラウザ | 高 |
| **Medium** | 検索・発見機能 | ユーザー体験向上 | 基本パターン・主要ブラウザ | 中 |
| **Low** | 管理機能・設定変更 | 運用効率化 | 基本パターンのみ | 低 |

#### 1.2 テストピラミッドの設計

**各テストレイヤーの役割分担**:

```markdown
| テストレイヤー | 目的 | 範囲 | 実行頻度 | 実行時間 | 責任チーム |
|-------------|------|------|----------|----------|-----------|
| **E2E UI Tests** | ユーザージャーニー検証 | ブラウザ操作全体 | デプロイ前 | 30-60分 | QAチーム |
| **API Integration Tests** | システム統合検証 | API層統合 | コミット毎 | 10-15分 | 開発チーム |
| **Component Tests** | UI コンポーネント検証 | 個別コンポーネント | コミット毎 | 5-10分 | フロントエンドチーム |
| **Unit Tests** | ビジネスロジック検証 | 個別関数・クラス | コミット毎 | 1-3分 | 開発チーム |
```

#### 1.3 テスト環境戦略

**環境別テスト実行方針**:

| 環境 | 目的 | データ | テスト種別 | 更新頻度 | 本番類似度 |
|------|------|--------|-----------|----------|----------|
| **Local** | 開発者個人テスト | Mock・Stub | Unit・Component | リアルタイム | 20% |
| **Development** | 機能統合テスト | テスト用種データ | API Integration | コミット毎 | 60% |
| **Staging** | リリース前検証 | 本番類似データ | Full E2E | リリース前 | 90% |
| **Production** | 本番監視 | 本番データ | Smoke Test | デプロイ後 | 100% |

### 2. BDDシナリオとE2Eテストの対応

#### 2.1 BDDシナリオの技術的実装

**Gherkinシナリオの自動化実装**:

```typescript
// BDDシナリオ例
/*
Feature: ユーザー記事投稿
  Scenario: 新規記事の作成と公開
    Given ユーザーがログイン済みである
    When ユーザーが記事作成ページにアクセスする
    And 記事タイトルに "サンプル記事" を入力する
    And 記事本文に "記事の内容です" を入力する
    And 公開ボタンをクリックする
    Then 記事が公開状態で保存される
    And 記事一覧ページに新しい記事が表示される
*/

// E2E実装例
describe('ユーザー記事投稿フロー', () => {
  let page: Page;
  let loginPage: LoginPage;
  let articleCreationPage: ArticleCreationPage;
  let articleListPage: ArticleListPage;

  beforeEach(async () => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    articleCreationPage = new ArticleCreationPage(page);
    articleListPage = new ArticleListPage(page);
  });

  test('新規記事の作成と公開', async () => {
    // Given: ユーザーがログイン済みである
    await loginPage.goto();
    await loginPage.login('test@example.com', 'password123');
    await expect(page).toHaveURL(/.*\/dashboard/);

    // When: ユーザーが記事作成ページにアクセスする
    await articleCreationPage.goto();
    await expect(articleCreationPage.titleInput).toBeVisible();

    // And: 記事タイトルを入力する
    await articleCreationPage.fillTitle('サンプル記事');

    // And: 記事本文を入力する
    await articleCreationPage.fillContent('記事の内容です');

    // And: 公開ボタンをクリックする
    await articleCreationPage.publish();

    // Then: 記事が公開状態で保存される
    await expect(page).toHaveURL(/.*\/articles\/\d+/);
    await expect(page.getByText('公開済み')).toBeVisible();

    // And: 記事一覧ページに新しい記事が表示される
    await articleListPage.goto();
    await expect(articleListPage.getArticleByTitle('サンプル記事')).toBeVisible();
  });
});
```

#### 2.2 表形式シナリオの実装

**BDDのシナリオアウトラインをParameterized Testで実装**:

```typescript
describe.each([
  {
    userType: '一般ユーザー',
    email: 'user@example.com',
    expectedAccess: true,
    expectedFeatures: ['記事作成', '記事公開']
  },
  {
    userType: '管理者',
    email: 'admin@example.com',
    expectedAccess: true,
    expectedFeatures: ['記事作成', '記事公開', 'ユーザー管理', '記事管理']
  },
  {
    userType: 'ゲスト',
    email: '',
    expectedAccess: false,
    expectedFeatures: []
  }
])('$userType のアクセス制御テスト', ({ userType, email, expectedAccess, expectedFeatures }) => {
  test(`${userType}が適切な機能にアクセスできる`, async () => {
    if (email) {
      await loginPage.login(email, 'password123');
    }

    if (expectedAccess) {
      await expect(page.getByText('ダッシュボード')).toBeVisible();

      for (const feature of expectedFeatures) {
        await expect(page.getByText(feature)).toBeVisible();
      }
    } else {
      await page.goto('/dashboard');
      await expect(page).toHaveURL(/.*\/login/);
    }
  });
});
```

### 3. Page Objectパターンの実装

#### 3.1 再利用可能なページオブジェクト設計

**保守性の高いPage Object実装**:

```typescript
export class LoginPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(private page: Page) {
    this.emailInput = page.getByTestId('email-input');
    this.passwordInput = page.getByTestId('password-input');
    this.loginButton = page.getByTestId('login-button');
    this.errorMessage = page.getByTestId('error-message');
  }

  async goto(): Promise<void> {
    await this.page.goto('/login');
    await expect(this.emailInput).toBeVisible();
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectErrorMessage(message: string): Promise<void> {
    await expect(this.errorMessage).toHaveText(message);
  }

  async waitForRedirect(): Promise<void> {
    await this.page.waitForURL(/.*\/dashboard/, { timeout: 5000 });
  }
}

export class ArticleCreationPage {
  readonly titleInput: Locator;
  readonly contentEditor: Locator;
  readonly saveButton: Locator;
  readonly publishButton: Locator;
  readonly statusIndicator: Locator;

  constructor(private page: Page) {
    this.titleInput = page.getByTestId('article-title-input');
    this.contentEditor = page.getByTestId('article-content-editor');
    this.saveButton = page.getByTestId('save-button');
    this.publishButton = page.getByTestId('publish-button');
    this.statusIndicator = page.getByTestId('status-indicator');
  }

  async goto(): Promise<void> {
    await this.page.goto('/articles/new');
    await expect(this.titleInput).toBeVisible();
  }

  async fillTitle(title: string): Promise<void> {
    await this.titleInput.fill(title);
  }

  async fillContent(content: string): Promise<void> {
    await this.contentEditor.fill(content);
  }

  async saveDraft(): Promise<void> {
    await this.saveButton.click();
    await expect(this.statusIndicator).toHaveText('下書き保存済み');
  }

  async publish(): Promise<void> {
    await this.publishButton.click();
    await expect(this.statusIndicator).toHaveText('公開済み');
  }
}
```

### 4. API統合テストの実装

#### 4.1 APIレベルでのシステム統合検証

**RESTful API の包括的テスト**:

```typescript
describe('User API Integration Tests', () => {
  let apiClient: ApiClient;
  let testUser: TestUser;

  beforeEach(async () => {
    apiClient = new ApiClient(process.env.API_BASE_URL);
    testUser = await TestDataGenerator.createTestUser();
  });

  afterEach(async () => {
    await TestDataCleaner.cleanupTestUser(testUser.id);
  });

  describe('User Registration API', () => {
    test('should register new user successfully', async () => {
      const registrationData = {
        email: 'newuser@example.com',
        name: 'New User',
        password: 'SecurePassword123!'
      };

      const response = await apiClient.post('/api/users/register', registrationData);

      expect(response.status).toBe(201);
      expect(response.data).toMatchObject({
        success: true,
        data: {
          id: expect.any(String),
          email: registrationData.email,
          name: registrationData.name,
          status: 'PENDING_VERIFICATION'
        }
      });

      // データベース確認
      const userInDb = await UserRepository.findByEmail(registrationData.email);
      expect(userInDb).toBeTruthy();
      expect(userInDb.status).toBe('PENDING_VERIFICATION');
    });

    test('should reject duplicate email registration', async () => {
      const duplicateData = {
        email: testUser.email, // 既存ユーザーのメール
        name: 'Duplicate User',
        password: 'SecurePassword123!'
      };

      const response = await apiClient.post('/api/users/register', duplicateData);

      expect(response.status).toBe(409);
      expect(response.data).toMatchObject({
        success: false,
        error: 'Business rule violation',
        message: expect.stringContaining('Email already exists')
      });
    });
  });

  describe('Authentication API', () => {
    test('should authenticate valid user', async () => {
      const loginData = {
        email: testUser.email,
        password: testUser.password
      };

      const response = await apiClient.post('/api/auth/login', loginData);

      expect(response.status).toBe(200);
      expect(response.data).toMatchObject({
        success: true,
        data: {
          token: expect.any(String),
          user: {
            id: testUser.id,
            email: testUser.email
          }
        }
      });

      // トークン検証
      const token = response.data.data.token;
      const protectedResponse = await apiClient.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });

      expect(protectedResponse.status).toBe(200);
    });
  });
});
```

#### 4.2 外部サービス統合テスト

**外部API・サービスとの連携検証**:

```typescript
describe('External Service Integration Tests', () => {
  let emailServiceMock: EmailServiceMock;
  let storageServiceMock: StorageServiceMock;

  beforeEach(async () => {
    emailServiceMock = new EmailServiceMock();
    storageServiceMock = new StorageServiceMock();
    await setupExternalServiceMocks();
  });

  test('should send verification email on user registration', async () => {
    const registrationData = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'SecurePassword123!'
    };

    await apiClient.post('/api/users/register', registrationData);

    // メールサービス呼び出し確認
    expect(emailServiceMock.sendEmailCalls).toHaveLength(1);
    expect(emailServiceMock.sendEmailCalls[0]).toMatchObject({
      to: registrationData.email,
      template: 'user-verification',
      data: {
        userName: registrationData.name,
        verificationLink: expect.stringContaining('/verify/')
      }
    });
  });

  test('should handle external service failures gracefully', async () => {
    // メールサービスを失敗させる
    emailServiceMock.shouldFail = true;

    const registrationData = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'SecurePassword123!'
    };

    const response = await apiClient.post('/api/users/register', registrationData);

    // ユーザー登録は成功するが、メール送信失敗は警告レベル
    expect(response.status).toBe(201);
    expect(response.data.success).toBe(true);

    // ログに警告が記録されていることを確認
    const logs = await LogCollector.getRecentLogs();
    expect(logs).toContainEqual(
      expect.objectContaining({
        level: 'warn',
        message: expect.stringContaining('Failed to send verification email')
      })
    );
  });
});
```

### 5. パフォーマンステストの実装

#### 5.1 負荷テスト・ストレステスト

**性能要件の検証**:

```typescript
describe('Performance Tests', () => {
  describe('Load Testing', () => {
    test('should handle 100 concurrent users', async () => {
      const concurrentUsers = 100;
      const testDuration = 60000; // 60秒
      const expectedResponseTime = 500; // 500ms以下

      const loadTestResult = await LoadTester.run({
        concurrentUsers,
        duration: testDuration,
        scenarios: [
          { weight: 50, action: 'browse_articles' },
          { weight: 30, action: 'create_article' },
          { weight: 20, action: 'user_authentication' }
        ]
      });

      // パフォーマンス要件の検証
      expect(loadTestResult.averageResponseTime).toBeLessThan(expectedResponseTime);
      expect(loadTestResult.errorRate).toBeLessThan(0.01); // 1%以下
      expect(loadTestResult.throughput).toBeGreaterThan(500); // 500 req/s以上

      // リソース使用量の確認
      expect(loadTestResult.maxCpuUsage).toBeLessThan(80); // CPU 80%以下
      expect(loadTestResult.maxMemoryUsage).toBeLessThan(2048); // メモリ 2GB以下
    });

    test('should maintain performance under sustained load', async () => {
      const enduranceTestResult = await LoadTester.run({
        concurrentUsers: 50,
        duration: 300000, // 5分間
        rampUpTime: 60000, // 1分でランプアップ
        scenarios: [{ weight: 100, action: 'typical_user_session' }]
      });

      // 持続的負荷での性能維持
      expect(enduranceTestResult.performanceDegradation).toBeLessThan(0.1); // 10%以下の劣化
      expect(enduranceTestResult.memoryLeakDetected).toBe(false);
    });
  });

  describe('Stress Testing', () => {
    test('should handle traffic spikes gracefully', async () => {
      const spikeTestResult = await LoadTester.run({
        concurrentUsers: 500, // 通常の5倍
        duration: 120000, // 2分間
        rampUpTime: 10000, // 10秒で急激にランプアップ
        scenarios: [{ weight: 100, action: 'peak_traffic_simulation' }]
      });

      // 障害点の特定
      expect(spikeTestResult.systemBreakPoint).toBeGreaterThan(200); // 200並行ユーザー以上で処理可能
      expect(spikeTestResult.recoveryTime).toBeLessThan(30000); // 30秒以内で回復
      expect(spikeTestResult.dataCorruption).toBe(false); // データ破損なし
    });
  });
});
```

#### 5.2 フロントエンドパフォーマンステスト

**ブラウザ性能の検証**:

```typescript
describe('Frontend Performance Tests', () => {
  test('should meet Web Vitals requirements', async () => {
    const page = await browser.newPage();

    // Performance monitoring開始
    await page.goto('/');

    // Core Web Vitalsの測定
    const webVitals = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const vitals = {};

          entries.forEach((entry) => {
            if (entry.name === 'FCP') vitals.fcp = entry.value;
            if (entry.name === 'LCP') vitals.lcp = entry.value;
            if (entry.name === 'FID') vitals.fid = entry.value;
            if (entry.name === 'CLS') vitals.cls = entry.value;
          });

          resolve(vitals);
        }).observe({ entryTypes: ['measure', 'navigation', 'paint'] });
      });
    });

    // Web Vitals基準の検証
    expect(webVitals.fcp).toBeLessThan(1800); // First Contentful Paint < 1.8s
    expect(webVitals.lcp).toBeLessThan(2500); // Largest Contentful Paint < 2.5s
    expect(webVitals.fid).toBeLessThan(100);  // First Input Delay < 100ms
    expect(webVitals.cls).toBeLessThan(0.1);  // Cumulative Layout Shift < 0.1
  });

  test('should optimize bundle size', async () => {
    const bundleAnalysis = await BundleAnalyzer.analyze();

    // バンドルサイズの確認
    expect(bundleAnalysis.mainBundleSize).toBeLessThan(250000); // 250KB以下
    expect(bundleAnalysis.vendorBundleSize).toBeLessThan(500000); // 500KB以下
    expect(bundleAnalysis.unusedCode).toBeLessThan(0.1); // 未使用コード10%以下

    // ライブラリ使用量の確認
    expect(bundleAnalysis.duplicateLibraries).toHaveLength(0); // 重複ライブラリなし
  });
});
```

### 6. セキュリティテストの実装

#### 6.1 認証・認可セキュリティ

**セキュリティ脆弱性の検証**:

```typescript
describe('Security Tests', () => {
  describe('Authentication Security', () => {
    test('should prevent brute force attacks', async () => {
      const invalidCredentials = {
        email: 'test@example.com',
        password: 'wrongpassword'
      };

      // 連続ログイン試行
      const attempts = [];
      for (let i = 0; i < 6; i++) {
        attempts.push(apiClient.post('/api/auth/login', invalidCredentials));
      }

      const responses = await Promise.all(attempts);

      // 最初の数回は401、その後は429 (Too Many Requests)
      expect(responses.slice(0, 3).every(r => r.status === 401)).toBe(true);
      expect(responses.slice(3).every(r => r.status === 429)).toBe(true);

      // アカウントロック確認
      const lockStatus = await apiClient.get(`/api/auth/lock-status/${invalidCredentials.email}`);
      expect(lockStatus.data.isLocked).toBe(true);
      expect(lockStatus.data.unlockTime).toBeTruthy();
    });

    test('should invalidate JWT tokens on logout', async () => {
      // ログインしてトークン取得
      const loginResponse = await apiClient.post('/api/auth/login', {
        email: testUser.email,
        password: testUser.password
      });

      const token = loginResponse.data.data.token;

      // トークンで認証確認
      const authResponse1 = await apiClient.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      expect(authResponse1.status).toBe(200);

      // ログアウト
      await apiClient.post('/api/auth/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // ログアウト後のトークン使用確認
      const authResponse2 = await apiClient.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      expect(authResponse2.status).toBe(401);
    });
  });

  describe('Input Validation Security', () => {
    test('should prevent SQL injection attacks', async () => {
      const maliciousInputs = [
        "'; DROP TABLE users; --",
        "1' OR '1'='1",
        "admin'/*",
        "' UNION SELECT * FROM users --"
      ];

      for (const maliciousInput of maliciousInputs) {
        const response = await apiClient.post('/api/users/search', {
          query: maliciousInput
        });

        // SQLインジェクションが成功していないことを確認
        expect(response.status).toBe(400); // バリデーションエラー
        expect(response.data.error).toContain('Invalid input');

        // データベースが影響を受けていないことを確認
        const userCount = await UserRepository.count();
        expect(userCount).toBeGreaterThan(0); // テーブルが削除されていない
      }
    });

    test('should prevent XSS attacks', async () => {
      const xssPayloads = [
        '<script>alert("XSS")</script>',
        'javascript:alert("XSS")',
        '<img src="x" onerror="alert(\'XSS\')">'
      ];

      for (const payload of xssPayloads) {
        const response = await apiClient.post('/api/articles', {
          title: `Test Article ${payload}`,
          content: `Content with ${payload}`
        }, {
          headers: { Authorization: `Bearer ${testUser.token}` }
        });

        if (response.status === 201) {
          // 記事が作成された場合、エスケープされていることを確認
          const articleId = response.data.data.id;
          const articleResponse = await apiClient.get(`/api/articles/${articleId}`);

          const articleHtml = articleResponse.data.data.content;
          expect(articleHtml).not.toContain('<script>');
          expect(articleHtml).not.toContain('javascript:');
          expect(articleHtml).not.toContain('onerror=');
        }
      }
    });
  });
});
```

### 7. 障害シナリオテストの実装

#### 7.1 ネットワーク・サービス障害の検証

**障害耐性とリカバリの確認**:

```typescript
describe('Failure Scenario Tests', () => {
  describe('Network Failure Tests', () => {
    test('should handle intermittent network failures', async () => {
      const page = await browser.newPage();

      // ネットワーク遅延を模擬
      await page.route('**/*', route => {
        setTimeout(() => route.continue(), 2000); // 2秒遅延
      });

      await page.goto('/articles/new');

      // フォーム入力
      await page.getByTestId('article-title-input').fill('Test Article');
      await page.getByTestId('article-content-editor').fill('Test Content');

      // 保存試行（ネットワーク遅延中）
      await page.getByTestId('save-button').click();

      // ローディング状態の確認
      await expect(page.getByTestId('loading-indicator')).toBeVisible();

      // 最終的に保存成功
      await expect(page.getByTestId('save-success-message')).toBeVisible({ timeout: 10000 });
    });

    test('should show appropriate error for complete network failure', async () => {
      const page = await browser.newPage();

      // ネットワーク完全遮断
      await page.route('**/*', route => route.abort());

      await page.goto('/articles/new');

      // オフライン状態の表示確認
      await expect(page.getByTestId('offline-indicator')).toBeVisible();
      await expect(page.getByText('ネットワーク接続を確認してください')).toBeVisible();
    });
  });

  describe('Database Failure Tests', () => {
    test('should handle database connection failures gracefully', async () => {
      // データベース接続を一時的に無効化
      await DatabaseMock.simulateConnectionFailure();

      const response = await apiClient.get('/api/articles');

      // 適切なエラーレスポンス
      expect(response.status).toBe(503); // Service Unavailable
      expect(response.data).toMatchObject({
        success: false,
        error: 'Service temporarily unavailable',
        message: 'Please try again later'
      });

      // データベース接続復旧後
      await DatabaseMock.restoreConnection();

      const recoveryResponse = await apiClient.get('/api/articles');
      expect(recoveryResponse.status).toBe(200);
    });
  });

  describe('External Service Failure Tests', () => {
    test('should handle email service failures during registration', async () => {
      // メールサービスを失敗させる
      await EmailServiceMock.simulateFailure();

      const registrationData = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'SecurePassword123!'
      };

      const response = await apiClient.post('/api/users/register', registrationData);

      // ユーザー登録は成功（メール送信は非同期で再試行）
      expect(response.status).toBe(201);
      expect(response.data.success).toBe(true);

      // 後でメール送信が再試行されることを確認
      await delay(5000); // 5秒待機

      const emailQueue = await EmailQueueInspector.getQueueStatus();
      expect(emailQueue.pendingEmails).toContainEqual(
        expect.objectContaining({
          to: registrationData.email,
          template: 'user-verification'
        })
      );
    });
  });
});
```

### 8. CI/CD統合とレポート生成

#### 8.1 自動テスト実行パイプライン

**継続的テスト実行の自動化**:

```yaml
# .github/workflows/e2e-tests.yml
name: E2E Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 2 * * *' # 毎日午前2時

jobs:
  e2e-tests:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        browser: [chromium, firefox, webkit]

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Setup test environment
        run: |
          docker-compose -f docker-compose.test.yml up -d
          npm run db:migrate:test
          npm run seed:test

      - name: Run E2E tests
        run: |
          npm run test:e2e:${{ matrix.browser }}
        env:
          TEST_BASE_URL: http://localhost:3000
          TEST_DB_URL: postgresql://testuser:testpass@localhost:5432/testdb

      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: e2e-results-${{ matrix.browser }}
          path: |
            test-results/
            playwright-report/

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

      - name: Cleanup test environment
        if: always()
        run: docker-compose -f docker-compose.test.yml down
```

#### 8.2 包括的テストレポート

**テスト結果の可視化と分析**:

```typescript
// test-reporting/reportGenerator.ts
export class E2ETestReportGenerator {
  static async generateComprehensiveReport(): Promise<TestReport> {
    const testResults = await TestResultCollector.collectAllResults();
    const performanceMetrics = await PerformanceCollector.collectMetrics();
    const securityFindings = await SecurityScanner.collectFindings();

    return {
      summary: {
        totalTests: testResults.length,
        passedTests: testResults.filter(t => t.status === 'passed').length,
        failedTests: testResults.filter(t => t.status === 'failed').length,
        skippedTests: testResults.filter(t => t.status === 'skipped').length,
        executionTime: testResults.reduce((acc, t) => acc + t.duration, 0),
        coveragePercentage: this.calculateCoverage(testResults)
      },
      userJourneyResults: this.generateUserJourneyReport(testResults),
      performanceResults: this.generatePerformanceReport(performanceMetrics),
      securityResults: this.generateSecurityReport(securityFindings),
      browserCompatibility: this.generateBrowserReport(testResults),
      trends: await this.generateTrendAnalysis(),
      recommendations: this.generateRecommendations(testResults)
    };
  }

  private static generateUserJourneyReport(results: TestResult[]): UserJourneyReport {
    return {
      criticalJourneys: results
        .filter(t => t.priority === 'critical')
        .map(t => ({
          journey: t.name,
          status: t.status,
          duration: t.duration,
          steps: t.steps,
          failures: t.failures
        })),
      businessValueCoverage: this.calculateBusinessValueCoverage(results)
    };
  }

  private static generatePerformanceReport(metrics: PerformanceMetrics): PerformanceReport {
    return {
      responseTime: {
        average: metrics.averageResponseTime,
        p95: metrics.p95ResponseTime,
        p99: metrics.p99ResponseTime
      },
      throughput: metrics.requestsPerSecond,
      resourceUsage: {
        cpu: metrics.cpuUsage,
        memory: metrics.memoryUsage,
        disk: metrics.diskUsage
      },
      webVitals: {
        fcp: metrics.firstContentfulPaint,
        lcp: metrics.largestContentfulPaint,
        fid: metrics.firstInputDelay,
        cls: metrics.cumulativeLayoutShift
      },
      budgetCompliance: this.checkPerformanceBudgets(metrics)
    };
  }
}
```

## E2Eテスト実装時の注意点

### BDDシナリオとの完全整合

- **ビジネス価値の検証**：技術的なテストではなく、ユーザー価値の確認を最優先
- **ユビキタス言語の活用**：テストコードでもドメイン用語を使用
- **シナリオの実行可能性**：BDDで定義されたすべてのシナリオを自動実行
- **ステークホルダーとの協働**：テスト結果をビジネス言語で報告

### テスト安定性の確保

- **フレイキーテストの排除**：非決定的な要素（時間、ランダム値）の適切な制御
- **適切な待機戦略**：固定wait ではなく、条件待ちの活用
- **テスト隔離の徹底**：テスト間の依存関係を排除
- **環境の一貫性**：本番環境との差異を最小化

### パフォーマンス・セキュリティの包括検証

- **現実的な負荷条件**：実際のユーザー行動パターンを模倣
- **セキュリティ要件の網羅**：OWASP Top 10 への対応確認
- **障害時の適切な動作**：グレースフルデグラデーションの確認
- **監視・アラートとの連携**：本番監視システムとの整合性

### 継続的改善とメンテナンス

- **テスト結果の分析**：失敗パターンの特定と改善
- **実行時間の最適化**：並列実行とテスト分割の活用
- **メンテナンスコストの管理**：Page Object パターンによる保守性向上
- **チーム間の協働**：開発・QA・運用チームの連携強化

この手順により、包括的で実用的なE2Eテスト戦略を確立し、高品質なシステムリリースを継続的に実現できる。
