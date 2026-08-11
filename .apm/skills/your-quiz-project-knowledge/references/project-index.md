# Your Quiz ドキュメント体系

## docs/project/** — source of truth

```
docs/project/
├── adr/                        # ADR（アーキテクチャ決定記録）25件
│   ├── 0001-architecture-pattern.md
│   ├── 0002-application-architecture.md
│   └── ... (0003〜0025)
├── api-design/                 # API 設計（→ your-quiz-api skill）
│   ├── README.md               # API 全体概要・主要フロー
│   ├── api-catalog/            # エンドポイント一覧（8ファイル）
│   ├── design-principles.md    # 設計原則
│   ├── non-functional-requirements.md
│   ├── implementation-migration-plan.md
│   ├── pub-sub-integration.md
│   └── sdk-generation-strategy.md
├── architecture/               # システムアーキテクチャ
│   ├── system-overview.md      # システム全体俯瞰・モジュール構成
│   ├── tech-selection.md       # 技術選定結果まとめ
│   ├── communication-patterns.md
│   ├── data-architecture.md
│   ├── non-functional-requirements.md
│   └── diagrams/               # 構成図（Mermaid等）
├── ddd-design/                 # DDD 設計（→ your-quiz-domain skill）
│   ├── 2.00_domain-model-overview.md  # ドメインモデル全体図・実装指針
│   ├── 2.02_domain-understanding/
│   ├── 2.02_user-flow-analysis/
│   ├── 2.03_ubiquitous-language/      # ユビキタス言語辞書
│   ├── 2.04_event-storming/
│   ├── 2.05_domain-object-extraction/
│   ├── 2.06_entity-relationship-analysis/
│   ├── 2.07_domain-service-extraction/
│   ├── 2.08_aggregate-design/         # 各集約の詳細設計
│   ├── 2.09_bounded-context-definition/
│   ├── 2.10_domain-events-catalog/    # ドメインイベント一覧
│   └── 2.11_ontology-creation/
├── specifications/             # 仕様書
│   ├── requirements/           # 機能要件
│   ├── user-stories/           # ユーザーストーリー
│   ├── success-scenarios/      # 成功シナリオ
│   ├── error-scenarios/        # エラーシナリオ
│   └── future-work.md
└── ui-design/                  # UI 設計
    ├── 1.00_overview.md
    ├── 1.01_sitemap.yaml       # 全画面一覧
    ├── 1.02_user-stories/
    ├── 2.01_user-flows/
    ├── 3.01_wireframes/
    ├── 4.01_components/
    └── 5.01_integration/
```

## docs/instructions/project/ — 実装ルール（your-quiz-api skill が吸収）

```
docs/instructions/project/
├── api-implementation-rules.md   # 実装必須ルール（neverthrow/Zod パターン）
├── api-implementation-samples.md # 実装サンプルコード
├── api-libraries-guide.md        # ライブラリ使用ガイド（Hono/neverthrow/Zod）
├── pnpm-scripts.md               # pnpm スクリプト一覧
└── README.md                     # 索引
```

## .apm/skills/ — project skill 層（このリポジトリ）

```
.apm/skills/
├── your-quiz-project-knowledge/  # 横断索引（本 skill）
├── your-quiz-api/                # API catalog・実装ルール
└── your-quiz-domain/             # DDD モデル・境界・集約
```
