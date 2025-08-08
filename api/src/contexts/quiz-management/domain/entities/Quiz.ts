import type { components } from "../../../../shared/types";

// Quiz エンティティ
export class Quiz {
  constructor(
    public readonly id: string,
    public readonly question: string,
    public readonly answerType: components["schemas"]["AnswerType"],
    public readonly solutionId: string,
    public readonly explanation?: string,
    public readonly status: components["schemas"]["QuizStatus"] = "pending_approval",
    public readonly creatorId: string = "mock-user-id",
    public readonly createdAt: string = new Date().toISOString(),
    public readonly approvedAt?: string,
  ) {}

  // ビジネスロジックメソッドは将来追加
  public canBeUpdated(): boolean {
    return this.status === "pending_approval";
  }

  public canBeDeleted(): boolean {
    // publishedはまだ未実装のため、rejectedでない場合は削除可能とする
    return this.status !== "rejected";
  }

  public approve(_approverId: string): Quiz {
    return new Quiz(
      this.id,
      this.question,
      this.answerType,
      this.solutionId,
      this.explanation,
      "approved",
      this.creatorId,
      this.createdAt,
      new Date().toISOString(),
    );
  }
}
