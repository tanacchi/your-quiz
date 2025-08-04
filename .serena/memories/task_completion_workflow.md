# タスク完了時のワークフロー

## 必須実行コマンド

タスク完了後は以下のコマンドを必ず実行して品質を保証すること：

### 1. リント実行

```bash
pnpm lint          # 全てのリント実行
pnpm lint:biome    # Biomeリント
pnpm lint:md       # Markdownリント
```

### 2. フォーマット実行

```bash
pnpm format        # 全てのフォーマット実行
pnpm format:biome  # Biomeフォーマット
pnpm format:md     # Markdownフォーマット
```

### 3. テスト実行

```bash
# プロジェクトにテストが設定されている場合
pnpm test          # 単体テスト実行
pnpm test:e2e      # E2Eテスト実行
```

### 4. ビルド確認

```bash
# APIビルド確認
cd api && pnpm deploy --dry-run

# UIビルド確認
cd ui && pnpm build
```

## Git操作の完了基準

### working tree clean確認

```bash
git status
# 以下の状態になるまでコミット継続：
# "nothing to commit, working tree clean"
```

### 段階的コミット手順

1. `git status` で変更ファイル確認
2. 関連性の高いファイル群を論理的に分けてコミット
3. 全てのファイルがコミットされるまで継続
4. `git status` でworking tree cleanを確認

### コミットメッセージ規約

- 日本語で記載
- 1行目：変更内容サマリ（50文字以内）
- 3行目以降：詳細説明（変更理由・指示内容）

## 品質チェック項目

### pre-commitフック

- Biomeによるコード品質チェック
- Markdownリント
- 型チェック
- **絶対禁止**: `git commit --no-verify` の使用

### 完了判定基準

- [ ] 全てのリント・フォーマットが正常終了
- [ ] テストが全て通過
- [ ] ビルドが正常完了
- [ ] working tree cleanが確認済み
- [ ] 適切なコミットメッセージで分割コミット完了
