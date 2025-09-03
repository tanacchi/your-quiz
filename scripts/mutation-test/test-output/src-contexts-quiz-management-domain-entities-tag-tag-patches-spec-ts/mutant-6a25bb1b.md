# Mutant 6a25bb1b Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 6477
**Stable ID**: 6a25bb1b
**Location**: L112:19–L112:34

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6477
@@ -108,9 +108,9 @@
       });
 
       it("should handle null input", () => {
         const issues: Issue[] = [
-          { path: ["relatedTags"], code: "invalid", message: "Invalid" },
+          { path: [], code: "invalid", message: "Invalid" },
         ];
         const result = suggestTagPatches(null, issues);
         expect(result).toEqual([]);
       });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
