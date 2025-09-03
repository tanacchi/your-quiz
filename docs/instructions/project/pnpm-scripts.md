# pnpm Scripts 一覧

## 概要

このドキュメントはプロジェクト内で使用可能なすべてのpnpm scriptsを記録しています。
新しいスクリプトの追加・編集・削除を行った場合は、このドキュメントを必ず更新してください。

## スクリプト一覧

### ルートディレクトリ (./)

| pnpm サブコマンド | 引数例 | 用途 |
|------------------|--------|------|
| `dev` | - | 全サービス（API・UI）の開発サーバーを並行起動 |
| `dev:api` | - | APIサーバー（Wrangler）の開発サーバーのみ起動 |
| `dev:ui` | - | UIサーバー（Next.js）の開発サーバーのみ起動 |
| `lint` | - | 全てのlintチェック（Markdown・Biome）を並行実行 |
| `lint:md` | - | Markdownファイルのlintチェック実行 |
| `lint:biome` | - | BiomeによるJavaScript/TypeScriptのlintチェック |
| `format` | - | 全てのフォーマット処理（Markdown・Biome）を並行実行 |
| `format:md` | - | Markdownファイルの自動修正 |
| `format:biome` | - | BiomeによるJavaScript/TypeScriptの自動修正 |
| `prepare` | - | Huskyのセットアップ（Git hooksの設定） |
| `mutation-test` | - | Mutation testing実行（API配下のvalidation.tsを対象） |
| `mutation-report` | - | Mutation testing結果の分析レポート生成（除外適用後・JSONLとMarkdown） |

### api/ ディレクトリ

| pnpm サブコマンド | 引数例 | 用途 |
|------------------|--------|------|
| `dev` | - | Wrangler開発サーバーの起動（ホットリロード付き） |
| `deploy` | - | Cloudflare Workersへのプロダクションデプロイ |
| `cf-typegen` | - | Cloudflare Workers向けTypeScript型定義生成 |
| `gen-schema` | - | APIスキーマ生成（api/spec/buildを実行） |
| `typecheck` | - | TypeScriptの型チェック実行 |
| `test:api` | - | PactumJS BDDテスト実行（OpenAPIカバレッジ付き） |
| `test:api:watch` | - | PactumJS BDDテストのウォッチモード実行 |

### api/spec/ ディレクトリ

| pnpm サブコマンド | 引数例 | 用途 |
|------------------|--------|------|
| `build` | - | データベースとAPIスキーマの並行ビルド |
| `build:db` | - | データベーススキーマの生成のみ実行 |
| `build:api` | - | APIスキーマとTypeScript型定義の生成 |
| `gen-database-schema` | - | DBMLファイルからSQLスキーマファイル生成 |
| `gen-openapi-schema` | - | TypeSpecファイルからOpenAPI YAMLファイル生成 |
| `gen-types` | - | OpenAPI YAMLからTypeScript型定義ファイル生成 |

### ui/ ディレクトリ

| pnpm サブコマンド | 引数例 | 用途 |
|------------------|--------|------|
| `dev` | - | Next.js開発サーバーの起動（ホットリロード付き） |
| `build` | - | Next.jsプロダクションビルドの実行 |
| `start` | - | プロダクションビルドサーバーの起動 |

## よく使用するコマンド例

### 開発開始時

```bash
# 全サービス起動
pnpm dev

# または個別起動
pnpm dev:api  # APIのみ
pnpm dev:ui   # UIのみ
```

### スキーマ更新時

```bash
# APIスキーマ再生成
cd api && pnpm gen-schema

# または api/spec/ で直接実行
cd api/spec && pnpm build
```

### デプロイ時

```bash
# APIデプロイ
cd api && pnpm deploy

# UIビルド
cd ui && pnpm build
```

### テスト実行

```bash
# BDD/APIテスト実行
cd api && pnpm test:api

# BDDテストウォッチモード
cd api && pnpm test:api:watch

# Mutation testing実行（プロジェクトルートから）
pnpm mutation-test

# Mutation testing結果分析（除外適用後）
pnpm mutation-report

# Equivalent mutant手動除外の流れ:
# 1. pnpm mutation-report でレポート確認
# 2. scripts/mutation-test/equivalent-mutants.json に除外対象を追加
# 3. pnpm mutation-report で除外適用後レポート再生成
```

### コード品質チェック

```bash
# lint + format実行
pnpm lint && pnpm format

# 型チェック
cd api && pnpm typecheck
```

## 注意事項

### スキーマ生成の依存関係

- `api/spec/gen-types` は `api/spec/gen-openapi-schema` の実行後に実行する必要があります
- `api/gen-schema` は `api/spec/build` を実行するため、上記の依存関係が自動的に解決されます

### 並行処理について

- `run-p` (npm-run-all2) により並行実行されるスクリプトは、実行順序が保証されません
- `run-s` により直列実行されるスクリプトは、指定順序で実行されます

## メンテナンス指示

### スクリプト変更時の必須作業

1. **新規スクリプト追加時**: 上記テーブルに新しい行を追加
2. **既存スクリプト変更時**: 該当行の内容を更新
3. **スクリプト削除時**: 該当行を削除
4. **引数が追加された場合**: 「引数例」列に代表的な使用例を記載
5. **依存関係が変更された場合**: 「注意事項」セクションを更新

### 更新タイミング

- `package.json` の `scripts` セクション変更と同時
- プルリクエスト作成時にはこのドキュメントの更新も含める
- 定期的な整合性チェック（月1回推奨）
