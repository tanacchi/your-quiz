# Mutant 6dac5c19 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4358
**Stable ID**: 6dac5c19
**Location**: L242:45–L250:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4358
@@ -238,18 +238,10 @@
         const patchResult = functionPatch();
         expect(patchResult.tagIds).toEqual(["valid-tag", "another-tag"]);
       });
 
-      it("should handle valid array", () => {
-        const input = ["tag-1", "tag-2"];
-        const result = suggestTagIdsPatches(input);
+      it("should handle valid array", () => {});
 
-        expect(result).toHaveLength(1);
-        const functionPatch = result[0] as () => Partial<QuizSummaryInput>;
-        const patchResult = functionPatch();
-        expect(patchResult.tagIds).toEqual(["tag-1", "tag-2"]);
-      });
-
       describe("Patch Application", () => {
         it("should apply null tagIds patch correctly", () => {
           const input = { ...validQuizSummaryInput, tagIds: null };
           const patches = suggestTagIdsPatches(input.tagIds);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
