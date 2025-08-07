import "@typespec/http";

namespace YourQuizAPI;

// Base error model
@error
model ErrorResponse {
  code: int32;
  message: string;
  details?: string;
  requestId?: string;
}

// Specific error types
@error
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
model NotFoundError extends ErrorResponse {
  code: 404;
  message: "Resource not found";
}

@error
model ConflictError extends ErrorResponse {
  code: 409;
  message: "Resource conflict";
}

@error
model RateLimitError extends ErrorResponse {
  code: 429;
  message: "Rate limit exceeded";
}

@error
model InternalServerError extends ErrorResponse {
  code: 500;
  message: "Internal server error";
}