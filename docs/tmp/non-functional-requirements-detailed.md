# 非機能要件対応方針（詳細版）

> **退避理由**: 具体的な設定値・実装詳細・運用詳細を含むため、アーキテクチャフェーズには抽象度が過度。将来の実装フェーズで参考資料として活用予定。

## スケーラビリティ戦略

### 水平・垂直スケーリング選定

#### スケーリング戦略マトリクス

| 要求特性 | 推奨戦略 | 理由 | 実装方式 | 適用時期 |
|----------|----------|------|----------|----------|
| **API処理（100ms要件）** | **垂直スケール** | **CPU/メモリ集約的処理**<br>**レイテンシ最優先** | **サーバースペックアップ** | **初期段階** |
| **静的ファイル配信** | **水平スケール** | **I/O集約的**<br>**地理的分散** | **CDN + エッジキャッシュ** | **即座** |
| **データベース読み取り** | **垂直→水平** | **初期は垂直、将来は読み取りレプリカ** | **Read Replica** | **1000件/日超過時** |
| **同時接続（100接続上限）** | **垂直スケール** | **接続プール最適化優先** | **コネクションプール調整** | **80接続到達時** |

#### スケーリング段階別対応

```typescript
// フェーズ1: 初期（~50同時接続）
const phase1Config = {
  server: {
    cpu: '2 cores',
    memory: '4GB',
    connections: 50
  },
  database: {
    type: 'SQLite',
    connections: 10
  },
  cache: 'in-memory'
};

// フェーズ2: 成長期（50-100同時接続）
const phase2Config = {
  server: {
    cpu: '4 cores',
    memory: '8GB', 
    connections: 100
  },
  database: {
    type: 'PostgreSQL',
    connections: 25,
    readReplicas: 0
  },
  cache: 'Redis'
};

// フェーズ3: 拡張期（100+同時接続）
const phase3Config = {
  server: {
    instances: 2,      // 水平スケール開始
    loadBalancer: true
  },
  database: {
    type: 'PostgreSQL',
    connections: 50,
    readReplicas: 2    // 読み取り負荷分散
  },
  cache: 'Redis Cluster'
};
```

### オートスケーリング戦略

#### スケールアウト条件

| メトリクス | 閾値 | アクション | 理由 |
|-----------|------|-----------|------|
| **CPU使用率** | **70%** | **インスタンス追加** | **応答時間劣化防止** |
| **メモリ使用率** | **80%** | **インスタンス追加** | **OOM防止** |
| **API応答時間** | **150ms** | **キャッシュ強化** | **100ms要件維持** |
| **同時接続数** | **80接続** | **接続プール拡張** | **100接続上限対応** |
| **エラー率** | **5%** | **緊急スケールアウト** | **サービス品質維持** |

## 可用性・耐障害性設計

### 冗長化戦略

#### アプリケーション層冗長化

| コンポーネント | 冗長化方式 | 理由 | 実装方針 |
|---------------|-----------|------|----------|
| **APIサーバー** | **Active-Active** | **負荷分散**<br>**ゼロダウンタイム** | **ロードバランサー + 複数インスタンス** |
| **データベース** | **Active-Standby** | **データ整合性**<br>**運用簡素化** | **Primary-Replica構成** |
| **静的ファイル** | **Multi-CDN** | **地理的分散**<br>**高速配信** | **Vercel + バックアップCDN** |

#### 障害対応方針

```typescript
// Circuit Breaker実装
interface CircuitBreakerConfig {
  failureThreshold: 5,        // 5回失敗で開放
  timeout: 30000,             // 30秒後に半開状態
  monitor: {
    interval: 5000,           // 5秒間隔で監視
    successThreshold: 3       // 3回成功で復旧
  }
}

// Bulkhead（隔壁）パターン
interface ResourceIsolation {
  quizRead: {
    threadPool: 10,           // 読み取り専用プール
    timeout: 100              // 100ms制限
  },
  quizWrite: {
    threadPool: 5,            // 書き込み専用プール  
    timeout: 500              // 500ms制限
  },
  adminOps: {
    threadPool: 2,            // 管理操作専用プール
    timeout: 2000             // 2秒制限
  }
}

// Timeout設定
const timeoutConfig = {
  database: 5000,             // DB接続タイムアウト
  externalApi: 10000,         // 外部API呼び出し
  userRequest: 30000,         // ユーザーリクエスト全体
  backgroundJob: 300000       // バックグラウンド処理
};
```

### ディザスターリカバリー

#### バックアップ戦略

| データ種別 | バックアップ頻度 | 保持期間 | 復旧目標 |
|-----------|-----------------|----------|----------|
| **承認済みクイズ** | **日次** | **1年** | **RTO: 4時間, RPO: 24時間** |
| **回答履歴** | **日次** | **6ヶ月** | **RTO: 8時間, RPO: 24時間** |
| **システム設定** | **変更時** | **永続** | **RTO: 1時間, RPO: 0時間** |

#### 復旧手順

```bash
# 災害復旧プロセス
#!/bin/bash

# 1. データベース復旧
pg_restore --host=recovery-db backup-latest.dump

# 2. アプリケーション復旧  
docker-compose -f docker-compose.recovery.yml up -d

# 3. 整合性チェック
npm run db:check-integrity

# 4. サービス正常性確認
curl -f https://api.example.com/health || exit 1

# 5. DNS切り替え（手動確認後）
echo "Ready for DNS failover"
```

## セキュリティアーキテクチャ方針

### 多層防御戦略

#### セキュリティ層設計

| 層 | 対策内容 | 実装方式 | 脅威対象 |
|----|----------|----------|----------|
| **ネットワーク層** | **不正アクセス防止**<br>**DDoS対策** | **CDN WAF**<br>**レート制限** | **外部攻撃** |
| **アプリケーション層** | **入力検証**<br>**認証・認可** | **zod バリデーション**<br>**JWT トークン** | **インジェクション攻撃** |
| **データ層** | **暗号化**<br>**アクセス制御** | **TLS 1.3**<br>**DB権限分離** | **データ漏洩** |
| **監視層** | **異常検知**<br>**ログ分析** | **ログ集約**<br>**アラート** | **内部脅威** |

#### ゼロトラスト原則適用

```typescript
// セキュリティ設定
interface SecurityConfig {
  // 最小権限の原則
  permissions: {
    anonymous: ['quiz:read', 'answer:create'],
    creator: ['quiz:create', 'quiz:read_own'],
    admin: ['quiz:approve', 'quiz:reject', 'quiz:delete']
  },
  
  // 継続的検証
  authentication: {
    tokenExpiry: 3600,          // 1時間で再認証
    refreshThreshold: 300,      // 5分前に更新
    maxSessions: 3              // 同時セッション制限
  },
  
  // 境界信頼の排除
  networkSecurity: {
    trustInternalNetwork: false,
    validateAllRequests: true,
    encryptInternalComm: true   // 内部通信も暗号化
  }
}
```

### 入力検証・サニタイゼーション

#### バリデーション戦略

```typescript
// zod スキーマ定義
const QuizCreateSchema = z.object({
  question: z.string()
    .min(1, "問題文は必須です")
    .max(500, "問題文は500文字以内です")
    .refine(input => !containsHtml(input), "HTMLタグは使用できません"),
  
  correctAnswer: z.boolean(),
  
  explanation: z.string()
    .max(1000, "解説は1000文字以内です")
    .optional()
    .transform(input => input ? sanitizeHtml(input) : undefined),
  
  tags: z.array(
    z.string()
      .regex(/^[a-zA-Z0-9ひらがなカタカナ漢字]+$/, "タグは英数字・日本語のみです")
      .max(50, "タグは50文字以内です")
  ).max(10, "タグは10個以内です")
});

// XSS対策関数
function sanitizeHtml(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
}

// SQLインジェクション対策（Drizzle ORM）
const safeQuery = db
  .select()
  .from(quizzes)
  .where(
    and(
      eq(quizzes.status, 'approved'),
      sql`tags @> ${JSON.stringify(sanitizedTags)}`
    )
  );
```

## パフォーマンス設計方針

### レスポンス時間要件

#### パフォーマンス目標設定

| 操作種別 | 目標応答時間 | 測定条件 | 最適化方針 | 監視閾値 |
|----------|-------------|----------|-----------|----------|
| **クイズ一覧取得** | **<100ms** | **95%tile** | **インデックス + キャッシュ** | **150ms** |
| **個別クイズ取得** | **<50ms** | **95%tile** | **プライマリキー + CDN** | **100ms** |
| **回答提出** | **<100ms** | **95%tile** | **非同期処理 + 事前検証** | **150ms** |
| **クイズ作成** | **<500ms** | **95%tile** | **バリデーション最適化** | **750ms** |
| **履歴取得** | **<200ms** | **95%tile** | **ページネーション + インデックス** | **300ms** |

#### パフォーマンス監視

```typescript
// パフォーマンス計測
interface PerformanceMonitoring {
  // レスポンス時間計測
  measureResponseTime(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      
      // 閾値超過時アラート
      if (duration > getThreshold(req.route)) {
        logger.warn(`Slow response: ${req.route} took ${duration}ms`);
      }
      
      // メトリクス記録
      metrics.histogram('http_request_duration', duration, {
        method: req.method,
        route: req.route,
        status: res.statusCode
      });
    });
    next();
  },
  
  // データベースクエリ監視
  monitorDbQuery(query: string, duration: number) {
    if (duration > 50) {  // 50ms超過で警告
      logger.warn(`Slow query: ${query} took ${duration}ms`);
    }
  }
}
```

### キャッシュ戦略

#### 多層キャッシュ設計

```typescript
interface CacheArchitecture {
  // L1: ブラウザキャッシュ
  browser: {
    staticAssets: {
      ttl: 31536000,              // 1年
      headers: 'immutable'
    },
    apiResponses: {
      ttl: 300,                   // 5分
      strategy: 'stale-while-revalidate'
    }
  },
  
  // L2: CDNキャッシュ
  cdn: {
    quizList: {
      ttl: 300,                   // 5分
      varyHeaders: ['Accept-Encoding', 'User-Agent']
    },
    images: {
      ttl: 86400,                 // 24時間
      compressionLevel: 9
    }
  },
  
  // L3: アプリケーションキャッシュ
  application: {
    approvedQuizzes: {
      ttl: 600,                   // 10分
      maxSize: 1000,
      evictionPolicy: 'LRU'
    },
    userSessions: {
      ttl: 3600,                  // 1時間
      maxSize: 10000
    }
  },
  
  // L4: データベースキャッシュ
  database: {
    queryCache: {
      enabled: true,
      ttl: 300                    // 5分
    },
    connectionPool: {
      min: 5,
      max: 25,
      acquireTimeout: 5000
    }
  }
}
```

#### キャッシュ無効化戦略

```typescript
// キャッシュ無効化ルール
interface CacheInvalidation {
  // クイズ承認時
  onQuizApproval(quizId: string) {
    cache.delete(`quiz:${quizId}`);
    cache.delete('quiz:list:approved');
    cache.delete('quiz:stats');
    cdn.purge('/api/quizzes*');
  },
  
  // 回答提出時
  onAnswerSubmit(userId: string, quizId: string) {
    cache.delete(`answers:${userId}`);
    cache.delete(`quiz:${quizId}:stats`);
  },
  
  // 定期的な全キャッシュクリア
  scheduledPurge() {
    // 毎日深夜2時にキャッシュクリア
    cron.schedule('0 2 * * *', () => {
      cache.flushAll();
      logger.info('Cache purged successfully');
    });
  }
}
```

## 監視・運用方針

### ヘルスチェック設計

```typescript
// 総合ヘルスチェック
interface HealthCheck {
  async systemHealth(): Promise<HealthStatus> {
    const checks = await Promise.allSettled([
      this.databaseHealth(),
      this.cacheHealth(), 
      this.externalApiHealth(),
      this.diskSpaceHealth(),
      this.memoryHealth()
    ]);
    
    return {
      status: checks.every(check => check.status === 'fulfilled') ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      checks: checks.map((check, index) => ({
        name: ['database', 'cache', 'external', 'disk', 'memory'][index],
        status: check.status,
        responseTime: check.status === 'fulfilled' ? check.value.responseTime : null,
        error: check.status === 'rejected' ? check.reason.message : null
      }))
    };
  }
}
```

### SLA定義

| 項目 | 目標値 | 測定期間 | 対応レベル |
|------|--------|----------|-----------|
| **可用性** | **99.5%** | **月次** | **4時間以内復旧** |
| **応答時間** | **95%が100ms以内** | **日次** | **即座対応** |
| **データ保護** | **99.9%** | **年次** | **1時間以内復旧** |
| **セキュリティ** | **脆弱性0件** | **四半期** | **24時間以内対応** |