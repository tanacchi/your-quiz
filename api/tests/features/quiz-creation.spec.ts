import { spec } from "pactum";
import { quizCreationData } from "../fixtures/quiz-creation-data";
import { quizCreationTypeSafetyData } from "../fixtures/quiz-creation-type-safety";

// Extend global for test data sharing
declare global {
  var createdQuizId: string;
}

// Quiz Creation BDD Tests - クイズ作成BDDテスト
// Uses ユビキタス言語 (Ubiquitous Language): Developer, TypeSpec, Schema, neverthrow
// Endpoint: POST /api/quiz/v1/manage/quizzes

describe("Quiz Creation - クイズ作成", () => {
  beforeAll(async () => {
    // Given: API server is running with TypeSpec generated types
  });

  describe("型準拠: TypeScript type compliance verification", () => {
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

  describe("正常系: Valid Quiz creation scenarios", () => {
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

        // And: Store created ID for potential cleanup
        global.createdQuizId = response.json.id;
      });
    });
  });

  describe("異常系: Invalid Quiz creation scenarios", () => {
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

  describe("ワークフロー作成: Quiz creation workflow", () => {
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

  describe("エラー応答: ErrorResponse schema compliance", () => {
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

  describe("リクエストスキーマ: Request schema validation", () => {
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

  describe("文字数制限: Character limit validation", () => {
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

// Helper functions for type validation
function validateResponseType(
  responseBody: Record<string, unknown>,
  expectedType: string,
) {
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

function validateErrorResponseStructure(
  responseBody: Record<string, unknown>,
  expectedStructure: Record<string, unknown>,
) {
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
