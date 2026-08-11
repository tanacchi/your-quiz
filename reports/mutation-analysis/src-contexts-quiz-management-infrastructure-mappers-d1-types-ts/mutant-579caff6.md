# Mutant 579caff6 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: ObjectLiteral
**Original ID**: 41
**Stable ID**: 579caff6
**Location**: L39:11–L73:4

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #41
@@ -35,43 +35,9 @@
 /**
  * クイズ関連のD1行データスキーマ
  */
 export const zodQuizRowSchema = z
-  .object({
-    id: d1IdSchema,
-    question: z.string(),
-    answer_type: zodAnswerTypeSchema,
-    solution_id: d1IdSchema,
-    explanation: z.string().nullable().optional(),
-    status: zodQuizStatusSchema,
-    creator_id: d1IdSchema,
-    created_at: z.string(),
-    approved_at: z.string().nullable().optional(),
-    // ソリューション関連のフィールド
-    boolean_value: z
-      .union([z.boolean(), z.number()])
-      .transform(Boolean)
-      .nullable()
-      .optional(),
-    correct_answer: z.string().nullable().optional(),
-    matching_strategy: zodMatchingStrategySchema.nullable().optional(),
-    case_sensitive: z
-      .union([z.boolean(), z.number()])
-      .transform(Boolean)
-      .nullable()
-      .optional(),
-    choices: z.string().nullable().optional(),
-    min_correct_answers: z
-      .union([
-        z.number(),
-        z
-          .string()
-          .refine((val) => !Number.isNaN(Number(val)), "Must be a valid number")
-          .transform(Number),
-      ])
-      .nullable()
-      .optional(),
-  })
+  .object({})
   .transform((data) => {
     // null/undefined の optional フィールドは除外
     const result = {
       id: data.id,
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。