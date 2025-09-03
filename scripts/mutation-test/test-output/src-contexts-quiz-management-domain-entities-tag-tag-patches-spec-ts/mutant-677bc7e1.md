# Mutant 677bc7e1 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 6469
**Stable ID**: 677bc7e1
**Location**: L105:42–L105:44

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6469
@@ -101,9 +101,9 @@
       it("should handle array input", () => {
         const issues: Issue[] = [
           { path: ["relatedTags"], code: "invalid", message: "Invalid" },
         ];
-        const result = suggestTagPatches([], issues);
+        const result = suggestTagPatches(["Stryker was here"], issues);
         // Array is object-like but doesn't have relatedTags property, so it gets undefined and patches are suggested
         expect(result).toEqual([{ relatedTags: [] }]);
       });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
