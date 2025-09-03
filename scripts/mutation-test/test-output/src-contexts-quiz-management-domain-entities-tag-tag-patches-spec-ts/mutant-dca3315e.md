# Mutant dca3315e Report

**File**: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 6482
**Stable ID**: dca3315e
**Location**: L118:10–L118:41

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/tag/tag-patches.spec.ts	mutated #6482
@@ -114,9 +114,9 @@
         const result = suggestTagPatches(null, issues);
         expect(result).toEqual([]);
       });
 
-      it("should handle undefined input", () => {
+      it("", () => {
         const issues: Issue[] = [
           { path: ["relatedTags"], code: "invalid", message: "Invalid" },
         ];
         const result = suggestTagPatches(undefined, issues);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
