# your-quiz UI

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Storybook

atoms/molecules/organisms/templates 配下の全コンポーネントに Storybook（`@storybook/nextjs-vite`）の story を用意しています。Props ドキュメントは Autodocs（`tags: ["autodocs"]`）で自動生成されます。

```bash
# 開発サーバ起動（http://localhost:6006）
pnpm --filter ui storybook

# 静的ビルド（成果物は ui/storybook-static、CI（pr-storybook.yml）でも実行）
pnpm --filter ui storybook:build

# ビルド成果物をローカルで確認する
pnpm dlx http-server ui/storybook-static
```

コンポーネントを追加・変更したら、同じディレクトリに `<Component>.stories.tsx` を追加/更新してください（`docs/project/ui-design/4.01_components/storybook-setup.md` 参照）。

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
