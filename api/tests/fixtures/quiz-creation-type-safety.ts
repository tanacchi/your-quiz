// Quiz Creation Type Safety test data for PactumJS specs
// Maintains ユビキタス言語 (Ubiquitous Language): Developer, TypeSpec, Schema

export const quizCreationTypeSafetyData = {
  // TypeScript type compliance scenarios for POST endpoint
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

  // Error response scenarios for POST endpoint
  errorResponseScenarios: [
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

  // Request schema validation scenarios for POST endpoint
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

  // Workflow creation scenarios for POST endpoint
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
} as const;
