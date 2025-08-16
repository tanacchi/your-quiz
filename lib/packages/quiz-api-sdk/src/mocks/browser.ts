import { setupWorker } from "msw/browser";
import { getQuizManagementMock } from "../generated/msw/quiz-management/quiz-management.msw";
import { getSearchDiscoveryMock } from "../generated/msw/search-discovery/search-discovery.msw";

const handlers = [...getQuizManagementMock(), ...getSearchDiscoveryMock()];

export const worker = setupWorker(...handlers);
