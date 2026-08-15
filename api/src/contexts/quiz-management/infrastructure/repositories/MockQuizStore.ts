import { loadQuizFixtures } from "../../../../shared/fixtures";
import type { QuizSummary } from "../../domain/entities/quiz-summary/QuizSummary";

/**
 * MockQuizRepository のインメモリデータストア。
 *
 * `MockQuizRepository` 自体はリクエスト毎に new されるため、単体では
 * リクエストを跨いだ永続化ができない。`QuizRepositoryFactory` が
 * {@link getSharedMockQuizStore} で取得した単一インスタンスを注入することで、
 * BDD テスト等でリクエストを跨いだ書き込み系の検証ができるようにする。
 *
 * unit テスト（`new MockQuizRepository()` をデフォルト引数で使う場合）は
 * 都度 `new MockQuizStore()` されるため、テスト間で状態が汚染されない。
 */
export class MockQuizStore {
  private items: QuizSummary[];

  constructor(seed: readonly QuizSummary[] = loadQuizFixtures()) {
    this.items = [...seed];
  }

  list(): readonly QuizSummary[] {
    return this.items;
  }

  add(quiz: QuizSummary): void {
    this.items.push(quiz);
  }

  findById(id: string): QuizSummary | undefined {
    return this.items.find((quiz) => quiz.get("id") === id);
  }

  /** 対象が見つかれば置き換えてtrue、見つからなければ何もせずfalse */
  replace(id: string, quiz: QuizSummary): boolean {
    const index = this.items.findIndex((item) => item.get("id") === id);
    if (index === -1) return false;
    this.items[index] = quiz;
    return true;
  }

  /** 対象が見つかれば削除してtrue、見つからなければ何もせずfalse */
  remove(id: string): boolean {
    const index = this.items.findIndex((item) => item.get("id") === id);
    if (index === -1) return false;
    this.items.splice(index, 1);
    return true;
  }

  reset(seed: readonly QuizSummary[] = loadQuizFixtures()): void {
    this.items = [...seed];
  }
}

let sharedStore: MockQuizStore | undefined;

/** wrangler dev の単一 isolate 内でリクエストを跨いで共有されるストア */
export function getSharedMockQuizStore(): MockQuizStore {
  sharedStore ??= new MockQuizStore();
  return sharedStore;
}
