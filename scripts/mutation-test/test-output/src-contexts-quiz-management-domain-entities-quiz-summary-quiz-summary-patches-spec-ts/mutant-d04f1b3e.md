# Mutant d04f1b3e Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: BlockStatement
**Original ID**: 4348
**Stable ID**: d04f1b3e
**Location**: L229:71–L240:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4348
@@ -225,21 +225,10 @@
         const result = suggestTagIdsPatches(undefined);
         expect(result).toEqual([{ tagIds: [] }]);
       });
 
-      it("should handle array with mixed valid/invalid values", () => {
-        const input = ["valid-tag", "", "  another-tag  ", 123, null];
-        const result = suggestTagIdsPatches(input);
+      it("should handle array with mixed valid/invalid values", () => {});
 
-        expect(result).toHaveLength(1);
-        expect(typeof result[0]).toBe("function");
-
-        // Test the function patch
-        const functionPatch = result[0] as () => Partial<QuizSummaryInput>;
-        const patchResult = functionPatch();
-        expect(patchResult.tagIds).toEqual(["valid-tag", "another-tag"]);
-      });
-
       it("should handle valid array", () => {
         const input = ["tag-1", "tag-2"];
         const result = suggestTagIdsPatches(input);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
