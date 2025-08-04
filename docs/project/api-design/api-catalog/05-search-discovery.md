# Search & Discovery API

## 責務

- 全文検索機能
- フィルタリング・ソート機能
- 推奨システム
- 汎用検索と学習特化検索の両方をサポート

## エンドポイント一覧

### 5.1 汎用検索機能（横断的サービス）

```http
GET    /api/search/v1/quizzes
GET    /api/search/v1/quizzes/suggestions
GET    /api/search/v1/quizzes/autocomplete
POST   /api/search/v1/quizzes/advanced
GET    /api/search/v1/quizzes/popular
```

### 5.2 学習特化検索機能（学習コンテキスト内）

```http
GET    /api/quiz/v1/learning/search
GET    /api/quiz/v1/learning/search/suggestions
GET    /api/quiz/v1/learning/search/autocomplete
POST   /api/quiz/v1/learning/search/advanced
GET    /api/quiz/v1/learning/popular
```

#### GET /api/search/v1/quizzes

**目的**: 汎用クイズ検索（管理画面、分析等でも利用）

**対応UI**: 管理画面、分析ダッシュボード、汎用検索

**クエリパラメータ**:

| パラメータ名 | 種別 | 必須 | 型 | デフォルト値 | 制約 | 説明・例 |
|-------------|------|------|----|-----------|----|---------|
| q | query | 任意 | string | - | 1-50文字 | キーワード検索<br/>例: "JavaScript", "配列" |
| tags | query | 任意 | string[] | - | 1-10個、各1-50文字 | タグフィルター（カンマ区切り）<br/>例: "javascript,react" |
| difficulty | query | 任意 | enum | "all" | beginner/intermediate/advanced/all | 難易度フィルター |
| status | query | 任意 | enum | "published" | draft/pending/approved/published/all | ステータスフィルター |
| sort | query | 任意 | enum | "popularity" | popularity/latest/difficulty/accuracy | ソート基準 |
| order | query | 任意 | enum | "desc" | asc/desc | ソート順序 |
| limit | query | 任意 | number | 20 | 1-100 | 取得件数 |
| offset | query | 任意 | number | 0 | ≥0 | オフセット |

#### GET /api/quiz/v1/learning/search

**目的**: 学習特化クイズ検索（学習者向け機能付き）

**対応UI**: 学習画面 → 検索実行

**クエリパラメータ**:

| パラメータ名 | 種別 | 必須 | 型 | デフォルト値 | 制約 | 説明・例 |
|-------------|------|------|----|-----------|----|---------|
| q | query | 任意 | string | - | 1-50文字 | キーワード検索<br/>例: "JavaScript", "配列" |
| tags | query | 任意 | string[] | - | 1-10個、各1-50文字 | タグフィルター（カンマ区切り）<br/>例: "javascript,react" |
| difficulty | query | 任意 | enum | "all" | beginner/intermediate/advanced/all | 難易度フィルター |
| sort | query | 任意 | enum | "popularity" | popularity/latest/difficulty/accuracy | ソート基準 |
| order | query | 任意 | enum | "desc" | asc/desc | ソート順序 |
| limit | query | 任意 | number | 20 | 1-50 | 取得件数 |
| offset | query | 任意 | number | 0 | ≥0 | オフセット |
| cursor | query | 任意 | string | - | - | 次ページカーソル |
| accuracy_min | query | 任意 | number | - | 0-100 | 正答率下限（%）<br/>例: 70 |
| accuracy_max | query | 任意 | number | - | 0-100 | 正答率上限（%） |
| created_after | query | 任意 | string | - | ISO 8601 | 作成日時以降<br/>例: "2024-01-01T00:00:00Z" |
| created_before | query | 任意 | string | - | ISO 8601 | 作成日時以前 |
| exclude_answered | query | 任意 | boolean | false | - | 回答済み除外 |
| excludeTags | query | 任意 | string[] | - | 1-10個、各1-50文字 | 除外タグ（カンマ区切り）<br/>例: "basic,tutorial" |
| user_preference | query | 任意 | boolean | false | - | 個人化推奨適用 |
| include | query | 任意 | string[] | - | statistics/creator/tags/related | 含める関連データ<br/>例: "statistics,creator" |
| fields | query | 任意 | string[] | - | - | 返すフィールド指定<br/>例: "id,question,tags" |

**レスポンス**:

| フィールド名 | 型 | 必須 | 条件 | 説明・例 |
|-------------|----|----|------|---------|
| quizzes | array | ✓ | - | 検索結果配列 |
| quizzes[].id | string | ✓ | - | クイズID<br/>例: "qz_abc123def456" |
| quizzes[].question | string | ✓ | - | 問題文 |
| quizzes[].tags | string[] | ✓ | - | タグ一覧 |
| quizzes[].difficulty | string | ✓ | - | 難易度 |
| quizzes[].createdAt | string | ✓ | - | 作成日時（ISO 8601） |
| quizzes[].statistics | object | - | include指定時 | 統計情報 |
| quizzes[].statistics.totalAnswers | number | - | include指定時 | 総回答数 |
| quizzes[].statistics.correctRate | number | - | include指定時 | 正答率（0-100） |
| quizzes[].statistics.averageTime | number | - | include指定時 | 平均回答時間（秒） |
| quizzes[].creator | object | - | include指定時 | 作成者情報 |
| pagination | object | ✓ | - | ページネーション情報 |
| pagination.total | number | ✓ | - | 総件数 |
| pagination.count | number | ✓ | - | 現在件数 |
| pagination.limit | number | ✓ | - | ページサイズ |
| pagination.offset | number | ✓ | - | オフセット |
| pagination.hasMore | boolean | ✓ | - | 次頁存在フラグ |
| pagination.nextCursor | string | - | カーソル利用時 | 次ページカーソル |
| searchMeta | object | ✓ | - | 検索メタ情報 |
| searchMeta.query | string | ✓ | - | 検索クエリ |
| searchMeta.executionTime | number | ✓ | - | 実行時間（ms） |
| searchMeta.suggestedTags | string[] | - | 候補がある場合 | 推奨タグ |
| searchMeta.didYouMean | string | - | 候補がある場合 | 検索候補 |

**エラー**:

- 400: パラメータ不正（文字数制限、範囲外の値）
- 422: 検索クエリ不正（特殊文字、SQLインジェクション対策）
- 429: 検索レート制限（100回/時間）

**レスポンス型定義**:

```typescript
interface SearchQuizzesResponse {
  results: Array<{
    id: string;
    question: string;          // 最初の200文字 + "..."
    tags: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    statistics: {
      totalAnswers: number;
      correctRate: number;
      popularity: number;      // 0-100のスコア
    };
    createdAt: string;
    relevanceScore?: number;   // 検索関連度スコア
    snippet?: string;          // ハイライトされた一致部分
  }>;
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
  facets: {                    // フィルタリング用の集計情報
    tags: Record<string, number>;
    difficulty: Record<string, number>;
    correctRateRanges: Array<{
      range: string;           // "0-20", "21-40", etc.
      count: number;
    }>;
  };
  searchInfo: {
    query: string;
    executionTimeMs: number;
    suggestions?: string[];    // 検索改善提案
  };
}
```

#### POST /api/quiz/v1/learning/search/advanced

**目的**: 高度な検索（複合条件・重み付け）

**対応UI**: 検索画面 → 詳細検索

**リクエスト**:

```typescript
interface AdvancedSearchRequest {
  conditions: Array<{
    field: 'question' | 'explanation' | 'tags';
    operator: 'contains' | 'exact' | 'starts_with' | 'regex';
    value: string;
    weight?: number;           // 1-10の重み
  }>;
  filters: {
    difficulty?: ('beginner' | 'intermediate' | 'advanced')[];
    correctRateRange?: { min: number; max: number; };
    answerCountRange?: { min: number; max: number; };
    dateRange?: { from: string; to: string; };
    excludeTags?: string[];
  };
  preferences?: {
    personalizedRanking: boolean; // 個人の回答履歴を考慮
    diversityBoost: boolean;      // 結果の多様性を重視
  };
  pagination: {
    limit: number;
    offset: number;
  };
}
```

### 5.2 推奨システム

```http
GET    /api/quiz/v1/learning/recommendations
GET    /api/quiz/v1/learning/recommendations/similar/:quizId
GET    /api/quiz/v1/learning/trending
POST   /api/quiz/v1/learning/recommendations/feedback
```

#### GET /api/quiz/v1/learning/recommendations

**目的**: 個人化推奨クイズ取得

**対応UI**: ホーム → 「あなたにおすすめ」セクション

**クエリパラメータ**:

```typescript
interface GetRecommendationsQuery {
  count?: number;              // デフォルト10
  excludeAnswered?: boolean;   // 回答済み除外
  includeReason?: boolean;     // 推奨理由を含む
  context?: 'home' | 'after_session' | 'search_empty';
}
```

**レスポンス**:

```typescript
interface GetRecommendationsResponse {
  recommendations: Array<{
    quiz: {
      id: string;
      question: string;
      tags: string[];
      difficulty: 'beginner' | 'intermediate' | 'advanced';
      statistics: {
        totalAnswers: number;
        correctRate: number;
      };
    };
    score: number;             // 0-100の推奨スコア
    reason?: {
      type: 'similar_topics' | 'difficulty_match' | 'popular_in_category' | 'weakness_improvement';
      description: string;
      confidence: number;      // 0-1の信頼度
    };
  }>;
  metadata: {
    algorithm: string;         // 使用アルゴリズム
    basedOn: {
      answeredQuizzes: number;
      preferredTags: string[];
      skillLevel: string;
    };
    refreshedAt: string;
  };
}
```

#### GET /api/quiz/v1/learning/recommendations/similar/:quizId

**目的**: 指定クイズに類似したクイズの推奨

**対応UI**: クイズ詳細 → 関連クイズ表示

**パスパラメータ**:

| パラメータ名 | 種別 | 必須 | 型 | 制約 | 説明・例 |
|-------------|------|------|----|----|----------|
| quizId | path | 必須 | string | 36文字UUID | 基準となるクイズID |

**クエリパラメータ**:

| パラメータ名 | 種別 | 必須 | 型 | デフォルト値 | 制約 | 説明・例 |
|-------------|------|------|----|-----------|----|----------|
| count | query | 任意 | number | 5 | 1-20 | 取得件数 |
| similarity | query | 任意 | enum | "mixed" | tags/difficulty/topic/mixed | 類似性基準 |

#### GET /api/quiz/v1/learning/trending

**目的**: トレンド・人気クイズ取得

**対応UI**: ホーム → トレンドセクション

**クエリパラメータ**:

| パラメータ名 | 種別 | 必須 | 型 | デフォルト値 | 制約 | 説明・例 |
|-------------|------|------|----|-----------|----|----------|
| period | query | 任意 | enum | "week" | day/week/month | 集計期間 |
| category | query | 任意 | string | - | 1-50文字 | カテゴリフィルター |
| limit | query | 任意 | number | 10 | 1-50 | 取得件数 |

## 関連ドキュメント

- [API設計概要](../README.md)
- [Quiz Learning API](02-quiz-learning.md)
- [User Session API](03-user-session.md)
- [共通仕様](07-common-specs.md)

---
**ドメイン**: Search & Discovery Context  
**作成工程**: API設計  
**TypeSpec対応**: `api/spec/operations/search.tsp`
