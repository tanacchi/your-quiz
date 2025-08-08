import { spec } from "pactum";
import { quizCreationData } from "../fixtures/quiz-creation-data";

// Quiz Creation BDD Tests - クイズ作成BDDテスト
// Uses ユビキタス言語 (Ubiquitous Language): Creator, Quiz, Solution, Approval

describe("Quiz Creation - クイズ作成", () => {
  beforeAll(async () => {
    // Given: API server is running
  });

  describe("正常系: Valid quiz creation scenarios", () => {
    quizCreationData.validQuizzes.forEach((testCase, _index) => {
      it(`Successfully creates quiz: ${testCase.description}`, async () => {
        // Given: Valid quiz creation data

        // When: Creator creates a quiz
        const response = await spec()
          .post(testCase.endpoint)
          .withJson(testCase.input as object)
          .expectStatus(testCase.expectedStatus);

        const body = response.json;

        // Then: Quiz should be created successfully
        expect(body).toHaveProperty("id");
        expect(body).toHaveProperty("question", testCase.input.question);
        expect(body).toHaveProperty("answerType", testCase.expected.answerType);
        expect(body).toHaveProperty("status", testCase.expected.status);
        expect(body).toHaveProperty("creatorId");
        expect(body).toHaveProperty("createdAt");

        // And: Response should match TypeSpec Quiz schema
        expect(typeof body.id).toBe("string");
        expect(typeof body.question).toBe("string");
        expect(typeof body.creatorId).toBe("string");
        expect(typeof body.createdAt).toBe("string");
      });
    });
  });

  describe("異常系: Invalid quiz creation scenarios", () => {
    quizCreationData.invalidQuizzes.forEach((testCase, _index) => {
      it(`Rejects invalid quiz data: ${testCase.description}`, async () => {
        // Given: Invalid quiz creation data

        // When: Creator attempts to create quiz with invalid data
        const response = await spec()
          .post(testCase.endpoint)
          .withJson(testCase.input as object)
          .expectStatus(testCase.expectedStatus);

        const body = response.json;

        // Then: Request should be rejected with error
        expect(body).toHaveProperty("code");
        expect(body).toHaveProperty("message");
        expect(typeof body.code).toBe("number");
        expect(typeof body.message).toBe("string");
        expect(body.message.length).toBeGreaterThan(0);

        // And: Error should indicate validation failure
        expect(body.code).toBe(400);
      });
    });
  });

  describe("文字数制限: Character limit validation scenarios", () => {
    quizCreationData.characterLimitScenarios.forEach((testCase, _index) => {
      it(`Validates character limits: ${testCase.description}`, async () => {
        // Given: Quiz data with specific character lengths
        const testData = {
          question: "Q".repeat(testCase.questionLength),
          answerType: "boolean",
          solution: {
            type: "boolean",
            id: `sol-limit-${testCase.questionLength}`,
            value: true,
          },
          explanation: "E".repeat(testCase.explanationLength),
        };

        // When: Creator creates quiz with character limit test data
        const response = await spec()
          .post(testCase.endpoint)
          .withJson(testData)
          .expectStatus(testCase.expectedStatus);

        const body = response.json;

        if (testCase.expectedStatus === 201) {
          // Then: Quiz should be accepted within limits
          expect(body).toHaveProperty("id");
          expect(body).toHaveProperty("status", "pending_approval");
        } else {
          // Then: Request should be rejected for exceeding limits
          expect(body).toHaveProperty("code", 400);
          expect(body).toHaveProperty("message");
          expect(typeof body.message).toBe("string");
        }
      });
    });
  });
});
