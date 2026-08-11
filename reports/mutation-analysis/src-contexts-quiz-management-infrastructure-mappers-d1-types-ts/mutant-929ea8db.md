# Mutant 929ea8db Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: ArrayDeclaration
**Original ID**: 80
**Stable ID**: 929ea8db
**Location**: L57:14–L57:39

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #80
@@ -53,9 +53,9 @@
       .nullish(),
     correct_answer: z.string().nullish(),
     matching_strategy: zodMatchingStrategySchema.nullish(),
     case_sensitive: z
-      .union([z.boolean(), z.number()])
+      .union([])
       .transform(Boolean)
       .nullish(),
     choices: z.string().nullish(),
     min_correct_answers: z.coerce.number().nullish(),
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。