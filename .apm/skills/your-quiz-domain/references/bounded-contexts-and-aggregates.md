# 境界づけられたコンテキストと集約の詳細

詳細な設計成果物は `docs/project/ddd-design/` を参照すること。本ファイルは実装時の参照用概要。

## コンテキストマップ

```
[Quiz Management] ──Published Language──→ [Quiz Learning]
[User Session]    ──Customer/Supplier──→  [Quiz Learning]
[Quiz Learning]   ──Customer/Supplier──→  [Offline Sync]
[Quiz Management] ──Anti-Corruption──→   [Offline Sync]
[User Session]    ──Conformist──────────→ [Offline Sync]
```

## 集約別 TypeScript 実装要点

### Quiz Aggregate

```typescript
class QuizAggregate extends AggregateRoot<QuizId> {
  // 状態: Draft → PendingApproval → Approved → Published
  private status: QuizStatus;

  static create(cmd: CreateQuizCommand): Result<QuizAggregate, ValidationError> {
    // 不変条件: 質問テキスト ≤ 500文字、正解が存在する
    const question = Question.create(cmd.questionText);
    if (question.isErr()) return err(question.error);
    // ...
  }

  approve(administratorId: AdministratorId): Result<void, BusinessRuleError> {
    if (this.status !== QuizStatus.PendingApproval)
      return err(new BusinessRuleError("承認待ち状態でのみ承認可能"));
    this.status = QuizStatus.Approved;
    this.addDomainEvent(new QuizApproved(this.id, administratorId));
    return ok(undefined);
  }
}
```

### Learning Session Aggregate

```typescript
class LearningSessionAggregate extends AggregateRoot<SessionId> {
  private answers: Answer[] = [];
  private progress: LearningProgress;

  answerQuiz(quizId: QuizId, isCorrect: boolean, answered: boolean): Result<void, BusinessRuleError> {
    // 不変条件: 同一クイズへの重複回答を防ぐ
    if (this.answers.some(a => a.quizId.equals(quizId)))
      return err(new BusinessRuleError("既に回答済み"));
    this.answers.push(Answer.create(quizId, isCorrect));
    this.progress = this.calculateProgress();
    return ok(undefined);
  }

  getProgress(): LearningProgress { return this.progress; }
}
```

### User Session Aggregate

```typescript
class UserSessionAggregate extends AggregateRoot<UserId> {
  // 個人情報なし: DeviceFingerprint で匿名識別
  private constructor(
    readonly id: UserId,
    readonly deviceFingerprint: DeviceFingerprint,
    readonly creatorId: CreatorId,
  ) { super(); }

  static create(device: DeviceFingerprint): Result<UserSessionAggregate, ValidationError> {
    const userId = UserId.generate();
    const creatorId = CreatorId.fromUserId(userId);
    return ok(new UserSessionAggregate(userId, device, creatorId));
  }
}
```

## 共通基盤（Shared Kernel）

```typescript
// Brand 型（識別子の型安全性）
declare const brand: unique symbol;
type Brand<T, B> = T & { readonly [brand]: B };

type QuizId = Brand<string, 'QuizId'>;
type SessionId = Brand<string, 'SessionId'>;
type AnswerId = Brand<string, 'AnswerId'>;
type UserId = Brand<string, 'UserId'>;

// DomainEvent 基底
interface DomainEvent {
  readonly eventId: string;
  readonly eventType: string;
  readonly aggregateId: string;
  readonly occurredAt: Date;
}

// AggregateRoot 基底
abstract class AggregateRoot<TId> {
  private readonly _domainEvents: DomainEvent[] = [];
  protected addDomainEvent(event: DomainEvent): void {
    this._domainEvents.push(event);
  }
  getDomainEvents(): readonly DomainEvent[] { return [...this._domainEvents]; }
  clearDomainEvents(): void { this._domainEvents.length = 0; }
}

// DomainError 分類
abstract class DomainError extends Error {
  abstract readonly errorCode: string;
  abstract readonly severity: 'warning' | 'error' | 'critical';
}
class ValidationError extends DomainError {
  readonly errorCode = 'VALIDATION_ERROR';
  readonly severity = 'warning' as const;
}
class BusinessRuleError extends DomainError {
  readonly errorCode = 'BUSINESS_RULE_VIOLATION';
  readonly severity = 'error' as const;
}
class InvariantViolationError extends DomainError {
  readonly errorCode = 'INVARIANT_VIOLATION';
  readonly severity = 'critical' as const;
}
```

## ディレクトリ構造（実装時の指針）

```
src/
├── contexts/
│   ├── quiz-management/
│   │   ├── domain/
│   │   │   ├── entities/          # Quiz エンティティ
│   │   │   ├── value-objects/     # Question, QuizStatus, Tag VO
│   │   │   ├── aggregates/        # QuizAggregate
│   │   │   ├── repositories/      # QuizRepository インターフェース
│   │   │   └── services/          # ドメインサービス
│   │   ├── application/
│   │   │   ├── commands/
│   │   │   ├── queries/
│   │   │   └── services/
│   │   └── infrastructure/
│   ├── quiz-learning/             # 同様の構造
│   ├── user-session/              # 同様の構造
│   └── offline-sync/              # 同様の構造
└── shared-kernel/
    ├── types/                     # Brand 型定義
    ├── value-objects/             # 共通 VO
    ├── domain-events/             # DomainEvent 基底
    └── utilities/
```
