# Quiz Domain - Learning Context API

## 責務

- Deck生成・管理
- 学習セッション管理
- 回答処理・正誤判定
- 履歴・統計管理

## エンドポイント一覧

### 2.1 Deck管理

```http
POST   /api/quiz/v1/learning/decks
GET    /api/quiz/v1/learning/decks/:id
GET    /api/quiz/v1/learning/decks/mine
DELETE /api/quiz/v1/learning/decks/:id

# 動詞API (複雑ビジネスロジック)
POST   /api/quiz/v1/learning/decks/from-search
POST   /api/quiz/v1/learning/decks/wrong-questions
```

#### POST /api/quiz/v1/learning/decks

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

#### POST /api/quiz/v1/learning/decks/from-search

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

#### POST /api/quiz/v1/learning/decks/wrong-questions

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

### 2.2 学習セッション管理

```http
POST   /api/quiz/v1/learning/sessions
GET    /api/quiz/v1/learning/sessions/:id
PUT    /api/quiz/v1/learning/sessions/:id

# 動詞API (セッション制御)
POST   /api/quiz/v1/learning/sessions/:id/complete
POST   /api/quiz/v1/learning/sessions/:id/pause
POST   /api/quiz/v1/learning/sessions/:id/resume
```

#### POST /api/quiz/v1/learning/sessions

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

#### GET /api/quiz/v1/learning/sessions/:id

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

### 2.3 回答処理

```http
POST   /api/quiz/v1/learning/sessions/:id/answers
GET    /api/quiz/v1/learning/answers/:id
PUT    /api/quiz/v1/learning/answers/:id/offline-sync
```

#### POST /api/quiz/v1/learning/sessions/:id/answers

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

### 2.4 履歴・統計管理

```http
GET    /api/quiz/v1/learning/history
GET    /api/quiz/v1/learning/history/:sessionId
GET    /api/quiz/v1/learning/statistics/personal
GET    /api/quiz/v1/learning/statistics/quiz/:quizId
GET    /api/quiz/v1/learning/wrong-questions
POST   /api/quiz/v1/learning/retry-session
```

#### GET /api/quiz/v1/learning/history

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

#### GET /api/quiz/v1/learning/statistics/personal

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

## 関連ドキュメント

- [API設計概要](../README.md)
- [Quiz Management API](01-quiz-management.md)
- [Search & Discovery API](05-search-discovery.md)
- [共通仕様](07-common-specs.md)

---
**ドメイン**: Quiz Learning Context  
**作成工程**: API設計  
**TypeSpec対応**: `api/spec/operations/quiz-learning.tsp`
