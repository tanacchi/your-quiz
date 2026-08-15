import { beforeEach, describe, expect, test } from "vitest";
import {
  CreatorId,
  QuizId,
  QuizSummary,
  SolutionId,
} from "../../domain/entities/quiz-summary/QuizSummary";
import { TagIds } from "../../domain/entities/quiz-summary/quiz-summary-schema";
import { getSharedMockQuizStore, MockQuizStore } from "./MockQuizStore";

const buildQuiz = (id: string, overrides: { status?: string } = {}) =>
  QuizSummary.build({
    id: QuizId.parse(id),
    question: `Question ${id}`,
    answerType: "single_choice",
    solutionId: SolutionId.parse(`solution-${id}`),
    status: (overrides.status ?? "pending_approval") as never,
    creatorId: CreatorId.parse("creator-1"),
    createdAt: "2023-12-01 10:00:00",
    approvedAt:
      overrides.status === "approved" ? "2023-12-01 10:00:00" : undefined,
    tagIds: TagIds.parse([]),
  });

describe("MockQuizStore", () => {
  describe("constructor", () => {
    test("seedを渡すとそのデータで初期化される", () => {
      const seed = [buildQuiz("quiz-1")];
      const store = new MockQuizStore(seed);

      expect(store.list()).toHaveLength(1);
      expect(store.list()[0]?.get("id")).toBe("quiz-1");
    });

    test("seedを渡さない場合はデフォルトフィクスチャで初期化される", () => {
      const store = new MockQuizStore();
      expect(store.list().length).toBeGreaterThan(0);
    });
  });

  describe("add", () => {
    test("クイズを追加するとlistに反映される", () => {
      const store = new MockQuizStore([]);
      store.add(buildQuiz("quiz-1"));

      expect(store.list()).toHaveLength(1);
      expect(store.list()[0]?.get("id")).toBe("quiz-1");
    });
  });

  describe("findById", () => {
    let store: MockQuizStore;

    beforeEach(() => {
      store = new MockQuizStore([buildQuiz("quiz-1"), buildQuiz("quiz-2")]);
    });

    test("存在するIDのクイズを返す", () => {
      const found = store.findById("quiz-2");
      expect(found?.get("id")).toBe("quiz-2");
    });

    test("存在しないIDはundefinedを返す", () => {
      expect(store.findById("nonexistent")).toBeUndefined();
    });
  });

  describe("replace", () => {
    let store: MockQuizStore;

    beforeEach(() => {
      store = new MockQuizStore([buildQuiz("quiz-1")]);
    });

    test("存在するIDを置き換えるとtrueを返し内容が更新される", () => {
      const updated = buildQuiz("quiz-1", { status: "approved" });
      const result = store.replace("quiz-1", updated);

      expect(result).toBe(true);
      expect(store.findById("quiz-1")?.get("status")).toBe("approved");
    });

    test("存在しないIDはfalseを返し何も変更しない", () => {
      const result = store.replace("nonexistent", buildQuiz("nonexistent"));

      expect(result).toBe(false);
      expect(store.list()).toHaveLength(1);
    });
  });

  describe("remove", () => {
    let store: MockQuizStore;

    beforeEach(() => {
      store = new MockQuizStore([buildQuiz("quiz-1"), buildQuiz("quiz-2")]);
    });

    test("存在するIDを削除するとtrueを返しlistから消える", () => {
      const result = store.remove("quiz-1");

      expect(result).toBe(true);
      expect(store.list()).toHaveLength(1);
      expect(store.findById("quiz-1")).toBeUndefined();
    });

    test("存在しないIDはfalseを返し何も変更しない", () => {
      const result = store.remove("nonexistent");

      expect(result).toBe(false);
      expect(store.list()).toHaveLength(2);
    });
  });

  describe("reset", () => {
    test("指定したseedで内容を置き換える", () => {
      const store = new MockQuizStore([buildQuiz("quiz-1")]);
      store.reset([buildQuiz("quiz-2"), buildQuiz("quiz-3")]);

      expect(store.list()).toHaveLength(2);
      expect(store.findById("quiz-1")).toBeUndefined();
      expect(store.findById("quiz-2")).toBeDefined();
    });
  });

  describe("getSharedMockQuizStore", () => {
    test("複数回呼び出しても同一インスタンスを返す", () => {
      const first = getSharedMockQuizStore();
      const second = getSharedMockQuizStore();

      expect(first).toBe(second);
    });

    test("一方への追加がもう一方からも見える(同一インスタンスであることの確認)", () => {
      const store = getSharedMockQuizStore();
      const before = store.list().length;
      store.add(buildQuiz(`shared-${before}`));

      expect(getSharedMockQuizStore().list()).toHaveLength(before + 1);
    });
  });
});
