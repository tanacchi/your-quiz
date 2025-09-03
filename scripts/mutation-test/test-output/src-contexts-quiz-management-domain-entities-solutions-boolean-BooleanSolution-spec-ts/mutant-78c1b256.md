# Mutant 78c1b256 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 5502
**Stable ID**: 78c1b256
**Location**: L64:11–L64:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/BooleanSolution.spec.ts	mutated #5502
@@ -60,9 +60,9 @@
 
       const result = BooleanSolution.from(invalidData);
       expect(result.isErr()).toBe(true);
 
-      if (result.isErr()) {
+      if (false) {
         const { issues } = result.error;
         expect(issues).toHaveLength(1);
         expect(issues[0]?.path).toEqual(["value"]);
       }
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
