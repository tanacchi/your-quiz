
# 技術選定

## フロントエンド技術選定

### フレームワーク選定

**選定結果**: Next.js 15 (App Router)

**選定理由**: PWA対応によるオフライン機能実装が容易で、スマートフォン最適化・TypeScript開発体験・将来のSEO対応への拡張性が最適。

**詳細な比較検討**: [ADR-0003: フロントエンドフレームワーク選定](adr/0003-frontend-framework.md)

### UI・スタイリング

**選定結果**: Tailwind CSS

**選定理由**: Tinder風UI（スワイプ）実装時のアニメーション・レスポンシブ対応が容易で、カスタムデザインとモバイル最適化に最適。

**詳細な比較検討**: [ADR-0004: UI・スタイリング技術選定](adr/0004-ui-styling.md)

### 状態管理

**選定結果**: Zustand

**選定理由**: クイズ状態・履歴管理の要件がシンプルで、TypeScriptとの親和性・軽量性（~3KB）・設定容易さが最適。2025年トレンドで中小規模アプリの標準的選択。

**詳細な比較検討**: [ADR-0005: 状態管理ライブラリ選定](adr/0005-state-management.md)

## バックエンド技術選定

### APIフレームワーク

**選定結果**: Hono

**選定理由**: API応答時間100ms要件への最適化、TypeScriptファーストの開発体験、シンプルなAPI要件（CRUD中心）に適合。

**詳細な比較検討**: [ADR-0006: バックエンドフレームワーク選定](adr/0006-backend-framework.md)

### データベース選定

**選定結果**: SQLite + Cloudflare D1

**選定理由**: クイズアプリの要件がシンプルなCRUD処理中心で、Cloudflare Workers統合による運用統一とパフォーマンス向上を重視。小規模チームでの運用効率を最優先。

**詳細な比較検討**: [ADR-0007: データベース選定](adr/0007-database.md)

### ORM選定

**選定結果**: Drizzle ORM

**選定理由**: TypeScript特化・軽量・SQL透明性・型安全性が現状の要件に最適。SQLite + D1での優れた動作実績とパフォーマンス要件を満たす。

**詳細な比較検討**: [ADR-0009: ORM選定](adr/0009-orm-selection.md)

## インフラ・運用技術選定

### フロントエンドホスティング

| プラットフォーム | メリット | デメリット | 適用場面 | 無料枠 | パフォーマンス | 判定 |
|------------------|----------|------------|----------|--------|---------------|------|
| **Vercel** | **Next.js最適化、自動デプロイ、エッジ配信、PWA対応** | **ベンダーロック、API制限、コスト上昇** | **Next.js、フロントエンド中心、高速配信** | **100GB/月** | **★★★** | **○** |
| Netlify | Git統合、フォーム対応、Functions、CDN | 遅延問題、ビルド制限、複雑設定時問題 | 静的サイト、JAMstack、シンプル構成 | 100GB/月 | ★★ | △ |
| Cloudflare Pages | 高速配信、無制限帯域、低レイテンシ、エッジ最適化 | 機能限定、新しいサービス、学習コスト | エッジ重視、グローバル配信、高速化 | 無制限 | ★★★ | ○ |

**選定結果**: Vercel

**選定理由**: Next.js最適化、PWA対応、100ms要件への最適化

### APIホスティング（バックエンド）

| プラットフォーム | メリット | デメリット | 適用場面 | 無料枠 | パフォーマンス | 技術適合性 | 判定 |
|------------------|----------|------------|----------|--------|---------------|------------|------|
| Cloudflare Workers | 超高速、エッジ実行、無制限リクエスト、低コスト | 実行時間制限、Node.js制限、デバッグ困難 | エッジAPI、高トラフィック、シンプル処理 | 100,000req/日 | ★★★ | Hono最適化 | ○ |
| Railway | シンプル設定、DB統合、Git連携、スケーリング自動 | 新しいサービス、実績少、料金体系変更リスク | フルスタック、小中規模、MVP開発 | $5クレジット/月 | ★★★ | Hono対応 | ○ |
| Render | Docker対応、DB統合、自動デプロイ、実績豊富 | 無料枠制限厳しい、スリープ問題、設定複雑 | Docker化、安定運用、エンタープライズ | 750時間/月 | ★★ | Hono対応 | △ |
| Fly.io | エッジ配信、低レイテンシ、Docker最適、グローバル展開 | 設定複雑、学習コスト高、課金体系複雑 | エッジコンピューティング、レイテンシ重視 | $5クレジット/月 | ★★★ | Hono最適 | ○ |
| Supabase Functions | PostgreSQL統合、Edge Functions、Auth統合、TypeScript | Serverless制限、実行時間制限、デバッグ困難 | DB重視、Auth必要、Serverless | 500MB DB無料 | ★★ | TypeScript対応 | △ |
| PlanetScale + Vercel Functions | MySQL互換、ブランチング、自動スケール、エッジ | コスト高、ベンダーロック、複雑構成 | 大規模DB、ブランチ運用 | 10GB DB無料 | ★★ | 要適合作業 | △ |

#### 詳細比較：Railway vs Fly.io vs Cloudflare Workers

| 項目 | Railway | Fly.io | Cloudflare Workers |
|------|---------|--------|-------------------|
| **起動時間** | ~500ms | ~200ms | ~1ms |
| **コールドスタート** | あり | あり | なし |
| **100ms要件対応** | △（ウォームアップ必要） | ○（エッジ配置） | ○（エッジネイティブ） |
| **データベース** | 統合PostgreSQL | 外部接続 | 外部接続（D1/KV） |
| **無料枠** | $5/月クレジット | $5/月クレジット | 100,000req/日 |
| **運用負荷** | 低 | 中 | 低 |
| **学習コスト** | 低 | 中 | 中 |

**選定結果**: Cloudflare Workers + D1 Database
**選定理由**:

1. HonoはCloudflare Workers向けに設計されており最高の親和性
2. 100ms要件対応: エッジ実行でコールドスタートなし（~1ms起動）
3. 十分な無料枠: 100,000リクエスト/日 + 25GB DB - クイズアプリには十分
4. クイズアプリの特性: 複雑なクエリ不要、CRUD中心の単純な処理
5. 運用シンプル: 単一プラットフォームで完結、管理負荷最小
6. **方針転換**: 当初PostgreSQL互換性を重視したが、クイズアプリの要件分析の結果、運用統一とパフォーマンスを優先してSQLite + D1完全採用。

### バリデーションライブラリ

**選定結果**: zod

**選定理由**: TypeScript First設計による優秀な型推論、カスタムバリデーション機能、充実したエコシステムを重視。

**詳細な比較検討**: [ADR-0010: バリデーションライブラリ選定](adr/0010-validation-library.md)

### HTTPクライアント

**選定結果**: fetch (native)

**選定理由**: シンプルかつモダンで標準技術であることを重視。クイズアプリのシンプルなAPI通信要件には十分で、追加依存なしでバンドルサイズを最小化できる。

**詳細な比較検討**: [ADR-0011: HTTPクライアント選定](adr/0011-http-client.md)

### エラーハンドリングライブラリ

**選定結果**: neverthrow

**選定理由**: TypeScript環境に最適化されており型安全性が高い、Result型による統一的なエラーハンドリングが実現可能。

### テストフレームワーク

**選定結果**: Vitest

**選定理由**: Viteとの統合により高速なテスト実行が可能、TypeScript対応が優秀で型安全なテストが実現できる。

### 型定義・コード生成ツール

**選定結果**: openapi-typescript

**選定理由**: OpenAPI仕様から自動で型定義を生成できるため、型安全性と保守性が高い、フロントエンド・バックエンド間の型不整合リスクを低減できる。

### データベースホスティング

**選定結果**: D1 Database (Cloudflare)

**選定理由**: SQLite互換でシンプル、25GB無料枠、エッジ配置による高速アクセス、Cloudflare Workers完全統合を重視。

**詳細な比較検討**: [ADR-0012: データベースホスティング選定](adr/0012-database-hosting.md)

### 開発ツール（Linting・フォーマット）

**選定結果**: Biome

**選定理由**: TypeScript開発体験の最適化、設定の単純化、Rust製で高速処理がLint+Format統合で実現。

### CI/CD・デプロイメント

**選定結果**: GitHub Actions

**選定理由**: GitHub中心の開発フローとの統合、Vercel・Cloudflare Workers自動デプロイとの親和性、小規模チームでの運用負荷軽減。

### E2Eテストフレームワーク

**選定結果**: Playwright

**選定理由**: Next.jsやPWA環境との高い互換性、TypeScriptによる型安全なテスト記述、CI/CD（GitHub Actions）との統合が容易。

## まとめ

### 採用技術スタック

**フロントエンド**:

- Framework: Next.js 15 (App Router)
- Styling: Tailwind CSS
- State: Zustand
- Language: TypeScript

**バックエンド**:

- Framework: Hono
- Database: SQLite (D1)
- ORM: Drizzle ORM
- Validation: zod
- HTTP Client: fetch (native)
- Error Handling: neverthrow
- Language: TypeScript

**インフラ・運用**:

- Frontend Hosting: Vercel
- Backend Hosting: Cloudflare Workers
- Database: D1 Database
- CI/CD: GitHub Actions
- Linting: Biome

**開発・テスト**:

- Test Framework: Vitest
- E2E Testing: Playwright
- Type Generation: openapi-typescript

### アーキテクチャ整合性確認

- ✅ モジュラーモノリス: 単一リポジトリ、境界明確なモジュール構成
- ✅ ヘキサゴナルアーキテクチャ: Drizzle ORMによるリポジトリパターン実装
- ✅ TypeScript統一: フロントエンド・バックエンド全体での型安全性
- ✅ パフォーマンス要件: Hono + Cloudflare Workers エッジ実行による100ms要件対応
- ✅ PWA対応: Next.js + Vercelによるオフライン機能実装
- ✅ 費用効率: Cloudflare Workers（100,000req/日無料）+ D1 Database（25GB無料）
- ✅ 運用シンプル: 単一プラットフォーム（Cloudflare）で完結
