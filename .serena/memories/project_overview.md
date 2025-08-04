# Your Quiz - プロジェクト概要

## プロジェクト目的

スマートフォン向けクイズアプリケーション - PWA対応・オフライン機能搭載

## 技術スタック

### フロントエンド

- Framework: Next.js 15 (App Router)
- Styling: Tailwind CSS
- State Management: Jotai
- Language: TypeScript

### バックエンド

- Framework: Hono (TypeScript)
- Database: SQLite + Cloudflare D1
- ORM: Drizzle ORM
- Validation: zod
- Error Handling: neverthrow

### インフラ・運用

- Frontend Hosting: Vercel
- Backend Hosting: Cloudflare Workers
- Database: D1 Database
- CI/CD: GitHub Actions

### 開発・テスト

- Test Framework: Vitest
- E2E Testing: Playwright
- Linting: Biome

## アーキテクチャパターン

- モジュラーモノリス: 小規模チームでの開発効率と将来の拡張性を両立
- ヘキサゴナルアーキテクチャ: ドメインロジックとインフラストラクチャの分離

## パフォーマンス特性

- API応答時間: 100ms以下 (エッジコンピューティング)
- 同時接続: 最大100接続対応
- オフライン対応: Service Worker + IndexedDB
- PWA対応: インストール可能・プッシュ通知対応

## プロジェクト構成

- モノレポ構造 (pnpm workspace)
- api/: Cloudflare Workers APIサーバー
- ui/: Next.js フロントエンドアプリケーション
- docs/: プロジェクトドキュメント
- e2e/: E2Eテスト
