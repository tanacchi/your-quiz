// Quiz Test Types - Type-safe definitions for BDD testing
// Eliminates any type usage and provides complete type safety

// Base Choice interface with isCorrect field (new Choice model)
export interface Choice {
  id: string;
  solutionId: string;
  text: string;
  orderIndex: number;
  isCorrect: boolean;
}

// Solution type definitions (Discriminated Union)
export interface BooleanSolution {
  type: "boolean";
  id: string;
  value: boolean;
}

export interface FreeTextSolution {
  type: "free_text";
  id: string;
  correctAnswer: string;
  matchingStrategy: "exact" | "partial";
  caseSensitive: boolean;
}

export interface SingleChoiceSolution {
  type: "single_choice";
  id: string;
  choices: Choice[];
}

export interface MultipleChoiceSolution {
  type: "multiple_choice";
  id: string;
  minCorrectAnswers: number;
  choices: Choice[];
}

// Discriminated Union for all Solution types
export type Solution =
  | BooleanSolution
  | FreeTextSolution
  | SingleChoiceSolution
  | MultipleChoiceSolution;

// Quiz creation request structure
export interface QuizCreateRequest {
  question: string;
  answerType: "boolean" | "free_text" | "single_choice" | "multiple_choice";
  solution: Solution;
  explanation?: string;
}

// Quiz response structure
export interface Quiz {
  id: string;
  question: string;
  answerType: string;
  status: string;
  solution: Solution;
  explanation?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Error response structure
export interface ErrorResponse {
  error: string;
  message: string;
  code: number;
}

// Test data structure for type-safe testing
export interface TestCase<TRequest = unknown, TResponse = unknown> {
  description: string;
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  input?: TRequest;
  testData?: TRequest;
  expectedStatus: number;
  expected?: Partial<TResponse>;
  expectedResponseType?: string;
}

// Character limit test case
export interface CharacterLimitTestCase {
  description: string;
  endpoint: string;
  method: "POST";
  questionLength: number;
  explanationLength: number;
  expectedStatus: number;
  expected: {
    validationResult: string;
  };
}

// Solution type mismatch test case
export interface SolutionMismatchTestCase {
  description: string;
  endpoint: string;
  method: "POST";
  input: {
    question: string;
    answerType: string;
    solution: Record<string, unknown>; // Intentionally unknown for mismatch testing
  };
  expectedStatus: number;
  expected: {
    errorType: string;
    errorMessage?: string;
  };
}

// Type guard helper types
export type SolutionType = Solution["type"];
export type ChoiceBasedSolution = SingleChoiceSolution | MultipleChoiceSolution;

// Validation error structure for type-safe error testing
export interface ValidationErrorStructure {
  hasErrorCode: boolean;
  errorCodeType: "string" | "number";
  hasErrorMessage: boolean;
  errorMessageType: "string" | "number";
}
