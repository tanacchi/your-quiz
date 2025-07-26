# Git操作指示

## 目的

- 効率的なコードレビューと変更履歴の追跡を実現するため、最小単位での細かいコミットと日本語による明確なコミットメッセージを徹底し、チーム開発における変更の意図と経緯を明確に記録する

## 遵守事項

- コミットは最小単位で細かく行う
- コミットメッセージは日本語で記載する
- 変更の「なぜ」を明確に記録する
- ユーザーからの指示内容を記録する

## コミット戦略

### 1. コミット単位の原則

#### 1.1 最小単位でのコミット
```bash
# ✅ 良い例：機能別の細かいコミット
git add src/components/UserForm.tsx
git commit -m "ユーザー情報入力フォームのバリデーション追加

ユーザーから「メールアドレスの形式チェックが甘い」との指摘があり、
より厳密なバリデーションロジックを実装。
正規表現による形式チェックとドメイン検証を追加。"

git add src/utils/validators.ts
git commit -m "メールバリデーター関数を追加

UserFormで使用するバリデーション機能を独立した関数として切り出し。
再利用可能な設計にするため、utilsディレクトリに配置。"

# ❌ 悪い例：複数の変更を一度にコミット
git add .
git commit -m "フォーム周りの修正"
```

#### 1.2 レビュー可能な単位
```bash
# ✅ 良い例：レビューしやすい単位
git commit -m "型定義ファイルにUser型を追加

APIレスポンスの型安全性を向上させるため、
ユーザー情報の型定義を明確化。"

git commit -m "User型を使用してAPIクライアントを修正

先ほど追加したUser型を実際のAPI呼び出し処理に適用。
型安全性の向上により、実行時エラーのリスクを削減。"

# ❌ 悪い例：レビューが困難な大きな変更
git commit -m "ユーザー機能全体を実装

- 型定義追加
- APIクライアント実装  
- フォームコンポーネント作成
- バリデーション処理追加
- テストコード作成"
```

### 2. コミットメッセージフォーマット

#### 2.1 基本構造
```
1行目：変更内容のサマリ（50文字以内）
2行目：空行
3行目以降：詳細説明
- なぜその変更を行ったのか
- ユーザーからどんな指示があったのか
- 変更の背景や文脈
```

#### 2.2 具体例
```bash
# ✅ 良いコミットメッセージ
git commit -m "pnpmのpackage.jsonエンジン設定を追加

ユーザーから「チーム内でnpmとpnpmが混在して問題が発生している」
との報告があり、パッケージ管理ツールを統一する指示を受けた。

package.jsonにenginesフィールドを追加し、pnpm使用を強制。
また、preinstallスクリプトでnpm/yarn使用時にエラーとする設定も追加。"

# ✅ バグ修正の例
git commit -m "ユーザー削除時の権限チェックを修正

ユーザーから「管理者以外でもユーザー削除ができてしまう」
とのバグ報告があり、権限チェック処理の調査を指示された。

deleteUser関数で管理者権限の確認が抜けていたため、
isAdmin関数による権限チェックを追加して修正。"

# ✅ リファクタリングの例
git commit -m "重複する型定義を共通ファイルに統合

コードレビューで「同じような型定義が複数ファイルに散らばっている」
との指摘があり、型定義の整理を指示された。

UserType, UserCreateType, UserUpdateTypeを
types/user.tsに統合し、各ファイルからimportするよう修正。"
```

#### 2.3 プレフィックスの使用（オプショナル）
```bash
# 変更の種類を明確にする場合
git commit -m "feat: ユーザープロフィール画像アップロード機能追加

ユーザーから「プロフィール画像を設定したい」との要望があり、
画像アップロード機能の実装を指示された。

multerを使用したファイルアップロード処理と、
Sharp.jsによる画像リサイズ処理を実装。"

git commit -m "fix: ログイン時のセッション期限切れエラーを修正

ユーザーから「ログイン後しばらくするとエラーが出る」
との報告があり、セッション管理の調査を指示された。

セッションの有効期限設定が短すぎたため、
24時間に延長して問題を解決。"

git commit -m "docs: API仕様書にエラーレスポンス例を追加

チームメンバーから「エラー時のレスポンス形式が分からない」
との質問があり、仕様書の充実を指示された。

各エンドポイントに400, 404, 500エラーの
レスポンス例とエラーコードを追記。"
```

### 3. ブランチ戦略

#### 3.1 ブランチ切り分けの原則

##### ユーザー価値単位での分割
ブランチは**ユーザーに提供する価値や機能要件を基準とした単位**で作成する：

```bash
# ✅ 良い例：ユーザー価値単位
feature/user-profile-image-upload    # 「プロフィール画像を設定したい」
feature/password-reset-email         # 「パスワードを忘れた時に再設定したい」
feature/notification-preferences     # 「通知設定を個別に制御したい」

# ❌ 悪い例：技術単位での分割
feature/add-multer-dependency        # 技術的な実装詳細
feature/update-user-model           # システム内部の変更
feature/refactor-validation         # 技術的な改善のみ
```

##### PR差分の500行制限
**1PRの総差分行数を500行以内に制限**し、レビューの質と効率を確保：

```bash
# ✅ 適切なサイズの例
feature/user-login-form              # 約200行：フォーム＋バリデーション
feature/user-logout-functionality    # 約150行：ログアウト処理＋テスト
feature/password-strength-indicator  # 約300行：UI＋ロジック＋テスト

# ❌ 大きすぎる例（分割が必要）
feature/complete-user-management     # 1500行：複数機能を含む
↓ 分割後
feature/user-registration            # 約400行
feature/user-profile-edit           # 約350行  
feature/user-account-deletion        # 約250行
```

#### 3.2 ブランチ分割の判断基準

##### 機能分割の指標
```bash
# 1. ユーザーストーリー単位
「〜したい」という要望1つに対して1ブランチ

# 2. 独立してデプロイ可能
その機能だけでユーザーに価値を提供できる

# 3. レビュー可能な差分量
500行以内で変更内容を理解できる

# 4. テスト可能な単位
その機能の動作を独立して検証できる
```

##### 分割例：大きな機能の場合
```bash
# 「ユーザー管理機能」を実装する場合
# ❌ 1つの大きなブランチ
feature/user-management              # 2000行超：レビュー困難

# ✅ ユーザー価値単位で分割
feature/user-registration            # 「新規登録したい」
feature/user-authentication          # 「ログインしたい」
feature/user-profile-view           # 「プロフィールを確認したい」
feature/user-profile-edit           # 「プロフィールを更新したい」
feature/user-password-change         # 「パスワードを変更したい」
```

#### 3.3 ブランチ命名規則
```bash
# 機能開発（ユーザー価値を表現）
feature/user-profile-upload          # プロフィール画像アップロード
feature/password-reset-flow          # パスワード再設定フロー
feature/email-notification-toggle    # メール通知ON/OFF機能

# バグ修正（影響範囲を明確に）
fix/login-session-timeout           # ログインセッション期限切れ
fix/user-deletion-permission        # ユーザー削除権限チェック
fix/email-validation-regex          # メールバリデーション正規表現

# ドキュメント更新（対象を明確に）
docs/api-error-responses            # APIエラーレスポンス仕様
docs/user-registration-flow         # ユーザー登録フロー説明

# リファクタリング（改善対象を明確に）
refactor/user-type-definitions       # ユーザー型定義の整理
refactor/validation-functions        # バリデーション関数の共通化
```

#### 3.4 500行制限の確認方法
```bash
# PR作成前の差分行数確認
git diff --stat origin/main

# 具体的な行数確認
git diff --numstat origin/main | awk '{sum+=$1+$2} END {print "Total changes:", sum, "lines"}'

# ファイル別の差分行数
git diff --stat origin/main --name-only | while read file; do
  echo "$file: $(git diff --numstat origin/main -- "$file" | awk '{print $1+$2}')"
done
```

#### 3.5 作業フロー（ghコマンド活用）
```bash
# 1. 差分量の事前見積もり
# 実装前にタスクの規模を概算し、500行以内に収まるか判断

# 2. ユーザー価値単位での作業ブランチ作成
git checkout -b feature/user-notification-settings

# 3. 細かい単位でコミット（コミット戦略に従う）
git add src/types/notification.ts
git commit -m "通知設定の型定義を追加

ユーザーから「通知のON/OFF設定ができるようにしたい」
との要望があり、通知設定機能の実装を指示された。

まずは型定義から実装し、型安全性を確保。"

# 4. PR作成前の差分量確認
git diff --numstat origin/main | awk '{sum+=$1+$2} END {print "Total changes:", sum, "lines"}'
# 500行以内であることを確認

# 5. ghコマンドでPR作成
git push -u origin feature/user-notification-settings
gh pr create --title "feat: ユーザー通知設定機能の実装" \
             --body-file .github/pull_request_template.md \
             --reviewer @team-lead \
             --assignee @me
```

### 4. コミット前のチェック

#### 4.1 必須確認事項
```bash
# コミット前の確認コマンド
git status          # 変更ファイルの確認
git diff --cached   # ステージされた変更の確認
git log --oneline -5 # 最近のコミット履歴確認

# リンター・テスト実行
pnpm lint           # リント確認
pnpm test           # テスト実行
pnpm build          # ビルド確認
```

#### 4.2 コミット内容の検証
```bash
# 変更内容が適切かチェック
# ✅ 確認すべき点
- [ ] 単一の責務に関する変更のみか
- [ ] テストが通るか
- [ ] リントエラーがないか
- [ ] 不要なファイルが含まれていないか
- [ ] デバッグ用コードが残っていないか
- [ ] 機密情報が含まれていないか
```

### 5. ghコマンドを活用したPR管理

#### 5.1 PRテンプレートの活用
```bash
# PRテンプレートファイル作成（.github/pull_request_template.md）
## 変更内容
- 変更点を箇条書きで記述

## 変更理由
ユーザーからの指示内容と変更の背景を記述

## 確認事項
- [ ] 型安全性の確保
- [ ] テストの実行・パス
- [ ] リント・フォーマットのパス
- [ ] 差分行数が500行以内
- [ ] ユーザー価値単位での適切な分割

## スクリーンショット
（UIがある場合は画像添付）
```

#### 5.2 ghコマンドでのPR作成パターン
```bash
# 基本的なPR作成
gh pr create --title "feat: ユーザー通知設定機能の実装" \
             --body "ユーザーから「通知設定を個別制御したい」との要望により実装"

# テンプレートを使用したPR作成
gh pr create --title "feat: ユーザー通知設定機能の実装" \
             --body-file .github/pull_request_template.md

# レビュアーとラベルを指定
gh pr create --title "feat: ユーザー通知設定機能の実装" \
             --body-file .github/pull_request_template.md \
             --reviewer @team-lead,@senior-dev \
             --assignee @me \
             --label "feature,needs-review"

# ドラフトPRの作成
gh pr create --title "WIP: ユーザー通知設定機能の実装" \
             --body "実装途中での中間共有" \
             --draft
```

#### 5.3 PR管理コマンド
```bash
# 自分のPR一覧確認
gh pr list --author @me

# PR詳細確認
gh pr view 123

# PR差分確認
gh pr diff 123

# PRのチェックアウト（レビュー時）
gh pr checkout 123

# PRステータス確認
gh pr status

# PR検索
gh pr list --state open --label "feature"
gh pr list --assignee @me
```

#### 5.4 ghコマンドでのマージ
```bash
# PRマージ（Squash and Merge推奨）
gh pr merge 123 --squash --delete-branch

# マージ時のコミットメッセージ指定
gh pr merge 123 --squash \
                --delete-branch \
                --subject "feat: ユーザー通知設定機能の実装 (#123)" \
                --body "ユーザーからの要望により通知設定機能を実装。
メール通知、プッシュ通知の個別ON/OFF設定が可能。"

# レビュー承認後の自動マージ
gh pr merge 123 --auto --squash --delete-branch

# PRのレビュー
gh pr review 123 --approve --body "LGTM! 実装内容を確認しました。"
gh pr review 123 --request-changes --body "修正が必要な箇所があります。"
```

#### 5.5 Issues連携
```bash
# Issue作成
gh issue create --title "ユーザー通知設定機能の実装" \
                --body "ユーザーから通知設定の個別制御要望があります。"

# Issue一覧確認
gh issue list --assignee @me

# IssueとPRの連携
gh pr create --title "feat: ユーザー通知設定機能の実装" \
             --body "Closes #456" \
             --body-file .github/pull_request_template.md

# Issueのクローズ
gh issue close 456 --comment "機能実装完了により解決"
```

### 6. 履歴管理

#### 6.1 コミット履歴の活用
```bash
# 特定ファイルの変更履歴
git log --follow -p src/components/UserForm.tsx

# 特定作成者のコミット
git log --author="開発者名" --since="1 week ago"

# コミットメッセージでの検索
git log --grep="バリデーション"

# 変更の責任者確認
git blame src/utils/validators.ts
```

#### 6.2 履歴の整理
```bash
# 作業中のコミット整理（プッシュ前のみ）
git rebase -i HEAD~3

# コミットメッセージの修正（プッシュ前のみ）
git commit --amend

# ⚠️ 注意：プッシュ後の履歴変更は禁止
```

### 7. チーム協調

#### 7.1 コンフリクト解決
```bash
# コンフリクト発生時
git fetch origin
git rebase origin/main

# コンフリクト解決後
git add .
git rebase --continue

# コンフリクト解決のコミットメッセージ例
git commit -m "mainブランチとのコンフリクトを解決

ユーザー型定義の変更とバリデーション処理の追加で
同じファイルを編集していたため競合が発生。

最新のユーザー型定義を使用し、
バリデーション処理も併せて更新。"
```

#### 7.2 ghコマンドでのレビュー対応
```bash
# レビューコメント確認
gh pr view 123 --comments

# レビュー指摘への対応コミット例
git commit -m "レビュー指摘：エラーハンドリングを改善

レビューで「try-catch文のエラーハンドリングが不十分」
との指摘があり、エラー処理の改善を実施。

具体的なエラーメッセージの表示と、
ログ出力処理を追加して対応。"

# 修正後のプッシュとレビュー再依頼
git push origin feature/user-notification-settings
gh pr comment 123 --body "ご指摘いただいた点を修正しました。再度レビューをお願いします。"

# レビュー状況の確認
gh pr checks 123
```

### 8. 禁止事項

#### 8.1 避けるべきコミット
```bash
# ❌ 禁止：意味のないコミットメッセージ
git commit -m "修正"
git commit -m "wip"
git commit -m "update"

# ❌ 禁止：複数の無関係な変更
git add .
git commit -m "バグ修正とリファクタリングと新機能追加"

# ❌ 禁止：機密情報を含むコミット
git commit -m "API設定追加" # .envファイルやAPIキーを含む

# ❌ 禁止：動作しないコードのコミット
git commit -m "実装途中" # テストが通らない状態
```

#### 8.2 プッシュ前の最終確認
```bash
# 必須チェックリスト
- [ ] コミットメッセージが適切か
- [ ] 変更内容が単一責務か
- [ ] テストが全て通るか
- [ ] リントエラーがないか
- [ ] 機密情報が含まれていないか
- [ ] 不要なファイルが含まれていないか
```

### 9. Git設定

#### 9.1 推奨Git設定
```bash
# コミット時のテンプレート設定
git config --global commit.template ~/.gitmessage

# ~/.gitmessage ファイル内容
# 1行目: 変更内容のサマリ（50文字以内）
# 2行目: 空行
# 3行目以降: 詳細説明
# - なぜその変更を行ったのか
# - ユーザーからどんな指示があったのか

# エディター設定
git config --global core.editor "code --wait"

# 改行コード設定
git config --global core.autocrlf input  # Mac/Linux
git config --global core.autocrlf true   # Windows
```

#### 9.2 .gitignore設定
```gitignore
# Node.js
node_modules/
.pnpm-store/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

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

# Build outputs
dist/
build/
.next/
.nuxt/

# Temporary
*.tmp
*.temp
.cache/
```

### 10. 自動化とツール

#### 10.1 pre-commitフック
```bash
# .pre-commit-config.yaml
repos:
  - repo: local
    hooks:
      - id: lint
        name: Run linter
        entry: pnpm lint
        language: system
        pass_filenames: false
      - id: test
        name: Run tests
        entry: pnpm test
        language: system
        pass_filenames: false
```

#### 10.2 コミットメッセージ検証
```bash
# .gitmessage-template
# コミットメッセージ検証スクリプト例
#!/bin/sh
commit_regex='^.{1,50}$'
error_msg="コミットメッセージの1行目は50文字以内で記述してください"

if ! grep -qE "$commit_regex" "$1"; then
    echo "$error_msg" >&2
    exit 1
fi
```

## 完了判定基準

- コミットが適切な最小単位で分割されていること
- コミットメッセージが日本語で記載されていること
- 変更の「なぜ」が明確に記録されていること
- ユーザーからの指示内容が記録されていること
- ブランチがユーザー価値単位で分割されていること
- 1PRの差分行数が500行以内に制限されていること
- PR作成前に差分行数の確認が実行されていること
- ghコマンドを活用したPR作成・管理が実行されていること
- PRテンプレートが適切に活用されていること
- レビュー対応でghコマンドが活用されていること
- プッシュ前の品質チェックが実行されていること
- .gitignoreが適切に設定されていること
- 機密情報がコミットされていないこと
- テストが全て通る状態でコミットされていること
- ブランチ命名規則に従っていること
- プルリクエストの説明が適切に記載されていること

## 完了後

- アウトプットを全てリストアップし、ユーザーからのレビューを受ける