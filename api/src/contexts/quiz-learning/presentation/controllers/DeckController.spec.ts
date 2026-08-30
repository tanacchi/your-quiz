import { errAsync, okAsync } from "neverthrow";
import { describe, expect, it, vi } from "vitest";
import { DeckNotFoundError } from "../../domain/errors";
import { DeckController } from "./DeckController";

const createRequest = (body?: unknown) => {
  const req = {
    json: vi.fn().mockResolvedValue(body),
    param: vi.fn().mockReturnValue("1"),
    query: vi.fn().mockReturnValue(undefined),
  };
  return req;
};

const createContext = (options: {
  body?: unknown;
  userFingerprint?: string;
}) => {
  const req = createRequest(options.body);
  const json = vi.fn((data: unknown, status?: number) => ({
    data,
    status: status ?? 200,
  }));
  const body = vi.fn((data: unknown, status?: number) => ({
    data,
    status: status ?? 200,
  }));
  const c = {
    req,
    var: { userFingerprint: options.userFingerprint ?? "fp-1" },
    json,
    body,
  };
  return c as unknown as Parameters<DeckController["createDeck"]>[0] & {
    json: typeof json;
    body: typeof body;
    req: typeof req;
  };
};

const createUseCaseStubs = () => ({
  createDeckUseCase: { execute: vi.fn() },
  createDeckFromSearchUseCase: { execute: vi.fn() },
  createDeckFromWrongAnswersUseCase: { execute: vi.fn() },
  getDeckUseCase: { execute: vi.fn() },
  getMyDecksUseCase: { execute: vi.fn() },
  updateDeckUseCase: { execute: vi.fn() },
  deleteDeckUseCase: { execute: vi.fn() },
});

const buildController = (stubs: ReturnType<typeof createUseCaseStubs>) =>
  new DeckController(
    stubs.createDeckUseCase as never,
    stubs.createDeckFromSearchUseCase as never,
    stubs.createDeckFromWrongAnswersUseCase as never,
    stubs.getDeckUseCase as never,
    stubs.getMyDecksUseCase as never,
    stubs.updateDeckUseCase as never,
    stubs.deleteDeckUseCase as never,
  );

describe("DeckController", () => {
  describe("createDeck", () => {
    it("成功時は200でdeckをラップして返す", async () => {
      const stubs = createUseCaseStubs();
      stubs.createDeckUseCase.execute.mockReturnValue(
        okAsync({ id: "1", name: "テストDeck" }),
      );
      const controller = buildController(stubs);
      const c = createContext({
        body: { quizIds: ["quiz-1"], source: "manual_selection" },
        userFingerprint: "fp-42",
      });

      const response = await controller.createDeck(c);

      expect(response).toEqual({
        data: { deck: { id: "1", name: "テストDeck" } },
        status: 200,
      });
      expect(stubs.createDeckUseCase.execute).toHaveBeenCalledWith(
        expect.objectContaining({ creatorFingerprint: "fp-42" }),
      );
    });

    it("バリデーション失敗時はUseCaseを呼ばずエラーを返す", async () => {
      const stubs = createUseCaseStubs();
      const controller = buildController(stubs);
      const c = createContext({ body: { quizIds: [] } });

      const response = await controller.createDeck(c);

      expect(stubs.createDeckUseCase.execute).not.toHaveBeenCalled();
      expect(response.status).toBe(400);
    });
  });

  describe("getDeck", () => {
    it("成功時はDeckWithQuizzesをそのまま返す", async () => {
      const stubs = createUseCaseStubs();
      stubs.getDeckUseCase.execute.mockReturnValue(
        okAsync({ id: "1", quizzes: [] }),
      );
      const controller = buildController(stubs);
      const c = createContext({});

      const response = await controller.getDeck(c);

      expect(response).toEqual({
        data: { id: "1", quizzes: [] },
        status: 200,
      });
    });

    it("Deckが見つからない場合は404を返す", async () => {
      const stubs = createUseCaseStubs();
      stubs.getDeckUseCase.execute.mockReturnValue(
        errAsync(new DeckNotFoundError("1")),
      );
      const controller = buildController(stubs);
      const c = createContext({});

      const response = await controller.getDeck(c);

      expect(response.status).toBe(404);
    });
  });

  describe("deleteDeck", () => {
    it("成功時は204を返す", async () => {
      const stubs = createUseCaseStubs();
      stubs.deleteDeckUseCase.execute.mockReturnValue(okAsync(undefined));
      const controller = buildController(stubs);
      const c = createContext({ userFingerprint: "fp-42" });

      const response = await controller.deleteDeck(c);

      expect(response).toEqual({ data: null, status: 204 });
      expect(stubs.deleteDeckUseCase.execute).toHaveBeenCalledWith(
        "1",
        "fp-42",
      );
    });
  });
});
