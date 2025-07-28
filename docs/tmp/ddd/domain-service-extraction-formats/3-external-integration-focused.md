# ドメインサービス抽出フォーマット案3：外部統合中心型

## フォーマットの概要

DDD 2024年のマイクロサービス・クラウドネイティブトレンドに基づき、外部システムとの統合を中心としたドメインサービス抽出フォーマット。外部API・第三者サービス・レガシーシステムとの統合処理の特定と適切な抽象化に重点を置く。

## 記載項目テンプレート

### 1. 外部システム依存性分析

#### 外部システム一覧

| システム名 | 統合種別 | 依存レベル | 信頼性 | 変更頻度 | サービス候補度 |
|---|---|---|---|---|---|
| [System名] | [API/DB/File/Message] | [High/Medium/Low] | [High/Medium/Low] | [High/Medium/Low] | [High/Medium/Low] |

#### 統合パターン分析

| 統合名 | パターン種別 | 同期/非同期 | 障害対応 | データ変換 | 複雑度 |
|---|---|---|---|---|---|
| [Integration名] | [REST/GraphQL/Message/Batch] | [同期/非同期] | [Retry/Circuit Breaker] | [必要/不要] | [High/Medium/Low] |

### 2. 外部統合サービス設計

#### Anti-Corruption Layer設計

| サービス名 | 保護対象ドメイン | 外部システム | 変換処理 | 隔離理由 |
|---|---|---|---|---|
| [Service名] | [Domain名] | [外部System] | [データ変換内容] | [隔離する理由] |

#### アダプターパターン適用

| アダプター名 | 外部インターフェース | 内部インターフェース | 変換ロジック | テスト戦略 |
|---|---|---|---|---|
| [Adapter名] | [外部IF] | [内部IF] | [変換処理] | [テスト方針] |

### 3. 信頼性・可用性設計

#### 障害処理戦略

| サービス名 | 障害種別 | 検出方法 | 対応策 | 復旧手順 |
|---|---|---|---|---|
| [Service名] | [障害タイプ] | [検出手段] | [即座対応] | [復旧プロセス] |

#### サーキットブレーカー設計

| 対象統合 | 失敗閾値 | タイムアウト | 半開状態条件 | 監視指標 |
|---|---|---|---|---|
| [Integration名] | [回数/率] | [秒数] | [回復条件] | [監視項目] |

### 4. セキュリティ・認証設計

#### 認証・認可方式

| 外部システム | 認証方式 | 認可方式 | 秘密情報管理 | ローテーション |
|---|---|---|---|---|
| [System名] | [OAuth/JWT/API Key] | [RBAC/ABAC] | [管理方法] | [更新頻度] |

#### データ暗号化

| データ種別 | 暗号化場所 | 暗号化方式 | 鍵管理 | 監査要件 |
|---|---|---|---|---|
| [Data種別] | [Transit/Rest] | [暗号化手法] | [鍵管理方式] | [監査内容] |

### 5. 運用・監視設計

#### SLA管理

| 外部システム | 可用性SLA | レスポンスSLA | 対応SLA | エスカレーション |
|---|---|---|---|---|
| [System名] | [%] | [ms] | [時間] | [エスカレ手順] |

#### 監視・アラート

| 監視対象 | 監視項目 | 閾値 | アラート通知 | 対応手順 |
|---|---|---|---|---|
| [Monitor対象] | [指標] | [閾値] | [通知先] | [対応プロセス] |

---

## サンプル実装：クイズアプリケーション

### 1. 外部システム依存性分析

#### 外部システム一覧

| システム名 | 統合種別 | 依存レベル | 信頼性 | 変更頻度 | サービス候補度 |
|---|---|---|---|---|---|
| 認証プロバイダー(OAuth) | REST API | High | High | Low | High |
| メール送信サービス | REST API | Medium | Medium | Low | High |
| ファイルストレージ(S3) | REST API | Medium | High | Low | Medium |
| 機械学習API | REST API | Low | Medium | High | High |
| 支払いゲートウェイ | REST API | Low | High | Medium | High |
| 統計分析DB | Database | Medium | High | Low | Medium |
| 通知サービス(Push) | Message Queue | Low | Medium | Medium | Medium |

#### 統合パターン分析

| 統合名 | パターン種別 | 同期/非同期 | 障害対応 | データ変換 | 複雑度 |
|---|---|---|---|---|---|
| OAuth認証統合 | REST API | 同期 | Circuit Breaker + Retry | JWT→User変換 | Medium |
| メール送信統合 | REST API | 非同期 | Queue + DLQ | Template適用 | Low |
| ファイル管理統合 | REST API | 同期 | Retry + Fallback | URL変換 | Low |
| ML推論統合 | REST API | 同期 | Timeout + Cache | JSON変換 | High |
| 決済処理統合 | REST API | 同期 | Idempotency + Saga | 通貨・税計算 | High |
| 分析データ同期 | Batch ETL | 非同期 | Error Log + Manual | 集計変換 | Medium |
| Push通知統合 | Message Queue | 非同期 | DLQ + Retry | デバイス別変換 | Medium |

### 2. 外部統合サービス設計

#### Anti-Corruption Layer設計

| サービス名 | 保護対象ドメイン | 外部システム | 変換処理 | 隔離理由 |
|---|---|---|---|---|
| AuthenticationService | User Domain | OAuth Provider | OAuth Token → User Entity | プロバイダー変更への対応 |
| NotificationService | Communication Domain | Multiple Providers | 統一通知IF → Provider固有形式 | 通知方式の抽象化 |
| FileStorageService | Content Domain | Cloud Storage | Domain File → Storage Object | ストレージ仕様の隠蔽 |
| PaymentService | Billing Domain | Payment Gateway | Domain Payment → Gateway Request | 決済仕様の抽象化 |
| AnalyticsIntegrationService | Statistics Domain | Analytics Platform | Domain Events → Analytics Schema | 分析ツール依存の排除 |

#### アダプターパターン適用

| アダプター名 | 外部インターフェース | 内部インターフェース | 変換ロジック | テスト戦略 |
|---|---|---|---|---|
| OAuthAdapter | OAuth 2.0 API | UserAuthenticationPort | Token検証 + User情報抽出 | Mock OAuth Server |
| EmailAdapter | SMTP/SendGrid API | NotificationPort | Template適用 + HTML生成 | Fake SMTP Server |
| S3Adapter | AWS S3 API | FileStoragePort | Presigned URL生成 | LocalStack使用 |
| MLAdapter | ML Platform API | RecommendationPort | Feature Engineering + 結果解釈 | Mock ML Responses |
| PaymentAdapter | Stripe API | PaymentPort | 通貨換算 + 手数料計算 | Stripe Test Mode |

### 3. 信頼性・可用性設計

#### 障害処理戦略

| サービス名 | 障害種別 | 検出方法 | 対応策 | 復旧手順 |
|---|---|---|---|---|
| AuthenticationService | 認証サーバー障害 | Timeout/5xx Error | キャッシュされたSession継続 | Health Check復旧確認 |
| NotificationService | メール送信失敗 | API Error Response | Queue再試行 (3回) | Dead Letter処理 |
| FileStorageService | ストレージ障害 | Connection Error | 一時的ローカル保存 | 手動同期バッチ実行 |
| PaymentService | 決済API障害 | Payment Failed | Transaction保留状態 | 手動決済確認・処理 |
| AnalyticsIntegrationService | 分析API障害 | Data Upload Failed | ローカルバッファ蓄積 | バッチ再送処理 |

#### サーキットブレーカー設計

| 対象統合 | 失敗閾値 | タイムアウト | 半開状態条件 | 監視指標 |
|---|---|---|---|---|
| OAuth API | 5回/分 | 30秒 | 1分後に1回テスト | 成功率、レスポンス時間 |
| ML推論API | 10回/分 | 5秒 | 30秒後に1回テスト | エラー率、推論精度 |
| 決済API | 3回/分 | 60秒 | 2分後に1回テスト | 決済成功率、応答時間 |
| 分析API | 20回/時 | 120秒 | 10分後に1回テスト | データ送信成功率 |

### 4. セキュリティ・認証設計

#### 認証・認可方式

| 外部システム | 認証方式 | 認可方式 | 秘密情報管理 | ローテーション |
|---|---|---|---|---|
| OAuth Provider | OAuth 2.0 | OIDC Scopes | Vault + 環境変数 | 6ヶ月 |
| Email Service | API Key | Account Level | Encrypted Config | 3ヶ月 |
| File Storage | IAM Role | Resource Policy | AWS IAM | 自動ローテーション |
| ML Platform | JWT Token | API Level | Kubernetes Secret | 1ヶ月 |
| Payment Gateway | API Key + Webhook Secret | Merchant Level | Hardware Security Module | 1年 |

#### データ暗号化

| データ種別 | 暗号化場所 | 暗号化方式 | 鍵管理 | 監査要件 |
|---|---|---|---|---|
| 認証Token | Transit + Rest | TLS 1.3 + AES-256 | Vault KV | Access Log |
| 個人情報 | Rest | AES-256-GCM | Customer Managed Key | 全操作Log |
| 決済情報 | Transit | TLS 1.3 | PCI DSS準拠 | リアルタイム監査 |
| ファイルデータ | Rest | S3 Server-Side Encryption | AWS KMS | アクセス履歴 |

### 5. 運用・監視設計

#### SLA管理

| 外部システム | 可用性SLA | レスポンスSLA | 対応SLA | エスカレーション |
|---|---|---|---|---|
| OAuth Provider | 99.9% | 500ms | 1時間 | プロバイダー緊急連絡 |
| Email Service | 99.5% | 2秒 | 2時間 | 代替サービス切替 |
| File Storage | 99.99% | 100ms | 30分 | CDN切替 |
| ML Platform | 99.0% | 1秒 | 4時間 | キャッシュ結果使用 |
| Payment Gateway | 99.95% | 3秒 | 15分 | 代替決済手段案内 |

#### 監視・アラート

| 監視対象 | 監視項目 | 閾値 | アラート通知 | 対応手順 |
|---|---|---|---|---|
| API Response Time | 95th percentile | SLA × 150% | Slack + PagerDuty | 性能調査開始 |
| API Error Rate | エラー率 | 5% | Slack即時通知 | エラー内容確認 |
| Authentication Success | 認証成功率 | 95% | 緊急アラート | 認証フロー確認 |
| Circuit Breaker Status | Open状態 | 1分継続 | 運用チーム通知 | 手動復旧検討 |
| Data Sync Lag | データ同期遅延 | 1時間 | バッチ処理チーム | 同期処理再実行 |

---

## フォーマットの特徴

### 利点

- **外部依存の可視化**：外部システムとの結合度を明確化
- **障害耐性向上**：外部システム障害への適切な対応策
- **セキュリティ強化**：外部統合のセキュリティリスク管理
- **保守性向上**：外部システム変更への影響局所化
- **テスタビリティ**：外部依存のMock/Stub化による独立テスト

### 欠点

- **複雑性増加**：統合層の追加による全体アーキテクチャ複雑化
- **性能オーバーヘッド**：変換処理とラッピングによるレイテンシ
- **開発コスト増**：統合サービス開発・保守の追加工数
- **運用複雑化**：複数外部システムの監視・管理負荷

### 適用場面

- **マイクロサービス環境**：多数の外部サービスとの統合が必要
- **レガシー統合**：既存システムとの統合が避けられない
- **クラウドネイティブ**：クラウドサービスを活用した開発
- **SaaS統合**：第三者SaaSとの密接な連携が必要
- **API経済参加**：外部APIを活用したビジネス展開
- **セキュリティ重視**：外部統合のセキュリティ管理が重要
