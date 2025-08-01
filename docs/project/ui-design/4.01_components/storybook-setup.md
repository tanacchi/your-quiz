# Storybook構築手順

## 概要

Your QuizアプリのUIコンポーネント開発・テスト・ドキュメント化のためのStorybook環境構築手順です。コンポーネント駆動開発（CDD）を実現し、デザインシステムとの整合性を保ちながら効率的なUI開発を行います。

## 参照ドキュメント

- [コンポーネント一覧](component-inventory.md)
- [デザインシステム定義](design-system.md)
- [DDD設計との統合](../5.01_integration/ddd-integration.md)

## セットアップ要件

### 前提条件

- Next.js 14以上
- TypeScript 5以上
- Tailwind CSS 3以上
- React 18以上

### パッケージ依存関係

```json
{
  "devDependencies": {
    "@storybook/addon-essentials": "^7.6.0",
    "@storybook/addon-interactions": "^7.6.0",
    "@storybook/addon-links": "^7.6.0",
    "@storybook/addon-onboarding": "^1.0.10",
    "@storybook/addon-a11y": "^7.6.0",
    "@storybook/addon-design-tokens": "^7.6.0",
    "@storybook/addon-docs": "^7.6.0",
    "@storybook/blocks": "^7.6.0",
    "@storybook/nextjs": "^7.6.0",
    "@storybook/react": "^7.6.0",
    "@storybook/react-vite": "^7.6.0",
    "@storybook/testing-library": "^0.2.2",
    "storybook": "^7.6.0",
    "chromatic": "^10.0.0"
  }
}
```

## インストール手順

### 1. Storybook初期化

```bash
# Storybookの初期化
npx storybook@latest init

# 必要なアドオンのインストール
npm install --save-dev @storybook/addon-a11y @storybook/addon-design-tokens

# Chromaticのセットアップ（ビジュアルテスト用）
npm install --save-dev chromatic
```

### 2. 設定ファイル作成

#### .storybook/main.ts

```typescript
import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: [
    '../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-design-tokens',
    '@storybook/addon-docs',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
};

export default config;
```

#### .storybook/preview.ts

```typescript
import type { Preview } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import '../src/styles/globals.css'; // Tailwind CSSを含む

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // ビューポート設定（モバイルファースト）
    viewport: {
      viewports: {
        ...INITIAL_VIEWPORTS,
        mobile375: {
          name: 'Mobile 375px',
          styles: {
            width: '375px',
            height: '812px',
          },
        },
        mobile320: {
          name: 'Mobile 320px',
          styles: {
            width: '320px',
            height: '568px',
          },
        },
        mobile414: {
          name: 'Mobile 414px',
          styles: {
            width: '414px',
            height: '896px',
          },
        },
      },
      defaultViewport: 'mobile375',
    },
    // ドキュメント設定
    docs: {
      toc: true,
    },
    // アクセシビリティテスト設定
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'focus-trap',
            enabled: true,
          },
        ],
      },
    },
  },
  // グローバルデコレーター
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50 p-4">
        <Story />
      </div>
    ),
  ],
};

export default preview;
```

#### .storybook/theme.ts

```typescript
import { create } from '@storybook/theming/create';

export default create({
  base: 'light',
  brandTitle: 'Your Quiz Design System',
  brandUrl: 'https://your-quiz.example.com',
  brandImage: './logo.svg',
  brandTarget: '_self',

  // UI
  appBg: '#ffffff',
  appContentBg: '#ffffff',
  appBorderColor: '#e5e7eb',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Inter", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#1f2937',
  textInverseColor: '#ffffff',

  // Toolbar default and active colors
  barTextColor: '#4b5563',
  barSelectedColor: '#3b82f6',
  barBg: '#f9fafb',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#d1d5db',
  inputTextColor: '#1f2937',
  inputBorderRadius: 4,
});
```

## コンポーネントストーリー作成

### Atoms層ストーリー例

#### src/components/atoms/Button/Button.stories.tsx

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'アプリケーション全体で使用される基本的なボタンコンポーネントです。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'ghost'],
      description: 'ボタンの視覚的なバリエーション',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'ボタンのサイズ',
    },
    fullWidth: {
      control: 'boolean',
      description: '親要素の幅いっぱいに表示するかどうか',
    },
    disabled: {
      control: 'boolean',
      description: 'ボタンを無効化するかどうか',
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基本ストーリー
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'クイズを開始',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'プレビュー',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: '削除',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'スキップ',
  },
};

// サイズバリエーション
export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    children: 'Small Button',
  },
};

export const Medium: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Medium Button',
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    children: 'Large Button',
  },
};

// 状態バリエーション
export const Disabled: Story = {
  args: {
    variant: 'primary',
    children: 'Disabled Button',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    variant: 'primary',
    children: '読み込み中...',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'ローディング状態のボタンです。',
      },
    },
  },
};

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    children: 'Full Width Button',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

// アクセシビリティテスト用
export const AccessibilityTest: Story = {
  args: {
    variant: 'primary',
    children: 'アクセシビリティテスト',
    'aria-label': 'クイズを開始するボタン',
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'keyboard-navigation',
            enabled: true,
          },
        ],
      },
    },
  },
};
```

### Molecules層ストーリー例

#### src/components/molecules/QuizCard/QuizCard.stories.tsx

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { QuizCard } from './QuizCard';

const meta = {
  title: 'Molecules/QuizCard',
  component: QuizCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'クイズ情報を表示し、ユーザーアクションを提供するカードコンポーネントです。',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    onStart: fn(),
    onPreview: fn(),
    onFavorite: fn(),
  },
} satisfies Meta<typeof QuizCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// サンプルデータ
const mockQuizData = {
  id: '1',
  title: '日本の地理クイズ',
  questionCount: 20,
  difficulty: 2,
  tags: ['地理', '日本', '初級'],
  statistics: {
    averageScore: 82,
    attemptCount: 127,
  },
};

export const Default: Story = {
  args: {
    quiz: mockQuizData,
  },
};

export const HighDifficulty: Story = {
  args: {
    quiz: {
      ...mockQuizData,
      title: '上級数学問題集',
      difficulty: 5,
      tags: ['数学', '上級', '大学レベル'],
      statistics: {
        averageScore: 45,
        attemptCount: 23,
      },
    },
  },
};

export const PopularQuiz: Story = {
  args: {
    quiz: {
      ...mockQuizData,
      title: '一般常識クイズ',
      statistics: {
        averageScore: 75,
        attemptCount: 1250,
      },
    },
  },
};

export const LongTitle: Story = {
  args: {
    quiz: {
      ...mockQuizData,
      title: 'これは非常に長いタイトルのクイズです。長すぎるタイトルの場合の表示を確認するためのサンプルです。',
    },
  },
  parameters: {
    docs: {
      description: {
        story: '長いタイトルの場合の表示を確認するストーリーです。',
      },
    },
  },
};

// インタラクションテスト
export const WithInteractions: Story = {
  args: {
    quiz: mockQuizData,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    
    // 開始ボタンのクリックテスト
    const startButton = canvas.getByText('開始');
    await userEvent.click(startButton);
    await expect(args.onStart).toHaveBeenCalled();
    
    // お気に入りボタンのクリックテスト
    const favoriteButton = canvas.getByLabelText('お気に入りに追加');
    await userEvent.click(favoriteButton);
    await expect(args.onFavorite).toHaveBeenCalled();
  },
};
```

### Organisms層ストーリー例

#### src/components/organisms/SwipeableQuizCard/SwipeableQuizCard.stories.tsx

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { SwipeableQuizCard } from './SwipeableQuizCard';

const meta = {
  title: 'Organisms/SwipeableQuizCard',
  component: SwipeableQuizCard,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'スワイプ操作でクイズに回答できるメインコンポーネントです。Tinder UIを実装しています。',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    onAnswer: fn(),
    onSkip: fn(),
    onPrevious: fn(),
  },
} satisfies Meta<typeof SwipeableQuizCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockQuestion = {
  id: '1',
  question: '地球は太陽系で最も大きな惑星である。',
  correctAnswer: false,
  explanation: '実際には木星が太陽系で最も大きな惑星です。地球は岩石惑星の中では最大ですが、ガス惑星である木星の方がはるかに大きく、質量は地球の約318倍です。',
  difficulty: 2,
};

export const Default: Story = {
  args: {
    question: mockQuestion,
  },
};

export const LongQuestion: Story = {
  args: {
    question: {
      ...mockQuestion,
      question: 'これは非常に長い問題文のサンプルです。実際のクイズでは、このように長い問題文が表示される場合があります。レイアウトが適切に対応できているかを確認するためのテストケースとして作成しています。テキストが複数行に渡る場合の表示を確認してください。',
    },
  },
};

export const HighDifficulty: Story = {
  args: {
    question: {
      ...mockQuestion,
      question: '量子力学における不確定性原理は、位置と運動量を同時に精確に測定することは不可能であると述べている。',
      difficulty: 5,
    },
  },
};

// スワイプジェスチャーのデモ
export const SwipeDemo: Story = {
  args: {
    question: mockQuestion,
  },
  parameters: {
    docs: {
      description: {
        story: 'スワイプジェスチャーの動作を確認できます。右スワイプで正解、左スワイプで不正解、上スワイプでスキップです。',
      },
    },
  },
};

// モバイル表示確認
export const MobileView: Story = {
  args: {
    question: mockQuestion,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile375',
    },
  },
};

export const SmallMobileView: Story = {
  args: {
    question: mockQuestion,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile320',
    },
  },
};
```

## デザイントークン統合

### design-tokens.json

```json
{
  "color": {
    "primary": {
      "50": { "value": "#eff6ff" },
      "100": { "value": "#dbeafe" },
      "200": { "value": "#bfdbfe" },
      "300": { "value": "#93c5fd" },
      "400": { "value": "#60a5fa" },
      "500": { "value": "#3b82f6" },
      "600": { "value": "#2563eb" },
      "700": { "value": "#1d4ed8" },
      "800": { "value": "#1e40af" },
      "900": { "value": "#1e3a8a" }
    },
    "semantic": {
      "success": { "value": "#22c55e" },
      "error": { "value": "#ef4444" },
      "warning": { "value": "#f59e0b" },
      "info": { "value": "#0ea5e9" }
    }
  },
  "typography": {
    "fontFamily": {
      "primary": { "value": "Inter, Noto Sans JP, sans-serif" }
    },
    "fontSize": {
      "xs": { "value": "0.75rem" },
      "sm": { "value": "0.875rem" },
      "base": { "value": "1rem" },
      "lg": { "value": "1.125rem" },
      "xl": { "value": "1.25rem" },
      "2xl": { "value": "1.5rem" },
      "3xl": { "value": "2rem" }
    },
    "fontWeight": {
      "normal": { "value": "400" },
      "medium": { "value": "500" },
      "semibold": { "value": "600" },
      "bold": { "value": "700" }
    }
  },
  "spacing": {
    "0": { "value": "0" },
    "1": { "value": "0.25rem" },
    "2": { "value": "0.5rem" },
    "3": { "value": "0.75rem" },
    "4": { "value": "1rem" },
    "5": { "value": "1.25rem" },
    "6": { "value": "1.5rem" },
    "8": { "value": "2rem" },
    "10": { "value": "2.5rem" },
    "12": { "value": "3rem" },
    "16": { "value": "4rem" },
    "20": { "value": "5rem" },
    "24": { "value": "6rem" }
  },
  "borderRadius": {
    "none": { "value": "0" },
    "sm": { "value": "0.125rem" },
    "base": { "value": "0.25rem" },
    "md": { "value": "0.375rem" },
    "lg": { "value": "0.5rem" },
    "xl": { "value": "0.75rem" },
    "2xl": { "value": "1rem" },
    "full": { "value": "9999px" }
  }
}
```

## ドキュメンテーション

### Introduction.stories.mdx

```mdx
import { Meta } from '@storybook/blocks';

<Meta title="Introduction" />

# Your Quiz Design System

Your Quizアプリケーションのデザインシステムとコンポーネントライブラリです。

## 概要

このStorybook環境では以下を提供します：

- **Atomic Design**に基づいたコンポーネント構成
- **アクセシビリティ**を考慮したUI設計
- **モバイルファースト**なレスポンシブデザイン
- **Tinder UI**による直感的なスワイプ操作

## 使い方

### 1. コンポーネントの探索

左サイドバーからコンポーネントを選択し、各種バリエーションとプロパティを確認できます。

### 2. アクセシビリティチェック

各ストーリーでアクセシビリティタブを確認し、WCAG 2.1 AA準拠状況をチェックできます。

### 3. レスポンシブテスト

ツールバーのビューポート切り替えで、異なる画面サイズでの表示を確認できます。

### 4. インタラクションテスト

一部のストーリーでは、実際のユーザーインタラクションをシミュレートできます。

## デザイン原則

- **直感性**: スワイプによる直感的な操作
- **包括性**: WCAG 2.1 AA準拠のアクセシビリティ
- **一貫性**: 統一されたデザインシステム
- **効率性**: 高速な応答性とパフォーマンス

## 技術スタック

- **React** + **TypeScript**
- **Next.js 14**
- **Tailwind CSS**
- **Framer Motion** (アニメーション)
- **React Hook Form** (フォーム)
```

### Colors.stories.mdx

```mdx
import { Meta, ColorPalette, ColorItem } from '@storybook/blocks';

<Meta title="Design System/Colors" />

# カラーパレット

Your Quizアプリで使用するカラーシステムです。

## Primary Colors

<ColorPalette>
  <ColorItem
    title="Primary Blue"
    subtitle="メインブランドカラー"
    colors={{
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    }}
  />
</ColorPalette>

## Semantic Colors

<ColorPalette>
  <ColorItem
    title="Success Green"
    subtitle="正解・成功状態"
    colors={{
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    }}
  />
  <ColorItem
    title="Error Red"
    subtitle="不正解・エラー状態"
    colors={{
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    }}
  />
</ColorPalette>

## 使用ガイドライン

### アクセシビリティ

すべてのカラーコンビネーションはWCAG 2.1 AA準拠のコントラスト比（4.5:1以上）を満たしています。

### カラー使用例

- **Primary 500**: メインアクションボタン
- **Success 500**: 正解フィードバック
- **Error 500**: 不正解フィードバック
- **Gray 600**: セカンダリテキスト
```

## テスト設定

### .storybook/test-runner.ts

```typescript
import type { TestRunnerConfig } from '@storybook/test-runner';
import { getStoryContext } from '@storybook/test-runner';

const config: TestRunnerConfig = {
  async preVisit(page, context) {
    // アクセシビリティテストの設定
    await page.evaluate(() => {
      window.__axeConfig = {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'keyboard-navigation',
            enabled: true,
          },
        ],
      };
    });
  },
  async postVisit(page, context) {
    const storyContext = await getStoryContext(page, context);
    
    // スクリーンショットテスト
    if (storyContext.parameters?.screenshot) {
      await page.screenshot({
        path: `screenshots/${context.id}.png`,
      });
    }
    
    // パフォーマンステスト
    const performanceEntries = await page.evaluate(() =>
      JSON.stringify(performance.getEntriesByType('navigation'))
    );
    
    console.log(`Performance for ${context.id}:`, performanceEntries);
  },
};

export default config;
```

## ビルド・デプロイ設定

### package.json scripts

```json
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "test-storybook": "test-storybook",
    "chromatic": "chromatic --exit-zero-on-changes",
    "storybook:test": "concurrently -k -s first -n \"SB,TEST\" -c \"magenta,blue\" \"npm run storybook\" \"wait-on tcp:6006 && npm run test-storybook\""
  }
}
```

### .github/workflows/storybook.yml

```yaml
name: Storybook Tests
on:
  push:
    branches: ['main', 'develop']
  pull_request:
    branches: ['main']

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright
        run: npx playwright install --with-deps
      - name: Build Storybook
        run: npm run build-storybook --quiet
      - name: Serve Storybook and run tests
        run: |
          npx concurrently -k -s first -n "SB,TEST" -c "magenta,blue" \
            "npx http-server storybook-static --port 6006 --silent" \
            "npx wait-on tcp:6006 && npm run test-storybook"

  visual-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - name: Publish to Chromatic
        uses: chromaui/action@v1
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
```

## 運用ガイドライン

### コンポーネント作成フロー

1. **設計**: ワイヤーフレームとデザインシステムに基づく設計
2. **ストーリー作成**: 全バリエーションをカバーするストーリー作成
3. **実装**: TypeScript + Tailwind CSSでの実装
4. **テスト**: アクセシビリティ・ビジュアル・インタラクションテスト
5. **レビュー**: コードレビューとデザインレビュー
6. **リリース**: Chromaticでの承認後リリース

### メンテナンス

- **定期アップデート**: Storybookとアドオンの定期更新
- **パフォーマンス監視**: ビルド時間とバンドルサイズの監視
- **アクセシビリティチェック**: 新機能追加時の必須チェック
- **ビジュアルテスト**: UIの意図しない変更の検出

### ドキュメント更新

- **新コンポーネント**: ストーリーとドキュメントの同時作成
- **API変更**: propsやイベントの変更時のドキュメント更新
- **デザイン変更**: デザインシステム更新時の関連ドキュメント更新

## トラブルシューティング

### よくある問題と解決策

#### Tailwind CSSが適用されない

```typescript
// .storybook/preview.ts
import '../src/styles/globals.css'; // 確実にインポート

// PostCSS設定確認
// .storybook/main.ts
const config: StorybookConfig = {
  // ...
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader'],
    });
    return config;
  },
};
```

#### TypeScript型エラー

```typescript
// 型定義の確認
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
}

// ストーリーでの型安全性確保
const meta: Meta<typeof Button> = {
  // 正確な型定義を使用
};
```

## 関連ドキュメント

- [コンポーネント一覧](component-inventory.md)
- [デザインシステム定義](design-system.md)
- [DDD設計との統合](../5.01_integration/ddd-integration.md)

---
**作成工程**: UI設計  
**作成日**: 2025-01-31  
**更新日**: 2025-01-31
