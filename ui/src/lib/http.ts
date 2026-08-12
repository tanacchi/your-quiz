/**
 * ADR-0011（native fetch を採用）の実装。
 * `NEXT_PUBLIC_API_URL` を起点に fetch を呼び出し、結果を
 * neverthrow の `Result<T, AppError>` に正規化する共通ユーティリティ。
 *
 * ADR-0011 の Configuration Example にある `RequestInit` 直下の
 * `timeout: 10000` は WHATWG fetch の仕様に存在しないため採用せず、
 * 代わりに `AbortSignal.timeout()` を使う。
 */
import { err, ok, type Result } from "neverthrow";
import { type AppError, isApiErrorBody } from "@/types/api";

const DEFAULT_TIMEOUT_MS = 10_000;
const DEFAULT_RETRY_MAX = 2;
const DEFAULT_RETRY_BASE_DELAY_MS = 300;
const NULL_JSON = "null";

interface RetryOptions {
  /** 追加リトライの最大回数（初回試行は含まない）。既定 2 回。 */
  readonly max?: number;
  /** 指数バックオフの基点となる待機時間（ms）。既定 300ms。 */
  readonly baseDelayMs?: number;
}

interface RequestOptions {
  readonly timeoutMs?: number;
  readonly headers?: Readonly<Record<string, string>>;
}

interface GetOptions extends RequestOptions {
  /** GET のみリトライ対象（冪等なため）。POST は既定で単発実行。 */
  readonly retry?: RetryOptions;
}

interface PostOptions extends RequestOptions {
  readonly body: unknown;
}

/**
 * JSON.parse は `any` を返すため、この関数を唯一の変換点として使うことで
 * `as` を書かずに `unknown` な JSON テキストを型パラメータ `T` へ変換できる。
 * レスポンスボディのランタイム検証（zod 等）は本 issue のスコープ外
 * （#50 の SDK 導入時に対応）。
 */
const parseJsonLiteral = <T>(text: string): T => JSON.parse(text);

const tryParseJsonAs = <T>(
  text: string,
): { readonly ok: true; readonly value: T } | { readonly ok: false } => {
  try {
    return { ok: true, value: parseJsonLiteral<T>(text) };
  } catch {
    return { ok: false };
  }
};

const buildUrl = (path: string): string => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
  return `${baseUrl}${path}`;
};

const isAbortError = (error: unknown): boolean =>
  error instanceof DOMException && error.name === "AbortError";

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const isRetryableError = (error: AppError): boolean => {
  switch (error.kind) {
    case "network":
      return true;
    case "http":
      return error.status >= 500;
    case "unexpectedResponse":
      return error.status >= 500;
    case "timeout":
    case "parse":
      return false;
    default: {
      const _exhaustive: never = error;
      return _exhaustive;
    }
  }
};

const withRetry = async <T>(
  attempt: () => Promise<Result<T, AppError>>,
  options: { readonly max: number; readonly baseDelayMs: number },
): Promise<Result<T, AppError>> => {
  let result = await attempt();
  let tries = 0;

  while (
    result.isErr() &&
    isRetryableError(result.error) &&
    tries < options.max
  ) {
    await sleep(options.baseDelayMs * 2 ** tries);
    tries += 1;
    result = await attempt();
  }

  return result;
};

interface CoreRequestConfig {
  readonly method: "GET" | "POST";
  readonly path: string;
  /** `undefined` は「本文なし」、`null` は「JSON の null を送る」として区別する。 */
  readonly body?: unknown;
  readonly timeoutMs: number;
  readonly headers?: Readonly<Record<string, string>>;
}

const requestOnce = async <T>(
  config: CoreRequestConfig,
): Promise<Result<T, AppError>> => {
  const init: RequestInit = {
    method: config.method,
    headers: { "Content-Type": "application/json", ...config.headers },
    signal: AbortSignal.timeout(config.timeoutMs),
    ...(config.body !== undefined ? { body: JSON.stringify(config.body) } : {}),
  };

  let response: Response;
  try {
    response = await fetch(buildUrl(config.path), init);
  } catch (cause) {
    if (isAbortError(cause)) {
      return err({
        kind: "timeout",
        message: `${config.timeoutMs}ms でタイムアウトしました`,
      });
    }
    return err({
      kind: "network",
      message:
        cause instanceof Error
          ? cause.message
          : "ネットワークエラーが発生しました",
      cause,
    });
  }

  if (response.status === 204) {
    return ok(parseJsonLiteral<T>(NULL_JSON));
  }

  const text = await response.text();

  if (response.ok) {
    const parsed = tryParseJsonAs<T>(text);
    if (!parsed.ok) {
      return err({
        kind: "parse",
        message: "レスポンスの JSON パースに失敗しました",
        cause: text,
      });
    }
    return ok(parsed.value);
  }

  const parsedError = tryParseJsonAs<unknown>(text);
  if (parsedError.ok && isApiErrorBody(parsedError.value)) {
    return err({
      kind: "http",
      status: response.status,
      body: parsedError.value,
    });
  }
  return err({
    kind: "unexpectedResponse",
    status: response.status,
    message: `HTTP ${response.status}: ${response.statusText}`,
  });
};

/** GET リクエスト。5xx / ネットワークエラーのみ指数バックオフで再試行する。 */
export const httpGet = async <T>(
  path: string,
  options?: GetOptions,
): Promise<Result<T, AppError>> => {
  const timeoutMs = options?.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const retryMax = options?.retry?.max ?? DEFAULT_RETRY_MAX;
  const baseDelayMs =
    options?.retry?.baseDelayMs ?? DEFAULT_RETRY_BASE_DELAY_MS;
  const headers = options?.headers;

  const attempt = () =>
    requestOnce<T>({
      method: "GET",
      path,
      timeoutMs,
      ...(headers != null ? { headers } : {}),
    });

  return withRetry(attempt, { max: retryMax, baseDelayMs });
};

/** POST リクエスト。冪等でないため既定ではリトライしない（単発実行）。 */
export const httpPost = async <T>(
  path: string,
  options: PostOptions,
): Promise<Result<T, AppError>> => {
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const headers = options.headers;

  return requestOnce<T>({
    method: "POST",
    path,
    body: options.body,
    timeoutMs,
    ...(headers != null ? { headers } : {}),
  });
};
