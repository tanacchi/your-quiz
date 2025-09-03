# Mutant fe67a7ec Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: ArrayDeclaration
**Original ID**: 7819
**Stable ID**: fe67a7ec
**Location**: L51:14–L51:39

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #7819
@@ -47,9 +47,9 @@
     created_at: z.string(),
     approved_at: z.string().nullable().optional(),
     // ソリューション関連のフィールド
     boolean_value: z
-      .union([z.boolean(), z.number()])
+      .union([])
       .transform(Boolean)
       .nullable()
       .optional(),
     correct_answer: z.string().nullable().optional(),
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
