
# TypeSpec .tsp 書き方チートシート（学部生向け 実践＋演習版）

## 概要

TypeSpec の仕様ファイル（*.tsp）を設計・実装・運用するための実用リファレンス。
基本的な構成、動くサンプル、各要素の意味、よくある誤りの対処法、発展的な応用、演習問題、運用ルールを一貫した形式でまとめている。
初学者が「どう書くか」「何を意識するか」「どうチェックするか」を自走できることを目的とする。

---

## 1. 全体像と役割（ファイルに含める要素）

仕様ファイルに入れるべき主要要素とそれぞれの役割:

1. **外部機能の取り込み（`import` / `using`）**: 拡張機能や出力先（OpenAPI など）を読み込む。
2. **名前空間とバージョン管理**: API を論理的に区切り、互換性を保ちながら拡張する。
3. **意味のある基本型（scalar）の定義**: 単なるプリミティブに意味を与え、可読性と意図の明示を高める。
4. **モデル（データ構造）の設計と継承**: 入出力の形を型として定義し、共通部分を再利用。
5. **エンドポイント（operation）の定義**: 受け取る引数と返す型を宣言する。
6. **典型例の定義（`@example`, `@opExample`）**: 実際の入力・出力例を埋めてドキュメントやテストに活用。
7. **説明（`@doc`, `/** */` コメント）**: 意図、背景、制約を明示する。
8. **再利用可能な共通ルール（trait / decorator）**: 認可やバリデーションなどの共通処理を抽象化。
9. **検証と運用**: example と型の整合性チェック、OpenAPI 出力の差分検出・互換性維持。

---

## 2. クイックスタート：まるごと使える完全サンプル

そのままコピーして動かせる、よく使う構成を詰め込んだ例。コメント付きで各要素の意図も含む。

```ts
import "@typespec/http";                     // HTTP / OpenAPI 変換用ライブラリ
import "@azure-tools/typespec-autorest";      // OpenAPI 出力拡張の例
using Http;                                   // REST風の operation 表現を有効化（公式例に近づける）

namespace MyService.ApiV1 {                   // バージョニング付き名前空間（互換性を取りやすくする）
  // 意味を持たせたスカラー（ただの string だが UTC 日時と明示）
  scalar UtcDateTime is string;

  // 共通エラーモデル
  model ErrorResponse {
    code: int32;                    // アプリケーション固有コード
    message: string;               // 利用者向け説明
    // internal 用の表示制御は公式の visibility 機構（例: lifecycle やカスタム modifier）を使う（ここではコメントで示す）。
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

⸻

3. 各要素の解説と補足（初学者向け）

3.1 import / using
	•	import は外部パッケージ（拡張機能や出力処理）を読み込む。
	•	using を使うとその機能を短く扱えるようになり、例: Http を有効にして REST 風の operation を直感的に書けるようにする。

コツ: 公式のテンプレートからコピーして、必要な import / using を最初に置くのを習慣にする。忘れると意図した構文が動かないことがある。

3.2 名前空間（namespace）
	•	API を論理的に区切る。バージョン（例: ApiV1）を含めると、後続の互換性を意識した変更がしやすい。

よくある誤り: 名前空間を使わずに全てグローバルに書くと型名衝突や拡張時の混乱が起きる。URI のバージョンと仕様側のバージョンがズレないように統一する。

3.3 スカラー（scalar）
	•	基本型に意味を付ける。例: UtcDateTime は内部的には文字列だが “UTC 日時” という意図を持たせる。
	•	発展的にはエンコーディングやバリデーションを定義して型安全性を強められる。

3.4 モデル（model）
	•	入出力の構造を定義する。共通のフィールドは継承（extends）でまとめて DRY にする。
	•	正常系と異常系を union で返すことでクライアントの分岐が明確になる。
	•	@doc は自動生成ドキュメント用の要約。
	•	内部用のフィールド制御は公式の visibility 機構（ライフサイクルやカスタム modifier など）を用い、表示/非表示を調整する。

3.5 例（@example / @opExample）
	•	@example は単体モデルの具体例を示す。
	•	@opExample は operation に対して「この入力ならこう返る」というシナリオを示す。
	•	タイトルや説明を加えると意図が読み手に伝わりやすい。

活用法: テスト生成、自動ドキュメントの “Try it out” プリセット、仕様レビュー時の期待値確認。

3.6 operation の戻り値設計（成功／失敗）
	•	AuthResponse | ErrorResponse のような union を用いると、成功時と失敗時の構造を型で明示できる。
	•	OpenAPI 生成では oneOf 相当となり、クライアント実装が安全に分岐できる。
	•	共通の ErrorResponse を使うとエラー処理の統一がしやすい。

⸻

4. 書くときのチェックリスト（確認項目）
	•	型名・フィールド名の命名が一貫している（PascalCase / camelCase など）。
	•	各 model や operation に説明（@doc / コメント）がある。
	•	代表的な入出力の例を @example / @opExample で定義している。
	•	正常系／異常系を union で分けてクライアントが扱える形になっている。
	•	再利用できる共通部分を継承や共通モデルにまとめて重複を避けている。
	•	名前空間によるバージョン分離が意識されている。
	•	出力先（OpenAPI など）に必要な import を漏らしていない。
	•	example と型のズレを検出する仕組み（テスト化）を用意している。
	•	内部用フィールドの可視性制御を公式機構で適切に扱っている。

⸻

5. よくある誤りと対処（FAQ）

Q1: @example を書いているのに生成時に反映されない
	•	例の値が正しく型に合っているか確認する。プロパティ名や型が違うと無視されたりエラーになる。

Q2: union を使うとクライアント側のエラー処理が複雑になる？
	•	正常／異常を型で明示することで、クライアントは明確に分岐できる。ステータスコード一本にまとめる設計より意図がはっきりする。

Q3: 名前空間を使っても型の衝突が出る
	•	インポートの書き方や using の漏れを確認。必要ならフルネーム（例: MyService.ApiV1.User）で参照して衝突を回避する。

Q4: @doc と /** */ コメントの使い分けは？
	•	両方使うのがベスト。@doc は短い要約やタイトル的な説明、/** */ は背景や制約などの詳細な補足。

⸻

6. 発展的な応用
	•	認可ルールの trait 化（再利用）:

@trait
@doc("管理者のみアクセスを許可する")
decorator requireAdmin() {
  // 実装側でトークンのスコープを検証する想定
}

@requireAdmin()
operation listAdmins(): AdminUser[] | ErrorResponse;


	•	discriminated union の設計の補足:
成功／失敗などの variant を明示的に分けて扱うために、フィールドで種類を示す（例: type: "success" | "error" を含めた構造）を付加すると、クライアント側の判定がより堅牢になる。必要であればそれを明示するフィールドを設けて分岐しやすくする。
	•	example を使った自動スキーマ検証: CI 上で example を解析し、モデルと一致しているかをチェックして差分を警告する。
	•	OpenAPI 出力の差分検知: 生成物を前回と比較して互換性を維持（破壊的変更の早期検出）。

⸻

7. 演習問題（手を動かして理解を定着させる）

演習1: 新しいリソース Product を追加
	•	Product は id, name, price, createdAt を持つモデルを定義。
	•	listProducts(pageSize: int32) と getProduct(id: string) operation を作り、両方に @opExample を付ける。
	•	成功/失敗は共通の ErrorResponse と union で返す。

演習2: 認可トレイトを自作
	•	requireAdmin という decorator/trait を定義し、listAdmins と getAdminUser 相当の operation に適用する。
	•	認可が効いていないケースの example も用意し、失敗時の挙動も明示する。

演習3: example とスキーマの一致チェック設計
	•	example を読み出し、対応する model の定義と比較する擬似コードを書く。
	•	CI で不一致があると警告を投げるパイプラインを想定し、仕様変更時の破壊的変更を防ぐ。

⸻

8. 再利用テンプレート（最小構成）

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


⸻

9. 補遺: コメントの使い分けと運用上の意味
	•	/** ... */: 背景、前提、例外、設計意図などを長めに説明する。
	•	@doc: 目次／要約的な短い説明。自動ドキュメントに使われる。
	•	@example / @opExample: 入出力の代表例。テストや API 仕様の “生の期待値”。
	•	// TODO:: 未確定事項、後で見直す箇所のマーキング。

⸻

10. ファイル分割と運用ルール

推奨分割
	•	models.tsp: 型・スカラー・共通継承関係。
	•	operations.tsp: API の operation 群。
	•	shared_traits.tsp: 認可や共通デコレータ／trait。
	•	examples.tsp: @example / @opExample を集約。テストと分離し変更追跡しやすくする。

運用ルール例
	•	モデルを修正したら関連する example も更新する。
	•	新規 operation には対応する @opExample を必須にし、CI でチェックする。
	•	OpenAPI 生成結果をコミット前に diff し、破壊的変更を検出する。
	•	名前空間とバージョンのポリシーを明文化し、仕様と実装でズレが出ないようにする。

⸻

11. 用語集（Glossary）
	•	TypeSpec: スキーマ・API 仕様を書くためのドメイン固有言語（DSL）。
	•	.tsp ファイル: TypeSpec のソースコード。
	•	model: データ構造（リクエスト/レスポンス）。
	•	operation: API 振る舞い（関数/エンドポイント）。
	•	scalar: 意味を持たせた基本型のラッパー。
	•	@example / @opExample: 具体的な入力・出力例。
	•	trait / decorator: 共通の振る舞いを再利用するためのメタ情報。
	•	namespace: 論理的な区切り（バージョンや機能ごと）。

⸻

12. 次のステップ（実践への展開）
	1.	このチートシートをコピーしてプロジェクト固有の base.tsp を作成する。
	2.	CI に example と model の一致検証を組み込み、自動的にズレを検出する。
	3.	API 仕様変更時に OpenAPI 出力を diff して互換性を保つ。
	4.	演習問題をチーム／クラスで回し、相互レビューを組み入れた学習ループを構築する。

必要であれば、これを Canvas 上の既存文書に反映するための具体的な差分（正規表現／挿入位置指定）を今すぐ作成します。どうしますか？
