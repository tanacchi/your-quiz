# TODO

この文書は明示的に指示されない限り読まないでください。

## ドキュメント系

- ドキュメントへのリンクはリポジトリ直下からの相対パスにしてください。リンクテキストはそのままでもOK。その他について、DDD 設計工程で他に実施する必要のある事はありますか？ドキュメントに不備やリンク切れ、矛盾などないですか？なければレビューの準備をしてください。
- ユーザストーリーの失敗・成功で分けているのをストーリー別にファイルを作成するようにする？
- 他に. DDD ガイドラインテキストで同様のファイルはないか、確認してください。
- 〇〇を作成するためにXXを作るなど、ドキュメント間の依存を明確にしたい。まず全体像を作成する。次に各ドキュメントに、依存関係を記載する。さらに、その旨を workflow を記載。
- 必須でないドキュメントがあるならその時点で炙り出したい。
- ドキュメントをコンパクトにしたい。

## API の zod 周り

- Quiz のフィールドに deleted at を入れるべき？state で入れるのは違和感があります。

## quiz-managementコンテキスト エンティティ実装タスク

### 3. FreeTextSolution 値オブジェクト実装
- [ ] ディレクトリ作成: `api/src/contexts/quiz-management/domain/entities/solutions/free-text/`
- [ ] free-text-solution-schema.ts実装（マッチング戦略・大文字小文字区別）
- [ ] free-text-solution-patches.ts実装（文字列trim・戦略修正）
- [ ] FreeTextSolution.ts実装（EntityBase継承・マッチング機能）
- [ ] FreeTextSolution.spec.ts実装（マッチング戦略別テスト）
- [ ] 個別テスト実行・成功確認
- [ ] 個別ビルド確認
- [ ] 型チェック確認

### 4. Choice 値オブジェクト実装
- [ ] ディレクトリ作成: `api/src/contexts/quiz-management/domain/entities/solutions/choice/`
- [ ] choice-schema.ts実装（テキスト・順序・正解フラグ）
- [ ] choice-patches.ts実装（テキストtrim・順序修正）
- [ ] Choice.ts実装（EntityBase継承・順序管理）
- [ ] Choice.spec.ts実装（順序・正解判定テスト）
- [ ] 個別テスト実行・成功確認
- [ ] 個別ビルド確認
- [ ] 型チェック確認

### 5. MultipleChoiceSolution 値オブジェクト実装
- [ ] ディレクトリ作成: `api/src/contexts/quiz-management/domain/entities/solutions/multiple-choice/`
- [ ] multiple-choice-solution-schema.ts実装（選択肢・最小正解数制約）
- [ ] multiple-choice-solution-patches.ts実装（選択肢修正・重複除去）
- [ ] MultipleChoiceSolution.ts実装（EntityBase継承・Choice依存）
- [ ] MultipleChoiceSolution.spec.ts実装（複数正解・部分点テスト）
- [ ] 個別テスト実行・成功確認
- [ ] 個別ビルド確認
- [ ] 型チェック確認

### 6. SingleChoiceSolution 値オブジェクト実装
- [ ] ディレクトリ作成: `api/src/contexts/quiz-management/domain/entities/solutions/single-choice/`
- [ ] single-choice-solution-schema.ts実装（選択肢・単一正解制約）
- [ ] single-choice-solution-patches.ts実装（選択肢修正・正解数チェック）
- [ ] SingleChoiceSolution.ts実装（EntityBase継承・Choice依存）
- [ ] SingleChoiceSolution.spec.ts実装（単一正解・4択対応テスト）
- [ ] 個別テスト実行・成功確認
- [ ] 個別ビルド確認
- [ ] 型チェック確認

### 統合・最終確認タスク
- [ ] Solution discriminated union作成（solutions/index.ts）
- [ ] 全エンティティ統合テスト実行
- [ ] クロスエンティティ依存関係テスト（Question→Solution→Choice）
- [ ] 全体ビルド成功確認: `pnpm build`
- [ ] 全体テストスイート実行: `pnpm test`
- [ ] 型チェック実行: `pnpm typecheck`
- [ ] リント実行: `pnpm lint`
- [ ] インポート・エクスポート整合性確認
- [ ] APIスキーマとの整合性確認
- [ ] QuizSummary実装との品質比較確認
- [ ] docs/instructions/shared/workflow/10.02_entity-implementation-guide.md準拠確認
- [ ] 品質ゲート通過確認（ビルド・テスト・lint・typecheck全て成功）

### 実装品質指標
- [ ] TypeScript厳密型チェック（any型・as・!.禁止）遵守
- [ ] neverthrowによる型安全なエラーハンドリング実装
- [ ] Patch System統合による自動修正候補提案
- [ ] EntityBase/DraftBase継承によるSelf-type pattern実装
- [ ] 完全Immutability保証（全操作で新インスタンス生成）
- [ ] 包括的テストカバレッジ95%達成
- [ ] QuizSummary実装と同等の品質確保

## そのほか

- [ ] SQL の整合性チェックをする仕組み、テスト
- [ ] api/src 配下の全ての typescript ファイルについて、docs/instructions/shared/languages/typescript.md およびdocs/instructions/shared/workflow/09.01_unit-testing.md を参考にしつつ、テストを増強し、Statements、Branches、Lines など全てのカバレッジで95%以上達成を全てのファイルで満たすようにテストを強化してください.
- [ ] mutation-test の運用ドキュメント作成（unit-test に続く）
