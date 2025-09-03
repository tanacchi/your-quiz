# Mutant f2e2344a Report

**File**: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6224
**Stable ID**: f2e2344a
**Location**: L143:19–L143:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/Tag.spec.ts	mutated #6224
@@ -139,9 +139,9 @@
         relatedTags: [
           {
             relationType: "hierarchy" as const,
             id: TagId.parse("tag-2"),
-            name: "Programming",
+            name: "",
           },
           {
             relationType: "category" as const,
             id: TagId.parse("tag-2"),
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
