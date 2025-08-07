# 運用・監視API

## 責務

- システムヘルスチェック
- パフォーマンス監視
- ユーザー行動分析
- 運用メトリクス収集

## エンドポイント一覧

### 8.1 ヘルスチェック

```http
GET    /api/health
GET    /api/health/detailed
GET    /api/health/dependencies
```

#### GET /api/health

**目的**: システム基本ヘルスチェック

**対応**: ロードバランサー・監視システム

**レスポンス**:

```typescript
interface HealthResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  uptime: number;           // 秒
  version: string;
}
```

#### GET /api/health/detailed

**目的**: 詳細ヘルスチェック（コンポーネント別）

**レスポンス**:

```typescript
interface DetailedHealthResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  components: {
    database: {
      status: 'healthy' | 'degraded' | 'unhealthy';
      responseTime: number;   // ms
      connectionPool: {
        active: number;
        idle: number;
        total: number;
      };
    };
    redis: {
      status: 'healthy' | 'degraded' | 'unhealthy';
      responseTime: number;
      memoryUsage: number;    // MB
    };
    external: {
      status: 'healthy' | 'degraded' | 'unhealthy';
      services: Record<string, {
        status: string;
        responseTime: number;
      }>;
    };
  };
  metrics: {
    requestsPerMinute: number;
    errorRate: number;        // %
    averageResponseTime: number; // ms
  };
}
```

#### GET /api/health/dependencies

**目的**: 外部依存関係の状態確認

**レスポンス**:

```typescript
interface DependenciesHealthResponse {
  dependencies: Array<{
    name: string;
    type: 'database' | 'cache' | 'external_api' | 'queue';
    status: 'healthy' | 'degraded' | 'unhealthy';
    responseTime: number;
    lastCheck: string;
    details?: string;
  }>;
  summary: {
    total: number;
    healthy: number;
    degraded: number;
    unhealthy: number;
  };
}
```

### 8.2 メトリクス・分析

```http
GET    /api/metrics/usage
GET    /api/metrics/performance
GET    /api/analytics/user-behavior
POST   /api/analytics/events
```

#### GET /api/metrics/usage

**目的**: システム使用状況メトリクス取得

**対応**: 運用ダッシュボード・容量計画

**クエリパラメータ**:

| パラメータ名 | 種別 | 必須 | 型 | デフォルト値 | 制約 | 説明・例 |
|-------------|------|------|----|-----------|----|----------|
| period | query | 任意 | enum | "1h" | 1h/24h/7d/30d | 集計期間 |
| granularity | query | 任意 | enum | "1m" | 1m/5m/1h/1d | データ粒度 |

**レスポンス**:

```typescript
interface UsageMetricsResponse {
  period: {
    start: string;
    end: string;
    granularity: string;
  };
  metrics: {
    requests: {
      total: number;
      successful: number;
      failed: number;
      rate: number;           // requests/sec
    };
    users: {
      active: number;
      new: number;
      returning: number;
    };
    quizzes: {
      created: number;
      answered: number;
      sessions: number;
    };
    resources: {
      cpuUsage: number;       // %
      memoryUsage: number;    // %
      diskUsage: number;      // %
      networkIO: number;      // MB
    };
  };
  trends: Array<{
    timestamp: string;
    requests: number;
    activeUsers: number;
    responseTime: number;
  }>;
}
```

#### GET /api/metrics/performance

**目的**: パフォーマンスメトリクス取得

**レスポンス**:

```typescript
interface PerformanceMetricsResponse {
  responseTime: {
    average: number;         // ms
    p50: number;
    p95: number;
    p99: number;
  };
  throughput: {
    requestsPerSecond: number;
    queriesPerSecond: number;
  };
  errors: {
    rate: number;            // %
    byType: Record<string, number>;
    recent: Array<{
      timestamp: string;
      error: string;
      count: number;
    }>;
  };
  cache: {
    hitRate: number;         // %
    missRate: number;        // %
    evictionRate: number;    // %
  };
  database: {
    connectionPool: {
      active: number;
      idle: number;
      waiting: number;
    };
    queryTime: {
      average: number;
      slowQueries: Array<{
        query: string;
        duration: number;
        timestamp: string;
      }>;
    };
  };
}
```

#### GET /api/analytics/user-behavior

**目的**: ユーザー行動分析データ取得

**クエリパラメータ**:

| パラメータ名 | 種別 | 必須 | 型 | デフォルト値 | 制約 | 説明・例 |
|-------------|------|------|----|-----------|----|----------|
| dateRange | query | 任意 | string | "7d" | 1d/7d/30d/90d | 分析期間 |
| segment | query | 任意 | enum | "all" | all/new/returning/power | ユーザーセグメント |

**レスポンス**:

```typescript
interface UserBehaviorResponse {
  summary: {
    totalUsers: number;
    activeUsers: number;
    retentionRate: number;   // %
    averageSessionDuration: number; // minutes
  };
  engagement: {
    dailyActiveUsers: Array<{
      date: string;
      count: number;
    }>;
    sessionDuration: {
      average: number;
      distribution: Record<string, number>; // time ranges
    };
    quizInteraction: {
      averageQuizzesPerSession: number;
      completionRate: number; // %
      popularTags: Array<{
        tag: string;
        usage: number;
      }>;
    };
  };
  funnel: {
    signupToFirstQuiz: number;    // %
    firstQuizToSecond: number;    // %
    returningUserRate: number;    // %
  };
  patterns: {
    peakHours: Array<{
      hour: number;
      usage: number;
    }>;
    deviceTypes: Record<string, number>;
    popularFeatures: Array<{
      feature: string;
      usage: number;
    }>;
  };
}
```

#### POST /api/analytics/events

**目的**: アナリティクスイベントの送信

**リクエスト**:

```typescript
interface AnalyticsEventRequest {
  events: Array<{
    type: string;
    category: 'user' | 'quiz' | 'session' | 'system';
    action: string;
    properties?: Record<string, any>;
    timestamp: string;
    userId?: string;
    sessionId?: string;
    deviceFingerprint?: string;
  }>;
  context: {
    userAgent: string;
    ip?: string;
    referer?: string;
    page?: string;
  };
}
```

**レスポンス**:

```typescript
interface AnalyticsEventResponse {
  processed: number;
  failed: number;
  errors?: Array<{
    index: number;
    error: string;
  }>;
}
```

### 8.3 ログ管理

```http
GET    /api/logs/search
GET    /api/logs/errors
POST   /api/logs/query
```

#### GET /api/logs/search

**目的**: ログ検索（運用チーム向け）

**認可**: 管理者権限必須

**クエリパラメータ**:

| パラメータ名 | 種別 | 必須 | 型 | デフォルト値 | 制約 | 説明・例 |
|-------------|------|------|----|-----------|----|----------|
| level | query | 任意 | enum | "info" | debug/info/warn/error/fatal | ログレベル |
| from | query | 任意 | string | - | ISO8601形式 | 開始日時 |
| to | query | 任意 | string | - | ISO8601形式 | 終了日時 |
| service | query | 任意 | string | - | - | サービス名フィルター |
| message | query | 任意 | string | - | 1-100文字 | メッセージ検索 |
| limit | query | 任意 | number | 100 | 1-1000 | 取得件数 |

### 8.4 アラート管理

```http
GET    /api/alerts/active
POST   /api/alerts/acknowledge
GET    /api/alerts/history
```

#### GET /api/alerts/active

**目的**: アクティブアラート一覧取得

**認可**: 運用チーム権限必須

**レスポンス**:

```typescript
interface ActiveAlertsResponse {
  alerts: Array<{
    id: string;
    severity: 'critical' | 'warning' | 'info';
    title: string;
    description: string;
    service: string;
    createdAt: string;
    acknowledged: boolean;
    acknowledgedBy?: string;
    metrics?: Record<string, number>;
  }>;
  summary: {
    critical: number;
    warning: number;
    info: number;
    total: number;
  };
}
```

### 8.5 バックアップ・復旧

```http
POST   /api/backup/create
GET    /api/backup/status
POST   /api/backup/restore
```

#### POST /api/backup/create

**目的**: システムバックアップ作成

**認可**: 管理者権限必須

**リクエスト**:

```typescript
interface CreateBackupRequest {
  type: 'full' | 'incremental' | 'database_only';
  description?: string;
  retention?: number;        // 保存日数
}
```

## 関連ドキュメント

- [API設計概要](../README.md)
- [共通仕様](07-common-specs.md)
- [セキュリティ仕様](../../security/api-security.md)

---
**ドメイン**: Operations & Monitoring  
**作成工程**: API設計  
**TypeSpec対応**: `api/spec/operations/monitoring.tsp`
