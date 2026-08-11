---
name: your-quiz-domain
description: Provides Your Quiz domain model knowledge for DDD implementation. Activate when designing or implementing domain entities, value objects, aggregates, bounded contexts, domain events, or ubiquitous language for the quiz application. Contains the 4 bounded contexts (Quiz Management, Quiz Learning, User Session, Offline Sync), 4 aggregates with their invariants, TypeScript Brand type and AggregateRoot patterns, and pointers to the DDD design artifacts in docs/project/ddd-design/.
license: MIT
metadata:
  author: personal
  version: "0.1.0"
compatibility: Requires access to docs/project/ddd-design/ in this repository.
---

# Your Quiz ドメイン知識

## 利用タイミング

- ドメインエンティティ・値オブジェクト・集約を設計・実装するとき（高頻度）
- 境界づけられたコンテキストの責務を確認するとき
- ドメインイベントを設計・実装するとき
- ユビキタス言語の用語を参照・確認するとき
- 集約の不変条件・ビジネスルールを実装するとき

## 確認する入力

- 対象コンテキスト（Quiz Management / Quiz Learning / User Session / Offline Sync）
- 対象の集約・エンティティ・値オブジェクト名
- 操作（entity 設計 / event 設計 / invariant 確認 / TypeScript 型設計）

## Workflow

1. **対象コンテキスト**を特定（下記の境界コンテキスト索引を参照）
2. **集約・エンティティの責務**を確認（`docs/project/ddd-design/2.08_aggregate-design/`）
3. **ユビキタス言語**で用語を統一（`docs/project/ddd-design/2.03_ubiquitous-language/`）
4. **ドメインイベント**が必要なら catalog を参照（`docs/project/ddd-design/2.10_domain-events-catalog/`）
5. `references/bounded-contexts-and-aggregates.md` の TypeScript パターンに従い実装する

## 境界づけられたコンテキスト

| コンテキスト | 役割 | 主要集約 | コンテキストマップ上の位置 |
|------------|------|---------|------------------------|
| **Quiz Management** | クイズ作成・承認・マスターデータ管理（権威的） | Quiz Aggregate | 上流 → Learning / Offline |
| **Quiz Learning** | 学習セッション・回答・進捗管理（中核） | Learning Session Aggregate | 下流 ← Management, User Session |
| **User Session** | 匿名ユーザー識別・セッション管理（支援的） | User Session Aggregate | 上流 → Learning / Offline |
| **Offline Sync** | オフライン同期・競合解決（技術的） | Sync Session Aggregate | 下流 ← 全コンテキスト |

依存方向: 上流から下流へ。コンテキスト間は ID 参照のみ（集約境界を越えない）。

## 主要集約 サマリー

### Quiz Aggregate（権威的）
- **責務**: クイズ内容の品質保証・承認フロー・ライフサイクル管理
- **状態遷移**: 投稿 → 承認 → 公開（強一貫性）
- **設計決定**: 単一エンティティ集約（クイズ≠回答の分離）
- 詳細 → `docs/project/ddd-design/2.08_aggregate-design/`

### Learning Session Aggregate（中核）
- **責務**: 学習体験・回答履歴・学習進捗計算
- **設計決定**: 複合集約（Session + Answer の一体管理）、結果整合性
- **パフォーマンス**: 高頻度アクセス、CQRS 的クエリ分離
- 詳細 → `docs/project/ddd-design/2.08_aggregate-design/`

### User Session Aggregate（支援的）
- **責務**: 匿名ユーザー識別・セッション管理・作成者権限制御
- **設計決定**: 軽量集約、プライバシー重視（個人情報なし）
- **VO**: `DeviceFingerprint`, `CreatorId`
- 詳細 → `docs/project/ddd-design/2.08_aggregate-design/`

### Sync Session Aggregate（技術的）
- **責務**: オフライン/オンライン同期・データ競合解決・整合性保証
- **設計決定**: 技術集約、横断的関心事（全データが同期対象）
- 詳細 → `docs/project/ddd-design/2.08_aggregate-design/`

## Shared Kernel

- **Common Types**: `QuizId`, `SessionId`, `AnswerId`, `UserId`（Brand 型）
- **Domain Events**: 共通 `DomainEvent` インターフェース
- **Error Types**: `DomainError`, `ValidationError`, `BusinessRuleError`, `InvariantViolationError`

## TypeScript 実装パターン（概要）

```typescript
// 識別子型（Brand 型パターン）
type QuizId = Brand<string, 'QuizId'>;
type SessionId = Brand<string, 'SessionId'>;

// 値オブジェクト（不変性・等価性）
class Question {
  private constructor(readonly text: string, readonly length: number) {}
  static create(text: string): Result<Question, ValidationError> { ... }
  equals(other: Question): boolean { return this.text === other.text; }
}

// 集約ルート（ドメインイベント収集）
abstract class AggregateRoot<T> {
  private domainEvents: DomainEvent[] = [];
  protected addDomainEvent(event: DomainEvent): void { ... }
  getDomainEvents(): readonly DomainEvent[] { return [...this.domainEvents]; }
  clearDomainEvents(): void { this.domainEvents = []; }
}
```

詳細パターンは `references/bounded-contexts-and-aggregates.md` を参照。

## ddd-design ドキュメント索引

- [2.00: ドメインモデル全体図](docs/project/ddd-design/2.00_domain-model-overview.md) — Mermaid 図・集約設計・実装指針
- [2.02: ドメイン理解](docs/project/ddd-design/2.02_domain-understanding/)
- [2.03: ユビキタス言語辞書](docs/project/ddd-design/2.03_ubiquitous-language/)
- [2.04: イベントストーミング](docs/project/ddd-design/2.04_event-storming/)
- [2.05: ドメインオブジェクト抽出](docs/project/ddd-design/2.05_domain-object-extraction/)
- [2.08: 集約設計](docs/project/ddd-design/2.08_aggregate-design/) — 各集約の詳細設計
- [2.09: 境界コンテキスト定義](docs/project/ddd-design/2.09_bounded-context-definition/)
- [2.10: ドメインイベントカタログ](docs/project/ddd-design/2.10_domain-events-catalog/)
- [2.11: オントロジー](docs/project/ddd-design/2.11_ontology-creation/)

## 出力形式

- TypeScript コード（Brand 型 / AggregateRoot / Result 型パターン）
- ドメインイベント定義（`DomainEvent` インターフェース準拠）
- 集約の責務・不変条件の説明（ユビキタス言語使用）

## ガードレール

- `docs/project/ddd-design/**` は変更しない（source of truth）
- ユビキタス言語辞書の用語を必ず使用する（独自用語の追加は辞書を先に更新）
- コンテキスト間の依存方向（上流→下流）を守る
- 集約境界を越えた直接参照を避ける（ID 参照のみ）
- 汎用 DDD method（戦略/戦術設計の手順）は `ddd-modeling` skill を参照する

## 評価シナリオ

1. 「クイズ集約を実装したい」→ Quiz Management Context → 2.08_aggregate-design を参照
2. 「学習セッションのドメインイベントは？」→ 2.10_domain-events-catalog を参照
3. 「ユビキタス言語で "Deck" は何？」→ 2.03_ubiquitous-language を参照
4. 「DDD の戦略設計の手順を教えて」→ `ddd-modeling` skill（汎用 method 層）を呼ぶ
5. 「境界コンテキストの依存方向を確認したい」→ 2.09_bounded-context-definition と references/bounded-contexts-and-aggregates.md を参照

## 関連リファレンス

- [references/bounded-contexts-and-aggregates.md](references/bounded-contexts-and-aggregates.md) — コンテキスト・集約の詳細と TypeScript パターン
- [references/ubiquitous-language-quickref.md](references/ubiquitous-language-quickref.md) — 主要用語クイックリファレンス
- 関連 skill（汎用 method 層）: `ddd-modeling`
- 関連 skill（project 事実層）: `your-quiz-api`（ドメイン → API の橋渡し）, `your-quiz-project-knowledge`（全体索引）
