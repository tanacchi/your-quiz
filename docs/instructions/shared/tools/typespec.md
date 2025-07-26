# TypeSpec指示

## 目的

- API仕様をタイプセーフに定義し、OpenAPI形式での自動生成を実現するため、TypeSpecを使用したAPI設計の統一化を図り、実装との型安全な連携を実現する

## 遵守事項

- API設計はTypeSpecで行い、OpenAPI YAMLの直接編集を禁止する
- TypeSpec仕様書はAPIソースコードと同じリポジトリに配置する
- 生成されたOpenAPI仕様書はGit管理対象とする
- TypeSpecファイルは機能別に分割して管理する

## プロジェクト独自ルール

### 1. ファイル配置の統一

#### 1.1 必須ディレクトリ構造
```
[api-project-root]/
├── specs/                     # TypeSpec仕様書（ソースファイル）
│   ├── main.tsp              # メインTypeSpec仕様
│   ├── models/               # データモデル定義
│   ├── operations/           # API操作定義
│   └── examples/             # リクエスト/レスポンス例
├── docs/api/                 # 生成されたAPI仕様書
│   ├── openapi.yaml          # TypeSpecから生成されたOpenAPI仕様
│   └── openapi.json          # JSON形式
└── src/                      # APIソースコード
```

#### 1.2 命名規則
- **メインファイル**: `specs/main.tsp`
- **モデル定義**: `specs/models/[リソース名].tsp`
- **操作定義**: `specs/operations/[機能名].tsp`
- **生成ファイル**: `docs/api/openapi.yaml`

### 2. OpenAPI生成の統一

#### 2.1 生成コマンドの標準化
```bash
# 標準生成コマンド
tsp compile specs/main.tsp --emit @typespec/openapi3

# 出力先指定
tsp compile specs/main.tsp --emit @typespec/openapi3 --output-dir docs/api
```

#### 2.2 package.jsonスクリプト
```json
{
  "scripts": {
    "typespec:compile": "tsp compile specs/main.tsp --emit @typespec/openapi3",
    "typespec:watch": "tsp compile specs/main.tsp --emit @typespec/openapi3 --watch",
    "typespec:format": "tsp format specs/**/*.tsp"
  }
}
```

### 3. Git管理方針

#### 3.1 コミット対象
```bash
# 必ずコミットするファイル
specs/                        # TypeSpecソースファイル
docs/api/openapi.yaml        # 生成されたOpenAPI仕様
docs/api/openapi.json        # JSON形式
package.json                 # スクリプト定義

# .gitignoreで除外するファイル
tsp-output/                  # TypeSpec一時出力
node_modules/
```

#### 3.2 コミットメッセージ例
```bash
git commit -m "ユーザー管理APIのTypeSpec仕様を追加

ユーザーから「ユーザー情報の取得・更新機能が必要」との
要望があり、TypeSpecでAPI仕様を定義。

- User型の定義追加
- CRUD操作のエンドポイント定義
- バリデーションルールの実装"
```

### 4. 開発ワークフロー

#### 4.1 API設計フロー
```bash
# 1. TypeSpec仕様作成
vim specs/models/user.tsp      # モデル定義
vim specs/operations/users.tsp # 操作定義

# 2. OpenAPI生成
pnpm typespec:compile

# 3. 生成結果確認
cat docs/api/openapi.yaml

# 4. Git管理
git add specs/ docs/api/
git commit -m "ユーザーAPIの仕様追加"
```

#### 4.2 仕様変更時の手順
```bash
# 1. TypeSpec修正
vim specs/models/user.tsp

# 2. 再生成
pnpm typespec:compile

# 3. 差分確認
git diff docs/api/openapi.yaml

# 4. コミット
git add .
git commit -m "User型にprofileUrl属性を追加"
```

## 公式ドキュメント参照

### TypeSpec学習・詳細仕様
- **公式サイト**: https://typespec.io/
- **Getting Started**: https://typespec.io/docs/getting-started
- **言語仕様**: https://typespec.io/docs/language-basics
- **REST API定義**: https://typespec.io/docs/libraries/rest
- **OpenAPI生成**: https://typespec.io/docs/emitters/openapi3

### インストール・セットアップ
```bash
# TypeSpec CLI インストール（mise.tomlで管理）
mise use typespec@latest

# プロジェクト初期化
tsp init

# 詳細は公式ドキュメント参照
# https://typespec.io/docs/getting-started/installation
```

## 完了判定基準

- TypeSpecファイルが適切なディレクトリ構造で配置されていること
- OpenAPI YAMLが自動生成されていること
- 生成されたファイルがGit管理されていること
- package.jsonにTypeSpecスクリプトが定義されていること
- API仕様変更時のワークフローが確立されていること
- チーム全体でTypeSpec使用が統一されていること

## 完了後

- アウトプットを全てリストアップし、ユーザーからのレビューを受ける