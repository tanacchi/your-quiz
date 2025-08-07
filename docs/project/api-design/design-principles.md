# API設計原則

## 概要

Your Quiz アプリケーションのAPI設計における基本原則と実装ガイドラインを定義します。

## 基本設計原則

### 1. ドメイン駆動設計（DDD）に基づくAPI設計

#### 境界づけられたコンテキストの反映

APIのURL構造は、DDDの境界づけられたコンテキストを明確に表現します。

```http
# 推奨パターン
/api/{ドメイン}/v{バージョン}/{コンテキスト}/{リソース}

# 実例
/api/quiz/v1/manage/quizzes        # Quiz Management Context
/api/quiz/v1/learning/decks        # Quiz Learning Context  
/api/user/v1/sessions              # User Session Context
/api/sync/v1/cache-manifest        # Sync Context
```

#### 純粋なリソースCRUDとの比較

**❌ 推奨しないパターン（純粋なRESTful）:**

```http
/api/v1/quizzes                    # コンテキストが不明
/api/v1/decks                      # 管理用か学習用か不明
```

**✅ 推奨パターン（DDD準拠）:**

```http
/api/quiz/v1/manage/quizzes        # 管理コンテキスト内のクイズ
/api/quiz/v1/learning/decks        # 学習コンテキスト内のDeck
```

### 2. コンテキスト別の設計判断

#### Quiz Management Context

- **責務**: クイズの作成、承認、公開管理
- **URL例**: `/api/quiz/v1/manage/`
- **特徴**: 承認フロー、作成者権限、品質管理

#### Quiz Learning Context  

- **責務**: 学習セッション、回答処理、進捗管理
- **URL例**: `/api/quiz/v1/learning/`
- **特徴**: セッション管理、個人化、統計

#### User Session Context

- **責務**: 匿名ユーザー管理、セッション、権限
- **URL例**: `/api/user/v1/`
- **特徴**: デバイス識別、プライバシー保護

#### Sync Context

- **責務**: オフライン同期、競合解決、キャッシュ
- **URL例**: `/api/sync/v1/`
- **特徴**: バッチ処理、競合解決、データ整合性

### 3. 横断的サービスの扱い

#### 検索APIの二重構造

汎用性と特化性を両立するため、検索機能は二層構造で提供：

```http
# 汎用検索（横断的サービス）
/api/search/v1/quizzes             # 管理画面、分析等で利用

# 学習特化検索（コンテキスト内）  
/api/quiz/v1/learning/search       # 学習機能に特化（内部的に汎用検索を利用）
```

## 実装ガイドライン

### 1. URL設計規則

#### 命名規約

- **ドメイン名**: 小文字、ハイフン区切り（quiz, user, sync）
- **コンテキスト名**: 動詞形または名詞形（manage, learning, sessions）
- **リソース名**: 複数形（quizzes, decks, sessions）
- **バージョニング**: v1, v2 形式

#### HTTPメソッド使用方針

```http
GET     /resource              # 一覧取得
GET     /resource/{id}         # 詳細取得
POST    /resource              # 新規作成
PUT     /resource/{id}         # 全体更新
PATCH   /resource/{id}         # 部分更新
DELETE  /resource/{id}         # 削除

# 複雑なビジネスロジック（動詞API）
POST    /resource/{id}/approve  # 承認処理
POST    /resource/{id}/publish  # 公開処理
```

### 2. レスポンス設計

#### 統一レスポンス形式

```typescript
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: ErrorDetails;
  meta?: ResponseMeta;
}
```

#### ページネーション

```typescript
interface PaginationResult<T> {
  items: T[];
  pagination: {
    total?: number;           // オフセットベース
    hasMore: boolean;
    nextCursor?: string;      // カーソルベース
    limit: number;
    offset?: number;
  };
}
```

### 3. エラーハンドリング

#### HTTPステータスコード

| Code | 用途 | 説明 |
|------|------|------|
| 200 | 成功 | 正常処理完了 |
| 201 | 作成成功 | リソース作成完了 |
| 400 | バリデーションエラー | リクエスト形式不正 |
| 401 | 認証エラー | 認証情報無効 |
| 403 | 認可エラー | 権限不足 |
| 404 | リソース不存在 | 指定リソースなし |
| 409 | 競合エラー | リソース競合状態 |
| 422 | 処理不可エラー | 意味的バリデーションエラー |
| 429 | レート制限 | API呼び出し制限 |
| 500 | サーバーエラー | 予期しないエラー |

#### エラーレスポンス形式

```typescript
interface ErrorResponse {
  success: false;
  error: {
    code: string;           // "VALIDATION_REQUIRED_FIELD"
    message: string;        // "必須項目が不足しています"
    details?: {
      field?: string;
      value?: any;
      constraint?: string;
    };
  };
  meta: ResponseMeta;
}
```

### 4. セキュリティ

#### 認証・認可

```http
Authorization: Bearer <JWT_TOKEN>
X-Device-Fingerprint: <DEVICE_ID>
X-Request-ID: <REQUEST_ID>
```

#### レート制限

```typescript
const RATE_LIMITS = {
  QUIZ_CREATION: { requests: 10, window: '1d' },
  SEARCH_QUERIES: { requests: 100, window: '1h' },
  API_GENERAL: { requests: 1000, window: '1h' }
};
```

### 5. パフォーマンス

#### キャッシュ戦略

```typescript
const CACHE_TTL = {
  PUBLISHED_QUIZZES: 3600,    // 1時間
  SEARCH_RESULTS: 1800,       // 30分
  USER_SESSIONS: 86400,       // 24時間
};
```

## 設計判断の根拠

### なぜDDD準拠のURL構造なのか？

1. **ビジネス複雑性の表現**
   - 同じ「Quiz」でも管理と学習では全く異なる操作・責務
   - APIパスがビジネスの文脈を明確に表現

2. **保守性・拡張性**
   - 各コンテキストが独立して変更可能
   - 新機能追加時の影響範囲の局所化

3. **チーム開発効率**
   - 開発者がAPIの目的を即座に理解
   - 異なるコンテキストを異なるチームが担当可能

### 検索APIが二重構造な理由

1. **汎用性と特化性の両立**
   - 管理画面等では汎用検索が必要
   - 学習画面では学習特化機能が必要

2. **DDDの境界を保持**
   - 学習コンテキストの整合性を維持
   - 横断的機能も適切に提供

## 関連ドキュメント

- [API Catalog](api-catalog/) - 具体的なAPI仕様書
- [TypeSpec仕様](../api/spec/) - 型定義・OpenAPI生成
- [イベント駆動API統合](event-integration.md) - コンテキスト間連携

---
**作成工程**: API設計  
**作成日**: 2025-08-04  
**更新日**: 2025-08-04
