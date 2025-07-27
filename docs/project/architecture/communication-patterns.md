# 通信・統合パターン設計

## 同期通信 vs 非同期通信の選定

### 通信方式選定マトリクス

| ユースケース | 推奨方式 | 理由 | 実装パターン | レスポンス要件 | データ整合性 |
|-------------|----------|------|-------------|---------------|------------|
| **クイズ検索・取得** | **同期（REST）** | **リアルタイム応答必須**<br>**ユーザー待機可能** | **Request-Response** | **100ms以内** | **即時整合性** |
| **クイズ回答保存** | **同期（REST）** | **即座のフィードバック必要** | **Request-Response** | **100ms以内** | **即時整合性** |
| **クイズ作成・投稿** | **同期（REST）** | **承認待ち状態の即座確認** | **Request-Response** | **500ms以内** | **即時整合性** |
| **回答履歴参照** | **同期（REST）** | **ユーザー操作に対する即座表示** | **Request-Response** | **200ms以内** | **即時整合性** |
| **将来: 通知配信** | **非同期（Event）** | **複数チャネル配信**<br>**ユーザー体験阻害回避** | **Fire-and-Forget** | **非同期** | **結果整合性** |
| **将来: データ同期** | **非同期（Queue）** | **オフライン復旧時の大量処理** | **Queue Processing** | **非同期** | **結果整合性** |

### 選定結果

**採用**: 同期通信（REST API）中心
**将来拡張**: 非同期通信（Message Queue・Event）

### 判断基準

- **ユーザー体験**: 即座のフィードバックが学習体験に重要
- **非機能要件**: API応答時間100ms要件への適合
- **システム複雑性**: 小規模チームでの運用負荷軽減
- **データ一貫性**: クイズ・回答データの即時整合性必要

## API設計方針

### RESTful API設計

#### エンドポイント設計

| リソース | HTTP Method | エンドポイント | 説明 | レスポンス時間 |
|----------|-------------|----------------|------|---------------|
| **クイズ** | GET | `/api/quizzes` | クイズ一覧取得（タグフィルタ対応） | 100ms |
| **クイズ** | GET | `/api/quizzes/{id}` | 個別クイズ取得 | 50ms |
| **クイズ** | POST | `/api/quizzes` | クイズ作成（承認待ち） | 200ms |
| **回答** | POST | `/api/quizzes/{id}/answers` | 回答提出 | 100ms |
| **履歴** | GET | `/api/answers/history` | 回答履歴取得 | 150ms |
| **管理** | PATCH | `/api/admin/quizzes/{id}` | クイズ承認・非承認 | 200ms |

#### データ形式標準化

```typescript
// 統一レスポンス形式
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  metadata?: {
    timestamp: string;
    requestId: string;
  };
}

// ページネーション対応
interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
  };
}
```

### エラーハンドリング戦略

| エラー種別 | HTTPステータス | 対応方針 | ユーザー体験 |
|-----------|---------------|----------|------------|
| **バリデーションエラー** | **400** | **詳細なフィールドエラー返却** | **入力項目の個別エラー表示** |
| **認証エラー** | **401** | **ログイン画面への誘導** | **「ログインが必要です」** |
| **権限エラー** | **403** | **操作不可メッセージ** | **「この操作は許可されていません」** |
| **リソース未発見** | **404** | **代替コンテンツ提案** | **「クイズが見つかりません」** |
| **サーバーエラー** | **500** | **エラーログ記録＋汎用メッセージ** | **「一時的な問題が発生しました」** |
| **レート制限** | **429** | **リトライ間隔指示** | **「しばらくお待ちください」** |

## モジュール間通信設計

### 内部モジュール通信

#### ドメインサービス呼び出しパターン

```typescript
// Quiz Management → Answer History
interface QuizAnswerService {
  recordAnswer(quizId: string, answer: boolean, isCorrect: boolean): Promise<AnswerRecord>;
  getAnswerHistory(criteria: AnswerCriteria): Promise<AnswerHistory[]>;
}

// Answer History → Quiz Management
interface QuizRetrievalService {
  getQuizById(id: string): Promise<Quiz>;
  getQuizzesByIds(ids: string[]): Promise<Quiz[]>;
}
```

#### 依存関係ルール

- Quiz Management: 独立（他モジュールに依存しない）
- Answer History: Quiz Management に依存
- Shared Services: 全モジュールから利用可能

### 外部システム連携方針（将来拡張）

#### 認証システム連携

| 連携方式 | プロトコル | 認証方式 | エラー対応 |
|----------|-----------|----------|-----------|
| **OAuth 2.0** | **HTTPS** | **Bearer Token** | **Fallback to Anonymous** |

#### 通知システム連携

| 連携方式 | プロトコル | メッセージ形式 | 配信保証 |
|----------|-----------|---------------|----------|
| **Message Queue** | **AMQP/HTTP** | **JSON** | **At-least-once** |

## オフライン通信戦略

### データ同期パターン

#### 事前ダウンロード戦略

```typescript
interface OfflineSync {
  // アプリ起動時の事前ダウンロード
  preloadQuizzes(criteria: PreloadCriteria): Promise<void>;

  // オンライン復旧時の同期
  syncPendingAnswers(): Promise<SyncResult>;

  // 競合解決
  resolveConflicts(conflicts: DataConflict[]): Promise<void>;
}
```

#### 同期データ優先度

| データ種別 | 優先度 | 同期タイミング | 競合解決 |
|-----------|-------|---------------|----------|
| **回答履歴** | **高** | **即座** | **Last-Write-Wins** |
| **クイズメタデータ** | **中** | **定期** | **Server-Wins** |
| **設定情報** | **低** | **手動** | **User-Choice** |

### キャッシュ戦略

#### ブラウザストレージ設計

```typescript
// IndexedDB設計
interface LocalStorage {
  quizzes: QuizCache;      // 事前ダウンロード済みクイズ
  answers: AnswerCache;    // オフライン回答データ
  metadata: MetadataCache; // 同期状態・設定
}

// キャッシュ有効期限
const CACHE_DURATION = {
  quizzes: 24 * 60 * 60 * 1000,    // 24時間
  answers: Infinity,                // 永続化
  metadata: 7 * 24 * 60 * 60 * 1000 // 7日間
};
```

## パフォーマンス最適化方針

### レスポンス時間最適化

#### 実装レベル最適化

| 最適化手法 | 対象API | 期待効果 | 実装方針 |
|-----------|---------|----------|----------|
| **データベースインデックス** | **全検索API** | **50-80%削減** | **クエリ分析に基づく最適化** |
| **レスポンス圧縮** | **一覧取得API** | **30-50%削減** | **gzip/brotli圧縮** |
| **不要データ除外** | **全API** | **20-40%削減** | **フィールド選択クエリ** |
| **接続プーリング** | **全API** | **10-30%削減** | **DB接続プール最適化** |

#### CDN・キャッシュ活用

```typescript
// CDNキャッシュ戦略
const CACHE_CONTROL = {
  staticAssets: 'public, max-age=31536000',      // 1年
  apiResponses: 'public, max-age=300',           // 5分
  dynamicContent: 'no-cache, must-revalidate'   // キャッシュ無効
};
```

## セキュリティ通信設計

### 暗号化・認証

| 通信経路 | 暗号化方式 | 認証方式 | セキュリティレベル |
|----------|-----------|----------|------------------|
| **Client↔API** | **TLS 1.3** | **Anonymous/JWT** | **High** |
| **API↔Database** | **TLS 1.2+** | **DB Auth** | **High** |
| **内部モジュール** | **N/A** | **Interface** | **Medium** |

### 入力検証・サニタイゼーション

```typescript
// API入力検証パターン
interface InputValidation {
  // リクエスト時検証
  validateRequest(req: Request): ValidationResult;

  // XSS対策
  sanitizeUserInput(input: string): string;

  // SQL Injection対策
  validateQueryParams(params: QueryParams): ValidatedParams;
}
```

### レート制限・アクセス制御

| エンドポイント | レート制限 | 制限対象 | 制限レベル |
|---------------|-----------|----------|-----------|
| **クイズ作成** | **10/hour** | **IP Address** | **Strict** |
| **クイズ取得** | **100/minute** | **IP Address** | **Loose** |
| **回答提出** | **30/minute** | **IP Address** | **Medium** |
| **管理操作** | **5/minute** | **Admin Token** | **Strict** |
