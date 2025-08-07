Feature: Quiz一覧検索
  AnonymousUserとして
  Quizコレクションを検索・Filterしたい
  その結果、学習に役立つQuizを発見できるようにしたい

  シナリオアウトライン: ページネーション付きQuiz一覧取得
    前提 APIサーバーに「<total_count>」件のサンプルQuizが存在する
    もし AnonymousUser が「<pagination_params>」でQuiz一覧をリクエストした場合
    ならば レスポンスにQuizListResponseが含まれること
    かつ Items配列にQuizWithSolutionオブジェクトが含まれること
    かつ ページネーションメタデータが「<expected_metadata>」を示すこと

    例:
      | total_count | pagination_params | expected_metadata           |
      | 5           | default           | totalCount:5, hasMore:false |
      | 25          | limit:10          | totalCount:25, hasMore:true |
      | 0           | default           | totalCount:0, hasMore:false |

  シナリオアウトライン: Filter条件付きQuiz検索
    前提 APIサーバーに様々なTag付きQuizコレクションが存在する
    もし AnonymousUser が「<filter_criteria>」でFilterを適用した場合
    ならば Filter後の結果が「<expected_results>」と一致すること
    かつ レスポンス構造が一貫していること

    例:
      | filter_criteria        | expected_results     |
      | tag:programming       | programming_related  |
      | status:approved       | only_approved_quiz   |
      | creator:specific_user | creator_filtered     |

  シナリオアウトライン: 空検索結果シナリオ
    前提 APIサーバーが起動している
    もし AnonymousUser が「<search_filter>」でFilter検索した場合
    ならば レスポンスは空のQuizListResponseを返すこと
    かつ totalCountが「<expected_count>」であること
    かつ hasMoreが「<has_more_flag>」であること

    例:
      | search_filter      | expected_count | has_more_flag |
      | nonexistent_tag    | 0              | false         |
      | invalid_creator    | 0              | false         |
      | rejected_status    | 0              | false         |

  シナリオアウトライン: Quiz一覧スキーマ検証
    前提 APIサーバーにサンプルQuizデータが存在する
    もし AnonymousUser がQuiz一覧をリクエストした場合
    ならば 各Quiz項目がQuizWithSolutionスキーマと一致すること
    かつ Solutionオブジェクトが「<solution_fields>」を正しく持つこと
    かつ 必須フィールドがすべて存在すること

    例:
      | solution_fields           |
      | boolean_solution_fields   |
      | text_solution_fields      |
      | choice_solution_fields    |
