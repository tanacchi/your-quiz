# Mutant b975aaf1 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6532
**Stable ID**: b975aaf1
**Location**: L179:22–L179:43

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6532
@@ -175,9 +175,9 @@
         const issues: Issue[] = [
           {
             path: ["relatedTags"],
             code: "invalid",
-            message: "Invalid relatedTags",
+            message: "",
           },
           {
             path: ["relatedTags", 0],
             code: "invalid",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
