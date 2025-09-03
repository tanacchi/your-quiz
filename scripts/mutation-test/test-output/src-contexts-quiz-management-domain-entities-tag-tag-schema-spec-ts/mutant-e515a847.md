# Mutant e515a847 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7223
**Stable ID**: e515a847
**Location**: L409:21–L409:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-schema.spec.ts	mutated #7223
@@ -405,9 +405,9 @@
             },
             {
               relationType: "synonym" as const,
               id: "tag-other",
-              name: "Other Tag",
+              name: "",
             },
             {
               relationType: "related" as const,
               id: "tag-self", // another self-reference
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
