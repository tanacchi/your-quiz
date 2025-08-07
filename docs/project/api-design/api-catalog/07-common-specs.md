# API共通仕様

## 責務

- 認証・認可仕様
- 共通レスポンス形式
- エラーハンドリング
- パフォーマンス最適化

## 共通仕様詳細

### 7.1 認証・認可

#### 認証ヘッダー

```http
Authorization: Bearer <JWT_TOKEN>
X-Device-Fingerprint: <DEVICE_ID>
X-Request-ID: <UNIQUE_REQUEST_ID>
```

#### JWT形式

```typescript
interface JWTPayload {
  userId: string;
  sessionId: string;
  deviceFingerprint: string;
  permissions: string[];
  exp: number;
  iat: number;
  iss: string;
}
```

#### 権限レベル

```typescript
const PERMISSIONS = {
  QUIZ_CREATE: 'quiz:create',
  QUIZ_UPDATE: 'quiz:update',
  QUIZ_DELETE: 'quiz:delete',
  QUIZ_APPROVE: 'quiz:approve',
  QUIZ_ANSWER: 'quiz:answer',
  USER_READ: 'user:read',
  USER_UPDATE: 'user:update',
  ADMIN: 'admin:*'
};
```

### 7.2 共通レスポンス形式

#### 標準レスポンス

```typescript
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    requestId: string;
    timestamp: string;
    version: string;
  };
}
```

#### エラーレスポンス

```typescript
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: {
      field?: string;
      value?: any;
      constraint?: string;
    };
  };
  meta: {
    requestId: string;
    timestamp: string;
    version: string;
  };
}
```

### 7.3 エラーコード体系

```typescript
const ERROR_CODES = {
  // 認証・認可
  'AUTH_INVALID_TOKEN': 'トークンが無効です',
  'AUTH_TOKEN_EXPIRED': 'トークンの有効期限が切れています',
  'AUTH_INSUFFICIENT_PERMISSIONS': '権限が不足しています',

  // バリデーション
  'VALIDATION_REQUIRED_FIELD': '必須項目が不足しています',
  'VALIDATION_INVALID_FORMAT': '形式が正しくありません',
  'VALIDATION_LENGTH_EXCEEDED': '文字数制限を超えています',

  // リソース
  'RESOURCE_NOT_FOUND': 'リソースが見つかりません',
  'RESOURCE_ALREADY_EXISTS': 'リソースが既に存在します',
  'RESOURCE_CONFLICT': 'リソースが競合状態です',

  // レート制限
  'RATE_LIMIT_EXCEEDED': 'レート制限を超過しました',
  'QUOTA_EXCEEDED': '利用上限を超過しました',

  // システム
  'INTERNAL_SERVER_ERROR': 'サーバー内部エラーが発生しました',
  'SERVICE_UNAVAILABLE': 'サービスが一時的に利用できません'
};
```

### 7.4 HTTPステータスコード使用方針

| ステータスコード | 用途 | 説明 |
|----------------|------|------|
| 200 OK | 成功 | 正常な処理完了 |
| 201 Created | 作成成功 | リソース作成完了 |
| 204 No Content | 削除成功 | リソース削除完了 |
| 400 Bad Request | リクエスト不正 | バリデーションエラー |
| 401 Unauthorized | 認証エラー | トークン無効・期限切れ |
| 403 Forbidden | 認可エラー | 権限不足 |
| 404 Not Found | リソース不存在 | 指定リソースが見つからない |
| 409 Conflict | 競合エラー | リソース競合状態 |
| 422 Unprocessable Entity | 処理不可 | 意味的バリデーションエラー |
| 429 Too Many Requests | レート制限 | API呼び出し回数制限 |
| 500 Internal Server Error | サーバーエラー | 予期しないシステムエラー |
| 503 Service Unavailable | サービス利用不可 | 一時的なサービス停止 |

### 7.5 パフォーマンス最適化

#### キャッシュ戦略

```typescript
// Redis Cache Keys
const CACHE_KEYS = {
  PUBLISHED_QUIZZES: 'quizzes:published:*',
  USER_SESSIONS: 'sessions:user:*',
  SEARCH_RESULTS: 'search:results:*',
  RECOMMENDATIONS: 'recommendations:user:*',
  STATISTICS: 'stats:*'
};

// Cache TTL Settings
const CACHE_TTL = {
  PUBLISHED_QUIZZES: 3600,    // 1時間
  SEARCH_RESULTS: 1800,       // 30分
  RECOMMENDATIONS: 7200,      // 2時間
  USER_SESSIONS: 86400,       // 24時間
  STATISTICS: 300             // 5分
};
```

#### Pagination戦略

```typescript
interface PaginationOptions {
  limit: number;              // デフォルト20、最大100
  offset?: number;            // オフセットベース
  cursor?: string;            // カーソルベース（大量データ）
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
}

interface PaginationResult<T> {
  items: T[];
  pagination: {
    total?: number;           // オフセットベースの場合のみ
    hasMore: boolean;
    nextCursor?: string;      // カーソルベースの場合
    prevCursor?: string;
  };
}
```

#### レスポンス圧縮

```typescript
interface CompressionOptions {
  gzip: boolean;              // gzip圧縮有効化
  minSize: number;            // 圧縮対象最小サイズ（bytes）
  exclude: string[];          // 圧縮除外Content-Type
}

const COMPRESSION_CONFIG: CompressionOptions = {
  gzip: true,
  minSize: 1024,              // 1KB以上で圧縮
  exclude: ['image/*', 'video/*', 'audio/*']
};
```

### 7.6 バリデーション共通ルール

#### 文字列検証

```typescript
const VALIDATION_RULES = {
  QUIZ_QUESTION: {
    minLength: 10,
    maxLength: 500,
    pattern: /^[^<>'"&]*$/,    // HTMLタグ・危険文字禁止
  },
  QUIZ_EXPLANATION: {
    minLength: 0,
    maxLength: 1000,
    pattern: /^[^<>'"&]*$/,
  },
  TAG_NAME: {
    minLength: 1,
    maxLength: 50,
    pattern: /^[a-zA-Z0-9\-_]+$/,  // 英数字・ハイフン・アンダースコアのみ
  },
  USER_INPUT: {
    maxLength: 200,
    pattern: /^[^<>'"&]*$/,
  }
};
```

#### 数値検証

```typescript
const NUMERIC_LIMITS = {
  PAGINATION_LIMIT: { min: 1, max: 100, default: 20 },
  PAGINATION_OFFSET: { min: 0, max: 10000 },
  ANSWER_TIME_MS: { min: 100, max: 600000 },  // 0.1秒〜10分
  CONFIDENCE_LEVEL: { min: 1, max: 5 },
  CORRECT_RATE: { min: 0, max: 100 },
  TAGS_PER_QUIZ: { min: 1, max: 10 },
  QUIZ_PER_DECK: { min: 1, max: 100 }
};
```

### 7.7 セキュリティ仕様

#### レート制限

```typescript
const RATE_LIMITS = {
  QUIZ_CREATION: { requests: 10, window: '1d' },      // 1日10件
  SEARCH_QUERIES: { requests: 100, window: '1h' },    // 1時間100回
  ANSWER_SUBMISSION: { requests: 1000, window: '1h' }, // 1時間1000回
  LOGIN_ATTEMPTS: { requests: 5, window: '15m' },     // 15分5回
  API_GENERAL: { requests: 1000, window: '1h' }       // 一般API: 1時間1000回
};
```

#### 入力サニタイゼーション

```typescript
const SANITIZATION_RULES = {
  HTML_STRIP: true,           // HTMLタグ除去
  SCRIPT_BLOCK: true,         // スクリプトタグブロック
  SQL_ESCAPE: true,           // SQL文字エスケープ
  XSS_PROTECTION: true,       // XSS対策
  CSRF_TOKEN_REQUIRED: true   // CSRFトークン必須
};
```

### 7.8 ログ・監視仕様

#### ログレベル

```typescript
enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  FATAL = 'fatal'
}
```

#### 監視メトリクス

```typescript
const METRICS = {
  REQUEST_COUNT: 'api_requests_total',
  REQUEST_DURATION: 'api_request_duration_seconds',
  ERROR_COUNT: 'api_errors_total',
  ACTIVE_USERS: 'active_users_total',
  QUIZ_SUBMISSIONS: 'quiz_submissions_total',
  CACHE_HIT_RATE: 'cache_hit_rate',
  DB_CONNECTION_POOL: 'db_connections_active'
};
```

### 7.9 国際化対応

#### 多言語サポート

```typescript
interface I18nResponse {
  message: string;
  locale: string;
  translations?: Record<string, string>;
}

const SUPPORTED_LOCALES = ['ja', 'en'] as const;
type SupportedLocale = typeof SUPPORTED_LOCALES[number];
```

#### 日時形式

```typescript
const DATE_FORMATS = {
  ISO8601: 'YYYY-MM-DDTHH:mm:ss.sssZ',
  DISPLAY: 'YYYY年MM月DD日 HH:mm',
  DATE_ONLY: 'YYYY-MM-DD'
};
```

## 関連ドキュメント

- [API設計概要](../README.md)
- [Quiz Management API](01-quiz-management.md)
- [Quiz Learning API](02-quiz-learning.md)
- [User Session API](03-user-session.md)
- [Offline Sync API](04-offline-sync.md)
- [Search & Discovery API](05-search-discovery.md)
- [Integration Patterns](06-integration-patterns.md)
- [Operations API](08-operations.md)

---
**ドメイン**: Common Specifications  
**作成工程**: API設計  
**TypeSpec対応**: `api/spec/common/`
