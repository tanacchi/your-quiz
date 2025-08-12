import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll } from "vitest";
import { getQuizManagementMock } from "../src/generated/msw/quiz-management/quiz-management.msw";
import { getSearchDiscoveryMock } from "../src/generated/msw/search-discovery/search-discovery.msw";

const handlers = [...getQuizManagementMock(), ...getSearchDiscoveryMock()];
const server = setupServer(...handlers);

if (process.env.API_MOCK === "true") {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
}
