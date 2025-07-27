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

### SQLite + Cloudflare D1

**方針転換**: 当初PostgreSQL互換性を重視したが、クイズアプリの要件分析の結果、運用の統一性・パフォーマンス・コスト効率を優先してSQLite + D1構成を採用する。

**理由**:

1. シンプルなCRUD処理が中心でPostgreSQL高機能は不要
2. Cloudflare Workers統合による運用統一とパフォーマンス向上
3. 無料枠（25GB）での十分な運用可能性
4. エッジDB配置による100ms要件確実達成

### Alternatives Considered

| データベース | メリット | デメリット | PostgreSQL互換性 | 運用コスト | 学習曲線 | リプレース容易性 | 判定 |
|-------------|----------|------------|------------------|------------|----------|------------------|------|
| **D1 (SQLite)** | **・Cloudflare Workers完全統合**<br>**・エッジDB配置による超高速**<br>**・無料枠大（25GB）**<br>**・設定・運用シンプル**<br>**・単一プラットフォーム管理**<br>**・100ms要件確実達成** | **・PostgreSQL互換なし**<br>**・SQLite機能制限**<br>**・将来移行時の変換コスト**<br>**・分析クエリ弱** | **★（変換必要）** | **低** | **低** | **★** | **○** |
| PostgreSQL + Hyperdrive | ・PostgreSQL完全互換<br>・業界標準SQL<br>・豊富なエコシステム<br>・リプレース容易<br>・型安全性 | ・設定複雑<br>・Hyperdrive学習コスト<br>・複数サービス管理<br>・運用負荷高<br>・コスト高 | ★★★（完全） | 中 | 中 | ★★★ | △ |
| Neon PostgreSQL | ・Serverless PostgreSQL<br>・ブランチング<br>・自動スケール<br>・PostgreSQL互換<br>・モダン設計 | ・新しいサービス<br>・レイテンシ<br>・制限あり<br>・エッジ最適化なし | ★★★（完全） | 中 | 中 | ★★★ | △ |
| PlanetScale MySQL | ・ブランチング<br>・自動スケール<br>・企業実績<br>・エッジ対応 | ・MySQL制約<br>・高コスト<br>・PostgreSQL互換なし<br>・移行複雑 | ★（変換必要） | 高 | 高 | ★★ | △ |
| Railway PostgreSQL | ・統合管理<br>・シンプル設定<br>・PostgreSQL互換<br>・自動バックアップ | ・単一AZ<br>・制限あり<br>・エッジ最適化なし<br>・パフォーマンス制限 | ★★★（完全） | 中 | 中 | ★★★ | △ |

### クイズアプリ要件への再評価

| 要件 | PostgreSQL重要度 | SQLite適合性 | 判定 |
|------|------------------|-------------|------|
| **シンプルCRUD** | 低（オーバースペック） | 高（十分） | SQLite◎ |
| **100ms要件** | 中（Hyperdrive必要） | 高（エッジDB） | SQLite◎ |
| **小規模チーム運用** | 低（複雑性） | 高（シンプル） | SQLite◎ |
| **無料運用** | 低（コスト発生） | 高（25GB無料） | SQLite◎ |
| **Cloudflare統合** | 中（複数サービス） | 高（完全統合） | SQLite◎ |
| **将来PostgreSQL移行** | 高（互換性） | 低（変換必要） | PostgreSQL○ |

**結論**: クイズアプリの現在要件ではSQLiteが圧倒的に適合。将来移行リスクよりも現在の運用効率を優先。

## Consequences

### Positive

- **運用統一性**: Cloudflare Workers + D1の単一プラットフォーム管理
- **圧倒的高速性**: エッジDB配置による100ms要件余裕達成
- **コスト効率**: 25GB無料枠での十分な運用（数年分のデータ）
- **設定シンプル**: 複雑な接続設定・認証管理が不要
- **小規模チーム適合**: 学習コスト・運用負荷の最小化
- **Cloudflare統合**: Workers・D1・CDNの完全な連携最適化

### Negative

- **PostgreSQL互換性放棄**: 将来移行時のSQL変換・データ移行コスト
- **SQLite機能制限**: 複雑クエリ・分析機能・並行書き込み制限
- **新技術リスク**: D1の成熟度・長期サポート・ベンダーロック
- **エコシステム制約**: PostgreSQL特化ツール・ライブラリの利用不可
- **スケーラビリティ上限**: SQLiteの同時接続・データサイズ制限

### 移行戦略（将来PostgreSQL必要時）

**段階的移行計画**:

1. **Phase 1**: SQLiteスキーマをPostgreSQL互換で設計
2. **Phase 2**: データ変換ツール・ETLパイプライン構築  
3. **Phase 3**: 段階的データ移行・検証・切り替え
4. **Phase 4**: アプリケーション設定変更・テスト

**技術的負債軽減策**:

- Drizzle ORM: SQLite・PostgreSQL両対応
- 標準SQL使用: DB固有機能への依存最小化
- 移行時期判断: データ量・複雑性・チーム規模の閾値設定
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
**Reviewers**: [@tanacchi](https://github.com/tanacchi)
