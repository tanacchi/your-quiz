# Mutant 0ba1a34a Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7219
**Stable ID**: 0ba1a34a
**Location**: L403:19–L403:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7219
@@ -399,9 +399,9 @@
           id: "tag-self",
           relatedTags: [
             {
               relationType: "category" as const,
-              id: "tag-self", // self-reference
+              id: "", // self-reference
               name: "Self Tag 1",
             },
             {
               relationType: "synonym" as const,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
