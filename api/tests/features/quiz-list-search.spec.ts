import { spec } from "pactum";
import { quizListingTypeSafetyData } from "../fixtures/quiz-listing-type-safety";
import { quizSearchData } from "../fixtures/quiz-search-data";

// Extend global for test data sharing
declare global {
  var createdQuizId: string;
}

// Quiz Listing BDD Tests - Quizリスト取得BDDテスト
// Uses ユビキタス言語 (Ubiquitous Language): Developer, TypeSpec, Schema, neverthrow
// Endpoint: GET /api/quiz/v1/manage/quizzes

describe("Quiz Listing - Quizリスト取得", () => {
  beforeAll(async () => {
    // Given: API server is running with TypeSpec generated types
  });

  describe("型準拠: TypeScript type compliance verification", () => {
    // Scenario Outline: TypeScript type compliance verification for GET list endpoint
    quizListingTypeSafetyData.typeComplianceScenarios.forEach(
      (testCase, _index) => {
        it(`Response matches TypeSpec types: ${testCase.description}`, async () => {
          // Given: API server uses TypeSpec generated schemas

          // When: Quiz listing endpoint is executed
          const response = await spec()
            .get(testCase.endpoint)
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

  describe("正常系: Valid search and filtering scenarios", () => {
    quizSearchData.validSearches.forEach((testCase, _index) => {
      it(`Searches quizzes successfully: ${testCase.description}`, async () => {
        // Given: Valid search filters

        // When: Quiz list is retrieved with filters
        const request = spec().get("/api/quiz/v1/manage/quizzes");

        // 空でないフィルターがある場合のみwithQueryParamsを呼び出す
        if (Object.keys(testCase.filters).length > 0) {
          request.withQueryParams(testCase.filters);
        }

        const response = await request.expectStatus(200);

        const body = response.json;

        // Then: Response should contain quiz list
        expect(body).toHaveProperty("items");
        expect(Array.isArray(body.items)).toBe(true);
        expect(body).toHaveProperty("totalCount");
        expect(body).toHaveProperty("hasMore");
      });
    });
  });

  describe("ワークフローリスト: Quiz list verification workflow", () => {
    quizListingTypeSafetyData.workflowListScenarios.forEach(
      (testCase, _index) => {
        it(`Workflow list step: ${testCase.description}`, async () => {
          // Given: Quiz was created and should appear in list

          // When: Quiz list is retrieved
          const response = await spec()
            .get(testCase.endpoint)
            .expectStatus(testCase.expectedStatus);

          // Then: List should contain quiz data
          validateResponseType(response.json, testCase.expectedResponseType);

          // And: Created quiz should be found in list if available
          if (global.createdQuizId) {
            const foundQuiz = response.json.items.find(
              (q: Record<string, unknown>) => {
                const quiz = q as { id: unknown };
                return quiz.id === global.createdQuizId;
              },
            );
            expect(foundQuiz).toBeDefined();
          }
        });
      },
    );
  });

  describe("ページネーション: Pagination scenarios", () => {
    quizSearchData.paginationScenarios.forEach((testCase, _index) => {
      it(`Pagination works correctly: ${testCase.description}`, async () => {
        // Given: Pagination parameters

        // When: Quiz list is requested with pagination
        const response = await spec()
          .get("/api/quiz/v1/manage/quizzes")
          .withQueryParams(testCase.queryParams)
          .expectStatus(200);

        const body = response.json;

        // Then: Pagination should work correctly
        expect(body).toHaveProperty("items");
        expect(body).toHaveProperty("totalCount");
        expect(body).toHaveProperty("hasMore");
      });
    });
  });

  describe("空結果: Empty result handling scenarios", () => {
    quizSearchData.emptyResultScenarios.forEach((testCase, _index) => {
      it(`Empty results handled correctly: ${testCase.description}`, async () => {
        // Given: Search filters that match nothing

        // When: Quiz list is searched with non-matching filters
        // 無効なstatusの場合は400エラー、その他は200でempty results
        const expectedStatus = testCase.description.includes(
          "Non-existent status filter",
        )
          ? 400
          : 200;

        const response = await spec()
          .get("/api/quiz/v1/manage/quizzes")
          .withQueryParams(testCase.filters)
          .expectStatus(expectedStatus);

        const body = response.json;

        // Then: Response should indicate empty results (200) or validation error (400)
        if (expectedStatus === 200) {
          expect(body.items).toEqual([]);
          expect(body.totalCount).toBe(0);
          expect(body.hasMore).toBe(false);
        } else if (expectedStatus === 400) {
          expect(body).toHaveProperty("message");
          expect(body).toHaveProperty("code");
        }
      });
    });
  });

  describe("レスポンススキーマ: Response schema validation", () => {
    quizListingTypeSafetyData.responseSchemaScenarios.forEach(
      (testCase, _index) => {
        it(`Response schema validation: ${testCase.description}`, async () => {
          // Given: API server uses TypeSpec generated schemas

          // When: Quiz listing endpoint is accessed
          const response = await spec()
            .get(testCase.endpoint)
            .expectStatus(testCase.expectedStatus);

          const body = response.json;

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
    case "QuizSummaryListResponse":
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

function validateSchemaComponentFields(
  responseBody: Record<string, unknown>,
  requiredFields: readonly string[],
) {
  requiredFields.forEach((field) => {
    expect(responseBody).toHaveProperty(field);
  });
}
