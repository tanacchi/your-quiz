# クイズ一覧ページワイヤーフレーム

## 概要

検索・フィルター機能を持つクイズ一覧表示画面のワイヤーフレーム設計です。タグ別絞り込み、検索結果表示、Deck生成機能を提供し、ユーザーが目的のクイズを効率的に見つけられるUI設計を実現します。

## 参照ドキュメント

- [サイトマップ: クイズ一覧画面](../1.01_sitemap.yaml)
- [US-01: クイズ回答UI要件](../1.02_user-stories/us-01_quiz-answering.md)
- [クイズ回答フロー](../2.01_user-flows/quiz-answering-flow.md)

## ワイヤーフレーム設計

### メインレイアウト（検索結果表示）

```mermaid
graph TD
    subgraph "Quiz List Layout (375px)"
        A[Header: 戻る + 検索クエリ] --> B[Search Results Summary]
        B --> C[Filter & Sort Controls]
        C --> D[Active Filters Display]
        D --> E[Quiz Results List]
        E --> F[Load More Button]
        F --> G[Footer Navigation]
    end
    
    subgraph "Header Section (60px)"
        A --> A1[← 戻る]
        A --> A2["🔍 「一般常識」の検索結果"]
        A --> A3[フィルター]
    end
    
    subgraph "Results Summary (40px)"
        B --> B1[23件のクイズが見つかりました]
        B --> B2[Deck生成ボタン]
    end
    
    subgraph "Filter Controls (50px)"
        C --> C1[並び順: 人気順 ▼]
        C --> C2[難易度: すべて ▼]
        C --> C3[問題数: すべて ▼]
    end
    
    subgraph "Active Filters (30px)"
        D --> D1[#一般常識 ×]
        D --> D2[★★☆☆☆以上 ×]
        D --> D3[フィルターをクリア]
    end
    
    subgraph "Quiz List (Auto Height)"
        E --> E1[Search Result Card 1]
        E --> E2[Search Result Card 2]
        E --> E3[Search Result Card 3]
        E --> E4[More Results...]
    end
    
    subgraph "Load More (60px)"
        F --> F1[さらに10件を読み込む]
        F --> F2[Loading Indicator]
    end
    
    subgraph "Footer (60px)"
        G --> G1[Play]
        G --> G2[Create] 
        G --> G3[MyPage]
    end
```

### 検索結果カード詳細

```mermaid
graph TD
    subgraph "Quiz Result Card Layout"
        A[Card Container] --> B[Header Info]
        A --> C[Content Preview]
        A --> D[Statistics Bar]
        A --> E[Action Buttons]
    end
    
    subgraph "Card Header (40px)"
        B --> B1[📚 日本の地理クイズ]
        B --> B2[★★☆☆☆]
        B --> B3[⭐ お気に入り]
    end
    
    subgraph "Content Preview (60px)"
        C --> C1["問題例: 「富士山の標高は？」"]
        C --> C2[20問 • 推定15分]
        C --> C3[#地理 #日本 #初級]
    end
    
    subgraph "Statistics (30px)"
        D --> D1[正答率 82%]
        D --> D2[127人が挑戦]
        D --> D3[3時間前更新]
    end
    
    subgraph "Actions (50px)"
        E --> E1[👁️ プレビュー]
        E --> E2[▶️ 開始]
        E --> E3[📤 共有]
    end
```

### フィルター・ソート画面

```mermaid
graph TD
    subgraph "Filter Modal Layout"
        A[Modal Header] --> B[Quick Filters]
        B --> C[Category Filters]
        C --> D[Difficulty Filters]
        D --> E[Question Count Filters]
        E --> F[Sort Options]
        F --> G[Action Buttons]
    end
    
    subgraph "Modal Header (60px)"
        A --> A1[× 閉じる]
        A --> A2[フィルター設定]
        A --> A3[リセット]
    end
    
    subgraph "Quick Filters (80px)"
        B --> B1["🔥 人気 | 🆕 新着 | ⭐ 高評価"]
        B --> B2["🎯 挑戦中 | 📝 未回答 | ✅ 完了済み"]
    end
    
    subgraph "Category Section (120px)"
        C --> C1[📚 カテゴリー]
        C --> C2["☑️ 一般常識 (45)"]
        C --> C3["☐ 歴史 (23)"]
        C --> C4["☐ 科学 (31)"]
        C --> C5["☐ 地理 (18)"]
    end
    
    subgraph "Difficulty Section (80px)"
        D --> D1[⭐ 難易度]
        D --> D2["☐ ★☆☆☆☆ 入門 (12)"]
        D --> D3["☑️ ★★☆☆☆ 初級 (34)"]
        D --> D4["☐ ★★★☆☆ 中級 (18)"]
    end
    
    subgraph "Question Count (60px)"
        E --> E1[📊 問題数]
        E --> E2["☐ 〜10問 | ☑️ 11〜20問 | ☐ 21問〜"]
    end
    
    subgraph "Sort Options (80px)"
        F --> F1[📈 並び順]
        F --> F2["● 人気順 | ○ 新着順 | ○ 難易度順"]
    end
    
    subgraph "Action Buttons (60px)"
        G --> G1["適用 (23件)"]
        G --> G2[キャンセル]
    end
```

## 状態別表示

### 検索中ローディング

```mermaid
graph TD
    A[検索実行] --> B[ローディング状態]
    B --> C[プログレス表示]
    C --> D[検索完了]
    
    subgraph "Loading State"
        B --> B1["🔍 検索中...<br/>「一般常識」に関するクイズを探しています"]
        B --> B2[検索進捗バー]
        B --> B3[キャンセルボタン]
    end
    
    subgraph "Progress Indicators"
        C --> C1["スケルトンカード表示 (3枚)"]
        C --> C2["shimmer アニメーション"]
        C --> C3["推定残り時間表示"]
    end
    
    subgraph "Completion"
        D --> D1[検索結果表示]
        D --> D2[フィルターオプション表示]
        D --> D3[統計情報更新]
    end
```

### 検索結果なし

```mermaid
graph TD
    A[検索結果0件] --> B[空状態表示]
    B --> C[代替提案]
    C --> D[アクション選択肢]
    
    subgraph "Empty State"
        B --> B1["😅 検索結果が見つかりません"]
        B --> B2["「TypeScript 中級」に該当するクイズはありません"]
        B --> B3[検索のヒント表示]
    end
    
    subgraph "Alternative Suggestions"
        C --> C1["💡 おすすめの検索キーワード:"]
        C --> C2["「TypeScript」「プログラミング」「JavaScript」"]
        C --> C3["関連カテゴリ: IT・プログラミング"]
    end
    
    subgraph "Action Options"
        D --> D1[🔍 検索条件を変更]
        D --> D2[✏️ このクイズを作成]
        D --> D3[🏠 ホームに戻る]
        D --> D4[📚 人気クイズを見る]
    end
```

### Deck生成機能

```mermaid
graph TD
    A[Deck生成ボタン押下] --> B[生成設定画面]
    B --> C[Deck生成処理]
    C --> D[生成完了]
    
    subgraph "Generation Settings"
        B --> B1["📦 Deck生成設定"]
        B --> B2["問題数: 25問 (最大100問)"]
        B --> B3["出題順: ランダム ▼"]
        B --> B4["重複除外: ☑️ 回答済みを除外"]
        B --> B5["[生成開始] [キャンセル]"]
    end
    
    subgraph "Generation Process"
        C --> C1["📦 Deck生成中... (67%)"]
        C --> C2["選択条件に従って問題を収集しています"]
        C --> C3["17/25問を選択完了"]
        C --> C4[進捗バー + 残り時間]
    end
    
    subgraph "Generation Complete"
        D --> D1["✅ Deck生成完了!"]
        D --> D2["25問のクイズDeckが準備できました"]
        D --> D3["推定所要時間: 20分"]
        D --> D4["[今すぐ開始] [後で解く] [設定変更]"]
    end
```

## インタラクション設計

### 検索・フィルター操作

```mermaid
graph TD
    A[ユーザー操作] --> B{操作種別}
    B -->|検索入力| C[リアルタイム検索]
    B -->|フィルター選択| D[条件追加・除去]
    B -->|ソート変更| E[並び順変更]
    B -->|カード操作| F[詳細・アクション]
    
    subgraph "Real-time Search"
        C --> C1[300ms遅延後検索実行]
        C --> C2[検索候補表示]
        C --> C3[検索履歴表示]
        C --> C4[人気検索語表示]
    end
    
    subgraph "Filter Operations"
        D --> D1[フィルター追加時]
        D --> D2[AND条件で絞り込み]
        D --> D3[結果件数リアルタイム更新]
        D --> D4[フィルタークリア機能]
    end
    
    subgraph "Sort Changes"
        E --> E1[人気順 → 評価順]
        E --> E2[新着順 → 日付順]
        E --> E3[難易度順 → レベル別]
        E --> E4[アニメーション付き再配置]
    end
    
    subgraph "Card Interactions"
        F --> F1[タップ → プレビュー]
        F --> F2[長押し → メニュー]
        F --> F3[スワイプ → アクション]
        F --> F4[開始ボタン → クイズ開始]
    end
```

### 無限スクロール

```mermaid
graph TD
    A[スクロール検出] --> B{スクロール位置}
    B -->|底部近く| C[次ページ読み込み判定]
    B -->|中間位置| D[通常スクロール]
    
    C --> E{読み込み可能?}
    E -->|Yes| F[次ページAPI呼び出し]
    E -->|No| G[読み込み完了表示]
    
    F --> H[ローディングインジケーター]
    H --> I[新しいアイテム追加]
    I --> J[スクロール位置維持]
    
    G --> K["📋 全ての結果を表示しました<br/>(${totalCount}件)"]
    
    subgraph "Loading States"
        H --> H1[スピナー表示]
        H --> H2["さらに読み込み中..."]
        H --> H3[スケルトンカード表示]
    end
    
    subgraph "Error Handling"
        L[読み込みエラー] --> M[エラーメッセージ]
        M --> N[再試行ボタン]
        N --> O[手動リトライ]
    end
```

## レスポンシブ対応

### モバイル最適化（375px基準）

```mermaid
graph TD
    A[Mobile Layout Optimization] --> B[Touch Targets]
    A --> C[Content Density]
    A --> D[Navigation]
    A --> E[Performance]
    
    subgraph "Touch Target Optimization"
        B --> B1[カードタップ領域: 最小44px]
        B --> B2[ボタン間隔: 8px以上]
        B --> B3[スワイプジェスチャー対応]
        B --> B4[誤タップ防止マージン]
    end
    
    subgraph "Content Density"
        C --> C1[1カラムレイアウト]
        C --> C2[適切な行間: 1.5em]
        C --> C3[読みやすいフォントサイズ]
        C --> C4[情報の優先度付け]
    end
    
    subgraph "Mobile Navigation"
        D --> D1[粘着ヘッダー]
        D --> D2[底部固定ナビゲーション]
        D --> D3[戻るボタン配置]
        D --> D4[ブレッドクラム省略]
    end
    
    subgraph "Performance Optimization"
        E --> E1[画像遅延読み込み]
        E --> E2[仮想スクロール]
        E --> E3[APIレスポンス最適化]
        E --> E4[キャッシュ活用]
    end
```

## データ表示

### 検索結果データ構造

```javascript
interface SearchResult {
  query: string;
  totalCount: number;
  filteredCount: number;
  page: number;
  hasMore: boolean;
  quizzes: Quiz[];
  appliedFilters: Filter[];
  sortOrder: SortOption;
  searchTime: number; // ms
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  tags: string[];
  statistics: {
    averageScore: number;
    attemptCount: number;
    completionTime: number;
  };
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    approvalStatus: 'approved' | 'pending' | 'rejected';
  };
}
```

### フィルターオプション

```javascript
interface FilterOptions {
  categories: {
    id: string;
    name: string;
    count: number;
    selected: boolean;
  }[];
  
  difficulty: {
    level: number;
    label: string;
    count: number;
    selected: boolean;
  }[];
  
  questionCount: {
    range: string;
    min: number;
    max: number;
    count: number;
    selected: boolean;
  }[];
  
  sortOptions: {
    value: string;
    label: string;
    selected: boolean;
  }[];
}
```

## パフォーマンス要件

### レスポンス時間

- **検索実行**: ≤ 500ms
- **フィルター適用**: ≤ 300ms
- **ソート変更**: ≤ 200ms
- **ページング**: ≤ 400ms
- **Deck生成**: ≤ 2000ms

### メモリ効率

- **仮想スクロール**: 50アイテム表示上限
- **画像最適化**: WebP + 適切なサイズ
- **キャッシュ管理**: 検索結果10件まで保持
- **メモリリーク防止**: コンポーネント破棄時クリーンアップ

## アクセシビリティ

### スクリーンリーダー対応

```javascript
const ariaLabels = {
  searchResults: `${totalCount}件のクイズが見つかりました`,
  quizCard: `${title}、${questionCount}問、難易度${difficulty}、正答率${averageScore}%`,
  filterButton: "検索条件を絞り込む",
  sortButton: "並び順を変更",
  loadMore: "さらにクイズを読み込む",
  deckGenerate: "選択したクイズでDeckを生成"
};
```

### キーボードナビゲーション

- **Tab順序**: 論理的なフォーカス移動
- **Enter/Space**: ボタン・リンクの実行
- **Escape**: モーダル・フィルターの閉じる
- **矢印キー**: リスト内ナビゲーション

## 関連ドキュメント

- [ホームページ](home-page.md)
- [クイズ回答ページ](quiz-answer-page.md)
- [クイズ回答フロー](../2.01_user-flows/quiz-answering-flow.md)

---
**作成工程**: UI設計  
**作成日**: 2025-01-31  
**更新日**: 2025-01-31
