Feature: API Type Safety and Integration
  As a Developer
  I want all API responses to match TypeSpec schemas
  So that type safety is guaranteed across frontend-backend

  Scenario Outline: TypeScript type compliance verification
    Given API server is running
    When "<endpoint_operation>" is executed
    Then Response should strictly match TypeSpec generated types
    And Zod schema validation should pass without errors
    And neverthrow error handling should work correctly

    Examples:
      | endpoint_operation       |
      | create_quiz_success      |
      | get_quiz_by_id_success   |
      | get_quiz_list_success    |
      | create_quiz_validation_error |
      | get_quiz_not_found_error |

  Scenario Outline: End-to-end Quiz workflow consistency
    Given API server is running
    When Creator executes complete Quiz lifecycle
    And Quiz data flows through "<workflow_steps>"
    Then Data should remain consistent across all operations
    And Type safety should be maintained throughout

    Examples:
      | workflow_steps                           |
      | create→retrieve_by_id→verify_in_list    |
      | create→modify_data→verify_consistency    |
      | create→error_scenarios→error_handling   |

  Scenario Outline: ErrorResponse schema compliance
    Given API server is running
    When Invalid requests are made to "<endpoint_type>"
    Then All error responses should follow ErrorResponse schema
    And Error code should be numeric type
    And Error message should be descriptive string
    And neverthrow Result type should wrap errors correctly

    Examples:
      | endpoint_type    |
      | quiz_creation    |
      | quiz_retrieval   |
      | quiz_list_search |

  Scenario Outline: Schema evolution compatibility
    Given API server uses TypeSpec generated schemas
    When "<schema_component>" is validated
    Then Current implementation should match generated types
    And No runtime type mismatches should occur
    And Zod satisfies TypeScript types correctly

    Examples:
      | schema_component    |
      | CreateQuizRequest   |
      | Quiz                |
      | QuizWithSolution    |
      | QuizListResponse    |
      | ErrorResponse       |
