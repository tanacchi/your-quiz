import { Hono } from "hono";
import { createUserIdentityResolver } from "../../../../infrastructure/identity/UserIdentityResolverFactory";
import { createAttemptQueryRepository } from "../../../../infrastructure/repositories/AttemptQueryRepositoryFactory";
import { createDeckRepository } from "../../../../infrastructure/repositories/DeckRepositoryFactory";
import { createQuizRepository } from "../../../../infrastructure/repositories/QuizRepositoryFactory";
import type { AppEnv, CloudflareBindings } from "../../../../shared/types";
import { SearchQuizzesUseCase } from "../../../search/application/use-cases/SearchQuizzesUseCase";
import { MockSearchRepository } from "../../../search/infrastructure/repositories/MockSearchRepository";
import {
  CreateDeckFromSearchUseCase,
  CreateDeckFromWrongAnswersUseCase,
  CreateDeckUseCase,
  DeleteDeckUseCase,
  GetDeckUseCase,
  GetMyDecksUseCase,
  UpdateDeckUseCase,
} from "../../application/use-cases";
import { DeckController } from "../controllers/DeckController";

// Quiz Learning ルーティング（Deck管理のみ。Session/Answerは次issueのスコープ）
export const learningRoutes = new Hono<AppEnv>();

// search.routes.tsと同じくMockSearchRepositoryを直接使用（issue #48でD1化予定、ADR-0028参照）
const searchQuizzesUseCase = new SearchQuizzesUseCase(
  new MockSearchRepository(),
);

/**
 * Deckコントローラーのファクトリー関数
 *
 * quiz.routes.tsのcreateQuizControllerと同じく、環境に応じたリポジトリを
 * 使ってリクエストごとにコントローラーを作成する。
 *
 * @param env - Cloudflare Workersのバインディング環境変数
 * @returns 設定済みのDeckController
 */
function createDeckController(env: CloudflareBindings): DeckController {
  const deckRepository = createDeckRepository(env);
  const identityResolver = createUserIdentityResolver(env);
  const quizRepository = createQuizRepository(env);
  const attemptQueryRepository = createAttemptQueryRepository(env);

  const createDeckUseCase = new CreateDeckUseCase(
    deckRepository,
    identityResolver,
  );
  const createDeckFromSearchUseCase = new CreateDeckFromSearchUseCase(
    deckRepository,
    identityResolver,
    searchQuizzesUseCase,
  );
  const createDeckFromWrongAnswersUseCase =
    new CreateDeckFromWrongAnswersUseCase(
      deckRepository,
      identityResolver,
      attemptQueryRepository,
    );
  const getDeckUseCase = new GetDeckUseCase(deckRepository, quizRepository);
  const getMyDecksUseCase = new GetMyDecksUseCase(
    deckRepository,
    identityResolver,
  );
  const updateDeckUseCase = new UpdateDeckUseCase(
    deckRepository,
    identityResolver,
  );
  const deleteDeckUseCase = new DeleteDeckUseCase(
    deckRepository,
    identityResolver,
  );

  return new DeckController(
    createDeckUseCase,
    createDeckFromSearchUseCase,
    createDeckFromWrongAnswersUseCase,
    getDeckUseCase,
    getMyDecksUseCase,
    updateDeckUseCase,
    deleteDeckUseCase,
  );
}

// `/decks/mine`は`/decks/:id`より先に登録し、Honoのルートマッチング順で
// IDパラメータに`mine`が吸われないようにする
learningRoutes.get("/decks/mine", (c) => {
  const controller = createDeckController(c.env);
  return controller.getMyDecks(c);
});

learningRoutes.post("/decks", (c) => {
  const controller = createDeckController(c.env);
  return controller.createDeck(c);
});

learningRoutes.post("/decks/from-search", (c) => {
  const controller = createDeckController(c.env);
  return controller.createDeckFromSearch(c);
});

learningRoutes.post("/decks/wrong-questions", (c) => {
  const controller = createDeckController(c.env);
  return controller.createDeckFromWrongAnswers(c);
});

learningRoutes.get("/decks/:id", (c) => {
  const controller = createDeckController(c.env);
  return controller.getDeck(c);
});

learningRoutes.patch("/decks/:id", (c) => {
  const controller = createDeckController(c.env);
  return controller.updateDeck(c);
});

learningRoutes.delete("/decks/:id", (c) => {
  const controller = createDeckController(c.env);
  return controller.deleteDeck(c);
});
