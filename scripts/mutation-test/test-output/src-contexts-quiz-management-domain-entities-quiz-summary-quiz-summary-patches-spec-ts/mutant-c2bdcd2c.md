# Mutant c2bdcd2c Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 4736
**Stable ID**: c2bdcd2c
**Location**: L645:28–L645:39

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4736
@@ -641,9 +641,9 @@
     });
 
     it("should handle large tagIds arrays efficiently", () => {
       const largeTagIds = Array.from({ length: 1000 }, (_, i) =>
-        i % 3 === 0 ? "" : i % 5 === 0 ? `  tag-${i}  ` : `tag-${i}`,
+        i % 3 === 0 ? "" : true ? `  tag-${i}  ` : `tag-${i}`,
       );
 
       const patches = suggestTagIdsPatches(largeTagIds);
       expect(patches).toHaveLength(1);
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
