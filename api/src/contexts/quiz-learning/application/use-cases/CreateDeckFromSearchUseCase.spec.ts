import { ok } from "neverthrow";
import { describe, expect, it, vi } from "vitest";
import {
  createImmediateFailure,
  createImmediateSuccess,
} from "../../../../../tests/helpers/mock-helpers";
import { RepositoryErrorFactory } from "../../../../shared/errors";
import type { IUserIdentityResolver } from "../../../../shared/identity/IUserIdentityResolver";
import type { SearchQuizzesUseCase } from "../../../search/application/use-cases/SearchQuizzesUseCase";
import {
  CreatorId,
  Deck,
  DeckId,
  QuizId,
} from "../../domain/entities/deck/Deck";
import type { IDeckRepository } from "../../domain/repositories/IDeckRepository";
import { CreateDeckFromSearchUseCase } from "./CreateDeckFromSearchUseCase";

const buildDeck = () =>
  Deck.from({
    id: DeckId.parse("1"),
    name: "検索結果集",
    quizIds: [QuizId.parse("quiz-1"), QuizId.parse("quiz-2")],
    creatorId: CreatorId.parse("42"),
    createdAt: "2023-12-01 10:00:00",
    lastModifiedAt: "2023-12-01 10:00:00",
  })._unsafeUnwrap();

describe("CreateDeckFromSearchUseCase", () => {
  it("検索結果からDeckを生成する", async () => {
    const deckRepository: IDeckRepository = {
      create: vi.fn().mockReturnValue(createImmediateSuccess(buildDeck())),
      findById: vi.fn(),
      findByCreator: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };
    const identityResolver: IUserIdentityResolver = {
      resolve: vi.fn().mockReturnValue(createImmediateSuccess("42")),
    };
    const searchQuizzesUseCase = {
      execute: vi.fn().mockResolvedValue(
        ok({
          items: [
            { id: "quiz-1", question: "q1" },
            { id: "quiz-2", question: "q2" },
          ],
          totalCount: 2,
          hasMore: false,
        }),
      ),
    } as unknown as SearchQuizzesUseCase;
    const useCase = new CreateDeckFromSearchUseCase(
      deckRepository,
      identityResolver,
      searchQuizzesUseCase,
    );

    const result = await useCase.execute({
      searchQuery: "JavaScript",
      maxQuizzes: 50,
      creatorFingerprint: "some-fingerprint",
    });

    expect(result.isOk()).toBe(true);
    expect(searchQuizzesUseCase.execute).toHaveBeenCalledWith(
      expect.objectContaining({ q: "JavaScript", limit: 50 }),
    );
    expect(deckRepository.create).toHaveBeenCalled();
  });

  it("検索結果が0件の場合はエラーを返す", async () => {
    const deckRepository: IDeckRepository = {
      create: vi.fn(),
      findById: vi.fn(),
      findByCreator: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };
    const identityResolver: IUserIdentityResolver = {
      resolve: vi.fn().mockReturnValue(createImmediateSuccess("42")),
    };
    const searchQuizzesUseCase = {
      execute: vi
        .fn()
        .mockResolvedValue(ok({ items: [], totalCount: 0, hasMore: false })),
    } as unknown as SearchQuizzesUseCase;
    const useCase = new CreateDeckFromSearchUseCase(
      deckRepository,
      identityResolver,
      searchQuizzesUseCase,
    );

    const result = await useCase.execute({
      searchQuery: "存在しないキーワード",
      maxQuizzes: 50,
      creatorFingerprint: "some-fingerprint",
    });

    expect(result.isErr()).toBe(true);
    expect(deckRepository.create).not.toHaveBeenCalled();
  });

  it("識別子解決に失敗した場合はエラーを返す", async () => {
    const deckRepository: IDeckRepository = {
      create: vi.fn(),
      findById: vi.fn(),
      findByCreator: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };
    const identityResolver: IUserIdentityResolver = {
      resolve: vi
        .fn()
        .mockReturnValue(
          createImmediateFailure(
            RepositoryErrorFactory.findFailed("UserIdentity"),
          ),
        ),
    };
    const searchQuizzesUseCase = {
      execute: vi.fn(),
    } as unknown as SearchQuizzesUseCase;
    const useCase = new CreateDeckFromSearchUseCase(
      deckRepository,
      identityResolver,
      searchQuizzesUseCase,
    );

    const result = await useCase.execute({
      searchQuery: "JavaScript",
      maxQuizzes: 50,
      creatorFingerprint: "some-fingerprint",
    });

    expect(result.isErr()).toBe(true);
    expect(searchQuizzesUseCase.execute).not.toHaveBeenCalled();
  });
});
