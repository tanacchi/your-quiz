# API catalog 全体サマリー

詳細は必ず `docs/project/api-design/api-catalog/` の原典ファイルを参照すること。

## コンテキスト別概要

### 01: Quiz Management（クイズ管理）

クイズの CRUD・承認フロー・マスターデータ管理。

主要エンドポイント（例）:

- `POST /api/quiz/v1/manage/drafts` — 下書き作成
- `PUT /api/quiz/v1/manage/drafts/:id` — 下書き更新
- `POST /api/quiz/v1/manage/quizzes/submit` — 承認申請（投稿）
- `GET /api/quiz/v1/manage/quizzes` — 承認済みクイズ一覧

### 02: Quiz Learning（クイズ学習）

Deck 生成・学習セッション・回答処理・進捗管理。

主要エンドポイント（例）:

- `GET /api/quiz/v1/learning/published` — 公開クイズ一覧
- `POST /api/quiz/v1/learning/decks` — Deck 生成
- `PUT /api/quiz/v1/learning/sessions/:id/answers` — 回答送信

### 03: User Session（ユーザーセッション）

匿名ユーザー識別・JWT 発行・デバイスフィンガープリント。

主要エンドポイント（例）:

- `POST /api/user/v1/sessions` — セッション作成（匿名）
- `GET /api/user/v1/sessions/:id` — セッション取得

### 04: Offline Sync（オフライン同期）

オフライン状態でのデータ同期・競合解決。

主要エンドポイント（例）:

- `POST /api/sync/v1/sessions` — 同期セッション開始
- `PUT /api/sync/v1/sessions/:id/items` — 同期アイテム送信

### 05: Search & Discovery（検索・発見）

クイズ検索・タグ検索・Deck 生成。

主要エンドポイント（例）:

- `GET /api/quiz/v1/learning/search` — クイズ検索
- `POST /api/quiz/v1/learning/decks/from-search` — 検索結果から Deck 生成

### 06: Integration Patterns（統合パターン）

Pub/Sub・WebSocket・イベント駆動連携。

### 07: Common Specs（共通仕様）

全エンドポイント共通の認証（JWT Bearer）・エラーレスポンス形式・レート制限。

**共通エラーレスポンス形式**:

```json
{ "message": "string", "code": "string" }
```

**認証**: `Authorization: Bearer <jwt>` ヘッダ必須（匿名 JWT）

### 08: Operations（運用）

ヘルスチェック・メトリクス・バージョン情報。

## 主要フロー（エンドポイントチェーン）

### クイズ回答フロー

```text
GET /api/quiz/v1/learning/published
→ POST /api/quiz/v1/learning/decks
→ POST /api/user/v1/sessions
→ PUT /api/quiz/v1/learning/sessions/:id/answers
```

### クイズ作成フロー

```text
POST /api/quiz/v1/manage/drafts
→ PUT /api/quiz/v1/manage/drafts/:id
→ POST /api/quiz/v1/manage/quizzes/submit
```

### 検索・学習開始フロー

```text
GET /api/quiz/v1/learning/search
→ POST /api/quiz/v1/learning/decks/from-search
→ POST /api/user/v1/sessions
```
