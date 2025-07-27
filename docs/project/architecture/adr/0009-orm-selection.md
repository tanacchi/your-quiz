# ADR-0009: ORM選定

## Status

Accepted

## Context

### Background

- **SQLite + Cloudflare D1**を採用したデータベース設計において、ORMの選択が必要
- TypeScript統一による型安全性と開発体験向上を重視する
- パフォーマンス要件（API応答時間100ms）への対応が重要
- Cloudflare Workers環境での最適動作が重要

### Drivers

- **型安全性**: TypeScriptとの親和性・コンパイル時型チェック
- **パフォーマンス**: クエリ実行速度・オーバーヘッドの最小化
- **開発効率**: 学習コスト・設定の容易さ・生産性
- **SQL制御**: 複雑クエリ対応・クエリ最適化の容易さ
- **D1統合**: Cloudflare D1・Workers環境での最適動作
- **SQLite対応**: SQLite特有の制約・機能への対応

## Decision

### Chosen Option

### Drizzle ORM

TypeScript特化・軽量・SQL透明性・型安全性が現状の要件に最適で、PostgreSQL対応も良好でパフォーマンス要件を満たすことから、Drizzle ORMを採用する。

### Alternatives Considered

| ORM | メリット | デメリット | 適用場面 | TypeScript対応 | パフォーマンス | 学習コスト | 判定 |
|-----|----------|------------|----------|---------------|---------------|-----------|------|
| **Drizzle ORM** | **・TypeScript特化設計**<br>**・軽量（最小オーバーヘッド）**<br>**・SQL透明性**<br>**・型安全なクエリビルダー**<br>**・マイグレーション統合** | **・新しい技術**<br>**・エコシステム小**<br>**・学習リソース限定**<br>**・コミュニティ小** | **・TypeScript重視**<br>**・パフォーマンス重視**<br>**・SQL制御重要**<br>**・軽量化優先** | **★★★** | **★★★** | **中** | **○** |
| Prisma | ・成熟したエコシステム<br>・スキーマファースト設計<br>・マイグレーション管理<br>・Admin UI提供<br>・豊富なドキュメント | ・重いランタイム<br>・クエリ制限<br>・バンドルサイズ大<br>・Generated Client依存<br>・複雑クエリ困難 | ・RAD開発<br>・チーム開発<br>・管理機能重視<br>・プロトタイピング | ★★ | ★★ | 低 | △ |
| TypeORM | ・デコレータベース<br>・ActiveRecord/DataMapper<br>・複雑クエリ対応<br>・エンティティリレーション<br>・多機能 | ・設定複雑<br>・実行時型チェック<br>・パフォーマンス課題<br>・学習コスト高<br>・オーバーエンジニアリング | ・既存システム<br>・複雑ドメイン<br>・大規模開発<br>・OOP重視 | ★★ | ★ | 高 | △ |
| Kysely | ・クエリビルダー特化<br>・型安全<br>・軽量<br>・SQL制御良好<br>・PostgreSQL最適化 | ・ORM機能なし<br>・マイグレーション別途<br>・エンティティ機能限定<br>・学習コスト中 | ・パフォーマンス重視<br>・SQL熟練者<br>・クエリ制御重要<br>・軽量化優先 | ★★★ | ★★★ | 中 | △ |

### Drizzle vs Kysely 詳細比較

クイズアプリケーションの要件において、最終候補となったDrizzle ORMとKyselyの詳細比較：

#### 機能比較

| 機能領域 | Drizzle ORM | Kysely | 評価 |
|----------|-------------|--------|------|
| **型安全性** | スキーマファースト型生成 | 型推論ベースクエリビルダー | **Drizzle優位** |
| **SQL制御** | 透明性重視、Raw SQL併用可 | 完全なSQL制御 | **Kysely優位** |
| **マイグレーション** | 統合マイグレーション機能 | 別途ツール必要 | **Drizzle優位** |
| **ORM機能** | リレーション・エンティティ対応 | クエリビルダーのみ | **Drizzle優位** |
| **学習曲線** | スキーマ定義学習必要 | SQL知識ベース | **引き分け** |
| **パフォーマンス** | 軽量、最小オーバーヘッド | 極軽量、ほぼゼロオーバーヘッド | **Kysely優位** |

#### 開発体験比較

```typescript
// Drizzle ORM の例
const quizzes = pgTable('quizzes', {
  id: uuid('id').primaryKey().defaultRandom(),
  question: text('question').notNull(),
  correctAnswer: boolean('correct_answer').notNull(),
  tags: jsonb('tags').$type<string[]>(),
});

// 型安全なクエリ
const approvedQuizzes = await db
  .select()
  .from(quizzes)
  .where(eq(quizzes.status, 'approved'));

// Kysely の例
interface Database {
  quizzes: {
    id: string;
    question: string;
    correct_answer: boolean;
    tags: string[];
  };
}

// 型安全なクエリ
const approvedQuizzes = await db
  .selectFrom('quizzes')
  .selectAll()
  .where('status', '=', 'approved')
  .execute();
```

#### クイズアプリ要件への適合性

| 要件 | Drizzle ORM | Kysely | 理由 |
|------|-------------|--------|------|
| **シンプルなCRUD** | ○ | ○ | 両方とも対応可能 |
| **型安全性** | ◎ | ○ | Drizzleのスキーマファーストがより堅牢 |
| **開発効率** | ◎ | ○ | マイグレーション統合でDrizzle優位 |
| **100ms要件** | ○ | ◎ | Kyselyがわずかに軽量 |
| **PostgreSQL対応** | ◎ | ○ | Drizzleの方が統合的サポート |
| **小規模チーム** | ◎ | ○ | Drizzleの方が学習コストバランス良好 |

#### 将来拡張性考慮

**Drizzle ORM**:

- リレーション機能による複雑クエリ対応
- マイグレーション管理の継続性
- エコシステム成長への期待

**Kysely**:

- 極限までの軽量性維持
- SQL専門知識による高度な最適化
- パフォーマンスクリティカルな用途対応

#### 選定理由の詳細化

クイズアプリケーションでは以下の理由でDrizzle ORMを選定：

1. **統合的開発体験**: スキーマ定義・マイグレーション・クエリが一元管理
2. **型安全性の堅牢さ**: スキーマファーストによる確実な型推論
3. **小規模チーム適合性**: 学習コスト vs 機能性のバランスが最適
4. **将来拡張性**: リレーション機能による複雑化への対応余地
5. **PostgreSQL統合**: Cloudflare Hyperdriveとの親和性

**Kyselyを選択しなかった理由**:

- マイグレーション管理の別途対応コスト
- ORM機能なしによる将来の拡張性制約
- 極限の軽量性は現要件では過剰最適化

## Consequences

### Positive

- TypeScript特化による優れた型安全性とIntelliSense支援
- 軽量性によるパフォーマンス向上（最小ランタイムオーバーヘッド）
- SQL透明性による複雑クエリの最適化容易性
- PostgreSQL対応によるCloudflare Hyperdriveとの親和性
- マイグレーション統合による開発効率向上
- Zodとの連携による型定義の一元管理

### Negative

- 新しい技術による学習コスト（ドキュメント・事例の限定）
- エコシステムの制約（プラグイン・ツールの選択肢少）
- コミュニティサイズによるサポート制限
- デバッグツールの限定
- 企業採用実績の少なさ

### Neutral

- SQL知識要求によるチームの技術力依存
- シンプルな設計による機能制限（複雑なORM機能なし）

### Risks and Mitigation

| リスク | 発生確率 | 影響度 | 対策 |
|--------|----------|--------|------|
| 新技術による開発遅延 | 中 | 中 | 段階的導入・ペアプログラミング・公式ドキュメント活用 |
| エコシステム制約による機能不足 | 低 | 中 | 必要機能の事前検証・代替手段の準備 |
| 長期サポートへの不安 | 低 | 高 | アクティブな開発状況監視・移行計画の準備 |

## Implementation Notes

### Action Items

- [ ] Drizzle ORM セットアップとPostgreSQL統合
- [ ] スキーマ定義設計（型安全なテーブル定義）
- [ ] マイグレーション設定とワークフロー確立
- [ ] クエリビルダーパターンの標準化
- [ ] Zodスキーマとの連携設計

### 技術構成

```typescript
// Drizzle設定例 (SQLite + D1)
import { drizzle } from 'drizzle-orm/d1';
import { migrate } from 'drizzle-orm/d1/migrator';

// Cloudflare D1接続
export const db = drizzle(env.DB); // Cloudflare Workers環境変数

// 型安全なスキーマ定義
export const quizzes = sqliteTable('quizzes', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  question: text('question').notNull(),
  correctAnswer: integer('correct_answer', { mode: 'boolean' }).notNull(),
  explanation: text('explanation'),
  tags: text('tags', { mode: 'json' }).$type<string[]>(),
  status: text('status', { enum: ['pending', 'approved', 'rejected'] }).default('pending'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});
```

### Timeline

- **決定日**: 2025-07-27
- **実装開始**: DB設計フェーズ
- **完了予定**: 基本設定・スキーマ設計完了時

## References

- [Drizzle ORM 公式ドキュメント](https://orm.drizzle.team/)
- [PostgreSQL + Drizzle Best Practices](https://orm.drizzle.team/docs/get-started-postgresql)
- [ADR-0007: データベース選定](0007-database.md)

---
**Created**: 2025-07-27
**Last Updated**: 2025-07-27
**Authors**: Claude
**Reviewers**: [@tanacchi](https://github.com/tanacchi)
