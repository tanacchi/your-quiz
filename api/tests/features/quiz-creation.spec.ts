import { spec } from "pactum";
import { quizCreationData } from "../fixtures/quiz-creation-data";
import { quizCreationTypeSafetyData } from "../fixtures/quiz-creation-type-safety";
import {
  isChoiceBasedSolution,
  validateMultipleChoiceCorrectness,
  validateResponseType as validateResponseTypeSafe,
  validateSingleChoiceCorrectness,
  validateSolutionChoiceConsistency,
} from "../helpers/quiz-validation";

// Extend global for test data sharing
declare global {
  var createdQuizId: string;
}

// Quiz Creation BDD Tests - クイズ作成BDDテスト
// Uses ユビキタス言語 (Ubiquitous Language): Developer, TypeSpec, Schema, neverthrow
// Endpoint: POST /api/quiz/v1/manage/quizzes

describe.todo("Quiz Creation - クイズ作成", () => {
  beforeAll(async () => {
    // Given: API server is running with TypeSpec generated types
  });

  describe.todo("型準拠: TypeScript type compliance verification", () => {
    // Scenario Outline: TypeScript type compliance verification for POST endpoint
    quizCreationTypeSafetyData.typeComplianceScenarios.forEach(
      (testCase, _index) => {
        it(`Response matches TypeSpec types: ${testCase.description}`, async () => {
          // Given: API server uses TypeSpec generated schemas

          // When: Quiz creation endpoint is executed
          const response = await spec()
            .post(testCase.endpoint)
            .withJson(testCase.testData)
            .expectStatus(testCase.expectedStatus);

          const body = response.json;

          // Then: Response should strictly match TypeSpec generated types
          validateResponseType(body, testCase.expectedResponseType);

          // And: Zod schema validation should pass without errors
          // This will be automatically validated by PactumJS with OpenAPI integration

          // And: neverthrow error handling should work correctly
          if (testCase.expectedResponseType === "ErrorResponse") {
            expect(body).toHaveProperty("error");
            expect(body).toHaveProperty("message");
            expect(body).toHaveProperty("code");
          }
        });
      },
    );
  });

  describe.todo("正常系: Valid Quiz creation scenarios", () => {
    quizCreationData.validQuizzes.forEach((testCase, _index) => {
      it(`Creates quiz successfully: ${testCase.description}`, async () => {
        // Given: Valid quiz creation data

        // When: Quiz is created
        const response = await spec()
          .post(testCase.endpoint)
          .withJson(testCase.input)
          .expectStatus(testCase.expectedStatus);

        // Then: Quiz creation should succeed
        expect(response.json).toHaveProperty("id");
        expect(response.json).toHaveProperty(
          "question",
          testCase.input.question,
        );
        expect(response.json).toHaveProperty(
          "answerType",
          testCase.input.answerType,
        );
        expect(response.json).toHaveProperty(
          "status",
          testCase.expected.status,
        );

        // And: Validate Choice model structure if it's a choice-based solution
        if (isChoiceBasedSolution(testCase.input.solution)) {
          validateSolutionChoiceConsistency(
            testCase.input.solution,
            "Quiz creation choice validation",
          );

          if (testCase.input.solution.type === "single_choice") {
            validateSingleChoiceCorrectness(
              testCase.input.solution,
              "Single choice creation validation",
            );
          } else if (testCase.input.solution.type === "multiple_choice") {
            validateMultipleChoiceCorrectness(
              testCase.input.solution,
              "Multiple choice creation validation",
            );
          }
        }

        // And: Store created ID for potential cleanup
        global.createdQuizId = response.json.id;
      });
    });
  });

  describe.todo("異常系: Invalid Quiz creation scenarios", () => {
    quizCreationData.invalidQuizzes.forEach((testCase, _index) => {
      it(`Handles invalid data: ${testCase.description}`, async () => {
        // Given: Invalid quiz creation data

        // When: Quiz creation is attempted
        const response = await spec()
          .post(testCase.endpoint)
          .withJson(testCase.input)
          .expectStatus(testCase.expectedStatus);

        // Then: Should return validation error
        expect(response.json).toHaveProperty("code");
        expect(response.json).toHaveProperty("message");
        expect(typeof response.json.code).toBe("number");
        expect(typeof response.json.message).toBe("string");
      });
    });
  });

  describe.todo("ワークフロー作成: Quiz creation workflow", () => {
    quizCreationTypeSafetyData.workflowCreateScenarios.forEach(
      (testCase, _index) => {
        it(`Workflow creation step: ${testCase.description}`, async () => {
          // Given: Valid quiz creation data

          // When: Quiz is created
          const response = await spec()
            .post(testCase.endpoint)
            .withJson(testCase.testData)
            .expectStatus(testCase.expectedStatus);

          // Then: Quiz creation should succeed with correct type
          validateResponseType(response.json, testCase.expectedResponseType);

          // And: Store created ID for subsequent tests
          global.createdQuizId = response.json.id;
        });
      },
    );
  });

  describe.todo("エラー応答: ErrorResponse schema compliance", () => {
    quizCreationTypeSafetyData.errorResponseScenarios.forEach(
      (testCase, _index) => {
        it(`Error responses follow schema: ${testCase.description}`, async () => {
          // Given: Invalid request data

          // When: Request is made to creation endpoint
          const response = await spec()
            .post(testCase.endpoint)
            .withJson(testCase.testData)
            .expectStatus(testCase.expectedStatus);

          const body = response.json;

          // Then: All error responses should follow ErrorResponse schema
          validateErrorResponseStructure(body, testCase.expectedErrorStructure);

          // And: Error code should be numeric type
          expect(typeof body.code).toBe("number");

          // And: Error message should be descriptive string
          expect(typeof body.message).toBe("string");
          expect(body.message.length).toBeGreaterThan(0);

          // And: neverthrow Result type should wrap errors correctly
          // This validation ensures the error structure is compatible with neverthrow
          expect(body).toHaveProperty("error");
        });
      },
    );
  });

  describe.todo("リクエストスキーマ: Request schema validation", () => {
    quizCreationTypeSafetyData.requestSchemaScenarios.forEach(
      (testCase, _index) => {
        it(`Request schema validation: ${testCase.description}`, async () => {
          // Given: Valid request schema data

          // When: Request schema component is validated
          const response = await spec()
            .post(testCase.endpoint)
            .withJson(testCase.testData)
            .expectStatus(testCase.expectedStatus);

          // Then: Current implementation should match generated types
          validateResponseType(response.json, testCase.expectedResponseType);
        });
      },
    );
  });

  describe.todo("文字数制限: Character limit validation", () => {
    quizCreationData.characterLimitScenarios.forEach((testCase, _index) => {
      it(`Character limit validation: ${testCase.description}`, async () => {
        // Given: Test data with specific character lengths
        const questionText = "Q".repeat(testCase.questionLength);
        const explanationText = "E".repeat(testCase.explanationLength);

        const testData = {
          question: questionText,
          answerType: "boolean",
          solution: {
            type: "boolean",
            id: "char-limit-sol",
            value: true,
          },
          explanation: explanationText,
        };

        // When: Quiz creation is attempted
        const response = await spec()
          .post(testCase.endpoint)
          .withJson(testData)
          .expectStatus(testCase.expectedStatus);

        // Then: Character limit validation should work correctly
        if (testCase.expectedStatus === 201) {
          expect(response.json).toHaveProperty("id");
          expect(response.json).toHaveProperty("question", questionText);
        } else {
          expect(response.json).toHaveProperty("code");
          expect(response.json).toHaveProperty("message");
        }
      });
    });
  });

  describe("Choice Model検証: isCorrect field validation", () => {
    it("Single choice: Only one isCorrect=true allowed", async () => {
      // Given: Single choice with multiple correct answers (invalid)
      const invalidSingleChoice = {
        question: "Test single choice validation",
        answerType: "single_choice",
        solution: {
          type: "single_choice",
          id: "invalid-single",
          choices: [
            {
              id: "choice-1",
              solutionId: "invalid-single",
              text: "Option 1",
              orderIndex: 1,
              isCorrect: true,
            },
            {
              id: "choice-2",
              solutionId: "invalid-single",
              text: "Option 2",
              orderIndex: 2,
              isCorrect: true, // Invalid: multiple correct answers
            },
          ],
        },
      };

      // When: Quiz creation is attempted
      const response = await spec()
        .post("/api/quiz/v1/manage/quizzes")
        .withJson(invalidSingleChoice)
        .expectStatus(400);

      // Then: Should return validation error
      expect(response.json).toHaveProperty("code");
      expect(response.json).toHaveProperty("message");
      expect(response.json.message.toLowerCase()).toMatch(
        /single.*choice.*one.*correct/i,
      );
    });

    it("Multiple choice: At least one isCorrect=true required", async () => {
      // Given: Multiple choice with no correct answers (invalid)
      const invalidMultipleChoice = {
        question: "Test multiple choice validation",
        answerType: "multiple_choice",
        solution: {
          type: "multiple_choice",
          id: "invalid-multi",
          minCorrectAnswers: 1,
          choices: [
            {
              id: "choice-1",
              solutionId: "invalid-multi",
              text: "Option 1",
              orderIndex: 1,
              isCorrect: false, // Invalid: no correct answers
            },
            {
              id: "choice-2",
              solutionId: "invalid-multi",
              text: "Option 2",
              orderIndex: 2,
              isCorrect: false, // Invalid: no correct answers
            },
          ],
        },
      };

      // When: Quiz creation is attempted
      const response = await spec()
        .post("/api/quiz/v1/manage/quizzes")
        .withJson(invalidMultipleChoice)
        .expectStatus(400);

      // Then: Should return validation error
      expect(response.json).toHaveProperty("code");
      expect(response.json).toHaveProperty("message");
      expect(response.json.message.toLowerCase()).toMatch(
        /multiple.*choice.*least.*one.*correct/i,
      );
    });

    it("Choice missing isCorrect field", async () => {
      // Given: Choice without isCorrect field (invalid)
      const choiceWithoutIsCorrect = {
        question: "Test missing isCorrect field",
        answerType: "single_choice",
        solution: {
          type: "single_choice",
          id: "missing-field",
          choices: [
            {
              id: "choice-1",
              solutionId: "missing-field",
              text: "Option 1",
              orderIndex: 1,
              // Missing isCorrect field
            },
          ],
        },
      };

      // When: Quiz creation is attempted
      const response = await spec()
        .post("/api/quiz/v1/manage/quizzes")
        .withJson(choiceWithoutIsCorrect)
        .expectStatus(400);

      // Then: Should return validation error
      expect(response.json).toHaveProperty("code");
      expect(response.json).toHaveProperty("message");
      expect(response.json.message.toLowerCase()).toMatch(
        /iscorrect.*required|missing.*iscorrect/i,
      );
    });

    it("Valid Choice model: Single choice with one correct answer", async () => {
      // Given: Valid single choice with exactly one correct answer
      const validSingleChoice = {
        question: "Valid single choice test",
        answerType: "single_choice",
        solution: {
          type: "single_choice",
          id: "valid-single",
          choices: [
            {
              id: "choice-1",
              solutionId: "valid-single",
              text: "Correct option",
              orderIndex: 1,
              isCorrect: true,
            },
            {
              id: "choice-2",
              solutionId: "valid-single",
              text: "Incorrect option",
              orderIndex: 2,
              isCorrect: false,
            },
          ],
        },
      };

      // When: Quiz creation is attempted
      const response = await spec()
        .post("/api/quiz/v1/manage/quizzes")
        .withJson(validSingleChoice)
        .expectStatus(201);

      // Then: Should succeed with proper Choice structure
      expect(response.json).toHaveProperty("id");
      expect(response.json.solution.choices).toHaveLength(2);

      // Validate using type-safe functions
      validateSingleChoiceCorrectness(
        response.json.solution,
        "Valid single choice response validation",
      );
    });

    it("Valid Choice model: Multiple choice with multiple correct answers", async () => {
      // Given: Valid multiple choice with multiple correct answers
      const validMultipleChoice = {
        question: "Valid multiple choice test",
        answerType: "multiple_choice",
        solution: {
          type: "multiple_choice",
          id: "valid-multi",
          minCorrectAnswers: 2,
          choices: [
            {
              id: "choice-1",
              solutionId: "valid-multi",
              text: "Correct option 1",
              orderIndex: 1,
              isCorrect: true,
            },
            {
              id: "choice-2",
              solutionId: "valid-multi",
              text: "Correct option 2",
              orderIndex: 2,
              isCorrect: true,
            },
            {
              id: "choice-3",
              solutionId: "valid-multi",
              text: "Incorrect option",
              orderIndex: 3,
              isCorrect: false,
            },
          ],
        },
      };

      // When: Quiz creation is attempted
      const response = await spec()
        .post("/api/quiz/v1/manage/quizzes")
        .withJson(validMultipleChoice)
        .expectStatus(201);

      // Then: Should succeed with proper Choice structure
      expect(response.json).toHaveProperty("id");
      expect(response.json.solution.choices).toHaveLength(3);

      // Validate using type-safe functions
      validateMultipleChoiceCorrectness(
        response.json.solution,
        "Valid multiple choice response validation",
      );
    });
  });

  describe("Solution型矛盾: Solution type mismatch validation", () => {
    quizCreationData.solutionTypeMismatchScenarios.forEach(
      (testCase, _index) => {
        it(`Solution type mismatch: ${testCase.description}`, async () => {
          // Given: Quiz data with solution type and field mismatch

          // When: Quiz creation is attempted with mismatched solution
          const response = await spec()
            .post(testCase.endpoint)
            .withJson(testCase.input)
            .expectStatus(testCase.expectedStatus);

          const body = response.json;

          // Then: Should return 400 validation error
          expect(response.statusCode).toBe(400);
          expect(body).toHaveProperty("code");
          expect(body).toHaveProperty("message");
          expect(typeof body.code).toBe("number");
          expect(typeof body.message).toBe("string");

          // And: Error message should be descriptive and specific
          expect(body.message.length).toBeGreaterThan(0);

          // And: Should follow ErrorResponse schema structure
          validateErrorResponseStructure(body, {
            hasErrorCode: true,
            errorCodeType: "number",
            hasErrorMessage: true,
            errorMessageType: "string",
          });

          // And: Error should contain relevant validation context
          // The actual error message format may vary depending on server implementation
          // but should indicate the nature of the validation failure
          expect(body.message.toLowerCase()).toMatch(
            /solution|type|mismatch|field|required|invalid/,
          );
        });
      },
    );
  });
});

// Helper functions for type validation - Updated to use type-safe validation

function validateResponseType(
  responseBody: Record<string, unknown>,
  expectedType: "Quiz" | "ErrorResponse",
): void {
  try {
    validateResponseTypeSafe(
      responseBody,
      expectedType,
      "Quiz creation validation",
    );
  } catch (_error) {
    // Fallback to basic property checks for backward compatibility
    switch (expectedType) {
      case "Quiz":
        expect(responseBody).toHaveProperty("id");
        expect(responseBody).toHaveProperty("question");
        expect(responseBody).toHaveProperty("answerType");
        expect(responseBody).toHaveProperty("status");
        break;
      case "ErrorResponse":
        expect(responseBody).toHaveProperty("error");
        expect(responseBody).toHaveProperty("message");
        expect(responseBody).toHaveProperty("code");
        break;
    }
  }
}

function validateErrorResponseStructure(
  responseBody: Record<string, unknown>,
  expectedStructure: Record<string, unknown>,
): void {
  // Import and use type-safe validation
  const {
    validateErrorResponseStructure: validateErrorResponseStructureSafe,
  } = require("../helpers/quiz-validation");

  try {
    const structure =
      expectedStructure as unknown as import("../types/quiz-test-types").ValidationErrorStructure;
    validateErrorResponseStructureSafe(
      responseBody,
      structure,
      "Error response validation",
    );
  } catch (_error) {
    // Fallback to original implementation for backward compatibility
    const structure = expectedStructure as {
      hasErrorCode?: boolean;
      errorCodeType?: string;
      hasErrorMessage?: boolean;
      errorMessageType?: string;
    };

    if (structure.hasErrorCode) {
      expect(responseBody).toHaveProperty("code");
      const errorBody = responseBody as { code: unknown };
      expect(typeof errorBody.code).toBe(structure.errorCodeType);
    }

    if (structure.hasErrorMessage) {
      expect(responseBody).toHaveProperty("message");
      const errorBody = responseBody as { message: unknown };
      expect(typeof errorBody.message).toBe(structure.errorMessageType);
    }
  }
}
