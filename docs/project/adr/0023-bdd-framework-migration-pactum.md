# ADR-0023: BDD Framework Migration to PactumJS

## Status

Accepted

## Context

### Background

クイズアプリケーションのBDD実装において、Cucumber.js（ADR-0020で決定）を使用していたが、TypeScript × Cloudflare Workers環境での実装コスト削減と開発効率向上のため、PactumJSへの移行を検討することとなった。

現状の課題：

- Cucumber.jsのGherkin → Steps実装コストが高い
- TypeScript型共有が手動で、仕様↔実装driftが発生しやすい  
- 業務例外テスト（外部API障害等）のモック実装が複雑
- OpenAPIスキーマとの自動連携機能がない

### Drivers

- **開発効率重視**: ステップ定義の実装工数削減が急務
- **型安全性強化**: TypeScript完全対応による開発者体験向上
- **OpenAPI連携自動化**: 仕様drift防止と網羅性保証
- **Cloudflare D1/外部APIモック**: テスト環境の簡易構築

## Decision

### Chosen Option

**PactumJS + Jest**をBDDテスティングフレームワークとして採用し、Cucumber.jsから移行する

選択理由：

1. **TypeScript ネイティブ対応**: Chainable DSLによる型安全なAPIテスト記述
2. **実装コスト削減**: ステップ定義不要で直接spec()記述、約30%工数削減
3. **OpenAPI自動連携**: `@pactum/swagger-coverage`による自動検証・カバレッジ
4. **モック機能内蔵**: MockServer機能で外部API・D1モック1行実装
5. **CI/CD統合容易**: Node環境でのシンプルな実行とレポート生成

### Alternatives Considered

以下の代替案を検討した：

| 選択肢 | メリット | デメリット | 評価 |
|--------|----------|------------|------|
| Cucumber.js継続 | 業界標準、豊富なエコシステム | 実装コスト高、型共有手動 | ★★ |
| **PactumJS** | **TypeScript特化、実装効率、OpenAPI連携** | **新興技術（成熟度）** | **★★★** |
| QuickPickle | Vitest完全統合、高速実行 | コミュニティ小、ドキュメント不足 | ★ |
| Playwright-BDD | E2E特化最適化 | API単体テスト不適、実行コスト高 | ★ |

## Consequences

### Positive

- **実装工数30%削減**: Gherkinステップ定義 → Chainable DSL直接記述
- **型安全性向上**: TypeScriptネイティブによる開発時型チェック
- **自動OpenAPI検証**: 仕様driftの早期検出、カバレッジ可視化
- **テスト環境簡素化**: MockServer + Miniflareによるワンライナー設定
- **CI/CD効率化**: Node環境での軽量実行とHTML/JSON レポート自動生成

### Negative

- **学習コスト**: Cucumber.jsからPactumJS DSLへの移行学習必要
- **新興技術リスク**: Cucumber.jsと比較してコミュニティが小さい
- **Gherkin記法廃止**: ビジネス側との共通記法がMarkdown + コメント記述に変更

### Neutral

- **ユビキタス言語保持**: テスト記述内のコメント・describe文で継続利用
- **BDD思想継続**: Given-When-Thenの思考プロセスをspec構造で表現
- **テストシナリオ移行**: 既存4フィーチャーファイルをspec形式に変換

### Risks and Mitigation

| リスク | 発生確率 | 影響度 | 対策 |
|--------|----------|--------|------|
| PactumJS開発停止 | 低 | 高 | v3安定版、201+ contributors、月間DL 80k確認済み |
| QA側Gherkin要求 | 中 | 中 | Markdown → Pactum spec自動生成スクリプト用意 |
| 外部ツール連携問題 | 低 | 中 | Jest ecosystem活用、必要時カスタムレポーター作成 |

## Implementation Notes

### Action Items

- [x] PactumJS依存関係追加（pactum, jest, @types/jest, ts-jest）
- [x] Cucumber.js関連設定・依存関係削除
- [x] pactum.config.cjs設定ファイル作成（ESM対応）
- [x] 既存4フィーチャーファイルのspec変換（features配下に構造化配置）
- [x] ステップ定義 → Chainable DSL + ヘルパーAPI変換
- [x] npm scriptsの`test:bdd` → `test:api`更新
- [x] ドキュメント更新（BDD実装ガイド、pnpm scripts一覧、tech-selection.md）
- [x] Jest設定ファイル作成（TypeScript対応、ESM互換）
- [x] ディレクトリ構造整理（features/fixtures/helpers分離）
- [x] Biomeコードフォーマット適用

### Migration Strategy

**段階的移行アプローチ**：

1. **Phase 1**: 環境構築（PactumJS + Jest設定）
2. **Phase 2**: 1フィーチャー変換でPoC実行
3. **Phase 3**: 全フィーチャー変換とCucumber.js削除
4. **Phase 4**: CI/CD統合と運用最適化

### Timeline

- **決定日**: 2025-08-08
- **実装開始**: 2025-08-08  
- **完了予定**: 2025-08-08

## References

- [PactumJS移行提案ドキュメント](../../../tmp/bdd-flowの技術選定再検討.md)
- [ADR-0020: Cucumber.js決定](0020-bdd-testing-framework.md) (Superseded)
- [PactumJS公式ドキュメント](https://pactumjs.github.io/)
- [@pactum/swagger-coverage](https://github.com/pactumjs/pactum-swagger-coverage)
- [TypeSpec OpenAPI生成](../../../instructions/shared/tools/typespec.md)

---

**Created**: 2025-08-08
**Last Updated**: 2025-08-08  
**Authors**: 開発チーム
**Reviewers**: [@tanacchi](https://github.com/tanacchi)
