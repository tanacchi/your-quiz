# Git操作指示

## 目的

- 効率的なコードレビューと変更履歴の追跡を実現するため、最小単位での細かいコミットと日本語による明確なコミットメッセージを徹底し、チーム開発における変更の意図と経緯を明確に記録する

## 遵守事項

- コミットは最小単位で細かく行う
- コミットメッセージは日本語で記載する
- ブランチはユーザー価値単位で分割する
- 1PRの差分行数を500行以内に制限する
- ghコマンドを活用してPR管理を効率化する

## プロジェクト独自ルール

### 1. 日本語コミットメッセージフォーマット

#### 必須構造
```
1行目：変更内容のサマリ（50文字以内）
2行目：空行
3行目以降：詳細説明
- なぜその変更を行ったのか
- ユーザーからどんな指示があったのか
```

#### 具体例
```bash
git commit -m "ユーザー登録フォームのバリデーション強化

ユーザーから「不正なメールアドレスで登録できてしまう」
との報告があり、入力チェック処理の改善を指示された。

正規表現による形式チェックとドメイン検証を追加し、
エラーメッセージも日本語で分かりやすく表示。"
```

### 2. ユーザー価値単位でのブランチ分割

#### 分割原則
- **ユーザーに提供する価値や機能要件を基準とした単位**でブランチ作成
- 「〜したい」という要望1つに対して1ブランチ
- 独立してデプロイ可能な機能単位

#### 命名例
```bash
# ✅ 良い例：ユーザー価値単位
feature/user-profile-image-upload    # 「プロフィール画像を設定したい」
feature/password-reset-email         # 「パスワードを忘れた時に再設定したい」

# ❌ 悪い例：技術単位
feature/add-multer-dependency        # 技術的な実装詳細
feature/update-user-model            # システム内部の変更
```

### 3. 500行PR制限

#### 制限理由
レビューの質と効率を確保するため、1PRの総差分行数を500行以内に制限

#### 確認方法
```bash
# PR作成前の差分行数確認
git diff --numstat origin/main | awk '{sum+=$1+$2} END {print "Total changes:", sum, "lines"}'

# 500行を超える場合は機能分割が必要
```

### 4. ghコマンド活用

#### PR作成の効率化
```bash
# テンプレート使用でのPR作成
gh pr create --title "feat: ユーザー通知設定機能の実装" \
             --body-file .github/pull_request_template.md \
             --reviewer @team-lead

# レビューとマージ
gh pr review 123 --approve --body "LGTM! 実装内容を確認しました。"
gh pr merge 123 --squash --delete-branch
```

#### PRテンプレート（.github/pull_request_template.md）
```markdown
## 変更内容
- 変更点を箇条書きで記述

## 変更理由
ユーザーからの指示内容と変更の背景を記述

## 確認事項
- [ ] 差分行数が500行以内
- [ ] ユーザー価値単位での適切な分割
- [ ] テストの実行・パス
```

### 5. 最小単位コミット戦略

#### レビュー可能な単位での分割
```bash
# ✅ 良い例：機能別の細かいコミット
git add src/types/user.ts
git commit -m "User型定義を追加"

git add src/components/UserForm.tsx  
git commit -m "ユーザー登録フォームコンポーネントを実装"

# ❌ 悪い例：複数の変更を一度にコミット
git add .
git commit -m "ユーザー機能追加"
```

## 禁止事項

### 避けるべきコミット
```bash
# ❌ 意味のないメッセージ
git commit -m "修正"
git commit -m "wip"

# ❌ 複数の無関係な変更
git commit -m "バグ修正とリファクタリングと新機能追加"

# ❌ 500行を超えるPR
# ❌ 技術単位でのブランチ分割
```

## Git基本操作・設定

### 詳細な操作方法
Git基本コマンド、設定方法、トラブルシューティング等の詳細は公式ドキュメントを参照：

- **Git公式ドキュメント**: https://git-scm.com/doc
- **Git基本コマンド**: https://git-scm.com/docs
- **ブランチ・マージ**: https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging
- **GitHub CLI (gh)**: https://cli.github.com/manual/

### 推奨学習リソース
- **Pro Git Book**: https://git-scm.com/book
- **GitHub公式ガイド**: https://docs.github.com/ja

## 完了判定基準

- コミットが適切な最小単位で分割されていること
- コミットメッセージが日本語で記載され、変更理由が明確であること
- ブランチがユーザー価値単位で分割されていること
- 1PRの差分行数が500行以内に制限されていること
- ghコマンドを活用したPR管理が実行されていること
- 禁止事項が遵守されていること

## 完了後

- アウトプットを全てリストアップし、ユーザーからのレビューを受ける