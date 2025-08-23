// Quiz Listing Type Safety test data for PactumJS specs
// Maintains ユビキタス言語 (Ubiquitous Language): Developer, TypeSpec, Schema

export const quizListingTypeSafetyData = {
  // TypeScript type compliance scenarios for GET list endpoint
  typeComplianceScenarios: [
    {
      description:
        "List Quizzes Success - QuizSummaryListResponse type compliance",
      endpointOperation: "list_quizzes_success",
      endpoint: "/api/quiz/v1/manage/quizzes",
      method: "GET",
      testData: null,
      expectedResponseType: "QuizSummaryListResponse",
      expectedStatus: 200,
    },
  ],

  // Workflow list scenarios for GET list endpoint
  workflowListScenarios: [
    {
      description: "Verify quiz appears in list",
      endpoint: "/api/quiz/v1/manage/quizzes",
      method: "GET",
      expectedStatus: 200,
      expectedResponseType: "QuizSummaryListResponse",
    },
  ],

  // Response schema validation scenarios for QuizSummaryListResponse
  responseSchemaScenarios: [
    {
      description: "QuizSummaryListResponse Schema Validation",
      endpoint: "/api/quiz/v1/manage/quizzes",
      method: "GET",
      expectedStatus: 200,
      schemaComponent: "QuizSummaryListResponse",
      requiredFields: ["items", "totalCount", "hasMore"],
    },
  ],
} as const;
