# Mutant 48c22d71 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6672
**Stable ID**: 48c22d71
**Location**: L388:12–L388:34

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6672
@@ -384,9 +384,9 @@
       expect(currentInput.name).toBe("Test Tag");
     });
   });
 
-  describe("Real-world Scenarios", () => {
+  describe("", () => {
     it("should handle tag creation with missing relatedTags", () => {
       const newTagInput = {
         id: "tag-new-language",
         name: "Rust",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
