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

    test("DeleteFailedError以外はUseCaseInternalErrorを返す", () => {
      const error = new FindFailedError("Quiz", "Unrelated error");

      const result = mapDeleteErrorToUseCaseError("quiz-1", error);

      expect(result).toBeInstanceOf(UseCaseInternalError);
    });
  });
});
