import { spec } from "pactum";
import { quizRetrievalData } from "../fixtures/quiz-retrieval-data";

// Quiz Retrieval by ID BDD Tests - Quiz ID別取得BDDテスト
// Uses ユビキタス言語 (Ubiquitous Language): AnonymousUser, Quiz, QuizWithSolution

describe("Quiz Retrieval by ID - Quiz ID別取得", () => {
  beforeAll(async () => {
    // Setup test quizzes for retrieval
    // Given: API server has Quiz with ID and status
  });

  describe("正常系: Successful Quiz retrieval by valid ID", () => {
    // Scenario Outline: Successful Quiz retrieval by valid ID
    quizRetrievalData.validRetrievals.forEach((testCase, _index) => {
      it(`AnonymousUser can retrieve QuizWithSolution: ${testCase.description}`, async () => {
        // When: AnonymousUser requests Quiz details for valid ID
        const response = await spec()
          .get(`/quizzes/${testCase.quizId}`)
          .expectStatus(200); // Then: Response should contain QuizWithSolution

        const body = response.json;

        // Then: Quiz should match schema structure
        expect(body).toHaveProperty("id", testCase.quizId);
        expect(body).toHaveProperty("question");
        expect(body).toHaveProperty("explanation");
        expect(body).toHaveProperty("solution");

        // And: Solution should include expected data
        expect(body.solutionType).toBe(testCase.expected.solutionType);
        expect(body.solution).toBeDefined();

        // Verify solution structure based on type
        switch (testCase.expected.solutionType) {
          case "boolean":
            expect(body.solution).toHaveProperty("correctAnswer");
            expect(typeof body.solution.correctAnswer).toBe("boolean");
            break;
          case "single_choice":
          case "multiple_choice":
            expect(body.solution).toHaveProperty("choices");
            expect(Array.isArray(body.solution.choices)).toBe(true);
            break;
          case "free_text":
            expect(body.solution).toHaveProperty("sampleAnswers");
            break;
        }
      });
    });
  });

  describe("異常系: Quiz retrieval failure scenarios", () => {
    // Scenario Outline: Quiz retrieval failure scenarios
    quizRetrievalData.failureScenarios.forEach((testCase, _index) => {
      it(`AnonymousUser retrieval fails: ${testCase.description}`, async () => {
        // When: AnonymousUser requests Quiz details for invalid ID
        const url =
          testCase.invalidId === null || testCase.invalidId === ""
            ? "/quizzes/"
            : `/quizzes/${testCase.invalidId}`;

        await spec()
          .get(url)
          .expectStatus(testCase.expected.statusCode) // Then: Response should return error status
          .expectJsonLike({
            error: testCase.expected.errorReason, // And: ErrorResponse should indicate error reason
          });
      });
    });
  });

  describe("Solution型別: Quiz retrieval with different Solution types", () => {
    // Scenario Outline: Quiz retrieval with different Solution types
    quizRetrievalData.solutionTypeScenarios.forEach((testCase, _index) => {
      it(`QuizWithSolution contains correct structure: ${testCase.description}`, async () => {
        // Setup: Create a quiz with specific solution type for testing
        const createdQuiz = await spec()
          .post("/api/quiz/v1/manage/quizzes")
          .withJson({
            question: `Test question for ${testCase.solutionType}`,
            explanation: `Test explanation for ${testCase.solutionType}`,
            solutionType: testCase.solutionType,
            solution: getSampleSolutionForType(testCase.solutionType),
          })
          .expectStatus(201);

        const quizId = createdQuiz.json.id;

        // When: AnonymousUser requests Quiz details by ID
        const response = await spec()
          .get(`/quizzes/${quizId}`)
          .expectStatus(200);

        const body = response.json;

        // Then: QuizWithSolution should contain correct solution structure
        expect(body.solutionType).toBe(testCase.solutionType);

        // And: Solution type should match expected type
        switch (testCase.solutionType) {
          case "boolean":
            // Solution structure: boolean_value_field
            expect(body.solution).toHaveProperty("correctAnswer");
            break;
          case "free_text":
            // Solution structure: text_matching_fields
            expect(body.solution).toHaveProperty("sampleAnswers");
            expect(body.solution).toHaveProperty("keywords");
            break;
          case "single_choice":
            // Solution structure: choices_with_correct
            expect(body.solution).toHaveProperty("choices");
            expect(
              body.solution.choices.filter(
                (c: Record<"correct" & string, unknown>) => c.correct,
              ),
            ).toHaveLength(1);
            break;
          case "multiple_choice":
            // Solution structure: choices_with_multiples
            expect(body.solution).toHaveProperty("choices");
            expect(
              body.solution.choices.filter(
                (c: { correct: boolean }) => c.correct,
              ).length,
            ).toBeGreaterThanOrEqual(1);
            break;
        }

        // And: Schema validation should pass
        expect(body).toMatchObject({
          id: expect.any(String),
          question: expect.any(String),
          explanation: expect.any(String),
          solutionType: testCase.solutionType,
          solution: expect.any(Object),
        });
      });
    });
  });
});

// Helper function to create sample solutions for different types
function getSampleSolutionForType(solutionType: string) {
  switch (solutionType) {
    case "boolean":
      return { correctAnswer: true };
    case "free_text":
      return { sampleAnswers: ["sample"], keywords: ["test"] };
    case "single_choice":
      return {
        choices: [
          { text: "Option 1", correct: true },
          { text: "Option 2", correct: false },
        ],
      };
    case "multiple_choice":
      return {
        choices: [
          { text: "Option 1", correct: true },
          { text: "Option 2", correct: true },
          { text: "Option 3", correct: false },
        ],
      };
    default:
      return {};
  }
}
