# Chanfana Migration Proposal

## 概要

現在のopenapi-ts-routerからChanfanaへの移行提案書です。2025年のベストプラクティスに基づき、より効率的でメンテナブルなAPI開発環境の構築を目指します。

## 現状の課題

### openapi-ts-router の制限

1. **型安全性の制約**: Honoのコンテキスト型との互換性問題
2. **バリデーション統合**: Zodとの統合が複雑で型エラーが発生しやすい
3. **ドキュメント生成**: OpenAPIドキュメントの自動生成機能が限定的
4. **メンテナンス**: 比較的新しいライブラリでコミュニティサポートが限定的

### 現在の実装での問題点

```typescript
// 型エラーが発生しやすい
api.get("/path", {
  pathValidator: z.object({ id: z.string() }), // 型不整合
  handler: async (c) => { /* ... */ }
});
```

## Chanfanaの利点

### 1. 公式サポート

- Cloudflare公式ライブラリ
- Cloudflare Workers最適化
- 安定したメンテナンス

### 2. 型安全性

```typescript
export class GetQuiz extends OpenAPIRoute {
  schema = {
    request: {
      params: z.object({
        id: z.string().min(1),
      }),
    },
    responses: {
      "200": {
        description: "Quiz retrieved successfully",
        content: {
          "application/json": {
            schema: QuizSchema,
          },
        },
      },
    },
  }

  async handle(c: Context) {
    const data = await this.getValidatedData<typeof this.schema>()
    // 完全に型安全なデータアクセス
    return c.json({ id: data.params.id })
  }
}
```

### 3. 自動ドキュメント生成

- OpenAPIスキーマ自動生成
- インタラクティブなAPI文書
- CLI toolでスキーマ抽出可能

### 4. 開発体験の向上

- クラスベースでの構造化
- バリデーションとハンドラの統一
- エラーハンドリングの標準化

## 移行戦略

### Phase 1: 準備・検証（1週間）

1. **依存関係の更新**

```bash
pnpm add chanfana
pnpm remove openapi-ts-router @hono/zod-validator
```

1. **基本セットアップ**

```typescript
import { fromHono } from 'chanfana'
import { Hono } from 'hono'

const app = new Hono<{ Bindings: CloudflareBindings }>()
const openapi = fromHono(app, {
  docs_url: "/docs",
  openapi_url: "/openapi.json",
})
```

### Phase 2: 段階的移行（2週間）

1. **新規エンドポイント**をChanfanaで実装
2. **既存エンドポイント**を1つずつ移行
3. **型生成パイプライン**の更新

### Phase 3: 最適化・統合（1週間）

1. **自動テスト**の統合
2. **CI/CDパイプライン**の更新
3. **ドキュメント**の整備

## 実装例

### Quiz Management API (Chanfana版)

```typescript
// routes/quiz.ts
import { OpenAPIRoute } from 'chanfana'
import { z } from 'zod'

const QuizSchema = z.object({
  id: z.string(),
  question: z.string(),
  answerType: z.enum(['boolean', 'free_text', 'single_choice', 'multiple_choice']),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export class ListQuizzes extends OpenAPIRoute {
  schema = {
    tags: ['Quiz Management'],
    summary: 'List all quizzes',
    responses: {
      '200': {
        description: 'List of quizzes',
        content: {
          'application/json': {
            schema: z.object({
              quizzes: z.array(QuizSchema),
              total: z.number().int(),
            }),
          },
        },
      },
    },
  }

  async handle(c: Context) {
    // ビジネスロジック
    const quizzes = await getQuizzes(c.env.DB)
    return c.json({ quizzes, total: quizzes.length })
  }
}

export class CreateQuiz extends OpenAPIRoute {
  schema = {
    tags: ['Quiz Management'],
    summary: 'Create new quiz',
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.object({
              question: z.string().min(1),
              answerType: z.enum(['boolean', 'free_text', 'single_choice', 'multiple_choice']),
            }),
          },
        },
      },
    },
    responses: {
      '201': {
        description: 'Quiz created successfully',
        content: {
          'application/json': {
            schema: QuizSchema,
          },
        },
      },
    },
  }

  async handle(c: Context) {
    const data = await this.getValidatedData<typeof this.schema>()
    const quiz = await createQuiz(c.env.DB, data.body)
    return c.json(quiz, 201)
  }
}
```

### index.ts 統合

```typescript
import { fromHono } from 'chanfana'
import { Hono } from 'hono'
import { ListQuizzes, CreateQuiz, GetQuiz } from './routes/quiz'

const app = new Hono<{ Bindings: CloudflareBindings }>()

const openapi = fromHono(app, {
  docs_url: "/",
  openapi_url: "/openapi.json",
  schema: {
    info: {
      title: "Your Quiz API",
      version: "1.0.0",
    },
  },
})

// ルート登録
openapi.get('/api/quiz/v1/manage/quizzes', ListQuizzes)
openapi.post('/api/quiz/v1/manage/quizzes', CreateQuiz)
openapi.get('/api/quiz/v1/manage/quizzes/:id', GetQuiz)

export default app
```

## 期待される効果

### 開発効率の向上

- 型エラーの大幅減少
- バリデーション処理の簡素化
- 自動ドキュメント生成

### 運用品質の向上

- 一貫したエラーハンドリング
- 標準化されたAPI仕様
- 自動化されたテスト支援

### 技術負債の削減

- Cloudflare公式サポート
- 長期的なメンテナンス保証
- コミュニティベストプラクティス

## リスク評価

### 移行リスク: 低

- 段階的移行可能
- 既存APIとの共存可能
- ロールバック容易

### 学習コスト: 低

- 現在のZod/Hono知識活用可能
- 明確なドキュメントとサンプル
- TypeScript型推論の活用

## 推奨事項

1. **即座に移行開始**: 技術的メリットが明確
2. **新規機能はChanfanaで実装**: 段階的移行の推進
3. **ドキュメント自動生成の活用**: API仕様の品質向上
4. **CI/CDパイプラインの更新**: スキーマ検証の自動化

## 結論

Chanfanaへの移行は、現在の技術的課題を解決し、2025年のベストプラクティスに準拠した開発環境を構築する最適な選択です。公式サポート、型安全性、開発体験の向上により、長期的な開発効率とコード品質の大幅な改善が期待できます。
