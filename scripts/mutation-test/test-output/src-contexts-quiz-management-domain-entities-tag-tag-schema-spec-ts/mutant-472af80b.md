# Mutant 472af80b Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7222
**Stable ID**: 472af80b
**Location**: L408:19–L408:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7222
@@ -404,9 +404,9 @@
               name: "Self Tag 1",
             },
             {
               relationType: "synonym" as const,
-              id: "tag-other",
+              id: "",
               name: "Other Tag",
             },
             {
               relationType: "related" as const,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
