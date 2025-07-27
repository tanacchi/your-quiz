# アーキテクチャ設計ドキュメント

このディレクトリには、クイズアプリケーションのアーキテクチャ策定・技術選定フェーズで作成されたドキュメントが含まれています。

## 推奨読み順

以下の順序で読むことで、システム全体の設計思想から具体的な技術選定まで体系的に理解できます：

### 1. system-overview（システム概要）

- **ファイル**: `system-overview.md`
- **内容**: システム全体のアーキテクチャパターンと設計方針
- **目的**: モジュラーモノリス + ヘキサゴナルアーキテクチャの採用理由と構造を理解

### 2. tech-selection（技術選定比較表）

- **ファイル**: `tech-selection.md`
- **内容**: フロントエンド・バックエンド・インフラの技術比較と選定理由
- **目的**: 各技術のトレードオフと選定根拠を詳細に把握

### 3. diagrams/（アーキテクチャ図表類）

- **ディレクトリ**: `diagrams/`
- **内容**: システム構造を視覚的に表現したMermaid図
- **読み順**:
  1. `system-context.md` - システム全体のコンテキスト
  2. `modular-monolith-structure.md` - モジュラーモノリス構造
  3. `hexagonal-architecture.md` - ヘキサゴナルアーキテクチャ
  4. `quiz-flow.md` - クイズ回答フロー
  5. `data-flow.md` - データフロー

### 4. communication-patterns（通信パターン）

- **ファイル**: `communication-patterns.md`
- **内容**: REST API設計、エラーハンドリング、オフライン同期戦略
- **目的**: システム間通信の設計パターンと実装方針を理解

### 5. data-architecture（データアーキテクチャ）

- **ファイル**: `data-architecture.md`
- **内容**: データ保存戦略、ACID vs BASE、Event Sourcing設計
- **目的**: データ管理の設計思想と実装アプローチを理解

### 6. non-functional-requirements（非機能要件）

- **ファイル**: `non-functional-requirements.md`
- **内容**: 性能（100ms応答）、スケーラビリティ、セキュリティ要件
- **目的**: システムの品質要求と制約条件を把握

## アーキテクチャ設計完了の確認項目

- [ ] 選定したアーキテクチャパターンが図示されている
- [ ] 技術的トレードオフと理由が箇条書きで示されている
- [ ] 全ての技術選定が表形式で比較検討されている
- [ ] アーキテクチャ全体での位置づけが確認されている
- [ ] 選定ライブラリとバージョン、理由が表形式で示されている
- [ ] 比較検討表でトレードオフが明示されている
- [ ] このREADME.mdで読み順が明確に示されている

## 採用技術スタック

### フロントエンド

- Framework: Next.js 15 (App Router)
- Styling: Tailwind CSS
- State: Zustand
- Language: TypeScript

### バックエンド

- Framework: Hono
- Database: SQLite → PostgreSQL
- ORM: Drizzle ORM
- Language: TypeScript

### インフラ・運用

- Frontend Hosting: Vercel
- Backend Hosting: Cloudflare Workers
- Database: D1 Database
- CI/CD: GitHub Actions
- Linting: Biome

## 関連ドキュメント

- 前フェーズ: [仕様策定](../specifications/README.md)
- 次フェーズ: [ドメイン設計](../domain/README.md)（予定）
- ワークフロー: [アーキテクチャ策定工程](../../instructions/shared/workflow/architecture.md)
- 実装マイルストーン: [MILESTONE.md](../../../MILESTONE.md)
