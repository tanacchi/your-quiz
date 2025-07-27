# ADR-0007: データベース選定

## Status
Accepted

## Context

### Background
- クイズアプリケーションのデータベース選択が必要
- **重要**: DBはリプレースが困難なため、将来の拡張性と互換性を重視
- Cloudflare Workers（Hono）環境での最適動作と100ms応答要件を満たす必要
- PostgreSQL互換性の確保が長期運用における重要な考慮事項

### Drivers
- **リプレース困難性**: データベース移行の複雑さとリスク
- **PostgreSQL互換性**: 業界標準・エコシステム・将来の移行容易性
- **エッジ最適化**: Cloudflare Workers環境での高速アクセス
- **運用コスト**: 無料枠での開発・小規模運用
- **パフォーマンス要件**: 100ms API応答時間の達成
- **データ構造**: クイズ・回答・履歴のシンプルなCRUD処理

## Decision

### Chosen Option
**PostgreSQL（Neon等）+ Cloudflare Hyperdrive**

データベースリプレースの困難さとPostgreSQL互換性の重要性を重視し、PostgreSQL + Hyperdrive構成を採用する。

**理由**: D1はSQLiteベースでPostgreSQL直接互換なし。Cloudflare HyperdriveでPostgreSQLの高速アクセスが可能。

### Alternatives Considered

| データベース | メリット | デメリット | PostgreSQL互換性 | 運用コスト | 学習曲線 | リプレース容易性 | 判定 |
|-------------|----------|------------|------------------|------------|----------|------------------|------|
| **PostgreSQL + Hyperdrive** | **・PostgreSQL完全互換**<br>**・業界標準SQL**<br>**・豊富なエコシステム**<br>**・リプレース容易**<br>**・Cloudflareエッジ最適化**<br>**・型安全性** | **・設定複雑**<br>**・Hyperdrive学習コスト**<br>**・複数サービス管理** | **★★★（完全）** | **中** | **中** | **★★★** | **○** |
| D1 (SQLite) | ・Cloudflare統合<br>・エッジ配置<br>・SQLite互換<br>・無料枠大<br>・設定シンプル<br>・超高速 | ・PostgreSQL互換なし<br>・機能制限<br>・新サービス<br>・分析クエリ弱<br>・リプレース困難 | ★（変換必要） | 低 | 低 | ★ | △ |
| Neon PostgreSQL | ・Serverless PostgreSQL<br>・ブランチング<br>・自動スケール<br>・PostgreSQL互換<br>・モダン設計 | ・新しいサービス<br>・レイテンシ<br>・制限あり<br>・エッジ最適化なし | ★★★（完全） | 中 | 中 | ★★★ | △ |
| PlanetScale MySQL | ・ブランチング<br>・自動スケール<br>・企業実績<br>・エッジ対応 | ・MySQL制約<br>・高コスト<br>・PostgreSQL互換なし<br>・移行複雑 | ★（変換必要） | 高 | 高 | ★★ | △ |
| Railway PostgreSQL | ・統合管理<br>・シンプル設定<br>・PostgreSQL互換<br>・自動バックアップ | ・単一AZ<br>・制限あり<br>・エッジ最適化なし<br>・パフォーマンス制限 | ★★★（完全） | 中 | 中 | ★★★ | △ |

## Consequences

### Positive
- **PostgreSQL完全互換**: 業界標準のSQL機能・エコシステム活用
- **リプレース容易性**: 将来の移行時の技術的負債最小化
- **豊富なエコシステム**: ORM（Drizzle・Prisma）・ツール・ライブラリ対応
- **Cloudflareエッジ最適化**: Hyperdriveによる高速アクセス
- **型安全性**: PostgreSQLの厳密な型システム
- **長期運用**: 安定性・実績・コミュニティサポート

### Negative
- **設定複雑性**: PostgreSQL + Hyperdrive の複数サービス管理
- **学習コスト**: Hyperdrive設定・最適化の理解必要
- **運用コスト**: D1と比較した費用増加（無料枠内でも制限）
- **初期設定**: データベース・Hyperdrive・認証の統合設定

### Neutral
- **パフォーマンス**: Hyperdrive最適化によりエッジレベルの高速化
- **スケーラビリティ**: PostgreSQLの水平・垂直スケール対応

### Risks and Mitigation

| リスク | 発生確率 | 影響度 | 対策 |
|--------|----------|--------|------|
| Hyperdrive設定複雑化による開発遅延 | 中 | 中 | 段階的導入、公式ドキュメント重視、シンプル設定から開始 |
| 複数サービス管理による運用負荷 | 中 | 低 | IaC（Infrastructure as Code）、監視・ログ統合 |
| コスト超過リスク | 低 | 中 | 使用量監視、アラート設定、段階的スケール |

## Implementation Notes

### Action Items
- [ ] PostgreSQL データベース選定（Neon推奨）
- [ ] Cloudflare Hyperdrive 設定・接続確認
- [ ] Drizzle ORM PostgreSQL設定
- [ ] データベーススキーマ設計（PostgreSQL）
- [ ] マイグレーション設計
- [ ] 接続プール・パフォーマンス最適化

### データベース構成
```sql
-- PostgreSQL スキーマ設計例
CREATE TABLE quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID REFERENCES quizzes(id),
  user_session VARCHAR(255),
  answer_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Cloudflare Hyperdrive設定
- **接続プール**: 効率的なコネクション管理
- **キャッシュ**: 頻繁なクエリの結果キャッシュ
- **レイテンシ最適化**: エッジからの高速アクセス

### Timeline
- **決定日**: 2025-01-27
- **実装開始**: データベース設計フェーズ
- **完了予定**: DB基盤・Hyperdrive設定完了時

## References

- [Cloudflare Hyperdrive ドキュメント](https://developers.cloudflare.com/hyperdrive/)
- [Neon PostgreSQL](https://neon.tech/)
- [Drizzle ORM PostgreSQL](https://orm.drizzle.team/docs/get-started-postgresql)
- [PostgreSQL vs SQLite 比較検討結果](https://www.postgresql.org/about/featurematrix/)

---
**Created**: 2025-01-27
**Last Updated**: 2025-01-27
**Authors**: Claude
**Reviewers**: TBD