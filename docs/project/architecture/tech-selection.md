
# 技術選定

## フロントエンド技術選定

### フレームワーク選定

**選定結果**: Next.js 15 (App Router)

**選定理由**: PWA対応によるオフライン機能実装が容易で、スマートフォン最適化・TypeScript開発体験・将来のSEO対応への拡張性が最適。

**詳細な比較検討**: [ADR-0003: フロントエンドフレームワーク選定](docs/project/adr/0003-frontend-framework.md)

### UI・スタイリング

**選定結果**: Tailwind CSS

**選定理由**: Tinder風UI（スワイプ）実装時のアニメーション・レスポンシブ対応が容易で、カスタムデザインとモバイル最適化に最適。

**詳細な比較検討**: [ADR-0004: UI・スタイリング技術選定](docs/project/adr/0004-ui-styling.md)

### 状態管理

**選定結果**: Jotai

**選定理由**: 理論的に美しい原子的状態管理を重視し、適度な複雑さを持つ状態依存関係に最適。細粒度レンダリング最適化と軽量性（~4KB）を両立。2025年トレンドで複雑な状態相互依存がある中規模アプリでの推奨選択。

**詳細な比較検討**: [ADR-0005: 状態管理ライブラリ選定](docs/project/adr/0005-state-management.md)

## バックエンド技術選定

### APIフレームワーク

**選定結果**: Hono

**選定理由**: API応答時間100ms要件への最適化、TypeScriptファーストの開発体験、シンプルなAPI要件（CRUD中心）に適合。

**詳細な比較検討**: [ADR-0006: バックエンドフレームワーク選定](docs/project/adr/0006-backend-framework.md)

### データベース選定

**選定結果**: SQLite + Cloudflare D1

**選定理由**: クイズアプリの要件がシンプルなCRUD処理中心で、Cloudflare Workers統合による運用統一とパフォーマンス向上を重視。小規模チームでの運用効率を最優先。

**詳細な比較検討**: [ADR-0007: データベース選定](docs/project/adr/0007-database.md)

### ORM選定

**選定結果**: Drizzle ORM

**選定理由**: TypeScript特化・軽量・SQL透明性・型安全性が現状の要件に最適。SQLite + D1での優れた動作実績とパフォーマンス要件を満たす。

**詳細な比較検討**: [ADR-0009: ORM選定](docs/project/adr/0009-orm-selection.md)

## インフラ・運用技術選定

### フロントエンドホスティング

**選定結果**: Vercel

**選定理由**: Next.js最適化、PWA対応、100ms要件への最適化

**詳細な比較検討**: [ADR-0013: フロントエンドホスティング選定](docs/project/adr/0013-frontend-hosting.md)

### APIホスティング（バックエンド）

**選定結果**: Cloudflare Workers + D1 Database

**選定理由**: Hono最適化、エッジ実行による100ms要件対応、D1統合による運用シンプル性

**詳細な比較検討**: [ADR-0014: APIホスティング選定](docs/project/adr/0014-api-hosting.md)

### バリデーションライブラリ

**選定結果**: zod

**選定理由**: TypeScript First設計による優秀な型推論、カスタムバリデーション機能、充実したエコシステムを重視。

**詳細な比較検討**: [ADR-0010: バリデーションライブラリ選定](docs/project/adr/0010-validation-library.md)

### HTTPクライアント

**選定結果**: fetch (native)

**選定理由**: シンプルかつモダンで標準技術であることを重視。クイズアプリのシンプルなAPI通信要件には十分で、追加依存なしでバンドルサイズを最小化できる。

**詳細な比較検討**: [ADR-0011: HTTPクライアント選定](docs/project/adr/0011-http-client.md)

### エラーハンドリングライブラリ

**選定結果**: neverthrow

**選定理由**: TypeScript環境に最適化されており型安全性が高い、Result型による統一的なエラーハンドリングが実現可能。

### テストフレームワーク

**選定結果**: Vitest（単体テスト）+ PactumJS（BDD/APIテスト）

**選定理由**: Vitestは高速なユニットテスト実行とTypeScript対応、PactumJSはAPIテストの型安全性とOpenAPI自動検証による開発効率向上を重視。

**BDD詳細**: [ADR-0023: PactumJS移行決定](../adr/0023-bdd-framework-migration-pactum.md)

### 型定義・コード生成ツール

**選定結果**: openapi-typescript

**選定理由**: OpenAPI仕様から自動で型定義を生成できるため、型安全性と保守性が高い、フロントエンド・バックエンド間の型不整合リスクを低減できる。

### データベースホスティング

**選定結果**: D1 Database (Cloudflare)

**選定理由**: SQLite互換でシンプル、25GB無料枠、エッジ配置による高速アクセス、Cloudflare Workers完全統合を重視。

**詳細な比較検討**: [ADR-0012: データベースホスティング選定](docs/project/adr/0012-database-hosting.md)

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

- Unit Test Framework: Vitest
- BDD/API Testing: PactumJS
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
