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
import { CreateDeckUseCase } from "./CreateDeckUseCase";

const buildDeck = () =>
  Deck.from({
    id: DeckId.parse("1"),
    name: "テストDeck",
    quizIds: [QuizId.parse("quiz-1")],
    creatorId: CreatorId.parse("42"),
    createdAt: "2023-12-01 10:00:00",
    lastModifiedAt: "2023-12-01 10:00:00",
  })._unsafeUnwrap();

describe("CreateDeckUseCase", () => {
  it("fingerprintを解決しDeckを作成する", async () => {
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
    const useCase = new CreateDeckUseCase(deckRepository, identityResolver);

    const result = await useCase.execute({
      name: "テストDeck",
      quizIds: ["quiz-1"],
      creatorFingerprint: "some-fingerprint",
    });

    expect(result.isOk()).toBe(true);
    if (result.isOk()) {
      expect(result.value.name).toBe("テストDeck");
    }
    expect(identityResolver.resolve).toHaveBeenCalledWith("some-fingerprint");
    expect(deckRepository.create).toHaveBeenCalled();
  });

  it("quizIdsが空の場合はエラーを返す", async () => {
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
    const useCase = new CreateDeckUseCase(deckRepository, identityResolver);

    const result = await useCase.execute({
      name: "テストDeck",
      quizIds: [],
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
    const useCase = new CreateDeckUseCase(deckRepository, identityResolver);

    const result = await useCase.execute({
      name: "テストDeck",
      quizIds: ["quiz-1"],
      creatorFingerprint: "some-fingerprint",
    });

    expect(result.isErr()).toBe(true);
    expect(deckRepository.create).not.toHaveBeenCalled();
  });

  it("リポジトリ作成に失敗した場合はエラーを返す", async () => {
    const deckRepository: IDeckRepository = {
      create: vi
        .fn()
        .mockReturnValue(
          createImmediateFailure(RepositoryErrorFactory.createFailed("Deck")),
        ),
      findById: vi.fn(),
      findByCreator: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };
    const identityResolver: IUserIdentityResolver = {
      resolve: vi.fn().mockReturnValue(createImmediateSuccess("42")),
    };
    const useCase = new CreateDeckUseCase(deckRepository, identityResolver);

    const result = await useCase.execute({
      name: "テストDeck",
      quizIds: ["quiz-1"],
      creatorFingerprint: "some-fingerprint",
    });

    expect(result.isErr()).toBe(true);
  });
});
