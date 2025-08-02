# ADR-0007: データベース選定

## Status

Accepted

## Context

### Background

- クイズアプリケーションのデータベース選択が必要
- Cloudflare Workers（Hono）環境での最適動作と100ms応答要件を満たす必要
- シンプルなCRUD処理が中心のアプリケーション特性
- 小規模チームでの開発・運用効率を重視

### Drivers

- **パフォーマンス要件**: 100ms API応答時間の達成
- **運用シンプル性**: 小規模チームでの管理負荷最小化
- **エッジ最適化**: Cloudflare Workers環境での高速アクセス
- **運用コスト**: 無料枠での開発・小規模運用
- **データ構造**: クイズ・回答・履歴のシンプルなCRUD処理
- **技術統合**: 単一プラットフォームでの統合管理

## Decision

### Chosen Option

### SQLite + Cloudflare D1

クイズアプリの要件分析の結果、運用の統一性・パフォーマンス・コスト効率を最優先してSQLite + D1構成を採用する。

**理由**:

1. **パフォーマンス最適化**: エッジDB配置による100ms要件確実達成
2. **運用シンプル性**: Cloudflare Workers統合による単一プラットフォーム管理
3. **適切なスペック**: シンプルなCRUD処理中心の要件に最適
4. **コスト効率**: 無料枠（25GB）での十分な運用可能性
5. **開発効率**: 小規模チームでの学習コスト・運用負荷最小化

### Alternatives Considered

| データベース | メリット | デメリット | パフォーマンス | 運用コスト | 運用シンプル性 | 判定 |
|-------------|----------|------------|-------------|------------|-------------|------|
| **D1 (SQLite)** | **・Cloudflare Workers完全統合**<br>**・エッジDB配置による超高速**<br>**・無料枠大（25GB）**<br>**・設定・運用シンプル**<br>**・単一プラットフォーム管理**<br>**・100ms要件確実達成** | **・SQLite機能制限**<br>**・分析クエリ弱**<br>**・同時書き込み制限** | **★★★** | **低** | **★★★** | **○** |
| PostgreSQL + Hyperdrive | ・業界標準SQL<br>・豊富なエコシステム<br>・高機能<br>・スケーラビリティ | ・設定複雑<br>・Hyperdrive学習コスト<br>・複数サービス管理<br>・運用負荷高<br>・コスト高 | ★★ | 中 | ★ | △ |
| Neon PostgreSQL | ・Serverless PostgreSQL<br>・ブランチング<br>・自動スケール<br>・モダン設計 | ・新しいサービス<br>・レイテンシ<br>・制限あり<br>・エッジ最適化なし | ★★ | 中 | ★★ | △ |
| PlanetScale MySQL | ・ブランチング<br>・自動スケール<br>・企業実績<br>・エッジ対応 | ・MySQL制約<br>・高コスト<br>・移行複雑 | ★★ | 高 | ★ | △ |
| Railway PostgreSQL | ・統合管理<br>・シンプル設定<br>・自動バックアップ | ・単一AZ<br>・制限あり<br>・エッジ最適化なし<br>・パフォーマンス制限 | ★ | 中 | ★★ | △ |

### クイズアプリ要件分析

| 要件 | 重要度 | SQLite + D1適合性 | PostgreSQL適合性 | 選定結果 |
|------|--------|------------------|------------------|----------|
| **シンプルCRUD** | 高 | ★★★（最適） | ★★（オーバースペック） | SQLite◎ |
| **100ms要件** | 高 | ★★★（エッジDB） | ★★（要追加設定） | SQLite◎ |
| **小規模チーム運用** | 高 | ★★★（シンプル） | ★（複雑） | SQLite◎ |
| **無料運用** | 中 | ★★★（25GB無料） | ★（コスト発生） | SQLite◎ |
| **Cloudflare統合** | 中 | ★★★（完全統合） | ★★（複数サービス） | SQLite◎ |
| **スケーラビリティ** | 低 | ★（制限あり） | ★★★（高い） | 現時点では不要 |

**結論**: クイズアプリの現在要件ではSQLite + D1が全ての重要項目で最適。

## Consequences

### Positive

- **運用統一性**: Cloudflare Workers + D1の単一プラットフォーム管理
- **圧倒的高速性**: エッジDB配置による100ms要件余裕達成
- **コスト効率**: 25GB無料枠での十分な運用（数年分のデータ）
- **設定シンプル**: 複雑な接続設定・認証管理が不要
- **小規模チーム適合**: 学習コスト・運用負荷の最小化
- **Cloudflare統合**: Workers・D1・CDNの完全な連携最適化

### Negative

- **SQLite機能制限**: 複雑クエリ・分析機能・並行書き込み制限
- **新技術リスク**: D1の成熟度・長期サポート・ベンダーロック
- **スケーラビリティ上限**: SQLiteの同時接続・データサイズ制限
- **将来移行コスト**: 大規模化時のデータベース移行作業

### 将来の移行戦略

**移行検討タイミング**:

- データ量が20GB超過時
- 複雑な分析クエリが必要になった時
- 同時接続数が制限に達した時

**技術的負債軽減策**:

- Drizzle ORM使用: 複数DB対応
- 標準SQL使用: DB固有機能への依存最小化
- データ移行時期の事前計画

### Neutral

- **現在の制約**: クイズアプリには影響しないレベル
- **将来の拡張性**: 必要時に適切なDBへ移行可能

### Risks and Mitigation

| リスク | 発生確率 | 影響度 | 対策 |
|--------|----------|--------|------|
| D1サービス制限による機能制約 | 低 | 中 | シンプルスキーマ設計、複雑クエリ回避 |
| データ量増加による性能低下 | 中 | 低 | 定期監視、必要時の移行計画実行 |
| ベンダーロックイン | 低 | 中 | Drizzle ORM使用、標準SQL維持 |

## Implementation Notes

### Action Items

- [ ] Cloudflare D1 データベース作成
- [ ] Drizzle ORM SQLite設定
- [ ] データベーススキーマ設計（SQLite）
- [ ] マイグレーション設計
- [ ] Cloudflare Workers連携設定

### データベース構成

```sql
-- SQLite スキーマ設計例
CREATE TABLE quizzes (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  updated_at INTEGER DEFAULT (strftime('%s', 'now'))
);

CREATE TABLE answers (
  id TEXT PRIMARY KEY,
  quiz_id TEXT REFERENCES quizzes(id),
  user_session TEXT,
  answer_data TEXT, -- JSON as TEXT
  created_at INTEGER DEFAULT (strftime('%s', 'now'))
);
```

### Cloudflare D1設定

- **ローカル開発**: wrangler dev での開発環境構築
- **マイグレーション**: wrangler d1 migrations でスキーマ管理
- **パフォーマンス**: エッジDB配置による高速アクセス

### Timeline

- **決定日**: 2025-01-27
- **実装開始**: データベース設計フェーズ
- **完了予定**: DB基盤・D1設定完了時

## References

- [Cloudflare D1 Database](https://developers.cloudflare.com/d1/)
- [Drizzle ORM SQLite](https://orm.drizzle.team/docs/get-started-sqlite)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)

---
**Created**: 2025-01-27
**Last Updated**: 2025-01-27
**Authors**: Claude
**Reviewers**: [@tanacchi](https://github.com/tanacchi)
