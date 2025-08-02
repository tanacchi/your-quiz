# ADR-0017: 集約設計とルート決定

## Status

Proposed

## Context

### Background

- DDD戦術パターンにおいて、適切な集約設計はドメインの整合性境界とトランザクション境界を明確化する重要な要素
- クイズアプリケーションの複数のドメインエンティティを適切にグループ化し、ビジネス不変条件を保証する必要
- 4つの境界づけられたコンテキストそれぞれに対して、最適な集約設計を決定する必要

### Drivers

- **整合性境界**: ビジネス不変条件を保証する範囲の明確化
- **トランザクション境界**: 強一貫性が必要な操作の範囲確定
- **パフォーマンス**: 集約サイズによる読み書き性能への影響
- **保守性**: 集約内の複雑度管理と理解しやすさ
- **技術制約**: SQLiteの制限とトランザクション特性

## Decision

### Chosen Option

## 4つの主要集約による設計

各境界づけられたコンテキストに1つずつ、計4つの集約を設計する：

1. **Quiz Aggregate（クイズ集約）** - Quiz Management Context
2. **Learning Session Aggregate（学習セッション集約）** - Quiz Learning Context
3. **User Session Aggregate（ユーザーセッション集約）** - User Session Context
4. **Sync Session Aggregate（同期セッション集約）** - Offline Sync Context

### Alternatives Considered

| 選択肢 | メリット | デメリット | 整合性 | パフォーマンス | 複雑度 | 評価 |
|--------|----------|------------|--------|-------------|--------|------|
| **4集約設計** | **・明確な責務分離**<br>**・適切な整合性境界**<br>**・理解しやすいサイズ**<br>**・トランザクション境界一致** | **・集約間調整の複雑さ**<br>**・設計時間の増加** | **高** | **高** | **中** | **★★★** |
| 6+集約設計 | ・極めて細かい責務分離<br>・最小限の複雑度<br>・高い独立性 | ・過度な分割<br>・集約間調整の複雑化<br>・パフォーマンス劣化 | 中 | 低 | 高 | ★ |
| 2-3集約設計 | ・シンプルな構造<br>・開発の高速性<br>・少ない集約間調整 | ・責務の混在<br>・大きな整合性境界<br>・複雑なビジネスルール | 中 | 中 | 高（内部） | ★★ |
| 単一集約設計 | ・最小限の複雑性<br>・トランザクション単純<br>・開発の高速性 | ・極端に大きな境界<br>・保守性の低下<br>・拡張性の制限 | 低 | 低 | 高 | ★ |

## Consequences

### Positive

- **明確な整合性境界**: 各集約が明確なビジネス不変条件を保証
- **適切なトランザクション範囲**: 集約=トランザクション境界による一貫性確保
- **理解しやすいサイズ**: 各集約が人間が理解できる複雑度に収まる
- **独立したテスト**: 集約単位での単体テストが容易
- **拡張性**: 将来的な機能追加時の影響範囲が限定的
- **パフォーマンス**: 適切なサイズによる読み書き性能の最適化

### Negative

- **集約間調整の複雑さ**: 集約を跨ぐ操作の設計が必要
- **初期設計コスト**: 4つの集約設計に時間が必要
- **一貫性の結果的一貫性**: 集約間は最終的一貫性への対応が必要
- **ドメインイベント管理**: 集約間通信のイベント設計が必要

### Neutral

- **楽観的ロック**: 並行制御のための仕組みが必要
- **リポジトリパターン**: 各集約に対応するリポジトリ実装が必要
- **集約ライフサイクル**: 集約の作成・更新・削除の管理が必要

### Risks and Mitigation

| リスク | 発生確率 | 影響度 | 対策 |
|--------|----------|--------|------|
| 不適切な集約境界 | 中 | 高 | ビジネスルール検証、定期的な境界見直し |
| 集約間一貫性の複雑化 | 高 | 中 | ドメインイベント、Sagaパターンの採用 |
| パフォーマンス劣化 | 低 | 中 | 適切なインデックス、クエリ最適化 |
| 並行制御の問題 | 中 | 中 | 楽観的ロック、リトライ機構の実装 |

## Implementation Notes

### Aggregate Design Principles

#### 1. 整合性境界

- 集約内の不変条件を常に保証
- トランザクション境界と一致
- 強一貫性の要求範囲

#### 2. 集約ルート経由アクセス

- 集約への操作は全て集約ルートから
- 内部エンティティへの直接アクセス禁止
- カプセル化の徹底

#### 3. ID参照原則

- 他集約への参照はIDのみ
- 集約間の結合度最小化
- 独立した永続化

#### 4. 最小サイズ

- 必要最小限の要素のみ含める
- パフォーマンスとスケーラビリティの確保

### Individual Aggregate Details

#### Quiz Aggregate

- **集約ルート**: Quiz
- **主要不変条件**: 問題文制約、ステータス遷移制御、承認者必須
- **責務**: クイズ内容整合性、承認フロー制御

#### Learning Session Aggregate

- **集約ルート**: LearningSession
- **集約メンバー**: Answer（複数）
- **主要不変条件**: セッション状態制約、回答順序性、クイズ参照整合性
- **責務**: 学習セッション内回答整合性、学習進捗計算

#### User Session Aggregate

- **集約ルート**: UserSession
- **主要不変条件**: 識別子一意性、セッション有効性、匿名性保証
- **責務**: 匿名ユーザー識別、デバイス認証

#### Sync Session Aggregate

- **集約ルート**: SyncSession
- **集約メンバー**: SyncItem（複数）
- **主要不変条件**: 同期状態整合性、タイムスタンプ順序、競合解決規則
- **責務**: オフライン/オンライン同期、競合解決

### Inter-Aggregate Communication

#### 1. ドメインイベント経由

```typescript
// Quiz承認時のイベント発行
class QuizAggregate {
  approve(administratorId: AdministratorId): Result<void, DomainError> {
    this.addDomainEvent(new QuizApprovedEvent(this.id, administratorId, Timestamp.now()));
    return ok(undefined);
  }
}
```

#### 2. アプリケーションサービス経由

```typescript
class LearningApplicationService {
  async answerQuiz(command: AnswerQuizCommand): Promise<Result<AnswerResult, ApplicationError>> {
    // 集約間の調整処理
  }
}
```

### Action Items

- [ ] 各集約のTypeScriptインターフェース定義
- [ ] 集約ルートの不変条件実装
- [ ] リポジトリパターン実装
- [ ] ドメインイベント機構実装
- [ ] 楽観的ロック機構実装
- [ ] 集約間通信パターン実装

### Timeline

- **決定日**: 2025-07-28
- **実装開始**: API設計工程開始時
- **完了予定**: スケルトン実装工程完了時

## References

- [集約設計詳細](docs/project/ddd-design/aggregates/README.md)
- [エンティティ設計](docs/project/ddd-design/entities/)
- [ドメインモデル概要](docs/project/ddd-design/domain-model-overview.md)
- [境界づけられたコンテキスト](docs/project/ddd-design/bounded-contexts/README.md)
- [Vaughn Vernon "Effective Aggregate Design"](https://dddcommunity.org/library/vernon_2011/)
- [Martin Fowler "DDD Aggregate"](https://martinfowler.com/bliki/DDD_Aggregate.html)

---
**Created**: 2025-07-28
**Last Updated**: 2025-07-28
**Authors**: Claude Code
**Reviewers**: [@tanacchi](https://github.com/tanacchi)
