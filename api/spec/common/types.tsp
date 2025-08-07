import "@typespec/http";

namespace YourQuizAPI;

// Scalar types for type safety
scalar UserId extends string;
scalar UserAccountId extends string;
scalar QuizId extends string;
scalar SolutionId extends string;
scalar AnswerId extends string;
scalar AttemptId extends string;
scalar DeckId extends string;
scalar SessionId extends string;
scalar TagId extends string;
scalar TagRelationId extends string;
scalar QuizTagId extends string;
scalar ChoiceId extends string;

// Timestamp scalar
scalar UtcDateTime extends string;

// Common enums
enum AnswerType {
  boolean: "boolean",
  free_text: "free_text", 
  single_choice: "single_choice",
  multiple_choice: "multiple_choice"
}

enum QuizStatus {
  pending_approval: "pending_approval",
  approved: "approved",
  rejected: "rejected"
}

enum TagType {
  official: "official",
  user: "user"
}

enum RelationType {
  hierarchy: "hierarchy",
  category: "category", 
  synonym: "synonym",
  related: "related"
}

enum MatchingStrategy {
  exact: "exact",
  partial: "partial",
  regex: "regex"
}

// Pagination types
model PaginationRequest {
  limit?: int32 = 20;
  offset?: int32 = 0;
  continuationToken?: string;
}

model PaginationResponse<T> {
  items: T[];
  totalCount: int32;
  hasMore: boolean;
  continuationToken?: string;
}