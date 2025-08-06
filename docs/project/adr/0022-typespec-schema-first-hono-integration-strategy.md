# ADR-0022: TypeSpecスキーマファースト開発におけるHono統合ライブラリ選択

## ステータス

却下 - スキーマファースト原則を最優先とし、現在のTypeSpec + openapi-ts-router構成を継続

## 文脈

Quiz APIの開発において、TypeSpecによるスキーマファースト開発を前提として、Honoとの統合に最適なライブラリを選択する必要がある。現在の実装ではopenapi-ts-routerを使用しているが、型安全性やメンテナンス性の課題が発生している。

### 現在の技術スタック

- **スキーマ定義**: TypeSpec (.tsp)
- **型生成**: openapi-typescript
- **Webフレームワーク**: Hono (Cloudflare Workers)
- **ルーティング**: openapi-ts-router
- **バリデーション**: Zod

## 検討対象

### Option A: 現在の構成 (TypeSpec + openapi-ts-router)

### Option B: TypeSpec + Chanfana

## 詳細分析

### 1. スキーマファースト適合性

#### TypeSpec + openapi-ts-router

#### 評価: ⭐⭐⭐⭐☆

```typescript
// TypeSpec → OpenAPI → TypeScript型 → Router実装
// main.tsp
model Quiz {
  id: string;
  question: string;
}

// 生成された型を使用
import type { paths } from "./types/generated/api";
const api = createHonoOpenApiRouter<paths>(app);
```

**利点:**

- TypeSpecで定義したスキーマが完全にコード実装に反映される
- OpenAPI仕様とコード実装の一貫性が保証される
- 型生成パイプラインが明確で理解しやすい

**課題:**

- TypeSpec → OpenAPI → TypeScript の多段変換による情報損失の可能性
- 型定義とランタイム実装の同期が必要

#### TypeSpec + Chanfana

#### 評価: ⭐⭐⭐☆☆

```typescript
// TypeSpec + Chanfanaの場合、二重定義が発生
// main.tsp (スキーマ定義)
model Quiz { id: string; question: string; }

// routes/quiz.ts (実装での再定義)
const QuizSchema = z.object({
  id: z.string(),
  question: z.string(),
});
```

**利点:**

- Chanfana内でのスキーマ一貫性は高い
- 実装とドキュメントの自動同期

**課題:**

- TypeSpecとChanfana両方でスキーマ定義の重複
- スキーマファーストの原則から逸脱する可能性

### 2. 型安全性

#### TypeSpec + openapi-ts-router

#### 評価: ⭐⭐⭐☆☆

**現在の課題:**

```typescript
// 型エラーが発生
api.get("/path/{id}", {
  pathValidator: z.object({ id: z.string() }), // 型不整合
  handler: async (c) => {
    const { id } = c.req.valid("param"); // 型推論が不完全
  }
});
```

**利点:**

- TypeSpec由来の厳密な型定義
- コンパイル時の型チェック

**課題:**

- バリデーター統合での型不整合
- ランタイム検証と型定義の乖離

#### TypeSpec + Chanfana

#### 評価: ⭐⭐⭐⭐⭐

```typescript
export class GetQuiz extends OpenAPIRoute {
  schema = {
    request: {
      params: z.object({ id: z.string() }),
    },
  }
  
  async handle(c: Context) {
    const data = await this.getValidatedData<typeof this.schema>()
    // 完全な型推論
    const id: string = data.params.id
  }
}
```

**利点:**

- 完全な型推論とランタイム検証の統合
- 型エラーの大幅削減
- バリデーションと型定義の完全同期

### 3. 開発体験

#### TypeSpec + openapi-ts-router

#### 評価: ⭐⭐⭐☆☆

**開発フロー:**

1. TypeSpecでスキーマ定義
2. `pnpm gen-schema`で型生成
3. 生成された型を使用してルート実装
4. バリデーション設定（手動）

**利点:**

- 既存のHonoパターンに近い実装
- 学習コストが低い

**課題:**

- バリデーション設定の手動作業
- 型エラーのデバッグが困難
- スキーマ変更時の手動同期作業

#### TypeSpec + Chanfana

#### 評価: ⭐⭐⭐⭐☆

**開発フロー:**

1. TypeSpecでスキーマ定義
2. Chanfanaクラスで実装（Zodスキーマ再定義）
3. 自動的な型推論とバリデーション

**利点:**

- 統一されたエラーハンドリング
- 自動的なOpenAPI文書生成
- 直感的なクラスベース実装

**課題:**

- スキーマの二重定義
- クラスベース実装の学習コスト

### 4. Cloudflare Workers適合性

#### TypeSpec + openapi-ts-router

#### 評価: ⭐⭐⭐☆☆

```typescript
const app = new Hono<{ Bindings: CloudflareBindings }>();
// CloudflareBindingsとの統合で型エラー
const api = createHonoOpenApiRouter<paths>(app); // 型不整合
```

**課題:**

- CloudflareBindingsとの型互換性問題
- エッジランタイム最適化が限定的

#### TypeSpec + Chanfana

#### 評価: ⭐⭐⭐⭐⭐

```typescript
const app = new Hono<{ Bindings: CloudflareBindings }>()
const openapi = fromHono(app) // 完全な型互換性
```

**利点:**

- Cloudflare公式サポート
- Workers環境での最適化
- D1, KV等のバインディング完全対応

### 5. メンテナンス性・エコシステム

#### TypeSpec + openapi-ts-router

#### 評価: ⭐⭐⭐☆☆

**現状:**

- openapi-ts-router: v0.3.3 (比較的新しい)
- コミュニティサポート限定的
- 長期サポートの不透明性

**利点:**

- シンプルな構成
- デバッグが容易

**課題:**

- 長期的なメンテナンス不安
- 型互換性問題の解決困難

#### TypeSpec + Chanfana

#### 評価: ⭐⭐⭐⭐⭐

**現状:**

- Cloudflare公式ライブラリ
- 大規模プロダクション利用実績 (Radar 2.0)
- 継続的な開発・サポート保証

**利点:**

- 企業レベルのサポート
- 長期的な技術戦略との整合性
- 豊富なドキュメントとコミュニティ

### 6. 移行コスト

#### 現状維持 (openapi-ts-router)

#### 評価: ⭐⭐⭐⭐⭐

**作業量:**

- 型エラー修正: 1-2日
- 型キャスト等の回避策適用

**コスト:**

- 技術的負債の蓄積
- 将来的な大規模リファクタリング

#### Chanfana移行

#### 評価: ⭐⭐⭐☆☆

**作業量:**

- 依存関係変更: 0.5日
- エンドポイント再実装: 2-3日
- テスト・検証: 1日

**メリット:**

- 根本的問題解決
- 長期的な開発効率向上

## 定量的比較

| 評価項目 | TypeSpec + openapi-ts-router | TypeSpec + Chanfana |
|---------|------------------------------|---------------------|
| スキーマファースト適合性 | ⭐⭐⭐⭐☆ | ⭐⭐⭐☆☆ |
| 型安全性 | ⭐⭐⭐☆☆ | ⭐⭐⭐⭐⭐ |
| 開発体験 | ⭐⭐⭐☆☆ | ⭐⭐⭐⭐☆ |
| Cloudflare適合性 | ⭐⭐⭐☆☆ | ⭐⭐⭐⭐⭐ |
| メンテナンス性 | ⭐⭐⭐☆☆ | ⭐⭐⭐⭐⭐ |
| 移行コスト | ⭐⭐⭐⭐⭐ | ⭐⭐⭐☆☆ |
| **総合評価** | **18/30** | **23/30** |

## 決定基準

### プロジェクト要件との適合性

1. **スキーマファースト開発**: TypeSpecを中心とした設計駆動開発
2. **長期保守性**: 5年以上の継続開発予定
3. **型安全性**: ランタイムエラーの最小化
4. **Cloudflare Workers**: プラットフォーム特化の最適化

### 技術戦略との整合性

1. **2025年ベストプラクティス**: 業界標準への準拠
2. **チーム習熟度**: TypeScript/Zod の既存知識活用
3. **開発効率**: 継続的な生産性向上

## 却下された代替案: Chanfana移行

### 却下理由

1. **スキーマファースト原則との不整合**
   - TypeSpecとChanfana両方でのスキーマ定義重複
   - 単一の信頼できる情報源の原則に反する
   - コードファースト要素の混入リスク

2. **設計駆動開発からの逸脱**
   - 実装がスキーマ定義を左右する可能性
   - API設計の一貫性確保が困難
   - スキーマ変更の影響範囲が不明確

3. **アーキテクチャ複雑性の増大**
   - TypeSpec → OpenAPI → Chanfana → 実装の多段変換
   - 各段階での情報損失リスク
   - デバッグとトレーサビリティの困難

### 技術的制約の受容判断

Chanfanaの技術的優位性（型安全性、開発体験、Cloudflare最適化）は認められるものの、これらの利点はスキーマファースト設計原則の価値に比べて二次的であると判断した。

特に以下の点でスキーマファースト原則を優先：

- **設計の透明性**: TypeSpecファイルを見るだけでAPI全体が理解可能
- **変更管理の単純性**: スキーマ変更が実装に直接反映される保証
- **長期保守性**: 実装技術が変更されてもスキーマ定義は永続的価値を持つ

## 決定事項

**スキーマファースト原則を最優先とし、TypeSpec + openapi-ts-router構成を継続する。**

### 決定理由

1. **スキーマファースト純粋性の保持**
   - TypeSpecで定義したスキーマが完全にコード実装に反映される
   - 単一の信頼できる情報源（Single Source of Truth）としてのTypeSpecを維持
   - スキーマの二重定義を回避し、設計駆動開発を徹底

2. **アーキテクチャ一貫性の重視**
   - TypeSpec → OpenAPI → TypeScript型の明確な変換フロー
   - API仕様とコード実装の完全な一貫性保証
   - スキーマ変更時の影響範囲の明確性

3. **技術負債回避の優先**
   - 現在の型エラーは技術的解決が可能
   - 根本的な設計原則を変更するリスクを回避
   - 長期的な保守性よりも設計原則を優先

### 実装方針

#### 型エラーの技術的解決策

1. **型互換性問題の修正**

```typescript
// Before: 型エラーが発生
const api = createHonoOpenApiRouter<paths>(app);

// After: 型アサーションによる解決
const api = createHonoOpenApiRouter<paths>(app as any);
```

1. **バリデーター統合の改善**

```typescript
// 生成された型から動的にZodスキーマを構築
import type { components } from "./types/generated/api";

const createQuizSchema = z.object({
  question: z.string(),
  answerType: z.enum(["boolean", "free_text", "single_choice", "multiple_choice"]),
}) satisfies z.ZodType<components["schemas"]["CreateQuizRequest"]>;
```

1. **型安全性の確保**

```typescript
// 厳密な型チェックを維持しつつエラーを回避
api.post("/api/quiz/v1/manage/quizzes", {
  bodyValidator: createQuizSchema,
  handler: async (c) => {
    const data = c.req.valid("json");
    // 完全な型推論を保持
    return c.json(data);
  },
});
```

### 長期戦略

1. **TypeSpec定義の充実化**
   - より詳細なスキーマ定義
   - エラーレスポンスの標準化
   - バリデーション制約の明確化

2. **型生成パイプラインの最適化**
   - 生成される型の品質向上
   - 型エラーの予防的検出
   - 自動化されたスキーマ検証

3. **開発フローの標準化**
   - スキーマファースト開発の徹底
   - 設計レビューの制度化
   - 継続的な品質改善

### 技術的妥協点の受容

以下の制約を受容し、スキーマファースト原則を優先する：

- 一部の型エラーに対する技術的回避策の使用
- バリデーション統合の複雑性
- 開発体験の一定の制約

これらの制約は、スキーマファースト設計原則の価値に比べて許容可能なトレードオフと判断する。

## 参考資料

- [Chanfana公式ドキュメント](https://chanfana.pages.dev/)
- [openapi-ts-router GitHub](https://github.com/callawaycloud/openapi-ts-router)
- [TypeSpec公式サイト](https://typespec.io/)
- [OpenAPI TypeScript](https://openapi-ts.dev/)
