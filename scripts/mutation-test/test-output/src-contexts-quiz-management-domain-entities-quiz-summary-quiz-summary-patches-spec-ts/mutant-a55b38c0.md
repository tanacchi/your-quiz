# Mutant a55b38c0 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4741
**Stable ID**: a55b38c0
**Location**: L645:59–L645:69

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4741
@@ -641,9 +641,9 @@
     });
 
     it("should handle large tagIds arrays efficiently", () => {
       const largeTagIds = Array.from({ length: 1000 }, (_, i) =>
-        i % 3 === 0 ? "" : i % 5 === 0 ? `  tag-${i}  ` : `tag-${i}`,
+        i % 3 === 0 ? "" : i % 5 === 0 ? `  tag-${i}  ` : ``,
       );
 
       const patches = suggestTagIdsPatches(largeTagIds);
       expect(patches).toHaveLength(1);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
