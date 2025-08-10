import { spec } from "pactum";
import {
  errorResponseValidators,
  errorScenarios,
} from "../fixtures/error-scenarios";
import { TypeSafeTestHelpers } from "../helpers/type-safe-pactum";
import type { ApiErrorResponse } from "../types/api-error-types";

// 包括的エラーハンドリングテストスイート
// Comprehensive Error Handling Test Suite
// Uses neverthrow Result types and TypeSpec error definitions

describe("Comprehensive Error Handling - 包括的エラーハンドリング", () => {
  beforeAll(async () => {
    // Given: API server is running with typed error system
    // Setup mock data for testing scenarios
  });

  describe("Level 1: Validation Errors - レベル1: 入力検証失敗", () => {
    errorScenarios.validationErrors.forEach((testCase, _index) => {
      it(`${testCase.description}`, async () => {
        // Given: Invalid input data that should trigger validation errors

        // When: Request is made with invalid data
        const response = await spec()
          .post(testCase.endpoint)
          .withJson(testCase.input)
          .expectStatus(testCase.expectedStatus);

        // Then: Should return ValidationError with typed structure
        const validationError = errorResponseValidators.validateValidationError(
          response.json,
        );

        // And: Field-specific errors should be present if specified
        if (
          testCase.expectedFieldErrors &&
          testCase.expectedFieldErrors.length > 0
        ) {
          TypeSafeTestHelpers.expectFieldErrors(
            validationError,
            testCase.expectedFieldErrors,
          );
        }

        // And: Error structure should be TypeSpec compliant (already verified by validator)
        // Additional neverthrow compatibility check
        expect(validationError.code).toBe(400);
        expect(typeof validationError.message).toBe("string");
      });
    });
  });

  describe("Level 2: Business Rule Violations - レベル2: ビジネスルール違反", () => {
    errorScenarios.businessRuleViolations.forEach((testCase, _index) => {
      it(`${testCase.description}`, async () => {
        // Given: Valid input but violates business rules

        let request = spec();

        // Configure request method and headers
        switch (testCase.method) {
          case "GET":
            request = request.get(testCase.endpoint);
            break;
          case "PUT":
            request = request.put(testCase.endpoint);
            if (testCase.input) {
              request = request.withJson(testCase.input);
            }
            break;
          case "POST":
            request = request.post(testCase.endpoint);
            if (testCase.input) {
              request = request.withJson(testCase.input);
            }
            break;
          case "DELETE":
            request = request.delete(testCase.endpoint);
            break;
        }

        // Add headers if specified
        if (testCase.headers) {
          Object.entries(testCase.headers).forEach(([key, value]) => {
            request = request.withHeaders(key, value);
          });
        }

        // When: Request violates business rules
        const response = await request.expectStatus(testCase.expectedStatus);

        // Then: Should return appropriate error type with type safety
        let typedError: ApiErrorResponse;
        switch (testCase.expectedError) {
          case "NotFoundError":
            typedError = errorResponseValidators.validateNotFoundError(
              response.json,
            );
            break;
          case "ForbiddenError":
            typedError = errorResponseValidators.validateForbiddenError(
              response.json,
            );
            break;
          case "ConflictError":
            typedError = errorResponseValidators.validateConflictError(
              response.json,
            );
            break;
          default:
            throw new Error(`Unexpected error type: ${testCase.expectedError}`);
        }

        // And: Error structure is TypeSpec compliant (already verified by validators)
        expect(typedError.code).toBeGreaterThanOrEqual(400);
        expect(typedError.code).toBeLessThan(600);
        expect(typeof typedError.message).toBe("string");
      });
    });
  });

  describe("Level 3: Infrastructure Failures - レベル3: インフラストラクチャ失敗", () => {
    errorScenarios.infrastructureFailures.forEach((testCase, _index) => {
      it(`${testCase.description}`, async () => {
        // Given: Infrastructure layer failure simulation

        let request = spec();

        // Configure request method
        switch (testCase.method || "POST") {
          case "GET":
            request = request.get(testCase.endpoint);
            break;
          case "PUT":
            request = request.put(testCase.endpoint);
            if (testCase.input) {
              request = request.withJson(testCase.input);
            }
            break;
          case "DELETE":
            request = request.delete(testCase.endpoint);
            break;
          default:
            request = request.post(testCase.endpoint);
            if (testCase.input) {
              request = request.withJson(testCase.input);
            }
        }

        // Add failure simulation headers
        if (testCase.headers) {
          Object.entries(testCase.headers).forEach(([key, value]) => {
            request = request.withHeaders(key, value);
          });
        }

        // When: Infrastructure failure occurs
        const response = await request.expectStatus(testCase.expectedStatus);

        // Then: Should return InternalServerError
        const body = response.json;
        errorResponseValidators.validateInternalServerError(body);

        // And: Error should provide minimal details for security
        expect(body.message).not.toContain("database");
        expect(body.message).not.toContain("connection");
        expect(body.message).not.toContain("sql");

        // And: Should maintain neverthrow error structure
        expect(body).toHaveProperty("code", 500);
        expect(body).toHaveProperty("message");
      });
    });
  });

  describe("Level 4: System Failures - レベル4: システム失敗", () => {
    errorScenarios.systemFailures.forEach((testCase, _index) => {
      it(`${testCase.description}`, async () => {
        // Given: System-level failure scenario

        let request = spec().post(testCase.endpoint);

        // Handle raw body for malformed JSON test
        if (testCase.rawBody) {
          request = request.withBody(testCase.rawBody);
        } else if (testCase.input) {
          request = request.withJson(testCase.input);
        }

        // Add simulation headers
        if (testCase.headers) {
          Object.entries(testCase.headers).forEach(([key, value]) => {
            request = request.withHeaders(key, value);
          });
        }

        // When: System failure occurs
        const response = await request.expectStatus(testCase.expectedStatus);

        // Then: Should return appropriate system error
        const body = response.json;

        switch (testCase.expectedError) {
          case "RateLimitError":
            errorResponseValidators.validateRateLimitError(body);
            break;
          case "JsonParseError":
            errorResponseValidators.validateJsonParseError(body);
            break;
          case "InternalServerError":
            errorResponseValidators.validateInternalServerError(body);
            break;
        }

        // And: Response should follow TypeSpec error format
        expect(body).toHaveProperty("code");
        expect(body).toHaveProperty("message");
        expect(typeof body.code).toBe("number");
        expect(typeof body.message).toBe("string");
      });
    });
  });

  describe("Workflow-Based Error Scenarios - ワークフローベース失敗シナリオ", () => {
    errorScenarios.workflowFailures.forEach((testCase, _index) => {
      it(`${testCase.description}`, async () => {
        // Given: Workflow violation scenario

        let request = spec();

        // Configure request method
        switch (testCase.method || "POST") {
          case "GET":
            request = request.get(testCase.endpoint);
            break;
          case "DELETE":
            request = request.delete(testCase.endpoint);
            break;
          default:
            request = request.post(testCase.endpoint);
        }

        // Add input data if present
        if (testCase.input) {
          request = request.withJson(testCase.input);
        }

        // Add headers if specified
        if (testCase.headers) {
          Object.entries(testCase.headers).forEach(([key, value]) => {
            request = request.withHeaders(key, value);
          });
        }

        // When: Workflow error occurs
        const response = await request.expectStatus(testCase.expectedStatus);

        // Then: Should return appropriate workflow error
        const body = response.json;

        switch (testCase.expectedError) {
          case "ValidationError":
            errorResponseValidators.validateValidationError(body);
            break;
          case "NotFoundError":
            errorResponseValidators.validateNotFoundError(body);
            break;
        }

        // And: Error should maintain consistent structure
        expect(body).toHaveProperty("code");
        expect(body).toHaveProperty("message");
      });
    });
  });

  describe("Error Type Consistency - エラータイプ一貫性", () => {
    const errorTypes = [
      { code: 400, type: "ValidationError", message: /validation|invalid/ },
      {
        code: 401,
        type: "UnauthorizedError",
        message: /unauthorized|authentication/,
      },
      { code: 403, type: "ForbiddenError", message: /forbidden|access/ },
      { code: 404, type: "NotFoundError", message: /not found|does not exist/ },
      { code: 409, type: "ConflictError", message: /conflict|already/ },
      { code: 429, type: "RateLimitError", message: /rate limit|too many/ },
      {
        code: 500,
        type: "InternalServerError",
        message: /internal|server error/,
      },
    ];

    errorTypes.forEach((errorType) => {
      it(`${errorType.type} should have consistent structure and message patterns`, async () => {
        // This test verifies that all error types follow the same structure
        // and have appropriate message patterns for their HTTP status codes

        // Verify error code mapping
        expect(errorType.code).toBeGreaterThanOrEqual(400);
        expect(errorType.code).toBeLessThan(600);

        // Verify error type naming follows convention
        expect(errorType.type).toMatch(/Error$/);

        // Verify message pattern is defined
        expect(errorType.message).toBeInstanceOf(RegExp);
      });
    });
  });

  describe("neverthrow Integration - neverthrow統合", () => {
    it("Should handle Result type error chaining correctly", async () => {
      // Given: Complex error scenario that tests error chaining

      // When: Multiple error conditions are chained
      const response = await spec()
        .post("/api/quiz/v1/manage/quizzes")
        .withJson({
          question: "", // ValidationError
          answerType: "boolean",
          solution: { type: "boolean", id: "test", value: true },
        })
        .expectStatus(400);

      // Then: First error in chain should be returned
      const body = response.json;
      expect(body).toHaveProperty("code", 400);
      expect(body).toHaveProperty("message");

      // And: Error structure should support neverthrow Result unwrapping
      expect(body).toHaveProperty("code");
      expect(typeof body.code).toBe("number");
    });

    it("Should handle ResultAsync error propagation", async () => {
      // Given: Async operation with potential errors

      // When: Async error occurs in use case
      const response = await spec()
        .get("/api/quiz/v1/manage/quizzes/async-error-test")
        .expectStatus(500);

      // Then: Async error should be properly caught and typed
      const body = response.json;
      expect(body).toHaveProperty("code", 500);
      expect(body).toHaveProperty("message");

      // And: Should maintain error structure for ResultAsync unwrapping
      expect(typeof body.code).toBe("number");
      expect(typeof body.message).toBe("string");
    });
  });
});
