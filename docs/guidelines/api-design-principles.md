# API設計原則・命名規約

## 目的

Your QuizアプリケーションのAPI設計における統一的な原則・ガイドライン・命名規約を定義し、開発チーム全体で一貫性のあるAPI実装を実現する。

## 基本設計原則

### 1. RESTful設計原則

#### ハイブリッドAPI設計（名詞+動詞）

**基本方針**: RESTful原則をベースに、複雑なビジネスロジックには動詞APIを併用

##### 名詞API（リソース中心）

- **基本CRUD操作**: 単純な作成・読取・更新・削除
- **リソース階層**: 親子関係の明確な操作
- **統一インターフェース**: HTTP メソッドの標準的利用

```http
# ✅ 名詞API - 基本CRUD操作
GET    /api/quiz/v1/manage/quizzes           # クイズ一覧取得
POST   /api/quiz/v1/manage/quizzes           # クイズ作成
GET    /api/quiz/v1/manage/quizzes/123       # 特定クイズ取得
PUT    /api/quiz/v1/manage/quizzes/123       # クイズ更新
DELETE /api/quiz/v1/manage/quizzes/123       # クイズ削除

# ✅ リソース階層操作
GET    /api/quiz/v1/learning/decks/456/sessions     # Deck内のセッション一覧
POST   /api/user/v1/sessions/789/answers            # セッション内に回答作成
GET    /api/quiz/v1/learning/published              # 公開クイズ一覧
```

##### 動詞API（ビジネスロジック中心）

- **複合操作**: 複数リソースに跨る処理
- **ワークフロー**: 承認・同期・変換などの業務プロセス
- **複雑な状態変更**: 単純更新では表現困難な操作

```http
# ✅ 動詞API - 複雑ビジネスロジック
POST   /api/quiz/v1/manage/quizzes/123/approve      # 承認ワークフロー
POST   /api/quiz/v1/manage/quizzes/123/reject       # 却下処理
POST   /api/quiz/v1/manage/quizzes/123/publish      # 公開処理

POST   /api/quiz/v1/learning/decks/from-search      # 検索結果からDeck生成
POST   /api/quiz/v1/learning/sessions/789/submit    # セッション提出・結果計算
POST   /api/sync/v1/synchronize                     # データ同期・競合解決

POST   /api/user/v1/sessions/456/pause              # セッション一時停止
POST   /api/user/v1/sessions/456/resume             # セッション再開
```

##### 使い分け基準

| 操作の複雑さ | API種別 | 判断基準 | 実装例 |
|-------------|---------|----------|--------|
| **単純** | 名詞API | 単一リソースのCRUD | `GET /quizzes`, `POST /quizzes` |
| **中程度** | 名詞API | 関連リソースの操作 | `POST /sessions/123/answers` |
| **複雑** | 動詞API | 複数ステップの業務処理 | `POST /quizzes/123/approve` |
| **ワークフロー** | 動詞API | 状態遷移・外部連携 | `POST /sync/v1/synchronize` |

```typescript
// 実装判断フローチャート
interface APIDesignDecision {
  // Step 1: 操作の複雑さ評価
  isSimpleCRUD(): boolean;           // true → 名詞API
  involvesMultipleResources(): boolean;  // true → 検討が必要
  requiresComplexValidation(): boolean;  // true → 動詞API候補
  
  // Step 2: ビジネスロジック評価
  hasWorkflowSteps(): boolean;       // true → 動詞API
  changesMultipleStates(): boolean;  // true → 動詞API
  requiresExternalIntegration(): boolean; // true → 動詞API
  
  // Step 3: 最終判定
  recommendedAPIType: 'noun' | 'verb';
}
```

##### 避けるべきパターン

```http
# ❌ 悪い例 - 混在パターン
POST   /api/v1/createQuiz               # 動詞のみ（古いパターン）
GET    /api/v1/getQuizById/123          # 動詞のみ
POST   /api/v1/submitAnswer             # リソース階層不明確

# ❌ 動詞の乱用
POST   /api/v1/quiz/update              # PUTで十分
POST   /api/v1/quiz/delete              # DELETEで十分
GET    /api/v1/quiz/get                 # GETで十分
```

#### HTTP メソッド利用方針

| Method | 用途 | 冪等性 | 安全性 | レスポンス |
|--------|------|--------|--------|------------|
| **GET** | リソース取得 | ✓ | ✓ | 200, 404 |
| **POST** | リソース作成・複合操作 | ✗ | ✗ | 201, 400, 409 |
| **PUT** | リソース更新・置換 | ✓ | ✗ | 200, 201, 404 |
| **PATCH** | リソース部分更新 | ✗ | ✗ | 200, 404 |
| **DELETE** | リソース削除 | ✓ | ✗ | 204, 404 |

#### ステータスコード体系

```typescript
// 成功レスポンス
const SUCCESS_CODES = {
  200: 'OK - 取得・更新成功',
  201: 'Created - 作成成功', 
  204: 'No Content - 削除成功・レスポンスボディなし',
  206: 'Partial Content - 部分的コンテンツ（ページネーション）'
};

// クライアントエラー
const CLIENT_ERROR_CODES = {
  400: 'Bad Request - リクエスト形式エラー',
  401: 'Unauthorized - 認証必要',
  403: 'Forbidden - 権限不足',
  404: 'Not Found - リソース不存在',
  409: 'Conflict - リソース競合',
  422: 'Unprocessable Entity - バリデーションエラー',
  429: 'Too Many Requests - レート制限'
};

// サーバーエラー
const SERVER_ERROR_CODES = {
  500: 'Internal Server Error - サーバー内部エラー',
  502: 'Bad Gateway - 上流サーバーエラー',
  503: 'Service Unavailable - サービス一時停止',
  504: 'Gateway Timeout - 上流サーバータイムアウト'
};
```

### 2. URL設計規約

#### バージョニング戦略

```http
# Domain-based Versioning（採用）
/api/{domain}/v1/{context}/{resource}

# 具体例
/api/quiz/v1/manage/quizzes        # Quiz Domain - Manage Context
/api/quiz/v1/learning/decks        # Quiz Domain - Learning Context
/api/user/v1/sessions              # User Domain
/api/sync/v1/cache-manifest        # Sync Domain

# 従来方式（非推奨）
/api/v1/quiz-management/quizzes    # 旧形式

# Header Versioning（将来検討）
Accept: application/vnd.yourquiz.v1+json
```

#### 命名規約

```typescript
// リソース名命名規則
interface ResourceNamingRules {
  // 基本原則
  language: 'english';           // 英語使用
  case: 'kebab-case';           // ケバブケース
  plural: true;                 // 複数形使用
  
  // 具体例
  quizzes: '/api/v1/quizzes';                    // ✓ 複数形
  sessions: '/api/v1/quiz-learning/sessions';    // ✓ ケバブケース
  
  // 避けるべきパターン
  quiz: '/api/v1/quiz';                         // ✗ 単数形
  quizSessions: '/api/v1/quizSessions';         // ✗ camelCase
  quiz_sessions: '/api/v1/quiz_sessions';       // ✗ snake_case
}

// Domain-based URL Structure
const DOMAIN_STRUCTURE = {
  // Quiz Domain
  'quiz-manage': '/api/quiz/v1/manage',           // クイズ管理・承認
  'quiz-learning': '/api/quiz/v1/learning',       // 学習・Deck・回答
  
  // User Domain  
  'user-sessions': '/api/user/v1/sessions',       // セッション管理
  'user-profiles': '/api/user/v1/profiles',       // プロファイル管理
  
  // Sync Domain
  'sync-data': '/api/sync/v1',                    // オフライン同期
  
  // 旧形式（非推奨）
  'quiz-management': '/api/v1/quiz-management',   // ❌ 削除予定
  'offline-sync': '/api/v1/offline-sync'          // ❌ 削除予定
};

// Domain分割の利点
interface DomainBenefits {
  independentVersioning: true;    // ドメイン別バージョン管理
  contextualClarity: true;        // 文脈の明確化
  teamOwnership: true;           // チーム別責任範囲
  scalableRouting: true;         // ルーティング拡張性
}
```

#### クエリパラメータ規約

```typescript
interface QueryParameterRules {
  // ページネーション
  limit: number;                 // ページサイズ（デフォルト20、最大100）
  offset: number;                // オフセット（デフォルト0）
  cursor?: string;               // カーソル（大量データ用）
  
  // ソート
  sort: string;                  // ソート項目（例：'created_at', 'popularity'）
  order: 'asc' | 'desc';        // ソート順序（デフォルト'desc'）
  
  // フィルタリング
  filter_[field]: any;          // フィールド別フィルター
  search: string;               // 全文検索
  tags: string[];               // タグフィルター（配列）
  
  // その他
  include?: string[];           // 関連リソース含有（例：'statistics,creator'）
  fields?: string[];            // レスポンスフィールド指定
  format?: 'json' | 'xml';      // レスポンス形式
}

// 実際の使用例（新URL構造）
const QUERY_EXAMPLES = [
  '/api/quiz/v1/learning/published?limit=20&offset=40&sort=popularity&order=desc',
  '/api/quiz/v1/learning/search?tags=javascript,react&difficulty=intermediate',
  '/api/quiz/v1/learning/search?q=関数&filter_difficult=beginner&limit=10',
  '/api/quiz/v1/learning/decks?include=statistics,creator&fields=id,name,quiz_count',
  '/api/user/v1/sessions?include=progress&status=active',
  '/api/sync/v1/cache-manifest?resource_types=quizzes,sessions'
];
```

### 3. JSON API設計原則

#### リクエスト形式統一

```typescript
// 単一リソース作成
interface CreateResourceRequest {
  // リソースデータ（ネストなし、フラット構造推奨）
  question: string;
  correctAnswer: boolean;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  
  // メタデータ（オプション）
  metadata?: {
    createdBy: string;
    source: string;
    version: number;
  };
}

// 複数リソース・複合操作
interface BatchCreateRequest {
  items: Array<{
    // 個別アイテムデータ
    question: string;
    correctAnswer: boolean;
    // ...
  }>;
  options?: {
    continueOnError: boolean;   // エラー時継続処理
    validateOnly: boolean;      // バリデーションのみ
  };
}

// アクション実行（非CRUD操作）
interface ActionRequest {
  action: 'submit' | 'approve' | 'reject' | 'sync';
  parameters?: {
    [key: string]: any;
  };
  context?: {
    requestId: string;
    timestamp: string;
  };
}
```

#### レスポンス形式統一

```typescript
// 成功レスポンス基本構造
interface SuccessResponse<T> {
  success: true;
  data: T;
  meta?: {
    requestId: string;
    timestamp: string;
    version: string;
    processingTime?: number;
  };
}

// エラーレスポンス基本構造
interface ErrorResponse {
  success: false;
  error: {
    code: string;               // エラーコード（大文字スネークケース）
    message: string;            // ユーザー向けメッセージ
    details?: {                 // 詳細情報（開発者向け）
      field?: string;           // エラー対象フィールド
      value?: any;              // 問題のある値
      constraints?: string[];   // 制約条件
    };
    trace?: string;             // スタックトレース（開発環境のみ）
  };
  meta?: {
    requestId: string;
    timestamp: string;
  };
}

// ページネーションレスポンス
interface PaginatedResponse<T> {
  success: true;
  data: T[];
  pagination: {
    total?: number;             // 総件数（オフセットベース）
    count: number;              // 現在ページ件数
    limit: number;              // ページサイズ
    offset?: number;            // オフセット（オフセットベース）
    cursor?: string;            // 現在カーソル（カーソルベース）
    hasMore: boolean;           // 次ページ存在フラグ
    nextCursor?: string;        // 次ページカーソル
    prevCursor?: string;        // 前ページカーソル
  };
}
```

### 4. 認証・セキュリティ原則

#### 匿名認証・デバイス識別設計

**基本戦略**: ユーザー登録不要で学習・投稿を可能にしつつ、デバイス識別により一定の連続性を確保

##### JWT設計（匿名ユーザー対応）

```typescript
// 匿名JWT Payload構造
interface AnonymousJWTPayload {
  // 標準クレーム
  iss: 'your-quiz-api';         // Issuer
  sub: string;                  // Subject（匿名ユーザーID）
  aud: 'your-quiz-app';         // Audience
  exp: number;                  // Expiration Time（24時間）
  iat: number;                  // Issued At
  jti: string;                  // JWT ID
  
  // 匿名認証専用クレーム
  user_type: 'anonymous';       // ユーザー種別
  device_id: string;            // デバイス識別子（SHA-256ハッシュ）
  device_fingerprint: string;   // デバイスフィンガープリント
  anonymous_id: string;         // 匿名ユーザーID（ano_xxxxxxxx）
  
  // 権限・制限
  permissions: string[];        // 基本権限（create_quiz, answer_quiz）
  daily_quiz_limit: number;     // 日次投稿制限（10件）
  session_duration: number;     // セッション持続時間（24時間）
  
  // 追跡情報
  first_seen: number;           // 初回アクセス時刻
  device_platform: string;      // プラットフォーム（mobile/desktop/web）
}

// デバイスフィンガープリント生成
interface DeviceFingerprint {
  // 収集要素
  userAgent: string;            // User-Agent文字列
  screenResolution: string;     // 画面解像度
  timezone: string;             // タイムゾーン
  language: string;             // 言語設定
  platform: string;            // OS/プラットフォーム
  
  // セキュリティ考慮
  hashAlgorithm: 'SHA-256';     // ハッシュアルゴリズム
  saltRotation: 7;              // ソルトローテーション（日数）
  privacyCompliant: true;       // プライバシー準拠
  
  // 生成例
  generate(): string; // → "df_a1b2c3d4e5f6..."
}

// リフレッシュトークン設計（匿名対応）
interface AnonymousRefreshToken {
  token: string;                // リフレッシュトークン
  expiresAt: string;           // 有効期限（30日）
  deviceFingerprint: string;    // 発行デバイスのフィンガープリント
  anonymousId: string;         // 紐づく匿名ユーザーID
  lastUsed: string;            // 最終使用日時
  
  // 匿名認証特有の制限
  maxRefreshCount: number;      // 最大更新回数（100回）
  currentRefreshCount: number;  // 現在の更新回数
  deviceMigrationAllowed: boolean; // デバイス移行許可
}
```

##### デバイス識別・移行戦略

```typescript
// デバイス間移行設計
interface DeviceMigrationStrategy {
  // 移行トリガー
  triggers: {
    deviceFingerprintMismatch: boolean;   // フィンガープリント不一致
    newDeviceDetection: boolean;          // 新デバイス検出
    manualMigrationRequest: boolean;      // ユーザー明示的要求
  };
  
  // 移行プロセス
  migrationProcess: {
    // Step 1: 既存データ検証
    verifyExistingData: () => Promise<boolean>;
    
    // Step 2: 移行コード生成・表示
    generateMigrationCode: () => Promise<string>; // 6桁コード
    
    // Step 3: 新デバイスでの認証
    authenticateWithMigrationCode: (code: string) => Promise<boolean>;
    
    // Step 4: データ統合
    mergeDeviceData: () => Promise<void>;
  };
  
  // セキュリティ制限
  security: {
    migrationCodeExpiry: 3600;           // 1時間有効
    maxMigrationAttempts: 3;             // 最大試行回数
    cooldownPeriod: 86400;               // 24時間クールダウン
  };
}
```

#### セキュリティヘッダー（匿名認証対応）

```http
# 必須セキュリティヘッダー
Authorization: Bearer <ANONYMOUS_JWT_TOKEN>
X-Device-Fingerprint: <DEVICE_FINGERPRINT_HASH>
X-Anonymous-ID: <ANONYMOUS_USER_ID>
X-Request-ID: <UNIQUE_REQUEST_ID>

# デバイス識別ヘッダー
X-Device-Platform: mobile|desktop|web
X-Client-Version: <APP_VERSION>
X-Device-Timezone: <TIMEZONE_STRING>

# オプショナル・プライバシー対応ヘッダー
X-Privacy-Mode: strict|normal
X-Tracking-Consent: granted|denied
X-Data-Retention: 30d|1y|permanent
```

#### レート制限設計（コンテキスト別）

```typescript
// コンテキスト別レート制限設定
interface ContextBasedRateLimits {
  // Quiz Domain - Manage Context
  quizManage: {
    // 匿名ユーザー制限
    anonymousUser: {
      dailyQuizCreation: { requests: 10, window: 86400 };    // 10件/日
      draftOperations: { requests: 50, window: 3600 };      // 50回/時間
      imageUploads: { requests: 5, window: 3600 };          // 5回/時間
    };
    
    // IP別制限
    perIP: {
      quizSubmission: { requests: 100, window: 3600 };      // 100回/時間
      bulkOperations: { requests: 10, window: 3600 };       // 10回/時間
    };
  };
  
  // Quiz Domain - Learning Context  
  quizLearning: {
    anonymousUser: {
      sessionCreation: { requests: 20, window: 3600 };      // 20セッション/時間
      answerSubmission: { requests: 300, window: 300 };     // 300回/5分
      deckGeneration: { requests: 10, window: 600 };        // 10件/10分
    };
    
    // 検索機能の制限
    searchOperations: {
      keywordSearch: { requests: 100, window: 3600 };       // 100回/時間
      complexFilters: { requests: 50, window: 3600 };       // 50回/時間
      recommendationFetch: { requests: 30, window: 3600 };   // 30回/時間
    };
  };
  
  // User Domain
  userDomain: {
    anonymousUser: {
      sessionManagement: { requests: 100, window: 3600 };   // 100回/時間
      profileOperations: { requests: 20, window: 3600 };    // 20回/時間
      deviceMigration: { requests: 3, window: 86400 };      // 3回/日
    };
  };
  
  // Sync Domain
  syncDomain: {
    anonymousUser: {
      dataSync: { requests: 10, window: 600 };              // 10回/10分
      conflictResolution: { requests: 5, window: 3600 };    // 5回/時間
      cacheOperations: { requests: 100, window: 3600 };     // 100回/時間
    };
    
    // 重い同期処理
    heavyOperations: {
      fullSync: { requests: 2, window: 3600 };              // 2回/時間
      bulkUpload: { requests: 1, window: 1800 };            // 1回/30分
    };
  };
}

// レート制限レスポンスヘッダー
const RATE_LIMIT_HEADERS = {
  'X-RateLimit-Limit': '1000',        // 制限値
  'X-RateLimit-Remaining': '999',     // 残り回数
  'X-RateLimit-Reset': '1640995200',  // リセット時刻（UNIX timestamp）
  'X-RateLimit-Window': '3600'        // ウィンドウサイズ（秒）
};
```

### 5. データ型・バリデーション規約

#### 基本データ型定義

```typescript
// 識別子型定義
type QuizId = Brand<string, 'QuizId'>;           // qz_xxxxxxxxxxxxxxxx
type DeckId = Brand<string, 'DeckId'>;           // dk_xxxxxxxxxxxxxxxx  
type SessionId = Brand<string, 'SessionId'>;     // ss_xxxxxxxxxxxxxxxx
type AnswerId = Brand<string, 'AnswerId'>;       // an_xxxxxxxxxxxxxxxx
type CreatorId = Brand<string, 'CreatorId'>;     // cr_xxxxxxxxxxxxxxxx

// 日時型定義
type ISODateTime = Brand<string, 'ISODateTime'>; // ISO 8601 format
type UnixTimestamp = Brand<number, 'UnixTimestamp'>;

// 制約型定義
type QuizQuestion = Brand<string, 'QuizQuestion'> & {
  minLength: 10;
  maxLength: 500;
  pattern: /^[^<>]*$/;        // HTMLタグ禁止
};

type QuizExplanation = Brand<string, 'QuizExplanation'> & {
  maxLength: 1000;
  optional: true;
};

type TagName = Brand<string, 'TagName'> & {
  minLength: 1;
  maxLength: 50;
  pattern: /^[a-zA-Z0-9-_]+$/; // 英数字・ハイフン・アンダースコアのみ
};
```

#### バリデーション設計

```typescript
// 入力バリデーション定義（zod使用想定）
const CreateQuizRequestSchema = z.object({
  question: z.string()
    .min(10, 'Question must be at least 10 characters')
    .max(500, 'Question must be at most 500 characters')
    .regex(/^[^<>]*$/, 'HTML tags are not allowed'),
    
  correctAnswer: z.boolean(),
  
  explanation: z.string()
    .max(1000, 'Explanation must be at most 1000 characters')
    .optional(),
    
  tags: z.array(z.string()
    .min(1)
    .max(50)
    .regex(/^[a-zA-Z0-9-_]+$/, 'Invalid tag format'))
    .min(1, 'At least one tag is required')
    .max(10, 'Maximum 10 tags allowed'),
    
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  
  creatorFingerprint: z.string()
    .min(10, 'Device fingerprint required')
});

// バリデーションエラーレスポンス
interface ValidationErrorResponse {
  success: false;
  error: {
    code: 'VALIDATION_ERROR';
    message: 'Request validation failed';
    details: {
      field: string;              // エラー対象フィールド
      value: any;                 // 問題のある値
      constraints: string[];      // 制約違反の詳細
    }[];
  };
}
```

### 6. パフォーマンス最適化原則

#### コンテキスト別パフォーマンス目標

```typescript
// 境界づけられたコンテキスト別パフォーマンス目標
interface ContextPerformanceTargets {
  // Quiz Domain - Manage Context
  quizManage: {
    quizCreation: { target: 200, threshold: 300 };        // 95%ile ≤200ms
    draftSaving: { target: 100, threshold: 150 };         // 95%ile ≤100ms
    approvalProcess: { target: 500, threshold: 750 };     // 95%ile ≤500ms
    bulkOperations: { target: 2000, threshold: 3000 };    // バルク処理
  };
  
  // Quiz Domain - Learning Context
  quizLearning: {
    deckGeneration: { target: 150, threshold: 200 };      // 95%ile ≤150ms
    sessionStart: { target: 100, threshold: 150 };        // 95%ile ≤100ms
    answerSubmission: { target: 50, threshold: 100 };     // 95%ile ≤50ms
    historyFetch: { target: 200, threshold: 300 };        // 95%ile ≤200ms
    
    // 検索パフォーマンス
    keywordSearch: { target: 200, threshold: 300 };       // 95%ile ≤200ms
    complexFilters: { target: 300, threshold: 500 };      // 複合検索
    recommendations: { target: 150, threshold: 200 };     // 推奨取得
  };
  
  // User Domain
  userDomain: {
    sessionCreation: { target: 100, threshold: 150 };     // 95%ile ≤100ms
    authVerification: { target: 20, threshold: 50 };      // 95%ile ≤20ms
    deviceMigration: { target: 1000, threshold: 1500 };   // デバイス移行
  };
  
  // Sync Domain
  syncDomain: {
    dataUpload: { target: 1000, threshold: 1500 };        // 95%ile ≤1000ms
    conflictResolution: { target: 300, threshold: 500 };  // 95%ile ≤300ms
    cacheManifest: { target: 100, threshold: 150 };       // キャッシュ状態
  };
}
```

#### キャッシュ戦略（匿名ユーザー対応）

```typescript
// コンテキスト別キャッシュ戦略
interface ContextBasedCacheStrategy {
  // Quiz Domain - 公開データのキャッシュ
  quizDomain: {
    // 長期キャッシュ（承認済みクイズ）
    publishedQuizzes: {
      'Cache-Control': 'public, max-age=3600';            // 1時間
      'ETag': true;
      'Vary': 'Accept-Language, X-Device-Platform';
    };
    
    // 検索結果キャッシュ
    searchResults: {
      'Cache-Control': 'public, max-age=300';             // 5分
      'Vary': 'X-Anonymous-ID';                           // 個人化考慮
    };
    
    // Deckメタデータ
    deckMetadata: {
      'Cache-Control': 'private, max-age=1800';           // 30分
      'ETag': true;
    };
  };
  
  // User Domain - 個人データ
  userDomain: {
    // セッション情報（キャッシュ禁止）
    sessionData: {
      'Cache-Control': 'private, no-cache, no-store, must-revalidate';
      'Pragma': 'no-cache';
    };
    
    // 学習進捗（短期キャッシュ）
    learningProgress: {
      'Cache-Control': 'private, max-age=60';             // 1分
      'ETag': true;
    };
  };
  
  // Sync Domain - 同期最適化
  syncDomain: {
    // キャッシュマニフェスト
    cacheManifest: {
      'Cache-Control': 'private, max-age=300';            // 5分
      'ETag': true;
    };
    
    // 同期状態（キャッシュ禁止）
    syncStatus: {
      'Cache-Control': 'private, no-cache';
    };
  };
}

// Conditional Requests
const CONDITIONAL_HEADERS = {
  'If-None-Match': '<etag>',          // ETag比較
  'If-Modified-Since': '<date>',      // 最終更新日比較
  'If-Unmodified-Since': '<date>',    // 更新競合防止
};
```

#### 圧縮・最適化

```typescript
// レスポンス圧縮設定
const COMPRESSION_RULES = {
  gzip: {
    enabled: true,
    level: 6,                    // 圧縮レベル（1-9）
    threshold: 1024,             // 最小サイズ（bytes）
  },
  brotli: {
    enabled: true,
    quality: 6,                  // 品質レベル（1-11）
    threshold: 1024,
  }
};

// Field Selection（レスポンス最適化）
interface FieldSelectionQuery {
  fields?: string[];             // 必要フィールドのみ選択
  include?: string[];            // 関連リソース含有
  exclude?: string[];            // 除外フィールド指定
}

// 例：/api/v1/quizzes?fields=id,question,tags&include=statistics
```

### 7. エラーハンドリング設計

#### エラー分類体系

```typescript
// エラーカテゴリ定義
enum ErrorCategory {
  AUTHENTICATION = 'AUTH',       // 認証関連
  AUTHORIZATION = 'AUTHZ',       // 認可関連  
  VALIDATION = 'VALID',          // バリデーション
  RESOURCE = 'RESOURCE',         // リソース関連
  BUSINESS = 'BUSINESS',         // ビジネスロジック
  EXTERNAL = 'EXTERNAL',         // 外部システム
  SYSTEM = 'SYSTEM'              // システム内部
}

// 具体的エラーコード
const ERROR_CODES = {
  // 認証エラー（匿名ユーザー対応）
  AUTH_INVALID_TOKEN: 'AUTH_INVALID_TOKEN',
  AUTH_TOKEN_EXPIRED: 'AUTH_TOKEN_EXPIRED',
  AUTH_INVALID_DEVICE: 'AUTH_INVALID_DEVICE',
  AUTH_DEVICE_FINGERPRINT_MISMATCH: 'AUTH_DEVICE_FINGERPRINT_MISMATCH',
  AUTH_ANONYMOUS_SESSION_EXPIRED: 'AUTH_ANONYMOUS_SESSION_EXPIRED',
  AUTH_DEVICE_MIGRATION_REQUIRED: 'AUTH_DEVICE_MIGRATION_REQUIRED',
  AUTH_DEVICE_MIGRATION_FAILED: 'AUTH_DEVICE_MIGRATION_FAILED',
  
  // 認可エラー
  AUTHZ_INSUFFICIENT_PERMISSIONS: 'AUTHZ_INSUFFICIENT_PERMISSIONS',
  AUTHZ_RESOURCE_ACCESS_DENIED: 'AUTHZ_RESOURCE_ACCESS_DENIED',
  
  // バリデーションエラー
  VALID_REQUIRED_FIELD: 'VALID_REQUIRED_FIELD',
  VALID_INVALID_FORMAT: 'VALID_INVALID_FORMAT',
  VALID_LENGTH_EXCEEDED: 'VALID_LENGTH_EXCEEDED',
  VALID_ENUM_VALUE: 'VALID_ENUM_VALUE',
  
  // リソースエラー
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  RESOURCE_ALREADY_EXISTS: 'RESOURCE_ALREADY_EXISTS',
  RESOURCE_CONFLICT: 'RESOURCE_CONFLICT',
  RESOURCE_DELETED: 'RESOURCE_DELETED',
  
  // ビジネスエラー（匿名ユーザー対応）
  BUSINESS_QUIZ_LIMIT_EXCEEDED: 'BUSINESS_QUIZ_LIMIT_EXCEEDED',
  BUSINESS_SESSION_EXPIRED: 'BUSINESS_SESSION_EXPIRED',
  BUSINESS_INVALID_STATE: 'BUSINESS_INVALID_STATE',
  BUSINESS_ANONYMOUS_DAILY_LIMIT: 'BUSINESS_ANONYMOUS_DAILY_LIMIT',
  BUSINESS_DEVICE_MIGRATION_LIMIT: 'BUSINESS_DEVICE_MIGRATION_LIMIT',
  BUSINESS_SYNC_CONFLICT_UNRESOLVABLE: 'BUSINESS_SYNC_CONFLICT_UNRESOLVABLE',
  BUSINESS_OFFLINE_DATA_CORRUPTED: 'BUSINESS_OFFLINE_DATA_CORRUPTED',
  
  // 外部システムエラー
  EXTERNAL_SERVICE_UNAVAILABLE: 'EXTERNAL_SERVICE_UNAVAILABLE',
  EXTERNAL_TIMEOUT: 'EXTERNAL_TIMEOUT',
  
  // システムエラー
  SYSTEM_INTERNAL_ERROR: 'SYSTEM_INTERNAL_ERROR',
  SYSTEM_DATABASE_ERROR: 'SYSTEM_DATABASE_ERROR',
  SYSTEM_RATE_LIMIT: 'SYSTEM_RATE_LIMIT'
};
```

#### エラーレスポンス詳細設計

```typescript
// 包括的エラーレスポンス
interface DetailedErrorResponse {
  success: false;
  error: {
    // 基本情報
    code: string;                     // エラーコード
    message: string;                  // ユーザー向けメッセージ
    category: ErrorCategory;          // エラーカテゴリ
    
    // 詳細情報
    details?: {
      field?: string;                 // エラー対象フィールド
      value?: any;                    // 問題値
      constraints?: string[];         // 制約条件
      suggestion?: string;            // 解決提案
    };
    
    // バリデーションエラー（複数フィールド）
    violations?: Array<{
      field: string;
      code: string;
      message: string;
      value?: any;
    }>;
    
    // デバッグ情報（開発環境のみ）
    debug?: {
      trace?: string;                 // スタックトレース
      query?: string;                 // 実行クエリ
      context?: Record<string, any>;  // 実行コンテキスト
    };
  };
  
  meta: {
    requestId: string;                // リクエスト追跡ID
    timestamp: string;                // エラー発生時刻
    path: string;                     // リクエストパス
    method: string;                   // HTTPメソッド
  };
}

// エラーレスポンス例
const ERROR_RESPONSE_EXAMPLES = {
  validationError: {
    success: false,
    error: {
      code: 'VALID_REQUIRED_FIELD',
      message: 'Required fields are missing',
      category: 'VALID',
      violations: [
        {
          field: 'question',
          code: 'REQUIRED',
          message: 'Question is required'
        },
        {
          field: 'tags',
          code: 'MIN_LENGTH',
          message: 'At least one tag is required',
          value: []
        }
      ]
    },
    meta: {
      requestId: 'req_123456789',
      timestamp: '2025-01-30T10:30:00Z',
      path: '/api/v1/quiz-management/quizzes',
      method: 'POST'
    }
  },
  
  businessError: {
    success: false,
    error: {
      code: 'BUSINESS_QUIZ_LIMIT_EXCEEDED',
      message: 'Daily quiz creation limit exceeded',
      category: 'BUSINESS',
      details: {
        suggestion: 'You can create more quizzes tomorrow, or upgrade to premium plan'
      }
    },
    meta: {
      requestId: 'req_987654321',
      timestamp: '2025-01-30T15:45:00Z',
      path: '/api/v1/quiz-management/quizzes',
      method: 'POST'
    }
  }
};
```

### 8. ドキュメンテーション原則

#### OpenAPI仕様書自動生成

```yaml
# openapi.yaml基本構造
openapi: 3.0.3
info:
  title: Your Quiz API
  version: 1.0.0
  description: |
    Your Quiz アプリケーション API
    
    ## 認証
    Bearer Token (JWT) による認証を使用
    
    ## レート制限
    - IP別: 1000リクエスト/時間
    - ユーザー別: エンドポイント毎に設定
    
  contact:
    name: API Support
    url: https://github.com/your-quiz/api-docs
  license:
    name: MIT
    url: https://opensource.org/licenses/MIT

servers:
  - url: https://api.your-quiz.com/v1
    description: Production server
  - url: https://api-dev.your-quiz.com/v1  
    description: Development server

# セキュリティ定義
components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
    DeviceFingerprint:
      type: apiKey
      in: header
      name: X-Device-Fingerprint

# 共通コンポーネント
  schemas:
    Error:
      type: object
      required: [success, error]
      properties:
        success:
          type: boolean
          example: false
        error:
          $ref: '#/components/schemas/ErrorDetail'
          
    ErrorDetail:
      type: object
      required: [code, message, category]
      properties:
        code:
          type: string
          example: VALIDATION_ERROR
        message:
          type: string
          example: Request validation failed
        category:
          type: string
          enum: [AUTH, AUTHZ, VALID, RESOURCE, BUSINESS, EXTERNAL, SYSTEM]
```

#### APIドキュメント構成

```typescript
// ドキュメント構成規約
interface APIDocumentationStructure {
  // エンドポイント記述
  endpoint: {
    summary: string;              // 1行要約
    description: string;          // 詳細説明
    operationId: string;          // 一意操作ID
    tags: string[];              // カテゴリタグ
  };
  
  // パラメータ記述
  parameters: {
    name: string;                 // パラメータ名
    in: 'path' | 'query' | 'header' | 'cookie';
    required: boolean;
    schema: object;               // JSON Schema
    description: string;          // 説明
    example: any;                 // 使用例
  }[];
  
  // リクエスト記述
  requestBody: {
    description: string;
    required: boolean;
    content: {
      'application/json': {
        schema: object;           // JSON Schema
        examples: object;         // 複数例
      };
    };
  };
  
  // レスポンス記述
  responses: {
    [statusCode: string]: {
      description: string;
      content?: {
        'application/json': {
          schema: object;
          examples: object;
        };
      };
      headers?: object;           // レスポンスヘッダー
    };
  };
}
```

### 9. 実装ガイドライン

#### Controller層設計パターン

```typescript
// 標準Controller構造（新URL構造・匿名認証対応）
@Controller('/api/quiz/v1/manage')
export class QuizManageController {
  constructor(
    private quizService: QuizService,
    private eventBus: EventBus,
    private validator: RequestValidator,
    private logger: Logger
  ) {}

  @Post('/quizzes')
  @UseGuards(AnonymousAuthGuard, RateLimitGuard)
  @ApiOperation({ 
    summary: 'Create new quiz',
    description: 'Anonymous user can create quiz with device fingerprint'
  })
  async createQuiz(
    @Body() request: CreateQuizRequest,
    @Headers('x-device-fingerprint') deviceFingerprint: string,
    @Headers('x-anonymous-id') anonymousId: string,
    @Req() req: AnonymousAuthenticatedRequest
  ): Promise<CreateQuizResponse> {
    // 1. リクエストバリデーション
    const validatedData = await this.validator.validate(
      CreateQuizRequestSchema,
      request
    );
    
    // 2. ビジネスロジック実行（イベント駆動）
    const quiz = await this.quizService.createQuiz({
      ...validatedData,
      creatorFingerprint: deviceFingerprint,
      createdBy: anonymousId
    });
    
    // 3. ドメインイベント発行
    await this.eventBus.publish(new QuizSubmittedEvent({
      quizId: quiz.id,
      creatorId: anonymousId,
      deviceFingerprint,
      tags: quiz.tags,
      submittedAt: new Date()
    }));
    
    // 4. レスポンス構築
    return {
      success: true,
      data: {
        quiz: {
          id: quiz.id,
          status: quiz.status,
          createdAt: quiz.createdAt.toISOString(),
          approvalEstimate: quiz.getApprovalEstimate()?.toISOString()
        }
      },
      meta: {
        requestId: req.requestId,
        timestamp: new Date().toISOString(),
        version: 'v1'
      }
    };
  }

  // 動詞API - 複雑ビジネスロジック
  @Post('/quizzes/:id/approve')
  @UseGuards(AnonymousAuthGuard, AdminRoleGuard)
  @ApiOperation({ summary: 'Approve quiz for publication' })
  async approveQuiz(
    @Param('id') quizId: string,
    @Body() request: ApproveQuizRequest,
    @Headers('x-anonymous-id') reviewerId: string,
    @Req() req: AnonymousAuthenticatedRequest
  ): Promise<ApproveQuizResponse> {
    // 1. 承認権限確認
    await this.quizService.verifyApprovalPermissions(reviewerId);
    
    // 2. 複雑な承認処理実行
    const approvalResult = await this.quizService.approveQuiz({
      quizId,
      reviewerId,
      reviewComment: request.comment,
      qualityScore: request.qualityScore
    });
    
    // 3. 承認イベント発行（WebSocket通知トリガー）
    await this.eventBus.publish(new QuizApprovedEvent({
      quizId,
      reviewerId,
      creatorId: approvalResult.creatorId,
      approvedAt: new Date(),
      publicationSchedule: approvalResult.publicationSchedule
    }));
    
    return {
      success: true,
      data: {
        approvalId: approvalResult.approvalId,
        status: 'approved',
        publicationScheduledAt: approvalResult.publicationSchedule.toISOString(),
        qualityScore: approvalResult.qualityScore
      }
    };
  }
}

// WebSocket Gateway - リアルタイム通知
@WebSocketGateway({
  cors: { origin: '*' },
  path: '/api/realtime'
})
export class QuizNotificationGateway {
  constructor(private eventBus: EventBus) {
    // イベント→WebSocket通知の統合
    this.setupEventSubscriptions();
  }
  
  private setupEventSubscriptions() {
    // クイズ承認通知
    this.eventBus.subscribe(QuizApprovedEvent, async (event) => {
      await this.notifyCreator(event.creatorId, {
        type: 'quiz_approved',
        quizId: event.quizId,
        message: 'Your quiz has been approved!',
        timestamp: event.approvedAt.toISOString()
      });
    });
  }
  
  @SubscribeMessage('subscribe_creator_notifications')
  async subscribeCreatorNotifications(
    @MessageBody() data: { anonymousId: string },
    @ConnectedSocket() client: Socket
  ): Promise<void> {
    await client.join(`creator_${data.anonymousId}`);
  }

  async notifyCreator(creatorId: string, notification: any): Promise<void> {
    this.server.to(`creator_${creatorId}`).emit('notification', notification);
  }
}
```

#### Service層設計パターン

```typescript
// ドメインサービス設計
export class QuizService {
  constructor(
    private quizRepository: QuizRepository,
    private eventBus: EventBus,
    private approvalService: ApprovalService
  ) {}

  async createQuiz(command: CreateQuizCommand): Promise<Quiz> {
    // 1. ドメインオブジェクト作成
    const quiz = Quiz.create({
      question: QuestionText.from(command.question),
      correctAnswer: command.correctAnswer,
      explanation: command.explanation ? 
        ExplanationText.from(command.explanation) : undefined,
      tags: command.tags.map(tag => TagName.from(tag)),
      difficulty: Difficulty.from(command.difficulty),
      createdBy: CreatorId.from(command.createdBy)
    });

    // 2. ビジネスルール検証
    await this.validateQuizCreation(quiz, command.createdBy);

    // 3. 永続化
    const savedQuiz = await this.quizRepository.save(quiz);

    // 4. ドメインイベント発行
    await this.eventBus.publish(
      new QuizSubmittedEvent(savedQuiz.id, savedQuiz.createdBy)
    );

    // 5. 承認フロー開始
    await this.approvalService.requestApproval(savedQuiz.id);

    return savedQuiz;
  }

  private async validateQuizCreation(quiz: Quiz, creatorId: CreatorId): Promise<void> {
    // 日次作成制限チェック
    const todayCount = await this.quizRepository.countByCreatorToday(creatorId);
    if (todayCount >= DAILY_QUIZ_LIMIT) {
      throw new BusinessRuleViolationException(
        'BUSINESS_QUIZ_LIMIT_EXCEEDED',
        'Daily quiz creation limit exceeded'
      );
    }

    // 重複チェック
    const duplicateExists = await this.quizRepository.existsByQuestionHash(
      quiz.getQuestionHash()
    );
    if (duplicateExists) {
      throw new BusinessRuleViolationException(
        'BUSINESS_DUPLICATE_QUESTION',
        'Similar question already exists'
      );
    }
  }
}
```

### 10. テスト設計原則

#### APIテスト戦略

```typescript
// 統合テスト例
describe('Quiz Management API', () => {
  let app: INestApplication;
  let authToken: string;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // 認証トークン取得
    authToken = await getTestAuthToken();
  });

  describe('POST /api/quiz/v1/manage/quizzes', () => {
    it('should create quiz successfully with anonymous auth', async () => {
      const request = {
        question: 'JavaScriptで配列を作成する方法は？',
        correctAnswer: true,
        explanation: '[]を使用して空の配列を作成できます',
        tags: ['javascript', 'array'],
        difficulty: 'beginner'
      };

      const response = await supertest(app.getHttpServer())
        .post('/api/quiz/v1/manage/quizzes')
        .set('Authorization', `Bearer ${authToken}`)
        .set('X-Device-Fingerprint', 'df_a1b2c3d4e5f6789abcdef')
        .set('X-Anonymous-ID', 'ano_test123456')
        .send(request)
        .expect(201);

      expect(response.body).toMatchObject({
        success: true,
        data: {
          quiz: {
            id: expect.stringMatching(/^qz_/),
            status: 'pending_approval',
            createdAt: expect.any(String)
          }
        }
      });
    });

    it('should return validation error for invalid request', async () => {
      const request = {
        question: '',  // 空文字（無効）
        correctAnswer: true,
        tags: []       // 空配列（無効）
      };

      const response = await supertest(app.getHttpServer())
        .post('/api/quiz/v1/manage/quizzes')
        .set('Authorization', `Bearer ${authToken}`)
        .set('X-Device-Fingerprint', 'df_a1b2c3d4e5f6789abcdef')
        .set('X-Anonymous-ID', 'ano_test123456')
        .send(request)
        .expect(422);

      expect(response.body).toMatchObject({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          violations: expect.arrayContaining([
            expect.objectContaining({
              field: 'question',
              code: 'MIN_LENGTH'
            }),
            expect.objectContaining({
              field: 'tags',
              code: 'MIN_LENGTH'
            })
          ])
        }
      });
    });

    it('should return rate limit error when exceeded', async () => {
      // レート制限テスト用の大量リクエスト送信
      const requests = Array.from({ length: 15 }, () =>
        supertest(app.getHttpServer())
          .post('/api/quiz/v1/manage/quizzes')
          .set('Authorization', `Bearer ${authToken}`)
          .set('X-Device-Fingerprint', 'df_a1b2c3d4e5f6789abcdef')
          .set('X-Anonymous-ID', 'ano_test123456')
          .send({
            question: `Test question ${Math.random()}`,
            correctAnswer: true,
            tags: ['test']
          })
      );

      const responses = await Promise.all(requests);
      
      // 最後のリクエストはレート制限エラーになるはず
      const lastResponse = responses[responses.length - 1];
      expect(lastResponse.status).toBe(429);
      expect(lastResponse.body.error.code).toBe('SYSTEM_RATE_LIMIT');
    });
  });
});
```

## まとめ

この設計原則・命名規約により、以下の品質特性を持つAPI実装が実現される：

### 品質特性

1. **一貫性**: 統一的な設計原則による実装の一貫性
2. **可読性**: 明確な命名規約による理解しやすさ
3. **保守性**: 標準的なパターンによる保守容易性
4. **拡張性**: モジュラー設計による機能拡張の容易さ
5. **信頼性**: エラーハンドリング・バリデーションの充実
6. **パフォーマンス**: キャッシュ・最適化戦略の統一

### 開発効率の向上

- **自動生成**: OpenAPI仕様書・型定義の自動生成
- **テスト容易性**: 標準化されたテストパターン
- **ドキュメント**: 自動更新される包括的なドキュメント
- **品質保証**: 一貫したバリデーション・エラー処理

実装フェーズでは、この原則に基づいてTypeScript・NestJS・TypeSpecによる具体的なコード実装を進める。

## 関連ドキュメント

- [API設計概要](../project/api-design/README.md) - 全体アーキテクチャ・方針
- [API機能カタログ](../project/api-design/api-catalog.md) - 87エンドポイントの詳細仕様
- [非機能要件仕様書](../project/api-design/non-functional-requirements.md) - パフォーマンス・スケーラビリティ要件
- [イベント駆動API統合](../project/api-design/event-integration.md) - イベント連携・リアルタイム機能

---
**作成工程**: API設計  
**作成日**: 2025-08-01  
**更新日**: 2025-08-02
