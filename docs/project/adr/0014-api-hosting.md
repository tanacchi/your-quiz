# ADR-0014: APIホスティング選定

## Status

Accepted

## Context

### Background

- クイズアプリケーションのバックエンドAPI（Hono）をホスティングするプラットフォームの選択が必要
- API応答時間100ms要件とエッジコンピューティングによる高速レスポンスが必要
- Cloudflare D1との統合による運用効率化を重視

### Drivers

- **パフォーマンス要件**: API応答時間100ms以内の達成
- **エッジ最適化**: グローバル分散による低レイテンシ
- **Hono適合性**: フレームワークとの親和性・最適化
- **データベース統合**: D1 Databaseとの統合効率
- **運用シンプル性**: 小規模チーム（1-2名）での管理容易性
- **コスト効率**: 無料枠での開発・小規模運用

## Decision

### Chosen Option

### Cloudflare Workers + D1 Database

Honoフレームワークとの最高の親和性、エッジ実行によるコールドスタートなしの超高速起動、D1 Databaseとの完全統合を重視してCloudflare Workersを採用する。

### Alternatives Considered

| プラットフォーム | メリット | デメリット | 適用場面 | 無料枠 | パフォーマンス | 技術適合性 | 判定 |
|------------------|----------|------------|----------|--------|---------------|------------|------|
| **Cloudflare Workers** | **超高速、エッジ実行、無制限リクエスト、低コスト** | **実行時間制限、Node.js制限、デバッグ困難** | **エッジAPI、高トラフィック、シンプル処理** | **100,000req/日** | **★★★** | **Hono最適化** | **○** |
| Railway | シンプル設定、DB統合、Git連携、スケーリング自動 | 新しいサービス、実績少、料金体系変更リスク | フルスタック、小中規模、MVP開発 | $5クレジット/月 | ★★★ | Hono対応 | ○ |
| Render | Docker対応、DB統合、自動デプロイ、実績豊富 | 無料枠制限厳しい、スリープ問題、設定複雑 | Docker化、安定運用、エンタープライズ | 750時間/月 | ★★ | Hono対応 | △ |
| Fly.io | エッジ配信、低レイテンシ、Docker最適、グローバル展開 | 設定複雑、学習コスト高、課金体系複雑 | エッジコンピューティング、レイテンシ重視 | $5クレジット/月 | ★★★ | Hono最適 | ○ |
| Supabase Functions | PostgreSQL統合、Edge Functions、Auth統合、TypeScript | Serverless制限、実行時間制限、デバッグ困難 | DB重視、Auth必要、Serverless | 500MB DB無料 | ★★ | TypeScript対応 | △ |
| PlanetScale + Vercel Functions | MySQL互換、ブランチング、自動スケール、エッジ | コスト高、ベンダーロック、複雑構成 | 大規模DB、ブランチ運用 | 10GB DB無料 | ★★ | 要適合作業 | △ |

### 詳細比較：主要候補プラットフォーム

| 項目 | Railway | Fly.io | Cloudflare Workers |
|------|---------|--------|-------------------|
| **起動時間** | ~500ms | ~200ms | ~1ms |
| **コールドスタート** | あり | あり | なし |
| **100ms要件対応** | △（ウォームアップ必要） | ○（エッジ配置） | ○（エッジネイティブ） |
| **データベース** | 統合PostgreSQL | 外部接続 | 外部接続（D1/KV） |
| **無料枠** | $5/月クレジット | $5/月クレジット | 100,000req/日 |
| **運用負荷** | 低 | 中 | 低 |
| **学習コスト** | 低 | 中 | 中 |

## Consequences

### Positive

- **圧倒的高速性**: エッジ実行によるコールドスタートなし（~1ms起動）
- **Hono最適化**: Cloudflare Workers向けに設計されたフレームワークとの最高親和性
- **完全統合**: Workers + D1 + CDN の単一プラットフォーム管理
- **十分な無料枠**: 100,000リクエスト/日 + 25GB DB（クイズアプリには十分）
- **運用シンプル**: 単一プラットフォームで完結、管理負荷最小
- **スケーラビリティ**: 無制限リクエスト対応、自動スケーリング

### Negative

- **実行時間制限**: CPU時間・メモリ・実行時間の制限
- **Node.js制限**: 標準Node.js APIの一部非対応
- **デバッグ困難**: ローカル環境でのデバッグ制約
- **新技術リスク**: 比較的新しいプラットフォームによるリスク
- **ベンダーロック**: Cloudflare固有機能への依存

### 技術的制約と対応

#### 制約事項

1. **実行時間制限**: CPU時間30秒、壁時計時間10分
2. **メモリ制限**: 128MB（有料プランで512MB）
3. **Node.js API制限**: fs、path等の一部API非対応
4. **デバッグ制約**: リモートデバッグ環境での開発

#### 対応策

1. **シンプル処理重視**: 複雑な処理は外部サービス利用
2. **Hono活用**: Workers最適化フレームワークの恩恵
3. **ローカル開発**: wrangler dev での開発環境構築
4. **監視強化**: ログ・メトリクス・アラートの充実

### 選定理由の詳細

1. **HonoはCloudflare Workers向けに設計されており最高の親和性**
2. **100ms要件対応**: エッジ実行でコールドスタートなし（~1ms起動）
3. **十分な無料枠**: 100,000リクエスト/日 + 25GB DB - クイズアプリには十分
4. **クイズアプリの特性**: 複雑なクエリ不要、CRUD中心の単純な処理
5. **運用シンプル**: 単一プラットフォームで完結、管理負荷最小
6. **方針転換**: 当初PostgreSQL互換性を重視したが、クイズアプリの要件分析の結果、運用統一とパフォーマンスを優先してSQLite + D1完全採用

### Risks and Mitigation

| リスク | 発生確率 | 影響度 | 対策 |
|--------|----------|--------|------|
| Workers制限による機能制約 | 中 | 中 | シンプル設計維持、制限範囲内での機能実装 |
| デバッグ・開発効率低下 | 中 | 低 | wrangler dev活用、ログ・監視充実化 |
| ベンダーロック依存 | 低 | 中 | Hono抽象化活用、標準的API設計維持 |
| 新技術の成熟度リスク | 低 | 中 | Cloudflareの技術力・実績への信頼、段階的採用 |

## Implementation Notes

### Action Items

- [ ] Cloudflare Workers アカウント設定
- [ ] D1 Database 作成・設定
- [ ] Wrangler CLI セットアップ
- [ ] Honoアプリケーション初期設定
- [ ] Drizzle ORM + D1 統合設定
- [ ] CI/CD（GitHub Actions）連携設定

### 技術設定

#### Wrangler設定

```toml
# wrangler.toml
name = "your-quiz-api"
main = "src/index.ts"
compatibility_date = "2024-01-01"

[env.development]
name = "your-quiz-api-dev"

[env.production]
name = "your-quiz-api"

[[d1_databases]]
binding = "DB"
database_name = "your-quiz-db"
database_id = "your-database-id"

[vars]
ENVIRONMENT = "production"
```

#### Honoアプリケーション構造

```typescript
// src/index.ts
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { quizRoutes } from './routes/quiz';

const app = new Hono();

app.use('*', cors());
app.route('/api/quiz', quizRoutes);

export default app;
```

#### D1統合設定

```typescript
// src/database/connection.ts
import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

export const createDB = (d1: D1Database) => {
  return drizzle(d1, { schema });
};
```

### パフォーマンス最適化

- **エッジ実行**: 自動的な世界規模での分散実行
- **コールドスタート対策**: Workers特性により不要
- **D1最適化**: SQLite最適化クエリ設計
- **キャッシュ活用**: KVストレージ・CDNキャッシュの戦略的活用

### Timeline

- **決定日**: 2025-01-27
- **実装開始**: バックエンド開発フェーズ
- **完了予定**: API基盤構築完了時

## References

- [Cloudflare Workers ドキュメント](https://developers.cloudflare.com/workers/)
- [Hono Cloudflare Workers ガイド](https://hono.dev/getting-started/cloudflare-workers)
- [Cloudflare D1 Database](https://developers.cloudflare.com/d1/)
- [ADR-0006: バックエンドフレームワーク選定](0006-backend-framework.md)
- [ADR-0007: データベース選定](0007-database.md)

---
**Created**: 2025-01-27
**Last Updated**: 2025-01-27
**Authors**: Claude
**Reviewers**: [@tanacchi](https://github.com/tanacchi)
