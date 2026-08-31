import { okAsync } from "neverthrow";
import { describe, expect, test, vi } from "vitest";
import type { components } from "../../../../shared/types";
import type { IQuizRepository } from "../../domain/repositories/IQuizRepository";
import type { ListQuizzesQuery } from "../schemas/list-quizzes-query.schema";
import { GetQuizUseCase } from "./GetQuizUseCase";
import { ListQuizzesUseCase } from "./ListQuizzesUseCase";

/**
 * 非公開ステータス（draft / pending_approval / rejected）の可視性
 *
 * ADR-0029 で draft を追加したことで、一覧・単体取得に認可が無いままだと
 * 他人の下書きが匿名で列挙・閲覧できてしまう。`quiz-management.tsp` の doc
 * は「一般ユーザー: 承認済みのみ / 作成者: 自身の全ステータス」と定めており、
 * 契約に実装を合わせる。
 */

const OWNER = "owner-fingerprint";
const OTHER = "other-fingerprint";

function createQuizResponse(
  overrides: Partial<components["schemas"]["QuizResponse"]> = {},
): components["schemas"]["QuizResponse"] {
  return {
    id: "1",
    question: "TypeScriptはJavaScriptのスーパーセットである",
    answerType: "boolean",
    solutionId: "10",
    status: "approved",
    creatorId: OWNER,
    createdAt: "2024-01-01T00:00:00Z",
    solution: { type: "boolean", id: "10", value: true },
    ...overrides,
  };
}

function createRepository(
  overrides: Record<string, unknown> = {},
): IQuizRepository {
  return {
    findById: vi.fn(() => okAsync(createQuizResponse())),
    findMany: vi.fn(() =>
      okAsync({ items: [], totalCount: 0, hasMore: false }),
    ),
    ...overrides,
  } as unknown as IQuizRepository;
}

const baseQuery = (
  overrides: Partial<ListQuizzesQuery> = {},
): ListQuizzesQuery =>
  ({
    status: ["approved", "published"],
    limit: 10,
    offset: 0,
    ...overrides,
  }) as ListQuizzesQuery;

describe("非公開ステータスの可視性", () => {
  describe("ListQuizzesUseCase", () => {
    test("非公開ステータスを要求すると本人のクイズに限定される", async () => {
      // Arrange
      const findMany = vi.fn(() =>
        okAsync({ items: [], totalCount: 0, hasMore: false }),
      );
      const useCase = new ListQuizzesUseCase(createRepository({ findMany }));

      // Act
      await useCase.execute(baseQuery({ status: ["draft"] }), OWNER);

      // Assert: creatorIdの強制が無いと ?status=draft で全員の下書きが列挙できる
      expect(findMany).toHaveBeenCalledWith(
        expect.objectContaining({ creatorId: OWNER }),
      );
    });

    test("他人のcreatorIdを指定して非公開ステータスを覗こうとしても本人に上書きされる", async () => {
      // Arrange
      const findMany = vi.fn(() =>
        okAsync({ items: [], totalCount: 0, hasMore: false }),
      );
      const useCase = new ListQuizzesUseCase(createRepository({ findMany }));

      // Act
      await useCase.execute(
        baseQuery({ status: ["rejected"], creatorId: OTHER }),
        OWNER,
      );

      // Assert
      expect(findMany).toHaveBeenCalledWith(
        expect.objectContaining({ creatorId: OWNER }),
      );
    });

    test("公開ステータスのみの要求では絞り込みを強制しない", async () => {
      // Arrange
      const findMany = vi.fn(() =>
        okAsync({ items: [], totalCount: 0, hasMore: false }),
      );
      const useCase = new ListQuizzesUseCase(createRepository({ findMany }));

      // Act
      await useCase.execute(
        baseQuery({ status: ["approved", "published"] }),
        OWNER,
      );

      // Assert: 公開済みは誰でも見られる
      expect(findMany).toHaveBeenCalledWith(
        expect.not.objectContaining({ creatorId: expect.anything() }),
      );
    });
  });

  describe("GetQuizUseCase", () => {
    test("他人の下書きは404を返す", async () => {
      // Arrange
      const repository = createRepository({
        findById: vi.fn(() =>
          okAsync(createQuizResponse({ status: "draft", creatorId: OWNER })),
        ),
      });
      const useCase = new GetQuizUseCase(repository);

      // Act
      const result = await useCase.execute("1", OTHER);

      // Assert: 403だと存在自体が漏れるため404にする
      expect(result.isErr()).toBe(true);
      if (result.isErr()) {
        expect(result.error.code).toBe(404);
      }
    });

    test("自分の下書きは取得できる", async () => {
      // Arrange
      const repository = createRepository({
        findById: vi.fn(() =>
          okAsync(createQuizResponse({ status: "draft", creatorId: OWNER })),
        ),
      });
      const useCase = new GetQuizUseCase(repository);

      // Act
      const result = await useCase.execute("1", OWNER);

      // Assert
      expect(result.isOk()).toBe(true);
    });

    test("公開済みクイズは作成者以外でも取得できる", async () => {
      // Arrange
      const repository = createRepository({
        findById: vi.fn(() =>
          okAsync(
            createQuizResponse({ status: "published", creatorId: OWNER }),
          ),
        ),
      });
      const useCase = new GetQuizUseCase(repository);

      // Act
      const result = await useCase.execute("1", OTHER);

      // Assert
      expect(result.isOk()).toBe(true);
    });
  });
});
