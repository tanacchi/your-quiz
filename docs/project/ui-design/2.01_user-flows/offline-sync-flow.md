# オフライン同期フロー

## 概要

ネットワーク不安定時でもクイズアプリを継続利用できるオフライン機能と、オンライン復旧時の自動同期処理を示します。PWA + Service Worker + IndexedDBによるシームレスなオフライン体験を提供します。

## 参照ドキュメント

- [US-05: オフライン利用UI要件](../1.02_user-stories/us-05_offline-sync.md)
- [ユーザーフロー分析: US-05](docs/project/ddd-design/2.02.5_user-flow-analysis/user-flow-analysis.md#us-05-オフライン利用匿名ユーザー)

## メインフロー図

```mermaid
flowchart TD
    Start([アプリ起動]) --> NetCheck{ネットワーク状態確認}
    NetCheck -->|オンライン| Online[オンラインモード]
    NetCheck -->|オフライン| Offline[オフラインモード]
    
    Online --> Monitor[接続監視開始]
    Monitor --> NormalUse[通常利用]
    
    NormalUse --> Disconnect{接続断線検出}
    Disconnect -->|接続維持| NormalUse
    Disconnect -->|断線検出| DetectOffline[オフライン検出]
    
    DetectOffline --> OfflineNotify[オフライン通知]
    OfflineNotify --> CacheCheck{キャッシュ確認}
    
    CacheCheck -->|充分| OfflineReady[オフライン準備完了]
    CacheCheck -->|不足| CacheWarning[キャッシュ不足警告]
    
    CacheWarning --> DownloadOffer{追加DL提案}
    DownloadOffer -->|Yes| CacheDownload[キャッシュDL]
    DownloadOffer -->|No| LimitedOffline[制限付きオフライン]
    
    CacheDownload --> OfflineReady
    OfflineReady --> OfflineUse[オフライン利用]
    LimitedOffline --> OfflineUse
    
    Offline --> OfflineInit[オフライン初期化]
    OfflineInit --> CacheLoad[キャッシュデータ読み込み]
    CacheLoad --> OfflineUse
    
    OfflineUse --> OfflineActivity{オフライン活動}
    OfflineActivity -->|クイズ回答| OfflineAnswer[オフライン回答]
    OfflineActivity -->|履歴確認| OfflineHistory[履歴確認]
    OfflineActivity -->|設定変更| OfflineSettings[設定変更]
    
    OfflineAnswer --> LocalSave[ローカル保存]
    OfflineHistory --> LocalRead[ローカル読み込み]
    OfflineSettings --> LocalUpdate[ローカル更新]
    
    LocalSave --> SyncPending[同期待ちマーク]
    LocalRead --> OfflineActivity
    LocalUpdate --> SyncPending
    
    SyncPending --> ConnectionCheck[定期接続確認]
    ConnectionCheck --> Reconnect{接続復旧?}
    
    Reconnect -->|No| ConnectionCheck
    Reconnect -->|Yes| OnlineDetect[オンライン復旧検出]
    
    OnlineDetect --> SyncNotify[同期開始通知]
    SyncNotify --> SyncProcess[同期処理開始]
    
    SyncProcess --> DataCheck{同期データ確認}
    DataCheck -->|同期なし| NormalResume[通常モード復帰]
    DataCheck -->|同期あり| SyncExecution[同期実行]
    
    SyncExecution --> ConflictCheck{競合確認}
    ConflictCheck -->|競合なし| SimpleSync[単純同期]
    ConflictCheck -->|競合あり| ConflictResolve[競合解決]
    
    SimpleSync --> SyncSuccess[同期成功]
    ConflictResolve --> SyncSuccess
    
    SyncSuccess --> SyncComplete[同期完了通知]
    SyncComplete --> NormalResume
    NormalResume --> Monitor
```

## 詳細フロー

### 1. オフライン検出・初期化フェーズ

```mermaid
flowchart TD
    subgraph "Network Detection"
        A[アプリケーション起動] --> B[Service Worker起動]
        B --> C[ネットワーク監視開始]
        C --> D[Navigator.onLine確認]
        
        D --> E{初期状態判定}
        E -->|オンライン| F[オンライン初期化]
        E -->|オフライン| G[オフライン初期化]
        
        F --> H[サーバー接続テスト]
        H --> I{接続テスト結果}
        I -->|成功| J[完全オンライン]
        I -->|失敗| K[制限オンライン]
        
        G --> L[キャッシュ状態確認]
        L --> M{キャッシュ利用可能?}
        M -->|Yes| N[オフライン利用可能]
        M -->|No| O[オフライン利用不可]
    end
    
    subgraph "Connection Monitoring"
        J --> P[定期接続確認開始]
        K --> Q[接続復旧監視]
        N --> R[オフライン監視]
        
        P --> S[5秒間隔チェック]
        Q --> T[10秒間隔チェック]
        R --> U[30秒間隔チェック]
        
        S --> V{接続状態変化?}
        T --> V
        U --> V
        
        V -->|オンライン→オフライン| W[オフライン転換]
        V -->|オフライン→オンライン| X[オンライン復旧]
        V -->|変化なし| Y[監視継続]
        
        W --> Z[オフライン通知]
        X --> AA[復旧通知]
        Y --> BB[次回チェック予約]
    end
```

### 2. キャッシュ管理・ダウンロードフェーズ

```mermaid
flowchart TD
    subgraph "Cache Management"
        A[キャッシュ管理開始] --> B[ストレージ容量確認]
        B --> C{容量状況}
        C -->|充分| D[キャッシュ戦略実行]
        C -->|不足| E[容量確保処理]
        
        E --> F[古いキャッシュ削除]
        F --> G[優先度低データ削除]
        G --> H{容量確保成功?}
        H -->|Yes| D
        H -->|No| I[容量不足警告]
        
        D --> J[キャッシュ対象選択]
        J --> K{キャッシュ対象}
        K -->|クイズデータ| L[クイズキャッシュ]
        K -->|履歴データ| M[履歴キャッシュ]
        K -->|設定データ| N[設定キャッシュ]
        K -->|アセット| O[アセットキャッシュ]
        
        L --> P[圧縮・最適化]
        M --> Q[差分データ作成]
        N --> R[設定スナップショット]
        O --> S[アセット最適化]
    end
    
    subgraph "Download Process"
        P --> T[ダウンロード優先度判定]
        Q --> T
        R --> T
        S --> T
        
        T --> U{ダウンロード方式}
        U -->|事前DL| V[プリダウンロード実行]
        U -->|需要時DL| W[要求時ダウンロード]
        U -->|バックグラウンドDL| X[BGダウンロード]
        
        V --> Y[一括ダウンロード開始]
        W --> Z[個別ダウンロード待機]
        X --> AA[非同期ダウンロード]
        
        Y --> BB[プログレス表示]
        Z --> CC[要求検出時実行]
        AA --> DD[バックグラウンド実行]
        
        BB --> EE{ダウンロード結果}
        CC --> EE
        DD --> EE
        
        EE -->|成功| FF[キャッシュ保存]
        EE -->|失敗| GG[ダウンロード失敗処理]
        
        FF --> HH[キャッシュインデックス更新]
        GG --> II[再試行スケジュール]
    end
```

### 3. オフライン利用・データ管理フェーズ

```mermaid
flowchart TD
    subgraph "Offline Usage"
        A[オフライン機能利用] --> B{利用機能}
        B -->|クイズ回答| C[オフラインクイズ実行]
        B -->|履歴確認| D[ローカル履歴表示]
        B -->|設定変更| E[ローカル設定更新]
        B -->|作成・編集| F[制限機能通知]
        
        C --> G[キャッシュクイズ読み込み]
        G --> H[回答データ記録]
        H --> I[ローカルDB保存]
        
        D --> J[IndexedDB読み込み]
        J --> K[履歴データ表示]
        K --> L[統計計算]
        
        E --> M[設定値変更]
        M --> N[ローカル設定保存]
        N --> O[変更フラグ設定]
        
        F --> P[利用不可機能説明]
        P --> Q[代替手段提案]
    end
    
    subgraph "Data Synchronization Preparation"
        I --> R[同期待ちマーク付与]
        O --> S[変更データマーク]
        
        R --> T[同期キューに追加]
        S --> T
        
        T --> U[同期データ構造化]
        U --> V{データ種別}
        V -->|回答データ| W[回答同期データ作成]
        V -->|設定データ| X[設定同期データ作成]
        V -->|作成データ| Y[作成同期データ作成]
        
        W --> Z[タイムスタンプ付与]
        X --> Z
        Y --> Z
        
        Z --> AA[同期優先度設定]
        AA --> BB[同期準備完了]
        
        BB --> CC[定期接続確認開始]
        CC --> DD{接続状態}
        DD -->|オフライン| CC
        DD -->|オンライン| EE[同期処理開始]
    end
```

### 4. オンライン復旧・同期実行フェーズ

```mermaid
flowchart TD
    subgraph "Online Recovery"
        A[オンライン復旧検出] --> B[接続安定性確認]
        B --> C{接続安定?}
        C -->|安定| D[同期開始準備]
        C -->|不安定| E[安定化待機]
        
        E --> F[接続品質監視]
        F --> G{品質改善?}
        G -->|Yes| D
        G -->|No| H[制限モード継続]
        
        D --> I[同期データ確認]
        I --> J{同期対象あり?}
        J -->|No| K[通常モード復帰]
        J -->|Yes| L[同期処理開始]
        
        L --> M[同期開始通知表示]
        M --> N[プログレスバー表示]
        
        H --> O[不安定接続警告]
        O --> P[手動同期オプション]
    end
    
    subgraph "Synchronization Execution"
        N --> Q[同期キュー処理]
        Q --> R{処理対象選択}
        R -->|高優先度| S[重要データ同期]
        R -->|中優先度| T[通常データ同期]
        R -->|低優先度| U[付加データ同期]
        
        S --> V[サーバー送信]
        T --> V
        U --> V
        
        V --> W{送信結果}
        W -->|成功| X[成功応答処理]
        W -->|失敗| Y[失敗応答処理]
        
        X --> Z[ローカルマーク更新]
        Y --> AA[再送信キューに追加]
        
        Z --> BB[進捗更新]
        AA --> CC[エラーカウント増加]
        
        BB --> DD{残り処理あり?}
        CC --> EE{再試行限界?}
        
        DD -->|Yes| Q
        DD -->|No| FF[同期完了]
        
        EE -->|No| GG[再試行スケジュール]
        EE -->|Yes| HH[同期失敗処理]
        
        GG --> II[遅延後再実行]
        HH --> JJ[手動同期提案]
    end
```

### 5. 競合解決・データ整合性フェーズ

```mermaid
flowchart TD
    subgraph "Conflict Detection"
        A[同期データ受信] --> B[ローカルデータ比較]
        B --> C{データ競合検出}
        C -->|競合なし| D[通常同期処理]
        C -->|競合あり| E[競合種別判定]
        
        E --> F{競合種別}
        F -->|タイムスタンプ競合| G[時間基準解決]
        F -->|内容競合| H[内容比較解決]
        F -->|構造競合| I[構造整合性解決]
        
        G --> J[Last-Write-Wins適用]
        H --> K[マージ可能性判定]
        I --> L[データ構造修復]
        
        J --> M{適用結果}
        M -->|成功| N[競合解決完了]
        M -->|失敗| O[手動解決要求]
        
        K --> P{マージ可能?}
        P -->|Yes| Q[自動マージ実行]
        P -->|No| R[手動選択要求]
        
        L --> S{修復成功?}
        S -->|Yes| N
        S -->|No| T[データ破損報告]
    end
    
    subgraph "Resolution Processing"
        N --> U[解決結果適用]
        O --> V[競合解決UI表示]
        Q --> W[マージ結果確認]
        R --> X[選択UI表示]
        T --> Y[破損データ隔離]
        
        V --> Z{ユーザー選択}
        Z -->|ローカル優先| AA[ローカルデータ採用]
        Z -->|サーバー優先| BB[サーバーデータ採用]
        Z -->|手動マージ| CC[手動マージ実行]
        
        X --> DD{データ選択}
        DD -->|ローカル| AA
        DD -->|サーバー| BB
        DD -->|両方保持| EE[並行データ保持]
        
        W --> FF{マージ確認}
        FF -->|OK| U
        FF -->|NG| GG[マージ再実行]
        
        AA --> HH[ローカル優先適用]
        BB --> II[サーバー優先適用]
        CC --> JJ[手動マージ適用]
        EE --> KK[重複データ管理]
        
        Y --> LL[安全モード移行]
        GG --> MM[マージ処理再試行]
        
        HH --> NN[同期完了]
        II --> NN
        JJ --> NN
        KK --> NN
        LL --> OO[復旧手順案内]
        MM --> PP{再試行結果}
        PP -->|成功| U
        PP -->|失敗| V
    end
```

## エラーハンドリング

### 同期エラー処理

```mermaid
flowchart TD
    A[同期エラー発生] --> B{エラー分類}
    
    B -->|ネットワークエラー| C[接続エラー処理]
    B -->|認証エラー| D[認証エラー処理]
    B -->|データエラー| E[データエラー処理]
    B -->|容量エラー| F[容量エラー処理]
    B -->|タイムアウト| G[タイムアウト処理]
    
    C --> H[接続再試行]
    H --> I{再試行成功?}
    I -->|Yes| J[処理継続]
    I -->|No| K[オフライン復帰]
    
    D --> L[認証情報確認]
    L --> M{認証有効?}
    M -->|Yes| N[権限再確認]
    M -->|No| O[再認証要求]
    
    E --> P[データ整合性チェック]
    P --> Q{修復可能?}
    Q -->|Yes| R[自動修復実行]
    Q -->|No| S[手動修復提案]
    
    F --> T[容量クリーンアップ]
    T --> U{容量確保?}
    U -->|Yes| V[処理再開]
    U -->|No| W[容量不足警告]
    
    G --> X[タイムアウト延長]
    X --> Y[処理分割実行]
    
    K --> Z[オフライン継続通知]
    O --> AA[ログイン画面表示]
    R --> BB{修復成功?}
    BB -->|Yes| J
    BB -->|No| S
    S --> CC[手動修復ガイド]
    V --> J
    W --> DD[削除対象提案]
    Y --> EE{分割処理成功?}
    EE -->|Yes| J
    EE -->|No| FF[処理延期]
```

## 状態管理

### オフライン同期状態

```javascript
interface OfflineSyncState {
  // 接続状態
  networkStatus: 'online' | 'offline' | 'unstable';
  lastOnlineTime: Date | null;
  connectionQuality: 'excellent' | 'good' | 'poor';
  
  // キャッシュ状態
  cacheStatus: {
    totalSize: number;
    usedSize: number;
    quizCount: number;
    lastUpdate: Date;
  };
  
  // 同期状態
  syncStatus: {
    pendingItems: number;
    lastSyncTime: Date | null;
    isSync: boolean;
    syncProgress: number;
    errors: SyncError[];
  };
  
  // オフライン活動
  offlineActivity: {
    answeredQuizzes: number;
    changedSettings: number;
    pendingUploads: number;
  };
}
```

### 同期データ構造

```javascript
interface SyncData {
  id: string;
  type: 'answer' | 'settings' | 'creation';
  data: any;
  timestamp: Date;
  priority: 'high' | 'medium' | 'low';
  retryCount: number;
  status: 'pending' | 'syncing' | 'completed' | 'failed';
}
```

## パフォーマンス要件

### 同期パフォーマンス

- **オフライン検出**: ≤ 500ms
- **オンライン復旧検出**: ≤ 1000ms
- **同期開始**: ≤ 2000ms
- **データ同期**: ≤ 100ms/項目
- **競合解決**: ≤ 5000ms

### ストレージ効率

- **キャッシュ圧縮率**: 最低50%圧縮
- **データ重複**: 重複データの自動削除
- **容量監視**: 80%到達時の自動クリーンアップ
- **ガベージコレクション**: 未使用データの定期削除

## データ整合性保証

### 整合性チェック

- **タイムスタンプ**: すべてのデータにUTC時刻付与
- **チェックサム**: データ完全性検証用ハッシュ
- **バージョン管理**: データ構造バージョン管理
- **競合検出**: Last-Write-Winsによる単純化

### バックアップ戦略

- **自動バックアップ**: 重要データの自動保存
- **復旧ポイント**: 同期前状態の保持
- **ロールバック**: 同期失敗時の状態復元
- **データ検証**: 整合性チェック後の適用

## 関連ドキュメント

- [クイズ回答フロー](quiz-answering-flow.md)
- [オフライン設定画面](../3.01_wireframes/offline-settings-page.md)
- [同期状況画面](../3.01_wireframes/sync-status-page.md)

---
**作成工程**: UI設計  
**作成日**: 2025-01-31  
**更新日**: 2025-01-31