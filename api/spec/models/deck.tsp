import "@typespec/http";
import "../common/types.tsp";

namespace YourQuizAPI;

// Deck model
model Deck {
  id: DeckId;
  name: string;
  description?: string;
  quizIds: QuizId[];
  creatorId: UserId;
  createdAt: UtcDateTime;
  lastModifiedAt: UtcDateTime;
}

// Quiz Session model  
model QuizSession {
  id: SessionId;
  deckId: DeckId;
  creatorId: UserId;
  deviceFingerprint: string;
  startedAt: UtcDateTime;
  completedAt?: UtcDateTime;
  isCompleted: boolean = false;
}

// Extended models for API responses
model DeckWithQuizzes {
  ...Deck;
  quizzes: QuizWithSolution[];
  totalQuizzes: int32;
}

model QuizSessionWithProgress {
  ...QuizSession;
  deck: Deck;
  progress: SessionProgress;
}

model SessionProgress {
  totalQuizzes: int32;
  answeredQuizzes: int32;
  correctAnswers: int32;
  incorrectAnswers: int32;
  progressPercentage: float32;
  currentQuizIndex?: int32;
  nextQuizId?: QuizId;
}

// Request/Response models
model CreateDeckRequest {
  name?: string;
  description?: string;
  quizIds: QuizId[];
  source: "manual_selection" | "search_result" | "wrong_questions";
  sourceQuery?: string;
  maxQuizzes?: int32 = 100;
  shuffleOrder?: boolean = false;
}

model CreateDeckResponse {
  deck: Deck;
  session?: QuizSession;
}

model CreateDeckFromSearchRequest {
  searchQuery: string;
  filters?: QuizSearchFilters;
  maxQuizzes?: int32 = 50;
  name?: string;
  description?: string;
}

model StartSessionRequest {
  deckId: DeckId;
  deviceFingerprint: string;
  shuffleQuizzes?: boolean = false;
}

model StartSessionResponse {
  session: QuizSessionWithProgress;
  firstQuiz?: QuizWithSolution;
}

model UpdateSessionRequest {
  isCompleted?: boolean;
}

model DeckListResponse extends PaginationResponse<DeckWithQuizzes> {}

model SessionListResponse extends PaginationResponse<QuizSessionWithProgress> {}