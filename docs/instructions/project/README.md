# API実装ガイド（Your Quiz プロジェクト）

## 概要

Your QuizプロジェクトにおけるAPI実装のための包括的なガイドです。TypeScript + Hono + neverthrow + TypeSpecを使用した型安全で保守性の高いAPI開発を支援します。

## ドキュメント構成

### 1. [API実装ルール](./api-implementation-rules.md)

プロジェクト固有のAPI実装標準を定義しています。

**主な内容**：
- 必須技術スタック（Hono, neverthrow, Zod, TypeScript）
- 実装パターン（スキーマファースト、エラーハンドリング、バリデーション）
- 型アサーションのルール
- 禁止事項と推奨パターン
- Cloudflare Workers固有の考慮事項

**対象読者**: 開発者全員（実装前に必読）

### 2. [実装サンプル集](./api-implementation-samples.md)

具体的なコード例を通じて実装パターンを示しています。

**主な内容**：
- CRUD操作の完全なサンプル（GET, POST, PUT, DELETE）
- 高度な実装パターン（クエリパラメータ、複合バリデーション、非同期処理）
- エラーハンドリングのベストプラクティス
- テストコードの例
- 実装チェックポイント

**対象読者**: 実装担当者（実装時の参考資料）

### 3. [ライブラリ使用ガイド](./api-libraries-guide.md)

採用ライブラリの正しい使用方法と禁止パターンを説明しています。

**主な内容**：
- 採用ライブラリ一覧（Hono, neverthrow, Zod, TypeScript）
- 各ライブラリのベストプラクティス
- 禁止パターンと代替案
- バージョン管理とアップデート指針
- 新しいライブラリ導入時の判断基準

**対象読者**: アーキテクト、技術選定担当者

## 実装フロー

新しいAPIエンドポイントを実装する際は、以下の順序で参照してください：

1. **[API実装ルール](./api-implementation-rules.md)** で全体的な方針を確認
2. **[実装サンプル集](./api-implementation-samples.md)** で具体的な実装パターンを参照
3. **[ライブラリ使用ガイド](./api-libraries-guide.md)** でライブラリの正しい使用方法を確認
4. 実装後に各ドキュメントのチェックリストで品質確認

## 技術スタック概要

### Core Stack
- **API Framework**: Hono `^4.8.10`
- **Error Handling**: neverthrow `^8.2.0` 
- **Validation**: Zod `^4.0.14`
- **Language**: TypeScript `^5.9.2`

### Infrastructure
- **Runtime**: Cloudflare Workers
- **Database**: SQLite (D1 Database)
- **Schema Management**: TypeSpec + openapi-typescript

### Development Tools
- **Testing**: Vitest
- **Linting**: Biome
- **Build**: Wrangler

## プロジェクト固有の特徴

### 1. TypeSpec Schema-First開発
すべてのAPIはTypeSpecでスキーマ定義してから実装します。

### 2. neverthrow必須エラーハンドリング
`try-catch`は禁止で、`Result`型による関数型エラーハンドリングを採用しています。

### 3. 型安全性の最大化
`as any`は禁止で、TypeScriptの型システムを最大限活用します。

### 4. Cloudflare Workers最適化
エッジ実行環境に最適化された実装パターンを採用しています。

## 品質基準

各実装で以下を満たす必要があります：

- [ ] TypeSpecスキーマが定義されている
- [ ] neverthrowによるエラーハンドリング
- [ ] Zodによるランタイムバリデーション
- [ ] TypeScript型チェックが通る
- [ ] 統一されたレスポンス形式
- [ ] 適切なHTTPステータスコード

## 更新履歴

- 2024-01-XX: 初版作成（API実装ルール、サンプル集、ライブラリガイド）

## 関連ドキュメント

- [技術選定](../../project/architecture/tech-selection.md)
- [開発ワークフロー](../shared/workflow/00.02_workflow.md)
- [ADR-0022: TypeSpecスキーマファースト開発](../../project/adr/0022-typespec-schema-first-hono-integration-strategy.md)

このガイドに従って、一貫性と品質を保ったAPI実装を行ってください。