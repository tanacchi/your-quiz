// Quiz Creation test data for PactumJS specs
// Maintains ユビキタス言語 (Ubiquitous Language) from original feature files

export const quizCreationData = {
  // Valid Quiz creation scenarios - 正常系シナリオ
  validQuizzes: [
    {
      description: "Boolean Solution Type - TypeScript強い型付け質問",
      endpoint: "/api/quiz/v1/manage/quizzes",
      method: "POST",
      input: {
        question: "Is TypeScript strongly typed?",
        answerType: "boolean",
        solution: {
          type: "boolean",
          id: "sol-bool-1",
          value: true,
        },
        explanation:
          "TypeScript provides static type checking at compile time.",
      },
      expectedStatus: 201,
      expected: {
        status: "pending_approval",
        answerType: "boolean",
      },
    },
    {
      description: "Single Choice Solution Type - 日本の首都質問",
      endpoint: "/api/quiz/v1/manage/quizzes",
      method: "POST",
      input: {
        question: "What is the capital of Japan?",
        answerType: "single_choice",
        solution: {
          type: "single_choice",
          id: "sol-single-1",
          correctChoiceId: "choice-tokyo",
          choices: [
            {
              id: "choice-tokyo",
              solutionId: "sol-single-1",
              text: "Tokyo",
              orderIndex: 1,
            },
            {
              id: "choice-osaka",
              solutionId: "sol-single-1",
              text: "Osaka",
              orderIndex: 2,
            },
            {
              id: "choice-kyoto",
              solutionId: "sol-single-1",
              text: "Kyoto",
              orderIndex: 3,
            },
            {
              id: "choice-yokohama",
              solutionId: "sol-single-1",
              text: "Yokohama",
              orderIndex: 4,
            },
          ],
        },
        explanation: "Choose the correct capital city of Japan.",
      },
      expectedStatus: 201,
      expected: {
        status: "pending_approval",
        answerType: "single_choice",
      },
    },
    {
      description: "Multiple Choice Solution Type - TypeScript機能選択質問",
      endpoint: "/api/quiz/v1/manage/quizzes",
      method: "POST",
      input: {
        question: "Which are TypeScript features?",
        answerType: "multiple_choice",
        solution: {
          type: "multiple_choice",
          id: "sol-multi-1",
          correctChoiceIds: ["choice-typing", "choice-interfaces"],
          minCorrectAnswers: 2,
          choices: [
            {
              id: "choice-typing",
              solutionId: "sol-multi-1",
              text: "Static typing",
              orderIndex: 1,
            },
            {
              id: "choice-interfaces",
              solutionId: "sol-multi-1",
              text: "Interfaces",
              orderIndex: 2,
            },
            {
              id: "choice-dynamic",
              solutionId: "sol-multi-1",
              text: "Dynamic typing",
              orderIndex: 3,
            },
            {
              id: "choice-runtime",
              solutionId: "sol-multi-1",
              text: "Runtime checks",
              orderIndex: 4,
            },
          ],
        },
        explanation: "Select all features that TypeScript provides.",
      },
      expectedStatus: 201,
      expected: {
        status: "pending_approval",
        answerType: "multiple_choice",
      },
    },
    {
      description: "Free Text Solution Type - TypeScript利点説明質問",
      endpoint: "/api/quiz/v1/manage/quizzes",
      method: "POST",
      input: {
        question: "Explain TypeScript benefits",
        answerType: "free_text",
        solution: {
          type: "free_text",
          id: "sol-text-1",
          correctAnswer: "Better tooling and type safety",
          matchingStrategy: "partial",
          caseSensitive: false,
        },
        explanation: "Provide detailed explanation of TypeScript advantages.",
      },
      expectedStatus: 201,
      expected: {
        status: "pending_approval",
        answerType: "free_text",
      },
    },
  ],

  // Invalid Quiz creation scenarios - 異常系シナリオ
  invalidQuizzes: [
    {
      description: "Incomplete data - 不完全データ",
      endpoint: "/api/quiz/v1/manage/quizzes",
      method: "POST",
      input: {
        question: "Incomplete question",
        // Missing required fields: answerType, solution
      },
      expectedStatus: 400,
      expected: {
        errorType: "validation_error",
      },
    },
    {
      description: "Empty question - 空の質問文",
      endpoint: "/api/quiz/v1/manage/quizzes",
      method: "POST",
      input: {
        question: "",
        answerType: "boolean",
        solution: {
          type: "boolean",
          id: "sol-empty",
          value: true,
        },
      },
      expectedStatus: 400,
      expected: {
        errorType: "validation_error",
      },
    },
    {
      description: "Invalid answerType - 不正な回答タイプ",
      endpoint: "/api/quiz/v1/manage/quizzes",
      method: "POST",
      input: {
        question: "Valid question",
        answerType: "invalid_type",
        solution: {
          type: "boolean",
          id: "sol-invalid",
          value: true,
        },
      },
      expectedStatus: 400,
      expected: {
        errorType: "validation_error",
      },
    },
  ],

  // Character limit validation scenarios - 文字数制限検証シナリオ
  characterLimitScenarios: [
    {
      description: "Question at character limit - 質問文字数上限",
      endpoint: "/api/quiz/v1/manage/quizzes",
      method: "POST",
      questionLength: 500,
      explanationLength: 1000,
      expectedStatus: 201,
      expected: {
        validationResult: "accepted",
      },
    },
    {
      description: "Question exceeds limit - 質問文字数超過",
      endpoint: "/api/quiz/v1/manage/quizzes",
      method: "POST",
      questionLength: 501,
      explanationLength: 999,
      expectedStatus: 400,
      expected: {
        validationResult: "question_too_long",
      },
    },
    {
      description: "Explanation exceeds limit - 説明文字数超過",
      endpoint: "/api/quiz/v1/manage/quizzes",
      method: "POST",
      questionLength: 499,
      explanationLength: 1001,
      expectedStatus: 400,
      expected: {
        validationResult: "explanation_too_long",
      },
    },
  ],
} as const;
