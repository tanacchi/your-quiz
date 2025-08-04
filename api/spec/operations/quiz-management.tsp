import "@typespec/http";
import "@typespec/rest";
import "../common/types.tsp";
import "../common/errors.tsp";
import "../models/quiz.tsp";

using Http;
using Rest;

namespace YourQuizAPI;

// Quiz Management API - DDD Quiz Management Context
@route("/api/quiz/v1/manage")
@tag("Quiz Management")
interface QuizManagement {
  
  // Quiz CRUD operations
  
  /** Create a new quiz (pending approval) */
  @post 
  @route("/quizzes")
  createQuiz(@body request: CreateQuizRequest): CreateQuizResponse | ValidationError | RateLimitError;
  
  /** Get quiz details */
  @get
  @route("/quizzes/{id}")
  getQuiz(@path id: QuizId): QuizWithSolution | NotFoundError;
  
  /** Update quiz (creator only, before approval) */
  @put
  @route("/quizzes/{id}")
  updateQuiz(@path id: QuizId, @body request: UpdateQuizRequest): QuizWithSolution | NotFoundError | ForbiddenError | ValidationError;
  
  /** Delete quiz (creator only) */
  @delete
  @route("/quizzes/{id}")
  deleteQuiz(@path id: QuizId): void | NotFoundError | ForbiddenError;
  
  /** List quizzes (with filters) */
  @get
  @route("/quizzes")
  listQuizzes(
    ...PaginationRequest,
    @query status?: QuizStatus,
    @query creatorId?: UserId,
    @query tags?: string[]
  ): QuizListResponse;
  
  // Approval workflow operations
  
  /** Submit quiz for approval */
  @post
  @route("/quizzes/{id}/submit")
  submitForApproval(@path id: QuizId): {
    quiz: Quiz;
    status: "pending_approval";
    estimatedApprovalDate?: UtcDateTime;
  } | NotFoundError | ForbiddenError | ConflictError;
  
  /** Approve quiz (admin only) */
  @post
  @route("/quizzes/{id}/approve")
  approveQuiz(@path id: QuizId, @body request: ApprovalRequest): Quiz | NotFoundError | ForbiddenError;
  
  /** Reject quiz (admin only) */
  @post
  @route("/quizzes/{id}/reject")  
  rejectQuiz(@path id: QuizId, @body request: ApprovalRequest): Quiz | NotFoundError | ForbiddenError;
  
  /** Publish approved quiz (admin only) */
  @post
  @route("/quizzes/{id}/publish")
  publishQuiz(@path id: QuizId): Quiz | NotFoundError | ForbiddenError | ConflictError;
  
  // Statistics and quality management
  
  /** Get creator statistics */
  @get
  @route("/statistics/creator/{creatorId}")
  getCreatorStatistics(@path creatorId: UserId): {
    totalQuizzes: int32;
    publishedQuizzes: int32;
    totalAnswers: int32;
    averageCorrectRate: float32;
    popularityScore: float32;
    qualityScore: float32;
    tagDistribution: Record<int32>;
    difficultyDistribution: Record<int32>;
  } | NotFoundError;
  
  /** Get quality report */
  @get
  @route("/quality/report")
  getQualityReport(
    ...PaginationRequest,
    @query period?: "day" | "week" | "month" = "week"
  ): PaginationResponse<{
    quizId: QuizId;
    qualityScore: float32;
    issues: string[];
    recommendations: string[];
  }>;
  
  /** Flag quiz for quality review */
  @post
  @route("/quality/flag")
  flagQuiz(@body request: {
    quizId: QuizId;
    reason: "spam" | "inappropriate" | "incorrect" | "duplicate" | "other";
    description?: string;
  }): {
    flagId: string;
    status: "pending_review";
  } | NotFoundError | ValidationError;
}