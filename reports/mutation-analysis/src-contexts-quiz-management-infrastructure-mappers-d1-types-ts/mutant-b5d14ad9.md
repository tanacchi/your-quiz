# Mutant b5d14ad9 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: ObjectLiteral
**Original ID**: 49
**Stable ID**: b5d14ad9
**Location**: L76:20–L100:6

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #49
@@ -72,33 +72,9 @@
       .optional(),
   })
   .transform((data) => {
     // null/undefined の optional フィールドは除外
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
+    const result = {};
 
     return result;
   });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。