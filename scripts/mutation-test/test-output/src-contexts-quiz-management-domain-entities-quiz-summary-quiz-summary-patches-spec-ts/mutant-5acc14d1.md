# Mutant 5acc14d1 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4357
**Stable ID**: 5acc14d1
**Location**: L242:10–L242:37

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4357
@@ -238,9 +238,9 @@
         const patchResult = functionPatch();
         expect(patchResult.tagIds).toEqual(["valid-tag", "another-tag"]);
       });
 
-      it("should handle valid array", () => {
+      it("", () => {
         const input = ["tag-1", "tag-2"];
         const result = suggestTagIdsPatches(input);
 
         expect(result).toHaveLength(1);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
