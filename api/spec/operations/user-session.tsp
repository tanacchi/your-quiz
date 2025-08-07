import "@typespec/http";
import "@typespec/rest";
import "../common/types.tsp";
import "../common/errors.tsp";
import "../models/user.tsp";
import "../models/attempt.tsp";

using Http;
using Rest;

namespace YourQuizAPI;

// User Session API - DDD User Session Context  
@route("/api/user/v1")
@tag("User Session")
interface UserSession {
  
  // Anonymous User Management
  
  /** Create anonymous user identity */
  @post
  @route("/identities")
  createUserIdentity(@body request: {
    anonymousId: string;
    deviceFingerprint: string;
  }): {
    userIdentity: UserIdentity;
    sessionToken: string;
  } | ValidationError | ConflictError;
  
  /** Get user identity by anonymous ID */
  @get
  @route("/identities/anonymous/{anonymousId}")
  getUserIdentityByAnonymousId(@path anonymousId: string): UserIdentity | NotFoundError;
  
  /** Verify user identity */
  @post
  @route("/identities/verify")
  verifyUserIdentity(@body request: {
    userId: UserId;
    anonymousId: string;
    deviceFingerprint: string;
  }): {
    userIdentity: UserIdentity;
    isValid: boolean;
    sessionToken?: string;
  } | NotFoundError | ValidationError;
  
  // User Account Management (Optional)
  
  /** Create user account (optional upgrade from anonymous) */
  @post
  @route("/accounts")
  createUserAccount(@body request: CreateUserAccountRequest & { userId: UserId }): CreateUserAccountResponse | ValidationError | ConflictError;
  
  /** Get user profile */
  @get
  @route("/accounts/{id}")
  getUserAccount(@path id: UserAccountId): UserAccount | NotFoundError;
  
  /** Update user account */
  @put
  @route("/accounts/{id}")
  updateUserAccount(@path id: UserAccountId, @body request: UpdateUserAccountRequest): UserAccount | NotFoundError | ValidationError;
  
  /** Delete user account (keeps identity and content) */
  @delete
  @route("/accounts/{id}")
  deleteUserAccount(@path id: UserAccountId): void | NotFoundError;
  
  /** Link user identity to account */
  @post
  @route("/accounts/{accountId}/link-identity")
  linkUserIdentity(@path accountId: UserAccountId, @body request: { userId: UserId }): UserProfileResponse | NotFoundError | ValidationError;
  
  // User Profile and Statistics
  
  /** Get complete user profile */
  @get
  @route("/profiles/{userId}")
  getUserProfile(@path userId: UserId): UserProfileResponse | NotFoundError;
  
  /** Get user learning statistics */
  @get
  @route("/profiles/{userId}/statistics")
  getUserStatistics(@path userId: UserId, @query period?: "day" | "week" | "month" | "all" = "all"): {
    ...UserStatistics;
    detailed: {
      dailyActivity: {
        date: string; // YYYY-MM-DD
        attempts: int32;
        correctRate: float32;
        timeSpent: int32; // minutes
      }[];
      topicPerformance: {
        topic: string;
        attempts: int32;
        correctRate: float32;
        improvement: float32; // percentage change
      }[];
      learningStreak: {
        current: int32;
        longest: int32;
        lastActiveDate: string;
      };
    };
  } | NotFoundError;
  
  // Answer History Management
  
  /** Get user's answer history */
  @get
  @route("/profiles/{userId}/attempts")
  getUserAttempts(
    @path userId: UserId,
    ...PaginationRequest,
    @query sessionId?: SessionId,
    @query quizId?: QuizId,
    @query isCorrect?: boolean,
    @query startDate?: string,
    @query endDate?: string
  ): AttemptHistoryResponse | NotFoundError;
  
  /** Get user's attempt statistics */
  @get
  @route("/profiles/{userId}/attempts/statistics")
  getUserAttemptStatistics(@path userId: UserId): AttemptStatistics | NotFoundError;
  
  /** Get wrong answers for review */
  @get
  @route("/profiles/{userId}/attempts/wrong")
  getWrongAttempts(
    @path userId: UserId,
    ...PaginationRequest,
    @query sinceDays?: int32 = 30,
    @query tags?: string[]
  ): AttemptHistoryResponse | NotFoundError;
  
  // Session Token Management (for device persistence)
  
  /** Refresh session token */
  @post
  @route("/sessions/refresh")
  refreshSessionToken(@body request: {
    userId: UserId;
    currentToken: string;
    deviceFingerprint: string;
  }): {
    newToken: string;
    expiresAt: UtcDateTime;
  } | UnauthorizedError | ValidationError;
  
  /** Validate session token */
  @post
  @route("/sessions/validate")
  validateSessionToken(@body request: {
    userId: UserId;
    token: string;
  }): {
    isValid: boolean;
    expiresAt?: UtcDateTime;
    userIdentity?: UserIdentity;
  } | ValidationError;
}