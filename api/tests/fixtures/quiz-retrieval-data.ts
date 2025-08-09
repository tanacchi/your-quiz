// Quiz Retrieval by ID test data for PactumJS specs
// Maintains ユビキタス言語 (Ubiquitous Language): AnonymousUser, QuizWithSolution

export const quizRetrievalData = {
  // Valid Quiz retrieval scenarios - 正常系シナリオ
  validRetrievals: [
    {
      description: "Boolean Solution Type - test-quiz-1 retrieval",
      quizId: "test-quiz-1",
      quizStatus: "Approved",
      expected: {
        solutionData: "boolean_value",
        solutionType: "boolean",
      },
    },
    {
      description: "Choice Options Solution Type - test-quiz-2 retrieval",
      quizId: "test-quiz-2",
      quizStatus: "Approved",
      expected: {
        solutionData: "choice_options",
        solutionType: "single_choice",
      },
    },
    {
      description: "Text Matching Solution Type - test-quiz-3 retrieval",
      quizId: "test-quiz-3",
      quizStatus: "Approved",
      expected: {
        solutionData: "text_matching",
        solutionType: "free_text",
      },
    },
  ],

  // Quiz retrieval failure scenarios - 異常系シナリオ
  failureScenarios: [
    {
      description: "Nonexistent Quiz ID",
      invalidId: "nonexistent",
      expected: {
        statusCode: 400,
        errorReason: "id_required",
      },
    },
    {
      description: "Empty string Quiz ID",
      invalidId: "",
      expected: {
        statusCode: 400,
        errorReason: "id_required",
      },
    },
    {
      description: "Null Quiz ID",
      invalidId: null,
      expected: {
        statusCode: 400,
        errorReason: "id_required",
      },
    },
  ],

  // Different Solution types scenarios - Solution型別シナリオ
  solutionTypeScenarios: [
    {
      description: "Boolean Solution Type",
      solutionType: "boolean",
      expected: {
        solutionStructure: "boolean_value_field",
      },
    },
    {
      description: "Free Text Solution Type",
      solutionType: "free_text",
      expected: {
        solutionStructure: "text_matching_fields",
      },
    },
    {
      description: "Single Choice Solution Type",
      solutionType: "single_choice",
      expected: {
        solutionStructure: "choices_with_correct",
      },
    },
    {
      description: "Multiple Choice Solution Type",
      solutionType: "multiple_choice",
      expected: {
        solutionStructure: "choices_with_multiples",
      },
    },
  ],
} as const;
