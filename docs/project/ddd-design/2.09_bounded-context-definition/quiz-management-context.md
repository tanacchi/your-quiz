# Quiz Management Context（クイズ管理コンテキスト）

## コンテキスト概要

### 責務

クイズのライフサイクル管理、品質保証、承認フローの統制を担う中核的なコンテキスト。

### ビジネス価値

- 高品質なクイズコンテンツの提供
- 不適切コンテンツの防止
- 効率的なコンテンツ管理業務

## ドメインモデル

### 集約: Quiz Aggregate

#### Quiz（集約ルート）

```typescript
interface Quiz {
  readonly id: QuizId;
  readonly question: Question;
  readonly correctAnswer: CorrectAnswer;
  readonly explanation?: Explanation;
  readonly tags: Tag[];
  status: QuizStatus;
  readonly creatorId: CreatorId;
  readonly createdAt: Timestamp;
  approvedAt?: Timestamp;
  approvedBy?: AdministratorId;
  rejectedAt?: Timestamp;
  rejectionReason?: string;
}
```

#### 主要な振る舞い

```typescript
class QuizAggregate {
  // クイズ作成
  static create(command: CreateQuizCommand): Result<Quiz, DomainError> {
    // バリデーション
    const question = Question.create(command.questionText);
    const correctAnswer = CorrectAnswer.create(command.correctAnswer);
    
    if (question.isErr() || correctAnswer.isErr()) {
      return err(new ValidationError('Invalid quiz data'));
    }
    
    return ok(new Quiz({
      id: QuizId.generate(),
      question: question.value,
      correctAnswer: correctAnswer.value,
      explanation: command.explanation ? Explanation.create(command.explanation).value : undefined,
      tags: command.tags.map(tag => Tag.create(tag)).filter(t => t.isOk()).map(t => t.value),
      status: QuizStatus.PendingApproval,
      creatorId: command.creatorId,
      createdAt: Timestamp.now()
    }));
  }
  
  // 承認処理
  approve(administratorId: AdministratorId): Result<void, DomainError> {
    if (this.status !== QuizStatus.PendingApproval) {
      return err(new BusinessRuleError('承認待ち状態のクイズのみ承認可能'));
    }
    
    this.status = QuizStatus.Approved;
    this.approvedAt = Timestamp.now();
    this.approvedBy = administratorId;
    
    // ドメインイベント発行
    this.addDomainEvent(new QuizApprovedEvent(this.id, administratorId));
    
    return ok(undefined);
  }
  
  // 拒否処理
  reject(administratorId: AdministratorId, reason: string): Result<void, DomainError> {
    if (this.status !== QuizStatus.PendingApproval) {
      return err(new BusinessRuleError('承認待ち状態のクイズのみ拒否可能'));
    }
    
    this.status = QuizStatus.Rejected;
    this.rejectedAt = Timestamp.now();
    this.rejectionReason = reason;
    
    // ドメインイベント発行
    this.addDomainEvent(new QuizRejectedEvent(this.id, administratorId, reason));
    
    return ok(undefined);
  }
  
  // 作成者確認
  isCreatedBy(creatorId: CreatorId): boolean {
    return this.creatorId.equals(creatorId);
  }
  
  // 公開可能性確認
  isPublishable(): boolean {
    return this.status === QuizStatus.Approved;
  }
}
```

### 値オブジェクト

#### Question（問題文）

```typescript
class Question {
  private constructor(
    readonly text: string,
    readonly length: number,
    readonly sanitizedText: string
  ) {}
  
  static create(text: string): Result<Question, ValidationError> {
    if (!text || text.trim().length === 0) {
      return err(new ValidationError('問題文は必須です'));
    }
    
    const trimmed = text.trim();
    if (trimmed.length > 500) {
      return err(new ValidationError('問題文は500文字以内で入力してください'));
    }
    
    const sanitized = this.sanitizeHtml(trimmed);
    
    return ok(new Question(trimmed, trimmed.length, sanitized));
  }
  
  private static sanitizeHtml(text: string): string {
    // HTMLタグ除去・エスケープ処理
    return text
      .replace(/<[^>]*>/g, '') // HTMLタグ除去
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  }
  
  equals(other: Question): boolean {
    return this.sanitizedText === other.sanitizedText;
  }
}
```

#### QuizStatus（クイズ状態）

```typescript
enum QuizStatusValue {
  PendingApproval = 'pending_approval',
  Approved = 'approved',
  Rejected = 'rejected'
}

class QuizStatus {
  private constructor(readonly value: QuizStatusValue) {}
  
  static readonly PendingApproval = new QuizStatus(QuizStatusValue.PendingApproval);
  static readonly Approved = new QuizStatus(QuizStatusValue.Approved);
  static readonly Rejected = new QuizStatus(QuizStatusValue.Rejected);
  
  isPendingApproval(): boolean {
    return this.value === QuizStatusValue.PendingApproval;
  }
  
  isApproved(): boolean {
    return this.value === QuizStatusValue.Approved;
  }
  
  isRejected(): boolean {
    return this.value === QuizStatusValue.Rejected;
  }
  
  equals(other: QuizStatus): boolean {
    return this.value === other.value;
  }
}
```

#### Tag（タグ）

```typescript
class Tag {
  private constructor(
    readonly name: string,
    readonly normalizedName: string
  ) {}
  
  static create(name: string): Result<Tag, ValidationError> {
    if (!name || name.trim().length === 0) {
      return err(new ValidationError('タグ名は必須です'));
    }
    
    const trimmed = name.trim();
    if (trimmed.length > 50) {
      return err(new ValidationError('タグ名は50文字以内で入力してください'));
    }
    
    const normalized = this.normalize(trimmed);
    
    return ok(new Tag(trimmed, normalized));
  }
  
  private static normalize(name: string): string {
    return name
      .toLowerCase()
      .replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0)) // 全角数字を半角に
      .replace(/[Ａ-Ｚａ-ｚ]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0)) // 全角英字を半角に
      .replace(/\s+/g, ''); // 空白文字除去
  }
  
  equals(other: Tag): boolean {
    return this.normalizedName === other.normalizedName;
  }
}
```

## ドメインサービス

### QuizDuplicationCheckService

```typescript
class QuizDuplicationCheckService {
  constructor(private quizRepository: QuizRepository) {}
  
  async checkDuplication(
    question: Question,
    creatorId: CreatorId
  ): Promise<Result<DuplicationCheckResult, DomainError>> {
    const existingQuizzes = await this.quizRepository.findByQuestionText(
      question.sanitizedText
    );
    
    const duplicates = existingQuizzes.filter(quiz => 
      quiz.creatorId.equals(creatorId) &&
      quiz.status !== QuizStatus.Rejected
    );
    
    if (duplicates.length > 0) {
      return ok(DuplicationCheckResult.Duplicate(duplicates[0].id));
    }
    
    // 類似度チェック（将来拡張）
    const similar = await this.findSimilarQuizzes(question, creatorId);
    if (similar.length > 0) {
      return ok(DuplicationCheckResult.Similar(similar.map(q => q.id)));
    }
    
    return ok(DuplicationCheckResult.Unique());
  }
  
  private async findSimilarQuizzes(
    question: Question,
    creatorId: CreatorId
  ): Promise<Quiz[]> {
    // 簡易類似度判定（レーベンシュタイン距離等）
    // 実装は将来的に追加
    return [];
  }
}
```

## アプリケーションサービス

### QuizManagementApplicationService

```typescript
class QuizManagementApplicationService {
  constructor(
    private quizRepository: QuizRepository,
    private duplicationCheckService: QuizDuplicationCheckService,
    private eventPublisher: DomainEventPublisher
  ) {}
  
  async createQuiz(command: CreateQuizCommand): Promise<Result<QuizId, ApplicationError>> {
    // 重複チェック
    const duplicationResult = await this.duplicationCheckService.checkDuplication(
      Question.create(command.questionText).value,
      command.creatorId
    );
    
    if (duplicationResult.isErr()) {
      return err(duplicationResult.error);
    }
    
    if (duplicationResult.value.isDuplicate()) {
      return err(new ApplicationError('同一の問題文のクイズが既に存在します'));
    }
    
    // クイズ作成
    const quizResult = QuizAggregate.create(command);
    if (quizResult.isErr()) {
      return err(new ApplicationError(quizResult.error.message));
    }
    
    const quiz = quizResult.value;
    
    // 永続化
    await this.quizRepository.save(quiz);
    
    // ドメインイベント発行
    await this.eventPublisher.publishAll(quiz.getDomainEvents());
    
    return ok(quiz.id);
  }
  
  async approveQuiz(command: ApproveQuizCommand): Promise<Result<void, ApplicationError>> {
    const quiz = await this.quizRepository.findById(command.quizId);
    if (!quiz) {
      return err(new ApplicationError('クイズが見つかりません'));
    }
    
    const result = quiz.approve(command.administratorId);
    if (result.isErr()) {
      return err(new ApplicationError(result.error.message));
    }
    
    await this.quizRepository.save(quiz);
    await this.eventPublisher.publishAll(quiz.getDomainEvents());
    
    return ok(undefined);
  }
  
  async getQuizzesForApproval(): Promise<Quiz[]> {
    return this.quizRepository.findByStatus(QuizStatus.PendingApproval);
  }
  
  async getCreatorQuizzes(creatorId: CreatorId): Promise<Quiz[]> {
    return this.quizRepository.findByCreatorId(creatorId);
  }
}
```

## リポジトリインターフェース

### QuizRepository

```typescript
interface QuizRepository {
  findById(id: QuizId): Promise<Quiz | null>;
  findByCreatorId(creatorId: CreatorId): Promise<Quiz[]>;
  findByStatus(status: QuizStatus): Promise<Quiz[]>;
  findByQuestionText(questionText: string): Promise<Quiz[]>;
  findApprovedQuizzes(filter?: QuizFilter): Promise<Quiz[]>;
  save(quiz: Quiz): Promise<void>;
  delete(id: QuizId): Promise<void>;
}

interface QuizFilter {
  tags?: string[];
  createdAfter?: Date;
  createdBefore?: Date;
  limit?: number;
  offset?: number;
}
```

## ドメインイベント

### QuizSubmittedEvent

```typescript
interface QuizSubmittedEvent extends DomainEvent {
  readonly eventType: 'QuizSubmitted';
  readonly quizId: QuizId;
  readonly creatorId: CreatorId;
  readonly questionPreview: string; // 最初の50文字
}
```

### QuizApprovedEvent

```typescript
interface QuizApprovedEvent extends DomainEvent {
  readonly eventType: 'QuizApproved';
  readonly quizId: QuizId;
  readonly administratorId: AdministratorId;
  readonly approvedAt: Timestamp;
}
```

### QuizRejectedEvent

```typescript
interface QuizRejectedEvent extends DomainEvent {
  readonly eventType: 'QuizRejected';
  readonly quizId: QuizId;
  readonly administratorId: AdministratorId;
  readonly reason: string;
  readonly rejectedAt: Timestamp;
}
```

## 不変条件（Invariants）

### Quiz集約の不変条件

1. **問題文必須**: 問題文は必ず存在し、500文字以内
2. **正解必須**: 正解は必ず◯または×のいずれか
3. **ステータス遷移**: PendingApproval → (Approved | Rejected) のみ許可
4. **承認者必須**: 承認済みクイズには必ず承認者が存在
5. **作成者不変**: 作成者IDは作成後変更不可
6. **サニタイズ済み**: 問題文・解説はHTMLタグが除去済み

### ビジネスルール

1. **重複制限**: 同一作成者による同一問題文の投稿制限（警告レベル）
2. **承認権限**: 管理者のみがクイズを承認・拒否可能
3. **公開制限**: 承認済みクイズのみ公開対象
4. **文字数制限**: 問題文500文字、解説1000文字の厳密な制限
5. **タグ制限**: 1クイズあたり最大10個のタグ

## 技術的制約

### パフォーマンス考慮

- 承認待ちクイズ一覧の効率的取得（Status + CreatedAt インデックス）
- 作成者別クイズ取得の最適化（CreatorId インデックス）
- 重複チェックの高速化（QuestionText ハッシュインデックス）

### セキュリティ考慮

- 入力サニタイズの徹底実施
- 承認権限の厳密な検証
- 作成者識別の匿名化保証

### データ整合性

- 楽観的ロックによる同時更新制御
- ドメインイベントによる結果整合性保証
- 集約境界内での強整合性保証
