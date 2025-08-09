import "@typespec/http";
import "@typespec/rest";
import "../common/types.tsp";
import "../common/errors.tsp";
import "../models/quiz.tsp";
import "../models/tag.tsp";

using Http;
using Rest;

namespace YourQuizAPI;

// Search and Discovery API - Cross-cutting concern
@route("/api/search/v1")
@tag("Search & Discovery")
interface Search {
  
  // Quiz Search
  
  /** Search quizzes with advanced filters */
  @get
  @route("/quizzes")
  searchQuizzes(
    @query q?: string, // search query
    @query tags?: string[], // supports ~prefix for negation (e.g., "~beginner")
    @query difficulty?: string,
    @query answer_type?: AnswerType,
    @query creator_id?: UserId,
    @query min_correct_rate?: float32,
    @query max_correct_rate?: float32,
    @query created_after?: string, // ISO date
    @query created_before?: string, // ISO date
    @query sort?: string, // supports -prefix for desc order (e.g., "-created_date")
    ...PaginationRequest
  ): QuizListResponse;
  
  // Additional search features (commented out for initial release)
  // /** Get quiz search suggestions */
  // @get
  // @route("/quizzes/suggestions")
  // getQuizSuggestions(@query q: string, @query limit?: int32 = 10): {
  //   suggestions: string[];
  //   popularQueries: string[];
  //   trendingTopics: string[];
  // };
  // 
  // /** Get similar quizzes */
  // @get
  // @route("/quizzes/{id}/similar")
  // getSimilarQuizzes(@path id: QuizId, @query limit?: int32 = 10): {
  //   quizzes: QuizWithSolution[];
  //   similarity_scores: float32[];
  // } | NotFoundError;
  // 
  // /** Get recommended quizzes for user */
  // @get
  // @route("/quizzes/recommendations")
  // getRecommendedQuizzes(
  //   @query userId: UserId,
  //   @query limit?: int32 = 20,
  //   @query strategy?: "collaborative" | "content_based" | "hybrid" = "hybrid"
  // ): {
  //   quizzes: QuizWithSolution[];
  //   reasons: {
  //     quizId: QuizId;
  //     reason: "similar_topics" | "difficulty_match" | "popular" | "new_topics";
  //     confidence: float32;
  //   }[];
  // } | NotFoundError;
  
  // Tag Search and Management (commented out for initial release)
  // 
  // /** Search tags */
  // @get
  // @route("/tags")
  // searchTags(@body request: TagSearchRequest): TagListResponse;
  // 
  // /** Get tag hierarchy */
  // @get
  // @route("/tags/hierarchy")
  // getTagHierarchy(
  //   @query rootTagId?: TagId,
  //   @query depth?: int32 = 3,
  //   ...PaginationRequest
  // ): TagHierarchyResponse;
  // 
  // /** Get tag usage statistics */
  // @get
  // @route("/tags/statistics")
  // getTagStatistics(
  //   @query period?: "day" | "week" | "month" = "month",
  //   @query minUsage?: int32 = 1,
  //   ...PaginationRequest
  // ): TagStatisticsResponse;
  // 
  // /** Get popular tags */
  // @get
  // @route("/tags/popular")
  // getPopularTags(@query limit?: int32 = 50, @query period?: "day" | "week" | "month" = "week"): {
  //   tags: Tag[];
  //   usageCounts: int32[];
  //   growthRates: float32[];
  // };
  // 
  // /** Create new tag */
  // @post
  // @route("/tags")
  // createTag(@body request: CreateTagRequest): CreateTagResponse | ValidationError | ConflictError;
  // 
  // /** Update tag (creator or admin only) */
  // @put
  // @route("/tags/{id}")
  // updateTag(@path id: TagId, @body request: UpdateTagRequest): Tag | NotFoundError | ForbiddenError | ValidationError;
  // 
  // /** Create tag relation */
  // @post
  // @route("/tags/relations")
  // createTagRelation(@body request: CreateTagRelationRequest): TagRelation | ValidationError | ConflictError;
  
  // Analytics and Insights (commented out for initial release)
  // 
  // /** Get search analytics */
  // @get
  // @route("/analytics/search")
  // getSearchAnalytics(
  //   @query period?: "day" | "week" | "month" = "week",
  //   @query userId?: UserId
  // ): {
  //   topQueries: {
  //     query: string;
  //     count: int32;
  //     successRate: float32; // percentage of searches that led to quiz attempts
  //   }[];
  //   topTags: {
  //     tag: string;
  //     searchCount: int32;
  //     clickThroughRate: float32;
  //   }[];
  //   searchTrends: {
  //     date: string;
  //     totalSearches: int32;
  //     uniqueUsers: int32;
  //     avgResultsPerSearch: float32;
  //   }[];
  //   popularFilters: {
  //     filter: string;
  //     usageCount: int32;
  //     usagePercentage: float32;
  //   }[];
  // };
  // 
  // /** Get content discovery insights */
  // @get
  // @route("/analytics/discovery")
  // getDiscoveryInsights(
  //   @query userId?: UserId,
  //   @query period?: "day" | "week" | "month" = "week"
  // ): {
  //   discoveryPaths: {
  //     path: string[]; // e.g., ["search", "similar", "attempt"]
  //     count: int32;
  //     conversionRate: float32;
  //   }[];
  //   contentPerformance: {
  //     quizId: QuizId;
  //     views: int32;
  //     attempts: int32;
  //     completionRate: float32;
  //     avgRating: float32;
  //   }[];
  //   userBehavior: {
  //     avgSearchesPerSession: float32;
  //     avgTimeToFirstAttempt: int32; // seconds
  //     commonSearchPatterns: string[];
  //   };
  // };
}