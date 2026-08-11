# Storybook構築手順

## 概要

Your QuizアプリのUIコンポーネント開発・レビュー・ドキュメント化のためのStorybook環境構築手順です。コンポーネント駆動開発（CDD）を実現し、atoms/molecules/organisms/templates の全コンポーネントを単体で描画・比較できるようにします。

> 本ドキュメントは issue #42 の実装（Storybook 10 / `@storybook/nextjs-vite`）に合わせて更新しています。実際の設定ファイルは `ui/.storybook/` を正とします。

## 参照ドキュメント

- [コンポーネント一覧](component-inventory.md)
- [デザインシステム定義](design-system.md)

## セットアップ要件

- Next.js 15 / React 19 / TypeScript 5（`ui/package.json` に準拠）
- Tailwind CSS v4（CSS-first、`ui/src/app/globals.css` の `@import "tailwindcss"` + `@theme inline`）
- Storybook 10（`@storybook/nextjs-vite` ビルダー。公式推奨で、既存の `vitest` + `@vitejs/plugin-react` 構成と親和性が高い）

### パッケージ依存関係

`pnpm add -D --filter ui` でのみ追加する（npm/yarn は禁止、`docs/instructions/shared/tools/npm.md` 参照）。

```bash
pnpm add -D --filter ui \
  storybook@^10.5.7 \
  @storybook/nextjs-vite@^10.5.7 \
  @storybook/addon-docs@^10.5.7 \
  @storybook/addon-a11y@^10.5.7 \
  vite@^7 \
  @tailwindcss/vite@^4.1.12
```

`vite` は `@storybook/nextjs-vite` の peerDependency だが `ui/package.json` に直接依存が無いため明示インストールする。バージョンは既存の `vitest@3.2.4`（`vite: ^5||^6||^7.0.0-0`）・`@vitejs/plugin-react@4`（`vite: ^4.2||^5||^6||^7`）と両立する `^7` を選ぶ（最新の vite 8 系は既存テストと衝突するため使わない）。

`storybook init` は対話式コマンドであり、CI・エージェント実行環境では使えないため設定ファイルは手書きする。

## 設定ファイル

### `ui/.storybook/main.ts`

```typescript
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/nextjs-vite";
import tailwindcss from "@tailwindcss/vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../src/components/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  viteFinal: (viteConfig) =>
    mergeConfig(viteConfig, {
      plugins: [tailwindcss()],
      resolve: {
        alias: {
          "@": fileURLToPath(new URL("../src", import.meta.url)),
        },
      },
    }),
};

export default config;
```

補足:

- `ui/postcss.config.mjs` はもともと Next.js 専用の文字列配列形式（`plugins: ["@tailwindcss/postcss"]`）だったが、汎用の `postcss-load-config`（Vite が利用）は配列内の文字列プラグイン名を自動解決しないため、`@tailwindcss/vite` を `viteFinal` に追加して Tailwind を有効化している。なお `@storybook/nextjs-vite` の Next.js 互換レイヤーが初回ビルド時に `ui/postcss.config.mjs` をオブジェクトマップ形式（`plugins: { "@tailwindcss/postcss": {} }`）へ自動的に書き換える。この形式は `next build`（Webpack）でも問題なく動作することを確認済みで、以降のビルドでは冪等（再書き換えなし）。
- `@` エイリアスは `ui/vitest.config.ts` と同じ方式（`fileURLToPath`）で明示指定する。
- `ui/public` は存在しないため `staticDirs` は設定不要。
- Autodocs は `tags: ["autodocs"]` を各 story の meta に付与することで有効になる（Storybook 8 以降、`main.ts` 側の `docs.autodocs` 設定は廃止）。

### `ui/.storybook/preview.ts`

```typescript
import type { Preview } from "@storybook/nextjs-vite";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    viewport: {
      options: {
        mobile320: { name: "Mobile 320px", styles: { width: "320px", height: "568px" } },
        mobile375: { name: "Mobile 375px", styles: { width: "375px", height: "812px" } },
        mobile414: { name: "Mobile 414px", styles: { width: "414px", height: "896px" } },
      },
    },
  },
  initialGlobals: {
    viewport: { value: "mobile375", isRotated: false },
  },
};

export default preview;
```

補足:

- `globals.css`（`ui/src/app/globals.css`、`src/styles/` ではない）を import しないと、`.bg-base`（ブランドカラー `#f5835c`）等の手書き CSS クラスが効かず全コンポーネントが未スタイルで表示される。
- ビューポートは Storybook 8.6 以降の現行 API（`parameters.viewport.options` + `initialGlobals.viewport.value`）を使う。既定値は 375px（モバイルファースト）。
- `@storybook/addon-a11y` によりアクセシビリティパネルが各 story で自動的に有効になる。

## コンポーネントストーリー作成

全 15 コンポーネント（atoms 5・molecules 4・organisms 4・templates 2）は named export・`'use client'` なし・hooks/context なしの純粋なプレゼンテーショナルコンポーネントで、追加のモックやデコレータは不要。`next/link` を使うコンポーネント（`BackLink` / `QuizCard` / `AppHeader` / `TabBar`）も `@storybook/nextjs-vite` が自動でスタブする。

story ファイルは `<Component>.tsx` と同じディレクトリに `<Component>.stories.tsx` として配置する（既存の `<Component>.test.tsx` と同じ並び）。

### Atoms 層ストーリー例

```typescript
// ui/src/components/atoms/Button/Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { Button } from "./Button";

const meta = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  args: { children: "クイズを開始", onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Secondary: Story = { args: { variant: "secondary" } };
```

- `fn()` は `storybook/test` から import する（`@storybook/test` は Storybook 8.6 で更新停止した旧パッケージ）。
- `satisfies Meta<typeof X>` を使い、型アサーション（`as`）や `any` は使わない（`docs/instructions/shared/languages/typescript.md` 準拠）。
- `ui/tsconfig.json` は `@tsconfig/strictest` を継承するため `exactOptionalPropertyTypes` が有効。optional prop を「渡さない」ケースを表現するときは `args: { prop: undefined }` ではなく、そのキー自体を省略する。

## 品質ゲート

- Biome（`biome.json`）が `ui/.storybook/**` と `*.stories.tsx` も lint 対象にする（未使用 import/変数はエラー）。
- `ui/tsconfig.json` の `include` は `**/*.ts`/`**/*.tsx` を含むため、`pnpm --filter ui typecheck` で `.storybook/` と stories も型チェックされる。
- `ui/vitest.config.ts` の coverage 設定は `src/**/*.stories.{ts,tsx}` を除外済みのため、stories はカバレッジ閾値に影響しない。

## ビルド・CI

```bash
pnpm --filter ui storybook        # 開発サーバ起動（http://localhost:6006）
pnpm --filter ui storybook:build  # 静的ビルド（成果物: ui/storybook-static、.gitignore 済み）
```

CI は `.github/workflows/pr-storybook.yml` として独立させ、既存の `pr-lint.yml` / `pr-test.yml` / `pr-build.yml` と同じ構成（`actions/checkout@v4` → `actions/setup-node@v4`（node 22） → `pnpm/action-setup@v2`（version 10） → `pnpm install --recursive --frozen-lockfile`）で `pnpm --filter ui storybook:build` を実行する。

Chromatic 等の視覚回帰テストは本 issue のスコープ外（静的ビルドの成功確認のみ）。導入する場合は別 issue で扱う。

## 視覚的確認手順

1. `pnpm --filter ui storybook` を起動し `http://localhost:6006` を開く
2. サイドバーで atoms → templates の順に各コンポーネントを確認し、ブランドカラー `#f5835c` が反映されていることを確認する
3. 各コンポーネントの **Docs** タブで Autodocs による Props 表が生成されていることを確認する
4. **Accessibility** パネルで a11y チェックが動作していることを確認する
5. `pnpm --filter ui storybook:build` で静的ビルドし、`pnpm dlx http-server ui/storybook-static` で成果物を確認する

## 運用ガイドライン

- コンポーネントを追加・変更したら、同じディレクトリに `<Component>.stories.tsx` を追加/更新する。
- 新規コンポーネント（スワイプ UI 等）の story 追加は別 issue で扱う。

---
**作成工程**: UI設計
**作成日**: 2025-01-31
**更新日**: 2026-08-11
