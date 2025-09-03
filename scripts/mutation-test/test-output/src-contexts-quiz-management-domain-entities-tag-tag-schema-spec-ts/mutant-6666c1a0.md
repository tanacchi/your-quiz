# Mutant 6666c1a0 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7179
**Stable ID**: 6666c1a0
**Location**: L337:19–L337:26

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7179
@@ -333,9 +333,9 @@
               name: "Category 1",
             },
             {
               relationType: "synonym" as const,
-              id: "tag-1", // duplicate
+              id: "", // duplicate
               name: "Synonym 1",
             },
             {
               relationType: "related" as const,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
