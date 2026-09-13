import { isObjectLike } from "../../../../../shared/utils/type-guard";
import type {
  EntityPatch,
  FieldSuggester,
  Issue,
} from "../../../../../shared/validation/entity";
import type { DeckInput } from "./deck-schema";

export type DeckPatch = EntityPatch<DeckInput>;

type DeckFieldSuggester = FieldSuggester<DeckInput>;

// quizIds 用：null/undefinedハンドリング（DeckSchema自体はquizIdsの空配列を許可しないため、
// 修正提案としてはひとまず空配列を提示し、呼び出し側での再入力を促す）
export const suggestQuizIdsPatches: DeckFieldSuggester = (value) => {
  const patches: DeckPatch[] = [];

  if (value == null) {
    patches.push({ quizIds: [] });
  }

  return patches;
};

/** 集約：Issue に該当するフィールドだけを呼ぶ */
export const suggestDeckPatches = (
  input: unknown,
  issues: Issue[],
): DeckPatch[] => {
  if (!isObjectLike<DeckInput>(input)) {
    return [];
  }

  const needsField = (field: string) =>
    issues.some((issue) => String(issue.path[0]) === field);

  const patches: DeckPatch[] = [];

  if (needsField("quizIds")) {
    patches.push(...suggestQuizIdsPatches(input.quizIds));
  }

  return patches;
};
