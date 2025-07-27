# ADR-0008: APIホスティング選定

## Status
Accepted

## Context

### Background
- クイズアプリケーションのAPIホスティングプラットフォーム選択が必要
- Honoフレームワーク使用に最適化されたホスティング環境が重要
- 費用面（できる限り無料）とパフォーマンス（高速）のバランスを重視
- 100ms API応答要件の達成が必須

### Drivers
- **パフォーマンス要件**: 100ms API応答時間の達成
- **コスト最適化**: 無料枠での運用、最小限のコスト
- **Hono最適化**: フレームワークとの親和性・最適動作
- **運用シンプル化**: 小規模チームでの管理容易性
- **スケーラビリティ**: 将来的な負荷増加への対応
- **開発効率**: 迅速なデプロイ・開発体験

## Decision

### Chosen Option
**Cloudflare Workers + D1 Database**

HonoがCloudflare Workers向けに設計されており最高の親和性を持ち、エッジ実行でコールドスタートなし（~1ms起動）による100ms要件対応が可能であることから、Cloudflare Workersを採用する。

### Alternatives Considered

| プラットフォーム | メリット | デメリット | 適用場面 | 無料枠 | パフォーマンス | 技術適合性 | 判定 |
|------------------|----------|------------|----------|--------|---------------|------------|------|
| **Cloudflare Workers** | **・超高速エッジ実行**<br>**・コールドスタートなし**<br>**・無制限リクエスト**<br>**・Hono最適化設計**<br>**・低コスト**<br>**・グローバル配信** | **・実行時間制限（CPU時間）**<br>**・Node.js制限**<br>**・デバッグ困難**<br>**・ファイルシステムなし** | **・エッジAPI**<br>**・高トラフィック**<br>**・シンプル処理**<br>**・レイテンシ重視** | **100,000req/日** | **★★★** | **Hono最適化** | **○** |
| Railway | シンプル設定、DB統合、Git連携、スケーリング自動 | 新しいサービス、実績少、料金体系変更リスク | フルスタック、小中規模、MVP開発 | $5クレジット/月 | ★★★ | Hono対応 | △ |
| Render | Docker対応、DB統合、自動デプロイ、実績豊富 | 無料枠制限厳しい、スリープ問題、設定複雑 | Docker化、安定運用、エンタープライズ | 750時間/月 | ★★ | Hono対応 | △ |
| Fly.io | エッジ配信、低レイテンシ、Docker最適、グローバル展開 | 設定複雑、学習コスト高、課金体系複雑 | エッジコンピューティング、レイテンシ重視 | $5クレジット/月 | ★★★ | Hono最適 | △ |
| Supabase Functions | PostgreSQL統合、Edge Functions、Auth統合、TypeScript | Serverless制限、実行時間制限、デバッグ困難 | DB重視、Auth必要、Serverless | 500MB DB無料 | ★★ | TypeScript対応 | △ |
| PlanetScale + Vercel Functions | MySQL互換、ブランチング、自動スケール、エッジ | コスト高、ベンダーロック、複雑構成 | 大規模DB、ブランチ運用 | 10GB DB無料 | ★★ | 要適合作業 | △ |
| Heroku | 成熟プラットフォーム、豊富なアドオン、Git連携 | 無料枠廃止、高コスト、スリープ問題 | 従来開発、アドオン重視 | なし（有料のみ） | ★★ | 要適合作業 | × |

## Consequences

### Positive
- **圧倒的な高速性**: エッジ実行・コールドスタートなし（~1ms起動時間）
- **100ms要件達成**: グローバルエッジ配信による最適なレイテンシ
- **Hono最適化**: フレームワーク設計レベルでの親和性・最適化
- **十分な無料枠**: 100,000リクエスト/日（クイズアプリには十分）
- **運用シンプル**: 単一プラットフォームで完結、管理負荷最小
- **グローバル配信**: 世界規模でのエッジ配信・高可用性

### Negative
- **実行時間制限**: 長時間処理には不適（CPUバウンド処理制限）
- **Node.js制限**: 一部のNode.js機能・ライブラリ使用不可
- **デバッグ困難**: ローカルデバッグ・ログ取得の制約
- **ファイルシステムなし**: 一時ファイル作成・永続化不可

### Neutral
- **Serverless特性**: インフラ管理不要・自動スケール
- **Web標準API**: モダンなAPIベースの開発

### Risks and Mitigation

| リスク | 発生確率 | 影響度 | 対策 |
|--------|----------|--------|------|
| 実行時間制限による機能制約 | 低 | 中 | シンプル処理設計、複雑処理の分割・非同期化 |
| デバッグ困難による開発効率低下 | 中 | 低 | ローカルエミュレータ活用、ログ設計充実 |
| ベンダーロックイン | 中 | 中 | ヘキサゴナルアーキテクチャでの分離、移行計画策定 |

## Implementation Notes

### Action Items
- [ ] Cloudflare Workers プロジェクト初期設定
- [ ] Hono + Workers 統合設定
- [ ] D1 Database 接続設定
- [ ] エッジ環境最適化
- [ ] デプロイパイプライン構築
- [ ] 監視・ログ設定

### パフォーマンス最適化
```typescript
// Cloudflare Workers + Hono 最適化設定
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

const app = new Hono()

// ミドルウェア設定
app.use('*', cors())
app.use('*', logger())

// エッジ最適化されたクイズAPI
app.get('/api/quiz', async (c) => {
  const { results } = await c.env.DB.prepare(
    'SELECT * FROM quizzes ORDER BY RANDOM() LIMIT 1'
  ).all()
  
  return c.json(results[0])
})
```

### 制約への対応
- **実行時間制限**: CRUD中心の単純処理で対応
- **Node.js制限**: Web標準API活用、互換ライブラリ使用
- **デバッグ**: wrangler dev、ログベースデバッグ

### Timeline
- **決定日**: 2025-01-27
- **実装開始**: インフラ設定フェーズ
- **完了予定**: デプロイ環境構築完了時

## References

- [Cloudflare Workers ドキュメント](https://developers.cloudflare.com/workers/)
- [Hono + Cloudflare Workers ガイド](https://hono.dev/getting-started/cloudflare-workers)
- [D1 Database 統合](https://developers.cloudflare.com/d1/)
- [ADR-0006: バックエンドフレームワーク選定](0006-backend-framework.md)

---
**Created**: 2025-01-27
**Last Updated**: 2025-01-27
**Authors**: Claude
**Reviewers**: TBD