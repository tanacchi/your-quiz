# Git使用ルール まとめ

## 最重要ルール

### 1. 日本語コミットメッセージ必須

```bash
git commit -m "ユーザー登録フォームのバリデーション強化

ユーザーから「不正なメールアドレスで登録できてしまう」
との報告があり、入力チェック処理の改善を指示された。

正規表現による形式チェックとドメイン検証を追加し、
エラーメッセージも日本語で分かりやすく表示。"
```

### 2. 最小単位での細かいコミット

- 関連性の高いファイル群を論理的にまとめてコミット
- 1つのコミットは独立してレビュー可能な内容
- working tree cleanになるまで分割コミット継続

### 3. ユーザー価値単位でのブランチ分割

```bash
# ✅ 正しい例
feature/user-profile-image-upload    # 「プロフィール画像を設定したい」
feature/password-reset-email         # 「パスワードを忘れた時に再設定したい」

# ❌ 間違った例
feature/add-multer-dependency        # 技術的な実装詳細
```

### 4. 500行PR制限

```bash
# PR作成前の差分行数確認
git diff --numstat origin/main | awk '{sum+=$1+$2} END {print "Total changes:", sum, "lines"}'
```

## 絶対禁止事項

### pre-commitフック無効化

```bash
# ❌ 絶対禁止
git commit --no-verify
git commit -n

# 理由：品質チェック無効化により本番障害リスク増大
```

### 意味のないコミットメッセージ

```bash
# ❌ 禁止例
git commit -m "修正"
git commit -m "wip"
git commit -m "バグ修正とリファクタリングと新機能追加"
```

## GitHub CLI活用

### PR管理効率化

```bash
# PR作成
gh pr create --title "feat: ユーザー通知設定機能の実装" \
             --body-file .github/pull_request_template.md \
             --reviewer @team-lead

# レビューとマージ
gh pr review 123 --approve --body "LGTM! 実装内容を確認しました。"
gh pr merge 123 --squash --delete-branch
```

## 完了確認手順

### working tree clean確認

```bash
git status
# 必須結果: "nothing to commit, working tree clean"
```

### 段階的コミット例

```bash
git status                          # 変更ファイル確認
git add file1.ts file2.ts          # 関連ファイルをステージング
git commit -m "機能A: 型定義とインターフェース追加"

git status                          # 残りファイル確認
git add file3.tsx                   # 次の論理単位をステージング
git commit -m "機能A: UIコンポーネント実装"

git status                          # 最終確認まで継続
```
