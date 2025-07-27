# データアーキテクチャ方針（詳細版）

> **退避理由**: DB設計フェーズ前の具体的スキーマ・実装詳細を含むため、アーキテクチャフェーズには抽象度が過度。将来のDB設計フェーズで参考資料として活用予定。

## データストア戦略

### データストア選定マトリクス

| データ特性 | 推奨ストア | 理由 | 適用例 | 一貫性要件 | パフォーマンス |
|-----------|-----------|------|--------|------------|---------------|
| **構造化・ACID必要** | **RDBMS（SQLite→PostgreSQL）** | **トランザクション保証**<br>**参照整合性** | **クイズデータ**<br>**承認状態** | **強一貫性** | **100ms要件** |
| **高速アクセス・一時データ** | **Browser Storage（IndexedDB）** | **オフライン対応**<br>**レスポンス高速化** | **回答履歴**<br>**キャッシュデータ** | **結果整合性** | **<10ms** |
| **設定・メタデータ** | **Browser Storage（localStorage）** | **簡単アクセス**<br>**永続化** | **ユーザー設定**<br>**認証トークン** | **結果整合性** | **<5ms** |

### データストア配置戦略

#### サーバーサイドデータ

```sql
-- クイズマスターデータ（SQLite/PostgreSQL）
CREATE TABLE quizzes (
  id UUID PRIMARY KEY,
  question TEXT NOT NULL CHECK(length(question) <= 500),
  correct_answer BOOLEAN NOT NULL,
  explanation TEXT CHECK(length(explanation) <= 1000),
  tags JSONB,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  approved_at TIMESTAMP NULL,
  created_by_hash VARCHAR(64) -- salt付きハッシュ
);

-- 承認ログ（監査証跡）
CREATE TABLE approval_logs (
  id UUID PRIMARY KEY,
  quiz_id UUID REFERENCES quizzes(id),
  action ENUM('approve', 'reject'),
  reason TEXT,
  admin_id VARCHAR(255),
  performed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### クライアントサイドデータ

```typescript
// IndexedDB設計（オフライン対応）
interface QuizDatabase {
  // ダウンロード済みクイズ
  quizzes: {
    id: string;
    question: string;
    correctAnswer: boolean;
    explanation?: string;
    tags: string[];
    cachedAt: number;
  };
  
  // 回答履歴
  answerHistory: {
    id: string;
    quizId: string;
    userAnswer: boolean;
    isCorrect: boolean;
    answeredAt: number;
    syncStatus: 'pending' | 'synced';
  };
  
  // 同期メタデータ
  syncMetadata: {
    lastSyncAt: number;
    pendingUploads: number;
    offlineMode: boolean;
  };
}

// localStorage設計（軽量設定）
interface AppSettings {
  userId: string;           // salt付きハッシュ
  preferences: {
    theme: 'light' | 'dark';
    soundEnabled: boolean;
    autoSync: boolean;
  };
  authState: {
    isAnonymous: boolean;
    sessionId?: string;
  };
}
```

## データ一貫性戦略

### ACID vs BASE選択指針

#### 強一貫性（ACID）適用領域

| データ種別 | 一貫性要件 | 理由 | 実装方式 |
|-----------|-----------|------|----------|
| **クイズ承認状態** | **ACID** | **二重承認防止**<br>**状態整合性** | **DB Transaction** |
| **作成者識別** | **ACID** | **不正投稿防止**<br>**重複チェック** | **Unique Constraint** |
| **統計データ** | **ACID** | **正確な集計値**<br>**レポート整合性** | **Aggregation Lock** |

#### 結果整合性（BASE）適用領域

| データ種別 | 一貫性要件 | 理由 | 実装方式 |
|-----------|-----------|------|----------|
| **回答履歴** | **BASE** | **ユーザー体験優先**<br>**オフライン対応** | **Eventually Consistent** |
| **クイズキャッシュ** | **BASE** | **表示パフォーマンス優先**<br>**リアルタイム不要** | **Cache Invalidation** |
| **利用統計** | **BASE** | **集計遅延許容**<br>**分析用途** | **Batch Processing** |

### 分散データ同期戦略

#### オンライン・オフライン同期パターン

```typescript
interface DataSyncStrategy {
  // アップロード同期（オフライン→オンライン）
  uploadPendingAnswers(): Promise<SyncResult> {
    // 1. ローカルの未同期データ取得
    // 2. サーバーへバッチアップロード
    // 3. 競合解決
    // 4. ローカル状態更新
  }
  
  // ダウンロード同期（オンライン→オフライン）
  downloadLatestQuizzes(): Promise<SyncResult> {
    // 1. 最終同期時刻以降のクイズ取得
    // 2. ローカルキャッシュ更新
    // 3. 古いデータ削除
  }
  
  // 競合解決
  resolveConflicts(conflicts: DataConflict[]): ConflictResolution[] {
    // Last-Write-Wins + User Notification
  }
}
```

#### 競合解決ルール

| 競合パターン | 解決方針 | 理由 | ユーザー体験 |
|-------------|----------|------|------------|
| **回答時刻競合** | **Last-Write-Wins** | **回答履歴の重要度低** | **透明（通知なし）** |
| **設定値競合** | **User-Choice** | **ユーザー意図尊重** | **選択ダイアログ表示** |
| **クイズデータ競合** | **Server-Wins** | **管理者承認優先** | **更新通知表示** |

## CQRS・Event Sourcing適用判断

### CQRS適用判断

#### 適用検討結果: **不採用**

| 判断基準 | クイズアプリケーション | 適用判定 |
|----------|----------------------|----------|
| **読み取り/更新の性能要件差** | 両方とも100ms要件で差が小さい | ❌ |
| **複雑なレポート・分析要件** | シンプルな履歴表示のみ | ❌ |
| **読み取り頻度 >> 更新頻度** | クイズ作成も一定頻度で発生 | ❌ |
| **チーム技術力** | 小規模チーム、複雑性回避 | ❌ |

**結論**: CQRSは過剰設計、シンプルなCRUD操作で十分

### Event Sourcing適用判断

#### 適用検討結果: **部分採用**（履歴管理のみ）

| 適用領域 | 採用判断 | 理由 | 実装方式 |
|----------|----------|------|----------|
| **回答履歴** | **○** | **イベント性質**<br>**監査証跡**<br>**時系列データ** | **Append-Only Table** |
| **クイズ管理** | **×** | **状態管理中心**<br>**CRUD操作** | **Traditional Model** |
| **承認フロー** | **△** | **状態遷移記録**<br>**将来の分析** | **State + Event Log** |

#### Event Sourcing実装設計

```sql
-- 回答イベントストア
CREATE TABLE answer_events (
  id UUID PRIMARY KEY,
  quiz_id UUID NOT NULL,
  user_hash VARCHAR(64) NOT NULL,
  event_type VARCHAR(50) NOT NULL, -- 'answer_submitted', 'answer_corrected'
  event_data JSONB NOT NULL,
  occurred_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  source_ip INET,
  user_agent TEXT
);

-- 回答履歴ビュー（読み取り最適化）
CREATE MATERIALIZED VIEW answer_history AS
SELECT 
  quiz_id,
  user_hash,
  (event_data->>'answer')::boolean as user_answer,
  (event_data->>'is_correct')::boolean as is_correct,
  occurred_at as answered_at
FROM answer_events
WHERE event_type = 'answer_submitted'
ORDER BY occurred_at DESC;
```

## データパーティション・スケーリング戦略

### 水平分割（シャーディング）戦略

#### データ分割判断基準

| データサイズ予測 | 分割必要性 | 理由 |
|-----------------|-----------|------|
| **クイズ: ~10,000件** | **不要** | **単一DBで十分** |
| **回答: ~1,000,000件/年** | **将来検討** | **年単位パーティション** |
| **ユーザー: ~10,000人** | **不要** | **匿名ユーザー中心** |

#### 将来のパーティション戦略

```sql
-- 時系列パーティション（PostgreSQL）
CREATE TABLE answer_events (
  -- 既存カラム
) PARTITION BY RANGE (occurred_at);

CREATE TABLE answer_events_2024 PARTITION OF answer_events
  FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');

CREATE TABLE answer_events_2025 PARTITION OF answer_events
  FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');
```

### 読み取り最適化戦略

#### インデックス設計

```sql
-- パフォーマンス重視インデックス
CREATE INDEX idx_quizzes_status_tags ON quizzes USING GIN (status, tags);
CREATE INDEX idx_quizzes_approved_created ON quizzes (status, created_at) 
  WHERE status = 'approved';

-- 回答履歴検索最適化
CREATE INDEX idx_answer_events_user_time ON answer_events (user_hash, occurred_at DESC);
CREATE INDEX idx_answer_events_quiz_time ON answer_events (quiz_id, occurred_at DESC);
```

#### キャッシュレイヤー設計

```typescript
interface CacheStrategy {
  // アプリケーションレベルキャッシュ
  quizCache: {
    ttl: 300_000,      // 5分
    maxSize: 1000,     // 1000クイズ
    strategy: 'LRU'
  };
  
  // ブラウザレベルキャッシュ
  clientCache: {
    approved_quizzes: 86400_000,  // 24時間
    user_answers: Infinity,       // 永続
    app_settings: 604800_000      // 7日間
  };
  
  // CDNキャッシュ
  cdnCache: {
    static_assets: 31536000,      // 1年
    api_responses: 300            // 5分
  };
}
```

## データ セキュリティ・プライバシー

### 暗号化戦略

#### 保存時暗号化

| データ種別 | 暗号化レベル | 実装方式 | 理由 |
|-----------|-------------|----------|------|
| **ユーザー識別子** | **Hashed + Salt** | **bcrypt/argon2** | **プライバシー保護** |
| **クイズ内容** | **平文** | **なし** | **検索性能優先** |
| **回答データ** | **擬似匿名化** | **Hash + Timestamp** | **分析可能 + プライバシー** |
| **設定情報** | **平文** | **なし** | **機能性優先** |

#### 転送時暗号化

```typescript
// HTTPS強制設定
const securityConfig = {
  tls: {
    minVersion: 'TLSv1.2',
    ciphers: [
      'ECDHE-RSA-AES128-GCM-SHA256',
      'ECDHE-RSA-AES256-GCM-SHA384'
    ]
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
};
```

### データ保持・削除ポリシー

#### データライフサイクル管理

| データ種別 | 保持期間 | 削除方式 | 理由 |
|-----------|----------|----------|------|
| **承認済みクイズ** | **永続** | **手動削除** | **サービス価値** |
| **承認待ちクイズ** | **30日** | **自動削除** | **ストレージ効率** |
| **拒否済みクイズ** | **7日** | **自動削除** | **一時保持** |
| **回答履歴** | **2年** | **匿名化処理** | **分析価値** |
| **エラーログ** | **90日** | **自動削除** | **デバッグ用途** |

```sql
-- 自動削除ジョブ
CREATE OR REPLACE FUNCTION cleanup_old_data()
RETURNS void AS $$
BEGIN
  -- 承認待ち30日経過削除
  DELETE FROM quizzes 
  WHERE status = 'pending' 
    AND created_at < NOW() - INTERVAL '30 days';
  
  -- 拒否済み7日経過削除
  DELETE FROM quizzes 
  WHERE status = 'rejected' 
    AND created_at < NOW() - INTERVAL '7 days';
    
  -- 古い回答履歴の匿名化
  UPDATE answer_events 
  SET user_hash = 'anonymized'
  WHERE occurred_at < NOW() - INTERVAL '2 years';
END;
$$ LANGUAGE plpgsql;

-- 定期実行（日次）
SELECT cron.schedule('cleanup-old-data', '0 2 * * *', 'SELECT cleanup_old_data();');
```
