import "@typespec/http";

namespace YourQuizAPI;

// Base error model
@error
@example(#{
  code: 400,
  message: "リクエストの形式が正しくありません",
  details: "問題文は500文字以下で入力してください",
  requestId: "req-12345-abcde"
})
model ErrorResponse {
  code: int32;
  message: string;
  details?: string;
  requestId?: string;
}

// Specific error types
@error
@example(#{
  code: 400,
  message: "バリデーションエラー",
  details: "入力された値に問題があります",
  requestId: "req-val-001",
  fieldErrors: #{
    question: "問題文は必須です",
    tags: "タグは最大10個までです"
  }
})
model ValidationError extends ErrorResponse {
  code: 400;
  fieldErrors?: Record<string>;
}

@error
model UnauthorizedError extends ErrorResponse {
  code: 401;
  message: "Unauthorized access";
}

@error
model ForbiddenError extends ErrorResponse {
  code: 403;
  message: "Forbidden operation";
}

@error
@example(#{
  code: 404,
  message: "リソースが見つかりません",
  details: "指定されたクイズID 'quiz-999' は存在しません",
  requestId: "req-404-001"
})
model NotFoundError extends ErrorResponse {
  code: 404;
}

@error
model ConflictError extends ErrorResponse {
  code: 409;
  message: "Resource conflict";
}

@error
@example(#{
  code: 429,
  message: "レート制限に達しました",
  details: "1日あたりのクイズ作成上限（50問）に達しています。明日の00:00 UTCにリセットされます。",
  requestId: "req-rate-001"
})
model RateLimitError extends ErrorResponse {
  code: 429;
}

@error
model InternalServerError extends ErrorResponse {
  code: 500;
  message: "Internal server error";
}