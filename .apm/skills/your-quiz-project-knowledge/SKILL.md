---
name: your-quiz-project-knowledge
description: Provides cross-cutting project knowledge for Your Quiz — a quiz creation and learning app with anonymous users. Activate when you need overall project context: product overview, ADR decisions, system architecture (modular monolith + hexagonal), NFR targets, tech stack summary, or when navigating between domain/API/UI areas. Reference index pointing to docs/project/** source-of-truth artifacts.
license: MIT
metadata:
  author: personal
  version: "0.1.0"
compatibility: Requires access to docs/project/** in this repository.
---

# Your Quiz プロジェクト知識（横断索引）

## 利用タイミング

- プロジェクト全体の概要・背景を把握したいとき
- ADR（アーキテクチャ決定記録）を参照したいとき
- システムアーキテクチャ・NFR・技術スタックを確認したいとき
- ドメイン / API / UI の全体マップが必要なとき
- 仕様書・UI 設計・テスト・toolchain のドキュメントを探すとき

## 確認する入力

- 目的（設計確認 / 実装参照 / 仕様理解 / ADR 参照）
- 関心領域（architecture / domain / api / ui / spec / test / toolchain）

## Workflow

1. 関心領域を特定する
2. 下記の索引から該当 `docs/project/**` ファイルへ直接アクセスする
3. ドメイン実装には `your-quiz-domain` skill、API 実装には `your-quiz-api` skill を呼び出す
4. skill 内の `references/` を補足として参照する

## プロダクト概要

- **アプリ**: Your Quiz — ○×クイズを作成・共有・回答するWebアプリ
- **ユーザー**: 匿名（JWT + デバイス識別）、クイズ作成者と学習者の両役割
- [要件定義](docs/project/specifications/requirements/)
- [ユーザーストーリー](docs/project/specifications/user-stories/)

## アーキテクチャ索引

- **パターン**: モジュラーモノリス + ヘキサゴナルアーキテクチャ（Ports & Adapters）
- [システム全体俯瞰](docs/project/architecture/system-overview.md)
- [技術選定](docs/project/architecture/tech-selection.md)
- [通信パターン](docs/project/architecture/communication-patterns.md)
- [データアーキテクチャ](docs/project/architecture/data-architecture.md)
- [NFR（非機能要件）](docs/project/architecture/non-functional-requirements.md): API 応答 ≤ 100ms (95%ile)、検索 ≤ 200ms、同時接続 1000、アップタイム 99.9%

## ADR 索引

- [ADR 一覧](docs/project/adr/) — 25件
- 主要決定: モジュラーモノリス(0001)、ヘキサゴナル(0002)、Next.js(0003)、Hono(0006)、SQLite+D1(0007)、Zod(0010)、Vercel(0013)、Cloudflare Workers(0014)

## 技術スタック サマリー

| 領域 | 採用技術 |
|------|---------|
| Frontend | Next.js 15 (App Router), Tailwind CSS, Jotai |
| Backend | Hono `^4.8.10`, TypeSpec, neverthrow `^8.2.0`, Zod `^4.0.14` |
| DB | SQLite + Cloudflare D1, Drizzle ORM |
| Infra | Vercel（UI）, Cloudflare Workers（API）|
| Test | Vitest, Playwright |

## ドメイン / API / UI マップ

| 領域 | 参照先 | ドキュメント |
|------|--------|------------|
| DDD モデル・境界・集約 | skill: `your-quiz-domain` | [docs/project/ddd-design/](docs/project/ddd-design/) |
| API catalog・実装ルール | skill: `your-quiz-api` | [docs/project/api-design/](docs/project/api-design/) |
| UI 設計・フロー | — | [docs/project/ui-design/](docs/project/ui-design/) |
| 仕様書 | — | [docs/project/specifications/](docs/project/specifications/) |

## toolchain / test ドキュメント

- [pnpm スクリプト一覧](docs/instructions/project/pnpm-scripts.md): `test`, `test:unit`, `test:bdd`, `test:e2e`, `build`, `lint`, `typecheck`
- [UI 設計](docs/project/ui-design/): サイトマップ、ユーザーフロー、ワイヤーフレーム、コンポーネント

## 出力形式

- 索引から該当ドキュメントへのパスを返す
- 必要に応じて `your-quiz-domain` / `your-quiz-api` skill へ誘導する

## ガードレール

- `docs/project/**` ファイルは変更しない（source of truth）
- ドメイン実装の詳細は `your-quiz-domain`、API 実装の詳細は `your-quiz-api` で扱う
- 汎用 method（手順・設計パターン）は対応する tanacchi/skills skill を参照する

## 評価シナリオ

1. 「プロジェクトの技術スタックを教えて」→ 技術スタック サマリー を返し、詳細は tech-selection.md へ
2. 「ADR を確認したい」→ docs/project/adr/ へ誘導
3. 「API の設計・実装については？」→ `your-quiz-api` skill へ誘導
4. 「ドメインモデルの境界は？」→ `your-quiz-domain` skill へ誘導

## 関連リファレンス

- [references/project-index.md](references/project-index.md) — ドキュメント体系の全体説明
- 関連 skill（汎用 method 層）: `spec-authoring`, `architecture-method`, `workflow-orchestration`
- 関連 skill（project 事実層）: `your-quiz-api`, `your-quiz-domain`
