import { spec } from "pactum";
import { quizRetrievalData } from "../fixtures/quiz-retrieval-data";
import { quizRetrievalTypeSafetyData } from "../fixtures/quiz-retrieval-type-safety";

// Extend global for test data sharing
declare global {
  var createdQuizId: string;
}

// Quiz Retrieval by ID BDD Tests - Quiz ID別取得BDDテスト
// Uses ユビキタス言語 (Ubiquitous Language): Developer, TypeSpec, Schema, neverthrow
// Endpoint: GET /api/quiz/v1/manage/quizzes/{id}

describe("Quiz Retrieval by ID - Quiz ID別取得", () => {
  beforeAll(async () => {
    // Given: API server is running with TypeSpec generated types
  });

  describe("型準拠: TypeScript type compliance verification", () => {
    // Scenario Outline: TypeScript type compliance verification for GET by ID endpoint
    quizRetrievalTypeSafetyData.typeComplianceScenarios.forEach(
      (testCase, _index) => {
        it(`Response matches TypeSpec types: ${testCase.description}`, async () => {
          // Given: API server uses TypeSpec generated schemas and quiz exists

          // When: Quiz retrieval endpoint is executed
          const endpoint = testCase.endpointTemplate.replace(
            "{id}",
            global.createdQuizId || "test-quiz-id",
          );
          const response = await spec()
            .get(endpoint)
            .expectStatus(testCase.expectedStatus);

          const body = response.json;

          // Then: Response should strictly match TypeSpec generated types
          validateResponseType(body, testCase.expectedResponseType);

          // And: Zod schema validation should pass without errors
          // This will be automatically validated by PactumJS with OpenAPI integration
        });
      },
    );
  });

  describe("正常系: Valid Quiz retrieval scenarios", () => {
    quizRetrievalData.validRetrievals.forEach((testCase, _index) => {
      it(`Retrieves quiz successfully: ${testCase.description}`, async () => {
        // Given: Quiz exists with valid ID

        // When: Quiz is retrieved by ID
        const response = await spec()
          .get(`/api/quiz/v1/manage/quizzes/${testCase.quizId}`)
          .expectStatus(200);

        const body = response.json;

        // Then: Quiz retrieval should succeed
        expect(body).toHaveProperty("id", testCase.quizId);
        expect(body).toHaveProperty("question");
        expect(body).toHaveProperty("solution");
        expect(body).toHaveProperty("answerType");
      });
    });
  });

  describe("異常系: Quiz retrieval failure scenarios", () => {
    quizRetrievalData.failureScenarios.forEach((testCase, _index) => {
      it(`Handles invalid ID: ${testCase.description}`, async () => {
        // Given: Invalid quiz ID

        // When: Quiz retrieval is attempted with invalid ID
        const url =
          testCase.invalidId === null || testCase.invalidId === ""
            ? "/api/quiz/v1/manage/quizzes/"
            : `/api/quiz/v1/manage/quizzes/${testCase.invalidId}`;

        const response = await spec()
          .get(url)
          .expectStatus(testCase.expected.statusCode);

        // Then: Should return appropriate error
        expect(response.json).toHaveProperty("code");
        expect(response.json).toHaveProperty("message");
      });
    });
  });

  describe("ワークフロー取得: Quiz retrieval workflow", () => {
    quizRetrievalTypeSafetyData.workflowRetrieveScenarios.forEach(
      (testCase, _index) => {
        it(`Workflow retrieval step: ${testCase.description}`, async () => {
          // Given: Quiz was created in previous workflow step
          const endpoint = testCase.endpointTemplate.replace(
            "{id}",
            global.createdQuizId,
          );

          // When: Quiz is retrieved by ID
          const response = await spec()
            .get(endpoint)
            .expectStatus(testCase.expectedStatus);

          // Then: Quiz retrieval should return correct type
          validateResponseType(response.json, testCase.expectedResponseType);
        });
      },
    );
  });

  describe("エラー応答: ErrorResponse schema compliance", () => {
    quizRetrievalTypeSafetyData.errorResponseScenarios.forEach(
      (testCase, _index) => {
        it(`Error responses follow schema: ${testCase.description}`, async () => {
          // Given: Non-existent quiz ID

          // When: Request is made to retrieval endpoint
          const response = await spec()
            .get(testCase.endpoint)
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

  describe("Solution型別: Quiz retrieval with different Solution types", () => {
    quizRetrievalData.solutionTypeScenarios.forEach((testCase, _index) => {
      it(`QuizWithSolution contains correct structure: ${testCase.description}`, async () => {
        // Given: Quiz with specific solution type exists

        // When: Quiz is retrieved by ID
        const response = await spec()
          .get(`/api/quiz/v1/manage/quizzes/test-quiz-${testCase.solutionType}`)
          .expectStatus(200);

        const body = response.json;

        // Then: QuizWithSolution should contain correct solution structure
        expect(body).toHaveProperty("solution");
        expect(body).toHaveProperty("answerType", testCase.solutionType);
      });
    });
  });

  describe("レスポンススキーマ: Response schema validation", () => {
    quizRetrievalTypeSafetyData.responseSchemaScenarios.forEach(
      (testCase, _index) => {
        it(`Response schema validation: ${testCase.description}`, async () => {
          // Given: API server uses TypeSpec generated schemas
          let response: unknown;

          if ("createEndpoint" in testCase) {
            // When: Complex scenario requires creation then retrieval
            const createResponse = await spec()
              .post(testCase.createEndpoint)
              .withJson(testCase.createData as object)
              .expectStatus(201);

            response = await spec()
              .get(
                testCase.retrieveEndpointTemplate.replace(
                  "{id}",
                  createResponse.json.id,
                ),
              )
              .expectStatus(testCase.expectedStatus);
          }

          const body = (response as { json: Record<string, unknown> }).json;

          // Then: Current implementation should match generated types
          validateSchemaComponentFields(body, testCase.requiredFields);

          // And: No runtime type mismatches should occur
          expect(body).toBeDefined();
          expect(typeof body).toBe("object");

          // And: Zod satisfies TypeScript types correctly
          // This is ensured by the OpenAPI integration in PactumJS
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
    case "QuizWithSolution":
      expect(responseBody).toHaveProperty("id");
      expect(responseBody).toHaveProperty("question");
      expect(responseBody).toHaveProperty("solution");
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

function validateSchemaComponentFields(
  responseBody: Record<string, unknown>,
  requiredFields: readonly string[],
) {
  requiredFields.forEach((field) => {
    expect(responseBody).toHaveProperty(field);
  });
}
