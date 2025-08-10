# Quiz Domain - Manage Context API

## 責務

- クイズのCRUD操作
- 承認フロー管理
- 下書き管理
- コンテンツ品質管理

## エンドポイント一覧

### 1.1 クイズ管理

```http
POST   /api/quiz/v1/manage/quizzes
GET    /api/quiz/v1/manage/quizzes/:id
PUT    /api/quiz/v1/manage/quizzes/:id
DELETE /api/quiz/v1/manage/quizzes/:id
GET    /api/quiz/v1/manage/quizzes

# 動詞API (複雑ビジネスロジック)
POST   /api/quiz/v1/manage/quizzes/:id/approve
POST   /api/quiz/v1/manage/quizzes/:id/reject
POST   /api/quiz/v1/manage/quizzes/:id/publish
```

#### POST /api/quiz/v1/manage/quizzes

**目的**: 新しいクイズを投稿（承認待ち状態で作成）

**対応UI**: Create → 投稿ボタン

**リクエストボディ**:

```typescript
interface CreateQuizRequest {
  question: string;           // 10-500文字、HTMLタグ禁止
  answerType: 'boolean' | 'free_text' | 'single_choice' | 'multiple_choice';
  solution: BooleanSolution | FreeTextSolution | SingleChoiceSolution | MultipleChoiceSolution;
  tags: string[];            // 1-10個、各1-50文字、英数字・ハイフン・アンダースコアのみ
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  explanation?: string;       // 最大1000文字、HTMLタグ禁止
  creatorFingerprint: string; // デバイス識別子
  source?: string;           // 最大200文字、出典・参考元
  imageUrl?: string;         // HTTPS必須、jpg/png/gif形式、最大2MB
  estimatedTime?: number;    // 5-300秒、予想回答時間
}
```

**リクエスト例**:

```typescript
// Boolean型クイズ作成例
{
  "question": "TypeScriptは静的型付け言語である",
  "answerType": "boolean",
  "solution": {
    "type": "boolean",
    "value": true
  },
  "tags": ["typescript", "programming"],
  "difficulty": "beginner",
  "explanation": "TypeScriptはコンパイル時に型チェックを行う静的型付け言語です",
  "creatorFingerprint": "df_a1b2c3d4e5f6789abcdef"
}

// Free Text型クイズ作成例
{
  "question": "JavaScriptでHTTPリクエストを送信するAPIは？",
  "answerType": "free_text", 
  "solution": {
    "type": "free_text",
    "correctAnswer": "fetch",
    "matchingStrategy": "partial",
    "caseSensitive": false
  },
  "tags": ["javascript", "web-api"],
  "difficulty": "intermediate",
  "creatorFingerprint": "df_a1b2c3d4e5f6789abcdef"
}

// Single Choice型クイズ作成例
{
  "question": "次のうち、JavaScriptのプリミティブ型はどれ？",
  "answerType": "single_choice",
  "solution": {
    "type": "single_choice",
    "choices": [
      {"id": "choice-1", "text": "Object", "orderIndex": 0, "isCorrect": false},
      {"id": "choice-2", "text": "string", "orderIndex": 1, "isCorrect": true},
      {"id": "choice-3", "text": "Array", "orderIndex": 2, "isCorrect": false}
    ]
  },
  "tags": ["javascript", "types"],
  "difficulty": "beginner",
  "creatorFingerprint": "df_a1b2c3d4e5f6789abcdef"
}
```

**レスポンス**:

```typescript
interface CreateQuizResponse {
  quiz: {
    id: string;
    status: 'pending_approval';
    createdAt: string;
    approvalEstimate: string;    // 承認予定日時
  };
}
```

**エラー**:

- 400: バリデーションエラー（文字数・必須項目）
- 429: 投稿レート制限（1日10件まで）

#### GET /api/quiz/v1/manage/quizzes/:id

**目的**: クイズ詳細情報取得

**対応UI**: プレビュー画面、詳細表示

**レスポンス**:

```typescript
interface QuizDetailResponse {
  id: string;
  question: string;
  answerType: 'boolean' | 'free_text' | 'single_choice' | 'multiple_choice';
  solution: BooleanSolution | FreeTextSolution | SingleChoiceSolution | MultipleChoiceSolution;
  explanation?: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  status: 'draft' | 'pending_approval' | 'approved' | 'rejected' | 'published';
  createdAt: string;
  publishedAt?: string;
  statistics: {
    totalAnswers: number;
    correctRate: number;
    averageTimeMs: number;
  };
  creatorPermissions?: {
    canEdit: boolean;
    canDelete: boolean;
  };
}

// Solution型定義（Discriminated Union）
type BooleanSolution = {
  type: "boolean";
  value: boolean;
};

type FreeTextSolution = {
  type: "free_text";
  correctAnswer: string;
  matchingStrategy: "exact" | "partial" | "regex";
  caseSensitive: boolean;
};

type SingleChoiceSolution = {
  type: "single_choice";
  choices: Choice[];
};

type MultipleChoiceSolution = {
  type: "multiple_choice";
  choices: Choice[];
  minCorrectAnswers: number;
};

type Choice = {
  id: string;
  text: string;
  orderIndex: number;
  isCorrect: boolean;
};
```

**レスポンス例**:

```typescript
// Boolean型クイズの例
{
  "id": "quiz-123",
  "question": "TypeScriptは静的型付け言語である",
  "answerType": "boolean",
  "solution": {
    "type": "boolean", 
    "value": true
  },
  "explanation": "TypeScriptはコンパイル時に型チェックを行う静的型付け言語です",
  "tags": ["typescript", "programming"],
  "difficulty": "beginner",
  "status": "published",
  "createdAt": "2025-08-04T10:00:00Z"
}

// Free Text型クイズの例
{
  "id": "quiz-456",
  "question": "JavaScriptでHTTPリクエストを送信するためのAPIは？",
  "answerType": "free_text",
  "solution": {
    "type": "free_text",
    "correctAnswer": "fetch",
    "matchingStrategy": "partial",
    "caseSensitive": false
  },
  "explanation": "fetch APIは標準的なHTTPリクエスト送信方法です",
  "tags": ["javascript", "web-api"],
  "difficulty": "intermediate"
}

// Single Choice型クイズの例
{
  "id": "quiz-789", 
  "question": "次のうち、JavaScriptのプリミティブ型はどれ？",
  "answerType": "single_choice",
  "solution": {
    "type": "single_choice",
    "choices": [
      {"id": "choice-1", "text": "Object", "orderIndex": 0, "isCorrect": false},
      {"id": "choice-2", "text": "string", "orderIndex": 1, "isCorrect": true}, 
      {"id": "choice-3", "text": "Array", "orderIndex": 2, "isCorrect": false}
    ]
  },
  "difficulty": "beginner"
}
```

### 1.2 下書き管理

```http
POST   /api/quiz/v1/manage/drafts
PUT    /api/quiz/v1/manage/drafts/:id
DELETE /api/quiz/v1/manage/drafts/:id
GET    /api/quiz/v1/manage/drafts/mine
```

#### POST /api/quiz/v1/manage/drafts

**目的**: 下書き保存（オフライン→オンライン同期含む）

**対応UI**: Create → 下書き保存、オフライン作成

**リクエスト**:

```typescript
interface CreateDraftRequest {
  question?: string;
  correctAnswer?: boolean;
  explanation?: string;
  tags?: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  creatorFingerprint: string;
  lastModified: string;        // クライアント側タイムスタンプ
  offlineId?: string;          // オフライン作成時のローカルID
}
```

#### GET /api/quiz/v1/manage/drafts/mine

**目的**: 自分の下書き一覧取得

**対応UI**: Create → 下書き一覧、MyPage → 投稿管理

**クエリパラメータ**:

```typescript
interface GetDraftsQuery {
  limit?: number;              // デフォルト20
  offset?: number;
  orderBy?: 'created' | 'modified';
  status?: 'draft' | 'all';
}
```

**レスポンス**:

```typescript
interface GetDraftsResponse {
  drafts: Array<{
    id: string;
    question?: string;
    tags?: string[];
    lastModified: string;
    syncStatus: 'synced' | 'pending' | 'conflict';
  }>;
  pagination: {
    total: number;
    hasMore: boolean;
  };
}
```

### 1.3 承認フロー管理

```http
POST   /api/quiz/v1/manage/approvals
PUT    /api/quiz/v1/manage/approvals/:id
GET    /api/quiz/v1/manage/pending
GET    /api/quiz/v1/manage/approval-status/:quizId
```

#### POST /api/quiz/v1/manage/approvals

**目的**: 承認要求の作成（投稿時自動呼び出し）

**対応UI**: Create → 投稿完了時の内部処理

**リクエスト**:

```typescript
interface CreateApprovalRequest {
  quizId: string;
  requestType: 'new_quiz' | 'quiz_update';
  priority: 'normal' | 'high';
  submitterNotes?: string;
}
```

#### PUT /api/quiz/v1/manage/approvals/:id

**目的**: 承認処理（管理者権限必要）

**対応UI**: 管理者画面（将来実装）

**リクエスト**:

```typescript
interface ApprovalDecisionRequest {
  decision: 'approved' | 'rejected';
  reviewerNotes?: string;
  publishImmediately?: boolean;
}
```

### 1.4 統計・品質管理

```http
GET    /api/quiz/v1/manage/statistics/creator/:creatorId
GET    /api/quiz/v1/manage/quality/report
POST   /api/quiz/v1/manage/quality/flag
```

#### GET /api/quiz/v1/manage/statistics/creator/:creatorId

**目的**: 作成者別統計情報取得

**対応UI**: MyPage → 投稿管理 → 統計表示

**レスポンス**:

```typescript
interface CreatorStatisticsResponse {
  totalQuizzes: number;
  publishedQuizzes: number;
  totalAnswers: number;
  averageCorrectRate: number;
  popularityScore: number;
  qualityScore: number;
  tagDistribution: Record<string, number>;
  difficultyDistribution: Record<string, number>;
}
```

## 関連ドキュメント

- [API設計概要](../README.md)
- [Quiz Learning API](02-quiz-learning.md)
- [共通仕様](07-common-specs.md)

---
**ドメイン**: Quiz Management Context  
**作成工程**: API設計  
**TypeSpec対応**: `api/spec/operations/quiz-management.tsp`
