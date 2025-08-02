# Architecture Decision Records (ADR)

このディレクトリには、プロジェクトのアーキテクチャに関する重要な決定事項を記録したADRが含まれています。

## ADR一覧

| 番号 | タイトル | ステータス | 決定日 | 概要 |
|------|----------|------------|--------|------|
| [0001](0001-architecture-pattern.md) | システムアーキテクチャパターン選定 | Accepted | 2025-07-27 | モノリス vs マイクロサービス選定 |
| [0002](0002-application-architecture.md) | アプリケーションアーキテクチャパターン選定 | Accepted | 2025-07-27 | ヘキサゴナルアーキテクチャ採用 |
| [0003](0003-frontend-framework.md) | フロントエンドフレームワーク選定 | Accepted | 2025-07-27 | Next.js 15採用決定 |
| [0004](0004-ui-styling.md) | UIスタイリング手法選定 | Accepted | 2025-07-27 | Tailwind CSS採用決定 |
| [0005](0005-state-management.md) | フロントエンド状態管理選定 | Accepted | 2025-07-27 | Jotai採用決定 |
| [0006](0006-backend-framework.md) | バックエンドフレームワーク選定 | Accepted | 2025-07-27 | Hono採用決定 |
| [0007](0007-database.md) | データベース選定 | Accepted | 2025-07-27 | SQLite/PostgreSQL採用決定 |
| [0008](0008-api-hosting.md) | APIホスティング選定 | Accepted | 2025-07-27 | Cloudflare Workers採用決定 |
| [0009](0009-orm-selection.md) | ORM選定 | Accepted | 2025-07-27 | Drizzle ORM採用決定 |
| [0010](0010-validation-library.md) | バリデーションライブラリ選定 | Accepted | 2025-07-27 | Zod採用決定 |
| [0011](0011-http-client.md) | HTTPクライアント選定 | Accepted | 2025-07-27 | Fetch API採用決定 |
| [0012](0012-database-hosting.md) | データベースホスティング選定 | Accepted | 2025-07-27 | D1 Database採用決定 |
| [0013](0013-frontend-hosting.md) | フロントエンドホスティング選定 | Accepted | 2025-07-27 | Vercel採用決定 |
| [0014](0014-api-hosting.md) | APIホスティング選定（詳細） | Accepted | 2025-07-27 | Cloudflare Workers詳細設定 |
| [0015](0015-api-query-language.md) | APIクエリ言語選定 | Accepted | 2025-07-27 | REST API採用決定 |
| [0016](0016-bounded-context-division.md) | 境界づけられたコンテキスト分割決定 | Proposed | 2025-07-28 | 4つのコンテキスト分割採用 |
| [0017](0017-aggregate-design.md) | 集約設計とルート決定 | Proposed | 2025-07-28 | 4つの集約設計採用 |
| [0018](0018-domain-service-extraction.md) | ドメインサービス抽出決定 | Proposed | 2025-07-28 | 4つのドメインサービス抽出 |
| [0019](0019-repository-pattern-adoption.md) | リポジトリパターン採用決定 | Proposed | 2025-07-28 | 集約単位リポジトリ採用 |
| [0020](0020-bdd-testing-framework.md) | BDDテスティングフレームワーク選定 | Proposed | 2025-01-31 | Cucumber.js + Vitest採用決定 |

## ステータス定義

- **Proposed**: 提案中・レビュー待ち
- **Accepted**: 承認済み・有効
- **Deprecated**: 非推奨・段階的廃止予定
- **Superseded**: 他のADRにより置き換え済み

## ADR作成ガイドライン

新しいADRを作成する場合は、[docs/instructions/shared/workflow/adr-management.md](docs/instructions/shared/workflow/adr-management.md) の標準テンプレートを使用してください。

### 作成手順

1. 最新のADR番号を確認し、連番で新しい番号を採番
2. ADR管理手順書のテンプレートをコピー
3. ステータス「Proposed」で内容を記述
4. レビュー依頼を実施
5. 承認後、ステータスを「Accepted」に変更

### 重要な留意事項

- 新規ADRは必ず「Proposed」ステータスで作成
- 「Accepted」への変更は指示者（[@tanacchi](https://github.com/tanacchi)）のみが実行
- ADRは削除せず、ステータス変更で管理

## 関連ドキュメント

- [ADR管理手順書](docs/instructions/shared/workflow/adr-management.md)
- [技術選定比較表](docs/project/architecture/tech-selection.md)
- [システム概要](docs/project/architecture/system-overview.md)

---

**作成日**: 2025-07-28  
**最終更新**: 2025-07-28  
**管理者**: [@tanacchi](https://github.com/tanacchi)
