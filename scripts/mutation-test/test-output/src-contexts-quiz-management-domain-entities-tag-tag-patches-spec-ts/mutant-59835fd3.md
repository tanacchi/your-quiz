# Mutant 59835fd3 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6531
**Stable ID**: 59835fd3
**Location**: L178:19–L178:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6531
@@ -174,9 +174,9 @@
 
         const issues: Issue[] = [
           {
             path: ["relatedTags"],
-            code: "invalid",
+            code: "",
             message: "Invalid relatedTags",
           },
           {
             path: ["relatedTags", 0],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
