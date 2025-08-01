# クイズ回答ページワイヤーフレーム

## 概要

Tinder UI形式によるスワイプ操作でクイズに回答する画面のワイヤーフレーム設計です。直感的なジェスチャー操作、即座のフィードバック表示、解説画面への自然な遷移を提供し、学習効果を最大化するUI設計を実現します。

## 参照ドキュメント

- [US-01: クイズ回答UI要件](../1.02_user-stories/us-01_quiz-answering.md)
- [クイズ回答フロー](../2.01_user-flows/quiz-answering-flow.md)
- [サイトマップ: クイズ回答画面](../1.01_sitemap.yaml)

## ワイヤーフレーム設計

### メインレイアウト（回答待ち状態）

```mermaid
graph TD
    subgraph "Quiz Answer Layout (375px × 812px)"
        A[Header: Progress + Exit] --> B[Question Display Area]
        B --> C[Swipe Interaction Zone]
        C --> D[Answer Hint Area]
        D --> E[Navigation Controls]
    end
    
    subgraph "Header Section (60px)"
        A --> A1[← 終了]
        A --> A2[3 / 10]
        A --> A3[Progress Bar 30%]
        A --> A4[⏸️ 一時停止]
    end
    
    subgraph "Question Area (200px)"
        B --> B1[Question Card Container]
        B1 --> B2["🌍 地球は太陽系の第3惑星である。"]
        B1 --> B3[Question Image (Optional)]
        B1 --> B4[Difficulty: ★★☆☆☆]
    end
    
    subgraph "Swipe Zone (350px)"
        C --> C1[Main Interaction Area]
        C --> C2[Swipe Gesture Detection]
        C --> C3[Visual Feedback Layer]
    end
    
    subgraph "Hint Area (60px)"
        D --> D1[← × 不正解]
        D --> D2[↑ 次の問題]
        D --> D3[○ 正解 →]
        D --> D4[↓ 前の問題]
    end
    
    subgraph "Controls (60px)"
        E --> E1[代替ボタン表示]
        E --> E2[アクセシビリティ対応]
    end
```

### スワイプ操作中の視覚フィードバック

```mermaid
graph TD
    subgraph "Swipe Feedback States"
        A[Swipe Detection] --> B{Swipe Direction}
        B -->|Right| C[Correct Feedback]
        B -->|Left| D[Incorrect Feedback]
        B -->|Up| E[Skip Feedback]
        B -->|Down| F[Previous Feedback]
    end
    
    subgraph "Right Swipe (Correct)"
        C --> C1[Card slides right]
        C --> C2[Green overlay: ✅]
        C --> C3["○ 正解" text]
        C --> C4[Haptic feedback]
    end
    
    subgraph "Left Swipe (Incorrect)"
        D --> D1[Card slides left]
        D --> D2[Red overlay: ❌]
        D --> D3["× 不正解" text]
        D --> D4[Haptic feedback]
    end
    
    subgraph "Up Swipe (Skip)"
        E --> E1[Card slides up]
        E --> E2[Gray overlay: ⏭️]
        E --> E3["スキップ" text]
        E --> E4[Light haptic]
    end
    
    subgraph "Down Swipe (Previous)"
        F --> F1[Card slides down]
        F --> F2[Blue overlay: ⬅️]
        F --> F3["前の問題" text]
        F --> F4[No haptic]
    end
```

### 判定結果表示画面

```mermaid
graph TD
    subgraph "Result Display Layout"
        A[Judgment Animation] --> B[Result Overlay]
        B --> C[Explanation Transition]
    end
    
    subgraph "Correct Answer Result"
        A --> A1["🎉 正解！"]
        A --> A2[Green background pulse]
        A --> A3[Success sound effect]
        A --> A4[Celebration animation]
    end
    
    subgraph "Incorrect Answer Result"
        A --> A5["😅 不正解"]
        A --> A6[Red background flash]
        A --> A7[Error sound effect]
        A --> A8[Shake animation]
    end
    
    subgraph "Skip Result"
        A --> A9["⏭️ スキップ"]
        A --> A10[Neutral background]
        A --> A11[Skip sound effect]
        A --> A12[Slide animation]
    end
    
    subgraph "Auto Transition"
        B --> B1[Result display: 1.5秒]
        B1 --> B2[Fade out: 0.5秒]
        B2 --> C
    end
```

### 解説表示画面

```mermaid
graph TD
    subgraph "Explanation Layout"
        A[Header: Same Progress] --> B[Answer Summary]
        B --> C[Explanation Content]
        C --> D[Related Information]
        D --> E[Next Action Area]
    end
    
    subgraph "Answer Summary (100px)"
        B --> B1[Question Recap]
        B --> B2["問題: 地球は太陽系の第3惑星である。"]
        B --> B3[User Answer vs Correct]
        B --> B4["あなたの回答: ○ | 正解: ○ ✅"]
    end
    
    subgraph "Explanation Content (300px)"
        C --> C1[Main Explanation]
        C --> C2["地球は確かに太陽系の第3惑星です。太陽から数えて水星、金星に続く3番目の惑星で、生命が存在する唯一の惑星として知られています。"]
        C --> C3[Additional Context]
        C --> C4["💡 豆知識: 地球の直径は約12,742kmで、表面の約71%が海で覆われています。"]
    end
    
    subgraph "Related Info (80px)"
        D --> D1[Tags Display]
        D --> D2[#地理 #宇宙 #基礎知識]
        D --> D3[Source Information]
        D --> D4["参考: 国立天文台"]
    end
    
    subgraph "Next Actions (100px)"
        E --> E1[Auto Progress Timer]
        E --> E2["次の問題まで 3秒 ⏱️"]
        E --> E3[Manual Controls]
        E --> E4["[◀ 前の問題] [次の問題 ▶] [一時停止]"]
    end
```

### 代替操作UI（アクセシビリティ）

```mermaid
graph TD
    subgraph "Alternative Controls Layout"
        A[Question Display] --> B[Button Controls]
        B --> C[Keyboard Shortcuts]
    end
    
    subgraph "Button Interface"
        B --> B1[Large Touch Buttons]
        B --> B2["[× 不正解] [○ 正解]"]
        B --> B3["[⏭️ スキップ] [◀ 前の問題]"]
        B --> B4[Minimum 44px touch targets]
    end
    
    subgraph "Keyboard Support"
        C --> C1[Key Mappings]
        C --> C2["← キー: 不正解"]
        C --> C3["→ キー: 正解"]
        C --> C4["↑ キー: スキップ"]
        C --> C5["↓ キー: 前の問題"]
        C --> C6["Space: 次へ"]
        C --> C7["Esc: 終了"]
    end
```

## 状態別表示

### ローディング状態

```mermaid
graph TD
    A[Quiz Loading] --> B{Loading Type}
    B -->|Initial Load| C[First Question Loading]
    B -->|Next Question| D[Question Transition]
    B -->|Data Sync| E[Background Sync]
    
    subgraph "Initial Loading"
        C --> C1["🎯 クイズを準備中..."]
        C --> C2[Progress spinner]
        C --> C3["10問のクイズを読み込んでいます"]
        C --> C4[Quiz metadata display]
    end
    
    subgraph "Question Transition"
        D --> D1[Smooth card transition]
        D --> D2[Next question preload]
        D --> D3[Progress bar update]
        D --> D4[No visible loading]
    end
    
    subgraph "Background Operations"
        E --> E1[Subtle sync indicator]
        E --> E2[Answer data upload]
        E --> E3[Statistics update]
        E --> E4[Non-blocking operation]
    end
```

### エラー状態

```mermaid
graph TD
    A[Error Detection] --> B{Error Type}
    B -->|Network| C[Connection Error]
    B -->|Data| D[Data Error]
    B -->|Application| E[App Error]
    
    subgraph "Connection Error"
        C --> C1["🔌 接続エラー"]
        C --> C2["オフラインモードに切り替えますか？"]
        C --> C3["[オフライン継続] [再接続]"]
        C --> C4[Progress preservation]
    end
    
    subgraph "Data Error"
        D --> D1["📊 データエラー"]
        D --> D2["問題データの読み込みに失敗しました"]
        D --> D3["[再試行] [前の問題に戻る]"]
        D --> D4[Error reporting option]
    end
    
    subgraph "Application Error"
        E --> E1["⚠️ アプリエラー"]
        E --> E2["予期しないエラーが発生しました"]
        E --> E3["[再起動] [サポートに連絡]"]
        E --> E4[State recovery attempt]
    end
```

### 完了状態

```mermaid
graph TD
    A[Quiz Completion] --> B[Results Summary]
    B --> C[Performance Stats]
    C --> D[Next Actions]
    
    subgraph "Completion Screen"
        B --> B1["🎉 お疲れ様でした！"]
        B --> B2["10問のクイズが完了しました"]
        B --> B3[Overall score display]
        B --> B4["正答率: 8/10 (80%)"]
    end
    
    subgraph "Detailed Statistics"
        C --> C1[Performance breakdown]
        C --> C2["正解: 8問 | 不正解: 2問 | スキップ: 0問"]
        C --> C3[Time statistics]
        C --> C4["回答時間: 12分34秒 | 平均: 1分15秒/問"]
        C --> C5[Accuracy by category]
        C --> C6["地理: 100% | 歴史: 60% | 科学: 80%"]
    end
    
    subgraph "Next Action Options"
        D --> D1["🔄 もう一度挑戦"]
        D --> D2["📚 間違えた問題を復習"]
        D --> D3["🎯 新しいクイズに挑戦"]
        D --> D4["📊 詳細な結果を確認"]
        D --> D5["🏠 ホームに戻る"]
    end
```

## インタラクション設計

### スワイプジェスチャー詳細

```mermaid
graph TD
    A[Touch Start] --> B[Gesture Detection]
    B --> C{Gesture Type}
    C -->|Swipe| D[Swipe Processing]
    C -->|Tap| E[Tap Processing]
    C -->|Long Press| F[Context Menu]
    
    subgraph "Swipe Parameters"
        D --> D1[Minimum distance: 50px]
        D --> D2[Maximum time: 300ms]
        D --> D3[Velocity threshold: 0.3px/ms]
        D --> D4[Direction tolerance: ±30°]
    end
    
    subgraph "Visual Feedback"
        D --> D5[Real-time card movement]
        D --> D6[Opacity changes]
        D --> D7[Color overlay]
        D --> D8[Haptic feedback]
    end
    
    subgraph "Gesture Confirmation"
        D --> D9{Threshold Reached?}
        D9 -->|Yes| D10[Execute action]
        D9 -->|No| D11[Return to center]
    end
```

### アニメーション設計

```mermaid
graph TD
    A[Animation System] --> B[Card Animations]
    A --> C[UI Feedback]
    A --> D[Transition Effects]
    
    subgraph "Card Movement"
        B --> B1[Swipe follow: Linear]
        B --> B2[Return spring: Ease-out]
        B --> B3[Exit animation: Ease-in]
        B --> B4[Enter animation: Slide-up]
    end
    
    subgraph "Feedback Animations"
        C --> C1[Success pulse: 300ms]
        C --> C2[Error shake: 200ms]
        C --> C3[Skip fade: 150ms]
        C --> C4[Progress fill: Linear]
    end
    
    subgraph "Screen Transitions"
        D --> D1[Question → Result: Fade]
        D --> D2[Result → Explanation: Slide]
        D --> D3[Explanation → Next: Push]
        D --> D4[Exit transitions: Slide-out]
    end
```

## レスポンシブ対応

### 画面サイズ適応

```mermaid
graph TD
    A[Screen Size Detection] --> B{Device Category}
    B -->|Small Mobile| C[Compact Layout]
    B -->|Standard Mobile| D[Standard Layout]
    B -->|Large Mobile| E[Enhanced Layout]
    
    subgraph "Compact (320-374px)"
        C --> C1[Reduced padding]
        C --> C2[Smaller fonts]
        C --> C3[Compressed header]
        C --> C4[Essential info only]
    end
    
    subgraph "Standard (375-414px)"
        D --> D1[Standard spacing]
        D --> D2[Base font sizes]
        D --> D3[Full header info]
        D --> D4[Complete feature set]
    end
    
    subgraph "Large (415px+)"
        E --> E1[Generous spacing]
        E --> E2[Larger touch targets]
        E --> E3[Enhanced visuals]
        E --> E4[Additional UI elements]
    end
```

### タッチ最適化

```mermaid
graph TD
    A[Touch Optimization] --> B[Target Sizes]
    A --> C[Gesture Areas]
    A --> D[Feedback Systems]
    
    subgraph "Touch Targets"
        B --> B1[Minimum 44px × 44px]
        B --> B2[Button spacing: 8px]
        B --> B3[Swipe area: Full screen]
        B --> B4[Safe areas consideration]
    end
    
    subgraph "Gesture Recognition"
        C --> C1[Swipe sensitivity tuning]
        C --> C2[Accidental touch prevention]
        C --> C3[Multi-touch handling]
        C --> C4[Gesture conflict resolution]
    end
    
    subgraph "Haptic & Audio"
        D --> D1[Success: Strong haptic]
        D --> D2[Error: Double tap haptic]
        D --> D3[Skip: Light haptic]
        D --> D4[Audio feedback optional]
    end
```

## データ表示

### クイズデータ構造

```javascript
interface QuizQuestion {
  id: string;
  question: string;
  correctAnswer: boolean;
  explanation: string;
  tags: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  media?: {
    type: 'image' | 'audio' | 'video';
    url: string;
    altText?: string;
  };
  metadata: {
    createdAt: Date;
    source?: string;
    category: string;
  };
}

interface QuizSession {
  id: string;
  quizId: string;
  questions: QuizQuestion[];
  currentIndex: number;
  answers: Answer[];
  startTime: Date;
  endTime?: Date;
  status: 'active' | 'completed' | 'paused';
}

interface Answer {
  questionId: string;
  userAnswer: boolean | null; // null for skip
  isCorrect: boolean;
  responseTime: number; // milliseconds
  timestamp: Date;
}
```

### 統計データ

```javascript
interface QuizStatistics {
  totalQuestions: number;
  currentQuestion: number;
  correctAnswers: number;
  incorrectAnswers: number;
  skippedAnswers: number;
  averageResponseTime: number;
  totalTime: number;
  accuracyRate: number;
  categoryBreakdown: {
    [category: string]: {
      correct: number;
      total: number;
      accuracy: number;
    };
  };
}
```

## パフォーマンス要件

### アニメーション性能

- **60fps維持**: すべてのアニメーションで60fps達成
- **レスポンス時間**: タッチから反応まで50ms以内
- **メモリ使用**: アニメーション用メモリ管理
- **バッテリー効率**: 効率的なアニメーション実装

### データ処理

- **プリロード**: 次問の事前読み込み
- **キャッシュ**: 回答データの即座保存
- **同期**: バックグラウンドでのデータ同期
- **圧縮**: 効率的なデータ形式

## アクセシビリティ

### スクリーンリーダー対応

```javascript
const ariaLabels = {
  questionCard: `問題 ${currentIndex + 1} / ${totalQuestions}: ${question}`,
  swipeHint: "右にスワイプで正解、左で不正解、上でスキップ",
  progressBar: `進捗 ${Math.round(progress)}%完了`,
  correctAnswer: "正解です",
  incorrectAnswer: "不正解です",
  explanation: `解説: ${explanation}`,
  nextQuestion: "次の問題に進む"
};
```

### 代替操作

- **ボタン操作**: スワイプの代替ボタン提供
- **キーボード**: フルキーボードナビゲーション
- **音声**: 問題・解説の読み上げ対応
- **高コントラスト**: 視覚的配慮モード

## 関連ドキュメント

- [クイズ一覧ページ](quiz-list-page.md)
- [回答履歴ページ](answer-history-page.md)
- [クイズ回答フロー](../2.01_user-flows/quiz-answering-flow.md)

---
**作成工程**: UI設計  
**作成日**: 2025-01-31  
**更新日**: 2025-01-31