# Mutant 6a6787b4 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6473
**Stable ID**: 6a6787b4
**Location**: L110:10–L110:36

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6473
@@ -106,9 +106,9 @@
         // Array is object-like but doesn't have relatedTags property, so it gets undefined and patches are suggested
         expect(result).toEqual([{ relatedTags: [] }]);
       });
 
-      it("should handle null input", () => {
+      it("", () => {
         const issues: Issue[] = [
           { path: ["relatedTags"], code: "invalid", message: "Invalid" },
         ];
         const result = suggestTagPatches(null, issues);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
