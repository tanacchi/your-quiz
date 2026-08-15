import { describe, expect, test } from "vitest";
import {
  CreateFailedError,
  DeleteFailedError,
  FindFailedError,
  UpdateFailedError,
} from "../../../../shared/errors";
import { QuizNotFoundError } from "../../domain/errors";
import {
  QuizDeletionFailedError,
  QuizRetrievalFailedError,
  QuizUpdateFailedError,
  UseCaseInternalError,
} from "../errors";
import {
  mapDeleteErrorToUseCaseError,
  mapFindErrorToUseCaseError,
  mapUpdateErrorToUseCaseError,
} from "./quiz-repository-error-mapping";

describe("quiz-repository-error-mapping", () => {
  describe("mapFindErrorToUseCaseError", () => {
    test("FindFailedErrorでdetailsに'not found'を含む場合はQuizNotFoundErrorを返す", () => {
      const error = new FindFailedError("Quiz", "Quiz not found: quiz-1");

      const result = mapFindErrorToUseCaseError("quiz-1", error);

      expect(result).toBeInstanceOf(QuizNotFoundError);
      if (result instanceof QuizNotFoundError) {
        expect(result.quizId).toBe("quiz-1");
      }
    });

    test("'not found'は大文字小文字を区別しない", () => {
      const error = new FindFailedError("Quiz", "Quiz Not Found: quiz-1");

      const result = mapFindErrorToUseCaseError("quiz-1", error);

      expect(result).toBeInstanceOf(QuizNotFoundError);
    });

    test("FindFailedErrorでdetailsに'not found'を含まない場合はQuizRetrievalFailedErrorを返す", () => {
      const error = new FindFailedError("Quiz", "Connection timeout");

      const result = mapFindErrorToUseCaseError("quiz-1", error);

      expect(result).toBeInstanceOf(QuizRetrievalFailedError);
      if (result instanceof QuizRetrievalFailedError) {
        expect(result.quizId).toBe("quiz-1");
        expect(result.details).toContain("Connection timeout");
      }
    });

    test("FindFailedError以外はUseCaseInternalErrorを返す", () => {
      const error = new CreateFailedError("Quiz", "Unknown error");

      const result = mapFindErrorToUseCaseError("quiz-1", error);

      expect(result).toBeInstanceOf(UseCaseInternalError);
    });

    test("UseCaseInternalErrorはrepositoryError.detailsを引き継ぐ(.messageはInternalServerErrorで固定されるため)", () => {
      const error = new CreateFailedError("Quiz", "Unknown error");

      const result = mapFindErrorToUseCaseError("quiz-1", error);

      expect(result).toBeInstanceOf(UseCaseInternalError);
      if (result instanceof UseCaseInternalError) {
        expect(result.details).toBe("Unknown error");
      }
    });
  });

  describe("mapUpdateErrorToUseCaseError", () => {
    test("UpdateFailedErrorはQuizUpdateFailedErrorを返す", () => {
      const error = new UpdateFailedError("Quiz", "Something went wrong");

      const result = mapUpdateErrorToUseCaseError("quiz-1", error);

      expect(result).toBeInstanceOf(QuizUpdateFailedError);
      if (result instanceof QuizUpdateFailedError) {
        expect(result.quizId).toBe("quiz-1");
      }
    });

    test("UpdateFailedErrorでdetailsに'not found'を含む場合はQuizNotFoundErrorを返す(Mock経路)", () => {
      const error = new UpdateFailedError("Quiz", "Quiz not found: quiz-1");

      const result = mapUpdateErrorToUseCaseError("quiz-1", error);

      expect(result).toBeInstanceOf(QuizNotFoundError);
    });

    test("FindFailedErrorでdetailsに'not found'を含む場合はQuizNotFoundErrorを返す(D1経路: 更新後の再取得SELECTが空)", () => {
      const error = new FindFailedError("Quiz", "Quiz not found: quiz-1");

      const result = mapUpdateErrorToUseCaseError("quiz-1", error);

      expect(result).toBeInstanceOf(QuizNotFoundError);
    });

    test("UpdateFailedError以外はUseCaseInternalErrorを返す", () => {
      const error = new FindFailedError("Quiz", "Unrelated error");

      const result = mapUpdateErrorToUseCaseError("quiz-1", error);

      expect(result).toBeInstanceOf(UseCaseInternalError);
    });
  });

  describe("mapDeleteErrorToUseCaseError", () => {
    test("DeleteFailedErrorはQuizDeletionFailedErrorを返す", () => {
      const error = new DeleteFailedError("Quiz", "Something went wrong");

      const result = mapDeleteErrorToUseCaseError("quiz-1", error);

      expect(result).toBeInstanceOf(QuizDeletionFailedError);
      if (result instanceof QuizDeletionFailedError) {
        expect(result.quizId).toBe("quiz-1");
      }
    });

    test("DeleteFailedErrorでdetailsに'not found'を含む場合はQuizNotFoundErrorを返す", () => {
      const error = new DeleteFailedError("Quiz", "Quiz not found: quiz-1");

      const result = mapDeleteErrorToUseCaseError("quiz-1", error);

      expect(result).toBeInstanceOf(QuizNotFoundError);
    });

    test("FindFailedErrorでdetailsに'not found'を含む場合はQuizNotFoundErrorを返す", () => {
      const error = new FindFailedError("Quiz", "Quiz not found: quiz-1");

      const result = mapDeleteErrorToUseCaseError("quiz-1", error);

      expect(result).toBeInstanceOf(QuizNotFoundError);
    });

    test("DeleteFailedError以外はUseCaseInternalErrorを返す", () => {
      const error = new FindFailedError("Quiz", "Unrelated error");

      const result = mapDeleteErrorToUseCaseError("quiz-1", error);

      expect(result).toBeInstanceOf(UseCaseInternalError);
    });
  });
});
