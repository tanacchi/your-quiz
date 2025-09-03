# Mutant 3aace7b6 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 7221
**Stable ID**: 3aace7b6
**Location**: L406:13–L410:14

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7221
@@ -402,14 +402,10 @@
               relationType: "category" as const,
               id: "tag-self", // self-reference
               name: "Self Tag 1",
             },
+            {},
             {
-              relationType: "synonym" as const,
-              id: "tag-other",
-              name: "Other Tag",
-            },
-            {
               relationType: "related" as const,
               id: "tag-self", // another self-reference
               name: "Self Tag 2",
             },
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
