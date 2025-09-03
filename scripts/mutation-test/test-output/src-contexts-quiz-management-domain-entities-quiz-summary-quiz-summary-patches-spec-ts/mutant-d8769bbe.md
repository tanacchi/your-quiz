# Mutant d8769bbe Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ArithmeticOperator
**Original ID**: 4734
**Stable ID**: d8769bbe
**Location**: L645:9–L645:14

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4734
@@ -641,9 +641,9 @@
     });
 
     it("should handle large tagIds arrays efficiently", () => {
       const largeTagIds = Array.from({ length: 1000 }, (_, i) =>
-        i % 3 === 0 ? "" : i % 5 === 0 ? `  tag-${i}  ` : `tag-${i}`,
+        i * 3 === 0 ? "" : i % 5 === 0 ? `  tag-${i}  ` : `tag-${i}`,
       );
 
       const patches = suggestTagIdsPatches(largeTagIds);
       expect(patches).toHaveLength(1);
```

## Hint

算術演算子が置換されています（例: i % 3 → i * 3）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
