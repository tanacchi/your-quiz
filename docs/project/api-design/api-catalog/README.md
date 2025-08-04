# API Catalog Directory

Your Quiz アプリケーションの包括的なAPI仕様書を、ドメイン別に整理したディレクトリです。

## ファイル構成

### 1. [Quiz Management API](01-quiz-management.md)

**ドメイン**: Quiz Management Context  
**責務**: クイズのCRUD操作、承認フロー管理、下書き管理、コンテンツ品質管理

- クイズ投稿・編集・削除
- 承認ワークフロー
- 下書き保存・同期
- 作成者統計

### 2. [Quiz Learning API](02-quiz-learning.md)

**ドメイン**: Quiz Learning Context  
**責務**: Deck生成・管理、学習セッション管理、回答処理・正誤判定、履歴・統計管理

- Deck作成・管理
- 学習セッション実行
- 回答提出・判定
- 学習履歴・統計

### 3. [User Session API](03-user-session.md)

**ドメイン**: User Session Context  
**責務**: 匿名ユーザー識別・セッション管理、作成者権限・デバイス識別、プライバシー保護

- セッション管理
- 匿名ユーザー管理
- 作成者権限管理
- ユーザー設定

### 4. [Offline Sync API](04-offline-sync.md)

**ドメイン**: Sync Context  
**責務**: オフライン対応データ管理、同期処理・競合解決、キャッシュ管理・データ整合性

- キャッシュ管理
- 同期処理
- 競合解決
- バッチ処理

### 5. [Search & Discovery API](05-search-discovery.md)

**ドメイン**: Search & Discovery Context  
**責務**: 全文検索機能、フィルタリング・ソート機能、推奨システム

- 基本・高度検索
- 推奨システム
- トレンド機能
- オートコンプリート

### 6. [Integration Patterns](06-integration-patterns.md)

**ドメイン**: Cross-Context Integration  
**責務**: コンテキスト間のAPI連携パターン、データ変換、GraphQL統合

- Published Language連携
- Anti-Corruption Layer
- GraphQL統合API
- 統合ワークフロー

### 7. [Common Specifications](07-common-specs.md)

**ドメイン**: Common Specifications  
**責務**: 認証・認可仕様、共通レスポンス形式、エラーハンドリング、パフォーマンス最適化

- 認証・認可
- レスポンス形式
- エラーコード体系
- パフォーマンス戦略

### 8. [Operations & Monitoring](08-operations.md)

**ドメイン**: Operations & Monitoring  
**責務**: システムヘルスチェック、パフォーマンス監視、ユーザー行動分析、運用メトリクス

- ヘルスチェック
- メトリクス収集
- ユーザー行動分析
- アラート管理

## API統計情報

- **総エンドポイント数**: 87個
- **ドメイン数**: 5個（Quiz Management, Quiz Learning, User Session, Sync, Search & Discovery）
- **支援機能**: 3個（Integration, Common Specs, Operations）
- **対応UI画面**: 23画面
- **対応機能**: 87機能

## 設計方針

### 1. DDD準拠

各APIは境界づけられたコンテキスト（Bounded Context）に基づいて分離されており、ドメイン駆動設計の原則に従っています。

### 2. UI完全対応

すべてのUI機能に対応するAPIを提供し、フロントエンドとバックエンドの責務を明確に分離しています。

### 3. イベント駆動

非同期処理によるイベント駆動アーキテクチャにより、高い拡張性とパフォーマンスを実現しています。

### 4. オフライン対応

PWAアプリケーションとして完全なオフライン機能を提供し、同期・競合解決メカニズムを含んでいます。

## TypeSpec対応状況

各APIファイルは対応するTypeSpec定義ファイルを持ち、型安全性と API仕様の一貫性を保証しています：

- `api/spec/operations/quiz-management.tsp`
- `api/spec/operations/quiz-learning.tsp`
- `api/spec/operations/user-session.tsp`
- `api/spec/operations/sync.tsp`
- `api/spec/operations/search.tsp`
- `api/spec/operations/workflows.tsp`
- `api/spec/operations/monitoring.tsp`
- `api/spec/common/`

## 関連ドキュメント

- [API設計概要](../README.md) - 全体アーキテクチャ・方針
- [API設計原則](../design-principles.md) - 設計ガイドライン・命名規約
- [イベント駆動API統合](../event-integration.md) - イベント連携の詳細設計
- [TypeSpec仕様書](../../api/spec/) - 型定義・OpenAPI生成

---
**作成工程**: API設計  
**作成日**: 2025-08-01  
**更新日**: 2025-08-04
