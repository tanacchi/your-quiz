# ADR-0006: バックエンドAPIフレームワーク選定

## Status
Accepted

## Context

### Background
- クイズアプリケーションのバックエンドAPIフレームワーク選択が必要
- API応答時間100ms要件とシンプルなCRUD中心の処理が主要な考慮事項
- TypeScript統一による開発体験向上とCloudflare Workers最適化を重視する

### Drivers
- **パフォーマンス要件**: API応答時間100ms以内の達成
- **技術統一**: TypeScriptフルスタック開発
- **アーキテクチャ適合**: ヘキサゴナルアーキテクチャ対応
- **エッジ最適化**: Cloudflare Workers環境での最適動作
- **開発効率**: シンプルなCRUD処理の迅速な実装
- **チーム規模**: 小規模チーム（1-2名）での管理容易性

## Decision

### Chosen Option
**Hono**

API応答時間100ms要件への最適化、TypeScriptファーストの開発体験、シンプルなAPI要件（CRUD中心）への適合性から、Honoを採用する。

### Alternatives Considered

| フレームワーク | メリット | デメリット | 適用場面 | パフォーマンス | TypeScript対応 | エコシステム | 判定 |
|---------------|----------|------------|----------|---------------|---------------|------------|------|
| **Hono** | **・超軽量（~12KB）**<br>**・TypeScript設計**<br>**・エッジ対応**<br>**・Cloudflare Workers最適**<br>**・100ms要件対応**<br>**・設定シンプル**<br>**・ゼロ依存** | **・エコシステム小**<br>**・実績少**<br>**・プラグイン限定**<br>**・コミュニティ小**<br>**・複雑機能制限** | **・パフォーマンス重視**<br>**・軽量API**<br>**・エッジコンピューティング**<br>**・TypeScript**<br>**・CRUD中心** | **★★★** | **★★★** | **★** | **○** |
| Nest.js | ・成熟フレームワーク<br>・DI・デコレータ<br>・エコシステム豊富<br>・エンタープライズ対応<br>・TypeScript標準<br>・アーキテクチャ確立 | ・重い（~1MB+）<br>・設定複雑<br>・学習コスト高<br>・オーバーヘッド大<br>・エッジ環境不適<br>・起動時間長 | ・大規模API<br>・複雑ビジネスロジック<br>・チーム開発<br>・エンタープライズ<br>・従来サーバー環境 | ★★ | ★★★ | ★★★ | △ |
| Express.js | ・成熟・実績豊富<br>・エコシステム大<br>・学習リソース多<br>・柔軟性高<br>・プラグイン豊富 | ・TypeScript設定複雑<br>・パフォーマンス制限<br>・エッジ環境不適<br>・セキュリティ要注意<br>・古いアーキテクチャ | ・従来開発<br>・豊富な機能要求<br>・レガシー統合<br>・Node.js環境 | ★★ | ★ | ★★★ | △ |
| Fastify | ・高パフォーマンス<br>・TypeScript対応<br>・JSON Schema<br>・プラグイン対応<br>・軽量 | ・エッジ環境制限<br>・学習コスト中<br>・エコシステム中<br>・設定複雑化 | ・高速API<br>・Node.js環境<br>・JSON重視<br>・パフォーマンス重視 | ★★★ | ★★ | ★★ | △ |

## Consequences

### Positive
- 超軽量（~12KB）によるエッジ環境での高速起動・実行
- TypeScriptファースト設計による型安全性と開発体験
- Cloudflare Workers最適化による100ms応答要件の達成
- ゼロ依存による依存関係管理の簡素化
- シンプルなCRUD処理への適合性
- 設定・ボイラープレートの最小化

### Negative
- エコシステムの制約（プラグイン・ミドルウェア限定）
- 実績・コミュニティの小ささによる情報不足
- 複雑なビジネスロジック実装時の制限
- エンタープライズ機能（認証・認可・監査等）の制限

### Neutral
- モダンなWeb標準APIベースの設計
- 必要十分な機能セットでの要件対応

### Risks and Mitigation

| リスク | 発生確率 | 影響度 | 対策 |
|--------|----------|--------|------|
| 将来の複雑機能要求への対応不足 | 中 | 中 | ヘキサゴナルアーキテクチャでの分離、段階的なNest.js移行計画 |
| エコシステム制約による開発効率低下 | 中 | 低 | 必要機能の事前検証、カスタム実装での対応 |
| コミュニティサポート不足 | 中 | 低 | 公式ドキュメント重視、内部ナレッジ蓄積 |

## Implementation Notes

### Action Items
- [ ] Hono プロジェクト初期設定
- [ ] Cloudflare Workers デプロイ設定
- [ ] TypeScript設定最適化
- [ ] ヘキサゴナルアーキテクチャ適用
- [ ] API エンドポイント設計
- [ ] エラーハンドリング・ミドルウェア実装

### アーキテクチャ設計
```typescript
// Honoアプリケーション構造
import { Hono } from 'hono'

// ポート（ユースケース）
interface QuizUseCasePort {
  getQuiz(): Promise<Quiz>
  submitAnswer(answer: Answer): Promise<Result>
}

// アダプター（Honoコントローラー）
const app = new Hono()
app.get('/api/quiz', async (c) => {
  const usecase = container.get(QuizUseCasePort)
  const quiz = await usecase.getQuiz()
  return c.json(quiz)
})
```

### パフォーマンス最適化
- **エッジ実行**: Cloudflare Workers でのコールドスタート最小化
- **軽量化**: 最小限の依存関係でバンドルサイズ削減
- **型安全性**: TypeScript厳密モードでの実行時エラー防止

### Timeline
- **決定日**: 2025-01-27
- **実装開始**: バックエンド開発フェーズ
- **完了予定**: API基盤構築完了時

## References

- [Hono 公式ドキュメント](https://hono.dev/)
- [Cloudflare Workers + Hono ガイド](https://hono.dev/getting-started/cloudflare-workers)
- [ADR-0008: APIホスティング選定](0008-api-hosting.md)

---
**Created**: 2025-01-27
**Last Updated**: 2025-01-27
**Authors**: Claude
**Reviewers**: TBD