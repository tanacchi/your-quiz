# ADR-0015: API クエリ言語選定

## Status

Accepted

## Context

### Background

- クイズアプリケーションのAPI設計において、データ取得方式としてREST APIとGraphQLの検討が必要
- フロントエンドでの複雑なデータ取得要件への対応可能性を評価
- 将来的な機能拡張（ダッシュボード、リアルタイム機能等）への対応性を考慮
- Honoフレームワークでの技術的実装可能性を確認

### Drivers

- **データ取得効率**: Over-fetching/Under-fetchingの最小化
- **開発効率**: 型安全性・開発体験・学習コスト
- **パフォーマンス要件**: API応答時間100ms要件への適合
- **将来拡張性**: 複雑なクエリ・リアルタイム機能への対応
- **チーム適合性**: 小規模チーム（1-2名）での開発・運用負荷
- **段階的移行**: 既存REST APIからの移行可能性

## Decision

### Chosen Option

### REST API (段階的GraphQL移行オプション保持)

現時点ではシンプルなCRUD中心の要件に最適なREST APIを採用し、将来的な複雑なデータ取得要件が明確になった時点でGraphQLエンドポイント追加を検討する段階的アプローチを採用する。

### Alternatives Considered

| アプローチ | メリット | デメリット | 適用場面 | 学習コスト | パフォーマンス | 判定 |
|-----------|----------|------------|----------|------------|---------------|------|
| **REST API** | **・シンプル・直感的**<br>**・HTTP標準準拠**<br>**・エコシステム成熟**<br>**・キャッシュ最適化容易**<br>**・Hono最適化** | **・Over-fetching発生**<br>**・複雑関連データで複数リクエスト**<br>**・API進化時の互換性課題** | **・CRUD中心**<br>**・シンプルなデータ取得**<br>**・小規模アプリ**<br>**・高速開発** | **低** | **★★★** | **○** |
| GraphQL | ・クエリ柔軟性<br>・Over-fetching解決<br>・型安全性<br>・開発体験良好<br>・API進化への対応 | ・学習コスト高<br>・キャッシュ複雑<br>・N+1問題リスク<br>・設定複雑 | ・複雑データ取得<br>・多様なクライアント<br>・頻繁なAPI進化 | 高 | ★★ | △ |
| **REST+GraphQL** | **・段階的移行可能**<br>**・適材適所利用**<br>**・既存資産活用** | **・運用複雑**<br>**・学習コスト2倍**<br>**・API一貫性課題** | **・既存システム拡張**<br>**・機能による使い分け** | **中** | **★★** | **○** |

## Consequences

### Positive

- シンプルなCRUD要件への最適対応（学習コスト最小化）
- HTTP標準準拠による運用・監視の容易性
- Honoとの最適な組み合わせによる高パフォーマンス
- 豊富なエコシステム（ツール・ライブラリ・知見）
- 100ms要件達成の容易性（CDN・キャッシュ最適化）
- 段階的GraphQL移行オプションの保持

### Negative

- 複雑なデータ取得時のOver-fetching発生
- 関連データ取得での複数リクエスト必要性
- API進化時の後方互換性管理負荷
- GraphQL移行時の追加学習コスト

### Neutral

- 現在の要件には十分対応可能
- 将来要件に応じた技術選択の柔軟性

### Risks and Mitigation

| リスク | 発生確率 | 影響度 | 対策 |
|--------|----------|--------|------|
| 複雑なデータ取得要件の発生 | 中 | 中 | GraphQLエンドポイント段階的追加、REST API設計でGraphQL移行を意識 |
| Over-fetching によるパフォーマンス低下 | 中 | 低 | フィールド選択クエリパラメータ、適切なキャッシュ戦略 |
| API進化時の互換性問題 | 低 | 中 | バージョニング戦略、段階的deprecation |

## Implementation Notes

### Action Items

- [ ] RESTful API設計（OpenAPI仕様書作成）
- [ ] Honoでのルーティング・ミドルウェア設計
- [ ] フィールド選択機能実装（Over-fetching軽減）
- [ ] GraphQL移行を意識したレスポンス構造設計
- [ ] 将来GraphQL検討タイミングの基準策定

### REST API設計指針

```typescript
// GraphQL移行を意識したレスポンス構造
interface QuizResponse {
  id: string
  title: string
  description: string
  // オプショナルで関連データ取得
  questions?: Question[]
  statistics?: QuizStats
  author?: UserProfile
}

// フィールド選択対応
GET /api/quizzes?fields=id,title,description
GET /api/quizzes/{id}?include=questions,statistics
```

### GraphQL移行検討条件

以下の要件が発生した時点でGraphQL導入を再検討：

1. **複雑な検索UI**: 多条件フィルタ、ファセット検索の必要性
2. **ダッシュボード機能**: 統計・分析データの複合表示要件
3. **リアルタイム機能**: サブスクリプションでのライブ更新要件
4. **Over-fetching問題**: パフォーマンス影響が顕著になった場合

### Hono + GraphQL実装参考

```typescript
// 将来のGraphQLエンドポイント追加例
import { Hono } from 'hono'
import { createYoga } from 'graphql-yoga'

const app = new Hono()

// 既存REST API
app.route('/api/v1', restRoutes)

// 将来のGraphQLエンドポイント
const yoga = createYoga({
  schema: quizGraphQLSchema,
  graphqlEndpoint: '/api/graphql'
})
app.use('/api/graphql', yoga)
```

### Timeline

- **決定日**: 2025-07-27
- **実装開始**: API設計工程
- **見直し検討**: 複雑なデータ取得要件発生時
- **完了予定**: REST API基盤完成時

## References

- [GraphQL vs REST API比較](https://graphql.org/learn/thinking-in-graphs/)
- [Hono GraphQL統合例](https://hono.dev/examples/graphql)
- [段階的API移行戦略](https://blog.apollographql.com/migrating-from-rest-to-graphql-3d7b1e1d6b4)
- [ADR-0006: バックエンドフレームワーク選定](0006-backend-framework.md)

---
**Created**: 2025-07-27
**Last Updated**: 2025-07-27
**Authors**: Claude
**Reviewers**: [@tanacchi](https://github.com/tanacchi)
