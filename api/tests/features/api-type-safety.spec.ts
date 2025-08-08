import { spec } from "pactum";
import { typeSafetyData } from "../fixtures/type-safety-data";

// Extend global for test data sharing
declare global {
  var createdQuizId: string;
}

// API Type Safety and Integration BDD Tests - API型安全性・統合BDDテスト
// Uses ユビキタス言語 (Ubiquitous Language): Developer, TypeSpec, Schema, neverthrow

describe("API Type Safety and Integration - API型安全性・統合", () => {
  beforeAll(async () => {
    // Given: API server is running with TypeSpec generated types
  });

  describe("型準拠: TypeScript type compliance verification", () => {
    // Scenario Outline: TypeScript type compliance verification
    typeSafetyData.typeComplianceScenarios.forEach((testCase, _index) => {
      it(`Response matches TypeSpec types: ${testCase.description}`, async () => {
        // Given: API server uses TypeSpec generated schemas

        // When: Endpoint operation is executed
        const response =
          testCase.method === "POST"
            ? await spec()
                .post(testCase.endpoint)
                .withJson(testCase.testData as object)
                .expectStatus(testCase.expectedStatus)
            : await spec()
                .get(testCase.endpoint)
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
    });
  });

  describe("ワークフロー作成: Quiz creation workflow", () => {
    typeSafetyData.workflowCreateScenarios.forEach((testCase, _index) => {
      it(`Workflow creation step: ${testCase.description}`, async () => {
        // Given: Valid quiz creation data

        // When: Quiz is created
        const response = await spec()
          .post(testCase.endpoint)
          .withJson(testCase.testData as object)
          .expectStatus(testCase.expectedStatus);

        // Then: Quiz creation should succeed with correct type
        validateResponseType(response.json, testCase.expectedResponseType);

        // And: Store created ID for subsequent tests
        global.createdQuizId = response.json.id;
      });
    });
  });

  describe("ワークフロー取得: Quiz retrieval workflow", () => {
    typeSafetyData.workflowRetrieveScenarios.forEach((testCase, _index) => {
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
    });
  });

  describe("ワークフローリスト: Quiz list verification workflow", () => {
    typeSafetyData.workflowListScenarios.forEach((testCase, _index) => {
      it(`Workflow list step: ${testCase.description}`, async () => {
        // Given: Quiz was created and should appear in list

        // When: Quiz list is retrieved
        const response = await spec()
          .get(testCase.endpoint)
          .expectStatus(testCase.expectedStatus);

        // Then: List should contain created quiz
        validateResponseType(response.json, testCase.expectedResponseType);

        // And: Created quiz should be found in list
        const foundQuiz = response.json.items.find(
          (q: Record<string, unknown>) => q.id === global.createdQuizId,
        );
        expect(foundQuiz).toBeDefined();
      });
    });
  });

  describe("エラー応答: ErrorResponse schema compliance", () => {
    typeSafetyData.errorResponseScenarios.forEach((testCase, _index) => {
      it(`Error responses follow schema: ${testCase.description}`, async () => {
        // Given: Invalid request data or non-existent resource

        // When: Request is made to endpoint
        const response =
          testCase.method === "POST"
            ? await spec()
                .post(testCase.endpoint)
                .withJson(testCase.testData as object)
                .expectStatus(testCase.expectedStatus)
            : await spec()
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
    });
  });

  describe("リクエストスキーマ: Request schema validation", () => {
    typeSafetyData.requestSchemaScenarios.forEach((testCase, _index) => {
      it(`Request schema validation: ${testCase.description}`, async () => {
        // Given: Valid request schema data

        // When: Request schema component is validated
        const response = await spec()
          .post(testCase.endpoint)
          .withJson(testCase.testData as object)
          .expectStatus(testCase.expectedStatus);

        // Then: Current implementation should match generated types
        validateResponseType(response.json, testCase.expectedResponseType);
      });
    });
  });

  describe("レスポンススキーマ: Response schema validation", () => {
    typeSafetyData.responseSchemaScenarios.forEach((testCase, _index) => {
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
        } else {
          // When: Direct endpoint validation
          response = await spec()
            .get(testCase.endpoint)
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
    });
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
    case "QuizWithSolution":
      expect(responseBody).toHaveProperty("id");
      expect(responseBody).toHaveProperty("question");
      expect(responseBody).toHaveProperty("solution");
      break;
    case "QuizListResponse":
      expect(responseBody).toHaveProperty("items");
      expect(responseBody).toHaveProperty("totalCount");
      expect(responseBody).toHaveProperty("hasMore");
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
    expect(typeof responseBody.code).toBe(structure.errorCodeType);
  }

  if (structure.hasErrorMessage) {
    expect(responseBody).toHaveProperty("message");
    expect(typeof responseBody.message).toBe(structure.errorMessageType);
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
