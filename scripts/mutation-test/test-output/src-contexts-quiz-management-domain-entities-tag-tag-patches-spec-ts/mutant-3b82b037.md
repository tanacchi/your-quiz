# Mutant 3b82b037 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 6515
**Stable ID**: 3b82b037
**Location**: L159:19–L159:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6515
@@ -155,9 +155,9 @@
           relatedTags: null, // This would normally trigger a patch
         };
 
         const issues: Issue[] = [
-          { path: ["name"], code: "invalid", message: "Invalid name" }, // Different field
+          { path: [], code: "invalid", message: "Invalid name" }, // Different field
         ];
 
         const result = suggestTagPatches(input, issues);
         expect(result).toEqual([]);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
