import { describe, expect, it, vi } from "vitest";
import {
  createImmediateFailure,
  createImmediateSuccess,
} from "../../../../../tests/helpers/mock-helpers";
import { RepositoryErrorFactory } from "../../../../shared/errors";
import type { components } from "../../../../shared/types";
import type { IQuizRepository } from "../../../quiz-management/domain/repositories/IQuizRepository";
import {
  CreatorId,
  Deck,
  DeckId,
  QuizId,
} from "../../domain/entities/deck/Deck";
import type { IDeckRepository } from "../../domain/repositories/IDeckRepository";
import { GetDeckUseCase } from "./GetDeckUseCase";

const buildDeck = () =>
  Deck.from({
    id: DeckId.parse("1"),
    name: "テストDeck",
    quizIds: [QuizId.parse("quiz-1"), QuizId.parse("quiz-2")],
    creatorId: CreatorId.parse("42"),
    createdAt: "2023-12-01 10:00:00",
    lastModifiedAt: "2023-12-01 10:00:00",
  })._unsafeUnwrap();

const buildQuizResponse = (id: string): components["schemas"]["QuizResponse"] =>
  ({
    id,
    question: `question-${id}`,
    answerType: "boolean",
    solution: { type: "boolean", value: true },
    status: "approved",
    creatorId: "42",
    createdAt: "2023-12-01 10:00:00",
  }) as components["schemas"]["QuizResponse"];

const createDeckRepositoryStub = (
  overrides: Partial<IDeckRepository> = {},
): IDeckRepository => ({
  create: vi.fn(),
  findById: vi.fn(),
  findByCreator: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
  ...overrides,
});

describe("GetDeckUseCase", () => {
  it("Deckと紐づくQuizを取得しDeckWithQuizzesを返す", async () => {
    const deckRepository = createDeckRepositoryStub({
      findById: vi.fn().mockReturnValue(createImmediateSuccess(buildDeck())),
    });
    const quizRepository: IQuizRepository = {
      create: vi.fn(),
      findById: vi
        .fn()
        .mockImplementation((id: string) =>
          createImmediateSuccess(buildQuizResponse(id)),
        ),
      findMany: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };
    const useCase = new GetDeckUseCase(deckRepository, quizRepository);

    const result = await useCase.execute("1");

    expect(result.isOk()).toBe(true);
    if (result.isOk()) {
      expect(result.value.quizzes).toHaveLength(2);
      expect(result.value.totalQuizzes).toBe(2);
    }
  });

  it("存在しないQuizIdは結果から除外する（欠損を許容）", async () => {
    const deckRepository = createDeckRepositoryStub({
      findById: vi.fn().mockReturnValue(createImmediateSuccess(buildDeck())),
    });
    const quizRepository: IQuizRepository = {
      create: vi.fn(),
      findById: vi.fn().mockImplementation((id: string) => {
        if (id === "quiz-1") {
          return createImmediateSuccess(buildQuizResponse(id));
        }
        return createImmediateFailure(
          RepositoryErrorFactory.findFailed(
            "Quiz",
            new Error(`not found: ${id}`),
          ),
        );
      }),
      findMany: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };
    const useCase = new GetDeckUseCase(deckRepository, quizRepository);

    const result = await useCase.execute("1");

    expect(result.isOk()).toBe(true);
    if (result.isOk()) {
      expect(result.value.quizzes).toHaveLength(1);
      expect(result.value.totalQuizzes).toBe(1);
    }
  });

  it("Deckが見つからない場合はエラーを返す", async () => {
    const deckRepository = createDeckRepositoryStub({
      findById: vi
        .fn()
        .mockReturnValue(
          createImmediateFailure(RepositoryErrorFactory.findFailed("Deck")),
        ),
    });
    const quizRepository: IQuizRepository = {
      create: vi.fn(),
      findById: vi.fn(),
      findMany: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };
    const useCase = new GetDeckUseCase(deckRepository, quizRepository);

    const result = await useCase.execute("nonexistent");

    expect(result.isErr()).toBe(true);
    expect(quizRepository.findById).not.toHaveBeenCalled();
  });
});
