import { spec } from "pactum";
import { quizSearchData } from "../fixtures/quiz-search-data";

// Quiz List Search BDD Tests - Quizリスト検索BDDテスト
// Uses ユビキタス言語 (Ubiquitous Language): AnonymousUser, Quiz, Search, QuizListResponse

describe("Quiz List Search - Quizリスト検索", () => {
  beforeAll(async () => {
    // Setup test quizzes for search
    // Create various quizzes with different statuses and solution types
  });

  describe("正常系: Valid search and filtering scenarios", () => {
    // Scenario Outline: Valid search and filtering scenarios
    quizSearchData.validSearches.forEach((testCase, _index) => {
      it(`AnonymousUser can search Quizzes: ${testCase.description}`, async () => {
        // When: AnonymousUser searches with filters
        const response = await spec()
          .get("/api/quiz/v1/manage/quizzes")
          .withQueryParams(testCase.filters)
          .expectStatus(200); // Then: Search should return QuizListResponse

        const body = response.json;

        // Then: Response should contain quiz list
        expect(body).toHaveProperty("quizzes");
        expect(Array.isArray(body.quizzes)).toBe(true);

        // And: Pagination information should be included
        expect(body).toHaveProperty("pagination");
        expect(body).toHaveProperty("totalCount");
        expect(typeof body.totalCount).toBe("number");

        // Verify filtering results
        if (testCase.expected.statusFilter) {
          body.quizzes.forEach((quiz: Record<string, unknown>) => {
            expect(quiz.status).toBe(testCase.expected.statusFilter);
          });
        }

        if (testCase.expected.solutionTypeFilter) {
          body.quizzes.forEach((quiz: Record<string, unknown>) => {
            expect(quiz.solutionType).toBe(
              testCase.expected.solutionTypeFilter,
            );
          });
        }

        // And: Results should match expected criteria
        if (testCase.expected.minCount) {
          expect(body.quizzes.length).toBeGreaterThanOrEqual(
            testCase.expected.minCount,
          );
        }
      });
    });
  });

  describe("ページネーション: Pagination scenarios", () => {
    // Scenario Outline: Pagination scenarios
    quizSearchData.paginationScenarios.forEach((testCase, _index) => {
      it(`Pagination works correctly: ${testCase.description}`, async () => {
        // When: AnonymousUser requests specific page
        const response = await spec()
          .get("/api/quiz/v1/manage/quizzes")
          .withQueryParams(testCase.queryParams)
          .expectStatus(200);

        const body = response.json;

        // Then: Pagination information should be correct
        expect(body.pagination.page).toBe(testCase.expected.expectedPage);
        expect(body.pagination.limit).toBe(testCase.expected.expectedLimit);
        expect(body.pagination).toHaveProperty("totalPages");
        expect(body.pagination).toHaveProperty("hasNext");
        expect(body.pagination).toHaveProperty("hasPrevious");

        // And: Page-specific validations
        if (testCase.expected.paginationType === "first_page_default") {
          expect(body.pagination.hasPrevious).toBe(false);
        } else if (testCase.expected.paginationType === "second_page_custom") {
          expect(body.pagination.hasPrevious).toBe(true);
        } else if (testCase.expected.paginationType === "empty_page") {
          // Large page number should return empty results
          expect(body.quizzes.length).toBe(0);
          expect(body.totalCount).toBeGreaterThanOrEqual(0);
        }
      });
    });
  });

  describe("空結果: Empty result handling scenarios", () => {
    // Scenario Outline: Empty result handling scenarios
    quizSearchData.emptyResultScenarios.forEach((testCase, _index) => {
      it(`Empty results handled correctly: ${testCase.description}`, async () => {
        // When: AnonymousUser searches with filters that match nothing
        const response = await spec()
          .get("/api/quiz/v1/manage/quizzes")
          .withQueryParams(testCase.filters)
          .expectStatus(200);

        const body = response.json;

        // Then: Response should indicate empty results
        expect(body.quizzes).toEqual([]);
        expect(body.totalCount).toBe(0);

        // And: Pagination should reflect empty state
        expect(body.pagination.totalPages).toBe(0);
        expect(body.pagination.hasNext).toBe(false);
        expect(body.pagination.hasPrevious).toBe(false);

        // And: Structure should still be valid QuizListResponse
        expect(body).toHaveProperty("quizzes");
        expect(body).toHaveProperty("pagination");
        expect(body).toHaveProperty("totalCount");
      });
    });
  });

  describe("スキーマ検証: Schema validation for QuizListResponse", () => {
    // Scenario Outline: Schema validation for QuizListResponse
    quizSearchData.schemaValidationCases.forEach((testCase, _index) => {
      it(`QuizListResponse schema validation: ${testCase.description}`, async () => {
        // When: AnonymousUser performs any search
        const response = await spec()
          .get("/api/quiz/v1/manage/quizzes")
          .expectStatus(200);

        const body = response.json;

        // Then: Response should have required top-level fields
        testCase.expected.requiredFields.forEach((field) => {
          expect(body).toHaveProperty(field);
        });

        // And: Quiz objects should have required fields
        if (body.quizzes.length > 0) {
          body.quizzes.forEach((quiz: Record<string, unknown>) => {
            testCase.expected.quizFields.forEach((field) => {
              expect(quiz).toHaveProperty(field);
            });
          });
        }

        // And: Pagination should have required fields
        testCase.expected.paginationFields.forEach((field) => {
          expect(body.pagination).toHaveProperty(field);
        });

        // And: Field types should be correct
        expect(typeof body.totalCount).toBe("number");
        expect(typeof body.pagination.page).toBe("number");
        expect(typeof body.pagination.limit).toBe("number");
        expect(typeof body.pagination.totalPages).toBe("number");
        expect(typeof body.pagination.hasNext).toBe("boolean");
        expect(typeof body.pagination.hasPrevious).toBe("boolean");
      });
    });
  });
});
