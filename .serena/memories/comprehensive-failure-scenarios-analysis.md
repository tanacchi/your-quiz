# 包括的失敗シナリオ分析

## TypeSpec仕様から抽出した失敗パターン

### Quiz Management APIの失敗パターン

#### 1. CREATE QUIZ (`POST /api/quiz/v1/manage/quizzes`)
**失敗ケース:**
- `ValidationError (400)`: リクエストボディの検証失敗
  - 必須フィールド欠如 (question, answerType, solution)
  - 無効なanswerType値 
  - solution構造の不正
  - 文字列長制限超過
- `RateLimitError (429)`: レート制限超過

**ユースケース失敗パターン:**
- QuizCreationFailedError: リポジトリ作成処理失敗
- UseCaseInternalError: 内部処理エラー

#### 2. GET QUIZ (`GET /api/quiz/v1/manage/quizzes/{id}`)
**失敗ケース:**
- `NotFoundError (404)`: クイズが存在しない
- `ValidationError (400)`: 無効なID形式

**ユースケース失敗パターン:**
- InvalidQuizIdError: ID検証失敗
- QuizNotFoundError: ドメインレベルでのクイズ不在
- QuizRetrievalFailedError: 取得処理失敗

#### 3. UPDATE QUIZ (`PUT /api/quiz/v1/manage/quizzes/{id}`)
**失敗ケース:**
- `NotFoundError (404)`: クイズが存在しない  
- `ForbiddenError (403)`: 作成者以外のアクセス、または承認後の編集
- `ValidationError (400)`: リクエストボディの検証失敗

**ユースケース失敗パターン:**
- QuizNotFoundError: クイズ不在
- QuizCreatorOnlyError: 作成者権限不足
- QuizStatusError: 承認後編集不可
- QuizUpdateFailedError: 更新処理失敗

#### 4. DELETE QUIZ (`DELETE /api/quiz/v1/manage/quizzes/{id}`)
**失敗ケース:**
- `NotFoundError (404)`: クイズが存在しない
- `ForbiddenError (403)`: 作成者以外のアクセス

**ユースケース失敗パターン:**
- QuizNotFoundError: クイズ不在
- QuizCreatorOnlyError: 作成者権限不足
- QuizDeletionFailedError: 削除処理失敗

#### 5. SUBMIT FOR APPROVAL (`POST /api/quiz/v1/manage/quizzes/{id}/submit`)
**失敗ケース:**
- `NotFoundError (404)`: クイズが存在しない
- `ForbiddenError (403)`: 作成者以外のアクセス
- `ConflictError (409)`: 既に承認済み・審査中

**ユースケース失敗パターン:**
- QuizNotFoundError: クイズ不在
- QuizCreatorOnlyError: 作成者権限不足
- QuizStatusError: 状態変更不可(既に審査中/承認済み)

#### 6. APPROVE/REJECT QUIZ
**失敗ケース:**
- `NotFoundError (404)`: クイズが存在しない
- `ForbiddenError (403)`: 管理者権限不足

**ユースケース失敗パターン:**
- QuizNotFoundError: クイズ不在
- AdminOnlyError: 管理者権限不足
- QuizApprovalError: 承認処理失敗

#### 7. PUBLISH QUIZ (`POST /api/quiz/v1/manage/quizzes/{id}/publish`)
**失敗ケース:**
- `NotFoundError (404)`: クイズが存在しない
- `ForbiddenError (403)`: 管理者権限不足
- `ConflictError (409)`: 承認されていない・既に公開済み

**ユースケース失敗パターン:**
- QuizNotFoundError: クイズ不在
- AdminOnlyError: 管理者権限不足
- QuizStatusError: 未承認状態での公開試行
- QuizPublishFailedError: 公開処理失敗

## インフラストラクチャレイヤーの失敗パターン

### Repository層の失敗パターン
- `CreateFailedError`: データ作成失敗
- `FindFailedError`: データ検索失敗  
- `UpdateFailedError`: データ更新失敗
- `DeleteFailedError`: データ削除失敗
- `NotImplementedError`: 未実装メソッド

### Validation層の失敗パターン
- `JsonParseError`: JSONパース失敗
- `ValidationError`: Zodスキーマ検証失敗
  - fieldErrorsによる詳細エラー情報

## DD-Designから推定される失敗パターン

### ドメイン制約違反
- クイズステータス変更制約
- 作成者権限制約
- 承認プロセス制約

### ビジネスルール違反
- 重複クイズ検知
- 品質スコア閾値違反
- タグ制限超過

## テスト対象となる失敗シナリオ

### レベル1: 入力検証失敗
1. 必須フィールド欠如
2. 型不一致
3. フォーマット違反
4. 制限値超過

### レベル2: ビジネスルール違反
1. 権限不足
2. 状態制約違反
3. 重複リソース
4. 依存関係違反

### レベル3: インフラストラクチャ失敗
1. データベース接続失敗
2. 外部サービス失敗
3. ネットワークタイムアウト
4. リソース不足

### レベル4: システム失敗
1. 内部エラー
2. 設定不正
3. 予期しない例外
4. リソース枯渇