# Mutant cd02adb1 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6468
**Stable ID**: cd02adb1
**Location**: L103:62–L103:71

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6468
@@ -99,9 +99,9 @@
       });
 
       it("should handle array input", () => {
         const issues: Issue[] = [
-          { path: ["relatedTags"], code: "invalid", message: "Invalid" },
+          { path: ["relatedTags"], code: "invalid", message: "" },
         ];
         const result = suggestTagPatches([], issues);
         // Array is object-like but doesn't have relatedTags property, so it gets undefined and patches are suggested
         expect(result).toEqual([{ relatedTags: [] }]);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
