// Quiz Retrieval Type Safety test data for PactumJS specs
// Maintains ユビキタス言語 (Ubiquitous Language): Developer, TypeSpec, Schema

export const quizRetrievalTypeSafetyData = {
  // TypeScript type compliance scenarios for GET by ID endpoint
  typeComplianceScenarios: [
    {
      description: "Get Quiz Success - QuizResponse type compliance",
      endpointOperation: "get_quiz_success",
      endpointTemplate: "/api/quiz/v1/manage/quizzes/{id}",
      method: "GET",
      testData: null,
      expectedResponseType: "QuizResponse",
      expectedStatus: 200,
    },
  ],

  // Error response scenarios for GET by ID endpoint
  errorResponseScenarios: [
    {
      description: "Quiz Not Found - 404 ErrorResponse",
      endpoint: "/api/quiz/v1/manage/quizzes/nonexistent-id",
      method: "GET",
      expectedStatus: 404,
      expectedErrorStructure: {
        hasErrorCode: true,
        errorCodeType: "number",
        hasErrorMessage: true,
        errorMessageType: "string",
      },
    },
  ],

  // Workflow retrieval scenarios for GET by ID endpoint
  workflowRetrieveScenarios: [
    {
      description: "Retrieve created quiz by ID",
      endpointTemplate: "/api/quiz/v1/manage/quizzes/{id}",
      method: "GET",
      expectedStatus: 200,
      expectedResponseType: "QuizResponse",
    },
  ],

  // Response schema validation scenarios for QuizResponse
  responseSchemaScenarios: [
    {
      description: "QuizResponse Schema Validation (Create then Get)",
      createEndpoint: "/api/quiz/v1/manage/quizzes",
      retrieveEndpointTemplate: "/api/quiz/v1/manage/quizzes/{id}",
      createData: {
        question: "Schema test question",
        answerType: "boolean",
        solution: {
          type: "boolean",
          id: "schema-sol",
          value: true,
        },
        explanation: "Schema test explanation",
      },
      expectedStatus: 200,
      schemaComponent: "QuizResponse",
      requiredFields: ["id", "question", "answerType", "solution"],
    },
  ],
} as const;
