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

  // Solution type mismatch scenarios - Solution型とフィールドの矛盾シナリオ
  solutionTypeMismatchScenarios: [
    {
      description:
        "Boolean solution with free_text fields - Boolean型にfree_textフィールド",
      endpoint: "/api/quiz/v1/manage/quizzes",
      method: "POST",
      input: {
        question: "Is this a valid boolean question?",
        answerType: "boolean",
        solution: {
          type: "boolean",
          id: "sol-mismatch-1",
          correctAnswer: "This should not be here", // Wrong field for boolean type
          caseSensitive: false,
        },
      },
      expectedStatus: 400,
      expected: {
        errorType: "solution_type_mismatch",
        errorMessage:
          "Solution type 'boolean' should not contain 'correctAnswer' field",
      },
    },
    {
      description:
        "Free text solution with boolean fields - Free text型にbooleanフィールド",
      endpoint: "/api/quiz/v1/manage/quizzes",
      method: "POST",
      input: {
        question: "Explain the concept",
        answerType: "free_text",
        solution: {
          type: "free_text",
          id: "sol-mismatch-2",
          value: true, // Wrong field for free_text type
        },
      },
      expectedStatus: 400,
      expected: {
        errorType: "solution_type_mismatch",
        errorMessage:
          "Solution type 'free_text' should not contain 'value' field",
      },
    },
    {
      description:
        "Single choice solution with boolean fields - Single choice型にbooleanフィールド",
      endpoint: "/api/quiz/v1/manage/quizzes",
      method: "POST",
      input: {
        question: "Choose the correct answer",
        answerType: "single_choice",
        solution: {
          type: "single_choice",
          id: "sol-mismatch-3",
          value: true, // Wrong field for single_choice type
          correctAnswer: "Some text", // Wrong field for single_choice type
        },
      },
      expectedStatus: 400,
      expected: {
        errorType: "solution_type_mismatch",
        errorMessage:
          "Solution type 'single_choice' should not contain 'value' or 'correctAnswer' fields",
      },
    },
    {
      description:
        "Multiple choice solution with boolean fields - Multiple choice型にbooleanフィールド",
      endpoint: "/api/quiz/v1/manage/quizzes",
      method: "POST",
      input: {
        question: "Select all correct answers",
        answerType: "multiple_choice",
        solution: {
          type: "multiple_choice",
          id: "sol-mismatch-4",
          value: false, // Wrong field for multiple_choice type
        },
      },
      expectedStatus: 400,
      expected: {
        errorType: "solution_type_mismatch",
        errorMessage:
          "Solution type 'multiple_choice' should not contain 'value' field",
      },
    },
    {
      description:
        "Boolean solution missing required value field - Boolean型で必須フィールド欠如",
      endpoint: "/api/quiz/v1/manage/quizzes",
      method: "POST",
      input: {
        question: "Is this valid?",
        answerType: "boolean",
        solution: {
          type: "boolean",
          id: "sol-missing-1",
          // Missing required 'value' field
        },
      },
      expectedStatus: 400,
      expected: {
        errorType: "missing_required_field",
        errorMessage: "Solution type 'boolean' requires 'value' field",
      },
    },
    {
      description:
        "Free text solution missing required correctAnswer field - Free text型で必須フィールド欠如",
      endpoint: "/api/quiz/v1/manage/quizzes",
      method: "POST",
      input: {
        question: "Explain this concept",
        answerType: "free_text",
        solution: {
          type: "free_text",
          id: "sol-missing-2",
          matchingStrategy: "exact",
          caseSensitive: false,
          // Missing required 'correctAnswer' field
        },
      },
      expectedStatus: 400,
      expected: {
        errorType: "missing_required_field",
        errorMessage:
          "Solution type 'free_text' requires 'correctAnswer' field",
      },
    },
    {
      description:
        "Single choice solution missing choices array - Single choice型でchoices配列欠如",
      endpoint: "/api/quiz/v1/manage/quizzes",
      method: "POST",
      input: {
        question: "Choose one option",
        answerType: "single_choice",
        solution: {
          type: "single_choice",
          id: "sol-missing-3",
          correctChoiceId: "choice-1",
          // Missing required 'choices' array
        },
      },
      expectedStatus: 400,
      expected: {
        errorType: "missing_required_field",
        errorMessage: "Solution type 'single_choice' requires 'choices' array",
      },
    },
    {
      description:
        "Multiple choice solution missing correctChoiceIds - Multiple choice型でcorrectChoiceIds欠如",
      endpoint: "/api/quiz/v1/manage/quizzes",
      method: "POST",
      input: {
        question: "Select multiple options",
        answerType: "multiple_choice",
        solution: {
          type: "multiple_choice",
          id: "sol-missing-4",
          minCorrectAnswers: 2,
          choices: [
            {
              id: "choice-1",
              solutionId: "sol-missing-4",
              text: "Option 1",
              orderIndex: 1,
            },
          ],
          // Missing required 'correctChoiceIds' array
        },
      },
      expectedStatus: 400,
      expected: {
        errorType: "missing_required_field",
        errorMessage:
          "Solution type 'multiple_choice' requires 'correctChoiceIds' array",
      },
    },
    {
      description:
        "AnswerType and solution.type mismatch - answerTypeとsolution.typeの不整合",
      endpoint: "/api/quiz/v1/manage/quizzes",
      method: "POST",
      input: {
        question: "This should be boolean but solution is free_text",
        answerType: "boolean", // answerType says boolean
        solution: {
          type: "free_text", // but solution type is free_text
          id: "sol-type-mismatch-1",
          correctAnswer: "Some answer",
          matchingStrategy: "exact",
          caseSensitive: false,
        },
      },
      expectedStatus: 400,
      expected: {
        errorType: "answer_solution_type_mismatch",
        errorMessage:
          "answerType 'boolean' does not match solution type 'free_text'",
      },
    },
    {
      description:
        "Single choice answerType with multiple choice solution - Single choice answerTypeでmultiple choice solution",
      endpoint: "/api/quiz/v1/manage/quizzes",
      method: "POST",
      input: {
        question:
          "This should be single choice but solution is multiple choice",
        answerType: "single_choice", // answerType says single_choice
        solution: {
          type: "multiple_choice", // but solution type is multiple_choice
          id: "sol-type-mismatch-2",
          correctChoiceIds: ["choice-1", "choice-2"],
          minCorrectAnswers: 1,
          choices: [
            {
              id: "choice-1",
              solutionId: "sol-type-mismatch-2",
              text: "Option 1",
              orderIndex: 1,
            },
            {
              id: "choice-2",
              solutionId: "sol-type-mismatch-2",
              text: "Option 2",
              orderIndex: 2,
            },
          ],
        },
      },
      expectedStatus: 400,
      expected: {
        errorType: "answer_solution_type_mismatch",
        errorMessage:
          "answerType 'single_choice' does not match solution type 'multiple_choice'",
      },
    },
  ],
} as const;
