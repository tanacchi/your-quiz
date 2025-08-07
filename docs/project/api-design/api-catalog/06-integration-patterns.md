# Cross-Context Integration Patterns

## 責務

- コンテキスト間のAPI連携パターン
- データ変換・Anti-Corruption Layer
- GraphQL統合エンドポイント
- リアルタイム更新機能

## エンドポイント一覧

### 6.1 API間連携パターン

#### Published Language統合

```typescript
// Quiz Management → Quiz Learning
const getPublishedQuizzes = async (criteria: QuizCriteria): Promise<PublishedQuiz[]> => {
  return await fetch('/api/quiz/v1/manage/published', {
    method: 'POST',
    body: JSON.stringify(criteria)
  });
};

// Quiz Learning側での利用
const createDeckFromPublished = async (searchCriteria: SearchCriteria): Promise<Deck> => {
  const publishedQuizzes = await getPublishedQuizzes(searchCriteria);
  return await fetch('/api/quiz/v1/learning/decks', {
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
    return await fetch('/api/quiz/v1/learning/batch-answers', {
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

    return await fetch('/api/quiz/v1/manage/batch-drafts', {
      method: 'POST',
      body: JSON.stringify({ drafts: managementDrafts })
    });
  }
}
```

### 6.2 検索API統合パターン

#### 汎用検索 → 学習特化検索の連携

```typescript
// 学習特化検索は内部的に汎用検索を呼び出し、学習コンテキスト特有のフィルタリングを追加
class LearningSearchService {
  async searchForLearning(criteria: LearningSearchCriteria, userId: string): Promise<LearningSearchResponse> {
    // 1. 汎用検索APIを呼び出し
    const baseResults = await fetch('/api/search/v1/quizzes', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      params: {
        q: criteria.keywords,
        tags: criteria.tags,
        difficulty: criteria.difficulty,
        status: 'published', // 学習では公開済みのみ
        limit: criteria.limit,
        offset: criteria.offset
      }
    });

    // 2. 学習コンテキスト特有のフィルタリング
    const filteredResults = baseResults.results.filter(quiz => {
      // 回答済み除外
      if (criteria.excludeAnswered && userAnsweredQuizzes.includes(quiz.id)) {
        return false;
      }
      // 除外タグフィルタ
      if (criteria.excludeTags && quiz.tags.some(tag => criteria.excludeTags.includes(tag))) {
        return false;
      }
      return true;
    });

    // 3. 学習特化の情報を付加
    const enrichedResults = await this.enrichWithLearningContext(filteredResults, userId);

    return {
      results: enrichedResults,
      pagination: baseResults.pagination,
      learningMeta: {
        personalizedRanking: criteria.userPreference,
        excludedAnswered: criteria.excludeAnswered ? answeredCount : 0,
        recommendationContext: await this.getRecommendationContext(userId)
      }
    };
  }

  private async enrichWithLearningContext(quizzes: Quiz[], userId: string) {
    return Promise.all(quizzes.map(async quiz => ({
      ...quiz,
      personalStats: await this.getUserQuizStats(userId, quiz.id),
      isAnswered: await this.isQuizAnswered(userId, quiz.id),
      recommendationScore: await this.calculateRecommendationScore(quiz, userId)
    })));
  }
}
```

### 6.3 GraphQL統合API

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

### 6.3 統合ワークフローAPI

```http
POST   /api/workflows/v1/quick-start
POST   /api/workflows/v1/answer-and-continue
POST   /api/workflows/v1/create-and-share
GET    /api/workflows/v1/dashboard-data
```

#### POST /api/workflows/v1/quick-start

**目的**: 検索からセッション開始までの統合フロー

**対応UI**: ホーム → クイックスタート

**リクエスト**:

```typescript
interface QuickStartRequest {
  searchQuery?: {
    keywords?: string;
    tags?: string[];
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
  };
  deckOptions: {
    maxQuizzes: number;
    shuffleOrder: boolean;
  };
  sessionSettings: {
    showExplanation: boolean;
    timeLimit?: number;
  };
  userFingerprint: string;
}
```

**レスポンス**:

```typescript
interface QuickStartResponse {
  session: {
    id: string;
    deckId: string;
    totalQuizzes: number;
    startedAt: string;
  };
  firstQuiz: {
    id: string;
    question: string;
    hasImage: boolean;
  };
  searchMeta?: {
    originalQuery: string;
    resultsFound: number;
  };
}
```

#### POST /api/workflows/v1/answer-and-continue

**目的**: 回答提出と次問題取得の統合処理

**対応UI**: 回答画面 → スワイプ操作

**リクエスト**:

```typescript
interface AnswerAndContinueRequest {
  sessionId: string;
  quizId: string;
  userAnswer: boolean;
  responseTimeMs: number;
  answerMethod: 'swipe_right' | 'swipe_left' | 'tap_correct' | 'tap_incorrect';
  confidence?: number;
}
```

**レスポンス**:

```typescript
interface AnswerAndContinueResponse {
  answerResult: {
    isCorrect: boolean;
    explanation: string;
    correctAnswer: boolean;
  };
  sessionProgress: {
    currentIndex: number;
    totalQuizzes: number;
    correctCount: number;
    correctRate: number;
  };
  nextQuiz?: {
    id: string;
    question: string;
    hasImage: boolean;
  };
  sessionComplete: boolean;
  finalResults?: {
    totalQuestions: number;
    correctAnswers: number;
    correctRate: number;
    totalTimeSeconds: number;
  };
}
```

## 関連ドキュメント

- [API設計概要](../README.md)
- [Quiz Management API](01-quiz-management.md)
- [Quiz Learning API](02-quiz-learning.md)
- [Search & Discovery API](05-search-discovery.md)
- [共通仕様](07-common-specs.md)

---
**ドメイン**: Cross-Context Integration  
**作成工程**: API設計  
**TypeSpec対応**: `api/spec/operations/workflows.tsp`
