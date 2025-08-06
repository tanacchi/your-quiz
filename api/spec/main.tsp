import "@typespec/http";
import "@typespec/openapi3";

using TypeSpec.Http;

@service(#{
  title: "Your Quiz API",
})
namespace YourQuizAPI;

// Common types
model ErrorResponse {
  message: string;
  code: string;
}

// Quiz models
model Quiz {
  id: string;
  question: string;
  answerType: "boolean" | "free_text" | "single_choice" | "multiple_choice";
  createdAt: utcDateTime;
  updatedAt: utcDateTime;
}

model QuizListResponse {
  quizzes: Quiz[];
  total: int32;
}

model CreateQuizRequest {
  question: string;
  answerType: "boolean" | "free_text" | "single_choice" | "multiple_choice";
}

// Quiz Management API
@route("/api/quiz/v1/manage/quizzes")
interface QuizManagement {
  @get
  list(): QuizListResponse | ErrorResponse;
  
  @get
  get(@path id: string): Quiz | ErrorResponse;
  
  @post
  create(@body quiz: CreateQuizRequest): Quiz | ErrorResponse;
}
