# API設計概要

## 目的

Your QuizアプリケーションにおけるバックエンドAPIの包括的設計を定義し、フロントエンドUIとドメインロジックを効率的に結合するアーキテクチャを提供する。

## 参照ドキュメント

- [UIサイトマップ](../ui-design/1.01_sitemap.yaml) - 全UI機能の定義
- [ユーザーストーリー](../ui-design/1.02_user-stories/) - 操作要件の詳細
- [境界づけられたコンテキスト](../ddd-design/2.09_bounded-context-definition/README.md) - ドメイン境界
- [ドメインイベントカタログ](../ddd-design/2.10_domain-events-catalog/domain-events-catalog.md) - イベント駆動設計
- [モジュラーモノリス構造](../architecture/diagrams/modular-monolith-structure.md) - アーキテクチャ構造

## アーキテクチャ概要

### モジュラーモノリス統合

- **境界づけられたコンテキスト**: 4つの独立モジュール
  - Quiz Management Context
  - Quiz Learning Context  
  - User Session Context
  - Offline Sync Context
- **API層組織化**: コンテキスト境界に沿ったAPI分割
- **共有カーネル**: 共通型定義・エラーハンドリング・認証機能

### イベント駆動統合

- **ドメインイベント**: ビジネスロジック変更の非同期伝播
- **CQRS分離**: コマンド（更新）とクエリ（読み取り）の最適化
- **WebSocket統合**: リアルタイム通知・進捗更新

### 技術スタック

- **RESTful API**: 基本CRUD操作・リソース管理
- **GraphQL**: 複合クエリ・リアルタイムSubscription
- **匿名認証**: JWT + デバイス識別による軽量認証
- **キャッシュ戦略**: Redis活用によるパフォーマンス最適化

## 主要機能フロー

### クイズ回答フロー

```text
UI Flow: ホーム → 一覧 → 回答 → 結果
API Flow: GET /api/quiz/v1/learning/published → POST /api/quiz/v1/learning/decks → GET /api/user/v1/sessions/:id → PUT /api/quiz/v1/learning/sessions/:id/answers
```

### クイズ作成フロー

```text
UI Flow: Create → フォーム → プレビュー → 投稿完了
API Flow: POST /api/quiz/v1/manage/drafts → PUT /api/quiz/v1/manage/drafts/:id → POST /api/quiz/v1/manage/quizzes/submit
```

### 検索・発見フロー

```text
UI Flow: 検索画面 → 結果一覧 → Deck生成 → 回答開始
API Flow: GET /api/quiz/v1/learning/search → POST /api/quiz/v1/learning/decks/from-search → POST /api/user/v1/sessions
```

## 非機能要件

- **API応答時間**: 95%ile ≤ 100ms
- **検索処理**: ≤ 200ms（結果50件以内）
- **同時接続**: 1000セッション対応
- **アップタイム**: 99.9%
- **セキュリティ**: JWT認証・レート制限・GDPR準拠

詳細な非機能要件については[非機能要件仕様書](non-functional-requirements.md)を参照。

## 設計原則

1. **UI要件の完全対応**: 全UI機能に対応するAPI提供
2. **DDD原則遵守**: 境界づけられたコンテキストに沿った設計
3. **イベント駆動**: 疎結合な非同期連携による拡張性
4. **パフォーマンス**: モバイルファーストの高速応答
5. **保守性**: 明確な責任分界・テスト容易性

## 関連ドキュメント

- [API機能カタログ](api-catalog.md) - 87エンドポイントの詳細仕様
- [非機能要件仕様書](non-functional-requirements.md) - パフォーマンス・スケーラビリティ・可用性要件
- [Pub/Subシステム統合](pub-sub-integration.md) - Publisher/Subscriber連携の詳細設計

---
**作成工程**: API設計  
**作成日**: 2025-08-01  
**更新日**: 2025-08-02
