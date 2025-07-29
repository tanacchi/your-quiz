# 集約と集約ルート定義フォーマット案1：不変条件駆動設計アプローチ

## フォーマットの概要

DDD 2024年のベストプラクティスに基づき、**ビジネス不変条件を起点とした集約境界の決定**を中心とするアプローチ。「不変条件が集約設計を決定する」という原則に従い、真の不変条件（原子的）と結果整合性で良い不変条件を明確に区別し、トランザクション境界を最適化する。

## 記載項目テンプレート

### 1. ビジネス不変条件分析

#### 不変条件発見・分類（テンプレート）

```markdown
## Business Invariants Discovery & Classification

| Invariant ID | Business Rule Description | Type | Scope | Validation Timing | Consistency Level | Impact |
|--------------|--------------------------|------|-------|-------------------|-------------------|--------|
| [INV-001] | [Business rule description] | True/Eventual | Single Entity/Cross Entity/Cross Aggregate | Real-time/Deferred | Strong/Eventual | High/Medium/Low |

### Example Classifications:
- **True Invariant**: "Account balance cannot go negative" - requires immediate validation
- **Eventual Invariant**: "Total quiz statistics must match individual completions" - can be eventually consistent

## Invariant Dependency Matrix

| Invariant A | Invariant B | Dependency Type | Conflict Resolution | Priority |
|-------------|-------------|-----------------|-------------------|----------|
| [INV-001] | [INV-002] | Independent/Dependent/Conflicting | [Resolution strategy] | High/Medium/Low |
```

#### ビジネスルール詳細分析

```markdown
## Business Rule Detailed Analysis

### Rule: [Rule Name]
- **ID**: [RULE-001]
- **Invariant Type**: True Invariant / Eventual Invariant
- **Business Context**: [When this rule applies]
- **Stakeholders**: [Who cares about this rule]
- **Exception Handling**: [What happens when violated]
- **Validation Logic**: [How to check compliance]
- **Error Recovery**: [How to recover from violations]

### Validation Requirements
| Validation Point | Required Data | Validation Logic | Performance Impact | Error Handling |
|------------------|---------------|------------------|-------------------|----------------|
| [Before operation] | [Data needed] | [Logic description] | [Performance cost] | [Error strategy] |
```

### 2. 集約境界決定プロセス

#### トランザクション境界分析

```markdown
## Transaction Boundary Analysis

| Business Operation | Involved Entities | Invariants to Check | Transaction Scope | Consistency Requirement | Performance Impact |
|--------------------|-------------------|-------------------|-------------------|------------------------|-------------------|
| [Operation name] | [Entity list] | [Invariant IDs] | Single Aggregate/Cross Aggregate | Strong/Eventual | High/Medium/Low |

## Aggregate Boundary Decision Matrix

| Entity Group | Shared Invariants | Transaction Frequency | Data Change Coupling | Boundary Decision | Rationale |
|--------------|-------------------|----------------------|--------------------|-------------------|-----------|
| [Entity group] | [Invariant list] | High/Medium/Low | High/Medium/Low | Include/Separate | [Decision reasoning] |
```

#### 集約候補定義

```markdown
## Aggregate Candidates Definition

### Aggregate: [Aggregate Name]

#### Core Composition
- **Aggregate Root**: [Root Entity Name]
  - **Identity**: [How root is identified]
  - **Lifecycle**: [Creation, modification, deletion rules]
  - **Access Pattern**: [How external systems interact]

- **Child Entities**: 
  | Entity Name | Relationship | Lifecycle Dependency | Access Restriction | Invariant Responsibility |
  |-------------|--------------|---------------------|-------------------|-------------------------|
  | [Entity] | [1:1, 1:N, etc] | [Dependent/Independent] | [Root-only/Direct] | [Invariants it enforces] |

- **Value Objects**:
  | Value Object | Usage Context | Validation Rules | Immutability Level | Shared Usage |
  |--------------|---------------|------------------|-------------------|--------------|
  | [VO Name] | [Where used] | [Validation logic] | [Immutable/Mutable] | [Shared/Private] |

#### Invariant Enforcement
| Invariant ID | Enforcement Point | Validation Method | Failure Action | Recovery Strategy |
|--------------|-------------------|-------------------|----------------|-------------------|
| [INV-001] | [When/Where checked] | [How validated] | [What happens on failure] | [How to recover] |
```

### 3. 集約ルート設計

#### 集約ルート責任定義

```markdown
## Aggregate Root Responsibility Design

### [Aggregate Root Name]

#### Primary Responsibilities
- **Identity Management**: [How identity is managed]
- **Invariant Enforcement**: [Which invariants are enforced]
- **State Coordination**: [How internal state is coordinated]
- **External Interface**: [What operations are exposed]

#### Command Methods Design
| Command Method | Business Purpose | Preconditions | Invariants Checked | Side Effects | Return Value |
|----------------|------------------|---------------|-------------------|--------------|--------------|
| [method name] | [Business goal] | [Required conditions] | [Invariant IDs] | [State changes] | [Return type/value] |

#### Query Methods Design
| Query Method | Information Need | Data Source | Performance Considerations | Authorization |
|--------------|------------------|-------------|---------------------------|---------------|
| [method name] | [What info needed] | [Where data comes from] | [Performance impact] | [Access control] |

#### Factory Methods
| Factory Method | Creation Scenario | Required Parameters | Initial State | Invariants Established |
|----------------|-------------------|-------------------|---------------|----------------------|
| [factory method] | [When to use] | [Required params] | [Initial state] | [Invariants set up] |
```

#### 状態管理設計

```markdown
## State Management Design

### State Transition Model
| Current State | Trigger Event | Invariants to Check | Next State | Business Rules Applied |
|---------------|---------------|-------------------|------------|----------------------|
| [Current] | [Event] | [Invariant list] | [Next state] | [Rules enforced] |

### Concurrency Control
| Shared Resource | Concurrency Pattern | Lock Strategy | Conflict Resolution | Performance Impact |
|-----------------|-------------------|---------------|-------------------|-------------------|
| [Resource] | [Optimistic/Pessimistic] | [Lock approach] | [How conflicts resolved] | [Performance cost] |
```

### 4. 不変条件実装仕様

#### 検証ロジック実装

```markdown
## Invariant Validation Implementation

### Validation Strategy Matrix
| Invariant ID | Validation Approach | Implementation Pattern | Error Handling | Performance Optimization |
|--------------|-------------------|----------------------|----------------|-------------------------|
| [INV-001] | [Immediate/Deferred/Batch] | [Design pattern used] | [Error strategy] | [Optimization approach] |

### Validation Logic Specification
```typescript
// Example Invariant Implementation Template
interface [AggregateName]Invariants {
  // True Invariant - must be validated immediately
  validateImmediateRule(data: [DataType]): ValidationResult<void>;
  
  // Eventual Invariant - can be validated later
  scheduleEventualValidation(event: [EventType]): void;
  
  // Cross-aggregate constraint - coordination needed
  validateCrossAggregateRule(context: [ContextType]): Promise<ValidationResult<void>>;
}

class [AggregateName]InvariantValidator implements [AggregateName]Invariants {
  validateImmediateRule(data: [DataType]): ValidationResult<void> {
    // Implementation logic
    if (/* condition */) {
      return ValidationResult.success();
    }
    return ValidationResult.failure("Invariant [INV-001] violated: [reason]");
  }
}
```

#### エラーハンドリング戦略
| Error Type | Detection Point | Recovery Strategy | User Impact | System Impact |
|------------|-----------------|-------------------|-------------|---------------|
| [Error type] | [Where detected] | [How to recover] | [User experience] | [System behavior] |
```

### 5. 集約間協調設計

#### 集約間不変条件処理

```markdown
## Cross-Aggregate Invariant Handling

### Eventual Consistency Strategy
| Cross-Aggregate Rule | Coordination Pattern | Consistency Timeline | Monitoring Approach | Compensation Logic |
|---------------------|---------------------|---------------------|--------------------|--------------------|
| [Rule description] | [Saga/Event/Process Manager] | [How long to achieve consistency] | [How to monitor] | [Rollback strategy] |

### Aggregate Interaction Patterns
| Source Aggregate | Target Aggregate | Interaction Type | Data Exchange | Consistency Guarantee |
|------------------|------------------|------------------|---------------|----------------------|
| [Source] | [Target] | [Command/Event/Query] | [What data shared] | [Strong/Eventual] |
```

---

## サンプル実装：クイズアプリケーション

### 1. ビジネス不変条件分析

#### 不変条件発見・分類

```markdown
## Business Invariants Discovery & Classification

| Invariant ID | Business Rule Description | Type | Scope | Validation Timing | Consistency Level | Impact |
|--------------|--------------------------|------|-------|-------------------|-------------------|--------|
| INV-001 | Quiz must have at least 1 question to be published | True | Single Entity | Real-time | Strong | High |
| INV-002 | User cannot submit more than one answer per question | True | Cross Entity | Real-time | Strong | High |
| INV-003 | Quiz session cannot exceed time limit | True | Single Entity | Real-time | Strong | Medium |
| INV-004 | Quiz statistics must match individual session results | Eventual | Cross Aggregate | Deferred | Eventual | Low |
| INV-005 | User must be authenticated to take quiz | True | Cross Aggregate | Real-time | Strong | High |

## Invariant Dependency Matrix

| Invariant A | Invariant B | Dependency Type | Conflict Resolution | Priority |
|-------------|-------------|-----------------|-------------------|----------|
| INV-001 | INV-002 | Independent | N/A | Both High |
| INV-003 | INV-002 | Dependent | Time limit checked before answer submission | INV-003 Higher |
| INV-004 | INV-002 | Dependent | Statistics updated after answer validation | INV-002 Higher |
```

### 2. 集約境界決定プロセス

#### トランザクション境界分析

```markdown
## Transaction Boundary Analysis

| Business Operation | Involved Entities | Invariants to Check | Transaction Scope | Consistency Requirement | Performance Impact |
|--------------------|-------------------|-------------------|-------------------|------------------------|-------------------|
| Submit Answer | QuizSession, Answer, Question | INV-002, INV-003 | Single Aggregate | Strong | Low |
| Publish Quiz | Quiz, Questions | INV-001 | Single Aggregate | Strong | Low |
| Complete Session | QuizSession, Answers, Statistics | INV-004 | Cross Aggregate | Eventual | Medium |
| Start Quiz | QuizSession, User, Quiz | INV-005 | Cross Aggregate | Strong | Medium |

## Aggregate Boundary Decision Matrix

| Entity Group | Shared Invariants | Transaction Frequency | Data Change Coupling | Boundary Decision | Rationale |
|--------------|-------------------|----------------------|--------------------|-------------------|-----------|
| Quiz + Questions | INV-001 | Low | High | Include | Questions cannot exist without Quiz |
| QuizSession + Answers | INV-002, INV-003 | High | High | Include | Answers are part of session lifecycle |
| User + QuizSession | INV-005 | Medium | Medium | Separate | Different lifecycle and ownership |
| Statistics | INV-004 | Low | Low | Separate | Eventually consistent is acceptable |
```

### 3. 集約ルート設計

#### Quiz集約ルート設計

```markdown
## Aggregate Root: Quiz

#### Primary Responsibilities
- **Identity Management**: Unique quiz identification and version management
- **Invariant Enforcement**: Ensures quiz has minimum questions before publication
- **State Coordination**: Manages quiz lifecycle (Draft → Review → Published)
- **External Interface**: Exposes quiz creation, modification, and publication operations

#### Command Methods Design
| Command Method | Business Purpose | Preconditions | Invariants Checked | Side Effects | Return Value |
|----------------|------------------|---------------|-------------------|--------------|--------------|
| addQuestion() | Add question to quiz | Quiz in Draft state | None | Question added to collection | QuestionId |
| removeQuestion() | Remove question from quiz | Quiz in Draft state, Question exists | INV-001 (after removal) | Question removed | void |
| publish() | Make quiz available to users | Quiz in Review state | INV-001 | State changed to Published | PublishResult |
| updateMetadata() | Update quiz information | Quiz not Published | None | Metadata updated | void |

#### Query Methods Design
| Query Method | Information Need | Data Source | Performance Considerations | Authorization |
|--------------|------------------|-------------|---------------------------|---------------|
| getQuestions() | List all questions | Internal collection | O(n) for question count | Quiz owner or admin |
| isPublishable() | Check if ready to publish | Internal state + questions | O(1) + question validation | Quiz owner or admin |
| getStatistics() | Quiz performance metrics | External statistics service | Cached data preferred | Public or owner |
```

#### QuizSession集約ルート設計

```markdown
## Aggregate Root: QuizSession

#### Primary Responsibilities
- **Identity Management**: Unique session identification and user association
- **Invariant Enforcement**: Prevents duplicate answers and enforces time limits
- **State Coordination**: Manages session progress and completion
- **External Interface**: Handles answer submission and session management

#### Command Methods Design
| Command Method | Business Purpose | Preconditions | Invariants Checked | Side Effects | Return Value |
|----------------|------------------|---------------|-------------------|--------------|--------------|
| submitAnswer() | Record user answer | Session active, Question not answered | INV-002, INV-003 | Answer recorded, progress updated | AnswerResult |
| pauseSession() | Temporarily halt session | Session active | INV-003 | Session paused, timer stopped | void |
| resumeSession() | Continue paused session | Session paused | INV-003 | Session active, timer resumed | void |
| completeSession() | Finish quiz session | All questions answered or time expired | INV-003 | Session completed, score calculated | SessionResult |

#### State Management Design
| Current State | Trigger Event | Invariants to Check | Next State | Business Rules Applied |
|---------------|---------------|-------------------|------------|----------------------|
| NotStarted | startSession() | INV-005 (user auth) | Active | Timer started, first question presented |
| Active | submitAnswer() | INV-002, INV-003 | Active/Completed | Answer recorded, check if last question |
| Active | pauseSession() | INV-003 | Paused | Timer stopped, state preserved |
| Paused | resumeSession() | INV-003 | Active | Timer resumed from pause point |
| Active | timeExpired() | INV-003 | Completed | Auto-completion, partial score calculated |
```

### 4. 不変条件実装仕様

#### 検証ロジック実装

```typescript
// Quiz Aggregate Invariants
interface QuizInvariants {
  validateMinimumQuestions(questions: Question[]): ValidationResult<void>;
  validateQuestionUniqueness(question: Question): ValidationResult<void>;
  validatePublicationReadiness(quiz: Quiz): ValidationResult<void>;
}

class QuizInvariantValidator implements QuizInvariants {
  validateMinimumQuestions(questions: Question[]): ValidationResult<void> {
    if (questions.length < 1) {
      return ValidationResult.failure("Quiz must have at least 1 question to be published (INV-001)");
    }
    return ValidationResult.success();
  }

  validateQuestionUniqueness(question: Question): ValidationResult<void> {
    // Check for duplicate questions
    return ValidationResult.success();
  }

  validatePublicationReadiness(quiz: Quiz): ValidationResult<void> {
    const questionValidation = this.validateMinimumQuestions(quiz.questions);
    if (!questionValidation.isSuccess) {
      return questionValidation;
    }
    
    if (quiz.status !== QuizStatus.Review) {
      return ValidationResult.failure("Quiz must be in Review status to publish");
    }
    
    return ValidationResult.success();
  }
}

// QuizSession Aggregate Invariants
interface QuizSessionInvariants {
  validateDuplicateAnswer(sessionId: string, questionId: string): ValidationResult<void>;
  validateTimeLimit(session: QuizSession): ValidationResult<void>;
  validateUserAuthentication(userId: string): Promise<ValidationResult<void>>;
}

class QuizSessionInvariantValidator implements QuizSessionInvariants {
  validateDuplicateAnswer(sessionId: string, questionId: string): ValidationResult<void> {
    // Check if user already answered this question
    const existingAnswer = this.findExistingAnswer(sessionId, questionId);
    if (existingAnswer) {
      return ValidationResult.failure("User cannot submit more than one answer per question (INV-002)");
    }
    return ValidationResult.success();
  }

  validateTimeLimit(session: QuizSession): ValidationResult<void> {
    const elapsed = Date.now() - session.startTime;
    if (elapsed > session.timeLimit) {
      return ValidationResult.failure("Quiz session cannot exceed time limit (INV-003)");
    }
    return ValidationResult.success();
  }

  async validateUserAuthentication(userId: string): Promise<ValidationResult<void>> {
    // Cross-aggregate validation - requires coordination
    const userService = this.getUserService();
    const isAuthenticated = await userService.isUserAuthenticated(userId);
    
    if (!isAuthenticated) {
      return ValidationResult.failure("User must be authenticated to take quiz (INV-005)");
    }
    return ValidationResult.success();
  }
}
```

### 5. 集約間協調設計

#### 集約間不変条件処理

```markdown
## Cross-Aggregate Invariant Handling

### Eventual Consistency Strategy
| Cross-Aggregate Rule | Coordination Pattern | Consistency Timeline | Monitoring Approach | Compensation Logic |
|---------------------|---------------------|---------------------|--------------------|--------------------|
| Quiz statistics accuracy (INV-004) | Event-driven aggregation | < 5 minutes | Statistics reconciliation job | Manual correction + alert |
| User authentication (INV-005) | Synchronous validation | < 200ms | Authentication success rate | Graceful degradation |

### Aggregate Interaction Patterns
| Source Aggregate | Target Aggregate | Interaction Type | Data Exchange | Consistency Guarantee |
|------------------|------------------|------------------|---------------|----------------------|
| QuizSession | Quiz | Query | Quiz metadata, questions | Strong (read-only) |
| QuizSession | User | Command | Authentication check | Strong (synchronous) |
| QuizSession | Statistics | Event | Session completion data | Eventual (async) |
| Quiz | Statistics | Event | Quiz publication data | Eventual (async) |
```

---

## フォーマットの特徴

### 利点
- **ビジネス中心**: 不変条件から設計が導かれるため、ビジネス価値に直結
- **明確な境界**: 真の不変条件vs結果整合性の区別により適切な境界設定
- **実装指針**: 具体的な検証ロジックと実装パターンを提供
- **トレーサビリティ**: ビジネスルールから実装までの追跡可能性
- **保守性**: 不変条件の変更が設計変更に直結する明確な構造

### 欠点
- **分析コスト**: 詳細な不変条件分析に時間がかかる
- **複雑性**: 多数の不変条件がある場合の管理が複雑
- **性能懸念**: 厳密な検証による性能への影響
- **スキル要求**: ビジネスルール分析とDDD理解の両方が必要

### 適用場面
- **ビジネスルール重要**: 複雑なビジネス制約がある領域
- **データ整合性重要**: 金融、医療、法務など高い整合性が要求される分野
- **長期保守**: ビジネスルールの変更が頻繁で長期保守が必要
- **ドメインエキスパート協働**: ビジネス専門家との密接な協働が可能
- **コンプライアンス**: 規制要件や監査要件が厳しい領域