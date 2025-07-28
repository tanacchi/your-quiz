# ドメインサービス抽出フォーマット案4：Sagaワークフロー型

## フォーマットの概要

DDD 2024年のマイクロサービス・分散トランザクショントレンドに基づき、Sagaパターンによる長時間実行ワークフローを中心としたドメインサービス抽出フォーマット。複雑な業務プロセスの分解と、補償処理を含む分散トランザクション設計に重点を置く。

## 記載項目テンプレート

### 1. 長時間実行プロセス分析

#### ワークフロー識別

| プロセス名 | 実行時間 | 関与アグリゲート | 失敗可能性 | 補償要求 | Saga候補度 |
|---|---|---|---|---|---|
| [Process名] | [時間] | [Aggregateリスト] | [High/Medium/Low] | [必要/不要] | [High/Medium/Low] |

#### プロセス分解分析

| プロセス名 | ステップ数 | 分解単位 | 依存関係 | 並行実行可能性 |
|---|---|---|---|---|
| [Process名] | [個数] | [分解方法] | [依存チェーン] | [並行/逐次] |

### 2. Sagaパターン設計

#### Orchestration vs Choreography選択

| Saga名 | パターン選択 | 選択理由 | コーディネーター | 複雑度 |
|---|---|---|---|---|
| [Saga名] | [Orchestration/Choreography] | [選択根拠] | [Orchestrator/Event] | [High/Medium/Low] |

#### Sagaステップ設計

| Saga名 | ステップ名 | 実行処理 | 補償処理 | タイムアウト |
|---|---|---|---|---|
| [Saga名] | [Step名] | [Forward処理] | [Compensate処理] | [制限時間] |

### 3. 補償処理設計

#### 補償戦略

| ステップ名 | 補償種別 | 補償処理内容 | 補償条件 | 副作用管理 |
|---|---|---|---|---|
| [Step名] | [取消/修正/代替] | [補償内容] | [実行条件] | [副作用対応] |

#### 補償順序設計

| Saga名 | 補償順序 | 依存関係 | 失敗時処理 | 手動介入ポイント |
|---|---|---|---|---|
| [Saga名] | [逆順/カスタム] | [補償依存] | [補償失敗時] | [手動操作要求点] |

### 4. 状態管理設計

#### Saga状態管理

| Saga名 | 状態保存方法 | 状態種別 | 永続化戦略 | 復旧方法 |
|---|---|---|---|---|
| [Saga名] | [DB/EventStore/Memory] | [状態一覧] | [永続化方式] | [復旧手順] |

#### イベント設計

| イベント名 | 発行タイミング | イベントデータ | 購読者 | 配信保証 |
|---|---|---|---|---|
| [Event名] | [発行時点] | [含むデータ] | [Subscriber] | [At-least-once/Exactly-once] |

### 5. 監視・運用設計

#### Saga監視

| 監視項目 | 監視指標 | 正常範囲 | アラート条件 | 対応アクション |
|---|---|---|---|---|
| [Monitor項目] | [指標] | [正常値] | [アラート閾値] | [対応方法] |

#### 障害回復

| 障害種別 | 検出方法 | 自動回復 | 手動回復 | エスカレーション |
|---|---|---|---|---|
| [障害タイプ] | [検出手段] | [自動処理] | [手動操作] | [エスカレ条件] |

---

## サンプル実装：クイズアプリケーション

### 1. 長時間実行プロセス分析

#### ワークフロー識別

| プロセス名 | 実行時間 | 関与アグリゲート | 失敗可能性 | 補償要求 | Saga候補度 |
|---|---|---|---|---|---|
| ユーザー登録プロセス | 2-5分 | User, Profile, Notification | Medium | 必要 | High |
| クイズ公開承認プロセス | 1-24時間 | Quiz, Administration, Statistics | Low | 必要 | High |
| 決済・プレミアム登録 | 1-10分 | User, Payment, Subscription | High | 必要 | High |
| 大規模データ処理 | 30分-2時間 | Quiz, Statistics, Analytics | Medium | 必要 | Medium |
| 不正対応プロセス | 5-30分 | User, QuizSession, Administration | Low | 必要 | Medium |

#### プロセス分解分析

| プロセス名 | ステップ数 | 分解単位 | 依存関係 | 並行実行可能性 |
|---|---|---|---|---|
| ユーザー登録プロセス | 5 | 機能単位 | 線形依存 | ステップ3-4は並行可能 |
| クイズ公開承認プロセス | 4 | 承認段階単位 | 承認フロー依存 | 通知処理は並行可能 |
| 決済・プレミアム登録 | 6 | トランザクション単位 | 決済成功後は並行 | 権限設定と通知は並行 |
| 大規模データ処理 | 8 | データ処理単位 | 段階的依存 | 分析処理は並行可能 |
| 不正対応プロセス | 4 | 対応ステップ単位 | 確認後は並行 | 通知と制限は並行可能 |

### 2. Sagaパターン設計

#### Orchestration vs Choreography選択

| Saga名 | パターン選択 | 選択理由 | コーディネーター | 複雑度 |
|---|---|---|---|---|
| UserRegistrationSaga | Orchestration | エラー処理の集中管理が必要 | UserRegistrationOrchestrator | Medium |
| QuizApprovalSaga | Choreography | 承認プロセスの自律性重視 | Event-driven | Low |
| PaymentSubscriptionSaga | Orchestration | 決済処理の厳密な制御が必要 | PaymentOrchestrator | High |
| DataProcessingSaga | Choreography | 大量データ処理の分散性 | Event-driven | Medium |
| FraudResponseSaga | Orchestration | 迅速な対応制御が必要 | FraudResponseOrchestrator | Medium |

#### Sagaステップ設計

| Saga名 | ステップ名 | 実行処理 | 補償処理 | タイムアウト |
|---|---|---|---|---|
| UserRegistrationSaga | ValidateUser | ユーザー情報検証 | 検証結果クリア | 30秒 |
| UserRegistrationSaga | CreateAccount | アカウント作成 | アカウント削除 | 60秒 |
| UserRegistrationSaga | SendWelcomeEmail | ウェルカムメール送信 | 送信キャンセル（不可） | 120秒 |
| PaymentSubscriptionSaga | ProcessPayment | 決済処理実行 | 決済取消 | 180秒 |
| PaymentSubscriptionSaga | ActivateSubscription | サブスクリプション有効化 | サブスクリプション無効化 | 60秒 |
| PaymentSubscriptionSaga | GrantPremiumAccess | プレミアム権限付与 | 権限剥奪 | 30秒 |

### 3. 補償処理設計

#### 補償戦略

| ステップ名 | 補償種別 | 補償処理内容 | 補償条件 | 副作用管理 |
|---|---|---|---|---|
| CreateAccount | 取消 | アカウント物理削除 | 後続ステップ失敗時 | 関連データも連鎖削除 |
| ProcessPayment | 取消 | 決済キャンセル・返金 | 後続ステップ失敗時 | 決済ログは保持 |
| SendWelcomeEmail | 代替 | キャンセル通知メール | 登録失敗時 | メール履歴は保持 |
| ActivateSubscription | 取消 | サブスクリプション即座無効化 | 権限付与失敗時 | 課金停止処理含む |
| GrantPremiumAccess | 取消 | 権限即座剥奪 | システムエラー時 | 既存セッション無効化 |

#### 補償順序設計

| Saga名 | 補償順序 | 依存関係 | 失敗時処理 | 手動介入ポイント |
|---|---|---|---|---|
| UserRegistrationSaga | 逆順実行 | アカウント削除→検証クリア | 補償失敗は手動対応 | アカウント削除失敗時 |
| PaymentSubscriptionSaga | カスタム順序 | 権限剥奪→サブスク無効→決済取消 | 決済取消失敗は緊急対応 | 決済取消失敗時 |
| DataProcessingSaga | 並行補償可能 | 処理停止→一時データ削除 | 手動クリーンアップ | データ不整合発生時 |

### 4. 状態管理設計

#### Saga状態管理

| Saga名 | 状態保存方法 | 状態種別 | 永続化戦略 | 復旧方法 |
|---|---|---|---|---|
| UserRegistrationSaga | DB Table | Started/UserValidated/AccountCreated/EmailSent/Completed/Failed | トランザクショナル | ステップ再実行 |
| PaymentSubscriptionSaga | EventStore | Started/PaymentProcessed/SubscriptionActivated/AccessGranted/Completed/Compensated | Event Sourcing | イベント再生 |
| DataProcessingSaga | Redis + DB | Started/DataExtracted/Processed/Analyzed/Completed/Failed | ハイブリッド | チェックポイント復旧 |

#### イベント設計

| イベント名 | 発行タイミング | イベントデータ | 購読者 | 配信保証 |
|---|---|---|---|---|
| UserRegistrationStarted | Saga開始時 | UserId, Email, RegistrationTime | NotificationService, AuditService | At-least-once |
| PaymentProcessed | 決済完了時 | UserId, PaymentId, Amount, Timestamp | SubscriptionService, BillingService | Exactly-once |
| SubscriptionActivated | サブスクリプション有効化時 | UserId, PlanId, ActiveUntil | AccessControlService | Exactly-once |
| SagaFailed | Saga失敗時 | SagaId, FailureReason, CompensationStatus | AlertService, SupportService | At-least-once |

### 5. 監視・運用設計

#### Saga監視

| 監視項目 | 監視指標 | 正常範囲 | アラート条件 | 対応アクション |
|---|---|---|---|---|
| Saga実行時間 | 平均実行時間 | 5分以内 | 10分以上 | パフォーマンス調査 |
| Saga成功率 | 完了率 | 98%以上 | 95%未満 | エラー分析・改善 |
| 補償実行率 | 補償処理実行率 | 5%未満 | 10%以上 | ビジネスプロセス見直し |
| 手動介入率 | 手動対応要求率 | 1%未満 | 3%以上 | 自動化改善 |
| 長期実行Saga | 24時間以上実行中 | 0件 | 1件以上 | 即座手動確認 |

#### 障害回復

| 障害種別 | 検出方法 | 自動回復 | 手動回復 | エスカレーション |
|---|---|---|---|---|
| ステップタイムアウト | タイマー監視 | 最大3回リトライ | Saga状態リセット | 4回失敗で開発チーム |
| 補償処理失敗 | 補償実行結果監視 | なし | 手動補償実行 | 即座運用チーム |
| 外部サービス障害 | ヘルスチェック | サーキットブレーカー | 手動サービス切替 | 15分継続で緊急対応 |
| データ不整合 | 整合性チェック | なし | データ修復スクリプト | データチーム即座対応 |
| Saga状態破損 | 状態検証 | 状態復旧 | Saga再実行 | 復旧失敗で開発チーム |

---

## フォーマットの特徴

### 利点

- **複雑プロセス管理**：長時間実行される複雑な業務プロセスの体系的管理
- **障害耐性**：部分失敗からの自動復旧と補償処理による整合性維持
- **分散トランザクション**：マイクロサービス環境での分散トランザクション実現
- **運用性**：Sagaの状態監視と運用手順の明確化
- **ビジネス継続性**：障害時でもビジネスプロセスの継続性を保証

### 欠点

- **設計複雑度**：補償処理設計とSaga管理の高い複雑性
- **開発コスト**：Sagaオーケストレーターと監視機能の開発工数
- **デバッグ困難**：分散実行による障害特定とデバッグの難しさ
- **運用負荷**：Saga状態管理と障害対応の運用負荷
- **パフォーマンス**：ステップ間通信によるレイテンシ増加

### 適用場面

- **マイクロサービス環境**：サービス間をまたぐ長期トランザクションが必要
- **複雑業務プロセス**：多段階の承認・処理フローがある業務
- **外部システム統合**：外部システムを含む一連の処理が必要
- **高信頼性要求**：障害時の自動復旧とデータ整合性が重要
- **非同期処理重視**：レスポンシブなユーザー体験が必要
- **監査要求**：処理状況の詳細な追跡と記録が必要
