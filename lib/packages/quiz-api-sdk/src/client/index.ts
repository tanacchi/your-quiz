import { ResultAsync, ok, err } from 'neverthrow';

// 生成されたSDK関数＆Zodスキーマをimport
// 例）operationId: getPetById → 関数 getPetById が生成される想定
import { getQui, type Pet } from '../generated';
import * as schemas from '../generated/schemas';

export type ApiError =
  | { kind: 'NetworkError'; error: unknown }
  | { kind: 'ApiError'; status: number; body: unknown }
  | { kind: 'ValidationError'; issues: unknown };

/** Promise<T> → ResultAsync<T, ApiError> に正規化 */
const toResult = <T>(p: Promise<T>) =>
  ResultAsync.fromPromise(p, (e: any) => {
    if (typeof e?.status === 'number') {
      return { kind: 'ApiError', status: e.status, body: e.body ?? e.data ?? e } as ApiError;
    }
    return { kind: 'NetworkError', error: e } as ApiError;
  }).andThen((data) => ok<T, ApiError>(data));

/** Zod を適用（失敗したら ValidationError に） */
const validateWith =
  <T>(schema: { safeParse: (v: unknown) => { success: boolean; data: T; error: unknown } }) =>
  (value: unknown) => {
    const parsed = schema.safeParse(value);
    return parsed.success
      ? ok<T, ApiError>(parsed.data)
      : err<ApiError>({ kind: 'ValidationError', issues: parsed.error });
  };

// ---- ドメイン関数（例） ----
export const getPetById = (id: string) =>
  toResult(getPetById(id)) // 生成SDK呼び出し → ResultAsync
    .andThen((data) => validateWith<Pet>(schemas.Pet)(data)); // Zod検証を必ず通す

// 将来的に他のエンドポイントも同様に追加:
// export const safeCreatePet = (input: CreatePetInput) => toResult(createPet(input)).andThen(...);
