# エンティティ実装ガイドライン（最小構成バリデーション設計）

> 目的：堅牢な型安全性とZod境界分離により、保守しやすいドメインエンティティを実装する再現可能なパターンを提供する

---

## 0. 設計哲学・原則

### コア原則
1. **最小構成バリデーション設計**: 自動修正しない、パッチ候補提案のみ
2. **Zod境界分離**: エンティティAPIからZodを完全に隠蔽
3. **完全Immutable**: 全更新操作で新インスタンス生成
4. **Result型エラーハンドリング**: neverthrowによる型安全なエラー処理
5. **Brand型活用**: ランタイムスキーマとしても機能する厳密な型システム

### 基本思想
- **検証は提案まで**: バリデーションエラー時はパッチ候補を提示、採用判断は呼び出し側
- **境界で厳格**: 外部入力は厳密検証、内部はBrand型による型安全性
- **状態と行動の分離**: データはDTO、ロジックはエンティティメソッド

---

## 1. ファイル配置規約

エンティティごとにディレクトリを分離し、責務別にファイルを分割：

```
src/contexts/{context-name}/domain/entities/
└── {entity-name}/
    ├── {EntityName}.ts          # メインエンティティクラス + バリデーション関数
    ├── {EntityName}.spec.ts     # テストファイル
    ├── {entity-name}-schema.ts  # Zodスキーマ + Brand型定義
    └── {entity-name}-patches.ts # パッチシステム（フィールド別サジェスト）
```

**例: QuizSummary**
```
quiz-summary/
├── QuizSummary.ts
├── QuizSummary.spec.ts
├── quiz-summary-schema.ts
└── quiz-summary-patches.ts
```

---

## 2. Schema File実装パターン

**ファイル名**: `{entity-name}-schema.ts`

### 2.1 Brand型定義

```typescript
import { z } from "zod";

// Brand types for type safety
export const QuizId = z.string().min(1).brand<"QuizId">();
export type QuizId = z.infer<typeof QuizId>;

export const SolutionId = z.string().min(1).brand<"SolutionId">();
export type SolutionId = z.infer<typeof SolutionId>;

export const CreatorId = z.string().min(1).brand<"CreatorId">();
export type CreatorId = z.infer<typeof CreatorId>;
```

### 2.2 メインスキーマ定義

```typescript
// Entity schema with cross-field validation
export const QuizSummarySchema = z
  .object({
    id: QuizId,
    question: z.string().min(1),
    answerType: z.enum([
      "boolean",
      "free_text",
      "single_choice",
      "multiple_choice",
    ]),
    solutionId: SolutionId,
    explanation: z.string().optional(),
    tagIds: z.array(TagId).default([]),
    status: z.enum(["pending_approval", "approved", "rejected"]),
    creatorId: CreatorId,
    createdAt: z.string().datetime(),
    approvedAt: z.string().datetime().optional(),
  })
  .strict()
  .superRefine((data, ctx) => {
    // Cross-field constraints
    if (data.status === "approved" && !data.approvedAt) {
      ctx.addIssue({
        code: "custom",
        message: "Approved quiz must have approvedAt timestamp",
        path: ["approvedAt"],
      });
    }

    // Business rule validations
    const uniqueTagIds = new Set(data.tagIds);
    if (uniqueTagIds.size !== data.tagIds.length) {
      ctx.addIssue({
        code: "custom",
        message: "Duplicate tag IDs are not allowed",
        path: ["tagIds"],
      });
    }
  });
```

### 2.3 型エクスポート

```typescript
// DTO type for internal entity data
export type QuizSummaryDTO = z.output<typeof QuizSummarySchema>;

// Input type for external input/draft states
export type QuizSummaryInput = z.input<typeof QuizSummarySchema>;
```

---

## 3. Patches File実装パターン

**ファイル名**: `{entity-name}-patches.ts`

### 3.1 基本型定義

```typescript
import type { QuizSummaryInput } from "./quiz-summary-schema";

export type Issue = {
  path: (string | number)[];
  code: string;
  message: string;
};

/**
 * Patch は「純データ」か「遅延計算関数」のどちらか
 * - Partial<Input>: 直列化やバッチ処理向き
 * - () => Partial<Input>: 入力に閉じた補正を遅延評価（プロセス内専用）
 */
export type QuizSummaryPatch =
  | Partial<QuizSummaryInput>
  | (() => Partial<QuizSummaryInput>);
```

### 3.2 パッチユーティリティ

```typescript
/** 型ガード：入力データがエンティティInputの形に近いかを判定 */
const isQuizSummaryLike = (input: unknown): input is Partial<QuizSummaryInput> => {
  return typeof input === "object" && input !== null;
};

/** Patch を「いま適用する」ために Partial<Input> に実体化 */
export const materializePatch = (patch: QuizSummaryPatch): Partial<QuizSummaryInput> =>
  typeof patch === "function" ? patch() : patch;

/** 単一 Patch の適用 */
export const applyQuizSummaryPatch = (input: unknown, patch: QuizSummaryPatch): unknown => {
  const base = isQuizSummaryLike(input) ? { ...input } : {};
  const p = materializePatch(patch);
  return { ...base, ...p };
};

/** 複数 Patch を順に適用（後勝ち） */
export const applyQuizSummaryPatches = (
  input: unknown,
  patches: QuizSummaryPatch[]
): unknown => patches.reduce((acc, p) => applyQuizSummaryPatch(acc, p), input);
```

### 3.3 フィールド別サジェスト関数

```typescript
/** 各フィールド専用のサジェスト関数型 */
type FieldSuggester = (value: unknown) => QuizSummaryPatch[];

// question用：trim / 空文字列の場合はサンプル提案
export const suggestQuestionPatches: FieldSuggester = (value) => {
  if (typeof value !== "string") return [];

  const patches: QuizSummaryPatch[] = [];
  const trimmed = value.trim();

  if (trimmed !== value && trimmed.length > 0) {
    patches.push({ question: trimmed });
  } else if (trimmed === "") {
    patches.push({ question: "Sample question" });
  }

  return patches;
};

// ID fields用：trim whitespace
export const suggestIdFieldPatches =
  (fieldName: keyof QuizSummaryInput) =>
  (value: unknown): QuizSummaryPatch[] => {
    if (typeof value !== "string") return [];

    const patches: QuizSummaryPatch[] = [];
    const trimmed = value.trim();

    if (trimmed !== value) {
      patches.push({ [fieldName]: trimmed } as Partial<QuizSummaryInput>);
    }

    return patches;
  };
```

### 3.4 集約サジェスト関数

```typescript
/** 集約：Issue に該当するフィールドだけを呼ぶ */
export const suggestQuizSummaryPatches = (
  input: unknown,
  issues: Issue[],
): QuizSummaryPatch[] => {
  if (!isQuizSummaryLike(input)) {
    return [];
  }

  const need = (field: string) =>
    issues.some((is) => String(is.path[0]) === field);

  const out: QuizSummaryPatch[] = [];

  if (need("question")) out.push(...suggestQuestionPatches(input.question));
  if (need("id")) out.push(...suggestIdFieldPatches("id")(input.id));
  // ... 他フィールド

  return out;
};
```

---

## 4. Main Entity File実装パターン

**ファイル名**: `{EntityName}.ts`

### 4.1 基本構造

```typescript
import { err, ok, type Result } from "neverthrow";
import type { z } from "zod";
import {
  type Issue,
  type QuizSummaryPatch,
  suggestQuizSummaryPatches,
  // ... other imports
} from "./quiz-summary-patches";
import {
  type QuizSummaryDTO,
  type QuizSummaryInput,
  QuizSummarySchema,
} from "./quiz-summary-schema";
```

### 4.2 バリデーション型とエラー処理

```typescript
/** ValidationError: Issue と Patch 候補のみ返す（採用判断は呼び出し側） */
export type ValidationError = {
  kind: "validation";
  issues: Issue[];
  patches: QuizSummaryPatch[]; // 空配列可
};

/** 成功: Entity, 失敗: ValidationError */
export type ValidationResult = Result<QuizSummary, ValidationError>;

/** ZodError → Issue[] への縮約（公開境界に Zod を出さない） */
const toIssues = (e: z.ZodError): Issue[] =>
  e.issues.map((i) => ({
    path: i.path.map((p) => (typeof p === "symbol" ? p.toString() : p)) as (
      | string
      | number
    )[],
    code: i.code,
    message: i.message,
  }));

/**
 * validateQuizSummary:
 * - 成功: ok(QuizSummary)
 * - 失敗: err({ issues, patches })
 *   - patches は「候補」であり、採用可否は呼び出し側が決める
 */
export function validateQuizSummary(input: unknown): ValidationResult {
  const parsed = QuizSummarySchema.safeParse(input);
  if (parsed.success) return ok(QuizSummary.build(parsed.data));

  const issues = toIssues(parsed.error);
  const patches = suggestQuizSummaryPatches(input, issues);
  return err({ kind: "validation", issues, patches });
}
```

### 4.3 メインエンティティクラス

```typescript
export class QuizSummary {
  private constructor(private readonly data: Readonly<QuizSummaryDTO>) {
    // Ensure complete immutability
    Object.freeze(this.data);
    Object.freeze(this);
  }

  /** Internal factory method for validated data */
  static build(data: QuizSummaryDTO): QuizSummary {
    return new QuizSummary(data);
  }

  /**
   * Creates Entity instance from unknown input with validation
   */
  static from(input: unknown): ValidationResult {
    return validateQuizSummary(input);
  }

  /**
   * Creates Entity from Draft instance
   */
  static fromDraft(draft: QuizSummaryDraft): ValidationResult {
    return validateQuizSummary(draft.state);
  }

  /**
   * Returns a deep copy of the internal data
   */
  toDTO(): QuizSummaryDTO {
    return structuredClone(this.data);
  }

  /**
   * Generic getter method with full type safety
   */
  get<K extends keyof QuizSummaryDTO>(key: K): QuizSummaryDTO[K] {
    return this.data[key];
  }

  /**
   * Generic update method that returns new immutable instance
   */
  update<K extends keyof QuizSummaryInput>(
    key: K,
    value: QuizSummaryInput[K],
  ): ValidationResult {
    const newData = { ...this.data, [key]: value };
    return validateQuizSummary(newData);
  }

  /**
   * Updates multiple fields at once, returns new instance
   */
  with(patch: Partial<QuizSummaryInput>): ValidationResult {
    const newData = { ...this.data, ...patch };
    return validateQuizSummary(newData);
  }

  /**
   * Updates using mutator function, returns new instance
   */
  withMutator(mutator: (draft: QuizSummaryInput) => void): ValidationResult {
    const draftData = structuredClone(this.data);
    mutator(draftData);
    return validateQuizSummary(draftData);
  }

  // Business logic methods
  canBeUpdated(): boolean {
    return this.get("status") === "pending_approval";
  }

  canBeDeleted(): boolean {
    return this.get("status") !== "approved";
  }

  approve(approvedAt: string): ValidationResult {
    if (this.get("status") !== "pending_approval") {
      const error: ValidationError = {
        kind: "validation",
        issues: [{
          path: ["status"],
          code: "custom",
          message: `Quiz with status ${this.get("status")} cannot be approved`,
        }],
        patches: [],
      };
      return err(error);
    }

    return this.with({
      status: "approved",
      approvedAt,
    });
  }
}
```

### 4.4 Draftクラス

```typescript
/**
 * Draft class for mutable editing before committing to immutable entity
 * Used for form editing and partial validation scenarios
 */
export class QuizSummaryDraft {
  state: Partial<QuizSummaryInput> = {};
  errors: Record<string, string[]> = {};

  /**
   * Generic getter for draft state
   */
  get<K extends keyof QuizSummaryInput>(
    key: K,
  ): QuizSummaryInput[K] | undefined {
    return this.state[key];
  }

  /**
   * Generic update method for draft state with validation
   */
  update<K extends keyof QuizSummaryInput>(
    key: K,
    value: QuizSummaryInput[K],
  ): void {
    this.state = { ...this.state, [key]: value };
    this.validatePartial();
  }

  /**
   * Updates multiple fields at once
   */
  updateMany(patch: Partial<QuizSummaryInput>): void {
    this.state = { ...this.state, ...patch };
    this.validatePartial();
  }

  /**
   * Validates the current state and updates errors
   */
  private validatePartial(): void {
    const result = QuizSummarySchema.safeParse(this.state);
    if (!result.success) {
      this.errors = {};
      for (const issue of result.error.issues) {
        const path = issue.path.join(".");
        if (!this.errors[path]) {
          this.errors[path] = [];
        }
        this.errors[path].push(issue.message);
      }
    } else {
      this.errors = {};
    }
  }

  /**
   * Commits the draft to Entity
   */
  commit(): ValidationResult {
    return validateQuizSummary(this.state);
  }

  /**
   * Checks if the draft has any validation errors
   */
  hasErrors(): boolean {
    return Object.keys(this.errors).length > 0;
  }

  /**
   * Gets errors for a specific field path
   */
  getErrors(path: string): string[] {
    return this.errors[path] || [];
  }
}
```

---

## 5. 実装チェックリスト

### 5.1 ファイル配置確認
- [ ] `{entity-name}/` ディレクトリ作成
- [ ] `{EntityName}.ts` メインファイル
- [ ] `{entity-name}-schema.ts` スキーマファイル
- [ ] `{entity-name}-patches.ts` パッチファイル
- [ ] `{EntityName}.spec.ts` テストファイル

### 5.2 Schema File確認
- [ ] Brand型定義（必要に応じて）
- [ ] メインスキーマ定義
- [ ] `.strict()` 適用
- [ ] `.superRefine()` でクロスフィールド検証
- [ ] DTO/Input型エクスポート

### 5.3 Patches File確認
- [ ] Issue型定義
- [ ] Patch型定義（純データ | 遅延関数）
- [ ] 型ガード関数実装
- [ ] パッチ適用ユーティリティ
- [ ] フィールド別サジェスト関数
- [ ] 集約サジェスト関数

### 5.4 Main Entity確認
- [ ] ValidationError/ValidationResult型
- [ ] validate関数実装
- [ ] private constructor + static build
- [ ] static from/fromDraft
- [ ] get/toDTO/update/with/withMutator
- [ ] ビジネスロジックメソッド
- [ ] Draftクラス実装

### 5.5 型安全性確認
- [ ] Brand型の一貫した使用
- [ ] Result型によるエラーハンドリング
- [ ] Zod境界分離の徹底
- [ ] 完全Immutableパターン

---

## 6. 使用例

### 6.1 基本的な使用パターン

```typescript
// Entity作成
const quizResult = QuizSummary.from({
  id: "quiz-123",
  question: "What is TypeScript?",
  answerType: "single_choice",
  solutionId: "solution-456",
  // ... other fields
});

if (quizResult.isOk()) {
  const quiz = quizResult.value;

  // フィールド取得
  const question = quiz.get("question");

  // 更新
  const updated = quiz.update('question', 'Updated question');

  // 複数フィールド更新
  const withPatch = quiz.with({
    question: "New question",
    explanation: "New explanation"
  });
} else {
  // パッチ適用例
  const { issues, patches } = quizResult.error;
  console.log("Validation issues:", issues);

  // 自動修正候補を適用
  const recoveredInput = applyQuizSummaryPatches(input, patches);
  const retryResult = QuizSummary.from(recoveredInput);
}
```

### 6.2 Draft使用例

```typescript
// Draft作成・編集
const draft = new QuizSummaryDraft();
draft.update("question", "Draft question");
draft.updateMany({
  answerType: "boolean",
  solutionId: "sol-123"
});

// エラー確認
if (draft.hasErrors()) {
  const questionErrors = draft.getErrors("question");
  console.log("Question errors:", questionErrors);
}

// Entity変換
const entityResult = draft.commit();
if (entityResult.isOk()) {
  const quiz = entityResult.value;
  // Entity as usual...
}
```

---

## 7. ベストプラクティス

### 7.1 型安全性
- Brand型は必ずランタイムスキーマとしても定義
- Input/DTO型を適切に使い分け
- Result型で一貫したエラーハンドリング

### 7.2 バリデーション
- 自動修正しない、パッチ提案のみ
- クロスフィールド制約は `.superRefine()` に集約
- フィールド別サジェスト関数で保守性確保

### 7.3 Immutability
- 全更新操作で新インスタンス生成
- 内部データのObject.freeze徹底
- structuredCloneで深いコピー

### 7.4 境界分離
- ZodをエンティティAPI外に露出させない
- Issue型でバリデーションエラー抽象化
- Brand型で内外境界を明確化

---

## 8. よくあるアンチパターン

### 8.1 避けるべきパターン
- ❌ Zodエラーを直接外部に返す
- ❌ 自動修正を行う
- ❌ mutateメソッドで破壊的変更
- ❌ any型やas unknown多用
- ❌ フィールドごとのsetterメソッド乱立

### 8.2 推奨パターン
- ✅ Issue + Patch候補で問題提示
- ✅ 呼び出し側がパッチ採用判断
- ✅ 完全Immutableパターン
- ✅ 型ガード関数による安全性確保
- ✅ 汎用update/withメソッド

---

## 9. 最小テンプレート

以下のテンプレートを基に新しいエンティティを実装：

```typescript
// schema.ts
export const EntitySchema = z.object({ /* ... */ }).strict();
export type EntityDTO = z.output<typeof EntitySchema>;
export type EntityInput = z.input<typeof EntitySchema>;

// patches.ts
export type Issue = { path: (string | number)[]; code: string; message: string; };
export type EntityPatch = Partial<EntityInput> | (() => Partial<EntityInput>);
export const suggestEntityPatches = (input: unknown, issues: Issue[]): EntityPatch[] => { /* ... */ };

// Entity.ts
export type ValidationError = { kind: "validation"; issues: Issue[]; patches: EntityPatch[]; };
export type ValidationResult = Result<Entity, ValidationError>;
export function validateEntity(input: unknown): ValidationResult { /* ... */ }

export class Entity {
  private constructor(private readonly data: Readonly<EntityDTO>) {}
  static build(data: EntityDTO): Entity { return new Entity(data); }
  static from(input: unknown): ValidationResult { return validateEntity(input); }
  get<K extends keyof EntityDTO>(key: K): EntityDTO[K] { return this.data[key]; }
  update<K extends keyof EntityInput>(key: K, value: EntityInput[K]): ValidationResult { /* ... */ }
  with(patch: Partial<EntityInput>): ValidationResult { /* ... */ }
}

export class EntityDraft {
  state: Partial<EntityInput> = {};
  errors: Record<string, string[]> = {};
  update<K extends keyof EntityInput>(key: K, value: EntityInput[K]): void { /* ... */ }
  commit(): ValidationResult { return validateEntity(this.state); }
}
```

---

このガイドラインに従うことで、QuizSummaryと同等のクオリティ・方針で堅牢なドメインエンティティを実装できます。
