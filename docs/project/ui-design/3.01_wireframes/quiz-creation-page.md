# クイズ作成ページワイヤーフレーム

## 概要

段階的入力フォームによるクイズ作成画面のワイヤーフレーム設計です。ユーザーフレンドリーな4ステップ入力、リアルタイムバリデーション、プレビュー機能を提供し、高品質なクイズ作成体験を実現します。

## 参照ドキュメント

- [US-02: クイズ作成UI要件](../1.02_user-stories/us-02_quiz-creation.md)
- [クイズ作成フロー](../2.01_user-flows/quiz-creation-flow.md)
- [サイトマップ: クイズ作成画面](../1.01_sitemap.yaml)

## ワイヤーフレーム設計

### Step 1: 問題文入力画面

```mermaid
graph TD
    subgraph "Quiz Creation Step 1 (375px)"
        A[Header: Progress + Exit] --> B[Step Indicator]
        B --> C[Input Instructions]
        C --> D[Question Input Area]
        D --> E[Character Counter]
        E --> F[Input Guidelines]
        F --> G[Navigation Buttons]
    end
    
    subgraph "Header Section (60px)"
        A --> A1[× キャンセル]
        A --> A2[クイズ作成]
        A --> A3[下書き保存]
    end
    
    subgraph "Progress (50px)"
        B --> B1[● ○ ○ ○]
        B --> B2[Step 1/4: 問題文]
        B --> B3[25% Complete]
    end
    
    subgraph "Instructions (60px)"
        C --> C1["📝 クイズの問題文を入力してください"]
        C --> C2["◯×で答えられる明確な問題を作成しましょう"]
    end
    
    subgraph "Input Area (200px)"
        D --> D1[Large Text Area]
        D --> D2["地球は太陽系で最も大きな惑星である。"]
        D --> D3[Focus state styling]
        D --> D4[Auto-resize functionality]
    end
    
    subgraph "Counter & Validation (40px)"
        E --> E1[文字数: 23/500]
        E --> E2[✅ 入力OK]
        E --> E3[リアルタイム検証]
    end
    
    subgraph "Guidelines (120px)"
        F --> F1["💡 良い問題の例:"]
        F --> F2["• 事実に基づいた内容"]
        F --> F3["• 明確で理解しやすい文章"]
        F --> F4["• ◯×で判断できる内容"]
        F --> F5["❌ 避けるべき例:"]
        F --> F6["• 曖昧な表現や主観的な内容"]
    end
    
    subgraph "Navigation (80px)"
        G --> G1[← 戻る (無効)]
        G --> G2[プレビュー]
        G --> G3[次へ →]
    end
```

### Step 2: 正解選択画面

```mermaid
graph TD
    subgraph "Quiz Creation Step 2"
        A[Header: Same as Step 1] --> B[Progress Indicator]
        B --> C[Question Review]
        C --> D[Answer Selection]
        D --> E[Selection Validation]
        E --> F[Navigation Controls]
    end
    
    subgraph "Progress (50px)"
        B --> B1[● ● ○ ○]
        B --> B2[Step 2/4: 正解選択]
        B --> B3[50% Complete]
    end
    
    subgraph "Question Review (100px)"
        C --> C1["📋 作成した問題:"]
        C --> C2["地球は太陽系で最も大きな惑星である。"]
        C --> C3[Edit button]
    end
    
    subgraph "Answer Options (150px)"
        D --> D1["✅ この問題の正解を選択してください:"]
        D --> D2[Large Radio Button Layout]
        D --> D3["● ○ 正解 (True)"]
        D --> D4["○ × 不正解 (False)"]
        D --> D5[Clear visual distinction]
    end
    
    subgraph "Validation Feedback (60px)"
        E --> E1[Selection status]
        E --> E2["✅ 正解が選択されました"]
        E --> E3[Explanation of choice]
    end
    
    subgraph "Navigation (80px)"
        F --> F1[← 前のステップ]
        F --> F2[プレビュー]
        F --> F3[次へ →]
    end
```

### Step 3: 解説入力画面

```mermaid
graph TD
    subgraph "Quiz Creation Step 3"
        A[Header: Same Layout] --> B[Progress Indicator]
        B --> C[Question Summary]
        C --> D[Explanation Input]
        D --> E[Character Counter]
        E --> F[Skip Option]
        F --> G[Writing Tips]
        G --> H[Navigation]
    end
    
    subgraph "Progress (50px)"
        B --> B1[● ● ● ○]
        B --> B2[Step 3/4: 解説入力]
        B --> B3[75% Complete]
    end
    
    subgraph "Summary (80px)"
        C --> C1["📋 問題: 地球は太陽系で最も大きな惑星である。"]
        C --> C2["正解: × (不正解)"]
    end
    
    subgraph "Input Area (250px)"
        D --> D1["📚 解説を入力してください (任意)"]
        D --> D2[Large text area]
        D --> D3["実際には木星が太陽系で最も大きな惑星です。地球は岩石惑星の中では最大ですが、ガス惑星である木星の方がはるかに大きく..."]
        D --> D4[Rich text editing options]
    end
    
    subgraph "Counter (30px)"
        E --> E1[文字数: 127/1000]
        E --> E2[Optional indicator]
    end
    
    subgraph "Skip Alternative (50px)"
        F --> F1["解説を追加しない場合:"]
        F --> F2["[このステップをスキップ]"]
    end
    
    subgraph "Writing Guide (100px)"
        G --> G1["💡 良い解説のポイント:"]
        G --> G2["• なぜその答えが正解/不正解か説明"]
        G --> G3["• 関連する豆知識を追加"]
        G --> G4["• 分かりやすい言葉で記述"]
    end
    
    subgraph "Navigation (80px)"
        H --> H1[← 前のステップ]
        H --> H2[プレビュー]
        H --> H3[次へ →]
    end
```

### Step 4: タグ設定画面

```mermaid
graph TD
    subgraph "Quiz Creation Step 4"
        A[Header: Same Layout] --> B[Progress Indicator]
        B --> C[Quiz Summary]
        C --> D[Official Tags Section]
        D --> E[User Tags Section]
        E --> F[Tag Guidelines]
        F --> G[Final Navigation]
    end
    
    subgraph "Progress (50px)"
        B --> B1[● ● ● ●]
        B --> B2[Step 4/4: タグ設定]
        B --> B3[100% Complete]
    end
    
    subgraph "Summary Preview (100px)"
        C --> C1["📋 作成中のクイズ:"]
        C --> C2["問題: 地球は太陽系で最も大きな惑星である。"]
        C --> C3["正解: ×  |  解説: あり"]
    end
    
    subgraph "Official Tags (120px)"
        D --> D1["🏷️ 公認タグ (1つ以上必須)"]
        D --> D2[Tag Grid Layout]
        D --> D3["☑️ 科学  ☐ 地理  ☐ 一般常識"]
        D --> D4["☐ 歴史  ☐ 文化  ☐ スポーツ"]
        D --> D5[Required validation]
    end
    
    subgraph "User Tags (80px)"
        E --> E1["🔖 ユーザータグ (任意)"]
        E --> E2[Tag input field]
        E --> E3["天体, 惑星, 宇宙"]
        E --> E4[Tag suggestions]
    end
    
    subgraph "Guidelines (80px)"
        F --> F1["💡 タグ設定のコツ:"]
        F --> F2["• 内容に最も関連する公認タグを選択"]
        F --> F3["• ユーザータグで詳細なカテゴリを追加"]
        F --> F4["• 検索しやすいキーワードを使用"]
    end
    
    subgraph "Final Navigation (80px)"
        G --> G1[← 前のステップ]
        G --> G2[プレビュー]
        G --> G3[完了 →]
    end
```

### プレビュー画面

```mermaid
graph TD
    subgraph "Preview Screen Layout"
        A[Header: Preview Mode] --> B[Quiz Display]
        B --> C[Play Simulation]
        C --> D[Metadata Display]
        D --> E[Action Buttons]
    end
    
    subgraph "Preview Header (60px)"
        A --> A1[← 編集に戻る]
        A --> A2["👁️ プレビュー"]
        A --> A3[投稿]
    end
    
    subgraph "Quiz Card Display (300px)"
        B --> B1[Play-style layout]
        B --> B2[Question card design]
        B --> B3["🌍 地球は太陽系で最も大きな惑星である。"]
        B --> B4[Swipe hints display]
        B --> B5["← × 不正解    ○ 正解 →"]
    end
    
    subgraph "Interaction Simulation (100px)"
        C --> C1["✨ スワイプして回答をテスト"]
        C --> C2[Swipe gesture detection]
        C --> C3[Result display simulation]
        C --> C4[Explanation preview]
    end
    
    subgraph "Quiz Metadata (120px)"
        D --> D1["📊 クイズ情報:"]
        D --> D2["カテゴリ: 科学"]
        D --> D3["タグ: #科学 #天体 #惑星 #宇宙"]
        D --> D4["作成日: 2025/01/31"]
        D --> D5["状態: 承認待ち"]
    end
    
    subgraph "Action Controls (80px)"
        E --> E1["✏️ 修正する"]
        E --> E2["📤 投稿する"]
        E --> E3["💾 下書き保存"]
    end
```

### 投稿確認モーダル

```mermaid
graph TD
    subgraph "Submission Confirmation Modal"
        A[Modal Overlay] --> B[Confirmation Content]
        B --> C[Quiz Summary]
        C --> D[Terms Agreement]
        D --> E[Action Buttons]
    end
    
    subgraph "Modal Header (60px)"
        B --> B1["📤 クイズを投稿しますか？"]
        B --> B2[Close button]
    end
    
    subgraph "Summary Section (150px)"
        C --> C1["最終確認:"]
        C --> C2["問題: 地球は太陽系で最も大きな惑星である。"]
        C --> C3["正解: × (不正解)"]
        C --> C4["解説: あり (127文字)"]
        C --> C5["タグ: #科学 #天体 #惑星 #宇宙"]
    end
    
    subgraph "Terms Section (80px)"
        D --> D1["☑️ コミュニティガイドラインに同意"]
        D --> D2["☑️ 投稿内容の正確性を確認済み"]
        D --> D3[Links to terms]
    end
    
    subgraph "Confirmation Actions (60px)"
        E --> E1["📤 投稿する"]
        E --> E2["✏️ 修正する"]
        E --> E3["❌ キャンセル"]
    end
```

### 投稿完了画面

```mermaid
graph TD
    subgraph "Submission Success Screen"
        A[Success Header] --> B[Status Information]
        B --> C[Next Steps Guide]
        C --> D[Action Options]
    end
    
    subgraph "Success Message (100px)"
        A --> A1["🎉 投稿完了！"]
        A --> A2["クイズが正常に投稿されました"]
        A --> A3[Success animation]
    end
    
    subgraph "Status Info (120px)"
        B --> B1["📋 投稿状況:"]
        B --> B2["状態: 承認待ち"]
        B --> B3["投稿ID: QZ-2025-0131-001"]
        B --> B4["承認予定: 24-48時間以内"]
        B --> B5[Approval process explanation]
    end
    
    subgraph "Next Steps (100px)"
        C --> C1["📝 承認プロセス:"]
        C --> C2["1. 内容確認・品質チェック"]
        C --> C3["2. 管理者による最終承認"]
        C --> C4["3. 公開・利用開始"]
        C --> C5[Progress indicator]
    end
    
    subgraph "Action Options (120px)"
        D --> D1["✏️ 新しいクイズを作成"]
        D --> D2["👁️ 作成したクイズを確認"]
        D --> D3["🎮 他のクイズで遊ぶ"]
        D --> D4["👤 マイページで管理"]
        D --> D5["🏠 ホームに戻る"]
    end
```

## 状態別表示

### エラー状態

```mermaid
graph TD
    A[Error Detection] --> B{Error Type}
    B -->|Validation| C[Input Validation Error]
    B -->|Network| D[Submission Error]
    B -->|Server| E[Server Error]
    
    subgraph "Validation Errors"
        C --> C1["⚠️ 入力エラー"]
        C --> C2["問題文が短すぎます (最低10文字)"]
        C --> C3["公認タグを1つ以上選択してください"]
        C --> C4[Field-specific error highlighting]
        C --> C5[Correction guidance]
    end
    
    subgraph "Network Errors"
        D --> D1["🔌 送信エラー"]
        D --> D2["ネットワーク接続を確認してください"]
        D --> D3["[再試行] [下書き保存]"]
        D --> D4[Offline mode suggestion]
    end
    
    subgraph "Server Errors"
        E --> E1["⚠️ サーバーエラー"]
        E --> E2["しばらく時間をおいてお試しください"]
        E --> E3["[再試行] [サポートに連絡]"]
        E --> E4[Error code display]
    end
```

### 下書き管理

```mermaid
graph TD
    A[Draft Management] --> B[Auto Save]
    A --> C[Manual Save]
    A --> D[Draft Recovery]
    
    subgraph "Auto Save System"
        B --> B1[30秒間隔で自動保存]
        B --> B2["💾 下書きを保存中..."]
        B --> B3["✅ 保存完了 (14:32)"]
        B --> B4[Save status indicator]
    end
    
    subgraph "Manual Save"
        C --> C1[Save button in header]
        C --> C2[Confirmation message]
        C --> C3["💾 下書きが保存されました"]
        C --> C4[Last saved timestamp]
    end
    
    subgraph "Draft Recovery"
        D --> D1["📄 下書きが見つかりました"]
        D --> D2[Draft preview]
        D --> D3["最終保存: 2025/01/31 14:32"]
        D --> D4["[復元する] [新規作成] [削除]"]
    end
```

## インタラクション設計

### フォーム操作

```mermaid
graph TD
    A[Form Interactions] --> B[Input Handling]
    A --> C[Navigation]
    A --> D[Validation]
    
    subgraph "Input Management"
        B --> B1[Auto-focus next field]
        B --> B2[Smart text formatting]
        B --> B3[Paste content handling]
        B --> B4[Character limit enforcement]
    end
    
    subgraph "Step Navigation"
        C --> C1[Linear progression]
        C --> C2[Previous step access]
        C --> C3[Step validation gates]
        C --> C4[Progress persistence]
    end
    
    subgraph "Real-time Validation"
        D --> D1[Input validation on blur]
        D --> D2[Character count updates]
        D --> D3[Required field checking]
        D --> D4[Format validation]
    end
```

### プレビュー機能

```mermaid
graph TD
    A[Preview System] --> B[Live Preview]
    A --> C[Interactive Testing]
    A --> D[Edit Integration]
    
    subgraph "Live Preview Updates"
        B --> B1[Real-time content sync]
        B --> B2[Style application]
        B --> B3[Metadata display]
        B --> B4[Mobile layout simulation]
    end
    
    subgraph "Interactive Testing"
        C --> C1[Swipe gesture simulation]
        C --> C2[Answer feedback testing]
        C --> C3[Explanation display test]
        C --> C4[User experience validation]
    end
    
    subgraph "Edit Integration"
        D --> D1[Quick edit buttons]
        D --> D2[Step-specific editing]
        D --> D3[Change tracking]
        D --> D4[Preview refresh]
    end
```

## レスポンシブ対応

### モバイル最適化

```mermaid
graph TD
    A[Mobile Optimization] --> B[Layout Adaptation]
    A --> C[Input Optimization]
    A --> D[Touch Interactions]
    
    subgraph "Layout Responsive"
        B --> B1[Single column layout]
        B --> B2[Generous spacing]
        B --> B3[Readable font sizes]
        B --> B4[Appropriate content density]
    end
    
    subgraph "Input Enhancements"
        C --> C1[Large touch targets]
        C --> C2[Software keyboard consideration]
        C --> C3[Auto-complete suggestions]
        C --> C4[Voice input support]
    end
    
    subgraph "Touch-Friendly Design"
        D --> D1[44px minimum touch size]
        D --> D2[Swipe gestures support]
        D --> D3[Haptic feedback]
        D --> D4[Accidental touch prevention]
    end
```

## データ構造

### 作成フォームデータ

```javascript
interface QuizCreationForm {
  // Step 1: Question
  question: {
    text: string;
    isValid: boolean;
    errors: string[];
  };
  
  // Step 2: Answer
  correctAnswer: {
    value: boolean | null;
    isValid: boolean;
  };
  
  // Step 3: Explanation
  explanation: {
    text: string;
    isOptional: true;
    isValid: boolean;
  };
  
  // Step 4: Tags
  tags: {
    official: string[];
    user: string[];
    isValid: boolean;
  };
  
  // Form state
  currentStep: 1 | 2 | 3 | 4 | 'preview';
  isComplete: boolean;
  isDraft: boolean;
  lastSaved?: Date;
}
```

### バリデーションルール

```javascript
const validationRules = {
  question: {
    minLength: 10,
    maxLength: 500,
    required: true,
    pattern: /^[^<>]*$/, // No HTML tags
  },
  
  correctAnswer: {
    required: true,
    type: 'boolean',
  },
  
  explanation: {
    maxLength: 1000,
    required: false,
    pattern: /^[^<>]*$/,
  },
  
  tags: {
    official: {
      minCount: 1,
      maxCount: 3,
    },
    user: {
      maxCount: 5,
      pattern: /^[a-zA-Z0-9\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\s]+$/,
    },
  },
};
```

## パフォーマンス要件

### レスポンス時間

- **ステップ遷移**: ≤ 200ms
- **リアルタイム検証**: ≤ 100ms
- **下書き保存**: ≤ 1000ms
- **プレビュー更新**: ≤ 300ms
- **投稿処理**: ≤ 3000ms

### データ管理

- **自動保存**: 30秒間隔
- **入力遅延**: 300ms後にバリデーション実行
- **メモリ効率**: 効率的な状態管理
- **データ永続化**: LocalStorage + IndexedDB

## アクセシビリティ

### フォームアクセシビリティ

```javascript
const accessibilityFeatures = {
  labels: {
    question: "クイズの問題文を入力",
    correctAnswer: "正解を選択",
    explanation: "解説を入力（任意）",
    tags: "タグを設定",
  },
  
  descriptions: {
    characterCount: "残り文字数",
    validationStatus: "入力検証結果",
    saveStatus: "保存状態",
  },
  
  announcements: {
    stepChange: "ステップ {current} / {total} に移動しました",
    validation: "入力エラーが {count} 件あります",
    saveSuccess: "下書きが保存されました",
  },
};
```

### キーボードナビゲーション

- **Tab順序**: 論理的なフォーカス順序
- **Enter**: 次ステップへの進行
- **Escape**: モーダル・ドロップダウンの閉じる
- **Arrow Keys**: ラジオボタン・タグ選択

## 関連ドキュメント

- [ホームページ](home-page.md)
- [回答履歴ページ](answer-history-page.md)
- [クイズ作成フロー](../2.01_user-flows/quiz-creation-flow.md)

---
**作成工程**: UI設計  
**作成日**: 2025-01-31  
**更新日**: 2025-01-31
