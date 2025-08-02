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

```text
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

#### 具体的なコミットメッセージ例

```bash
# ✅ 良い例：実際の業務に即した具体的なメッセージ
git add src/models/User.ts
git commit -m "ユーザーモデルのemail一意性制約追加

顧客から「同じメールアドレスで複数アカウント作成できる」
不具合報告を受け、データベースレベルでの重複防止を実装。

- User.emailにUNIQUE制約追加
- 重複時のエラーハンドリング実装
- 既存データの重複チェックマイグレーション追加"

git add src/components/UserRegistrationForm.tsx
git commit -m "ユーザー登録フォームのリアルタイムバリデーション実装

UXチームからの要求「入力中にエラーを即座に表示したい」
に対応し、onBlurイベントでのバリデーション機能を追加。

- メールアドレス形式チェック（RFC 5322準拠）
- パスワード強度チェック（8文字以上、英数字記号混在）
- 確認パスワード一致チェック
- エラーメッセージの多言語対応（日本語・英語）"

git add tests/unit/UserRegistrationForm.test.tsx
git commit -m "ユーザー登録フォームのテストケース追加

品質保証チームから「バリデーション機能のテスト不足」
指摘を受け、Edge Caseを含む包括的テストを実装。

- 正常系：有効な入力値でのフォーム送信
- 異常系：無効なメール形式（12パターン）
- 境界値：パスワード長（7文字、8文字、129文字）
- セキュリティ：XSS攻撃パターン耐性テスト"

# ❌ 悪い例：抽象的で情報不足
git commit -m "バグ修正"
git commit -m "リファクタリング"
git commit -m "機能追加"
```

### 6. working tree clean確認プロセス

#### 完了まで継続する段階的コミット

```bash
# Step 1: 現状確認
git status
# modified:   src/models/User.ts
# modified:   src/components/UserForm.tsx
# modified:   src/api/userAPI.ts
# untracked:  src/types/UserTypes.ts

# Step 2: 関連性でグループ化してコミット
git add src/models/User.ts src/types/UserTypes.ts
git commit -m "ユーザードメインモデルの型安全性強化

プロダクトオーナーから「型エラーによる本番障害を防ぎたい」
要求を受け、strictモードでのコンパイルエラー解消を実施。

- User.tsでOptionalプロパティを明示的に定義
- UserTypes.tsで共通型定義を分離・再利用化
- TypeScript 5.0対応でのstrict設定有効化"

# Step 3: 残りファイルの確認と継続
git status
# modified:   src/components/UserForm.tsx
# modified:   src/api/userAPI.ts

git add src/components/UserForm.tsx
git commit -m "ユーザーフォームのアクセシビリティ改善

障害者支援団体からの要望「スクリーンリーダー対応不足」
を受け、WAI-ARIA対応とキーボードナビゲーション実装。

- aria-label、aria-describedbyの適切な設定
- Tab順序の論理的な調整
- フォーカス表示の視覚的改善
- エラーメッセージのaria-live設定"

git add src/api/userAPI.ts
git commit -m "ユーザーAPI のリトライ機能とタイムアウト設定

運用チームから「ネットワーク不安定時の障害多発」報告を受け、
レジリエンス向上のための例外処理強化を実装。

- 3回までの指数バックオフリトライ
- 30秒タイムアウト設定
- ネットワークエラー分類とログ出力改善
- Circuit Breaker パターン実装"

# Step 4: 完了確認
git status
# On branch feature/user-registration-enhancement
# nothing to commit, working tree clean
```

## コミット作業の完了基準

### working tree clean状態の必須確認

**重要**: `git status`でworking tree cleanになるまでコミット作業を継続すること

```bash
# この状態になるまで継続
$ git status
On branch main
nothing to commit, working tree clean
```

### 完了確認後の必須アクション

1. **ユーザーへの報告**
   - コミット完了の報告
   - working tree clean状態の確認完了報告
   - 次のアクション（プッシュ、PR作成等）の提案

2. **ブランチ状態確認**

```bash
git log --oneline -5
git branch -v
```

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

#### 段階的コミットの必須手順

**コミット指示を受けた場合の対応プロセス**：

1. **現状確認**：`git status`で変更ファイルを確認
2. **最小単位での分割コミット**：関連性の高いファイル群を論理的に分けて順次コミット
3. **完了まで繰り返し**：unstaged/untrackedファイルがすべてなくなるまで継続
4. **最終確認**：`git status`でworking treeがcleanになることを確認

```bash
# 段階的コミット実行例
git status                          # 変更ファイル確認
git add file1.ts file2.ts          # 関連ファイルをまとめてステージング
git commit -m "機能A: 型定義とインターフェース追加"

git status                          # 残りファイル確認
git add file3.tsx                   # 次の論理単位をステージング
git commit -m "機能A: UIコンポーネント実装"

git status                          # 最終確認
# 以下の状態になるまで繰り返し：
# "nothing to commit, working tree clean"
```

**重要な原則**：

- ユーザーから「コミットして」と指示された場合、作業が完全に完了するまでコミットを継続する
- 途中で停止せず、すべての変更を適切な単位でコミットする
- 各コミットは独立してレビュー可能な論理的なまとまりとする

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

### 絶対禁止：pre-commitフック無効化

```bash
# ❌ 絶対禁止：品質チェックのスキップ
git commit --no-verify
git commit -n

# ❌ 理由：
# - コード品質チェック（lint、format、テスト）を無効化
# - CI/CDパイプラインの品質保証を破綻させる
# - チーム開発での一貫性を損なう
# - 本番環境での障害リスクを増大させる
```

**pre-commitフックエラー時の正しい対応**：

1. **エラーの内容を確認**：lintエラー、フォーマットエラー、テスト失敗等を特定
2. **問題を修正**：コードの修正、フォーマットの適用、テストの修正
3. **再度コミット**：修正後に正常なコミットを実行

```bash
# ✅ 正しい対応例
git commit -m "機能追加"
# → pre-commitエラーが発生

# エラーを確認・修正
pnpm format     # フォーマット修正
pnpm test       # テスト修正

# 修正後に再コミット
git add .
git commit -m "機能追加"
```

## Git基本操作・設定

### 詳細な操作方法

Git基本コマンド、設定方法、トラブルシューティング等の詳細は公式ドキュメントを参照：

- **Git公式ドキュメント**: <https://git-scm.com/doc>
- **Git基本コマンド**: <https://git-scm.com/docs>
- **ブランチ・マージ**: <https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging>
- **GitHub CLI (gh)**: <https://cli.github.com/manual/>

### 推奨学習リソース

- **Pro Git Book**: <https://git-scm.com/book>
- **GitHub公式ガイド**: <https://docs.github.com/ja>

## 完了判定基準

- コミットが適切な最小単位で分割されていること
- コミットメッセージが日本語で記載され、変更理由が明確であること
- ブランチがユーザー価値単位で分割されていること
- 1PRの差分行数が500行以内に制限されていること
- ghコマンドを活用したPR管理が実行されていること
- 禁止事項が遵守されていること
- **段階的コミット完了**：`git status`で"nothing to commit, working tree clean"が表示されること

## 完了後

- アウトプットを全てリストアップし、ユーザーからのレビューを受ける
