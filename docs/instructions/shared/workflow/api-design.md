# API設計

## 目的

- ドメインモデルに基づき、TypeSpecを使用してタイプセーフなRESTful API設計を行い、OpenAPI 3.0形式で出力される包括的なAPI設計書を作成せよ

## 遵守事項

- **TypeSpecを使用したタイプセーフな仕様書作成必須**: 手書きのOpenAPI YAML絶対禁止
- **RESTful設計原則準拠**: 名詞リソース表現、適切なHTTPメソッド使用
- **エラーハンドリング統一**: 統一エラーレスポンス形式で全エンドポイント対応
- **セキュリティ要件明確化**: 認証・認可・入力検証を詳細定義
- **バリデーションルール詳細記述**: 全フィールドのバリデーション仕様明示

## 必須ツール

**TypeSpec使用義務化**: OpenAPI仕様書作成には必ずTypeSpecを使用せよ。手書きのOpenAPI YAML絶対禁止。

**TypeSpec使用理由**: タイプセーフ・自動生成・保守性・コンパイル時検証を確保

## アウトプット出力先

**基本方針**: APIドキュメントはAPIソースコードと同じワークスペース・ディレクトリ・リポジトリに配置せよ

**ファイル命名規則**:
- **メインTypeSpec**: `specs/main.tsp`
- **モデル定義**: `specs/models/{リソース名}.tsp`
- **操作定義**: `specs/operations/{機能名}.tsp`
- **生成されたOpenAPI**: `docs/api/openapi.yaml`

## API設計の手順

### 1. RESTful設計原則適用

**リソース識別原則**:
- **名詞でリソース表現**: 動詞ではなく名詞を使用せよ
- **階層構造の活用**: 関連リソースは階層で表現せよ
- **複数形の使用**: コレクションリソースは複数形使用せよ
- **一意性の確保**: リソースIDによる一意識別実施せよ

**HTTPメソッド使用原則**:
- GET /api/v1/users - 一覧取得
- POST /api/v1/users - 作成
- PUT /api/v1/users/{id} - 全体更新
- PATCH /api/v1/users/{id} - 部分更新
- DELETE /api/v1/users/{id} - 削除

**ステータスコード標準化**:
- **2xx成功**: 200 OK, 201 Created, 204 No Content
- **4xxクライアントエラー**: 400, 401, 403, 404, 409, 422
- **5xxサーバーエラー**: 500, 502, 503

### 2. TypeSpec仕様書作成

**基本構成**: `specs/main.tsp`にサービス定義、`specs/models/`にモデル、`specs/operations/`に操作を作成せよ

**OpenAPI生成**: `tsp compile specs/main.tsp --emit @typespec/openapi3`実行せよ

### 3. データスキーマ設計

**型システム定義必須項目**:
- プリミティブ型: string, number, integer, boolean
- 複合型: object, array
- フォーマット: date, date-time, email, uri, uuid
- 制約: required, minimum, maximum, minLength, maxLength, pattern

### 4. エラーハンドリング設計

**統一エラーレスポンス形式必須**: error.code, error.message, error.detailsの構造で統一せよ

**エラーコード体系定義必須**:
- **バリデーションエラー（4xx）**: VALIDATION_ERROR, FORMAT_INVALID, REQUIRED_FIELD_MISSING
- **認証・認可エラー（4xx）**: UNAUTHORIZED, TOKEN_EXPIRED, FORBIDDEN
- **リソースエラー（4xx）**: RESOURCE_NOT_FOUND, RESOURCE_CONFLICT
- **サーバーエラー（5xx）**: INTERNAL_SERVER_ERROR, SERVICE_UNAVAILABLE

### 5. セキュリティ仕様

**認証・認可定義必須**:
- JWT Bearer認証またはOAuth2を選択し詳細仕様定義せよ
- 各エンドポイントのセキュリティ要件を明示せよ

**入力検証対策必須**:
- SQLインジェクション対策: パラメータ化クエリ必須
- XSS対策: 出力時エスケープ必須
- CSRF対策: SameSite Cookie + CSRFトークン
- レート制限: API呼び出し頻度制限

### 6. パフォーマンス設計

**ページネーション必須**: page, limit パラメータとX-Total-Count, X-Page-Countヘッダー定義せよ

**フィルタリング・ソート定義**: filter（JSON形式）、sort（enum）パラメータ仕様定義せよ

### 7. バージョニング戦略

**URLパス方式推奨**: `/api/v1/users`形式使用せよ

**後方互換性ガイドライン**:
- 破壊的変更: メジャーバージョンアップ
- 非破壊的変更: マイナーバージョンアップ

### 8. ドキュメント生成

**自動生成ツール連携必須**: Swagger UI、Redoc、Postman Collection生成設定せよ

**CI/CDパイプライン統合**: API仕様変更時の自動ドキュメント生成・デプロイ設定せよ

## 完了判定基準

### 必須要件

- **TypeSpec仕様書作成完了**: 手書きOpenAPI YAML使用なし
- **OpenAPI 3.0仕様書生成**: 全エンドポイントのリクエスト/レスポンス構造定義完了
- **エラーハンドリング統一**: HTTPステータスコードと統一エラー形式明示完了
- **バリデーションルール詳細記述**: 全フィールドのバリデーション仕様明示完了
- **セキュリティ仕様定義**: 認証・認可・入力検証定義完了
- **パフォーマンス考慮**: ページネーション、フィルタリング、ソート実装完了
- **バージョニング戦略明確化**: 後方互換性ガイドライン定義完了
- **自動生成設定**: Swagger UI、CI/CDパイプライン統合完了
- **ファイル命名規則準拠**: 適切なファイル分割と出力完了

## 完了後の必須アクション

1. **直ちに**ユーザーに「API設計成果物」のレビューを依頼する
2. **ADR作成判断**: API設計選択について、ADRでの記録をユーザーに提案する
3. **次工程の判断**をユーザーに委ねる：
   - 通常フロー：「本実装」に進む
   - 戻りフロー：API設計見直しで前工程に戻る
4. ユーザーの明示的な承認を得てから指定された工程に進む
