Feature: Quiz作成
  Creatorとして
  QuizをシステムにSubmitしたい
  その結果、AnonymousUserがQuizで学習できるようにしたい

  シナリオアウトライン: Solution種別ごとの有効なQuiz作成
    前提 APIサーバーが起動している
    もし Creator が Question「<question>」と「<solution_type>」SolutionでQuizをSubmitした場合
    ならば Quizは「PendingApproval」ステータスで作成されること
    かつ レスポンスに生成されたQuiz識別子が含まれること
    かつ Solutionが「<solution_type>」スキーマ構造と一致すること

    例:
      | question                          | solution_type    |
      | Is TypeScript strongly typed?     | boolean         |
      | Which are TypeScript features?    | multiple_choice |
      | What is the capital of Japan?     | single_choice   |
      | Explain TypeScript benefits       | free_text       |

  シナリオアウトライン: 無効なQuiz作成シナリオ
    前提 APIサーバーが起動している
    もし Creator が「<invalid_data_type>」なQuizデータをSubmitした場合
    ならば リクエストは「<status_code>」ステータスでRejectedされること
    かつ ErrorResponseに「<error_type>」が示されること

    例:
      | invalid_data_type | status_code | error_type         |
      | incomplete        | 400         | missing_fields     |
      | malformed_json    | 400         | json_parsing       |
      | invalid_schema    | 400         | validation_failure |
      | oversized_content | 400         | character_limit    |

  シナリオアウトライン: CharacterLimitバリデーション付きQuiz作成
    前提 APIサーバーが起動している
    もし Creator が Question長「<question_length>」とExplanation長「<explanation_length>」でQuizをSubmitした場合
    ならば リクエストは「<result_status>」となること
    かつ レスポンスに「<validation_result>」が示されること

    例:
      | question_length | explanation_length | result_status | validation_result |
      | 500             | 1000              | accepted      | valid_limits      |
      | 501             | 999               | rejected      | question_too_long |
      | 499             | 1001              | rejected      | explanation_too_long |
      | 501             | 1001              | rejected      | both_too_long     |
