# Mutant 386bcb4c Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7177
**Stable ID**: 386bcb4c
**Location**: L333:21–L333:33

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7177
@@ -329,9 +329,9 @@
           relatedTags: [
             {
               relationType: "category" as const,
               id: "tag-1",
-              name: "Category 1",
+              name: "",
             },
             {
               relationType: "synonym" as const,
               id: "tag-1", // duplicate
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
