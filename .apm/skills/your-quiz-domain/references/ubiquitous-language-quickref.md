# ユビキタス言語クイックリファレンス

完全版は `docs/project/ddd-design/2.03_ubiquitous-language/ubiquitous-language-dictionary.md` を参照すること。

## Core 用語（実装で必ず使う語）

| 日本語 | 英語/TypeScript名 | 定義 |
|--------|------------------|------|
| クイズ | `Quiz` | ○×形式の問題と正解・解説で構成される学習単位 |
| 問題文 | `Question` | ユーザーが判断する対象テキスト（≤ 500文字）|
| 正解 | `Solution` | ○または×の二択による問題の答え |
| 解説 | `Explanation` | 答えの詳細説明（≤ 1000文字・任意）|
| タグ | `Tag` | クイズの分類・検索ラベル（複数設定可）|
| 回答試行 | `Attempt` | ユーザーが行った○または×の選択 |
| 回答履歴 | `AttemptHistory` | 過去の回答記録（ブラウザ保存）|
| 問題集 | `Deck` | 検索結果や選択クイズの集合（学習単位）|
| セッション | `QuizSession` | Deck に対する学習セッション（Deck と 1:1）|
| 匿名ユーザー | `AnonymousUser` | ログイン不要でアプリを利用するユーザー |
| 作成者 | `Creator` | クイズを投稿したユーザー（salt 付きハッシュで識別）|
| 管理者 | `Administrator` | クイズの承認・管理権限を持つユーザー |

## Quiz ライフサイクル（状態）

| 状態 | 英語名 | 説明 |
|------|--------|------|
| 下書き | `Draft` | 作成中・未投稿 |
| 承認待ち | `PendingApproval` | 投稿済み・管理者承認待ち |
| 承認済み | `Approved` | 管理者承認・公開中 |
| 承認拒否 | `Rejected` | 管理者による拒否 |

## 操作・ドメインイベント

| 日本語 | 英語/イベント名 | 説明 |
|--------|---------------|------|
| 投稿 | `Submit` / `QuizSubmitted` | クイズをシステムに送信 |
| 承認 | `Approve` / `QuizApproved` | 管理者による承認 |
| 拒否 | `Reject` / `QuizRejected` | 管理者による拒否 |
| 問題集作成 | `CreateDeck` / `DeckCreated` | 検索結果等から Deck を作成 |
| 同期処理 | `Synchronization` / `SyncCompleted` | オフライン→オンライン同期 |

## コンテキスト別の主要用語

### Quiz Management Context
`Quiz`, `Question`, `Solution`, `Explanation`, `Tag`, `Creator`, `Administrator`,
`Draft`, `PendingApproval`, `Approved`, `Rejected`

### Quiz Learning Context
`Deck`, `QuizSession`, `Attempt`, `AttemptHistory`, `CorrectJudgment`, `Filter`,
`SwipeGesture`, `SaveSearchResults`

### User Session Context
`AnonymousUser`, `Creator`, `CreatorIdentification`, `DeviceFingerprint`

### Offline Sync Context
`OfflineMode`, `Synchronization`, `SyncItem`, `ConflictResolution`

## 制約・不変条件

- `Question`: テキスト ≤ 500文字
- `Explanation`: テキスト ≤ 1000文字（任意）
- `DuplicateSubmission`: 同一ユーザーによる同一問題の複数回投稿は**許可**
- `CharacterLimit`: 入力時にバリデーション + Sanitize（XSS 対策）
