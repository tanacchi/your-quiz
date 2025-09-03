# Mutant 2da6aff2 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4365
**Stable ID**: 2da6aff2
**Location**: L252:16–L252:35

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4365
@@ -248,9 +248,9 @@
         const patchResult = functionPatch();
         expect(patchResult.tagIds).toEqual(["tag-1", "tag-2"]);
       });
 
-      describe("Patch Application", () => {
+      describe("", () => {
         it("should apply null tagIds patch correctly", () => {
           const input = { ...validQuizSummaryInput, tagIds: null };
           const patches = suggestTagIdsPatches(input.tagIds);
           expect(patches).toHaveLength(1);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
