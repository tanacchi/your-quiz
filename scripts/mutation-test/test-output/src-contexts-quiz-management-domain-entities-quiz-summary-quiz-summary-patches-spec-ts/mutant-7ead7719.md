# Mutant 7ead7719 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4347
**Stable ID**: 7ead7719
**Location**: L229:10–L229:63

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4347
@@ -225,9 +225,9 @@
         const result = suggestTagIdsPatches(undefined);
         expect(result).toEqual([{ tagIds: [] }]);
       });
 
-      it("should handle array with mixed valid/invalid values", () => {
+      it("", () => {
         const input = ["valid-tag", "", "  another-tag  ", 123, null];
         const result = suggestTagIdsPatches(input);
 
         expect(result).toHaveLength(1);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
