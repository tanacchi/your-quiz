# Mutant 1b34f6ea Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6502
**Stable ID**: 1b34f6ea
**Location**: L138:19–L138:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6502
@@ -134,9 +134,9 @@
 
         const issues: Issue[] = [
           {
             path: ["relatedTags"],
-            code: "invalid",
+            code: "",
             message: "Invalid relatedTags",
           },
         ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
