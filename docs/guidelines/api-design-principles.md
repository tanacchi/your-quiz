# API設計原則・命名規約

## 目的

Your QuizアプリケーションのAPI設計における統一的な原則・ガイドライン・命名規約を定義し、開発チーム全体で一貫性のあるAPI実装を実現する。

## 基本設計原則

### 1. RESTful設計原則

#### ハイブリッドAPI設計（名詞+動詞）

**基本方針**: RESTful原則をベースに、複雑なビジネスロジックには動詞APIを併用

##### 名詞API（リソース中心）

- **基本CRUD操作**: 単純な作成・読取・更新・削除
- **リソース階層**: 親子関係の明確な操作
- **統一インターフェース**: HTTP メソッドの標準的利用

```http
# ✅ 名詞API - 基本CRUD操作
GET    /api/quiz/v1/manage/quizzes           # クイズ一覧取得
POST   /api/quiz/v1/manage/quizzes           # クイズ作成
GET    /api/quiz/v1/manage/quizzes/123       # 特定クイズ取得
PUT    /api/quiz/v1/manage/quizzes/123       # クイズ更新
DELETE /api/quiz/v1/manage/quizzes/123       # クイズ削除

# ✅ リソース階層操作
GET    /api/quiz/v1/learning/decks/456/sessions     # Deck内のセッション一覧
POST   /api/user/v1/sessions/789/answers            # セッション内に回答作成
GET    /api/quiz/v1/learning/published              # 公開クイズ一覧
```

##### 動詞API（ビジネスロジック中心）

- **複合操作**: 複数リソースに跨る処理
- **ワークフロー**: 承認・同期・変換などの業務プロセス
- **複雑な状態変更**: 単純更新では表現困難な操作

```http
# ✅ 動詞API - 複雑ビジネスロジック
POST   /api/quiz/v1/manage/quizzes/123/approve      # 承認ワークフロー
POST   /api/quiz/v1/manage/quizzes/123/reject       # 却下処理
POST   /api/quiz/v1/manage/quizzes/123/publish      # 公開処理

POST   /api/quiz/v1/learning/decks/from-search      # 検索結果からDeck生成
POST   /api/quiz/v1/learning/sessions/789/submit    # セッション提出・結果計算
POST   /api/sync/v1/synchronize                     # データ同期・競合解決

POST   /api/user/v1/sessions/456/pause              # セッション一時停止
POST   /api/user/v1/sessions/456/resume             # セッション再開
```

##### 使い分け基準

| 操作の複雑さ | API種別 | 判断基準 | 実装例 |
|-------------|---------|----------|--------|
| **単純** | 名詞API | 単一リソースのCRUD | `GET /quizzes`, `POST /quizzes` |
| **中程度** | 名詞API | 関連リソースの操作 | `POST /sessions/123/answers` |
| **複雑** | 動詞API | 複数ステップの業務処理 | `POST /quizzes/123/approve` |
| **ワークフロー** | 動詞API | 状態遷移・外部連携 | `POST /sync/v1/synchronize` |

##### 避けるべきパターン

```http
# ❌ 悪い例 - 混在パターン
POST   /api/v1/createQuiz               # 動詞のみ（古いパターン）
GET    /api/v1/getQuizById/123          # 動詞のみ
POST   /api/v1/submitAnswer             # リソース階層不明確

# ❌ 動詞の乱用
POST   /api/v1/quiz/update              # PUTで十分
POST   /api/v1/quiz/delete              # DELETEで十分
GET    /api/v1/quiz/get                 # GETで十分
```

#### HTTP メソッド利用方針

| Method | 用途 | 冪等性 | 安全性 | レスポンス |
|--------|------|--------|--------|------------|
| **GET** | リソース取得 | ✓ | ✓ | 200, 404 |
| **POST** | リソース作成・複合操作 | ✗ | ✗ | 201, 400, 409 |
| **PUT** | リソース更新・置換 | ✓ | ✗ | 200, 201, 404 |
| **PATCH** | リソース部分更新 | ✗ | ✗ | 200, 404 |
| **DELETE** | リソース削除 | ✓ | ✗ | 204, 404 |

### 2. URL設計規約

#### バージョニング戦略

```bash
# Domain-based Versioning（採用）
/api/{domain}/v1/{context}/{resource}

# 具体例
/api/quiz/v1/manage/quizzes        # Quiz Domain - Manage Context
/api/quiz/v1/learning/decks        # Quiz Domain - Learning Context
/api/user/v1/sessions              # User Domain
/api/sync/v1/cache-manifest        # Sync Domain

# 従来方式（非推奨）
/api/v1/quiz-management/quizzes    # 旧形式

# Header Versioning（将来検討）
Accept: application/vnd.yourquiz.v1+json
```

## まとめ

この設計原則・命名規約により、以下の品質特性を持つAPI実装が実現される：

### 品質特性

1. **一貫性**: 統一的な設計原則による実装の一貫性
2. **可読性**: 明確な命名規約による理解しやすさ
3. **保守性**: 標準的なパターンによる保守容易性
4. **拡張性**: モジュラー設計による機能拡張の容易さ
5. **信頼性**: エラーハンドリング・バリデーションの充実
6. **パフォーマンス**: キャッシュ・最適化戦略の統一

### 開発効率の向上

- **自動生成**: OpenAPI仕様書・型定義の自動生成
- **テスト容易性**: 標準化されたテストパターン
- **ドキュメント**: 自動更新される包括的なドキュメント
- **品質保証**: 一貫したバリデーション・エラー処理

実装フェーズでは、この原則に基づいてTypeScript・NestJS・TypeSpecによる具体的なコード実装を進める。

## 関連ドキュメント

- [API設計概要](../project/api-design/README.md) - 全体アーキテクチャ・方針
- [API機能カタログ](../project/api-design/api-catalog.md) - 87エンドポイントの詳細仕様
- [非機能要件仕様書](../project/api-design/non-functional-requirements.md) - パフォーマンス・スケーラビリティ要件
- [イベント駆動API統合](../project/api-design/event-integration.md) - イベント連携・リアルタイム機能

---
**作成工程**: API設計
**作成日**: 2025-08-01
**更新日**: 2025-08-02
