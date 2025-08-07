Feature: API型安全性と統合
  開発者として
  すべてのAPIレスポンスがTypeSpecスキーマに一致してほしい
  その結果、フロントエンドとバックエンド間で型安全性が保証される

  シナリオアウトライン: TypeScript型準拠検証
    前提 APIサーバーが起動している
    もし「<endpoint_operation>」を実行した場合
    ならば レスポンスはTypeSpec生成型と厳密に一致すること
    かつ Zodスキーマ検証がエラーなく通過すること
    かつ neverthrowによるエラー処理が正しく動作すること

    例:
      | endpoint_operation       |
      | create_quiz_success      |
      | get_quiz_by_id_success   |
      | get_quiz_list_success    |
      | create_quiz_validation_error |
      | get_quiz_not_found_error |

  シナリオアウトライン: Quizワークフロー一貫性
    前提 APIサーバーが起動している
    もし Creator がQuizライフサイクルを完了させた場合
    かつ Quizデータが「<workflow_steps>」を通過した場合
    ならば すべての操作でデータが一貫していること
    かつ 型安全性が常に維持されていること

    例:
      | workflow_steps                           |
      | create→retrieve_by_id→verify_in_list    |
      | create→modify_data→verify_consistency    |
      | create→error_scenarios→error_handling   |

  シナリオアウトライン: ErrorResponseスキーマ準拠
    前提 APIサーバーが起動している
    もし「<endpoint_type>」への不正リクエストを送信した場合
    ならば すべてのエラーレスポンスはErrorResponseスキーマに従うこと
    かつ エラーコードは数値型であること
    かつ エラーメッセージは説明的な文字列であること
    かつ neverthrowのResult型でエラーがラップされること

    例:
      | endpoint_type    |
      | quiz_creation    |
      | quiz_retrieval   |
      | quiz_list_search |

  シナリオアウトライン: スキーマ進化互換性
    前提 APIサーバーがTypeSpec生成スキーマを使用している
    もし「<schema_component>」を検証した場合
    ならば 現在の実装が生成型と一致していること
    かつ 実行時型不一致が発生しないこと
    かつ ZodがTypeScript型を正しく満たしていること

    例:
      | schema_component    |
      | CreateQuizRequest   |
      | Quiz                |
      | QuizWithSolution    |
      | QuizListResponse    |
      | ErrorResponse       |
