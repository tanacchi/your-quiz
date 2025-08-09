import "@typespec/http";
import "@typespec/rest";
import "../common/types.tsp";
import "../common/errors.tsp";
import "../models/quiz.tsp";

using Http;
using Rest;

namespace YourQuizAPI;

// Quiz Management API - Basic CRUD operations
@route("/api/quiz/v1/manage")
@tag("Quiz Management")
interface QuizManagement {
  
  // Quiz CRUD operations
  
  /** Create a new quiz */
  @post 
  @route("/quizzes")
  createQuiz(@body request: CreateQuizRequest): QuizWithSolution | ValidationError | RateLimitError;
  
  /** Get quiz details */
  @get
  @route("/quizzes/{id}")
  getQuiz(@path id: QuizId): QuizWithSolution | NotFoundError;
  
  /** Update quiz */
  @put
  @route("/quizzes/{id}")
  updateQuiz(@path id: QuizId, @body request: UpdateQuizRequest): QuizWithSolution | NotFoundError | ForbiddenError | ValidationError;
  
  /** Delete quiz */
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
  
  // Approval workflow operations (commented out)
  // submitForApproval(@path id: QuizId): {...} | NotFoundError | ForbiddenError | ConflictError;
  // approveQuiz(@path id: QuizId, @body request: ApprovalRequest): Quiz | NotFoundError | ForbiddenError;
  // rejectQuiz(@path id: QuizId, @body request: ApprovalRequest): Quiz | NotFoundError | ForbiddenError;
  // publishQuiz(@path id: QuizId): Quiz | NotFoundError | ForbiddenError | ConflictError;
  
  // Statistics and quality management (commented out)
  // getCreatorStatistics(@path creatorId: UserId): {...} | NotFoundError;
  // getQualityReport(...PaginationRequest, @query period?: "day" | "week" | "month"): PaginationResponse<{...}>;
  // flagQuiz(@body request: {...}): {...} | NotFoundError | ValidationError;
}