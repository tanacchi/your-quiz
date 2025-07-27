# データフロー図

## 概要

このドキュメントは、クイズアプリケーションの主要なデータの流れ（作成・回答・履歴取得）をシンプルに表現します。

## データフロー全体図

```mermaid
flowchart TD
    User[👤 ユーザー]
    Nextjs[⚛️ Next.js フロントエンド]
    API[⚙️ Hono API]
    DB[(🗄️ D1/SQLite DB)]
    IndexedDB[(📱 IndexedDB オフライン保存)]

    %% クイズ作成
    User -- クイズ作成リクエスト（クイズ内容・設問・タグ） --> Nextjs
    Nextjs -- クイズデータ（新規作成） --> API
    API -- クイズデータ（新規作成） --> DB

    %% 回答
    User -- 回答リクエスト（選択肢・回答内容） --> Nextjs
    Nextjs -- 回答データ --> API
    API -- 回答データ --> DB

    %% 履歴取得
    DB -- 履歴データ（回答履歴・クイズ一覧） --> API
    API -- 履歴データ --> Nextjs
    Nextjs -- 履歴データ --> User

    %% オフライン時
    Nextjs -- クイズデータ/回答データ（未同期） <--> IndexedDB
    IndexedDB -- クイズデータ/回答データ（同期） --> Nextjs
    Nextjs -- クイズデータ/回答データ（同期） --> API
```

## データフローの説明

### クイズ作成・回答・履歴取得

1. ユーザーはNext.jsフロントでクイズ作成・回答を行う
2. オンライン時はHono API経由でD1/SQLite DBに保存・取得
3. オフライン時はIndexedDBに一時保存し、再接続時にAPI経由で同期
4. 履歴取得はDB→API→Next.js→ユーザーの流れ

## 備考

- 現状はサーバーキャッシュ、CQRS、Event Store、Materialized View、Sync Engine、Redis、DTO Mapper、Encryption、Backup、Metrics等は未採用
- 主要なデータの流れのみ記載
