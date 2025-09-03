# Mutant a52bd729 Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 6599
**Stable ID**: a52bd729
**Location**: L284:31–L290:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6599
@@ -280,15 +280,9 @@
         { relatedTags: 123 },
         { relatedTags: { invalidStructure: true } },
       ];
 
-      const issues: Issue[] = [
-        {
-          path: ["relatedTags"],
-          code: "invalid",
-          message: "Invalid relatedTags",
-        },
-      ];
+      const issues: Issue[] = [];
 
       malformedInputs.forEach((input) => {
         const result = suggestTagPatches(input, issues);
         expect(Array.isArray(result)).toBe(true);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
