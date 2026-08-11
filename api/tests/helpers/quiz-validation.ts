// Quiz Validation Helpers - Type-safe validation functions for BDD testing
// Eliminates any type usage with comprehensive type guards and assertions

import type {
  Choice,
  ChoiceBasedSolution,
  ErrorResponse,
  MultipleChoiceSolution,
  Quiz,
  SingleChoiceSolution,
  ValidationErrorStructure,
} from "../types/quiz-test-types";

// Type guard functions for runtime type checking

export function isChoice(value: unknown): value is Choice {
  if (typeof value !== "object" || value === null) return false;
  const obj = value as Record<string, unknown>;
  return (
    typeof obj["id"] === "string" &&
    typeof obj["solutionId"] === "string" &&
    typeof obj["text"] === "string" &&
    typeof obj["orderIndex"] === "number" &&
    typeof obj["isCorrect"] === "boolean"
  );
}

export function isChoiceArray(value: unknown): value is Choice[] {
  return Array.isArray(value) && value.every(isChoice);
}

export function isSingleChoiceSolution(
  value: unknown,
): value is SingleChoiceSolution {
  if (typeof value !== "object" || value === null) return false;
  const obj = value as Record<string, unknown>;
  return (
    obj["type"] === "single_choice" &&
    typeof obj["id"] === "string" &&
    isChoiceArray(obj["choices"])
  );
}

export function isMultipleChoiceSolution(
  value: unknown,
): value is MultipleChoiceSolution {
  if (typeof value !== "object" || value === null) return false;
  const obj = value as Record<string, unknown>;
  return (
    obj["type"] === "multiple_choice" &&
    typeof obj["id"] === "string" &&
    typeof obj["minCorrectAnswers"] === "number" &&
    isChoiceArray(obj["choices"])
  );
}

export function isChoiceBasedSolution(
  value: unknown,
): value is ChoiceBasedSolution {
  return isSingleChoiceSolution(value) || isMultipleChoiceSolution(value);
}

export function isQuizResponse(value: unknown): value is Quiz {
  if (typeof value !== "object" || value === null) return false;
  const obj = value as Record<string, unknown>;
  return (
    typeof obj["id"] === "string" &&
    typeof obj["question"] === "string" &&
    typeof obj["answerType"] === "string" &&
    typeof obj["status"] === "string"
  );
}

export function isErrorResponse(value: unknown): value is ErrorResponse {
  if (typeof value !== "object" || value === null) return false;
  const obj = value as Record<string, unknown>;
  return (
    typeof obj["error"] === "string" &&
    typeof obj["message"] === "string" &&
    typeof obj["code"] === "number"
  );
}

// Assertion functions for type-safe validation

export function assertChoiceArray(
  value: unknown,
  context = "Choice array",
): asserts value is Choice[] {
  if (!isChoiceArray(value)) {
    throw new Error(`${context}: Expected Choice array, got ${typeof value}`);
  }
}

export function assertSingleChoiceSolution(
  value: unknown,
  context = "Single choice solution",
): asserts value is SingleChoiceSolution {
  if (!isSingleChoiceSolution(value)) {
    throw new Error(
      `${context}: Expected SingleChoiceSolution, got ${typeof value}`,
    );
  }
}

export function assertMultipleChoiceSolution(
  value: unknown,
  context = "Multiple choice solution",
): asserts value is MultipleChoiceSolution {
  if (!isMultipleChoiceSolution(value)) {
    throw new Error(
      `${context}: Expected MultipleChoiceSolution, got ${typeof value}`,
    );
  }
}

export function assertQuizResponse(
  value: unknown,
  context = "Quiz response",
): asserts value is Quiz {
  if (!isQuizResponse(value)) {
    throw new Error(`${context}: Expected Quiz response, got ${typeof value}`);
  }
}

export function assertErrorResponse(
  value: unknown,
  context = "Error response",
): asserts value is ErrorResponse {
  if (!isErrorResponse(value)) {
    throw new Error(`${context}: Expected ErrorResponse, got ${typeof value}`);
  }
}

// Choice-specific validation functions

export function validateChoiceStructure(
  choices: unknown,
  expectedType: "single_choice" | "multiple_choice",
  context = "Choice validation",
): void {
  assertChoiceArray(choices, context);

  if (choices.length === 0) {
    throw new Error(`${context}: Choice array cannot be empty`);
  }

  // Validate each choice has required fields
  for (const choice of choices) {
    if (!isChoice(choice)) {
      throw new Error(`${context}: Invalid choice structure`);
    }
  }

  // Validate orderIndex uniqueness and sequence
  const orderIndices = choices.map((c) => c.orderIndex);
  const uniqueIndices = new Set(orderIndices);
  if (uniqueIndices.size !== orderIndices.length) {
    throw new Error(`${context}: Duplicate orderIndex values found`);
  }

  // Validate isCorrect field constraints based on type
  const correctChoices = choices.filter((c) => c.isCorrect);

  if (expectedType === "single_choice") {
    if (correctChoices.length !== 1) {
      throw new Error(
        `${context}: Single choice must have exactly 1 correct choice, got ${correctChoices.length}`,
      );
    }
  } else if (expectedType === "multiple_choice") {
    if (correctChoices.length === 0) {
      throw new Error(
        `${context}: Multiple choice must have at least 1 correct choice`,
      );
    }
  }
}

export function validateSingleChoiceCorrectness(
  solution: unknown,
  context = "Single choice validation",
): void {
  assertSingleChoiceSolution(solution, context);

  const correctChoices = solution.choices.filter((c) => c.isCorrect);
  if (correctChoices.length !== 1) {
    throw new Error(
      `${context}: Single choice solution must have exactly 1 correct choice, got ${correctChoices.length}`,
    );
  }
}

export function validateMultipleChoiceCorrectness(
  solution: unknown,
  context = "Multiple choice validation",
): void {
  assertMultipleChoiceSolution(solution, context);

  const correctChoices = solution.choices.filter((c) => c.isCorrect);
  if (correctChoices.length < solution.minCorrectAnswers) {
    throw new Error(
      `${context}: Multiple choice solution has ${correctChoices.length} correct choices, but requires minimum ${solution.minCorrectAnswers}`,
    );
  }

  if (correctChoices.length === 0) {
    throw new Error(
      `${context}: Multiple choice solution must have at least 1 correct choice`,
    );
  }
}

// Response type validation functions

export function validateResponseType(
  responseBody: Record<string, unknown>,
  expectedType: "Quiz" | "ErrorResponse",
  context = "Response validation",
): void {
  switch (expectedType) {
    case "Quiz":
      assertQuizResponse(responseBody, context);

      // Additional Quiz-specific validations
      if (
        typeof responseBody.question !== "string" ||
        responseBody.question.length === 0
      ) {
        throw new Error(`${context}: Quiz question must be non-empty string`);
      }

      if (
        !["boolean", "free_text", "single_choice", "multiple_choice"].includes(
          responseBody.answerType,
        )
      ) {
        throw new Error(
          `${context}: Invalid answerType: ${responseBody.answerType}`,
        );
      }

      break;

    case "ErrorResponse":
      assertErrorResponse(responseBody, context);

      // Additional ErrorResponse validations
      if (responseBody.message.length === 0) {
        throw new Error(`${context}: Error message cannot be empty`);
      }

      if (responseBody.code <= 0) {
        throw new Error(`${context}: Error code must be positive number`);
      }

      break;

    default:
      throw new Error(
        `${context}: Unknown expected response type: ${expectedType}`,
      );
  }
}

export function validateErrorResponseStructure(
  responseBody: Record<string, unknown>,
  expectedStructure: ValidationErrorStructure,
  context = "Error structure validation",
): void {
  if (expectedStructure.hasErrorCode) {
    if (!("code" in responseBody)) {
      throw new Error(`${context}: Expected error code field`);
    }

    const actualCodeType = typeof responseBody["code"];
    if (actualCodeType !== expectedStructure.errorCodeType) {
      throw new Error(
        `${context}: Error code type mismatch. Expected ${expectedStructure.errorCodeType}, got ${actualCodeType}`,
      );
    }
  }

  if (expectedStructure.hasErrorMessage) {
    if (!("message" in responseBody)) {
      throw new Error(`${context}: Expected error message field`);
    }

    const actualMessageType = typeof responseBody["message"];
    if (actualMessageType !== expectedStructure.errorMessageType) {
      throw new Error(
        `${context}: Error message type mismatch. Expected ${expectedStructure.errorMessageType}, got ${actualMessageType}`,
      );
    }
  }
}

// Solution validation functions

export function validateSolutionChoiceConsistency(
  solution: unknown,
  context = "Solution choice consistency",
): void {
  if (!isChoiceBasedSolution(solution)) {
    return; // Only validate choice-based solutions
  }

  // Validate all choices belong to the same solution
  const invalidChoices = solution.choices.filter(
    (c) => c.solutionId !== solution.id,
  );
  if (invalidChoices.length > 0) {
    throw new Error(
      `${context}: Found ${invalidChoices.length} choices with mismatched solutionId`,
    );
  }

  // Type-specific validations
  if (solution.type === "single_choice") {
    validateSingleChoiceCorrectness(solution, context);
  } else if (solution.type === "multiple_choice") {
    validateMultipleChoiceCorrectness(solution, context);
  }
}
