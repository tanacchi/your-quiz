import "@typespec/http";
import "@typespec/rest";
import "../common/types.tsp";
import "../common/errors.tsp";
import "../models/quiz.tsp";
import "../models/tag.tsp";

using Http;
using Rest;

namespace YourQuizAPI;

// Search and Discovery API - Cross-cutting concern
@route("/api/search/v1")
@tag("Search & Discovery")
interface Search {
  
  // Quiz Search
  
  @doc("""
    高度なフィルタリング、ソート、ページネーション機能を持つクイズ検索API
    
    ## 機能
    - **全文検索**: 問題文、解説、タグ全体での横断検索
    - **高度なフィルタリング**: 難易度、回答タイプ、作成者、日付などによる絞り込み  
    - **スマートタグ処理**: 肯定・否定両方のタグフィルター対応
    - **柔軟なソート**: 複数ソート項目での昇順・降順指定
    - **ページネーション**: 効率的なオフセットベースページング（カスタマイズ可能なページサイズ）
    
    ## 特殊構文
    - **方向付きソート**: 降順指定は`-`プレフィックス使用（例：`sort=-created_date`で最新順）
    - **タグ除外**: 除外指定は`~`プレフィックス使用（例：`tags=~beginner`で初心者レベル除外）  
    - **複合タグフィルター**: 肯定・否定タグの組み合わせ可能（例：`tags=javascript&tags=~beginner`）
    
    ## 使用例
    - 基本検索: `?q=JavaScript`
    - 高度なフィルタリング: `?q=配列&tags=javascript&difficulty=intermediate&sort=-created_date`
    - カテゴリ除外: `?tags=programming&tags=~tutorial&min_correct_rate=0.8`
    - ID除外: `?q=React&exclude_ids=quiz-id-1&exclude_ids=quiz-id-2`（特定のクイズを除外した検索）
    """)
  @get
  @route("/quizzes")
  searchQuizzes(
    @doc("問題文、解説、関連タグ全体での全文検索クエリ")
    @query q?: string,
    
    @doc("""
      クイズ分類用タグフィルター。包含・除外両方の指定が可能：
      - 包含タグ: `tags=javascript` または `tags=javascript&tags=react`
      - 除外タグ: `tags=~beginner` (初心者レベルコンテンツを除外)
      - 混合フィルター: `tags=javascript&tags=~tutorial` (JavaScriptを含み、チュートリアルを除外)
      """)
    @query tags?: string[],
    
    @doc("難易度レベルによるフィルター。一般的な値：'beginner'、'intermediate'、'advanced'")
    @query difficulty?: string,
    
    @doc("回答タイプによるフィルター。有効な値：'boolean'、'free_text'、'single_choice'、'multiple_choice'")
    @query answer_type?: AnswerType,
    
    @doc("作成者のユーザーIDによるフィルター（UUID形式）")
    @query creator_id?: UserId,
    
    @doc("除外するクイズのID配列。指定されたIDのクイズを検索結果から除外")
    @query exclude_ids?: QuizId[],
    
    @doc("最小正答率フィルター（0.0〜1.0）。例：0.8で正答率80%以上のクイズのみ")
    @query min_correct_rate?: float32,
    
    @doc("最大正答率フィルター（0.0〜1.0）。例：0.5で正答率50%以下のクイズのみ")
    @query max_correct_rate?: float32,
    
    @doc("指定日時以降に作成されたクイズをフィルター（ISO 8601形式）。例：'2024-01-01T00:00:00Z'")
    @query created_after?: string,
    
    @doc("指定日時以前に作成されたクイズをフィルター（ISO 8601形式）。例：'2024-12-31T23:59:59Z'")
    @query created_before?: string,
    
    @doc("""
      方向プレフィックス付きソート項目：
      - 利用可能項目：'relevance'、'created_date'、'popularity'、'difficulty'
      - 昇順：`sort=created_date`（デフォルト）
      - 降順：`sort=-created_date`（マイナス記号をプレフィックス）
      - デフォルト：キーワード検索時は'relevance'、それ以外は'created_date'
      """)
    @query sort?: string,
    
    ...PaginationRequest
  ): QuizListResponse;
  
  // 追加検索機能（初期リリース版では未実装）
  
  // @doc("""
  //   検索クエリに基づく検索候補・自動補完機能
  //   
  //   ## 機能
  //   - **インクリメンタル検索**: 入力文字に基づくリアルタイム候補表示
  //   - **人気クエリ**: よく検索されるキーワードの提案
  //   - **トレンドトピック**: 現在注目されているトピックの表示
  //   
  //   ## 使用場面
  //   - 検索窓での自動補完
  //   - 検索候補の事前表示
  //   - 関連トピックの発見支援
  //   """)
  // @get
  // @route("/quizzes/suggestions")
  // getQuizSuggestions(
  //   @doc("検索キーワード（部分入力可）")
  //   @query q: string, 
  //   @doc("取得する候補数の上限（1-50）。デフォルト：10")
  //   @query limit?: int32 = 10
  // ): {
  //   suggestions: string[];      // 入力に基づく検索候補
  //   popularQueries: string[];   // 人気検索ワード
  //   trendingTopics: string[];   // トレンドトピック
  // };
  // 
  // @doc("""
  //   指定されたクイズに類似したクイズの取得機能
  //   
  //   ## 機能
  //   - **コンテンツベース推奨**: タグ・難易度・トピック類似度による推奨
  //   - **類似度スコア**: 各推奨クイズの関連度数値化
  //   - **多様性考慮**: 似すぎないバラエティに富んだ推奨
  //   
  //   ## 使用場面
  //   - クイズ詳細ページでの関連クイズ表示
  //   - 学習継続のための次回推奨
  //   - 類似トピックでの学習範囲拡張
  //   """)
  // @get
  // @route("/quizzes/{id}/similar")
  // getSimilarQuizzes(
  //   @doc("基準となるクイズのID（UUID形式）")
  //   @path id: QuizId, 
  //   @doc("取得する類似クイズ数（1-20）。デフォルト：10")
  //   @query limit?: int32 = 10
  // ): {
  //   quizzes: QuizWithSolution[];   // 類似クイズ一覧（解答付き）
  //   similarity_scores: float32[];  // 各クイズの類似度スコア（0.0-1.0）
  // } | NotFoundError;
  // 
  // @doc("""
  //   ユーザーの学習履歴・嗜好に基づくパーソナライズされたクイズ推奨機能
  //   
  //   ## 機能
  //   - **協調フィルタリング**: 類似ユーザーの学習パターン活用
  //   - **コンテンツベース**: ユーザーの過去学習内容に基づく推奨
  //   - **ハイブリッド戦略**: 複数推奨手法の組み合わせ最適化
  //   - **推奨理由**: 各推奨の根拠・信頼度の提示
  //   
  //   ## 使用場面
  //   - ホーム画面での「おすすめ」セクション
  //   - 学習セッション終了後の次回推奨
  //   - 個別学習計画の自動生成
  //   """)
  // @get
  // @route("/quizzes/recommendations")
  // getRecommendedQuizzes(
  //   @doc("推奨対象ユーザーのID（UUID形式）")
  //   @query userId: UserId,
  //   @doc("取得する推奨クイズ数（1-50）。デフォルト：20")
  //   @query limit?: int32 = 20,
  //   @doc("推奨戦略。'collaborative'（協調）、'content_based'（内容）、'hybrid'（混合）。デフォルト：'hybrid'")
  //   @query strategy?: "collaborative" | "content_based" | "hybrid" = "hybrid"
  // ): {
  //   quizzes: QuizWithSolution[];   // 推奨クイズ一覧（解答付き）
  //   reasons: {                     // 推奨理由詳細
  //     quizId: QuizId;              // 推奨クイズID
  //     reason: "similar_topics" | "difficulty_match" | "popular" | "new_topics";  // 推奨根拠
  //     confidence: float32;         // 推奨信頼度（0.0-1.0）
  //   }[];
  // } | NotFoundError;
  
  // タグ検索・管理機能（初期リリース版では未実装）
  // 
  // @doc("""
  //   タグ名・属性による検索・フィルタリング機能
  //   
  //   ## 機能
  //   - **タグ名検索**: 部分一致・完全一致による検索
  //   - **タグ属性フィルター**: タイプ（公式/ユーザー作成）による絞り込み
  //   - **使用頻度ソート**: 人気順・作成日順での並び替え
  //   
  //   ## 使用場面
  //   - タグ管理画面でのタグ一覧表示
  //   - タグ選択UIでの候補絞り込み
  //   - タグの統合・整理作業支援
  //   """)
  // @get
  // @route("/tags")
  // searchTags(
  //   @doc("タグ検索条件を含むリクエストボディ")
  //   @body request: TagSearchRequest
  // ): TagListResponse;
  // 
  // @doc("""
  //   階層構造を持つタグの親子関係取得機能
  //   
  //   ## 機能
  //   - **階層表示**: 指定タグを起点とした子タグツリー表示
  //   - **深度制限**: 表示階層レベルの制御
  //   - **関係タイプ**: 階層・カテゴリ・同義語・関連性などの関係性表示
  //   
  //   ## 使用場面
  //   - タグ階層管理画面でのツリー表示
  //   - タグ選択時の関連タグ候補表示
  //   - タグ分類体系の可視化
  //   """)
  // @get
  // @route("/tags/hierarchy")
  // getTagHierarchy(
  //   @doc("階層表示の起点となるタグID（未指定時はルートから表示）")
  //   @query rootTagId?: TagId,
  //   @doc("表示する階層の深さ（1-10）。デフォルト：3")
  //   @query depth?: int32 = 3,
  //   ...PaginationRequest
  // ): TagHierarchyResponse;
  // 
  // @doc("""
  //   タグの使用統計情報取得機能
  //   
  //   ## 機能
  //   - **使用回数統計**: 期間別タグ使用頻度の集計
  //   - **成長率分析**: タグ人気度の変化トレンド
  //   - **使用頻度フィルター**: 最小使用回数による絞り込み
  //   
  //   ## 使用場面
  //   - タグ管理ダッシュボードでの統計表示
  //   - タグ整理時の重要度判定
  //   - 人気トレンド分析レポート
  //   """)
  // @get
  // @route("/tags/statistics")
  // getTagStatistics(
  //   @doc("統計集計期間。'day'（日）、'week'（週）、'month'（月）。デフォルト：'month'")
  //   @query period?: "day" | "week" | "month" = "month",
  //   @doc("最小使用回数での絞り込み（1以上）。デフォルト：1")
  //   @query minUsage?: int32 = 1,
  //   ...PaginationRequest
  // ): TagStatisticsResponse;
  // 
  // @doc("""
  //   期間別人気タグランキング取得機能
  //   
  //   ## 機能
  //   - **人気タグ順**: 使用回数降順でのランキング表示
  //   - **期間指定**: 日・週・月単位での集計期間選択
  //   - **成長率情報**: タグ人気度の変化率も併せて提供
  //   
  //   ## 使用場面
  //   - ホーム画面での人気タグ表示
  //   - タグ選択時の推奨候補表示
  //   - トレンド分析ダッシュボード
  //   """)
  // @get
  // @route("/tags/popular")
  // getPopularTags(
  //   @doc("取得する人気タグ数（1-100）。デフォルト：50")
  //   @query limit?: int32 = 50, 
  //   @doc("集計期間。'day'（日）、'week'（週）、'month'（月）。デフォルト：'week'")
  //   @query period?: "day" | "week" | "month" = "week"
  // ): {
  //   tags: Tag[];              // 人気タグ一覧
  //   usageCounts: int32[];     // 各タグの使用回数
  //   growthRates: float32[];   // 各タグの成長率（前期間比）
  // };
  // 
  // @doc("""
  //   新規タグ作成機能
  //   
  //   ## 機能
  //   - **タグ名バリデーション**: 重複チェック・命名規則適合性確認
  //   - **タイプ指定**: 公式タグ・ユーザー作成タグの区別
  //   - **作成者記録**: タグ作成ユーザーの履歴保持
  //   
  //   ## 使用場面
  //   - クイズ作成時の新しいタグ追加
  //   - 管理画面でのタグ体系整備
  //   - ユーザーによる独自タグ作成
  //   """)
  // @post
  // @route("/tags")
  // createTag(
  //   @doc("新規タグ作成情報を含むリクエスト")
  //   @body request: CreateTagRequest
  // ): CreateTagResponse | ValidationError | ConflictError;
  // 
  // @doc("""
  //   既存タグ更新機能（作成者・管理者限定）
  //   
  //   ## 機能
  //   - **権限制御**: 作成者または管理者のみ更新可能
  //   - **タグ名変更**: 既存タグ名の修正・改善
  //   - **属性更新**: タグタイプ・説明などのメタ情報変更
  //   
  //   ## 使用場面
  //   - タグ名の誤字修正・改善
  //   - タグ分類の再整理
  //   - 公式タグ認定・格上げ
  //   """)
  // @put
  // @route("/tags/{id}")
  // updateTag(
  //   @doc("更新対象タグのID（UUID形式）")
  //   @path id: TagId, 
  //   @doc("タグ更新情報を含むリクエスト")
  //   @body request: UpdateTagRequest
  // ): Tag | NotFoundError | ForbiddenError | ValidationError;
  // 
  // @doc("""
  //   タグ間関係性作成機能
  //   
  //   ## 機能
  //   - **関係タイプ**: 階層・カテゴリ・同義語・関連性の定義
  //   - **双方向関係**: 相互参照可能な関係性の構築
  //   - **循環参照防止**: 無効な関係性作成の制限
  //   
  //   ## 使用場面
  //   - タグ階層構造の構築
  //   - 同義タグの関連付け
  //   - タグ間のカテゴリ関係定義
  //   """)
  // @post
  // @route("/tags/relations")
  // createTagRelation(
  //   @doc("タグ関係作成情報を含むリクエスト")
  //   @body request: CreateTagRelationRequest
  // ): TagRelation | ValidationError | ConflictError;
  
  // 分析・洞察機能（初期リリース版では未実装）
  // 
  // @doc("""
  //   検索行動の分析・統計情報取得機能
  //   
  //   ## 機能
  //   - **人気検索ワード**: 検索頻度・成功率付きクエリランキング
  //   - **タグ分析**: タグ別検索数・クリック率統計
  //   - **検索トレンド**: 期間別検索動向・ユーザー数推移
  //   - **フィルター使用統計**: 検索条件の使用頻度・割合分析
  //   
  //   ## 使用場面
  //   - 管理ダッシュボードでの検索動向把握
  //   - コンテンツ戦略立案のための分析
  //   - ユーザー行動パターンの理解
  //   - 検索機能改善のための基礎データ収集
  //   """)
  // @get
  // @route("/analytics/search")
  // getSearchAnalytics(
  //   @doc("分析期間。'day'（日）、'week'（週）、'month'（月）。デフォルト：'week'")
  //   @query period?: "day" | "week" | "month" = "week",
  //   @doc("特定ユーザーの分析（未指定時は全体統計）")
  //   @query userId?: UserId
  // ): {
  //   topQueries: {                     // 人気検索クエリ統計
  //     query: string;                  // 検索クエリ文字列
  //     count: int32;                   // 検索回数
  //     successRate: float32;           // 成功率（検索後クイズ挑戦に至った割合）
  //   }[];
  //   topTags: {                        // 人気タグ検索統計
  //     tag: string;                    // タグ名
  //     searchCount: int32;             // タグでの検索回数
  //     clickThroughRate: float32;      // クリック率（検索結果クリック率）
  //   }[];
  //   searchTrends: {                   // 検索トレンド推移
  //     date: string;                   // 日付（ISO 8601形式）
  //     totalSearches: int32;           // 総検索回数
  //     uniqueUsers: int32;             // ユニークユーザー数
  //     avgResultsPerSearch: float32;   // 1検索あたり平均結果数
  //   }[];
  //   popularFilters: {                 // 人気フィルター使用統計
  //     filter: string;                 // フィルター名
  //     usageCount: int32;              // 使用回数
  //     usagePercentage: float32;       // 全体に占める使用割合
  //   }[];
  // };
  // 
  // @doc("""
  //   コンテンツ発見・ユーザー行動洞察機能
  //   
  //   ## 機能
  //   - **発見経路分析**: ユーザーのコンテンツ到達パス・コンバージョン率
  //   - **コンテンツパフォーマンス**: クイズ別の閲覧・挑戦・完了率統計
  //   - **行動パターン**: セッション別検索パターン・挑戦までの時間分析
  //   
  //   ## 使用場面
  //   - コンテンツ発見経路の最適化
  //   - 高パフォーマンスコンテンツの特定
  //   - ユーザーエクスペリエンス改善
  //   - パーソナライゼーション戦略立案
  //   """)
  // @get
  // @route("/analytics/discovery")
  // getDiscoveryInsights(
  //   @doc("特定ユーザーの分析（未指定時は全体統計）")
  //   @query userId?: UserId,
  //   @doc("分析期間。'day'（日）、'week'（週）、'month'（月）。デフォルト：'week'")
  //   @query period?: "day" | "week" | "month" = "week"
  // ): {
  //   discoveryPaths: {                 // コンテンツ発見経路統計
  //     path: string[];                 // 発見経路（例：["search", "similar", "attempt"]）
  //     count: int32;                   // 該当経路のユーザー数
  //     conversionRate: float32;        // コンバージョン率（最終到達率）
  //   }[];
  //   contentPerformance: {             // コンテンツパフォーマンス統計
  //     quizId: QuizId;                 // クイズID
  //     views: int32;                   // 閲覧数
  //     attempts: int32;                // 挑戦回数
  //     completionRate: float32;        // 完了率
  //     avgRating: float32;             // 平均評価点
  //   }[];
  //   userBehavior: {                   // ユーザー行動パターン統計
  //     avgSearchesPerSession: float32; // セッション当たり平均検索回数
  //     avgTimeToFirstAttempt: int32;   // 初回挑戦までの平均時間（秒）
  //     commonSearchPatterns: string[]; // 一般的な検索パターン
  //   };
  // };
}