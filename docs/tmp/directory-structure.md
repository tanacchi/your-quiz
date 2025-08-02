# プロジェクトディレクトリ構造設計

## 概要

このドキュメントは、クイズアプリケーションの完全なディレクトリ構造を定義します。将来的な ui と api の独立性を重視し、共通ライブラリ（lib）を分離した設計となっています。

## 設計原則

- **完全独立性**: ui と api は将来的に別リポジトリに分離可能
- **共通ライブラリ**: lib パッケージは npm 公開可能な独立ライブラリ
- **ヘキサゴナルアーキテクチャ**: api はヘキサゴナルアーキテクチャに準拠
- **インフラ分離**: デプロイ設定は各パッケージ配下に配置
- **技術スタック整合**: Next.js 15, Jotai, Hono, Drizzle ORM との完全統合

---

## Root Level Structure

```text
your-quiz/
├── ui/                              # Next.js frontend (独立可能)
│   ├── src/                         # アプリケーションコード
│   ├── infra/                       # Vercel デプロイ設定
│   ├── tests/                       # フロントエンド専用テスト
│   ├── package.json                 # 独立したパッケージ
│   └── README.md                    # UI固有のドキュメント
├── api/                             # Hono backend (独立可能)
│   ├── src/                         # アプリケーションコード
│   ├── infra/                       # Cloudflare Workers デプロイ設定
│   ├── tests/                       # バックエンド専用テスト
│   ├── package.json                 # 独立したパッケージ
│   └── README.md                    # API固有のドキュメント
├── lib/                             # 共通ライブラリ (npm package化可能)
│   ├── types/                       # 共通型定義
│   ├── utils/                       # 共通ユーティリティ
│   ├── schemas/                     # 共通バリデーション
│   ├── package.json                 # 独立したライブラリパッケージ
│   └── README.md                    # ライブラリドキュメント
├── e2e/                             # 全体統合テスト
├── docs/                            # プロジェクトドキュメント (既存維持)
├── pnpm-workspace.yaml              # monorepo設定 (開発時のみ)
├── package.json                     # ルートレベルスクリプト
└── README.md                        # プロジェクト全体説明
```

### 依存関係

```text
ui → lib  (UIが共通ライブラリを使用)
api → lib (APIが共通ライブラリを使用)
ui ↛ api  (UIとAPIは直接依存しない)
```

---

## Frontend (ui/) - 完全独立可能構造

### 技術スタック統合

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **State Management**: Jotai (atomic state management)
- **PWA**: Service Worker + IndexedDB
- **Build Tool**: Next.js built-in
- **Testing**: Vitest + React Testing Library

```text
ui/
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── layout.tsx               # Root layout + PWA setup
│   │   ├── page.tsx                 # ホーム画面 (クイズ一覧)
│   │   ├── quiz/                    # クイズ関連ページ
│   │   │   ├── page.tsx             # クイズ一覧ページ
│   │   │   ├── [id]/                # 個別クイズページ
│   │   │   │   └── page.tsx         # クイズ詳細・回答画面
│   │   │   └── create/              # クイズ作成ページ
│   │   │       └── page.tsx         # クイズ作成フォーム
│   │   ├── history/                 # 回答履歴ページ
│   │   │   └── page.tsx             # 回答履歴表示
│   │   ├── offline/                 # オフライン専用ページ
│   │   │   └── page.tsx             # オフライン時の案内
│   │   └── globals.css              # グローバルスタイル (Tailwind)
│   ├── components/                  # React コンポーネント
│   │   ├── ui/                      # 基本UIコンポーネント
│   │   │   ├── button.tsx           # ボタンコンポーネント
│   │   │   ├── card.tsx             # カードコンポーネント
│   │   │   ├── input.tsx            # 入力フィールド
│   │   │   ├── modal.tsx            # モーダルダイアログ
│   │   │   ├── spinner.tsx          # ローディングスピナー
│   │   │   └── swipe-card.tsx       # Tinder風スワイプカード
│   │   ├── quiz/                    # クイズ専用コンポーネント
│   │   │   ├── quiz-card.tsx        # クイズカード表示
│   │   │   ├── quiz-list.tsx        # クイズリスト
│   │   │   ├── quiz-form.tsx        # クイズ作成フォーム
│   │   │   ├── answer-buttons.tsx   # 回答ボタン (○/×)
│   │   │   ├── answer-result.tsx    # 回答結果表示
│   │   │   ├── quiz-filters.tsx     # クイズフィルター
│   │   │   └── tag-selector.tsx     # タグ選択UI
│   │   ├── layout/                  # レイアウトコンポーネント
│   │   │   ├── header.tsx           # ヘッダー
│   │   │   ├── navigation.tsx       # ナビゲーション
│   │   │   ├── footer.tsx           # フッター
│   │   │   └── sidebar.tsx          # サイドバー (タブレット/PC用)
│   │   └── providers/               # Context Providers
│   │       ├── jotai-provider.tsx   # Jotai Provider
│   │       └── theme-provider.tsx   # テーマProvider
│   ├── stores/                      # Jotai atoms (状態管理)
│   │   ├── quiz.ts                  # クイズ状態管理
│   │   │   # - quizListAtom: クイズ一覧
│   │   │   # - currentQuizAtom: 現在のクイズ
│   │   │   # - quizFiltersAtom: フィルター状態
│   │   ├── user.ts                  # ユーザー状態
│   │   │   # - userSessionAtom: ユーザーセッション
│   │   │   # - userPreferencesAtom: ユーザー設定
│   │   │   # - userStatsAtom: ユーザー統計
│   │   ├── offline.ts               # オフライン同期
│   │   │   # - offlineStatusAtom: オフライン状態
│   │   │   # - syncQueueAtom: 同期待ちデータ
│   │   │   # - lastSyncAtom: 最終同期時刻
│   │   └── app.ts                   # アプリ全体状態
│   │       # - loadingAtom: ローディング状態
│   │       # - errorAtom: エラー状態
│   │       # - themeAtom: テーマ設定
│   ├── hooks/                       # カスタムReactフック
│   │   ├── use-quiz.ts              # クイズデータフック
│   │   │   # - useQuizList: クイズ一覧取得
│   │   │   # - useQuizDetail: 個別クイズ取得
│   │   │   # - useCreateQuiz: クイズ作成
│   │   ├── use-answer.ts            # 回答関連フック
│   │   │   # - useSubmitAnswer: 回答送信
│   │   │   # - useAnswerHistory: 回答履歴
│   │   ├── use-offline-sync.ts      # オフライン同期フック
│   │   │   # - useSyncManager: 同期管理
│   │   │   # - useOfflineQueue: オフラインキュー
│   │   ├── use-indexed-db.ts        # IndexedDB操作フック
│   │   │   # - useDBQueries: DB操作
│   │   │   # - useOfflineStorage: オフラインストレージ
│   │   └── use-local-storage.ts     # LocalStorage操作フック
│   │       # - useSettings: 設定保存
│   │       # - useCache: キャッシュ管理
│   ├── lib/                         # UI固有ライブラリ
│   │   ├── api/                     # APIクライアント
│   │   │   ├── client.ts            # Fetch wrapper (エラーハンドリング付き)
│   │   │   ├── quiz.ts              # クイズAPI操作
│   │   │   ├── answer.ts            # 回答API操作
│   │   │   └── types.ts             # APIクライアント型定義
│   │   ├── storage/                 # ストレージ管理
│   │   │   ├── indexed-db.ts        # IndexedDB操作 (オフライン対応)
│   │   │   ├── local-storage.ts     # LocalStorage操作
│   │   │   └── cache-manager.ts     # キャッシュ管理
│   │   ├── utils/                   # UI固有ユーティリティ
│   │   │   ├── animations.ts        # アニメーション (Tailwind CSS)
│   │   │   ├── touch-gestures.ts    # タッチジェスチャー (スワイプ)
│   │   │   ├── responsive.ts        # レスポンシブ対応
│   │   │   └── performance.ts       # パフォーマンス最適化
│   │   └── constants/               # UI固有定数
│   │       ├── routes.ts            # ルート定義
│   │       ├── ui-config.ts         # UI設定
│   │       └── animations.ts        # アニメーション設定
│   └── types/                       # UI固有型定義
│       ├── components.ts            # コンポーネント型
│       ├── pages.ts                 # ページ型
│       └── hooks.ts                 # フック型
├── public/                          # 静的アセット
│   ├── manifest.json                # PWA manifest
│   ├── sw.js                        # Service Worker
│   ├── offline.html                 # オフライン用HTML
│   ├── icons/                       # アプリアイコン
│   │   ├── icon-192.png             # PWA用アイコン
│   │   ├── icon-512.png             # PWA用アイコン
│   │   └── favicon.ico              # ファビコン
│   └── images/                      # 画像アセット
├── infra/                           # Vercel デプロイ設定
│   ├── vercel.json                  # Vercel設定
│   ├── environment/                 # 環境別設定
│   │   ├── development.json         # 開発環境
│   │   ├── staging.json             # ステージング環境
│   │   └── production.json          # 本番環境
│   └── deploy/                      # デプロイスクリプト
│       ├── deploy.sh                # デプロイ実行
│       └── build-check.sh           # ビルド検証
├── tests/                           # フロントエンドテスト
│   ├── components/                  # コンポーネントテスト
│   │   ├── ui/                      # UI コンポーネントテスト
│   │   ├── quiz/                    # クイズコンポーネントテスト
│   │   └── layout/                  # レイアウトテスト
│   ├── hooks/                       # カスタムフックテスト
│   ├── stores/                      # Jotai atoms テスト
│   ├── integration/                 # 統合テスト
│   ├── utils/                       # テストユーティリティ
│   └── fixtures/                    # テストデータ
├── package.json                     # 独立パッケージ設定
├── next.config.js                   # Next.js設定 (PWA, 最適化)
├── tailwind.config.js               # Tailwind CSS設定
├── postcss.config.js                # PostCSS設定
├── tsconfig.json                    # TypeScript設定
├── vitest.config.ts                 # Vitest設定
└── README.md                        # UI固有ドキュメント
```

---

## Backend (api/) - ヘキサゴナルアーキテクチャ + 独立性

### Backend技術スタック統合

- **Framework**: Hono (TypeScript-first)
- **Database**: SQLite + Cloudflare D1
- **ORM**: Drizzle ORM
- **Validation**: zod
- **Error Handling**: neverthrow
- **Testing**: Vitest
- **Runtime**: Cloudflare Workers

### ヘキサゴナルアーキテクチャ構造

```text
api/
├── src/
│   ├── domain/                      # ドメイン層 (ビジネスロジック中心)
│   │   ├── entities/                # エンティティ (ビジネスオブジェクト)
│   │   │   ├── quiz.ts              # クイズエンティティ
│   │   │   │   # - Quiz クラス
│   │   │   │   # - ビジネスルール (問題文長さ、タグ制限)
│   │   │   │   # - 状態遷移 (pending → approved/rejected)
│   │   │   ├── answer.ts            # 回答エンティティ
│   │   │   │   # - Answer クラス
│   │   │   │   # - 正誤判定ロジック
│   │   │   │   # - スコア計算
│   │   │   ├── user-session.ts      # ユーザーセッション
│   │   │   │   # - UserSession クラス
│   │   │   │   # - 匿名ユーザー管理
│   │   │   │   # - セッション有効期限
│   │   │   └── approval-log.ts      # 承認ログ
│   │   │       # - ApprovalLog クラス
│   │   │       # - 承認/拒否の履歴管理
│   │   ├── value-objects/           # 値オブジェクト (不変)
│   │   │   ├── quiz-id.ts           # クイズID
│   │   │   ├── user-hash.ts         # ユーザーハッシュ
│   │   │   ├── tag.ts               # タグ (バリデーション付き)
│   │   │   ├── question-text.ts     # 問題文 (長さ制限)
│   │   │   └── explanation.ts       # 解説文
│   │   ├── services/                # ドメインサービス (複雑なビジネスロジック)
│   │   │   ├── quiz-validation.ts   # クイズ検証サービス
│   │   │   │   # - 重複チェック
│   │   │   │   # - 内容適正性チェック
│   │   │   ├── scoring.ts           # スコア計算サービス
│   │   │   │   # - 正答率計算
│   │   │   │   # - 難易度調整
│   │   │   ├── approval.ts          # 承認サービス
│   │   │   │   # - 承認ルール適用
│   │   │   │   # - 自動承認条件
│   │   │   └── user-analytics.ts    # ユーザー分析サービス
│   │   │       # - 回答パターン分析
│   │   │       # - 統計計算
│   │   └── repositories/            # リポジトリインターフェース (ポート)
│   │       ├── quiz-repository.ts   # クイズリポジトリI/F
│   │       ├── answer-repository.ts # 回答リポジトリI/F
│   │       ├── user-repository.ts   # ユーザーリポジトリI/F
│   │       └── approval-repository.ts # 承認リポジトリI/F
│   ├── application/                 # アプリケーション層 (ユースケース)
│   │   ├── use-cases/               # ユースケース (ビジネスフロー)
│   │   │   ├── create-quiz.ts       # クイズ作成ユースケース
│   │   │   │   # - 入力検証
│   │   │   │   # - ビジネスルール適用
│   │   │   │   # - 永続化
│   │   │   ├── submit-answer.ts     # 回答送信ユースケース
│   │   │   │   # - 回答記録
│   │   │   │   # - 正誤判定
│   │   │   │   # - 統計更新
│   │   │   ├── get-quiz-list.ts     # クイズ一覧取得ユースケース
│   │   │   │   # - フィルタリング
│   │   │   │   # - ページネーション
│   │   │   │   # - キャッシュ戦略
│   │   │   ├── approve-quiz.ts      # クイズ承認ユースケース
│   │   │   │   # - 承認権限チェック
│   │   │   │   # - 状態変更
│   │   │   │   # - ログ記録
│   │   │   ├── sync-offline-data.ts # オフラインデータ同期
│   │   │   │   # - データ整合性チェック
│   │   │   │   # - 競合解決
│   │   │   │   # - バッチ処理
│   │   │   └── get-user-history.ts  # ユーザー履歴取得
│   │   │       # - プライバシー考慮
│   │   │       # - データ集計
│   │   ├── services/                # アプリケーションサービス
│   │   │   ├── quiz-approval.ts     # クイズ承認サービス
│   │   │   │   # - 承認フロー管理
│   │   │   │   # - 通知処理
│   │   │   ├── offline-sync.ts      # オフライン同期サービス
│   │   │   │   # - 同期戦略
│   │   │   │   # - 競合解決ルール
│   │   │   ├── cache-management.ts  # キャッシュ管理サービス
│   │   │   │   # - キャッシュ戦略
│   │   │   │   # - 無効化ルール
│   │   │   └── user-session.ts      # ユーザーセッション管理
│   │   │       # - セッション作成
│   │   │       # - 匿名ユーザー管理
│   │   └── ports/                   # アプリケーションポート (インターフェース)
│   │       ├── quiz-service.ts      # クイズサービスI/F
│   │       ├── notification.ts      # 通知サービスI/F (将来拡張)
│   │       ├── cache.ts             # キャッシュサービスI/F
│   │       └── audit-log.ts         # 監査ログI/F
│   ├── infrastructure/              # インフラ層 (アダプター)
│   │   ├── persistence/             # データ永続化 (Secondary Adapter)
│   │   │   ├── repositories/        # リポジトリ実装
│   │   │   │   ├── d1-quiz-repository.ts     # D1クイズリポジトリ
│   │   │   │   │   # - Drizzle ORM使用
│   │   │   │   │   # - SQLクエリ最適化
│   │   │   │   │   # - トランザクション管理
│   │   │   │   ├── d1-answer-repository.ts   # D1回答リポジトリ
│   │   │   │   │   # - 大量データ挿入最適化
│   │   │   │   │   # - 集計クエリ
│   │   │   │   ├── d1-user-repository.ts     # D1ユーザーリポジトリ
│   │   │   │   │   # - 匿名ユーザー管理
│   │   │   │   │   # - セッション管理
│   │   │   │   └── d1-approval-repository.ts # D1承認リポジトリ
│   │   │   │       # - 承認履歴管理
│   │   │   │       # - 監査ログ
│   │   │   ├── schema/              # データベーススキーマ (Drizzle)
│   │   │   │   ├── quiz.ts          # クイズテーブル定義
│   │   │   │   ├── answer.ts        # 回答テーブル定義
│   │   │   │   ├── user-session.ts  # ユーザーセッションテーブル
│   │   │   │   ├── approval-log.ts  # 承認ログテーブル
│   │   │   │   └── index.ts         # スキーマエクスポート
│   │   │   └── migrations/          # データベースマイグレーション
│   │   │       ├── 0001_initial.sql # 初期テーブル作成
│   │   │       ├── 0002_indexes.sql # インデックス追加
│   │   │       └── migrate.ts       # マイグレーション実行
│   │   ├── http/                    # HTTPアダプター (Primary Adapter)
│   │   │   ├── routes/              # APIルートハンドラー
│   │   │   │   ├── quiz.ts          # クイズエンドポイント
│   │   │   │   │   # - GET /quizzes (一覧取得)
│   │   │   │   │   # - GET /quizzes/:id (詳細取得)
│   │   │   │   │   # - POST /quizzes (作成)
│   │   │   │   │   # - PUT /quizzes/:id/approve (承認)
│   │   │   │   ├── answer.ts        # 回答エンドポイント
│   │   │   │   │   # - POST /answers (回答送信)
│   │   │   │   │   # - GET /answers/history (履歴取得)
│   │   │   │   │   # - POST /answers/sync (同期)
│   │   │   │   ├── user.ts          # ユーザーエンドポイント
│   │   │   │   │   # - POST /users/session (セッション作成)
│   │   │   │   │   # - GET /users/stats (統計取得)
│   │   │   │   └── health.ts        # ヘルスチェック
│   │   │   │       # - GET /health
│   │   │   │       # - システム状態確認
│   │   │   ├── middleware/          # HTTPミドルウェア
│   │   │   │   ├── cors.ts          # CORS設定
│   │   │   │   ├── auth.ts          # 認証ミドルウェア
│   │   │   │   ├── rate-limit.ts    # レート制限
│   │   │   │   ├── error-handler.ts # エラーハンドリング
│   │   │   │   ├── logger.ts        # ログ出力
│   │   │   │   └── metrics.ts       # メトリクス収集
│   │   │   └── validation/          # リクエスト検証
│   │   │       ├── quiz-schema.ts   # クイズ関連スキーマ
│   │   │       ├── answer-schema.ts # 回答関連スキーマ
│   │   │       ├── user-schema.ts   # ユーザー関連スキーマ
│   │   │       └── common-schema.ts # 共通スキーマ
│   │   └── external/                # 外部サービスアダプター
│   │       ├── notification/        # 通知サービス (将来拡張)
│   │       │   └── email-service.ts # メール通知
│   │       ├── analytics/           # 分析サービス (将来拡張)
│   │       │   └── metrics-service.ts # メトリクス送信
│   │       └── cache/               # 外部キャッシュ (将来拡張)
│   │           └── redis-adapter.ts # Redis アダプター
│   ├── shared/                      # API内共通
│   │   ├── config/                  # 設定管理
│   │   │   ├── database.ts          # データベース設定
│   │   │   ├── environment.ts       # 環境変数管理
│   │   │   ├── cache.ts             # キャッシュ設定
│   │   │   └── security.ts          # セキュリティ設定
│   │   ├── utils/                   # API固有ユーティリティ
│   │   │   ├── error-handler.ts     # エラーハンドリング
│   │   │   ├── response-formatter.ts # レスポンス整形
│   │   │   ├── validation.ts        # バリデーション
│   │   │   ├── crypto.ts            # 暗号化・ハッシュ
│   │   │   └── rate-limit.ts        # レート制限ロジック
│   │   ├── types/                   # API固有型定義
│   │   │   ├── environment.ts       # 環境型定義
│   │   │   ├── database.ts          # データベース型
│   │   │   ├── http.ts              # HTTP型
│   │   │   └── errors.ts            # エラー型
│   │   └── constants/               # API固有定数
│   │       ├── http-status.ts       # HTTPステータス
│   │       ├── error-codes.ts       # エラーコード
│   │       └── limits.ts            # 制限値 (レート制限等)
│   └── index.ts                     # エントリーポイント (Hono アプリ)
├── infra/                           # Cloudflare Workers デプロイ設定
│   ├── wrangler.toml                # Cloudflare Workers設定
│   ├── d1/                          # D1データベース設定
│   │   ├── setup.sql                # 初期セットアップSQL
│   │   ├── seed.sql                 # テストデータ投入
│   │   └── backup.sh                # バックアップスクリプト
│   ├── environment/                 # 環境別設定
│   │   ├── development.toml         # 開発環境
│   │   ├── staging.toml             # ステージング環境
│   │   └── production.toml          # 本番環境
│   └── deploy/                      # デプロイスクリプト
│       ├── deploy.sh                # デプロイ実行
│       ├── rollback.sh              # ロールバック
│       └── health-check.sh          # デプロイ後ヘルスチェック
├── tests/                           # バックエンドテスト
│   ├── unit/                        # 単体テスト
│   │   ├── domain/                  # ドメインテスト
│   │   │   ├── entities/            # エンティティテスト
│   │   │   ├── value-objects/       # 値オブジェクトテスト
│   │   │   └── services/            # ドメインサービステスト
│   │   └── application/             # アプリケーションテスト
│   │       ├── use-cases/           # ユースケーステスト
│   │       └── services/            # アプリケーションサービステスト
│   ├── integration/                 # 統合テスト
│   │   ├── api/                     # API統合テスト
│   │   ├── database/                # データベーステスト
│   │   └── external/                # 外部サービステスト
│   ├── fixtures/                    # テストデータ
│   │   ├── quiz-data.ts             # クイズテストデータ
│   │   ├── user-data.ts             # ユーザーテストデータ
│   │   └── answer-data.ts           # 回答テストデータ
│   └── utils/                       # テストユーティリティ
│       ├── database-helper.ts       # DB テストヘルパー
│       ├── http-helper.ts           # HTTP テストヘルパー
│       └── mock-factory.ts          # モックファクトリー
├── package.json                     # 独立パッケージ設定
├── drizzle.config.ts                # Drizzle ORM設定
├── tsconfig.json                    # TypeScript設定
├── vitest.config.ts                 # Vitest設定
└── README.md                        # API固有ドキュメント
```

---

## 共通ライブラリ (lib/) - npm package化可能

### 設計思想

- **Pure Functions**: 副作用のない純粋関数中心
- **Tree Shaking**: 使用する部分のみインポート可能
- **Zero Dependencies**: 外部依存最小化
- **Type Safety**: 完全な型安全性

```text
lib/
├── types/                           # 共通型定義
│   ├── index.ts                     # エクスポート集約
│   ├── quiz.ts                      # クイズ関連型
│   │   # - Quiz, CreateQuizRequest, QuizListQuery
│   │   # - QuizStatus, QuizDifficulty
│   │   # - QuizMetadata, QuizStatistics
│   ├── answer.ts                    # 回答関連型
│   │   # - Answer, SubmitAnswerRequest, AnswerHistory
│   │   # - AnswerResult, AnswerStatistics
│   │   # - OfflineAnswer, SyncStatus
│   ├── user.ts                      # ユーザー関連型
│   │   # - User, UserSession, UserPreferences
│   │   # - UserStatistics, UserHash
│   │   # - AnonymousUser
│   ├── api.ts                       # API共通型
│   │   # - ApiResponse, ErrorResponse, SuccessResponse
│   │   # - PaginatedResponse, MetadataResponse
│   │   # - RequestHeaders, ResponseHeaders
│   └── common.ts                    # 共通基底型
│       # - ID, Timestamp, Hash
│       # - PaginationParams, SortParams
│       # - OperationResult, ValidationResult
├── utils/                           # 共通ユーティリティ
│   ├── index.ts                     # エクスポート集約
│   ├── id-generation.ts             # ID生成ユーティリティ
│   │   # - generateId(): nanoid ベース
│   │   # - generateQuizId(), generateAnswerId()
│   │   # - generateSessionId()
│   ├── validation.ts                # 共通バリデーション
│   │   # - validateQuizQuestion()
│   │   # - validateQuizExplanation()
│   │   # - validateTags()
│   │   # - validateEmail() (将来拡張)
│   ├── time.ts                      # 時間操作ユーティリティ
│   │   # - formatDate(), formatTime()
│   │   # - isRecent(), timeAgo()
│   │   # - toUnixTimestamp(), fromUnixTimestamp()
│   ├── crypto.ts                    # 暗号化・ハッシュ
│   │   # - generateUserHash()
│   │   # - hashPassword() (将来拡張)
│   │   # - createChecksum()
│   ├── array.ts                     # 配列操作
│   │   # - shuffle(), chunk(), groupBy()
│   │   # - unique(), intersect(), diff()
│   ├── string.ts                    # 文字列操作
│   │   # - truncate(), sanitize(), slug()
│   │   # - capitalize(), camelCase()
│   └── object.ts                    # オブジェクト操作
│       # - deepClone(), deepMerge()
│       # - pick(), omit(), isEmpty()
├── schemas/                         # zod バリデーションスキーマ
│   ├── index.ts                     # エクスポート集約
│   ├── quiz.ts                      # クイズスキーマ
│   │   # - createQuizSchema
│   │   # - updateQuizSchema
│   │   # - quizQuerySchema
│   ├── answer.ts                    # 回答スキーマ
│   │   # - submitAnswerSchema
│   │   # - answerHistoryQuerySchema
│   │   # - syncAnswersSchema
│   ├── user.ts                      # ユーザースキーマ
│   │   # - createUserSessionSchema
│   │   # - updateUserPreferencesSchema
│   ├── api.ts                       # API共通スキーマ
│   │   # - paginationSchema
│   │   # - sortingSchema
│   │   # - filterSchema
│   └── common.ts                    # 共通スキーマ
│       # - idSchema, timestampSchema
│       # - tagSchema, metadataSchema
├── constants/                       # 共通定数
│   ├── index.ts                     # エクスポート集約
│   ├── api-endpoints.ts             # APIエンドポイント定数
│   │   # - QUIZ_ENDPOINTS, ANSWER_ENDPOINTS
│   │   # - USER_ENDPOINTS, HEALTH_ENDPOINTS
│   ├── app-config.ts                # アプリケーション設定
│   │   # - MAX_QUIZ_LENGTH, MAX_TAGS
│   │   # - CACHE_DURATION, SYNC_INTERVAL
│   ├── http-status.ts               # HTTPステータス定数
│   │   # - SUCCESS_CODES, ERROR_CODES
│   │   # - CLIENT_ERRORS, SERVER_ERRORS
│   └── error-messages.ts            # エラーメッセージ
│       # - VALIDATION_ERRORS, API_ERRORS
│       # - USER_ERRORS, SYSTEM_ERRORS
├── errors/                          # カスタムエラークラス
│   ├── index.ts                     # エクスポート集約
│   ├── base-error.ts                # 基底エラークラス
│   ├── validation-error.ts          # バリデーションエラー
│   ├── api-error.ts                 # APIエラー
│   └── domain-error.ts              # ドメインエラー
├── package.json                     # ライブラリパッケージ設定
│   # - "type": "module"
│   # - exports 定義 (ESM + CJS)
│   # - dependencies: zod, nanoid のみ
├── tsconfig.json                    # TypeScript設定
│   # - strict モード
│   # - declaration: true
│   # - outDir: "./dist"
├── rollup.config.js                 # ビルド設定 (npm公開用)
│   # - ESM + CJS ビルド
│   # - TypeScript declaration
│   # - Tree shaking 対応
├── vitest.config.ts                 # テスト設定
└── README.md                        # ライブラリドキュメント
    # - API リファレンス
    # - 使用例
    # - 型定義説明
```

---

## E2E テスト構造

```text
e2e/
├── tests/                           # E2Eテストファイル
│   ├── quiz-flow.spec.ts            # クイズフロー全体テスト
│   │   # - クイズ一覧表示
│   │   # - クイズ選択・回答
│   │   # - 結果表示・解説
│   ├── offline-sync.spec.ts         # オフライン同期テスト
│   │   # - オフライン状態での回答
│   │   # - オンライン復旧時の同期
│   │   # - データ整合性確認
│   ├── mobile-ui.spec.ts            # モバイルUIテスト
│   │   # - タッチジェスチャー
│   │   # - レスポンシブ表示
│   │   # - PWA 機能
│   ├── quiz-creation.spec.ts        # クイズ作成テスト
│   │   # - クイズ作成フォーム
│   │   # - バリデーション
│   │   # - 送信・保存
│   └── performance.spec.ts          # パフォーマンステスト
│       # - 100ms 応答時間要件
│       # - 大量データ処理
│       # - メモリ使用量
├── fixtures/                        # テストデータ
│   ├── quiz-data.json               # クイズテストデータ
│   ├── user-scenarios.json          # ユーザーシナリオ
│   └── api-responses.json           # APIレスポンス
├── utils/                           # E2E用ユーティリティ
│   ├── page-objects/                # Page Object パターン
│   │   ├── quiz-list-page.ts        # クイズ一覧ページ
│   │   ├── quiz-detail-page.ts      # クイズ詳細ページ
│   │   └── quiz-form-page.ts        # クイズ作成ページ
│   ├── api-helpers.ts               # API操作ヘルパー
│   ├── db-helpers.ts                # データベース操作
│   └── mobile-helpers.ts            # モバイル操作ヘルパー
├── playwright.config.ts             # Playwright設定
│   # - ブラウザ設定 (Chrome, Firefox, Safari)
│   # - モバイルデバイス設定
│   # - 並列実行設定
└── package.json                     # E2Eテスト依存関係
```

---

## ワークスペース設定

### pnpm-workspace.yaml

```yaml
packages:
  - 'ui'
  - 'api' 
  - 'lib'
  - 'e2e'
```

### ルートレベル package.json

```json
{
  "name": "your-quiz",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "pnpm --filter ui dev & pnpm --filter api dev",
    "build": "pnpm --filter lib build && pnpm --filter api build && pnpm --filter ui build",
    "test": "pnpm --filter lib test && pnpm --filter api test && pnpm --filter ui test",
    "test:e2e": "pnpm --filter e2e test",
    "lint": "pnpm -r lint",
    "format": "pnpm -r format",
    "type-check": "pnpm -r type-check",
    "clean": "pnpm -r clean"
  },
  "devDependencies": {
    "pnpm": "^9.0.0"
  }
}
```

---

## 独立性の確保ポイント

### 1. 完全な package.json 分離

- 各パッケージが独立して依存関係を管理
- pnpm workspace は開発時の利便性のみ
- 本番デプロイ時は個別パッケージとして動作

### 2. インフラ配下にデプロイ設定

- `ui/infra/`: Vercel デプロイ設定
- `api/infra/`: Cloudflare Workers デプロイ設定
- 各パッケージで独立したデプロイが可能

### 3. lib の npm パッケージ化

- 将来的に npm レジストリに公開可能
- semantic versioning 対応
- ESM + CJS 両対応

### 4. 明確な依存関係

```text
ui → lib     (UIが共通ライブラリを使用)
api → lib    (APIが共通ライブラリを使用)
ui ↛ api     (UIとAPIは直接依存しない)
e2e → all    (E2Eテストは全体をテスト)
```

### 5. 独立したビルド・テスト

- 各パッケージで完結する開発フロー
- CI/CD パイプラインも独立可能
- 個別デプロイとロールバック対応

### 6. 技術スタック統合

- **共通**: TypeScript, zod, Biome
- **UI**: Next.js 15, Jotai, Tailwind CSS, PWA
- **API**: Hono, Drizzle ORM, Cloudflare Workers, D1
- **Testing**: Vitest, Playwright

### 7. 将来拡張性

- 新しいクライアント (mobile app, desktop app) 追加容易
- API の別実装 (GraphQL, gRPC) 追加容易
- 複数の lib パッケージに分割可能

---

## まとめ

この構造により以下が実現されます:

1. **完全な独立性**: ui と api を別リポジトリに分離可能
2. **共通ライブラリ**: lib の npm パッケージ化で再利用性向上
3. **アーキテクチャ準拠**: ヘキサゴナルアーキテクチャの完全実装
4. **技術スタック最適化**: 選定技術との完全統合
5. **開発効率**: monorepo の利便性を維持
6. **運用性**: 個別デプロイと監視が可能
7. **テスト戦略**: 層別テストで品質確保
8. **拡張性**: 新機能・新技術の追加が容易
