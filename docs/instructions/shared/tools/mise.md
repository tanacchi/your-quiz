# ツールバージョン管理指示（mise）

## 目的

- プロジェクトで使用するツールのバージョンを統一し、開発環境の一貫性を保つため、mise.tomlを使用したツールバージョン管理を強制し、チーム全体で同一のツール環境を実現する

## 遵守事項

- プロジェクト直下に必ずmise.tomlファイルを配置する
- すべてのツールはmise.tomlで管理されたバージョンを使用する
- グローバルインストールされたツールの使用を禁止する
- 新しいツールを導入する際は必ずmise.tomlに追加する

## mise.toml必須配置

### 1. ファイル配置の強制

#### 1.1 必須配置場所
```bash
# プロジェクトルートに必ず配置
project-root/
├── mise.toml          # 必須：ツールバージョン定義
├── package.json       # Node.jsプロジェクトの場合
├── README.md
└── src/
```

#### 1.2 mise.toml基本テンプレート
```toml
[tools]
# Node.js環境
node = "20.10.0"
pnpm = "8.15.0"

# TypeScript開発
typescript = "5.3.3"

# Git管理
gh = "2.40.1"

# リンター・フォーマッター
"@biomejs/biome" = "1.4.1"

# テストツール
vitest = "1.1.0"

# その他の開発ツール
prettier = "3.1.1"
eslint = "8.56.0"

[env]
# 環境変数の設定
PNPM_HOME = "{{config_dir}}/installs/pnpm/latest"
```

### 2. ツール使用の強制

#### 2.1 グローバルツール使用の禁止
```bash
# ❌ 禁止：グローバルインストールされたツール使用
npm install -g typescript
yarn global add prettier
node --version  # システムのnode使用

# ✅ 必須：mise管理下のツール使用
mise install                    # mise.tomlに基づく一括インストール
mise exec node -- --version    # mise管理のnode使用
mise exec pnpm -- install      # mise管理のpnpm使用
```

#### 2.2 ツール実行の統一方法
```bash
# mise環境でのコマンド実行
mise exec node -- src/index.js
mise exec pnpm -- install
mise exec gh -- pr create

# または、mise環境に入ってから実行
mise shell
node src/index.js    # この時点でmise管理のnodeが使用される
pnpm install
gh pr create
```

### 3. プロジェクト初期化時の必須手順

#### 3.1 新規プロジェクト作成時
```bash
# 1. プロジェクトディレクトリ作成
mkdir new-project
cd new-project

# 2. mise.toml作成（最優先）
cat > mise.toml << 'EOF'
[tools]
node = "20.10.0"
pnpm = "8.15.0"
gh = "2.40.1"
EOF

# 3. miseツールインストール
mise install

# 4. その他の初期化
mise exec pnpm -- init
mise exec pnpm -- add -D typescript @types/node
```

#### 3.2 既存プロジェクトへの導入時
```bash
# 1. 現在使用中のツールバージョン確認
node --version
pnpm --version
gh --version

# 2. mise.toml作成
cat > mise.toml << 'EOF'
[tools]
node = "確認したバージョン"
pnpm = "確認したバージョン"
gh = "確認したバージョン"
EOF

# 3. miseツールインストール
mise install

# 4. 動作確認
mise exec node -- --version
mise exec pnpm -- --version
```

### 4. チーム開発での統一

#### 4.1 新メンバーのセットアップ手順
```bash
# 1. リポジトリクローン
git clone <repository-url>
cd <project-directory>

# 2. mise.tomlの存在確認
ls -la mise.toml  # ファイルが存在することを確認

# 3. 一括ツールインストール
mise install

# 4. 環境確認
mise list        # インストールされたツール一覧
mise current     # 現在有効なツールバージョン
```

#### 4.2 ツールバージョン更新時の手順
```bash
# 1. mise.tomlの更新
# 例：Node.jsを20.10.0から20.11.0に更新
sed -i 's/node = "20.10.0"/node = "20.11.0"/' mise.toml

# 2. 新バージョンのインストール
mise install

# 3. 動作確認
mise exec node -- --version

# 4. チームへの通知
git add mise.toml
git commit -m "Node.jsを20.11.0に更新

セキュリティアップデートとパフォーマンス改善のため、
Node.jsを最新の安定版に更新。

チームメンバーは `mise install` でツール更新をお願いします。"
```

### 5. CI/CD環境での使用

#### 5.1 GitHub Actions設定例
```yaml
name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      # mise セットアップ
      - name: Install mise
        uses: jdx/mise-action@v2
        with:
          version: 2024.1.0
      
      # mise.tomlに基づくツールインストール
      - name: Install tools
        run: mise install
      
      # mise環境でのテスト実行
      - name: Run tests
        run: mise exec pnpm -- test
      
      - name: Run build
        run: mise exec pnpm -- build
```

#### 5.2 Docker環境での使用
```dockerfile
FROM ubuntu:22.04

# mise インストール
RUN curl https://mise.run | sh
ENV PATH="/root/.local/bin:$PATH"

# プロジェクトファイルコピー
COPY mise.toml ./
RUN mise install

# アプリケーション実行
CMD ["mise", "exec", "node", "--", "src/index.js"]
```

### 6. ツール追加・更新の指針

#### 6.1 新しいツール追加時
```bash
# 1. ツールの必要性確認
# - プロジェクトに必要なツールか
# - チーム全体で使用するツールか
# - バージョン管理が必要なツールか

# 2. mise.tomlに追加
echo 'prettier = "3.1.1"' >> mise.toml

# 3. インストールと動作確認
mise install
mise exec prettier -- --version

# 4. チームに共有
git add mise.toml
git commit -m "Prettierをツール管理に追加

コードフォーマットの統一のため、Prettierを追加。
チームメンバーは `mise install` でツール更新をお願いします。"
```

#### 6.2 ツールバージョン更新の判断基準
```bash
# 更新すべき場合
- セキュリティアップデート
- 重要なバグ修正
- プロジェクトで必要な新機能
- LTS（長期サポート）版のリリース

# 慎重に判断すべき場合
- メジャーバージョンアップ
- 破壊的変更を含むアップデート
- 実験的機能の追加

# 更新手順
1. 開発環境での事前検証
2. テストの実行・確認
3. チームへの事前通知
4. 段階的な導入
```

## 禁止事項

### 7. 避けるべき行為

#### 7.1 グローバルツールの使用禁止
```bash
# ❌ 絶対禁止
npm install -g typescript
yarn global add eslint
brew install node

# ✅ 必須の代替方法
# mise.tomlに定義してからmise経由で使用
```

#### 7.2 バージョン不統一の防止
```bash
# ❌ 禁止：個人の環境に依存
"手元のNode.js 18を使用"
"最新版のpnpmを各自インストール"

# ✅ 必須：mise.tomlでバージョン統一
[tools]
node = "20.10.0"    # 全員が同じバージョン使用
pnpm = "8.15.0"     # 全員が同じバージョン使用
```

### 8. エラー対応

#### 8.1 よくある問題と解決法
```bash
# 問題1: mise.tomlが見つからない
# 解決法: プロジェクトルートにいることを確認
pwd  # プロジェクトルートか確認
ls mise.toml  # ファイル存在確認

# 問題2: ツールが見つからない
# 解決法: mise install実行
mise install
mise list  # インストール状況確認

# 問題3: 古いバージョンが使用される
# 解決法: シェルの再起動またはmise shell
mise shell
# または
exec $SHELL
```

#### 8.2 トラブルシューティング
```bash
# mise状態確認
mise doctor          # mise環境の診断
mise current         # 現在のツールバージョン
mise list           # インストール済みツール

# キャッシュクリア（問題解決時）
mise cache clear
mise install --force
```

### 9. 設定ファイルの管理

#### 9.1 .mise.toml vs mise.toml
```bash
# ✅ 推奨：mise.toml （プロジェクト共有）
mise.toml    # プロジェクト全体で共有

# ❌ 避ける：.mise.toml （個人設定）
.mise.toml   # 個人の設定（.gitignoreに追加）
```

#### 9.2 gitignoreでの管理
```gitignore
# mise関連ファイル
.mise.toml          # 個人設定は無視
.tool-versions      # asdf互換ファイルも無視

# mise.toml は必ずコミット（無視しない）
```

## プロジェクト種別ごとの設定例

### 10. 設定テンプレート

#### 10.1 TypeScript/Node.jsプロジェクト
```toml
[tools]
# ランタイム
node = "20.10.0"
pnpm = "8.15.0"

# TypeScript
typescript = "5.3.3"

# 開発ツール
"@biomejs/biome" = "1.4.1"
vitest = "1.1.0"
gh = "2.40.1"

# ビルドツール
vite = "5.0.10"

[env]
NODE_ENV = "development"
PNPM_HOME = "{{config_dir}}/installs/pnpm/latest"
```

#### 10.2 フロントエンドプロジェクト
```toml
[tools]
# ランタイム
node = "20.10.0"
pnpm = "8.15.0"

# フレームワーク（グローバルCLI）
"@vue/cli" = "5.0.8"
"@angular/cli" = "17.0.6"

# 開発サーバー・ビルド
vite = "5.0.10"
webpack = "5.89.0"

# テスト
"@playwright/test" = "1.40.1"
vitest = "1.1.0"
```

#### 10.3 ドキュメント・静的サイト
```toml
[tools]
# ランタイム
node = "20.10.0"
pnpm = "8.15.0"

# 静的サイトジェネレーター
hugo = "0.121.1"
"@11ty/eleventy" = "2.0.1"

# Markdown処理
markdownlint-cli2 = "0.11.0"

# Git管理
gh = "2.40.1"
```

## 完了判定基準

- プロジェクト直下にmise.tomlファイルが配置されていること
- すべての開発ツールがmise.tomlで管理されていること
- グローバルインストールされたツールが使用されていないこと
- チーム全体で同一のツールバージョンが使用されていること
- CI/CD環境でもmiseが活用されていること
- 新しいツール追加時にmise.tomlが更新されていること
- mise.tomlがGit管理されていること
- 個人設定ファイル(.mise.toml)が.gitignoreで除外されていること
- ツールバージョン更新時の手順が守られていること
- エラー発生時の対応方法が理解されていること

## 完了後

- アウトプットを全てリストアップし、ユーザーからのレビューを受ける