import "@typespec/http";
import "@typespec/rest";
import "../common/types.tsp";
import "../common/errors.tsp";
import "../models/quiz.tsp";
import "../models/deck.tsp";
import "../models/attempt.tsp";

using Http;
using Rest;

namespace YourQuizAPI;

// Quiz Learning API - DDD Quiz Learning Context
@route("/api/quiz/v1/learning")
@tag("Quiz Learning")
interface QuizLearning {
  
  // Published Quiz access
  
  /** Get list of published quizzes for learning */
  @get
  @route("/published")
  getPublishedQuizzes(
    ...PaginationRequest,
    @query tags?: string[],
    @query difficulty?: string,
    @query answerType?: AnswerType
  ): QuizListResponse;
  
  /** Get specific published quiz */
  @get
  @route("/published/{id}")
  getPublishedQuiz(@path id: QuizId): QuizWithSolution | NotFoundError;
  
  // Deck Management
  
  /** Create new deck from manual selection */
  @post 
  @route("/decks")
  createDeck(@body request: CreateDeckRequest): CreateDeckResponse | ValidationError;
  
  /** Create deck from search results */
  @post
  @route("/decks/from-search")
  createDeckFromSearch(@body request: CreateDeckFromSearchRequest): CreateDeckResponse | ValidationError;
  
  /** Create deck from wrong answers */
  @post
  @route("/decks/wrong-questions")
  createDeckFromWrongAnswers(@body request: {
    name?: string;
    description?: string;
    userId: UserId;
    maxQuizzes?: int32 = 50;
    sinceDays?: int32 = 30;
  }): CreateDeckResponse | ValidationError;
  
  /** Get deck details */
  @get
  @route("/decks/{id}")
  getDeck(@path id: DeckId): DeckWithQuizzes | NotFoundError;
  
  /** List user's decks */
  @get
  @route("/decks/mine")
  getMyDecks(
    ...PaginationRequest,
    @query userId: UserId
  ): DeckListResponse;
  
  /** Delete deck */
  @delete
  @route("/decks/{id}")
  deleteDeck(@path id: DeckId): void | NotFoundError | ForbiddenError;
  
  // Quiz Session Management
  
  /** Start new quiz session */
  @post
  @route("/sessions")
  startSession(@body request: StartSessionRequest): StartSessionResponse | ValidationError | NotFoundError;
  
  /** Get session details with progress */
  @get
  @route("/sessions/{id}")
  getSession(@path id: SessionId): QuizSessionWithProgress | NotFoundError;
  
  /** Update session (mark completed, etc.) */
  @put
  @route("/sessions/{id}")
  updateSession(@path id: SessionId, @body request: UpdateSessionRequest): QuizSessionWithProgress | NotFoundError | ValidationError;
  
  /** Get user's sessions */
  @get
  @route("/sessions/mine")
  getMySessions(
    ...PaginationRequest,
    @query userId: UserId,
    @query isCompleted?: boolean
  ): SessionListResponse;
  
  /** Get next quiz in session */
  @get
  @route("/sessions/{id}/next-quiz")
  getNextQuiz(@path id: SessionId): QuizWithSolution | NotFoundError | ConflictError;
  
  // Answer Submission
  
  /** Submit answer to quiz in session */
  @put
  @route("/sessions/{sessionId}/answers")
  submitAnswer(@path sessionId: SessionId, @body request: SubmitAnswerRequest): SubmitAnswerResponse | ValidationError | NotFoundError | ConflictError;
  
  /** Get answer history for session */
  @get
  @route("/sessions/{id}/answers")
  getSessionAnswers(@path id: SessionId, ...PaginationRequest): AttemptHistoryResponse | NotFoundError;
  
  /** Check if quiz is already answered in session */
  @get
  @route("/sessions/{sessionId}/answers/{quizId}")
  getSessionAnswer(@path sessionId: SessionId, @path quizId: QuizId): AttemptWithAnswer | NotFoundError;
  
  // Learning Statistics
  
  /** Get session statistics */
  @get
  @route("/sessions/{id}/statistics")
  getSessionStatistics(@path id: SessionId): {
    session: QuizSessionWithProgress;
    performance: {
      totalTime: int32; // seconds
      averageTimePerQuiz: float32;
      streaks: {
        current: int32;
        best: int32;
      };
      scoreDistribution: Record<int32>;
    };
    insights: {
      strongAreas: string[];
      improvementAreas: string[];
      recommendations: string[];
    };
  } | NotFoundError;
}