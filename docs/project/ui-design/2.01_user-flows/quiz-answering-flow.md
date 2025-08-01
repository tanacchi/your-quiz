# クイズ回答フロー

## 概要

ユーザーがクイズに回答する一連の流れを示します。Tinder UI形式のスワイプ操作による直感的な回答体験を提供し、正解・不正解の即座フィードバックと解説表示による学習効果を最大化します。

## 参照ドキュメント

- [US-01: クイズ回答UI要件](../1.02_user-stories/us-01_quiz-answering.md)
- [ユーザーフロー分析: US-01](docs/project/ddd-design/2.02.5_user-flow-analysis/user-flow-analysis.md#us-01-クイズ回答匿名ユーザー)

## メインフロー図

```mermaid
flowchart TD
    Start([アプリを開く]) --> Check{クイズ存在チェック}
    Check -->|Yes| Display[クイズ一覧表示]
    Check -->|No| Empty[空状態メッセージ]
    
    Display --> Filter{フィルター選択?}
    Filter -->|Yes| Search[タグ・条件絞り込み]
    Filter -->|No| Select[クイズ選択]
    Search --> FilterResult[絞り込み結果表示]
    FilterResult --> Select
    
    Select --> LoadQuiz[クイズデータ読み込み]
    LoadQuiz --> StartQuiz[クイズ開始画面]
    StartQuiz --> ShowQuestion[問題表示]
    
    ShowQuestion --> WaitSwipe{スワイプ操作待ち}
    WaitSwipe -->|右スワイプ| AnswerYes[◯回答記録]
    WaitSwipe -->|左スワイプ| AnswerNo[×回答記録]
    WaitSwipe -->|上スワイプ| Skip[スキップ記録]
    WaitSwipe -->|下スワイプ| Previous{前問あり?}
    
    Previous -->|Yes| ShowPrevious[前問表示] --> ShowQuestion
    Previous -->|No| FirstMessage[最初の問題です] --> ShowQuestion
    
    AnswerYes --> Judge[正誤判定]
    AnswerNo --> Judge
    Skip --> Judge
    
    Judge --> ShowResult[正誤結果表示]
    ShowResult --> FadeOut[フェードアウト]
    FadeOut --> ShowExplanation[解説表示]
    
    ShowExplanation --> NextAction{次のアクション}
    NextAction -->|次問ボタン| CheckNext{次問あり?}
    NextAction -->|自動進行| CheckNext
    
    CheckNext -->|Yes| ShowQuestion
    CheckNext -->|No| Complete[全問完了]
    
    Complete --> ResultScreen[結果画面表示]
    ResultScreen --> NextFlow{次のフロー}
    NextFlow -->|新しいクイズ| Display
    NextFlow -->|間違い問題集| WrongQuiz[間違い問題Deck生成]
    NextFlow -->|MyPage| MyPage[マイページ遷移]
    NextFlow -->|終了| End([終了])
    
    Empty --> EmptyAction{空状態のアクション}
    EmptyAction -->|クイズ作成| CreateFlow[作成フローへ]
    EmptyAction -->|後で確認| End
    
    WrongQuiz --> StartQuiz
```

## 詳細フロー

### 1. 初期化・クイズ選択フェーズ

```mermaid
flowchart TD
    subgraph "Initialize Phase"
        A[アプリ起動] --> B[ネットワーク状態確認]
        B --> C{オンライン?}
        C -->|Yes| D[サーバーからクイズ取得]
        C -->|No| E[キャッシュからクイズ取得]
        
        D --> F[クイズ一覧構築]
        E --> G{キャッシュあり?}
        G -->|Yes| F
        G -->|No| H[オフライン通知]
        
        F --> I[一覧画面表示]
        H --> J[オフライン対応提案]
    end
    
    subgraph "Selection Phase"
        I --> K{ユーザー操作}
        K -->|検索| L[検索条件入力]
        K -->|タグ選択| M[タグフィルター]
        K -->|クイズ選択| N[選択クイズ詳細]
        
        L --> O[検索実行]
        M --> P[フィルター実行]
        O --> Q[検索結果表示]
        P --> Q
        Q --> N
        
        N --> R{開始確認}
        R -->|Yes| S[クイズ開始]
        R -->|No| I
    end
```

### 2. 回答・判定フェーズ

```mermaid
flowchart TD
    subgraph "Answer Phase"
        A[問題表示] --> B[スワイプ検出開始]
        B --> C{スワイプ方向}
        
        C -->|右| D[◯回答アニメーション]
        C -->|左| E[×回答アニメーション]
        C -->|上| F[スキップアニメーション]
        C -->|下| G[前問戻りアニメーション]
        
        D --> H[回答データ記録]
        E --> H
        F --> H
        G --> I{前問存在?}
        
        I -->|Yes| J[前問データ読み込み] --> A
        I -->|No| K[先頭メッセージ] --> A
    end
    
    subgraph "Judgment Phase"
        H --> L[正誤判定実行]
        L --> M{判定結果}
        
        M -->|正解| N[正解エフェクト表示]
        M -->|不正解| O[不正解エフェクト表示]
        M -->|スキップ| P[スキップエフェクト表示]
        
        N --> Q[フェードアウト 300ms]
        O --> Q
        P --> Q
        
        Q --> R[解説画面表示]
        R --> S[履歴記録更新]
    end
```

### 3. 進行・完了フェーズ

```mermaid
flowchart TD
    subgraph "Progress Phase"
        A[解説表示] --> B{ユーザーアクション}
        B -->|次問ボタン| C[次問遷移]
        B -->|タップ/スワイプ| C
        B -->|一定時間経過| D[自動進行]
        
        C --> E{残り問題あり?}
        D --> E
        
        E -->|Yes| F[次問データ読み込み]
        E -->|No| G[完了処理開始]
        
        F --> H[進捗更新]
        H --> I[次問表示]
        I --> J[回答フェーズへ]
    end
    
    subgraph "Completion Phase"
        G --> K[最終結果計算]
        K --> L[統計データ更新]
        L --> M[間違い問題抽出]
        M --> N[結果画面構築]
        
        N --> O[完了画面表示]
        O --> P{次のアクション}
        
        P -->|再挑戦| Q[同じクイズ再開]
        P -->|間違い問題| R[間違いDeck生成]
        P -->|新しいクイズ| S[クイズ選択画面]
        P -->|履歴確認| T[MyPage遷移]
        P -->|終了| U[アプリ終了]
    end
```

## エラーハンドリングフロー

### ネットワークエラー

```mermaid
flowchart TD
    A[ネットワークエラー検出] --> B{エラー種別}
    B -->|接続断線| C[オフラインモード提案]
    B -->|タイムアウト| D[再試行提案]
    B -->|サーバーエラー| E[キャッシュデータ利用]
    
    C --> F{オフライン許可?}
    F -->|Yes| G[キャッシュクイズ表示]
    F -->|No| H[接続待ち画面]
    
    D --> I{再試行実行?}
    I -->|Yes| J[接続再試行]
    I -->|No| K[キャッシュフォールバック]
    
    E --> L[キャッシュ利用通知]
    L --> M[制限機能説明]
    
    G --> N[オフライン回答継続]
    H --> O[接続復旧待ち]
    J --> P{接続成功?}
    P -->|Yes| Q[通常フロー復帰]
    P -->|No| R[オフライン移行]
    
    K --> S[利用可能機能表示]
    M --> N
    N --> T[同期待ちデータ蓄積]
    O --> U[定期接続確認]
    R --> C
    S --> N
```

### データエラー

```mermaid
flowchart TD
    A[データエラー検出] --> B{エラー種別}
    B -->|破損データ| C[データ整合性チェック]
    B -->|不正データ| D[データ検証失敗]
    B -->|容量不足| E[ストレージ不足]
    
    C --> F{修復可能?}
    F -->|Yes| G[自動修復実行]
    F -->|No| H[データ再取得]
    
    D --> I[不正データ報告]
    I --> J[安全データフォールバック]
    
    E --> K[ストレージクリーンアップ]
    K --> L{容量確保成功?}
    L -->|Yes| M[処理継続]
    L -->|No| N[容量不足エラー表示]
    
    G --> O{修復成功?}
    O -->|Yes| P[通常フロー復帰]
    O -->|No| H
    
    H --> Q[サーバー再取得]
    Q --> R{取得成功?}
    R -->|Yes| P
    R -->|No| S[エラー状態表示]
    
    J --> T[制限モード継続]
    M --> P
    N --> U[手動削除提案]
    S --> V[手動復旧オプション]
    T --> W[報告送信オプション]
```

## 状態管理

### アプリケーション状態

```javascript
interface QuizAnswerState {
  // クイズデータ
  currentQuiz: Quiz | null;
  currentQuestion: Question | null;
  questionIndex: number;
  totalQuestions: number;
  
  // 回答状態
  answers: Answer[];
  currentAnswer: Answer | null;
  isAnswering: boolean;
  
  // UI状態
  showExplanation: boolean;
  showResult: boolean;
  animationState: 'idle' | 'swipe' | 'result' | 'explanation';
  
  // 進捗状態
  correctCount: number;
  wrongCount: number;
  skipCount: number;
  startTime: Date;
  
  // エラー状態
  networkStatus: 'online' | 'offline' | 'error';
  error: Error | null;
}
```

### データフロー

```mermaid
graph TD
    subgraph "Data Sources"
        A[Server API] --> B[Local Cache]
        B --> C[IndexedDB]
        C --> D[Session Storage]
    end
    
    subgraph "State Management"
        E[Global State] --> F[Quiz State]
        F --> G[Answer State]
        G --> H[UI State]
    end
    
    subgraph "UI Components"
        I[Quiz List] --> J[Quiz Player]
        J --> K[Result Screen]
        K --> L[History]
    end
    
    B --> E
    C --> E
    D --> E
    
    E --> I
    F --> J
    G --> J
    H --> J
    
    J --> M[Answer Recording]
    M --> C
    M --> N[Statistics Update]
    N --> L
```

## パフォーマンス要件

### タイミング制約

- **問題表示**: ≤ 100ms（キャッシュ時）
- **スワイプ検出**: ≤ 50ms
- **判定表示**: ≤ 200ms
- **画面遷移**: ≤ 300ms

### メモリ管理

- **問題キャッシュ**: 最大50問分
- **履歴保存**: セッション単位での管理
- **画像プリロード**: 次問の画像先読み
- **メモリクリーンアップ**: 画面遷移時の不要データ削除

## 関連ドキュメント

- [クイズ作成フロー](quiz-creation-flow.md)
- [オフライン同期フロー](offline-sync-flow.md)
- [クイズ回答ワイヤーフレーム](../3.01_wireframes/quiz-answer-page.md)

---
**作成工程**: UI設計  
**作成日**: 2025-01-31  
**更新日**: 2025-01-31