# ADR-0012: データベースホスティング選定

## Status

Accepted

## Context

SQLite/D1データベースのホスティング環境選定が必要となる。Cloudflare Workers統合、無料枠での運用、エッジ配置による高速アクセスを考慮した選択が求められる。

### Background

- SQLite互換データベースの選択（ADR-0007）
- Cloudflare Workers統合による運用統一
- クイズアプリのシンプルなCRUD処理
- 25GB程度のデータ容量想定
- MVP期から成長期への段階的移行

### Drivers

- Cloudflare Workers統合
- 無料枠での初期運用
- エッジ配置によるパフォーマンス
- データベース管理の簡素化
- 将来的な移行容易性

## Decision

### Chosen Option

選定技術: D1 Database (Cloudflare)

SQLite互換でシンプル、25GB無料枠、エッジ配置による高速アクセス、Cloudflare Workers完全統合による運用統一を重視。MVP期の要件には十分で、成長期には他のサービスへの移行を検討。

### Alternatives Considered

以下の代替案を検討した：

| サービス | メリット | デメリット | 無料枠 | パフォーマンス | 適用時期 | 評価 |
|----------|----------|------------|--------|---------------|----------|------|
| **D1 Database (Cloudflare)** | **エッジ配置、超高速、SQLite互換、無料枠大** | **機能制限、新しいサービス、分析クエリ弱** | **25GB** | **★★★** | **MVP期** | **★★★** |
| Neon PostgreSQL | Serverless、ブランチング、自動スケール | 新しい、制限あり、レイテンシ | 3GB | ★★ | 成長期 | ★★ |
| PlanetScale MySQL | ブランチング、自動スケール、企業実績 | 高コスト、MySQL制約 | 10GB | ★★ | スケール期 | ★★ |
| Railway PostgreSQL | 統合管理、シンプル設定、自動バックアップ | 単一AZ、制限あり | $5クレジット分 | ★★ | 安定期 | ★ |

## Consequences

### Positive

- Cloudflare Workers完全統合による運用統一
- エッジ配置による高速データアクセス
- 25GB無料枠による十分な初期容量
- SQLite互換によるシンプルな開発体験
- 既存のDrizzle ORMとSQLite開発経験活用可能

### Negative

- 新しいサービスのため長期安定性が未知
- 複雑な分析クエリや JOIN が苦手
- 機能制限があり高度なデータベース機能は限定的
- 将来的にスケールした場合の移行が必要

### Neutral

- MVP期の要件には十分だが成長期には見直しが必要
- SQLite互換のため移行時のスキーマ変換が必要

### Risks and Mitigation

| リスク | 発生確率 | 影響度 | 対策 |
|--------|----------|--------|------|
| 機能制限による開発制約 | 中 | 中 | シンプルなスキーマ設計、複雑クエリ回避 |
| スケール時の移行必要 | 高 | 中 | 移行計画策定、データ移行ツール準備 |
| サービス安定性 | 低 | 高 | 定期バックアップ、他サービス準備 |

## Implementation Notes

### Action Items

- [ ] D1 Database プロジェクト作成
- [ ] Drizzle ORM + D1 統合設定
- [ ] マイグレーション環境構築
- [ ] バックアップ・リストア手順策定

### Usage Guidelines

- スキーマはシンプルに保つ
- 複雑な JOIN は避け、アプリケーション層で処理
- 定期的なデータ移行テストの実施
- パフォーマンス監視の設定

### 段階的移行計画

#### MVP期（現在）

- D1 Database使用
- シンプルなCRUD処理
- 25GB枠内での運用

#### 成長期（ユーザー増加時）

- Neon PostgreSQL等への移行検討
- より高度なクエリ対応
- スケーラビリティ向上

#### スケール期（大規模化時）

- PlanetScale等の本格運用
- 分析基盤の分離
- 高可用性構成

### Timeline

- **決定日**: 2025-01-27
- **実装開始**: DDD設計工程
- **完了予定**: DB設計工程

## References

- [Cloudflare D1 Database](https://developers.cloudflare.com/d1/)
- [Drizzle ORM D1 Integration](https://orm.drizzle.team/docs/get-started-sqlite#cloudflare-d1)
- [ADR-0007: データベース選定](0007-database.md)
- [ADR-0008: APIホスティング選定](0008-api-hosting.md)

---
**Created**: 2025-01-27
**Last Updated**: 2025-01-27
**Authors**: [@tanacchi](https://github.com/tanacchi)
**Reviewers**: [@tanacchi](https://github.com/tanacchi)
