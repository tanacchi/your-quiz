# Sync Domain API

## 責務

- オフライン対応データ管理
- 同期処理・競合解決
- キャッシュ管理・データ整合性

## エンドポイント一覧

### 4.1 キャッシュ管理

```http
GET    /api/sync/v1/cache-manifest
POST   /api/sync/v1/download
GET    /api/sync/v1/cache-status
DELETE /api/sync/v1/cache/:resourceId
```

#### GET /api/sync/v1/cache-manifest

**目的**: オフライン利用可能データの一覧取得  
**対応UI**: ホーム → オフライン対応Deck表示、設定 → オフラインデータ管理

**クエリパラメータ**:

| パラメータ名 | 種別 | 必須 | 型 | デフォルト値 | 制約 | 説明・例 |
|-------------|------|------|----|-----------|----|----------|
| resourceTypes | query | 任意 | string[] | ["全て"] | カンマ区切り | リソースタイプ<br/>例: "quizzes,decks" |
| lastSync | query | 任意 | string | - | ISO8601形式 | 増分更新用最終同期日時<br/>例: "2025-01-01T12:00:00Z" |
| deviceStorageLimit | query | 任意 | number | - | 1-1000000 | デバイスストレージ制限(KB)<br/>例: 50000 |

**レスポンス**:

```typescript
interface GetCacheManifestResponse {
  manifest: {
    version: string;
    generatedAt: string;
    totalSize: number;         // KB
    resources: Array<{
      type: 'quiz' | 'deck' | 'session' | 'draft';
      id: string;
      checksum: string;
      size: number;            // KB
      lastModified: string;
      priority: 'high' | 'medium' | 'low';
      offline: boolean;        // オフライン利用可能か
    }>;
  };
  recommendations: {
    download: string[];        // ダウンロード推奨リソース
    remove: string[];          // 削除推奨リソース（古い・未使用）
  };
  limits: {
    maxCacheSize: number;      // KB
    currentCacheSize: number;
    availableSpace: number;
  };
}
```

#### POST /api/sync/v1/download

**目的**: 指定リソースのオフライン用ダウンロード  
**対応UI**: 設定 → オフラインデータダウンロード、Deck詳細 → オフライン保存

**リクエストボディ**:

| パラメータ名 | 種別 | 必須 | 型 | デフォルト値 | 制約 | 説明・例 |
|-------------|------|------|----|-----------|----|----------|
| resources | body | 必須 | array | - | 1-50件 | ダウンロード対象リソース一覧 |
| resources.type | body | 必須 | enum | - | quiz/deck/session | リソースタイプ |
| resources.id | body | 必須 | string | - | 36文字UUID | リソースID |
| resources.priority | body | 必須 | enum | - | high/medium/low | ダウンロード優先度 |
| downloadOptions | body | 必須 | object | - | - | ダウンロードオプション |
| downloadOptions.includeImages | body | 必須 | boolean | true | - | 画像ファイルを含む |
| downloadOptions.includeExplanations | body | 必須 | boolean | true | - | 解説テキストを含む |
| downloadOptions.compressionLevel | body | 必須 | enum | "medium" | high/medium/low | 圧縮レベル |

**レスポンス**:

```typescript
interface DownloadResourcesResponse {
  resources: Array<{
    id: string;
    type: string;
    data: any;                 // 実際のデータ
    checksum: string;
    size: number;
  }>;
  downloadInfo: {
    totalSize: number;
    totalResources: number;
    estimatedCacheTime: number; // 秒
  };
}
```

### 4.2 同期処理

```http
POST   /api/sync/v1/upload
GET    /api/sync/v1/status

# 動詞API (競合解決)
POST   /api/sync/v1/resolve-conflicts
GET    /api/sync/v1/conflicts
```

#### POST /api/sync/v1/upload

**目的**: オフライン中に作成・変更されたデータのアップロード  
**対応UI**: オンライン復帰時の自動同期

**リクエストボディ**:

| パラメータ名 | 種別 | 必須 | 型 | デフォルト値 | 制約 | 説明・例 |
|-------------|------|------|----|-----------|----|----------|
| syncBatch | body | 必須 | object | - | - | 同期バッチ情報 |
| syncBatch.batchId | body | 必須 | string | - | 36文字UUID | バッチID |
| syncBatch.createdAt | body | 必須 | string | - | ISO8601形式 | バッチ作成日時 |
| syncBatch.deviceFingerprint | body | 必須 | string | - | 36文字UUID | デバイス識別子 |
| syncBatch.items | body | 必須 | array | - | 1-1000件 | 同期アイテム一覧 |
| syncBatch.items.type | body | 必須 | enum | - | answer/draft/session/preference | アイテムタイプ |
| syncBatch.items.action | body | 必須 | enum | - | create/update/delete | 操作種別 |
| syncBatch.items.id | body | 必須 | string | - | 36文字UUID | アイテムID |
| syncBatch.items.data | body | 必須 | object | - | - | 実際のデータ |
| syncBatch.items.timestamp | body | 必須 | string | - | ISO8601形式 | オフライン作成時刻 |
| syncBatch.items.checksum | body | 必須 | string | - | MD5ハッシュ | データ整合性チェック |
| conflictResolution | body | 必須 | enum | "manual" | client_wins/server_wins/manual | 競合解決方向 |

**レスポンス**:

| フィールド名 | 型 | 説明・例 |
|------------|----|-----------|
| processed | array | 処理結果一覧 |
| processed.id | string | アイテムID |
| processed.status | enum | success/conflict/error |
| processed.newId | string | サーバー側新ID(必要時) |
| processed.error | string | エラーメッセージ(エラー時) |
| conflicts | array | 競合一覧 |
| conflicts.id | string | 競合アイテムID |
| conflicts.type | string | アイテムタイプ |
| conflicts.clientData | object | クライアント側データ |
| conflicts.serverData | object | サーバー側データ |
| conflicts.conflictReason | string | 競合原因 |
| summary | object | 処理結果サマリ |
| summary.processed | number | 処理数 |
| summary.conflicts | number | 競合数 |
| summary.errors | number | エラー数 |

#### GET /api/sync/v1/status

**目的**: 同期状態・進捗の取得  
**対応UI**: 設定 → 同期状態表示、同期進捗インジケーター

**レスポンス**:

| フィールド名 | 型 | 説明・例 |
|------------|----|-----------|
| status | enum | idle/syncing/conflict/error |
| progress | object | 同期進捗(同期中のみ) |
| progress.current | number | 現在処理数 |
| progress.total | number | 総処理数 |
| progress.currentOperation | string | 現在の操作 |
| lastSync | object | 最終同期情報 |
| lastSync.completedAt | string | 完了日時(ISO8601) |
| lastSync.itemsSynced | number | 同期アイテム数 |
| lastSync.conflictsResolved | number | 解決済み競合数 |
| lastSync.errors | number | エラー数 |
| pendingSync | object | 保留中同期 |
| pendingSync.items | number | 保留アイテム数 |
| pendingSync.estimatedTimeSeconds | number | 予想所要時間(秒) |
| pendingSync.conflictsRequiringAttention | number | 手動解決必要競合数 |
| connectivity | object | 接続状態 |
| connectivity.online | boolean | オンライン状態 |
| connectivity.connectionQuality | enum | excellent/good/poor/offline |
| connectivity.estimatedBandwidth | number | 予想帯域(Mbps) |

### 4.3 競合解決

```http
GET    /api/sync/v1/conflicts
POST   /api/sync/v1/resolve-conflicts
PUT    /api/sync/v1/conflicts/:conflictId
```

#### GET /api/sync/v1/conflicts

**目的**: 解決が必要な競合一覧取得

**対応UI**: 設定 → 同期競合解決画面

**レスポンス**:

```typescript
interface GetConflictsResponse {
  conflicts: Array<{
    id: string;
    type: 'answer' | 'draft' | 'session' | 'preference';
    resourceId: string;
    conflictType: 'concurrent_modification' | 'delete_conflict' | 'schema_version';
    createdAt: string;
    clientVersion: {
      data: any;
      timestamp: string;
      checksum: string;
    };
    serverVersion: {
      data: any;
      timestamp: string;
      checksum: string;
    };
    autoResolutionSuggestion?: 'use_client' | 'use_server' | 'merge';
  }>;
  summary: {
    total: number;
    byType: Record<string, number>;
    oldestConflict: string;
    resolutionRequired: boolean;
  };
}
```

#### POST /api/sync/v1/resolve-conflicts

**目的**: 複数競合の一括解決

**対応UI**: 競合解決画面 → 一括解決

**リクエスト**:

```typescript
interface ResolveConflictsRequest {
  resolutions: Array<{
    conflictId: string;
    resolution: 'use_client' | 'use_server' | 'merge' | 'custom';
    mergedData?: any;          // resolution=mergeまたはcustomの場合
    userNotes?: string;
  }>;
  applyToSimilar?: boolean;    // 類似競合に同じ解決策を適用
}
```

### 4.4 バッチ処理

```http
POST   /api/sync/v1/batch-answers
POST   /api/sync/v1/batch-drafts
GET    /api/sync/v1/batch-status/:batchId
```

#### POST /api/sync/v1/batch-answers

**目的**: オフライン回答の一括アップロード

**対応UI**: オンライン復帰時の自動同期（内部処理）

**リクエスト**:

```typescript
interface BatchAnswersRequest {
  answers: Array<{
    sessionId: string;
    quizId: string;
    userAnswer: boolean;
    responseTimeMs: number;
    answeredAt: string;        // オフライン時の回答時刻
    localId: string;           // オフライン時のローカルID
  }>;
  sessionUpdates: Array<{
    sessionId: string;
    progress: {
      currentQuizIndex: number;
      answeredCount: number;
      correctCount: number;
    };
    completedAt?: string;
  }>;
}
```

**レスポンス**:

```typescript
interface BatchAnswersResponse {
  processed: Array<{
    localId: string;
    serverId?: string;
    status: 'success' | 'duplicate' | 'error';
    error?: string;
  }>;
  sessionResults: Array<{
    sessionId: string;
    finalResults?: {
      totalQuestions: number;
      correctAnswers: number;
      correctRate: number;
    };
  }>;
  batchId: string;
}
```

## 関連ドキュメント

- [API設計概要](../README.md)
- [Quiz Learning API](02-quiz-learning.md)
- [User Session API](03-user-session.md)
- [共通仕様](07-common-specs.md)

---
**ドメイン**: Sync Context  
**作成工程**: API設計  
**TypeSpec対応**: `api/spec/operations/sync.tsp`
