# 集約と集約ルート定義フォーマット案2：イベント駆動統合アプローチ

## フォーマットの概要

DDD 2024年のベストプラクティスに基づき、**ドメインイベントと2段階イベント発行パターン**を中心とした集約設計アプローチ。Event Sourcing、CQRS、Saga パターンとの統合を考慮し、集約間の疎結合とイベント駆動アーキテクチャとの親和性を重視する。

## 記載項目テンプレート

### 1. ドメインイベント中心の集約設計

#### イベントストーミングベース集約抽出

```markdown
## Domain Event Analysis for Aggregate Design

| Domain Event | Event Producer | Aggregate Candidate | Business Trigger | Data Payload | Downstream Impact |
|--------------|----------------|-------------------|------------------|--------------|------------------|
| [EventName] | [Producer entity] | [Aggregate name] | [What caused event] | [Event data] | [Who cares about this event] |

## Event-to-Aggregate Mapping

| Aggregate Name | Published Events | Subscribed Events | Event Publishing Pattern | Consistency Requirements |
|----------------|------------------|-------------------|-------------------------|-------------------------|
| [AggregateName] | [Event list] | [Subscribed events] | [Immediate/Deferred/Batch] | [Strong/Eventual] |

## Event Flow Analysis

| Business Process | Event Sequence | Aggregate Interactions | Saga Coordination Needed | Compensation Logic |
|------------------|----------------|----------------------|-------------------------|-------------------|
| [Process name] | [Event1 → Event2 → Event3] | [Aggregate interactions] | [Yes/No] | [Rollback strategy] |
```

#### イベント駆動境界決定

```markdown
## Event-Driven Boundary Decision

### Event Cohesion Analysis
| Event Group | Cohesion Level | Aggregate Boundary Indicator | Split Rationale | Merge Rationale |
|-------------|----------------|----------------------------|-----------------|-----------------|
| [Event group] | High/Medium/Low | Strong/Weak | [Why to split] | [Why to merge] |

### Event Publishing Consistency Requirements
| Event Type | Publishing Timing | Consistency Guarantee | Transaction Scope | Failure Handling |
|------------|------------------|----------------------|-------------------|------------------|
| [Event type] | [Immediate/Deferred/Async] | [Strong/Eventual] | [Local/Distributed] | [Retry/DLQ/Manual] |
```

### 2. 集約ルートとイベント発行設計

#### Two-Phase Event Publication Pattern

```markdown
## Two-Phase Event Publication Design

### Phase 1: Event Registration (Within Transaction)
| Aggregate Method | Business Operation | Events Registered | Registration Timing | Validation Required |
|------------------|-------------------|-------------------|--------------------|--------------------|
| [method name] | [Operation description] | [Event list] | [Before/After state change] | [Validation logic] |

### Phase 2: Event Publishing (After Transaction Success)
| Registered Event | Publishing Strategy | Delivery Guarantee | Error Handling | Monitoring |
|------------------|-------------------|-------------------|----------------|------------|
| [Event name] | [Immediate/Batch/Scheduled] | [At-least-once/Exactly-once] | [Retry/DLQ] | [Metrics tracked] |

## Event Registration Implementation Pattern

```typescript
// Event Registration Interface
interface AggregateRoot {
  getUncommittedEvents(): DomainEvent[];
  markEventsAsCommitted(): void;
  registerEvent(event: DomainEvent): void;
}

// Implementation Template
abstract class EventSourcedAggregateRoot implements AggregateRoot {
  private uncommittedEvents: DomainEvent[] = [];
  
  protected registerEvent(event: DomainEvent): void {
    this.uncommittedEvents.push(event);
  }
  
  getUncommittedEvents(): DomainEvent[] {
    return [...this.uncommittedEvents];
  }
  
  markEventsAsCommitted(): void {
    this.uncommittedEvents = [];
  }
}
```

#### 集約ルート責任とイベント管理

```markdown
## Aggregate Root Event Management Responsibilities

### Event Lifecycle Management
| Phase | Aggregate Responsibility | Infrastructure Responsibility | Error Handling | Performance Considerations |
|-------|-------------------------|------------------------------|----------------|---------------------------|
| Event Creation | Business validation, event construction | None | Business rule violations | In-memory operations |
| Event Registration | Add to uncommitted events | None | Memory constraints | Collection management |
| Event Persistence | Provide event data | Transactional storage | Storage failures | Batch operations |
| Event Publishing | None | Reliable delivery | Delivery failures | Async processing |

### Command-Event Mapping
| Command Method | Business Logic | Events Generated | Event Timing | Side Effects |
|----------------|----------------|------------------|--------------|--------------|
| [command method] | [Business operations] | [Event list] | [When events created] | [Additional effects] |
```

### 3. Event Sourcing統合設計

#### イベントソーシング対応集約設計

```markdown
## Event Sourcing Integration Design

### Event Stream Design
| Aggregate Type | Event Categories | Stream Naming | Snapshot Strategy | Replay Performance |
|----------------|------------------|---------------|-------------------|-------------------|
| [Aggregate name] | [Event categories] | [Stream naming convention] | [When to snapshot] | [Replay optimization] |

### Event Schema Evolution
| Event Type | Schema Version | Backward Compatibility | Upcasting Strategy | Migration Path |
|------------|----------------|----------------------|-------------------|----------------|
| [Event name] | [Version] | [Compatible/Breaking] | [How to upcast] | [Migration steps] |

## Event-Sourced Aggregate Implementation

```typescript
// Event Sourced Aggregate Template
abstract class EventSourcedAggregate extends EventSourcedAggregateRoot {
  protected version: number = 0;
  
  // Load from event stream
  static fromHistory<T extends EventSourcedAggregate>(
    events: DomainEvent[], 
    constructor: new () => T
  ): T {
    const aggregate = new constructor();
    events.forEach(event => {
      aggregate.applyEvent(event);
      aggregate.version++;
    });
    aggregate.markEventsAsCommitted();
    return aggregate;
  }
  
  // Apply business command
  protected executeCommand(command: Command): void {
    // Business logic validation
    this.validateCommand(command);
    
    // Generate domain event
    const event = this.createEvent(command);
    
    // Apply event to change state
    this.applyEvent(event);
    
    // Register for publishing
    this.registerEvent(event);
    
    this.version++;
  }
  
  protected abstract applyEvent(event: DomainEvent): void;
  protected abstract validateCommand(command: Command): void;
  protected abstract createEvent(command: Command): DomainEvent;
}
```

### Event Store Integration
| Aspect | Design Decision | Implementation | Performance | Consistency |
|--------|----------------|----------------|-------------|-------------|
| Event Persistence | [Append-only/Versioned] | [Database choice] | [Write performance] | [ACID guarantees] |
| Event Retrieval | [Stream-based/Snapshot+Events] | [Query strategy] | [Read performance] | [Read consistency] |
| Concurrent Access | [Optimistic/Pessimistic] | [Concurrency control] | [Throughput impact] | [Conflict resolution] |
```

### 4. CQRS統合とプロジェクション

#### コマンド・クエリ分離設計

```markdown
## CQRS Integration Design

### Command Side (Aggregate Focus)
| Command | Aggregate Method | Business Validation | Events Generated | State Changes | Performance |
|---------|------------------|-------------------|------------------|---------------|-------------|
| [Command name] | [Method name] | [Validation logic] | [Event list] | [State changes] | [Write performance] |

### Query Side (Projection Focus)
| Query | Data Source | Projection Model | Update Trigger | Consistency Level | Performance |
|-------|-------------|-----------------|----------------|-------------------|-------------|
| [Query name] | [Event stream/Read model] | [Data structure] | [Event that triggers update] | [Strong/Eventual] | [Read performance] |

## Projection Update Strategy

| Projection Type | Update Pattern | Data Consistency | Error Handling | Rebuild Strategy |
|-----------------|----------------|------------------|----------------|------------------|
| [Projection name] | [Real-time/Batch/Scheduled] | [Strong/Eventual] | [Retry/Skip/Alert] | [Full/Incremental] |
```

### 5. Saga統合とプロセス管理

#### Sagaパターン統合設計

```markdown
## Saga Pattern Integration

### Process Manager Design
| Saga Name | Triggering Event | Participating Aggregates | Compensation Logic | State Management |
|-----------|------------------|------------------------|--------------------|------------------|
| [Saga name] | [Initial event] | [Aggregate list] | [Rollback steps] | [How state tracked] |

### Saga State Machine
| Current State | Incoming Event | Next State | Actions | Compensation Actions |
|---------------|----------------|------------|---------|---------------------|
| [State] | [Event] | [Next state] | [Commands to send] | [Rollback commands] |

## Saga Implementation Pattern

```typescript
// Saga Process Manager Template
abstract class SagaProcessManager {
  protected sagaId: string;
  protected currentState: SagaState;
  protected correlationId: string;
  
  // Handle domain event
  handle(event: DomainEvent): SagaCommand[] {
    const nextState = this.getNextState(this.currentState, event);
    const commands = this.getCommandsForTransition(this.currentState, nextState, event);
    
    this.currentState = nextState;
    
    if (this.isCompleted()) {
      this.markAsCompleted();
    }
    
    return commands;
  }
  
  // Compensation logic
  compensate(reason: CompensationReason): SagaCommand[] {
    return this.getCompensationCommands(this.currentState, reason);
  }
  
  protected abstract getNextState(current: SagaState, event: DomainEvent): SagaState;
  protected abstract getCommandsForTransition(from: SagaState, to: SagaState, event: DomainEvent): SagaCommand[];
  protected abstract getCompensationCommands(state: SagaState, reason: CompensationReason): SagaCommand[];
}
```

### Long-Running Process Design
| Process Step | Timeout | Retry Strategy | Error Handling | Monitoring |
|--------------|---------|----------------|----------------|------------|
| [Step name] | [Timeout duration] | [Retry policy] | [Error action] | [Metrics] |
```

---

## サンプル実装：クイズアプリケーション

### 1. ドメインイベント中心の集約設計

#### イベントストーミングベース集約抽出

```markdown
## Domain Event Analysis for Aggregate Design

| Domain Event | Event Producer | Aggregate Candidate | Business Trigger | Data Payload | Downstream Impact |
|--------------|----------------|-------------------|------------------|--------------|------------------|
| QuizCreated | Quiz | Quiz | User creates new quiz | {quizId, title, creatorId, timestamp} | Content management, notifications |
| QuestionAdded | Quiz | Quiz | User adds question to quiz | {quizId, questionId, questionData} | Content validation, statistics |
| QuizPublished | Quiz | Quiz | Admin approves quiz | {quizId, publishTimestamp, metadata} | Search indexing, availability |
| SessionStarted | QuizSession | QuizSession | User starts quiz | {sessionId, userId, quizId, startTime} | Progress tracking, analytics |
| AnswerSubmitted | QuizSession | QuizSession | User submits answer | {sessionId, questionId, answer, timestamp} | Scoring, progress update |
| SessionCompleted | QuizSession | QuizSession | User completes quiz | {sessionId, score, completionTime, answers} | Certification, statistics |
| StatisticsUpdated | Statistics | Statistics | Session completed | {quizId, userId, sessionData} | Reporting, analytics |

## Event-to-Aggregate Mapping

| Aggregate Name | Published Events | Subscribed Events | Event Publishing Pattern | Consistency Requirements |
|----------------|------------------|-------------------|-------------------------|-------------------------|
| Quiz | QuizCreated, QuestionAdded, QuizPublished | None | Deferred (after transaction) | Strong (within aggregate) |
| QuizSession | SessionStarted, AnswerSubmitted, SessionCompleted | QuizPublished | Deferred (after transaction) | Strong (within aggregate) |
| Statistics | StatisticsUpdated | SessionCompleted | Async (eventual consistency) | Eventual |
| User | UserRegistered, ProfileUpdated | None | Immediate (identity critical) | Strong |
```

### 2. 集約ルートとイベント発行設計

#### Quiz集約のTwo-Phase Event Publication

```markdown
## Quiz Aggregate Event Publication Design

### Phase 1: Event Registration (Within Transaction)
| Aggregate Method | Business Operation | Events Registered | Registration Timing | Validation Required |
|------------------|-------------------|-------------------|--------------------|--------------------|
| createQuiz() | Create new quiz entity | QuizCreated | After validation, before persistence | Title uniqueness, creator authority |
| addQuestion() | Add question to quiz | QuestionAdded | After question validation | Question format, quiz not published |
| publishQuiz() | Make quiz publicly available | QuizPublished | After approval validation | Minimum questions, content review |
| updateMetadata() | Update quiz information | QuizMetadataUpdated | After change validation | Quiz not published |

### Phase 2: Event Publishing (After Transaction Success)
| Registered Event | Publishing Strategy | Delivery Guarantee | Error Handling | Monitoring |
|------------------|-------------------|-------------------|----------------|------------|
| QuizCreated | Immediate | At-least-once | Retry 3 times, then DLQ | Creation success rate |
| QuestionAdded | Batch (every 10 sec) | At-least-once | Retry with backoff | Question addition rate |
| QuizPublished | Immediate | Exactly-once | Manual intervention required | Publication success rate |
```

#### QuizSession集約のイベント管理

```typescript
// QuizSession Aggregate with Event Management
class QuizSession extends EventSourcedAggregateRoot {
  private sessionId: SessionId;
  private userId: UserId;
  private quizId: QuizId;
  private answers: Map<QuestionId, Answer> = new Map();
  private startTime: Date;
  private endTime?: Date;
  private status: SessionStatus;

  // Command handler with event registration
  startSession(command: StartSessionCommand): void {
    // Business validation
    if (this.status !== SessionStatus.NotStarted) {
      throw new Error("Session already started");
    }

    // Update state
    this.status = SessionStatus.Active;
    this.startTime = new Date();

    // Register domain event
    this.registerEvent(new SessionStartedEvent({
      sessionId: this.sessionId,
      userId: this.userId,
      quizId: this.quizId,
      startTime: this.startTime
    }));
  }

  submitAnswer(command: SubmitAnswerCommand): void {
    // Business validation
    this.validateAnswerSubmission(command);

    // Update state
    this.answers.set(command.questionId, command.answer);

    // Register domain event
    this.registerEvent(new AnswerSubmittedEvent({
      sessionId: this.sessionId,
      questionId: command.questionId,
      answer: command.answer,
      timestamp: new Date()
    }));

    // Check for completion
    if (this.isAllQuestionsAnswered()) {
      this.completeSession();
    }
  }

  private completeSession(): void {
    this.status = SessionStatus.Completed;
    this.endTime = new Date();

    // Calculate score
    const score = this.calculateScore();

    // Register completion event
    this.registerEvent(new SessionCompletedEvent({
      sessionId: this.sessionId,
      userId: this.userId,
      quizId: this.quizId,
      score: score,
      completionTime: this.endTime!,
      answers: Array.from(this.answers.entries())
    }));
  }
}
```

### 3. Event Sourcing統合設計

#### イベントストリーム設計

```markdown
## Event Stream Design

| Aggregate Type | Event Categories | Stream Naming | Snapshot Strategy | Replay Performance |
|----------------|------------------|---------------|-------------------|-------------------|
| Quiz | Content, Lifecycle, Publishing | quiz-{quizId} | Every 10 events or before publish | Questions cached separately |
| QuizSession | Session, Answers, Completion | session-{sessionId} | On completion only | Answer events batched |
| User | Identity, Profile, Preferences | user-{userId} | Every 50 events | Profile cached in memory |

## Event Schema Evolution

| Event Type | Schema Version | Backward Compatibility | Upcasting Strategy | Migration Path |
|------------|----------------|----------------------|-------------------|----------------|
| QuizCreated | v1.0 → v1.1 | Compatible (added optional fields) | None required | No migration |
| AnswerSubmitted | v1.0 → v2.0 | Breaking (changed answer format) | Convert old format to new | Background migration |
| SessionCompleted | v1.0 → v1.2 | Compatible (added score breakdown) | Populate new fields with defaults | Lazy migration |
```

### 4. CQRS統合とプロジェクション

#### コマンド・クエリ分離実装

```markdown
## CQRS Implementation

### Command Side (Quiz Management)
| Command | Aggregate Method | Business Validation | Events Generated | State Changes | Performance |
|---------|------------------|-------------------|------------------|---------------|-------------|
| CreateQuiz | Quiz.create() | Creator permissions, title uniqueness | QuizCreated | Quiz entity created | < 100ms |
| AddQuestion | Quiz.addQuestion() | Quiz not published, valid format | QuestionAdded | Question added to collection | < 50ms |
| PublishQuiz | Quiz.publish() | Minimum questions, content approval | QuizPublished | Status changed to Published | < 200ms |
| StartSession | QuizSession.start() | User authenticated, quiz available | SessionStarted | Session entity created | < 150ms |

### Query Side (Quiz Discovery & Results)
| Query | Data Source | Projection Model | Update Trigger | Consistency Level | Performance |
|-------|-------------|-----------------|----------------|-------------------|-------------|
| FindPublishedQuizzes | QuizListProjection | Denormalized quiz summaries | QuizPublished | Eventual (< 1sec) | < 10ms |
| GetQuizDetails | QuizDetailProjection | Full quiz with questions | QuizCreated, QuestionAdded | Eventual (< 500ms) | < 20ms |
| GetUserResults | UserResultsProjection | Session results and statistics | SessionCompleted | Eventual (< 2sec) | < 15ms |
| GetQuizStatistics | QuizStatsProjection | Aggregated performance metrics | SessionCompleted | Eventual (< 5sec) | < 30ms |

## Projection Update Implementation

```typescript
// Quiz List Projection Handler
class QuizListProjectionHandler {
  constructor(private projectionStore: ProjectionStore) {}

  @EventHandler(QuizPublishedEvent)
  async handleQuizPublished(event: QuizPublishedEvent): Promise<void> {
    const projection = {
      quizId: event.quizId,
      title: event.title,
      description: event.description,
      category: event.category,
      difficulty: event.difficulty,
      questionCount: event.questionCount,
      publishedAt: event.timestamp,
      rating: 0, // Will be updated by rating events
      completionCount: 0 // Will be updated by completion events
    };

    await this.projectionStore.upsert('quiz-list', event.quizId, projection);
  }

  @EventHandler(SessionCompletedEvent)
  async handleSessionCompleted(event: SessionCompletedEvent): Promise<void> {
    // Update completion count and average rating
    await this.projectionStore.increment('quiz-list', event.quizId, {
      completionCount: 1,
      totalScore: event.score
    });
  }
}
```
```

### 5. Saga統合とクイズ完了プロセス

#### クイズ完了Sagaの設計

```markdown
## Quiz Completion Saga Design

### Process Manager: Quiz Completion Process
| Saga Name | Triggering Event | Participating Aggregates | Compensation Logic | State Management |
|-----------|------------------|------------------------|--------------------|------------------|
| QuizCompletionSaga | SessionCompleted | Statistics, User, Certificate | Remove invalid statistics, revoke certificate | In-memory state with persistence |

### Saga State Machine
| Current State | Incoming Event | Next State | Actions | Compensation Actions |
|---------------|----------------|------------|---------|---------------------|
| Started | SessionCompleted | UpdatingStats | UpdateStatistics command | None |
| UpdatingStats | StatisticsUpdated | CheckingAchievements | CheckAchievements command | RemoveStatistics command |
| CheckingAchievements | AchievementChecked | IssuingCertificate (if qualified) | IssueCertificate command | RemoveAchievement command |
| IssuingCertificate | CertificateIssued | Completed | None | RevokeCertificate command |
| * | CompensationRequired | Compensating | Execute compensation | None |

## Saga Implementation

```typescript
class QuizCompletionSaga extends SagaProcessManager {
  handle(event: DomainEvent): SagaCommand[] {
    switch (this.currentState) {
      case SagaState.Started:
        if (event instanceof SessionCompletedEvent) {
          this.currentState = SagaState.UpdatingStats;
          return [new UpdateStatisticsCommand({
            userId: event.userId,
            quizId: event.quizId,
            score: event.score,
            completionTime: event.completionTime
          })];
        }
        break;

      case SagaState.UpdatingStats:
        if (event instanceof StatisticsUpdatedEvent) {
          this.currentState = SagaState.CheckingAchievements;
          return [new CheckAchievementsCommand({
            userId: event.userId,
            quizId: event.quizId,
            totalScore: event.totalScore,
            completionCount: event.completionCount
          })];
        }
        break;

      case SagaState.CheckingAchievements:
        if (event instanceof AchievementCheckedEvent) {
          if (event.certificateEligible) {
            this.currentState = SagaState.IssuingCertificate;
            return [new IssueCertificateCommand({
              userId: event.userId,
              quizId: event.quizId,
              achievementLevel: event.achievementLevel
            })];
          } else {
            this.currentState = SagaState.Completed;
            return [];
          }
        }
        break;

      case SagaState.IssuingCertificate:
        if (event instanceof CertificateIssuedEvent) {
          this.currentState = SagaState.Completed;
          return [];
        }
        break;
    }

    return [];
  }

  compensate(reason: CompensationReason): SagaCommand[] {
    const compensationCommands: SagaCommand[] = [];

    // Reverse actions based on current state
    switch (this.currentState) {
      case SagaState.IssuingCertificate:
        compensationCommands.push(new RevokeCertificateCommand({
          userId: this.correlationId,
          certificateId: this.sagaData.certificateId
        }));
        // Fall through to previous state compensation

      case SagaState.CheckingAchievements:
        compensationCommands.push(new RemoveAchievementCommand({
          userId: this.correlationId,
          achievementId: this.sagaData.achievementId
        }));
        // Fall through to previous state compensation

      case SagaState.UpdatingStats:
        compensationCommands.push(new RemoveStatisticsCommand({
          userId: this.correlationId,
          sessionId: this.sagaData.sessionId
        }));
        break;
    }

    this.currentState = SagaState.Compensating;
    return compensationCommands;
  }
}
```
```

---

## フォーマットの特徴

### 利点
- **イベント中心設計**: ビジネスイベントから自然に集約境界が導出される
- **疎結合アーキテクチャ**: イベント駆動による集約間の疎結合実現
- **拡張性**: 新しいイベントハンドラやプロジェクションの追加が容易
- **監査証跡**: すべての変更がイベントとして記録され完全な監査証跡
- **CQRS統合**: 読み取り最適化とコマンド最適化の両立
- **復旧性**: イベントストリームからの状態復旧が可能

### 欠点
- **複雑性**: イベント管理、プロジェクション、Sagaなど多くの概念
- **学習コスト**: Event Sourcing、CQRS、Sagaパターンの理解が必要
- **デバッグ困難**: 非同期処理とイベントフローのデバッグが複雑
- **性能考慮**: イベント処理とプロジェクション更新の性能影響
- **整合性管理**: 結果整合性による一時的な不整合状態の管理

### 適用場面
- **イベント重要**: ビジネスイベントが重要で監査証跡が必要
- **高スケーラビリティ**: 大量のデータと高い同時実行性が要求される
- **マイクロサービス**: 複数のサービス間での疎結合が重要
- **リアルタイム**: リアルタイムな通知や更新が必要
- **複雑なワークフロー**: 複数ステップのビジネスプロセスがある
- **CQRS適用**: 読み取りと書き込みの最適化が両方必要