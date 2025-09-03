# Mutant d6a119c6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4367
**Stable ID**: d6a119c6
**Location**: L253:12–L253:54

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4367
@@ -249,9 +249,9 @@
         expect(patchResult.tagIds).toEqual(["tag-1", "tag-2"]);
       });
 
       describe("Patch Application", () => {
-        it("should apply null tagIds patch correctly", () => {
+        it("", () => {
           const input = { ...validQuizSummaryInput, tagIds: null };
           const patches = suggestTagIdsPatches(input.tagIds);
           expect(patches).toHaveLength(1);
           const patch = patches[0];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
