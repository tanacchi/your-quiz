# 集約設計

## 概要

クイズアプリケーションにおける集約（Aggregate）の設計と、集約ルート（Aggregate Root）の責務を定義します。各集約は整合性境界を形成し、ビジネス不変条件を保証します。

## 集約設計の原則

### 1. 整合性境界
- 集約内の不変条件を常に保証
- トランザクション境界と一致
- 強一貫性の要求範囲

### 2. 集約ルート経由アクセス
- 集約への操作は全て集約ルートから
- 内部エンティティへの直接アクセス禁止
- カプセル化の徹底

### 3. ID参照原則
- 他集約への参照はIDのみ
- 集約間の結合度最小化
- 独立した永続化

### 4. 最小サイズ
- 必要最小限の要素のみ含める
- パフォーマンスとスケーラビリティの確保
- 明確な責務境界

## 集約一覧

### 1. Quiz Aggregate（クイズ集約）

#### 集約構成
- **集約ルート**: Quiz
- **集約メンバー**: なし（Quizのみ）
- **境界**: クイズの内容とライフサイクル

#### 責務
- クイズ内容の整合性保証
- 承認フロー制御
- コンテンツ品質管理

#### 不変条件
1. **問題文制約**: 必須、500文字以内、サニタイズ済み
2. **正解制約**: ◯または×の2択のみ
3. **ステータス遷移**: PendingApproval → (Approved | Rejected) のみ
4. **承認者必須**: 承認済みには必ず承認者情報
5. **作成者不変**: 作成後の作成者ID変更不可

```typescript
class QuizAggregate {
  constructor(
    readonly id: QuizId,
    readonly question: Question,
    readonly correctAnswer: CorrectAnswer,
    readonly explanation?: Explanation,
    readonly tags: Tag[],
    status: QuizStatus,
    readonly creatorId: CreatorId,
    readonly createdAt: Timestamp,
    approvedAt?: Timestamp,
    approvedBy?: AdministratorId
  ) {
    this.ensureInvariants();
  }
  
  private ensureInvariants(): void {
    // 不変条件チェック
    if (!this.question || !this.correctAnswer) {
      throw new InvariantViolationError('問題文と正解は必須です');
    }
    
    if (this.status === QuizStatus.Approved && !this.approvedBy) {
      throw new InvariantViolationError('承認済みクイズには承認者が必要です');
    }
    
    if (this.tags.length > 10) {
      throw new InvariantViolationError('タグは10個まで設定可能です');
    }
  }
  
  // 集約ルートのメソッド
  approve(administratorId: AdministratorId): Result<void, DomainError> { }
  reject(administratorId: AdministratorId, reason: string): Result<void, DomainError> { }
  updateTags(newTags: Tag[]): Result<void, DomainError> { }
}
```

### 2. Learning Session Aggregate（学習セッション集約）

#### 集約構成
- **集約ルート**: LearningSession
- **集約メンバー**: Answer（複数）
- **境界**: 学習セッション内の全回答

#### 責務
- 学習セッション内の回答整合性
- 学習進捗計算
- セッション状態管理

#### 不変条件
1. **セッション状態制約**: Active状態でのみ回答可能
2. **回答順序性**: 回答時刻の順序性保証
3. **クイズ参照整合性**: 有効なQuizIdのみ参照
4. **回答一意性**: 同一クイズへの複数回答は履歴として管理
5. **セッション所有**: 全Answerは単一セッションに属する

```typescript
class LearningSessionAggregate {
  constructor(
    readonly id: SessionId,
    readonly userId: UserId,
    readonly startedAt: Timestamp,
    lastAccessAt: Timestamp,
    answers: Answer[],
    sessionState: LearningSessionState,
    preferences: LearningPreferences
  ) {
    this.ensureInvariants();
  }
  
  private ensureInvariants(): void {
    // 回答時刻の順序性チェック
    for (let i = 1; i < this.answers.length; i++) {
      if (this.answers[i].answeredAt.isBefore(this.answers[i-1].answeredAt)) {
        throw new InvariantViolationError('回答時刻の順序が不正です');
      }
    }
    
    // セッション状態整合性チェック
    if (this.sessionState === LearningSessionState.Completed && this.currentQuizId) {
      throw new InvariantViolationError('完了セッションに進行中クイズは存在できません');
    }
    
    // Answer所有権チェック
    for (const answer of this.answers) {
      if (!answer.sessionId.equals(this.id)) {
        throw new InvariantViolationError('回答は正しいセッションに属する必要があります');
      }
    }
  }
  
  // 集約ルートのメソッド
  answerQuiz(quizId: QuizId, userAnswer: UserAnswer, correctAnswer: CorrectAnswer): Result<AnswerId, DomainError> { }
  endSession(): Result<LearningSessionSummary, DomainError> { }
  getProgress(): LearningProgress { }
}
```

### 3. User Session Aggregate（ユーザーセッション集約）

#### 集約構成
- **集約ルート**: UserSession
- **集約メンバー**: なし（UserSessionのみ）
- **境界**: 匿名ユーザーの識別情報

#### 責務
- 匿名ユーザー識別
- デバイス認証
- セッション管理

#### 不変条件
1. **識別子一意性**: CreatorIdの一意性保証
2. **セッション有効性**: 有効期限内のセッションのみアクティブ
3. **デバイス整合性**: デバイスフィンガープリントの一貫性
4. **匿名性保証**: 個人識別可能情報の除外

```typescript
class UserSessionAggregate {
  constructor(
    readonly id: SessionId,
    readonly creatorId: CreatorId,
    readonly deviceFingerprint: DeviceFingerprint,
    readonly startedAt: Timestamp,
    lastAccessAt: Timestamp,
    sessionState: SessionState
  ) {
    this.ensureInvariants();
  }
  
  private ensureInvariants(): void {
    // セッション有効期限チェック
    const maxAge = Duration.ofDays(30);
    if (this.startedAt.plus(maxAge).isBefore(Timestamp.now())) {
      throw new InvariantViolationError('セッションの有効期限が切れています');
    }
    
    // 匿名性チェック
    if (this.creatorId.containsPersonalInfo()) {
      throw new InvariantViolationError('作成者IDに個人情報が含まれています');
    }
  }
  
  // 集約ルートのメソッド
  updateAccess(): void { }
  expire(): Result<void, DomainError> { }
  validateAccess(): boolean { }
}
```

### 4. Sync Session Aggregate（同期セッション集約）

#### 集約構成
- **集約ルート**: SyncSession
- **集約メンバー**: SyncItem（複数）
- **境界**: オフライン同期の単位

#### 責務
- オフライン/オンライン同期
- 競合解決
- データ整合性保証

#### 不変条件
1. **同期状態整合性**: 同期アイテムの状態一貫性
2. **タイムスタンプ順序**: 同期データの時系列整合性
3. **競合解決規則**: 明確な競合解決戦略
4. **データ完全性**: 同期対象データの完全性保証

```typescript
class SyncSessionAggregate {
  constructor(
    readonly id: SyncSessionId,
    readonly userId: UserId,
    readonly startedAt: Timestamp,
    syncItems: SyncItem[],
    syncState: SyncState
  ) {
    this.ensureInvariants();
  }
  
  private ensureInvariants(): void {
    // 同期アイテム状態の整合性チェック
    if (this.syncState === SyncState.Completed) {
      const pendingItems = this.syncItems.filter(item => 
        item.state === SyncItemState.Pending
      );
      if (pendingItems.length > 0) {
        throw new InvariantViolationError('完了状態に未処理アイテムが存在します');
      }
    }
    
    // タイムスタンプ整合性チェック
    for (const item of this.syncItems) {
      if (item.lastModified.isAfter(Timestamp.now())) {
        throw new InvariantViolationError('未来のタイムスタンプは不正です');
      }
    }
  }
  
  // 集約ルートのメソッド
  addSyncItem(item: SyncItem): Result<void, DomainError> { }
  resolveConflict(itemId: SyncItemId, resolution: ConflictResolution): Result<void, DomainError> { }
  completeSyncSession(): Result<SyncResult, DomainError> { }
}
```

## 集約間の関係

### 集約間通信パターン

#### 1. ドメインイベント経由
```typescript
// Quiz承認時のイベント発行
class QuizAggregate {
  approve(administratorId: AdministratorId): Result<void, DomainError> {
    // ... 承認処理
    
    // ドメインイベント発行
    this.addDomainEvent(new QuizApprovedEvent(
      this.id,
      administratorId,
      Timestamp.now()
    ));
    
    return ok(undefined);
  }
}

// Learning Contextでのイベント処理
class QuizApprovedEventHandler {
  handle(event: QuizApprovedEvent): Promise<void> {
    // 学習可能クイズリストの更新
    await this.updateAvailableQuizzes(event.quizId);
  }
}
```

#### 2. アプリケーションサービス経由
```typescript
class LearningApplicationService {
  async answerQuiz(command: AnswerQuizCommand): Promise<Result<AnswerResult, ApplicationError>> {
    // 1. Quiz集約からクイズ情報取得（読み取り専用）
    const quiz = await this.quizRepository.findById(command.quizId);
    
    // 2. LearningSession集約で回答処理
    const session = await this.learningSessionRepository.findById(command.sessionId);
    const result = session.answerQuiz(command.quizId, command.userAnswer, quiz.correctAnswer);
    
    // 3. 永続化
    await this.learningSessionRepository.save(session);
    
    return result;
  }
}
```

## 集約の永続化戦略

### 1. 単一テーブル集約
```typescript
// Quiz Aggregate → quizzes テーブル
interface QuizRecord {
  id: string;
  question_text: string;
  correct_answer: boolean;
  explanation?: string;
  tags: string; // JSON配列
  status: string;
  creator_id: string;
  created_at: string;
  approved_at?: string;
  approved_by?: string;
}
```

### 2. 複数テーブル集約
```typescript
// Learning Session Aggregate → sessions + answers テーブル
interface SessionRecord {
  id: string;
  user_id: string;
  started_at: string;
  last_access_at: string;
  session_state: string;
  preferences: string; // JSON
}

interface AnswerRecord {
  id: string;
  session_id: string; // FK
  quiz_id: string;
  user_answer: boolean;
  is_correct: boolean;
  answered_at: string;
  response_time_ms: number;
}
```

### 3. リポジトリパターン実装
```typescript
class QuizAggregateRepository implements QuizRepository {
  async save(quiz: QuizAggregate): Promise<void> {
    const record = this.toRecord(quiz);
    
    // 楽観的ロック
    const updated = await this.db.update('quizzes')
      .set(record)
      .where('id', quiz.id.value)
      .where('version', quiz.version);
    
    if (updated === 0) {
      throw new ConcurrencyError('クイズが他のユーザーによって更新されています');
    }
    
    // ドメインイベント発行
    await this.eventPublisher.publishAll(quiz.getDomainEvents());
    quiz.clearDomainEvents();
  }
  
  async findById(id: QuizId): Promise<QuizAggregate | null> {
    const record = await this.db.selectFrom('quizzes')
      .where('id', id.value)
      .selectAll()
      .executeTakeFirst();
      
    return record ? this.fromRecord(record) : null;
  }
}
```

## 集約設計の検証

### 1. 整合性境界の妥当性
- [ ] 集約内の不変条件が明確に定義されている
- [ ] トランザクション境界と集約境界が一致している
- [ ] 集約外への影響が最小限に抑えられている

### 2. パフォーマンス考慮
- [ ] 集約サイズが適切（過度に大きくない）
- [ ] 頻繁にアクセスされるデータが集約内にある
- [ ] 不要なデータロードが発生しない

### 3. ビジネスルール表現
- [ ] 重要なビジネスルールが集約内で表現されている
- [ ] ドメインエキスパートが理解可能な構造
- [ ] 変更に対する影響範囲が明確

### 4. 技術的制約
- [ ] データベーススキーマにマッピング可能
- [ ] 楽観的ロックによる競合制御
- [ ] 適切なインデックス設計

## 将来の拡張考慮

### 1. 集約分割のタイミング
- 集約が複雑になりすぎた場合
- パフォーマンス問題が発生した場合
- 異なるライフサイクルを持つ要素が混在した場合

### 2. 新しい集約の追加
- ユーザー認証機能追加時の User Aggregate
- 統計機能強化時の Analytics Aggregate
- 通知機能追加時の Notification Aggregate

### 3. 集約間関係の進化
- イベント駆動アーキテクチャの強化
- CQRS パターンの部分適用
- マイクロサービス分割時の境界