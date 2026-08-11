# Mutant 78a570e2 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: ArrayDeclaration
**Original ID**: 79
**Stable ID**: 78a570e2
**Location**: L51:14–L51:39

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #79
@@ -47,9 +47,9 @@
     created_at: z.string(),
     approved_at: z.string().nullish(),
     // ソリューション関連のフィールド
     boolean_value: z
-      .union([z.boolean(), z.number()])
+      .union([])
       .transform(Boolean)
       .nullish(),
     correct_answer: z.string().nullish(),
     matching_strategy: zodMatchingStrategySchema.nullish(),
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。