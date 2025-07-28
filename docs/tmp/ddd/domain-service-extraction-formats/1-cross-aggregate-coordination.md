# ドメインサービス抽出フォーマット案1：アグリゲート間協調型

## フォーマットの概要

DDD 2024年のベストプラクティスに基づき、アグリゲート間の協調処理を中心としたドメインサービス抽出フォーマット。複数のアグリゲートにまたがるビジネスロジックの特定と、適切なサービス境界の設計に重点を置く。

## 記載項目テンプレート

### 1. アグリゲート間協調処理分析

#### クロスアグリゲート操作の特定

| 操作名 | 関与アグリゲート | 協調の理由 | ビジネス重要度 | 複雑度 |
|---|---|---|---|---|
| [Operation名] | [Aggregateリスト] | [なぜ複数アグリゲートが必要か] | [High/Medium/Low] | [High/Medium/Low] |

#### アグリゲート境界制約分析

| 制約名 | 制約対象アグリゲート | 制約内容 | 検証タイミング | サービス候補 |
|---|---|---|---|---|
| [Constraint名] | [Aggregateリスト] | [具体的制約] | [いつ検証するか] | [候補サービス名] |

### 2. ドメインサービス候補抽出

#### サービス候補一覧

| サービス名 | 責任範囲 | 関与アグリゲート | 抽出理由 | 代替案検討 |
|---|---|---|---|---|
| [Service名] | [責任内容] | [Aggregateリスト] | [なぜサービスが必要か] | [Entity/ValueObjectでは不可な理由] |

#### サービス協調パターン

| サービス名 | 協調パターン | 実行順序 | 失敗時処理 | 一貫性レベル |
|---|---|---|---|---|
| [Service名] | [Orchestration/Choreography] | [実行順] | [エラー処理] | [Strong/Eventual] |

### 3. サービス間依存関係設計

#### サービス依存マップ

| サービスA | サービスB | 依存関係 | 依存理由 | 疎結合化方針 |
|---|---|---|---|---|
| [ServiceA名] | [ServiceB名] | [依存種別] | [なぜ依存するか] | [疎結合化方法] |

#### 循環依存チェック

| 依存チェーン | 循環有無 | 問題点 | 解決策 | 実装方針 |
|---|---|---|---|---|
| [A→B→C→...] | [Yes/No] | [問題内容] | [解決方法] | [実装アプローチ] |

### 4. サービス境界設計

#### 責任分離設計

| サービス名 | コア責任 | 除外する責任 | 境界理由 | インターフェース設計 |
|---|---|---|---|---|
| [Service名] | [主責任] | [含めない責任] | [境界設定理由] | [メソッドシグネチャ] |

#### 外部依存管理

| サービス名 | 外部依存 | 依存理由 | 抽象化方法 | テスト戦略 |
|---|---|---|---|---|
| [Service名] | [外部システム/DB等] | [なぜ依存するか] | [Interface/Port等] | [Mock/Stub戦略] |

### 5. サービス実装方針

#### 状態管理方針

| サービス名 | ステートレス度 | 状態保持理由 | 状態管理方法 | スレッドセーフ対応 |
|---|---|---|---|---|
| [Service名] | [完全/部分/ステートフル] | [状態が必要な理由] | [状態管理方法] | [同期化戦略] |

#### パフォーマンス考慮

| サービス名 | 性能要件 | ボトルネック要因 | 最適化戦略 | 監視項目 |
|---|---|---|---|---|
| [Service名] | [レスポンス時間等] | [予想ボトルネック] | [最適化方法] | [監視指標] |

---

## サンプル実装：クイズアプリケーション

### 1. アグリゲート間協調処理分析

#### クロスアグリゲート操作の特定

| 操作名 | 関与アグリゲート | 協調の理由 | ビジネス重要度 | 複雑度 |
|---|---|---|---|---|
| クイズ承認処理 | Quiz, Administration | 承認権限チェック+状態変更 | High | Medium |
| 重複回答チェック | User, QuizSession, Quiz | ユーザー・クイズ・日付の組み合わせ検証 | High | Low |
| スコア統計更新 | QuizSession, Quiz, Statistics | セッション完了時の統計情報更新 | Medium | High |
| 不正行為検出 | User, QuizSession, Answer | 回答パターン分析による不正検出 | High | High |
| 推奨クイズ選定 | User, Quiz, Statistics | ユーザー履歴と統計による推奨計算 | Low | High |

#### アグリゲート境界制約分析

| 制約名 | 制約対象アグリゲート | 制約内容 | 検証タイミング | サービス候補 |
|---|---|---|---|---|
| 重複セッション制約 | User, QuizSession, Quiz | 同一ユーザー・クイズ・日付の一意性 | セッション開始時 | SessionValidationService |
| 承認権限制約 | Quiz, Administration | 管理者権限による承認のみ許可 | 承認実行時 | QuizApprovalService |
| 統計整合性制約 | Quiz, QuizSession, Statistics | 統計値と実績値の整合性維持 | 統計更新時 | StatisticsConsistencyService |
| 不正検出制約 | User, QuizSession, Answer | 異常な回答パターンの検出と処理 | 回答提出時 | FraudDetectionService |

### 2. ドメインサービス候補抽出

#### サービス候補一覧

| サービス名 | 責任範囲 | 関与アグリゲート | 抽出理由 | 代替案検討 |
|---|---|---|---|---|
| QuizApprovalService | クイズ承認処理の制御 | Quiz, Administration | 権限チェック+状態変更の協調必要 | Entity内では権限情報がない |
| SessionValidationService | セッション開始時の検証 | User, Quiz, QuizSession | 複数アグリゲート情報の照合必要 | 各Entityでは他の情報アクセス不可 |
| StatisticsCalculationService | 統計情報の計算・更新 | Quiz, QuizSession, Statistics | 複雑な集計ロジックと複数データ参照 | 単一Entityでは計算不可 |
| RecommendationService | 推奨クイズの選定 | User, Quiz, Statistics | 機械学習的な複雑アルゴリズム | Entityには不適切な複雑度 |
| FraudDetectionService | 不正行為の検出・処理 | User, QuizSession, Answer | パターン分析と複数アグリゲート更新 | 横断的な分析が必要 |

#### サービス協調パターン

| サービス名 | 協調パターン | 実行順序 | 失敗時処理 | 一貫性レベル |
|---|---|---|---|---|
| QuizApprovalService | Orchestration | 権限確認→状態更新→ログ記録 | 全体ロールバック | Strong |
| SessionValidationService | Orchestration | ユーザー確認→クイズ確認→重複チェック | 早期失敗 | Strong |
| StatisticsCalculationService | Choreography | セッション完了イベント→統計更新 | 再試行3回 | Eventual |
| RecommendationService | Choreography | 統計更新イベント→推奨再計算 | バックグラウンド実行 | Eventual |
| FraudDetectionService | Orchestration | パターン分析→フラグ設定→通知 | 部分失敗許容 | Eventual |

### 3. サービス間依存関係設計

#### サービス依存マップ

| サービスA | サービスB | 依存関係 | 依存理由 | 疎結合化方針 |
|---|---|---|---|---|
| QuizApprovalService | StatisticsCalculationService | 承認完了→統計更新 | 承認済みクイズの統計への反映 | ドメインイベント経由 |
| SessionValidationService | FraudDetectionService | セッション開始→不正チェック | 不正ユーザーのセッション防止 | 非同期バックグラウンド |
| StatisticsCalculationService | RecommendationService | 統計更新→推奨更新 | 最新統計に基づく推奨計算 | イベント駆動 |
| FraudDetectionService | SessionValidationService | 不正検出→以降セッション拒否 | 不正ユーザーの活動制限 | ユーザー状態フラグ |

#### 循環依存チェック

| 依存チェーン | 循環有無 | 問題点 | 解決策 | 実装方針 |
|---|---|---|---|---|
| QuizApproval→Statistics→Recommendation | No | - | - | 一方向依存で問題なし |
| SessionValidation→FraudDetection→SessionValidation | Yes | 相互参照による複雑化 | 共通の ValidationContext 作成 | 共有Value Object使用 |
| Statistics→Recommendation→Statistics | Yes | 推奨計算結果の統計への反映 | 別ドメインイベントで分離 | 異なるイベントタイミングで実行 |

### 4. サービス境界設計

#### 責任分離設計

| サービス名 | コア責任 | 除外する責任 | 境界理由 | インターフェース設計 |
|---|---|---|---|---|
| QuizApprovalService | 承認可否の判定と実行 | UI表示・メール送信・ログ出力 | ドメインロジックのみ | approve(Quiz, Admin): ApprovalResult |
| SessionValidationService | セッション開始可否の判定 | セッション作成・UI表示 | 検証ロジックのみ | canStartSession(User, Quiz): ValidationResult |
| StatisticsCalculationService | 統計値の計算と更新 | 表示フォーマット・レポート生成 | 計算ロジックのみ | updateStatistics(QuizSession): void |
| RecommendationService | 推奨アルゴリズムの実行 | 推奨表示・フィルタリング | アルゴリズムのみ | getRecommendations(User): List<Quiz> |
| FraudDetectionService | 不正パターンの検出 | 通知・処罰・ログ | 検出ロジックのみ | detectFraud(QuizSession): FraudResult |

#### 外部依存管理

| サービス名 | 外部依存 | 依存理由 | 抽象化方法 | テスト戦略 |
|---|---|---|---|---|
| QuizApprovalService | メール送信サービス | 承認通知の送信 | NotificationPort interface | Mock NotificationService |
| StatisticsCalculationService | 時系列DB | 統計データの永続化 | StatisticsRepository | In-memory repository |
| RecommendationService | 機械学習API | 推奨アルゴリズムの実行 | MLServicePort interface | Mock ML responses |
| FraudDetectionService | 異常検知API | パターン分析の実行 | FraudAnalysisPort | Stub analysis results |

### 5. サービス実装方針

#### 状態管理方針

| サービス名 | ステートレス度 | 状態保持理由 | 状態管理方法 | スレッドセーフ対応 |
|---|---|---|---|---|
| QuizApprovalService | 完全ステートレス | - | - | 不要 |
| SessionValidationService | 完全ステートレス | - | - | 不要 |
| StatisticsCalculationService | 部分ステートフル | キャッシュによる性能改善 | ConcurrentHashMap | ConcurrentHashMap使用 |
| RecommendationService | 部分ステートフル | 計算済み推奨結果のキャッシュ | Redis分散キャッシュ | Redis並行制御 |
| FraudDetectionService | 部分ステートフル | 検出パターンの学習結果 | 永続化＋メモリキャッシュ | ReadWriteLock使用 |

#### パフォーマンス考慮

| サービス名 | 性能要件 | ボトルネック要因 | 最適化戦略 | 監視項目 |
|---|---|---|---|---|
| QuizApprovalService | 1秒以内 | 権限確認のDB照会 | 権限情報キャッシュ | 応答時間・成功率 |
| SessionValidationService | 200ms以内 | 重複チェックの複雑クエリ | インデックス最適化 | 応答時間・DB負荷 |
| StatisticsCalculationService | 5秒以内 | 大量データの集計処理 | バッチ処理・分散実行 | 処理時間・メモリ使用量 |
| RecommendationService | 2秒以内 | 機械学習アルゴリズム実行 | 非同期計算・結果キャッシュ | API応答時間・キャッシュヒット率 |
| FraudDetectionService | 500ms以内 | パターンマッチング処理 | 並列処理・パターンキャッシュ | 検出時間・精度 |

---

## フォーマットの特徴

### 利点

- **明確な責任分離**：アグリゲート境界を越える処理の適切な配置
- **疎結合設計**：アグリゲート間の依存を最小化
- **テスタビリティ**：外部依存の抽象化によるテスト容易性
- **保守性向上**：ビジネスロジックの一元化と変更影響の局所化
- **拡張性**：新しい協調処理の追加が容易

### 欠点

- **設計複雑度増加**：サービス層の追加による全体複雑化
- **性能オーバーヘッド**：サービス間通信によるレイテンシ
- **過度な抽象化リスク**：不必要なサービス分割による複雑化
- **デバッグ困難**：処理フローがサービス間に分散

### 適用場面

- **複雑なドメインロジック**：複数アグリゲートにまたがる処理が多い
- **マイクロサービス架構**：サービス境界の明確化が重要
- **チーム開発**：責任分界点の明確化が必要
- **長期保守**：ビジネスロジック変更への対応が頻繁
- **テスト重視**：高いテストカバレッジが求められる
