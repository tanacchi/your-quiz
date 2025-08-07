# API設計の不整合問題

## 発見された不整合

### 1. Search API のURL設計

**API Catalog (05-search-discovery.md)**:

```http
GET /api/quiz/v1/learning/search
GET /api/quiz/v1/learning/search/suggestions
POST /api/quiz/v1/learning/search/advanced
GET /api/quiz/v1/learning/recommendations
```

**TypeSpec (api/spec/operations/search.tsp)**:

```typescript
@route("/api/search/v1")
GET /quizzes
GET /quizzes/suggestions
GET /quizzes/{id}/similar
GET /quizzes/recommendations
```

### 2. 設計判断が必要な理由

#### Option A: 学習コンテキスト内の検索

- **利点**:
  - DDDの境界づけられたコンテキストに準拠
  - 学習フローとしての検索が明確
  - 学習特化の検索条件（excludeAnswered等）が自然
- **欠点**:
  - 管理者や他の用途での検索が困難
  - 横断的検索機能の拡張が困難

#### Option B: 独立した検索サービス

- **利点**:
  - 汎用的な検索サービスとして拡張可能
  - 管理画面等からも利用可能
  - マイクロサービス化しやすい
- **欠点**:
  - 学習コンテキスト特有の機能が不自然
  - コンテキスト間の結合度が高くなる

### 3. 推奨解決策

**統合アプローチ**: 両方のパターンを活用

1. **基本検索**: `/api/search/v1/quizzes` - 汎用検索
2. **学習検索**: `/api/quiz/v1/learning/search` - 学習特化検索（内部的にsearch APIを呼び出し）

これにより：

- 汎用性と特化性の両立
- DDDの境界を保ちながら横断的機能も提供
- 将来の拡張性を確保

### 4. 修正が必要なファイル

- API Catalog: 基本検索の分離
- TypeSpec: 学習特化検索の追加
- Integration Patterns: 検索API間の連携パターン追加
