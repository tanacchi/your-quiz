import { setupWorker } from "msw/browser";
import { handlers } from "../generated/msw/index.msw";

export const worker = setupWorker(...handlers);
