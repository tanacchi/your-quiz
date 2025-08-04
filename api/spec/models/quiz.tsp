import "@typespec/http";
import "../common/types.tsp";

namespace YourQuizAPI;

// Base Quiz model
model Quiz {
  id: QuizId;
  question: string;
  answerType: AnswerType;
  solutionId: SolutionId;
  explanation?: string;
  status: QuizStatus;
  creatorId: UserId;
  createdAt: UtcDateTime;
  approvedAt?: UtcDateTime;
}

// Solution models (polymorphic)
union Solution {
  BooleanSolution,
  FreeTextSolution,
  SingleChoiceSolution,
  MultipleChoiceSolution
}

model BooleanSolution {
  type: "boolean";
  id: SolutionId;
  value: boolean;
}

model FreeTextSolution {
  type: "free_text";
  id: SolutionId;
  correctAnswer: string;
  matchingStrategy: MatchingStrategy = MatchingStrategy.exact;
  caseSensitive: boolean = false;
}

model SingleChoiceSolution {
  type: "single_choice";
  id: SolutionId;
  correctChoiceId: ChoiceId;
  choices: Choice[];
}

model MultipleChoiceSolution {
  type: "multiple_choice";
  id: SolutionId;
  correctChoiceIds: ChoiceId[];
  minCorrectAnswers: int32 = 1;
  choices: Choice[];
}

model Choice {
  id: ChoiceId;
  solutionId: SolutionId;
  text: string;
  orderIndex: int32;
}

// Quiz with solution (denormalized for API responses)
model QuizWithSolution {
  ...Quiz;
  solution: Solution;
  tags?: string[];
}

// Request/Response models
model CreateQuizRequest {
  question: string;
  answerType: AnswerType;
  solution: Solution;
  explanation?: string;
  tags?: string[];
}

model CreateQuizResponse {
  quiz: Quiz;
  status: "pending_approval";
  estimatedApprovalDate?: UtcDateTime;
}

model UpdateQuizRequest {
  question?: string;
  explanation?: string;
  tags?: string[];
}

model QuizListResponse extends PaginationResponse<QuizWithSolution> {}

model ApprovalRequest {
  decision: "approved" | "rejected";
  reviewerNotes?: string;
  publishImmediately?: boolean = true;
}

model QuizSearchFilters {
  tags?: string[];
  difficulty?: string;
  answerType?: AnswerType;
  status?: QuizStatus = QuizStatus.approved;
  creatorId?: UserId;
}