# Mutant ffd34ea7 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 6529
**Stable ID**: ffd34ea7
**Location**: L177:19–L177:34

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6529
@@ -173,9 +173,9 @@
         };
 
         const issues: Issue[] = [
           {
-            path: ["relatedTags"],
+            path: [],
             code: "invalid",
             message: "Invalid relatedTags",
           },
           {
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
