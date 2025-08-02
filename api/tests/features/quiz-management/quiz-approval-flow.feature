Feature: Quiz Approval Flow
  クイズ投稿から承認までのビジネスフローを検証する

  Background:
    Given API server is running
    And Database is clean

  Scenario Outline: Quiz submission and approval process
    Given Creator with "<creator_type>" submits Quiz with Question "<question>"
    When Administrator reviews Quiz with status "<review_action>"
    Then Quiz status should be "<final_status>"
    And Quiz should be "<availability>" for learning

    Examples:
      | creator_type     | question                        | review_action | final_status | availability |
      | new_creator      | Valid question about math        | approve       | Approved     | available    |
      | trusted_creator  | Valid question about history     | approve       | Approved     | available    |
      | new_creator      | Invalid question with HTML       | reject        | Rejected     | unavailable  |
      | spam_creator     | Duplicate question content       | reject        | Rejected     | unavailable  |

  # Requirements Traceability:
  # - requirements-quiz.md:11 → Question character limit (500)
  # - requirements-quiz.md:12 → CorrectAnswer format (true/false)
  # - requirements-quiz.md:20 → Quiz approval workflow
