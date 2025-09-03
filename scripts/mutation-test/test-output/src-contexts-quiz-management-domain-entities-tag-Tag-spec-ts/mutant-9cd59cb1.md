# Mutant 9cd59cb1 Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6242
**Stable ID**: 9cd59cb1
**Location**: L173:19–L173:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6242
@@ -169,9 +169,9 @@
         relatedTags: [
           {
             relationType: "hierarchy" as const,
             id: TagId.parse("tag-1"), // self reference
-            name: "JavaScript",
+            name: "",
           },
         ],
       };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
