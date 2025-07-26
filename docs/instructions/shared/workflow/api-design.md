# API設計

## 目的

- ドメインモデルに基づく詳細なAPI仕様を作成し、実装チームが一貫性のあるRESTful APIを構築するため、TypeSpecを使用してタイプセーフなAPI設計を行い、OpenAPI 3.0形式で出力される包括的なAPI設計書を作成する

## 遵守事項

- RESTful設計原則に従ったAPI設計を行う
- **TypeSpecを使用したタイプセーフな仕様書作成を必須とする**
- **手書きのOpenAPI YAMLは絶対禁止する**
- エラーハンドリングとセキュリティ要件を明確に定義する
- 全エンドポイントのリクエスト/レスポンス構造を詳細に定義する
- バリデーションルールを詳細に記述する

## 必須ツール確認

### TypeSpec使用の義務化

**OpenAPI仕様書作成には必ずTypeSpecを使用すること。手書きのOpenAPI YAMLは禁止。**

#### 禁止事項

```yaml
# ❌ 絶対禁止：手書きのOpenAPI YAML
openapi: 3.0.0
info:
  title: Manual API
  version: 1.0.0
paths:
  /users:
    get:
      # 手動でのスキーマ定義は型安全性が保証されない
      responses:
        '200':
          description: Success
```

#### 必須方法

```typescript
// ✅ 必須：TypeSpecによる定義
import "@typespec/rest";
import "@typespec/openapi3";

@service({
  title: "User API",
  version: "1.0.0",
})
namespace UserAPI;

model User {
  id: string;
  name: string;
  email: string;
  createdAt: utcDateTime;
}

@route("/users")
interface Users {
  @get list(): User[];
  @post create(@body user: CreateUserRequest): User;
}
```

#### TypeSpec使用の理由

- **タイプセーフ**: フロントエンド・バックエンド間の型整合性を保つ
- **自動生成**: TypeScriptやその他言語の型定義を自動生成
- **保守性**: 手書きYAMLに比べて保守・更新が容易
- **検証**: コンパイル時に構文・型エラーを検出

## アウトプット出力先

### 基本方針

APIドキュメントは、APIソースコードと同じワークスペース・ディレクトリ・リポジトリに配置する。これにより、コードとドキュメントの同期が保たれ、開発効率が向上する。

### 出力先ディレクトリ構造（APIプロジェクト内）

```
[api-project-root]/
├── src/                       # APIソースコード
├── specs/                     # TypeSpec仕様書（ソースファイル）
│   ├── main.tsp              # メインTypeSpec仕様
│   ├── models/               # データモデル定義
│   │   ├── user.tsp         # ユーザーモデル
│   │   └── common.tsp       # 共通モデル
│   ├── operations/           # API操作定義
│   │   ├── users.tsp        # ユーザー操作
│   │   └── auth.tsp         # 認証操作
│   └── examples/             # リクエスト/レスポンス例
├── docs/                     # 生成されたドキュメント
│   ├── api/                  # 生成されたAPI仕様書
│   │   ├── openapi.yaml      # TypeSpecから生成されたOpenAPI仕様
│   │   └── openapi.json      # JSON形式
│   └── guides/               # API利用ガイド
├── tests/                    # テストコード
├── tsp-output/               # TypeSpec出力ディレクトリ
└── README.md                 # プロジェクト概要
```

### ファイル命名規則

- **メインTypeSpec**: `specs/main.tsp`
- **モデル定義**: `specs/models/[リソース名].tsp`
- **操作定義**: `specs/operations/[機能名].tsp`
- **生成されたOpenAPI**: `docs/api/openapi.yaml`
- **サンプル**: `specs/examples/[機能名]-examples.tsp`
- **利用ガイド**: `docs/guides/[ガイド名].md`

### プロジェクト構成パターン

#### パターン1: モノリスAPI

```
api-server/
├── src/
├── specs/main.tsp             # 全API仕様をTypeSpecで定義
├── docs/api/openapi.yaml      # TypeSpecから生成
└── docs/guides/
```

#### パターン2: マイクロサービス（リポジトリ分離）

```
user-service/
├── src/
├── specs/main.tsp             # ユーザーサービスのTypeSpec仕様
├── docs/api/openapi.yaml      # 生成されたOpenAPI仕様
└── docs/guides/

order-service/
├── src/
├── specs/main.tsp             # 注文サービスのTypeSpec仕様
├── docs/api/openapi.yaml      # 生成されたOpenAPI仕様
└── docs/guides/
```

#### パターン3: モノレポ（サービス別ディレクトリ）

```
api-services/
├── services/
│   ├── user/
│   │   ├── src/
│   │   ├── specs/main.tsp
│   │   └── docs/api/openapi.yaml
│   └── order/
│       ├── src/
│       ├── specs/main.tsp
│       └── docs/api/openapi.yaml
├── specs/                     # 全体統合TypeSpec
│   └── main.tsp              # 全サービス統合仕様
└── docs/api/openapi.yaml     # 統合OpenAPI仕様
```

## API設計の手順

### 1. RESTful設計原則の適用

#### 1.1 リソース識別

以下の原則に従ってリソースを識別する：

- **名詞でリソースを表現**: 動詞ではなく名詞を使用
- **階層構造の活用**: 関連リソースは階層で表現
- **複数形の使用**: コレクションリソースは複数形
- **一意性の確保**: リソースIDによる一意識別

#### 1.2 HTTPメソッドの適切な使用

```
# リソース操作の標準パターン
GET    /api/v1/users           # ユーザー一覧取得
GET    /api/v1/users/{id}      # 特定ユーザー取得
POST   /api/v1/users           # ユーザー作成
PUT    /api/v1/users/{id}      # ユーザー全体更新
PATCH  /api/v1/users/{id}      # ユーザー部分更新
DELETE /api/v1/users/{id}      # ユーザー削除
```

#### 1.3 ステータスコードの標準化

- **2xx成功**: 200 OK, 201 Created, 204 No Content
- **4xxクライアントエラー**: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable Entity
- **5xxサーバーエラー**: 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable

### 2. TypeSpec仕様書作成

#### 2.1 基本構成作成

`specs/main.tsp` にサービス定義、`specs/models/` にモデル、`specs/operations/` に操作を作成。

#### 2.2 OpenAPI生成

```bash
tsp compile specs/main.tsp --emit @typespec/openapi3
```

### 3. データスキーマ設計

#### 3.1 型システムの定義

- **プリミティブ型**: string, number, integer, boolean
- **複合型**: object, array
- **フォーマット**: date, date-time, email, uri, uuid
- **制約**: required, minimum, maximum, minLength, maxLength, pattern

#### 3.2 バリデーション仕様

```yaml
UserCreateRequest:
  type: object
  required:
    - email
    - name
    - password
  properties:
    email:
      type: string
      format: email
      description: メールアドレス（一意制約）
    name:
      type: string
      minLength: 1
      maxLength: 50
      pattern: '^[a-zA-Z0-9\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\s]+$'
      description: ユーザー名（日本語、英数字、スペース可）
    password:
      type: string
      minLength: 8
      maxLength: 128
      pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$'
      description: パスワード（大文字、小文字、数字を含む8文字以上）
```

### 4. エラーハンドリング設計

#### 4.1 統一エラーレスポンス形式

```yaml
ErrorResponse:
  type: object
  required:
    - error
  properties:
    error:
      type: object
      required:
        - code
        - message
      properties:
        code:
          type: string
          description: エラーコード
        message:
          type: string
          description: ユーザー向けエラーメッセージ
        details:
          type: array
          items:
            type: object
            properties:
              field:
                type: string
                description: エラーが発生したフィールド名
              code:
                type: string
                description: フィールド固有のエラーコード
              message:
                type: string
                description: フィールド固有のエラーメッセージ
  example:
    error:
      code: "VALIDATION_ERROR"
      message: "入力値が正しくありません"
      details:
        - field: "email"
          code: "FORMAT_INVALID"
          message: "メールアドレスの形式が正しくありません"
```

#### 4.2 エラーコード体系

```yaml
# バリデーションエラー（4xx）
VALIDATION_ERROR:        # 400 - 一般的なバリデーションエラー
FORMAT_INVALID:          # 400 - フォーマットエラー
REQUIRED_FIELD_MISSING:  # 400 - 必須フィールド不足
VALUE_OUT_OF_RANGE:      # 400 - 値の範囲外

# 認証・認可エラー（4xx）
UNAUTHORIZED:            # 401 - 認証失敗
TOKEN_EXPIRED:           # 401 - トークン期限切れ
FORBIDDEN:               # 403 - アクセス権限なし
INSUFFICIENT_PRIVILEGES: # 403 - 権限不足

# リソースエラー（4xx）
RESOURCE_NOT_FOUND:      # 404 - リソース不存在
RESOURCE_CONFLICT:       # 409 - リソース競合
RESOURCE_LOCKED:         # 423 - リソースロック中

# サーバーエラー（5xx）
INTERNAL_SERVER_ERROR:   # 500 - 内部サーバーエラー
SERVICE_UNAVAILABLE:     # 503 - サービス利用不可
EXTERNAL_SERVICE_ERROR:  # 502 - 外部サービスエラー
```

### 5. セキュリティ仕様

#### 5.1 認証・認可

```yaml
components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
      description: JWT トークンによる認証
    OAuth2:
      type: oauth2
      flows:
        authorizationCode:
          authorizationUrl: https://auth.example.com/oauth/authorize
          tokenUrl: https://auth.example.com/oauth/token
          scopes:
            read: 読み取り権限
            write: 書き込み権限
            admin: 管理者権限

security:
  - BearerAuth: []
```

#### 5.2 入力検証

- **SQLインジェクション対策**: パラメータ化クエリ必須
- **XSS対策**: 出力時エスケープ必須
- **CSRF対策**: SameSite Cookie + CSRFトークン
- **レート制限**: API呼び出し頻度制限

### 6. パフォーマンス設計

#### 6.1 ページネーション

```yaml
parameters:
  - name: page
    in: query
    schema:
      type: integer
      minimum: 1
      default: 1
  - name: limit
    in: query
    schema:
      type: integer
      minimum: 1
      maximum: 100
      default: 20

responses:
  '200':
    headers:
      X-Total-Count:
        schema:
          type: integer
        description: 総件数
      X-Page-Count:
        schema:
          type: integer
        description: 総ページ数
```

#### 6.2 フィルタリング・ソート

```yaml
parameters:
  - name: filter
    in: query
    description: フィルタ条件（JSON形式）
    schema:
      type: string
    example: '{"status":"active","created_after":"2024-01-01"}'
  - name: sort
    in: query
    description: ソート条件
    schema:
      type: string
      enum: [name_asc, name_desc, created_asc, created_desc]
      default: created_desc
```

### 7. バージョニング戦略

#### 7.1 APIバージョニング方式

- **URLパス方式**: `/api/v1/users` (推奨)
- **ヘッダー方式**: `Accept: application/vnd.api+json;version=1`
- **パラメータ方式**: `/api/users?version=1`

#### 7.2 後方互換性ガイドライン

- **破壊的変更**: メジャーバージョンアップ
- **非破壊的変更**: マイナーバージョンアップ
- **バグ修正**: パッチバージョンアップ

### 8. ドキュメント生成と配置

#### 8.1 自動生成ツール連携

- **Swagger UI**: インタラクティブAPI仕様書（`docs/api/openapi.yaml`から生成）
- **Redoc**: 静的API仕様書（CI/CDで自動生成・デプロイ）
- **Postman Collection**: テスト用コレクション生成

#### 8.2 CI/CDパイプライン統合

```yaml
# .github/workflows/api-docs.yml 例
name: API Documentation
on:
  push:
    paths:
      - 'docs/api/**'
      - 'src/**'
jobs:
  generate-docs:
    runs-on: ubuntu-latest
    steps:
      - name: Generate API docs
        run: |
          # OpenAPI仕様からSwagger UIを生成
          npx @redocly/cli build-docs docs/api/openapi.yaml
          # GitHub Pagesにデプロイ
```

#### 8.3 サンプルコード生成

```yaml
# リクエスト例
examples:
  create_user_example:
    summary: ユーザー作成例
    value:
      email: "user@example.com"
      name: "田中太郎"
      password: "SecurePassword123"

# レスポンス例
responses:
  '201':
    content:
      application/json:
        examples:
          success_example:
            summary: 作成成功例
            value:
              id: "550e8400-e29b-41d4-a716-446655440000"
              email: "user@example.com"
              name: "田中太郎"
              created_at: "2024-01-01T00:00:00Z"
```

## 完了判定基準

- APIプロジェクトの `docs/api/` ディレクトリ配下に適切な構造でファイルが作成されていること
- OpenAPI 3.0仕様書が作成されている
- 全エンドポイントのリクエスト/レスポンス構造が定義されている
- エラーハンドリングとHTTPステータスコードが明示されている
- バリデーションルールが詳細に記述されている
- セキュリティ仕様（認証・認可）が定義されている
- パフォーマンス考慮事項（ページネーション等）が実装されている
- バージョニング戦略が明確に定義されている
- 自動生成可能な形式でドキュメントが作成されている
- ファイル命名規則に従って適切にファイルが分割されていること
- 作成対象が実際のファイルとして出力されていること
- Markdownのlintルールに従っていない記述が少ないこと

## 完了後

- アウトプットを全てリストアップし、ユーザーからのレビューを受ける
