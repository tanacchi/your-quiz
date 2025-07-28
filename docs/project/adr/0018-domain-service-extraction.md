# ADR-0018: ドメインサービス抽出決定

## Status

Proposed

## Context

### Background

- DDD設計において、エンティティや値オブジェクトに属さないドメインロジックを適切に配置する必要
- クイズアプリケーションにおいて、複数の集約や外部システムにまたがるビジネスロジックが存在
- ドメイン層の純粋性を保ちながら、複雑なビジネスルールを表現する必要

### Drivers

- **複数集約操作**: 単一集約では完結しないビジネスロジック
- **複雑な計算**: エンティティ単体では表現が困難な計算処理
- **外部連携ロジック**: 外部システムとの連携に関するドメインルール
- **ビジネスルール集約**: 散在するビジネスルールの集約化
- **テスタビリティ**: ピュアなドメインロジックとしてのテスト容易性

## Decision

### Chosen Option

**4つの主要ドメインサービスの抽出**

以下のドメインサービスを各コンテキストに配置する：

1. **QuizDuplicationService** - Quiz Management Context
2. **LearningProgressCalculationService** - Quiz Learning Context
3. **AnonymousUserIdentificationService** - User Session Context
4. **ConflictResolutionService** - Offline Sync Context

### Alternatives Considered

| 選択肢 | メリット | デメリット | 表現力 | 保守性 | テスタビリティ | 評価 |
|--------|----------|------------|--------|--------|-------------|------|
| **専用ドメインサービス** | **・ビジネスルール明確化**<br>**・責務の適切な配置**<br>**・テスト容易性**<br>**・再利用性向上** | **・追加の抽象化**<br>**・設計複雑度増加** | **高** | **高** | **高** | **★★★** |
| エンティティ内配置 | ・シンプルな構造<br>・理解しやすい<br>・追加抽象化不要 | ・責務の肥大化<br>・複数集約操作困難<br>・テスト困難 | 中 | 低 | 中 | ★★ |
| アプリケーション層配置 | ・実装の単純さ<br>・技術的制約回避<br>・迅速な開発 | ・ドメインロジック流出<br>・ビジネスルール分散<br>・ドメイン純粋性低下 | 低 | 低 | 低 | ★ |
| ユーティリティクラス | ・静的メソッド活用<br>・依存注入不要<br>・シンプルな使用 | ・状態管理困難<br>・テスト困難<br>・オブジェクト指向原則違反 | 低 | 中 | 低 | ★ |

## Consequences

### Positive

- **ビジネスルールの明確化**: 複雑なドメインロジックが適切に表現される
- **責務の適切な配置**: エンティティの肥大化を防ぎ、単一責任原則を維持
- **テスタビリティ向上**: 独立したサービスとして単体テストが容易
- **再利用性**: 複数の場所から利用可能なドメインロジック
- **ドメイン層の純粋性**: インフラ依存を避けつつビジネスルールを表現

### Negative

- **抽象化の増加**: 追加のインターフェースと実装が必要
- **設計複雑度**: サービス間の依存関係管理が必要
- **学習コスト**: ドメインサービスパターンの理解が必要

### Neutral

- **依存注入**: サービス間の依存関係を適切に管理する必要
- **ライフサイクル管理**: サービスインスタンスの管理方針決定が必要

### Risks and Mitigation

| リスク | 発生確率 | 影響度 | 対策 |
|--------|----------|--------|------|
| ドメインサービスの肥大化 | 中 | 中 | 単一責任原則の徹底、定期的な分割検討 |
| 過度な抽象化 | 低 | 中 | ビジネス価値に基づく抽出判断 |
| サービス間依存の複雑化 | 中 | 中 | 依存関係の可視化、循環参照の回避 |

## Implementation Notes

### Domain Service Implementations

#### 1. QuizDuplicationService
```typescript
interface QuizDuplicationService {
  isDuplicate(newQuiz: Quiz, existingQuizzes: Quiz[]): Promise<DuplicationResult>;
  calculateSimilarity(quiz1: Quiz, quiz2: Quiz): SimilarityScore;
}
```

**責務**: クイズ重複判定、類似度計算
**ビジネスルール**: 80%以上の類似度で重複判定

#### 2. LearningProgressCalculationService
```typescript
interface LearningProgressCalculationService {
  calculateProgress(answers: Answer[]): LearningProgress;
  recommendNextQuiz(userId: UserId, preferences: LearningPreferences): Promise<QuizId[]>;
  calculateLearningEfficiency(session: LearningSession): EfficiencyMetrics;
}
```

**責務**: 学習進捗計算、推奨クイズ選定、学習効率測定
**ビジネスルール**: 正答率・回答時間・継続性による総合評価

#### 3. AnonymousUserIdentificationService
```typescript
interface AnonymousUserIdentificationService {
  generateCreatorId(deviceFingerprint: DeviceFingerprint): CreatorId;
  validateCreatorAccess(creatorId: CreatorId, quizId: QuizId): Promise<boolean>;
  mergeUserSessions(primarySession: UserSession, secondarySession: UserSession): Promise<UserSession>;
}
```

**責務**: 匿名ユーザー識別、アクセス権限確認、セッション統合
**ビジネスルール**: デバイス特性による識別、作成者権限の確認

#### 4. ConflictResolutionService
```typescript
interface ConflictResolutionService {
  resolveQuizConflict(localQuiz: Quiz, remoteQuiz: Quiz): ConflictResolution;
  resolveAnswerConflict(localAnswer: Answer, remoteAnswer: Answer): ConflictResolution;
  generateResolutionStrategy(conflictType: ConflictType): ResolutionStrategy;
}
```

**責務**: データ競合解決、解決戦略決定
**ビジネスルール**: 最新タイムスタンプ優先、ユーザー選択による解決

### Service Implementation Patterns

#### 1. インターフェース分離
```typescript
// ドメイン層（インターフェース）
interface LearningProgressCalculationService {
  calculateProgress(answers: Answer[]): LearningProgress;
}

// インフラ層（実装）
class LearningProgressCalculationServiceImpl implements LearningProgressCalculationService {
  calculateProgress(answers: Answer[]): LearningProgress {
    // 具体的な計算ロジック
  }
}
```

#### 2. 依存注入対応
```typescript
class LearningSessionAggregate {
  constructor(
    private progressService: LearningProgressCalculationService
  ) {}

  getProgress(): LearningProgress {
    return this.progressService.calculateProgress(this.answers);
  }
}
```

### Action Items

- [ ] 各ドメインサービスのインターフェース定義
- [ ] サービス実装クラスの作成
- [ ] 依存注入設定
- [ ] 単体テスト作成
- [ ] 統合テストでの検証

### Timeline

- **決定日**: 2025-07-28
- **実装開始**: TDD実装工程開始時
- **完了予定**: TDD実装工程完了時

## References

- [ドメインサービス設計](docs/project/ddd-design/domain-services/)
- [集約設計詳細](docs/project/ddd-design/aggregates/README.md)
- [Eric Evans "Domain-Driven Design" Chapter 5](https://domainlanguage.com/ddd/)
- [Martin Fowler "Domain Service"](https://martinfowler.com/bliki/DomainService.html)

---
**Created**: 2025-07-28
**Last Updated**: 2025-07-28
**Authors**: Claude Code
**Reviewers**: [@tanacchi](https://github.com/tanacchi)