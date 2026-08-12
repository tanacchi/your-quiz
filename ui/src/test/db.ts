import { openQuizPocketDb, type QuizPocketDatabase } from "@/lib/db/client";

let sequence = 0;

/** テストごとに独立した IndexedDB を開く。一意名により後始末順序に依存しない。 */
export async function createTestDb(): Promise<QuizPocketDatabase> {
  sequence += 1;
  const result = await openQuizPocketDb(`quizpocket-test-${sequence}`);
  if (result.isErr()) {
    throw new Error(`テストDBの作成に失敗: ${result.error.type}`);
  }
  return result.value;
}
