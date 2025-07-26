# リポジトリ設定

## 目的

プロジェクト開始時に一度だけ実行する、コード品質・セキュリティ・CI/CD等のリポジトリ共通設定を行い、開発効率と品質を最大化する基盤を構築する。

## 遵守事項

- **全言語共通の設定として統一**：特定の言語・フレームワークに依存しない汎用的な設定
- **段階的導入**：プロジェクトの成熟度に応じて必要な設定から順次導入
- **自動化の徹底**：手動チェックに依存せず、ツールによる自動検証を基本とする
- **チーム全体での設定共有**：設定ファイルをリポジトリに含めて全メンバーで共有
- **継続的改善**：設定の効果を定期的に検証し、必要に応じて調整

## 備えるべき仕組み

| 仕組み | 目的 | ツール例 |
|-------|------|----------|
| **コード品質統一** | スタイル・品質ルールの自動適用 | Biome, ESLint + Prettier, Deno fmt |
| **Mutation Testing** | テストコード自体の品質測定 | Stryker, PITest |
| **静的コード解析** | 総合的な品質・セキュリティ・技術的負債の検出 | SonarQube, CodeClimate, Codacy |
| **コミット品質管理** | コミット前の自動チェック | Husky, pre-commit, Lefthook |
| **段階的品質チェック** | 変更ファイルのみの効率的チェック | lint-staged, pre-commit hooks |
| **コミットメッセージ規約** | 一貫したコミット履歴の維持 | Commitlint, commitizen |
| **セキュリティ脆弱性検出** | 依存関係の脆弱性自動チェック | audit-ci, Snyk, OWASP Dependency Check |
| **依存関係自動更新** | セキュリティパッチ・アップデートの自動化 | Dependabot, Renovate, Greenkeeper |
| **API文書自動生成** | コードから最新API文書を自動生成 | TypeDoc, JSDoc, OpenAPI Generator |
| **ログ・監視基盤** | 構造化ログとヘルスチェック | Winston, Pino, 各種APMツール |

## CI/CDパイプライン構成

### 必要なジョブとトリガー

| ジョブ名 | トリガー | 処理内容 |
|---------|----------|----------|
| **code-quality** | PR作成・更新, push to main/develop | lint, format, type check |
| **unit-test** | PR作成・更新, push to main/develop | 単体テスト実行、カバレッジ測定 |
| **mutation-test** | PR作成・更新 (optional), push to main | mutation testing実行 |
| **integration-test** | PR作成・更新, push to main/develop | 結合テスト、DB連携テスト |
| **e2e-test** | PR作成・更新, push to main/develop | E2Eテスト、UI自動テスト |
| **security-scan** | PR作成・更新, push to main/develop | 依存関係脆弱性、SAST、DAST |
| **static-analysis** | PR作成・更新, push to main/develop | SonarQube等の静的解析 |
| **build** | push to main/develop | アプリケーションビルド、成果物生成 |
| **deploy-staging** | push to develop | ステージング環境への自動デプロイ |
| **deploy-production** | push to main, タグ作成 | 本番環境への自動デプロイ |
| **performance-test** | deploy-staging完了後 | 負荷テスト、パフォーマンステスト |
| **smoke-test** | deploy後 | デプロイ後の基本動作確認 |

### パイプライン設計原則

- **並列実行**: 独立したジョブは並列実行して時間短縮
- **早期失敗**: 品質チェックで問題があれば即座に停止
- **段階的デプロイ**: staging → production の段階的リリース
- **ロールバック対応**: 問題発生時の迅速な巻き戻し機能
- **通知機能**: 失敗・成功の適切なチーム通知

## Git Hooks設定

### pre-commit設定

コミット前に lint を実行し、コード品質に問題のあるコードの混入を防ぐ

### pre-push設定

プッシュ前にビルドとテストを実行し、リモートリポジトリに問題のあるコードが送信されるのを防ぐ

## .gitignore 設定

gitignore.io からプロジェクトに適したテンプレートを選択し、不要なファイルを除外する

## 完了判定基準

- [ ] **コード品質統一**: 自動lint・formatが正常動作
- [ ] **Mutation testing**: テスト品質測定が実行される
- [ ] **静的解析**: 品質分析が自動実行される
- [ ] **コミット管理**: pre-commitチェックが動作
- [ ] **CI/CD**: 全ジョブが正常実行される
- [ ] **セキュリティ**: 脆弱性スキャンが動作
- [ ] **自動デプロイ**: staging/production展開が成功

この設定により、高品質で安全、かつ効率的な開発環境が構築され、チーム全体の開発生産性と成果物の品質が大幅に向上する。
