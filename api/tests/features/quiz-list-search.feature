Feature: Quiz List Search
  As an AnonymousUser
  I want to search and Filter Quiz collection
  So that I can discover relevant Quiz for learning

  Scenario Outline: Successful Quiz list retrieval with pagination
    Given API server has "<total_count>" sample Quiz items
    When AnonymousUser requests Quiz list with "<pagination_params>"
    Then Response should contain QuizListResponse
    And Items array should include QuizWithSolution objects
    And Pagination metadata should show "<expected_metadata>"

    Examples:
      | total_count | pagination_params | expected_metadata           |
      | 5           | default           | totalCount:5, hasMore:false |
      | 25          | limit:10          | totalCount:25, hasMore:true |
      | 0           | default           | totalCount:0, hasMore:false |

  Scenario Outline: Quiz search with Filter criteria
    Given API server has Quiz collection with various Tags
    When AnonymousUser applies Filter with "<filter_criteria>"
    Then Filtered results should match "<expected_results>"
    And Response structure should remain consistent

    Examples:
      | filter_criteria        | expected_results     |
      | tag:programming       | programming_related  |
      | status:approved       | only_approved_quiz   |
      | creator:specific_user | creator_filtered     |

  Scenario Outline: Empty search results scenarios
    Given API server is running
    When AnonymousUser searches with Filter "<search_filter>"
    Then Response should return empty QuizListResponse
    And totalCount should be "<expected_count>"
    And hasMore should be "<has_more_flag>"

    Examples:
      | search_filter      | expected_count | has_more_flag |
      | nonexistent_tag    | 0              | false         |
      | invalid_creator    | 0              | false         |
      | rejected_status    | 0              | false         |

  Scenario Outline: Quiz list schema validation
    Given API server has sample Quiz data
    When AnonymousUser requests Quiz list
    Then Each Quiz item should match QuizWithSolution schema
    And Solution objects should have correct "<solution_fields>"
    And All required fields should be present

    Examples:
      | solution_fields           |
      | boolean_solution_fields   |
      | text_solution_fields      |
      | choice_solution_fields    |
