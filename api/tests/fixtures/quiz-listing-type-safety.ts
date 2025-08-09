// Quiz Listing Type Safety test data for PactumJS specs
// Maintains ユビキタス言語 (Ubiquitous Language): Developer, TypeSpec, Schema

export const quizListingTypeSafetyData = {
  // TypeScript type compliance scenarios for GET list endpoint
  typeComplianceScenarios: [
    {
      description: "List Quizzes Success - QuizListResponse type compliance",
      endpointOperation: "list_quizzes_success",
      endpoint: "/api/quiz/v1/manage/quizzes",
      method: "GET",
      testData: null,
      expectedResponseType: "QuizListResponse",
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
      expectedResponseType: "QuizListResponse",
    },
  ],

  // Response schema validation scenarios for QuizListResponse
  responseSchemaScenarios: [
    {
      description: "QuizListResponse Schema Validation",
      endpoint: "/api/quiz/v1/manage/quizzes",
      method: "GET",
      expectedStatus: 200,
      schemaComponent: "QuizListResponse",
      requiredFields: ["items", "totalCount", "hasMore"],
    },
  ],
} as const;
