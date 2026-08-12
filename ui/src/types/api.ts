/**
 * API のワイヤ形とエラーモデル。
 *
 * `ApiErrorBody` は TypeSpec (`api/spec/common/errors.tsp`) から生成される
 * `api/src/types/generated/api.d.ts` の `ErrorResponse` と一致する。
 * `code` は HTTP ステータスコードと同値。
 */
export interface ApiErrorBody {
  readonly code: number;
  readonly message: string;
  readonly details?: string;
  readonly requestId?: string;
  readonly fieldErrors?: Readonly<Record<string, string>>;
}

/** `unknown` を「プロパティに対して安全にアクセスできるオブジェクト」に絞り込む。 */
const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

/**
 * `unknown` を `ApiErrorBody` に絞り込む型ガード。
 * レスポンスボディの JSON パース結果は `unknown` になるため、
 * `as` を使わずここで安全に検証する。
 */
export const isApiErrorBody = (value: unknown): value is ApiErrorBody => {
  if (!isRecord(value)) {
    return false;
  }
  if (typeof value["code"] !== "number") {
    return false;
  }
  if (typeof value["message"] !== "string") {
    return false;
  }

  const details = value["details"];
  if (details !== undefined && typeof details !== "string") {
    return false;
  }

  const requestId = value["requestId"];
  if (requestId !== undefined && typeof requestId !== "string") {
    return false;
  }

  const fieldErrors = value["fieldErrors"];
  if (fieldErrors !== undefined && !isRecord(fieldErrors)) {
    return false;
  }

  return true;
};

/**
 * UI 内部で扱う HTTP エラーの判別共用体。
 * neverthrow の `Result<T, AppError>` の失敗側として使う。
 */
export type AppError =
  | {
      readonly kind: "network";
      readonly message: string;
      readonly cause: unknown;
    }
  | { readonly kind: "timeout"; readonly message: string }
  | {
      readonly kind: "http";
      readonly status: number;
      readonly body: ApiErrorBody;
    }
  | {
      readonly kind: "unexpectedResponse";
      readonly status: number;
      readonly message: string;
    }
  | {
      readonly kind: "parse";
      readonly message: string;
      readonly cause: unknown;
    };

/**
 * 非同期処理の状態を表す判別共用体。
 * `docs/instructions/shared/languages/typescript.md` が推奨する
 * `{status:'loading'}|{status:'success',data}|{status:'error',error}`
 * のパターンに `idle`（未実行）を加えたもの。
 */
export type AsyncState<T> =
  | { readonly status: "idle" }
  | { readonly status: "loading" }
  | { readonly status: "success"; readonly data: T }
  | { readonly status: "error"; readonly error: AppError };
