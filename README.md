# Your Quiz

スマートフォン向けクイズアプリケーション - PWA対応・オフライン機能搭載

## 概要

Your Quizは、ユーザーが投稿したクイズを楽しめるモバイルファーストなWebアプリケーションです。承認制によるクイズの品質管理と、オフライン対応によるスムーズなユーザー体験を提供します。

### 主な機能

- 📱 **スマートフォン最適化**: Tinder風UIでのスワイプ操作
- 🔄 **オフライン対応**: PWA技術によるオフライン利用
- ⚡ **高速レスポンス**: API応答時間100ms以下を実現
- 👥 **匿名ユーザー中心**: アカウント登録不要でのクイズ体験
- ✅ **承認制クイズ**: 管理者による品質管理システム

## 技術スタック

### フロントエンド

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **State Management**: Jotai
- **Language**: TypeScript

### バックエンド

- **Framework**: Hono (TypeScript)
- **Database**: SQLite + Cloudflare D1
- **ORM**: Drizzle ORM
- **Validation**: zod
- **Error Handling**: neverthrow

### インフラ・運用

- **Frontend Hosting**: Vercel
- **Backend Hosting**: Cloudflare Workers
- **Database**: D1 Database
- **CI/CD**: GitHub Actions

### 開発・テスト

- **Test Framework**: Vitest
- **E2E Testing**: Playwright
- **Linting**: Biome

## アーキテクチャ

### アーキテクチャパターン

- **モジュラーモノリス**: 小規模チームでの開発効率と将来の拡張性を両立
- **ヘキサゴナルアーキテクチャ**: ドメインロジックとインフラストラクチャの分離

### システム構成

```text
[Browser] ↔ [Vercel CDN] ↔ [Next.js Frontend]
                                    ↓
[IndexedDB Cache] ↔ [Cloudflare Workers API (Hono)]
                                    ↓
                            [D1 Database (SQLite)]
```

## パフォーマンス特性

- **API応答時間**: 100ms以下 (エッジコンピューティング)
- **同時接続**: 最大100接続対応
- **オフライン対応**: Service Worker + IndexedDB
- **PWA対応**: インストール可能・プッシュ通知対応

## ドキュメント

### アーキテクチャ設計

- [技術選定](docs/project/architecture/tech-selection.md) - 採用技術とその理由
- [アーキテクチャパターン](docs/project/adr/0001-architecture-pattern.md) - システム設計の方針
- [データアーキテクチャ](docs/project/architecture/data-architecture.md) - データ設計と一貫性方針
- [非機能要件](docs/project/architecture/non-functional-requirements.md) - パフォーマンス・可用性要件

### 技術決定記録 (ADR)

#### アーキテクチャ・技術選定

- [ADR-0003: フロントエンドフレームワーク](docs/project/adr/0003-frontend-framework.md)
- [ADR-0006: バックエンドフレームワーク](docs/project/adr/0006-backend-framework.md)
- [ADR-0007: データベース選定](docs/project/adr/0007-database.md)
- [ADR-0010: バリデーションライブラリ](docs/project/adr/0010-validation-library.md)
- [ADR-0011: HTTPクライアント](docs/project/adr/0011-http-client.md)
- [ADR-0012: データベースホスティング](docs/project/adr/0012-database-hosting.md)
- [ADR-0013: フロントエンドホスティング](docs/project/adr/0013-frontend-hosting.md)
- [ADR-0014: APIホスティング](docs/project/adr/0014-api-hosting.md)

#### DDD設計決定

- [ADR-0016: 境界づけられたコンテキスト分割決定](docs/project/adr/0016-bounded-context-division.md)
- [ADR-0017: 集約設計とルート決定](docs/project/adr/0017-aggregate-design.md)
- [ADR-0018: ドメインサービス抽出決定](docs/project/adr/0018-domain-service-extraction.md)
- [ADR-0019: リポジトリパターン採用決定](docs/project/adr/0019-repository-pattern-adoption.md)

#### 全ADR一覧

[docs/project/adr/README.md](docs/project/adr/README.md)

### 設計図

- [システムコンテキスト図](docs/project/architecture/diagrams/system-context.md)
- [クイズフロー](docs/project/architecture/diagrams/quiz-flow.md)

### 開発ワークフロー

- [ワークフロー概要](docs/instructions/shared/workflow/README.md)
- [アーキテクチャ工程](docs/instructions/shared/workflow/architecture.md)
- [開発ルール](docs/instructions/shared/README.md)

## 開発環境

### 前提条件

- Node.js 18+
- pnpm
- Cloudflare アカウント (D1 Database)

### セットアップ

```bash
# リポジトリクローン
git clone https://github.com/tanacchi/your-quiz.git
cd your-quiz

# 依存関係インストール
pnpm install

# 環境変数設定
cp .env.example .env.local

# 開発サーバー起動
pnpm dev
```

### 開発コマンド

```bash
# フロントエンド開発サーバー
pnpm dev

# バックエンド開発 (Cloudflare Workers)
pnpm wrangler dev

# テスト実行
pnpm test

# E2Eテスト
pnpm test:e2e

# リント・フォーマット
pnpm lint
pnpm format

# ビルド
pnpm build
```

## デプロイ

### フロントエンド (Vercel)

- main ブランチへのプッシュで自動デプロイ
- PR作成時にプレビュー環境自動作成

### バックエンド (Cloudflare Workers)

- GitHub Actions経由で自動デプロイ
- D1 Database マイグレーション自動実行

## ライセンス

MIT License

---

**Created**: 2025-01-27
**Maintainer**: [@tanacchi](https://github.com/tanacchi)
