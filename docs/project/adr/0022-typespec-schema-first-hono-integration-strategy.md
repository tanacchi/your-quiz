# ADR-0022: TypeSpecスキーマファースト開発におけるHono統合ライブラリ選択

## ステータス

**暫定的変更** - openapi-ts-routerの成熟度不足により、TypeSpec + Chanfanaを暫定採用。将来的にopenapi-ts-routerが成熟した段階で再移行を検討。

## 文脈

Quiz APIの開発において、TypeSpecによるスキーマファースト開発を前提として、Honoとの統合に最適なライブラリを選択する必要がある。当初はopenapi-ts-routerを採用したが、実装過程で同ライブラリが開発初期段階であり、実用に耐えない問題が多数発覚した。

### 現在の技術スタック

- **スキーマ定義**: TypeSpec (.tsp)
- **型生成**: openapi-typescript
- **Webフレームワーク**: Hono (Cloudflare Workers)
- **ルーティング**: ~~openapi-ts-router~~ → **Chanfana** (暫定)
- **バリデーション**: Zod

## 検討対象

### Option A: 継続 (TypeSpec + openapi-ts-router) - 断念

### Option B: 暫定移行 (TypeSpec + Chanfana) - 採用

## 実装上の問題発覚

### openapi-ts-routerの具体的な問題

1. **型互換性の致命的な問題**

   ```typescript
   // Honoコンテキストとの型不整合が解決不可能
   const api = createHonoOpenApiRouter<paths>(app); // 型エラー
   ```

2. **バリデーション統合の不完全性**

   ```typescript
   // Zodバリデーターとの統合で型推論が破綻
   api.get("/path/{id}", {
     pathValidator: z.object({ id: z.string() }), // 型不整合
     handler: async (c) => {
       const { id } = c.req.valid("param"); // 型推論失敗
     }
   });
   ```

3. **開発ツールの未成熟**
   - エラーメッセージが不明瞭
   - デバッグ支援機能の不足
   - ドキュメントの不完全性

4. **エコシステムの限界**
   - コミュニティサポートの不足
   - 実用事例の欠如
   - バグ修正の遅延

## 暫定決定: Chanfana採用

### 採用理由

1. **技術的安定性の確保**
   - Cloudflare公式サポート
   - 大規模プロダクション利用実績
   - 包括的なドキュメント

2. **スキーマファースト原則の維持**

   ```typescript
   // TypeSpecで定義されたスキーマを活用
   import type { components } from "./types/generated/api";
   
   const QuizSchema = z.object({
     question: z.string(),
     answerType: z.enum(["boolean", "free_text", "single_choice", "multiple_choice"]),
   }) satisfies z.ZodType<components["schemas"]["CreateQuizRequest"]>;
   ```

3. **開発効率の向上**

   ```typescript
   export class CreateQuiz extends OpenAPIRoute {
     schema = {
       request: {
         body: {
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
       // 完全な型安全性
       return c.json(data.body)
     }
   }
   ```

### スキーマファースト原則の維持方法

1. **TypeSpec定義の継続使用**
   - 単一の信頼できる情報源としてのTypeSpec
   - 自動型生成パイプラインの継続

2. **型定義の活用**

   ```typescript
   // 二重定義を回避し、TypeSpec由来の型を活用
   const createQuizSchema = z.object({
     // ...
   }) satisfies z.ZodType<components["schemas"]["CreateQuizRequest"]>;
   ```

3. **スキーマ検証の自動化**
   - 生成された型とZodスキーマの整合性チェック
   - コンパイル時の型検証

## 長期戦略

### openapi-ts-router成熟度の監視

1. **定期的な評価スケジュール**
   - 四半期ごとの成熟度チェック
   - 型安全性問題の解決状況確認
   - エコシステムの発展状況監視

2. **再移行の条件**
   - 型互換性問題の完全解決
   - バリデーション統合の改善
   - 十分なコミュニティサポート

3. **移行準備**
   - TypeSpecスキーマの継続維持
   - アーキテクチャの可搬性確保
   - 移行時のテスト戦略

### 技術的負債管理

1. **Chanfana特有の実装パターン**
   - クラスベース実装の標準化
   - 再利用可能なコンポーネント設計

2. **将来の移行コスト最小化**
   - ビジネスロジックの分離
   - ルーティング層の抽象化
   - テストカバレッジの維持

## 実装方針

### 段階的移行アプローチ

1. **Phase 1: 環境整備**
   - 依存関係の更新 (chanfana追加、openapi-ts-router削除)
   - 基本セットアップの実装

2. **Phase 2: API実装**
   - 既存エンドポイントのChanfana化
   - 型安全性の確保
   - バリデーション統合

3. **Phase 3: 品質確保**
   - テスト実装
   - ドキュメント自動生成
   - CI/CD統合

### 技術的制約の管理

1. **スキーマ二重定義の回避**

   ```typescript
   // TypeSpec由来の型を基準とした実装
   const schema = createZodSchema<components["schemas"]["Quiz"]>();
   ```

2. **型安全性の確保**
   - コンパイル時型チェック
   - ランタイムバリデーション
   - エンドポイント間の一貫性

## 評価基準

### 成功指標

1. **技術的品質**
   - 型エラーゼロの達成
   - テストカバレッジ90%以上
   - ビルド時間の改善

2. **開発効率**
   - 新規エンドポイント実装時間の短縮
   - バグ修正時間の短縮
   - ドキュメント自動生成の活用

3. **保守性**
   - コード可読性の向上
   - 技術的負債の削減
   - チーム学習コストの最小化

### 再評価スケジュール

- **3ヶ月後**: 初期評価（技術的安定性、開発効率）
- **6ヶ月後**: 中間評価（保守性、エコシステム発展）  
- **12ヶ月後**: 総合評価（openapi-ts-router再検討）

## 参考資料

- [Chanfana公式ドキュメント](https://chanfana.pages.dev/)
- [openapi-ts-router GitHub](https://github.com/callawaycloud/openapi-ts-router)
- [TypeSpec公式サイト](https://typespec.io/)
- [OpenAPI TypeScript](https://openapi-ts.dev/)
