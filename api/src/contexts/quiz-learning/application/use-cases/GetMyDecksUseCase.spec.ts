import { describe, expect, it, vi } from "vitest";
import {
  createImmediateFailure,
  createImmediateSuccess,
} from "../../../../../tests/helpers/mock-helpers";
import { RepositoryErrorFactory } from "../../../../shared/errors";
import type { IUserIdentityResolver } from "../../../../shared/identity/IUserIdentityResolver";
import {
  CreatorId,
  Deck,
  DeckId,
  QuizId,
} from "../../domain/entities/deck/Deck";
import type { IDeckRepository } from "../../domain/repositories/IDeckRepository";
import { GetMyDecksUseCase } from "./GetMyDecksUseCase";

const buildDeck = (id: string) =>
  Deck.from({
    id: DeckId.parse(id),
    name: `Deck-${id}`,
    quizIds: [QuizId.parse("quiz-1")],
    creatorId: CreatorId.parse("42"),
    createdAt: "2023-12-01 10:00:00",
    lastModifiedAt: "2023-12-01 10:00:00",
  })._unsafeUnwrap();

describe("GetMyDecksUseCase", () => {
  it("fingerprintを解決し自分のDeck一覧を取得する", async () => {
    const deckRepository: IDeckRepository = {
      create: vi.fn(),
      findById: vi.fn(),
      findByCreator: vi.fn().mockReturnValue(
        createImmediateSuccess({
          items: [buildDeck("1"), buildDeck("2")],
          totalCount: 2,
          hasMore: false,
        }),
      ),
      update: vi.fn(),
      delete: vi.fn(),
    };
    const identityResolver: IUserIdentityResolver = {
      resolve: vi.fn().mockReturnValue(createImmediateSuccess("42")),
    };
    const useCase = new GetMyDecksUseCase(deckRepository, identityResolver);

    const result = await useCase.execute({
      creatorFingerprint: "some-fingerprint",
      limit: 20,
      offset: 0,
    });

    expect(result.isOk()).toBe(true);
    if (result.isOk()) {
      expect(result.value.items).toHaveLength(2);
      expect(result.value.totalCount).toBe(2);
      expect(result.value.hasMore).toBe(false);
    }
    expect(deckRepository.findByCreator).toHaveBeenCalledWith("42", {
      limit: 20,
      offset: 0,
    });
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
    const useCase = new GetMyDecksUseCase(deckRepository, identityResolver);

    const result = await useCase.execute({
      creatorFingerprint: "some-fingerprint",
      limit: 20,
      offset: 0,
    });

    expect(result.isErr()).toBe(true);
    expect(deckRepository.findByCreator).not.toHaveBeenCalled();
  });
});
