# Mutant 0fb6e9a2 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7180
**Stable ID**: 0fb6e9a2
**Location**: L338:21–L338:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7180
@@ -334,9 +334,9 @@
             },
             {
               relationType: "synonym" as const,
               id: "tag-1", // duplicate
-              name: "Synonym 1",
+              name: "",
             },
             {
               relationType: "related" as const,
               id: "tag-1", // another duplicate
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
