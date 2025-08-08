// API Type Safety test data for PactumJS specs
// Maintains ユビキタス言語 (Ubiquitous Language): Developer, TypeSpec, Schema

export const typeSafetyData = {
  // TypeScript type compliance scenarios - TypeScript型準拠シナリオ
  typeComplianceScenarios: [
    {
      description: "Create Quiz Success - CreateQuizRequest type compliance",
      endpointOperation: "create_quiz_success",
      endpoint: "/api/quiz/v1/manage/quizzes",
      method: "POST",
      testData: {
        question: "Test question",
        answerType: "boolean",
        solution: {
          type: "boolean",
          id: "sol-1",
          value: true,
        },
        explanation: "Test explanation",
      },
      expectedResponseType: "Quiz",
      expectedStatus: 201,
    },
    {
      description: "Get Quiz Success - QuizWithSolution type compliance",
      endpointOperation: "get_quiz_success",
      endpoint: "/api/quiz/v1/manage/quizzes/test-quiz-id",
      method: "GET",
      testData: null,
      expectedResponseType: "QuizWithSolution",
      expectedStatus: 200,
    },
    {
      description: "List Quizzes Success - QuizListResponse type compliance",
      endpointOperation: "list_quizzes_success",
      endpoint: "/api/quiz/v1/manage/quizzes",
      method: "GET",
      testData: null,
      expectedResponseType: "QuizListResponse",
      expectedStatus: 200,
    },
    {
      description:
        "Create Quiz Validation Error - ErrorResponse type compliance",
      endpointOperation: "create_quiz_validation_error",
      endpoint: "/api/quiz/v1/manage/quizzes",
      method: "POST",
      testData: {
        question: "", // Invalid empty question
        answerType: "boolean",
      },
      expectedResponseType: "ErrorResponse",
      expectedStatus: 400,
    },
  ],

  // End-to-end workflow scenarios - E2Eワークフローシナリオ (no branching)
  workflowCreateScenarios: [
    {
      description: "Create Quiz for workflow test",
      endpoint: "/api/quiz/v1/manage/quizzes",
      method: "POST",
      testData: {
        question: "Workflow test question",
        answerType: "boolean",
        solution: {
          type: "boolean",
          id: "workflow-sol",
          value: true,
        },
        explanation: "Workflow test explanation",
      },
      expectedStatus: 201,
      expectedResponseType: "Quiz",
    },
  ],

  workflowRetrieveScenarios: [
    {
      description: "Retrieve created quiz by ID",
      endpointTemplate: "/api/quiz/v1/manage/quizzes/{id}",
      method: "GET",
      expectedStatus: 200,
      expectedResponseType: "QuizWithSolution",
    },
  ],

  workflowListScenarios: [
    {
      description: "Verify quiz appears in list",
      endpoint: "/api/quiz/v1/manage/quizzes",
      method: "GET",
      expectedStatus: 200,
      expectedResponseType: "QuizListResponse",
    },
  ],

  // Error response scenarios - エラーレスポンスシナリオ
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
    {
      description: "Invalid Quiz Creation - 400 ErrorResponse",
      endpoint: "/api/quiz/v1/manage/quizzes",
      method: "POST",
      testData: {
        question: "", // Invalid empty question
      },
      expectedStatus: 400,
      expectedErrorStructure: {
        hasErrorCode: true,
        errorCodeType: "number",
        hasErrorMessage: true,
        errorMessageType: "string",
      },
    },
  ],

  // Schema component validation scenarios (no branching)
  requestSchemaScenarios: [
    {
      description: "CreateQuizRequest Schema Validation",
      endpoint: "/api/quiz/v1/manage/quizzes",
      method: "POST",
      testData: {
        question: "Schema evolution test",
        answerType: "boolean",
        solution: {
          type: "boolean",
          id: "sol-test",
          value: false,
        },
      },
      expectedStatus: 201,
      expectedResponseType: "Quiz",
    },
  ],

  responseSchemaScenarios: [
    {
      description: "QuizListResponse Schema Validation",
      endpoint: "/api/quiz/v1/manage/quizzes",
      method: "GET",
      expectedStatus: 200,
      schemaComponent: "QuizListResponse",
      requiredFields: ["items", "totalCount", "hasMore"],
    },
    {
      description: "ErrorResponse Schema Validation",
      endpoint: "/api/quiz/v1/manage/quizzes/nonexistent",
      method: "GET",
      expectedStatus: 404,
      schemaComponent: "ErrorResponse",
      requiredFields: ["code", "message"],
    },
    {
      description: "QuizWithSolution Schema Validation (Create then Get)",
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
      schemaComponent: "QuizWithSolution",
      requiredFields: ["id", "question", "answerType", "solution"],
    },
  ],
} as const;
