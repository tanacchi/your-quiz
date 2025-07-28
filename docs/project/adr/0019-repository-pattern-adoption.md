# ADR-0019: リポジトリパターン採用決定

## Status

Proposed

## Context

### Background

- ドメイン層の純粋性保持のため、永続化機構からドメインロジックを分離する必要
- 集約の永続化において、適切な抽象化レイヤーの提供が重要
- テスタビリティ向上とインフラ技術への依存軽減が求められる
- SQLite→PostgreSQL移行等の技術変更に対する柔軟性確保が必要

### Drivers

- **ドメイン層独立性**: インフラ技術への依存排除
- **テスタビリティ**: モック・スタブによる単体テスト容易性
- **技術変更対応**: データベース技術変更への適応性
- **集約整合性**: 集約単位での永続化制御
- **トランザクション境界**: 集約境界とトランザクション境界の一致

## Decision

### Chosen Option

## 集約単位のリポジトリパターン採用

各集約に対して専用のリポジトリインターフェースを定義し、ドメイン層とインフラ層を分離する：

1. **QuizRepository** - Quiz Aggregate用
2. **LearningSessionRepository** - Learning Session Aggregate用
3. **UserSessionRepository** - User Session Aggregate用
4. **SyncSessionRepository** - Sync Session Aggregate用

### Alternatives Considered

| 選択肢 | メリット | デメリット | 独立性 | テスタビリティ | 柔軟性 | 評価 |
|--------|----------|------------|--------|-------------|--------|------|
| **集約単位リポジトリ** | **・ドメイン純粋性確保**<br>**・明確な責務分離**<br>**・テスト容易性**<br>**・技術変更対応** | **・抽象化のオーバーヘッド**<br>**・実装工数増加** | **高** | **高** | **高** | **★★★** |
| 汎用リポジトリ | ・実装の共通化<br>・コード量削減<br>・DRY原則適用 | ・型安全性の低下<br>・集約特性無視<br>・保守性低下 | 中 | 中 | 中 | ★★ |
| 直接データアクセス | ・実装の単純さ<br>・高いパフォーマンス<br>・学習コスト最小 | ・ドメイン層汚染<br>・テスト困難<br>・技術変更困難 | 低 | 低 | 低 | ★ |
| ORM直接利用 | ・機能の豊富さ<br>・開発効率向上<br>・自動マッピング | ・ドメインモデル制約<br>・ORM依存<br>・N+1問題等のリスク | 低 | 中 | 中 | ★★ |

## Consequences

### Positive

- **ドメイン層の純粋性**: インフラ技術からの完全な分離
- **テスタビリティ**: モック実装による独立したテスト
- **技術変更柔軟性**: データベース変更時の影響最小化
- **集約整合性**: 集約単位での適切な永続化制御
- **型安全性**: TypeScriptによる強い型付けの恩恵
- **明確な責務**: 永続化ロジックの集約化

### Negative

- **実装コスト**: インターフェースと実装の両方が必要
- **抽象化オーバーヘッド**: 実行時の若干のパフォーマンス影響
- **学習コスト**: リポジトリパターンの理解が必要
- **デバッグ複雑性**: 抽象化による間接参照の増加

### Neutral

- **楽観的ロック**: 並行制御機構の実装が必要
- **ユニットオブワーク**: トランザクション管理パターンの検討
- **クエリ最適化**: リポジトリ層でのパフォーマンス考慮

### Risks and Mitigation

| リスク | 発生確率 | 影響度 | 対策 |
|--------|----------|--------|------|
| パフォーマンス劣化 | 低 | 中 | プロファイリング、クエリ最適化 |
| 抽象化の過度 | 中 | 中 | 実用性重視、YAGNI原則適用 |
| 実装の分散 | 高 | 低 | 共通基底クラス、ヘルパーメソッド活用 |

## Implementation Notes

### Repository Interface Design

#### 1. QuizRepository

```typescript
interface QuizRepository {
  save(quiz: QuizAggregate): Promise<void>;
  findById(id: QuizId): Promise<QuizAggregate | null>;
  findByCreatorId(creatorId: CreatorId): Promise<QuizAggregate[]>;
  findApprovedQuizzes(): Promise<QuizAggregate[]>;
  delete(id: QuizId): Promise<void>;
}
```

#### 2. LearningSessionRepository

```typescript
interface LearningSessionRepository {
  save(session: LearningSessionAggregate): Promise<void>;
  findById(id: SessionId): Promise<LearningSessionAggregate | null>;
  findByUserId(userId: UserId): Promise<LearningSessionAggregate[]>;
  findActiveSession(userId: UserId): Promise<LearningSessionAggregate | null>;
}
```

#### 3. UserSessionRepository

```typescript
interface UserSessionRepository {
  save(session: UserSessionAggregate): Promise<void>;
  findById(id: SessionId): Promise<UserSessionAggregate | null>;
  findByCreatorId(creatorId: CreatorId): Promise<UserSessionAggregate | null>;
  findByDeviceFingerprint(fingerprint: DeviceFingerprint): Promise<UserSessionAggregate[]>;
}
```

#### 4. SyncSessionRepository

```typescript
interface SyncSessionRepository {
  save(session: SyncSessionAggregate): Promise<void>;
  findById(id: SyncSessionId): Promise<SyncSessionAggregate | null>;
  findPendingSessions(userId: UserId): Promise<SyncSessionAggregate[]>;
}
```

### Implementation Patterns

#### 1. 共通基底インターフェース

```typescript
interface BaseRepository<TAggregate, TId> {
  save(aggregate: TAggregate): Promise<void>;
  findById(id: TId): Promise<TAggregate | null>;
}
```

#### 2. 楽観的ロック対応

```typescript
class QuizRepositoryImpl implements QuizRepository {
  async save(quiz: QuizAggregate): Promise<void> {
    const record = this.toRecord(quiz);
    
    const updated = await this.db.update('quizzes')
      .set(record)
      .where('id', quiz.id.value)
      .where('version', quiz.version);

    if (updated === 0) {
      throw new ConcurrencyError('クイズが他のユーザーによって更新されています');
    }

    await this.publishDomainEvents(quiz);
  }
}
```

#### 3. 集約再構築

```typescript
class QuizRepositoryImpl implements QuizRepository {
  private fromRecord(record: QuizRecord): QuizAggregate {
    return new QuizAggregate(
      new QuizId(record.id),
      new Question(record.question_text),
      new CorrectAnswer(record.correct_answer),
      record.explanation ? new Explanation(record.explanation) : undefined,
      JSON.parse(record.tags).map(tag => new Tag(tag)),
      QuizStatus.fromString(record.status),
      new CreatorId(record.creator_id),
      new Timestamp(record.created_at),
      record.approved_at ? new Timestamp(record.approved_at) : undefined,
      record.approved_by ? new AdministratorId(record.approved_by) : undefined
    );
  }
}
```

### Technology Integration

#### 1. Drizzle ORM活用

```typescript
class LearningSessionRepositoryImpl implements LearningSessionRepository {
  constructor(private db: DrizzleDB) {}

  async save(session: LearningSessionAggregate): Promise<void> {
    await this.db.transaction(async (tx) => {
      // セッション保存
      await tx.insert(sessions).values(this.toSessionRecord(session))
        .onConflictDoUpdate({
          target: sessions.id,
          set: { /* 更新内容 */ }
        });

      // 回答保存
      if (session.answers.length > 0) {
        await tx.insert(answers).values(
          session.answers.map(answer => this.toAnswerRecord(answer))
        ).onConflictDoNothing();
      }
    });
  }
}
```

#### 2. SQLite対応

```typescript
class SQLiteQuizRepository implements QuizRepository {
  constructor(private db: SQLiteDatabase) {}

  async findApprovedQuizzes(): Promise<QuizAggregate[]> {
    const records = await this.db.all(`
      SELECT * FROM quizzes 
      WHERE status = ? 
      ORDER BY approved_at DESC
    `, ['Approved']);

    return records.map(record => this.fromRecord(record));
  }
}
```

### Action Items

- [ ] 各リポジトリインターフェースの詳細定義
- [ ] Drizzle ORMを使用した実装
- [ ] 楽観的ロック機構の実装
- [ ] トランザクション管理パターンの実装
- [ ] モックリポジトリの作成（テスト用）
- [ ] パフォーマンステストの実施

### Timeline

- **決定日**: 2025-07-28
- **実装開始**: スケルトン実装工程開始時
- **完了予定**: TDD実装工程完了時

## References

- [リポジトリ設計詳細](docs/project/ddd-design/repositories/)
- [集約設計](docs/project/ddd-design/aggregates/README.md)
- [ORM選定ADR](docs/project/adr/0009-orm-selection.md)
- [データベース選定ADR](docs/project/adr/0007-database.md)
- [Martin Fowler "Repository Pattern"](https://martinfowler.com/eaaCatalog/repository.html)
- [Evans "Domain-Driven Design" Chapter 6](https://domainlanguage.com/ddd/)

---
**Created**: 2025-07-28
**Last Updated**: 2025-07-28
**Authors**: Claude Code
**Reviewers**: [@tanacchi](https://github.com/tanacchi)
