import "@typespec/http";
import "../common/types.tsp";

namespace YourQuizAPI;

// Base Attempt model
model Attempt {
  id: AttemptId;
  quizId: QuizId;
  sessionId: SessionId;
  userId: UserId;
  answerType: AnswerType;
  answerId: AnswerId;
  isCorrect: boolean;
  answeredAt: UtcDateTime;
}

// Answer models (polymorphic - user responses)
union Answer {
  BooleanAnswer,
  FreeTextAnswer,
  SingleChoiceAnswer,
  MultipleChoiceAnswer
}

model BooleanAnswer {
  type: "boolean";
  id: AnswerId;
  value: boolean;
}

model FreeTextAnswer {
  type: "free_text";
  id: AnswerId;
  text: string;
}

model SingleChoiceAnswer {
  type: "single_choice";
  id: AnswerId;
  selectedChoiceId: ChoiceId;
}

model MultipleChoiceAnswer {
  type: "multiple_choice";
  id: AnswerId;
  selectedChoiceIds: ChoiceId[];
}

// Attempt with answer (denormalized for API responses)
model AttemptWithAnswer {
  ...Attempt;
  answer: Answer;
}

// Request/Response models
model SubmitAnswerRequest {
  sessionId: SessionId;
  quizId: QuizId;
  answer: Answer;
}

model SubmitAnswerResponse {
  attempt: AttemptWithAnswer;
  isCorrect: boolean;
  explanation?: string;
  correctAnswer: Answer;
}

model AttemptHistoryResponse extends PaginationResponse<AttemptWithAnswer> {}

model AttemptStatistics {
  totalAttempts: int32;
  correctAttempts: int32;
  incorrectAttempts: int32;
  averageCorrectRate: float32;
  byAnswerType: Record<{
    total: int32;
    correct: int32;
    rate: float32;
  }>;
  recentStreak: int32;
}