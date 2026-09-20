# ADR-0030: quiz-management の UserIdentity 解決と D1 書き込み経路の整合

## Status

Proposed

## Context

### Background

PR #80（issue #46）で quiz-management の書き込み API を開けたが、本番 D1 では書き込みが一切機能しない。本番相当のローカル D1（`wrangler dev` を `--env` なしで起動、`NODE_ENV=production` / `USE_MOCK_DB=false`）で次を確認した。

- `POST /quizzes` が `500 FOREIGN KEY constraint failed` になる。ADR-0029 の暫定方針1に従い `c.var.userFingerprint`（UUID）を `Quiz.creator_id` に入れているが、この列は `UserIdentity.id`（INTEGER）への FK である
- D1 上の既存クイズへの PATCH / DELETE が常に 403 になる。所有者比較が整数 ID と UUID の比較になるため
- `CreateQuizUseCase` が `Date.now().toString()` を ID にし、`INSERT INTO Quiz (id, …)` に明示的に渡している
- `D1QuizRepository.findById` は Zod の変換結果を捨てて生の行を返すため、`creatorId` が実行時に number になる。`UserIdentity.id` を解決して文字列で比較しても一致しない
- 作成処理は solution・Quiz・Choice を独立した `run()` で順に実行しており、途中で失敗すると孤立行が残る。single_choice の INSERT は MySQL 構文（`() VALUES ()`）で、SQLite では失敗する
- `SingleChoiceSolution` と `MultipleChoiceSolution` は別々に 1 から採番されるのに、`Choice` は `solution_id` しか持たない。ID が一致すると、取得では別クイズの選択肢が混ざり、削除では別クイズの選択肢まで消える

BDD は `dev-mock`（Mock リポジトリ）でしか走らないため、これらはすべてテストで検出されなかった。

匿名識別子を `UserIdentity.id` に解決する処理は、ADR-0028 により独立ポート `IUserIdentityResolver`（find-or-create）として実装済みで、quiz-learning だけが使っている。ただし次の課題がある。

- 閲覧系で使うと、閲覧者が来るたびに `UserIdentity` の行が作られる
- D1 実装は SELECT → INSERT の2文で原子的でなく、同じ識別子の初回同時リクエストは UNIQUE 違反で 500 になる
- Mock 実装は識別子をそのまま返す。`anonymousSession` ミドルウェアは `Authorization: Fingerprint <uuid>` を受け付けるため識別子は事実上のベアラートークンであり、Mock 環境では公開クイズの `creatorId` や 403 の詳細から他人の識別子が読めてしまう

### Drivers

- ADR-0029 の未完了 Action Item「`UserIdentity` 解決の実装に伴い `creatorId` の暫定措置を解消する」
- issue #76（D1 書き込み経路の ID 採番・UserIdentity 解決）
- ADR-0026 / ADR-0028: ミドルウェアでは永続化せず、必要な処理だけが遅延解決する方針
- TypeSpec の `UserId` は構造上 `UserIdentity.id` を指している（`api/spec/models/user.tsp`）
- UI（`ui/src`）は `creatorId` を参照しておらず、意味を確定しても影響が無い

## Decision

### Chosen Option

**quiz-management の作成者・所有者を `UserIdentity.id` に統一し、D1 の書き込み経路をスキーマと整合させる。**

1. **`creatorId` の意味**: API の `creatorId` と `?creatorId=` は `UserIdentity.id`（数値文字列）とする。匿名識別子は保存も返却もしない
2. **識別子の解決**: 作成（POST）だけが find-or-create の `IUserIdentityResolver.resolve` を使う。閲覧と所有者判定（GET / 一覧 / PATCH / DELETE / submit）は、新設する検索専用ポート `IUserIdentityFinder.find` を使い、行を作らない。見つからなければ「何も所有していない」として扱う。ミドルウェアには統合しない（ADR-0028 を継続）
3. **初回同時解決**: `INSERT OR IGNORE` と SELECT を1つの batch で実行し、UNIQUE 違反を起こさない
4. **Mock の識別子**: `MockUserIdentityResolver` は識別子ごとに連番 ID（数値文字列）を払い出す。ADR-0028 の「識別子をそのまま返す」方針を変更する
5. **作成の原子化と採番**: 作成を1つの batch（1トランザクション）にまとめ、ID は AUTOINCREMENT に任せる。同じ batch 内で solution の ID を `MAX(id)` で参照し、作成した行も同じ batch 内で読み戻して返す
6. **選択肢の所有関係**: マイグレーション 0003 で `Choice.quiz_id`（Quiz への FK）を追加し、選択肢の取得・削除を `quiz_id` 基準で行う。既存行は、解答 ID からクイズが一意に決まる行だけ補完する
7. **テスト戦略**: BDD を Mock に加えてローカル D1（`wrangler dev --env dev`）でも実行し、CI で必須にする

### Alternatives Considered

| 選択肢 | メリット | デメリット | 評価 |
|--------|----------|------------|------|
| 匿名識別子を `creator_id` に保存し続ける（FK を外す、または列を文字列にする） | 解決処理が不要 | ベアラートークン相当の値を保存・返却し続ける。`UserIdentity` の設計（ADR-0026）と矛盾する | ★ |
| 全 UseCase で `resolve`（find-or-create）を使う（Deck と同じ） | 実装が単純 | 閲覧者や拒否されるリクエストのたびに `UserIdentity` の行が増える | ★★ |
| **作成は `resolve`、閲覧と所有者判定は `find` に分ける** | 行を作るのは実際に作成した人だけになる。閲覧系から `resolve` を呼べないことを型で保証できる | ポートが1つ増える | ★★★ |
| Mock は識別子をそのまま返す（現状維持） | 変更が無い | Mock 環境で識別子が露出し、D1 と挙動が異なる | ★ |
| Mock は識別子のハッシュを返す | 状態を持たずに露出を防げる | ID の形式が D1（数値文字列）と異なる | ★★ |
| **Mock は連番 ID を払い出す** | D1 と同じ形式になり、露出も防げる | リクエストを跨ぐ共有ストアが必要 | ★★★ |
| 解答 ID を2テーブル共通で採番して選択肢の衝突を避ける | スキーマを変えない | 「解答 ID を重ねてはいけない」という規則がスキーマに表れず、作成処理の1か所だけで守られる。別経路で行を入れると再び黙って壊れる | ★ |
| **`Choice.quiz_id` を追加する** | 「1つのクイズに複数の選択肢」がスキーマで表現され、取得・削除が単純になる。列の追加なのでテーブル再作成が不要 | 後から足す FK 列は NOT NULL にできず、アプリ側で保証する。衝突していた既存行は補完できない | ★★★ |
| solution だけ先に単独 INSERT し、残りを batch にする | ID を確実に取得できる | 途中失敗で孤立行が残り、原子性が無い | ★ |
| **1つの batch で作成し、`MAX(id)` で ID を参照する** | 1トランザクションで原子的。書き込みが直列化されるため `MAX(id)` は自分が挿入した行を指す | 前提（batch が1トランザクション）をテストとコメントで固定する必要がある | ★★★ |

## Consequences

### Positive

- 本番 D1 で、4つの解答形式すべての作成・取得・更新・削除・承認申請が作成者本人として動く
- 匿名識別子がレスポンスやエラー詳細に出なくなる（Mock 環境を含む）
- 作成が原子的になり、失敗しても孤立行が残らない
- 選択肢が別クイズと混ざったり、巻き込まれて消えたりしなくなる
- D1 固有の不具合を CI で自動検出できる

### Negative

- `IQuizRepository.create` とクイズ系 UseCase のコンストラクタが変わり、関連テストの更新が多い
- CI で wrangler を2つ並行起動するため、テスト時間が延びる
- `Choice.quiz_id` はスキーマ上 NULL を許すため、NOT NULL の保証は作成処理に依存する

### Neutral

- 解答 ID が衝突していた既存の選択肢は `quiz_id` が NULL のまま残り、取得されなくなる。本番適用前に件数を確認する
- クライアントが自分の `UserIdentity.id` を明示的に取得する手段（`GET /me` など）は無い。当面は作成時のレスポンスの `creatorId` で分かる（#84 で扱う）
- `GET /decks/mine`（quiz-learning）は引き続き `resolve` を使う。`find` への切り替えは別 issue で扱う
- `Choice.solution_id` は残す。NOT NULL の強制とあわせて、要否を別 issue で判断する

### Risks and Mitigation

| リスク | 発生確率 | 影響度 | 対策 |
|--------|----------|--------|------|
| 本番 D1 の batch がトランザクションとして振る舞わず、`MAX(id)` が他リクエストの行を指す | 低 | 高 | Cloudflare D1 の仕様（batch はトランザクション）に依拠し、ローカル D1 で実測する。前提をコードのコメントと単体テストで固定する |
| 本番 D1 に衝突した選択肢や孤立行が既に存在する | 低 | 中 | 0003 の適用前に、衝突件数・孤立行・`sqlite_sequence` を確認する。確認クエリを `api/migrations/quiz-db/checks/0003_choice_quiz_id_pre_apply_check.sql` に用意した（読み取り専用）。適用前に `wrangler d1 execute quiz-db --remote --file migrations/quiz-db/checks/0003_choice_quiz_id_pre_apply_check.sql` を実行し、件数が0でなければ対応方針（手動での `quiz_id` 確定、影響クイズの一時非公開化など）を決めてから 0003 を適用する |
| `wrangler.jsonc` の `env.dev` が本番と同じ `database_id` を指しており、ローカル用の設定で本番 DB に書き込む | 中 | 高 | D1 の BDD は `--local` と専用の `--persist-to` だけを使う。`env.dev` の分離は別 issue で扱う |

## Implementation Notes

### Action Items

- [x] `api/migrations/quiz-db/0003_choice_add_quiz_id.sql`: `Choice.quiz_id` の追加、一意に決まる行の補完、インデックス
- [x] `D1QuizRepository`: findById で変換後の値を使う、作成を batch 化して採番値を返す、選択肢の取得・削除を `quiz_id` 基準にする
- [x] `IQuizRepository.create` を採番前の入力（`NewQuiz`）に変更し、UseCase から ID 生成をなくす
- [ ] `IUserIdentityFinder` の追加、`D1UserIdentityResolver` の初回同時解決の修正、`MockUserIdentityResolver` の連番化
- [ ] quiz-management の UseCase に Resolver / Finder を注入し、所有者判定を `UserIdentity.id` に統一する
- [x] `QuizCreatorOnlyError` の詳細から作成者 ID を除く
- [x] ローカル D1 を対象にした BDD・統合テストを追加し、CI で実行する（下記「D1経路のCI回帰保護の実効範囲」参照。Quiz CRUD の HTTP 経由の保護は未完了）
- [ ] TypeSpec の `creatorId` と ID 形式の記述を更新する
- [ ] ADR-0026 / ADR-0028 / ADR-0029 に本 ADR への参照を追記する

### D1経路のCI回帰保護の実効範囲（issue #76 本PR時点）

Action Item「ローカル D1 を対象にした BDD を追加し、CI で実行する」は、次の3層で実現した。

1. **`api/vitest.integration.d1.config.ts`**（`@cloudflare/vitest-pool-workers`、workerd を in-process 起動）: `D1QuizRepository.create/findById/delete` をHTTP・ミドルウェアを経由せず直接呼び出す。有効な `UserIdentity.id` をテスト内でSQLから直接用意できるため、Identity 解決（Phase 4-5）の完了を待たずに create/delete と batch の原子性を実機検証できる。作成の原子性（下記リスク表の1件目）は、FK 違反時に同一 batch 内の solution 行がロールバックされることをこのテストで実測済み。
2. **`api/vitest.bdd.d1.config.ts`**（`wrangler dev --env dev` + PactumJS、HTTP経由）: `tests/features/d1/quiz-retrieval-d1.spec.ts` を追加し、`migrations/dev/seed.sql` のシード済みデータに対する `GET /manage/quizzes(/:id)` を実機で検証する。
3. **`api/migrations/dev/seed.sql`**: 本PRの調査で、solution 系テーブル（Boolean/FreeText/SingleChoice/MultipleChoiceSolution）がそれぞれ独立に採番される前提を誤ってテーブル横断の通し番号で書いていたため、seed済みクイズ21件中14件が存在しない solution 行を指し、`Choice` は全件 `quiz_id` が NULL のまま（0003 のバックフィルは seed 適用より前のマイグレーション時点の既存データのみが対象で、seed 自身の行には効かない）という既存バグを発見・修正した。修正後の参照整合性は `api/tests/integration/d1/seed-consistency.spec.ts` で固定化している。

**未完了（Phase 4-5 待ち）**: `POST/PATCH/DELETE /manage/quizzes` および `submit/approve/reject/publish` の**HTTP経由**のD1実機検証は、Identity 解決が無いと `creatorId` が UUID のまま FK 違反になるため実施できていない。この経路のCI回帰保護は、quiz-management の UseCase に Resolver/Finder を注入した後（Phase 5）に追加する。リポジトリ層（`D1QuizRepository` 自体のSQL）は上記1で担保済み。

### Timeline

- **決定日**: 2026-09-13
- **実装開始**: 2026-09-13
- **完了予定**: issue #76 の PR マージ時

## References

- issue #76、#84、#89
- ADR-0026（匿名ユーザー識別方式選定）
- ADR-0028（quiz-learning Deck API の所有者解決と API サーフェス調整）
- ADR-0029（クイズ下書き・公開ステータスモデルと承認ワークフローの実装方針）
- `api/src/shared/identity/IUserIdentityResolver.ts`
- `api/src/infrastructure/identity/`

---

**Created**: 2026-09-13
**Last Updated**: 2026-09-20
**Authors**: Claude (Opus 5, background session)
**Reviewers**: [@tanacchi](https://github.com/tanacchi)
