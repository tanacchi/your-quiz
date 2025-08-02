# 回答履歴ページワイヤーフレーム

## 概要

ユーザーの過去の回答履歴を確認・復習できるMyPageタブの中心機能画面のワイヤーフレーム設計です。統計表示、履歴一覧、間違い問題集機能、詳細分析を提供し、効果的な学習復習体験を実現します。

## 参照ドキュメント

- [US-04: 回答履歴UI要件](../1.02_user-stories/us-04_answer-history.md)
- [サイトマップ: 回答履歴画面](../1.01_sitemap.yaml)
- [MyPage関連フロー](../2.01_user-flows/quiz-answering-flow.md)

## ワイヤーフレーム設計

### メイン履歴一覧画面

```mermaid
graph TD
    subgraph "Answer History Layout (375px)"
        A[Header: Title + Search] --> B[Statistics Summary]
        B --> C[Filter Controls]
        C --> D[History List]
        D --> E[Load More]
        E --> F[Footer Navigation]
    end
    
    subgraph "Header Section (60px)"
        A --> A1[← 戻る]
        A --> A2["📊 回答履歴"]
        A --> A3[🔍 検索]
        A --> A4[⚙️ 設定]
    end
    
    subgraph "Statistics Bar (120px)"
        B --> B1[Quick Stats Grid]
        B --> B2["📈 総回答数: 156問"]
        B --> B3["🎯 平均正答率: 78%"]
        B --> B4["🔥 連続回答: 7日"]
        B --> B5["⏱️ 総学習時間: 2時間34分"]
    end
    
    subgraph "Filter Section (50px)"
        C --> C1[Period Filter]
        C --> C2["[今日] [今週] [今月] [全期間]"]
        C --> C3[Sort Options]
        C --> C4["並び順: 日付新しい順 ▼"]
    end
    
    subgraph "History List (Auto Height)"
        D --> D1[History Item 1]
        D --> D2[History Item 2]
        D --> D3[History Item 3]
        D --> D4[More items...]
    end
    
    subgraph "Load More (60px)"
        E --> E1["さらに10件を表示"]
        E --> E2[Loading indicator]
    end
    
    subgraph "Footer (60px)"
        F --> F1[Play]
        F --> F2[Create]
        F --> F3["MyPage (Active)"]
    end
```

### 履歴アイテム詳細デザイン

```mermaid
graph TD
    subgraph "History Item Card Layout"
        A[Card Container] --> B[Header Info]
        A --> C[Quiz Summary]
        A --> D[Performance Stats]
        A --> E[Action Buttons]
    end
    
    subgraph "Item Header (50px)"
        B --> B1["📅 2025/01/31 14:32"]
        B --> B2["🏷️ 一般常識・地理"]
        B --> B3["⭐ お気に入り"]
    end
    
    subgraph "Quiz Summary (80px)"
        C --> C1["📚 日本の都道府県クイズ"]
        C --> C2["20問完了 • 推定15分"]
        C --> C3["✅ 17問正解 • ❌ 3問不正解"]
        C --> C4["🎯 正答率: 85%"]
        C --> C5["⏱️ 回答時間: 12分34秒"]
    end
    
    subgraph "Performance Details (60px)"
        D --> D1[Accuracy by Category]
        D --> D2["地理: 90% | 歴史: 80% | 文化: 75%"]
        D --> D3[Response Time]
        D --> D4["平均: 37秒/問 | 最速: 8秒 | 最遅: 1分23秒"]
    end
    
    subgraph "Action Controls (50px)"
        E --> E1["👁️ 詳細確認"]
        E --> E2["🔄 再挑戦"]
        E --> E3["📝 間違い復習"]
        E --> E4["📤 共有"]
    end
```

### 詳細確認画面

```mermaid
graph TD
    subgraph "History Detail Screen"
        A[Header: Detail View] --> B[Session Overview]
        B --> C[Question by Question]
        C --> D[Statistics Charts]
        D --> E[Improvement Actions]
    end
    
    subgraph "Detail Header (60px)"
        A --> A1[← 履歴一覧]
        A --> A2["📊 詳細結果"]
        A --> A3["📤 共有"]
    end
    
    subgraph "Session Info (120px)"
        B --> B1["📚 日本の都道府県クイズ"]
        B --> B2["実施日時: 2025/01/31 14:32"]
        B --> B3["所要時間: 12分34秒 (目標: 15分)"]
        B --> B4["最終結果: 17/20問正解 (85%)"]
        B --> B5[Performance badges]
    end
    
    subgraph "Question Details (Auto Height)"
        C --> C1[Expandable Question List]
        C --> C2["Q1: ✅ 東京都の都庁所在地は？ (5秒)"]
        C --> C3["Q2: ❌ 沖縄県の県庁所在地は？ (45秒)"]
        C --> C4["    → あなたの回答: 沖縄市"]
        C --> C5["    → 正解: 那覇市"]
        C --> C6["    → 解説: 那覇市は沖縄県の県庁所在地で..."]
        C --> C7[More questions...]
    end
    
    subgraph "Visual Statistics (200px)"
        D --> D1[Accuracy Chart]
        D --> D2[Response Time Graph]
        D --> D3[Category Breakdown]
        D --> D4[Progress Trend]
    end
    
    subgraph "Actions (80px)"
        E --> E1["🔄 このクイズを再挑戦"]
        E --> E2["📝 間違えた問題のみ復習"]
        E --> E3["🎯 類似クイズに挑戦"]
        E --> E4["🏠 ホームに戻る"]
    end
```

### 間違い問題集画面

```mermaid
graph TD
    subgraph "Wrong Questions Collection"
        A[Header: Review Mode] --> B[Collection Overview]
        B --> C[Mastery Progress]
        C --> D[Question List]
        D --> E[Study Actions]
    end
    
    subgraph "Review Header (60px)"
        A --> A1[← 履歴詳細]
        A --> A2["📝 間違い問題集"]
        A --> A3["🎯 復習開始"]
    end
    
    subgraph "Collection Info (100px)"
        B --> B1["📚 復習対象の間違い問題"]
        B --> B2["対象期間: 過去30日"]
        B --> B3["総問題数: 12問"]
        B --> B4["習得済み: 4問 | 学習中: 8問"]
        B --> B5[Overall progress bar]
    end
    
    subgraph "Mastery Tracking (80px)"
        C --> C1[Mastery Status Legend]
        C --> C2["🔴 未習得 | 🟡 学習中 | 🟢 習得済み"]
        C --> C3[Learning curve visualization]
    end
    
    subgraph "Question List (Auto Height)"
        D --> D1[Wrong Question Item 1]
        D --> D2["🔴 Q: 沖縄県の県庁所在地は？"]
        D --> D3["   初回不正解: 2025/01/31"]
        D --> D4["   復習回数: 2回 | 正解率: 0%"]
        D --> D5[More wrong questions...]
    end
    
    subgraph "Study Options (100px)"
        E --> E1["🎯 全問題を復習 (12問)"]
        E --> E2["🔴 未習得のみ復習 (8問)"]
        E --> E3["🔀 ランダム順で復習"]
        E --> E4["📊 習得状況を確認"]
    end
```

### 統計分析画面

```mermaid
graph TD
    subgraph "Statistics Analysis Screen"
        A[Header: Analytics] --> B[Time Period Selector]
        B --> C[Key Metrics]
        C --> D[Performance Charts]
        D --> E[Category Analysis]
        E --> F[Trends & Insights]
    end
    
    subgraph "Analytics Header (60px)"
        A --> A1[← 履歴一覧]
        A --> A2["📈 学習分析"]
        A --> A3["📊 詳細表示"]
    end
    
    subgraph "Period Selection (50px)"
        B --> B1["[7日] [30日] [3ヶ月] [全期間]"]
        B --> B2[Date range picker]
    end
    
    subgraph "Key Performance (120px)"
        C --> C1[Metrics Grid Layout]
        C --> C2["🎯 総正答率: 78% (+5%)"]
        C --> C3["⚡ 平均回答時間: 42秒 (-8秒)"]
        C --> C4["🔥 最長連続正解: 23問"]
        C --> C5["📈 今週の成長: +12%"]
        C --> C6[Trend indicators]
    end
    
    subgraph "Visual Charts (300px)"
        D --> D1[Accuracy Over Time]
        D --> D2[Line chart: Daily accuracy]
        D --> D3[Response Time Trends]
        D --> D4[Average response time graph]
        D --> D5[Activity Heatmap]
        D --> D6[Study frequency calendar]
    end
    
    subgraph "Category Breakdown (150px)"
        E --> E1[Subject Performance]
        E --> E2["🌍 地理: 85% (優秀)"]
        E --> E3["📚 歴史: 72% (普通)"]
        E --> E4["🔬 科学: 65% (要改善)"]
        E --> E5[Radar chart visualization]
    end
    
    subgraph "Insights & Recommendations (100px)"
        F --> F1["💡 学習のコツ:"]
        F --> F2["• 科学分野の復習を重点的に"]
        F --> F3["• 平日の正答率が高い傾向"]
        F --> F4["• 短時間集中学習が効果的"]
        F --> F5["🎯 おすすめアクション"]
    end
```

## 状態別表示

### 履歴なし（初回利用）

```mermaid
graph TD
    A[Empty History State] --> B[Welcome Message]
    B --> C[Getting Started Guide]
    C --> D[Action Suggestions]
    
    subgraph "Empty State Display"
        B --> B1["📊 まだ履歴がありません"]
        B --> B2["クイズに挑戦して学習履歴を作りましょう！"]
        B --> B3[Friendly illustration]
    end
    
    subgraph "Onboarding Guide"
        C --> C1["🎯 学習履歴でできること:"]
        C --> C2["• 回答パフォーマンスの確認"]
        C --> C3["• 間違えた問題の復習"]
        C --> C4["• 学習進捗の可視化"]
        C --> C5["• カテゴリ別の習熟度分析"]
    end
    
    subgraph "Suggested Actions"
        D --> D1["🎮 最初のクイズに挑戦"]
        D --> D2["📚 人気のクイズを見る"]
        D --> D3["🏷️ カテゴリ別クイズを探す"]
        D --> D4["✏️ 自分でクイズを作成"]
    end
```

### データ読み込み中

```mermaid
graph TD
    A[Loading State] --> B[Skeleton Layout]
    B --> C[Progress Indicators]
    C --> D[Loading Messages]
    
    subgraph "Skeleton Display"
        B --> B1[Header skeleton]
        B --> B2[Stats bar skeleton]
        B --> B3[List item skeletons]
        B --> B4[Shimmer animation]
    end
    
    subgraph "Progress Feedback"
        C --> C1["📊 履歴を読み込み中..."]
        C --> C2[Progress spinner]
        C --> C3["156件の履歴を処理中"]
    end
    
    subgraph "Loading Context"
        D --> D1[Estimated time remaining]
        D --> D2[Background sync status]
        D --> D3[Cancel option]
    end
```

### エラー状態

```mermaid
graph TD
    A[Error States] --> B{Error Type}
    B -->|Network| C[Connection Error]
    B -->|Data| D[Data Error]
    B -->|Storage| E[Storage Error]
    
    subgraph "Network Issues"
        C --> C1["🔌 接続エラー"]
        C --> C2["履歴データを取得できません"]
        C --> C3["[再試行] [オフライン表示]"]
    end
    
    subgraph "Data Issues"
        D --> D1["📊 データエラー"]
        D --> D2["履歴データが破損している可能性があります"]
        D --> D3["[データ修復] [サポートに連絡]"]
    end
    
    subgraph "Storage Issues"
        E --> E1["💾 ストレージエラー"]
        E --> E2["ローカルデータにアクセスできません"]
        E --> E3["[設定確認] [再起動]"]
    end
```

## インタラクション設計

### リスト操作

```mermaid
graph TD
    A[List Interactions] --> B[Touch Gestures]
    A --> C[Context Actions]
    A --> D[Batch Operations]
    
    subgraph "Touch Interactions"
        B --> B1[Tap: 詳細表示]
        B --> B2[Long press: Context menu]
        B --> B3[Swipe right: 再挑戦]
        B --> B4[Swipe left: 削除]
    end
    
    subgraph "Context Menu"
        C --> C1[詳細を確認]
        C --> C2[再挑戦]
        C --> C3[間違い復習]
        C --> C4[お気に入り追加/削除]
        C --> C5[共有]
        C --> C6[削除]
    end
    
    subgraph "Batch Actions"
        D --> D1[Multiple selection]
        D --> D2[Select all/none]
        D --> D3[Bulk delete]
        D --> D4[Bulk export]
    end
```

### フィルタリング・検索

```mermaid
graph TD
    A[Filter & Search] --> B[Time Filters]
    A --> C[Category Filters]
    A --> D[Performance Filters]
    A --> E[Text Search]
    
    subgraph "Time Period"
        B --> B1[Today/Week/Month/All]
        B --> B2[Custom date range]
        B --> B3[Relative periods]
    end
    
    subgraph "Category Selection"
        C --> C1[Subject categories]
        C --> C2[Tag-based filtering]
        C --> C3[Quiz type filtering]
    end
    
    subgraph "Performance Criteria"
        D --> D1[Accuracy range]
        D --> D2[Response time range]
        D --> D3[Completion status]
    end
    
    subgraph "Search Functionality"
        E --> E1[Quiz title search]
        E --> E2[Question content search]
        E --> E3[Tag search]
        E --> E4[Auto-suggestions]
    end
```

## データ表示

### 履歴データ構造

```javascript
interface AnswerHistoryItem {
  id: string;
  quizId: string;
  title: string;
  category: string;
  tags: string[];
  
  // Session info
  startTime: Date;
  endTime: Date;
  duration: number; // seconds
  
  // Performance
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  skippedAnswers: number;
  accuracyRate: number;
  
  // Detailed answers
  answers: AnswerDetail[];
  
  // Analysis
  averageResponseTime: number;
  categoryBreakdown: CategoryStats[];
  improvementAreas: string[];
}

interface AnswerDetail {
  questionId: string;
  question: string;
  userAnswer: boolean | null;
  correctAnswer: boolean;
  isCorrect: boolean;
  responseTime: number;
  explanation?: string;
}

interface CategoryStats {
  category: string;
  correct: number;
  total: number;
  accuracy: number;
}
```

### 統計計算

```javascript
interface LearningStatistics {
  // Overall stats
  totalSessions: number;
  totalQuestions: number;
  totalTime: number;
  overallAccuracy: number;
  
  // Trends
  accuracyTrend: TrendData[];
  responseTimeTrend: TrendData[];
  activityPattern: ActivityData[];
  
  // Performance by category
  categoryPerformance: CategoryPerformance[];
  
  // Achievements
  streaks: StreakData;
  personalBests: PersonalBestData;
  
  // Learning insights
  strengths: string[];
  improvementAreas: string[];
  recommendations: string[];
}
```

## レスポンシブ対応

### モバイル最適化

```mermaid
graph TD
    A[Mobile Optimization] --> B[Compact Layout]
    A --> C[Touch-Friendly Design]
    A --> D[Performance Optimization]
    
    subgraph "Layout Adaptation"
        B --> B1[Single column design]
        B --> B2[Collapsible sections]
        B --> B3[Priority-based content]
        B --> B4[Infinite scroll]
    end
    
    subgraph "Touch Interface"
        C --> C1[Large tap targets]
        C --> C2[Swipe gestures]
        C --> C3[Pull-to-refresh]
        C --> C4[Haptic feedback]
    end
    
    subgraph "Performance Features"
        D --> D1[Virtual scrolling]
        D --> D2[Lazy loading]
        D --> D3[Image optimization]
        D --> D4[Efficient rendering]
    end
```

## パフォーマンス要件

### データ処理

- **初期読み込み**: ≤ 1000ms
- **フィルター適用**: ≤ 300ms
- **詳細表示**: ≤ 500ms
- **統計計算**: ≤ 800ms
- **検索実行**: ≤ 400ms

### メモリ効率

- **仮想スクロール**: 50アイテム表示制限
- **画像最適化**: 遅延読み込み・WebP形式
- **データキャッシュ**: 効率的なキャッシュ戦略
- **メモリリーク防止**: 適切なクリーンアップ

## アクセシビリティ

### スクリーンリーダー対応

```javascript
const ariaLabels = {
  historyList: `${totalItems}件の回答履歴`,
  historyItem: `${date}、${title}、正答率${accuracy}%、${duration}`,
  statisticsChart: "学習統計グラフ",
  filterButton: "履歴をフィルター",
  sortButton: "並び順を変更",
  detailButton: "詳細を確認",
  retryButton: "再挑戦",
  wrongQuestions: `間違えた問題${count}件を復習`,
};
```

### キーボードナビゲーション

- **Tab移動**: 論理的なフォーカス順序
- **Enter/Space**: アクション実行
- **Arrow keys**: リスト内ナビゲーション
- **Escape**: モーダル・メニューを閉じる

## 関連ドキュメント

- [ホームページ](home-page.md)
- [クイズ回答ページ](quiz-answer-page.md)
- [US-04: 回答履歴UI要件](../1.02_user-stories/us-04_answer-history.md)

---
**作成工程**: UI設計  
**作成日**: 2025-01-31  
**更新日**: 2025-01-31
