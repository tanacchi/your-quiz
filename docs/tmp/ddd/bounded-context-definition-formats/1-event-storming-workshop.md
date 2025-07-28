# 境界づけられたコンテキスト定義フォーマット案1：イベントストーミング・ワークショップ型

## フォーマットの概要

DDD 2024年のベストプラクティスに基づき、Event Storming + Bounded Context Canvasを中心とした協働ワークショップによる境界づけられたコンテキスト定義フォーマット。ドメインイベントの発見から自然な境界の特定、ステークホルダーとの協働による境界設計に重点を置く。

## 記載項目テンプレート

### 1. Big Picture Event Storming実施

#### ドメインイベント発見（テンプレート）

| イベント名 | 発生タイミング | 関与アクター | ビジネス価値 | 重要度 |
|---|---|---|---|---|
| [Event名] | [タイミング] | [Actor] | [価値内容] | [High/Medium/Low] |

#### コマンド・アグリゲート特定（テンプレート）

| コマンド | 対象アグリゲート | イベント結果 | 実行者 | ビジネスルール |
|---|---|---|---|---|
| [Command名] | [Aggregate名] | [結果Event] | [実行者] | [適用ルール] |

### 2. Pivotal Events特定

#### 重要境界イベント（テンプレート）

| Pivotal Event | 境界理由 | 上流コンテキスト | 下流コンテキスト | 統合方式 |
|---|---|---|---|---|
| [Event名] | [境界となる理由] | [上流Context] | [下流Context] | [統合パターン] |

#### 状態変化分析（テンプレート）

| イベント前状態 | Pivotal Event | イベント後状態 | 責任移譲 | 整合性要件 |
|---|---|---|---|---|
| [Before状態] | [Event名] | [After状態] | [責任変更] | [整合性レベル] |

### 3. Candidate Context Modeling

#### コンテキスト候補抽出

| コンテキスト候補名 | 含まれるイベント | 含まれるアグリゲート | 責任範囲 | 境界理由 |
|---|---|---|---|---|
| [Context名] | [Eventリスト] | [Aggregateリスト] | [責任内容] | [境界設定理由] |

#### コンテキスト関係性

| コンテキストA | コンテキストB | 関係タイプ | データ交換 | 統合複雑度 |
|---|---|---|---|---|
| [ContextA名] | [ContextB名] | [関係種別] | [交換データ] | [High/Medium/Low] |

### 4. Domain Message Flow Modeling

#### メッセージフロー設計

| 送信コンテキスト | 受信コンテキスト | メッセージ種別 | メッセージ内容 | 配信保証 |
|---|---|---|---|---|
| [送信Context] | [受信Context] | [Command/Event/Query] | [メッセージ構造] | [保証レベル] |

#### 統合パターン選択

| 統合ペア | 統合パターン | 選択理由 | 実装方式 | 監視要件 |
|---|---|---|---|---|
| [ContextA-ContextB] | [パターン名] | [選択根拠] | [技術実装] | [監視項目] |

### 5. Bounded Context Canvas

#### コンテキスト詳細設計

| 項目 | 内容 |
|---|---|
| **Context Name** | [コンテキスト名] |
| **Purpose** | [目的・存在理由] |
| **Strategic Classification** | [Core/Supporting/Generic] |
| **Domain Role** | [役割・責任] |
| **Ubiquitous Language** | [重要用語リスト] |
| **Business Decisions** | [ビジネス決定事項] |
| **Inbound Communication** | [受信通信パターン] |
| **Outbound Communication** | [送信通信パターン] |

#### コンテキスト境界定義

| 境界要素 | 含む | 含まない | 理由 |
|---|---|---|---|
| **Entities** | [含むEntity] | [除外Entity] | [判断理由] |
| **Business Rules** | [含むRule] | [除外Rule] | [判断理由] |
| **Processes** | [含むProcess] | [除外Process] | [判断理由] |
| **Data** | [含むData] | [除外Data] | [判断理由] |

### 6. Context Map作成

#### コンテキスト間関係

| 上流コンテキスト | 下流コンテキスト | マッピングパターン | 実装詳細 | 進化戦略 |
|---|---|---|---|---|
| [上流Context] | [下流Context] | [Shared Kernel/ACL/OHS等] | [実装方法] | [進化計画] |

#### 統合品質管理

| 統合ペア | SLA要件 | 監視指標 | 障害対応 | テスト戦略 |
|---|---|---|---|---|
| [Context間] | [品質要件] | [監視項目] | [障害時対応] | [テスト方針] |

---

## サンプル実装：クイズアプリケーション

### 1. Big Picture Event Storming実施

#### ドメインイベント発見

| イベント名 | 発生タイミング | 関与アクター | ビジネス価値 | 重要度 |
|---|---|---|---|---|
| UserRegistered | ユーザー登録完了時 | User, System | 新規ユーザー獲得 | High |
| QuizCreated | クイズ作成時 | QuizCreator, System | コンテンツ増加 | High |
| QuizApproved | クイズ承認時 | Administrator | 品質保証 | High |
| QuizSessionStarted | クイズ開始時 | User, Quiz | エンゲージメント開始 | High |
| AnswerSubmitted | 回答提出時 | User, Question | 学習進捗 | Medium |
| QuizSessionCompleted | クイズ完了時 | User, Quiz | 学習成果 | High |
| ScoreCalculated | スコア計算時 | System | 評価提供 | Medium |
| StatisticsUpdated | 統計更新時 | System | データ分析 | Low |

#### コマンド・アグリゲート特定

| コマンド | 対象アグリゲート | イベント結果 | 実行者 | ビジネスルール |
|---|---|---|---|---|
| RegisterUser | User | UserRegistered | System | メール一意性・パスワード強度 |
| CreateQuiz | Quiz | QuizCreated | QuizCreator | 最低問題数・適切なカテゴリ |
| ApproveQuiz | Quiz | QuizApproved | Administrator | 内容審査・品質基準 |
| StartQuizSession | QuizSession | QuizSessionStarted | User | 受講権限・重複防止 |
| SubmitAnswer | Answer | AnswerSubmitted | User | 制限時間・回答形式 |
| CompleteQuizSession | QuizSession | QuizSessionCompleted | System | 全問回答・時間制限 |

### 2. Pivotal Events特定

#### 重要境界イベント

| Pivotal Event | 境界理由 | 上流コンテキスト | 下流コンテキスト | 統合方式 |
|---|---|---|---|---|
| UserRegistered | 認証から学習への移行 | IdentityContext | LearningContext | Event Publication |
| QuizApproved | コンテンツ管理から学習提供への移行 | ContentContext | LearningContext | Event Publication |
| QuizSessionCompleted | 学習から評価への移行 | LearningContext | AssessmentContext | Event Publication |
| PaymentProcessed | 課金から機能提供への移行 | BillingContext | IdentityContext | Synchronous API |

#### 状態変化分析

| イベント前状態 | Pivotal Event | イベント後状態 | 責任移譲 | 整合性要件 |
|---|---|---|---|---|
| 未認証ユーザー | UserRegistered | 認証済みユーザー | Identity→Learning | Eventually Consistent |
| ドラフトクイズ | QuizApproved | 公開可能クイズ | Content→Learning | Strong Consistency |
| 進行中セッション | QuizSessionCompleted | 完了セッション | Learning→Assessment | Strong Consistency |
| 未課金ユーザー | PaymentProcessed | プレミアムユーザー | Billing→Identity | Strong Consistency |

### 3. Candidate Context Modeling

#### コンテキスト候補抽出

| コンテキスト候補名 | 含まれるイベント | 含まれるアグリゲート | 責任範囲 | 境界理由 |
|---|---|---|---|---|
| IdentityContext | UserRegistered, ProfileUpdated | User, Profile | ユーザー認証・基本情報管理 | 認証・認可の独立性 |
| ContentContext | QuizCreated, QuizApproved | Quiz, Question, Category | クイズコンテンツ管理・品質保証 | コンテンツライフサイクル管理 |
| LearningContext | QuizSessionStarted, AnswerSubmitted, QuizSessionCompleted | QuizSession, Answer | 学習プロセス・進捗管理 | 学習体験の一貫性 |
| AssessmentContext | ScoreCalculated, CertificateIssued | Score, Certificate | 評価・認定・証明書発行 | 評価基準の独立性 |
| BillingContext | PaymentProcessed, SubscriptionUpdated | Payment, Subscription | 課金・サブスクリプション管理 | 財務処理の分離 |

#### コンテキスト関係性

| コンテキストA | コンテキストB | 関係タイプ | データ交換 | 統合複雑度 |
|---|---|---|---|---|
| IdentityContext | LearningContext | Customer-Supplier | UserID, Permissions | Low |
| ContentContext | LearningContext | Customer-Supplier | QuizID, QuizMetadata | Medium |
| LearningContext | AssessmentContext | Customer-Supplier | SessionResults, UserAnswers | Medium |
| BillingContext | IdentityContext | Customer-Supplier | SubscriptionStatus, PaymentStatus | High |
| AssessmentContext | IdentityContext | Partnership | CertificateData, AchievementData | Low |

### 4. Domain Message Flow Modeling

#### メッセージフロー設計

| 送信コンテキスト | 受信コンテキスト | メッセージ種別 | メッセージ内容 | 配信保証 |
|---|---|---|---|---|
| IdentityContext | LearningContext | Event | {userId, registrationTime, permissions} | At-least-once |
| ContentContext | LearningContext | Event | {quizId, approvalTime, metadata} | At-least-once |
| LearningContext | AssessmentContext | Event | {sessionId, userId, answers, completionTime} | Exactly-once |
| BillingContext | IdentityContext | Command | {userId, subscriptionLevel, effectiveDate} | Exactly-once |
| AssessmentContext | IdentityContext | Event | {userId, certificateId, achievementData} | At-least-once |

#### 統合パターン選択

| 統合ペア | 統合パターン | 選択理由 | 実装方式 | 監視要件 |
|---|---|---|---|---|
| Identity-Learning | Customer-Supplier | 学習の認証依存 | Event Bus + REST API | 認証成功率・レスポンス時間 |
| Content-Learning | Customer-Supplier | 学習のコンテンツ依存 | Event Bus + Cache | コンテンツ取得時間・キャッシュヒット率 |
| Learning-Assessment | Partnership | 相互協力関係 | Event Bus + Saga | 評価処理時間・整合性 |
| Billing-Identity | Customer-Supplier | 課金状態の反映 | Synchronous API | 支払い成功率・状態同期遅延 |

### 5. Bounded Context Canvas

#### IdentityContext詳細設計

| 項目 | 内容 |
|---|---|
| **Context Name** | Identity & User Management Context |
| **Purpose** | ユーザー認証・認可・基本プロフィール管理 |
| **Strategic Classification** | Supporting Domain |
| **Domain Role** | ユーザーの一意性保証・セキュリティ管理・基本情報提供 |
| **Ubiquitous Language** | User, Profile, Authentication, Authorization, Session |
| **Business Decisions** | パスワードポリシー・セッション有効期限・多要素認証 |
| **Inbound Communication** | RegisterUser, LoginUser, UpdateProfile, VerifyPermission |
| **Outbound Communication** | UserRegistered, UserAuthenticated, ProfileUpdated |

#### LearningContext詳細設計

| 項目 | 内容 |
|---|---|
| **Context Name** | Learning Experience Context |
| **Purpose** | 学習プロセス管理・進捗追跡・学習体験提供 |
| **Strategic Classification** | Core Domain |
| **Domain Role** | 学習セッション管理・進捗追跡・学習データ収集 |
| **Ubiquitous Language** | QuizSession, LearningPath, Progress, Attempt, TimeLimit |
| **Business Decisions** | セッション制限時間・再受講ポリシー・進捗計算方法 |
| **Inbound Communication** | StartQuizSession, SubmitAnswer, PauseSession, ResumeSession |
| **Outbound Communication** | SessionStarted, AnswerSubmitted, SessionCompleted, ProgressUpdated |

### 6. Context Map作成

#### コンテキスト間関係

| 上流コンテキスト | 下流コンテキスト | マッピングパターン | 実装詳細 | 進化戦略 |
|---|---|---|---|---|
| IdentityContext | LearningContext | Open Host Service | REST API + Event Publication | API versioning・backward compatibility |
| ContentContext | LearningContext | Anti-Corruption Layer | Quiz metadata transformation | Content model abstraction |
| LearningContext | AssessmentContext | Shared Kernel | Common value objects for scoring | Shared library・coordinated evolution |
| BillingContext | IdentityContext | Customer-Supplier | Subscription status synchronization | Service interface standardization |

#### 統合品質管理

| 統合ペア | SLA要件 | 監視指標 | 障害対応 | テスト戦略 |
|---|---|---|---|---|
| Identity-Learning | 99.9% availability, <200ms response | Success rate, Response time | Graceful degradation・cache fallback | Contract testing・load testing |
| Content-Learning | 99.5% availability, <500ms response | Content fetch success, Cache hit rate | Stale content tolerance・retry logic | Integration testing・content sync testing |
| Learning-Assessment | 99.9% accuracy, <1s processing | Score calculation accuracy, Processing time | Manual review・error correction | End-to-end testing・accuracy validation |
| Billing-Identity | 99.99% consistency, <5s sync | Payment success rate, Sync latency | Manual reconciliation・audit trail | Payment simulation・consistency checking |

---

## フォーマットの特徴

### 利点

- **協働発見**: ステークホルダーとの協働によるドメイン理解の深化
- **視覚的理解**: Event Stormingによる直感的なドメイン構造把握
- **自然な境界**: ビジネスイベントに基づく自然なコンテキスト境界発見
- **実践的設計**: Bounded Context Canvasによる具体的なコンテキスト設計
- **統合計画**: Context Mapによる明確な統合戦略

### 欠点

- **ワークショップ依存**: 適切なファシリテーションと参加者の質に依存
- **時間コスト**: 複数回のワークショップと詳細分析に時間が必要
- **合意形成困難**: ステークホルダー間の意見調整が困難な場合がある
- **スキル要求**: Event Stormingファシリテーションスキルが必要
- **継続更新困難**: ワークショップ結果の継続的更新が困難

### 適用場面

- **新規プロダクト開発**: ドメイン理解から始める必要がある場合
- **レガシーシステム再構築**: 既存ドメインの再発見が必要
- **ステークホルダー協働**: ビジネス専門家との密接な協働が可能
- **ドメイン複雑性**: 複雑なビジネスプロセスの理解が必要
- **チーム学習**: ドメイン知識をチーム全体で共有したい場合
- **境界不明確**: 既存システムの境界が不明確で再定義が必要
