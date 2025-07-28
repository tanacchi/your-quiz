# エンティティ間関連性分析フォーマット案4：永続化パターン型

## フォーマットの概要

DDD 2024年のベストプラクティスに基づき、永続化戦略とデータベース設計を中心としたエンティティ間関連性分析フォーマット。ORM統合、パフォーマンス最適化、データ整合性を重視した実装指向のアプローチ。

## 記載項目テンプレート

### 1. 永続化戦略分析

#### アグリゲート永続化設計

| アグリゲート名 | 永続化単位 | ストレージ戦略 | 分散配置 | バックアップ戦略 |
|---|---|---|---|---|
| [Aggregate名] | [単一/分割] | [RDB/NoSQL/混合] | [分散方法] | [バックアップ方針] |

#### エンティティマッピング戦略

| エンティティ名 | テーブル設計 | ORM戦略 | ID生成戦略 | 楽観ロック |
|---|---|---|---|---|
| [Entity名] | [Single/Table-per-class/Joined] | [Hibernate/JPA etc] | [UUID/Sequence/Identity] | [Version/Timestamp] |

### 2. 関連性永続化パターン

#### 1対多関連の永続化

| 親エンティティ | 子エンティティ | 関連タイプ | Fetch戦略 | カスケード操作 |
|---|---|---|---|---|
| [Parent] | [Child] | [OneToMany/Set/List] | [Lazy/Eager] | [Persist/Remove/Merge] |

#### 多対多関連の永続化

| エンティティA | エンティティB | 結合テーブル | 中間エンティティ | 削除戦略 |
|---|---|---|---|---|
| [EntityA] | [EntityB] | [結合テーブル名] | [必要/不要] | [Cascade/Manual] |

#### アグリゲート間参照

| 参照元アグリゲート | 参照先アグリゲート | 参照方法 | 整合性保証 | 参照更新戦略 |
|---|---|---|---|---|
| [Source] | [Target] | [ID参照/Repository] | [結果整合性/強整合性] | [同期/非同期] |

### 3. パフォーマンス最適化設計

#### クエリ最適化戦略

| 操作種別 | 対象エンティティ | クエリ戦略 | インデックス設計 | キャッシュ戦略 |
|---|---|---|---|---|
| [Read/Write/Delete] | [Entity名] | [N+1解決方法] | [インデックス設計] | [L1/L2/分散キャッシュ] |

#### バッチ処理最適化

| バッチ処理名 | 対象データ | 処理戦略 | メモリ管理 | エラー処理 |
|---|---|---|---|---|
| [Batch名] | [処理対象] | [Bulk/Streaming] | [分割処理/メモリ制限] | [部分失敗処理] |

### 4. データ整合性設計

#### トランザクション境界設計

| 業務操作 | トランザクション範囲 | 分離レベル | デッドロック対策 | タイムアウト |
|---|---|---|---|---|
| [Operation名] | [スコープ] | [READ_COMMITTED etc] | [ロック順序等] | [秒数] |

#### 制約実装戦略

| 制約名 | 実装レベル | 制約定義 | 違反検出 | パフォーマンス影響 |
|---|---|---|---|---|
| [Constraint名] | [DB/Application/Domain] | [制約内容] | [検出方法] | [影響度] |

### 5. 移行・運用設計

#### スキーマ進化戦略

| 変更種別 | 対応パターン | 移行戦略 | ダウンタイム | ロールバック戦略 |
|---|---|---|---|---|
| [追加/変更/削除] | [Forward/Backward Compatible] | [移行手順] | [有/無] | [ロールバック手順] |

#### 監視・保守設計

| 監視対象 | 監視指標 | 閾値設定 | アラート対応 | メンテナンス周期 |
|---|---|---|---|---|
| [Monitor対象] | [指標名] | [閾値] | [対応手順] | [頻度] |

---

## サンプル実装：クイズアプリケーション

### 1. 永続化戦略分析

#### アグリゲート永続化設計

| アグリゲート名 | 永続化単位 | ストレージ戦略 | 分散配置 | バックアップ戦略 |
|---|---|---|---|---|
| Quiz | 単一テーブル群 | PostgreSQL | 読み書き分離 | 日次フルバックアップ + WAL |
| User | 単一テーブル | PostgreSQL | ユーザーID範囲分割 | 日次差分バックアップ |
| QuizSession | セッション単位 | PostgreSQL + Redis | セッションID分散 | Redis永続化 + PG同期 |
| Administration | 単一テーブル | PostgreSQL | マスター単一 | 日次フルバックアップ |

#### エンティティマッピング戦略

| エンティティ名 | テーブル設計 | ORM戦略 | ID生成戦略 | 楽観ロック |
|---|---|---|---|---|
| Quiz | Single Table | JPA/Hibernate | UUID | Version (Long) |
| Question | Table per class | JPA/Hibernate | UUID | Parent Version |
| Choice | Joined Table | JPA/Hibernate | UUID | Parent Version |
| QuizSession | Single Table | JPA/Hibernate | UUID | Version (Long) |
| Answer | Single Table | JPA/Hibernate | Sequence | Timestamp |
| User | Single Table | JPA/Hibernate | UUID | Version (Long) |

### 2. 関連性永続化パターン

#### 1対多関連の永続化

| 親エンティティ | 子エンティティ | 関連タイプ | Fetch戦略 | カスケード操作 |
|---|---|---|---|---|
| Quiz | Question | OneToMany(Set) | Lazy | Persist, Remove |
| Question | Choice | OneToMany(Set) | Eager | Persist, Remove |
| QuizSession | Answer | OneToMany(List) | Lazy | Persist, Remove |
| User | QuizSession | OneToMany(Set) | Lazy | Persist |
| Admin | ApprovalLog | OneToMany(List) | Lazy | Persist |

#### 多対多関連の永続化

| エンティティA | エンティティB | 結合テーブル | 中間エンティティ | 削除戦略 |
|---|---|---|---|---|
| User | Quiz(お気に入り) | user_favorite_quiz | 不要 | Manual削除 |
| Quiz | Tag | quiz_tag | QuizTagAssociation | Cascade削除 |

#### アグリゲート間参照

| 参照元アグリゲート | 参照先アグリゲート | 参照方法 | 整合性保証 | 参照更新戦略 |
|---|---|---|---|---|
| QuizSession | Quiz | ID参照 | 結果整合性 | 非同期確認 |
| QuizSession | User | ID参照 | 結果整合性 | 非同期確認 |
| Quiz | User(作成者) | ID参照 | 結果整合性 | イベント駆動更新 |
| Administration | Quiz | Repository経由 | 結果整合性 | 同期確認 |

### 3. パフォーマンス最適化設計

#### クエリ最適化戦略

| 操作種別 | 対象エンティティ | クエリ戦略 | インデックス設計 | キャッシュ戦略 |
|---|---|---|---|---|
| Read | Quiz一覧取得 | JOIN FETCH Questions | (status, created_at), (title) | Redis L2 (30分) |
| Read | ユーザー統計 | 集約クエリ + 分割実行 | (user_id, completed_at) | Redis分散 (60分) |
| Write | 回答提出 | バッチINSERT | (session_id, created_at) | Write-through |
| Read | リーダーボード | マテリアライズドビュー | (score DESC, completed_at) | Redis L2 (15分) |
| Read | クイズ検索 | 全文検索インデックス | GINインデックス (title, description) | なし |

#### バッチ処理最適化

| バッチ処理名 | 対象データ | 処理戦略 | メモリ管理 | エラー処理 |
|---|---|---|---|---|
| 統計情報更新 | 全セッションデータ | Streaming (1000件) | JVM heap制限 | 部分失敗継続 |
| 非アクティブユーザー削除 | 古いユーザーデータ | Bulk DELETE | チャンク分割 | ロールバック可能 |
| セッションデータ圧縮 | 完了セッション | Archive + Compress | 分割処理 | 失敗データスキップ |

### 4. データ整合性設計

#### トランザクション境界設計

| 業務操作 | トランザクション範囲 | 分離レベル | デッドロック対策 | タイムアウト |
|---|---|---|---|---|
| クイズ作成 | Quiz + Questions + Choices | READ_COMMITTED | ID順ロック | 30秒 |
| 回答提出 | Answer + Session状態更新 | READ_COMMITTED | Session ID順 | 10秒 |
| ユーザー登録 | User + Profile作成 | READ_COMMITTED | email一意制約 | 15秒 |
| クイズ承認 | Quiz状態 + Admin履歴 | READ_COMMITTED | Quiz ID順 | 20秒 |

#### 制約実装戦略

| 制約名 | 実装レベル | 制約定義 | 違反検出 | パフォーマンス影響 |
|---|---|---|---|---|
| ユーザーメール一意性 | DB(UNIQUE) | UNIQUE(email) | 挿入時例外 | 低 |
| クイズ最小問題数 | Application | count(questions) >= 1 | 削除前チェック | 低 |
| セッション重複防止 | DB(UNIQUE) | UNIQUE(user_id, quiz_id, DATE(created_at)) | 挿入時例外 | 中 |
| 回答時間制限 | Application | submit_time <= start_time + limit | 提出時検証 | 低 |
| 承認者権限 | Domain | admin.hasPermission(APPROVE) | 承認前検証 | 中 |

### 5. 移行・運用設計

#### スキーマ進化戦略

| 変更種別 | 対応パターン | 移行戦略 | ダウンタイム | ロールバック戦略 |
|---|---|---|---|---|
| カラム追加 | Forward Compatible | ALTER TABLE (DEFAULT値) | なし | DROP COLUMN |
| インデックス追加 | Forward Compatible | CREATE INDEX CONCURRENTLY | なし | DROP INDEX |
| テーブル分割 | Backward Compatible | ビュー + 段階移行 | 短時間メンテ | 統合スクリプト |
| 関連変更 | Breaking Change | アプリ停止 + 一括移行 | あり | フルバックアップ復元 |

#### 監視・保守設計

| 監視対象 | 監視指標 | 閾値設定 | アラート対応 | メンテナンス周期 |
|---|---|---|---|---|
| DB接続数 | active_connections | 80%以上 | 接続プール拡張 | リアルタイム |
| クエリ性能 | slow_query_log | 1秒以上 | インデックス見直し | 日次 |
| キャッシュヒット率 | cache_hit_ratio | 90%未満 | キャッシュ戦略見直し | 週次 |
| ディスク使用量 | disk_usage | 85%以上 | ディスク拡張 | 日次 |
| レプリケーション遅延 | replication_lag | 5秒以上 | レプリケーション確認 | リアルタイム |

---

## フォーマットの特徴

### 利点

- **実装指向**：実際の開発・運用で直面する課題に対応
- **パフォーマンス重視**：性能要件を満たす設計指針
- **運用考慮**：長期運用を見据えた監視・保守戦略
- **技術スタック連携**：ORM・DB・キャッシュの統合設計
- **移行戦略明確**：システム進化時の対応方針が具体的

### 欠点

- **技術依存度高**：特定の技術スタックに依存した設計
- **ドメイン観点薄い**：ビジネスロジックよりも技術実装重視
- **初期設計重い**：詳細な永続化設計に時間が必要
- **変更コスト大**：永続化戦略変更時の影響範囲が大きい

### 適用場面

- **性能要件厳格**：高トラフィック、低レイテンシが必要
- **長期運用予定**：5年以上の継続運用を想定
- **既存システム統合**：既存DBスキーマとの統合が必要
- **大規模データ**：テラバイト級のデータ処理が必要
- **経験豊富チーム**：DB設計・ORM・パフォーマンス調整の経験者が多い
