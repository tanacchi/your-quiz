# Mutant c7e77958 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6674
**Stable ID**: c7e77958
**Location**: L389:8–L389:61

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6674
@@ -385,9 +385,9 @@
     });
   });
 
   describe("Real-world Scenarios", () => {
-    it("should handle tag creation with missing relatedTags", () => {
+    it("", () => {
       const newTagInput = {
         id: "tag-new-language",
         name: "Rust",
         createdBy: "user-rust-enthusiast",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
