// Quiz List Search test data for PactumJS specs
// Maintains ユビキタス言語 (Ubiquitous Language): AnonymousUser, QuizSummaryListResponse, Search

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
      description: "Filter by status - pending_approval",
      filters: { status: ["pending_approval"] },
      expected: {
        resultType: "pending_approval_quizzes",
        statusFilter: ["pending_approval"],
      },
    },
    {
      description: "Filter by multiple status - approved and pending",
      filters: { status: ["approved", "pending_approval"] },
      expected: {
        resultType: "multiple_status_quizzes",
        statusFilter: ["approved", "pending_approval"],
      },
    },
    {
      description: "Filter by creatorId - single user",
      filters: { creatorId: "user-123" },
      expected: {
        resultType: "creator_filtered_quizzes",
        creatorFilter: "user-123",
      },
    },
    {
      description: "Filter by specific quizIds",
      filters: { quizId: ["quiz-001", "quiz-002"] },
      expected: {
        resultType: "specific_quizzes",
        quizIdFilter: ["quiz-001", "quiz-002"],
      },
    },
    {
      description: "Combined filters - status + creatorId",
      filters: { status: ["approved"], creatorId: "user-123" },
      expected: {
        resultType: "approved_creator_quizzes",
        statusFilter: ["approved"],
        creatorFilter: "user-123",
      },
    },
  ],

  // Pagination scenarios - ページネーションシナリオ
  paginationScenarios: [
    {
      description: "First page with default limit",
      queryParams: { offset: 0, limit: 10 },
      expected: {
        paginationType: "first_page_default",
        expectedOffset: 0,
        expectedLimit: 10,
      },
    },
    {
      description: "Second page with custom limit",
      queryParams: { offset: 10, limit: 5 },
      expected: {
        paginationType: "second_page_custom",
        expectedOffset: 10,
        expectedLimit: 5,
      },
    },
    {
      description: "Large offset with small limit",
      queryParams: { offset: 1000, limit: 3 },
      expected: {
        paginationType: "empty_page",
        expectedOffset: 1000,
        expectedLimit: 3,
        expectedCount: 0,
      },
    },
  ],

  // Empty result scenarios - 空結果シナリオ
  emptyResultScenarios: [
    {
      description: "Non-existent status filter",
      filters: { status: ["non_existent_status"] },
      expected: {
        resultType: "empty_results",
        reason: "no_matching_status",
      },
    },
    {
      description: "Non-existent creatorId filter",
      filters: { creatorId: "non-existent-user" },
      expected: {
        resultType: "empty_results",
        reason: "no_matching_creator",
      },
    },
    {
      description: "Non-existent quizIds filter",
      filters: { quizId: ["non-existent-quiz-1", "non-existent-quiz-2"] },
      expected: {
        resultType: "empty_results",
        reason: "no_matching_quiz_ids",
      },
    },
    {
      description: "Impossible filter combination",
      filters: { status: ["rejected"], creatorId: "impossible-user" },
      expected: {
        resultType: "empty_results",
        reason: "impossible_combination",
      },
    },
  ],

  // Schema validation test cases - スキーマ検証テストケース
  schemaValidationCases: [
    {
      description: "QuizSummaryListResponse structure validation",
      expected: {
        requiredFields: ["items", "totalCount", "hasMore"],
        quizSummaryFields: [
          "id",
          "question",
          "answerType",
          "solutionId",
          "status",
          "creatorId",
          "createdAt",
          "tagIds",
        ],
        optionalFields: ["explanation", "approvedAt", "continuationToken"],
      },
    },
  ],
} as const;
