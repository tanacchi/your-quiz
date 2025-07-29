# 境界づけられたコンテキスト定義フォーマット（推奨案）

## 目的

- DDD 2024年ベストプラクティスに基づき、Event Storming、Bounded Context Canvas、Context Mapping、Team Topologyを統合した包括的なアプローチで境界づけられたコンテキストを定義し、現代的なマイクロサービスアーキテクチャとチーム構造に適合した実装可能な設計成果物を作成する

## 遵守事項

- Event Stormingによる協働的な境界発見を必須とする
- Conway's Lawを考慮したチーム構造との整合性を確保する
- Domain Eventsによる疎結合通信設計を行う
- ユビキタス言語の一貫性を保証する
- 1つのBounded Context = 1つのMicroservice の原則を適用する
- 集約より大きく、ドメイン全体より小さい適切なサイズを維持する

## アウトプット出力先

### 基本方針

境界づけられたコンテキスト定義成果物は、戦略的設計の中核として、`docs/project/ddd-design/bounded-contexts/` ディレクトリに体系的に整理し、後続の戦術的設計への明確な指針を提供する。

### 出力先ディレクトリ構造

```text
docs/project/ddd-design/bounded-contexts/
├── README.md                              # コンテキスト概要とナビゲーション
├── discovery/                             # 発見プロセス記録
│   ├── event-storming-workshop.md         # Event Stormingワークショップ結果
│   ├── pivotal-events-analysis.md         # 重要境界イベント分析
│   └── domain-language-alignment.md       # ドメイン言語整合性確認
├── contexts/                              # 個別コンテキスト定義
│   ├── {context-name}.context.md          # 各コンテキスト詳細定義
│   └── {context-name}.canvas.md           # Bounded Context Canvas
├── mapping/                               # コンテキスト間関係
│   ├── context-map.md                     # Context Map全体図
│   ├── integration-patterns.md            # 統合パターン定義
│   └── team-topology-alignment.md         # チーム構造との整合性確認
└── evolution/                             # 進化戦略
    ├── bounded-context-evolution.md       # コンテキスト進化計画
    └── migration-strategy.md              # 移行戦略
```

### ファイル命名規則

- **コンテキスト定義**: `{context-name}.context.md`
- **Canvas定義**: `{context-name}.canvas.md`
- **発見プロセス**: `{process-name}-{content-type}.md`

## 境界づけられたコンテキスト定義の手順

### フェーズ1: 協働的発見プロセス

#### 1.1 Event Storming Workshop実施

**実施期間**: 1-2日間（Big Picture + Design Level）
**参加者**: ドメインエキスパート、アーキテクト、開発チーム、プロダクトオーナー

##### Big Picture Event Storming（テンプレート）

```markdown
## Domain Events Discovery

| Event Name | Trigger | Involved Actors | Business Value | Context Hint | Priority |
|------------|---------|-----------------|----------------|--------------|----------|
| [EventName] | [Trigger condition] | [Actor list] | [Business value] | [Potential context] | High/Medium/Low |

## Command & Aggregate Identification

| Command | Target Aggregate | Resulting Event | Business Rule | Context Ownership | Complexity |
|---------|------------------|-----------------|---------------|-------------------|------------|
| [CommandName] | [AggregateName] | [EventName] | [Business rule] | [Context candidate] | High/Medium/Low |

## Business Process Flow

| Process Step | Events Involved | Decision Points | Exception Handling | Context Boundary Hints |
|--------------|-----------------|-----------------|-------------------|----------------------|
| [Process step] | [Event sequence] | [Decision criteria] | [Exception flow] | [Boundary indicators] |
```

#### 1.2 Pivotal Events Analysis（境界発見の核心）

**目的**: コンテキスト境界を示す重要なイベントを特定する

```markdown
## Pivotal Events Matrix

| Pivotal Event | Context Before | Context After | Boundary Reason | Integration Pattern | Team Impact |
|---------------|----------------|----------------|-----------------|-------------------|--------------|
| [EventName] | [Source context] | [Target context] | [Why boundary exists] | [How to integrate] | [Team changes needed] |

## Context Transition Analysis

| State Before | Pivotal Event | State After | Responsibility Transfer | Consistency Requirements | Business Rules Change |
|--------------|---------------|-------------|------------------------|-------------------------|----------------------|
| [Before state] | [Event] | [After state] | [What transfers] | [Strong/Eventually consistent] | [Rule changes] |
```

#### 1.3 Domain Language Alignment

**重要**: ユビキタス言語の境界を明確化する

```markdown
## Ubiquitous Language Mapping

| Term | Context A Meaning | Context B Meaning | Translation Needed | Shared Kernel Candidate |
|------|-------------------|-------------------|-------------------|------------------------|
| [Term] | [Meaning in A] | [Meaning in B] | Yes/No | Yes/No |

## Language Boundary Indicators

| Language Boundary | Contexts Involved | Communication Gap | Resolution Strategy |
|-------------------|-------------------|-------------------|-------------------|
| [Boundary description] | [Context list] | [Gap description] | [How to resolve] |
```

### フェーズ2: コンテキスト候補モデリング

#### 2.1 Context Candidate Definition

```markdown
## Context Candidate Analysis

| Context Candidate | Core Domain Events | Core Aggregates | Primary Responsibility | Team Assignment | Size Assessment |
|-------------------|-------------------|-----------------|----------------------|-----------------|-----------------|
| [ContextName] | [Event list] | [Aggregate list] | [Main responsibility] | [Team name] | Appropriate/Too Large/Too Small |

## Context Cohesion Analysis

| Context | Internal Cohesion | External Coupling | Business Capability | Technology Alignment | Evolution Independence |
|---------|------------------|-------------------|--------------------|--------------------|----------------------|
| [ContextName] | High/Medium/Low | High/Medium/Low | [Capability description] | [Tech stack fit] | High/Medium/Low |
```

#### 2.2 Context Sizing Guidelines

**原則**: 
- Bounded Context ≥ Aggregate
- Bounded Context ≤ Domain
- 1 Bounded Context = 1 Team (理想)
- 1 Bounded Context = 1 Microservice

```markdown
## Context Size Validation

| Context | Aggregate Count | Team Size | Development Velocity | Operational Complexity | Verdict |
|---------|----------------|-----------|----------------------|----------------------|---------|
| [ContextName] | [Count] | [Team size] | [Velocity assessment] | [Ops complexity] | Appropriate/Split/Merge |
```

### フェーズ3: Bounded Context Canvas作成

#### 3.1 Standard Canvas Template

各コンテキストに対して以下のcanvasを作成する：

```markdown
# Bounded Context Canvas: [Context Name]

## Strategic Classification
- **Domain Type**: Core Domain / Supporting Domain / Generic Subdomain
- **Business Criticality**: High / Medium / Low
- **Evolution Stage**: Genesis / Custom Built / Product / Commodity

## Purpose & Responsibility
- **Purpose**: [Why this context exists]
- **Key Responsibilities**: [What this context does]
- **Success Metrics**: [How we measure success]

## Domain Model
- **Core Aggregates**: [Main business entities]
- **Key Value Objects**: [Important value objects]
- **Domain Services**: [Complex business logic]
- **Domain Events**: [Published events]

## Ubiquitous Language
| Term | Definition | Synonyms | Usage Context |
|------|------------|----------|---------------|
| [Term] | [Definition] | [Alternative terms] | [When used] |

## Business Decisions
- **Critical Business Rules**: [Key business constraints]
- **Policy Decisions**: [Important policies]
- **Assumptions**: [Key assumptions made]

## Communication Patterns

### Inbound Communication
| Source Context | Message Type | Content | Frequency | SLA Requirements |
|----------------|--------------|---------|-----------|------------------|
| [Source] | Command/Event/Query | [Message content] | [How often] | [Performance needs] |

### Outbound Communication  
| Target Context | Message Type | Content | Delivery Guarantee | Business Impact |
|----------------|--------------|---------|-------------------|-----------------|
| [Target] | Command/Event/Query | [Message content] | [At-least-once/Exactly-once] | [Impact if fails] |

## Team Topology Alignment
- **Team Assignment**: [Which team owns this]
- **Team Type**: Stream-aligned / Platform / Enabling / Complicated-subsystem
- **Interaction Modes**: Collaboration / X-as-a-Service / Facilitating
- **Cognitive Load**: [Assessment of complexity]

## Technology Choices
- **Primary Technology Stack**: [Main technologies]
- **Data Storage**: [Database choices]
- **Integration Technology**: [How it integrates]
- **Deployment Model**: [How it's deployed]

## Quality Attributes
- **Performance Requirements**: [Speed, throughput needs]
- **Availability Requirements**: [Uptime needs]
- **Consistency Requirements**: [Strong/Eventual consistency]
- **Security Requirements**: [Security considerations]
```

### フェーズ4: Context Mapping & Integration Design

#### 4.1 Context Map Creation

```markdown
# Context Map

## Context Relationships Overview

| Upstream Context | Downstream Context | Relationship Pattern | Integration Style | Evolution Strategy |
|------------------|-------------------|---------------------|-------------------|-------------------|
| [Upstream] | [Downstream] | Partnership/Customer-Supplier/Conformist/Anti-corruption Layer/Open Host Service/Shared Kernel | Synchronous/Asynchronous/Event-driven | [How relationship evolves] |

## Integration Patterns Detail

### Pattern: Customer-Supplier
| Upstream | Downstream | Service Contract | SLA | Change Management |
|----------|------------|------------------|-----|-------------------|
| [Context A] | [Context B] | [Contract definition] | [Performance SLA] | [How changes managed] |

### Pattern: Anti-Corruption Layer
| Protected Context | External Context | Translation Layer | Business Logic Protection | Maintenance Strategy |
|-------------------|------------------|-------------------|-------------------------|---------------------|
| [Internal] | [External] | [How data translated] | [Business rules protected] | [How ACL maintained] |

### Pattern: Shared Kernel
| Context A | Context B | Shared Elements | Change Coordination | Risk Management |
|-----------|-----------|-----------------|-------------------|------------------|
| [Context A] | [Context B] | [Shared code/data] | [How changes coordinated] | [Risks and mitigation] |
```

#### 4.2 Domain Message Flow Design

```markdown
# Domain Message Flow Architecture

## Event-Driven Communication Design

| Source Context | Target Context | Message Type | Event Schema | Routing Strategy | Error Handling |
|----------------|----------------|--------------|--------------|------------------|----------------|
| [Source] | [Target] | Command/Event/Query | [Schema definition] | [How routed] | [Error strategy] |

## Message Delivery Guarantees

| Message Flow | Delivery Guarantee | Idempotency | Ordering | Retry Strategy | Dead Letter Handling |
|--------------|-------------------|-------------|----------|----------------|---------------------|
| [Source → Target] | At-least-once/Exactly-once/At-most-once | Required/Not Required | Required/Not Required | [Retry policy] | [DLQ strategy] |

## Saga Orchestration (if applicable)

| Saga Name | Participating Contexts | Compensation Logic | Failure Scenarios | Monitoring Strategy |
|-----------|----------------------|-------------------|-------------------|-------------------|
| [Saga name] | [Context list] | [Rollback logic] | [Failure cases] | [How monitored] |
```

### フェーズ5: Team Topology Alignment

#### 5.1 Conway's Law Consideration

```markdown
# Team Topology & Conway's Law Alignment

## Team-Context Mapping

| Team Name | Team Type | Owned Contexts | Interaction Patterns | Communication Frequency |
|-----------|-----------|----------------|---------------------|----------------------|
| [Team name] | Stream-aligned/Platform/Enabling/Complicated-subsystem | [Context list] | [How they interact] | [How often] |

## Team Interaction Assessment

| Team A | Team B | Interaction Mode | Communication Overhead | Coupling Risk | Optimization Needed |
|--------|--------|------------------|----------------------|---------------|-------------------|
| [Team A] | [Team B] | Collaboration/X-as-a-Service/Facilitating | High/Medium/Low | High/Medium/Low | Yes/No |

## Cognitive Load Analysis

| Team | Context Complexity | Technology Diversity | Domain Complexity | Total Load | Action Required |
|------|-------------------|-------------------|------------------|------------|-----------------|
| [Team] | High/Medium/Low | High/Medium/Low | High/Medium/Low | Appropriate/High/Low | [Action needed] |
```

### フェーズ6: 進化戦略定義

#### 6.1 Context Evolution Strategy

```markdown
# Bounded Context Evolution Strategy

## Context Lifecycle Management

| Context | Current Stage | Target Stage | Evolution Path | Timeline | Success Criteria |
|---------|---------------|--------------|----------------|----------|------------------|
| [Context] | [Current] | [Target] | [How to evolve] | [When] | [Success measures] |

## Split/Merge Strategy

| Current Context | Action | Resulting Contexts | Business Reason | Technical Reason | Migration Plan |
|-----------------|--------|-------------------|-----------------|------------------|----------------|
| [Context] | Split/Merge | [New contexts] | [Business driver] | [Technical driver] | [How to migrate] |

## API Versioning Strategy

| Context | API Versioning Approach | Backward Compatibility | Migration Support | Deprecation Policy |
|---------|------------------------|------------------------|-------------------|-------------------|
| [Context] | [Versioning strategy] | [Compatibility level] | [Migration tools] | [Deprecation rules] |
```

## 完了判定基準

### 必須要件

- Event Stormingワークショップが実施され、結果が文書化されていること
- Pivotal Eventsが特定され、境界根拠が明確になっていること
- 各Bounded Contextに対してCanvasが作成されていること
- Context Mapが作成され、統合パターンが定義されていること
- Team Topologyとの整合性が確認されていること
- Domain Message Flowが設計されていること
- ユビキタス言語の境界が明確化されていること
- Context進化戦略が定義されていること

### 品質要件

- 1 Bounded Context = 1 Microservice の原則が守られていること
- Conway's Lawが考慮されたチーム構造との整合性があること
- Domain Eventsによる疎結合通信が設計されていること
- 適切なサイズ（集約以上、ドメイン未満）のコンテキストになっていること
- ビジネス価値に基づく境界設定がされていること

### 文書品質要件

- 出力先ディレクトリ構造に従って適切にファイルが分割されていること
- 作成対象が実際のファイルとして出力されていること
- Markdownのlintルールに従っていない記述が少ないこと
- テンプレートが具体的なサンプルデータで実践的に記述されていること

## 完了後

- アウトプットを全てリストアップし、ユーザーからのレビューを受ける

---

## このフォーマットの特徴

### 2024年DDD最新ベストプラクティス統合

- **Event Storming中心**: 協働的発見プロセスを重視
- **Team Topology統合**: Conway's Lawを考慮した組織設計
- **Event-Driven Architecture**: Domain Eventsによる疎結合設計  
- **Microservices Ready**: 1 Context = 1 Service の原則適用
- **Continuous Evolution**: コンテキスト進化戦略の組み込み

### 実用性向上

- **段階的プロセス**: 6つの明確なフェーズに分割
- **具体的テンプレート**: 実際に使える詳細なテンプレート
- **品質担保**: 完了判定基準による品質確保
- **チーム連携**: Team Topologyとの整合性確認
- **継続改善**: 進化戦略による長期保守性確保

### 現代的アーキテクチャ対応

- **マイクロサービス**: 適切な境界でのサービス分割
- **イベント駆動**: 非同期通信による疎結合実現
- **プラットフォーム思考**: 再利用可能なコンポーネント設計
- **DevOps統合**: デプロイメントと運用を考慮した設計
- **スケーラビリティ**: 将来の成長を見据えた設計