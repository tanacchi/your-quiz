# クイズ作成フロー

## 概要

匿名ユーザーがクイズを作成・投稿する一連の流れを示します。段階的入力フォームによる使いやすい作成体験と、リアルタイムプレビューによる品質確保を提供し、承認待ち状態の明確な管理を実現します。

## 参照ドキュメント

- [US-02: クイズ作成UI要件](../1.02_user-stories/us-02_quiz-creation.md)
- [ユーザーフロー分析: US-02](docs/project/ddd-design/2.02.5_user-flow-analysis/user-flow-analysis.md#us-02-クイズ作成匿名ユーザー)

## メインフロー図

```mermaid
flowchart TD
    Start([Createタブアクセス]) --> Check{作成権限確認}
    Check -->|OK| Welcome[作成開始画面]
    Check -->|制限| Limit[制限説明画面]
    
    Welcome --> Draft{下書きあり?}
    Draft -->|Yes| Resume[下書き復元確認]
    Draft -->|No| Step1[Step1: 問題文入力]
    
    Resume --> R1{復元する?}
    R1 -->|Yes| LoadDraft[下書きデータ読み込み]
    R1 -->|No| ClearDraft[下書きクリア]
    
    LoadDraft --> ReviewDraft[下書き内容確認]
    ClearDraft --> Step1
    ReviewDraft --> Step1
    
    Step1 --> Validate1{問題文バリデーション}
    Validate1 -->|OK| Step2[Step2: 正解選択]
    Validate1 -->|NG| Error1[エラー表示] --> Step1
    
    Step2 --> Validate2{正解バリデーション}
    Validate2 -->|OK| Step3[Step3: 解説入力]
    Validate2 -->|NG| Error2[エラー表示] --> Step2
    
    Step3 --> Validate3{解説バリデーション}
    Validate3 -->|OK| Step4[Step4: タグ設定]
    Validate3 -->|NG| Error3[エラー表示] --> Step3
    
    Step4 --> Validate4{タグバリデーション}
    Validate4 -->|公認タグなし| TagError[公認タグ必須警告] --> Step4
    Validate4 -->|OK| Preview[プレビュー画面]
    
    Preview --> PreviewAction{プレビューアクション}
    PreviewAction -->|修正| BackToStep[修正画面選択] --> Step1
    PreviewAction -->|投稿| Confirm[投稿確認ダイアログ]
    
    Confirm --> ConfirmAction{投稿実行?}
    ConfirmAction -->|Yes| Submit[投稿処理]
    ConfirmAction -->|No| Preview
    
    Submit --> Processing[投稿処理中]
    Processing --> Result{投稿結果}
    Result -->|成功| Success[投稿完了画面]
    Result -->|失敗| Failed[エラー処理]
    
    Success --> NextAction{次のアクション}
    NextAction -->|新規作成| Welcome
    NextAction -->|作成クイズ確認| MyCreated[投稿管理画面]
    NextAction -->|クイズを解く| QuizPlay[クイズ回答へ]
    NextAction -->|MyPage| MyPage[マイページ]
    
    Failed --> Retry{再試行?}
    Retry -->|Yes| Submit
    Retry -->|下書き保存| SaveDraft[緊急保存]
    Retry -->|No| End([終了])
    
    Limit --> LimitAction{制限対応}
    LimitAction -->|理解| End
    LimitAction -->|詳細確認| LimitDetail[制限詳細説明]
    
    SaveDraft --> DraftSaved[保存完了] --> End
    LimitDetail --> End
```

## 詳細フロー

### 1. 初期化・権限確認フェーズ

```mermaid
flowchart TD
    subgraph "Initialization Phase"
        A[Createタブ選択] --> B[ユーザー状態確認]
        B --> C{作成制限チェック}
        
        C -->|制限なし| D[作成権限OK]
        C -->|時間制限| E[時間制限警告]
        C -->|容量制限| F[容量制限警告]
        C -->|ネットワーク制限| G[オフライン制限]
        
        D --> H[下書き存在確認]
        E --> I{制限受容?}
        F --> J{容量確保?}
        G --> K[オフライン説明]
        
        I -->|Yes| H
        I -->|No| L[作成中止]
        
        J -->|Yes| M[容量クリーンアップ] --> H
        J -->|No| L
        
        K --> N{オフライン理解?}
        N -->|Yes| L
        N -->|No| O[詳細説明] --> L
    end
    
    subgraph "Draft Management"
        H --> P{下書きあり?}
        P -->|Yes| Q[下書きメタデータ表示]
        P -->|No| R[新規作成開始]
        
        Q --> S{下書き操作}
        S -->|復元| T[下書き復元処理]
        S -->|削除| U[下書き削除確認]
        S -->|新規| V[下書き保持で新規]
        
        T --> W[復元データ検証]
        U --> X{削除確認?}
        V --> R
        
        X -->|Yes| Y[下書き削除] --> R
        X -->|No| Q
        
        W --> Z{データ整合性OK?}
        Z -->|Yes| AA[フォーム復元]
        Z -->|No| BB[復元エラー] --> R
    end
```

### 2. 段階的入力フェーズ

```mermaid
flowchart TD
    subgraph "Step 1: Question Input"
        A[問題文入力画面] --> B[入力フィールドフォーカス]
        B --> C[リアルタイム文字数カウント]
        C --> D{入力中バリデーション}
        
        D -->|文字数OK| E[入力継続]
        D -->|文字数超過| F[警告表示]
        D -->|必須未入力| G[必須警告]
        
        E --> H[自動保存タイマー]
        F --> I[入力制限]
        G --> J[進行防止]
        
        H --> K{30秒経過?}
        K -->|Yes| L[下書き自動保存]
        K -->|No| H
        
        I --> M[制限解除待ち] --> E
        J --> N[入力促進メッセージ]
        
        L --> O{保存成功?}
        O -->|Yes| P[保存完了通知]
        O -->|No| Q[保存失敗警告]
        
        N --> E
        P --> R[次ステップボタン有効化]
        Q --> S[手動保存提案]
    end
    
    subgraph "Step 2: Answer Selection"
        T[正解選択画面] --> U[ラジオボタン表示]
        U --> V{選択操作}
        
        V -->|◯選択| W[◯回答設定]
        V -->|×選択| X[×回答設定]
        
        W --> Y[選択状態視覚化]
        X --> Y
        
        Y --> Z[プレビュー更新]
        Z --> AA[次ステップ有効化]
    end
    
    subgraph "Step 3: Explanation Input"
        BB[解説入力画面] --> CC[任意入力説明]
        CC --> DD{入力有無}
        
        DD -->|入力あり| EE[文字数カウント表示]
        DD -->|スキップ| FF[スキップ確認]
        
        EE --> GG{文字数チェック}
        GG -->|制限内| HH[入力継続]
        GG -->|超過| II[文字数警告]
        
        FF --> JJ{スキップ確認?}
        JJ -->|Yes| KK[解説なしで継続]
        JJ -->|No| CC
        
        HH --> LL[リアルタイムプレビュー]
        II --> MM[入力調整促進]
        KK --> NN[次ステップ移行]
        
        LL --> OO[品質ヒント表示]
        MM --> HH
        OO --> PP[入力完了判定]
    end
```

### 3. プレビュー・投稿フェーズ

```mermaid
flowchart TD
    subgraph "Preview Phase"
        A[プレビュー画面構築] --> B[入力データ統合]
        B --> C[プレビューUI生成]
        C --> D[Play画面形式表示]
        
        D --> E{プレビュー操作}
        E -->|スワイプテスト| F[操作シミュレーション]
        E -->|内容確認| G[詳細表示切替]
        E -->|修正| H[修正画面選択]
        E -->|投稿| I[投稿確認ダイアログ]
        
        F --> J[操作フィードバック]
        G --> K[メタデータ表示]
        H --> L{修正箇所選択}
        
        L -->|問題文| M[Step1戻り]
        L -->|正解| N[Step2戻り]
        L -->|解説| O[Step3戻り]
        L -->|タグ| P[Step4戻り]
        
        J --> Q[プレビュー継続]
        K --> Q
        Q --> E
    end
    
    subgraph "Submission Phase"
        I --> R[投稿確認内容表示]
        R --> S{最終確認}
        
        S -->|投稿実行| T[投稿データ構築]
        S -->|キャンセル| U[プレビュー戻り]
        
        T --> V[データバリデーション]
        V --> W{バリデーション結果}
        
        W -->|OK| X[サーバー送信]
        W -->|NG| Y[バリデーションエラー]
        
        X --> Z[送信処理中表示]
        Y --> AA[エラー詳細表示]
        
        Z --> BB{送信結果}
        BB -->|成功| CC[投稿成功処理]
        BB -->|失敗| DD[投稿失敗処理]
        
        AA --> EE[修正要求] --> U
        CC --> FF[成功画面表示]
        DD --> GG[エラー画面表示]
    end
```

### 4. 完了・次アクションフェーズ

```mermaid
flowchart TD
    subgraph "Success Phase"
        A[投稿成功] --> B[作成者識別ID生成]
        B --> C[承認待ち状態設定]
        C --> D[完了画面構築]
        
        D --> E[🎉成功メッセージ]
        E --> F[承認プロセス説明]
        F --> G[作成クイズプレビュー]
        G --> H[次アクション選択肢]
    end
    
    subgraph "Next Actions"
        H --> I{アクション選択}
        
        I -->|新規作成| J[新しいクイズ作成]
        I -->|作成確認| K[作成したクイズ確認]
        I -->|クイズプレイ| L[作成クイズで遊ぶ]
        I -->|MyPage| M[マイページ確認]
        I -->|ホーム| N[ホーム画面戻り]
        
        J --> O[作成フロー再開始]
        K --> P[投稿管理画面]
        L --> Q{承認状態確認}
        
        Q -->|承認済み| R[通常プレイ開始]
        Q -->|承認待ち| S[作成者限定プレビュー]
        
        M --> T[マイページ表示]
        N --> U[ホーム表示]
        P --> V[投稿一覧・統計]
        
        S --> W[プレビューモード表示]
        W --> X[実際の表示確認]
    end
    
    subgraph "Error Recovery"
        Y[投稿失敗] --> Z{エラー種別判定}
        
        Z -->|ネットワーク| AA[接続エラー処理]
        Z -->|バリデーション| BB[入力エラー処理]
        Z -->|サーバー| CC[サーバーエラー処理]
        Z -->|容量| DD[容量エラー処理]
        
        AA --> EE[再試行提案]
        BB --> FF[修正要求]
        CC --> GG[時間をおいて再試行]
        DD --> HH[データ削減提案]
        
        EE --> II{再試行?}
        II -->|Yes| JJ[投稿再実行]
        II -->|下書き保存| KK[緊急下書き保存]
        II -->|No| LL[作成中止]
    end
```

## バリデーションルール

### 入力バリデーション

```mermaid
graph TD
    subgraph "Question Validation"
        A[問題文入力] --> B{文字数チェック}
        B -->|1-500文字| C{内容品質チェック}
        B -->|範囲外| D[文字数エラー]
        
        C -->|明確な文章| E{HTMLタグチェック}
        C -->|曖昧・不明確| F[品質警告]
        
        E -->|タグなし| G[バリデーション通過]
        E -->|タグあり| H[サニタイズ処理]
        
        F --> I[改善提案表示]
        H --> J[タグ除去] --> G
    end
    
    subgraph "Answer Validation"
        K[正解選択] --> L{選択確認}
        L -->|◯または×選択済み| M[バリデーション通過]
        L -->|未選択| N[選択必須エラー]
        
        M --> O[選択内容確定]
        N --> P[選択促進メッセージ]
    end
    
    subgraph "Tag Validation"
        Q[タグ設定] --> R{公認タグチェック}
        R -->|1つ以上選択| S{ユーザータグチェック}
        R -->|未選択| T[公認タグ必須エラー]
        
        S -->|適切な形式| U[バリデーション通過]
        S -->|不適切形式| V[フォーマット警告]
        
        T --> W[公認タグ選択促進]
        V --> X[修正案提示]
    end
```

### データ整合性チェック

```javascript
interface ValidationRules {
  question: {
    required: true;
    minLength: 1;
    maxLength: 500;
    allowHTML: false;
    sanitize: true;
  };
  
  correctAnswer: {
    required: true;
    type: 'boolean';
    values: [true, false]; // ◯=true, ×=false
  };
  
  explanation: {
    required: false;
    maxLength: 1000;
    allowHTML: false;
    sanitize: true;
  };
  
  tags: {
    officialTags: {
      required: true;
      minCount: 1;
      validTags: ['一般常識', '歴史', '科学', /*...*/];
    };
    userTags: {
      required: false;
      maxCount: 5;
      pattern: /^[a-zA-Z0-9ひらがなカタカナ漢字\s]+$/;
    };
  };
}
```

## エラーハンドリング

### ネットワークエラー処理

```mermaid
flowchart TD
    A[投稿処理中] --> B{ネットワーク状態}
    B -->|接続OK| C[正常投稿処理]
    B -->|接続不安定| D[接続エラー検出]
    B -->|完全断線| E[オフライン検出]
    
    C --> F[投稿完了]
    
    D --> G[自動再試行]
    G --> H{再試行結果}
    H -->|成功| F
    H -->|失敗| I[手動再試行提案]
    
    E --> J[オフライン通知]
    J --> K[下書き保存提案]
    K --> L{保存選択}
    L -->|Yes| M[ローカル保存]
    L -->|No| N[データ保持]
    
    I --> O{ユーザー選択}
    O -->|再試行| P[手動再送信]
    O -->|下書き保存| M
    O -->|中止| Q[作成中止]
    
    M --> R[保存完了通知]
    N --> S[接続復旧待ち]
    P --> T{送信結果}
    T -->|成功| F
    T -->|失敗| U[エラー詳細表示]
    
    R --> V[後で送信可能]
    S --> W[定期接続確認]
    U --> X[サポート連絡提案]
```

## 状態管理

### 作成フォーム状態

```javascript
interface QuizCreationState {
  // フォームデータ
  formData: {
    question: string;
    correctAnswer: boolean | null;
    explanation: string;
    officialTags: string[];
    userTags: string[];
  };
  
  // UI状態
  currentStep: 1 | 2 | 3 | 4 | 'preview';
  isValid: boolean;
  errors: Record<string, string[]>;
  
  // プロセス状態
  isDraftSaved: boolean;
  isSubmitting: boolean;
  lastSaved: Date | null;
  
  // プレビュー状態
  previewMode: 'form' | 'play';
  previewData: Quiz | null;
}
```

## パフォーマンス要件

### レスポンス時間

- **ステップ遷移**: ≤ 200ms
- **バリデーション**: ≤ 100ms  
- **プレビュー更新**: ≤ 500ms
- **自動保存**: ≤ 1000ms
- **投稿処理**: ≤ 3000ms

### データ管理

- **下書き保存**: 30秒間隔の自動保存
- **バリデーション**: リアルタイム検証
- **プレビュー**: 入力変更から500ms後更新
- **データ同期**: オンライン復旧時の自動送信

## 関連ドキュメント

- [クイズ承認フロー](quiz-approval-flow.md)
- [クイズ作成ワイヤーフレーム](../3.01_wireframes/quiz-creation-page.md)
- [投稿完了画面](../3.01_wireframes/quiz-submission-success-page.md)

---
**作成工程**: UI設計  
**作成日**: 2025-01-31  
**更新日**: 2025-01-31