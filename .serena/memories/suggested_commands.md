# 推奨コマンド

## 開発コマンド

### 開発サーバー起動

```bash
pnpm dev              # フロントエンド・バックエンド両方を起動
pnpm dev:api          # APIサーバーのみ起動 (Cloudflare Workers)
pnpm dev:ui           # UIサーバーのみ起動 (Next.js)
```

### コード品質・フォーマット

```bash
pnpm lint             # 全てのリント実行 (Biome + Markdown)
pnpm lint:biome       # Biomeリント実行
pnpm lint:md          # Markdownリント実行
pnpm format           # 全てのフォーマット実行
pnpm format:biome     # Biomeフォーマット実行
pnpm format:md        # Markdownフォーマット実行
```

### API関連

```bash
cd api
pnpm dev              # API開発サーバー起動
pnpm deploy           # Cloudflare Workersにデプロイ
pnpm cf-typegen       # Cloudflare型定義生成
pnpm gen-schema       # OpenAPIスキーマ生成
```

### UI関連

```bash
cd ui
pnpm dev              # Next.js開発サーバー起動
pnpm build            # プロダクションビルド
pnpm start            # プロダクションサーバー起動
```

## Git関連コマンド

### 基本操作

```bash
git status            # ファイル状態確認
git add .             # 全変更をステージング
git commit -m "日本語メッセージ"  # コミット実行
```

### ブランチ操作

```bash
git checkout -b feature/機能名  # 新しいブランチ作成・切り替え
git push -u origin ブランチ名   # ブランチをリモートにプッシュ
```

### GitHub CLI (gh)

```bash
gh pr create --title "タイトル" --body "説明"  # PR作成
gh pr review 123 --approve                    # PR承認
gh pr merge 123 --squash --delete-branch     # PRマージ・ブランチ削除
```

## システムコマンド (Darwin/macOS)

### ファイル操作

```bash
ls -la                # ファイル一覧表示
find . -name "*.ts"   # ファイル検索
grep -r "検索文字列" . # ファイル内検索
```

### プロセス管理

```bash
ps aux | grep node    # Node.jsプロセス確認
pkill -f "pnpm dev"   # 開発サーバー停止
```
