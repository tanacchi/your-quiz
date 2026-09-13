import { err, ok } from "neverthrow";
import {
  DraftBase,
  EntityBase,
  type EntityParseError,
  type EntityParseResult,
  toIssues,
} from "../../../../../shared/validation/entity";
import { suggestDeckPatches } from "./deck-patches";
import { type DeckData, type DeckInput, DeckSchema } from "./deck-schema";

// Type aliases for Deck-specific types
export type DeckParseError = EntityParseError<DeckInput>;
export type DeckParseResult = EntityParseResult<Deck, DeckInput>;
export type DeckDraft = InstanceType<typeof Deck.Draft>;

// Re-export types for public API
export type {
  CreatorId as CreatorIdType,
  DeckData,
  DeckId as DeckIdType,
  DeckInput,
  QuizId as QuizIdType,
} from "./deck-schema";

// Re-export runtime brand schemas
export { CreatorId, DeckId, QuizId } from "./deck-schema";

/**
 * parseDeck: エンティティの統一エントリーポイント
 * - 成功: ok(Deck)
 * - 失敗: err({ issues, patches })
 *   - patches は候補のみ、採用判断は呼び出し側
 */
export function parseDeck(input: unknown): DeckParseResult {
  const parsed = DeckSchema.safeParse(input);
  if (parsed.success) return ok(Deck.build(parsed.data));

  const issues = toIssues(parsed.error);
  const patches = suggestDeckPatches(input, issues);
  return err({ kind: "parse", issues, patches });
}

/**
 * Deck Entity - Immutable domain entity for deck（問題集）management
 *
 * 検索結果や手動選択、間違い問題から生成される問題集を表現する。
 * quiz-management の Quiz/Tag と同じ「schema + EntityBase継承クラス」
 * パターンに従う。
 */
export class Deck extends EntityBase<Deck, typeof DeckSchema> {
  constructor(data: DeckData) {
    super(data, parseDeck);
  }

  /** Internal factory method for validated data */
  static build(data: DeckData): Deck {
    return new Deck(data);
  }

  static from(input: unknown): DeckParseResult {
    return parseDeck(input);
  }

  static fromDraft(draft: InstanceType<typeof Deck.Draft>): DeckParseResult {
    return draft.commit();
  }

  /**
   * 指定された識別子（解決済みcreatorId）がこのDeckの所有者かどうかを判定する
   *
   * @param creatorId - `IUserIdentityResolver.resolve()`で解決された識別子
   */
  isOwnedBy(creatorId: string): boolean {
    return this.get("creatorId") === creatorId;
  }

  static Draft = class extends DraftBase<Deck, typeof DeckSchema> {
    constructor() {
      super(parseDeck);
    }
  };
}
