# Mutant d2d5cbdd Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4342
**Stable ID**: d2d5cbdd
**Location**: L224:10–L224:42

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4342
@@ -220,9 +220,9 @@
         const result = suggestTagIdsPatches(null);
         expect(result).toEqual([{ tagIds: [] }]);
       });
 
-      it("should handle undefined tagIds", () => {
+      it("", () => {
         const result = suggestTagIdsPatches(undefined);
         expect(result).toEqual([{ tagIds: [] }]);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
