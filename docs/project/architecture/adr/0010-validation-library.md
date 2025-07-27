# ADR-0010: バリデーションライブラリ選定

## Status

Accepted

## Context

クイズアプリケーションでは、フロントエンド・バックエンド双方でユーザー入力値の検証が必要となる。TypeScript環境での型安全性を活かしつつ、開発効率とランタイムパフォーマンスを両立するバリデーションライブラリの選定が求められる。

### Background

- TypeScript First開発での型安全性確保
- クイズデータ・回答データの入力検証
- API リクエスト/レスポンスの型チェック
- フロントエンド フォーム入力の検証

### Drivers

- TypeScript型システムとの統合
- ランタイムパフォーマンス
- 学習コストとチーム適合性
- エラーメッセージの品質

## Decision

### Chosen Option

選定技術: zod

TypeScript First設計による優秀な型推論、カスタムバリデーション機能、充実したエコシステムを重視。小規模クイズアプリの要件には十分で、学習コストも許容範囲内。

### Alternatives Considered

以下の代替案を検討した：

| 選択肢 | メリット | デメリット | 適用場面 | 型推論 | パフォーマンス | エラーメッセージ | 評価 |
|--------|----------|------------|----------|--------|---------------|-----------------|------|
| **zod** | **TypeScript First<br>優秀な型推論<br>カスタムバリデーション<br>エコシステム充実** | **ランタイムオーバーヘッド<br>複雑スキーマで型推論遅延<br>学習コスト** | **API入力検証<br>設定ファイル<br>フォーム検証** | **高** | **中** | **高** | **★★★** |
| yup | 成熟ライブラリ<br>豊富な機能<br>Formikとの親和性<br>学習リソース多 | TypeScript対応弱<br>型推論限定的<br>設定複雑 | 従来型開発<br>JavaScript中心<br>フォーム中心 | 低 | 高 | 中 | ★ |
| joi | 高機能<br>豊富な検証ルール<br>企業採用実績<br>安定性 | TypeScript対応なし<br>型安全性皆無<br>学習コスト高 | Node.js専用<br>既存システム<br>複雑検証 | 無 | 高 | 高 | ★ |

## Consequences

### Positive

- TypeScript型システムとの完全統合による型安全性向上
- スキーマ定義から自動型生成によるDRY原則実現
- カスタムバリデーション機能による柔軟な検証ロジック実装
- 高品質なエラーメッセージによるユーザビリティ向上

### Negative

- ランタイムバリデーションによるパフォーマンスオーバーヘッド
- 複雑なスキーマ定義時の型推論パフォーマンス低下
- 新技術のためチーム学習コストが発生

### Neutral

- エコシステムの成長に依存する将来性
- バンドルサイズの増加（許容範囲内）

### Risks and Mitigation

| リスク | 発生確率 | 影響度 | 対策 |
|--------|----------|--------|------|
| パフォーマンス低下 | 中 | 中 | 必要な箇所のみ適用、キャッシュ活用 |
| 学習コスト | 高 | 低 | ドキュメント整備、ペアプログラミング |
| エコシステム依存 | 低 | 中 | 移行容易性の確保 |

## Implementation Notes

### Action Items

- [ ] zod ライブラリのインストール
- [ ] クイズスキーマ定義の実装
- [ ] API バリデーションミドルウェアの実装
- [ ] フロントエンド フォームバリデーションの実装

### Usage Guidelines

- スキーマ定義は型定義ファイルと同一ファイルに配置
- エラーメッセージは日本語で統一
- パフォーマンスが重要な箇所では事前バリデーション検討

### Timeline

- **決定日**: 2025-01-27
- **実装開始**: DDD設計工程
- **完了予定**: API設計工程

## References

- [zod 公式ドキュメント](https://zod.dev/)
- [TypeScript schema validation comparison](https://github.com/colinhacks/zod#comparison)
- [ADR-0003: フロントエンドフレームワーク選定](0003-frontend-framework.md)
- [docs/project/architecture/tech-selection.md](../tech-selection.md)

---
**Created**: 2025-01-27
**Last Updated**: 2025-01-27
**Authors**: [@tanacchi](https://github.com/tanacchi)
**Reviewers**: [@tanacchi](https://github.com/tanacchi)
