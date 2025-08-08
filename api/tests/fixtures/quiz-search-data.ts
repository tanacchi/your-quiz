// Quiz List Search test data for PactumJS specs
// Maintains ユビキタス言語 (Ubiquitous Language): AnonymousUser, QuizListResponse, Search

export const quizSearchData = {
  // Valid search scenarios - 正常系検索シナリオ
  validSearches: [
    {
      description: "No filters - all Approved Quizzes",
      filters: {},
      expected: {
        resultType: "all_approved_quizzes",
        minCount: 1,
      },
    },
    {
      description: "Filter by status - PendingApproval",
      filters: { status: "PendingApproval" },
      expected: {
        resultType: "pending_approval_quizzes",
        statusFilter: "PendingApproval",
      },
    },
    {
      description: "Filter by solution type - boolean",
      filters: { solutionType: "boolean" },
      expected: {
        resultType: "boolean_solution_quizzes",
        solutionTypeFilter: "boolean",
      },
    },
    {
      description: "Combined filters - Approved + multiple_choice",
      filters: { status: "Approved", solutionType: "multiple_choice" },
      expected: {
        resultType: "approved_multiple_choice_quizzes",
        statusFilter: "Approved",
        solutionTypeFilter: "multiple_choice",
      },
    },
  ],

  // Pagination scenarios - ページネーションシナリオ
  paginationScenarios: [
    {
      description: "First page with default limit",
      queryParams: { page: 1 },
      expected: {
        paginationType: "first_page_default",
        expectedPage: 1,
        expectedLimit: 20,
      },
    },
    {
      description: "Second page with custom limit",
      queryParams: { page: 2, limit: 10 },
      expected: {
        paginationType: "second_page_custom",
        expectedPage: 2,
        expectedLimit: 10,
      },
    },
    {
      description: "Large page number",
      queryParams: { page: 999, limit: 5 },
      expected: {
        paginationType: "empty_page",
        expectedPage: 999,
        expectedLimit: 5,
        expectedCount: 0,
      },
    },
  ],

  // Empty result scenarios - 空結果シナリオ
  emptyResultScenarios: [
    {
      description: "Non-existent solution type filter",
      filters: { solutionType: "non_existent_type" },
      expected: {
        resultType: "empty_results",
        reason: "no_matching_solution_type",
      },
    },
    {
      description: "Non-existent status filter",
      filters: { status: "NonExistentStatus" },
      expected: {
        resultType: "empty_results",
        reason: "no_matching_status",
      },
    },
    {
      description: "Impossible filter combination",
      filters: { status: "Rejected", solutionType: "impossible_type" },
      expected: {
        resultType: "empty_results",
        reason: "impossible_combination",
      },
    },
  ],

  // Schema validation test cases - スキーマ検証テストケース
  schemaValidationCases: [
    {
      description: "QuizListResponse structure validation",
      expected: {
        requiredFields: ["quizzes", "pagination", "totalCount"],
        quizFields: ["id", "question", "status", "solutionType", "createdAt"],
        paginationFields: [
          "page",
          "limit",
          "totalPages",
          "hasNext",
          "hasPrevious",
        ],
      },
    },
  ],
} as const;
