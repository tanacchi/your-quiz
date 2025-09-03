# Mutant 22aa5950 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6679
**Stable ID**: 22aa5950
**Location**: L393:20–L393:42

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6679
@@ -389,9 +389,9 @@
     it("should handle tag creation with missing relatedTags", () => {
       const newTagInput = {
         id: "tag-new-language",
         name: "Rust",
-        createdBy: "user-rust-enthusiast",
+        createdBy: "",
         createdAt: "2023-12-01T10:00:00.000Z",
         // relatedTags not provided
       };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
