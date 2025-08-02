# イベント駆動API統合設計

## 目的

Your QuizアプリケーションのAPI設計において、ドメインイベントカタログと連携したイベント駆動アーキテクチャの実装方針を定義し、疎結合で拡張性の高いAPI統合を実現する。

## なぜイベント駆動が必要か

### 本プロジェクト固有の課題

#### 1. 匿名ユーザーの複雑な状態管理

- **デバイス間連携**: 同一ユーザーが複数デバイスで学習・投稿
- **一時的アイデンティティ**: JWTトークンによる軽量認証とデータ整合性
- **作成者権限の柔軟な管理**: デバイス変更時の権限引き継ぎ

#### 2. オフライン→オンライン同期の複雑性

- **競合解決**: 同一データの複数デバイス更新
- **バッチ同期**: 大量データの効率的な同期処理
- **状態不整合の解決**: オフライン中の状態変化への対応

#### 3. リアルタイム機能の要求

- **学習進捗のリアルタイム表示**: セッション中の即座フィードバック
- **承認通知**: クイズ投稿→承認→通知の非同期フロー
- **推奨システムの動的更新**: 学習履歴に基づく即座推奨更新

#### 4. 4つの境界づけられたコンテキスト間の疎結合統合

- **Quiz Management**: クイズ作成・承認管理
- **Quiz Learning**: 学習セッション・Deck管理
- **User Session**: 匿名認証・権限管理
- **Offline Sync**: 同期・競合解決

### 従来のAPI統合では困難な要件

```typescript
// 例: クイズ承認時の連鎖処理（イベント駆動なしでは結合度が高い）
async approveQuiz(quizId: string) {
  // 1. Quiz Management Context
  await this.quizService.approve(quizId);
  
  // 2. Quiz Learning Context（直接依存）
  await this.learningService.addAvailableQuiz(quizId);
  
  // 3. User Session Context（直接依存）
  await this.notificationService.notifyCreator(quizId);
  
  // 4. Offline Sync Context（直接依存）
  await this.syncService.invalidateCache(quizId);
  
  // 5. 推奨システム（直接依存）
  await this.recommendationService.updateRecommendations(quizId);
}
```

### イベント駆動による解決

```typescript
// イベント駆動: 疎結合な処理
async approveQuiz(quizId: string) {
  // 1. 承認処理のみ実行
  const approvedQuiz = await this.quizService.approve(quizId);
  
  // 2. イベント発行（他コンテキストとの結合なし）
  await this.eventBus.publish(new QuizApprovedEvent(quizId, approvedQuiz));
}

// 各コンテキストが独立してイベント処理
@EventHandler(QuizApprovedEvent)
class LearningContextHandler {
  async handle(event: QuizApprovedEvent) {
    await this.learningService.addAvailableQuiz(event.quizId);
  }
}
```

## 参照ドキュメント

- [ドメインイベントカタログ](../ddd-design/2.10_domain-events-catalog/domain-events-catalog.md) - イベント定義・分類
- [境界づけられたコンテキスト](../ddd-design/2.09_bounded-context-definition/README.md) - コンテキスト境界
- [API機能カタログ](api-catalog.md) - API エンドポイント仕様
- [API設計ガイドライン](../../guidelines/api-design-principles.md) - 設計原則・命名規約

## イベント駆動統合の基本設計

### 1. アーキテクチャ概要

```mermaid
graph TB
    subgraph "API Layer"
        A[REST Endpoints] --> B[GraphQL Gateway]
        B --> C[WebSocket Handlers]
    end
    
    subgraph "Application Layer"
        D[Command Handlers] --> E[Query Handlers]
        E --> F[Event Handlers]
    end
    
    subgraph "Event Infrastructure"
        G[Event Store] --> H[Event Bus]
        H --> I[Event Projections]
        I --> J[WebSocket Broadcasting]
    end
    
    subgraph "Domain Layer"
        K[Aggregates] --> L[Domain Events]
        L --> M[Event Sourcing]
    end
    
    % Connections
    A --> D
    B --> E
    C --> F
    D --> K
    F --> H
    H --> G
    H --> J
    M --> G
```

### 2. イベント統合パターン

#### Command-Event-Query分離

```typescript
// Command: 状態変更操作
interface Command {
  readonly type: string;
  readonly payload: any;
  readonly metadata: {
    requestId: string;
    userId: string;
    timestamp: Date;
  };
}

// Event: ドメイン状態変化の記録
interface DomainEvent {
  readonly eventId: string;
  readonly eventType: string;
  readonly aggregateId: string;
  readonly aggregateVersion: number;
  readonly occurredAt: Date;
  readonly payload: any;
}

// Query: 読み取り専用操作
interface Query {
  readonly type: string;
  readonly parameters: any;
  readonly projection?: string;
}
```

## ドメインイベント別API統合設計

### 1. クイズ管理イベント統合

#### QuizSubmitted → API応答・通知

```typescript
// 1. REST API: クイズ投稿
@Post('/api/quiz/v1/manage/quizzes')
async createQuiz(@Body() request: CreateQuizRequest): Promise<CreateQuizResponse> {
  // Command実行
  const command = new CreateQuizCommand(request);
  const result = await this.commandBus.execute(command);
  
  // 同期応答（コマンド結果）
  return {
    success: true,
    data: {
      quiz: {
        id: result.quizId,
        status: 'pending_approval',
        createdAt: result.createdAt
      }
    }
  };
}

// 2. Event Handler: QuizSubmitted処理
@EventHandler(QuizSubmittedEvent)
export class QuizSubmittedHandler {
  async handle(event: QuizSubmittedEvent): Promise<void> {
    // 非同期処理群
    await Promise.all([
      // 承認要求作成
      this.approvalService.createApprovalRequest(event.quizId),
      
      // WebSocket通知
      this.websocketGateway.notifyCreator(event.creatorId, {
        type: 'quiz_submitted',
        quizId: event.quizId,
        message: 'クイズが投稿されました。承認をお待ちください。'
      }),
      
      // 統計更新（投稿数カウント）
      this.statisticsService.incrementQuizSubmissions(event.creatorId),
      
      // メール通知（オプション）
      this.notificationService.sendSubmissionConfirmation(event.creatorId)
    ]);
  }
}

// 3. WebSocket通知
@WebSocketGateway({
  cors: { origin: '*' }
})
export class QuizNotificationGateway {
  @SubscribeMessage('subscribe_creator_notifications')
  async subscribeCreatorNotifications(
    @MessageBody() data: { creatorId: string },
    @ConnectedSocket() client: Socket
  ): Promise<void> {
    await client.join(`creator_${data.creatorId}`);
  }

  async notifyCreator(creatorId: string, notification: any): Promise<void> {
    this.server.to(`creator_${creatorId}`).emit('notification', notification);
  }
}
```

#### QuizApproved → プロジェクション更新・リアルタイム通知

```typescript
// Event Handler: QuizApproved処理
@EventHandler(QuizApprovedEvent)
export class QuizApprovedHandler {
  async handle(event: QuizApprovedEvent): Promise<void> {
    // 1. 公開クイズプロジェクション更新
    await this.publishedQuizProjection.addPublishedQuiz({
      id: event.quizId,
      approvedAt: event.approvedAt,
      approvedBy: event.approvedBy
    });

    // 2. 検索インデックス更新
    await this.searchIndexService.indexQuiz(event.quizId);

    // 3. リアルタイム通知
    await Promise.all([
      // 作成者通知
      this.websocketGateway.notifyCreator(event.creatorId, {
        type: 'quiz_approved',
        quizId: event.quizId,
        message: 'クイズが承認されました！'
      }),
      
      // 全体ブロードキャスト（新着クイズ）
      this.websocketGateway.broadcastNewQuiz({
        id: event.quizId,
        preview: event.questionPreview,
        tags: event.tags
      })
    ]);

    // 4. 推奨システム更新
    await this.recommendationService.updateRecommendations(event.tags);
  }
}

// GraphQL Subscription: リアルタイム新着クイズ
@Resolver()
export class QuizSubscriptionResolver {
  @Subscription(() => NewQuizNotification)
  newQuizzesAvailable(): AsyncIterator<NewQuizNotification> {
    return this.pubSub.asyncIterator('NEW_QUIZ_AVAILABLE');
  }

  @Subscription(() => QuizApprovalNotification, {
    filter: (payload, variables) => {
      return payload.creatorId === variables.creatorId;
    }
  })
  quizApprovalUpdates(
    @Args('creatorId') creatorId: string
  ): AsyncIterator<QuizApprovalNotification> {
    return this.pubSub.asyncIterator('QUIZ_APPROVAL_UPDATE');
  }
}
```

### 2. 学習セッションイベント統合

#### SessionStarted → セッション追跡・分析

```typescript
// REST API: セッション開始
@Post('/api/user/v1/sessions')
async startSession(@Body() request: StartSessionRequest): Promise<StartSessionResponse> {
  const command = new StartLearningSessionCommand(request);
  const result = await this.commandBus.execute(command);
  
  return {
    success: true,
    data: {
      session: {
        id: result.sessionId,
        deckId: result.deckId,
        currentQuizIndex: 0,
        totalQuizzes: result.totalQuizzes,
        state: 'active',
        startedAt: result.startedAt
      },
      currentQuiz: result.firstQuiz
    }
  };
}

// Event Handler: SessionStarted処理
@EventHandler(SessionStartedEvent)
export class SessionStartedHandler {
  async handle(event: SessionStartedEvent): Promise<void> {
    await Promise.all([
      // アクティブセッション管理
      this.activeSessionService.trackSession({
        sessionId: event.sessionId,
        userId: event.userId,
        deckId: event.deckId,
        startedAt: event.startedAt
      }),
      
      // リアルタイム進捗追跡開始
      this.progressTrackingService.initializeTracking(event.sessionId),
      
      // 学習分析データ収集開始
      this.analyticsService.trackSessionStart({
        sessionId: event.sessionId,
        deckInfo: event.deckInfo,
        userProfile: event.userProfile
      })
    ]);
  }
}

// WebSocket: セッション進捗リアルタイム更新
@WebSocketGateway()
export class SessionProgressGateway {
  @SubscribeMessage('subscribe_session_progress')
  async subscribeProgress(
    @MessageBody() data: { sessionId: string },
    @ConnectedSocket() client: Socket
  ): Promise<void> {
    await client.join(`session_${data.sessionId}`);
    
    // 現在の進捗状態を送信
    const currentProgress = await this.progressService.getCurrentProgress(data.sessionId);
    client.emit('progress_update', currentProgress);
  }

  async broadcastProgressUpdate(sessionId: string, progress: SessionProgress): Promise<void> {
    this.server.to(`session_${sessionId}`).emit('progress_update', progress);
  }
}
```

#### AnswerSubmitted → 即座判定・統計更新

```typescript
// REST API: 回答提出
@Post('/api/quiz/v1/learning/answers')
async submitAnswer(@Body() request: SubmitAnswerRequest): Promise<SubmitAnswerResponse> {
  const command = new SubmitAnswerCommand(request);
  const result = await this.commandBus.execute(command);
  
  // 同期応答（即座判定結果）
  return {
    success: true,
    data: {
      answer: {
        id: result.answerId,
        isCorrect: result.isCorrect,
        correctAnswer: result.correctAnswer,
        explanation: result.explanation
      },
      session: {
        currentQuizIndex: result.nextQuizIndex,
        progress: result.sessionProgress
      },
      nextQuiz: result.nextQuiz,
      sessionComplete: result.isSessionComplete
    }
  };
}

// Event Handler: AnswerSubmitted処理
@EventHandler(AnswerSubmittedEvent)
export class AnswerSubmittedHandler {
  async handle(event: AnswerSubmittedEvent): Promise<void> {
    await Promise.all([
      // リアルタイム進捗更新
      this.progressGateway.broadcastProgressUpdate(event.sessionId, {
        currentQuizIndex: event.currentQuizIndex,
        answeredCount: event.answeredCount,
        correctCount: event.correctCount,
        correctRate: event.correctRate
      }),
      
      // 統計データ蓄積
      this.statisticsService.recordAnswer({
        quizId: event.quizId,
        userId: event.userId,
        isCorrect: event.isCorrect,
        responseTime: event.responseTimeMs,
        answerMethod: event.answerMethod
      }),
      
      // 学習分析（間違いパターン分析）
      this.learningAnalyticsService.analyzeAnswerPattern({
        userId: event.userId,
        quizId: event.quizId,
        isCorrect: event.isCorrect,
        tags: event.quizTags,
        difficulty: event.quizDifficulty
      })
    ]);
  }
}

// Event Handler: AnswerJudged処理（正誤判定完了後）
@EventHandler(AnswerJudgedEvent)
export class AnswerJudgedHandler {
  async handle(event: AnswerJudgedEvent): Promise<void> {
    // 間違えた場合の処理
    if (!event.isCorrect) {
      await Promise.all([
        // 間違い問題リストに追加
        this.wrongQuestionService.addWrongQuestion({
          userId: event.userId,
          quizId: event.quizId,
          sessionId: event.sessionId,
          answeredAt: event.judgedAt
        }),
        
        // 習熟度分析更新
        this.proficiencyService.updateProficiency({
          userId: event.userId,
          tags: event.quizTags,
          performance: 'incorrect'
        })
      ]);
    } else {
      // 正解した場合の習熟度向上
      await this.proficiencyService.updateProficiency({
        userId: event.userId,
        tags: event.quizTags,
        performance: 'correct'
      });
    }
  }
}
```

#### SessionCompleted → 結果集計・推奨生成

```typescript
// Event Handler: SessionCompleted処理
@EventHandler(SessionCompletedEvent)
export class SessionCompletedHandler {
  async handle(event: SessionCompletedEvent): Promise<void> {
    const [sessionResults, wrongQuestions] = await Promise.all([
      // セッション結果詳細計算
      this.sessionResultsService.calculateDetailedResults(event.sessionId),
      
      // 間違い問題抽出
      this.wrongQuestionService.getWrongQuestions(event.sessionId)
    ]);

    await Promise.all([
      // 完了通知
      this.progressGateway.broadcastSessionCompletion(event.sessionId, {
        totalQuestions: event.totalQuestions,
        correctAnswers: event.correctAnswers,
        correctRate: event.correctRate,
        totalTimeMs: event.totalTimeMs,
        achievements: sessionResults.achievements
      }),
      
      // 間違い問題集自動生成
      wrongQuestions.length > 0 ? 
        this.deckService.createWrongQuestionsDeck({
          userId: event.userId,
          sourceSessionId: event.sessionId,
          wrongQuestions: wrongQuestions
        }) : null,
      
      // 個人化推奨更新
      this.recommendationService.updatePersonalizedRecommendations({
        userId: event.userId,
        completedTags: event.deckTags,
        performance: sessionResults.tagPerformance,
        weakAreas: sessionResults.weakAreas
      }),
      
      // 実績・バッジ判定
      this.achievementService.checkAchievements({
        userId: event.userId,
        sessionResults: sessionResults
      }),
      
      // 学習履歴更新
      this.learningHistoryService.recordCompletedSession({
        sessionId: event.sessionId,
        userId: event.userId,
        results: sessionResults
      })
    ]);
  }
}

// GraphQL: セッション完了情報の即座取得
@Resolver()
export class SessionResultResolver {
  @Query(() => SessionDetailedResults)
  async sessionResults(
    @Args('sessionId') sessionId: string
  ): Promise<SessionDetailedResults> {
    const [basicResults, recommendations, achievements] = await Promise.all([
      this.sessionResultsService.getBasicResults(sessionId),
      this.recommendationService.getPostSessionRecommendations(sessionId),
      this.achievementService.getNewAchievements(sessionId)
    ]);

    return {
      ...basicResults,
      nextRecommendations: recommendations,
      newAchievements: achievements
    };
  }
}
```

### 3. オフライン同期イベント統合

#### DataCached → キャッシュ管理・最適化

```typescript
// Event Handler: DataCached処理
@EventHandler(DataCachedEvent)
export class DataCachedHandler {
  async handle(event: DataCachedEvent): Promise<void> {
    await Promise.all([
      // キャッシュ統計更新
      this.cacheStatisticsService.updateCacheMetrics({
        userId: event.userId,
        resourceType: event.resourceType,
        cachedSize: event.dataSize,
        cachedAt: event.cachedAt
      }),
      
      // キャッシュ最適化提案
      this.cacheOptimizationService.analyzeCacheUsage(event.userId),
      
      // オフライン利用可能通知
      this.websocketGateway.notifyOfflineDataReady(event.userId, {
        resourceType: event.resourceType,
        count: event.resourceCount,
        estimatedUsageTime: event.estimatedUsageTime
      })
    ]);
  }
}

// REST API: オフライン対応状況取得
@Get('/api/sync/v1/cache-status')
async getCacheStatus(@Req() req: AuthenticatedRequest): Promise<CacheStatusResponse> {
  const status = await this.offlineSyncService.getCacheStatus(req.user.id);
  
  return {
    success: true,
    data: {
      totalCachedSize: status.totalSize,
      availableForOffline: status.offlineResources,
      lastSync: status.lastSyncAt,
      recommendations: await this.cacheOptimizationService.getRecommendations(req.user.id)
    }
  };
}
```

#### SynchronizationCompleted → データ整合性確保

```typescript
// Event Handler: SynchronizationCompleted処理
@EventHandler(SynchronizationCompletedEvent)
export class SynchronizationCompletedHandler {
  async handle(event: SynchronizationCompletedEvent): Promise<void> {
    const syncResults = await this.syncResultsService.analyzeSyncResults(event);

    await Promise.all([
      // 同期完了通知
      this.websocketGateway.notifySyncCompletion(event.userId, {
        syncedItems: event.syncedAnswers + event.syncedDrafts,
        conflicts: event.conflictCount,
        errors: event.errorCount,
        completedAt: event.completedAt
      }),
      
      // 統計プロジェクション更新（同期されたデータを反映）
      this.statisticsProjectionService.updateWithSyncedData({
        userId: event.userId,
        syncedAnswers: event.syncedAnswers,
        syncedSessions: event.syncedSessions
      }),
      
      // 推奨システム更新（新しい回答履歴を反映）
      this.recommendationService.incorporateSyncedData({
        userId: event.userId,
        newAnswerHistory: syncResults.newAnswerHistory
      }),
      
      // 競合があった場合のフォローアップ
      event.conflictCount > 0 ?
        this.conflictResolutionService.scheduleConflictNotification(event.userId) :
        null
    ]);
  }
}

// WebSocket: 同期進捗リアルタイム通知
@WebSocketGateway()
export class SyncProgressGateway {
  @SubscribeMessage('subscribe_sync_progress')
  async subscribeSyncProgress(
    @MessageBody() data: { userId: string },
    @ConnectedSocket() client: Socket
  ): Promise<void> {
    await client.join(`sync_${data.userId}`);
  }

  async broadcastSyncProgress(userId: string, progress: SyncProgress): Promise<void> {
    this.server.to(`sync_${userId}`).emit('sync_progress', progress);
  }
}
```

## 4. 横断的関心事のイベント統合

### 統計・分析イベント処理

```typescript
// Event Handler: 複数イベント統合分析
@EventHandler([
  QuizSubmittedEvent,
  AnswerSubmittedEvent,
  SessionCompletedEvent,
  QuizApprovedEvent
])
export class AnalyticsEventHandler {
  async handle(event: DomainEvent): Promise<void> {
    switch (event.eventType) {
      case 'QuizSubmitted':
        await this.handleQuizSubmission(event as QuizSubmittedEvent);
        break;
      case 'AnswerSubmitted':
        await this.handleAnswerSubmission(event as AnswerSubmittedEvent);
        break;
      case 'SessionCompleted':
        await this.handleSessionCompletion(event as SessionCompletedEvent);
        break;
      case 'QuizApproved':
        await this.handleQuizApproval(event as QuizApprovedEvent);
        break;
    }
  }

  private async handleQuizSubmission(event: QuizSubmittedEvent): Promise<void> {
    await Promise.all([
      // 投稿活動分析
      this.analyticsService.trackCreatorActivity({
        creatorId: event.creatorId,
        activityType: 'quiz_submission',
        tags: event.tags,
        timestamp: event.occurredAt
      }),
      
      // タグ使用頻度更新
      this.tagAnalyticsService.updateTagUsage(event.tags),
      
      // 投稿時間帯分析
      this.timeAnalyticsService.trackSubmissionTime(event.occurredAt)
    ]);
  }

  private async handleAnswerSubmission(event: AnswerSubmittedEvent): Promise<void> {
    await Promise.all([
      // ユーザー学習パターン分析
      this.learningPatternService.analyzeAnswerPattern({
        userId: event.userId,
        responseTime: event.responseTimeMs,
        isCorrect: event.isCorrect,
        answerMethod: event.answerMethod,
        timeOfDay: event.occurredAt.getHours()
      }),
      
      // クイズ難易度分析更新
      this.quizDifficultyService.updateDifficultyMetrics({
        quizId: event.quizId,
        userResponse: {
          isCorrect: event.isCorrect,
          responseTime: event.responseTimeMs
        }
      }),
      
      // リアルタイム統計更新
      this.realtimeStatsService.incrementAnswerCount(event.quizId)
    ]);
  }
}
```

### 推奨システムイベント統合

```typescript
// Event Handler: 推奨システム用データ収集
@EventHandler([
  AnswerJudgedEvent,
  SessionCompletedEvent,
  QuizApprovedEvent,
  TagPopularityCalculatedEvent
])
export class RecommendationEventHandler {
  async handle(event: DomainEvent): Promise<void> {
    switch (event.eventType) {
      case 'AnswerJudged':
        await this.updateUserProfile(event as AnswerJudgedEvent);
        break;
      case 'SessionCompleted':
        await this.updateLearningPreferences(event as SessionCompletedEvent);
        break;
      case 'QuizApproved':
        await this.updateContentCatalog(event as QuizApprovedEvent);
        break;
      case 'TagPopularityCalculated':
        await this.updateTrendingContent(event as TagPopularityCalculatedEvent);
        break;
    }
  }

  private async updateUserProfile(event: AnswerJudgedEvent): Promise<void> {
    const userProfile = await this.userProfileService.getUserProfile(event.userId);
    
    // 習熟度更新
    const updatedProficiency = this.proficiencyCalculator.calculateNewProficiency({
      currentProficiency: userProfile.tagProficiency[event.quizTag],
      answerResult: event.isCorrect,
      responseTime: event.responseTimeMs,
      difficulty: event.quizDifficulty
    });

    await this.userProfileService.updateTagProficiency(
      event.userId,
      event.quizTag,
      updatedProficiency
    );

    // 推奨スコア再計算をスケジュール
    await this.recommendationScheduler.scheduleRecalculation(event.userId);
  }

  private async updateLearningPreferences(event: SessionCompletedEvent): Promise<void> {
    const sessionAnalysis = await this.sessionAnalysisService.analyzeSession(event.sessionId);
    
    await Promise.all([
      // 学習時間帯パターン更新
      this.learningPatternService.updateTimePreferences({
        userId: event.userId,
        sessionStartTime: event.startedAt,
        sessionDuration: event.totalTimeMs
      }),
      
      // 難易度プリファレンス更新
      this.difficultyPreferenceService.updatePreferences({
        userId: event.userId,
        performance: sessionAnalysis.difficultyPerformance
      }),
      
      // カテゴリ関心度更新
      this.categoryInterestService.updateInterests({
        userId: event.userId,
        tagEngagement: sessionAnalysis.tagEngagement
      })
    ]);
  }
}
```

## 5. GraphQL統合とリアルタイム機能

### Subscription統合設計

```typescript
// GraphQL Subscription統合ハブ
@Resolver()
export class IntegratedSubscriptionResolver {
  constructor(
    private eventBus: EventBus,
    private pubSub: PubSubEngine
  ) {
    // ドメインイベントをGraphQL Subscriptionに変換
    this.setupEventSubscriptions();
  }

  private setupEventSubscriptions(): void {
    // クイズ承認通知
    this.eventBus.subscribe(QuizApprovedEvent, async (event) => {
      await this.pubSub.publish('QUIZ_APPROVED', {
        quizApprovalUpdate: {
          quizId: event.quizId,
          creatorId: event.creatorId,
          approvedAt: event.approvedAt,
          status: 'approved'
        }
      });
    });

    // セッション進捗更新
    this.eventBus.subscribe(AnswerSubmittedEvent, async (event) => {
      await this.pubSub.publish(`SESSION_PROGRESS_${event.sessionId}`, {
        sessionProgressUpdate: {
          sessionId: event.sessionId,
          currentQuizIndex: event.currentQuizIndex,
          correctCount: event.correctCount,
          totalAnswered: event.totalAnswered
        }
      });
    });

    // 新着推奨通知
    this.eventBus.subscribe(RecommendationUpdatedEvent, async (event) => {
      await this.pubSub.publish(`NEW_RECOMMENDATIONS_${event.userId}`, {
        newRecommendations: event.recommendations
      });
    });
  }

  @Subscription(() => QuizApprovalUpdate, {
    filter: (payload, variables) => {
      return payload.quizApprovalUpdate.creatorId === variables.creatorId;
    }
  })
  quizApprovalUpdates(
    @Args('creatorId') creatorId: string
  ): AsyncIterator<QuizApprovalUpdate> {
    return this.pubSub.asyncIterator('QUIZ_APPROVED');
  }

  @Subscription(() => SessionProgressUpdate)
  sessionProgress(
    @Args('sessionId') sessionId: string
  ): AsyncIterator<SessionProgressUpdate> {
    return this.pubSub.asyncIterator(`SESSION_PROGRESS_${sessionId}`);
  }

  @Subscription(() => [Recommendation])
  newRecommendations(
    @Args('userId') userId: string
  ): AsyncIterator<Recommendation[]> {
    return this.pubSub.asyncIterator(`NEW_RECOMMENDATIONS_${userId}`);
  }

  @Subscription(() => SyncStatusUpdate)
  syncStatusUpdates(
    @Args('userId') userId: string
  ): AsyncIterator<SyncStatusUpdate> {
    return this.pubSub.asyncIterator(`SYNC_STATUS_${userId}`);
  }
}
```

### 統合クエリ設計

```typescript
// 複合データを統合取得するGraphQLクエリ
@Resolver()
export class IntegratedQueryResolver {
  @Query(() => UserDashboard)
  async userDashboard(
    @Args('userId') userId: string
  ): Promise<UserDashboard> {
    // 複数のプロジェクションから並行データ取得
    const [
      learningStats,
      recentSessions,
      createdQuizzes,
      recommendations,
      syncStatus,
      achievements
    ] = await Promise.all([
      this.learningStatsProjection.getStats(userId),
      this.sessionHistoryProjection.getRecentSessions(userId, 5),
      this.quizManagementProjection.getCreatedQuizzes(userId),
      this.recommendationProjection.getPersonalizedRecommendations(userId),
      this.offlineSyncProjection.getSyncStatus(userId),
      this.achievementProjection.getRecentAchievements(userId)
    ]);

    return {
      userId,
      learningStats,
      recentSessions,
      createdQuizzes,
      recommendations,
      syncStatus,
      achievements,
      generatedAt: new Date()
    };
  }

  @Query(() => QuizWithContext)
  async quizWithLearningContext(
    @Args('quizId') quizId: string,
    @Args('userId', { nullable: true }) userId?: string
  ): Promise<QuizWithContext> {
    const [baseQuiz, personalStats, similarQuizzes] = await Promise.all([
      this.quizProjection.getPublishedQuiz(quizId),
      userId ? this.learningStatsProjection.getQuizStats(userId, quizId) : null,
      this.recommendationProjection.getSimilarQuizzes(quizId, 5)
    ]);

    if (!baseQuiz) {
      throw new NotFoundException('Quiz not found');
    }

    return {
      ...baseQuiz,
      personalStats,
      similarQuizzes,
      contextGeneratedAt: new Date()
    };
  }
}
```

## 6. パフォーマンス最適化

### イベント処理最適化

```typescript
// 非同期処理・バッチ処理最適化
@Injectable()
export class OptimizedEventProcessor {
  private eventQueue: Map<string, DomainEvent[]> = new Map();
  private processingInterval: NodeJS.Timeout;

  constructor(
    private eventHandlers: Map<string, EventHandler[]>,
    private metricsService: MetricsService
  ) {
    // バッチ処理間隔設定（100ms）
    this.processingInterval = setInterval(() => {
      this.processBatchedEvents();
    }, 100);
  }

  async processEvent(event: DomainEvent): Promise<void> {
    const startTime = performance.now();

    // 高優先度イベントは即座処理
    if (this.isHighPriorityEvent(event)) {
      await this.processImmediately(event);
    } else {
      // 低優先度イベントはバッチ処理キューに追加
      this.addToBatch(event);
    }

    // パフォーマンス計測
    const processingTime = performance.now() - startTime;
    await this.metricsService.recordEventProcessingTime(event.eventType, processingTime);
  }

  private isHighPriorityEvent(event: DomainEvent): boolean {
    const highPriorityEvents = [
      'AnswerSubmittedEvent',      // リアルタイム応答必要
      'SessionStartedEvent',       // セッション開始は即座
      'SyncConflictDetectedEvent'  // 競合は即座処理
    ];
    return highPriorityEvents.includes(event.eventType);
  }

  private async processBatchedEvents(): Promise<void> {
    if (this.eventQueue.size === 0) return;

    const batchPromises: Promise<void>[] = [];

    for (const [eventType, events] of this.eventQueue.entries()) {
      // 同種イベントをまとめて処理
      batchPromises.push(this.processSameTypeEvents(eventType, events));
    }

    await Promise.all(batchPromises);
    this.eventQueue.clear();
  }

  private async processSameTypeEvents(eventType: string, events: DomainEvent[]): Promise<void> {
    const handlers = this.eventHandlers.get(eventType) || [];
    
    for (const handler of handlers) {
      // バッチ処理対応ハンドラーの場合
      if (handler instanceof BatchEventHandler) {
        await handler.handleBatch(events);
      } else {
        // 通常ハンドラーの場合は並行処理
        await Promise.all(events.map(event => handler.handle(event)));
      }
    }
  }
}

// バッチ処理対応ハンドラー例
export class StatisticsUpdateBatchHandler extends BatchEventHandler<AnswerSubmittedEvent> {
  async handleBatch(events: AnswerSubmittedEvent[]): Promise<void> {
    // 統計更新をバッチで実行（データベース負荷軽減）
    const updateOperations = events.map(event => ({
      quizId: event.quizId,
      isCorrect: event.isCorrect,
      responseTime: event.responseTimeMs
    }));

    await this.statisticsRepository.batchUpdateQuizStats(updateOperations);
  }
}
```

### プロジェクション最適化

```typescript
// 読み取り最適化されたプロジェクション
@Injectable()
export class OptimizedLearningStatsProjection {
  constructor(
    private redis: RedisService,
    private database: DatabaseService,
    private eventStore: EventStore
  ) {}

  // イベントからプロジェクション更新
  @EventHandler([AnswerSubmittedEvent, SessionCompletedEvent])
  async updateProjection(event: DomainEvent): Promise<void> {
    switch (event.eventType) {
      case 'AnswerSubmittedEvent':
        await this.updateAnswerStats(event as AnswerSubmittedEvent);
        break;
      case 'SessionCompletedEvent':
        await this.updateSessionStats(event as SessionCompletedEvent);
        break;
    }
  }

  private async updateAnswerStats(event: AnswerSubmittedEvent): Promise<void> {
    const cacheKey = `user_stats:${event.userId}`;
    
    // Redis上のリアルタイム統計更新
    await this.redis.pipeline()
      .hincrby(cacheKey, 'total_answers', 1)
      .hincrby(cacheKey, 'correct_answers', event.isCorrect ? 1 : 0)
      .hset(cacheKey, 'last_activity', event.occurredAt.toISOString())
      .expire(cacheKey, 3600) // 1時間TTL
      .exec();

    // 非同期でデータベース更新
    this.scheduleAsyncDatabaseUpdate(event.userId, {
      totalAnswers: 1,
      correctAnswers: event.isCorrect ? 1 : 0,
      lastActivity: event.occurredAt
    });
  }

  // キャッシュファーストでの読み取り
  async getUserStats(userId: string): Promise<LearningStats> {
    const cacheKey = `user_stats:${userId}`;
    
    // 1. Redis キャッシュから取得試行
    const cachedStats = await this.redis.hgetall(cacheKey);
    if (Object.keys(cachedStats).length > 0) {
      return this.parseCachedStats(cachedStats);
    }

    // 2. データベースから取得
    const dbStats = await this.database.getUserLearningStats(userId);
    
    // 3. キャッシュに保存
    if (dbStats) {
      await this.redis.hset(cacheKey, this.serializeStats(dbStats));
      await this.redis.expire(cacheKey, 3600);
    }

    return dbStats;
  }

  // Event Sourcing からの完全再構築
  async rebuildProjectionFromEvents(userId: string): Promise<void> {
    const events = await this.eventStore.getEventsForUser(userId);
    const stats = new LearningStatsBuilder();

    for (const event of events) {
      stats.applyEvent(event);
    }

    const finalStats = stats.build();
    
    // データベースとキャッシュを更新
    await Promise.all([
      this.database.updateUserLearningStats(userId, finalStats),
      this.redis.hset(`user_stats:${userId}`, this.serializeStats(finalStats))
    ]);
  }
}
```

## 7. 監視・運用

### イベント処理監視

```typescript
// イベント処理メトリクス
@Injectable()
export class EventProcessingMetrics {
  constructor(
    private metricsService: MetricsService,
    private alertService: AlertService
  ) {}

  @EventHandler('*') // 全イベント監視
  async monitorEventProcessing(event: DomainEvent): Promise<void> {
    const startTime = performance.now();
    
    try {
      // 処理時間測定用のラッパー
      await this.measureEventProcessing(event);
    } catch (error) {
      // エラー監視
      await this.recordEventProcessingError(event, error);
      throw error;
    } finally {
      const processingTime = performance.now() - startTime;
      await this.recordEventProcessingTime(event, processingTime);
    }
  }

  private async recordEventProcessingTime(event: DomainEvent, time: number): Promise<void> {
    await this.metricsService.recordHistogram('event_processing_duration_ms', time, {
      event_type: event.eventType,
      aggregate_type: event.aggregateType
    });

    // 処理時間異常検知
    if (time > 1000) { // 1秒超過
      await this.alertService.sendAlert({
        type: 'slow_event_processing',
        eventType: event.eventType,
        processingTime: time,
        eventId: event.eventId
      });
    }
  }

  private async recordEventProcessingError(event: DomainEvent, error: Error): Promise<void> {
    await this.metricsService.incrementCounter('event_processing_errors', {
      event_type: event.eventType,
      error_type: error.constructor.name
    });

    await this.alertService.sendAlert({
      type: 'event_processing_error',
      eventType: event.eventType,
      error: error.message,
      eventId: event.eventId,
      stackTrace: error.stack
    });
  }
}

// ヘルスチェックエンドポイント
@Controller('/health')
export class EventHealthController {
  constructor(
    private eventBus: EventBus,
    private eventStore: EventStore,
    private projectionService: ProjectionService
  ) {}

  @Get('/events')
  async getEventHealthStatus(): Promise<EventHealthStatus> {
    const [
      eventBusStatus,
      eventStoreStatus,
      projectionStatus,
      processingBacklog
    ] = await Promise.all([
      this.checkEventBusHealth(),
      this.checkEventStoreHealth(),
      this.checkProjectionHealth(),
      this.getProcessingBacklog()
    ]);

    return {
      overall: this.calculateOverallHealth([
        eventBusStatus,
        eventStoreStatus,
        projectionStatus
      ]),
      eventBus: eventBusStatus,
      eventStore: eventStoreStatus,
      projections: projectionStatus,
      processingBacklog,
      timestamp: new Date()
    };
  }

  private async checkEventBusHealth(): Promise<ComponentHealth> {
    try {
      const testEvent = new HealthCheckEvent();
      await this.eventBus.publish(testEvent);
      return { status: 'healthy', latency: 0 };
    } catch (error) {
      return { status: 'unhealthy', error: error.message };
    }
  }

  private async getProcessingBacklog(): Promise<ProcessingBacklog> {
    const queueSizes = await this.eventBus.getQueueSizes();
    const totalBacklog = Object.values(queueSizes).reduce((sum, size) => sum + size, 0);

    return {
      totalEvents: totalBacklog,
      queues: queueSizes,
      estimatedProcessingTime: totalBacklog * 10 // 10ms per event estimate
    };
  }
}
```

## まとめ

このイベント駆動API統合設計により、以下の品質特性が実現される：

### アーキテクチャ品質

1. **疎結合**: ドメインイベントによる境界づけられたコンテキスト間の連携
2. **拡張性**: 新機能追加時のイベントハンドラー追加による対応
3. **リアルタイム性**: WebSocket・GraphQL Subscriptionによる即座更新
4. **一貫性**: Event Sourcing・CQRSによるデータ整合性保証
5. **監査性**: 全ビジネス変更のイベントログ保存

### パフォーマンス特性

- **非同期処理**: 重い処理をイベントハンドラーで分離
- **バッチ最適化**: 同種イベントのまとめ処理
- **キャッシュ活用**: プロジェクションベースの高速読み取り
- **負荷分散**: イベント処理の並行実行

### 運用性

- **監視充実**: イベント処理メトリクス・アラート
- **障害対応**: イベントリプレイによる復旧機能
- **スケーラビリティ**: イベントバス・ストレージの水平拡張対応

実装フェーズでは、この設計に基づいてNestJS・GraphQL・Redis・WebSocketを活用した具体的な統合コードを開発する。

## 関連ドキュメント

- [API設計概要](README.md) - 全体アーキテクチャ・方針
- [API機能カタログ](api-catalog.md) - 詳細なエンドポイント仕様
- [API設計原則](design-principles.md) - 設計ガイドライン・命名規約
- [ドメインイベントカタログ](../ddd-design/2.10_domain-events-catalog/domain-events-catalog.md) - イベント定義

---
**作成工程**: API設計  
**作成日**: 2025-08-01  
**更新日**: 2025-08-01
