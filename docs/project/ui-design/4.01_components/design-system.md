# デザインシステム定義

## 概要

Your Quizアプリの統一されたユーザー体験を実現するためのデザインシステム定義です。カラーパレット、タイポグラフィ、スペーシング、コンポーネントの視覚的スタイルガイドラインを定義し、実装時の一貫性を保証します。

## 参照ドキュメント

- [コンポーネント一覧](component-inventory.md)
- [ワイヤーフレーム設計](../3.01_wireframes/)
- [UI設計ガイドライン](../../../instructions/shared/workflow/04.01_ui-design.md)

## デザイン原則

### 1. 直感性（Intuitive）
- スワイプジェスチャーによる直感的な操作
- 既存のUIパターンを活用した学習コストの削減
- 明確な視覚的フィードバックの提供

### 2. 包括性（Inclusive）
- WCAG 2.1 AA準拠のアクセシビリティ
- 色覚多様性への配慮
- 文字サイズ・コントラスト比の最適化

### 3. 一貫性（Consistent）
- 統一されたカラーパレット・タイポグラフィ
- 予測可能なインタラクションパターン
- プラットフォーム間での体験統一

### 4. 効率性（Efficient）
- 最小限のタップ・スワイプで目標達成
- 高速な応答性（≤100ms）
- 軽量な実装（バンドルサイズ最適化）

## カラーシステム

### メインカラーパレット

```scss
// Primary Colors（メインアクション）
$primary-50: #eff6ff;
$primary-100: #dbeafe;
$primary-200: #bfdbfe;
$primary-300: #93c5fd;
$primary-400: #60a5fa;
$primary-500: #3b82f6; // メインブランドカラー
$primary-600: #2563eb;
$primary-700: #1d4ed8;
$primary-800: #1e40af;
$primary-900: #1e3a8a;

// Secondary Colors（サブアクション）
$secondary-50: #f9fafb;
$secondary-100: #f3f4f6;
$secondary-200: #e5e7eb;
$secondary-300: #d1d5db;
$secondary-400: #9ca3af;
$secondary-500: #6b7280; // セカンダリカラー
$secondary-600: #4b5563;
$secondary-700: #374151;
$secondary-800: #1f2937;
$secondary-900: #111827;
```

### セマンティックカラー

```scss
// Success Colors（正解・成功）
$success-50: #f0fdf4;
$success-100: #dcfce7;
$success-200: #bbf7d0;
$success-300: #86efac;
$success-400: #4ade80;
$success-500: #22c55e; // 正解色
$success-600: #16a34a;
$success-700: #15803d;
$success-800: #166534;
$success-900: #14532d;

// Error Colors（不正解・エラー）
$error-50: #fef2f2;
$error-100: #fee2e2;
$error-200: #fecaca;
$error-300: #fca5a5;
$error-400: #f87171;
$error-500: #ef4444; // 不正解色
$error-600: #dc2626;
$error-700: #b91c1c;
$error-800: #991b1b;
$error-900: #7f1d1d;

// Warning Colors（警告・スキップ）
$warning-50: #fffbeb;
$warning-100: #fef3c7;
$warning-200: #fde68a;
$warning-300: #fcd34d;
$warning-400: #fbbf24;
$warning-500: #f59e0b; // 警告色
$warning-600: #d97706;
$warning-700: #b45309;
$warning-800: #92400e;
$warning-900: #78350f;

// Info Colors（情報・中性）
$info-50: #f0f9ff;
$info-100: #e0f2fe;
$info-200: #bae6fd;
$info-300: #7dd3fc;
$info-400: #38bdf8;
$info-500: #0ea5e9; // 情報色
$info-600: #0284c7;
$info-700: #0369a1;
$info-800: #075985;
$info-900: #0c4a6e;
```

### カラー使用ガイドライン

```scss
// UI要素別カラー定義
$colors: (
  // ボタン
  button-primary: $primary-500,
  button-primary-hover: $primary-600,
  button-secondary: $secondary-500,
  button-secondary-hover: $secondary-600,
  button-success: $success-500,
  button-success-hover: $success-600,
  button-danger: $error-500,
  button-danger-hover: $error-600,
  
  // テキスト
  text-primary: $secondary-900,
  text-secondary: $secondary-600,
  text-tertiary: $secondary-400,
  text-inverse: #ffffff,
  text-success: $success-700,
  text-error: $error-700,
  text-warning: $warning-700,
  
  // 背景
  bg-primary: #ffffff,
  bg-secondary: $secondary-50,
  bg-tertiary: $secondary-100,
  bg-overlay: rgba(0, 0, 0, 0.5),
  bg-success: $success-50,
  bg-error: $error-50,
  bg-warning: $warning-50,
  
  // ボーダー
  border-primary: $secondary-200,
  border-secondary: $secondary-300,
  border-focus: $primary-500,
  border-success: $success-300,
  border-error: $error-300,
  border-warning: $warning-300,
);
```

## タイポグラフィ

### フォントファミリー

```scss
// フォントスタック定義
$font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
$font-mono: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace;

// 日本語対応フォント
$font-japanese: 'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Yu Gothic Medium', 'Meiryo', sans-serif;

// メインフォント（英語・日本語ハイブリッド）
$font-primary: 'Inter', 'Noto Sans JP', -apple-system, BlinkMacSystemFont, sans-serif;
```

### タイポグラフィスケール

```scss
// フォントサイズ・行間定義
$typography: (
  // 見出し系
  h1: (
    size: 2rem,      // 32px
    weight: 700,
    line-height: 1.2,
    letter-spacing: -0.025em
  ),
  h2: (
    size: 1.5rem,    // 24px
    weight: 600,
    line-height: 1.3,
    letter-spacing: -0.025em
  ),
  h3: (
    size: 1.25rem,   // 20px
    weight: 600,
    line-height: 1.4,
    letter-spacing: -0.025em
  ),
  
  // 本文系
  body-lg: (
    size: 1.125rem,  // 18px
    weight: 400,
    line-height: 1.6
  ),
  body: (
    size: 1rem,      // 16px
    weight: 400,
    line-height: 1.5
  ),
  body-sm: (
    size: 0.875rem,  // 14px
    weight: 400,
    line-height: 1.5
  ),
  
  // UI系
  button: (
    size: 1rem,      // 16px
    weight: 500,
    line-height: 1.2
  ),
  label: (
    size: 0.875rem,  // 14px
    weight: 500,
    line-height: 1.4
  ),
  caption: (
    size: 0.75rem,   // 12px
    weight: 400,
    line-height: 1.4
  )
);
```

### レスポンシブタイポグラフィ

```scss
// 画面サイズ別フォントサイズ調整
@media (max-width: 374px) {
  .text-h1 { font-size: 1.75rem; } // 28px
  .text-h2 { font-size: 1.375rem; } // 22px
  .text-h3 { font-size: 1.125rem; } // 18px
}

@media (min-width: 415px) {
  .text-h1 { font-size: 2.25rem; } // 36px
  .text-h2 { font-size: 1.625rem; } // 26px
  .text-h3 { font-size: 1.375rem; } // 22px
}
```

## スペーシングシステム

### スペーシングスケール

```scss
// 8px基準のスペーシングスケール
$spacing: (
  0: 0,
  1: 0.25rem,  // 4px
  2: 0.5rem,   // 8px
  3: 0.75rem,  // 12px
  4: 1rem,     // 16px
  5: 1.25rem,  // 20px
  6: 1.5rem,   // 24px
  8: 2rem,     // 32px
  10: 2.5rem,  // 40px
  12: 3rem,    // 48px
  16: 4rem,    // 64px
  20: 5rem,    // 80px
  24: 6rem,    // 96px
);
```

### コンポーネント別スペーシング

```scss
// 共通スペーシングパターン
$component-spacing: (
  // 内部余白
  padding-xs: $spacing-2,    // 8px
  padding-sm: $spacing-3,    // 12px
  padding-md: $spacing-4,    // 16px
  padding-lg: $spacing-6,    // 24px
  padding-xl: $spacing-8,    // 32px
  
  // 外部余白
  margin-xs: $spacing-2,     // 8px
  margin-sm: $spacing-3,     // 12px
  margin-md: $spacing-4,     // 16px
  margin-lg: $spacing-6,     // 24px
  margin-xl: $spacing-8,     // 32px
  
  // 要素間間隔
  gap-xs: $spacing-1,        // 4px
  gap-sm: $spacing-2,        // 8px
  gap-md: $spacing-4,        // 16px
  gap-lg: $spacing-6,        // 24px
  gap-xl: $spacing-8,        // 32px
);
```

## レイアウトシステム

### ブレークポイント

```scss
$breakpoints: (
  xs: 0,
  sm: 375px,   // 標準モバイル
  md: 414px,   // 大型モバイル
  lg: 768px,   // タブレット（対応予定なし）
  xl: 1024px,  // デスクトップ（対応予定なし）
);
```

### グリッドシステム

```scss
// 375px基準のグリッドシステム
$grid: (
  container-padding: 16px,
  column-gap: 16px,
  max-width: 375px,
  
  // カード幅計算例
  card-full: calc(100% - 32px),        // フルワイド - パディング
  card-half: calc(50% - 24px),         // 半分 - ガップ調整
  card-third: calc(33.333% - 21px),    // 1/3 - ガップ調整
);
```

## コンポーネントスタイル

### ボタンシステム

```scss
// ベースボタンスタイル
.btn-base {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: $font-primary;
  font-weight: 500;
  line-height: 1.2;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  min-height: 44px; // アクセシビリティ最小サイズ
  
  // フォーカス状態
  &:focus-visible {
    outline: 2px solid $primary-500;
    outline-offset: 2px;
  }
  
  // 無効状態
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
}

// サイズバリエーション
.btn-sm {
  padding: 8px 16px;
  font-size: 0.875rem;
  min-height: 36px;
}

.btn-md {
  padding: 12px 20px;
  font-size: 1rem;
  min-height: 44px;
}

.btn-lg {
  padding: 16px 24px;
  font-size: 1.125rem;
  min-height: 52px;
}

// カラーバリエーション
.btn-primary {
  background-color: $primary-500;
  color: white;
  
  &:hover:not(:disabled) {
    background-color: $primary-600;
  }
  
  &:active {
    background-color: $primary-700;
  }
}

.btn-secondary {
  background-color: $secondary-100;
  color: $secondary-700;
  
  &:hover:not(:disabled) {
    background-color: $secondary-200;
  }
}

.btn-success {
  background-color: $success-500;
  color: white;
  
  &:hover:not(:disabled) {
    background-color: $success-600;
  }
}

.btn-danger {
  background-color: $error-500;
  color: white;
  
  &:hover:not(:disabled) {
    background-color: $error-600;
  }
}
```

### カードシステム

```scss
// ベースカードスタイル
.card-base {
  background-color: white;
  border-radius: 12px;
  border: 1px solid $secondary-200;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
  
  // ホバー状態
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
  
  // アクティブ状態
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  }
}

// カードバリエーション
.card-elevated {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
}

.card-flat {
  box-shadow: none;
  border: 1px solid $secondary-200;
}

.card-quiz {
  padding: 20px;
  margin-bottom: 16px;
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
  }
  
  .card-content {
    margin-bottom: 16px;
  }
  
  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
```

### 入力フィールドシステム

```scss
// ベース入力フィールド
.input-base {
  width: 100%;
  font-family: $font-primary;
  font-size: 1rem;
  line-height: 1.5;
  padding: 12px 16px;
  border: 1px solid $secondary-300;
  border-radius: 8px;
  background-color: white;
  transition: all 0.15s ease-in-out;
  
  // フォーカス状態
  &:focus {
    outline: none;
    border-color: $primary-500;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  // エラー状態
  &.error {
    border-color: $error-500;
    
    &:focus {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
  }
  
  // 成功状態
  &.success {
    border-color: $success-500;
    
    &:focus {
      box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
    }
  }
  
  // プレースホルダー
  &::placeholder {
    color: $secondary-400;
  }
}

// テキストエリア
.textarea-base {
  @extend .input-base;
  min-height: 120px;
  resize: vertical;
}

// ラベル
.label-base {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: $secondary-700;
  margin-bottom: 6px;
  
  &.required::after {
    content: ' *';
    color: $error-500;
  }
}
```

## アニメーションシステム

### イージング関数

```scss
// カスタムイージング関数
$easing: (
  linear: linear,
  ease: ease,
  ease-in: cubic-bezier(0.4, 0, 1, 1),
  ease-out: cubic-bezier(0, 0, 0.2, 1),
  ease-in-out: cubic-bezier(0.4, 0, 0.2, 1),
  
  // カスタムイージング
  bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55),
  spring: cubic-bezier(0.175, 0.885, 0.32, 1.275),
  smooth: cubic-bezier(0.23, 1, 0.32, 1),
);
```

### アニメーション持続時間

```scss
$duration: (
  instant: 0ms,
  fast: 100ms,
  normal: 200ms,
  slow: 300ms,
  slower: 500ms,
  
  // 特定用途
  tooltip: 150ms,
  modal: 250ms,
  page-transition: 300ms,
);
```

### 共通アニメーション

```scss
// フェードイン・アウト
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

// スライドアニメーション
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// スケールアニメーション
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

// シェイクアニメーション（エラー時）
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

// パルスアニメーション（成功時）
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
```

### アニメーションクラス

```scss
// 共通アニメーションクラス
.animate-fade-in {
  animation: fadeIn $duration-normal $easing-ease-out;
}

.animate-slide-up {
  animation: slideInUp $duration-normal $easing-ease-out;
}

.animate-scale-in {
  animation: scaleIn $duration-fast $easing-ease-out;
}

.animate-shake {
  animation: shake $duration-slow $easing-ease-in-out;
}

.animate-pulse {
  animation: pulse $duration-normal $easing-ease-in-out;
}

// トランジション用ユーティリティ
.transition-all {
  transition: all $duration-normal $easing-ease-in-out;
}

.transition-colors {
  transition: background-color $duration-normal $easing-ease-in-out,
              border-color $duration-normal $easing-ease-in-out,
              color $duration-normal $easing-ease-in-out;
}

.transition-transform {
  transition: transform $duration-normal $easing-ease-in-out;
}
```

## アクセシビリティ

### カラーコントラスト

```scss
// WCAG 2.1 AA準拠のコントラスト比
$contrast-ratios: (
  // 通常テキスト: 4.5:1以上
  text-on-primary: white,        // 4.5:1
  text-on-secondary: white,      // 4.5:1
  text-on-success: white,        // 4.5:1
  text-on-error: white,          // 4.5:1
  
  // 大きなテキスト: 3:1以上
  heading-on-light: $secondary-900,  // 16.8:1
  heading-on-dark: white,            // 16.8:1
  
  // UIコンポーネント: 3:1以上
  border-focus: $primary-500,        // 3.1:1
  disabled-text: $secondary-400,     // 4.5:1
);
```

### フォーカス表示

```scss
// キーボードナビゲーション用フォーカス
.focus-visible {
  &:focus-visible {
    outline: 2px solid $primary-500;
    outline-offset: 2px;
    border-radius: 4px;
  }
}

// 高コントラストモード対応
@media (prefers-contrast: high) {
  .btn-primary {
    border: 2px solid $primary-700;
  }
  
  .card-base {
    border: 2px solid $secondary-400;
  }
  
  .input-base {
    border: 2px solid $secondary-500;
  }
}
```

### 動きの配慮

```scss
// 動きを抑制する設定への対応
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## ダークモード対応

### ダークモードカラーパレット

```scss
// ダークモード用カラー定義
$dark-colors: (
  // 背景
  bg-primary: #111827,
  bg-secondary: #1f2937,
  bg-tertiary: #374151,
  
  // テキスト
  text-primary: #f9fafb,
  text-secondary: #d1d5db,
  text-tertiary: #9ca3af,
  
  // ボーダー
  border-primary: #374151,
  border-secondary: #4b5563,
  
  // カード
  card-bg: #1f2937,
  card-border: #374151,
);

// ダークモード適用
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #{map-get($dark-colors, bg-primary)};
    --bg-secondary: #{map-get($dark-colors, bg-secondary)};
    --text-primary: #{map-get($dark-colors, text-primary)};
    --text-secondary: #{map-get($dark-colors, text-secondary)};
    // ... 他のカラー変数
  }
}
```

## 実装ガイドライン

### CSS変数使用

```scss
// CSS変数として定義
:root {
  // カラー
  --color-primary: #{$primary-500};
  --color-secondary: #{$secondary-500};
  --color-success: #{$success-500};
  --color-error: #{$error-500};
  
  // タイポグラフィ
  --font-family: #{$font-primary};
  --font-size-base: 1rem;
  --line-height-base: 1.5;
  
  // スペーシング
  --spacing-xs: #{$spacing-2};
  --spacing-sm: #{$spacing-3};
  --spacing-md: #{$spacing-4};
  --spacing-lg: #{$spacing-6};
  
  // アニメーション
  --duration-fast: #{$duration-fast};
  --duration-normal: #{$duration-normal};
  --easing-default: #{$easing-ease-out};
}
```

### Tailwind CSS設定

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          // ... フルカラーパレット
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        // ... 他のカラー定義
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans JP', 'sans-serif'],
      },
      spacing: {
        // 8px基準のスペーシング
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideInUp 0.2s ease-out',
        'shake': 'shake 0.5s ease-in-out',
        'pulse': 'pulse 0.2s ease-in-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
```

## 品質保証

### デザイントークン検証

```typescript
// デザイントークンの型定義
interface DesignTokens {
  colors: {
    primary: ColorScale;
    secondary: ColorScale;
    success: ColorScale;
    error: ColorScale;
    warning: ColorScale;
    info: ColorScale;
  };
  typography: {
    fontFamily: string[];
    fontSizes: Record<string, string>;
    fontWeights: Record<string, number>;
    lineHeights: Record<string, number>;
  };
  spacing: Record<string, string>;
  breakpoints: Record<string, string>;
}

// 自動テスト例
describe('Design System', () => {
  it('should have accessible color contrast ratios', () => {
    const contrastRatio = getContrastRatio('#3b82f6', '#ffffff');
    expect(contrastRatio).toBeGreaterThan(4.5);
  });

  it('should have consistent spacing scale', () => {
    const spacingValues = Object.values(spacing);
    spacingValues.forEach((value, index) => {
      if (index > 0) {
        expect(parseFloat(value)).toBeGreaterThan(
          parseFloat(spacingValues[index - 1])
        );
      }
    });
  });
});
```

## 関連ドキュメント

- [コンポーネント一覧](component-inventory.md)
- [Storybook構築手順](storybook-setup.md)
- [DDD設計との統合](../5.01_integration/ddd-integration.md)

---
**作成工程**: UI設計  
**作成日**: 2025-01-31  
**更新日**: 2025-01-31