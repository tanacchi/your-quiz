# クイズ承認フロー

## 概要

管理者が投稿されたクイズを審査・承認する一連の流れを示します。効率的な承認キューと詳細な品質チェック、一括操作による管理効率の向上を実現します。

## 参照ドキュメント

- [US-03: クイズ承認UI要件](../1.02_user-stories/us-03_quiz-approval.md)
- [ユーザーフロー分析: US-03](docs/project/ddd-design/2.02.5_user-flow-analysis/user-flow-analysis.md#us-03-クイズ承認管理者)

## メインフロー図

```mermaid
flowchart TD
    Start([管理者ログイン]) --> Auth{認証確認}
    Auth -->|OK| Dashboard[管理ダッシュボード]
    Auth -->|NG| LoginError[認証エラー]
    
    LoginError --> Retry{再認証?}
    Retry -->|Yes| Start
    Retry -->|No| End([終了])
    
    Dashboard --> ApprovalQueue[承認キュー表示]
    ApprovalQueue --> Filter{フィルター操作}
    
    Filter -->|なし| QueueList[承認待ち一覧]
    Filter -->|優先度| PriorityFilter[優先度絞り込み]
    Filter -->|日付| DateFilter[日付絞り込み]
    Filter -->|タグ| TagFilter[タグ絞り込み]
    
    PriorityFilter --> FilteredList[絞り込み結果]
    DateFilter --> FilteredList
    TagFilter --> FilteredList
    FilteredList --> QueueList
    
    QueueList --> SelectAction{操作選択}
    SelectAction -->|個別確認| Individual[個別クイズ確認]
    SelectAction -->|一括選択| Batch[一括操作選択]
    SelectAction -->|統計確認| Stats[統計画面]
    
    Individual --> Preview[クイズプレビュー]
    Preview --> Quality[品質チェック結果]
    Quality --> Similar[類似問題確認]
    Similar --> Decision{承認判定}
    
    Decision -->|承認| Approve[承認処理]
    Decision -->|拒否| Reject[拒否処理]
    Decision -->|保留| Pending[保留処理]
    Decision -->|戻る| QueueList
    
    Approve --> ApproveReason[承認理由記録]
    Reject --> RejectReason[拒否理由記録]
    Pending --> PendingReason[保留理由記録]
    
    ApproveReason --> ProcessApproval[承認処理実行]
    RejectReason --> ProcessRejection[拒否処理実行]
    PendingReason --> ProcessPending[保留処理実行]
    
    ProcessApproval --> Success[処理完了]
    ProcessRejection --> Success
    ProcessPending --> Success
    
    Success --> NextItem{次のアイテム}
    NextItem -->|継続| QueueList
    NextItem -->|完了| Dashboard
    
    Batch --> BatchSelect[複数選択]
    BatchSelect --> BatchAction{一括操作}
    BatchAction -->|一括承認| BatchApprove[一括承認確認]
    BatchAction -->|一括拒否| BatchReject[一括拒否確認]
    BatchAction -->|キャンセル| QueueList
    
    BatchApprove --> BatchApproveExec[一括承認実行]
    BatchReject --> BatchRejectExec[一括拒否実行]
    
    BatchApproveExec --> BatchResult[処理結果表示]
    BatchRejectExec --> BatchResult
    BatchResult --> QueueList
    
    Stats --> StatsView[統計データ表示]
    StatsView --> Dashboard
```

## 詳細フロー

### 1. 認証・初期化フェーズ

```mermaid
flowchart TD
    subgraph "Authentication Phase"
        A[管理画面アクセス] --> B{セッション確認}
        B -->|有効| C[ダッシュボード表示]
        B -->|無効/期限切れ| D[ログイン画面]
        
        D --> E[認証情報入力]
        E --> F{認証処理}
        F -->|成功| G[権限確認]
        F -->|失敗| H[認証エラー表示]
        
        G --> I{管理者権限?}
        I -->|Yes| J[管理機能有効化]
        I -->|No| K[権限不足エラー]
        
        H --> L[再試行促進]
        K --> M[アクセス拒否]
        
        L --> E
        M --> N[エラーログ記録]
        
        J --> O[セッション開始]
        O --> P[管理者活動ログ開始]
    end
    
    subgraph "Dashboard Initialization"
        C --> Q[承認統計取得]
        P --> Q
        
        Q --> R[キュー件数確認]
        R --> S[処理統計計算]
        S --> T[緊急案件確認]
        
        T --> U{緊急案件あり?}
        U -->|Yes| V[緊急通知表示]
        U -->|No| W[通常ダッシュボード]
        
        V --> X[緊急案件優先表示]
        W --> Y[標準統計表示]
        
        X --> Z[ダッシュボード完成]
        Y --> Z
    end
```

### 2. キュー管理・フィルタリングフェーズ

```mermaid
flowchart TD
    subgraph "Queue Management"
        A[承認キューアクセス] --> B[キューデータ取得]
        B --> C[優先度計算]
        C --> D[並び順決定]
        
        D --> E{フィルター設定}
        E -->|優先度| F[高/中/低優先度選択]
        E -->|投稿日時| G[期間範囲選択]
        E -->|タグ| H[公認/ユーザタグ選択]
        E -->|作成者| I[新規/リピート選択]
        E -->|品質| J[スコア範囲選択]
        
        F --> K[優先度フィルター適用]
        G --> L[日時フィルター適用]
        H --> M[タグフィルター適用]
        I --> N[作成者フィルター適用]
        J --> O[品質フィルター適用]
        
        K --> P[フィルター結果統合]
        L --> P
        M --> P
        N --> P
        O --> P
        
        P --> Q[ページネーション適用]
        Q --> R[表示リスト生成]
    end
    
    subgraph "List Display"
        R --> S[キューアイテム表示]
        S --> T[メタデータ表示]
        T --> U[アクション表示]
        
        U --> V{管理者操作}
        V -->|ソート変更| W[並び順変更] --> S
        V -->|検索| X[検索実行] --> Y[検索結果] --> S
        V -->|アイテム選択| Z[個別処理開始]
        V -->|複数選択| AA[一括処理開始]
        V -->|統計確認| BB[統計画面遷移]
    end
```

### 3. 個別審査・品質チェックフェーズ

```mermaid
flowchart TD
    subgraph "Individual Review"
        A[クイズ選択] --> B[詳細データ取得]
        B --> C[プレビュー画面構築]
        C --> D[Play形式表示]
        
        D --> E[品質分析実行]
        E --> F[文法チェック]
        F --> G[事実確認チェック]
        G --> H[類似問題検索]
        
        H --> I{類似問題あり?}
        I -->|Yes| J[類似度計算]
        I -->|No| K[独自性確認]
        
        J --> L[重複判定]
        L --> M{重複レベル}
        M -->|高| N[重複警告表示]
        M -->|中| O[類似注意表示]
        M -->|低| K
        
        K --> P[品質スコア算出]
        N --> Q[重複対応提案]
        O --> P
        
        P --> R[総合評価表示]
        Q --> S[重複処理選択]
        
        S --> T{重複対応}
        T -->|統合| U[統合承認処理]
        T -->|個別| V[個別承認判定]
        T -->|拒否| W[重複拒否処理]
    end
    
    subgraph "Quality Assessment"
        R --> X[評価項目表示]
        X --> Y[✅文法: 85点]
        Y --> Z[✅事実: 92点]
        Z --> AA[⚠️独自性: 65点]
        AA --> BB[📊総合: 80点]
        
        BB --> CC{品質基準}
        CC -->|80点以上| DD[高品質判定]
        CC -->|60-79点| EE[標準品質判定]
        CC -->|60点未満| FF[低品質判定]
        
        DD --> GG[即座承認推奨]
        EE --> HH[詳細確認推奨]
        FF --> II[改善要求推奨]
    end
```

### 4. 承認判定・処理実行フェーズ

```mermaid
flowchart TD
    subgraph "Decision Making"
        A[品質評価確認] --> B{管理者判断}
        B -->|承認| C[承認判定選択]
        B -->|拒否| D[拒否判定選択]
        B -->|保留| E[保留判定選択]
        B -->|詳細確認| F[追加調査]
        
        C --> G[承認理由入力]
        D --> H[拒否理由選択]
        E --> I[保留理由入力]
        F --> J[調査項目確認] --> A
        
        G --> K{理由必須確認}
        H --> L{理由必須確認}
        I --> M{理由必須確認}
        
        K -->|入力済み| N[承認処理確認]
        K -->|未入力| O[理由入力促進] --> G
        
        L -->|選択済み| P[拒否処理確認]
        L -->|未選択| Q[理由選択促進] --> H
        
        M -->|入力済み| R[保留処理確認]
        M -->|未入力| S[理由入力促進] --> I
    end
    
    subgraph "Processing Execution"
        N --> T[承認処理実行]
        P --> U[拒否処理実行]
        R --> V[保留処理実行]
        
        T --> W[クイズ状態更新: 承認済み]
        U --> X[クイズ状態更新: 拒否]
        V --> Y[クイズ状態更新: 保留]
        
        W --> Z[承認日時記録]
        X --> AA[拒否日時記録]
        Y --> BB[保留日時記録]
        
        Z --> CC[承認者ID記録]
        AA --> DD[拒否者ID記録]
        BB --> EE[保留者ID記録]
        
        CC --> FF[承認理由記録]
        DD --> GG[拒否理由記録]
        EE --> HH[保留理由記録]
        
        FF --> II[統計データ更新]
        GG --> II
        HH --> II
        
        II --> JJ[処理完了通知]
        JJ --> KK[次アイテム提案]
    end
```

### 5. 一括操作・効率化フェーズ

```mermaid
flowchart TD
    subgraph "Batch Operations"
        A[一括操作開始] --> B[選択モード有効化]
        B --> C[アイテム選択]
        C --> D{選択方法}
        
        D -->|個別選択| E[チェックボックス選択]
        D -->|条件選択| F[条件指定選択]
        D -->|全選択| G[ページ全選択]
        
        E --> H[選択カウント表示]
        F --> I[条件マッチング] --> H
        G --> J[全件選択確認] --> H
        
        H --> K{一括操作選択}
        K -->|一括承認| L[一括承認確認]
        K -->|一括拒否| M[一括拒否確認]
        K -->|一括保留| N[一括保留確認]
        K -->|選択解除| O[選択クリア] --> C
        
        L --> P[承認理由一括入力]
        M --> Q[拒否理由一括選択]
        N --> R[保留理由一括入力]
        
        P --> S[一括承認実行確認]
        Q --> T[一括拒否実行確認]
        R --> U[一括保留実行確認]
    end
    
    subgraph "Batch Execution"
        S --> V[一括承認処理開始]
        T --> W[一括拒否処理開始]
        U --> X[一括保留処理開始]
        
        V --> Y[プログレス表示開始]
        W --> Y
        X --> Y
        
        Y --> Z[個別処理実行]
        Z --> AA{処理結果}
        AA -->|成功| BB[成功カウント更新]
        AA -->|失敗| CC[失敗リスト追加]
        
        BB --> DD{残り処理あり?}
        CC --> EE[エラー詳細記録] --> DD
        
        DD -->|Yes| Z
        DD -->|No| FF[処理完了]
        
        FF --> GG[結果サマリー作成]
        GG --> HH[成功: X件, 失敗: Y件]
        HH --> II{失敗あり?}
        
        II -->|Yes| JJ[失敗詳細表示]
        II -->|No| KK[完了通知のみ]
        
        JJ --> LL[再処理提案]
        KK --> MM[処理完了]
        LL --> MM
    end
```

## エラーハンドリング

### システムエラー処理

```mermaid
flowchart TD
    A[システムエラー検出] --> B{エラー種別}
    
    B -->|データベースエラー| C[DB接続確認]
    B -->|ネットワークエラー| D[接続状態確認]
    B -->|権限エラー| E[セッション確認]
    B -->|処理タイムアウト| F[処理負荷確認]
    
    C --> G{接続復旧?}
    G -->|Yes| H[処理再試行]
    G -->|No| I[DB障害報告]
    
    D --> J{接続復旧?}
    J -->|Yes| K[通信再試行]
    J -->|No| L[ネットワーク障害報告]
    
    E --> M{セッション有効?}
    M -->|Yes| N[権限再確認]
    M -->|No| O[再認証要求]
    
    F --> P[処理軽量化]
    P --> Q[負荷分散実行]
    
    H --> R{再試行成功?}
    R -->|Yes| S[正常処理継続]
    R -->|No| T[手動処理提案]
    
    I --> U[緊急連絡・保守要求]
    L --> V[ネットワーク管理者連絡]
    O --> W[ログイン画面遷移]
    Q --> S
    
    T --> X[処理状態保存]
    U --> Y[サービス一時停止検討]
    V --> Z[代替手段案内]
    W --> AA[認証後処理再開]
```

## 状態管理

### 承認管理状態

```javascript
interface ApprovalManagementState {
  // キュー管理
  queue: {
    items: PendingQuiz[];
    filters: ApprovalFilters;
    pagination: PaginationState;
    sortOrder: SortOption;
  };
  
  // 選択管理
  selection: {
    selectedIds: string[];
    selectAll: boolean;
    batchOperation: 'approve' | 'reject' | 'pending' | null;
  };
  
  // 処理状態
  processing: {
    currentItem: PendingQuiz | null;
    batchProgress: BatchProgress | null;
    isSubmitting: boolean;
  };
  
  // 統計情報
  statistics: {
    totalPending: number;
    todayProcessed: number;
    approvalRate: number;
    avgProcessingTime: number;
  };
}
```

### 品質評価データ

```javascript
interface QualityAssessment {
  grammarScore: number;      // 文法スコア (0-100)
  factualScore: number;      // 事実確認スコア (0-100)
  originalityScore: number;  // 独自性スコア (0-100)
  overallScore: number;      // 総合スコア (0-100)
  
  similarQuizzes: SimilarQuiz[];
  recommendations: string[];
  warnings: string[];
}
```

## パフォーマンス要件

### レスポンス時間

- **キュー表示**: ≤ 1000ms
- **個別プレビュー**: ≤ 500ms
- **品質分析**: ≤ 2000ms
- **承認処理**: ≤ 1000ms
- **一括処理**: ≤ 100ms/件

### スケーラビリティ

- **同時管理者**: 最大10名
- **キュー容量**: 最大1000件表示対応
- **一括処理**: 最大50件同時処理
- **統計計算**: リアルタイム更新対応

## セキュリティ要件

### アクセス制御

- **多要素認証**: パスワード + SMS/メール認証
- **セッション管理**: 2時間自動タイムアウト
- **IP制限**: 許可IPからのアクセスのみ
- **操作ログ**: 全承認・拒否操作の詳細記録

### データ保護

- **暗号化通信**: TLS 1.3以上での通信
- **データ暗号化**: データベース格納時の暗号化
- **バックアップ**: 承認ログの定期バックアップ
- **監査証跡**: 操作履歴の改ざん防止

## 関連ドキュメント

- [クイズ作成フロー](quiz-creation-flow.md)
- [管理者ダッシュボード](../3.01_wireframes/admin-dashboard-page.md)
- [承認キュー画面](../3.01_wireframes/admin-approval-queue-page.md)

---
**作成工程**: UI設計  
**作成日**: 2025-01-31  
**更新日**: 2025-01-31