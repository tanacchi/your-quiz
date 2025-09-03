# Mutant b783c699 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 7178
**Stable ID**: b783c699
**Location**: L335:13–L339:14

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7178
@@ -331,14 +331,10 @@
               relationType: "category" as const,
               id: "tag-1",
               name: "Category 1",
             },
+            {},
             {
-              relationType: "synonym" as const,
-              id: "tag-1", // duplicate
-              name: "Synonym 1",
-            },
-            {
               relationType: "related" as const,
               id: "tag-1", // another duplicate
               name: "Related 1",
             },
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
