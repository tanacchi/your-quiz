# エンティティ間関連性分析フォーマット案2：ドメインイベント駆動型

## フォーマットの概要

DDD 2024年のイベントソーシング・CQRSトレンドに基づき、ドメインイベントを中心としたエンティティ間関連性分析フォーマット。イベントストリームとコマンド・クエリ分離によるスケーラブルな設計に重点を置く。

## 記載項目テンプレート

### 1. ドメインイベント体系分析

#### コアドメインイベント抽出

| イベント名 | 発生契機 | 関与エンティティ | イベントデータ | 業務重要度 |
|---|---|---|---|---|
| [Event名] | [発生条件] | [エンティティリスト] | [含まれるデータ] | [High/Medium/Low] |

#### イベントストリーム設計

| ストリーム名 | 担当アグリゲート | イベント種別 | 保持期間 | パーティション戦略 |
|---|---|---|---|---|
| [Stream名] | [Aggregate名] | [イベントタイプリスト] | [保持期間] | [分散方法] |

### 2. コマンド・クエリ分離（CQRS）設計

#### コマンドモデル分析

| コマンド名 | 対象アグリゲート | 副作用イベント | バリデーション | 冪等性 |
|---|---|---|---|---|
| [Command名] | [Aggregate名] | [発生イベントリスト] | [事前条件] | [冪等/非冪等] |

#### クエリモデル分析

| クエリ名 | データソース | 更新契機イベント | レスポンス形式 | キャッシュ戦略 |
|---|---|---|---|---|
| [Query名] | [参照元] | [更新トリガーイベント] | [返却データ形式] | [キャッシュ方法] |

### 3. イベント駆動関連性マップ

#### イベント発行関係

| 発行アグリゲート | イベント名 | 購読アグリゲート | 処理内容 | 失敗時対応 |
|---|---|---|---|---|
| [発行元] | [Event名] | [購読先] | [実行処理] | [補償アクション] |

#### イベント連鎖分析

| トリガーイベント | 中間イベント | 最終イベント | ビジネスプロセス | 全体所要時間 |
|---|---|---|---|---|
| [開始Event] | [中間Eventリスト] | [完了Event] | [業務フロー名] | [処理時間] |

### 4. イベント駆動アーキテクチャ設計

#### イベントバス設計

| イベントバス名 | 配信パターン | 順序保証 | 重複配信対応 | 配信遅延許容 |
|---|---|---|---|---|
| [Bus名] | [Pub-Sub/Queue/Topic] | [順序要/不要] | [冪等性要求] | [最大遅延時間] |

#### スナップショット戦略

| アグリゲート名 | スナップショット頻度 | トリガー条件 | 保存データ | 復元戦略 |
|---|---|---|---|---|
| [Aggregate名] | [頻度] | [スナップショット条件] | [保存内容] | [復元方法] |

### 5. 結果整合性管理

#### 整合性パターン分析

| 関連アグリゲート | 整合性レベル | 許容遅延 | 整合性確認方法 | 不整合対応 |
|---|---|---|---|---|
| [Aggregateリスト] | [Strong/Eventual] | [遅延時間] | [確認方法] | [修復手順] |

#### Sagaパターン設計

| Sagaプロセス名 | 参加サービス | 補償アクション | 失敗検出 | 状態管理 |
|---|---|---|---|---|
| [Process名] | [サービスリスト] | [補償処理リスト] | [失敗条件] | [状態保存方法] |

---

## サンプル実装：クイズアプリケーション

### 1. ドメインイベント体系分析

#### コアドメインイベント抽出

| イベント名 | 発生契機 | 関与エンティティ | イベントデータ | 業務重要度 |
|---|---|---|---|---|
| QuizCreated | クイズ作成完了 | Quiz, Question, Choice | QuizId, Title, Questions[], CreatorId | High |
| QuizApproved | 承認処理完了 | Quiz, Admin | QuizId, ApproverId, ApprovalTime | High |
| SessionStarted | 回答セッション開始 | QuizSession, User, Quiz | SessionId, UserId, QuizId, StartTime | Medium |
| AnswerSubmitted | 回答提出 | Answer, QuizSession | SessionId, QuestionId, SelectedChoice, SubmitTime | High |
| SessionCompleted | セッション完了 | QuizSession, Score | SessionId, FinalScore, Duration, CompletionTime | High |
| UserRegistered | ユーザー登録 | User, UserProfile | UserId, Email, ProfileData, RegistrationTime | Medium |
| QuizStatisticsUpdated | 統計情報更新 | QuizStatistics | QuizId, NewStats, UpdateTime | Low |

#### イベントストリーム設計

| ストリーム名 | 担当アグリゲート | イベント種別 | 保持期間 | パーティション戦略 |
|---|---|---|---|---|
| quiz-stream | Quiz | QuizCreated, QuizApproved, QuizUpdated | 5年 | QuizId |
| session-stream | QuizSession | SessionStarted, AnswerSubmitted, SessionCompleted | 2年 | UserId |
| user-stream | User | UserRegistered, UserProfileUpdated | 永続 | UserId |
| admin-stream | Administration | QuizApproved, UserSuspended | 7年 | AdminId |

### 2. コマンド・クエリ分離（CQRS）設計

#### コマンドモデル分析

| コマンド名 | 対象アグリゲート | 副作用イベント | バリデーション | 冪等性 |
|---|---|---|---|---|
| CreateQuiz | Quiz | QuizCreated | タイトル必須、問題数≥1 | 非冪等 |
| ApproveQuiz | Quiz | QuizApproved | 管理者権限、承認待ち状態 | 冪等 |
| StartSession | QuizSession | SessionStarted | ユーザー認証、クイズ存在 | 非冪等 |
| SubmitAnswer | QuizSession | AnswerSubmitted | セッション有効、制限時間内 | 冪等 |
| CompleteSession | QuizSession | SessionCompleted | 全問題回答済み | 冪等 |
| RegisterUser | User | UserRegistered | メール一意性、必須項目 | 冪等 |

#### クエリモデル分析

| クエリ名 | データソース | 更新契機イベント | レスポンス形式 | キャッシュ戦略 |
|---|---|---|---|---|
| GetQuizList | QuizReadModel | QuizCreated, QuizApproved | QuizSummary[] | Redis 30分 |
| GetQuizDetails | QuizReadModel | QuizCreated, QuizUpdated | QuizDetail | Redis 10分 |
| GetUserStats | UserStatsReadModel | SessionCompleted | UserStatistics | Redis 60分 |
| GetLeaderboard | LeaderboardReadModel | SessionCompleted | RankingEntry[] | Redis 15分 |
| GetSessionHistory | SessionReadModel | SessionCompleted | SessionSummary[] | NoCache |

### 3. イベント駆動関連性マップ

#### イベント発行関係

| 発行アグリゲート | イベント名 | 購読アグリゲート | 処理内容 | 失敗時対応 |
|---|---|---|---|---|
| Quiz | QuizCreated | Administration | 承認待ちリスト追加 | Dead Letter Queue |
| Quiz | QuizApproved | Statistics | 統計情報更新 | 再試行3回 |
| QuizSession | SessionCompleted | User | ユーザー統計更新 | 補償処理 |
| QuizSession | AnswerSubmitted | Quiz | 回答統計蓄積 | 結果整合性許容 |
| User | UserRegistered | EmailService | ウェルカムメール送信 | 失敗許容 |

#### イベント連鎖分析

| トリガーイベント | 中間イベント | 最終イベント | ビジネスプロセス | 全体所要時間 |
|---|---|---|---|---|
| QuizCreated | QuizSubmittedForApproval | QuizApproved | クイズ承認フロー | 1-24時間 |
| SessionStarted | AnswerSubmitted×N | SessionCompleted | クイズ回答フロー | 5-30分 |
| SessionCompleted | UserStatsUpdated, LeaderboardUpdated | NotificationSent | 結果通知フロー | 1-5分 |

### 4. イベント駆動アーキテクチャ設計

#### イベントバス設計

| イベントバス名 | 配信パターン | 順序保証 | 重複配信対応 | 配信遅延許容 |
|---|---|---|---|---|
| quiz-events-bus | Topic | アグリゲート単位で順序保証 | 冪等性前提 | 100ms |
| session-events-bus | Queue | セッション単位で順序保証 | 重複チェック | 50ms |
| user-events-bus | Topic | 順序不要 | 冪等性前提 | 500ms |
| notification-bus | Pub-Sub | 順序不要 | 重複許容 | 1s |

#### スナップショット戦略

| アグリゲート名 | スナップショット頻度 | トリガー条件 | 保存データ | 復元戦略 |
|---|---|---|---|---|
| Quiz | 50イベント毎 | 大量の質問追加/更新時 | Quiz基本情報+Question[] | スナップショット+差分イベント |
| QuizSession | 完了時 | SessionCompleted発生時 | 最終状態+全回答履歴 | スナップショットのみ |
| User | 100イベント毎 | プロフィール大量更新時 | ユーザー基本情報 | スナップショット+差分イベント |

### 5. 結果整合性管理

#### 整合性パターン分析

| 関連アグリゲート | 整合性レベル | 許容遅延 | 整合性確認方法 | 不整合対応 |
|---|---|---|---|---|
| Quiz-User(創作者) | Eventual | 5分 | ヘルスチェックAPI | 補償処理で修復 |
| QuizSession-Quiz | Eventual | 1分 | クエリ時検証 | エラー返却、修復処理 |
| User-Statistics | Eventual | 10分 | バッチ処理確認 | 再計算処理 |
| Leaderboard-Sessions | Eventual | 30秒 | リアルタイム監視 | 増分更新 |

#### Sagaパターン設計

| Sagaプロセス名 | 参加サービス | 補償アクション | 失敗検出 | 状態管理 |
|---|---|---|---|---|
| QuizCreationSaga | Quiz, Administration, Statistics | Quiz削除、承認取消、統計ロールバック | タイムアウト、明示的失敗 | EventStore状態 |
| UserRegistrationSaga | User, EmailService, Profile | ユーザー削除、メール送信停止 | メール送信失敗 | Saga状態テーブル |
| SessionCompletionSaga | Session, User, Stats, Notification | スコア取消、統計減算、通知停止 | 統計更新失敗 | EventStore状態 |

---

## フォーマットの特徴

### 利点

- **高いスケーラビリティ**：イベント駆動による非同期処理でスケール可能
- **監査証跡完全**：全イベントが記録され、完全な操作履歴を保持
- **読み取り最適化**：CQRS により読み取り性能を独立最適化
- **障害回復力**：イベント再生により任意時点への状態復元可能
- **疎結合設計**：アグリゲート間がイベントで疎結合

### 欠点

- **複雑性が高い**：イベントソーシング・CQRS の理解が必要
- **結果整合性**：即座一貫性が必要な場面では適用困難
- **ストレージコスト**：全イベント保存によるストレージ使用量増加
- **学習コスト**：非同期処理、補償処理の設計スキル必要

### 適用場面

- **高トラフィックシステム**：大量のユーザー操作がある場合
- **監査要求厳格**：金融、医療など完全な履歴が必要
- **マイクロサービス**：サービス間の疎結合が重要
- **イベント分析重要**：リアルタイム分析、機械学習活用
- **将来拡張予定**：システム成長に伴うスケーラビリティ要求
