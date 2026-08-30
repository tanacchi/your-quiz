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
import type { IAttemptQueryRepository } from "../../domain/repositories/IAttemptQueryRepository";
import type { IDeckRepository } from "../../domain/repositories/IDeckRepository";
import { CreateDeckFromWrongAnswersUseCase } from "./CreateDeckFromWrongAnswersUseCase";

const buildDeck = () =>
  Deck.from({
    id: DeckId.parse("1"),
    name: "間違い問題集",
    quizIds: [QuizId.parse("quiz-1"), QuizId.parse("quiz-2")],
    creatorId: CreatorId.parse("42"),
    createdAt: "2023-12-01 10:00:00",
    lastModifiedAt: "2023-12-01 10:00:00",
  })._unsafeUnwrap();

describe("CreateDeckFromWrongAnswersUseCase", () => {
  it("間違えた問題からDeckを生成する", async () => {
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
    const attemptQueryRepository: IAttemptQueryRepository = {
      findWrongQuizIds: vi
        .fn()
        .mockReturnValue(createImmediateSuccess(["quiz-1", "quiz-2"])),
    };
    const useCase = new CreateDeckFromWrongAnswersUseCase(
      deckRepository,
      identityResolver,
      attemptQueryRepository,
    );

    const result = await useCase.execute({
      creatorFingerprint: "some-fingerprint",
      maxQuizzes: 50,
      sinceDays: 30,
    });

    expect(result.isOk()).toBe(true);
    expect(attemptQueryRepository.findWrongQuizIds).toHaveBeenCalledWith("42", {
      sinceDays: 30,
      maxQuizzes: 50,
    });
    expect(deckRepository.create).toHaveBeenCalled();
  });

  it("間違えた問題が1件もない場合はエラーを返す", async () => {
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
    const attemptQueryRepository: IAttemptQueryRepository = {
      findWrongQuizIds: vi.fn().mockReturnValue(createImmediateSuccess([])),
    };
    const useCase = new CreateDeckFromWrongAnswersUseCase(
      deckRepository,
      identityResolver,
      attemptQueryRepository,
    );

    const result = await useCase.execute({
      creatorFingerprint: "some-fingerprint",
      maxQuizzes: 50,
      sinceDays: 30,
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
    const attemptQueryRepository: IAttemptQueryRepository = {
      findWrongQuizIds: vi.fn(),
    };
    const useCase = new CreateDeckFromWrongAnswersUseCase(
      deckRepository,
      identityResolver,
      attemptQueryRepository,
    );

    const result = await useCase.execute({
      creatorFingerprint: "some-fingerprint",
      maxQuizzes: 50,
      sinceDays: 30,
    });

    expect(result.isErr()).toBe(true);
    expect(attemptQueryRepository.findWrongQuizIds).not.toHaveBeenCalled();
  });
});
