# API機能カタログ

## 目的

UIサイトマップ・ユーザーストーリーから抽出した全機能を網羅し、境界づけられたコンテキスト別に分類した詳細なAPIエンドポイント仕様を提供する。

## UI機能とAPI対応マトリックス

### UI機能抽出元

| ドキュメント | 対象機能 | 抽出API数 |
|-------------|----------|-----------|
| [1.01_sitemap.yaml](../ui-design/1.01_sitemap.yaml) | 全ページ機能（23ページ） | 47 endpoints |
| [US-01 クイズ回答](../ui-design/1.02_user-stories/us-01_quiz-answering.md) | Tinder UI回答操作 | 8 endpoints |
| [US-02 クイズ作成](../ui-design/1.02_user-stories/us-02_quiz-creation.md) | 段階的作成フロー | 6 endpoints |
| [US-03 クイズ承認](../ui-design/1.02_user-stories/us-03_quiz-approval.md) | 承認ワークフロー | 4 endpoints |
| [US-04 回答履歴](../ui-design/1.02_user-stories/us-04_answer-history.md) | 履歴管理・統計 | 7 endpoints |
| [US-05 オフライン同期](../ui-design/1.02_user-stories/us-05_offline-sync.md) | 同期処理・競合解決 | 9 endpoints |
| [US-06 クイズ検索](../ui-design/1.02_user-stories/us-06_quiz-search.md) | 検索・フィルタリング | 6 endpoints |

**合計**: 87 API endpoints

## 1. Quiz Domain - Manage Context API

### 責務

- クイズのCRUD操作
- 承認フロー管理
- 下書き管理
- コンテンツ品質管理

### エンドポイント一覧

#### 1.1 クイズ管理

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

##### POST /api/quiz/v1/manage/quizzes

**目的**: 新しいクイズを投稿（承認待ち状態で作成）

**対応UI**: Create → 投稿ボタン

**リクエストボディ**:

| フィールド名 | 種別 | 必須 | 型 | デフォルト値 | 制約 | 説明・例 |
|-------------|------|------|----|-----------|----|---------|
| question | body | ✓ | string | - | 10-500文字、HTMLタグ禁止 | 問題文<br/>例: "JavaScriptで配列を作成する方法は？" |
| correctAnswer | body | ✓ | boolean | - | - | 正解フラグ（true=◯, false=×）<br/>例: true |
| tags | body | ✓ | string[] | - | 1-10個、各1-50文字、英数字・ハイフン・アンダースコアのみ | タグ一覧<br/>例: ["javascript", "array", "programming"] |
| difficulty | body | ✓ | enum | - | beginner/intermediate/advanced | 難易度<br/>例: "beginner" |
| explanation | body | 任意 | string | - | 最大1000文字、HTMLタグ禁止 | 解説文<br/>例: "[]を使用して空の配列を作成できます。" |
| creatorFingerprint | body | ✓ | string | - | - | デバイス識別子<br/>例: "df_a1b2c3d4e5f6789abcdef" |
| source | body | 任意 | string | - | 最大200文字 | 出典・参考元<br/>例: "MDN Web Docs" |
| imageUrl | body | 任意 | string | - | HTTPS必須、jpg/png/gif形式、最大2MB | 画像URL<br/>例: "<https://example.com/quiz-image.png>" |
| estimatedTime | body | 任意 | number | - | 5-300秒 | 予想回答時間（秒）<br/>例: 30 |

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

##### GET /api/quiz/v1/manage/quizzes/:id

**目的**: クイズ詳細情報取得

**対応UI**: プレビュー画面、詳細表示

**レスポンス**:

```typescript
interface QuizDetailResponse {
  id: string;
  question: string;
  correctAnswer: boolean;
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
```

#### 1.2 下書き管理

```http
POST   /api/quiz/v1/manage/drafts
PUT    /api/quiz/v1/manage/drafts/:id
DELETE /api/quiz/v1/manage/drafts/:id
GET    /api/quiz/v1/manage/drafts/mine
```

##### POST /api/quiz/v1/manage/drafts

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

##### GET /api/quiz/v1/manage/drafts/mine

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

#### 1.3 承認フロー管理

```http
POST   /api/quiz/v1/manage/approvals
PUT    /api/quiz/v1/manage/approvals/:id
GET    /api/quiz/v1/manage/pending
GET    /api/quiz/v1/manage/approval-status/:quizId
```

##### POST /api/quiz/v1/manage/approvals

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

##### PUT /api/quiz/v1/manage/approvals/:id

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

#### 1.4 統計・品質管理

```http
GET    /api/quiz/v1/manage/statistics/creator/:creatorId
GET    /api/quiz/v1/manage/quality/report
POST   /api/quiz/v1/manage/quality/flag
```

##### GET /api/v1/quiz-management/statistics/creator/:creatorId

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

## 2. Quiz Domain - Learning Context API

### 責務

- Deck生成・管理
- 学習セッション管理
- 回答処理・正誤判定
- 履歴・統計管理

### エンドポイント一覧

#### 2.1 Deck管理

```http
POST   /api/quiz/v1/learning/decks
GET    /api/quiz/v1/learning/decks/:id
GET    /api/quiz/v1/learning/decks/mine
DELETE /api/quiz/v1/learning/decks/:id

# 動詞API (複雑ビジネスロジック)
POST   /api/quiz/v1/learning/decks/from-search
POST   /api/quiz/v1/learning/decks/wrong-questions
```

##### POST /api/quiz/v1/learning/decks

**目的**: 新しいDeck（問題集）を作成

**対応UI**: ホーム → 選択問題から問題集作成、検索結果 → 問題集作成

**リクエスト**:

```typescript
interface CreateDeckRequest {
  name?: string;                // 省略時は自動生成
  quizIds: string[];           // 選択されたクイズID配列
  source: 'manual_selection' | 'search_result' | 'wrong_questions';
  sourceQuery?: string;        // source=search_resultの場合の検索条件
  maxQuizzes?: number;         // 最大100問
  shuffleOrder?: boolean;      // 問題順序をシャッフル
  creatorFingerprint: string;
}
```

**レスポンス**:

```typescript
interface CreateDeckResponse {
  deck: {
    id: string;
    name: string;
    quizCount: number;
    estimatedTimeMinutes: number;
    difficulty: 'mixed' | 'beginner' | 'intermediate' | 'advanced';
    tags: string[];            // 含まれるタグの統合
    createdAt: string;
  };
}
```

##### POST /api/quiz/v1/learning/decks/from-search

**目的**: 検索結果から自動的にDeckを生成  
**対応UI**: 検索結果 → 「この結果で問題集作成」ボタン

**リクエストボディ**:

| パラメータ名 | 種別 | 必須 | 型 | デフォルト値 | 制約 | 説明・例 |
|-------------|------|------|----|-----------|----|----------|
| searchQuery | body | 必須 | object | - | - | 検索条件オブジェクト |
| searchQuery.keywords | body | 任意 | string | - | 1-50文字 | 検索キーワード<br/>例: "JavaScript" |
| searchQuery.tags | body | 任意 | string[] | - | 各要素1-20文字 | 検索対象タグ<br/>例: ["React", "配列"] |
| searchQuery.difficulty | body | 任意 | enum | - | beginner/intermediate/advanced | 難易度フィルタ |
| searchQuery.limit | body | 任意 | number | 50 | 1-100 | 最大取得数 |
| deckName | body | 任意 | string | "検索結果集" | 1-100文字 | Deck名 |
| shuffleOrder | body | 任意 | boolean | false | - | 問題順序ランダム化 |
| creatorFingerprint | body | 必須 | string | - | 36文字UUID | 作成者識別子 |

##### POST /api/quiz/v1/learning/decks/wrong-questions

**目的**: 間違えた問題から復習用Deckを生成  
**対応UI**: 結果画面 → 間違い問題集作成、MyPage → 間違い問題集

**リクエストボディ**:

| パラメータ名 | 種別 | 必須 | 型 | デフォルト値 | 制約 | 説明・例 |
|-------------|------|------|----|-----------|----|----------|
| sourceSessionIds | body | 任意 | string[] | - | 各要素36文字UUID | 特定セッションの間違い問題のみ<br/>例: ["session-123", "session-456"] |
| dateRange | body | 任意 | object | - | - | 期間フィルタ |
| dateRange.from | body | 任意 | string | - | ISO8601形式 | 開始日時<br/>例: "2025-01-01T00:00:00Z" |
| dateRange.to | body | 任意 | string | - | ISO8601形式 | 終了日時<br/>例: "2025-01-31T23:59:59Z" |
| tags | body | 任意 | string[] | - | 各要素1-20文字 | 特定タグの間違い問題のみ<br/>例: ["React", "配列"] |
| maxQuizzes | body | 任意 | number | 50 | 1-200 | 最大問題数 |
| creatorFingerprint | body | 必須 | string | - | 36文字UUID | 作成者識別子 |

#### 2.2 学習セッション管理

```http
POST   /api/quiz/v1/learning/sessions
GET    /api/quiz/v1/learning/sessions/:id
PUT    /api/quiz/v1/learning/sessions/:id

# 動詞API (セッション制御)
POST   /api/quiz/v1/learning/sessions/:id/complete
POST   /api/quiz/v1/learning/sessions/:id/pause
POST   /api/quiz/v1/learning/sessions/:id/resume
```

##### POST /api/quiz/v1/learning/sessions

**目的**: 新しい学習セッションを開始  
**対応UI**: Deck選択 → 「学習開始」ボタン

**リクエストボディ**:

| パラメータ名 | 種別 | 必須 | 型 | デフォルト値 | 制約 | 説明・例 |
|-------------|------|------|----|-----------|----|----------|
| deckId | body | 必須 | string | - | 36文字UUID | 学習対象Deck ID |
| settings | body | 必須 | object | - | - | 学習設定 |
| settings.showExplanation | body | 必須 | boolean | true | - | 即座に解説表示 |
| settings.allowSkip | body | 必須 | boolean | false | - | スキップ操作許可 |
| settings.timeLimit | body | 任意 | number | - | 30-600秒 | 問題あたり制限時間(秒)<br/>例: 120 |
| settings.randomOrder | body | 任意 | boolean | false | - | 問題順序ランダム化 |
| creatorFingerprint | body | 必須 | string | - | 36文字UUID | 作成者識別子 |

**レスポンス**:

| フィールド名 | 型 | 説明・例 |
|------------|----|-----------|
| session | object | セッション情報 |
| session.id | string | セッションID |
| session.deckId | string | 関連Deck ID |
| session.currentQuizIndex | number | 現在の問題インデックス(0から開始) |
| session.totalQuizzes | number | 総問題数 |
| session.state | string | 'active' |
| session.startedAt | string | 開始日時 |
| session.settings | object | 設定 |
| currentQuiz | object | 現在の問題 |
| currentQuiz.id | string | 問題ID |
| currentQuiz.question | string | 問題文 |

##### GET /api/quiz/v1/learning/sessions/:id

**目的**: セッション現在状態取得（進捗確認・復帰）  
**対応UI**: 回答画面読み込み、セッション復帰

**パスパラメータ**:

| パラメータ名 | 種別 | 必須 | 型 | 制約 | 説明・例 |
|-------------|------|------|----|----|----------|
| id | path | 必須 | string | 36文字UUID | セッションID |

**レスポンス**:

| フィールド名 | 型 | 説明・例 |
|------------|----|-----------|
| session | object | セッション情報 |
| session.id | string | セッションID |
| session.deckId | string | 関連Deck ID |
| session.currentQuizIndex | number | 現在の問題インデックス |
| session.totalQuizzes | number | 総問題数 |
| session.state | enum | active/paused/completed |
| session.progress | object | 進捗情報 |
| session.progress.answeredCount | number | 回答済み問題数 |
| session.progress.correctCount | number | 正解問題数 |
| session.progress.skippedCount | number | スキップ問題数 |
| session.startedAt | string | 開始日時(ISO8601) |
| session.lastActivityAt | string | 最終活動日時(ISO8601) |
| currentQuiz | object | 現在の問題(state=activeのみ) |
| currentQuiz.id | string | 問題ID |
| currentQuiz.question | string | 問題文 |
| currentQuiz.hasImage | boolean | 画像有無 |
| previousAnswer | object | 前問結果(解説表示用) |
| previousAnswer.quizId | string | 問題ID |
| previousAnswer.userAnswer | boolean | ユーザー回答 |
| previousAnswer.correctAnswer | boolean | 正解 |
| previousAnswer.isCorrect | boolean | 正解フラグ |
| previousAnswer.explanation | string | 解説文 |

#### 2.3 回答処理

```http
POST   /api/quiz/v1/learning/sessions/:id/answers
GET    /api/quiz/v1/learning/answers/:id
PUT    /api/quiz/v1/learning/answers/:id/offline-sync
```

##### POST /api/quiz/v1/learning/sessions/:id/answers

**目的**: ユーザー回答の提出・正誤判定  
**対応UI**: 回答画面 → スワイプ操作

**パスパラメータ**:

| パラメータ名 | 種別 | 必須 | 型 | 制約 | 説明・例 |
|-------------|------|------|----|----|----------|
| id | path | 必須 | string | 36文字UUID | セッションID |

**リクエストボディ**:

| パラメータ名 | 種別 | 必須 | 型 | デフォルト値 | 制約 | 説明・例 |
|-------------|------|------|----|-----------|----|----------|
| quizId | body | 必須 | string | - | 36文字UUID | 回答対象問題ID |
| userAnswer | body | 必須 | boolean | - | true/false | ユーザー回答(true=◯, false=×) |
| responseTimeMs | body | 必須 | number | - | 1-600000 | 回答時間(ミリ秒)<br/>例: 3500 |
| answerMethod | body | 必須 | enum | - | swipe_right/swipe_left/tap_correct/tap_incorrect | 回答手段 |
| confidence | body | 任意 | number | - | 1-5 | 確信度(1=全くわからない, 5=完全に確信) |
| creatorFingerprint | body | 必須 | string | - | 36文字UUID | 作成者識別子 |

**レスポンス**:

| フィールド名 | 型 | 説明・例 |
|------------|----|-----------|
| answer | object | 回答結果 |
| answer.id | string | 回答ID |
| answer.isCorrect | boolean | 正解フラグ |
| answer.correctAnswer | boolean | 正解 |
| answer.explanation | string | 解説文 |
| answer.responseTimeMs | number | 回答時間(ミリ秒) |
| session | object | セッション更新情報 |
| session.currentQuizIndex | number | 現在の問題インデックス |
| session.progress | object | 進捗情報 |
| session.progress.answeredCount | number | 回答済み問題数 |
| session.progress.correctCount | number | 正解問題数 |
| session.progress.correctRate | number | 正答率(0.0-1.0) |
| nextQuiz | object | 次の問題(セッション継続時) |
| nextQuiz.id | string | 問題ID |
| nextQuiz.question | string | 問題文 |
| sessionComplete | boolean | セッション完了フラグ |

#### 2.4 履歴・統計管理

```http
GET    /api/v1/quiz-learning/history
GET    /api/v1/quiz-learning/history/:sessionId
GET    /api/v1/quiz-learning/statistics/personal
GET    /api/v1/quiz-learning/statistics/quiz/:quizId
GET    /api/v1/quiz-learning/wrong-questions
POST   /api/v1/quiz-learning/retry-session
```

##### GET /api/quiz/v1/learning/history

**目的**: 学習履歴一覧取得  
**対応UI**: MyPage → 回答履歴

**クエリパラメータ**:

| パラメータ名 | 種別 | 必須 | 型 | デフォルト値 | 制約 | 説明・例 |
|-------------|------|------|----|-----------|----|----------|
| limit | query | 任意 | number | 20 | 1-100 | 最大取得数 |
| offset | query | 任意 | number | 0 | 0以上 | スキップ数 |
| from | query | 任意 | string | - | ISO8601形式 | 開始日時<br/>例: "2025-01-01T00:00:00Z" |
| to | query | 任意 | string | - | ISO8601形式 | 終了日時<br/>例: "2025-01-31T23:59:59Z" |
| tags | query | 任意 | string[] | - | カンマ区切り | タグフィルタ<br/>例: "React,Vue" |
| minCorrectRate | query | 任意 | number | - | 0.0-1.0 | 正答率下限<br/>例: 0.7 |
| orderBy | query | 任意 | enum | "date" | date/correct_rate/total_questions | ソート基準 |
| orderDirection | query | 任意 | enum | "desc" | asc/desc | ソート方向 |

**レスポンス**:

```typescript
interface GetHistoryResponse {
  sessions: Array<{
    id: string;
    deckName: string;
    completedAt: string;
    totalQuestions: number;
    correctAnswers: number;
    correctRate: number;
    averageResponseTime: number;
    tags: string[];
    canRetry: boolean;         // Deckがまだ利用可能か
  }>;
  pagination: {
    total: number;
    hasMore: boolean;
  };
  summary: {
    totalSessions: number;
    averageCorrectRate: number;
    totalAnswers: number;
    studyTimeMinutes: number;
  };
}
```

##### GET /api/v1/quiz-learning/statistics/personal

**目的**: 個人学習統計取得

**対応UI**: MyPage → 実績・統計表示

**レスポンス**:

```typescript
interface PersonalStatisticsResponse {
  overall: {
    totalAnswers: number;
    correctAnswers: number;
    overallCorrectRate: number;
    totalStudyTime: number;    // 分
    sessionsCompleted: number;
    averageSessionLength: number;
  };
  byTag: Record<string, {
    answers: number;
    correctRate: number;
    proficiencyLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  }>;
  byDifficulty: Record<'beginner' | 'intermediate' | 'advanced', {
    answers: number;
    correctRate: number;
  }>;
  trends: {
    daily: Array<{
      date: string;
      answers: number;
      correctRate: number;
    }>;
    weekly: Array<{
      weekStart: string;
      answers: number;
      correctRate: number;
    }>;
  };
  achievements: Array<{
    id: string;
    name: string;
    description: string;
    unlockedAt: string;
    type: 'streak' | 'mastery' | 'volume' | 'improvement';
  }>;
}
```

## 3. User Domain API

### 責務

- 匿名ユーザー識別・セッション管理
- 作成者権限・デバイス識別
- プライバシー保護・データ整合性

### エンドポイント一覧

#### 3.1 セッション管理

```http
POST   /api/user/v1/sessions
GET    /api/user/v1/sessions/current
PUT    /api/user/v1/sessions/current
DELETE /api/user/v1/sessions/current

# 動詞API (セッション制御)
POST   /api/user/v1/sessions/refresh
```

##### POST /api/user/v1/sessions

**目的**: 新しい匿名セッションの開始

**対応UI**: アプリ初回起動、セッション期限切れ時

**リクエスト**:

```typescript
interface CreateSessionRequest {
  deviceFingerprint: {
    userAgent: string;
    screenResolution: string;
    timezone: string;
    language: string;
    platform: string;
  };
  sessionHint?: string;        // 既存セッション復帰のヒント
  capabilities: {
    offline: boolean;
    webGL: boolean;
    touchEvents: boolean;
  };
}
```

**レスポンス**:

```typescript
interface CreateSessionResponse {
  session: {
    id: string;
    accessToken: string;       // JWT
    refreshToken: string;
    expiresAt: string;
    createdAt: string;
  };
  user: {
    id: string;               // 匿名ユーザーID
    isNewUser: boolean;
    capabilities: string[];
    preferences: {
      theme: 'light' | 'dark' | 'system';
      language: string;
      difficulty: 'beginner' | 'intermediate' | 'advanced';
    };
  };
}
```

##### GET /api/user/v1/sessions/current

**目的**: 現在セッション情報取得

**対応UI**: アプリ起動時、認証状態確認

**レスポンス**:

```typescript
interface GetCurrentSessionResponse {
  session: {
    id: string;
    userId: string;
    isActive: boolean;
    expiresAt: string;
    lastActivityAt: string;
  };
  user: {
    id: string;
    createdAt: string;
    totalSessions: number;
    preferences: UserPreferences;
    statistics: {
      totalAnswers: number;
      sessionsCompleted: number;
      correctRate: number;
    };
  };
  permissions: {
    canCreateQuiz: boolean;
    canDeleteOwnQuiz: boolean;
    dailyQuizLimit: number;
    dailyQuizRemaining: number;
  };
}
```

#### 3.2 ユーザー管理

```http
GET    /api/user/v1/profile/me
PUT    /api/user/v1/profile/me
GET    /api/user/v1/permissions
DELETE /api/v1/user-session/me
POST   /api/v1/user-session/me/export-data
```

##### GET /api/user/v1/profile/me

**目的**: 匿名ユーザー情報取得

**対応UI**: MyPage → プロフィール表示

**レスポンス**:

```typescript
interface GetMeResponse {
  id: string;
  createdAt: string;
  lastActiveAt: string;
  deviceCount: number;         // 関連デバイス数
  preferences: {
    theme: 'light' | 'dark' | 'system';
    language: string;
    defaultDifficulty: 'beginner' | 'intermediate' | 'advanced';
    showExplanations: boolean;
    enableNotifications: boolean;
    soundEffects: boolean;
  };
  privacy: {
    trackingAllowed: boolean;
    analyticsEnabled: boolean;
    dataRetentionDays: number;
  };
  limits: {
    dailyQuizCreation: number;
    maxDraftCount: number;
    maxSessionHistory: number;
  };
}
```

##### PUT /api/v1/user-session/me

**目的**: ユーザー設定・プリファレンス更新

**対応UI**: MyPage → 設定変更

**リクエスト**:

```typescript
interface UpdateMeRequest {
  preferences?: {
    theme?: 'light' | 'dark' | 'system';
    language?: string;
    defaultDifficulty?: 'beginner' | 'intermediate' | 'advanced';
    showExplanations?: boolean;
    enableNotifications?: boolean;
    soundEffects?: boolean;
  };
  privacy?: {
    trackingAllowed?: boolean;
    analyticsEnabled?: boolean;
  };
}
```

#### 3.3 作成者権限管理

```http
POST   /api/v1/user-session/creator-claims
GET    /api/user/v1/creator/my-quizzes
PUT    /api/v1/user-session/creator-claims/:quizId
DELETE /api/v1/user-session/creator-claims/:quizId
```

##### POST /api/v1/user-session/creator-claims

**目的**: 作成者権限の主張（デバイス変更時など）

**対応UI**: MyPage → 投稿管理 → 「作成者権限を主張」

**リクエスト**:

```typescript
interface CreateCreatorClaimRequest {
  quizId: string;
  evidence: {
    originalDeviceFingerprint?: string;
    creationTimestamp?: string;
    draftContent?: string;      // 下書き内容の一部
  };
  reason: string;              // 権限主張の理由
}
```

##### GET /api/user/v1/creator/my-quizzes

**目的**: 自分が作成したクイズ一覧取得

**対応UI**: MyPage → 投稿管理

**クエリパラメータ**:

| パラメータ名 | 種別 | 必須 | 型 | デフォルト値 | 制約 | 説明・例 |
|-------------|------|------|----|-----------|----|---------|
| status | query | 任意 | enum | "all" | all/pending/approved/rejected/published | ステータスフィルター<br/>例: "pending" |
| tags | query | 任意 | string[] | - | 1-10個、各1-50文字 | タグフィルター（カンマ区切り）<br/>例: "javascript,react" |
| difficulty | query | 任意 | enum | "all" | beginner/intermediate/advanced/all | 難易度フィルター |
| sort | query | 任意 | enum | "created_at" | created_at/updated_at/popularity/accuracy | ソート基準 |
| order | query | 任意 | enum | "desc" | asc/desc | ソート順序 |
| limit | query | 任意 | number | 20 | 1-100 | 取得件数 |
| offset | query | 任意 | number | 0 | ≥0 | オフセット |
| created_after | query | 任意 | string | - | ISO 8601 | 作成日時以降<br/>例: "2024-01-01T00:00:00Z" |
| created_before | query | 任意 | string | - | ISO 8601 | 作成日時以前 |
| include | query | 任意 | string[] | - | statistics/approval_history/recent_answers | 含める関連データ<br/>例: "statistics,approval_history" |
| min_answers | query | 任意 | number | - | ≥0 | 最小回答数フィルター<br/>例: 10 |
| min_accuracy | query | 任意 | number | - | 0-100 | 最小正答率フィルター（%）<br/>例: 70 |

**レスポンス**:

```typescript
interface GetMyCreationsResponse {
  quizzes: Array<{
    id: string;
    question: string;          // 最初の100文字
    status: 'draft' | 'pending_approval' | 'approved' | 'rejected' | 'published';
    createdAt: string;
    lastModifiedAt: string;
    statistics?: {
      totalAnswers: number;
      correctRate: number;
    };
    permissions: {
      canEdit: boolean;
      canDelete: boolean;
      canViewStats: boolean;
    };
  }>;
  summary: {
    total: number;
    byStatus: Record<string, number>;
    totalAnswersReceived: number;
    averageCorrectRate: number;
  };
}
```

## 4. Sync Domain API

### 責動

- オフライン対応データ管理
- 同期処理・競合解決
- キャッシュ管理・データ整合性

### エンドポイント一覧

#### 4.1 キャッシュ管理

```http
GET    /api/sync/v1/cache-manifest
POST   /api/sync/v1/download
GET    /api/sync/v1/cache-status
DELETE /api/sync/v1/cache/:resourceId
```

##### GET /api/sync/v1/cache-manifest

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

##### POST /api/sync/v1/download

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

#### 4.2 同期処理

```http
POST   /api/sync/v1/upload
GET    /api/sync/v1/status

# 動詞API (競合解決)
POST   /api/sync/v1/resolve-conflicts
GET    /api/sync/v1/conflicts
```

##### POST /api/sync/v1/upload

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

##### GET /api/sync/v1/status

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

#### 4.3 競合解決

```http
GET    /api/sync/v1/conflicts
POST   /api/sync/v1/resolve-conflicts
PUT    /api/sync/v1/conflicts/:conflictId
```

##### GET /api/sync/v1/conflicts

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

##### POST /api/sync/v1/resolve-conflicts

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

#### 4.4 バッチ処理

```http
POST   /api/sync/v1/batch-answers
POST   /api/v1/offline-sync/batch-drafts
GET    /api/v1/offline-sync/batch-status/:batchId
```

##### POST /api/v1/offline-sync/batch-answers

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

## 5. Quiz Domain - Search & Discovery API

### 責務

- 全文検索機能
- フィルタリング・ソート機能
- 推奨システム

### エンドポイント一覧

#### 5.1 検索機能

```http
GET    /api/quiz/v1/learning/search
GET    /api/quiz/v1/learning/search/suggestions
GET    /api/quiz/v1/learning/search/autocomplete
POST   /api/quiz/v1/learning/search/advanced
GET    /api/quiz/v1/learning/popular
```

##### GET /api/quiz/v1/learning/search

**目的**: 基本的なクイズ検索
**対応UI**: 検索画面 → 検索実行

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

**クエリパラメータ**:

```typescript
interface SearchQuizzesQuery {
  q?: string;                  // キーワード検索
  tags?: string[];             // タグフィルター（OR条件）
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  minCorrectRate?: number;     // 最低正答率
  maxCorrectRate?: number;     // 最高正答率
  createdAfter?: string;       // 作成日以降
  limit?: number;              // デフォルト20、最大100
  offset?: number;
  sort?: 'relevance' | 'popularity' | 'newest' | 'difficulty' | 'correct_rate';
  order?: 'asc' | 'desc';
}
```

**レスポンス**:

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

##### POST /api/v1/search/advanced

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

#### 5.2 推奨システム

```http
GET    /api/quiz/v1/learning/recommendations
GET    /api/quiz/v1/learning/recommendations/similar/:quizId
GET    /api/quiz/v1/learning/trending
POST   /api/quiz/v1/learning/recommendations/feedback
```

##### GET /api/quiz/v1/learning/recommendations

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

## 6. Cross-Context Integration Patterns

### 6.1 API間連携パターン

#### Published Language統合

```typescript
// Quiz Management → Quiz Learning
const getPublishedQuizzes = async (criteria: QuizCriteria): Promise<PublishedQuiz[]> => {
  return await fetch('/api/v1/quiz-management/published', {
    method: 'POST',
    body: JSON.stringify(criteria)
  });
};

// Quiz Learning側での利用
const createDeckFromPublished = async (searchCriteria: SearchCriteria): Promise<Deck> => {
  const publishedQuizzes = await getPublishedQuizzes(searchCriteria);
  return await fetch('/api/v1/quiz-learning/decks', {
    method: 'POST',
    body: JSON.stringify({
      quizIds: publishedQuizzes.map(q => q.id),
      source: 'search_result'
    })
  });
};
```

#### Anti-Corruption Layer統合

```typescript
// Offline Sync → 他コンテキスト（変換レイヤー経由）
class OfflineSyncAdapter {
  async syncAnswers(offlineAnswers: OfflineAnswer[]): Promise<SyncResult[]> {
    // オフラインデータを各コンテキストの形式に変換
    const learningAnswers = offlineAnswers.map(answer => ({
      sessionId: answer.sessionId,
      quizId: answer.quizId,
      userAnswer: answer.response,
      responseTimeMs: answer.duration,
      creatorFingerprint: answer.deviceId
    }));

    // Quiz Learning Contextのバッチ同期API呼び出し
    return await fetch('/api/v1/quiz-learning/batch-answers', {
      method: 'POST',
      body: JSON.stringify({ answers: learningAnswers })
    });
  }

  async syncDrafts(offlineDrafts: OfflineDraft[]): Promise<SyncResult[]> {
    // Quiz Management Contextの形式に変換
    const managementDrafts = offlineDrafts.map(draft => ({
      question: draft.content.question,
      correctAnswer: draft.content.answer,
      explanation: draft.content.explanation,
      tags: draft.content.tags,
      creatorFingerprint: draft.deviceId,
      lastModified: draft.modifiedAt
    }));

    return await fetch('/api/v1/quiz-management/batch-drafts', {
      method: 'POST',
      body: JSON.stringify({ drafts: managementDrafts })
    });
  }
}
```

### 6.2 GraphQL統合API

```typescript
// 統合GraphQLエンドポイント
const typeDefs = `
  type Query {
    # Cross-context queries
    myDashboard: Dashboard
    quizWithLearningContext(id: ID!): QuizWithContext
    searchWithPersonalization(query: SearchInput!): SearchResults

    # Context-specific queries
    publishedQuizzes(filter: QuizFilter): [PublishedQuiz!]!
    myLearningProgress: LearningProgress
    offlineSyncStatus: SyncStatus
  }

  type Mutation {
    # Integrated workflows
    createAndStartQuizSession(input: QuickStartInput!): QuizSession
    submitAnswerAndGetNext(input: AnswerInput!): AnswerResult

    # Context-specific mutations
    createQuizDraft(input: QuizDraftInput!): QuizDraft
    startLearningSession(deckId: ID!): QuizSession
    syncOfflineData(input: SyncInput!): SyncResult
  }

  type Subscription {
    # Real-time updates
    sessionProgress(sessionId: ID!): SessionProgress
    syncStatusUpdates: SyncStatus
    newRecommendations: [Recommendation!]!
  }
`;

// 統合リゾルバー実装例
const resolvers = {
  Query: {
    myDashboard: async (_, __, { user }) => {
      // 複数コンテキストからデータを統合
      const [learningStats, createdQuizzes, recentSessions, pendingSync] = await Promise.all([
        learningAPI.getPersonalStatistics(user.id),
        managementAPI.getMyCreations(user.id),
        learningAPI.getRecentSessions(user.id, { limit: 5 }),
        offlineAPI.getSyncStatus(user.id)
      ]);

      return {
        user,
        learningStats,
        createdQuizzes,
        recentSessions,
        syncStatus: pendingSync,
        recommendations: await recommendationsAPI.getForUser(user.id)
      };
    },

    quizWithLearningContext: async (_, { id }, { user }) => {
      // Quiz Management + Quiz Learning統合
      const quiz = await managementAPI.getPublishedQuiz(id);
      const personalStats = await learningAPI.getUserQuizStats(user.id, id);
      const similarQuizzes = await recommendationsAPI.getSimilar(id);

      return {
        ...quiz,
        personalStats,
        recommendations: similarQuizzes
      };
    }
  },

  Mutation: {
    createAndStartQuizSession: async (_, { input }, { user }) => {
      // 検索 → Deck作成 → セッション開始の統合フロー
      const searchResults = await searchAPI.search(input.searchCriteria);
      const deck = await learningAPI.createDeck({
        quizIds: searchResults.results.slice(0, input.maxQuizzes).map(r => r.id),
        source: 'search_result',
        creatorFingerprint: user.deviceFingerprint
      });

      return await learningAPI.startSession({
        deckId: deck.id,
        settings: input.sessionSettings,
        creatorFingerprint: user.deviceFingerprint
      });
    }
  },

  Subscription: {
    sessionProgress: {
      subscribe: (_, { sessionId }) => {
        return pubsub.asyncIterator(`SESSION_PROGRESS_${sessionId}`);
      }
    }
  }
};
```

## 7. API仕様詳細

### 7.1 共通仕様

#### 認証ヘッダー

```http
Authorization: Bearer <JWT_TOKEN>
X-Device-Fingerprint: <DEVICE_ID>
X-Request-ID: <UNIQUE_REQUEST_ID>
```

#### 共通レスポンス形式

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

#### エラーコード体系

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

### 7.2 パフォーマンス最適化

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

## 8. 運用・監視API

### 8.1 ヘルスチェック

```http
GET    /api/health
GET    /api/health/detailed
GET    /api/health/dependencies
```

### 8.2 メトリクス・分析

```http
GET    /api/metrics/usage
GET    /api/metrics/performance
GET    /api/analytics/user-behavior
POST   /api/analytics/events
```

## まとめ

このAPIカタログは、Your Quizアプリケーションの全UI機能を網羅し、87のエンドポイントで構成される包括的なAPI仕様を提供する。

### 主要特徴

1. **UI完全対応**: 全23ページ・87機能のAPI提供
2. **DDD準拠**: 4つの境界づけられたコンテキスト別の整理
3. **イベント駆動**: 非同期処理による高い拡張性
4. **オフライン対応**: 同期・競合解決の完全サポート
5. **パフォーマンス**: キャッシュ・ページネーション最適化

実装フェーズでは、このカタログに基づいてTypeSpec定義・OpenAPI仕様書・実装コードを順次開発する。

## 関連ドキュメント

- [API設計概要](README.md) - 全体アーキテクチャ・方針
- [API設計原則](design-principles.md) - 設計ガイドライン・命名規約
- [イベント駆動API統合](event-integration.md) - イベント連携の詳細設計

---
**作成工程**: API設計
**作成日**: 2025-08-01
**更新日**: 2025-08-01
