# Mutant ae5409fe Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: BlockStatement
**Original ID**: 48
**Stable ID**: ae5409fe
**Location**: L74:24–L103:4

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #48
@@ -70,39 +70,10 @@
       ])
       .nullable()
       .optional(),
   })
-  .transform((data) => {
-    // null/undefined の optional フィールドは除外
-    const result = {
-      id: data.id,
-      question: data.question,
-      answer_type: data.answer_type,
-      solution_id: data.solution_id,
-      status: data.status,
-      creator_id: data.creator_id,
-      created_at: data.created_at,
-      ...(data.explanation != null && { explanation: data.explanation }),
-      ...(data.approved_at != null && { approved_at: data.approved_at }),
-      ...(data.boolean_value != null && { boolean_value: data.boolean_value }),
-      ...(data.correct_answer != null && {
-        correct_answer: data.correct_answer,
-      }),
-      ...(data.matching_strategy != null && {
-        matching_strategy: data.matching_strategy,
-      }),
-      ...(data.case_sensitive != null && {
-        case_sensitive: data.case_sensitive,
-      }),
-      ...(data.choices != null && { choices: data.choices }),
-      ...(data.min_correct_answers != null && {
-        min_correct_answers: data.min_correct_answers,
-      }),
-    };
+  .transform((data) => {});
 
-    return result;
-  });
-
 /**
  * D1の COUNT クエリ結果スキーマ
  */
 export const zodCountResultSchema = z.object({
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。