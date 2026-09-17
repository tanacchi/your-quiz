import { loadQuizFixtures } from "../../../../shared/fixtures";
import {
  CreatorId,
  QuizId,
  QuizSummary,
  SolutionId,
} from "../../domain/entities/quiz-summary/QuizSummary";
import type { NewQuiz } from "../../domain/entities/quiz-summary/quiz-summary-schema";

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
  // D1のAUTOINCREMENTと同じ形式(1始まりの数値文字列)にそろえる採番カウンタ。
  // 既定フィクスチャのidは"quiz-1"のような非数値文字列なので衝突しない。
  private nextQuizId = 1;
  private nextSolutionId = 1;

  constructor(seed: readonly QuizSummary[] = loadQuizFixtures()) {
    this.items = [...seed];
  }

  list(): readonly QuizSummary[] {
    return this.items;
  }

  add(quiz: QuizSummary): void {
    this.items.push(quiz);
  }

  /**
   * 採番前のクイズ入力から連番のid/solutionIdを払い出し、QuizSummaryとして
   * ストアに追加する（issue #76）。呼び出し側（UseCase）はIDを作らない。
   */
  createQuiz(input: NewQuiz): QuizSummary {
    const quiz = QuizSummary.build({
      id: QuizId.parse(String(this.nextQuizId++)),
      question: input.question,
      answerType: input.answerType,
      solutionId: SolutionId.parse(String(this.nextSolutionId++)),
      explanation: input.explanation,
      status: input.status,
      creatorId: CreatorId.parse(input.creatorId),
      createdAt: input.createdAt,
      tagIds: [],
    });
    this.items.push(quiz);
    return quiz;
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
    this.nextQuizId = 1;
    this.nextSolutionId = 1;
  }
}

let sharedStore: MockQuizStore | undefined;

/** wrangler dev の単一 isolate 内でリクエストを跨いで共有されるストア */
export function getSharedMockQuizStore(): MockQuizStore {
  sharedStore ??= new MockQuizStore();
  return sharedStore;
}
