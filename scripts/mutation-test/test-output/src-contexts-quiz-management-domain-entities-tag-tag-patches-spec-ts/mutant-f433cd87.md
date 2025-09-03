# Mutant f433cd87 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6680
**Stable ID**: f433cd87
**Location**: L394:20–L394:46

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6680
@@ -390,9 +390,9 @@
       const newTagInput = {
         id: "tag-new-language",
         name: "Rust",
         createdBy: "user-rust-enthusiast",
-        createdAt: "2023-12-01T10:00:00.000Z",
+        createdAt: "",
         // relatedTags not provided
       };
 
       const issues: Issue[] = [
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
