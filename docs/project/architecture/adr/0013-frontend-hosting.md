# ADR-0013: フロントエンドホスティング選定

## Status

Accepted

## Context

### Background

- クイズアプリケーションのフロントエンド（Next.js 15）をホスティングするプラットフォームの選択が必要
- PWA対応によるオフライン機能実装とスマートフォン最適化が重要要件
- API応答時間100ms要件に対応した高速配信が必要

### Drivers

- **PWA対応**: オフライン機能・プッシュ通知・インストール機能の実装
- **パフォーマンス要件**: 100ms API応答時間とコンテンツ配信の高速化
- **Next.js最適化**: App Routerをフルサポートする最適化されたホスティング
- **開発効率**: 自動デプロイ・プレビュー環境・開発フロー統合
- **コスト効率**: 無料枠での開発・小規模運用

## Decision

### Chosen Option

### Vercel

Next.js 15 App Routerの最適化、PWA対応の容易さ、100ms要件への最適化を重視してVercelを採用する。

### Alternatives Considered

| プラットフォーム | メリット | デメリット | 適用場面 | 無料枠 | パフォーマンス | 判定 |
|------------------|----------|------------|----------|--------|---------------|------|
| **Vercel** | **Next.js最適化、自動デプロイ、エッジ配信、PWA対応** | **ベンダーロック、API制限、コスト上昇** | **Next.js、フロントエンド中心、高速配信** | **100GB/月** | **★★★** | **○** |
| Netlify | Git統合、フォーム対応、Functions、CDN | 遅延問題、ビルド制限、複雑設定時問題 | 静的サイト、JAMstack、シンプル構成 | 100GB/月 | ★★ | △ |
| Cloudflare Pages | 高速配信、無制限帯域、低レイテンシ、エッジ最適化 | 機能限定、新しいサービス、学習コスト | エッジ重視、グローバル配信、高速化 | 無制限 | ★★★ | ○ |

**選定理由**: Next.js最適化、PWA対応、100ms要件への最適化

## Consequences

### Positive

- **Next.js最適化**: App Router・Server Components・Image最適化の完全サポート
- **PWA対応**: Service Worker・Web App Manifest・Push通知の統合サポート
- **高速配信**: エッジネットワークによる世界規模での高速コンテンツ配信
- **自動デプロイ**: Git統合による自動ビルド・デプロイ・プレビュー環境
- **開発体験**: ゼロ設定でのNext.js最適化・リアルタイムプレビュー
- **無料枠充実**: 100GB/月の帯域・無制限ビルド時間

### Negative

- **ベンダーロック**: Vercel固有機能への依存リスク
- **API制限**: Serverless Functions の実行時間・メモリ制限
- **コスト上昇**: トラフィック増加時の従量課金
- **設定制約**: Vercel の設定・制約への適応必要

### Neutral

- 競合他社も類似サービス提供（移行可能性は存在）
- Next.js開発チームによる最新機能の迅速な対応

### Risks and Mitigation

| リスク | 発生確率 | 影響度 | 対策 |
|--------|----------|--------|------|
| コスト上昇（トラフィック増加時） | 中 | 中 | 使用量監視・アラート設定、必要時の他プラットフォーム移行検討 |
| ベンダーロック依存 | 低 | 中 | 標準的なNext.js機能のみ使用、Vercel固有機能の最小化 |
| API制限による機能制約 | 低 | 低 | Cloudflare Workersでのバックエンド分離、制限回避 |

## Implementation Notes

### Action Items

- [ ] Vercel アカウント設定・プロジェクト作成
- [ ] GitHub リポジトリとの連携設定
- [ ] PWA設定（next-pwa設定・Manifest・Service Worker）
- [ ] カスタムドメイン設定（必要時）
- [ ] 環境変数設定（開発・本番分離）

### 設定最適化

#### Next.js設定

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // App Router有効化
  },
  images: {
    domains: ['example.com'], // 外部画像ドメイン
  },
  // PWA設定
  ...withPWA({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  }),
};

module.exports = nextConfig;
```

#### Vercel設定

```json
// vercel.json
{
  "buildCommand": "pnpm build",
  "outputDirectory": ".next",
  "installCommand": "pnpm install",
  "devCommand": "pnpm dev",
  "framework": "nextjs",
  "regions": ["nrt1"], // 東京リージョン優先
  "functions": {
    "pages/api/**/*.ts": {
      "maxDuration": 10
    }
  }
}
```

### パフォーマンス最適化

- **画像最適化**: Next.js Image Componentの活用
- **静的生成**: 可能な限りSSGでの事前生成
- **コード分割**: Dynamic Importによる適切な分割
- **キャッシュ戦略**: Static・Dynamic・Revalidateの適切な設定

### Timeline

- **決定日**: 2025-01-27
- **実装開始**: フロントエンド開発フェーズ
- **完了予定**: 初期デプロイ完了時

## References

- [Vercel Next.js 15 ドキュメント](https://vercel.com/docs/frameworks/nextjs)
- [Next.js PWA 設定ガイド](https://nextjs.org/docs/app/building-your-application/configuring/progressive-web-apps)
- [ADR-0003: フロントエンドフレームワーク選定](0003-frontend-framework.md)

---
**Created**: 2025-01-27
**Last Updated**: 2025-01-27
**Authors**: Claude
**Reviewers**: [@tanacchi](https://github.com/tanacchi)
