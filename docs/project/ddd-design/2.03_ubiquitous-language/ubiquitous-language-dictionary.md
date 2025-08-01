# ユビキタス言語辞書

## 目的

クイズアプリケーションドメインでの統一的な用語定義により、開発チーム・ステークホルダー・コード・テスト・ドキュメント間の認識齟齬を排除し、BDDテスト実装との完全な整合性を確保する。

## 概要

クイズアプリケーションのドメインにおいて、開発チーム・ステークホルダー・コード・テスト・ドキュメント間で統一的に使用する用語集です。BDDテスト実装では英語名を使用し、実装ではUpperCamelCase変数名として直接利用します。

## Core Dictionary

| 日本語 | 英語/変数名 (UpperCamelCase) | 定義 | BDD表現例 |
|--------|------------------------------|------|-----------|
| **クイズ** | Quiz | ◯×形式の問題と正解・解説で構成される学習単位 | Given Quiz is approved |
| **問題文** | Question | ユーザーが判断を行う対象となるテキスト（500文字以内） | Given Question is displayed |
| **正解** | CorrectAnswer | ◯または×の二択による問題の答え | When User provides CorrectAnswer |
| **解説** | Explanation | クイズの答えに関する詳細な説明（1000文字以内・任意） | Then Explanation is shown |
| **タグ** | Tag | クイズの分類・検索を目的としたラベル（複数設定可能） | When User selects Tag |
| **回答** | Answer | ユーザーがクイズに対して行った◯または×の選択 | When User submits Answer |
| **回答履歴** | AnswerHistory | ユーザーの過去の回答記録（ブラウザ保存） | Then AnswerHistory is updated |
| **匿名ユーザー** | AnonymousUser | ログイン不要でアプリを利用するユーザー | Given AnonymousUser accesses app |
| **作成者** | Creator | クイズを投稿したユーザー（salt付きハッシュで識別） | When Creator submits Quiz |
| **管理者** | Administrator | クイズの承認・管理権限を持つユーザー | When Administrator approves Quiz |
| **投稿** | Submit | ユーザーがクイズを新規作成してシステムに送信すること | When Creator submits Quiz |
| **承認待ち** | PendingApproval | 投稿されたが管理者による承認を待っている状態 | Given Quiz status is PendingApproval |
| **承認済み** | Approved | 管理者により承認され、一般ユーザーに公開されている状態 | Given Quiz is Approved |
| **承認拒否** | Rejected | 管理者により承認を拒否された状態 | Then Quiz status becomes Rejected |
| **スワイプ操作** | SwipeGesture | Tinder UI形式の左右スワイプによる回答入力 | When User performs SwipeGesture |
| **正誤判定** | CorrectJudgment | 回答と正解の比較結果の表示 | Then CorrectJudgment is displayed |
| **絞り込み** | Filter | タグによるクイズの検索・絞り込み機能 | When User applies Filter |
| **問題集** | Deck | 検索結果や選択されたクイズの集合で構成される学習単位 | Given Deck is created |
| **セッション** | QuizSession | 問題集（Deck）に対する学習セッション（1対1関係） | When QuizSession starts |
| **検索結果保存** | SaveSearchResults | 検索でヒットした問題を問題集として保存する操作 | When User saves SearchResults as Deck |
| **問題集作成** | CreateDeck | 検索結果やクイズ選択から問題集を作成すること | When User creates Deck |
| **オフラインモード** | OfflineMode | ネットワーク断線時に事前ダウンロード済みデータで動作するモード | Given OfflineMode is active |
| **同期処理** | Synchronization | オンライン復旧時にブラウザ保存データをサーバーと同期する処理 | When Synchronization occurs |
| **作成者識別情報** | CreatorIdentification | salt付きハッシュによるブラウザでの作成者判定情報 | Given CreatorIdentification exists |
| **サニタイズ** | Sanitize | XSS対策としてHTMLタグを除去・エスケープする処理 | When system performs Sanitize |
| **重複投稿** | DuplicateSubmission | 同一ユーザーによる同一問題の複数回投稿（許可） | When DuplicateSubmission occurs |
| **文字数制限** | CharacterLimit | 問題文500文字、解説1000文字の入力制限 | Then CharacterLimit is enforced |

## エンティティ（Entity）

### Quiz

* **日本語**: クイズ
* **英語/変数名**: Quiz
* **定義**: ◯×形式の問題と正解・解説で構成される学習単位
* **関連概念**: Creator, Question, CorrectAnswer, Explanation, Tag, Answer

### Creator

* **日本語**: 作成者
* **英語/変数名**: Creator
* **定義**: クイズを投稿したユーザー（salt付きハッシュで識別）
* **関連概念**: Quiz, CreatorIdentification, AnonymousUser

### Answer

* **日本語**: 回答
* **英語/変数名**: Answer
* **定義**: ユーザーがクイズに対して行った◯または×の選択
* **関連概念**: Quiz, AnonymousUser, AnswerHistory, CorrectJudgment

### AnswerHistory

* **日本語**: 回答履歴
* **英語/変数名**: AnswerHistory
* **定義**: ユーザーの過去の回答記録（ブラウザ保存）
* **関連概念**: Answer, AnonymousUser, Synchronization

### AnonymousUser

* **日本語**: 匿名ユーザー
* **英語/変数名**: AnonymousUser
* **定義**: ログイン不要でアプリを利用するユーザー
* **関連概念**: Creator, Answer, CreatorIdentification

### Administrator

* **日本語**: 管理者
* **英語/変数名**: Administrator
* **定義**: クイズの承認・管理権限を持つユーザー
* **関連概念**: Quiz, Approved, Rejected

### Deck

* **日本語**: 問題集
* **英語/変数名**: Deck
* **定義**: 検索結果や選択されたクイズの集合で構成される学習単位
* **関連概念**: Quiz, QuizSession, SaveSearchResults, CreateDeck

### QuizSession

* **日本語**: セッション
* **英語/変数名**: QuizSession
* **定義**: 問題集（Deck）に対する学習セッション（1対1関係）
* **関連概念**: Deck, Answer, AnswerHistory

## 値オブジェクト（Value Object）

### Question

* **日本語**: 問題文
* **英語/変数名**: Question
* **定義**: ユーザーが判断を行う対象となるテキスト（500文字以内）
* **関連概念**: Quiz, CharacterLimit, Sanitize

### CorrectAnswer

* **日本語**: 正解
* **英語/変数名**: CorrectAnswer
* **定義**: ◯または×の二択による問題の答え
* **関連概念**: Quiz, Answer, CorrectJudgment

### Explanation

* **日本語**: 解説
* **英語/変数名**: Explanation
* **定義**: クイズの答えに関する詳細な説明（1000文字以内・任意）
* **関連概念**: Quiz, CharacterLimit

### Tag

* **日本語**: タグ
* **英語/変数名**: Tag
* **定義**: クイズの分類・検索を目的としたラベル（複数設定可能）
* **関連概念**: Quiz, Filter

### CreatorIdentification

* **日本語**: 作成者識別情報
* **英語/変数名**: CreatorIdentification
* **定義**: salt付きハッシュによるブラウザでの作成者判定情報
* **関連概念**: Creator, AnonymousUser

## 状態・動作（State/Action）

### Submit

* **日本語**: 投稿
* **英語/変数名**: Submit
* **定義**: ユーザーがクイズを新規作成してシステムに送信すること
* **関連概念**: Creator, Quiz, PendingApproval

### PendingApproval

* **日本語**: 承認待ち
* **英語/変数名**: PendingApproval
* **定義**: 投稿されたが管理者による承認を待っている状態
* **関連概念**: Quiz, Submit, Administrator

### Approved

* **日本語**: 承認済み
* **英語/変数名**: Approved
* **定義**: 管理者により承認され、一般ユーザーに公開されている状態
* **関連概念**: Quiz, Administrator, AnonymousUser

### Rejected

* **日本語**: 承認拒否
* **英語/変数名**: Rejected
* **定義**: 管理者により承認を拒否された状態
* **関連概念**: Quiz, Administrator

### SwipeGesture

* **日本語**: スワイプ操作
* **英語/変数名**: SwipeGesture
* **定義**: Tinder UI形式の左右スワイプによる回答入力
* **関連概念**: Answer, AnonymousUser, CorrectJudgment

### Filter

* **日本語**: 絞り込み
* **英語/変数名**: Filter
* **定義**: タグによるクイズの検索・絞り込み機能
* **関連概念**: Tag, Quiz

### OfflineMode

* **日本語**: オフラインモード
* **英語/変数名**: OfflineMode
* **定義**: ネットワーク断線時に事前ダウンロード済みデータで動作するモード
* **関連概念**: Synchronization, AnswerHistory

### Synchronization

* **日本語**: 同期処理
* **英語/変数名**: Synchronization
* **定義**: オンライン復旧時にブラウザ保存データをサーバーと同期する処理
* **関連概念**: OfflineMode, AnswerHistory, Answer

### CorrectJudgment

* **日本語**: 正誤判定
* **英語/変数名**: CorrectJudgment
* **定義**: 回答と正解の比較結果の表示
* **関連概念**: Answer, CorrectAnswer, SwipeGesture

### Sanitize

* **日本語**: サニタイズ
* **英語/変数名**: Sanitize
* **定義**: XSS対策としてHTMLタグを除去・エスケープする処理
* **関連概念**: Question, Explanation

### DuplicateSubmission

* **日本語**: 重複投稿
* **英語/変数名**: DuplicateSubmission
* **定義**: 同一ユーザーによる同一問題の複数回投稿（許可）
* **関連概念**: Creator, Quiz, Submit

### CharacterLimit

* **日本語**: 文字数制限
* **英語/変数名**: CharacterLimit
* **定義**: 問題文500文字、解説1000文字の入力制限
* **関連概念**: Question, Explanation

### SaveSearchResults

* **日本語**: 検索結果保存
* **英語/変数名**: SaveSearchResults
* **定義**: 検索でヒットした問題を問題集として保存する操作
* **関連概念**: Deck, Filter, Quiz

### CreateDeck

* **日本語**: 問題集作成
* **英語/変数名**: CreateDeck
* **定義**: 検索結果やクイズ選択から問題集を作成すること
* **関連概念**: Deck, Quiz, QuizSession

## BDD表現ガイドライン

### Given（前提条件）

* 英語の用語名を使用: `Given Quiz is Approved`
* 状態を表現: `Given OfflineMode is active`
* エンティティの存在: `Given CreatorIdentification exists`

### When（実行・動作）

* アクターと動作を明記: `When Creator submits Quiz`
* 操作の実行: `When User performs SwipeGesture`
* システム処理: `When Synchronization occurs`

### Then（結果・期待値）

* 結果の状態: `Then Quiz status becomes Rejected`
* 表示・更新: `Then CorrectJudgment is displayed`
* データ変更: `Then AnswerHistory is updated`

## 使用上の注意

1. **一貫性の原則**: すべての文書・コード・テストで同一英語用語を使用する
2. **日英対応**:
   * TypeScriptコード: UpperCamelCase英語名（Quiz, AnswerHistory）
   * BDDテスト: 英語名使用（Given Quiz is approved）
   * ドキュメント・会話: 日本語使用（クイズが承認済み）
3. **略語禁止**: Quiz を Q などと略さない
4. **複合語の統一**: AnswerHistory（回答履歴）など表記を統一
5. **DDD分類の活用**: Entity/ValueObject/State/Action の分類を意識した設計

## 更新履歴

| 日付 | 更新内容 | 更新者 |
|------|----------|--------|
| 2025-01-27 | 初版作成 | Claude |
| 2025-01-28 | ドラフト版フォーマット統合、DDD分類追加、BDD英語化 | Claude |
| 2025-01-31 | Deck・QuizSession概念追加、検索結果保存機能統合 | Claude |
