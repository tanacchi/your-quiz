# ADR-0022: TypeSpecスキーマファースト開発におけるHono統合ライブラリ選択

## ステータス

**承認済み** - Chanfana不採用。型の厳格性とTypeSpecスキーマファースト原則を優先し、純粋なHono + TypeSpec生成型の組み合わせを採用。

## 文脈

Quiz APIの開発において、TypeSpecによるスキーマファースト開発を前提として、Honoとの統合に最適なライブラリを選択する必要がある。当初はopenapi-ts-routerを採用したが、実装過程で同ライブラリが開発初期段階であり、実用に耐えない問題が多数発覚した。

### 現在の技術スタック

- **スキーマ定義**: TypeSpec (.tsp)
- **型生成**: openapi-typescript
- **Webフレームワーク**: Hono (Cloudflare Workers)
- **ルーティング**: ~~openapi-ts-router~~ ~~Chanfana~~ → **純粋なHono**
- **バリデーション**: Zod + TypeSpec生成型

## 検討対象

### Option A: 継続 (TypeSpec + openapi-ts-router) - 断念

### Option B: 暫定移行 (TypeSpec + Chanfana) - 検討後不採用

### Option C: 純粋なHono + TypeSpec生成型 - **最終採用**

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

## Chanfana検討・不採用理由

### 不採用理由

1. **型の厳格性における妥協**
   - TypeSpec生成型との完全な整合性が困難
   - スキーマ定義の二重管理が必要
   - 型安全性の一部が犠牲になる可能性

2. **スキーマファースト原則への制約**
   - Chanfana独自のスキーマ記述が必要
   - TypeSpecの型定義と乖離するリスク
   - 単一の信頼できる情報源(SSOT)の原則に反する

3. **学習コストとロックイン**
   - Chanfana特有のクラスベースAPI実装パターン
   - 将来的な技術選択の制約
   - 純粋なHonoパターンからの乖離

## 最終採用: 純粋なHono + TypeSpec生成型

### 採用理由

1. **完全な型安全性の実現**
   - TypeSpec生成型の直接利用
   - コンパイル時の型チェック完全性
   - ランタイム型検証との整合性保証

2. **スキーマファースト原則の完全な維持**
   - TypeSpecが単一の信頼できる情報源(SSOT)
   - 型定義の二重管理が不要
   - スキーマ変更の自動反映

3. **実装パターンの明確性**

   ```typescript
   import type { components } from "./types/generated/api";
   import { zValidator } from "@hono/zod-validator";
   
   // TypeSpec生成型を直接活用
   type CreateQuizRequest = components["schemas"]["CreateQuizRequest"];
   
   const createQuizSchema = z.object({
     question: z.string(),
     answerType: z.enum(["boolean", "free_text", "single_choice", "multiple_choice"]),
   }) satisfies z.ZodType<CreateQuizRequest>;
   
   app.post("/quiz", zValidator("json", createQuizSchema), async (c) => {
     const data = c.req.valid("json"); // 完全な型推論
     return c.json(data);
   });
   ```

## 長期戦略

### TypeSpecエコシステムの継続的改善

1. **型生成パイプラインの最適化**
   - openapi-typescriptの定期的アップデート
   - 生成コードの品質向上
   - ビルドパフォーマンスの改善

2. **バリデーション統合の強化**
   - TypeSpec→Zodスキーマ自動生成の検討
   - コンパイル時バリデーション整合性チェック
   - ランタイムエラー品質の向上

3. **将来の技術選択肢の評価**
   - openapi-ts-router成熟度の定期チェック
   - 新たなTypeSpec統合ライブラリの評価
   - エコシステム全体の発展状況監視

### アーキテクチャ品質の継続的改善

1. **型安全性の強化**
   - TypeSpec生成型の活用範囲拡大
   - エンドツーエンドの型整合性確保
   - 型エラーの早期検出機構

2. **コード品質の維持**
   - 関数型ルーティングパターンの標準化
   - 再利用可能なバリデーション関数設計
   - ビジネスロジックとルーティング層の分離

## 実装方針

### 段階的実装アプローチ

1. **Phase 1: 基盤整備**
   - TypeSpec生成型の統合設定
   - Zodバリデーション統合の確立
   - 基本ルーティングパターンの標準化

2. **Phase 2: API実装**
   - 既存エンドポイントの純粋なHono実装
   - TypeSpec生成型の完全活用
   - バリデーション統合の実装

3. **Phase 3: 品質確保**
   - 型安全性テストの実装
   - エンドツーエンド型整合性の確保
   - CI/CDパイプライン統合

### 技術的制約の管理

1. **完全な型整合性の確保**

   ```typescript
   // TypeSpec生成型を直接利用し、二重定義を完全に回避
   import type { components } from "./types/generated/api";
   
   type QuizRequest = components["schemas"]["CreateQuizRequest"];
   
   const quizSchema = z.object({
     question: z.string(),
     answerType: z.enum(["boolean", "free_text"]),
   }) satisfies z.ZodType<QuizRequest>;
   ```

2. **スキーマファースト原則の徹底**
   - TypeSpecが単一の情報源(SSOT)
   - 手動スキーマ定義の完全排除
   - 自動生成型の直接活用

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

### 継続的評価スケジュール

- **3ヶ月後**: 初期評価（型安全性実現度、開発効率）
- **6ヶ月後**: 中間評価（コード品質、保守性）  
- **12ヶ月後**: 総合評価（TypeSpecエコシステム発展、代替技術検討）

## 参考資料

- [Chanfana公式ドキュメント](https://chanfana.pages.dev/)
- [openapi-ts-router GitHub](https://github.com/callawaycloud/openapi-ts-router)
- [TypeSpec公式サイト](https://typespec.io/)
- [OpenAPI TypeScript](https://openapi-ts.dev/)
