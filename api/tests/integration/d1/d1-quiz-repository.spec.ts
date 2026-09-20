import { env } from "cloudflare:test";
import { beforeEach, describe, expect, it } from "vitest";
import { CreatorId } from "../../../src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary";
import type { NewQuiz } from "../../../src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema";
import { D1QuizRepository } from "../../../src/contexts/quiz-management/infrastructure/repositories/D1QuizRepository";
import type { components } from "../../../src/shared/types";

/**
 * D1QuizRepository の実D1に対する統合テスト
 *
 * `vitest.bdd.d1.config.ts`（`wrangler dev` + PactumJS）はHTTP経由で叩くため
 * Identity解決（Phase 4-5、ADR-0030）が無いと `POST /quizzes` がFK違反で
 * 500になり、`D1QuizRepository.create/delete` を一度も通せない。ここでは
 * ミドルウェアもHTTPも経由せず `D1QuizRepository` を直接呼び出すことで、
 * 有効な `UserIdentity.id` をテスト内でSQLから直接用意し、create/delete/
 * batchの原子性まで実機で検証する。
 */

/** テスト内で有効な creator_id（UserIdentity.id）を1件作る */
async function createUserIdentity(anonymousId: string): Promise<string> {
  const result = await env.DB.prepare(
    "INSERT INTO UserIdentity (anonymous_id) VALUES (?) RETURNING id",
  )
    .bind(anonymousId)
    .first<{ id: number }>();
  if (!result) throw new Error("Failed to seed UserIdentity for test");
  return String(result.id);
}

function buildNewQuiz(overrides: {
  answerType: components["schemas"]["AnswerType"];
  creatorId: string;
  status?: "draft" | "pending_approval";
}): NewQuiz {
  return {
    question: "統合テスト用の質問",
    answerType: overrides.answerType,
    status: overrides.status ?? "draft",
    creatorId: CreatorId.parse(overrides.creatorId),
    createdAt: "2026-09-20 00:00:00",
  };
}

const booleanSolution: components["schemas"]["SolutionCreate"] = {
  type: "boolean",
  value: true,
};

const freeTextSolution: components["schemas"]["SolutionCreate"] = {
  type: "free_text",
  correctAnswer: "answer",
  matchingStrategy: "exact",
  caseSensitive: false,
};

const singleChoiceSolution: components["schemas"]["SolutionCreate"] = {
  type: "single_choice",
  choices: [
    { text: "a", orderIndex: 0, isCorrect: false },
    { text: "b", orderIndex: 1, isCorrect: true },
  ],
};

const multipleChoiceSolution: components["schemas"]["SolutionCreate"] = {
  type: "multiple_choice",
  minCorrectAnswers: 1,
  choices: [
    { text: "a", orderIndex: 0, isCorrect: true },
    { text: "b", orderIndex: 1, isCorrect: true },
  ],
};

describe("D1QuizRepository（実D1）", () => {
  let repository: D1QuizRepository;
  let creatorId: string;

  beforeEach(async () => {
    repository = new D1QuizRepository(env.DB);
    creatorId = await createUserIdentity(`test-${crypto.randomUUID()}`);
  });

  describe("create", () => {
    it.each([
      { answerType: "boolean", solution: booleanSolution },
      { answerType: "free_text", solution: freeTextSolution },
      { answerType: "single_choice", solution: singleChoiceSolution },
      { answerType: "multiple_choice", solution: multipleChoiceSolution },
    ] as const)(
      "$answerType形式を作成でき、IDはDBが採番する",
      async ({ answerType, solution }) => {
        const result = await repository.create(
          buildNewQuiz({ answerType, creatorId }),
          solution,
        );

        expect(result.isOk()).toBe(true);
        if (!result.isOk()) return;

        // Act & Assert: IDはDBのAUTOINCREMENTに任せている(issue #76)。
        // Date.now()由来の文字列ではなく、素直な整数文字列であること
        expect(result.value.get("id")).toMatch(/^\d+$/);
        expect(result.value.get("creatorId")).toBe(creatorId);

        if (
          answerType === "single_choice" ||
          answerType === "multiple_choice"
        ) {
          // single_choiceの INSERT INTO SingleChoiceSolution DEFAULT VALUES
          // が通っていること(旧 () VALUES () 構文の回帰防止)は、ここで
          // Choiceがquiz_id付きで作成されていることで裏付けられる
          const choices = await env.DB.prepare(
            "SELECT quiz_id FROM Choice WHERE quiz_id = ?",
          )
            .bind(Number(result.value.get("id")))
            .all<{ quiz_id: number }>();

          expect(choices.results.length).toBe(2);
          for (const choice of choices.results) {
            expect(choice.quiz_id).toBe(Number(result.value.get("id")));
          }
        }
      },
    );
  });

  describe("create の原子性", () => {
    it("FK違反でQuizの挿入が失敗したとき、同じbatch内で先に作られたsolution行も残らない", async () => {
      const before = await env.DB.prepare(
        "SELECT COUNT(*) AS count FROM BooleanSolution",
      ).first<{ count: number }>();

      // Arrange: 存在しないcreatorIdでcreator_idのFK制約に違反させる
      const invalidQuiz = buildNewQuiz({
        answerType: "boolean",
        creatorId: "999999999",
      });

      const result = await repository.create(invalidQuiz, booleanSolution);

      expect(result.isErr()).toBe(true);

      const after = await env.DB.prepare(
        "SELECT COUNT(*) AS count FROM BooleanSolution",
      ).first<{ count: number }>();

      // Assert: batchが単一トランザクションとして振る舞うなら、Quizの
      // INSERT失敗で先行したBooleanSolutionのINSERTもロールバックされる
      // (ADR-0030 リスク表: 本番D1のbatchがトランザクションでない可能性)
      expect(after?.count).toBe(before?.count);
    });
  });

  describe("findById", () => {
    it("D1の数値/0-1の行を文字列/booleanに変換して返す", async () => {
      const created = await repository.create(
        buildNewQuiz({ answerType: "boolean", creatorId }),
        booleanSolution,
      );
      expect(created.isOk()).toBe(true);
      if (!created.isOk()) return;

      const result = await repository.findById(created.value.get("id"));

      expect(result.isOk()).toBe(true);
      if (!result.isOk()) return;
      expect(typeof result.value.id).toBe("string");
      expect(typeof result.value.creatorId).toBe("string");
      expect(result.value.solution).toEqual({
        type: "boolean",
        id: result.value.solutionId,
        value: true,
      });
    });
  });

  describe("delete", () => {
    it("選択肢型を削除すると、quiz_id基準でChoiceとsolution行が消え、他クイズの選択肢は無傷", async () => {
      const other = await repository.create(
        buildNewQuiz({ answerType: "single_choice", creatorId }),
        singleChoiceSolution,
      );
      const target = await repository.create(
        buildNewQuiz({ answerType: "single_choice", creatorId }),
        singleChoiceSolution,
      );
      expect(other.isOk() && target.isOk()).toBe(true);
      if (!other.isOk() || !target.isOk()) return;

      const deleteResult = await repository.delete(target.value.get("id"));
      expect(deleteResult.isOk()).toBe(true);

      const remainingChoices = await env.DB.prepare(
        "SELECT COUNT(*) AS count FROM Choice WHERE quiz_id = ?",
      )
        .bind(Number(target.value.get("id")))
        .first<{ count: number }>();
      expect(remainingChoices?.count).toBe(0);

      const otherChoices = await env.DB.prepare(
        "SELECT COUNT(*) AS count FROM Choice WHERE quiz_id = ?",
      )
        .bind(Number(other.value.get("id")))
        .first<{ count: number }>();
      expect(otherChoices?.count).toBe(2);

      const otherStillFindable = await repository.findById(
        other.value.get("id"),
      );
      expect(otherStillFindable.isOk()).toBe(true);
    });
  });

  describe("solution_id衝突時の選択肢の非混在（S8）", () => {
    it("シード済みのsingle_choiceとmultiple_choiceでsolution_idが衝突していても、findByIdで選択肢が混ざらない", async () => {
      // Arrange: seed.sqlはquiz14(single_choice, solution_id=1)と
      // quiz20(multiple_choice, solution_id=1)を意図的に衝突させている
      // (ADR-0030, seed-consistency.spec.ts で衝突の存在を検証済み)
      const singleChoiceResult = await repository.findById("14");
      const multipleChoiceResult = await repository.findById("20");

      expect(singleChoiceResult.isOk()).toBe(true);
      expect(multipleChoiceResult.isOk()).toBe(true);
      if (!singleChoiceResult.isOk() || !multipleChoiceResult.isOk()) return;

      expect(singleChoiceResult.value.solution.type).toBe("single_choice");
      expect(multipleChoiceResult.value.solution.type).toBe("multiple_choice");

      const singleChoiceTexts =
        singleChoiceResult.value.solution.type === "single_choice"
          ? singleChoiceResult.value.solution.choices.map((c) => c.text)
          : [];
      const multipleChoiceTexts =
        multipleChoiceResult.value.solution.type === "multiple_choice"
          ? multipleChoiceResult.value.solution.choices.map((c) => c.text)
          : [];

      expect(singleChoiceTexts).toEqual(["const", "let", "var", "function"]);
      expect(multipleChoiceTexts).toEqual([
        "React",
        "Vue.js",
        "Angular",
        "jQuery",
      ]);
    });

    it("削除しても、solution_idが衝突している側のクイズには影響しない", async () => {
      // quiz14(single_choice)を削除しても、solution_idが同じ1を持つ
      // quiz20(multiple_choice)の選択肢は無傷であること
      const singleChoiceBefore = await repository.findById("14");
      expect(singleChoiceBefore.isOk()).toBe(true);

      // 削除対象専用の行を新規作成し、シードのquiz14自体は壊さない
      const created = await repository.create(
        buildNewQuiz({ answerType: "single_choice", creatorId }),
        singleChoiceSolution,
      );
      expect(created.isOk()).toBe(true);
      if (!created.isOk()) return;

      await repository.delete(created.value.get("id"));

      const multipleChoiceAfter = await repository.findById("20");
      expect(multipleChoiceAfter.isOk()).toBe(true);
      if (!multipleChoiceAfter.isOk()) return;
      expect(multipleChoiceAfter.value.solution.type).toBe("multiple_choice");
      if (multipleChoiceAfter.value.solution.type === "multiple_choice") {
        expect(multipleChoiceAfter.value.solution.choices).toHaveLength(4);
      }
    });
  });
});
