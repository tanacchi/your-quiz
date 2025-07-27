# Quiz Learning Context（クイズ学習コンテキスト）

## コンテキスト概要

### 責務
クイズの学習体験提供、回答処理、学習履歴管理を担う顧客接点の中核コンテキスト。

### ビジネス価値
- 直感的で楽しい学習体験の提供
- 個人の学習履歴の蓄積・活用
- 効果的な復習機能の実現

## ドメインモデル

### 集約: Learning Session Aggregate

#### LearningSession（集約ルート）
```typescript
interface LearningSession {
  readonly id: SessionId;
  readonly userId: UserId; // UserSessionContextからの参照
  readonly startedAt: Timestamp;
  lastAccessAt: Timestamp;
  answers: Answer[];
  currentQuizId?: QuizId;
  sessionState: LearningSessionState;
  preferences: LearningPreferences;
}
```

#### LearningSession の主要な振る舞い
```typescript
class LearningSessionAggregate {
  // セッション開始
  static startSession(
    userId: UserId,
    preferences?: LearningPreferences
  ): Result<LearningSession, DomainError> {
    const session = new LearningSession({
      id: SessionId.generate(),
      userId,
      startedAt: Timestamp.now(),
      lastAccessAt: Timestamp.now(),
      answers: [],
      sessionState: LearningSessionState.Active,
      preferences: preferences || LearningPreferences.default()
    });
    
    return ok(session);
  }
  
  // クイズ回答
  answerQuiz(
    quizId: QuizId,
    userAnswer: UserAnswer,
    correctAnswer: CorrectAnswer
  ): Result<AnswerId, DomainError> {
    if (this.sessionState !== LearningSessionState.Active) {
      return err(new BusinessRuleError('アクティブなセッションでのみ回答可能'));
    }
    
    const answer = Answer.create({
      id: AnswerId.generate(),
      quizId,
      sessionId: this.id,
      userAnswer,
      correctAnswer,
      answeredAt: Timestamp.now(),
      responseTime: this.calculateResponseTime()
    });
    
    if (answer.isErr()) {
      return err(answer.error);
    }
    
    this.answers.push(answer.value);
    this.lastAccessAt = Timestamp.now();
    this.currentQuizId = undefined; // 回答完了
    
    // ドメインイベント発行
    this.addDomainEvent(new QuizAnsweredEvent(
      this.id,
      answer.value.id,
      answer.value.isCorrect()
    ));
    
    return ok(answer.value.id);
  }
  
  // 次のクイズ開始
  startNextQuiz(quizId: QuizId): Result<void, DomainError> {
    if (this.currentQuizId) {
      return err(new BusinessRuleError('現在のクイズに回答してから次に進んでください'));
    }
    
    this.currentQuizId = quizId;
    this.lastAccessAt = Timestamp.now();
    
    return ok(undefined);
  }
  
  // セッション終了
  endSession(): Result<LearningSessionSummary, DomainError> {
    if (this.sessionState !== LearningSessionState.Active) {
      return err(new BusinessRuleError('アクティブなセッションのみ終了可能'));
    }
    
    this.sessionState = LearningSessionState.Completed;
    
    const summary = LearningSessionSummary.create({
      sessionId: this.id,
      totalAnswers: this.answers.length,
      correctAnswers: this.answers.filter(a => a.isCorrect()).length,
      duration: this.calculateDuration(),
      averageResponseTime: this.calculateAverageResponseTime()
    });
    
    this.addDomainEvent(new LearningSessionCompletedEvent(this.id, summary));
    
    return ok(summary);
  }
  
  // 学習進捗取得
  getProgress(): LearningProgress {
    return LearningProgress.create({
      totalAnswered: this.answers.length,
      correctRate: this.calculateCorrectRate(),
      weakTags: this.identifyWeakTags(),
      strongTags: this.identifyStrongTags(),
      lastActivity: this.lastAccessAt
    });
  }
  
  private calculateResponseTime(): Duration {
    // 前回アクセスからの経過時間を計算
    return Duration.between(this.lastAccessAt, Timestamp.now());
  }
  
  private calculateCorrectRate(): number {
    if (this.answers.length === 0) return 0;
    const correct = this.answers.filter(a => a.isCorrect()).length;
    return correct / this.answers.length;
  }
  
  private identifyWeakTags(): Tag[] {
    // 正答率の低いタグを特定
    const tagStats = this.calculateTagStatistics();
    return tagStats
      .filter(stat => stat.correctRate < 0.7)
      .map(stat => stat.tag);
  }
  
  private identifyStrongTags(): Tag[] {
    // 正答率の高いタグを特定
    const tagStats = this.calculateTagStatistics();
    return tagStats
      .filter(stat => stat.correctRate >= 0.9)
      .map(stat => stat.tag);
  }
}
```

### エンティティ: Answer

#### Answer（回答）
```typescript
class Answer {
  private constructor(
    readonly id: AnswerId,
    readonly quizId: QuizId,
    readonly sessionId: SessionId,
    readonly userAnswer: UserAnswer,
    readonly correctAnswer: CorrectAnswer,
    readonly answeredAt: Timestamp,
    readonly responseTime: Duration,
    readonly quizMetadata?: QuizMetadata // 学習時点でのクイズ情報
  ) {}
  
  static create(params: CreateAnswerParams): Result<Answer, ValidationError> {
    // バリデーション
    if (!params.userAnswer || !params.correctAnswer) {
      return err(new ValidationError('回答データが不正です'));
    }
    
    return ok(new Answer(
      params.id,
      params.quizId,
      params.sessionId,
      params.userAnswer,
      params.correctAnswer,
      params.answeredAt,
      params.responseTime,
      params.quizMetadata
    ));
  }
  
  isCorrect(): boolean {
    return this.userAnswer.equals(this.correctAnswer);
  }
  
  getResult(): AnswerResult {
    return AnswerResult.create({
      isCorrect: this.isCorrect(),
      userAnswer: this.userAnswer,
      correctAnswer: this.correctAnswer,
      responseTime: this.responseTime
    });
  }
  
  // 復習が必要かの判定
  needsReview(): boolean {
    return !this.isCorrect() || this.responseTime.isLongerThan(Duration.ofSeconds(30));
  }
}
```

### 値オブジェクト

#### UserAnswer（ユーザー回答）
```typescript
class UserAnswer {
  private constructor(readonly value: boolean) {}
  
  static fromBoolean(value: boolean): UserAnswer {
    return new UserAnswer(value);
  }
  
  static fromSwipeDirection(direction: SwipeDirection): UserAnswer {
    return new UserAnswer(direction === SwipeDirection.Right);
  }
  
  equals(other: CorrectAnswer | UserAnswer): boolean {
    return this.value === other.value;
  }
  
  toString(): string {
    return this.value ? '◯' : '×';
  }
}
```

#### LearningPreferences（学習設定）
```typescript
class LearningPreferences {
  private constructor(
    readonly preferredTags: Tag[],
    readonly difficultyLevel: DifficultyLevel,
    readonly sessionLength: SessionLength,
    readonly reviewMode: ReviewMode,
    readonly soundEnabled: boolean,
    readonly animationEnabled: boolean
  ) {}
  
  static default(): LearningPreferences {
    return new LearningPreferences(
      [], // すべてのタグ
      DifficultyLevel.Mixed,
      SessionLength.Medium,
      ReviewMode.Immediate,
      true,
      true
    );
  }
  
  static create(params: LearningPreferencesParams): Result<LearningPreferences, ValidationError> {
    // バリデーション
    if (params.preferredTags && params.preferredTags.length > 10) {
      return err(new ValidationError('選択可能なタグは10個までです'));
    }
    
    return ok(new LearningPreferences(
      params.preferredTags || [],
      params.difficultyLevel || DifficultyLevel.Mixed,
      params.sessionLength || SessionLength.Medium,
      params.reviewMode || ReviewMode.Immediate,
      params.soundEnabled ?? true,
      params.animationEnabled ?? true
    ));
  }
}
```

#### LearningProgress（学習進捗）
```typescript
class LearningProgress {
  private constructor(
    readonly totalAnswered: number,
    readonly correctRate: number,
    readonly weakTags: Tag[],
    readonly strongTags: Tag[],
    readonly lastActivity: Timestamp,
    readonly streakCount: number,
    readonly level: LearningLevel
  ) {}
  
  static create(params: LearningProgressParams): LearningProgress {
    const level = LearningLevel.fromCorrectRate(params.correctRate, params.totalAnswered);
    const streak = this.calculateStreak(params.recentAnswers || []);
    
    return new LearningProgress(
      params.totalAnswered,
      params.correctRate,
      params.weakTags,
      params.strongTags,
      params.lastActivity,
      streak,
      level
    );
  }
  
  private static calculateStreak(recentAnswers: Answer[]): number {
    let streak = 0;
    for (let i = recentAnswers.length - 1; i >= 0; i--) {
      if (recentAnswers[i].isCorrect()) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  }
  
  needsEncouragement(): boolean {
    return this.correctRate < 0.5 && this.totalAnswered >= 5;
  }
  
  hasAchievement(): boolean {
    return this.streakCount >= 10 || this.level.hasLevelUp();
  }
}
```

## ドメインサービス

### QuizRecommendationService
```typescript
class QuizRecommendationService {
  constructor(
    private quizRepository: QuizRepository,
    private answerHistoryRepository: AnswerHistoryRepository
  ) {}
  
  async recommendQuizzes(
    sessionId: SessionId,
    preferences: LearningPreferences,
    count: number = 10
  ): Promise<Result<RecommendedQuiz[], DomainError>> {
    const session = await this.learningSessionRepository.findById(sessionId);
    if (!session) {
      return err(new DomainError('セッションが見つかりません'));
    }
    
    const progress = session.getProgress();
    
    // 推薦アルゴリズム
    const candidates = await this.getQuizCandidates(preferences, progress);
    const scored = this.scoreQuizzes(candidates, progress);
    const recommended = this.selectTopQuizzes(scored, count);
    
    return ok(recommended);
  }
  
  private async getQuizCandidates(
    preferences: LearningPreferences,
    progress: LearningProgress
  ): Promise<Quiz[]> {
    // 1. 設定されたタグのクイズ
    const tagQuizzes = await this.quizRepository.findByTags(preferences.preferredTags);
    
    // 2. 苦手タグの復習クイズ
    const weakTagQuizzes = await this.quizRepository.findByTags(progress.weakTags);
    
    // 3. 未回答クイズ
    const answeredQuizIds = progress.getAnsweredQuizIds();
    const unansweredQuizzes = await this.quizRepository.findUnanswered(answeredQuizIds);
    
    return [...tagQuizzes, ...weakTagQuizzes, ...unansweredQuizzes];
  }
  
  private scoreQuizzes(candidates: Quiz[], progress: LearningProgress): ScoredQuiz[] {
    return candidates.map(quiz => {
      let score = 1.0;
      
      // 苦手タグボーナス
      if (quiz.tags.some(tag => progress.weakTags.includes(tag))) {
        score += 0.5;
      }
      
      // 未回答ボーナス
      if (!progress.hasAnswered(quiz.id)) {
        score += 0.3;
      }
      
      // 古い回答の復習ボーナス
      const lastAnswered = progress.getLastAnsweredDate(quiz.id);
      if (lastAnswered && this.needsReview(lastAnswered)) {
        score += 0.4;
      }
      
      return new ScoredQuiz(quiz, score);
    });
  }
  
  private selectTopQuizzes(scored: ScoredQuiz[], count: number): RecommendedQuiz[] {
    // スコア順にソート & ランダム要素追加
    const sorted = scored.sort((a, b) => b.score - a.score);
    const top = sorted.slice(0, count * 2); // 多めに候補を取得
    
    // 上位候補からランダム選択で多様性を確保
    const selected = this.randomSelect(top, count);
    
    return selected.map(scored => 
      RecommendedQuiz.create(scored.quiz, scored.score, this.getRecommendationReason(scored))
    );
  }
}
```

### AnswerValidationService
```typescript
class AnswerValidationService {
  async validateAnswer(
    sessionId: SessionId,
    quizId: QuizId,
    userAnswer: UserAnswer
  ): Promise<Result<ValidationResult, DomainError>> {
    // セッション検証
    const sessionValid = await this.validateSession(sessionId);
    if (sessionValid.isErr()) {
      return err(sessionValid.error);
    }
    
    // クイズ有効性検証
    const quizValid = await this.validateQuiz(quizId);
    if (quizValid.isErr()) {
      return err(quizValid.error);
    }
    
    // 重複回答チェック（同一セッション内での制限）
    const duplicateCheck = await this.checkDuplicateAnswer(sessionId, quizId);
    if (duplicateCheck.isDuplicate && !duplicateCheck.isAllowed) {
      return err(new BusinessRuleError('このクイズには既に回答済みです'));
    }
    
    return ok(ValidationResult.Valid());
  }
  
  private async validateSession(sessionId: SessionId): Promise<Result<void, DomainError>> {
    const session = await this.learningSessionRepository.findById(sessionId);
    if (!session) {
      return err(new DomainError('セッションが見つかりません'));
    }
    
    if (session.sessionState !== LearningSessionState.Active) {
      return err(new BusinessRuleError('アクティブなセッションでのみ回答可能です'));
    }
    
    return ok(undefined);
  }
  
  private async validateQuiz(quizId: QuizId): Promise<Result<void, DomainError>> {
    const quiz = await this.quizRepository.findById(quizId);
    if (!quiz) {
      return err(new DomainError('クイズが見つかりません'));
    }
    
    if (!quiz.isPublishable()) {
      return err(new BusinessRuleError('このクイズは現在利用できません'));
    }
    
    return ok(undefined);
  }
}
```

## アプリケーションサービス

### LearningApplicationService
```typescript
class LearningApplicationService {
  constructor(
    private learningSessionRepository: LearningSessionRepository,
    private quizRepository: QuizRepository,
    private recommendationService: QuizRecommendationService,
    private validationService: AnswerValidationService,
    private eventPublisher: DomainEventPublisher
  ) {}
  
  async startLearningSession(
    command: StartLearningSessionCommand
  ): Promise<Result<SessionId, ApplicationError>> {
    const preferences = command.preferences ? 
      LearningPreferences.create(command.preferences) : 
      LearningPreferences.default();
      
    if (preferences.isErr()) {
      return err(new ApplicationError(preferences.error.message));
    }
    
    const session = LearningSessionAggregate.startSession(
      command.userId,
      preferences.value
    );
    
    if (session.isErr()) {
      return err(new ApplicationError(session.error.message));
    }
    
    await this.learningSessionRepository.save(session.value);
    
    return ok(session.value.id);
  }
  
  async answerQuiz(
    command: AnswerQuizCommand
  ): Promise<Result<AnswerResult, ApplicationError>> {
    // バリデーション
    const validation = await this.validationService.validateAnswer(
      command.sessionId,
      command.quizId,
      command.userAnswer
    );
    
    if (validation.isErr()) {
      return err(new ApplicationError(validation.error.message));
    }
    
    // セッション取得
    const session = await this.learningSessionRepository.findById(command.sessionId);
    if (!session) {
      return err(new ApplicationError('セッションが見つかりません'));
    }
    
    // クイズ情報取得
    const quiz = await this.quizRepository.findById(command.quizId);
    if (!quiz) {
      return err(new ApplicationError('クイズが見つかりません'));
    }
    
    // 回答処理
    const answerResult = session.answerQuiz(
      command.quizId,
      command.userAnswer,
      quiz.correctAnswer
    );
    
    if (answerResult.isErr()) {
      return err(new ApplicationError(answerResult.error.message));
    }
    
    // 永続化
    await this.learningSessionRepository.save(session);
    
    // ドメインイベント発行
    await this.eventPublisher.publishAll(session.getDomainEvents());
    
    // 結果返却
    const answer = session.getAnswerById(answerResult.value);
    return ok(answer.getResult());
  }
  
  async getRecommendedQuizzes(
    command: GetRecommendedQuizzesCommand
  ): Promise<Result<RecommendedQuiz[], ApplicationError>> {
    const session = await this.learningSessionRepository.findById(command.sessionId);
    if (!session) {
      return err(new ApplicationError('セッションが見つかりません'));
    }
    
    const recommended = await this.recommendationService.recommendQuizzes(
      command.sessionId,
      session.preferences,
      command.count
    );
    
    if (recommended.isErr()) {
      return err(new ApplicationError(recommended.error.message));
    }
    
    return ok(recommended.value);
  }
  
  async getLearningProgress(
    sessionId: SessionId
  ): Promise<Result<LearningProgress, ApplicationError>> {
    const session = await this.learningSessionRepository.findById(sessionId);
    if (!session) {
      return err(new ApplicationError('セッションが見つかりません'));
    }
    
    const progress = session.getProgress();
    return ok(progress);
  }
}
```

## リポジトリインターフェース

### LearningSessionRepository
```typescript
interface LearningSessionRepository {
  findById(id: SessionId): Promise<LearningSession | null>;
  findByUserId(userId: UserId): Promise<LearningSession[]>;
  findActiveSessionByUserId(userId: UserId): Promise<LearningSession | null>;
  save(session: LearningSession): Promise<void>;
  delete(id: SessionId): Promise<void>;
}
```

### AnswerHistoryRepository
```typescript
interface AnswerHistoryRepository {
  findBySessionId(sessionId: SessionId): Promise<Answer[]>;
  findByQuizId(quizId: QuizId): Promise<Answer[]>;
  findByUserId(userId: UserId, options?: AnswerQueryOptions): Promise<Answer[]>;
  findRecentAnswers(userId: UserId, limit: number): Promise<Answer[]>;
  save(answer: Answer): Promise<void>;
  
  // 統計・分析用
  getAnswerStatistics(userId: UserId): Promise<AnswerStatistics>;
  getTagStatistics(userId: UserId): Promise<TagStatistics[]>;
}

interface AnswerQueryOptions {
  fromDate?: Date;
  toDate?: Date;
  tags?: string[];
  correctOnly?: boolean;
  limit?: number;
  offset?: number;
}
```

## ドメインイベント

### QuizAnsweredEvent
```typescript
interface QuizAnsweredEvent extends DomainEvent {
  readonly eventType: 'QuizAnswered';
  readonly sessionId: SessionId;
  readonly answerId: AnswerId;
  readonly quizId: QuizId;
  readonly isCorrect: boolean;
  readonly responseTime: Duration;
}
```

### LearningSessionCompletedEvent
```typescript
interface LearningSessionCompletedEvent extends DomainEvent {
  readonly eventType: 'LearningSessionCompleted';
  readonly sessionId: SessionId;
  readonly summary: LearningSessionSummary;
  readonly achievements: Achievement[];
}
```

## 他コンテキストとの統合

### Quiz Management Context からの情報取得
```typescript
// Published Language Interface（Quiz Management Context提供）
interface PublishedQuizService {
  getApprovedQuizzes(filter?: QuizFilter): Promise<PublishedQuizInfo[]>;
  getQuizById(id: QuizId): Promise<PublishedQuizInfo | null>;
  subscribeToQuizUpdates(callback: (event: QuizUpdateEvent) => void): void;
}

// Learning Context での利用
class QuizLearningServiceAdapter {
  constructor(private publishedQuizService: PublishedQuizService) {}
  
  async getAvailableQuizzes(preferences: LearningPreferences): Promise<Quiz[]> {
    const filter = this.createFilterFromPreferences(preferences);
    const published = await this.publishedQuizService.getApprovedQuizzes(filter);
    return published.map(p => this.convertToLearningQuiz(p));
  }
}
```

### User Session Context との連携
```typescript
// User Session Context からの情報取得
interface UserSessionService {
  getCurrentSession(deviceId: string): Promise<UserSession>;
  validateSessionAccess(sessionId: SessionId): Promise<boolean>;
}

// Learning Context での利用
class UserSessionAdapter {
  constructor(private userSessionService: UserSessionService) {}
  
  async validateLearningAccess(sessionId: SessionId): Promise<Result<UserId, Error>> {
    const isValid = await this.userSessionService.validateSessionAccess(sessionId);
    if (!isValid) {
      return err(new Error('無効なセッションです'));
    }
    
    const userSession = await this.userSessionService.getCurrentSession(sessionId);
    return ok(userSession.userId);
  }
}
```