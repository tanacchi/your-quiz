# TypeSpec .tsp 書き方チートシート（学部生向け 実践＋演習版）

## 概要

TypeSpec の仕様ファイル（\*.tsp）を設計・実装・運用するための実用リファレンス。基本的な構成、動くサンプル、各要素の意味、よくある誤りの対処、リアルタイム系（WebSocket / PubSub）への応用、演習問題、運用ルールを一貫した形式でまとめている。初学者が「どう書くか」「何を意識するか」「どう検証するか」「どのようなプロトコルにも適用できるか」を自走できることを目的とする。

---

## 1. 全体像と役割（ファイルに含める要素）

仕様ファイルに含めるべき主要要素とそれぞれの役割:

1. **外部機能の取り込み（**``** / **``**）**: 拡張機能や出力先（OpenAPI など）を読み込む。
2. **名前空間とバージョン管理**: API を論理的に区切り、互換性を保ちながら拡張する。
3. **意味のある基本型（scalar）の定義**: 単なるプリミティブに意味を与え、可読性と意図を明確にする。
4. **モデル（データ構造）の設計と継承**: 入出力の形を型として定義し、共通部分を再利用する。
5. **エンドポイント（operation）の定義**: 受け取る引数と返す型を宣言する。
6. **典型例の定義（**``**, **``**）**: 代表的な入出力例を埋めてドキュメントやテストに活用する。
7. **説明（**``**, **``** コメント）**: 意図、背景、制約を明示する。
8. **再利用可能な共通ルール（trait / decorator）**: 認可やバリデーションなどの共通処理を抽象化する。
9. **検証と運用**: example と型の整合性チェック、出力（OpenAPI 等）の差分検出・互換性維持。

---

## 2. クイックスタート：まるごと使える完全サンプル

そのままコピーして動かせる構成を詰め込んだ例。コメント付きで各要素の意図も含む。

```ts
import "@typespec/http";                    // HTTP / OpenAPI 変換用ライブラリ
import "@azure-tools/typespec-autorest";     // OpenAPI 出力拡張の例
using Http;                                    // REST風の operation 表現を有効化（公式例に近づける）

namespace MyService.ApiV1 {                    // バージョニング付き名前空間（互換性を取りやすくする）
  // 意味を持たせたスカラー（ただの string だが UTC 日時として扱うことを明示）
  scalar UtcDateTime is string;

  // 共通エラーモデル
  model ErrorResponse {
    code: int32;                    // アプリケーション固有コード
    message: string;               // 利用者向け説明
    // 内部用フィールドの公開制御は visibility 機構で行う（必要ならカスタム modifier を使う）。
    debugInfo?: string;            // 内部ログ／デバッグ用（外部には出さない）
  }

  // ページネーション付き汎用レスポンス
  model PaginatedResult<T> {
    items: T[];                    // 実データ
    continuationToken?: string;    // 次ページ取得用トークン
    totalCount: int32;             // 総件数
  }

  // ユーザーの基本情報
  model User {
    id: string;
    name: string;
    email: string;
    createdAt: UtcDateTime;        // 登録日時（UTC）
    status: string;               // 例: "active", "suspended"
  }

  // 管理者は User を拡張して権限レベルを追加
  @doc("管理者ユーザーに権限レベルを付与")
  model AdminUser extends User {
    @doc("管理者の強さ。1=低, 10=高")
    level: int32;
  }

  // 認証成功レスポンス
  model AuthResponse {
    token: string;                // JWT 等
    expiresAt: UtcDateTime;       // トークンの有効期限
    user: User;                   // ログインユーザー情報
  }

  // 新規ユーザー登録入力
  model CreateUserRequest {
    name: string;
    email: string;
    password: string;             // 実運用ではハッシュ化前提
  }

  // 一覧取得クエリ（オプション付き）
  model ListUsersParams {
    status?: string;             // フィルタ（ステータス）
    continuationToken?: string;  // ページング
    pageSize: int32;             // 1ページあたり
  }

  // 典型的な User の例（ドキュメント／テスト用）
  @example(#{
    id: "user-abc",
    name: "Alice",
    email: "alice@example.com",
    createdAt: "2024-08-01T12:00:00Z",
    status: "active"
  }, title: "基本ユーザーの例")
  model ExampleUser is User;

  // 認証エンドポイント（成功/失敗を union で返す）
  @doc("メールとパスワードで認証し JWT を返す")
  @opExample(
    {
      parameters: #{ email: "alice@example.com", password: "securePass!" },
      returnType: #{
        token: "eyJhbGci...",
        expiresAt: "2025-08-01T00:00:00Z",
        user: #{ id: "user-abc", name: "Alice", email: "alice@example.com", createdAt: "2024-08-01T12:00:00Z", status: "active" }
      }
    },
    title: "ログイン成功例",
    description: "正しい資格情報で JWT を取得する例"
  )
  operation login(email: string, password: string): AuthResponse | ErrorResponse;

  // ユーザー一覧取得（ページネーション＋フィルタ）
  @doc("アクティブなユーザーを条件付きで一覧取得する")
  @opExample(
    {
      parameters: #{ status: "active", pageSize: 2 },
      returnType: #{
        items: [
          #{ id: "user-1", name: "Bob", email: "bob@example.com", createdAt: "2024-01-10T08:00:00Z", status: "active" },
          #{ id: "user-2", name: "Carol", email: "carol@example.com", createdAt: "2024-02-15T09:30:00Z", status: "active" }
        ],
        continuationToken: "token-xyz",
        totalCount: 50
      }
    },
    title: "ユーザー一覧取得例"
  )
  operation listUsers(params: ListUsersParams): PaginatedResult<User> | ErrorResponse;

  // 単一ユーザー取得
  @doc("ユーザー ID から単一のユーザーを取得する")
  @opExample(
    { parameters: #{ id: "user-1" }, returnType: #{ id: "user-1", name: "Bob", email: "bob@example.com", createdAt: "2024-01-10T08:00:00Z", status: "active" } },
    title: "単一ユーザー取得例"
  )
  operation getUser(id: string): User | ErrorResponse;

  // 管理者一覧（認可済み想定）
  @doc("管理者ユーザーの一覧を返す（認可チェックは実装側で行う）")
  operation listAdmins(): AdminUser[] | ErrorResponse;
}
```

---

## 3. 各要素の解説と補足（初学者向け）

### 3.1 `import` / `using`

- `import` は外部パッケージ（拡張機能や出力処理）を読み込む。
- `using` を使うとその機能を短く扱えるようになり、たとえば `Http` を有効にして REST 風の `operation` を直感的に書けるようにする。

**コツ:** 公式テンプレートからコピーして、必要な `import` / `using` を先頭に置く習慣をつける。忘れると意図した構文が動かない。

### 3.2 名前空間（`namespace`）

- API を論理的に区切る。バージョン（例: `ApiV1`）を含めると後方互換性を意識した変更がしやすい。

**よくある誤り:** 名前空間を使わず全てグローバルに書くと型名の衝突や拡張時の混乱が起きる。URI 側と仕様側のバージョンがずれないよう統一する。

### 3.3 スカラー（`scalar`）

- 基本型に意味を与える。例: `UtcDateTime` は内部的には文字列だが「UTC 日時」という意図を持たせる。
- 発展的にはエンコーディングやバリデーションを定義して型安全性を強化できる。

### 3.4 モデル（`model`）

- 入出力の構造を定義する。共通フィールドは継承（`extends`）でまとめて重複を避ける（DRY）。
- 正常系と異常系を union で返すとクライアント側の分岐が明確になる。
- `@doc` は自動生成ドキュメント用の要約。
- 表示/非表示などの細かい出力制御には公式の visibility 機構を用いる。

### 3.5 例（`@example` / `@opExample`）

- `@example` は単体モデルの具体例を示す。
- `@opExample` は operation に対して「この入力ならこう返る」という典型シナリオを示す。
- タイトルや説明を加えると意図が読み手に伝わりやすい。

**活用例:** テスト生成、自動ドキュメントの "Try it out" プリセット、仕様レビューの期待値比較。

### 3.6 operation の戻り値設計（成功／失敗）

- `AuthResponse | ErrorResponse` のような union を使うと、成功時と失敗時の構造を型で明示できる。
- OpenAPI 出力では `oneOf` 相当となり、クライアントが安全に分岐できる。
- 共通の `ErrorResponse` を使うとエラー処理の一貫性が保てる。

---

## 4. チェックリスト（実装時の確認項目）

- 実際に OpenAPI spec ファイルを生成を実行し、問題なく生成完了するか確認する。

---

## 5. よくある誤りと対処（FAQ）

**Q1: **``** を書いても生成時に反映されない**

- 入力例が定義された型に準拠しているか（プロパティ名/型）を確認する。ズレがあると無視またはエラーになる。

**Q2: union を使うとクライアントのエラー処理が複雑になるのでは？**

- 正常／異常を型で明示することで、安全に分岐でき、ステータスコードだけの設計より意図が明確になる。

**Q3: 名前空間を使っても型が衝突する**

- インポートや `using` の書き方、参照方法（フルネーム指定など）を確認する。

**Q4: **``** と **``** コメントの使い分け**

- 両方使うのがベスト。`@doc` は要約・説明文、`/** */` は背景や制約などの詳細補足として使う。

---

## 6. 発展的な応用

- **認可ルールの trait 化（再利用）**:
  ```ts
  @trait
  @doc("管理者のみアクセスを許可する")
  decorator requireAdmin() {
    // 実装側でトークンのスコープを検証する想定
  }

  @requireAdmin()
  operation listAdmins(): AdminUser[] | ErrorResponse;
  ```
- **discriminated union の設計補強**:\
  成功／失敗などの variant を明示的に区別するフィールド（例: `type: "success" | "error"`）を含めると、クライアント側の判定がより堅牢になる。
- **example を使った自動スキーマ検証**: CI で example を解析し、モデルと一致しているかチェックし差分を警告する。
- **OpenAPI 出力の差分検知**: 生成された出力を前回と比較し、互換性を保つ（破壊的変更の早期検出）。

---

## 7. Realtime / WebSocket & PubSub ガイド

### 7.1 概要

TypeSpec はプロトコル非依存なので、WebSocket や pub/sub 型のリアルタイムイベント／メッセージ契約を安全に定義できる。REST 風の operation に限らず、イベントのペイロード、サブスクライブ要求、通知、エラー、認可ルールなどをスキーマとして書き、実装側と契約を明確にする。

### 7.2 スキーマ設計の基本パターン

```ts
namespace Realtime.Events {
  model BaseEnvelope {
    eventType: string;   // 例: "chat.message", "user.updated"
    timestamp: string;   // ISO 形式
    traceId?: string;    // 相関トレース用
  }

  model UserUpdatedPayload {
    userId: string;
    name?: string;
    email?: string;
  }

  model ChatMessagePayload {
    roomId: string;
    fromUserId: string;
    content: string;
  }

  model Event {
    envelope: BaseEnvelope;
    data: UserUpdatedPayload | ChatMessagePayload; // union（必要に応じて discriminated を併用）
  }

  model SubscribeRequest {
    topic: string;        // 例: "room:123"
    filters?: string[];   // イベント種別フィルタ
  }

  model ErrorNotification {
    code: int32;
    message: string;
  }

  @opExample(
    { parameters: #{ topic: "room:123", filters: ["chat.message"] }, returnType: #{ success: true } },
    title: "サブスクライブ要求例"
  )
  operation subscribe(req: SubscribeRequest): #{ success: true } | ErrorNotification;
}
```

### 7.3 実装との接続パターン

- **サーバ側**: TypeSpec 定義から型を生成し、受信した WebSocket メッセージをバリデートして内部 pub/sub ブローカー（例: Redis, NATS, Azure Web PubSub）に流す／イベントを配信する。
- **クライアント側**: 受け取ったイベントを TypeSpec 由来の型でパースし、`eventType` や discriminated フィールドで安全に分岐処理。
- **ドキュメント／テスト**: `@opExample` で典型的な subscribe→event フローを記述し、CI で通信パターンの整合性を検証する。

### 7.4 メリットと注意点

**メリット**

- メッセージ契約を一元管理でき、型生成／テスト／ドキュメントに活用できる。
- 成功/失敗や variant を型で明示することで堅牢性が上がる。
- trait で認可やバージョニングを共通化できる。

**注意点**

- TypeSpec は接続管理（コネクション維持、再接続、スケーリング）を提供しない。あくまでインターフェース／契約定義に特化。
- リアルタイム性を含むシステム設計（バッファ、再送、バックプレッシャー等）は実装側で補う必要がある。

---

## 8. 演習問題（手を動かして理解を定着させる）

### 演習1: 新しいリソース `Product` を追加

- `Product` は `id`, `name`, `price`, `createdAt` を持つモデルを定義。
- `listProducts(pageSize: int32)` と `getProduct(id: string)` operation を作り、両方に `@opExample` を付ける。
- 成功/失敗は共通の `ErrorResponse` と union で返す。

### 演習2: 認可トレイトを自作

- `requireAdmin` という decorator/trait を定義し、`listAdmins` と `getAdminUser` 相当の operation に適用する。
- 認可が効いていないケースの example も用意し、失敗時の挙動も明示する。

### 演習3: example とスキーマの一致チェック設計

- example を読み出し、対応する model の定義と比較する擬似コードを書く。
- CI で不一致があると警告を投げるパイプラインを想定し、仕様変更時の破壊的変更を防ぐ。

---

## 9. 再利用テンプレート（最小構成）

```ts
import "@typespec/http";
using Http;

namespace Service {
  model ErrorResponse { code: int32; message: string; }
  model Item { id: string; name: string; }

  @doc("アイテムを取得する")
  @opExample(
    { parameters: #{ id: "item-1" }, returnType: #{ id: "item-1", name: "Widget" } },
    title: "取得例"
  )
  operation getItem(id: string): Item | ErrorResponse;
}
```

---

## 10. 補遺: コメントの使い分けと運用上の意味

- `/** ... */`: 背景、前提、例外、設計意図などを長めに説明する。
- `@doc`: 目次／要約的な短い説明。自動ドキュメントに使われる。
- `@example` / `@opExample`: 入出力の代表例。テストや API 仕様の "生の期待値"。
- `// TODO:`: 未確定事項、後で見直す箇所のマーキング。

---

## 11. ファイル分割と運用ルール

### 推奨分割

- `models.tsp`: 型・スカラー・共通継承関係。
- `operations.tsp`: API の operation 群。
- `shared_traits.tsp`: 認可や共通デコレータ／trait。
- `examples.tsp`: `@example` / `@opExample` を集約。テストと分離し変更追跡しやすくする。

### 運用ルール例

- モデルを修正したら関連する example も更新する。
- 新規 operation には対応する `@opExample` を必須にし、CI でチェックする。
- OpenAPI 生成結果をコミット前に diff し、破壊的変更を検出する。
- 名前空間とバージョンのポリシーを明文化し、仕様と実装でズレが出ないようにする。

---

## 12. 用語集（Glossary）

- **TypeSpec**: スキーマ・API 仕様を書くためのドメイン固有言語（DSL）。
- **.tsp ファイル**: TypeSpec のソースコード。
- **model**: データ構造（リクエスト/レスポンス）。
- **operation**: API 振る舞い（関数/エンドポイント）。
- **scalar**: 意味を持たせた基本型のラッパー。
- **@example / @opExample**: 具体的な入力・出力例。
- **trait / decorator**: 共通の振る舞いを再利用するためのメタ情報。
- **namespace**: 論理的な区切り（バージョンや機能ごと）。

---

## 13. 次のステップ（実践への展開）

1. このチートシートをコピーしてプロジェクト固有の `base.tsp` を作成する。
2. CI に example と model の一致検証を組み込み、自動的にズレを検出する。
3. API 仕様変更時に OpenAPI 出力を diff して互換性を保つ。
4. 演習問題をチーム／クラスで回し、相互レビューを組み入れた学習ループを構築する。

