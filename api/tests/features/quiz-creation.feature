Feature: Quiz Creation
  As a Creator
  I want to Submit Quiz to system
  So that AnonymousUser can learn from Quiz

  Scenario Outline: Valid Quiz creation with different Solution types
    Given API server is running
    When Creator submits Quiz with Question "<question>" and "<solution_type>" Solution
    Then Quiz should be created with status "PendingApproval"
    And Response should include generated Quiz identifier
    And Solution should match "<solution_type>" schema structure

    Examples:
      | question                          | solution_type    |
      | Is TypeScript strongly typed?     | boolean         |
      | Which are TypeScript features?    | multiple_choice |
      | What is the capital of Japan?     | single_choice   |
      | Explain TypeScript benefits       | free_text       |

  Scenario Outline: Invalid Quiz creation scenarios
    Given API server is running
    When Creator submits "<invalid_data_type>" Quiz data
    Then Request should be Rejected with "<status_code>" status
    And ErrorResponse should indicate "<error_type>"

    Examples:
      | invalid_data_type | status_code | error_type         |
      | incomplete        | 400         | missing_fields     |
      | malformed_json    | 400         | json_parsing       |
      | invalid_schema    | 400         | validation_failure |
      | oversized_content | 400         | character_limit    |

  Scenario Outline: Quiz creation with CharacterLimit validation
    Given API server is running
    When Creator submits Quiz with Question length "<question_length>" and Explanation length "<explanation_length>"
    Then Request should be "<result_status>"
    And Response should indicate "<validation_result>"

    Examples:
      | question_length | explanation_length | result_status | validation_result |
      | 500             | 1000              | accepted      | valid_limits      |
      | 501             | 999               | rejected      | question_too_long |
      | 499             | 1001              | rejected      | explanation_too_long |
      | 501             | 1001              | rejected      | both_too_long     |
