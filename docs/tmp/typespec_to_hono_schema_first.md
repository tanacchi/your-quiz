# TypeSpec → OpenAPI → Hono (OpenAPI + openapi-typescript + openapi-ts-router) ワークフロー

目的: **スキーマ・ファースト**な API 開発を TypeSpec から始めて、Hono 上で型安全に実装・検証・提供する。仕様を唯一の真実とし、クライアント・サーバ・ドキュメントの整合性を保つ。

## 1. 全体の流れ概要

1. TypeSpec で API と型の仕様を書く（.tsp）
2. TypeSpec を OpenAPI 3.1 形式にコンパイル（エクスポート）
3. `openapi-typescript` で OpenAPI から TypeScript 型を生成
4. `openapi-ts-router` を使って Hono のルーティング・バリデーション基盤を作る
5. 実装の検証とテスト（型チェック・契約テスト・E2E）
6. 変更があったら仕様を更新し、自動的に逆流してスケルトンが追従する CI パイプライン

---

## 2. ディレクトリ構成の例

```
/ (repo root)
├── spec/                     # TypeSpec ソースと生成物
│   ├── api.tsp              # TypeSpec 仕様のエントリ
│   ├── tsconfig.tsp.json    # (必要なら) TypeSpec 用設定
│   └── generated/
│       └── openapi.yaml     # TypeSpec から吐き出された OpenAPI
├── src/
│   ├── types/               # openapi-typescript 出力の型定義
│   │   └── api.d.ts
│   ├── router/              # ルーティングとハンドラ定義
│   │   └── index.ts
│   ├── handlers/            # 実際のビジネスロジック（ユースケース）
│   └── app.ts               # Hono アプリのエントリポイント
├── tests/                   # 契約テスト・モック・E2E
├── scripts/                 # 補助スクリプト（生成・検証）
└── .github/workflows/       # CI 定義
```

---

## 3. ステップ詳細

### 3.1 TypeSpec で仕様を書く

- `api.tsp` にエンドポイント、パスパラメータ、クエリ、リクエスト/レスポンススキーマを明示的に書く。
- 型の再利用（共通スキーマ）は `model` や `alias` を使う。
- 例（簡略版）:

```ts
// spec/api.tsp
namespace api {
  model User {
    id: string;
    name: string;
  }

  @route(method: "POST", path: "/users")
  op createUser(body: User): User;
}
```

### 3.2 OpenAPI へコンパイル

- TypeSpec の OpenAPI エミッターを使う。通常は `@typespec/openapi3` を指定して出力。
- コマンド例:

```bash
npx @typespec/cli compile spec/api.tsp --emit-openapi=spec/generated/openapi.yaml
```

- 出力された `openapi.yaml` は仕様の真のソースとしてコミット対象にする。
- 変更があるたびに再生成する（自動化スクリプトを後述）。

### 3.3 OpenAPI から TypeScript 型を生成

- `openapi-typescript` を使い、`paths` や `components` 由来の型を生成。

```bash
npx openapi-typescript spec/generated/openapi.yaml --output src/types/api.d.ts
```

- 生成物には API のリクエスト/レスポンスの型定義が含まれ、これを Hono + router に流す。

### 3.4 Hono + openapi-ts-router でルーティングとバリデーションを作る

- `openapi-ts-router` を用いて OpenAPI 型を基にルートを型安全に定義。
- 例:

```ts
// src/router/index.ts
import { Hono } from 'hono';
import { createHonoOpenApiRouter } from 'openapi-ts-router';
import type { paths } from '../types/api'; // 生成された型
import { z } from 'zod';

const app = new Hono();
const api = createHonoOpenApiRouter<paths>(app);

api.post('/users', {
  bodyValidator: z.object({ name: z.string() }),
  handler: async c => {
    const { name } = c.req.valid('json');
    // ビジネスロジック呼び出し
    const created = { id: 'u123', name };
    return c.json(created);
  },
});

export default app;
```

- OpenAPI 仕様と実装の乖離は型チェック／コンパイル時に明示される。

### 3.5 テストと契約検証

- **型レベルの検証**: TypeScript コンパイルによる整合性。
- **契約テスト（Contract Tests）**: 生成された OpenAPI を基準に、実装が期待どおりの振る舞いをするかをチェック（例: `pact`, 自作スクリプト）。
- **E2E テスト**: 実際に Hono サーバを起動して HTTP レスポンスを検証。OpenAPI の例に従ったリクエストを送る。
- **スキーマ準拠のモック**: テスト用に OpenAPI からモックサーバを立てて、クライアントと比較。

---

## 4. 開発時の自動化スクリプト例

`./scripts/generate.sh`:

```bash
#!/bin/bash
set -e
# 1. TypeSpec → OpenAPI
npx @typespec/cli compile spec/api.tsp --emit-openapi=spec/generated/openapi.yaml
# 2. OpenAPI → TS 型
npx openapi-typescript spec/generated/openapi.yaml --output src/types/api.d.ts
```

CI ではこのスクリプトを実行し、差分があれば "仕様と実装の不整合" として失敗させる。

---

## 5. CI に組み込むルール（例: GitHub Actions）

1. `spec/api.tsp` をコミット/変更 → 自動的に `scripts/generate.sh` を実行
2. 生成された `src/types/api.d.ts` に未コミットの差分があればエラー（仕様を更新したときに型を再生成していないミスを防ぐ）
3. `tsc --noEmit` で型チェック。
4. 契約テストを走らせる（例: OpenAPI を基にしたリクエスト/レスポンスが期待どおりか）。
5. E2E サーバ起動 + スモークテスト。

---

## 6. 変更フローと反映の方針

- 仕様変更はすべて `spec/api.tsp` へ。そこから `scripts/generate.sh` を走らせる。
- 生成された OpenAPI/型を使って実装を更新。型エラーが出る場合は実装側を修正か、仕様の不備として戻す。
- 仕様と実装の整合性が取れるまで PR は通さない（自動チェック）。

---

## 7. ベストプラクティス / 注意点

- **単一の真実**: `spec/api.tsp` を唯一の変更起点とし、それ以外（ハンドラの型注釈・ドキュメント等）は自動派生に限定する。
- **バージョニング**: OpenAPI に `version` や `servers` を明記して、複数環境対応を明確化。
- **非機能要件の注記**: Throttling,認可ヘッダー, エラーフォーマットなども TypeSpec に記載可能な場合は入れる。
- **フォールトトレランスの検証**: スキーマ通りでも外部依存が壊れたときのフェイルセーフをテストに含める。
- **ドキュメント用途**: 生成された OpenAPI を Swagger UI / Redoc に流すと、常に最新の API ドキュメントになる。

---

## 8. 例: 変更を加えたときのコミット/PR のチェックリスト

- [ ] `spec/api.tsp` を編集したなら `./scripts/generate.sh` をローカルで実行したか？
- [ ] `src/types/api.d.ts` に未コミット差分はないか？
- [ ] `tsc --noEmit` で型エラーが出ていないか？
- [ ] 契約テストはパスしているか？
- [ ] E2E スモークは通っているか？
- [ ] API Client SDL（クライアントライブラリ）を生成するパイプラインが更新され、依存先にバージョンが伝播しているか？

---

## 9. API Client SDL ライブラリの構成と運用

### 9.1 目的と位置づけ
API 側で管理する API Client SDL（Service Definition Library / Schema Definition Library）とは、TypeSpec で定義した契約を起点に自動生成される型安全なクライアントライブラリで、他のサービスや内部モジュールがその API を呼ぶときの共通インターフェースとなる。仕様と実装の整合性を保ちつつ、呼び出し側に便利なラッパーやリトライ、認証付加などを持たせられる。

### 9.2 推奨ディレクトリ構成（モノレポ想定）
```
/ (repo root)
├── spec/
│   └── api.tsp
├── packages/
│   ├── server/                # Hono 実装（前述のサーバ）
│   └── client-sdl/           # 生成されるクライアントライブラリ
│       ├── src/
│       │   └── index.ts       # エントリ（生成されたフェッチラッパー等）
│       ├── generated/         # OpenAPI 由来の型クライアント（型 + fetch wrapper）
│       ├── package.json
│       └── tests/             # 呼び出し側用の契約テスト/モック検証
├── src/                      # 既存 server 向け（あるいは統合している場合）
```

### 9.3 生成の流れ（追加のパイプライン）
1. TypeSpec → OpenAPI（既存の流れ）
2. OpenAPI から型定義（既存: `openapi-typescript`）を生成。
3. 型に基づいたフェッチラッパーの生成（SDL）
   * **選択肢:**
     * `openapi-fetch` をベースにラッパーを手動で組む（軽量、拡張しやすい）。
     * 独自テンプレートで `fetch`/`undici` を使ったクライアントコードをコード生成（例: Mustache/Handlebars テンプレート + OpenAPI の構造をパース）。
     * `openapi-typescript-codegen` 等を使って client stub を出す（必要に応じてラップして認証やリトライを注入）。
4. 生成物を `packages/client-sdl/generated` に置き、エクスポート層で共通の呼び出しインターフェースを提供。
5. `client-sdl` を npm スコープ付き（社内レジストリでも可）でバージョニング・公開。サーバ側や他サービスはこれを依存として取り込み、型安全に API を呼び出す。

### 9.4 機能的に含めるべき要素（SDL ライブラリ側）
- 型安全なリクエスト/レスポンス（OpenAPI 由来）
- 認証ヘッダーの注入機構（例: トークンリフレッシュと自動再試行）
- リトライポリシー（Idempotent なエンドポイント向け）
- タイムアウト設定
- エラーハンドリングラッパー（共通のエラー型への変換）
- サニティチェック用の内蔵契約テストヘルパー（返ってきたレスポンスを OpenAPI と照合するオプション）
- 計測フック（メトリクス送信のインターフェース）

### 9.5 バージョニングとリリース戦略
- **ソース・オブ・トゥルース:** `spec/api.tsp` のコミットハッシュ／タグをベースにバージョンを決める（例: `1.4.0+spec.abc123` か、SemVer の `MAJOR.MINOR.PATCH` として OpenAPI の `info.version` を同期）。
- **自動リリース:** `scripts/generate.sh` に続けて `packages/client-sdl` のビルドとパブリッシュを行う。CI で `spec/api.tsp` 変更 → 再生成 → 型チェック → `client-sdl` のバージョンを上げて社内 registry へ公開。
- **互換性の保証:** `openapi-diff` 等で前バージョンとのスキーマ差分を出し、破壊的変更があればメジャーバージョンを上げるフローを入れる。

### 9.6 依存先への伝播と契約検証
- `client-sdl` を使う側は自動テストにおいて「このライブラリが提供する呼び出しで実際の server 実装に打って確認」する契約テストを持つ。
- サーバ側も `client-sdl` をモックして自身の実装を呼び出す逆向き契約テスト（双方向の契約保持）。

### 9.7 CI／PR フローへの組み込み（拡張）
- `spec/api.tsp` を変更 →
  1. OpenAPI 生成 → 型生成 → サーバの型チェック
  2. `client-sdl` の再生成 → ライブラリのビルド → スナップショットテスト（例: 生成コードの差分）
  3. 破壊的変更検出 → バージョニングルール適用
  4. 依存サービス側にバージョン更新の告知（CHANGELOG 自動生成 + PR テンプレートに埋め込み）

### 9.8 配布と消費側の取り込み例
```bash
# internal registry から取得
npm install @yourorg/client-sdl@1.4.0
```
```ts
import { createClient } from '@yourorg/client-sdl';
const client = createClient({ baseUrl: process.env.API_BASE, tokenProvider });
const user = await client.users.createUser({ name: 'taro' });
```

### 9.9 エコシステムとの連携
- ドキュメント: 生成 OpenAPI を Redoc/Swagger UI に差し込み、SDL README に使用例を自動差分更新。
- モニタリング: クライアント側計測とサーバ側 SLO 比較を容易にするメトリクスタグ付与。

---

## 10. 拡張アイデア

- `pre-commit` フックで `./scripts/generate.sh` を自動実行し、型生成漏れを防ぐ。
- GitHub Actions で `changeset` 風に仕様差分を diff 化してレビューしやすくする。
- TypeSpec の注釈拡張を自作して、認可ポリシーやメトリクスのメタ情報を入れ込み、実装側で自動バインディング。

