# DDD設計ドキュメント

## 読み順

### 理解重視の読み順（推奨）

以下の順序でドキュメントを読むことで、DDD設計全体を体系的に理解できます：

1. [domain-model-overview.md](domain-model-overview.md) - ドメインモデル概要
2. [ubiquitous-language.md](ubiquitous-language.md) - ユビキタス言語定義
3. [bounded-contexts/](bounded-contexts/) - 境界づけられたコンテキスト
4. [aggregates/](aggregates/) - 集約設計
5. [entities/](entities/) - エンティティ設計
6. [value-objects/](value-objects/) - 値オブジェクト設計
7. [domain-services/](domain-services/) - ドメインサービス設計
8. [repositories/](repositories/) - リポジトリ設計
9. [entity-relationships.md](entity-relationships.md) - エンティティ関係
10. [business-flows.md](business-flows.md) - ビジネスフロー
11. [domain-object-classification.md](domain-object-classification.md) - ドメインオブジェクト分類

### 設計プロセス順の読み順

実際のDDD設計手順に従って作成された順序でドキュメントを読む場合：

1. [ubiquitous-language.md](ubiquitous-language.md) - **手順1**: ドメイン理解とユビキタス言語確立
2. [domain-object-classification.md](domain-object-classification.md) - **手順2**: ドメインオブジェクトの抽出・分類
3. [business-flows.md](business-flows.md) - **手順3**: ユーザー操作と業務フローの整理
4. [entity-relationships.md](entity-relationships.md) - **手順4**: エンティティ間関連性分析
5. [domain-services/](domain-services/) - **手順5**: ドメインサービス抽出
6. [bounded-contexts/](bounded-contexts/) - **手順6**: 境界づけられたコンテキスト定義
7. [aggregates/](aggregates/) - **手順7**: 集約と集約ルート定義
8. [entities/](entities/) + [value-objects/](value-objects/) + [repositories/](repositories/) - **手順8**: モデル設計（最終成果物）
9. [domain-model-overview.md](domain-model-overview.md) - **最終まとめ**: 全体設計概要

### 設計経緯を理解したい場合

各手順での設計判断根拠を知りたい場合は、関連ADRも併せて参照してください：

| 手順 | ドキュメント | 関連ADR | 設計判断内容 |
|------|-------------|---------|-------------|
| 手順6 | [bounded-contexts/](bounded-contexts/) | [ADR-0016](docs/project/adr/0016-bounded-context-division.md) | なぜ4つのコンテキストに分割したか |
| 手順7 | [aggregates/](aggregates/) | [ADR-0017](docs/project/adr/0017-aggregate-design.md) | なぜこの集約設計を選択したか |
| 手順5 | [domain-services/](domain-services/) | [ADR-0018](docs/project/adr/0018-domain-service-extraction.md) | なぜこれらのサービスを抽出したか |
| 手順8 | [repositories/](repositories/) | [ADR-0019](docs/project/adr/0019-repository-pattern-adoption.md) | なぜリポジトリパターンを採用したか |

## 概要

このディレクトリには、クイズアプリケーションのドメイン駆動設計（DDD）に関する設計ドキュメントが含まれています。

### DDD設計の構成要素

#### 戦略的設計

- **境界づけられたコンテキスト**: 問題領域の境界と責務の分離
- **ユビキタス言語**: ドメインエキスパートと開発者の共通言語

#### 戦術的設計

- **エンティティ**: 一意性を持つドメインオブジェクト
- **値オブジェクト**: 不変な属性を表現するオブジェクト
- **集約**: エンティティと値オブジェクトの整合性境界
- **ドメインサービス**: エンティティや値オブジェクトに属さないドメインロジック
- **リポジトリ**: 集約の永続化抽象化

### アーキテクチャとの関係

このDDD設計は[ヘキサゴナルアーキテクチャ](docs/project/architecture/diagrams/hexagonal-architecture.md)のドメイン層（中心部）を詳細化したものです。

```text
[Infrastructure Layer] → [Application Layer] → [Domain Layer]
                                                      ↑
                                              このディレクトリで詳細化
```

### 実装への影響

- **依存関係**: ドメイン層は外部の層に依存しない
- **テスタビリティ**: ピュアなビジネスロジックとして単体テスト可能
- **再利用性**: ビジネスルールの変更に強い構造

## 設計決定記録（ADR）

DDD設計における重要な決定事項は、以下のADRで詳細に記録されています：

### 戦略的設計に関するADR

- [ADR-0016: 境界づけられたコンテキスト分割決定](docs/project/adr/0016-bounded-context-division.md)
  - 4つのコンテキスト分割の根拠と理由
  - Quiz Management、Quiz Learning、User Session、Offline Sync の責務分離

### 戦術的設計に関するADR

- [ADR-0017: 集約設計とルート決定](docs/project/adr/0017-aggregate-design.md)
  - 4つの主要集約設計の根拠
  - 整合性境界とトランザクション境界の設計決定

- [ADR-0018: ドメインサービス抽出決定](docs/project/adr/0018-domain-service-extraction.md)
  - エンティティに属さないドメインロジックの配置決定
  - 複数集約操作・複雑計算・外部連携ロジックの抽出

- [ADR-0019: リポジトリパターン採用決定](docs/project/adr/0019-repository-pattern-adoption.md)
  - ドメイン層の純粋性保持のための抽象化戦略
  - 集約単位でのリポジトリ設計決定

### ADRとの関連性

各設計ドキュメントは、上記ADRの決定事項を具体化したものです：

| 設計ドキュメント | 関連ADR | 決定事項 |
|------------------|---------|----------|
| [bounded-contexts/](bounded-contexts/) | [ADR-0016](docs/project/adr/0016-bounded-context-division.md) | コンテキスト分割基準と統合パターン |
| [aggregates/](aggregates/) | [ADR-0017](docs/project/adr/0017-aggregate-design.md) | 集約境界と不変条件設計 |
| [domain-services/](domain-services/) | [ADR-0018](docs/project/adr/0018-domain-service-extraction.md) | ドメインサービスの責務と実装 |
| [repositories/](repositories/) | [ADR-0019](docs/project/adr/0019-repository-pattern-adoption.md) | 永続化抽象化と技術分離 |

---

**作成工程**: DDD設計
**前工程**: [アーキテクチャ策定・技術選定](docs/project/architecture/)
**次工程**: [API設計](docs/project/api/) ※将来作成予定
**作成日**: 2025-07-27
**ADR追加**: 2025-07-28
