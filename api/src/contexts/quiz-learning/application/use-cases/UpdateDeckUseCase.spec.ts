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
import { UpdateDeckUseCase } from "./UpdateDeckUseCase";

const buildDeck = (creatorId = "42") =>
  Deck.from({
    id: DeckId.parse("1"),
    name: "テストDeck",
    quizIds: [QuizId.parse("quiz-1")],
    creatorId: CreatorId.parse(creatorId),
    createdAt: "2023-12-01 10:00:00",
    lastModifiedAt: "2023-12-01 10:00:00",
  })._unsafeUnwrap();

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

describe("UpdateDeckUseCase", () => {
  it("所有者本人であればDeckを更新できる", async () => {
    const updatedDeck = Deck.from({
      id: DeckId.parse("1"),
      name: "更新後の名前",
      quizIds: [QuizId.parse("quiz-1")],
      creatorId: CreatorId.parse("42"),
      createdAt: "2023-12-01 10:00:00",
      lastModifiedAt: "2023-12-01 11:00:00",
    })._unsafeUnwrap();

    const deckRepository = createDeckRepositoryStub({
      findById: vi.fn().mockReturnValue(createImmediateSuccess(buildDeck())),
      update: vi.fn().mockReturnValue(createImmediateSuccess(updatedDeck)),
    });
    const identityResolver: IUserIdentityResolver = {
      resolve: vi.fn().mockReturnValue(createImmediateSuccess("42")),
    };
    const useCase = new UpdateDeckUseCase(deckRepository, identityResolver);

    const result = await useCase.execute("1", {
      name: "更新後の名前",
      creatorFingerprint: "fingerprint-of-42",
    });

    expect(result.isOk()).toBe(true);
    if (result.isOk()) {
      expect(result.value.name).toBe("更新後の名前");
    }
  });

  it("所有者でない場合はForbiddenErrorを返す", async () => {
    const deckRepository = createDeckRepositoryStub({
      findById: vi
        .fn()
        .mockReturnValue(createImmediateSuccess(buildDeck("42"))),
    });
    const identityResolver: IUserIdentityResolver = {
      resolve: vi.fn().mockReturnValue(createImmediateSuccess("99")),
    };
    const useCase = new UpdateDeckUseCase(deckRepository, identityResolver);

    const result = await useCase.execute("1", {
      name: "更新後の名前",
      creatorFingerprint: "fingerprint-of-99",
    });

    expect(result.isErr()).toBe(true);
    expect(deckRepository.update).not.toHaveBeenCalled();
  });

  it("Deckが見つからない場合はエラーを返す", async () => {
    const deckRepository = createDeckRepositoryStub({
      findById: vi
        .fn()
        .mockReturnValue(
          createImmediateFailure(RepositoryErrorFactory.findFailed("Deck")),
        ),
    });
    const identityResolver: IUserIdentityResolver = {
      resolve: vi.fn().mockReturnValue(createImmediateSuccess("42")),
    };
    const useCase = new UpdateDeckUseCase(deckRepository, identityResolver);

    const result = await useCase.execute("nonexistent", {
      name: "更新後の名前",
      creatorFingerprint: "fingerprint-of-42",
    });

    expect(result.isErr()).toBe(true);
  });
});
