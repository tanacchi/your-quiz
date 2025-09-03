# Mutant 1db7d8ca Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7220
**Stable ID**: 1db7d8ca
**Location**: L404:21–L404:33

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7220
@@ -400,9 +400,9 @@
           relatedTags: [
             {
               relationType: "category" as const,
               id: "tag-self", // self-reference
-              name: "Self Tag 1",
+              name: "",
             },
             {
               relationType: "synonym" as const,
               id: "tag-other",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
