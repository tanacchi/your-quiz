# ADR-0016: 境界づけられたコンテキスト分割決定

## Status

Accepted

## Context

### Background

- クイズアプリケーションにおいて、ドメインの複雑性管理とコード保守性向上のために適切な境界づけられたコンテキスト分割が必要
- モジュラーモノリス内での論理的分離により、将来的なマイクロサービス分割の可能性を担保
- 各機能領域の独立性確保と責務の明確化が重要

### Drivers

- **責務の分離**: クイズ管理・学習機能・ユーザー管理・オフライン同期の異なる責務
- **変更の独立性**: 各機能の変更が他機能に影響しない設計
- **用語の一意性**: 同一用語が異なる意味を持つ境界の明確化
- **技術的制約**: TypeScript統一環境での名前空間による論理分離
- **チーム構成**: 1-2名の小規模チームでの保守性確保

## Decision

### Chosen Option

## 4つの境界づけられたコンテキストによる分割

以下の4つのコンテキストに分割し、各々が独立した責務を持つ構造とする：

1. **Quiz Management Context（クイズ管理コンテキスト）**
2. **Quiz Learning Context（クイズ学習コンテキスト）**
3. **User Session Context（ユーザーセッションコンテキスト）**
4. **Offline Sync Context（オフライン同期コンテキスト）**

### Alternatives Considered

| 選択肢 | メリット | デメリット | 適用可能性 | 保守性 | 複雑度 | 評価 |
|--------|----------|------------|------------|--------|--------|------|
| **4コンテキスト分割** | **・責務の明確な分離**<br>**・独立した変更可能性**<br>**・用語の一意性確保**<br>**・将来のマイクロサービス対応** | **・初期設計の複雑さ**<br>**・コンテキスト間統合の設計必要** | **・中規模アプリ**<br>**・複数機能領域**<br>**・将来拡張予定** | **高** | **中** | **★★★** |
| 2コンテキスト分割 | ・シンプルな構造<br>・理解しやすい<br>・初期開発の高速性 | ・責務の曖昧さ<br>・将来の分割困難<br>・用語の重複リスク | ・小規模アプリ<br>・機能が単純<br>・短期開発 | 中 | 低 | ★★ |
| 単一コンテキスト | ・最小限の複雑性<br>・開発の高速性<br>・統合の簡単さ | ・責務の混在<br>・保守性の低下<br>・拡張性の制限 | ・非常に小規模<br>・MVP段階<br>・実験的開発 | 低 | 低 | ★ |
| 6+コンテキスト分割 | ・極めて細かい責務分離<br>・高い独立性<br>・マイクロサービス対応 | ・過度な複雑性<br>・小規模チームに不適<br>・統合コスト高 | ・大規模システム<br>・複数チーム<br>・企業レベル | 低（複雑性による） | 高 | ★ |

## Consequences

### Positive

- **責務の明確化**: 各コンテキストが単一の明確な責任を持つ
- **変更の独立性**: 特定機能の変更が他機能に影響しない
- **用語の一意性**: 各コンテキスト内での用語の意味が統一される
- **テスタビリティ**: 各コンテキストを独立してテスト可能
- **将来の拡張性**: マイクロサービス分割時の境界が明確
- **チーム生産性**: 特定機能に集中した開発が可能

### Negative

- **初期設計の複雑性**: 4つのコンテキスト設計に時間が必要
- **統合の設計コスト**: コンテキスト間の統合パターン設計が必要
- **学習コスト**: DDD概念の理解とコンテキスト境界の把握が必要
- **過剰設計リスク**: 小規模アプリケーションには複雑すぎる可能性

### Neutral

- **共有カーネル管理**: 全コンテキストで共有する型定義の管理が必要
- **境界の見直し**: 開発進行に伴う境界調整の可能性
- **統合パターン選択**: Published Language、Customer/Supplier等の適切な選択が必要

### Risks and Mitigation

| リスク | 発生確率 | 影響度 | 対策 |
|--------|----------|--------|------|
| コンテキスト境界の不適切性 | 中 | 高 | 定期的な境界妥当性レビュー、リファクタリング |
| 統合パターンの複雑化 | 中 | 中 | Anti-Corruption Layer等の標準パターン採用 |
| 共有カーネルの肥大化 | 高 | 中 | 共有要素の最小化、定期的な見直し |
| 小規模チームでの管理負荷 | 中 | 中 | ドキュメント化、自動化ツールの活用 |

## Implementation Notes

### Action Items

- [ ] 各コンテキストのディレクトリ構造作成
- [ ] コンテキストマップの実装
- [ ] 統合パターンの具体実装
- [ ] 共有カーネルの型定義作成
- [ ] Anti-Corruption Layer実装

### Directory Structure

```text
src/
├── contexts/
│   ├── quiz-management/
│   ├── quiz-learning/
│   ├── user-session/
│   └── offline-sync/
├── shared-kernel/
└── integration/
```

### Integration Patterns

- **Quiz Management → Quiz Learning**: Published Language
- **Quiz Learning → User Session**: Customer/Supplier
- **Offline Sync → Others**: Anti-Corruption Layer

### Timeline

- **決定日**: 2025-07-28
- **実装開始**: 2025-07-28
- **完了予定**: API設計工程完了時

## References

- [境界づけられたコンテキスト詳細](docs/project/ddd-design/bounded-contexts/README.md)
- [ドメインモデル概要](docs/project/ddd-design/domain-model-overview.md)
- [DDD設計手順書](docs/instructions/shared/workflow/03.01_ddd-design.md)
- [Eric Evans "Domain-Driven Design"](https://domainlanguage.com/ddd/)
- [Vaughn Vernon "Implementing Domain-Driven Design"](https://kalele.io/books/)

---
**Created**: 2025-07-28
**Last Updated**: 2025-07-28
**Authors**: Claude Code
**Reviewers**: [@tanacchi](https://github.com/tanacchi)
