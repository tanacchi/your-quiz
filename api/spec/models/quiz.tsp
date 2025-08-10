import "@typespec/http";
import "../common/types.tsp";

namespace YourQuizAPI;

// Base Quiz model
@example(#{
  id: "quiz-001",
  question: "JavaScriptで配列の最後に要素を追加するメソッドは？",
  answerType: AnswerType.single_choice,
  solutionId: "solution-001",
  explanation: "push()メソッドは配列の末尾に1つ以上の要素を追加し、配列の新しい長さを返します。",
  status: QuizStatus.approved,
  creatorId: "user-123",
  createdAt: "2024-01-15T10:30:00Z",
  approvedAt: "2024-01-16T09:15:00Z"
})
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

@example(#{
  type: "boolean",
  id: "solution-bool-001",
  value: true
})
model BooleanSolution {
  type: "boolean";
  id: SolutionId;
  value: boolean;
}

@example(#{
  type: "free_text",
  id: "solution-text-001",
  correctAnswer: "React",
  matchingStrategy: MatchingStrategy.exact,
  caseSensitive: false
})
model FreeTextSolution {
  type: "free_text";
  id: SolutionId;
  correctAnswer: string;
  matchingStrategy: MatchingStrategy = MatchingStrategy.exact;
  caseSensitive: boolean = false;
}

@example(#{
  type: "single_choice",
  id: "solution-001",
  choices: #[
    #{
      id: "choice-a",
      solutionId: "solution-001",
      text: "push()",
      orderIndex: 0,
      isCorrect: true
    },
    #{
      id: "choice-b", 
      solutionId: "solution-001",
      text: "pop()",
      orderIndex: 1,
      isCorrect: false
    },
    #{
      id: "choice-c",
      solutionId: "solution-001", 
      text: "shift()",
      orderIndex: 2,
      isCorrect: false
    }
  ]
})
model SingleChoiceSolution {
  type: "single_choice";
  id: SolutionId;
  choices: Choice[];
}

@example(#{
  type: "multiple_choice",
  id: "solution-multi-001",
  minCorrectAnswers: 2,
  choices: #[
    #{
      id: "choice-a",
      solutionId: "solution-multi-001",
      text: "HTML",
      orderIndex: 0,
      isCorrect: true
    },
    #{
      id: "choice-b",
      solutionId: "solution-multi-001", 
      text: "Java",
      orderIndex: 1,
      isCorrect: false
    },
    #{
      id: "choice-c",
      solutionId: "solution-multi-001",
      text: "CSS", 
      orderIndex: 2,
      isCorrect: true
    }
  ]
})
model MultipleChoiceSolution {
  type: "multiple_choice";
  id: SolutionId;
  minCorrectAnswers: int32 = 1;
  choices: Choice[];
}

@example(#{
  id: "choice-a",
  solutionId: "solution-001",
  text: "push()",
  orderIndex: 0,
  isCorrect: true
})
model Choice {
  id: ChoiceId;
  solutionId: SolutionId;
  text: string;
  orderIndex: int32;
  isCorrect: boolean;
}

// Quiz with solution (denormalized for API responses)
@example(#{
  id: "quiz-001",
  question: "JavaScriptで配列の最後に要素を追加するメソッドは？",
  answerType: AnswerType.single_choice,
  solutionId: "solution-001",
  explanation: "push()メソッドは配列の末尾に1つ以上の要素を追加し、配列の新しい長さを返します。",
  status: QuizStatus.approved,
  creatorId: "user-123",
  createdAt: "2024-01-15T10:30:00Z",
  approvedAt: "2024-01-16T09:15:00Z",
  solution: #{
    type: "single_choice",
    id: "solution-001",
    choices: #[
      #{
        id: "choice-a",
        solutionId: "solution-001",
        text: "push()",
        orderIndex: 0,
        isCorrect: true
      },
      #{
        id: "choice-b",
        solutionId: "solution-001",
        text: "pop()",
        orderIndex: 1,
        isCorrect: false
      },
      #{
        id: "choice-c",
        solutionId: "solution-001",
        text: "shift()",
        orderIndex: 2,
        isCorrect: false
      }
    ]
  },
  tags: #["javascript", "配列", "初級"]
})
model QuizWithSolution {
  ...Quiz;
  solution: Solution;
  tags?: string[];
}

// Request/Response models
@example(#{
  question: "Pythonでリストの長さを取得する関数は？",
  answerType: AnswerType.free_text,
  solution: #{
    type: "free_text",
    id: "solution-text-002",
    correctAnswer: "len",
    matchingStrategy: MatchingStrategy.exact,
    caseSensitive: false
  },
  explanation: "len()関数はシーケンス型（リスト、タプル、文字列など）の長さを返します。",
  tags: #["python", "関数", "初級"]
})
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

@example(#{
  question: "HTMLの段落を表すタグはどれですか？（修正版）",
  explanation: "pタグはparagraphの略で、HTMLで段落を表現するために使用します。段落間には自動的にマージンが設定されます。",
  tags: #["html", "基礎", "初級", "マークアップ"]
})
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