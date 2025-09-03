# Mutant a346de66 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7176
**Stable ID**: a346de66
**Location**: L332:19–L332:26

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7176
@@ -328,9 +328,9 @@
           ...validTagData,
           relatedTags: [
             {
               relationType: "category" as const,
-              id: "tag-1",
+              id: "",
               name: "Category 1",
             },
             {
               relationType: "synonym" as const,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
