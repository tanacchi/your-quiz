Feature: Quiz Retrieval by ID
  As an AnonymousUser
  I want to retrieve specific Quiz by identifier
  So that I can view complete Quiz with Solution

  Scenario Outline: Successful Quiz retrieval by valid ID
    Given API server has Quiz with ID "<quiz_id>" and status "<quiz_status>"
    When AnonymousUser requests Quiz details for "<quiz_id>"
    Then Response should contain QuizWithSolution
    And Quiz should match schema structure
    And Solution should include "<solution_data>"

    Examples:
      | quiz_id      | quiz_status | solution_data      |
      | test-quiz-1  | Approved    | boolean_value      |
      | test-quiz-2  | Approved    | choice_options     |
      | test-quiz-3  | Approved    | text_matching      |

  Scenario Outline: Quiz retrieval failure scenarios
    Given API server is running
    When AnonymousUser requests Quiz details for "<invalid_id>"
    Then Response should return "<status_code>" status
    And ErrorResponse should indicate "<error_reason>"

    Examples:
      | invalid_id    | status_code | error_reason    |
      | nonexistent   | 400         | id_required     |
      | empty_string  | 400         | id_required     |
      | null_value    | 400         | id_required     |

  Scenario Outline: Quiz retrieval with different Solution types
    Given API server has Quiz with "<solution_type>" Solution
    When AnonymousUser requests Quiz details by ID
    Then QuizWithSolution should contain correct "<solution_structure>"
    And Solution type should match "<solution_type>"
    And Schema validation should pass

    Examples:
      | solution_type    | solution_structure     |
      | boolean         | boolean_value_field    |
      | free_text       | text_matching_fields   |
      | single_choice   | choices_with_correct   |
      | multiple_choice | choices_with_multiples |
