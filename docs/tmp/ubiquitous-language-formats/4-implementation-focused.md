# 案4: 実装特化型

## フォーマット概要

TypeScript実装を最優先とした形式。型定義・インターフェース・コンポーネント名・API名との対応を重視し、実装時の参照性とコードの一貫性を確保。

## 構成

```markdown
# ユビキタス言語辞書（実装特化）

## 型定義対応表
### Domain Types
### Component Types
### API Types
### State Types

## 実装命名規則
### ファイル名規則
### 関数名規則
### 変数名規則
### CSS クラス名規則

## BDD実装対応
### Gherkin Expression
### Step Definition
### Test Data Factory

各項目形式：
- **日本語**: [日本語用語]
- **英語**: [English term]
- **TypeScript型**: [TypeName]
- **ファイル名**: [file-name.ts]
- **コンポーネント名**: [ComponentName]
- **API名**: [apiEndpoint]
- **BDD表現**: [Gherkin expression]
```

## サンプル実装

```markdown
# ユビキタス言語辞書（実装特化）

## 型定義対応表

### Domain Types

#### クイズ
- **日本語**: クイズ
- **英語**: Quiz
- **TypeScript型**: 
  ```typescript
  interface Quiz {
    id: string;
    question: string;
    correctAnswer: boolean;
    explanation?: string;
    tags: string[];
    status: QuizStatus;
    creatorId: string;
    createdAt: Date;
    approvedAt?: Date;
  }
  
  type QuizStatus = 'pendingApproval' | 'approved' | 'rejected';
  ```
- **ファイル名**: `quiz.types.ts`
- **コンポーネント名**: `QuizCard`, `QuizForm`, `QuizDetail`
- **API名**: `/api/quizzes`, `/api/quizzes/:id`
- **BDD表現**: `Given クイズが承認済みである`

#### 作成者
- **日本語**: 作成者
- **英語**: Creator
- **TypeScript型**:
  ```typescript
  interface Creator {
    id: string;
    saltHash: string;
    isAnonymous: true;
    createdAt: Date;
    deviceFingerprint?: string;
  }
  
  interface CreatorIdentification {
    creatorId: string;
    saltHash: string;
    expiresAt: Date;
  }
  ```
- **ファイル名**: `creator.types.ts`
- **コンポーネント名**: `CreatorProfile`, `CreatorQuizList`
- **API名**: `/api/creators/:id`
- **BDD表現**: `Given 作成者が存在する`

#### 回答
- **日本語**: 回答
- **英語**: Answer
- **TypeScript型**:
  ```typescript
  interface Answer {
    id: string;
    quizId: string;
    userId?: string;
    userAnswer: boolean;
    isCorrect: boolean;
    answeredAt: Date;
    timeSpent: number;
  }
  
  interface AnswerHistory {
    userId?: string;
    answers: Answer[];
    totalAnswered: number;
    correctCount: number;
    accuracy: number;
  }
  ```
- **ファイル名**: `answer.types.ts`
- **コンポーネント名**: `AnswerButton`, `AnswerHistory`, `AnswerStats`
- **API名**: `/api/answers`, `/api/answers/history`
- **BDD表現**: `When ユーザーがクイズに回答する`

### Component Types

#### スワイプ操作
- **日本語**: スワイプ操作
- **英語**: Swipe Gesture
- **TypeScript型**:
  ```typescript
  interface SwipeGesture {
    direction: 'left' | 'right';
    startX: number;
    endX: number;
    deltaX: number;
    velocity: number;
    timestamp: number;
  }
  
  interface SwipeHandler {
    onSwipeLeft: () => void;
    onSwipeRight: () => void;
    threshold?: number;
    velocityThreshold?: number;
  }
  ```
- **ファイル名**: `swipe.types.ts`
- **コンポーネント名**: `SwipeableCard`, `SwipeDetector`
- **Hook名**: `useSwipeGesture`, `useSwipeHandler`
- **BDD表現**: `When ユーザーが右スワイプする`

#### バン表示
- **日本語**: バン表示
- **英語**: Banner Display
- **TypeScript型**:
  ```typescript
  interface BannerProps {
    type: 'correct' | 'incorrect';
    message: string;
    duration?: number;
    onComplete?: () => void;
  }
  
  interface BannerAnimation {
    show: boolean;
    fadeOut: boolean;
    duration: number;
  }
  ```
- **ファイル名**: `banner.types.ts`
- **コンポーネント名**: `JudgmentBanner`, `AnimatedBanner`
- **CSS クラス**: `.judgment-banner`, `.fade-out-animation`
- **BDD表現**: `Then 正誤判定がバン表示される`

### API Types

#### クイズAPI
- **日本語**: クイズAPI
- **英語**: Quiz API
- **TypeScript型**:
  ```typescript
  interface QuizAPI {
    getQuizzes: (params?: QuizQueryParams) => Promise<Quiz[]>;
    getQuiz: (id: string) => Promise<Quiz>;
    createQuiz: (data: CreateQuizRequest) => Promise<Quiz>;
    updateQuiz: (id: string, data: UpdateQuizRequest) => Promise<Quiz>;
    deleteQuiz: (id: string) => Promise<void>;
  }
  
  interface QuizQueryParams {
    tags?: string[];
    status?: QuizStatus;
    creatorId?: string;
    limit?: number;
    offset?: number;
  }
  
  interface CreateQuizRequest {
    question: string;
    correctAnswer: boolean;
    explanation?: string;
    tags: string[];
  }
  ```
- **ファイル名**: `quiz-api.types.ts`
- **API名**: 
  - `GET /api/quizzes`
  - `POST /api/quizzes`
  - `PUT /api/quizzes/:id`
  - `DELETE /api/quizzes/:id`
- **Hook名**: `useQuizAPI`, `useQuizQuery`, `useCreateQuiz`

#### 承認API
- **日本語**: 承認API
- **英語**: Approval API
- **TypeScript型**:
  ```typescript
  interface ApprovalAPI {
    getPendingQuizzes: () => Promise<Quiz[]>;
    approveQuiz: (id: string, reason?: string) => Promise<void>;
    rejectQuiz: (id: string, reason: string) => Promise<void>;
    getApprovalHistory: (quizId: string) => Promise<ApprovalHistory[]>;
  }
  
  interface ApprovalHistory {
    id: string;
    quizId: string;
    action: 'approved' | 'rejected';
    reason?: string;
    approvedBy: string;
    approvedAt: Date;
  }
  ```
- **ファイル名**: `approval-api.types.ts`
- **API名**: 
  - `GET /api/admin/pending-quizzes`
  - `POST /api/admin/quizzes/:id/approve`
  - `POST /api/admin/quizzes/:id/reject`
- **Hook名**: `useApprovalAPI`, `usePendingQuizzes`

### State Types

#### アプリケーション状態
- **日本語**: アプリケーション状態
- **英語**: Application State
- **TypeScript型**:
  ```typescript
  interface AppState {
    user: {
      isAnonymous: boolean;
      creatorId?: string;
      preferences: UserPreferences;
    };
    quiz: {
      current?: Quiz;
      history: AnswerHistory;
      filteredTags: string[];
    };
    ui: {
      isLoading: boolean;
      isOffline: boolean;
      activeModal?: string;
      banner?: BannerState;
    };
  }
  
  interface BannerState {
    type: 'correct' | 'incorrect';
    message: string;
    visible: boolean;
    fadingOut: boolean;
  }
  ```
- **ファイル名**: `app-state.types.ts`
- **Store名**: `useAppStore`, `useQuizStore`, `useUIStore`
- **Action名**: `setCurrentQuiz`, `showBanner`, `hideBanner`

## 実装命名規則

### ファイル名規則
- **型定義**: `*.types.ts` (例: `quiz.types.ts`)
- **コンポーネント**: `ComponentName.tsx` (例: `QuizCard.tsx`)
- **API**: `*-api.ts` (例: `quiz-api.ts`)
- **Hook**: `use*.ts` (例: `useQuizAPI.ts`)
- **Utils**: `*.util.ts` (例: `validation.util.ts`)
- **Store**: `*-store.ts` (例: `quiz-store.ts`)

### 関数名規則
- **API関数**: `get*`, `create*`, `update*`, `delete*`
  - `getQuizzes`, `createQuiz`, `updateQuiz`, `deleteQuiz`
- **Hook**: `use*`
  - `useQuizAPI`, `useSwipeGesture`, `useBannerAnimation`
- **Event Handler**: `handle*`, `on*`
  - `handleSwipeRight`, `onQuizSubmit`, `onBannerComplete`
- **Validation**: `validate*`, `is*`
  - `validateQuiz`, `isValidQuestion`, `isAnonymousUser`

### 変数名規則
- **Boolean**: `is*`, `has*`, `can*`
  - `isLoading`, `hasAnswered`, `canSubmit`
- **Array**: 複数形
  - `quizzes`, `answers`, `tags`
- **Event**: `*Event`, `*Handler`
  - `swipeEvent`, `submitHandler`
- **Component Props**: `*Props`
  - `QuizCardProps`, `SwipeHandlerProps`

### CSS クラス名規則
- **BEM方式**: `block__element--modifier`
  - `.quiz-card`, `.quiz-card__title`, `.quiz-card--approved`
- **Component**: `component-name`
  - `.quiz-card`, `.answer-button`, `.judgment-banner`
- **State**: `--state-name`
  - `.quiz-card--loading`, `.banner--fade-out`
- **Utility**: `u-*`
  - `.u-hidden`, `.u-text-center`, `.u-margin-top`

## BDD実装対応

### Gherkin Expression Mapping
```typescript
// Given expressions
const givenExpressions = {
  'クイズが承認済みである': () => createApprovedQuiz(),
  '作成者が存在する': () => createAnonymousCreator(),
  'タグ {string} が設定されている': (tag: string) => createTaggedQuiz(tag),
  'アプリがオフラインモードである': () => setOfflineMode(true)
};

// When expressions  
const whenExpressions = {
  'ユーザーが右スワイプする': () => triggerSwipeRight(),
  'ユーザーが左スワイプする': () => triggerSwipeLeft(),
  'ユーザーがクイズを投稿する': () => submitQuiz(),
  'ユーザーがタグ {string} で絞り込む': (tag: string) => filterByTag(tag)
};

// Then expressions
const thenExpressions = {
  '正誤判定がバン表示される': () => expectBannerVisible(),
  'バンがフェードアウトする': () => expectBannerFadeOut(),
  '回答履歴に記録される': () => expectAnswerRecorded(),
  'クイズが承認済み状態になる': () => expectQuizApproved()
};
```

### Test Data Factory
```typescript
interface TestQuizFactory {
  createQuiz: (overrides?: Partial<Quiz>) => Quiz;
  createApprovedQuiz: (overrides?: Partial<Quiz>) => Quiz;
  createPendingQuiz: (overrides?: Partial<Quiz>) => Quiz;
  createCreator: (overrides?: Partial<Creator>) => Creator;
  createAnswer: (quizId: string, overrides?: Partial<Answer>) => Answer;
}

const testDataFactory: TestQuizFactory = {
  createQuiz: (overrides = {}) => ({
    id: generateId(),
    question: 'テスト問題文',
    correctAnswer: true,
    explanation: 'テスト解説',
    tags: ['テスト'],
    status: 'approved',
    creatorId: generateCreatorId(),
    createdAt: new Date(),
    ...overrides
  }),
  
  createApprovedQuiz: (overrides = {}) => 
    testDataFactory.createQuiz({ status: 'approved', ...overrides }),
    
  createPendingQuiz: (overrides = {}) =>
    testDataFactory.createQuiz({ status: 'pendingApproval', ...overrides }),
    
  // ... その他のファクトリー関数
};
```

### Page Object Pattern
```typescript
class QuizPageObject {
  constructor(private page: Page) {}
  
  // 日本語メソッド名（BDDステップと対応）
  async 右スワイプする() {
    await this.page.locator('[data-testid="quiz-card"]').swipeRight();
  }
  
  async 左スワイプする() {
    await this.page.locator('[data-testid="quiz-card"]').swipeLeft();
  }
  
  async 正誤判定が表示されるまで待つ() {
    await this.page.locator('[data-testid="judgment-banner"]').waitFor();
  }
  
  async バンがフェードアウトするまで待つ() {
    await this.page.locator('[data-testid="judgment-banner"]').waitFor({
      state: 'hidden'
    });
  }
}
```
```

## 利点・欠点

### 利点
- ✅ **実装直結**: TypeScript実装との完全対応
- ✅ **命名一貫性**: 全レイヤーでの命名規則統一
- ✅ **開発効率**: 実装時の参照・検索が容易
- ✅ **型安全性**: TypeScript型定義との完全同期

### 欠点
- ❌ **技術依存**: TypeScript以外での使用困難
- ❌ **非技術者理解**: ビジネス側の理解が困難
- ❌ **保守負荷**: 実装変更時の文書更新が必須

## 適用場面
- TypeScript中心の開発体制
- 開発チーム内での用語統一を重視
- 型安全性とコード品質を最優先
- 実装作業の効率化が重要