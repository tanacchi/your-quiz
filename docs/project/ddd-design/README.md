# DDD設計ドキュメント

## 読み順

以下の順序でドキュメントを読むことを推奨します：

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

このDDD設計は[ヘキサゴナルアーキテクチャ](../architecture/diagrams/hexagonal-architecture.md)のドメイン層（中心部）を詳細化したものです。

```text
[Infrastructure Layer] → [Application Layer] → [Domain Layer]
                                                      ↑
                                              このディレクトリで詳細化
```

### 実装への影響

- **依存関係**: ドメイン層は外部の層に依存しない
- **テスタビリティ**: ピュアなビジネスロジックとして単体テスト可能
- **再利用性**: ビジネスルールの変更に強い構造

---

**作成工程**: DDD設計  
**前工程**: [アーキテクチャ策定・技術選定](../architecture/)  
**次工程**: [API設計](../api/) ※将来作成予定  
**作成日**: 2025-07-27
