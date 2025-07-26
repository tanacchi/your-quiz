# パッケージ管理ツール指示

## 目的

- package.jsonがあるプロジェクトにおいて、一貫したパッケージ管理を実現し、開発環境の統一とlockファイルの適切な管理を行うため、pnpmを標準ツールとして使用する指示を定める

## 遵守事項

- package.jsonがあるプロジェクトでは必ずpnpmを使用する
- npm、yarnの使用を禁止し、チーム内での環境統一を図る
- lockファイルの適切な管理を行う

## 使用ツール

### 必須ツール
- **pnpm**: 唯一の許可されたパッケージ管理ツール
- **禁止ツール**: `npm`、`yarn`、`yarn berry`

### pnpm選択理由
- **高速インストール**: シンboリックリンクによる効率的なnode_modules構成
- **ディスク容量節約**: グローバルストアによる重複排除
- **厳密な依存関係**: phantom dependencyの回避
- **monorepo対応**: workspaces機能の優秀さ

## 基本コマンド

### インストール関連
```bash
# 依存関係のインストール
pnpm install
pnpm i

# 本番依存関係のみインストール
pnpm install --prod

# 開発依存関係も含めて強制再インストール
pnpm install --force
```

### パッケージ管理
```bash
# パッケージ追加（本番依存）
pnpm add <package-name>
pnpm add <package-name>@<version>

# 開発依存関係として追加
pnpm add -D <package-name>
pnpm add --save-dev <package-name>

# グローバルインストール（推奨しない）
pnpm add -g <package-name>

# パッケージ削除
pnpm remove <package-name>
pnpm rm <package-name>
```

### スクリプト実行
```bash
# package.jsonのscripts実行
pnpm run <script-name>
pnpm <script-name>  # runは省略可能

# よく使用するスクリプト例
pnpm dev           # 開発サーバー起動
pnpm build         # ビルド実行
pnpm test          # テスト実行
pnpm lint          # Lint実行
pnpm format        # フォーマット実行
```

### 情報確認
```bash
# インストール済みパッケージ一覧
pnpm list
pnpm ls

# 依存関係ツリー表示
pnpm list --depth=0

# アウトデートなパッケージ確認
pnpm outdated

# パッケージ情報確認
pnpm info <package-name>
```

## Git管理

### コミット対象
```bash
# 必ずコミットするファイル
package.json
pnpm-lock.yaml

# .gitignoreで除外するディレクトリ
node_modules/
.pnpm-store/
```

### .gitignore設定
```gitignore
# Dependencies
node_modules/
.pnpm-store/

# Runtime
dist/
build/
.next/
.nuxt/

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
```

### pnpm-lock.yamlの取り扱い
- **必ずコミット**: reproducible buildsの保証
- **コンフリクト時**: `pnpm install`で解決を試行
- **手動編集禁止**: 自動生成ファイルのため直接編集しない

## プロジェクト設定

### package.jsonの推奨設定
```json
{
  "engines": {
    "node": ">=18.0.0",
    "pnpm": ">=8.0.0"
  },
  "packageManager": "pnpm@8.15.0",
  "scripts": {
    "preinstall": "npx only-allow pnpm"
  }
}
```

### .npmrc設定（プロジェクトルート）
```ini
# 厳密なピア依存関係チェック
strict-peer-dependencies=true

# 自動インストール無効化
auto-install-peers=false

# shamefully-hoist無効化（デフォルト）
shamefully-hoist=false

# node-linker設定（isolated推奨）
node-linker=isolated
```

## CI/CD環境での使用

### GitHub Actions例
```yaml
- name: Setup pnpm
  uses: pnpm/action-setup@v2
  with:
    version: 8

- name: Setup Node.js
  uses: actions/setup-node@v3
  with:
    node-version: '18'
    cache: 'pnpm'

- name: Install dependencies
  run: pnpm install --frozen-lockfile
```

### Docker環境での使用
```dockerfile
# pnpmのインストール
RUN npm install -g pnpm@8

# 依存関係インストール
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod
```

## トラブルシューティング

### よくある問題と解決法

#### 1. lockファイルの不整合
```bash
# lockファイル削除して再インストール
rm pnpm-lock.yaml
pnpm install
```

#### 2. キャッシュ問題
```bash
# pnpmストア削除
pnpm store prune

# 完全クリーンインストール
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

#### 3. phantom dependency エラー
```bash
# 厳密モードでインストール確認
pnpm install --strict-peer-dependencies
```

#### 4. 権限エラー
```bash
# グローバルディレクトリ確認・変更
pnpm config get global-dir
pnpm config set global-dir /path/to/writable/dir
```

## エラーメッセージ対応

### "ERR_PNPM_PEER_DEP_ISSUES"
```bash
# ピア依存関係の自動インストール
pnpm install --auto-install-peers

# または手動でピア依存関係を追加
pnpm add <peer-dependency>
```

### "ERR_PNPM_TARBALL_EXTRACT"
```bash
# ネットワーク問題の場合、レジストリ確認
pnpm config get registry

# npmレジストリに変更
pnpm config set registry https://registry.npmjs.org/
```

## 完了判定基準

- プロジェクトでpnpmが正常にインストール・実行できること
- package.jsonにenginesフィールドでpnpmバージョンが指定されていること
- pnpm-lock.yamlが適切にGit管理されていること
- .gitignoreでnode_modules等が除外されていること
- CI/CD環境でpnpmが正常に動作すること
- チームメンバー全員がpnpmの基本コマンドを理解していること
- npm/yarnコマンドの使用が完全に排除されていること
- エラー発生時の基本的なトラブルシューティングが可能であること

## 完了後

- アウトプットを全てリストアップし、ユーザーからのレビューを受ける