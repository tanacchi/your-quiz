import { ok, ResultAsync } from "neverthrow";

export type ApiError =
  | { kind: "NetworkError"; error: unknown }
  | { kind: "ApiError"; status: number; body: unknown }
  | { kind: "ValidationError"; issues: unknown };

const _toResult = <T>(p: Promise<T>) =>
  ResultAsync.fromPromise(p, (e: unknown) =>
    typeof (e as { status?: number })?.status === "number"
      ? {
          kind: "ApiError",
          status: (e as { status: number }).status,
          body: (e as { body?: unknown }).body ?? e,
        }
      : { kind: "NetworkError", error: e },
  ).andThen((d) => ok<T, ApiError>(d));

export const safeApi = {
  // 例: getQuiz 実装（コメントアウト例）
  // getQuiz: (id: string) => _toResult(api.getQuiz(id)).andThen(d=>{
  //   const r = z.Quiz.safeParse(d);
  //   return r.success? ok(r.data): err({kind:'ValidationError',issues:r.error});
  // }),
} as const;
