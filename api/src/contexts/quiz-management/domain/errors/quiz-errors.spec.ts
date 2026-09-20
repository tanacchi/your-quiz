import { describe, expect, test } from "vitest";
import { QuizCreatorOnlyError } from "./quiz-errors";

describe("QuizCreatorOnlyError", () => {
  test("403のレスポンスに作成者のIDを含めない", () => {
    // Arrange & Act
    const error = new QuizCreatorOnlyError("quiz-1", "update");
    const response = error.toErrorResponse();

    // Assert: 作成者 ID は匿名識別子と結びつくため、権限の無い第三者に返さない
    expect(response.code).toBe(403);
    expect(response.details).toBe(
      "Quiz quiz-1: update operation is only allowed for the creator",
    );
  });

  test("作成者とリクエスト実行者のIDをプロパティに持たない", () => {
    // Arrange & Act
    const error = new QuizCreatorOnlyError("quiz-1", "delete", "request-1");

    // Assert: エラーオブジェクトごとログやレスポンスに出ても漏れないようにする
    expect(error).not.toHaveProperty("creatorId");
    expect(error).not.toHaveProperty("requesterId");
    expect(error.quizId).toBe("quiz-1");
    expect(error.operation).toBe("delete");
    expect(error.requestId).toBe("request-1");
  });
});
