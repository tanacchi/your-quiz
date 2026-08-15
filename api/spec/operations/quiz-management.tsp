import "@typespec/http";
import "@typespec/rest";
import "../common/types.tsp";
import "../common/errors.tsp";
import "../models/quiz.tsp";

using Http;
using Rest;

namespace YourQuizAPI;

@doc("""
Quiz Management API - クイズの作成・管理・承認に関する包括的なAPI群

## 概要
このAPIは、クイズコンテンツのライフサイクル全体を管理するための機能を提供します。
作成から承認、公開、統計分析まで、クイズプラットフォームの核となる管理機能を包括しています。

## 主要機能
- **クイズCRUD操作**: 作成・取得・更新・削除の基本操作
- **承認ワークフロー**: 品質管理のための段階的承認プロセス
- **統計・分析**: 作成者実績と全体品質の詳細分析
- **品質管理**: コンテンツ品質向上のための報告・審査機能

## ワークフロー例

### 基本的なクイズ作成フロー
1. **作成** → `POST /quizzes` で新しいクイズを作成（`isDraft: true` で下書き保存も可能）
2. **確認** → `GET /quizzes/{id}` で作成内容を確認
3. **編集** → `PATCH /quizzes/{id}` で必要に応じて修正（question/explanationのみ）
4. **申請** → `POST /quizzes/{id}/submit` で承認申請（draft/rejectedから）
5. **承認** → 管理者による `POST /quizzes/{id}/approve`（pending_approvalから）
6. **公開** → `POST /quizzes/{id}/publish` で一般公開（approvedから）

### 管理者による品質管理フロー
1. **一覧確認** → `GET /quizzes?status=pending_approval` で承認待ちクイズ確認
2. **詳細審査** → `GET /quizzes/{id}` で個別クイズの詳細確認
3. **承認/却下** → `POST /quizzes/{id}/approve` または `POST /quizzes/{id}/reject` で処理
4. **品質分析** → `GET /quality/reports` で全体品質動向の把握（未実装）

### 作成者による実績確認フロー
1. **作品一覧** → `GET /quizzes?creatorId={userId}` で自身の作成クイズ一覧
2. **統計確認** → `GET /creators/{userId}/statistics` で作成実績統計（未実装）
3. **改善活動** → フィードバックに基づくクイズ品質向上

## 権限レベル
- **一般ユーザー**: 公開クイズの参照のみ
- **作成者**: 自身のクイズのCRUD操作
- **管理者**: 全クイズの管理・承認・統計閲覧

## 品質管理方針
- **段階的承認**: draft → pending_approval → approved → published（ADR-0027）
- **コミュニティ報告**: ユーザーによる品質問題報告システム
- **継続的改善**: 統計に基づく品質向上施策

## 権限モデルの暫定状態（ADR-0027）
- 管理者ロール・所有者解決の本格実装は未着手のため、以下の暫定措置で運用する
  - 所有者確認: リクエストの匿名識別子（userFingerprint）を creatorId として直接比較する
  - モデレーション操作（approve/reject/publish）: 本番環境ではAPI経由の実行を許可せず、DB直接操作を前提とする

## 技術仕様
- **認証**: 全操作でユーザー認証が必要
- **レート制限**: 作成操作に1日50問の制限
- **データ整合性**: `deleteQuiz` は物理削除。論理削除は将来対応（ADR-0027）
- **監査ログ**: 全ての重要操作の記録・追跡
""")
// Quiz Management API - Basic CRUD operations
@route("/api/quiz/v1/manage")
@tag("Quiz Management")
interface QuizManagement {
  
  // Quiz CRUD operations
  
  @doc("""
    新しいクイズ作成API
    
    ## 機能
    - **多様な問題形式対応**: 真偽値、自由記述、単択、複数選択の4形式をサポート
    - **自動バリデーション**: 問題文・解答・選択肢の妥当性を自動検証
    - **下書き保存対応**: `isDraft: true` で下書き（draft）として保存し、後から `submit` で承認申請できる
    - **承認待ち状態**: `isDraft` を省略・falseにした場合、作成されたクイズは承認待ち状態で管理者レビューを経て公開
    - **タグ分類**: 学習分野・難易度別のタグ付けが可能

    ## 制限事項
    - 問題文は最大500文字
    - 解説は最大1000文字
    - タグは最大10個まで
    - 1日あたりの作成上限：50問（レート制限）

    ## 作成フロー
    1. リクエスト送信
    2. バリデーション実行
    3. `isDraft: true` ならdraft状態、それ以外はpending_approval状態でデータベースに保存
    4. pending_approval状態のクイズは管理者による承認待ちキューに追加

    ## 使用例
    - 教育コンテンツの作成
    - 自習用問題集の構築
    - スキルチェック問題の準備
    """)
  @post 
  @route("/quizzes")
  createQuiz(
    @doc("新しいクイズの作成情報を含むリクエスト")
    @body request: CreateQuizRequest
  ): QuizResponse | ValidationError | RateLimitError;
  
  @doc("""
    クイズ詳細情報取得API
    
    ## 機能
    - **完全な問題情報**: 問題文、解答、解説、タグを含む全データを取得
    - **権限制御**: 作成者または管理者のみアクセス可能（承認前クイズの場合）
    - **解答情報付き**: QuizResponse形式で解答も含めて返却
    
    ## アクセス制御
    - **公開クイズ（approved）**: 全ユーザーがアクセス可能
    - **承認待ちクイズ**: 作成者・管理者のみアクセス可能
    - **却下クイズ**: 作成者のみアクセス可能
    
    ## レスポンス構造
    - 基本クイズ情報（id、問題文、ステータス、作成日時等）
    - 解答情報（問題形式に応じた Solution オブジェクト）
    - 関連タグ配列
    - 承認日時（承認済みの場合）
    
    ## 使用場面
    - クイズ編集画面での詳細表示
    - 管理画面での承認レビュー
    - 作成者による内容確認
    """)
  @get
  @route("/quizzes/{id}")
  getQuiz(
    @doc("取得対象のクイズID（UUID形式）")
    @path id: QuizId
  ): QuizResponse | NotFoundError;
  
  @doc("""
    クイズ情報部分更新API（PATCH）

    ## 機能
    - **真の部分更新**: 指定されたフィールドのみを更新（PATCH方式）
    - **所有者限定**: 作成者本人のみ更新可能
    - **状態制限**: draft/pending_approval/rejected状態のクイズのみ更新可能
    - **整合性バリデーション**: 更新内容の妥当性を自動検証

    ## 更新可能フィールド
    - **問題文（question）**: 問題の内容を修正
    - **解説（explanation）**: 問題の説明文を追加・修正

    ## 未対応フィールド（ADR-0027、フォローアップissueで対応予定）
    - 回答形式（answerType）・解答内容（solution）・タグ（tags）・作成者ID（creatorId）は本APIでは更新できない

    ## 権限制御
    - **作成者権限**: 自身が作成したクイズのquestion/explanationの更新
    - **approved/published状態**: 更新不可（409エラー）

    ## 更新後の動作
    - ステータスは変更されない（PATCHは承認状態遷移を伴わない）

    ## 使用場面
    - **内容修正**: 誤字脱字や解説不足の修正
    - **下書きの編集**: submit前のdraft状態クイズの内容修正
    """)
  @patch(#{ implicitOptionality: false })
  @route("/quizzes/{id}")
  updateQuiz(
    @doc("更新対象のクイズID（UUID形式）")
    @path id: QuizId, 
    @doc("更新情報を含むリクエスト（部分更新対応）")
    @body request: UpdateQuizRequest
  ): QuizResponse | NotFoundError | ForbiddenError | ValidationError | ConflictError;
  
  @doc("""
    クイズ削除API

    ## 機能
    - **物理削除**: データベースから完全に削除する（論理削除は将来対応、ADR-0027）
    - **所有者限定**: 作成者本人のみ削除可能
    - **状態制限**: draft/pending_approval/rejected状態のクイズのみ削除可能

    ## 削除条件
    - **作成者権限**: 自身が作成したクイズの削除
    - **状態制限**: approved/published状態のクイズは削除不可（409エラー）

    ## 使用場面
    - 不適切コンテンツの自主削除
    - 作成ミスの取り消し
    """)
  @delete
  @route("/quizzes/{id}")
  deleteQuiz(
    @doc("削除対象のクイズID（UUID形式）")
    @path id: QuizId
  ): void | NotFoundError | ForbiddenError | ConflictError;
  
  @doc("""
    クイズ一覧取得API（フィルタ・ページネーション対応）
    
    ## 機能
    - **多彩なフィルタ**: ステータス・作成者・ID指定による絞り込み
    - **効率的ページネーション**: オフセットベースでの分割取得
    - **ソート機能**: 作成日時順（最新順）での並び替え
    - **権限考慮**: ユーザー権限に応じた表示制御
    
    ## フィルタ機能
    - **ステータス別**: draft, pending_approval, approved, rejected, published（複数指定でOR条件）
    - **作成者別**: 特定ユーザーの作成クイズのみ表示（複数指定でOR条件）
    - **クイズID指定**: 複数のクイズIDを指定して一括取得
    
    ## 権限による表示制御
    - **一般ユーザー**: 承認済みクイズのみ表示
    - **作成者**: 自身の作成したクイズ（全ステータス）も表示
    - **管理者**: 全てのクイズ（全ステータス）を表示
    
    ## ページネーション
    - デフォルト: 20件/ページ
    - 最大: 100件/ページ
    - オフセットベース: skip/limit パターン
    
    ## レスポンス情報
    - クイズ一覧（QuizResponse形式）
    - 総件数（フィルタ適用後）
    - 続きの存在フラグ
    - 継続トークン（将来のカーソルベース対応用）
    
    ## クエリパラメータ使用例
    - **複数ステータス**: `?status=pending_approval&status=approved` （承認待ち + 承認済み）
    - **複数作成者**: `?creatorId=user1&creatorId=user2` （複数ユーザーの作品）
    - **クイズID指定**: `?quizId=quiz1&quizId=quiz2` （特定クイズの一括取得）
    - **組み合わせ**: `?status=approved&creatorId=user1&creatorId=user2` （複数作成者の承認済みクイズ）
    
    ## 使用場面
    - **管理画面でのクイズ管理**: 複数ステータス・作成者での絞り込み
    - **作成者マイページでの作品一覧**: 自身の全ステータスクイズ表示
    - **承認待ちキューの表示**: pending_approval ステータスのみ表示
    - **バッチ処理**: 特定IDのクイズ群を一括取得
    """)
  @get
  @route("/quizzes")
  listQuizzes(
    ...PaginationRequest,
    @doc("ステータス別フィルター（複数指定可能）。指定されない場合は全ステータス（権限に応じて）")
    @query status?: QuizStatus[],
    @doc("作成者ID別フィルター（複数指定可能）。特定ユーザーの作成クイズのみ取得")
    @query creatorId?: UserId[],
    @doc("クイズID配列による指定取得。複数IDの一括取得に使用")
    @query quizId?: string[]
  ): QuizSummaryListResponse;
  
  // 承認ワークフロー操作（ADR-0027）

  @doc("""
    クイズ承認申請API

    ## 機能
    - **承認プロセス開始**: 作成者が自身のクイズを承認申請に送る
    - **ステータス管理**: pending_approval状態への明示的な変更
    - **再申請対応**: rejected状態からの再申請も可能

    ## 申請条件
    - **作成者権限**: 自身が作成したクイズのみ申請可能
    - **対象状態**: draft状態（新規申請）またはrejected状態（再申請）のクイズのみ対象

    ## 申請後の流れ
    1. ステータスをpending_approvalに変更
    2. 管理者承認待ちキューに追加

    ## 使用場面
    - クイズ作成完了時の承認申請
    - 却下後の修正完了時の再申請
    """)
  @post
  @route("/quizzes/{id}/submit")
  submitForApproval(
    @doc("承認申請対象のクイズID（UUID形式）")
    @path id: QuizId
  ): QuizResponse | NotFoundError | ForbiddenError | ConflictError;

  @doc("""
    クイズ承認API（モデレーター専用、ADR-0027の暫定権限モデルにより本番環境ではDB直接操作を前提とする）

    ## 機能
    - **承認処理**: pending_approvalのクイズをapproved状態に変更
    - **承認理由記録**: レビュー内容・承認理由の記録（reviewerNotes）

    ## 承認権限
    - **暫定モデレーション権限**: 本番環境ではAPI経由での実行を許可しない（403）

    ## 承認プロセス
    1. 問題内容・品質の確認
    2. 承認の判断
    3. 承認理由・コメントの記録

    ## 承認後の状態
    - ステータス: approved（approvedAtを記録）
    - `publish` を呼ぶことで公開状態に遷移可能

    ## 使用場面
    - 開発環境での承認フロー検証
    - 品質管理・コンテンツ審査
    """)
  @post
  @route("/quizzes/{id}/approve")
  approveQuiz(
    @doc("承認対象のクイズID（UUID形式）")
    @path id: QuizId,
    @doc("承認処理の詳細情報を含むリクエスト")
    @body request: ApprovalRequest
  ): QuizResponse | NotFoundError | ForbiddenError | ConflictError;

  @doc("""
    クイズ却下API（モデレーター専用、ADR-0027の暫定権限モデルにより本番環境ではDB直接操作を前提とする）

    ## 機能
    - **却下処理**: pending_approvalのクイズをrejected状態に変更
    - **却下理由記録**: 詳細な却下理由・改善点の記録（reviewerNotes）
    - **再申請可能**: 却下後も修正して`submit`で再申請が可能

    ## 却下権限
    - **暫定モデレーション権限**: 本番環境ではAPI経由での実行を許可しない（403）

    ## 却下後の流れ
    1. ステータスをrejectedに変更
    2. 作成者は修正後 `submit` で再申請可能

    ## 使用場面
    - 品質基準に満たない問題の却下
    - 規約違反コンテンツの審査
    """)
  @post
  @route("/quizzes/{id}/reject")
  rejectQuiz(
    @doc("却下対象のクイズID（UUID形式）")
    @path id: QuizId,
    @doc("却下処理の詳細情報・理由を含むリクエスト")
    @body request: ApprovalRequest
  ): QuizResponse | NotFoundError | ForbiddenError | ConflictError;

  @doc("""
    クイズ公開API（モデレーター専用、ADR-0027の暫定権限モデルにより本番環境ではDB直接操作を前提とする）

    ## 機能
    - **公開**: 承認済み（approved）クイズを公開状態（published）に変更
    - **可視性変更**: 検索・学習での利用開始

    ## 公開権限
    - **暫定モデレーション権限**: 本番環境ではAPI経由での実行を許可しない（403）
    - **承認済み限定**: approved状態のクイズのみ公開可能（それ以外は409）

    ## 公開後の状態
    - **検索対象**: 一般ユーザーの検索に含まれる
    - **学習利用**: デッキ作成・学習セッションで選択可能

    ## 使用場面
    - 品質確認完了後の最終公開
    """)
  @post
  @route("/quizzes/{id}/publish")
  publishQuiz(
    @doc("公開対象のクイズID（UUID形式）")
    @path id: QuizId
  ): QuizResponse | NotFoundError | ForbiddenError | ConflictError;

  // 統計・品質管理機能（初期リリース版では未実装）
  
  // @doc("""
  //   作成者統計情報取得API
  //   
  //   ## 機能
  //   - **作成実績統計**: クイズ作成数・承認率・人気度などの総合統計
  //   - **期間別分析**: 日・週・月単位での作成・承認動向
  //   - **品質指標**: 平均評価・正答率・ユーザーフィードバック統計
  //   - **ランキング情報**: 作成者ランキング内での順位・レベル
  //   
  //   ## 統計項目
  //   - **作成統計**: 総作成数、承認数、却下数、承認率
  //   - **人気統計**: 総回答数、お気に入り数、シェア数
  //   - **品質統計**: 平均正答率、平均評価点、フィードバック数
  //   - **成長統計**: 月次成長率、連続作成日数、実績バッジ
  //   
  //   ## 期間フィルター
  //   - **全期間**: 登録から現在までの累計統計
  //   - **月次**: 指定月の詳細統計
  //   - **週次**: 直近週・指定週の統計
  //   - **日次**: 日別の作成・承認動向
  //   
  //   ## 権限制御
  //   - **本人のみ**: 作成者は自身の統計のみ閲覧可能
  //   - **管理者**: 全ての作成者統計を閲覧可能
  //   - **匿名化データ**: 管理者以外には匿名化された形で提供
  //   
  //   ## 使用場面
  //   - 作成者マイページでの実績表示
  //   - 管理画面での作成者分析
  //   - 成長モチベーション向上
  //   - コンテンツ戦略立案
  //   """)
  // @get
  // @route("/creators/{creatorId}/statistics")
  // getCreatorStatistics(
  //   @doc("統計取得対象の作成者ID（UUID形式）")
  //   @path creatorId: UserId,
  //   @doc("統計期間。'all'（全期間）、'month'（月次）、'week'（週次）、'day'（日次）。デフォルト：'all'")
  //   @query period?: "all" | "month" | "week" | "day" = "all",
  //   @doc("期間指定時の基準日（ISO 8601形式）。未指定時は現在日時")
  //   @query baseDate?: string
  // ): {
  //   creatorId: UserId;                    // 作成者ID
  //   period: string;                       // 統計期間
  //   creationStats: {                      // 作成統計
  //     totalQuizzes: int32;                // 総作成数
  //     approvedQuizzes: int32;             // 承認数
  //     rejectedQuizzes: int32;             // 却下数
  //     pendingQuizzes: int32;              // 承認待ち数
  //     approvalRate: float32;              // 承認率（0.0-1.0）
  //   };
  //   popularityStats: {                    // 人気統計
  //     totalAttempts: int32;               // 総回答数
  //     totalFavorites: int32;              // お気に入り総数
  //     totalShares: int32;                 // シェア総数
  //     avgAttemptsPerQuiz: float32;        // 問題当たり平均回答数
  //   };
  //   qualityStats: {                       // 品質統計
  //     avgCorrectRate: float32;            // 平均正答率
  //     avgRating: float32;                 // 平均評価点
  //     totalFeedbacks: int32;              // フィードバック総数
  //     qualityScore: float32;              // 品質スコア（独自算出）
  //   };
  //   achievements: {                       // 実績情報
  //     level: int32;                       // 作成者レベル
  //     badges: string[];                   // 獲得バッジ
  //     rank: int32;                        // ランキング順位
  //     consecutiveDays: int32;             // 連続作成日数
  //   };
  // } | NotFoundError;
  // 
  // @doc("""
  //   品質レポート取得API（管理者専用）
  //   
  //   ## 機能
  //   - **全体品質動向**: システム全体のコンテンツ品質推移
  //   - **問題検出**: 品質基準を下回るコンテンツの特定
  //   - **改善提案**: データに基づく品質向上施策の提案
  //   - **トレンド分析**: 品質の時系列変化・季節性の分析
  //   
  //   ## レポート内容
  //   - **承認動向**: 期間別の承認・却下率推移
  //   - **品質指標**: 平均正答率・評価点・フィードバック分析
  //   - **問題分類**: 分野別・難易度別の品質分布
  //   - **改善領域**: 重点改善が必要な領域の特定
  //   
  //   ## 期間設定
  //   - **日次**: 日別の詳細な品質変動
  //   - **週次**: 週別トレンドと変動要因分析
  //   - **月次**: 月別の中長期的品質動向
  //   
  //   ## 分析軸
  //   - **作成者別**: 作成者による品質のばらつき
  //   - **分野別**: 学習分野による品質差異
  //   - **難易度別**: 難易度設定の適切性
  //   - **時系列**: 品質の経時的変化
  //   
  //   ## 使用場面
  //   - 管理ダッシュボードでの品質監視
  //   - 定期的な品質改善会議
  //   - 作成者向け改善提案
  //   - システム改善の優先順位決定
  //   """)
  // @get
  // @route("/quality/reports")
  // getQualityReport(
  //   ...PaginationRequest,
  //   @doc("レポート期間。'day'（日次）、'week'（週次）、'month'（月次）。デフォルト：'week'")
  //   @query period?: "day" | "week" | "month" = "week",
  //   @doc("分析開始日（ISO 8601形式）。未指定時は指定期間の適切なデフォルト")
  //   @query startDate?: string,
  //   @doc("分析終了日（ISO 8601形式）。未指定時は現在日時")
  //   @query endDate?: string,
  //   @doc("作成者IDフィルター。特定作成者のレポートのみ取得")
  //   @query creatorId?: UserId,
  //   @doc("分野フィルター。特定分野のレポートのみ取得")
  //   @query category?: string
  // ): {
  //   period: string;                       // レポート期間
  //   dateRange: {                          // 対象期間
  //     startDate: string;                  // 開始日
  //     endDate: string;                    // 終了日
  //   };
  //   overallMetrics: {                     // 全体指標
  //     totalQuizzes: int32;                // 対象クイズ総数
  //     approvalRate: float32;              // 全体承認率
  //     avgQualityScore: float32;           // 平均品質スコア
  //     avgCorrectRate: float32;            // 平均正答率
  //   };
  //   trendAnalysis: {                      // トレンド分析
  //     qualityTrend: "improving" | "stable" | "declining";  // 品質動向
  //     periodComparison: float32;          // 前期間比較（%変化）
  //     seasonalPattern: string;            // 季節性パターン
  //   }[];
  //   problemAreas: {                       // 問題領域
  //     category: string;                   // 問題分類
  //     severity: "high" | "medium" | "low"; // 重要度
  //     description: string;                // 問題説明
  //     suggestedActions: string[];         // 推奨改善策
  //   }[];
  //   improvements: {                       // 改善提案
  //     priority: int32;                    // 優先順位
  //     area: string;                       // 改善領域
  //     expectedImpact: "high" | "medium" | "low"; // 期待効果
  //     implementationEffort: "high" | "medium" | "low"; // 実装負荷
  //     description: string;                // 詳細説明
  //   }[];
  // };
  // 
  // @doc("""
  //   クイズ報告・フラグ設定API
  //   
  //   ## 機能
  //   - **不適切コンテンツ報告**: ユーザーによる問題コンテンツの報告
  //   - **品質問題報告**: 誤字脱字・解答誤り等の品質問題報告
  //   - **重複問題報告**: 既存問題との重複・類似性の報告
  //   - **自動審査トリガー**: 報告に基づく自動的な審査プロセス開始
  //   
  //   ## 報告種類
  //   - **inappropriate**: 不適切・規約違反コンテンツ
  //   - **quality_issue**: 品質問題（誤字・解答誤り等）
  //   - **duplicate**: 重複・類似問題
  //   - **difficulty_mismatch**: 難易度設定の不適切性
  //   - **offensive**: 攻撃的・差別的内容
  //   
  //   ## 報告プロセス
  //   1. ユーザーによる報告送信
  //   2. 報告内容の自動分類・優先順位付け
  //   3. 管理者への通知・審査キュー追加
  //   4. 必要に応じた一時的な非表示化
  //   
  //   ## 報告後の処理
  //   - **緊急度評価**: 報告内容による緊急度の自動判定
  //   - **一時措置**: 必要に応じた問題の一時非表示
  //   - **審査待ち**: 管理者審査キューへの追加
  //   - **報告者通知**: 処理状況の報告者への通知
  //   
  //   ## 使用場面
  //   - ユーザーによるコンテンツ品質向上への貢献
  //   - 不適切コンテンツの迅速な発見・対処
  //   - コミュニティベースの品質管理
  //   """)
  // @post
  // @route("/quizzes/flag")
  // flagQuiz(
  //   @doc("クイズ報告・フラグ設定情報を含むリクエスト")
  //   @body request: {
  //     quizId: QuizId;                     // 報告対象クイズID
  //     flagType: "inappropriate" | "quality_issue" | "duplicate" | "difficulty_mismatch" | "offensive"; // 報告種類
  //     reason: string;                     // 詳細な報告理由
  //     reporterId?: UserId;                // 報告者ID（匿名報告も可能）
  //     evidence?: string;                  // 報告の根拠・証拠
  //     urgency?: "high" | "medium" | "low"; // 緊急度（システムが自動判定も可能）
  //   }
  // ): {
  //   reportId: string;                     // 報告ID
  //   status: "received" | "under_review" | "resolved"; // 処理状況
  //   estimatedReviewTime: int32;           // 予想審査時間（時間）
  //   automaticActions: string[];           // 自動実行された措置
  //   nextSteps: string[];                  // 今後の処理予定
  // } | NotFoundError | ValidationError;
}