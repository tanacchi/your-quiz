import "@typespec/http";
import "../common/types.tsp";

namespace YourQuizAPI;

// User Account (deletable details)
model UserAccount {
  id: UserAccountId;
  name: string;
  email?: string;
  createdAt: UtcDateTime;
}

// User Identity (persistent anonymous identifier)
model UserIdentity {
  id: UserId;
  anonymousId: string;
  userAccountId?: UserAccountId;
  createdAt: UtcDateTime;
}

// Request/Response models for User operations
model CreateUserAccountRequest {
  name: string;
  email?: string;
}

model CreateUserAccountResponse {
  userAccount: UserAccount;
  userIdentity: UserIdentity;
}

model UpdateUserAccountRequest {
  name?: string;
  email?: string;
}

model UserProfileResponse {
  userAccount?: UserAccount;
  userIdentity: UserIdentity;
  statistics: UserStatistics;
}

model UserStatistics {
  totalQuizzes: int32;
  totalAttempts: int32;
  correctAnswers: int32;
  averageCorrectRate: float32;
  streak: int32;
}